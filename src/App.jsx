import React, { useState } from 'react';
import libraryInstance from './data/libraryInstance.js';
import StatsHeader from './components/StatsHeader.jsx';
import FilterControls from './components/FilterControls.jsx';
import ItemCard from './components/ItemCard.jsx';
import AddItemForm from './components/AddItemForm.jsx';
import Book from './models/Book.js';
import EBook from './models/EBook.js';
import Magazine from './models/Magazine.js';
import AudioBook from './models/AudioBook.js';

export default function App() {
  const [items, setItems] = useState([...libraryInstance.listAllItems()]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [notice, setNotice] = useState(null);
  const members = libraryInstance.listMembers();
  const selectedMember = members.find(member => member.memberId === Number(selectedMemberId));

  const refreshItems = () => {
    setItems([...libraryInstance.listAllItems()]);
  };

  const handleToggleBorrow = (id, action = 'toggle') => {
    if (!selectedMemberId) {
      setNotice({ type: 'error', message: 'Select a member before borrowing an item.' });
      return;
    }

    const item = libraryInstance.findItemById(id);
    if (item) {
      try {
        if (item.isAvailable() || action === 'borrow') {
          libraryInstance.borrowItem(Number(selectedMemberId), id);
          setNotice({ type: 'success', message: `${item.getTitle()} borrowed successfully.` });
        } else {
          libraryInstance.returnItem(Number(selectedMemberId), id);
          setNotice({ type: 'success', message: `${item.getTitle()} returned successfully.` });
        }
        refreshItems();
      } catch (error) {
        setNotice({ type: 'error', message: error.message });
      }
    }
  };

  const handleAddItem = (formData) => {
    const newId = Date.now();
    let newItem;

    if (formData.type === 'Book') {
      newItem = new Book(newId, formData.title, formData.year, formData.author, formData.genre);
    } else if (formData.type === 'EBook') {
      newItem = new EBook(newId, formData.title, formData.year, formData.author, formData.genre, formData.fileSizeMB, formData.format);
    } else if (formData.type === 'Magazine') {
      newItem = new Magazine(newId, formData.title, formData.year, formData.issueNumber, formData.publisher);
    } else if (formData.type === 'AudioBook') {
      newItem = new AudioBook(newId, formData.title, formData.year, formData.author, formData.durationMinutes);
    }

    if (newItem) {
      libraryInstance.addItem(newItem);
      refreshItems();
      setNotice({ type: 'success', message: `${newItem.getTitle()} added to the catalogue.` });
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.getTitle().toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.getType() === selectedCategory;
    const matchesAvailability = availabilityFilter === 'All'
      || (availabilityFilter === 'Available' && item.isAvailable())
      || (availabilityFilter === 'Borrowed' && !item.isAvailable());
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  return (
    <div className="app-shell">
      <div className="topbar">
        <span className="brand-mark">LM</span>
        <span className="brand-name">The Lending Room</span>
        <span className="topbar-note">Library operations / 2026</span>
      </div>
      <StatsHeader items={items} />
      <main className="workspace">
        {notice && (
          <div className={`notice notice-${notice.type}`} role="status">
            <strong>{notice.type === 'success' ? 'Success' : 'Domain Error'}</strong>
            <span>{notice.message}</span>
            <button type="button" onClick={() => setNotice(null)} aria-label="Dismiss notice">x</button>
          </div>
        )}
        <div className="member-bar">
          <div>
            <span className="eyebrow">Borrowing as</span>
            <strong>{selectedMember ? selectedMember.name : 'No member selected'}</strong>
          </div>
          <label className="member-select">
            <span>Choose a member</span>
            <select value={selectedMemberId} onChange={(event) => setSelectedMemberId(event.target.value)}>
              <option value="">Select a member</option>
              {members.map(member => (
                <option key={member.memberId} value={member.memberId}>{member.name}</option>
              ))}
            </select>
          </label>
        </div>
        <LateFeePanel member={selectedMember} />
        <div className="section-heading">
          <div>
            <span className="eyebrow">Collection index</span>
            <h2>Browse the shelves</h2>
          </div>
          <span className="result-count">{filteredItems.length} of {items.length} titles</span>
        </div>
        <FilterControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          availabilityFilter={availabilityFilter}
          onAvailabilityChange={setAvailabilityFilter}
        />
        <div className="item-list">
        {filteredItems.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">--</span>
            <h3>No titles on this shelf</h3>
            <p>Try a different search or add a new item to the collection.</p>
          </div>
        ) : (
          filteredItems.map(item => (
            <ItemCard key={item.id} item={item} onToggleBorrow={handleToggleBorrow} canBorrow={Boolean(selectedMemberId)} />
          ))
        )}
        </div>
      </main>
      <AddItemForm onAddItem={handleAddItem} />
      <footer className="footer-note">Quiet shelves, curious minds. <span>•</span> Keep the catalogue moving.</footer>
    </div>
  );
}

function LateFeePanel({ member }) {
  const [daysLate, setDaysLate] = useState({});
  const borrowedItems = member ? member.getBorrowedItems() : [];
  const totalFee = borrowedItems.reduce((total, item) => total + item.calculateLateFee(Number(daysLate[item.id] || 0)), 0);

  return (
    <section className="late-fee-panel">
      <div>
        <span className="eyebrow">Member panel</span>
        <h3>Late fee calculator</h3>
      </div>
      {!member ? (
        <p>Select a member to calculate fees on their borrowed items.</p>
      ) : borrowedItems.length === 0 ? (
        <p>{member.name} has no borrowed items yet.</p>
      ) : (
        <div className="fee-list">
          {borrowedItems.map(item => (
            <label key={item.id} className="fee-row">
              <span><strong>{item.getTitle()}</strong><small>{item.getType()} · ${item.getLateFeePerDay().toFixed(2)}/day</small></span>
              <input type="number" min="0" value={daysLate[item.id] || ''} placeholder="Days late" onChange={event => setDaysLate({ ...daysLate, [item.id]: event.target.value })} />
              <b>${item.calculateLateFee(Number(daysLate[item.id] || 0)).toFixed(2)}</b>
            </label>
          ))}
          <strong className="fee-total">Total late fee: ${totalFee.toFixed(2)}</strong>
        </div>
      )}
    </section>
  );
}
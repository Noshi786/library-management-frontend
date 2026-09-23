import React from 'react';

export default function FilterControls({ searchQuery, onSearchChange, selectedCategory, onCategoryChange, availabilityFilter, onAvailabilityChange }) {
  return (
    <div className="filter-controls">
      <label className="search-field">
        <span>⌕</span>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      </label>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="All">All Types</option>
        <option value="Book">Book</option>
        <option value="EBook">EBook</option>
        <option value="Magazine">Magazine</option>
        <option value="AudioBook">AudioBook</option>
      </select>
      <select value={availabilityFilter} onChange={(e) => onAvailabilityChange(e.target.value)} aria-label="Availability filter">
        <option value="All">All availability</option>
        <option value="Available">Available</option>
        <option value="Borrowed">Borrowed</option>
      </select>
    </div>
  );
}

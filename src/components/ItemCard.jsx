import React, { useState } from 'react';

export default function ItemCard({ item, onToggleBorrow, canBorrow }) {
  const isAvailable = item.isAvailable();
  const details = item.getDetails();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <article className={`item-card ${isAvailable ? 'is-available' : 'is-borrowed'}`}>
      <div className="item-number">{String(item.id).padStart(2, '0')}</div>
      <div className="item-main">
        <div className="item-heading"><span className="item-type">{item.getType()}</span><span className="item-year">{item.getYear()}</span></div>
        <h3>{item.getTitle()}</h3>
        <ul className="item-details">
          {(showDetails ? details : details.slice(0, 1)).map((detail, index) => (
            <li key={index}><span>{detail.label}</span>{detail.value}</li>
          ))}
        </ul>
        <button type="button" className="details-button" onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
      <div className="item-actions">
        <span className="availability"><i />
          {isAvailable ? 'Available' : 'Borrowed'}
        </span>
        <span className="loan-limit">{item.getLoanDays()} day loan</span>
        {isAvailable ? (
          <button
            onClick={() => onToggleBorrow(item.id, 'borrow')}
            className="borrow-button"
            disabled={!canBorrow}
            title={canBorrow ? undefined : 'Select a member before borrowing'}
          >
            {canBorrow ? 'Borrow' : 'Select member'} <span>→</span>
          </button>
        ) : (
          <div className="borrow-actions">
            <button
              onClick={() => onToggleBorrow(item.id, 'borrow')}
              className="borrow-button retry-borrow-button"
              disabled={!canBorrow}
              title="Try to borrow this already borrowed item"
            >
              Borrow again
            </button>
            <button
              onClick={() => onToggleBorrow(item.id, 'return')}
              className="borrow-button"
              disabled={!canBorrow}
            >
              Return <span>→</span>
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
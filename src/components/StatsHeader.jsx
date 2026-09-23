import React from 'react';

export default function StatsHeader({ items }) {
  const totalItems = items.length;
  const availableItems = items.filter(item => item.isAvailable()).length;
  const borrowedItems = totalItems - availableItems;

  return (
    <header className="hero-header">
      <div className="hero-copy">
        <span className="eyebrow">Good morning, reader</span>
        <h1>Your library,<br /><em>in motion.</em></h1>
        <p>Keep track of what is waiting on the shelf, what is out in the world, and what deserves your next quiet hour.</p>
      </div>
      <div className="stats-grid" aria-label="Collection statistics">
        <div className="stat-card stat-total"><span>Total collection</span><strong>{totalItems}</strong><small>titles indexed</small></div>
        <div className="stat-card"><span>On shelf</span><strong>{availableItems}</strong><small>ready to borrow</small></div>
        <div className="stat-card"><span>Out today</span><strong>{borrowedItems}</strong><small>currently borrowed</small></div>
      </div>
    </header>
  );
}
import LibraryItem from './LibraryItem.js';

export default class AudioBook extends LibraryItem {
  constructor(id, title, year = new Date().getFullYear(), narrator = 'Unknown', durationMinutes = 60) {
    super(id, title, year);
    this.narrator = narrator;
    this.durationMinutes = durationMinutes;
  }

  getType() {
    return 'AudioBook';
  }

  getLoanDays() {
    return 21;
  }

  getLateFeePerDay() {
    return 0.35;
  }

  getDetails() {
    return [
      { label: 'Narrator', value: this.narrator },
      { label: 'Duration', value: `${this.durationMinutes} minutes` }
    ];
  }
}
import LibraryItem from './LibraryItem.js';

export default class Magazine extends LibraryItem {
  #issueNumber;
  #publisher;

  constructor(id, title, year = new Date().getFullYear(), issueNumber = 1, publisher = 'Unknown') {
    super(id, title, year);
    this.#issueNumber = issueNumber;
    this.#publisher = publisher;
  }

  getType() {
    return 'Magazine';
  }

  getLoanDays() {
    return 7;
  }

  getLateFeePerDay() {
    return 0.25;
  }

  getDetails() {
    return [
      { label: 'Issue', value: `#${this.#issueNumber}` },
      { label: 'Publisher', value: this.#publisher }
    ];
  }

  getDescription() {
    return `Magazine [ID: ${this.id}] "${this.getTitle()}" Issue #${this.#issueNumber}, Publisher: ${this.#publisher}, Year: ${this.getYear()}, Available: ${this.isAvailable()}`;
  }
}
import Book from './Book.js';

export default class EBook extends Book {
  constructor(id, title, year = new Date().getFullYear(), author = 'Unknown', genre = 'General', fileSizeMB = 5, format = 'PDF') {
    super(id, title, year, author, genre);
    this.fileSizeMB = fileSizeMB;
    this.format = format;
  }

  getType() {
    return 'EBook';
  }

  getLoanDays() {
    return 30;
  }

  getLateFeePerDay() {
    return 0; // Digital copies expire automatically
  }

  getDetails() {
    // Reuses Book details using super.getDetails() and appends EBook-specific details via spread operator
    return [
      ...super.getDetails(),
      { label: 'File size', value: `${this.fileSizeMB} MB` },
      { label: 'Format', value: this.format }
    ];
  }

  getDescription() {
    return `EBook [ID: ${this.id}] "${this.getTitle()}" by ${this.author}, Genre: ${this.genre}, Year: ${this.getYear()}, Size: ${this.fileSizeMB}MB, Format: ${this.format}, Available: ${this.isAvailable()}`;
  }
}
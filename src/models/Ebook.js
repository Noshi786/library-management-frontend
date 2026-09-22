import Book from './Book.js';

export default class EBook extends Book {
  constructor(id, title, year = new Date().getFullYear(), author = 'Unknown', genre = 'General', fileSizeMB = 5, format = 'PDF') {
    super(id, title, year, author, genre);
    this.fileSizeMB = fileSizeMB;
    this.format = format;
  }

  getLoanDays() {
    return 30;
  }

  getDescription() {
    return `EBook [ID: ${this.id}] "${this.getTitle()}" by ${this.author}, Genre: ${this.genre}, Year: ${this.getYear()}, Size: ${this.fileSizeMB}MB, Format: ${this.format}, Available: ${this.isAvailable()}`;
  }
}
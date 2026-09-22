import LibraryItem from './LibraryItem.js';

export default class Book extends LibraryItem {
  constructor(id, title, year = new Date().getFullYear(), author = 'Unknown', genre = 'General') {
    super(id, title, year);
    this.author = author;
    this.genre = genre;
  }

  getLoanDays() {
    return 14;
  }

  getDescription() {
    return `Book [ID: ${this.id}] "${this.getTitle()}" by ${this.author}, Genre: ${this.genre}, Year: ${this.getYear()}, Available: ${this.isAvailable()}`;
  }
}
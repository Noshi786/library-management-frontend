import Library from '../models/Library.js';
import Member from '../models/Member.js';
import { seedItems } from './seedData.js';

const libraryInstance = new Library();

seedItems.forEach(item => {
  try {
    libraryInstance.addItem(item);
  } catch (error) {
    console.error("Failed to add seed item:", error.message);
  }
});

[
  new Member(101, 'Noshin FItras'),
  new Member(102, 'Nadia '),
  new Member(103, 'Fiza')
].forEach(member => libraryInstance.addMember(member));

export default libraryInstance;
import Book from '../src/models/Book.js';
import EBook from '../src/models/EBook.js';
import Magazine from '../src/models/Magazine.js';
import LibraryItem from '../src/models/LibraryItem.js';

console.log("=== DOMAIN CHECK START ===");

const book = new Book(1, "React Basics", 2024, "Dan Abramov", "Tech");
const ebook = new EBook(2, "JS Design Patterns", 2023, "Addy Osmani", "Tech", 5, "PDF");
const mag = new Magazine(3, "Tech Monthly", 2026, 42, "Tech Media");

console.log("\n--- Testing Book ---");
console.log("Type:", book.getType());
console.log("Loan Days:", book.getLoanDays());
console.log("Late Fee Rate:", book.getLateFeePerDay());
console.log("Fee for 3 days late:", book.calculateLateFee(3)); // Expected: 1.5
console.log("Details:", book.getDetails());

console.log("\n--- Testing EBook ---");
console.log("Type:", ebook.getType());
console.log("Loan Days:", ebook.getLoanDays());
console.log("Late Fee Rate:", ebook.getLateFeePerDay());
console.log("Fee for 3 days late:", ebook.calculateLateFee(3)); // Expected: 0
console.log("Details:", ebook.getDetails());

console.log("\n--- Testing Magazine ---");
console.log("Type:", mag.getType());
console.log("Loan Days:", mag.getLoanDays());
console.log("Late Fee Rate:", mag.getLateFeePerDay());
console.log("Fee for 3 days late:", mag.calculateLateFee(3)); // Expected: 0.75
console.log("Details:", mag.getDetails());

console.log("\n--- Testing Exceptions & Guards ---");

try {
  new LibraryItem(99, "Direct Abstract Test");
  console.error("FAIL: Directly instantiated LibraryItem");
} catch (err) {
  console.log("PASS: LibraryItem Direct Instantiation Guard ->", err.message);
}

try {
  new Book(100, "");
  console.error("FAIL: Created item with empty title");
} catch (err) {
  console.log("PASS: Empty Title Validation Guard ->", err.message);
}

try {
  book.calculateLateFee(-1);
  console.error("FAIL: Allowed negative late days");
} catch (err) {
  console.log("PASS: Negative Late Days Guard ->", err.message);
}

console.log("\n=== DOMAIN CHECK COMPLETE ===");
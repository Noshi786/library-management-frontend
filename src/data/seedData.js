import Book from "../models/Book.js";
import EBook from "../models/EBook";
import Magazine from "../models/Magazine";

export const seedItems = [

  new Book(1, "Clean Code", 2008, "Robert C. Martin", "Software Engineering"),
  new EBook(2, "You Don't Know JS", 2015, "Kyle Simpson", "JavaScript", 12, "EPUB"),
  new Magazine(3, "National Geographic", 2024, 145, "NatGeo Media"),
  new Book(4, "Design Patterns", 1994, "Erich Gamma", "Software Engineering"),
  new EBook(5, "React Up & Running", 2022, "Stoyan Stefanov", "Web Development", 8, "PDF"),
  new Magazine(6, "Tech Monthly", 2026, 88, "Tech Publishing")

];

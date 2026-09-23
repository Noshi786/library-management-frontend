export default class LibraryItem {
  #available = true;
  #title;

  constructor(id, title, year = new Date().getFullYear()) {
    // Abstract Class Guard: Prevents direct instantiation of LibraryItem
    if (new.target === LibraryItem) {
      throw new Error("Cannot instantiate abstract class LibraryItem directly.");
    }

    this.#validateTitle(title);
    this.id = id;
    this.#title = title.trim();
    this.year = year;
  }

  #validateTitle(title) {
    if (typeof title !== "string" || title.trim() === "") {
      throw new Error("Title must be a non-empty string.");
    }
  }

  get title() {
    return this.#title;
  }

  set title(value) {
    this.#validateTitle(value);
    this.#title = value.trim();
  }

  getTitle() {
    return this.#title;
  }

  getYear() {
    return this.year;
  }

  isAvailable() {
    return this.#available;
  }

  borrow() {
    if (!this.#available) {
      throw new Error(`Item "${this.#title}" is already borrowed.`);
    }
    this.#available = false;
  }

  returnItem() {
    if (this.#available) {
      throw new Error(`Item "${this.#title}" is already available.`);
    }
    this.#available = true;
  }

  // --- Abstract-style methods (Must be implemented by subclasses) ---

  getType() {
    throw new Error("Subclass must implement abstract method getType()");
  }

  getLoanDays() {
    throw new Error("Subclass must implement abstract method getLoanDays()");
  }

  getLateFeePerDay() {
    throw new Error("Subclass must implement abstract method getLateFeePerDay()");
  }

  getDetails() {
    throw new Error("Subclass must implement abstract method getDetails()");
  }

  getDescription() {
    return `${this.#title} (ID: ${this.id}, Year: ${this.year})`;
  }

  // --- Concrete method (Template Method Pattern) ---

  calculateLateFee(daysLate) {
    if (typeof daysLate !== "number" || !Number.isFinite(daysLate) || daysLate < 0) {
      throw new Error("Days late must be a non-negative finite number.");
    }
    return daysLate * this.getLateFeePerDay();
  }
}
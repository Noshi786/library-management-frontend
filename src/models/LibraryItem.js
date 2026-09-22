export default class LibraryItem {
  #available = true;
  #title;

  constructor(id, title, year = new Date().getFullYear()) {
    this.id = id;
    this.#title = title; // Calls the setter which validates
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
    this.#title = value;
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

  getLoanDays() {
    throw new Error("Subclass must implement abstract method getLoanDays()");
  }

  getDescription() {
    throw new Error("Subclass must implement abstract method getDescription()");
  }
}
export default class Member {
  #borrowedItems = [];

  constructor(memberId, name) {
    this.memberId = memberId;
    this.name = name;
  }

  borrowItem(item) {
    if (this.#borrowedItems.includes(item)) {
      throw new Error(`Member "${this.name}" has already borrowed item with ID "${item.id}".`);
    }
    this.#borrowedItems.push(item);
  }

  returnItem(item) {
    const index = this.#borrowedItems.indexOf(item);
    if (index === -1) {
      throw new Error(`Member "${this.name}" does not currently have this item.`);
    }
    this.#borrowedItems.splice(index, 1);
  }

  getBorrowedItems() {
    return [...this.#borrowedItems];
  }
}
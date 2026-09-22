export default class Library {
  #items = [];
  #members = [];

  addItem(item) {
    this.#items.push(item);
  }

  addMember(member) {
    this.#members.push(member);
  }

  findItemById(id) {
    return this.#items.find(item => item.id === id);
  }

  findMemberById(memberId) {
    return this.#members.find(member => member.memberId === memberId);
  }

  borrowItem(memberId, itemId) {
    const member = this.findMemberById(memberId);
    if (!member) {
      throw new Error(`Member with ID "${memberId}" not found.`);
    }

    const item = this.findItemById(itemId);
    if (!item) {
      throw new Error(`Item with ID "${itemId}" not found.`);
    }

    if (!item.isAvailable()) {
      throw new Error(`Item "${item.title}" is currently not available.`);
    }

    const alreadyHas = member.getBorrowedItems().includes(item);
    if (alreadyHas) {
      throw new Error(`Member "${member.name}" already has this item.`);
    }

    item.borrow();
    member.borrowItem(item);
  }

  returnItem(memberId, itemId) {
    const member = this.findMemberById(memberId);
    if (!member) {
      throw new Error(`Member with ID "${memberId}" not found.`);
    }

    const item = this.findItemById(itemId);
    if (!item) {
      throw new Error(`Item with ID "${itemId}" not found.`);
    }

    if (item.isAvailable()) {
      throw new Error(`Item "${item.title}" is not currently borrowed.`);
    }

    const hasItem = member.getBorrowedItems().includes(item);
    if (!hasItem) {
      throw new Error(`Member "${member.name}" does not have this item.`);
    }

    item.returnItem();
    member.returnItem(item);
  }

  listAvailableItems() {
    return this.#items.filter(item => item.isAvailable());
  }

  listMembers() {
    return [...this.#members];
  }
}
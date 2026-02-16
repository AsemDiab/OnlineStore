import { Book } from "./Book";

export class InventoryManager {
  private books: Record<string, Record<number, Book>>;

  constructor() {
    this.books = {};
  }

  addBook(book: Book): void {
    if (!this.books[book._isbn]) {
      this.books[book._isbn] = {};
    }
    this.books[book._isbn][book._copyId] = book;
  }

  removeBook(book: Book): void {
    if (!this.books[book._isbn]) {
      return;
    }

    delete this.books[book._isbn][book._copyId];
  }

  checkExist(book: Book): boolean {
    return this.books[book._isbn]?.[book._copyId] != undefined;
  }

  getBookCopies(book: Book): Book[] {
    return this.books[book._isbn] ? Object.values(this.books[book._isbn]) : [];
  }
  get _books(): { isbn: string; copies: Book[] }[] {
    return Object.keys(this.books).map((isbn: string) => {
      const copies: Book[] = Object.values(this.books[isbn]);
      return { isbn, copies };
    });
  }
}

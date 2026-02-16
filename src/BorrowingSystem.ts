import { Book } from "./Book";
import { InventoryManager } from "./InventoryManager";
import { User } from "./User";
import { deleteFromArray } from "./utils";

export class BorrowingSystem {
  private borrows: Record<string, Book[]>;
  private inventory: InventoryManager;
  constructor(inventory: InventoryManager) {
    this.borrows = {};
    this.inventory = inventory;
  }

  borrowBookCopy(book: Book, borrower: User): void {
    const copies = this.inventory.getBookCopies(book);
    if (!this.borrows[borrower._email]) {
      this.borrows[borrower._email] = [];
    }
    if (copies.length === 0) {
      throw new Error(
        `Borrowing failed: No available copies for book '${book._title}' (ISBN: ${book._isbn}). All copies are currently borrowed.`,
      );
    }
    for (let copy of copies) {
      if (!copy.isBorrowed) {
        this.borrows[borrower._email].push(copy);
        copy.isBorrowed = true;
        console.log(
          `user with email ${borrower._email} borrowed copy with copyID ${copy._copyId} and isbn ${copy._isbn}`,
        );
        return;
      }
    }
  }
  borrowSpecificCopy(book: Book, borrower: User): void {
    if (!this.borrows[borrower._email]) {
      this.borrows[borrower._email] = [];
    }

    if (book.isBorrowed) {
      throw new Error(
        `Cannot borrow book '${book._title}' (Copy ID: ${book._copyId}): This copy is already borrowed by another user.`,
      );
    }

    this.borrows[borrower._email].push(book);
    book.isBorrowed = true;
  }

  returnBook(book: Book, borrower: User): void {
    if (!this.borrows[borrower._email]) {
      throw new Error(
        `Return failed: User '${borrower._email}' has no borrowed books to return.`,
      );
    }

    if (!book.isBorrowed) {
      throw new Error(
        `Return failed: Book '${book._title}' (Copy ID: ${book._copyId}) is not currently borrowed.`,
      );
    }

    if (!this.borrows[borrower._email].includes(book)) {
      throw new Error(
        `Return failed: Book '${book._title}' (Copy ID: ${book._copyId}) was not borrowed by user '${borrower._email}'.`,
      );
    }

    deleteFromArray<Book>(book, this.borrows[borrower._email]);
    book.isBorrowed = false;
  }

  get borrowingOperations(): Record<string, Book[]> {
    return this.borrows;
  }
}

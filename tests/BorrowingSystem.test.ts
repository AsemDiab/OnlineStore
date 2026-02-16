import { Book } from "../src/Book";
import { User } from "../src/User";
import { InventoryManager } from "../src/InventoryManager";
import { BorrowingSystem } from "../src/BorrowingSystem";

describe("BorrowingSystem", () => {
  let inventory: InventoryManager;
  let borrowingSystem: BorrowingSystem;
  let book1: Book;
  let book2: Book;
  let book3: Book;
  let user1: User;
  let user2: User;
  let user3: User;

  beforeEach(() => {
    inventory = new InventoryManager();
    borrowingSystem = new BorrowingSystem(inventory);

    book1 = new Book("Test Book", "Test Author", "333-3333333333");
    book2 = new Book("Test Book Copy 2", "Test Author", "333-3333333333");
    book3 = new Book("Test Book Copy 3", "Test Author", "333-3333333333");

    user1 = new User("Alice", "alice@example.com");
    user2 = new User("Bob", "bob@example.com");
    user3 = new User("Charlie", "charlie@example.com");

    inventory.addBook(book1);
    inventory.addBook(book2);
    inventory.addBook(book3);
  });

  describe("borrowBookCopy", () => {
    it("should allow a user to borrow an available book copy", () => {
      expect(() => borrowingSystem.borrowBookCopy(book1, user1)).not.toThrow();
    });

    it("should record the borrowed book under the user in borrowingOperations", () => {
      borrowingSystem.borrowBookCopy(book1, user1);
      const userBorrows =
        borrowingSystem.borrowingOperations[user1._email] || [];
      expect(userBorrows.length).toBeGreaterThan(0);
    });

    it("should throw when trying to borrow a book not in inventory", () => {
      const nonExistent = new Book("Non-existent", "Author", "999-9999999999");
      expect(() =>
        borrowingSystem.borrowBookCopy(nonExistent, user3),
      ).toThrow();
    });
  });

  describe("borrowSpecificCopy", () => {
    it("should allow a user to borrow a specific book copy", () => {
      expect(() =>
        borrowingSystem.borrowSpecificCopy(book2, user2),
      ).not.toThrow();
    });

    it("should throw when trying to borrow an already-borrowed copy", () => {
      borrowingSystem.borrowSpecificCopy(book2, user2);
      expect(() => borrowingSystem.borrowSpecificCopy(book2, user1)).toThrow();
    });
  });

  describe("returnBook", () => {
    it("should allow the borrowing user to return a book", () => {
      borrowingSystem.borrowBookCopy(book1, user1);
      expect(() => borrowingSystem.returnBook(book1, user1)).not.toThrow();
    });

    it("should remove the book from the user`s borrowing record after return", () => {
      borrowingSystem.borrowBookCopy(book1, user1);
      borrowingSystem.returnBook(book1, user1);
      const userBorrows =
        borrowingSystem.borrowingOperations[user1._email] || [];
      const stillHasBook = userBorrows.some(
        (b: Book) => b._copyId === book1._copyId,
      );
      expect(stillHasBook).toBe(false);
    });

    it("should throw when the wrong user tries to return a book", () => {
      borrowingSystem.borrowSpecificCopy(book2, user2);
      expect(() => borrowingSystem.returnBook(book2, user1)).toThrow();
    });

    it("should throw when trying to return a book that was never borrowed", () => {
      expect(() => borrowingSystem.returnBook(book3, user2)).toThrow();
    });

    it("should throw when a user who has no borrows tries to return", () => {
      borrowingSystem.borrowBookCopy(book1, user1);
      expect(() => borrowingSystem.returnBook(book1, user3)).toThrow();
    });
  });

  describe("borrowingOperations data structure", () => {
    it("should track borrowed books per user email", () => {
      borrowingSystem.borrowBookCopy(book1, user1);
      borrowingSystem.borrowSpecificCopy(book2, user2);

      const ops = borrowingSystem.borrowingOperations;
      expect(ops[user1._email]).toBeDefined();
      expect(ops[user2._email]).toBeDefined();
    });

    it("should store books with valid title, author, isbn, and copyId", () => {
      borrowingSystem.borrowBookCopy(book1, user1);
      const borrowed = borrowingSystem.borrowingOperations[user1._email];
      borrowed.forEach((book) => {
        expect(book._title).toBeTruthy();
        expect(book._author).toBeTruthy();
        expect(book._isbn).toBeTruthy();
        expect(book._copyId).toBeDefined();
      });
    });

    it("should reflect correct total after a borrow-and-return cycle", () => {
      borrowingSystem.borrowBookCopy(book1, user1);
      borrowingSystem.borrowSpecificCopy(book2, user2);
      borrowingSystem.returnBook(book1, user1);

      const ops = borrowingSystem.borrowingOperations;
      const total = Object.values(ops).reduce(
        (sum, books) => sum + books.length,
        0,
      );
      expect(total).toBe(1); // only book2 still out
    });
  });
});

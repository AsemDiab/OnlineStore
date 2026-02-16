import { Book } from "../src/Book";
import { InventoryManager } from "../src/InventoryManager";

describe("InventoryManager", () => {
  let inventory: InventoryManager;
  let book1: Book;
  let book2: Book;
  let book3: Book; // second copy of book1's ISBN
  let book4: Book;

  beforeEach(() => {
    inventory = new InventoryManager();
    book1 = new Book("Book 1", "Author 1", "111-1111111111");
    book2 = new Book("Book 2", "Author 2", "222-2222222222");
    book3 = new Book("Book 1 Copy 2", "Author 1", "111-1111111111");
    book4 = new Book("Book 3", "Author 3", "333-3333333333");

    inventory.addBook(book1);
    inventory.addBook(book2);
    inventory.addBook(book3);
    inventory.addBook(book4);
  });

  describe("addBook", () => {
    it("should add books to the inventory", () => {
      const copies = inventory.getBookCopies(book1);
      expect(copies.length).toBe(2);
    });
  });

  describe("checkExist", () => {
    it("should return true for a book that exists", () => {
      expect(inventory.checkExist(book1)).toBe(true);
    });

    it("should return true for another existing book", () => {
      expect(inventory.checkExist(book2)).toBe(true);
    });

    it("should return false for a book that does not exist", () => {
      const nonExistent = new Book("Non-existent", "Author", "999-9999999999");
      expect(inventory.checkExist(nonExistent)).toBe(false);
    });
  });

  describe("getBookCopies", () => {
    it("should return 2 copies for an ISBN with 2 entries", () => {
      expect(inventory.getBookCopies(book1).length).toBe(2);
    });

    it("should return 1 copy for an ISBN with 1 entry", () => {
      expect(inventory.getBookCopies(book2).length).toBe(1);
    });

    it("should return an empty array for a non-existent ISBN", () => {
      const nonExistent = new Book("Non-existent", "Author", "999-9999999999");
      expect(inventory.getBookCopies(nonExistent).length).toBe(0);
    });
  });

  describe("removeBook", () => {
    it("should reduce the copy count by 1 after removal", () => {
      inventory.removeBook(book1);
      expect(inventory.getBookCopies(book1).length).toBe(1);
    });

    it("should not throw when removing a non-existent book", () => {
      const nonExistent = new Book("Non-existent", "Author", "999-9999999999");
      expect(() => inventory.removeBook(nonExistent)).not.toThrow();
    });
  });

  describe("_books getter", () => {
    it("should return all ISBN groups", () => {
      const allBooks = inventory._books;
      expect(allBooks.length).toBe(3);
    });

    it("should include copies with valid structure (title, author, isbn, copyId)", () => {
      inventory._books.forEach((group) => {
        group.copies.forEach((copy) => {
          expect(copy._title).toBeTruthy();
          expect(copy._author).toBeTruthy();
          expect(copy._isbn).toBeTruthy();
          expect(copy._copyId).toBeDefined();
        });
      });
    });

    it("should group copies correctly under the right ISBN", () => {
      const isbn111 = inventory._books.find((g) => g.isbn === "111-1111111111");
      expect(isbn111?.copies.length).toBe(2);
    });

    it("should reflect updated counts after a removal", () => {
      inventory.removeBook(book1);
      const isbn111 = inventory._books.find((g) => g.isbn === "111-1111111111");
      expect(isbn111?.copies.length).toBe(1);
    });

    it("should maintain data integrity (correct total copies)", () => {
      inventory.removeBook(book1);
      const total = inventory._books.reduce(
        (sum, g) => sum + g.copies.length,
        0,
      );
      expect(total).toBe(3); // 1 (book1 remaining) + 1 (book2) + 1 (book4)
    });
  });
});

describe("InventoryManager – _books method standalone", () => {
  it("should return ISBN groups with correct copy counts when books share an ISBN", () => {
    const inventory = new InventoryManager();
    const b1 = new Book("Book 1", "Author 1", "111-1111111111");
    const b2 = new Book("Book 2", "Author 2", "222-2222222222");
    const b3 = new Book("Book 1 Copy 2", "Author 1", "111-1111111111");
    const b4 = new Book("Book 3", "Author 3", "333-3333333333");

    inventory.addBook(b1);
    inventory.addBook(b2);
    inventory.addBook(b3);
    inventory.addBook(b4);

    const allBooks = inventory._books;
    expect(allBooks.length).toBe(3);

    const isbn111 = allBooks.find((g) => g.isbn === "111-1111111111");
    expect(isbn111?.copies.length).toBe(2);
  });
});

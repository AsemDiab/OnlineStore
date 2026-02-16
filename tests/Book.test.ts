import { Book } from "../src/Book";

describe("Book", () => {
  let book1: Book;
  let book2: Book;
  let book3: Book;

  beforeEach(() => {
    book1 = new Book(
      "The Great Gatsby",
      "F. Scott Fitzgerald",
      "978-0-7432-7356-5",
    );
    book2 = new Book("1984", "George Orwell", "978-0-452-28423-4");
    book3 = new Book(
      "To Kill a Mockingbird",
      "Harper Lee",
      "978-0-06-112008-4",
    );
  });

  describe("creation", () => {
    it("should create a book with correct title, author, and isbn", () => {
      expect(book1._title).toBe("The Great Gatsby");
      expect(book1._author).toBe("F. Scott Fitzgerald");
      expect(book1._isbn).toBe("978-0-7432-7356-5");
    });

    it("should assign a copyId upon creation", () => {
      expect(book1._copyId).toBeDefined();
    });

    it("should create multiple books successfully", () => {
      expect(book2._title).toBe("1984");
      expect(book3._title).toBe("To Kill a Mockingbird");
    });
  });

  describe("copyId auto-increment", () => {
    it("should increment copyId for each new book", () => {
      expect(book2._copyId).toBe(book1._copyId + 1);
      expect(book3._copyId).toBe(book2._copyId + 1);
    });
  });

  describe("getters", () => {
    it("should expose _title, _author, _isbn, and _copyId", () => {
      expect(typeof book1._title).toBe("string");
      expect(typeof book1._author).toBe("string");
      expect(typeof book1._isbn).toBe("string");
      expect(typeof book1._copyId).toBe("number");
    });
  });

  describe("copyId immutability", () => {
    it("should not change copyId after creation", () => {
      const originalId = book1._copyId;
      expect(book1._copyId).toBe(originalId);
    });
  });
});

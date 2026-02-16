import { Book } from "../src/Book";
import { User } from "../src/User";
import { Library } from "../src/Library";

describe("Library", () => {
  let library: Library;
  let book1: Book;
  let book2: Book;
  let book3: Book;
  let book4: Book; // duplicate ISBN of book1

  beforeEach(() => {
    // Reset the singleton instance before each test so tests don't bleed into each other
    (Library as any).instance = undefined;
    library = Library.getInstance();

    book1 = new Book(
      "The Great Gatsby",
      "F. Scott Fitzgerald",
      "111-1111111111",
    );
    book2 = new Book("1984", "George Orwell", "222-2222222222");
    book3 = new Book("To Kill a Mockingbird", "Harper Lee", "333-3333333333");
    book4 = new Book(
      "The Great Gatsby",
      "F. Scott Fitzgerald",
      "111-1111111111",
    );
  });

  // ─── Singleton ────────────────────────────────────────────────────────────────

  describe("getInstance", () => {
    it("should always return the same instance", () => {
      const instance1 = Library.getInstance();
      const instance2 = Library.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  // ─── User Management ─────────────────────────────────────────────────────────

  describe("signup", () => {
    it("should register a new user and return truthy", () => {
      expect(library.signup("Alice", "alice@example.com")).toBeTruthy();
    });

    it("should return falsy when registering a duplicate email", () => {
      library.signup("Alice", "alice@example.com");
      expect(
        library.signup("Alice Duplicate", "alice@example.com"),
      ).toBeFalsy();
    });
  });

  describe("login", () => {
    beforeEach(() => {
      library.signup("Alice", "alice@example.com");
      library.signup("Bob", "bob@example.com");
    });

    it("should return a User object on successful login", () => {
      const alice = library.login("alice@example.com");
      expect(alice).not.toBeNull();
    });

    it("should return null/falsy for a non-existent user", () => {
      const result = library.login("nonexistent@example.com");
      expect(result).toBeFalsy();
    });
  });

  describe("logout", () => {
    it("should prevent borrowing after a user logs out", () => {
      library.signup("Alice", "alice@example.com");
      const alice = library.login("alice@example.com")!;
      library.addBook(book1);

      library.logout("alice@example.com");
      const result = library.borrowBookCopy(book1, alice);
      expect(result).toBeFalsy();
    });
  });

  // ─── Book Inventory ──────────────────────────────────────────────────────────

  describe("addBook", () => {
    it("should add a book and return truthy", () => {
      expect(library.addBook(book1)).toBeTruthy();
    });

    it("should add a duplicate-ISBN book as a second copy", () => {
      library.addBook(book1);
      expect(library.addBook(book4)).toBeTruthy();
    });

    it("should return falsy when given null", () => {
      expect(library.addBook(null as any)).toBeFalsy();
    });

    it("should group books by ISBN in _book", () => {
      library.addBook(book1);
      library.addBook(book2);
      library.addBook(book3);
      library.addBook(book4);

      const groups = library._book;
      expect(groups.length).toBe(3);

      const gatsby = groups.find((g) => g.isbn === "111-1111111111");
      expect(gatsby?.copies.length).toBe(2);
    });
  });

  // ─── Borrowing ───────────────────────────────────────────────────────────────

  describe("borrowBookCopy", () => {
    let alice: User;
    let bob: User;

    beforeEach(() => {
      library.signup("Alice", "alice@example.com");
      library.signup("Bob", "bob@example.com");
      alice = library.login("alice@example.com")!;
      bob = library.login("bob@example.com")!;

      library.addBook(book1);
      library.addBook(book2);
      library.addBook(book3);
      library.addBook(book4);
    });

    it("should allow a logged-in user to borrow a book", () => {
      expect(library.borrowBookCopy(book1, alice)).toBeTruthy();
    });

    it("should allow multiple users to borrow different books", () => {
      expect(library.borrowBookCopy(book1, alice)).toBeTruthy();
      expect(library.borrowBookCopy(book2, bob)).toBeTruthy();
    });

    it("should return falsy when borrowing with a null user", () => {
      expect(library.borrowBookCopy(book1, null as any)).toBeFalsy();
    });

    it("should return falsy or throw when borrowing a non-existent book", () => {
      const nonExistent = new Book("Non-existent", "Author", "999-9999999999");
      let result: boolean | undefined;
      try {
        result = library.borrowBookCopy(nonExistent, alice);
      } catch {
        result = false;
      }
      expect(result).toBeFalsy();
    });
  });

  describe("borrowSpecificCopy", () => {
    let alice: User;

    beforeEach(() => {
      library.signup("Alice", "alice@example.com");
      alice = library.login("alice@example.com")!;
      library.addBook(book3);
    });

    it("should allow borrowing a specific copy", () => {
      expect(library.borrowSpecificCopy(book3, alice)).toBeTruthy();
    });

    it("should handle a double-borrow of the same copy gracefully", () => {
      library.borrowSpecificCopy(book3, alice);
      let result: boolean | undefined;
      try {
        result = library.borrowSpecificCopy(book3, alice);
      } catch {
        result = false;
      }
      expect(result).toBeFalsy();
    });
  });

  // ─── Return ──────────────────────────────────────────────────────────────────

  describe("returnBook", () => {
    let alice: User;
    let bob: User;

    beforeEach(() => {
      library.signup("Alice", "alice@example.com");
      library.signup("Bob", "bob@example.com");
      alice = library.login("alice@example.com")!;
      bob = library.login("bob@example.com")!;

      library.addBook(book1);
      library.addBook(book2);
      library.addBook(book3);

      library.borrowBookCopy(book1, alice);
      library.borrowBookCopy(book2, bob);
    });

    it("should allow the borrowing user to return a book", () => {
      expect(library.returnBook(book2, bob)).toBeTruthy();
    });

    it("should return falsy when a logged-out user tries to return", () => {
      library.logout("alice@example.com");
      expect(library.returnBook(book3, alice)).toBeFalsy();
    });

    it("should return falsy when a user returns a book they did not borrow", () => {
      const result = library.returnBook(book3, bob);
      expect(result).toBeFalsy();
    });

    it("should return falsy when given a null user", () => {
      expect(library.returnBook(book2, null as any)).toBeFalsy();
    });

    it("should handle wrong-user return gracefully", () => {
      let result: boolean | undefined;
      try {
        result = library.returnBook(book2, alice); // alice did not borrow book2
      } catch {
        result = false;
      }
      expect(result).toBeFalsy();
    });
  });

  // ─── borrowingOperations ─────────────────────────────────────────────────────

  describe("borrowingOperations", () => {
    let alice: User;
    let bob: User;

    beforeEach(() => {
      library.signup("Alice", "alice@example.com");
      library.signup("Bob", "bob@example.com");
      alice = library.login("alice@example.com")!;
      bob = library.login("bob@example.com")!;

      library.addBook(book1);
      library.addBook(book2);
      library.addBook(book3);

      library.borrowBookCopy(book1, alice);
      library.borrowBookCopy(book2, bob);
      library.borrowSpecificCopy(book3, alice);
    });

    it("should list books currently borrowed per user", () => {
      const ops = library.borrowingOperations;
      expect(Object.keys(ops).length).toBeGreaterThan(0);
    });

    it("should update after a book is returned", () => {
      library.returnBook(book2, bob);
      const ops = library.borrowingOperations;
      const bobBooks = ops[bob._email] || [];
      const stillHasBook2 = bobBooks.some((b) => b._copyId === book2._copyId);
      expect(stillHasBook2).toBe(false);
    });

    it("should track both alice and bob entries", () => {
      const ops = library.borrowingOperations;
      expect(ops[alice._email]).toBeDefined();
      expect(ops[bob._email]).toBeDefined();
    });
  });
});

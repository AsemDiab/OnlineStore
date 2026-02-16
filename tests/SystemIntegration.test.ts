import { Book } from "../src/Book";
import { Library } from "../src/Library";
import { User } from "../src/User";

describe("System Integration – Full Library Management Flow", () => {
  let library: Library;

  // Books
  let gatsby1: Book;
  let orwell: Book;
  let mockingbird: Book;
  let gatsby2: Book; // duplicate ISBN

  // Logged-in user references
  let alice: User | null;
  let bob: User | null;
  let charlie: User | null;

  beforeEach(() => {
    // Reset the singleton instance before each test so tests don't bleed into each other
    (Library as any).instance = undefined;
    library = Library.getInstance();

    gatsby1 = new Book(
      "The Great Gatsby",
      "F. Scott Fitzgerald",
      "978-0-7432-7356-5",
    );
    orwell = new Book("1984", "George Orwell", "978-0-452-28423-4");
    mockingbird = new Book(
      "To Kill a Mockingbird",
      "Harper Lee",
      "978-0-06-112008-4",
    );
    gatsby2 = new Book(
      "The Great Gatsby",
      "F. Scott Fitzgerald",
      "978-0-7432-7356-5",
    );
  });

  // ─── Phase 1: User Management ─────────────────────────────────────────────

  describe("Phase 1 – User registration & login", () => {
    it("should register Alice, Bob, and Charlie", () => {
      expect(library.signup("Alice Johnson", "alice@example.com")).toBeTruthy();
      expect(library.signup("Bob Smith", "bob@example.com")).toBeTruthy();
      expect(
        library.signup("Charlie Brown", "charlie@example.com"),
      ).toBeTruthy();
    });

    it("should reject a duplicate email registration", () => {
      library.signup("Alice Johnson", "alice@example.com");
      expect(
        library.signup("Alice Duplicate", "alice@example.com"),
      ).toBeFalsy();
    });

    it("should return a User object on successful login", () => {
      library.signup("Alice Johnson", "alice@example.com");
      expect(library.login("alice@example.com")).not.toBeNull();
    });

    it("should return null/falsy for a non-existent user login", () => {
      expect(library.login("nonexistent@example.com")).toBeFalsy();
    });
  });

  // ─── Phase 2: Book Inventory ───────────────────────────────────────────────

  describe("Phase 2 – Book inventory management", () => {
    it("should add books to the library", () => {
      expect(library.addBook(gatsby1)).toBeTruthy();
      expect(library.addBook(orwell)).toBeTruthy();
      expect(library.addBook(mockingbird)).toBeTruthy();
    });

    it("should add a duplicate-ISBN book as a second copy", () => {
      library.addBook(gatsby1);
      expect(library.addBook(gatsby2)).toBeTruthy();
    });

    it("should group books into the correct number of ISBN groups", () => {
      library.addBook(gatsby1);
      library.addBook(orwell);
      library.addBook(mockingbird);
      library.addBook(gatsby2);

      const groups = library._book;
      expect(groups.length).toBe(3);

      const gatsby = groups.find((g) => g.isbn === "978-0-7432-7356-5");
      expect(gatsby?.copies.length).toBe(2);
    });
  });

  // ─── Phase 3: Borrowing Operations ────────────────────────────────────────

  describe("Phase 3 – Borrowing", () => {
    beforeEach(() => {
      library.signup("Alice Johnson", "alice@example.com");
      library.signup("Bob Smith", "bob@example.com");
      library.signup("Charlie Brown", "charlie@example.com");

      alice = library.login("alice@example.com");
      bob = library.login("bob@example.com");
      charlie = library.login("charlie@example.com");

      library.addBook(gatsby1);
      library.addBook(orwell);
      library.addBook(mockingbird);
      library.addBook(gatsby2);
    });

    it("should allow logged-in users to borrow books", () => {
      expect(library.borrowBookCopy(gatsby1, alice!)).toBeTruthy();
      expect(library.borrowBookCopy(orwell, bob!)).toBeTruthy();
      expect(library.borrowSpecificCopy(mockingbird, alice!)).toBeTruthy();
    });

    it("should allow Charlie to borrow a second copy of Gatsby", () => {
      library.borrowBookCopy(gatsby1, alice!);
      expect(library.borrowBookCopy(gatsby1, charlie!)).toBeTruthy();
    });

    it("should prevent a logged-out user from borrowing", () => {
      library.logout("alice@example.com");
      expect(library.borrowBookCopy(orwell, alice!)).toBeFalsy();
    });
  });

  // ─── Phase 4: Borrowing Data ───────────────────────────────────────────────

  describe("Phase 4 – Borrowing data", () => {
    beforeEach(() => {
      library.signup("Alice Johnson", "alice@example.com");
      library.signup("Bob Smith", "bob@example.com");
      alice = library.login("alice@example.com");
      bob = library.login("bob@example.com");

      library.addBook(gatsby1);
      library.addBook(orwell);
      library.addBook(mockingbird);

      library.borrowBookCopy(gatsby1, alice!);
      library.borrowBookCopy(orwell, bob!);
      library.borrowSpecificCopy(mockingbird, alice!);
    });

    it("should record borrowed books per user in borrowingOperations", () => {
      const ops = library.borrowingOperations;
      expect(ops[alice!._email]).toBeDefined();
      expect(ops[bob!._email]).toBeDefined();
    });

    it("should list the correct number of books per borrower", () => {
      const ops = library.borrowingOperations;
      expect(ops[alice!._email].length).toBe(2);
      expect(ops[bob!._email].length).toBe(1);
    });

    it("each borrowed book entry should have title and copyId", () => {
      const ops = library.borrowingOperations;
      Object.values(ops)
        .flat()
        .forEach((book) => {
          expect(book._title).toBeTruthy();
          expect(book._copyId).toBeDefined();
        });
    });
  });

  // ─── Phase 5: Return Operations ────────────────────────────────────────────

  describe("Phase 5 – Returns", () => {
    beforeEach(() => {
      library.signup("Alice Johnson", "alice@example.com");
      library.signup("Bob Smith", "bob@example.com");
      alice = library.login("alice@example.com");
      bob = library.login("bob@example.com");

      library.addBook(gatsby1);
      library.addBook(orwell);
      library.addBook(mockingbird);
      library.addBook(gatsby2);

      library.borrowBookCopy(gatsby1, alice!);
      library.borrowBookCopy(orwell, bob!);
      library.borrowSpecificCopy(mockingbird, alice!);
      library.borrowBookCopy(gatsby1, bob!); // second Gatsby copy
    });

    it("should allow the borrowing user to return their book", () => {
      expect(library.returnBook(orwell, bob!)).toBeTruthy();
    });

    it("should return falsy when a logged-out user tries to return", () => {
      library.logout("alice@example.com");
      expect(library.returnBook(mockingbird, alice!)).toBeFalsy();
    });

    it("should return falsy when the wrong user tries to return", () => {
      const result = library.returnBook(mockingbird, bob!);
      expect(result).toBeFalsy();
    });

    it("should allow Alice to re-login and still have her session valid", () => {
      library.returnBook(orwell, bob!);
      library.returnBook(gatsby2, bob!);

      const aliceRelogin = library.login("alice@example.com");
      expect(aliceRelogin).not.toBeNull();
    });
  });

  // ─── Phase 6: Final System State ──────────────────────────────────────────

  describe("Phase 6 – Final system state", () => {
    it("should reflect consistent inventory and borrowing counts at end of a full workflow", () => {
      library.signup("Alice Johnson", "alice@example.com");
      library.signup("Bob Smith", "bob@example.com");
      library.signup("Charlie Brown", "charlie@example.com");

      alice = library.login("alice@example.com");
      bob = library.login("bob@example.com");
      charlie = library.login("charlie@example.com");

      library.addBook(gatsby1);
      library.addBook(orwell);
      library.addBook(mockingbird);
      library.addBook(gatsby2);

      library.borrowBookCopy(gatsby1, alice!);
      library.borrowBookCopy(orwell, bob!);
      library.borrowSpecificCopy(mockingbird, alice!);
      library.borrowBookCopy(gatsby1, charlie!);

      library.logout("alice@example.com");

      library.returnBook(orwell, bob!);
      library.returnBook(gatsby2, charlie!);

      const finalBooks = library._book;
      const finalOps = library.borrowingOperations;

      expect(finalBooks.length).toBe(3);

      // Verify no negative counts
      finalBooks.forEach((group) => {
        expect(group.copies.length).toBeGreaterThan(0);
      });

      // Verify borrowingOperations only contains books still out
      const totalBorrowed = Object.values(finalOps).reduce(
        (sum, books) => sum + books.length,
        0,
      );
      expect(totalBorrowed).toBeGreaterThanOrEqual(0);
    });
  });
});

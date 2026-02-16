import { UsersManager } from "../src/UsersManager";

describe("UsersManager", () => {
  let userManager: UsersManager;

  beforeEach(() => {
    userManager = new UsersManager();
  });

  // ─── Registration ──────────────────────────────────────────────────────────

  describe("signUp", () => {
    it("should register a new user and return a User object", () => {
      const user = userManager.signUp("Alice Johnson", "alice@example.com");
      expect(user).not.toBeNull();
      expect(user?._name).toBe("Alice Johnson");
      expect(user?._email).toBe("alice@example.com");
    });

    it("should register multiple distinct users", () => {
      const u1 = userManager.signUp("Alice Johnson", "alice@example.com");
      const u2 = userManager.signUp("Bob Smith", "bob@example.com");
      const u3 = userManager.signUp("Charlie Brown", "charlie@example.com");
      expect(u1).not.toBeNull();
      expect(u2).not.toBeNull();
      expect(u3).not.toBeNull();
    });

    it("should throw when registering a duplicate email", () => {
      userManager.signUp("Alice Johnson", "alice@example.com");
      expect(() =>
        userManager.signUp("Alice Duplicate", "alice@example.com"),
      ).toThrow();
    });

    it("should throw when given an invalid email", () => {
      expect(() =>
        userManager.signUp("Invalid User", "invalid-email"),
      ).toThrow();
    });

    it("should throw when given an empty name", () => {
      expect(() => userManager.signUp("", "test@example.com")).toThrow();
    });

    it("should throw when given an empty email", () => {
      expect(() => userManager.signUp("Test User", "")).toThrow();
    });
  });

  // ─── Login ─────────────────────────────────────────────────────────────────

  describe("login", () => {
    beforeEach(() => {
      userManager.signUp("Alice Johnson", "alice@example.com");
      userManager.signUp("Bob Smith", "bob@example.com");
    });

    it("should return the User object on successful login", () => {
      const alice = userManager.login("alice@example.com");
      expect(alice).not.toBeNull();
      expect(alice?._name).toBe("Alice Johnson");
    });

    it("should allow multiple registered users to log in", () => {
      expect(userManager.login("alice@example.com")).not.toBeNull();
      expect(userManager.login("bob@example.com")).not.toBeNull();
    });

    it("should throw when logging in a non-existent user", () => {
      expect(() => userManager.login("nonexistent@example.com")).toThrow();
    });

    it("should allow the same user to log in more than once", () => {
      userManager.login("alice@example.com");
      expect(() => userManager.login("alice@example.com")).not.toThrow();
    });
  });

  // ─── Session management ────────────────────────────────────────────────────

  describe("isLoggedIn", () => {
    beforeEach(() => {
      userManager.signUp("Alice Johnson", "alice@example.com");
      userManager.signUp("Bob Smith", "bob@example.com");
      userManager.login("alice@example.com");
      userManager.login("bob@example.com");
    });

    it("should return true for a logged-in user", () => {
      expect(userManager.isLoggedIn("alice@example.com")).toBe(true);
    });

    it("should return false for a non-existent user", () => {
      expect(userManager.isLoggedIn("nonexistent@example.com")).toBe(false);
    });
  });

  describe("getLoggedInUser", () => {
    beforeEach(() => {
      userManager.signUp("Alice Johnson", "alice@example.com");
      userManager.signUp("Bob Smith", "bob@example.com");
      userManager.login("alice@example.com");
      userManager.login("bob@example.com");
    });

    it("should return the user object for a logged-in user", () => {
      const alice = userManager.getLoggedInUser("alice@example.com");
      expect(alice).not.toBeNull();
      expect(alice?._name).toBe("Alice Johnson");
    });

    it("should return null for a non-existent user", () => {
      expect(userManager.getLoggedInUser("nonexistent@example.com")).toBeNull();
    });
  });

  // ─── Logout ────────────────────────────────────────────────────────────────

  describe("logout", () => {
    beforeEach(() => {
      userManager.signUp("Alice Johnson", "alice@example.com");
      userManager.signUp("Bob Smith", "bob@example.com");
      userManager.signUp("Charlie Brown", "charlie@example.com");
      userManager.login("alice@example.com");
      userManager.login("bob@example.com");
      userManager.login("charlie@example.com");
    });

    it("should set the user`s session to logged-out", () => {
      userManager.logout("alice@example.com");
      expect(userManager.isLoggedIn("alice@example.com")).toBe(false);
    });

    it("should return null from getLoggedInUser after logout", () => {
      userManager.logout("alice@example.com");
      expect(userManager.getLoggedInUser("alice@example.com")).toBeNull();
    });

    it("should not affect other users when one logs out", () => {
      userManager.logout("alice@example.com");
      expect(userManager.isLoggedIn("bob@example.com")).toBe(true);
      expect(userManager.isLoggedIn("charlie@example.com")).toBe(true);
    });

    it("should not throw when logging out a non-existent user", () => {
      expect(() => userManager.logout("nonexistent@example.com")).not.toThrow();
    });

    it("should allow a user to log back in after logging out", () => {
      userManager.logout("alice@example.com");
      const relogin = userManager.login("alice@example.com");
      expect(relogin).not.toBeNull();
      expect(userManager.isLoggedIn("alice@example.com")).toBe(true);
    });
  });

  // ─── Case sensitivity ──────────────────────────────────────────────────────

  describe("case sensitivity", () => {
    beforeEach(() => {
      userManager.signUp("Alice Johnson", "alice@example.com");
      userManager.login("alice@example.com");
    });

    it("should treat email lookup as case-sensitive (uppercase should fail)", () => {
      expect(() => userManager.login("ALICE@EXAMPLE.COM")).toThrow();
    });
  });
});

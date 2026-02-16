import { isValidEmail, isValidName } from "../src/common/validators";
import { User } from "../src/User";

describe("User", () => {
  describe("creation", () => {
    it("should create a user with valid name and email", () => {
      const user = new User("John Doe", "john@example.com");
      expect(user._name).toBe("John Doe");
      expect(user._email).toBe("john@example.com");
    });

    it("should expose name and email as strings", () => {
      const user = new User("John Doe", "john@example.com");
      expect(typeof user._name).toBe("string");
      expect(typeof user._email).toBe("string");
    });
  });

  describe("email validation", () => {
    it("should throw when given an invalid email", () => {
      expect(() => new User("Jane Doe", "invalid-email")).toThrow();
    });

    it("should throw when given an empty email", () => {
      expect(() => new User("Test User", "")).toThrow();
    });
  });

  describe("name validation", () => {
    it("should throw when given an empty name", () => {
      expect(() => new User("", "test@example.com")).toThrow();
    });
  });

  describe("EmailValidator standalone", () => {
    it("should validate a correct email", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
    });

    it("should reject an invalid email", () => {
      expect(isValidEmail("invalid-email")).toBe(false);
    });
  });

  describe("NameValidator standalone", () => {
    it("should validate a correct name", () => {
      expect(isValidName("John Doe")).toBe(true);
    });
  });
});

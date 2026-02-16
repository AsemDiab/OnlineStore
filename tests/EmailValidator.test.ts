import { isValidEmail } from "../src/common/validators";

describe("EmailValidator / isValidEmail", () => {
  describe("valid emails", () => {
    const validEmails = [
      "test@example.com",
      "user.name@domain.co.uk",
      "user+tag@example.org",
      "user_name@example-domain.com",
      "user123@test-domain.com",
      "a@b.c",
    ];

    it.each(validEmails)("should accept valid email: %s", (email) => {
      expect(isValidEmail(email)).toBe(true);
    });
  });

  describe("invalid emails", () => {
    const invalidEmails = [
      "invalid-email", // No @ symbol
      "@domain.com", // No local part
      "user@", // No domain
      "user@domain", // No TLD
      "user..name@example.com", // Double dots in local
      "user@domain..com", // Double dots in domain
      "user name@example.com", // Space in local part
      "user@domain .com", // Space in domain
      "", // Empty string
      "a@b", // Too short
    ];

    it.each(invalidEmails)('should reject invalid email: "%s"', (email) => {
      expect(isValidEmail(email)).toBe(false);
    });
  });

  describe("edge cases", () => {
    it("should trim whitespace and still validate", () => {
      expect(isValidEmail("  test@example.com  ")).toBe(true);
    });

    it("should accept minimum-length email (a@b.c)", () => {
      expect(isValidEmail("a@b.c")).toBe(true);
    });

    it("should accept uppercase emails", () => {
      expect(isValidEmail("TEST@EXAMPLE.COM")).toBe(true);
    });
  });

  describe("format validation", () => {
    const formatCases: [string, string][] = [
      ["user.name@example.com", "dot in local part"],
      ["user+tag@example.com", "plus sign in local part"],
      ["user_name@example-domain.com", "underscore and hyphen"],
      ["user123@example.com", "numbers in local part"],
      ["user@sub.domain.com", "subdomain"],
      ["user@domain.co.uk", "multiple TLD levels"],
    ];

    it.each(formatCases)("should accept %s (%s)", (email) => {
      expect(isValidEmail(email)).toBe(true);
    });
  });
});

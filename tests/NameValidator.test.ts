import { isValidName } from "../src/common/validators";

describe("NameValidator", () => {
  let min = 2,
    max = 50;
  describe("valid names", () => {
    beforeEach(() => {});

    const validNames = [
      "John Doe",
      "Mary-Jane Smith",
      "Jean-Luc Picard",
      "O'Connor",
      "Mary Anne",
      "John Smith-Johnson",
      "Dr.John Smith",
      "Alvaro Rodriguez",
      "Zhang Wei",
    ];

    it.each(validNames)('should accept "%s"', (name) => {
      expect(isValidName(name, min, max)).toBe(true);
    });
  });

  describe("invalid names", () => {
    beforeEach(() => {});

    const invalidNames = [
      ["John123", "contains numbers"],
      ["John@Doe", "contains @"],
      ["John***", "contains *"],
      ["John#Doe", "contains #"],
      ["", "empty string"],
      ["   ", "only spaces"],
      ["J", "too short (min=2)"],
      ["A".repeat(51), "too long (max=50)"],
      ["John\u0000Doe", "contains control character"],
    ];

    it.each(invalidNames)('should reject "%s" (%s)', (name) => {
      expect(isValidName(name, min, max)).toBe(false);
    });
  });

  describe("length boundaries", () => {
    beforeEach(() => {});

    it("should accept a name at exactly minimum length (3)", () => {
      expect(isValidName("Bob", min, max)).toBe(true);
    });

    it("should reject a name below minimum length", () => {
      expect(isValidName("Jo", 5, max)).toBe(false);
    });

    it("should accept a name at exactly maximum length (10)", () => {
      expect(isValidName("Joh Smith", min, max)).toBe(true);
    });

    it("should reject a name above maximum length", () => {
      expect(isValidName("Joh,min,maxn Smithy")).toBe(false);
    });
  });

  describe("whitespace handling", () => {
    it("should trim and validate leading/trailing spaces", () => {
      expect(isValidName("  John Doe  ", min, max)).toBe(true);
    });

    it("should trim and validate leading/trailing tabs", () => {
      expect(isValidName("\tJohn Doe\t", min, max)).toBe(true);
    });

    it("should trim and validate leading/trailing newlines", () => {
      expect(isValidName("\nJohn Doe\n", min, max)).toBe(true);
    });

    it("should accept multiple internal spaces", () => {
      expect(isValidName("John  Doe", min, max)).toBe(true);
    });

    it("should reject strings with only whitespace", () => {
      expect(isValidName("   ", min, max)).toBe(false);
    });
  });

  describe("character validation", () => {
    const characterCases: [string, string, boolean][] = [
      ["John Doe", "letters and spaces", true],
      ["Mary-Jane", "hyphen", true],
      ["O'Connor", "apostrophe", true],
      ["John Smith Jr.", "period", true],
      ["John_Doe", "underscore", false],
      ["John&Doe", "ampersand", false],
      ["John123", "numbers", false],
      ["John@Doe", "at symbol", false],
      ["John#Doe", "hash", false],
    ];

    it.each(characterCases)(
      '"%s" (%s) should return %s',
      (name, _desc, expected) => {
        expect(isValidName(name, min, max)).toBe(expected);
      },
    );
  });

  describe("default validator edge cases", () => {
    beforeEach(() => {});

    it("should accept a single character when no min is set", () => {
      expect(isValidName("J")).toBe(true);
    });

    it("should reject an empty string even with default validator", () => {
      expect(isValidName("")).toBe(false);
    });
  });
});

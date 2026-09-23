import { describe, expect, it } from "bun:test";
import {
  BOOK_CATEGORIES,
  curriculumBooks,
  filterCurriculumBooks,
  getAllCurriculumBooks,
  getCurriculumBookById,
} from "./curriculum-books";

describe("curriculum-books data integrity", () => {
  it("should contain a rich collection of curriculum books", () => {
    const books = getAllCurriculumBooks();
    expect(books.length).toBeGreaterThanOrEqual(10);
  });

  it("should have all required fields for each book", () => {
    for (const book of curriculumBooks) {
      expect(book.id).toBeDefined();
      expect(book.title.length).toBeGreaterThan(0);
      expect(book.author.length).toBeGreaterThan(0);
      expect(book.publisher.length).toBeGreaterThan(0);
      expect(book.category).toBeDefined();
      expect(book.level).toBeDefined();
      expect(book.targetGrades.length).toBeGreaterThan(0);
      expect(book.description.length).toBeGreaterThan(0);
      expect(book.curriculumRelevance.length).toBeGreaterThan(0);
      expect(book.highlights.length).toBeGreaterThan(0);
      expect(book.coverColor.bg).toBeDefined();
    }
  });

  it("should find a book by its unique ID", () => {
    const book = getCurriculumBookById("genclik-ilmihali");
    expect(book).toBeDefined();
    expect(book?.title).toBe("Gençlik İlmihali");
    expect(book?.author).toContain("Ahmet Başak");

    const nonExistent = getCurriculumBookById("unknown-book-xyz");
    expect(nonExistent).toBeUndefined();
  });

  it("should filter books by category", () => {
    const ilmihalBooks = filterCurriculumBooks({ category: "ilmihal" });
    expect(ilmihalBooks.length).toBeGreaterThan(0);
    expect(ilmihalBooks.every((b) => b.category === "ilmihal")).toBe(true);

    const risaleBooks = filterCurriculumBooks({ category: "risale-i-nur" });
    expect(risaleBooks.length).toBeGreaterThan(0);
    expect(risaleBooks.every((b) => b.category === "risale-i-nur")).toBe(true);
  });

  it("should filter books by level and grade", () => {
    const ortaokulBooks = filterCurriculumBooks({ level: "ortaokul" });
    expect(ortaokulBooks.length).toBeGreaterThan(0);

    const grade1Books = filterCurriculumBooks({ grade: 1 });
    expect(grade1Books.length).toBeGreaterThan(0);
    expect(grade1Books.every((b) => b.targetGrades.includes(1))).toBe(true);
  });

  it("should search books by query term", () => {
    const searchResults = filterCurriculumBooks({ query: "abdest" });
    expect(searchResults.length).toBeGreaterThan(0);
    expect(
      searchResults.some(
        (b) =>
          b.title.toLowerCase().includes("abdest") ||
          b.description.toLowerCase().includes("abdest") ||
          b.highlights.some((h) => h.toLowerCase().includes("abdest"))
      )
    ).toBe(true);
  });

  it("should define valid book categories matching BOOK_CATEGORIES", () => {
    expect(BOOK_CATEGORIES.length).toBeGreaterThan(5);
    const categoryIds = BOOK_CATEGORIES.map((c) => c.id);
    expect(categoryIds).toContain("all");
    expect(categoryIds).toContain("ilmihal");
    expect(categoryIds).toContain("risale-i-nur");
    expect(categoryIds).toContain("hadis-sunnet");
  });
});

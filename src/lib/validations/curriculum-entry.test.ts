import { describe, expect, it } from "bun:test";
import {
  weekNumberToSlot,
  slotToWeekNumber,
  weeklyPackageSchema,
  WEEKLY_CONTENT_CATEGORIES,
  type WeeklyEntryInput,
} from "./curriculum-entry";

describe("curriculum-entry validations and slot mapping", () => {
  it("maps week numbers 1..36 to correct month and week", () => {
    expect(weekNumberToSlot(1)).toEqual({
      weekNumber: 1,
      month: 9,
      week: 1,
      year: 2026,
      monthSlug: "eylul",
    });

    expect(weekNumberToSlot(2)).toEqual({
      weekNumber: 2,
      month: 9,
      week: 2,
      year: 2026,
      monthSlug: "eylul",
    });

    expect(weekNumberToSlot(5)).toEqual({
      weekNumber: 5,
      month: 10,
      week: 1,
      year: 2026,
      monthSlug: "ekim",
    });

    expect(weekNumberToSlot(36)).toEqual({
      weekNumber: 36,
      month: 5,
      week: 4,
      year: 2027,
      monthSlug: "mayis",
    });
  });

  it("maps month and week back to correct week number", () => {
    expect(slotToWeekNumber(9, 1)).toBe(1);
    expect(slotToWeekNumber(9, 2)).toBe(2);
    expect(slotToWeekNumber(10, 1)).toBe(5);
    expect(slotToWeekNumber(5, 4)).toBe(36);
  });

  it("validates a compliant 12-entry weekly package", () => {
    const slot = weekNumberToSlot(3);
    const entries: WeeklyEntryInput[] = [];

    for (let grade = 1; grade <= 6; grade++) {
      for (const cat of WEEKLY_CONTENT_CATEGORIES) {
        entries.push({
          id: `g${grade}-${cat}-${slot.monthSlug}-${slot.week}`,
          grade,
          categoryId: cat,
          month: slot.month,
          week: slot.week,
          year: slot.year,
          title: `${grade}. Sınıf ${cat} dersi`,
          body:
            cat === "konu"
              ? `# Başlık\n\n> **Arapça**\n> **Meal**\n\n<u>Kelime</u> metinde.\n\n# Bana Ne Söylüyor?\n\n- Çıkarım.\n\n# Bu Hafta Tanıştığımız Kelimeler\n\n**Kelime** — Tanım.`
              : `# Başlık\n\nİçerik metni burada yer alıyor en az yirmi karakter.`,
          isDraft: true,
        });
      }
    }

    const res = weeklyPackageSchema.safeParse({
      weekNumber: 3,
      entries,
    });

    expect(res.success).toBe(true);

    const hadith = entries.find((entry) => entry.categoryId === "hocaefendi-dinleme")!;
    hadith.body =
      "**تَعَلَّمَ**\n\nTürkçesi: Öğrendi.\n\n## Kelime Açıklaması\n\n**taallame** — Öğrendi.";
    const invalid = weeklyPackageSchema.safeParse({ weekNumber: 3, entries });
    expect(invalid.success).toBe(false);
    if (!invalid.success) {
      expect(
        invalid.error.issues.some((issue) => issue.message.includes("'taallame' Türkçe metinde"))
      ).toBe(true);
    }
  });

  it("rejects packages with missing categories or mismatched IDs", () => {
    const slot = weekNumberToSlot(1);
    const incompleteEntries: WeeklyEntryInput[] = [
      {
        id: `g1-konu-${slot.monthSlug}-${slot.week}`,
        grade: 1,
        categoryId: "konu",
        month: slot.month,
        week: slot.week,
        year: slot.year,
        title: "Konu Başlığı",
        body: "# Başlık\n\n# Bana Ne Söylüyor?\n\n# Bu Hafta Tanıştığımız Kelimeler",
        isDraft: true,
      },
    ];

    const res = weeklyPackageSchema.safeParse({
      weekNumber: 1,
      entries: incompleteEntries,
    });

    expect(res.success).toBe(false);
  });
});

import fs from "fs";
import path from "path";

const TRANSCRIPTS_CSV = path.resolve(process.cwd(), "mufredat-docs/kozmoz-transcripts/index.csv");
const PROFILES_JSON = path.resolve(process.cwd(), "scripts/tefekkur-profiles.json");
const TARGET_TS = path.resolve(process.cwd(), "src/lib/data/tefekkur-curriculum.ts");

interface VideoProfile {
  title: string;
  summary: string;
  body: string;
}

const profiles: Record<string, VideoProfile> = JSON.parse(fs.readFileSync(PROFILES_JSON, "utf8"));

// Read index.csv
const csvContent = fs.readFileSync(TRANSCRIPTS_CSV, "utf8").trim();
const csvLines = csvContent.split("\n");
csvLines.shift(); // remove header

const videoUrls: Record<number, string> = {};
for (let i = 0; i < csvLines.length; i++) {
  const line = csvLines[i];
  const row: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let c = 0; c < line.length; c++) {
    const ch = line[c];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      row.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  row.push(current.trim());

  const num = i + 1;
  const videoId = row[2];
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  videoUrls[num] = watchUrl;
}

const assignments: Record<number, number[]> = {
  1: [
    55, 163, 10, 71, 1, 68, 11, 16, 6, 19, 38, 20, 44, 7, 15, 64, 12, 39, 18, 43, 14, 139, 48, 145,
    122, 21, 13, 17, 70, 67, 69, 3, 27, 72, 23, 25,
  ],
  2: [
    24, 164, 54, 42, 46, 105, 9, 63, 85, 75, 56, 50, 40, 52, 4, 199, 32, 33, 37, 115, 127, 142, 90,
    148, 124, 22, 34, 26, 62, 65, 61, 66, 28, 77, 29, 30,
  ],
  3: [
    8, 31, 82, 41, 78, 88, 76, 79, 45, 47, 74, 83, 97, 86, 98, 99, 123, 100, 103, 104, 49, 80, 89,
    91, 150, 147, 143, 152, 138, 136, 141, 134, 73, 87, 92, 81,
  ],
  4: [
    200, 194, 101, 102, 2, 53, 166, 84, 5, 175, 137, 51, 121, 144, 140, 125, 119, 117, 155, 112, 36,
    126, 120, 35, 176, 151, 94, 146, 149, 116, 111, 114, 113, 93, 95, 96,
  ],
  5: [
    184, 183, 172, 174, 58, 167, 161, 188, 186, 170, 156, 157, 154, 153, 159, 162, 165, 160, 158,
    169, 173, 171, 187, 195, 135, 177, 178, 179, 180, 181, 182, 185, 189, 190, 191, 192,
  ],
  6: [
    199, 106, 107, 108, 109, 110, 118, 59, 60, 193, 196, 197, 198, 168, 57, 128, 129, 130, 131, 132,
    133, 200, 171, 88, 150, 170, 186, 164, 161, 173, 12, 39, 55, 50, 191, 184,
  ],
};

function getSlot(weekNumber: number) {
  const monthIndex = Math.floor((weekNumber - 1) / 4);
  const month = ((monthIndex + 8) % 12) + 1;
  const year = monthIndex < 4 ? 2026 : 2027;
  const weekInMonth = ((weekNumber - 1) % 4) + 1;
  return { month, weekInMonth, year };
}

interface ItemOutput {
  weekNumber: number;
  grade: number;
  month: number;
  weekInMonth: number;
  year: number;
  title: string;
  summary: string;
  body: string;
  youtubeUrl: string;
}

const allItems: ItemOutput[] = [];
for (let grade = 1; grade <= 6; grade++) {
  const vlist = assignments[grade];
  for (let w = 1; w <= 36; w++) {
    const vnum = vlist[w - 1];
    const prof = profiles[String(vnum)];
    if (!prof) throw new Error(`Missing profile for video ${vnum}`);
    const url = videoUrls[vnum];
    if (!url) throw new Error(`Missing url for video ${vnum}`);
    const { month, weekInMonth, year } = getSlot(w);
    allItems.push({
      weekNumber: w,
      grade,
      month,
      weekInMonth,
      year,
      title: prof.title,
      summary: prof.summary,
      body: prof.body,
      youtubeUrl: url,
    });
  }
}

allItems.sort((a, b) =>
  a.weekNumber !== b.weekNumber ? a.weekNumber - b.weekNumber : a.grade - b.grade
);

let tsCode = `import type { CurriculumEntry } from "@/lib/curriculum";

export interface TefekkurCurriculumItem {
  readonly weekNumber: number;
  readonly grade: number;
  readonly month: number;
  readonly weekInMonth: number;
  readonly year: number;
  readonly title: string;
  readonly summary: string;
  readonly body: string;
  readonly youtubeUrl: string;
}

const monthSlugs: Record<number, string> = {
  1: "ocak",
  2: "subat",
  3: "mart",
  4: "nisan",
  5: "mayis",
  6: "haziran",
  7: "temmuz",
  8: "agustos",
  9: "eylul",
  10: "ekim",
  11: "kasim",
  12: "aralik",
};

function makeTefekkurEntryId(month: number, week: number, grade: number = 1): string {
  const prefix = grade === 1 ? "" : \`g\${grade}-\`;
  const monthSlug = monthSlugs[month] ?? \`m\${month}\`;
  return \`\${prefix}tefekkur-\${monthSlug}-\${week}\`;
}

export const tefekkurCurriculumItems: readonly TefekkurCurriculumItem[] = [
`;

for (const item of allItems) {
  tsCode += `  {
    weekNumber: ${item.weekNumber},
    grade: ${item.grade},
    month: ${item.month},
    weekInMonth: ${item.weekInMonth},
    year: ${item.year},
    title: ${JSON.stringify(item.title)},
    summary:
      ${JSON.stringify(item.summary)},
    body: ${JSON.stringify(item.body)},
    youtubeUrl: ${JSON.stringify(item.youtubeUrl)},
  },
`;
}

tsCode += `];

/**
 * Belirtilen sınıf (1-6) için 36 haftalık Tefekkür müfredat girişlerini üretir.
 */
export function getTefekkurEntriesForGrade(grade: number): CurriculumEntry[] {
  const gradeItems = tefekkurCurriculumItems.filter((item) => item.grade === grade);

  return gradeItems.map((item) => {
    const id = makeTefekkurEntryId(item.month, item.weekInMonth, grade);
    return {
      id,
      grade,
      categoryId: "tefekkur",
      month: item.month,
      week: item.weekInMonth,
      year: item.year,
      isExtra: false,
      title: item.title,
      body: item.body,
      resourceUrl: item.youtubeUrl,
    };
  });
}

/**
 * 6 Belçika sınıfının tamamı için toplam 216 Tefekkür kaydını döner.
 */
export function getAllTefekkurEntries(): CurriculumEntry[] {
  const all: CurriculumEntry[] = [];
  for (let grade = 1; grade <= 6; grade++) {
    all.push(...getTefekkurEntriesForGrade(grade));
  }
  return all;
}
`;

fs.writeFileSync(TARGET_TS, tsCode, "utf8");
console.log(`Successfully generated ${allItems.length} tefekkur items into ${TARGET_TS}`);

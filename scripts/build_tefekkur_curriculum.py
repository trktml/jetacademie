import csv
import json
import os
from scripts.tefekkur_profiles import VIDEO_PROFILES

TRANSCRIPTS_CSV = "mufredat-docs/kozmoz-transcripts/index.csv"
TARGET_TS = "src/lib/data/tefekkur-curriculum.ts"

# Read video URLs from index.csv
video_urls = {}
with open(TRANSCRIPTS_CSV, mode="r", encoding="utf-8") as f:
    reader = csv.reader(f)
    header = next(reader)
    for idx, row in enumerate(reader, start=1):
        if not row:
            continue
        url = row[1].strip()
        video_id = row[2].strip()
        # Ensure watch?v= format
        if "shorts/" in url:
            watch_url = f"https://www.youtube.com/watch?v={video_id}"
        else:
            watch_url = url
        video_urls[idx] = watch_url

print(f"Loaded {len(video_urls)} video URLs from {TRANSCRIPTS_CSV}")

assignments = {
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
}

def get_slot(week_number: int):
    month_index = (week_number - 1) // 4
    month = ((month_index + 8) % 12) + 1
    year = 2026 if month_index < 4 else 2027
    week_in_month = ((week_number - 1) % 4) + 1
    return month, week_in_month, year

all_items = []
for grade in range(1, 7):
    vlist = assignments[grade]
    for w in range(1, 37):
        vnum = vlist[w - 1]
        prof = VIDEO_PROFILES[vnum]
        url = video_urls[vnum]
        month, week_in_month, year = get_slot(w)
        all_items.append({
            "weekNumber": w,
            "grade": grade,
            "month": month,
            "weekInMonth": week_in_month,
            "year": year,
            "title": prof["title"],
            "summary": prof["summary"],
            "body": prof["body"],
            "youtubeUrl": url,
        })

# Sort items by weekNumber then grade
all_items.sort(key=lambda x: (x["weekNumber"], x["grade"]))

print(f"Generated {len(all_items)} total items.")

ts_lines = [
    'import type { CurriculumEntry } from "@/lib/curriculum";',
    '',
    'export interface TefekkurCurriculumItem {',
    '  readonly weekNumber: number;',
    '  readonly grade: number;',
    '  readonly month: number;',
    '  readonly weekInMonth: number;',
    '  readonly year: number;',
    '  readonly title: string;',
    '  readonly summary: string;',
    '  readonly body: string;',
    '  readonly youtubeUrl: string;',
    '}',
    '',
    'const monthSlugs: Record<number, string> = {',
    '  1: "ocak",',
    '  2: "subat",',
    '  3: "mart",',
    '  4: "nisan",',
    '  5: "mayis",',
    '  6: "haziran",',
    '  7: "temmuz",',
    '  8: "agustos",',
    '  9: "eylul",',
    '  10: "ekim",',
    '  11: "kasim",',
    '  12: "aralik",',
    '};',
    '',
    'function makeTefekkurEntryId(month: number, week: number, grade: number = 1): string {',
    '  const prefix = grade === 1 ? "" : `g${grade}-`;',
    '  const monthSlug = monthSlugs[month] ?? `m${month}`;',
    '  return `${prefix}tefekkur-${monthSlug}-${week}`;',
    '}',
    '',
    'export const tefekkurCurriculumItems: readonly TefekkurCurriculumItem[] = [',
]

for item in all_items:
    ts_lines.append('  {')
    ts_lines.append(f'    weekNumber: {item["weekNumber"]},')
    ts_lines.append(f'    grade: {item["grade"]},')
    ts_lines.append(f'    month: {item["month"]},')
    ts_lines.append(f'    weekInMonth: {item["weekInMonth"]},')
    ts_lines.append(f'    year: {item["year"]},')
    ts_lines.append(f'    title: {json.dumps(item["title"], ensure_ascii=False)},')
    ts_lines.append('    summary:')
    ts_lines.append(f'      {json.dumps(item["summary"], ensure_ascii=False)},')
    ts_lines.append(f'    body: {json.dumps(item["body"], ensure_ascii=False)},')
    ts_lines.append(f'    youtubeUrl: {json.dumps(item["youtubeUrl"], ensure_ascii=False)},')
    ts_lines.append('  },')

ts_lines.extend([
    '];',
    '',
    '/**',
    ' * Belirtilen sınıf (1-6) için 36 haftalık Tefekkür müfredat girişlerini üretir.',
    ' */',
    'export function getTefekkurEntriesForGrade(grade: number): CurriculumEntry[] {',
    '  const gradeItems = tefekkurCurriculumItems.filter((item) => item.grade === grade);',
    '',
    '  return gradeItems.map((item) => {',
    '    const id = makeTefekkurEntryId(item.month, item.weekInMonth, grade);',
    '    return {',
    '      id,',
    '      grade,',
    '      categoryId: "tefekkur",',
    '      month: item.month,',
    '      week: item.weekInMonth,',
    '      year: item.year,',
    '      isExtra: false,',
    '      title: item.title,',
    '      body: item.body,',
    '      resourceUrl: item.youtubeUrl,',
    '    };',
    '  });',
    '}',
    '',
    '/**',
    ' * 6 Belçika sınıfının tamamı için toplam 216 Tefekkür kaydını döner.',
    ' */',
    'export function getAllTefekkurEntries(): CurriculumEntry[] {',
    '  const all: CurriculumEntry[] = [];',
    '  for (let grade = 1; grade <= 6; grade++) {',
    '    all.push(...getTefekkurEntriesForGrade(grade));',
    '  }',
    '  return all;',
    '}',
    '',
])

with open(TARGET_TS, "w", encoding="utf-8") as f:
    f.write("\n".join(ts_lines))

print(f"Successfully generated {len(all_items)} items into {TARGET_TS}")

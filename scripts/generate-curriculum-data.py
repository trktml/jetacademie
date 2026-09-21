import json
import zipfile
import xml.etree.ElementTree as ET

def parse_ayet(path):
    with zipfile.ZipFile(path) as z:
        tree = ET.fromstring(z.read("word/document.xml"))
    paras = []
    for p in tree.iter("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p"):
        t = "".join(node.text for node in p.iter("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t") if node.text)
        if t.strip():
            paras.append(t.strip())
            
    entries = []
    i = 0
    while i < len(paras):
        p = paras[i]
        if len(p) >= 4 and p[:2].isdigit() and p[2:4] in [". ", ".\t"]:
            week_num = int(p[:2])
            topic = p[4:].strip()
            ref = paras[i+1] if i+1 < len(paras) else ""
            idx = i + 2
            arabic = ""
            meal = ""
            aciklama = ""
            
            curr_sec = None
            while idx < len(paras):
                if len(paras[idx]) >= 4 and paras[idx][:2].isdigit() and paras[idx][2:4] in [". ", ".\t"]:
                    break
                if paras[idx] == "Ayetin Arapça Metni":
                    curr_sec = "arabic"
                    idx += 1
                    continue
                elif paras[idx] == "Suat Yıldırım Meali":
                    curr_sec = "meal"
                    idx += 1
                    continue
                elif paras[idx] == "Açıklama":
                    curr_sec = "aciklama"
                    idx += 1
                    continue
                
                if curr_sec == "arabic":
                    arabic = (arabic + "\n" + paras[idx]).strip() if arabic else paras[idx]
                elif curr_sec == "meal":
                    meal = (meal + "\n" + paras[idx]).strip() if meal else paras[idx]
                elif curr_sec == "aciklama":
                    aciklama = (aciklama + "\n" + paras[idx]).strip() if aciklama else paras[idx]
                idx += 1
            
            title = f"{ref} — {topic}"
            body = f"{arabic}\n\nMeâl (Suat Yıldırım):\n\"{meal}\"\n\nAçıklama:\n{aciklama}"
            
            entries.append({
                "weekNumber": week_num,
                "surahVerse": ref,
                "topic": topic,
                "arabic": arabic,
                "translation": meal,
                "explanation": aciklama,
                "title": title,
                "body": body
            })
            i = idx
        else:
            i += 1
    return entries

def parse_hadis(docx_path):
    with zipfile.ZipFile(docx_path) as z:
        rels_tree = ET.fromstring(z.read("word/_rels/document.xml.rels"))
        rels = {}
        for rel in rels_tree:
            if "hyperlink" in rel.attrib.get("Type", ""):
                rels[rel.attrib["Id"]] = rel.attrib.get("Target", "")
        doc_tree = ET.fromstring(z.read("word/document.xml"))
    
    paras_with_links = []
    for p in doc_tree.iter("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p"):
        t = "".join(node.text for node in p.iter("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t") if node.text)
        t = t.strip()
        link_target = None
        for hl in p.iter("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}hyperlink"):
            r_id = hl.attrib.get("{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id")
            if r_id in rels:
                link_target = rels[r_id]
        if t:
            paras_with_links.append((t, link_target))
            
    entries = []
    i = 0
    while i < len(paras_with_links):
        text, link = paras_with_links[i]
        if text.upper().startswith("HAFTA ") and len(text) >= 7 and text[6:8].isdigit():
            week_num = int(text[6:8])
            topic = paras_with_links[i+1][0] if i+1 < len(paras_with_links) else ""
            idx = i + 2
            
            arabic = ""
            turkish = ""
            source = ""
            authenticity = ""
            verify_url = ""
            
            curr_sec = None
            while idx < len(paras_with_links):
                p_text, p_link = paras_with_links[idx]
                if p_text.upper().startswith("HAFTA ") and len(p_text) >= 7 and p_text[6:8].isdigit():
                    break
                if p_text == "Arapça metin":
                    curr_sec = "arabic"
                    idx += 1
                    continue
                elif p_text == "Türkçe anlamı":
                    curr_sec = "turkish"
                    idx += 1
                    continue
                elif p_text == "Kaynak":
                    curr_sec = "source"
                    idx += 1
                    continue
                elif p_text == "Sıhhat":
                    curr_sec = "authenticity"
                    idx += 1
                    continue
                elif p_text == "Doğrulama":
                    curr_sec = "verify"
                    idx += 1
                    continue
                
                if curr_sec == "arabic":
                    arabic = (arabic + "\n" + p_text).strip() if arabic else p_text
                elif curr_sec == "turkish":
                    turkish = (turkish + "\n" + p_text).strip() if turkish else p_text
                elif curr_sec == "source":
                    source = (source + "\n" + p_text).strip() if source else p_text
                elif curr_sec == "authenticity":
                    authenticity = (authenticity + "\n" + p_text).strip() if authenticity else p_text
                elif curr_sec == "verify":
                    if p_link:
                        verify_url = p_link
                    elif not verify_url and p_text.startswith("http"):
                        verify_url = p_text
                idx += 1
            
            title = topic
            body = f"{arabic}\n\nTürkçe Anlamı:\n\"{turkish}\"\n\nKaynak: {source} ({authenticity})"
            
            entries.append({
                "weekNumber": week_num,
                "topic": topic,
                "arabic": arabic,
                "turkish": turkish,
                "source": source,
                "authenticity": authenticity,
                "verifyUrl": verify_url,
                "title": title,
                "body": body
            })
            i = idx
        else:
            i += 1
            
    return entries

def generate_ayet_ts(ortaokul, lise):
    return f"""import type {{ CurriculumEntry }} from "@/lib/curriculum";

const monthSlugs: Record<number, string> = {{
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
}};

function makeAyetEntryId(
  month: number,
  week: number,
  grade: number = 1,
  isExtra: boolean = false,
  extraOrder?: number
): string {{
  const prefix = grade === 1 ? "" : `g${{grade}}-`;
  if (isExtra) {{
    return `${{prefix}}ayet-extra-${{extraOrder ?? 1}}`;
  }}
  const monthSlug = monthSlugs[month] ?? `m${{month}}`;
  return `${{prefix}}ayet-${{monthSlug}}-${{week}}`;
}}

export interface AyetCurriculumItem {{
  weekNumber: number;
  surahVerse: string;
  topic: string;
  arabic: string;
  translation: string;
  explanation: string;
  title: string;
  body: string;
}}

/**
 * Ortaokul (1., 2. ve 3. Sınıflar) için 55 haftalık Ayet Kütüphanesi müfredatı
 * Kaynak: mufredat-docs/ayet/01_ORTAOKUL_AYET_KUTUPHANESI_55.docx
 */
export const ortaokulAyetCurriculum: readonly AyetCurriculumItem[] = {json.dumps(ortaokul, indent=2, ensure_ascii=False)} as const;

/**
 * Lise (4., 5. ve 6. Sınıflar) için 55 haftalık Ayet Kütüphanesi müfredatı
 * Kaynak: mufredat-docs/ayet/01_LISE_AYET_KUTUPHANESI_55.docx
 */
export const liseAyetCurriculum: readonly AyetCurriculumItem[] = {json.dumps(lise, indent=2, ensure_ascii=False)} as const;

/**
 * Belirtilen sınıf (1-6) için 55 haftalık Ayet müfredat girişlerini üretir.
 * - 1, 2, 3. sınıflar: Ortaokul müfredatı
 * - 4, 5, 6. sınıflar: Lise müfredatı
 * - Hafta 1-16: Eylül - Aralık 2026 (4 ay x 4 hafta)
 * - Hafta 17-48: Ocak - Ağustos 2027 (8 ay x 4 hafta)
 * - Hafta 49-55: Ekstra 1-7 (48 haftalık standart müfredat kuralı sonrası ilave kartlar)
 */
export function getAyetEntriesForGrade(grade: number): CurriculumEntry[] {{
  const items = grade <= 3 ? ortaokulAyetCurriculum : liseAyetCurriculum;

  return items.map((item) => {{
    if (item.weekNumber <= 48) {{
      const monthIndex = Math.floor((item.weekNumber - 1) / 4); // 0..11
      const month = monthIndex < 4 ? 9 + monthIndex : monthIndex - 3;
      const year = monthIndex < 4 ? 2026 : 2027;
      const weekInMonth = ((item.weekNumber - 1) % 4) + 1;
      const id = makeAyetEntryId(month, weekInMonth, grade, false);

      return {{
        id,
        grade,
        categoryId: "ayet",
        month,
        week: weekInMonth,
        year,
        isExtra: false,
        title: item.title,
        body: item.body,
      }};
    }}

    const extraOrder = item.weekNumber - 48; // 1..7
    const id = makeAyetEntryId(8, 4, grade, true, extraOrder);

    return {{
      id,
      grade,
      categoryId: "ayet",
      month: 8,
      week: 4,
      year: 2027,
      isExtra: true,
      extraOrder,
      title: item.title,
      body: item.body,
    }};
  }});
}}

/**
 * 6 Belçika sınıfı için tüm Ayet kayıtlarını döner (toplam 330 kayıt).
 */
export function getAllAyetEntries(): CurriculumEntry[] {{
  const all: CurriculumEntry[] = [];
  for (let grade = 1; grade <= 6; grade++) {{
    all.push(...getAyetEntriesForGrade(grade));
  }}
  return all;
}}
"""

def generate_hadis_ts(ortaokul, lise):
    return f"""import type {{ CurriculumEntry }} from "@/lib/curriculum";

const monthSlugs: Record<number, string> = {{
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
}};

function makeHadisEntryId(
  month: number,
  week: number,
  grade: number = 1,
  isExtra: boolean = false,
  extraOrder?: number
): string {{
  const prefix = grade === 1 ? "" : `g${{grade}}-`;
  if (isExtra) {{
    return `${{prefix}}hadis-extra-${{extraOrder ?? 1}}`;
  }}
  const monthSlug = monthSlugs[month] ?? `m${{month}}`;
  return `${{prefix}}hadis-${{monthSlug}}-${{week}}`;
}}

export interface HadisCurriculumItem {{
  weekNumber: number;
  topic: string;
  arabic: string;
  turkish: string;
  source: string;
  authenticity: string;
  verifyUrl: string;
  title: string;
  body: string;
}}

/**
 * Ortaokul (1., 2. ve 3. Sınıflar) için 55 haftalık Hadis programı
 * Kaynak: mufredat-docs/hadis/ORTAOKUL_55_HAFTALIK_HADIS_PROGRAMI_FINAL.docx
 */
export const ortaokulHadisCurriculum: readonly HadisCurriculumItem[] = {json.dumps(ortaokul, indent=2, ensure_ascii=False)} as const;

/**
 * Lise (4., 5. ve 6. Sınıflar) için 55 haftalık Hadis programı
 * Kaynak: mufredat-docs/hadis/LISE_55_HAFTALIK_HADIS_PROGRAMI_FINAL.docx
 */
export const liseHadisCurriculum: readonly HadisCurriculumItem[] = {json.dumps(lise, indent=2, ensure_ascii=False)} as const;

/**
 * Belirtilen sınıf (1-6) için 55 haftalık Hadis müfredat girişlerini üretir.
 * - 1, 2, 3. sınıflar: Ortaokul müfredatı
 * - 4, 5, 6. sınıflar: Lise müfredatı
 * - Hafta 1-16: Eylül - Aralık 2026 (4 ay x 4 hafta)
 * - Hafta 17-48: Ocak - Ağustos 2027 (8 ay x 4 hafta)
 * - Hafta 49-55: Ekstra 1-7 (48 haftalık standart müfredat kuralı sonrası ilave kartlar)
 */
export function getHadisEntriesForGrade(grade: number): CurriculumEntry[] {{
  const items = grade <= 3 ? ortaokulHadisCurriculum : liseHadisCurriculum;

  return items.map((item) => {{
    if (item.weekNumber <= 48) {{
      const monthIndex = Math.floor((item.weekNumber - 1) / 4); // 0..11
      const month = monthIndex < 4 ? 9 + monthIndex : monthIndex - 3;
      const year = monthIndex < 4 ? 2026 : 2027;
      const weekInMonth = ((item.weekNumber - 1) % 4) + 1;
      const id = makeHadisEntryId(month, weekInMonth, grade, false);

      return {{
        id,
        grade,
        categoryId: "hadis",
        month,
        week: weekInMonth,
        year,
        isExtra: false,
        title: item.title,
        body: item.body,
        resourceUrl: item.verifyUrl,
      }};
    }}

    const extraOrder = item.weekNumber - 48; // 1..7
    const id = makeHadisEntryId(8, 4, grade, true, extraOrder);

    return {{
      id,
      grade,
      categoryId: "hadis",
      month: 8,
      week: 4,
      year: 2027,
      isExtra: true,
      extraOrder,
      title: item.title,
      body: item.body,
      resourceUrl: item.verifyUrl,
    }};
  }});
}}

/**
 * 6 Belçika sınıfı için tüm Hadis kayıtlarını döner (toplam 330 kayıt).
 */
export function getAllHadisEntries(): CurriculumEntry[] {{
  const all: CurriculumEntry[] = [];
  for (let grade = 1; grade <= 6; grade++) {{
    all.push(...getHadisEntriesForGrade(grade));
  }}
  return all;
}}
"""

def parse_esma(docx_path):
    with zipfile.ZipFile(docx_path) as z:
        tree = ET.fromstring(z.read("word/document.xml"))
    paras = []
    for p in tree.iter("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p"):
        t = "".join(node.text for node in p.iter("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t") if node.text)
        if t.strip():
            paras.append(t.strip())
            
    entries = []
    for i in range(1, len(paras), 2):
        head = paras[i]
        body = paras[i+1] if i+1 < len(paras) else ""
        dot_idx = head.find(".")
        if dot_idx != -1 and head[:dot_idx].strip().isdigit():
            week_num = int(head[:dot_idx].strip())
            rest = head[dot_idx+1:].strip()
        else:
            week_num = len(entries) + 1
            rest = head

        if "—" in rest:
            parts = rest.split("—", 1)
            name = parts[0].strip()
            meaning = parts[1].strip()
        elif "-" in rest:
            parts = rest.split("-", 1)
            name = parts[0].strip()
            meaning = parts[1].strip()
        else:
            name = rest
            meaning = ""

        title = rest
        entries.append({
            "weekNumber": week_num,
            "name": name,
            "meaning": meaning,
            "title": title,
            "body": body
        })
    return entries

def generate_esma_ts(ortaokul, lise):
    return f"""import type {{ CurriculumEntry }} from "@/lib/curriculum";

const monthSlugs: Record<number, string> = {{
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
}};

function makeEsmaEntryId(
  month: number,
  week: number,
  grade: number = 1,
  isExtra: boolean = false,
  extraOrder?: number
): string {{
  const prefix = grade === 1 ? "" : `g${{grade}}-`;
  if (isExtra) {{
    return `${{prefix}}esma-extra-${{extraOrder ?? 1}}`;
  }}
  const monthSlug = monthSlugs[month] ?? `m${{month}}`;
  return `${{prefix}}esma-${{monthSlug}}-${{week}}`;
}}

export interface EsmaCurriculumItem {{
  weekNumber: number;
  name: string;
  meaning: string;
  title: string;
  body: string;
}}

/**
 * Ortaokul (1., 2. ve 3. Sınıflar) için 55 haftalık Esmâü'l-Hüsnâ müfredatı
 * Kaynak: mufredat-docs/esma/01_ESMAUL_HUSNA_55_GUN_ORTAOKUL_PROGRAMI.docx
 */
export const ortaokulEsmaCurriculum: readonly EsmaCurriculumItem[] = {json.dumps(ortaokul, indent=2, ensure_ascii=False)} as const;

/**
 * Lise (4., 5. ve 6. Sınıflar) için 55 haftalık Esmâü'l-Hüsnâ müfredatı
 * Kaynak: mufredat-docs/esma/02_ESMAUL_HUSNA_55_GUN_LISE_PROGRAMI.docx
 */
export const liseEsmaCurriculum: readonly EsmaCurriculumItem[] = {json.dumps(lise, indent=2, ensure_ascii=False)} as const;

/**
 * Belirtilen sınıf (1-6) için 55 haftalık Esmâü'l-Hüsnâ müfredat girişlerini üretir.
 * - 1, 2, 3. sınıflar: Ortaokul müfredatı
 * - 4, 5, 6. sınıflar: Lise müfredatı
 * - Hafta 1-16: Eylül - Aralık 2026 (4 ay x 4 hafta)
 * - Hafta 17-48: Ocak - Ağustos 2027 (8 ay x 4 hafta)
 * - Hafta 49-55: Ekstra 1-7 (48 haftalık standart müfredat kuralı sonrası ilave kartlar)
 */
export function getEsmaEntriesForGrade(grade: number): CurriculumEntry[] {{
  const items = grade <= 3 ? ortaokulEsmaCurriculum : liseEsmaCurriculum;

  return items.map((item) => {{
    if (item.weekNumber <= 48) {{
      const monthIndex = Math.floor((item.weekNumber - 1) / 4); // 0..11
      const month = monthIndex < 4 ? 9 + monthIndex : monthIndex - 3;
      const year = monthIndex < 4 ? 2026 : 2027;
      const weekInMonth = ((item.weekNumber - 1) % 4) + 1;
      const id = makeEsmaEntryId(month, weekInMonth, grade, false);

      return {{
        id,
        grade,
        categoryId: "esma",
        month,
        week: weekInMonth,
        year,
        isExtra: false,
        title: item.title,
        body: item.body,
      }};
    }}

    const extraOrder = item.weekNumber - 48; // 1..7
    const id = makeEsmaEntryId(8, 4, grade, true, extraOrder);

    return {{
      id,
      grade,
      categoryId: "esma",
      month: 8,
      week: 4,
      year: 2027,
      isExtra: true,
      extraOrder,
      title: item.title,
      body: item.body,
    }};
  }});
}}

/**
 * 6 Belçika sınıfı için tüm Esmâü'l-Hüsnâ kayıtlarını döner (toplam 330 kayıt).
 */
export function getAllEsmaEntries(): CurriculumEntry[] {{
  const all: CurriculumEntry[] = [];
  for (let grade = 1; grade <= 6; grade++) {{
    all.push(...getEsmaEntriesForGrade(grade));
  }}
  return all;
}}
"""

if __name__ == "__main__":
    ortaokul_ayet = parse_ayet("mufredat-docs/ayet/01_ORTAOKUL_AYET_KUTUPHANESI_55.docx")
    lise_ayet = parse_ayet("mufredat-docs/ayet/01_LISE_AYET_KUTUPHANESI_55.docx")
    
    with open("src/lib/data/ayet-curriculum.ts", "w", encoding="utf-8") as f:
        f.write(generate_ayet_ts(ortaokul_ayet, lise_ayet))
    print("Wrote src/lib/data/ayet-curriculum.ts successfully.")

    ortaokul_hadis = parse_hadis("mufredat-docs/hadis/ORTAOKUL_55_HAFTALIK_HADIS_PROGRAMI_FINAL.docx")
    lise_hadis = parse_hadis("mufredat-docs/hadis/LISE_55_HAFTALIK_HADIS_PROGRAMI_FINAL.docx")
    
    with open("src/lib/data/hadis-curriculum.ts", "w", encoding="utf-8") as f:
        f.write(generate_hadis_ts(ortaokul_hadis, lise_hadis))
    print("Wrote src/lib/data/hadis-curriculum.ts successfully.")

    ortaokul_esma = parse_esma("mufredat-docs/esma/01_ESMAUL_HUSNA_55_GUN_ORTAOKUL_PROGRAMI.docx")
    lise_esma = parse_esma("mufredat-docs/esma/02_ESMAUL_HUSNA_55_GUN_LISE_PROGRAMI.docx")
    
    with open("src/lib/data/esma-curriculum.ts", "w", encoding="utf-8") as f:
        f.write(generate_esma_ts(ortaokul_esma, lise_esma))
    print("Wrote src/lib/data/esma-curriculum.ts successfully.")

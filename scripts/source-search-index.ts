import { Database } from "bun:sqlite";

const INDEX_VERSION = 2;

/** Search normalization only: original source text remains untouched. */
export function normalizeSearchText(text: string): string {
  return text.normalize("NFD").toLowerCase().replace(/\p{M}/gu, "").replace(/ı/g, "i");
}

interface SourceChunk {
  id: string;
  file_path: string;
  book_title: string;
  category: string;
  page_number: number;
  content: string;
}

function edgeKey(line: string): string {
  const key = normalizeSearchText(line)
    .replace(/[^\p{L}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
  return key.length >= 3 && key.length <= 100 ? key : "";
}

function edges(content: string): string[] {
  const lines = content.split("\n").filter((line) => line.trim());
  return [...lines.slice(0, 2), ...lines.slice(-2)];
}

function bodyBounds(content: string, repeated: Set<string>): [number, number] {
  const lines = [...content.matchAll(/[^\n]+/g)];
  const boilerplate = (line: string) => !/\p{L}/u.test(line) || repeated.has(edgeKey(line));
  let first = 0;
  let last = lines.length - 1;
  while (first <= last && boilerplate(lines[first][0])) first++;
  while (last >= first && boilerplate(lines[last][0])) last--;
  // Keep header-only pages searchable in the low-weight full-text column.
  return first > last ? [0, 0] : [lines[first].index!, lines[last].index! + lines[last][0].length];
}

function isContentsPage(content: string): boolean {
  const normalized = normalizeSearchText(content);
  const lines = normalized.split("\n");
  const leaders = lines.filter((line) => /(?:\.{3,}|…{2,}|·{3,})\s*\d+\s*$/.test(line));
  if (leaders.length >= 3) return true;
  // Some PDFs extract each contents entry as three lines: number, dot, title.
  const isolatedNumbers = lines.filter((line) => /^\s*\d{1,4}\s*$/.test(line)).length;
  const isolatedDots = lines.filter((line) => line.trim() === ".").length;
  if (isolatedNumbers >= 8 && isolatedDots >= isolatedNumbers * 0.8) return true;
  if (content.length >= 6000 || !/\bicindekiler\b/.test(normalized)) return false;
  return lines.filter((line) => /\s\d+\s*$/.test(line) && /\p{L}/u.test(line)).length >= 3;
}

/** Derived from extracted chunks; no PDFs are reread and no source text is rewritten. */
export function ensureSearchIndex(db: Database): void {
  db.exec("PRAGMA busy_timeout = 30000");
  db.exec(`
    CREATE TABLE IF NOT EXISTS source_search_state (version INTEGER NOT NULL, dirty INTEGER NOT NULL);
    CREATE TRIGGER IF NOT EXISTS source_search_insert AFTER INSERT ON corpus_chunks
      BEGIN UPDATE source_search_state SET dirty = 1; END;
    CREATE TRIGGER IF NOT EXISTS source_search_update AFTER UPDATE ON corpus_chunks
      BEGIN UPDATE source_search_state SET dirty = 1; END;
    CREATE TRIGGER IF NOT EXISTS source_search_delete AFTER DELETE ON corpus_chunks
      BEGIN UPDATE source_search_state SET dirty = 1; END;
  `);
  const state = db.query("SELECT version, dirty FROM source_search_state").get() as {
    version: number;
    dirty: number;
  } | null;
  if (state?.version === INDEX_VERSION && !state.dirty) return;

  db.transaction(() => {
    // Recheck after acquiring the write lock in case another CLI built the index.
    const current = db.query("SELECT version, dirty FROM source_search_state").get() as {
      version: number;
      dirty: number;
    } | null;
    if (current?.version === INDEX_VERSION && !current.dirty) return;
    db.exec(`
      DROP TABLE IF EXISTS source_search_fts;
      CREATE VIRTUAL TABLE source_search_fts USING fts5(
        body, content,
        chunk_id UNINDEXED, book_title UNINDEXED, category UNINDEXED,
        file_path UNINDEXED, page_number UNINDEXED, is_contents UNINDEXED,
        body_start UNINDEXED, body_end UNINDEXED,
        tokenize='unicode61 remove_diacritics 2'
      );
    `);
    const rows = db
      .query(
        "SELECT id, file_path, book_title, category, page_number, content FROM corpus_chunks ORDER BY file_path, page_number, chunk_index"
      )
      .all() as SourceChunk[];
    const documents = Map.groupBy(rows, (row) => row.file_path);
    const insert = db.prepare(
      "INSERT INTO source_search_fts (body, content, chunk_id, book_title, category, file_path, page_number, is_contents, body_start, body_end) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    for (const chunks of documents.values()) {
      const occurrences = new Map<string, Set<number>>();
      const pageCount = new Set(chunks.map((chunk) => chunk.page_number)).size;
      for (const chunk of chunks) {
        for (const line of edges(chunk.content)) {
          const key = edgeKey(line);
          if (!key) continue;
          const pages = occurrences.get(key) ?? new Set<number>();
          pages.add(chunk.page_number);
          occurrences.set(key, pages);
        }
      }
      const repeated = new Set(
        [...occurrences]
          .filter(([, pages]) => pages.size >= Math.max(3, Math.ceil(pageCount * 0.25)))
          .map(([key]) => key)
      );
      for (const chunk of chunks) {
        const [start, end] = bodyBounds(chunk.content, repeated);
        insert.run(
          normalizeSearchText(chunk.content.slice(start, end)),
          normalizeSearchText(chunk.content),
          chunk.id,
          chunk.book_title,
          chunk.category,
          chunk.file_path,
          chunk.page_number,
          Number(isContentsPage(chunk.content)),
          start,
          end
        );
      }
    }
    db.exec("DELETE FROM source_search_state");
    db.prepare("INSERT INTO source_search_state VALUES (?, 0)").run(INDEX_VERSION);
  }).immediate();
}

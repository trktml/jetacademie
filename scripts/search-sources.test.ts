import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { Database } from "bun:sqlite";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";
import { foldTurkish, sanitizeFtsQuery, resolveBookTitle } from "./search-sources";
import { ensureSearchIndex } from "./source-search-index";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "jetacademie-search-test-"));
const dbPath = path.join(directory, "sources.sqlite");
const db = new Database(dbPath);
const sources = [
  {
    id: "toc",
    page: 1,
    content:
      "İçindekiler\nNamaz..........................2\nDua..........................3\nİhlâs..........................4\nIşık..........................5",
  },
  {
    id: "prayer",
    page: 2,
    content:
      "NAMAZ\nİnsan namaz ile huzur bulur. Namaz kalbi dinlendirir ve insanı iyiliğe yöneltir.",
  },
  {
    id: "phrase",
    page: 3,
    content: "NAMAZ\nİhlâs ve samimiyet insanın niyetini güzelleştirir. İman insana umut verir.",
  },
  {
    id: "light",
    page: 4,
    content:
      "NAMAZ\nIşık karanlığı aydınlatır. IŞIK insana yol gösterir. Işığın kıymeti karanlıkta anlaşılır.",
  },
  {
    id: "header-only",
    page: 5,
    content: "NAMAZ\nAğaçlar ilkbaharda çiçek açar. Bahçede kuşlar öter, çocuklar oynar.",
  },
  {
    id: "non-adjacent",
    page: 6,
    content: "İhlâs insanın niyetini güzelleştirir. Zamanla samimiyet ve güven gelişir.",
  },
  {
    id: "reversed",
    page: 7,
    content: "Samimiyet ve ihlâs birbirini tamamlar. İnsanların iyiliği ortak bir sorumluluktur.",
  },
  {
    id: "fragmented-toc",
    page: 8,
    content:
      "1\n.\nNamaz\n2\n.\nDua\n3\n.\nNiyet\n4\n.\nİhlâs\n5\n.\nGüven\n6\n.\nSabır\n7\n.\nÜmit\n8\n.\nTefekkür",
  },
];

beforeAll(() => {
  db.exec(`
    CREATE TABLE corpus_documents (id TEXT PRIMARY KEY, category TEXT, book_title TEXT, file_path TEXT, total_pages INTEGER);
    CREATE TABLE corpus_chunks (id TEXT PRIMARY KEY, doc_id TEXT, category TEXT, book_title TEXT, file_path TEXT, page_number INTEGER, chunk_index INTEGER, content TEXT);
    INSERT INTO corpus_documents VALUES ('sozler', 'risale', 'SOZLER', 'sources/sozler.pdf', 8);
    INSERT INTO corpus_documents VALUES ('irsad', 'pirlanta', 'İrsad Ekseni', 'sources/irsad.pdf', 1);
    INSERT INTO corpus_chunks VALUES ('pirlanta', 'irsad', 'pirlanta', 'İrsad Ekseni', 'sources/irsad.pdf', 1, 0, 'Samimiyet güzel niyetin dışa yansımasıdır. İnsanlar birbirine güven duyar.');
  `);
  const insert = db.prepare(
    "INSERT INTO corpus_chunks VALUES (?, 'sozler', 'risale', 'SOZLER', 'sources/sozler.pdf', ?, 0, ?)"
  );
  for (const source of sources) insert.run(source.id, source.page, source.content);
  ensureSearchIndex(db);
});

afterAll(() => {
  db.close();
  fs.rmSync(directory, { recursive: true, force: true });
});

interface SearchOutput {
  total: number;
  expanded: boolean;
  matchMode: string;
  effectiveQuery: string;
  results: {
    id: string;
    category: string;
    bookTitle: string;
    pageNumber: number;
    snippet: string;
  }[];
}

async function cli(...args: string[]) {
  const child = Bun.spawn(["bun", path.join(import.meta.dir, "search-sources.ts"), ...args], {
    env: { ...process.env, SOURCES_DB_PATH: dbPath },
    stdout: "pipe",
    stderr: "pipe",
  });
  const [stdout, stderr, code] = await Promise.all([
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
    child.exited,
  ]);
  expect(stderr).toBe("");
  expect(code).toBe(0);
  return stdout;
}

async function search(query: string, ...args: string[]): Promise<SearchOutput> {
  return JSON.parse(await cli("-q", query, "-n", "50", "--json", ...args));
}

describe("source search accuracy", () => {
  it("folds Turkish spelling, case and decomposed Unicode consistently", () => {
    expect(foldTurkish("İHLÂS / ışık / göz / ağaç / ümit")).toBe("ihlasisikgozagacumit");
    expect(foldTurkish("IŞIK")).toBe(foldTurkish("ışık".normalize("NFD")));
    expect(foldTurkish("LEM'ALAR")).toBe("lemalar");
  });

  it("resolves normalized book titles", () => {
    expect(resolveBookTitle(db, "Sözler")).toBe("SOZLER");
    expect(resolveBookTitle(db, "irşad ekseni")).toBe("İrsad Ekseni");
    expect(resolveBookTitle(db, "unknown")).toBeNull();
  });

  it("ignores stop words in ordinary queries and safely handles punctuation", () => {
    expect(sanitizeFtsQuery("namaz ve dua nedir")).toBe('"namaz"* AND "dua"*');
    expect(sanitizeFtsQuery("  !!! ** ")).toBe("");
    expect(sanitizeFtsQuery("şükür".normalize("NFD"))).toBe('"sukur"*');
  });

  it("finds the same passages with Turkish, ASCII and uppercase spelling", async () => {
    const outputs = await Promise.all([search("ışık"), search("isik"), search("IŞIK")]);
    expect(outputs[0].total).toBeGreaterThan(0);
    expect(outputs.map((output) => output.results.map((row) => row.id))).toEqual([
      outputs[0].results.map((row) => row.id),
      outputs[0].results.map((row) => row.id),
      outputs[0].results.map((row) => row.id),
    ]);
    expect(outputs[0].results[0].snippet).toContain("**Işık**");
  });

  it("handles common compound suffixes and consonant softening", async () => {
    expect((await search("insanlarımızın")).results.some((row) => row.id === "prayer")).toBe(true);
    expect((await search("ışığın")).results.some((row) => row.id === "light")).toBe(true);
    expect(sanitizeFtsQuery("namazı")).toContain('"namaz"*');
  });

  it("keeps stop words and order inside quoted phrases", async () => {
    const output = await search('"ihlâs ve samimiyet"');
    expect(output.results.map((row) => row.id)).toEqual(["phrase"]);
    expect(output.matchMode).toBe("phrase");
    expect(output.expanded).toBe(false);
    expect(output.results[0].snippet).toContain("**İhlâs** **ve** **samimiyet**");
  });

  it("supports --exact and typographic quotation marks", async () => {
    expect((await search("ihlâs ve samimiyet", "--exact")).results.map((row) => row.id)).toEqual([
      "phrase",
    ]);
    expect((await search("“ihlâs ve samimiyet”")).results.map((row) => row.id)).toEqual(["phrase"]);
  });

  it("does not stem or prefix-match exact phrase words", async () => {
    expect((await search("insan", "--exact")).results.map((row) => row.id)).not.toContain(
      "reversed"
    );
    expect((await search('"ihlâs samimiyet"')).total).toBe(0);
  });

  it("requires both the quoted phrase and remaining terms", async () => {
    expect((await search('"ihlâs ve samimiyet" iman')).results.map((row) => row.id)).toEqual([
      "phrase",
    ]);
    const absent = await search('"ihlâs ve samimiyet" gökyüzü');
    expect(absent.total).toBe(0);
    expect(absent.expanded).toBe(false);
  });

  it("labels expanded results in JSON and terminal output", async () => {
    const output = await search("namaz bulunmayankelime");
    expect(output.total).toBeGreaterThan(0);
    expect(output.expanded).toBe(true);
    expect(output.matchMode).toBe("expanded");
    expect(output.effectiveQuery).toContain(" OR ");
    expect(await cli("-q", "namaz bulunmayankelime", "-n", "1")).toContain(
      "Genişletilmiş sonuçlar"
    );
  });

  it("never expands a failed exact query", async () => {
    const output = await search("namaz bulunmayankelime", "--exact");
    expect(output.total).toBe(0);
    expect(output.expanded).toBe(false);
    expect(output.matchMode).toBe("phrase");
  });

  it("ranks substantive text above contents pages and running-header-only matches", async () => {
    const output = await search("namaz");
    const ids = output.results.map((row) => row.id);
    expect(ids[0]).toBe("prayer");
    expect(ids.indexOf("prayer")).toBeLessThan(ids.indexOf("toc"));
    expect(ids.indexOf("prayer")).toBeLessThan(ids.indexOf("fragmented-toc"));
    expect(ids.indexOf("prayer")).toBeLessThan(ids.indexOf("header-only"));
    expect(ids).toContain("toc");
    expect(ids).toContain("fragmented-toc");
    expect(ids).toContain("header-only");
  });

  it("preserves filters, pagination and empty JSON responses", async () => {
    const filtered = await search("samimiyet", "-c", "pirlanta");
    expect(filtered.results.length).toBeGreaterThan(0);
    expect(filtered.results.every((row) => row.category === "pirlanta")).toBe(true);
    expect(
      (await search("ihlas", "-b", "Sözler", "--page", "3")).results.map((row) => row.id)
    ).toEqual(["phrase"]);
    const all = await search("namaz");
    expect((await search("namaz", "-n", "1", "-o", "1")).results[0].id).toBe(all.results[1].id);
    expect((await search("!!!")).results).toEqual([]);
  });

  it("leaves original source text and page reads unchanged", async () => {
    const read = JSON.parse(await cli("--read", "Sözler", "--page", "3", "--json"));
    expect(read.content).toBe(sources.find((source) => source.id === "phrase")!.content);
    expect(db.query("SELECT content FROM corpus_chunks WHERE id = 'phrase'").get()).toEqual({
      content: read.content,
    });
    expect(JSON.parse(await cli("--stats", "--json")).totalDocs).toBe(2);
  });

  it("refreshes the derived index after chunk updates and deletions", () => {
    db.exec(
      "UPDATE corpus_chunks SET content = 'Doğruluk insanın sözünü güvenilir kılar.' WHERE id = 'header-only'"
    );
    ensureSearchIndex(db);
    expect(
      db
        .query(
          "SELECT chunk_id FROM source_search_fts WHERE source_search_fts MATCH '\"dogruluk\"'"
        )
        .all()
    ).toEqual([{ chunk_id: "header-only" }]);
    db.exec("DELETE FROM corpus_chunks WHERE id = 'header-only'");
    ensureSearchIndex(db);
    expect(
      db
        .query(
          "SELECT count(*) AS count FROM source_search_fts WHERE source_search_fts MATCH '\"dogruluk\"'"
        )
        .get()
    ).toEqual({ count: 0 });
  });
});

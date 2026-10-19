#!/usr/bin/env bun
/**
 * Fast Sources Search CLI for JetAcademie Curriculum & AI Agents
 * Searches extracted source text locally and returns short, original-text passages.
 *
 * Usage:
 *   bun scripts/search-sources.ts -q "ihlas" -n 5
 *   bun scripts/search-sources.ts -q "namaz hakikati" -c risale
 *   bun scripts/search-sources.ts -q "marifetullah" -b "Sözler"
 *   bun scripts/search-sources.ts --read "Lemalar" --page 160
 *   bun scripts/search-sources.ts --read "pirlanta_irsad_ekseni_p142_c0"
 *   bun scripts/search-sources.ts --stats
 */

import { Database } from "bun:sqlite";
import path from "node:path";
import fs from "node:fs";
import { ensureSearchIndex, normalizeSearchText } from "./source-search-index";

// Resolve SQLite Database path
function resolveDbPath(): string {
  if (process.env.SOURCES_DB_PATH) return process.env.SOURCES_DB_PATH;
  const preferred = path.join(process.cwd(), "data", "sources-search.sqlite");
  if (fs.existsSync(preferred)) return preferred;
  const fallback = path.join(process.cwd(), "data", "corpus-search.sqlite");
  if (fs.existsSync(fallback)) return fallback;
  return preferred;
}

const TURKISH_STOP_WORDS = new Set([
  "nedir",
  "nelerdir",
  "nasil",
  "nasıl",
  "neden",
  "nicin",
  "niçin",
  "hakkinda",
  "hakkında",
  "ile",
  "ve",
  "veya",
  "bir",
  "bu",
  "su",
  "şu",
  "için",
  "icin",
  "olan",
  "olarak",
  "gibi",
  "mi",
  "mı",
  "mu",
  "mü",
  "ne",
  "hangi",
]);

export function foldTurkish(str: string): string {
  return normalizeSearchText(str).replace(/[^a-z0-9]/g, "");
}

export function resolveBookTitle(db: Database, inputTitle: string): string | null {
  const foldedInput = foldTurkish(inputTitle);
  if (!foldedInput) return null;

  const rows = db.query("SELECT DISTINCT book_title FROM corpus_documents").all() as {
    book_title: string;
  }[];

  // Exact folded match
  for (const r of rows) {
    if (foldTurkish(r.book_title) === foldedInput) {
      return r.book_title;
    }
  }

  // Substring match
  for (const r of rows) {
    if (foldTurkish(r.book_title).includes(foldedInput)) {
      return r.book_title;
    }
  }

  return null;
}

function getTurkishStems(word: string): string[] {
  const w = normalizeSearchText(word);
  if (w.length < 5) return [w];
  const suffixes = [
    "larimizin",
    "lerimizin",
    "larinizin",
    "lerinizin",
    "larimiz",
    "lerimiz",
    "lariniz",
    "leriniz",
    "lerin",
    "ların",
    "lerden",
    "lardan",
    "lerde",
    "larda",
    "leri",
    "ları",
    "ler",
    "lar",
    "imizin",
    "ımızın",
    "ümüzün",
    "umuzun",
    "imiz",
    "ımız",
    "ümüz",
    "umuz",
    "iniz",
    "ınız",
    "ünüz",
    "unuz",
    "ndan",
    "nden",
    "ndaki",
    "ndeki",
    "dan",
    "den",
    "tan",
    "ten",
    "nin",
    "nın",
    "nün",
    "nun",
    "in",
    "ın",
    "ün",
    "un",
    "da",
    "de",
    "ta",
    "te",
    "ya",
    "ye",
    "yı",
    "yi",
    "yu",
    "yü",
    "la",
    "le",
    "yla",
    "yle",
    "ı",
    "i",
    "u",
    "ü",
  ]
    .map(normalizeSearchText)
    .sort((a, b) => b.length - a.length);
  const stems = new Set([w]);
  for (const suf of suffixes) {
    if (w.endsWith(suf) && w.length - suf.length >= 4) {
      const stem = w.slice(0, -suf.length);
      stems.add(stem);
      // Common consonant softening: ışığın -> ışık, kitabı -> kitap.
      const hardConsonant = new Map([
        ["b", "p"],
        ["g", "k"],
        ["d", "t"],
      ]).get(stem.at(-1)!);
      if (hardConsonant) {
        stems.add(stem.slice(0, -1) + hardConsonant);
      }
      break;
    }
  }
  return Array.from(stems);
}

interface SearchTerm {
  words: string[];
  phrase: boolean;
}

function searchTerms(rawQuery: string, exact = false): SearchTerm[] {
  const tokenize = (text: string) => normalizeSearchText(text).match(/[\p{L}\p{N}]+/gu) ?? [];
  if (exact) {
    const words = tokenize(rawQuery);
    return words.length ? [{ words, phrase: true }] : [];
  }
  const terms: SearchTerm[] = [];
  for (const match of rawQuery.normalize("NFC").matchAll(/"([^"]*)"|“([^”]*)”|([^\s"“”]+)/gu)) {
    const quoted = match[1] ?? match[2];
    const words = tokenize(quoted ?? match[3]);
    if (quoted !== undefined) {
      if (words.length) terms.push({ words, phrase: true });
    } else {
      terms.push(...words.map((word) => ({ words: [word], phrase: false })));
    }
  }
  if (terms.length <= 1) return terms;
  const filtered = terms.filter((term) => term.phrase || !TURKISH_STOP_WORDS.has(term.words[0]));
  return filtered.length ? filtered : terms;
}

export function sanitizeFtsQuery(
  rawQuery: string,
  operator: "AND" | "OR" = "AND",
  exact = false
): string {
  return searchTerms(rawQuery, exact)
    .map((term) => {
      if (term.phrase) return `"${term.words.join(" ")}"`;
      const variants = getTurkishStems(term.words[0]).map((word) => `"${word}"*`);
      return variants.length > 1 ? `(${variants.join(" OR ")})` : variants[0];
    })
    .join(` ${operator} `);
}

/** Highlight normalized matches while returning the source's original spelling. */
function originalSnippet(content: string, terms: SearchTerm[], fallback?: string): string {
  const tokens = [...content.matchAll(/[\p{L}\p{N}\p{M}]+/gu)];
  if (!tokens.length) return fallback ? originalSnippet(fallback, terms) : content.slice(0, 240);
  const normalized = tokens.map((token) => normalizeSearchText(token[0]));
  const hits = new Set<number>();
  for (const term of terms) {
    if (term.phrase) {
      for (let i = 0; i <= tokens.length - term.words.length; i++) {
        if (term.words.every((word, j) => normalized[i + j] === word)) {
          term.words.forEach((_, j) => hits.add(i + j));
        }
      }
    } else {
      const stems = getTurkishStems(term.words[0]);
      normalized.forEach((word, i) => {
        if (stems.some((stem) => word.startsWith(stem))) hits.add(i);
      });
    }
  }
  if (!hits.size && fallback) return originalSnippet(fallback, terms);
  const width = 32;
  let best = 0;
  let bestHits = -1;
  for (const hit of hits) {
    const start = Math.max(0, hit - 6);
    const count = [...hits].filter((i) => i >= start && i < start + width).length;
    if (count > bestHits) {
      best = start;
      bestHits = count;
    }
  }
  const end = Math.min(tokens.length, best + width);
  const startChar = tokens[best].index!;
  const endChar = end < tokens.length ? tokens[end].index! : content.length;
  let snippet = "";
  let cursor = startChar;
  for (let i = best; i < end; i++) {
    if (!hits.has(i)) continue;
    const token = tokens[i];
    snippet += content.slice(cursor, token.index) + `**${token[0]}**`;
    cursor = token.index! + token[0].length;
  }
  snippet += content.slice(cursor, endChar);
  return `${best ? "..." : ""}${snippet.trim()}${end < tokens.length ? "..." : ""}`;
}

interface ChunkRow {
  id: string;
  book_title: string;
  category: string;
  page_number: number;
  content: string;
}

interface ParsedArgs {
  query?: string;
  category?: string;
  book?: string;
  limit: number;
  offset: number;
  readTarget?: string;
  page?: number;
  stats: boolean;
  json: boolean;
  help: boolean;
  exact: boolean;
}

function parseCliArgs(): ParsedArgs {
  const args = process.argv.slice(2);
  const result: ParsedArgs = {
    limit: 5,
    offset: 0,
    stats: false,
    json: false,
    help: false,
    exact: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "-q" || arg === "--query") {
      result.query = args[++i];
    } else if (arg === "-c" || arg === "--category") {
      result.category = args[++i]?.toLowerCase();
    } else if (arg === "-b" || arg === "--book") {
      result.book = args[++i];
    } else if (arg === "-n" || arg === "--limit") {
      result.limit = Math.min(Math.max(1, parseInt(args[++i] || "5", 10)), 50);
    } else if (arg === "-o" || arg === "--offset") {
      result.offset = Math.max(0, parseInt(args[++i] || "0", 10));
    } else if (arg === "-p" || arg === "--page") {
      result.page = parseInt(args[++i] || "0", 10);
    } else if (arg === "--read") {
      result.readTarget = args[++i];
    } else if (arg === "--stats") {
      result.stats = true;
    } else if (arg === "--json") {
      result.json = true;
    } else if (arg === "--exact") {
      result.exact = true;
    } else if (arg === "-h" || arg === "--help") {
      result.help = true;
    } else if (!result.query && !arg.startsWith("-")) {
      result.query = arg;
    }
  }

  return result;
}

function printUsage(): void {
  console.log(`
📚 Müfredat Kaynak Araştırma Motoru (JetAcademie Sources CLI)

Kullanım:
  bun scripts/search-sources.ts [seçenekler]

Arama Seçenekleri:
  -q, --query <metin>     Aranacak kelime veya kavram (örn: "ihlas hakikati")
  --exact                 Tüm sorguyu kelime sırası korunmuş tam ifade olarak arar
                          Sorgu içinde çift tırnak da kullanılabilir: '"ihlas ve samimiyet"'
  -c, --category <kat>    Kategori filtresi (pirlanta, risale veya all)
  -b, --book <başlık>     Kitap adına göre filtre (örn: "Sözler", "İrşad Ekseni")
  -n, --limit <sayı>      Gösterilecek sonuç sayısı (varsayılan: 5, maks: 50)
  -o, --offset <sayı>     Sayfalama başlangıç ofseti
  -p, --page <sayfa>      Sayfa numarası filtresi

Okuma Seçenekleri:
  --read <hedef>          Bir sayfanın tüm metnini okur.
                          Örnek: --read "Lemalar" --page 160
                          veya:  --read "risale_lemalar_p160_c0"

Diğer:
  --stats                 İndeks istatistiklerini gösterir (kitap ve pasaj sayısı)
  --json                  Sonuçları ham JSON olarak verir (programatik kullanım)
  -h, --help              Bu yardım mesajını gösterir
`);
}

function main() {
  const opts = parseCliArgs();

  if (opts.help) {
    printUsage();
    process.exit(0);
  }

  const dbPath = resolveDbPath();
  if (!fs.existsSync(dbPath)) {
    console.error(`\n❌ İndeks veritabanı bulunamadı: ${dbPath}`);
    console.error(`Lütfen önce indeksleme komutunu çalıştırın: bun run sources:index\n`);
    process.exit(1);
  }

  const db = new Database(dbPath);

  // Handle stats flag
  if (opts.stats) {
    const totalDocs = (
      db.query("SELECT COUNT(*) as count FROM corpus_documents").get() as { count: number }
    ).count;
    const totalChunks = (
      db.query("SELECT COUNT(*) as count FROM corpus_chunks").get() as { count: number }
    ).count;
    const cats = db
      .query("SELECT category, COUNT(*) as count FROM corpus_chunks GROUP BY category")
      .all() as { category: string; count: number }[];

    if (opts.json) {
      console.log(JSON.stringify({ totalDocs, totalChunks, categories: cats }, null, 2));
    } else {
      console.log(`\n📊 Kaynak İndeks İstatistikleri:`);
      console.log(`  Toplam Kitap: ${totalDocs}`);
      console.log(`  Toplam Pasaj/Chunk: ${totalChunks}`);
      console.log(`  Kategoriler:`);
      for (const cat of cats) {
        console.log(`    - ${cat.category.toUpperCase()}: ${cat.count} pasaj`);
      }
      console.log();
    }
    db.close();
    process.exit(0);
  }

  // Handle read target flag
  if (opts.readTarget) {
    let chunkRow: ChunkRow | null = null;

    if (opts.page && opts.page > 0) {
      const matchedTitle = resolveBookTitle(db, opts.readTarget);
      if (matchedTitle) {
        chunkRow = db
          .query(
            `
          SELECT id, book_title, category, page_number, content
          FROM corpus_chunks
          WHERE book_title = ? AND page_number = ?
          ORDER BY chunk_index ASC
          LIMIT 1
        `
          )
          .get(matchedTitle, opts.page) as ChunkRow | null;
      } else {
        chunkRow = db
          .query(
            `
          SELECT id, book_title, category, page_number, content
          FROM corpus_chunks
          WHERE book_title LIKE ? AND page_number = ?
          ORDER BY chunk_index ASC
          LIMIT 1
        `
          )
          .get(`%${opts.readTarget}%`, opts.page) as ChunkRow | null;
      }
    } else {
      // Find by chunk ID or book title
      chunkRow = db
        .query(
          `
        SELECT id, book_title, category, page_number, content
        FROM corpus_chunks
        WHERE id = ? OR id LIKE ?
        LIMIT 1
      `
        )
        .get(opts.readTarget, `%${opts.readTarget}%`) as ChunkRow | null;

      if (!chunkRow) {
        const matchedTitle = resolveBookTitle(db, opts.readTarget);
        if (matchedTitle) {
          chunkRow = db
            .query(
              `
            SELECT id, book_title, category, page_number, content
            FROM corpus_chunks
            WHERE book_title = ?
            ORDER BY page_number ASC, chunk_index ASC
            LIMIT 1
          `
            )
            .get(matchedTitle) as ChunkRow | null;
        }
      }
    }

    if (!chunkRow) {
      console.error(
        `\n❌ Sayfa bulunamadı: Hedef "${opts.readTarget}" ${opts.page ? `(Sayfa ${opts.page})` : ""}`
      );
      db.close();
      process.exit(1);
    }

    if (opts.json) {
      console.log(JSON.stringify(chunkRow, null, 2));
    } else {
      console.log(`\n============================================================`);
      console.log(
        `📖 [${chunkRow.category.toUpperCase()}] ${chunkRow.book_title} — Sayfa ${chunkRow.page_number}`
      );
      console.log(`Chunk ID: ${chunkRow.id}`);
      console.log(`============================================================\n`);
      console.log(chunkRow.content);
      console.log(`\n------------------------------------------------------------\n`);
    }
    db.close();
    process.exit(0);
  }

  // Handle search query
  if (!opts.query) {
    printUsage();
    db.close();
    process.exit(0);
  }

  const startTime = performance.now();
  const terms = searchTerms(opts.query, opts.exact);
  const hasPhrase = terms.some((term) => term.phrase);
  let ftsQuery = sanitizeFtsQuery(opts.query, "AND", opts.exact);

  if (!ftsQuery) {
    if (opts.json) {
      console.log(
        JSON.stringify({
          query: opts.query,
          total: 0,
          results: [],
          expanded: false,
          matchMode: "all",
          effectiveQuery: "",
          executionTimeMs: 0,
        })
      );
    } else {
      console.log(`\n⚠️  Geçerli bir arama terimi giriniz.\n`);
    }
    db.close();
    process.exit(0);
  }

  ensureSearchIndex(db);

  // Build filter criteria
  const whereClauses: string[] = ["source_search_fts MATCH ?"];
  const params: (string | number)[] = [ftsQuery];

  if (opts.category && opts.category !== "all") {
    whereClauses.push("category = ?");
    params.push(opts.category);
  }

  if (opts.book) {
    const matchedBook = resolveBookTitle(db, opts.book);
    if (matchedBook) {
      whereClauses.push("book_title = ?");
      params.push(matchedBook);
    } else {
      whereClauses.push("book_title LIKE ?");
      params.push(`%${opts.book}%`);
    }
  }

  if (opts.page && opts.page > 0) {
    whereClauses.push("CAST(page_number AS INTEGER) = ?");
    params.push(opts.page);
  }

  const whereSql = whereClauses.join(" AND ");

  // Count total matches
  const countRow = db
    .query(`SELECT COUNT(*) as count FROM source_search_fts WHERE ${whereSql}`)
    .get(...params) as { count: number };
  let total = countRow?.count ?? 0;
  let expanded = false;

  // Fallback to OR if multi-word query had 0 results
  if (total === 0 && !hasPhrase && terms.length > 1) {
    const orQuery = sanitizeFtsQuery(opts.query, "OR");
    if (orQuery && orQuery !== ftsQuery) {
      params[0] = orQuery;
      const orCount = db
        .query(`SELECT COUNT(*) as count FROM source_search_fts WHERE ${whereSql}`)
        .get(...params) as { count: number };
      if (orCount && orCount.count > 0) {
        ftsQuery = orQuery;
        total = orCount.count;
        expanded = true;
      }
    }
  }

  if (total === 0) {
    if (opts.json) {
      console.log(
        JSON.stringify({
          query: opts.query,
          total: 0,
          results: [],
          expanded,
          matchMode: hasPhrase ? "phrase" : "all",
          effectiveQuery: ftsQuery,
          executionTimeMs: Math.round(performance.now() - startTime),
        })
      );
    } else {
      console.log(`\n🔍 Arama: "${opts.query}"`);
      console.log(
        `Sonuç bulunamadı (0 eşleşme, ${Math.round(performance.now() - startTime)}ms).\n`
      );
    }
    db.close();
    process.exit(0);
  }

  // A full-text column keeps headers discoverable, with much less influence than body text.
  // Negative BM25 scores move closer to zero when contents pages are downweighted.
  const resultsSql = `
    SELECT 
      chunk_id as id,
      category,
      book_title as bookTitle,
      file_path as filePath,
      CAST(page_number AS INTEGER) as pageNumber,
      body_start as bodyStart,
      body_end as bodyEnd
    FROM source_search_fts
    WHERE ${whereSql}
    ORDER BY bm25(source_search_fts, 1.0, 0.05) * CASE WHEN is_contents = 1 THEN 0.05 ELSE 1.0 END,
      file_path, CAST(page_number AS INTEGER), chunk_id
    LIMIT ? OFFSET ?
  `;

  const resultsParams = [...params, opts.limit, opts.offset];
  const rows = db.query(resultsSql).all(...resultsParams) as {
    id: string;
    category: string;
    bookTitle: string;
    filePath: string;
    pageNumber: number;
    bodyStart: number;
    bodyEnd: number;
  }[];
  const getContent = db.query("SELECT content FROM corpus_chunks WHERE id = ?");
  const results = rows.map(({ bodyStart, bodyEnd, ...row }) => {
    const { content } = getContent.get(row.id) as { content: string };
    return { ...row, snippet: originalSnippet(content.slice(bodyStart, bodyEnd), terms, content) };
  });

  const executionTimeMs = Math.round(performance.now() - startTime);

  if (opts.json) {
    console.log(
      JSON.stringify(
        {
          query: opts.query,
          category: opts.category || "all",
          total,
          limit: opts.limit,
          offset: opts.offset,
          executionTimeMs,
          expanded,
          matchMode: expanded ? "expanded" : hasPhrase ? "phrase" : "all",
          effectiveQuery: ftsQuery,
          results,
        },
        null,
        2
      )
    );
  } else {
    console.log(
      `\n🎯 Arama: "${opts.query}" | Toplam: ${total} sonuç | Süre: ${executionTimeMs}ms\n`
    );
    if (expanded) {
      console.log(
        "⚠️  Genişletilmiş sonuçlar: tüm terimleri birlikte karşılayan pasaj bulunamadı. Aşağıdaki pasajlar terimlerden en az birini içerir.\n"
      );
    } else if (hasPhrase) {
      console.log("🔎 Tam ifade: tırnak içindeki kelimelerin sırası ve bütünlüğü korunur.\n");
    }

    results.forEach((r, idx) => {
      const num = opts.offset + idx + 1;
      const cleanSnippet = r.snippet.replace(/\n+/g, " ").trim();
      console.log(
        `${num}. **[${r.category.toUpperCase()} / ${r.bookTitle}]** — Sayfa ${r.pageNumber}`
      );
      console.log(`   > "${cleanSnippet}"`);
      console.log(
        `   👉 Tam sayfayı oku: bun scripts/search-sources.ts --read "${r.bookTitle}" --page ${r.pageNumber}`
      );
      console.log();
    });

    if (total > opts.limit) {
      const filters = [
        opts.exact ? "--exact" : "",
        opts.book ? `-b ${JSON.stringify(opts.book)}` : "",
        opts.category ? `-c ${opts.category}` : "",
        opts.page ? `--page ${opts.page}` : "",
      ]
        .filter(Boolean)
        .join(" ");
      console.log(
        `💡 Daha fazla sonuç için: bun scripts/search-sources.ts -q ${JSON.stringify(opts.query)} ${filters} -n ${opts.limit} -o ${opts.offset + opts.limit}\n`
      );
    }
  }

  db.close();
}

if (import.meta.main) {
  main();
}

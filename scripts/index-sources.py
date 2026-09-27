#!/usr/bin/env python3
"""
Sources Indexer for JetAcademie Curriculum Research
Recursively scans the local 'sources/' directory (Pırlantalar, Risaleler, and custom sources),
extracts text from PDFs, text, and markdown files, and builds an ultra-fast SQLite FTS5 index.
Designed for 0-token, instant AI curriculum research.
"""

import os
import sys
import glob
import re
import hashlib
import sqlite3
import argparse
import logging
from pathlib import Path
import unicodedata

# Suppress noisy pypdf logs
logging.getLogger("pypdf").setLevel(logging.CRITICAL)
import pypdf

ROOT_DIR = Path(__file__).resolve().parent.parent
SOURCES_DIR = ROOT_DIR / "sources"
DATA_DIR = ROOT_DIR / "data"
DEFAULT_DB_PATH = DATA_DIR / "sources-search.sqlite"

def sanitize_text(text: str) -> str:
    """Cleans and normalizes text extracted from sources."""
    if not text:
        return ""
    text = unicodedata.normalize("NFC", text)
    text = text.replace("\xa0", " ").replace("\r\n", "\n").replace("\r", "\n")
    # Join broken hyphenated words at line wraps (e.g. 'muka- \n vele' -> 'mukavele')
    text = re.sub(r'(\w+)-\s*\n\s*(\w+)', r'\1\2', text)
    # Collapse whitespace
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()

def init_db(db_path: Path) -> sqlite3.Connection:
    """Initializes the SQLite schema with documents, chunks, and FTS5 tables."""
    db_path.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(str(db_path))
    c = conn.cursor()

    c.execute("PRAGMA journal_mode = WAL;")
    c.execute("PRAGMA synchronous = NORMAL;")

    c.execute("""
    CREATE TABLE IF NOT EXISTS corpus_documents (
        id TEXT PRIMARY KEY,
        category TEXT NOT NULL,
        book_title TEXT NOT NULL,
        file_path TEXT NOT NULL,
        total_pages INTEGER NOT NULL,
        indexed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    c.execute("""
    CREATE TABLE IF NOT EXISTS corpus_chunks (
        id TEXT PRIMARY KEY,
        doc_id TEXT NOT NULL,
        category TEXT NOT NULL,
        book_title TEXT NOT NULL,
        file_path TEXT NOT NULL,
        page_number INTEGER NOT NULL,
        chunk_index INTEGER NOT NULL,
        content TEXT NOT NULL
    );
    """)

    fts_exists = c.execute("SELECT 1 FROM sqlite_master WHERE type='table' AND name='corpus_fts'").fetchone()
    if not fts_exists:
        c.execute("""
        CREATE VIRTUAL TABLE corpus_fts USING fts5(
            content,
            book_title,
            category UNINDEXED,
            page_number UNINDEXED,
            chunk_id UNINDEXED,
            file_path UNINDEXED,
            tokenize='unicode61 remove_diacritics 2'
        );
        """)

    conn.commit()
    return conn

def extract_book_title(file_path: Path) -> str:
    """Extracts a clean, human-readable title from the filename."""
    stem = unicodedata.normalize("NFC", file_path.stem)
    # Remove common author suffixes and publishing tags
    clean = re.sub(
        r'\s*-\s*(M\.\s*Fethullah\s*G[uü]len|Bedi[uü]zzaman\s*Said\s*Nursi|Ali\s*[UÜ]nal|isikyayinlari).*$',
        '',
        stem,
        flags=re.IGNORECASE
    )
    clean = clean.replace('_Optimized', '').replace('_', ' ').strip()
    return clean

def determine_category(file_path: Path, sources_root: Path) -> str:
    """Determines the category based on the relative folder path in sources/."""
    try:
        rel = file_path.relative_to(sources_root)
        parts = rel.parts
        if len(parts) > 1:
            first_dir = parts[0].lower()
            if "pırlanta" in first_dir or "pirlanta" in first_dir:
                return "pirlanta"
            if "risale" in first_dir:
                return "risale"
            return re.sub(r'[^a-zA-Z0-9_-]', '_', first_dir).strip('_')
    except Exception:
        pass
    return "kaynak"

def index_pdf_file(conn: sqlite3.Connection, pdf_path: Path, category: str, force: bool = False) -> int:
    """Extracts pages from a PDF file and inserts them into chunks and FTS5."""
    rel_path = str(pdf_path.relative_to(ROOT_DIR))
    book_title = extract_book_title(pdf_path)
    clean_stem = re.sub(r'[^a-zA-Z0-9_]', '', pdf_path.stem.lower())[:24]
    doc_hash = hashlib.sha1(rel_path.encode("utf-8")).hexdigest()[:10]
    doc_id = f"{category}_{clean_stem}_{doc_hash}"

    c = conn.cursor()
    # Fast check: skip if already indexed unless force is requested
    if not force:
        existing = c.execute("SELECT id FROM corpus_documents WHERE file_path = ?", (rel_path,)).fetchone()
        if existing:
            return 0

    try:
        reader = pypdf.PdfReader(str(pdf_path))
        num_pages = len(reader.pages)
    except Exception as e:
        print(f"  [ERROR] Cannot read PDF {pdf_path.name}: {e}")
        # Record unreadable PDF with 0 pages so it is skipped immediately on future runs
        c.execute("""
        INSERT OR REPLACE INTO corpus_documents (id, category, book_title, file_path, total_pages)
        VALUES (?, ?, ?, ?, 0)
        """, (doc_id, category, book_title, rel_path))
        conn.commit()
        return 0

    # Purge any previous version of this document by file_path
    c.execute("DELETE FROM corpus_documents WHERE file_path = ?", (rel_path,))
    c.execute("DELETE FROM corpus_chunks WHERE file_path = ?", (rel_path,))
    c.execute("DELETE FROM corpus_fts WHERE file_path = ?", (rel_path,))

    c.execute("""
    INSERT INTO corpus_documents (id, category, book_title, file_path, total_pages)
    VALUES (?, ?, ?, ?, ?)
    """, (doc_id, category, book_title, rel_path, num_pages))

    chunk_count = 0
    chunks_batch = []
    fts_batch = []

    for page_idx, page in enumerate(reader.pages):
        page_num = page_idx + 1
        try:
            raw_text = page.extract_text() or ""
        except Exception:
            raw_text = ""

        clean_text = sanitize_text(raw_text)
        if len(clean_text) < 30:
            continue

        paragraphs = clean_text.split("\n\n")
        current_chunk = []
        current_len = 0
        p_chunk_idx = 0

        for p in paragraphs:
            p = p.strip()
            if not p:
                continue
            if current_len + len(p) > 2200 and current_chunk:
                content = "\n\n".join(current_chunk)
                chunk_id = f"{doc_id}_p{page_num}_c{p_chunk_idx}"
                chunks_batch.append((chunk_id, doc_id, category, book_title, rel_path, page_num, p_chunk_idx, content))
                fts_batch.append((content, book_title, category, page_num, chunk_id, rel_path))
                chunk_count += 1
                p_chunk_idx += 1
                current_chunk = [p]
                current_len = len(p)
            else:
                current_chunk.append(p)
                current_len += len(p)

        if current_chunk:
            content = "\n\n".join(current_chunk)
            chunk_id = f"{doc_id}_p{page_num}_c{p_chunk_idx}"
            chunks_batch.append((chunk_id, doc_id, category, book_title, rel_path, page_num, p_chunk_idx, content))
            fts_batch.append((content, book_title, category, page_num, chunk_id, rel_path))
            chunk_count += 1

    if chunks_batch:
        c.executemany("""
        INSERT INTO corpus_chunks (id, doc_id, category, book_title, file_path, page_number, chunk_index, content)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, chunks_batch)

        c.executemany("""
        INSERT INTO corpus_fts (content, book_title, category, page_number, chunk_id, file_path)
        VALUES (?, ?, ?, ?, ?, ?)
        """, fts_batch)

    conn.commit()
    return chunk_count

def index_text_file(conn: sqlite3.Connection, text_path: Path, category: str, force: bool = False) -> int:
    """Indexes plain text or markdown files."""
    rel_path = str(text_path.relative_to(ROOT_DIR))
    book_title = extract_book_title(text_path)
    clean_stem = re.sub(r'[^a-zA-Z0-9_]', '', text_path.stem.lower())[:24]
    doc_hash = hashlib.sha1(rel_path.encode("utf-8")).hexdigest()[:10]
    doc_id = f"{category}_{clean_stem}_{doc_hash}"

    try:
        content = text_path.read_text(encoding="utf-8", errors="ignore")
    except Exception as e:
        print(f"  [ERROR] Cannot read text file {text_path.name}: {e}")
        return 0

    clean_content = sanitize_text(content)
    if len(clean_content) < 30:
        return 0

    c = conn.cursor()
    if not force:
        existing = c.execute("SELECT id FROM corpus_documents WHERE file_path = ?", (rel_path,)).fetchone()
        if existing:
            return 0

    c.execute("DELETE FROM corpus_documents WHERE file_path = ?", (rel_path,))
    c.execute("DELETE FROM corpus_chunks WHERE file_path = ?", (rel_path,))
    c.execute("DELETE FROM corpus_fts WHERE file_path = ?", (rel_path,))

    c.execute("""
    INSERT INTO corpus_documents (id, category, book_title, file_path, total_pages)
    VALUES (?, ?, ?, ?, ?)
    """, (doc_id, category, book_title, rel_path, 1))

    paragraphs = clean_content.split("\n\n")
    chunks_batch = []
    fts_batch = []
    current_chunk = []
    current_len = 0
    chunk_idx = 0

    for p in paragraphs:
        p = p.strip()
        if not p:
            continue
        if current_len + len(p) > 2200 and current_chunk:
            txt = "\n\n".join(current_chunk)
            cid = f"{doc_id}_c{chunk_idx}"
            chunks_batch.append((cid, doc_id, category, book_title, rel_path, 1, chunk_idx, txt))
            fts_batch.append((txt, book_title, category, 1, cid, rel_path))
            chunk_idx += 1
            current_chunk = [p]
            current_len = len(p)
        else:
            current_chunk.append(p)
            current_len += len(p)

    if current_chunk:
        txt = "\n\n".join(current_chunk)
        cid = f"{doc_id}_c{chunk_idx}"
        chunks_batch.append((cid, doc_id, category, book_title, rel_path, 1, chunk_idx, txt))
        fts_batch.append((txt, book_title, category, 1, cid, rel_path))
        chunk_idx += 1

    if chunks_batch:
        c.executemany("""
        INSERT INTO corpus_chunks (id, doc_id, category, book_title, file_path, page_number, chunk_index, content)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, chunks_batch)
        c.executemany("""
        INSERT INTO corpus_fts (content, book_title, category, page_number, chunk_id, file_path)
        VALUES (?, ?, ?, ?, ?, ?)
        """, fts_batch)

    conn.commit()
    return chunk_idx

def main():
    parser = argparse.ArgumentParser(description="Index all files in sources/ into SQLite FTS5")
    parser.add_argument("--db", type=str, default=str(DEFAULT_DB_PATH), help="Target SQLite file path")
    parser.add_argument("--limit", type=int, default=None, help="Limit number of files to index")
    parser.add_argument("--force", action="store_true", help="Force re-indexing of all files")
    args = parser.parse_args()

    if not SOURCES_DIR.exists():
        print(f"Sources directory not found at: {SOURCES_DIR}")
        sys.exit(1)

    db_path = Path(args.db)
    print(f"Target SQLite search index: {db_path}")
    conn = init_db(db_path)

    # Collect all supported files
    all_files = []
    for ext in ("*.pdf", "*.txt", "*.md"):
        all_files.extend(SOURCES_DIR.rglob(ext))

    # Filter out hidden or backup files
    all_files = [f for f in sorted(all_files) if not f.name.startswith(".") and not f.name.startswith("~")]

    if args.limit:
        all_files = all_files[:args.limit]

    print(f"Found {len(all_files)} source files in {SOURCES_DIR}...")

    total_chunks = 0
    new_indexed = 0

    for idx, f in enumerate(all_files, 1):
        cat = determine_category(f, SOURCES_DIR)
        if f.suffix.lower() == ".pdf":
            chunks = index_pdf_file(conn, f, cat, force=args.force)
        else:
            chunks = index_text_file(conn, f, cat, force=args.force)

        if chunks > 0:
            new_indexed += 1
            total_chunks += chunks
            print(f"  [{idx}/{len(all_files)}] [{cat.upper()}] Indexed {f.name} (+{chunks} chunks)")

    conn.close()

    size_mb = db_path.stat().st_size / (1024 * 1024) if db_path.exists() else 0
    print(f"\nDone! Newly indexed files: {new_indexed}, New chunks: {total_chunks}")
    print(f"Database size: {size_mb:.2f} MB")

if __name__ == "__main__":
    main()

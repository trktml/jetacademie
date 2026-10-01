---
name: mufredat-kaynak-arama
description: >-
  Research Risale-i Nur, Pırlanta, and sources/ when preparing JetAcademie curricula,
  weekly lesson plans, and educational content. Find relevant passages, page references,
  and ISNAD footnote details through the local SQLite FTS5 index; verify quotations
  and source information separately against the original page or section.
---

# Curriculum Source Research Engine (Context-Efficient Search)

This local SQLite FTS5 research tool supports JetAcademie curriculum preparation. It reduces context usage by retrieving relevant passages rather than entire books; returned text still enters the model's context. Search speed depends on the index and query.

> [!IMPORTANT]
> **Avoid Overloading Context**:
> Never load or read hundreds of PDF pages or entire books directly into context.
> Instead, run the terminal search command (`bun scripts/search-sources.ts`) and retrieve only short passages relevant to the topic or a single relevant page.

---

## ⚡ Basic Commands

### 1. Search by Topic or Concept (Top 5 Passages)

List the most relevant passages and page references for a topic:

```bash
bun scripts/search-sources.ts -q "ihlas hakikati" -n 5
```

### 2. Filter by Category

Search only Risale-i Nur or Pırlanta sources:

```bash
# Search only Risale-i Nur sources
bun scripts/search-sources.ts -q "namaz" -c risale -n 5

# Search only Pırlanta sources
bun scripts/search-sources.ts -q "marifetullah" -c pirlanta -n 5
```

### 3. Search a Specific Book

Search a particular work, such as _Sözler_, _Lemalar_, or _İrşad Ekseni_:

```bash
bun scripts/search-sources.ts -q "bismillah" -b "Sözler" -n 3
```

### 4. Read a Relevant Indexed Page

Inspect the indexed page text containing a search result:

```bash
bun scripts/search-sources.ts --read "Lemalar" --page 160
```

This retrieves the page's indexed text; the amount of text depends on the page. It does not replace comparison with the original source. If the context extends beyond the page, also read the neighboring page or relevant section.

### 5. Index New Sources

When the user adds new PDFs, text files, or folders under `sources/`:

```bash
bun run sources:index
```

Search examples and book titles retain their original Turkish wording to match the source material. The English instructions do not change the language of student-facing curriculum content.

---

## 📋 Curriculum Preparation Workflow

First read [MUFREDAT-INSTRUCTIONS.md](../../../mufredat-docs/planlar/MUFREDAT-INSTRUCTIONS.md) and the relevant grade's annual Markdown plan (`M1_Yillik_Plan.md`–`M6_Yillik_Plan.md`). The [plans README](../../../mufredat-docs/planlar/README.md) explains document precedence; DOCX copies were removed after the verified Markdown migration. Use the annual plan for the topic, main question, outcomes, and primary source, and the writing guide for student-facing language, narrative, and presentation. This skill supports source discovery; it does not replace category-specific output rules.

1. **Search:** Search for the topic and primary source specified in the plan. The query below is only a command example, not the weekly topic for any grade:
   ```bash
   bun scripts/search-sources.ts -q "ihlas" -n 3
   ```
2. **Select a passage:** Consider the student's Turkish reading level, prior knowledge, and month in the program alongside the target age. Choose a passage that contributes to the main question and can be understood with the necessary explanation.
3. **Verify against the original source:** Inspect the indexed text with `--read`, then open the original page or section in the source file. Compare the quotation word for word; verify its context and bibliographic details. Check extracted PDF text for missing characters, merged lines, or source footnotes accidentally included in the quotation. Do not confuse PDF page order in the index with printed page numbers; cite the verified page or section in the edition used. For quoted hadith and historical events, also verify the underlying source. Across all curriculum content, use only hadith and hadith-based reports verified as sahih; reports graded only hasan, weak or fabricated reports, and reports with unverified sahih status are excluded. Record the grading source and its location in the private review record. If a grading dispute remains unresolved, choose another verified sahih report; thematic relevance or inclusion in a Risale/Pırlanta work does not replace this verification. If the original source is inaccessible, do not treat a search result as a verified quotation. Report any gap affecting the main content separately and do not consider the lesson ready for publication.
4. **Quote and present:** Preserve the original passage, present it in bold, and attach its own footnote. Place age-appropriate explanations outside the quotation. Follow the relevant category's rules for the closing message, vocabulary definitions, and footnote placement; Verse, hadith, sirah, and companion passages belong within the Topic narrative only when they support it; they are not separate categories. Topic uses one flexible closing, its Turkish vocabulary section, and final footnotes. Listening keeps its own presentation. In weeks 1–4, a Topic introduction may use verified stories without mandatory verse or direct quotations; never add a passage merely to fill a structural slot.
5. **Record verification:** In preparation notes that are not shown to students, identify the source file or edition, the relevant page or section, and the passage compared. A search result, summary, or previous lesson text is not sufficient verification on its own.

# Annual curriculum plans

`M1_Yillik_Plan.md`–`M6_Yillik_Plan.md` are the authoritative, editable annual plans. Use the relevant Markdown plan for the topic, main question, annual outcomes, starting principles, and primary source.

## Choosing a plan

| Plan                    | School level    | Approximate age | Annual development                             |
| ----------------------- | --------------- | --------------- | ---------------------------------------------- |
| [M1](M1_Yillik_Plan.md) | Middle school 1 | 12–13           | Curiosity and affection                        |
| [M2](M2_Yillik_Plan.md) | Middle school 2 | 13–14           | Reading and understanding                      |
| [M3](M3_Yillik_Plan.md) | Middle school 3 | 14–15           | Applying learning in life                      |
| [M4](M4_Yillik_Plan.md) | High school 1   | 15–16           | Recognizing a personal need                    |
| [M5](M5_Yillik_Plan.md) | High school 2   | 16–17           | Investigation and comparison                   |
| [M6](M6_Yillik_Plan.md) | High school 3   | 17–18           | Coherence, personal stance, and representation |

Age ranges come from the [writing guide](MUFREDAT-INSTRUCTIONS.md); age does not establish Turkish reading ability. M1 does not mean primary-school grade 1. Do not assume previous levels have been completed; read the plan's starting principles.

## Preparing a week

1. Read the grade's annual goals, starting principles, and study method.
2. Find the grade and week heading, such as `M2 — Hafta 01`. Read its place in the unit together with the **Konu**, **Ana soru**, and **Temel kaynak** fields. Compare nearby weeks for progression and repetition.
3. Consider the annual development map, year-end expectations, and the theme of respecting parents. Do not treat year-end skills as first-week prerequisites.
4. Follow the production workflow and editorial rules in [MUFREDAT-INSTRUCTIONS.md](MUFREDAT-INSTRUCTIONS.md). Verify source passages against their original works.

Each plan contains nine units and 36 consecutively numbered weeks. Plans do not assign months; the application's September–May mapping uses four weeks per month and is not source-plan information. Conversion added no new outcomes or unverified passages/pages. Determine the week's learning objective from its main question and annual goals in the private preparation record.

## Document precedence and presentation

- **Annual Markdown plan:** Authoritative for topic, main question, outcomes/goals, starting principles, and primary source.
- **MUFREDAT-INSTRUCTIONS.md:** Authoritative for student-facing language, narrative, category structure, quotations, footnotes, source review, and editorial acceptance.
- **`src/lib/data/curriculum-plans.ts`:** A partial application representation; it does not replace the full plan.
- **Database:** The authoritative store for generated student content. Plan files do not represent lesson packages or publication status.

**Siyer, Sahabe, Ayet, and Hadis are no longer separate categories.** Include verified events and passages only where they support the Topic narrative, without mandatory quotas or a fixed sequence of source sections. Weekly production packages contain six grades × two categories (`konu`, `hocaefendi-dinleme`) = 12 entries. Listening remains separate; `adab-i-muaseret`, `ilmihal`, and `esma` are preserved.

Supporting verses, hadith, sirah, and companion examples are optional in every week; the annual plan's primary source remains required after weeks 1–4. Researching a complementary Hocaefendi passage does not require including it. Richness means understandable context, concrete source contributions, and a developing line of thought, rather than more sources or longer text. Preserve necessary explanations and purposeful repetition that supports meaning or narrative rhythm. The writing guide's section 18 records supporting source types and contributions in the variety matrix and reviews missed opportunities at the end of each unit, without source quotas or requiring every type to be researched each week.

Historical instructions retained from the source DOCX files, including “Haftalık Ders Dosyaları Hazırlanırken”, “Haftalık Ders Dosyası Standardı”, “Kaynak Metin İlkesi”, and visual/video suggestions, document the original plans. They do not override current presentation rules: 15–20 minutes is not a text-length target, and separate source sections, teacher notes, answer keys, bibliographies, or a visual for every lesson are not mandatory. Preserve original quotations; put accessible explanations outside them. Report unresolved topic/source conflicts separately.

## Updates and exports

Edit the relevant Markdown plan first. When a topic, main question, or primary source changes, compare and update the application representation in the same change. Markdown plans are tracked in Git; do not maintain parallel plan versions manually. Keep the plans, quotations, and student-content labels in their original languages.

The source DOCX files were removed after verification of the **1 October 2026 Markdown migration**. Originals remain available in Git history. Export the current Markdown when Word or PDF sharing is needed.

Migration verification compared all text paragraphs and table cells from six DOCX documents. It transferred 54 units and 216 weeks with their topic, main question, and source fields; weekly tables became separate week headings. Other tables and text order were preserved. Page layout, colors, and fonts are not part of Markdown.

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const EXPORT_DIR = path.resolve("exports/hafta-02");
const JSON_PATH = path.join(EXPORT_DIR, "hafta-02.json");

if (!fs.existsSync(JSON_PATH)) {
  console.error("JSON file not found:", JSON_PATH);
  process.exit(1);
}

interface CurriculumEntry {
  grade: number;
  categoryId: string;
  title: string;
  body: string;
}

const weekData = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));
const entries: CurriculumEntry[] = weekData.effectiveEntries;

// Helper to convert Markdown to HTML with react-markdown
function mdToHtml(markdown: string): string {
  // Replace HTML <u> tags so they survive react-markdown
  const prepared = markdown
    .replace(/<u>(.*?)<\/u>/g, "___U_START___$1___U_END___")
    .replace(/^(\s*)[•●○⁃]\s*/gm, "$1- ");

  const rawHtml = renderToStaticMarkup(
    React.createElement(
      ReactMarkdown,
      {
        remarkPlugins: [remarkGfm, remarkBreaks],
      },
      prepared
    )
  );

  return rawHtml
    .replace(/___U_START___(.*?)___U_END___/g, '<u class="vocab-term">$1</u>')
    .replace(/&lt;u&gt;(.*?)&lt;\/u&gt;/g, '<u class="vocab-term">$1</u>');
}

const CSS_STYLES = `
  @page {
    size: A4 portrait;
    margin: 18mm 16mm 20mm 16mm;
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    line-height: 1.65;
    color: #1e293b;
    font-size: 10.5pt;
    margin: 0;
    padding: 0;
    background: #ffffff;
  }
  
  .cover-page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 40px;
    page-break-after: always;
    break-after: page;
  }
  
  .cover-logo {
    font-size: 24pt;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: #0f172a;
    margin-bottom: 8px;
    text-transform: uppercase;
  }
  
  .cover-logo span {
    color: #0284c7;
  }
  
  .cover-badge {
    display: inline-block;
    background: #e0f2fe;
    color: #0369a1;
    font-size: 11pt;
    font-weight: 700;
    padding: 6px 18px;
    border-radius: 9999px;
    margin-bottom: 24px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .cover-title {
    font-size: 26pt;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.25;
    margin: 0 0 16px 0;
  }
  
  .cover-subtitle {
    font-size: 13pt;
    color: #64748b;
    max-width: 500px;
    margin-bottom: 48px;
    line-height: 1.5;
  }
  
  .toc-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 24px 32px;
    text-align: left;
    width: 100%;
    max-width: 560px;
  }
  
  .toc-title {
    font-size: 12pt;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 14px;
    padding-bottom: 8px;
    border-bottom: 2px solid #e2e8f0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .toc-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px dashed #e2e8f0;
    font-size: 10.5pt;
  }
  
  .toc-item:last-child {
    border-bottom: none;
  }
  
  .toc-grade {
    font-weight: 700;
    color: #0284c7;
    margin-right: 12px;
  }
  
  .toc-text {
    color: #334155;
    flex: 1;
  }
  
  .lesson-container {
    margin-bottom: 30px;
  }
  
  .page-break {
    page-break-before: always;
    break-before: page;
  }
  
  .header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1.5px solid #e2e8f0;
    padding-bottom: 8px;
    margin-bottom: 24px;
    font-size: 9pt;
    color: #64748b;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .header-brand {
    color: #0f172a;
    font-weight: 800;
  }
  
  .header-brand span {
    color: #0284c7;
  }
  
  .category-badge {
    display: inline-flex;
    align-items: center;
    font-size: 8.5pt;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 12px;
  }
  
  .badge-konu {
    background: #e0f2fe;
    color: #0369a1;
    border: 1px solid #bae6fd;
  }
  
  .badge-dinleme {
    background: #ede9fe;
    color: #6d28d9;
    border: 1px solid #ddd6fe;
  }
  
  h1 {
    font-size: 18pt;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.3;
    margin-top: 0;
    margin-bottom: 18px;
    break-after: avoid;
    page-break-after: avoid;
  }
  
  h2 {
    font-size: 13.5pt;
    font-weight: 700;
    color: #1e293b;
    margin-top: 24px;
    margin-bottom: 12px;
    break-after: avoid;
    page-break-after: avoid;
    border-bottom: 1px solid #f1f5f9;
    padding-bottom: 4px;
  }
  
  h3 {
    font-size: 11.5pt;
    font-weight: 700;
    color: #334155;
    margin-top: 18px;
    margin-bottom: 8px;
    break-after: avoid;
    page-break-after: avoid;
  }
  
  p {
    margin-top: 0;
    margin-bottom: 12px;
    text-align: justify;
  }
  
  ul, ol {
    margin-top: 0;
    margin-bottom: 14px;
    padding-left: 24px;
  }
  
  li {
    margin-bottom: 6px;
  }
  
  li > p {
    margin-bottom: 0;
    display: inline;
  }
  
  /* Nested vocabulary styling */
  ul ul {
    margin-top: 4px;
    margin-bottom: 6px;
    padding-left: 18px;
    list-style-type: circle;
    color: #475569;
    font-size: 9.5pt;
  }
  
  blockquote {
    border-left: 3.5px solid #0284c7;
    background: #f0f9ff;
    padding: 10px 16px;
    margin: 16px 0;
    border-radius: 0 8px 8px 0;
    font-style: italic;
    color: #1e3a8a;
    break-inside: avoid;
    page-break-inside: avoid;
  }
  
  u.vocab-term {
    text-decoration: none;
    font-weight: 600;
    color: #0f766e;
    background: #f0fdfa;
    padding: 1px 4px;
    border-radius: 4px;
    border-bottom: 1.5px solid #14b8a6;
  }
  
  hr {
    border: none;
    border-top: 1px dashed #cbd5e1;
    margin: 28px 0;
  }
  
  .footnotes {
    margin-top: 32px;
    padding-top: 16px;
    border-top: 1px solid #e2e8f0;
    font-size: 8.5pt;
    color: #64748b;
    break-inside: avoid;
    page-break-inside: avoid;
  }
  
  .footnotes ol {
    padding-left: 18px;
  }
  
  .footnotes li {
    margin-bottom: 6px;
  }
  
  .footnotes a {
    color: #0284c7;
    text-decoration: none;
  }
  
  a {
    color: #0369a1;
    text-decoration: underline;
  }
`;

function buildGradeHtml(grade: number, showHeader = true): string {
  const konuEntry = entries.find((e) => e.grade === grade && e.categoryId === "konu");
  const dinlemeEntry = entries.find(
    (e) => e.grade === grade && e.categoryId === "hocaefendi-dinleme"
  );

  const headerHtml = `
    <div class="header-bar">
      <div class="header-brand">JET<span>ACADEMIE</span> • 2. HAFTA</div>
      <div>M${grade} (${grade}. SINIF) DERS MATERYALİ</div>
    </div>
  `;

  let html = `<div class="grade-section">`;

  // 1. DERS: KONU DERSİ
  if (konuEntry) {
    const konuBodyHtml = mdToHtml(konuEntry.body);
    html += `
      <div class="lesson-container">
        ${showHeader ? headerHtml : ""}
        <div class="category-badge badge-konu">📘 1. DERS: KONU ANLATIMI</div>
        <div class="lesson-content">
          ${konuBodyHtml}
        </div>
      </div>
    `;
  }

  // 2. DERS: DİNLEME DERSİ (Sayfa başından başlasın)
  if (dinlemeEntry) {
    const dinlemeBodyHtml = mdToHtml(dinlemeEntry.body);
    html += `
      <div class="lesson-container page-break">
        ${headerHtml}
        <div class="category-badge badge-dinleme">🎧 2. DERS: HOCAEFENDİ DİNLEME</div>
        <div class="lesson-content">
          ${dinlemeBodyHtml}
        </div>
      </div>
    `;
  }

  html += `</div>`;
  return html;
}

// 1. Generate Individual Grade PDFs
for (let grade = 1; grade <= 6; grade++) {
  const gradeHtml = `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="utf-8">
      <title>JetAcademie 2. Hafta - M${grade}</title>
      <style>${CSS_STYLES}</style>
    </head>
    <body>
      ${buildGradeHtml(grade, true)}
    </body>
    </html>
  `;

  const htmlPath = path.join(EXPORT_DIR, `M${grade}-02.html`);
  const pdfPath = path.join(EXPORT_DIR, `M${grade}-02.pdf`);

  fs.writeFileSync(htmlPath, gradeHtml, "utf-8");

  console.log(`Generating PDF for M${grade}...`);
  execSync(
    `"${CHROME_PATH}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${pdfPath}" "${htmlPath}"`
  );
  console.log(`✓ Created: ${pdfPath}`);
}

// 2. Generate Combined PDF (M1 - M6)
const tocItems = [1, 2, 3, 4, 5, 6]
  .map((g) => {
    const k = entries.find((e) => e.grade === g && e.categoryId === "konu");
    return `
      <div class="toc-item">
        <span class="toc-grade">M${g} (${g}. Sınıf):</span>
        <span class="toc-text">${k ? k.title : ""}</span>
      </div>
    `;
  })
  .join("");

const combinedHtml = `
  <!DOCTYPE html>
  <html lang="tr">
  <head>
    <meta charset="utf-8">
    <title>JetAcademie 2. Hafta - Tüm Sınıflar (M1 - M6)</title>
    <style>${CSS_STYLES}</style>
  </head>
  <body>
    <!-- KAPAK SAYFASI -->
    <div class="cover-page">
      <div class="cover-logo">JET<span>ACADEMIE</span></div>
      <div class="cover-badge">2. Hafta Müfredat Paketi</div>
      <h1 class="cover-title">Haftalık Ders İçerikleri</h1>
      <div class="cover-subtitle">Bediüzzaman Said Nursî'nin İlim ve Hayat Yolculuğu<br>M1 – M6 Tüm Sınıf Düzeyleri (Konu & Dinleme)</div>
      
      <div class="toc-card">
        <div class="toc-title">İçindekiler ve Ders Konuları</div>
        ${tocItems}
      </div>
    </div>

    <!-- SINIFLAR -->
    ${[1, 2, 3, 4, 5, 6]
      .map(
        (g) => `
        <div class="page-break">
          ${buildGradeHtml(g, true)}
        </div>
      `
      )
      .join("")}
  </body>
  </html>
`;

const combinedHtmlPath = path.join(EXPORT_DIR, "Hafta-02-Tum-Siniflar.html");
const combinedPdfPath = path.join(EXPORT_DIR, "Hafta-02-Tum-Siniflar.pdf");

fs.writeFileSync(combinedHtmlPath, combinedHtml, "utf-8");

console.log("Generating Combined PDF (Hafta-02-Tum-Siniflar.pdf)...");
execSync(
  `"${CHROME_PATH}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${combinedPdfPath}" "${combinedHtmlPath}"`
);
console.log(`✓ Created: ${combinedPdfPath}`);

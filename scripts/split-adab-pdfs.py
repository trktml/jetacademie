#!/usr/bin/env python3
"""
Müfredat Adab-ı Muaşeret PDF Bölümleme Betiği
Master PDF dosyasını haftalık 3'er görsel / sayfa olacak şekilde bölerek
`public/curriculum/adab/ortaokul/hafta-XX.pdf` dosyalarını üretir.

Kural:
- 1., 2. ve 3. Sınıflar (Ortaokul) için toplam 30 hafta x 3 görsel = 90 görsel.
- Başlık sayfaları tek başına boş bırakılmaz; yanındaki ilk içerik sayfasıyla
  çift sayfa (side-by-side spread) olarak birleştirilir.
"""

from pathlib import Path
import fitz

ROOT = Path(__file__).resolve().parent.parent
MASTER_PDF = ROOT / "mufredat-docs" / "adab" / "Ortaokul - Peygamber Efendimizin Sunnetleri - Gul Gibi Hayat - MustuY.pdf"
OUT_DIR = ROOT / "public" / "curriculum" / "adab" / "ortaokul"

# Başlık sayfaları ve hemen yanına gelecek içerik sayfaları (Kitap sayfa no = doc indeks)
TITLE_SPREADS = {
    7: 8,    # Âdâb-ı Muaşeret başlık + Ahdinde durmak
    51: 52,  # Şefkat başlık + Cennet anaların ayakları altındadır
    69: 70,  # Yerken İçerken başlık + Besmele ile başlamak
    87: 88,  # Hayatın İçinden başlık + Namazda esnememek
    95: 96,  # Yatarken başlık + Abdestli yatmak
}


def build_visuals_list() -> list[tuple[int, ...]]:
    """Kitap sayfa 7'den 101'e kadar olan 90 görseli oluşturur."""
    visuals: list[tuple[int, ...]] = []
    p = 7
    while p <= 101:
        if p in TITLE_SPREADS:
            content_p = TITLE_SPREADS[p]
            visuals.append((p, content_p))
            p = content_p + 1
        else:
            visuals.append((p,))
            p += 1
    return visuals


def generate_weekly_pdfs():
    if not MASTER_PDF.exists():
        raise FileNotFoundError(f"Master PDF bulunamadı: {MASTER_PDF}")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    doc = fitz.open(MASTER_PDF)
    visuals = build_visuals_list()

    assert len(visuals) == 90, f"Beklenen 90 görsel, bulunan: {len(visuals)}"
    total_weeks = len(visuals) // 3
    print(f"Toplam görsel: {len(visuals)}, Toplam hafta: {total_weeks}")

    for w_idx in range(total_weeks):
        w_num = w_idx + 1
        w_vis = visuals[w_idx * 3 : w_idx * 3 + 3]
        out_pdf_path = OUT_DIR / f"hafta-{w_num:02d}.pdf"

        new_doc = fitz.open()
        for spec in w_vis:
            if len(spec) == 2:
                # Başlık sayfası sol, içerik sayfası sağ (yan yana birleşik spread)
                p1_idx, p2_idx = spec
                p1 = doc[p1_idx]
                p2 = doc[p2_idx]
                w1, h1 = p1.rect.width, p1.rect.height
                w2, h2 = p2.rect.width, p2.rect.height
                new_page = new_doc.new_page(width=w1 + w2, height=max(h1, h2))
                new_page.show_pdf_page(fitz.Rect(0, 0, w1, h1), doc, p1_idx)
                new_page.show_pdf_page(fitz.Rect(w1, 0, w1 + w2, h2), doc, p2_idx)
            else:
                p_idx = spec[0]
                p = doc[p_idx]
                w, h = p.rect.width, p.rect.height
                new_page = new_doc.new_page(width=w, height=h)
                new_page.show_pdf_page(fitz.Rect(0, 0, w, h), doc, p_idx)

        new_doc.save(out_pdf_path, garbage=4, deflate=True)
        size_kb = out_pdf_path.stat().st_size / 1024
        print(f"  Hafta {w_num:02d}: {len(new_doc)} sayfa, {size_kb:.1f} KB -> {out_pdf_path.name}")

    print("Tüm Adab PDF'leri başarıyla oluşturuldu!")


if __name__ == "__main__":
    generate_weekly_pdfs()

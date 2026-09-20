#!/usr/bin/env python3
"""
Müfredat PDF Bölümleme Betiği
Master PDF dosyalarını haftalık müfredat kazanımlarına göre kesip
`public/curriculum/ilmihal/...` dizinlerine optimize PDF'ler olarak yerleştirir.
"""

import json
import os
import re
import sys
from pathlib import Path
import pypdf

ROOT = Path(__file__).resolve().parent.parent
DOCS_DIR = ROOT / "mufredat-docs" / "ilmihal"
PUBLIC_CURRICULUM = ROOT / "public" / "curriculum" / "ilmihal"
CURRICULUM_TS = ROOT / "src" / "lib" / "data" / "ilmihal-curriculum.ts"

ORTAOKUL_MASTER = DOCS_DIR / "Fotograflarla Abdest Namaz Ilmihali - MustuY.pdf"
LISE_MASTER = DOCS_DIR / "a-basak-sezgin-genclik-ilmihali-mustuy.pdf"

# Ortaokul: Kitap Sayfa P -> PDF 1-indeksli sayfa P + 7 -> 0-indeksli P + 6
ORTAOKUL_PAGE_OFFSET = 6

# Lise: Müfredat Sayfa P -> Doğrudan 1-indeksli PDF sayfası -> 0-indeksli P - 1
LISE_PAGE_OFFSET = -1


def parse_page_spec(spec: str) -> list[int]:
    """Sayfa metnini (örn: '1-2', '12–13', '107, 109–110') sayfa numaraları dizisine dönüştürür."""
    pages = []
    for part in spec.split(","):
        part = part.strip().replace("–", "-").replace("—", "-")
        if "-" in part:
            s, e = part.split("-", 1)
            pages.extend(range(int(s.strip()), int(e.strip()) + 1))
        elif part:
            pages.append(int(part))
    return pages


def parse_curriculum_ts():
    """ilmihal-curriculum.ts dosyasından haftalık kazanımları parse eder."""
    with open(CURRICULUM_TS, "r", encoding="utf-8") as f:
        code = f.read()

    def parse_track(var_name: str):
        idx = code.find(f"export const {var_name}")
        end = code.find("] as const;", idx)
        chunk = code[idx:end]
        items = []
        pattern = (
            r'\{\s*weekNumber:\s*(\d+),\s*title:\s*\"([^\"]+)\",\s*body:\s*\"(.*?)\",'
            r'\s*pages:\s*\"([^\"]+)\",\s*pageCount:\s*(\d+)'
        )
        for obj in re.finditer(pattern, chunk, re.S):
            items.append({
                "weekNumber": int(obj.group(1)),
                "title": obj.group(2),
                "pages": obj.group(4),
                "pageCount": int(obj.group(5)),
            })
        return items

    return {
        "ortaokul_bayan": parse_track("ortaokulIlmihalBayan"),
        "ortaokul_erkek": parse_track("ortaokulIlmihalErkek"),
        "lise_bayan": parse_track("liseIlmihalBayan"),
        "lise_erkek": parse_track("liseIlmihalErkek"),
    }


def split_track(reader: pypdf.PdfReader, items: list[dict], out_dir: Path, page_offset: int, track_name: str):
    out_dir.mkdir(parents=True, exist_ok=True)
    manifest = []

    print(f"Bölünüyor: {track_name} ({len(items)} hafta)...")
    for item in items:
        week = item["weekNumber"]
        filename = f"hafta-{week:02d}.pdf"
        target_path = out_dir / filename

        book_pages = parse_page_spec(item["pages"])
        # PDF 0-indexed sayfa indeksleri
        pdf_page_indices = [p + page_offset for p in book_pages]

        # Sınır kontrolü
        valid_indices = [idx for idx in pdf_page_indices if 0 <= idx < len(reader.pages)]
        if not valid_indices:
            print(f"  [UYARI] Hafta {week}: Geçersiz sayfa aralığı {item['pages']}")
            continue

        writer = pypdf.PdfWriter()
        for idx in valid_indices:
            writer.add_page(reader.pages[idx])

        with open(target_path, "wb") as f_out:
            writer.write(f_out)

        rel_path = f"/curriculum/ilmihal/{out_dir.relative_to(PUBLIC_CURRICULUM.parent.parent)}/{filename}"
        # Normalize web path
        web_path = f"/{target_path.relative_to(ROOT / 'public')}".replace("\\", "/")

        manifest.append({
            "week": week,
            "title": item["title"],
            "pages": item["pages"],
            "pageCount": len(valid_indices),
            "file": filename,
            "url": web_path,
        })

    # Manifest json kaydet
    manifest_path = out_dir / "manifest.json"
    with open(manifest_path, "w", encoding="utf-8") as f_m:
        json.dump(manifest, f_m, ensure_ascii=False, indent=2)

    print(f"  ✓ {len(manifest)} dosya kaydedildi: {out_dir}")


def main():
    if not ORTAOKUL_MASTER.exists():
        print(f"HATA: Ortaokul master PDF bulunamadı: {ORTAOKUL_MASTER}")
        sys.exit(1)
    if not LISE_MASTER.exists():
        print(f"HATA: Lise master PDF bulunamadı: {LISE_MASTER}")
        sys.exit(1)

    print("Master PDF'ler yükleniyor...")
    ortaokul_reader = pypdf.PdfReader(str(ORTAOKUL_MASTER))
    lise_reader = pypdf.PdfReader(str(LISE_MASTER))
    print(f"Ortaokul Master: {len(ortaokul_reader.pages)} sayfa")
    print(f"Lise Master: {len(lise_reader.pages)} sayfa")

    tracks = parse_curriculum_ts()

    # 1. Ortaokul Bayan
    split_track(
        ortaokul_reader,
        tracks["ortaokul_bayan"],
        PUBLIC_CURRICULUM / "ortaokul" / "bayan",
        ORTAOKUL_PAGE_OFFSET,
        "Ortaokul Bayan",
    )

    # 2. Ortaokul Erkek
    split_track(
        ortaokul_reader,
        tracks["ortaokul_erkek"],
        PUBLIC_CURRICULUM / "ortaokul" / "erkek",
        ORTAOKUL_PAGE_OFFSET,
        "Ortaokul Erkek",
    )

    # 3. Lise Bayan
    split_track(
        lise_reader,
        tracks["lise_bayan"],
        PUBLIC_CURRICULUM / "lise" / "bayan",
        LISE_PAGE_OFFSET,
        "Lise Bayan",
    )

    # 4. Lise Erkek
    split_track(
        lise_reader,
        tracks["lise_erkek"],
        PUBLIC_CURRICULUM / "lise" / "erkek",
        LISE_PAGE_OFFSET,
        "Lise Erkek",
    )

    print("\n✓ Tüm İlmihal PDF'leri başarıyla bölündü ve public/curriculum/ilmihal/ altına yerleştirildi.")


if __name__ == "__main__":
    main()

/**
 * JetAcademie Müfredat Kitapları — Senelik Okuma Hedefleri
 *
 * Her sınıf (M1–M6) için dönemlere göre belirlenen hedef okutmalık kitaplar.
 * Veri kaynağı: mufredat-docs/mufredat-kitaplari/kitaplar-listesi.xlsx
 */

export interface ReadingBook {
  readonly id: string;
  readonly title: string;
  readonly shortTitle?: string;
  readonly image: string;
}

export interface ReadingPeriod {
  readonly id: string;
  readonly label: string;
  readonly shortLabel: string;
  /** Grade (1–6) → books for that grade in this period */
  readonly books: Readonly<Record<number, readonly ReadingBook[]>>;
}

/* ------------------------------------------------------------------ */
/*  Kitap tanımları                                                    */
/* ------------------------------------------------------------------ */

const B01: ReadingBook = {
  id: "saadet-asrinda-dogruluk-ve-sadakat",
  title: "Saadet Asrında Doğruluk ve Sadakat",
  image: "/kitaplar/01_saadet_asrinda_dogruluk_ve_sadakat.jpeg",
};

const B02: ReadingBook = {
  id: "hazreti-ebubekir",
  title: "Hazreti Ebubekir",
  shortTitle: "Hz. Ebubekir",
  image: "/kitaplar/02_hazreti_ebubekir.jpg",
};

const B03: ReadingBook = {
  id: "guzel-ahlak",
  title: "Güzel Ahlâk",
  image: "/kitaplar/03_guzel_ahlak.jpg",
};

const B04: ReadingBook = {
  id: "nicin-ibadet-etmeliyiz",
  title: "Niçin İbadet Etmeliyiz",
  image: "/kitaplar/04_nicin_ibadet_etmeliyiz.webp",
};

const B05: ReadingBook = {
  id: "ic-derinlikleriyle-hizmet-insani",
  title: "İç Derinlikleriyle Hizmet İnsanı",
  image: "/kitaplar/05_ic_derinlikleriyle_hizmet_insani.jpg",
};

const B06: ReadingBook = {
  id: "saadet-asrinda-ilim-ve-ibadet",
  title: "Saadet Asrında İlim ve İbadet",
  image: "/kitaplar/06_saadet_asrinda_ilim_ve_ibadet.webp",
};

const B07: ReadingBook = {
  id: "genclerle-namaz",
  title: "Gençlerle Namaz",
  image: "/kitaplar/07_genclerle_namaz.jpg",
};

const B08: ReadingBook = {
  id: "haydi-gencler-namaza",
  title: "Haydi Gençler Namaza",
  image: "/kitaplar/08_haydi_gencler_namaza.png",
};

const B09: ReadingBook = {
  id: "100-soruda-namaz",
  title: "100 Soruda Namaz",
  image: "/kitaplar/09_100_soruda_namaz.jpg",
};

const B10: ReadingBook = {
  id: "agt-1-asrin-getirdigi-tereddutler",
  title: "AGT 1 – Asrın Getirdiği Tereddütler",
  image: "/kitaplar/10_agt_1_asrin_getirdigi_tereddutler.jpg",
};

const B11: ReadingBook = {
  id: "hicret",
  title: "Hicret",
  image: "/kitaplar/11_hicret.jpeg",
};

const B12: ReadingBook = {
  id: "kucuk-sozler",
  title: "Küçük Sözler",
  image: "/kitaplar/12_kucuk_sozler.webp",
};

const B13: ReadingBook = {
  id: "hayat-2-0",
  title: "Hayat 2.0",
  image: "/kitaplar/13_hayat_2.0.webp",
};

const B14: ReadingBook = {
  id: "saadet-asrina-dogan-ilk-yildizlar",
  title: "Saadet Asrına Doğan İlk Yıldızlar",
  image: "/kitaplar/14_saadet_asrina_dogan_ilk_yildizlar.webp",
};

const B15: ReadingBook = {
  id: "kisa-surelerin-tefsiri",
  title: "Kısa Surelerin Tefsiri – Davut Aydüz",
  image: "/kitaplar/15_kisa_surelerin_tefsiri_davut_ayduz.jpg",
};

const B16: ReadingBook = {
  id: "lokman-suresi-tefsiri",
  title: "Lokman Suresi Tefsiri",
  image: "/kitaplar/16_lokman_suresi_tefsiri.jpg",
};

const B17: ReadingBook = {
  id: "bediuzzamanin-hayati",
  title: "Bediüzzaman'ın Hayatı",
  image: "/kitaplar/17_bediuzzamanin_hayati.jpg",
};

const B18: ReadingBook = {
  id: "bir-gonul-insani",
  title: "Bir Gönül İnsanı",
  image: "/kitaplar/18_bir_gonul_insani.jpg",
};

const B19: ReadingBook = {
  id: "efendimiz",
  title: "Efendimiz",
  image: "/kitaplar/19_efendimiz.webp",
};

const B20: ReadingBook = {
  id: "sefkat-gunesi",
  title: "Şefkat Güneşi",
  image: "/kitaplar/20_sefkat_gunesi.jpg",
};

const B21: ReadingBook = {
  id: "hazreti-omer",
  title: "Hazreti Ömer",
  shortTitle: "Hz. Ömer",
  image: "/kitaplar/21_hazreti_omer.jpg",
};

const B22: ReadingBook = {
  id: "hazreti-osman",
  title: "Hazreti Osman",
  shortTitle: "Hz. Osman",
  image: "/kitaplar/22_hazreti_osman.webp",
};

const B23: ReadingBook = {
  id: "hazreti-ali",
  title: "Hazreti Ali",
  shortTitle: "Hz. Ali",
  image: "/kitaplar/23_hazreti_ali.jpg",
};

const B24: ReadingBook = {
  id: "hazreti-hatice",
  title: "Hazreti Hatice",
  shortTitle: "Hz. Hatice",
  image: "/kitaplar/24_hazreti_hatice.webp",
};

const B25: ReadingBook = {
  id: "hazreti-aise",
  title: "Hazreti Aişe",
  shortTitle: "Hz. Aişe",
  image: "/kitaplar/25_hazreti_aise.jpg",
};

const B26: ReadingBook = {
  id: "hazreti-muhammed",
  title: "Hazreti Muhammed",
  shortTitle: "Hz. Muhammed",
  image: "/kitaplar/26_hazreti_muhammed.jpg",
};

/* ------------------------------------------------------------------ */
/*  Dönem → Sınıf → Kitaplar matrisi                                  */
/* ------------------------------------------------------------------  */

export const READING_PERIODS: readonly ReadingPeriod[] = [
  {
    id: "eylul-ekim",
    label: "Eylül – Ekim",
    shortLabel: "Eyl–Eki",
    books: {
      1: [B01],
      2: [B02],
      3: [B03],
      4: [B04],
      5: [B04],
      6: [B05],
    },
  },
  {
    id: "kasim-aralik",
    label: "Kasım – Aralık",
    shortLabel: "Kas–Ara",
    books: {
      1: [B06],
      2: [B07],
      3: [B08],
      4: [B09],
      5: [B10],
      6: [B11],
    },
  },
  {
    id: "ocak-subat-mart",
    label: "Ocak – Şubat – Mart (3 Aylar)",
    shortLabel: "3 Aylar",
    books: {
      1: [B02, B21, B22, B23, B24, B25],
      2: [B02, B21, B22, B23, B24, B25],
      3: [B12, B13],
      4: [B12, B14],
      5: [B15],
      6: [B16],
    },
  },
  {
    id: "nisan-mayis",
    label: "Nisan – Mayıs",
    shortLabel: "Nis–May",
    books: {
      1: [B19],
      2: [B26],
      3: [B17],
      4: [B18],
      5: [B19],
      6: [B20],
    },
  },
];

export const GRADES = [1, 2, 3, 4, 5, 6] as const;
export type Grade = (typeof GRADES)[number];

export const GRADE_DETAILS: Record<
  Grade,
  { readonly label: string; readonly subLabel: string; readonly level: string }
> = {
  1: { label: "M1", subLabel: "1. Sınıf", level: "Ortaokul" },
  2: { label: "M2", subLabel: "2. Sınıf", level: "Ortaokul" },
  3: { label: "M3", subLabel: "3. Sınıf", level: "Ortaokul" },
  4: { label: "M4", subLabel: "4. Sınıf", level: "Lise" },
  5: { label: "M5", subLabel: "5. Sınıf", level: "Lise" },
  6: { label: "M6", subLabel: "6. Sınıf", level: "Lise" },
};

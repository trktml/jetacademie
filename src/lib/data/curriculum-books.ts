/**
 * JetAcademie Müfredat Kitapları ve Kaynak Eserler Veri Havuzu
 *
 * 6 yıllık müfredatta (M1–M6) takip edilen temel ders kitapları, kaynak eserler
 * ve tavsiye okuma listelerini kapsar.
 */

export type BookCategory =
  | "ilmihal"
  | "kuran-tefsir"
  | "hadis-sunnet"
  | "siyer-sahabe"
  | "risale-i-nur"
  | "adab-muaseret"
  | "dua-evrad";

export type BookLevel = "ortaokul" | "lise" | "all";

export interface CurriculumBook {
  readonly id: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly author: string;
  readonly publisher: string;
  readonly category: BookCategory;
  readonly level: BookLevel;
  readonly targetGrades: readonly number[]; // 1..6
  readonly description: string;
  readonly curriculumRelevance: string;
  readonly highlights: readonly string[];
  readonly coverColor: {
    readonly bg: string;
    readonly border: string;
    readonly text: string;
    readonly accent: string;
  };
  readonly pageCount?: number;
  readonly curriculumPath?: string;
}

export const BOOK_CATEGORIES: readonly {
  readonly id: BookCategory | "all";
  readonly label: string;
  readonly shortLabel: string;
}[] = [
  { id: "all", label: "Tüm Eserler", shortLabel: "Tümü" },
  { id: "ilmihal", label: "İlmihal & Fıkıh", shortLabel: "İlmihal" },
  { id: "kuran-tefsir", label: "Kur'an & Tefsir", shortLabel: "Kur'an" },
  { id: "hadis-sunnet", label: "Hadis & Sünnet", shortLabel: "Hadis" },
  { id: "siyer-sahabe", label: "Siyer & Sahabe", shortLabel: "Siyer" },
  { id: "risale-i-nur", label: "İman & Risale-i Nur", shortLabel: "Risale" },
  { id: "adab-muaseret", label: "Adab-ı Muaşeret", shortLabel: "Adab" },
  { id: "dua-evrad", label: "Dua & Evrad", shortLabel: "Dua" },
];

export const curriculumBooks: readonly CurriculumBook[] = [
  {
    id: "genclik-ilmihali",
    title: "Gençlik İlmihali",
    subtitle: "Ortaokul ve Lise Dönemi İnanç ve İbadet Rehberi",
    author: "Ahmet Başak & Ayşe Başak Sezgin",
    publisher: "Muştu Yayınları",
    category: "ilmihal",
    level: "all",
    targetGrades: [1, 2, 3, 4, 5, 6],
    description:
      "Temel fıkhi hükümleri, temizlik, abdest, namaz, oruç ve gençlik dönemine mahsus fıkhi meseleleri anlaşılır dille aktaran ana ilmihal kaynağı.",
    curriculumRelevance:
      "Haftalık İlmihal kategorisinin temel metnidir. M1–M3 sınıflarında 28 haftalık temel konular, M4–M6 lise kademesinde ise derinlemesine fıkıh konuları takip edilir.",
    highlights: [
      "Taharet ve abdest adapları",
      "Fotoğraflı ve şematik namaz rehberi",
      "Erkek ve bayanlara özel meseleler",
      "Oruç, zekât ve günlük hayat fıkhı",
    ],
    coverColor: {
      bg: "from-emerald-950/80 to-teal-950/90",
      border: "border-emerald-500/40",
      text: "text-emerald-200",
      accent: "bg-emerald-500",
    },
    pageCount: 384,
    curriculumPath: "/mufredat?kategori=ilmihal",
  },
  {
    id: "fotograflarla-abdest-namaz",
    title: "Fotoğraflarla Abdest ve Namaz İlmihali",
    subtitle: "Uygulamalı Görsel İbadet Rehberi",
    author: "Komisyon",
    publisher: "Muştu Yayınları",
    category: "ilmihal",
    level: "ortaokul",
    targetGrades: [1, 2, 3],
    description:
      "Adım adım görsel anlatımlarla abdestin alınışı, namazın kılınışı, duaları ve tadil-i erkânı çocuk ve gençlere sevdiren pratik kaynak.",
    curriculumRelevance:
      "M1 ve M2 Ortaokul 1-2 kademelerinde abdest ve namaz ünitelerinde görsel destek olarak kullanılır.",
    highlights: [
      "Fotoğraflı abdest aşamaları",
      "5 vakit namaz rekat tabloları",
      "Namaz sureleri ve duaları",
      "Sehiv secdesi ve cemaatle namaz",
    ],
    coverColor: {
      bg: "from-teal-950/80 to-cyan-950/90",
      border: "border-teal-500/40",
      text: "text-teal-200",
      accent: "bg-teal-500",
    },
    pageCount: 160,
    curriculumPath: "/mufredat?kategori=ilmihal",
  },
  {
    id: "kuran-aciklamali-meali",
    title: "Kur'an-ı Kerim Açıklamalı Meali",
    subtitle: "Kelime ve Nüzul Sebebi Notlarıyla",
    author: "Prof. Dr. Suat Yıldırım",
    publisher: "Işık Yayınları",
    category: "kuran-tefsir",
    level: "all",
    targetGrades: [1, 2, 3, 4, 5, 6],
    description:
      "Ayetlerin iniş ortamını, lügat inceliklerini ve çağımıza bakan mesajlarını sade ve yetkin bir üslupla sunan meal tefsir çalışması.",
    curriculumRelevance:
      "55 haftalık Ayet Kütüphanesi müfredatında yer alan tüm ayetlerin Türkçe mealleri ve bağlamsal açıklamaları bu eser referans alınarak işlenir.",
    highlights: [
      "Nüzul sebepleri ve tarihsel arka plan",
      "Ayetler arası mana münasebetleri",
      "Kavram açıklamaları ve dipnotlar",
      "Okumayı kolaylaştıran duru Türkçe",
    ],
    coverColor: {
      bg: "from-amber-950/80 to-yellow-950/90",
      border: "border-amber-500/40",
      text: "text-amber-200",
      accent: "bg-amber-500",
    },
    pageCount: 624,
    curriculumPath: "/mufredat?kategori=ayet",
  },
  {
    id: "riyazus-salihin",
    title: "Riyâzü's-Sâlihîn",
    subtitle: "Salihlerin Bahçesi — Hadis Seçkisi",
    author: "İmam Ebû Zekeriyyâ en-Nevevî",
    publisher: "Klasik / Diyanet Vakfı Neşriyatı",
    category: "hadis-sunnet",
    level: "all",
    targetGrades: [1, 2, 3, 4, 5, 6],
    description:
      "İslam ahlakı, ibadet bilinci, ihlas, sabır ve edep konularında Sahîhayn başta olmak üzere güvenilir kaynaklardan derlenmiş hadis külliyatı.",
    curriculumRelevance:
      "55 haftalık Hadis derslerinin omurgasını teşkil eder. Sahih-i Buhârî ve Müslim rivayetleriyle birebir kaynak doğrulaması sunulur.",
    highlights: [
      "İhlas ve niyet bahsi",
      "Anne-baba ve sıla-i rahim ahlakı",
      "Dilin korunması ve gıybet yasağı",
      "Zikir, tefekkür ve sabır adabı",
    ],
    coverColor: {
      bg: "from-blue-950/80 to-indigo-950/90",
      border: "border-blue-500/40",
      text: "text-blue-200",
      accent: "bg-blue-500",
    },
    pageCount: 780,
    curriculumPath: "/mufredat?kategori=hadis",
  },
  {
    id: "sonsuz-nur",
    title: "Sonsuz Nur",
    subtitle: "İnsanlığın İftihar Tablosu (s.a.v.)",
    author: "Fethullah Gülen",
    publisher: "Nil Yayınları",
    category: "siyer-sahabe",
    level: "all",
    targetGrades: [1, 2, 3, 4, 5, 6],
    description:
      "Hz. Peygamber'in (s.a.v.) risaletini, örnek şahsiyetini, tebliğ metodunu, merhametini ve evrensel ahlakını kalbe işleyen derinlikli siyer şaheseri.",
    curriculumRelevance:
      "Efendimiz (s.a.v.) ve Sahabe kategorilerindeki tahlillerin, duygu örgüsünün ve pedagojik yaklaşımın temel fikri zeminidir.",
    highlights: [
      "Peygamberlik mührü ve mucizeler",
      "Şefkat ve af zirvesi",
      "Gaye insan ve ufuk peygamber",
      "Sahabeye kazandırdığı yüce ahlak",
    ],
    coverColor: {
      bg: "from-rose-950/80 to-pink-950/90",
      border: "border-rose-500/40",
      text: "text-rose-200",
      accent: "bg-rose-500",
    },
    pageCount: 920,
    curriculumPath: "/mufredat?kategori=efendimiz",
  },
  {
    id: "sevgili-peygamberimizin-arkadaslari",
    title: "Sevgili Peygamberimizin Arkadaşları",
    subtitle: "Gençler İçin Sahabe Hayatından Tablolar",
    author: "Komisyon",
    publisher: "Muştu Yayınları",
    category: "siyer-sahabe",
    level: "ortaokul",
    targetGrades: [1, 2, 3],
    description:
      "Aşere-i Mübeşşere, genç sahabiler ve İslam'ın ilk fedakâr muallimlerinin hayatını hikâye diliyle anlatan ortaokul düzeyine özel eser.",
    curriculumRelevance:
      "M1, M2 ve M3 sınıflarının 55 haftalık Sahabe müfredatının birincil kaynağıdır.",
    highlights: [
      "Hz. Ali ve Hz. Mus'ab'ın gençlik fedakârlıkları",
      "Hz. Ebubekir'in sadakati",
      "Suffe mektebi talebeleri",
      "Cesaret ve cömertlik örnekleri",
    ],
    coverColor: {
      bg: "from-violet-950/80 to-purple-950/90",
      border: "border-violet-500/40",
      text: "text-violet-200",
      accent: "bg-violet-500",
    },
    pageCount: 240,
    curriculumPath: "/mufredat?kategori=sahabe",
  },
  {
    id: "hayatus-sahabe",
    title: "Hayâtü's-Sahâbe",
    subtitle: "Asr-ı Saadet'ten İman ve Dava Örnekleri",
    author: "Muhammed Yusuf el-Kandehlevî",
    publisher: "Sentez Neşriyat",
    category: "siyer-sahabe",
    level: "lise",
    targetGrades: [4, 5, 6],
    description:
      "Sahabe-i Kiram'ın iman, cihad, ihlas, kardeşlik ve fedakârlık tablolarını orijinal rivayetlerle aktaran klasik başvuru kaynağı.",
    curriculumRelevance:
      "M4, M5 ve M6 lise sınıflarının 55 haftalık Sahabe müfredatında derinlemesine karakter ve dava tahlilleri için kullanılır.",
    highlights: [
      "İman uğruna hicret ve sabır",
      "Kardeşlik (muâhât) hukuku",
      "İlim ve tebliğ aşkı",
      "Dünyaya buğzedip ahirete yöneliş",
    ],
    coverColor: {
      bg: "from-indigo-950/80 to-slate-900",
      border: "border-indigo-500/40",
      text: "text-indigo-200",
      accent: "bg-indigo-500",
    },
    pageCount: 1200,
    curriculumPath: "/mufredat?kategori=sahabe",
  },
  {
    id: "kucuk-sozler",
    title: "Küçük Sözler & Birinci Söz",
    subtitle: "İman Hakikatlerine Giriş ve Temsili Hikâyecikler",
    author: "Bediüzzaman Said Nursi",
    publisher: "Envar Neşriyat / Şahdamar",
    category: "risale-i-nur",
    level: "ortaokul",
    targetGrades: [1, 2, 3],
    description:
      "Besmele, namaz, kulluk, emanet ve tevekkül hakikatlerini temsili hikâyeler ve mantıki delillerle açıklayan temel Risale eseri.",
    curriculumRelevance:
      "M1 ve M2 sınıflarının ilk ünitelerinde (Merak ve Muhabbet etabı) metin okuma ve kavram kavrama derslerinde işlenir.",
    highlights: [
      "1. Söz: Bismillah her hayrın başıdır",
      "4. Söz: Namaz beş vakitte ne kadar ucuzdur",
      "6. Söz: Nefis ve malı Allah'a satmak",
      "8. Söz: Dünya çölünde iki kardeşin yolculuğu",
    ],
    coverColor: {
      bg: "from-rose-950/90 to-red-950/95",
      border: "border-rose-500/50",
      text: "text-rose-200",
      accent: "bg-rose-500",
    },
    pageCount: 144,
    curriculumPath: "/mufredat?kategori=konu",
  },
  {
    id: "genclik-rehberi",
    title: "Gençlik Rehberi & Hastalar Risalesi",
    subtitle: "Duyguların Eğitimi, Sıhhat ve İmtihan Bilinci",
    author: "Bediüzzaman Said Nursi",
    publisher: "Envar Neşriyat / Söz Basım",
    category: "risale-i-nur",
    level: "lise",
    targetGrades: [4, 5, 6],
    description:
      "Gençlik enerjisinin istikamet üzere sarf edilmesi, hislerin akıl ve vahiy ile dengelenmesi ve hastalıkların manevi merhemleri.",
    curriculumRelevance:
      "M4 ve M5 kademelerinde gençlik fıtratı, hislerin istikameti ve manevi sıhhat ünitelerinde haftalık ders metni olarak kullanılır.",
    highlights: [
      "Gençlik nimetinin ebedileştirilmesi",
      "His ile aklın imtihanı",
      "Hastalıkların günahlara kefaret olması",
      "Sabır ve tevekkül eczanesi",
    ],
    coverColor: {
      bg: "from-orange-950/80 to-amber-950/90",
      border: "border-orange-500/40",
      text: "text-orange-200",
      accent: "bg-orange-500",
    },
    pageCount: 192,
    curriculumPath: "/mufredat?kategori=konu",
  },
  {
    id: "ihlas-uhuvvet-risaleleri",
    title: "İhlas ve Uhuvvet Risaleleri",
    subtitle: "Hizmet Düsturları ve Kardeşlik Ahlakı (20.-21.-22. Lem'alar)",
    author: "Bediüzzaman Said Nursi",
    publisher: "Envar Neşriyat",
    category: "risale-i-nur",
    level: "all",
    targetGrades: [3, 4, 5, 6],
    description:
      "Rıza-i ilahiyi esas tutma, haset ve gıybetten kaçınma, mümin kardeşliği ve ortak mefkûre ahlakını ele alan rehber metinler.",
    curriculumRelevance:
      "M3'ten M6'ya kadar cemaat ahlakı, uhuvvet, benlikten vazgeçme ve teşrik-i mesai ünitelerinin merkezindedir.",
    highlights: [
      "Amelde rıza-i ilahi düsturu",
      "Kardeşlerin meziyetleriyle iftihar etme",
      "Mümin kardeşine adavet etmeme sırrı",
      "Terk-i enaniyet ve şahs-ı manevi",
    ],
    coverColor: {
      bg: "from-red-950/80 to-zinc-950",
      border: "border-red-500/40",
      text: "text-red-200",
      accent: "bg-red-500",
    },
    pageCount: 128,
    curriculumPath: "/mufredat?kategori=konu",
  },
  {
    id: "adab-i-muaseret-rehberi",
    title: "Adab-ı Muaşeret Rehberi",
    subtitle: "Görgü, Nezaket ve Toplumsal Ahlak Kuralları",
    author: "Komisyon",
    publisher: "Işık / Muştu Yayınları",
    category: "adab-muaseret",
    level: "all",
    targetGrades: [1, 2, 3, 4, 5, 6],
    description:
      "Sofrada, sokakta, dijital dünyada, aile içinde ve toplulukta zarafet, nezaket ve edep kurallarını ele alan kapsamlı rehber.",
    curriculumRelevance:
      "54 haftalık Adab-ı Muaşeret müfredatının ana kaynağıdır. Anne-baba ve büyüklere hürmet hattı bu eserle işlenir.",
    highlights: [
      "Selamlaşma ve konuşma adabı",
      "Yemek ve sofra nezaketi",
      "Anne-babaya hürmet ve ev içi nezaket",
      "Dijital mahremiyet ve sosyal medya ahlakı",
    ],
    coverColor: {
      bg: "from-cyan-950/80 to-sky-950/90",
      border: "border-cyan-500/40",
      text: "text-cyan-200",
      accent: "bg-cyan-500",
    },
    pageCount: 220,
    curriculumPath: "/mufredat?kategori=adab",
  },
  {
    id: "el-kulubud-daria",
    title: "El-Kulûbü'd-Dâria & Cevşenü'l-Kebîr",
    subtitle: "Yakarışlar Mecmuası ve Manevi Zırh",
    author: "Ahmed Ziyâüddin Gümüşhânevî",
    publisher: "Işık Yayınları",
    category: "dua-evrad",
    level: "all",
    targetGrades: [1, 2, 3, 4, 5, 6],
    description:
      "Peygamber Efendimiz'in (s.a.v.), Ehl-i Beyt'in ve büyük İslam kutuplarının Kur'an ve sünnet menşeli tazarru ve niyazlarını toplayan dua hazinesi.",
    curriculumRelevance:
      "Haftalık ve dönemsel vird, Cevşen takibi ve Esmâü'l-Hüsnâ tefekkür derslerinin manevi zeminini teşkil eder.",
    highlights: [
      "Cevşenü'l-Kebîr ve tefekkür isimleri",
      "Tercüman-ı İsm-i A'zam",
      "Celcelûtiye kasidesi",
      "Sabah-akşam sığınma duaları",
    ],
    coverColor: {
      bg: "from-fuchsia-950/80 to-purple-950/90",
      border: "border-fuchsia-500/40",
      text: "text-fuchsia-200",
      accent: "bg-fuchsia-500",
    },
    pageCount: 650,
    curriculumPath: "/mufredat?kategori=esma",
  },
  {
    id: "kirk-kirik-testi",
    title: "Kırk Kırık Testi Serisi",
    subtitle: "Çağın Sorularına İman ve Düşünce Ufkundan Cevaplar",
    author: "Fethullah Gülen",
    publisher: "Nil Yayınları",
    category: "risale-i-nur",
    level: "lise",
    targetGrades: [4, 5, 6],
    description:
      "Gönül hayatı, dava şuuru, kulluk disiplini ve modern çağın fikri buhranlarına yönelik sohbet ve mütalaalardan oluşan başvuru serisi.",
    curriculumRelevance:
      "48 haftalık Hocaefendi Sohbetleri ve lise 'Haftanın Konusu' derslerindeki tahlillerin kaynak arka planını oluşturur.",
    highlights: [
      "İç derinlik ve kalbî hayat",
      "Kolektif şuur ve istişare ruhu",
      "Ümit solukları ve ye'se karşı tavır",
      "Gençliğin fikri ve ahlaki muhafazası",
    ],
    coverColor: {
      bg: "from-zinc-900 to-stone-950",
      border: "border-zinc-500/40",
      text: "text-zinc-200",
      accent: "bg-zinc-400",
    },
    pageCount: 460,
    curriculumPath: "/mufredat?kategori=sohbet",
  },
];

export function getAllCurriculumBooks(): readonly CurriculumBook[] {
  return curriculumBooks;
}

export function getCurriculumBookById(id: string): CurriculumBook | undefined {
  return curriculumBooks.find((book) => book.id === id);
}

export function filterCurriculumBooks(params: {
  category?: BookCategory | "all";
  level?: BookLevel | "all";
  grade?: number;
  query?: string;
}): readonly CurriculumBook[] {
  const { category = "all", level = "all", grade, query } = params;
  const normalizedQuery = query?.trim().toLowerCase() ?? "";

  return curriculumBooks.filter((book) => {
    if (category !== "all" && book.category !== category) {
      return false;
    }

    if (level !== "all" && book.level !== "all" && book.level !== level) {
      return false;
    }

    if (grade && !book.targetGrades.includes(grade)) {
      return false;
    }

    if (normalizedQuery) {
      const matchTitle = book.title.toLowerCase().includes(normalizedQuery);
      const matchSubtitle = book.subtitle?.toLowerCase().includes(normalizedQuery) ?? false;
      const matchAuthor = book.author.toLowerCase().includes(normalizedQuery);
      const matchDesc = book.description.toLowerCase().includes(normalizedQuery);
      const matchHighlights = book.highlights.some((h) =>
        h.toLowerCase().includes(normalizedQuery)
      );

      if (!matchTitle && !matchSubtitle && !matchAuthor && !matchDesc && !matchHighlights) {
        return false;
      }
    }

    return true;
  });
}

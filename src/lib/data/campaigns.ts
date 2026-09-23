/**
 * JetAcademie Öğrenci Gelişim Kampanyaları Veri Havuzu
 *
 * Dönemsel okuma maratonları, manevi hedefler, dua halkaları ve cemaat seferberlikleri.
 */

export type CampaignCategory = "okuma" | "dua-zikir" | "ibadet-namaz" | "ahlak-hizmet";
export type CampaignStatus = "active" | "upcoming" | "completed";

export interface Campaign {
  readonly id: string;
  readonly title: string;
  readonly slogan: string;
  readonly category: CampaignCategory;
  readonly status: CampaignStatus;
  readonly badge: string;
  readonly period: string;
  readonly daysLeft?: number;
  readonly participantsCount: number;
  readonly targetGoal: string;
  readonly progressPercent: number;
  readonly description: string;
  readonly motivationQuote: string;
  readonly quoteSource: string;
  readonly guidanceSteps: readonly string[];
  readonly rewards: readonly string[];
  readonly themeColor: {
    readonly bgGradient: string;
    readonly border: string;
    readonly text: string;
    readonly badgeBg: string;
    readonly badgeText: string;
    readonly barColor: string;
  };
}

export const CAMPAIGN_CATEGORIES: readonly {
  readonly id: CampaignCategory | "all";
  readonly label: string;
  readonly shortLabel: string;
}[] = [
  { id: "all", label: "Tüm Kampanyalar", shortLabel: "Tümü" },
  { id: "okuma", label: "Kitap Okuma Maratonu", shortLabel: "Kitap" },
  { id: "dua-zikir", label: "Dua & Zikir Halkası", shortLabel: "Dua" },
  { id: "ibadet-namaz", label: "İbadet & Namaz İstikameti", shortLabel: "Namaz" },
  { id: "ahlak-hizmet", label: "Ahlak & İyilik Seferberliği", shortLabel: "Ahlak" },
];

export const CAMPAIGN_STATUS_TABS: readonly {
  readonly id: CampaignStatus;
  readonly label: string;
}[] = [
  { id: "active", label: "Aktif Kampanyalar" },
  { id: "upcoming", label: "Yaklaşanlar" },
  { id: "completed", label: "Tamamlananlar" },
];

export const campaigns: readonly Campaign[] = [
  {
    id: "30-gunde-1-kitap",
    title: "30 Günde 1 Kitap Maratonu",
    slogan: "Her gün 15 sayfa ile ayda bir tefekkür eserini bitiriyoruz.",
    category: "okuma",
    status: "active",
    badge: "Popüler · Devam Ediyor",
    period: "Güz Dönemi Okuma Seferberliği",
    daysLeft: 12,
    participantsCount: 148,
    targetGoal: "Günde 15 sayfa · Toplam 450 sayfa",
    progressPercent: 68,
    description:
      "Öğrencilerimizin düzenli kitap okuma alışkanlığı kazanması ve müfredat eserlerini sindirerek bitirmesi için düzenlenen 30 günlük okuma maratonu.",
    motivationQuote:
      "Kitapsız yaşamak; kör, sağır ve dilsiz yaşamaktır. Bir milletin ruh haritası kütüphanelerinde çizilir.",
    quoteSource: "Bediüzzaman Said Nursi",
    guidanceSteps: [
      "Günde en az 15 sayfa kesintisiz okuma saati belirle.",
      "Okuduğun bölümlerde aklına takılan 1 soruyu not defterine kaydet.",
      "Haftalık online/yüz yüze müzakere halkasına katıl ve tefekkürünü paylaş.",
      "Ay sonunda kitap özet formunu tamamlayarak dijital rozetini kazan.",
    ],
    rewards: [
      "30 Günlük Kitap Kurdu Başarı Rozeti",
      "Sene sonu gelişim karnesine +50 Teşvik Puanı",
      "Bir sonraki dönemin seçkin kaynak eseri hediyesi",
    ],
    themeColor: {
      bgGradient: "from-rose-950/60 to-zinc-950",
      border: "border-rose-500/40",
      text: "text-rose-200",
      badgeBg: "bg-rose-500/20",
      badgeText: "text-rose-300",
      barColor: "bg-gradient-to-r from-rose-500 to-amber-500",
    },
  },
  {
    id: "100k-salavat-halkasi",
    title: "100.000 Salavat-ı Şerife Halkası",
    slogan: "Efendimiz'e (s.a.v.) muhabbetle gönülleri birleştiriyoruz.",
    category: "dua-zikir",
    status: "active",
    badge: "Manevi İklim",
    period: "Mevlid & Siyer Ayı",
    daysLeft: 8,
    participantsCount: 312,
    targetGoal: "Kişi başı günlük 100 Salavat · Toplam 100.000",
    progressPercent: 84,
    description:
      "Belçika genelindeki JetAcademie talebelerinin ortaklaşa oluşturduğu manevi hediye halkası. Her gün çekilen salavatlar havuzda toplanır.",
    motivationQuote:
      "Kıyamet gününde insanların bana en yakını, bana en çok salât ü selâm getirenidir.",
    quoteSource: "Hadis-i Şerif (Tirmizî, Vitir, 21)",
    guidanceSteps: [
      "Her gün sabah veya akşam namazı sonrasında en az 100 Salavat-ı Şerife oku.",
      "Uygulama üzerinden günlük hedefini işaretle.",
      "Cuma günleri Efendimiz'in hayatından 1 kesiti ailesine anlat.",
    ],
    rewards: ["Muhabbet ve Salavat Rozeti", "Ortak Hatim ve Dua Meclisine İsim Katılımı"],
    themeColor: {
      bgGradient: "from-emerald-950/60 to-zinc-950",
      border: "border-emerald-500/40",
      text: "text-emerald-200",
      badgeBg: "bg-emerald-500/20",
      badgeText: "text-emerald-300",
      barColor: "bg-gradient-to-r from-emerald-500 to-teal-400",
    },
  },
  {
    id: "sabah-namazi-istikameti",
    title: "40 Gün Sabah Namazı İstikameti",
    slogan: "Güne seher aydınlığı ve cemaat ruhuyla başlama seferberliği.",
    category: "ibadet-namaz",
    status: "active",
    badge: "İstikamet Zinciri",
    period: "40 Günlük Disiplin Programı",
    daysLeft: 19,
    participantsCount: 86,
    targetGoal: "40 gün aralıksız vaktinde sabah namazı",
    progressPercent: 52,
    description:
      "Sabahın feyzini kaçırmamak, vaktinde uyanmak ve güne manevi dinamizmle adım atmak isteyen öğrenciler için 40 günlük istikamet programı.",
    motivationQuote: "Kim sabah namazını kılarsa, o Allah’ın himayesindedir.",
    quoteSource: "Hadis-i Şerif (Müslim, Mesâcid, 261)",
    guidanceSteps: [
      "Akşam erken yatma disiplini edin (en geç 22:30).",
      "Sabah ezanıyla birlikte uyan ve abdestini huşu ile al.",
      "Namaz sonrası en az 5 dakika tesbihat ve dua ile meşgul ol.",
      "Uygulamadaki günlük namaz tikini işaretle.",
    ],
    rewards: ["Seher Muhafızı Özel İstikamet Rozeti", "Özel Sabah Namazı ve Dua Buluşması Daveti"],
    themeColor: {
      bgGradient: "from-amber-950/60 to-zinc-950",
      border: "border-amber-500/40",
      text: "text-amber-200",
      badgeBg: "bg-amber-500/20",
      badgeText: "text-amber-300",
      barColor: "bg-gradient-to-r from-amber-500 to-yellow-400",
    },
  },
  {
    id: "aileye-hurmet-ve-iyilik",
    title: "Aileye Hürmet ve İyilik Seferberliği",
    slogan: "Bu hafta her gün anne-babama ve kardeşlerime bir sürpriz yapıyorum.",
    category: "ahlak-hizmet",
    status: "active",
    badge: "Haftanın Meydan Okuması",
    period: "Adab ve Nezaket Haftası",
    daysLeft: 4,
    participantsCount: 204,
    targetGoal: "Haftada 7 farklı nezaket ve hürmet eylemi",
    progressPercent: 76,
    description:
      "Müfredatımızın 'Anne-Baba ve Büyüklere Hürmet Hattı' kapsamında; evde sofra kurmaya yardım etme, tatlı dille hitap etme ve hayır duası alma kampanyası.",
    motivationQuote:
      "Rabbin rızası anne babanın rızasındadır; Rabbin öfkesi de anne babanın öfkesindedir.",
    quoteSource: "Hadis-i Şerif (Tirmizî, Birr, 3)",
    guidanceSteps: [
      "Pazartesi: Anne-babanın elini öp ve içtenlikle teşekkür et.",
      "Salı: Kendi odanı topla ve ortak alandaki bir işe yardım et.",
      "Çarşamba: Anneye bir bardak çay/su ikram edip duasını iste.",
      "Perşembe: Kardeşinle paylaşabileceğin küçük bir ikram hazırla.",
      "Cuma: Ailece oturup birlikte 1 ayet ve 1 hadis müzakere edin.",
      "Hafta Sonu: Büyükanne/büyükbabanı telefonla ara ve halini hatırını sor.",
    ],
    rewards: ["Hürmet ve Vefa Nişanı", "Aile Takdir Sertifikası"],
    themeColor: {
      bgGradient: "from-sky-950/60 to-zinc-950",
      border: "border-sky-500/40",
      text: "text-sky-200",
      badgeBg: "bg-sky-500/20",
      badgeText: "text-sky-300",
      barColor: "bg-gradient-to-r from-sky-500 to-cyan-400",
    },
  },
  {
    id: "ramazan-hatim-halkasi",
    title: "Ramazan-ı Şerif Kur'an & Meal Hatmi",
    slogan: "Günde 1 cüz tilavet ve meal tefekkürü ile Ramazan'ı ihya ediyoruz.",
    category: "okuma",
    status: "upcoming",
    badge: "Yakında Başlıyor",
    period: "Ramazan Ayı Boyunca",
    participantsCount: 95,
    targetGoal: "30 günde 30 Cüz Kuran ve Açıklamalı Meal",
    progressPercent: 0,
    description:
      "Ramazan ayında her gün 1 cüz okuma ve Suat Yıldırım mealinden günün öne çıkan ayetlerini tahlil etme ortak hatim halkası.",
    motivationQuote: "Ramazan ayı, insanlara yol gösterici olan Kur'an'ın indirildiği aydır.",
    quoteSource: "Bakara Sûresi, 185",
    guidanceSteps: [
      "Cüz taksimine katıl veya kendi ferdi hatmini başlat.",
      "Günün cüzünün meal özetini oku.",
      "Her gün 1 ayeti tefekkür günlüğüne yaz.",
    ],
    rewards: ["Ramazan Hatim Sertifikası", "Kadir Gecesi Ortak Hatim Duasına Katılım"],
    themeColor: {
      bgGradient: "from-purple-950/60 to-zinc-950",
      border: "border-purple-500/40",
      text: "text-purple-200",
      badgeBg: "bg-purple-500/20",
      badgeText: "text-purple-300",
      barColor: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
  },
  {
    id: "yaz-donemi-siyer-kampanyasi",
    title: "Yaz Dönemi 55 Günlük Siyer Kampanyası",
    slogan: "Sonsuz Nur rehberliğinde Asr-ı Saadet'e yolculuk.",
    category: "okuma",
    status: "completed",
    badge: "Başarıyla Tamamlandı",
    period: "Geçen Yaz Dönemi",
    participantsCount: 260,
    targetGoal: "55 günde 55 Peygamberimiz kesiti",
    progressPercent: 100,
    description:
      "Yaz tatilini bereketlendirmek amacıyla uygulanan 55 günlük Peygamber Efendimiz'in (s.a.v.) ahlak ve mübarek hayatı okuma programı.",
    motivationQuote: "Şüphesiz sen yüce bir ahlâk üzeresin.",
    quoteSource: "Kalem Sûresi, 4",
    guidanceSteps: [
      "55 gün boyunca her gün 1 kesiti tamamla.",
      "Haftalık online bilgi yarışmasına katıl.",
    ],
    rewards: ["Siyer Bilgi Şampiyonu Madalyası", "Koleksiyonluk Siyer Kitap Seti"],
    themeColor: {
      bgGradient: "from-zinc-900 to-zinc-950",
      border: "border-zinc-700",
      text: "text-zinc-300",
      badgeBg: "bg-zinc-800",
      badgeText: "text-zinc-400",
      barColor: "bg-emerald-500",
    },
  },
];

export function getAllCampaigns(): readonly Campaign[] {
  return campaigns;
}

export function getCampaignById(id: string): Campaign | undefined {
  return campaigns.find((c) => c.id === id);
}

export function filterCampaigns(params: {
  category?: CampaignCategory | "all";
  status?: CampaignStatus;
  query?: string;
}): readonly Campaign[] {
  const { category = "all", status, query } = params;
  const normalizedQuery = query?.trim().toLowerCase() ?? "";

  return campaigns.filter((c) => {
    if (status && c.status !== status) {
      return false;
    }

    if (category !== "all" && c.category !== category) {
      return false;
    }

    if (normalizedQuery) {
      const matchTitle = c.title.toLowerCase().includes(normalizedQuery);
      const matchSlogan = c.slogan.toLowerCase().includes(normalizedQuery);
      const matchDesc = c.description.toLowerCase().includes(normalizedQuery);
      const matchGoal = c.targetGoal.toLowerCase().includes(normalizedQuery);

      if (!matchTitle && !matchSlogan && !matchDesc && !matchGoal) {
        return false;
      }
    }

    return true;
  });
}

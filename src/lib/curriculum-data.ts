import { Heart, BookOpen, Star, Users, Feather, Sparkles, type LucideIcon } from "lucide-react";

export interface CurriculumModule {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  description: string;
  topics: string[];
  weeks: number;
  hours: number;
}

export const curriculumModules: CurriculumModule[] = [
  {
    id: "akaid",
    slug: "akaid",
    number: "01",
    title: "Akaid — İnanç Esasları",
    subtitle: "Tevhid ve İman",
    icon: Star,
    color: "amber",
    description:
      "İslam inancının temel taşları: Allah'ın birliği, melekler, kitaplar, peygamberler, ahiret ve kader. Sağlam bir iman bilinci inşa etmek için kelam ilminin özü.",
    topics: [
      "Tevhid — Allah'ın Birliği ve Sıfatları",
      "İmanın Altı Şartı ve Delilleri",
      "Mezheplerin Akaid Anlayışları",
      "Günümüzde İnanç Problemleri ve Çözümleri",
    ],
    weeks: 6,
    hours: 18,
  },
  {
    id: "ibadet",
    slug: "ibadet",
    number: "02",
    title: "İbadet — Kulluk ve Amel",
    subtitle: "Namaz, Oruç ve Dua",
    icon: BookOpen,
    color: "emerald",
    description:
      "Farz ibadetlerin fıkhi temelleri ve manevi boyutları. Namazın huşusu, orucun hikmeti, zekâtın toplumsal etkisi ve haccın sembolik anlamları.",
    topics: [
      "Namazın Fıkhı ve Huşu Eğitimi",
      "Oruç, Zekât ve Hac İbadetlerinin Hikmetleri",
      "Dua ve Zikir Adabı",
      "İbadetlerde Niyet ve İhlas",
    ],
    weeks: 8,
    hours: 24,
  },
  {
    id: "ahlak",
    slug: "ahlak",
    number: "03",
    title: "Ahlâk — Güzel Karakter",
    subtitle: "Edep ve Fazilet",
    icon: Heart,
    color: "rose",
    description:
      "Peygamber ahlâkını model alan karakter eğitimi. Sabır, şükür, tevazu, cömertlik ve merhamet gibi erdemlerin günlük hayata taşınması.",
    topics: [
      "Peygamber Ahlâkı ve Sünnet-i Seniyye",
      "Nefis Terbiyesi ve Kalp Temizliği",
      "Kul Hakkı ve Toplumsal Sorumluluk",
      "Öfke Kontrolü, Sabır ve Şükür",
    ],
    weeks: 6,
    hours: 18,
  },
  {
    id: "siyer",
    slug: "siyer",
    number: "04",
    title: "Siyer — Peygamber'in Hayatı",
    subtitle: "Hz. Muhammed (s.a.v.)",
    icon: Users,
    color: "sky",
    description:
      "Efendimiz'in doğumundan vefatına kadar hayatının kronolojik ve tematik incelenmesi. Mekke ve Medine dönemleri, savaşlar, antlaşmalar ve ibretli hadiseler.",
    topics: [
      "Mekke Dönemi — Vahyin Başlangıcı",
      "Hicret ve Medine Toplumunun Kuruluşu",
      "Bedir'den Mekke Fethine Büyük Hadiseler",
      "Veda Hutbesi ve Evrensel Mesajlar",
    ],
    weeks: 8,
    hours: 24,
  },
  {
    id: "tefsir",
    slug: "tefsir",
    number: "05",
    title: "Tefsir — Kur'an Anlayışı",
    subtitle: "Ayetlerin Tefekkürü",
    icon: Feather,
    color: "violet",
    description:
      "Kur'an-ı Kerim'in nüzul sebepleri, meal okuma yöntemleri ve seçilmiş surelerin detaylı tefsiri. Ayetlerden hayata rehberlik çıkarmayı öğrenmek.",
    topics: [
      "Kur'an İlimleri ve Tefsir Usulü",
      "Fatiha ve Kısa Surelerin Detaylı Tefsiri",
      "Kıssa Sureleri ve İbretler",
      "Kur'an'ı Günlük Hayata Tatbik Etme",
    ],
    weeks: 10,
    hours: 30,
  },
  {
    id: "tasavvuf",
    slug: "tasavvuf",
    number: "06",
    title: "Tasavvuf — Manevi Yolculuk",
    subtitle: "Kalbin Arınması",
    icon: Sparkles,
    color: "fuchsia",
    description:
      "İslam'ın iç boyutu: nefis mertebeleri, zikir, murakabe, tevekkül ve rıza makamları. Sufi gelenekten günümüze uygulanan manevi arınma pratikleri.",
    topics: [
      "Nefsin Yedi Mertebesi",
      "Zikir, Murakabe ve Tefekkür",
      "Büyük Mutasavvıfların Hayatları ve Öğretileri",
      "Günlük Hayatta Manevi Disiplin",
    ],
    weeks: 8,
    hours: 24,
  },
];

export function getModuleBySlug(slug: string): CurriculumModule | undefined {
  return curriculumModules.find((m) => m.slug === slug);
}

import type { CurriculumEntry } from "@/lib/curriculum";

const monthSlugs: Record<number, string> = {
  1: "ocak",
  2: "subat",
  3: "mart",
  4: "nisan",
  5: "mayis",
  6: "haziran",
  7: "temmuz",
  8: "agustos",
  9: "eylul",
  10: "ekim",
  11: "kasim",
  12: "aralik",
};

function makeEsmaEntryId(
  month: number,
  week: number,
  grade: number = 1,
  isExtra: boolean = false,
  extraOrder?: number
): string {
  const prefix = grade === 1 ? "" : `g${grade}-`;
  if (isExtra) {
    return `${prefix}esma-extra-${extraOrder ?? 1}`;
  }
  const monthSlug = monthSlugs[month] ?? `m${month}`;
  return `${prefix}esma-${monthSlug}-${week}`;
}

export interface EsmaCurriculumItem {
  weekNumber: number;
  name: string;
  arabic: string;
  meaning: string;
  title: string;
  body: string;
}

export const ESMA_ARABIC_MAP: Record<string, string> = {
  "EL-CEM\u00ceL": "\u0627\u064e\u0644\u0652\u062c\u064e\u0645\u0650\u064a\u0644\u064f",
  "ER-RAHM\u00c2N": "\u0627\u064e\u0644\u0631\u064e\u0651\u062d\u0652\u0645\u0670\u0646\u064f",
  "ER-RAH\u00ceM": "\u0627\u064e\u0644\u0631\u064e\u0651\u062d\u0650\u064a\u0645\u064f",
  "ER-RA\u00dbF": "\u0627\u064e\u0644\u0631\u064e\u0651\u0624\u064f\u0648\u0641\u064f",
  "EL-MUHS\u0130N": "\u0627\u064e\u0644\u0652\u0645\u064f\u062d\u0652\u0633\u0650\u0646\u064f",
  "EL-KER\u00ceM": "\u0627\u064e\u0644\u0652\u0643\u064e\u0631\u0650\u064a\u0645\u064f",
  "EL-MENN\u00c2N": "\u0627\u064e\u0644\u0652\u0645\u064e\u0646\u064e\u0651\u0627\u0646\u064f",
  "ER-REZZ\u00c2K": "\u0627\u064e\u0644\u0631\u064e\u0651\u0632\u064e\u0651\u0627\u0642\u064f",
  "EL-LAT\u00ceF": "\u0627\u064e\u0644\u0644\u064e\u0651\u0637\u0650\u064a\u0641\u064f",
  "EL-VED\u00dbD": "\u0627\u064e\u0644\u0652\u0648\u064e\u062f\u064f\u0648\u062f\u064f",
  "EL-HAB\u00ceB": "\u0627\u064e\u0644\u0652\u062d\u064e\u0628\u0650\u064a\u0628\u064f",
  "EL-H\u00c2LIK": "\u0627\u064e\u0644\u0652\u062e\u064e\u0627\u0644\u0650\u0642\u064f",
  "EL-B\u00c2R\u0130": "\u0627\u064e\u0644\u0652\u0628\u064e\u0627\u0631\u0650\u0626\u064f",
  "EL-MUSAVV\u0130R":
    "\u0627\u064e\u0644\u0652\u0645\u064f\u0635\u064e\u0648\u0650\u0651\u0631\u064f",
  "ES-S\u00dcBH\u00c2N": "\u0627\u0644\u0633\u064f\u0651\u0628\u0652\u062d\u064e\u0627\u0646\u064f",
  "EL-AZ\u00ceM": "\u0627\u064e\u0644\u0652\u0639\u064e\u0638\u0650\u064a\u0645\u064f",
  "EL-AL\u0130YY": "\u0627\u064e\u0644\u0652\u0639\u064e\u0644\u0650\u064a\u064f\u0651",
  "EL-M\u00dcTE\u00c2L":
    "\u0627\u064e\u0644\u0652\u0645\u064f\u062a\u064e\u0639\u064e\u0627\u0644\u0650",
  "ES-SULT\u00c2N": "\u0627\u0644\u0633\u064f\u0651\u0644\u0652\u0637\u064e\u0627\u0646\u064f",
  "EL-KAD\u00ceR": "\u0627\u064e\u0644\u0652\u0642\u064e\u062f\u0650\u064a\u0631\u064f",
  "EL-KAHH\u00c2R": "\u0627\u064e\u0644\u0652\u0642\u064e\u0647\u064e\u0651\u0627\u0631\u064f",
  "EL-CEBB\u00c2R": "\u0627\u064e\u0644\u0652\u062c\u064e\u0628\u064e\u0651\u0627\u0631\u064f",
  "EL-GAN\u00ce": "\u0627\u064e\u0644\u0652\u063a\u064e\u0646\u0650\u064a\u064f\u0651",
  "ES-SAMED": "\u0627\u0644\u0635\u064e\u0651\u0645\u064e\u062f\u064f",
  "EL-FERD": "\u0627\u064e\u0644\u0652\u0641\u064e\u0631\u0652\u062f\u064f",
  "EL-EHAD": "\u0627\u064e\u0644\u0652\u0623\u064e\u062d\u064e\u062f\u064f",
  "EL-V\u0130TR": "\u0627\u064e\u0644\u0652\u0648\u0650\u062a\u0652\u0631\u064f",
  "EL-B\u00c2K\u00ce": "\u0627\u064e\u0644\u0652\u0628\u064e\u0627\u0642\u0650\u064a",
  "EL-HAYY": "\u0627\u064e\u0644\u0652\u062d\u064e\u064a\u064f\u0651",
  "EL-KAYY\u00dbM": "\u0627\u064e\u0644\u0652\u0642\u064e\u064a\u064f\u0651\u0648\u0645\u064f",
  "EL-AL\u00ceM": "\u0627\u064e\u0644\u0652\u0639\u064e\u0644\u0650\u064a\u0645\u064f",
  "EL-HAB\u00ceR": "\u0627\u064e\u0644\u0652\u062e\u064e\u0628\u0650\u064a\u0631\u064f",
  "ES-SEM\u00ce": "\u0627\u0644\u0633\u064e\u0651\u0645\u0650\u064a\u0639\u064f",
  "EL-BAS\u00ceR": "\u0627\u064e\u0644\u0652\u0628\u064e\u0635\u0650\u064a\u0631\u064f",
  "EL-MUC\u00ceB": "\u0627\u064e\u0644\u0652\u0645\u064f\u062c\u0650\u064a\u0628\u064f",
  "EL-M\u00dcSTE\u00c2N":
    "\u0627\u064e\u0644\u0652\u0645\u064f\u0633\u0652\u062a\u064e\u0639\u064e\u0627\u0646\u064f",
  "EL-H\u00c2D\u00ce": "\u0627\u064e\u0644\u0652\u0647\u064e\u0627\u062f\u0650\u064a",
  "EL-FETT\u00c2H": "\u0627\u064e\u0644\u0652\u0641\u064e\u062a\u064e\u0651\u0627\u062d\u064f",
  "EL-K\u00c2F\u00ce": "\u0627\u064e\u0644\u0652\u0643\u064e\u0627\u0641\u0650\u064a",
  "EL-EM\u00c2N": "\u0627\u064e\u0644\u0652\u0623\u064e\u0645\u064e\u0627\u0646\u064f",
  "E\u015e-\u015e\u00c2F\u00ce": "\u0627\u0644\u0634\u064e\u0651\u0627\u0641\u0650\u064a",
  "EL-MU\u00c2F\u00ce": "\u0627\u064e\u0644\u0652\u0645\u064f\u0639\u064e\u0627\u0641\u0650\u064a",
  "EL-GAFF\u00c2R": "\u0627\u064e\u0644\u0652\u063a\u064e\u0641\u064e\u0651\u0627\u0631\u064f",
  "ES-SETT\u00c2R": "\u0627\u0644\u0633\u064e\u0651\u062a\u064e\u0651\u0627\u0631\u064f",
  "EL-ADL": "\u0627\u064e\u0644\u0652\u0639\u064e\u062f\u0652\u0644\u064f",
  "ED-DEYY\u00c2N": "\u0627\u0644\u062f\u064e\u0651\u064a\u064e\u0651AN\u064f",
  "ES-S\u00c2DIKU\u2019L-VA\u2018D":
    "\u0635\u064e\u0627\u062f\u0650\u0642\u064f \u0627\u0644\u0652\u0648\u064e\u0639\u0652\u062f\u0650",
  "EL-MAHM\u00dbD":
    "\u0627\u064e\u0644\u0652\u0645\u064e\u062d\u0652\u0645\u064f\u0648\u062f\u064f",
  "EL-MEC\u00ceD": "\u0627\u064e\u0644\u0652\u0645\u064e\u062c\u0650\u064a\u062f\u064f",
  "EL-HANN\u00c2N": "\u0627\u064e\u0644\u0652\u062d\u064e\u0646\u064e\u0651AN\u064f",
  "EL-MA\u2018R\u00dbF":
    "\u0627\u064e\u0644\u0652\u0645\u064e\u0639\u0652\u0631\u064f\u0648\u0641\u064f",
  "EL-B\u00dcRH\u00c2N":
    "\u0627\u064e\u0644\u0652\u0628\u064f\u0631\u0652\u0647\u064e\u0627\u0646\u064f",
  "EL-GAR\u00ceB": "\u0627\u064e\u0644\u0652\u063a\u064e\u0631\u0650\u064a\u0628\u064f",
  "EL-AT\u00dbF": "\u0627\u064e\u0644\u0652\u0639\u064e\u0637\u064f\u0648\u0641\u064f",
  ALLAH: "\u0627\u064e\u0644\u0644\u0651\u0670\u0647\u064f",
};

export function getEsmaArabic(nameOrTitleOrId?: string): string | undefined {
  if (!nameOrTitleOrId) return undefined;
  if (ESMA_ARABIC_MAP[nameOrTitleOrId]) return ESMA_ARABIC_MAP[nameOrTitleOrId];
  const clean = nameOrTitleOrId.split(/[—–-]/)[0]?.trim();
  if (clean && ESMA_ARABIC_MAP[clean]) return ESMA_ARABIC_MAP[clean];
  const upper = nameOrTitleOrId.toUpperCase();
  for (const [key, val] of Object.entries(ESMA_ARABIC_MAP)) {
    if (upper.includes(key)) return val;
  }
  return undefined;
}

/**
 * Ortaokul (1., 2. ve 3. Sınıflar) için 55 haftalık Esmâü'l-Hüsnâ müfredatı
 * Zenginleştirilmiş kâinat örnekleri ve tefekkür açıklamalarıyla.
 */
export const ortaokulEsmaCurriculum: readonly EsmaCurriculumItem[] = [
  {
    weekNumber: 1,
    name: "EL-CEM\u00ceL",
    arabic: "\u0627\u064e\u0644\u0652\u062c\u064e\u0645\u0650\u064a\u0644\u064f",
    meaning: "G\u00fczel olan, g\u00fczellik veren.",
    title: "EL-CEM\u00ceL \u2014 G\u00fczel olan, g\u00fczellik veren.",
    body: "K\u00e2inatta nereye baksak g\u00f6z kama\u015ft\u0131r\u0131c\u0131 bir g\u00fczellikle kar\u015f\u0131la\u015f\u0131r\u0131z. Kelebeklerin kanatlar\u0131ndaki mikroskobik renk pullar\u0131, g\u00fcn bat\u0131m\u0131nda g\u00f6ky\u00fcz\u00fcn\u00fcn k\u0131z\u0131la b\u00fcr\u00fcnen tablosu, tavus ku\u015funun kuyru\u011fundaki zarif nak\u0131\u015flar ve k\u0131\u015f\u0131n ya\u011fan her bir kar tanesinin birbirine benzemeyen alt\u0131gen kristal geometrisi... B\u00fct\u00fcn bu harika manzaralar, sonsuz g\u00fczellik sahibi olan El-Cem\u00eel Rabbimizin sanat\u0131n\u0131 g\u00f6sterir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Bir g\u00fcl goncas\u0131 a\u00e7arken yaln\u0131zca rengiyle de\u011fil, yapraklar\u0131n\u0131n kadife dokusu ve yayd\u0131\u011f\u0131 e\u015fsiz kokusuyla da k\u00e2inat bah\u00e7esini s\u00fcsler. Cem\u00eel olan Allah, varl\u0131klar\u0131 sadece ya\u015fatmakla kalmam\u0131\u015f; onlar\u0131 seyreden g\u00f6zlere s\u00fcrur ve ne\u015fe verecek \u015fekilde donatm\u0131\u015ft\u0131r.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** \u00c7evremizdeki g\u00fczellikleri seyrederken as\u0131l G\u00fczellik Sahibini hat\u0131rlamak kalbimizi \u015f\u00fck\u00fcrle doldurur. Biz de s\u00f6zlerimizi, ahl\u00e2k\u0131m\u0131z\u0131 ve davran\u0131\u015flar\u0131m\u0131z\u0131 g\u00fczelle\u015ftirerek Cem\u00eel ismine ayna olmaya gayret ederiz.",
  },
  {
    weekNumber: 2,
    name: "ER-RAHM\u00c2N",
    arabic: "\u0627\u064e\u0644\u0631\u064e\u0651\u062d\u0652\u0645\u0670\u0646\u064f",
    meaning: "Merhameti b\u00fct\u00fcn varl\u0131klar\u0131 ku\u015fatan.",
    title: "ER-RAHM\u00c2N \u2014 Merhameti b\u00fct\u00fcn varl\u0131klar\u0131 ku\u015fatan.",
    body: "Rahm\u00e2n ismi, Allah\u2019\u0131n sonsuz merhametinin hi\u00e7bir ayr\u0131m yapmadan b\u00fct\u00fcn yarat\u0131lm\u0131\u015flar\u0131 kucaklamas\u0131 demektir. G\u00fcne\u015fin \u0131\u015f\u0131\u011f\u0131 zengin-fakir, k\u00fc\u00e7\u00fck-b\u00fcy\u00fck, inanan-inanmayan demeden herkesi \u0131s\u0131t\u0131r; ya\u011fmur bulutlar\u0131 da\u011flara da vadilere de ayn\u0131 c\u00f6mertlikle hayat ta\u015f\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** D\u00fcnyam\u0131z\u0131n etraf\u0131n\u0131 saran atmosfer tabakas\u0131n\u0131 d\u00fc\u015f\u00fcnelim. Canl\u0131lar\u0131n nefes almas\u0131 i\u00e7in gereken oksijeni sa\u011flar, uzaydan gelen dondurucu so\u011fu\u011fa ve zararl\u0131 radyasyonlara kar\u015f\u0131 devasa bir koruyucu \u015femsiye gibi durur. Okyanuslardaki dev balinalardan yaprak alt\u0131ndaki minik kar\u0131ncalara kadar milyarlarca canl\u0131n\u0131n ihtiyac\u0131 her saniye bu umumi rahmetle kar\u015f\u0131lan\u0131r.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Rabbimizin herkese ula\u015fan bu geni\u015f rahmetini fark eden bir gen\u00e7, t\u00fcm canl\u0131lara \u015fefkat nazar\u0131yla bakar; bir kar\u0131ncay\u0131 incitmemeye, sokak hayvanlar\u0131na su vermeye ve insanlara kar\u015f\u0131 merhametli olmaya \u00f6zen g\u00f6sterir.",
  },
  {
    weekNumber: 3,
    name: "ER-RAH\u00ceM",
    arabic: "\u0627\u064e\u0644\u0631\u064e\u0651\u062d\u0650\u064a\u0645\u064f",
    meaning: "\u00c7ok merhamet eden.",
    title: "ER-RAH\u00ceM \u2014 \u00c7ok merhamet eden.",
    body: "Rah\u00eem ismi, Allah\u2019\u0131n hususi merhametini, kullar\u0131na olan \u00f6zel \u015fefkatini ve iyilik yapanlara m\u00fck\u00e2fat\u0131n\u0131 kat kat art\u0131rmas\u0131n\u0131 anlat\u0131r. \u0130nsan hata yapt\u0131\u011f\u0131nda kap\u0131lar y\u00fcz\u00fcne kapanmaz; samimi bir t\u00f6vbe ve dua ile Rabbine s\u0131\u011f\u0131nd\u0131\u011f\u0131nda ilahi merhametin kollar\u0131n\u0131 a\u00e7t\u0131\u011f\u0131n\u0131 hisseder.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** V\u00fccudumuzda \u00e7al\u0131\u015fan ba\u011f\u0131\u015f\u0131kl\u0131k ordusunu d\u00fc\u015f\u00fcnelim. Parma\u011f\u0131m\u0131za k\u00fc\u00e7\u00fcc\u00fck bir k\u0131ym\u0131k batt\u0131\u011f\u0131nda veya derimiz \u00e7izildi\u011finde, akyuvarlar ve p\u0131ht\u0131la\u015fma h\u00fccreleri hemen olay yerine ko\u015far, yaray\u0131 tamir eder ve bizi enfeksiyondan korur. Her gece uyku nimetiyle yorulan bedenimize s\u00fck\u00fbnet verilmesi ve sabah din\u00e7 bir \u015fekilde yeni bir g\u00fcne uyand\u0131r\u0131lmam\u0131z da Rah\u00eem isminin \u015fefkatli bir dokunu\u015fudur.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Rah\u00eem olan Allah\u2019a inanan insan asla \u00fcmitsizli\u011fe d\u00fc\u015fmez. Bir hata yapt\u0131\u011f\u0131nda hemen ba\u011f\u0131\u015flanma diler; \u00e7evresindeki arkada\u015flar\u0131n\u0131n kusurlar\u0131n\u0131 affetmeyi ve onlara anlay\u0131\u015fla yakla\u015fmay\u0131 \u00f6\u011frenir.",
  },
  {
    weekNumber: 4,
    name: "ER-RA\u00dbF",
    arabic: "\u0627\u064e\u0644\u0631\u064e\u0651\u0624\u064f\u0648\u0641\u064f",
    meaning: "\u00c7ok \u015fefkatli olan.",
    title: "ER-RA\u00dbF \u2014 \u00c7ok \u015fefkatli olan.",
    body: "Ra\u00fbf, \u015fefkati son derece derin, ac\u0131yan ve kullar\u0131n\u0131n zorluk ya\u015famas\u0131na raz\u0131 olmayan demektir. Allah, kullar\u0131na ta\u015f\u0131yamayacaklar\u0131 y\u00fckleri y\u00fcklemez ve en \u00e7aresiz anlar\u0131nda onlara umulmad\u0131k kolayl\u0131klar l\u00fctfeder.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Yeni do\u011fmu\u015f minik bir yavruyu g\u00f6z\u00fcm\u00fcz\u00fcn \u00f6n\u00fcne getirelim. Di\u015fleri yoktur, kendi kendine beslenemez ve y\u00fcr\u00fcyemez. Tam o anda, annesinin sinesinde onun i\u00e7in en ideal s\u0131cakl\u0131kta, en besleyici ve mikroplara kar\u015f\u0131 koruyucu tertemiz bir s\u00fct haz\u0131r edilir. D\u00fcnyadaki b\u00fct\u00fcn annelerin ve babalar\u0131n kalbine yerle\u015ftirilen o kar\u015f\u0131l\u0131ks\u0131z \u015fefkat, Ra\u00fbf olan Rabbimizin sonsuz \u015fefkatinin k\u00fc\u00e7\u00fcc\u00fck bir damlas\u0131d\u0131r.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Ra\u00fbf ismini \u00f6\u011frenen bir gen\u00e7, anne ve babas\u0131n\u0131n de\u011ferini daha iyi anlar; k\u00fc\u00e7\u00fck karde\u015flerine, ya\u015fl\u0131lara ve sokaktaki muhta\u00e7 canl\u0131lara kar\u015f\u0131 derin bir incelik ve \u015fefkatle yakla\u015f\u0131r.",
  },
  {
    weekNumber: 5,
    name: "EL-MUHS\u0130N",
    arabic: "\u0627\u064e\u0644\u0652\u0645\u064f\u062d\u0652\u0633\u0650\u0646\u064f",
    meaning: "\u0130yilik ve ihsanda bulunan.",
    title: "EL-MUHS\u0130N \u2014 \u0130yilik ve ihsanda bulunan.",
    body: "Muhsin, hi\u00e7bir zorunluluk olmad\u0131\u011f\u0131 halde kullar\u0131na bol bol ihsanda bulunan, her i\u015fi en g\u00fczel ve m\u00fckemmel \u015fekilde yapand\u0131r. Allah bizi sadece var etmekle kalmam\u0131\u015f; hayat\u0131m\u0131z\u0131 say\u0131s\u0131z lezzet, renk ve nimetle donatm\u0131\u015ft\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Ya\u015famak i\u00e7in sadece kuru bir ekmek ve su yetebilirdi. Fakat Muhsin olan Rabbimiz; elmay\u0131 sulu ve tatl\u0131, \u00e7ile\u011fi kokulu, karpuzu ferahlat\u0131c\u0131, kavunu mis kokulu yaratm\u0131\u015ft\u0131r. G\u00f6ky\u00fcz\u00fcn\u00fc dinlendirici masmavi bir renge, yery\u00fcz\u00fcn\u00fc huzur veren yemye\u015fil \u00f6rt\u00fcye b\u00fcr\u00fcnd\u00fcrm\u00fc\u015ft\u00fcr. Biz istemeden ve akl\u0131m\u0131za bile gelmeden say\u0131s\u0131z ikram\u0131 \u00f6n\u00fcm\u00fcze sermi\u015ftir.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Muhsin ismini kalbine yerle\u015ftiren ki\u015fi iki g\u00fczel ahlak kazan\u0131r: Birincisi, her an Allah\u2019\u0131n huzurunda oldu\u011funu bilerek ibadet ve i\u015flerini en g\u00fczel \u015fekilde yapmak (ihsan \u015fuuru); ikincisi ise insanlara kar\u015f\u0131l\u0131k beklemeden iyilikte bulunmakt\u0131r.",
  },
  {
    weekNumber: 6,
    name: "EL-KER\u00ceM",
    arabic: "\u0627\u064e\u0644\u0652\u0643\u064e\u0631\u0650\u064a\u0645\u064f",
    meaning: "\u00c7ok c\u00f6mert, ikram\u0131 bol olan.",
    title: "EL-KER\u00ceM \u2014 \u00c7ok c\u00f6mert, ikram\u0131 bol olan.",
    body: "Ker\u00eem, kar\u015f\u0131l\u0131k beklemeden veren, ikram\u0131 sonsuz olan ve hazinelerinden harcamakla hi\u00e7bir \u015feyi eksilmeyen demektir. Y\u00fcce Rabbimiz, yaratt\u0131\u011f\u0131 kullar\u0131na c\u00f6mertli\u011fin en y\u00fcce misallerini g\u00f6stermi\u015ftir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** K\u00fc\u00e7\u00fcc\u00fck, kupkuru ve simsiyah bir incir \u00e7ekirde\u011fini topra\u011fa g\u00f6md\u00fc\u011f\u00fcm\u00fczde ne olur? Birka\u00e7 y\u0131l sonra devasa bir a\u011fa\u00e7 boy verir ve dallar\u0131ndan binlerce tatl\u0131 incir sarkar! Bir bu\u011fday tanesi topra\u011fa d\u00fc\u015fer, ba\u015fak verir ve bire yedi y\u00fcz tane ba\u011f\u0131\u015flar. Toprak \u00e2deta bir ikram sofras\u0131, bulutlar ise o sofray\u0131 sulayan c\u00f6mert s\u00fcrahiler gibidir.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Ker\u00eem olan Allah\u2019\u0131n nimetleriyle beslendi\u011fini bilen bir insan, elindeki imk\u00e2nlar\u0131 cimrice saklamaz. Har\u00e7l\u0131\u011f\u0131n\u0131, bilgisini, g\u00fcler y\u00fcz\u00fcn\u00fc ve vaktini arkada\u015flar\u0131yla payla\u015farak c\u00f6mertli\u011fin tad\u0131n\u0131 ya\u015far.",
  },
  {
    weekNumber: 7,
    name: "EL-MENN\u00c2N",
    arabic: "\u0627\u064e\u0644\u0652\u0645\u064e\u0646\u064e\u0651\u0627\u0646\u064f",
    meaning: "\u00c7ok\u00e7a nimet veren.",
    title: "EL-MENN\u00c2N \u2014 \u00c7ok\u00e7a nimet veren.",
    body: "Menn\u00e2n, say\u0131s\u0131z ve hesaps\u0131z nimetleri ard\u0131 ard\u0131na veren, l\u00fctfunu kullar\u0131n\u0131n \u00fczerinden bir an bile kesmeyen demektir. Bize verilen nimetler \u00f6ylesine s\u00fcreklidir ki bazen al\u0131\u015fkanl\u0131ktan \u00f6t\u00fcr\u00fc onlar\u0131n b\u00fcy\u00fckl\u00fc\u011f\u00fcn\u00fc fark edemeyiz.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Her g\u00fcn ortalama 20 bin defa nefes al\u0131p veririz. Kalbimiz g\u00fcnde yakla\u015f\u0131k 100 bin kez, biz uyurken bile durmaks\u0131z\u0131n kan pompalar. G\u00fcne\u015f her sabah tam vaktinde do\u011far; su d\u00f6ng\u00fcs\u00fc buharla\u015fma ve ya\u011f\u0131\u015fla yery\u00fcz\u00fcn\u00fc hi\u00e7 aksatmadan temizler ve sular. Bu kesintisiz nimet ak\u0131\u015f\u0131, Menn\u00e2n olan Rabbimizin bizi bir an bile unutmad\u0131\u011f\u0131n\u0131 kan\u0131tlar.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Menn\u00e2n ismini d\u00fc\u015f\u00fcnen bir insan 'Bende ne eksik?' diye \u015fik\u00e2yet etmek yerine, 'Bana kar\u015f\u0131l\u0131ks\u0131z neler verilmi\u015f?' diye tefekk\u00fcr eder. \u015e\u00fckretmeyi hayat\u0131n\u0131n merkezine koyar ve sahip olduklar\u0131n\u0131n k\u0131ymetini bilir.",
  },
  {
    weekNumber: 8,
    name: "ER-REZZ\u00c2K",
    arabic: "\u0627\u064e\u0644\u0631\u064e\u0651\u0632\u064e\u0651\u0627\u0642\u064f",
    meaning: "R\u0131z\u0131k veren.",
    title: "ER-REZZ\u00c2K \u2014 R\u0131z\u0131k veren.",
    body: "Rezz\u00e2k, yaratt\u0131\u011f\u0131 b\u00fct\u00fcn canl\u0131lar\u0131n madd\u00ee ve m\u00e2nev\u00ee r\u0131zk\u0131n\u0131 veren, kimseyi a\u00e7 ve sahipsiz b\u0131rakmayan demektir. Yery\u00fcz\u00fcndeki trilyonlarca canl\u0131n\u0131n sofras\u0131 her g\u00fcn kusursuz bir d\u00fczenle kurulur.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Okyanusun kilometrelerce derinli\u011findeki zifiri karanl\u0131k sularda ya\u015fayan \u0131\u015f\u0131kl\u0131 fener bal\u0131klar\u0131n\u0131, topra\u011f\u0131n alt\u0131nda g\u00f6zleri g\u00f6rmeyen k\u00f6stebekleri veya a\u011fa\u00e7 kabuklar\u0131n\u0131n aras\u0131na gizlenmi\u015f b\u00f6cekleri d\u00fc\u015f\u00fcnelim. Hi\u00e7biri a\u00e7l\u0131ktan unutulmaz; her birinin \u00f6n\u00fcne kabiliyetine ve yap\u0131s\u0131na en uygun besin tam vaktinde ula\u015ft\u0131r\u0131l\u0131r. Ku\u015flar sabah kar\u0131nlar\u0131 bo\u015f \u00e7\u0131kar, ak\u015fam doymu\u015f olarak yuvalar\u0131na d\u00f6nerler.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Rezz\u00e2k ismini bilen insan, r\u0131z\u0131k endi\u015fesiyle korkuya kap\u0131lmaz. \u00c7al\u0131\u015f\u0131r, gayret eder, tohumunu eker; fakat r\u0131zk\u0131 verenin sebepler de\u011fil Allah oldu\u011funu bilir. \u0130sraftan ka\u00e7\u0131n\u0131r ve kazanc\u0131n\u0131 helal yoldan kazanmaya dikkat eder.",
  },
  {
    weekNumber: 9,
    name: "EL-LAT\u00ceF",
    arabic: "\u0627\u064e\u0644\u0644\u064e\u0651\u0637\u0650\u064a\u0641\u064f",
    meaning: "L\u00fctfu ince ve g\u00fczel olan.",
    title: "EL-LAT\u00ceF \u2014 L\u00fctfu ince ve g\u00fczel olan.",
    body: "Lat\u00eef, en gizli ve ince noktalara kadar n\u00fcfuz eden, kullar\u0131na fark ettirmeden pek ince yollarla l\u00fctufta bulunan demektir. O\u2019nun i\u015flerinde kaba kuvvet de\u011fil, ak\u0131llar\u0131 hayrette b\u0131rakan bir zarafet ve incelik vard\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Devasa bir \u00e7\u0131nar a\u011fac\u0131n\u0131n k\u00f6klerinden emilen su damlalar\u0131n\u0131 d\u00fc\u015f\u00fcnelim. Bu su molek\u00fclleri, yer\u00e7ekimine meydan okuyarak metrelerce y\u00fckseklikteki en u\u00e7taki minik bir yapra\u011f\u0131n damarlar\u0131na kadar sessizce, hi\u00e7 g\u00fcr\u00fclt\u00fc koparmadan t\u0131rman\u0131r. Topra\u011f\u0131n sert tabakas\u0131n\u0131 narin bir filizin ipek gibi yumu\u015fac\u0131k u\u00e7lar\u0131yla delip g\u00fcne\u015fe \u00e7\u0131kmas\u0131, Lat\u00eef isminin k\u00e2inattaki muazzam inceli\u011fini anlat\u0131r.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Hayat\u0131m\u0131zda ilk bak\u0131\u015fta s\u0131radan g\u00f6r\u00fcnen ama sonradan b\u00fcy\u00fck hay\u0131rlara vesile olan olaylar\u0131 fark etmek bize Lat\u00eef ismini hat\u0131rlat\u0131r. Biz de insanlarla ili\u015fkilerimizde nazik, k\u0131r\u0131c\u0131 olmayan ve ince d\u00fc\u015f\u00fcnceli bir ahlak sergileriz.",
  },
  {
    weekNumber: 10,
    name: "EL-VED\u00dbD",
    arabic: "\u0627\u064e\u0644\u0652\u0648\u064e\u062f\u064f\u0648\u062f\u064f",
    meaning: "Seven ve sevilen.",
    title: "EL-VED\u00dbD \u2014 Seven ve sevilen.",
    body: "Ved\u00fbd, mahlukat\u0131n\u0131 \u00e7ok seven, onlara kendini sevdiren ve sevilmeye en \u00e7ok lay\u0131k olan demektir. K\u00e2inat\u0131n yarat\u0131l\u0131\u015f mayas\u0131 sevgidir; varl\u0131klar birbirlerine d\u00fc\u015fmanl\u0131k i\u00e7in de\u011fil, muhabbet ve ahenk i\u00e7in yarat\u0131lm\u0131\u015ft\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** \u00c7i\u00e7eklerin \u00fczerindeki rengarenk desenler ve yayd\u0131klar\u0131 cezbedici kokular, kelebekleri ve ar\u0131lar\u0131 kendilerine \u00e7a\u011f\u0131r\u0131r. Ar\u0131 nektar al\u0131rken \u00e7i\u00e7e\u011fin tozla\u015fmas\u0131na yard\u0131m eder; aralar\u0131nda tatl\u0131 bir sevgi ve yard\u0131mla\u015fma ba\u011f\u0131 kurulur. Ku\u015flar\u0131n yuvalar\u0131ndaki yavrular\u0131na yem ta\u015f\u0131rken duyduklar\u0131 heyecan ve hayvanlar\u0131n birbirini \u015fefkatle yalamas\u0131, k\u00e2inat\u0131n Ved\u00fbd olan Rabbimizin sevgisiyle ku\u015fat\u0131ld\u0131\u011f\u0131n\u0131 g\u00f6sterir.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Kalbimiz sevmek i\u00e7in yarat\u0131lm\u0131\u015ft\u0131r. Ved\u00fbd ismini \u00f6\u011frenen insan, sevgisini ge\u00e7ici ve de\u011fersiz \u015feylerde t\u00fcketmez; her \u015feyden \u00f6nce Rabbini sever ve O\u2019nun r\u0131zas\u0131 i\u00e7in insanlar\u0131, tabiat\u0131 ve canl\u0131lar\u0131 muhabbetle kucaklar.",
  },
  {
    weekNumber: 11,
    name: "EL-HAB\u00ceB",
    arabic: "\u0627\u064e\u0644\u0652\u062d\u064e\u0628\u0650\u064a\u0628\u064f",
    meaning: "Sevgili, sevilen.",
    title: "EL-HAB\u00ceB \u2014 Sevgili, sevilen.",
    body: "Hab\u00eeb, g\u00f6n\u00fcllerin ger\u00e7ek sevgilisi, sevgisiyle kalpleri dolduran ve dostlu\u011funa g\u00fcvenilen demektir. \u0130nsan kalbi \u00f6yle yarat\u0131lm\u0131\u015ft\u0131r ki en derin huzuru ancak ger\u00e7ek Sevgiliyi buldu\u011funda yakalar.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Bahar mevsimi geldi\u011finde yery\u00fcz\u00fc adeta bir bayram yerine d\u00f6ner. A\u011fa\u00e7lar \u00e7i\u00e7ek a\u00e7ar, sular \u015f\u0131r\u0131ldayarak akar, g\u00f6ky\u00fcz\u00fc p\u0131r\u0131l p\u0131r\u0131l parlar. B\u00fct\u00fcn bu bayram havas\u0131, Sevgilinin (Hab\u00eeb olan Allah'\u0131n) kullar\u0131na g\u00f6nderdi\u011fi birer hediye mektubu gibidir. Ku\u015flar\u0131n sabah\u0131n seher vaktinde ne\u015feyle \u015fak\u0131mas\u0131 bu il\u00e2h\u00ee dosta duyulan sevgiyi terenn\u00fcm eder.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Hab\u00eeb olan Rabbimizle dost olan bir gen\u00e7 asla yaln\u0131zl\u0131k \u00e7ekmez. \u0130badetlerinde, duas\u0131nda ve Kur'an okurken en sevdi\u011fi dostuyla bulu\u015fman\u0131n huzurunu ve tatl\u0131 heyecan\u0131n\u0131 ya\u015far.",
  },
  {
    weekNumber: 12,
    name: "EL-H\u00c2LIK",
    arabic: "\u0627\u064e\u0644\u0652\u062e\u064e\u0627\u0644\u0650\u0642\u064f",
    meaning: "Yaratan.",
    title: "EL-H\u00c2LIK \u2014 Yaratan.",
    body: "H\u00e2l\u0131k, hi\u00e7bir \u015fey yokken her \u015feyi yoktan var eden, yaratt\u0131\u011f\u0131 varl\u0131klar\u0131n \u00f6l\u00e7\u00fcs\u00fcn\u00fc ve takdirini belirleyen Y\u00fcce Yarat\u0131c\u0131d\u0131r. O'nun yaratmas\u0131 ge\u00e7mi\u015fte olup bitmi\u015f de\u011fildir; her an yeni ba\u015ftan yaratmaya devam eder.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Uzay bilimcilerin tespitine g\u00f6re evrende en az 2 trilyon galaksi ve her galakside y\u00fcz milyarlarca y\u0131ld\u0131z vard\u0131r! Ayn\u0131 anda mikro-d\u00fcnyada, insan v\u00fccudunda her bir saniyede milyonlarca yeni h\u00fccre yarat\u0131lmakta, eskiyenler yenilenmektedir. Bir damla suyun i\u00e7inde ya\u015fayan y\u00fcz binlerce mikroorganizma bile H\u00e2l\u0131k isminin durmaks\u0131z\u0131n i\u015fleyen yaratma mucizesini hayk\u0131r\u0131r.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Kendimizin ve k\u00e2inat\u0131n bir Yarat\u0131c\u0131s\u0131 oldu\u011funu bilmek bize b\u00fcy\u00fck bir g\u00fcven ve sorumluluk verir. Kendi ba\u015f\u0131m\u0131za b\u0131rak\u0131lm\u0131\u015f de\u011filiz; bizi yoktan var eden ve her an ya\u015fatan bir Sahibimiz vard\u0131r.",
  },
  {
    weekNumber: 13,
    name: "EL-B\u00c2R\u0130",
    arabic: "\u0627\u064e\u0644\u0652\u0628\u064e\u0627\u0631\u0650\u0626\u064f",
    meaning: "Varl\u0131klar\u0131 uygun ve d\u00fczenli yaratan.",
    title: "EL-B\u00c2R\u0130 \u2014 Varl\u0131klar\u0131 uygun ve d\u00fczenli yaratan.",
    body: "B\u00e2ri, yaratt\u0131\u011f\u0131 varl\u0131klar\u0131 birbirine son derece uyumlu, kusursuz bir nizam i\u00e7inde ve hi\u00e7bir \u00f6rne\u011fe ihtiya\u00e7 duymadan var eden demektir. K\u00e2inatta hi\u00e7bir \u015feyde e\u011frilik, uyumsuzluk veya \u00e7at\u0131\u015fma yoktur.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Ku\u015flar\u0131n g\u00f6vdesini d\u00fc\u015f\u00fcnelim: Kemikleri havada kolayca u\u00e7abilmesi i\u00e7in hafif ve i\u00e7i bo\u015flukludur; kanatlar\u0131 hava ak\u0131m\u0131n\u0131 en iyi \u015fekilde kesecek kavise sahiptir. Bal\u0131klar\u0131n solunga\u00e7lar\u0131 sudaki oksijeni \u00e7ekecek bi\u00e7imde, derileri ise suyun s\u00fcrt\u00fcnmesini azaltacak pullarla kaplanm\u0131\u015ft\u0131r. Her canl\u0131, ya\u015fayaca\u011f\u0131 \u00e7evreye milimetrik bir uyum i\u00e7inde (B\u00e2ri tecellisiyle) yarat\u0131lm\u0131\u015ft\u0131r.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** K\u00e2inattaki bu muhte\u015fem uyumu g\u00f6ren bir \u00f6\u011frenci; derslerinde, odas\u0131nda ve g\u00fcnl\u00fck planlar\u0131nda d\u00fczenli, tertipli ve dengeli olmay\u0131 \u00f6\u011frenir; da\u011f\u0131n\u0131kl\u0131ktan ve israftan uzak durur.",
  },
  {
    weekNumber: 14,
    name: "EL-MUSAVV\u0130R",
    arabic: "\u0627\u064e\u0644\u0652\u0645\u064f\u0635\u064e\u0648\u0650\u0651\u0631\u064f",
    meaning: "\u015eekil ve \u00f6zellik veren.",
    title: "EL-MUSAVV\u0130R \u2014 \u015eekil ve \u00f6zellik veren.",
    body: "Musavvir, her varl\u0131\u011fa kendine has bir bi\u00e7im, suret, y\u00fcz ve \u00f6zellik veren; onlar\u0131 birbirinden ay\u0131rt edilecek g\u00fczellikte \u015fekillendiren demektir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** D\u00fcnyada \u015fu an ya\u015fayan 8 milyar insan\u0131 d\u00fc\u015f\u00fcnelim. Her birinin iki g\u00f6z\u00fc, bir burnu ve bir a\u011fz\u0131 vard\u0131r; fakat hi\u00e7 kimsenin y\u00fcz\u00fc bir ba\u015fkas\u0131n\u0131nkinin t\u0131pat\u0131p ayn\u0131s\u0131 de\u011fildir! Parmak izlerimiz, g\u00f6z\u00fcm\u00fczdeki iris tabakas\u0131 ve hatta ses tonumuz bile yaln\u0131zca bize \u00f6zeldir. Deniz alt\u0131ndaki rengarenk kabuklular, zebralar\u0131n her bireyde farkl\u0131 olan \u00e7izgileri Musavvir isminin e\u015fsiz sanat\u0131d\u0131r.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Kendimizi ba\u015fkalar\u0131yla k\u0131yaslay\u0131p \u00fcz\u00fclmek yerine, Allah\u2019\u0131n bizi benzersiz bir suret ve kabiliyetle yaratt\u0131\u011f\u0131n\u0131 hat\u0131rlar\u0131z. Bize bah\u015fedilen bu \u00f6zel donan\u0131m\u0131 iyiye ve g\u00fczele kullanarak \u015f\u00fckrederiz.",
  },
  {
    weekNumber: 15,
    name: "ES-S\u00dcBH\u00c2N",
    arabic: "\u0627\u0644\u0633\u064f\u0651\u0628\u0652\u062d\u064e\u0627\u0646\u064f",
    meaning: "Her t\u00fcrl\u00fc eksiklikten uzak olan.",
    title: "ES-S\u00dcBH\u00c2N \u2014 Her t\u00fcrl\u00fc eksiklikten uzak olan.",
    body: "S\u00fcbh\u00e2n, her t\u00fcrl\u00fc kusurdan, eksiklikten, acizlikten ve noksanl\u0131ktan sonsuz derecede uzak ve y\u00fcce olan demektir. K\u00e2inattaki hi\u00e7bir varl\u0131\u011fa benzemez ve hi\u00e7bir \u015feye ihtiyac\u0131 yoktur.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** \u0130nsanlar\u0131n yapt\u0131\u011f\u0131 en geli\u015fmi\u015f makineler, bilgisayarlar ve otomobiller zamanla bozulur, eskir, pili biter veya bak\u0131ma muhta\u00e7 olur. Oysa milyarlarca y\u0131ld\u0131r d\u00f6nen D\u00fcnya, G\u00fcne\u015f ve gezegenler sisteminde hi\u00e7bir aksama, gecikme ya da yorulma g\u00f6remezsiniz. Evrendeki fizik kanunlar\u0131 ilk g\u00fcnk\u00fc kusursuzlukla t\u0131k\u0131r t\u0131k\u0131r i\u015fler. Bu m\u00fckemmellik, S\u00fcbh\u00e2n olan Rabbimizin noksanl\u0131ktan uzakl\u0131\u011f\u0131n\u0131 g\u00f6sterir.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Namazlar\u0131m\u0131zda 'S\u00fcbh\u00e2nellah' (Allah her kusurdan uzakt\u0131r) derken k\u00e2inattaki bu kusursuzlu\u011fu hat\u0131rlar\u0131z. Ba\u015f\u0131m\u0131za gelen olaylarda Allah\u2019a asla isyan etmeyiz; O\u2019nun her i\u015finde bir hikmet ve hay\u0131r oldu\u011funu biliriz.",
  },
  {
    weekNumber: 16,
    name: "EL-AZ\u00ceM",
    arabic: "\u0627\u064e\u0644\u0652\u0639\u064e\u0638\u0650\u064a\u0645\u064f",
    meaning: "Pek y\u00fcce olan.",
    title: "EL-AZ\u00ceM \u2014 Pek y\u00fcce olan.",
    body: "Az\u00eem, b\u00fcy\u00fckl\u00fc\u011f\u00fc, kudreti ve \u015fan\u0131 hi\u00e7bir \u00f6l\u00e7\u00fcye s\u0131\u011fmayan, ak\u0131llar\u0131n azametini kavramaktan aciz kald\u0131\u011f\u0131 Pek Y\u00fcce Rabbimizdir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Gece ba\u015f\u0131m\u0131z\u0131 g\u00f6ky\u00fcz\u00fcne kald\u0131rd\u0131\u011f\u0131m\u0131zda g\u00f6rd\u00fc\u011f\u00fcm\u00fcz Samanyolu galaksisini d\u00fc\u015f\u00fcnelim. \u0130\u00e7inde yakla\u015f\u0131k 400 milyar y\u0131ld\u0131z vard\u0131r ve \u0131\u015f\u0131k h\u0131z\u0131yla (saniyede 300 bin km) bir ucundan di\u011ferine gitmek 100 bin y\u0131l s\u00fcrer! Evrende bu Samanyolu gibi trilyonlarca galaksi bo\u015flukta birer nokta gibi as\u0131l\u0131 durmaktad\u0131r. K\u00e2inat bu kadar b\u00fcy\u00fckken, onu bir saniyede yaratan ve avucunun i\u00e7inde tutan Rabbimizin azameti ne kadar b\u00fcy\u00fckt\u00fcr!\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** R\u00fckuya gitti\u011fimizde 'S\u00fcbh\u00e2ne Rabbiye'l-Az\u00eem' (Pek Y\u00fcce Rabbim her t\u00fcrl\u00fc noksandan uzakt\u0131r) deriz. O'nun azametini d\u00fc\u015f\u00fcnen bir insan, d\u00fcnyadaki hi\u00e7bir zorluktan korkmaz; kalbinde yaln\u0131zca Allah korkusu ve sayg\u0131s\u0131 ta\u015f\u0131r.",
  },
  {
    weekNumber: 17,
    name: "EL-AL\u0130YY",
    arabic: "\u0627\u064e\u0644\u0652\u0639\u064e\u0644\u0650\u064a\u064f\u0651",
    meaning: "\u00c7ok y\u00fcce olan.",
    title: "EL-AL\u0130YY \u2014 \u00c7ok y\u00fcce olan.",
    body: "Aliyy, mertebesi, \u015ferefi, kudreti ve h\u00e2kimiyeti bak\u0131m\u0131ndan her \u015feyden \u00fcst\u00fcn ve y\u00fcce olan demektir. Hi\u00e7bir varl\u0131k O\u2019nun derecesine yakla\u015famaz.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Yery\u00fcz\u00fcnden g\u00f6ky\u00fcz\u00fcne, oradan y\u0131ld\u0131zlara ve atmosferin \u00f6tesine bakt\u0131\u011f\u0131m\u0131zda y\u00fckseklik kavram\u0131n\u0131 anlar\u0131z. Ancak Aliyy olan Allah'\u0131n y\u00fcceli\u011fi sadece mek\u00e2nla ilgili de\u011fildir; bilgi bak\u0131m\u0131ndan her bilenin \u00fcst\u00fcnde, g\u00fc\u00e7 bak\u0131m\u0131ndan her g\u00fc\u00e7l\u00fcn\u00fcn \u00fcst\u00fcnde, \u015fan bak\u0131m\u0131ndan her h\u00fck\u00fcmdar\u0131n kat kat fevkindedir. K\u00e2inattaki b\u00fct\u00fcn g\u00f6k cisimleri O\u2019nun y\u00fcce kudretinin alt\u0131nda boyun e\u011fmi\u015ftir.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Secdeye vard\u0131\u011f\u0131m\u0131zda ba\u015f\u0131m\u0131z\u0131 en a\u015fa\u011f\u0131ya, topra\u011fa koyar ve 'S\u00fcbh\u00e2ne Rabbiye'l-A'l\u00e2' (En Y\u00fcce olan Rabbim her t\u00fcrl\u00fc noksandan m\u00fcnezzehtir) deriz. Kul, Rabbine en \u00e7ok secdede yak\u0131n olur; \u00e7\u00fcnk\u00fc kibrini k\u0131r\u0131p O'nun y\u00fcceli\u011fini kabul etmi\u015ftir.",
  },
  {
    weekNumber: 18,
    name: "EL-M\u00dcTE\u00c2L",
    arabic: "\u0627\u064e\u0644\u0652\u0645\u064f\u062a\u064e\u0639\u064e\u0627\u0644\u0650",
    meaning: "Y\u00fcceli\u011fi her \u015feyin \u00fcst\u00fcnde olan.",
    title: "EL-M\u00dcTE\u00c2L \u2014 Y\u00fcceli\u011fi her \u015feyin \u00fcst\u00fcnde olan.",
    body: "M\u00fcte\u00e2l, yarat\u0131lm\u0131\u015flar\u0131n akl\u0131na gelebilecek her t\u00fcrl\u00fc s\u0131n\u0131r\u0131n, benzerli\u011fin, hayalin ve eksikli\u011fin \u00e7ok \u00e7ok \u00fcst\u00fcnde olan demektir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** \u0130nsan akl\u0131 muazzam bir ke\u015fif g\u00fcc\u00fcne sahiptir; mikroskopla h\u00fccrenin derinliklerini, teleskopla milyarlarca \u0131\u015f\u0131k y\u0131l\u0131 uzaktaki y\u0131ld\u0131zlar\u0131 g\u00f6rebilir. Ancak ne kadar d\u00fc\u015f\u00fcn\u00fcrsek d\u00fc\u015f\u00fcnelim, Allah\u2019\u0131n zat\u0131n\u0131 ve b\u00fcy\u00fckl\u00fc\u011f\u00fcn\u00fc hayal edemeyiz; \u00e7\u00fcnk\u00fc O, yaratt\u0131\u011f\u0131 her \u015feyden a\u015fk\u0131nd\u0131r. Zaman\u0131 ve mek\u00e2n\u0131 yaratan Allah, zamana ve mek\u00e2na s\u0131\u011fmaz.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** M\u00fcte\u00e2l ismini bilmek bizi taassuptan ve yanl\u0131\u015f inan\u00e7lardan korur. Allah\u2019\u0131 hi\u00e7bir insana, puta veya varl\u0131\u011fa benzetmeyiz. O\u2019nun b\u00fcy\u00fckl\u00fc\u011f\u00fcn\u00fc takdir ederek O\u2019na lay\u0131k bir sayg\u0131 ve edeple ibadet ederiz.",
  },
  {
    weekNumber: 19,
    name: "ES-SULT\u00c2N",
    arabic: "\u0627\u0644\u0633\u064f\u0651\u0644\u0652\u0637\u064e\u0627\u0646\u064f",
    meaning: "H\u00fck\u00fcm ve h\u00e2kimiyet sahibi.",
    title: "ES-SULT\u00c2N \u2014 H\u00fck\u00fcm ve h\u00e2kimiyet sahibi.",
    body: "Sult\u00e2n, m\u00fclk\u00fcnde diledi\u011fi gibi tasarruf eden, h\u00fckm\u00fcne kar\u015f\u0131 konulamayan ve k\u00e2inattaki b\u00fct\u00fcn h\u00e2kimiyetlerin ger\u00e7ek sahibi olan Allah\u2019t\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** K\u00e2inattaki yer\u00e7ekimi kanununa kim kar\u015f\u0131 koyabilir? Gece ile g\u00fcnd\u00fcz\u00fcn birbirini kovalamas\u0131n\u0131 kim durdurabilir? Milyonlarca ton a\u011f\u0131rl\u0131\u011f\u0131ndaki bulutlar g\u00f6ky\u00fcz\u00fcnde il\u00e2h\u00ee bir fermanla toplan\u0131r, r\u00fczg\u00e2r O\u2019nun emriyle eser ve ya\u011fmur yery\u00fcz\u00fcne iner. B\u00fct\u00fcn k\u00e2inat ordusu, tek bir Padi\u015fah\u0131n (Es-Sult\u00e2n) emrine harfiyen uyan itaatk\u00e2r neferler gibidir.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Ger\u00e7ek Sultan\u2019\u0131n Allah oldu\u011funu bilen bir m\u00fcmin; d\u00fcnyadaki zalim y\u00f6neticilerden veya sahte g\u00fc\u00e7lerden korkmaz. Sadece Allah\u2019\u0131n emirlerine uyar ve O\u2019nun adaletine g\u00fcvenir.",
  },
  {
    weekNumber: 20,
    name: "EL-KAD\u00ceR",
    arabic: "\u0627\u064e\u0644\u0652\u0642\u064e\u062f\u0650\u064a\u0631\u064f",
    meaning: "Her \u015feye g\u00fcc\u00fc yeten.",
    title: "EL-KAD\u00ceR \u2014 Her \u015feye g\u00fcc\u00fc yeten.",
    body: "Kad\u00eer, diledi\u011fi her \u015feyi diledi\u011fi anda ve \u015fekilde yapmaya g\u00fcc\u00fc yeten, kudretine hi\u00e7bir \u015fey zor gelmeyen Y\u00fcce Yarat\u0131c\u0131d\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Bir tek n\u00fckleer santral kurmak i\u00e7in binlerce bilim insan\u0131 y\u0131llarca \u00e7al\u0131\u015f\u0131r. Oysa G\u00fcne\u015fimiz, her bir saniyede y\u00fcz milyonlarca hidrojen bombas\u0131na denk bir enerjiyi sessizce ve milyarlarca y\u0131ld\u0131r hi\u00e7 t\u00fckenmeden \u00fcretmektedir. Bir avu\u00e7 kupkuru topraktan yemye\u015fil bir bah\u00e7e f\u0131\u015fk\u0131rtan, tek bir damla sudan d\u00fc\u015f\u00fcnen bir insan in\u015fa eden kudret Kad\u00eer olan Allah\u2019a aittir.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** \u00c7\u00f6z\u00fcms\u00fcz gibi g\u00f6r\u00fcnen dertlerimiz veya a\u015f\u0131lmas\u0131 imk\u00e2ns\u0131z gibi duran zorluklar\u0131m\u0131z oldu\u011funda Kad\u00eer ismine s\u0131\u011f\u0131n\u0131r\u0131z. Biliriz ki 'O ol der, her \u015fey oluverir.' Bu inan\u00e7 bize t\u00fckenmez bir \u00fcmit ve g\u00fc\u00e7 a\u015f\u0131lar.",
  },
  {
    weekNumber: 21,
    name: "EL-KAHH\u00c2R",
    arabic: "\u0627\u064e\u0644\u0652\u0642\u064e\u0647\u064e\u0651\u0627\u0631\u064f",
    meaning: "Kudreti kar\u015f\u0131s\u0131nda her \u015fey boyun e\u011fen.",
    title: "EL-KAHH\u00c2R \u2014 Kudreti kar\u015f\u0131s\u0131nda her \u015fey boyun e\u011fen.",
    body: "Kahh\u00e2r, her \u015feye galip gelen, azamet ve kudreti kar\u015f\u0131s\u0131nda hi\u00e7bir varl\u0131\u011f\u0131n direnemedi\u011fi ve b\u00fct\u00fcn zalimleri kahretmeye muktedir olan demektir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Bir volkan patlamas\u0131n\u0131, okyanuslar\u0131 aya\u011fa kald\u0131ran dev tsunamileri veya g\u00f6ky\u00fcz\u00fcn\u00fc yaran \u015fiddetli y\u0131ld\u0131r\u0131mlar\u0131 d\u00fc\u015f\u00fcnelim. \u0130nsano\u011flu yapt\u0131\u011f\u0131 en sa\u011flam binalarla, en ileri teknolojilerle bile bu kozmik g\u00fc\u00e7ler kar\u015f\u0131s\u0131nda bir saman \u00e7\u00f6p\u00fc gibi aciz kal\u0131r. Tarih boyunca g\u00fcc\u00fcne g\u00fcvenip zay\u0131flar\u0131 ezen kibirli firavunlar ve zalim kavimler Kahh\u00e2r isminin tecellisiyle yerle bir olmu\u015flard\u0131r.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Kahh\u00e2r ismi bize haddimizi bildirir; kibirlenmekten, insanlara zulmetmekten ve hak yemekten sak\u0131nd\u0131r\u0131r. D\u00fcnyada adaletin \u00e7i\u011fnendi\u011fini g\u00f6rd\u00fc\u011f\u00fcm\u00fczde, mazlumlar\u0131n hakk\u0131n\u0131 alacak bir Kahh\u00e2r\u2019\u0131n varl\u0131\u011f\u0131 kalbimize teselli verir.",
  },
  {
    weekNumber: 22,
    name: "EL-CEBB\u00c2R",
    arabic: "\u0627\u064e\u0644\u0652\u062c\u064e\u0628\u064e\u0651\u0627\u0631\u064f",
    meaning: "Kudreti \u00fcst\u00fcn olan, eksikleri gideren.",
    title: "EL-CEBB\u00c2R \u2014 Kudreti \u00fcst\u00fcn olan, eksikleri gideren.",
    body: "Cebb\u00e2r iki b\u00fcy\u00fck anlama gelir: Birincisi, diledi\u011fini zorlanmadan yapt\u0131ran \u00fcst\u00fcn g\u00fc\u00e7; ikincisi ise k\u0131r\u0131lan\u0131 onaran, yaralar\u0131 saran ve eksikleri tamamlayand\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Kolumuz veya baca\u011f\u0131m\u0131z k\u0131r\u0131ld\u0131\u011f\u0131nda doktorlar onu al\u00e7\u0131ya al\u0131r; fakat kemi\u011fin iki ucunu birbirine kaynatan, k\u0131r\u0131lan dokular\u0131 mikro-iplik\u00e7iklerle onaran bizzat v\u00fccudumuzdaki h\u00fccrelerdir (Cebb\u00e2r isminin tecellisi). Bir orman yang\u0131n\u0131ndan sonra simsiyah olan topra\u011f\u0131n aradan birka\u00e7 mevsim ge\u00e7ince yeniden filizlenip yemye\u015fil \u00f6rt\u00fcs\u00fcne kavu\u015fmas\u0131 da k\u0131r\u0131lan hayat\u0131n onar\u0131lmas\u0131d\u0131r.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Kalbimiz k\u0131r\u0131ld\u0131\u011f\u0131nda, \u00fcz\u00fcnt\u00fc ve kederle \u00e7\u00f6kt\u00fc\u011f\u00fcm\u00fczde Cebb\u00e2r olan Rabbimize el a\u00e7ar\u0131z: 'Ya C\u00e2bire k\u00fclli kes\u00eer' (Ey b\u00fct\u00fcn k\u0131r\u0131klar\u0131 onaran Rabbim, kalbimin k\u0131r\u0131klar\u0131n\u0131 sar). O bizi teselli eder ve yeniden aya\u011fa kald\u0131r\u0131r.",
  },
  {
    weekNumber: 23,
    name: "EL-GAN\u00ce",
    arabic: "\u0627\u064e\u0644\u0652\u063a\u064e\u0646\u0650\u064a\u064f\u0651",
    meaning: "Hi\u00e7bir \u015feye muhta\u00e7 olmayan.",
    title: "EL-GAN\u00ce \u2014 Hi\u00e7bir \u015feye muhta\u00e7 olmayan.",
    body: "Gan\u00ee, ger\u00e7ek zenginli\u011fin sahibi, hi\u00e7bir varl\u0131\u011fa ve hi\u00e7bir sebebe muhta\u00e7 olmayan, aksine her varl\u0131\u011f\u0131n O\u2019na muhta\u00e7 oldu\u011fu Y\u00fcce Allah\u2019t\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** D\u00fcnyadaki b\u00fct\u00fcn canl\u0131lar her g\u00fcn yer, i\u00e7er, oksijen t\u00fcketir ve enerji harcar. Milyonlarca y\u0131ld\u0131r bu trilyonlarca sofray\u0131 donatan Rabbimizin hazinelerinden ise zerre kadar bir \u015fey eksilmemi\u015ftir. Bir okyanustan bir i\u011fnenin ucuyla su alsan\u0131z okyanusta ne kadar eksilme olursa, b\u00fct\u00fcn mahlukat\u0131n ihtiya\u00e7lar\u0131 kar\u015f\u0131lansa Allah\u2019\u0131n m\u00fclk\u00fcnden o kadar bile eksilmez!\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Ger\u00e7ek zenginli\u011fin para ve pul de\u011fil, Allah\u2019a kul olmak oldu\u011funu anlar\u0131z. Gan\u00ee olan bir Sahibimiz varken ba\u015fkalar\u0131na minnet etmez, el a\u00e7may\u0131z; kanaatk\u00e2r ve c\u00f6mert bir g\u00f6n\u00fcl zenginli\u011fine kavu\u015furuz.",
  },
  {
    weekNumber: 24,
    name: "ES-SAMED",
    arabic: "\u0627\u0644\u0635\u064e\u0651\u0645\u064e\u062f\u064f",
    meaning:
      "Herkesin kendisine muhta\u00e7 oldu\u011fu, kendisi hi\u00e7bir \u015feye muhta\u00e7 olmayan.",
    title:
      "ES-SAMED \u2014 Herkesin kendisine muhta\u00e7 oldu\u011fu, kendisi hi\u00e7bir \u015feye muhta\u00e7 olmayan.",
    body: "Samed, b\u00fct\u00fcn varl\u0131klar\u0131n her ihtiyac\u0131nda do\u011frudan kendisine ba\u015fvurdu\u011fu, s\u0131\u011f\u0131nd\u0131\u011f\u0131 ve y\u00f6neldi\u011fi; kendisi ise hi\u00e7bir \u015feye muhta\u00e7 olmayan Y\u00fcce Rabbimizdir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Havada u\u00e7an bir sinekten okyanustaki mavi balinaya, yer alt\u0131ndaki tohumdan g\u00f6ky\u00fcz\u00fcndeki galaksilere kadar her varl\u0131k varl\u0131\u011f\u0131n\u0131 s\u00fcrd\u00fcrebilmek i\u00e7in her an Allah'a muhta\u00e7t\u0131r. Bir saniye bile O'nun kudreti ve g\u00f6zetimi \u00e7ekilse b\u00fct\u00fcn k\u00e2inat bir anda yoklu\u011fa yuvarlan\u0131r. Her nefes al\u0131\u015f\u0131m\u0131zda O\u2019na olan ihtiyac\u0131m\u0131z\u0131 bedenimizle itiraf ederiz.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** \u0130hlas Suresi'nde her g\u00fcn okudu\u011fumuz 'All\u00e2hu's-Samed' ayeti bize ger\u00e7ek s\u0131\u011f\u0131na\u011f\u0131m\u0131z\u0131n kim oldu\u011funu \u00f6\u011fretir. \u0130nsanlardan medet ummak yerine, her t\u00fcrl\u00fc derdimizi do\u011frudan Rabbimize a\u00e7ar ve sadece O'na g\u00fcveniriz.",
  },
  {
    weekNumber: 25,
    name: "EL-FERD",
    arabic: "\u0627\u064e\u0644\u0652\u0641\u064e\u0631\u0652\u062f\u064f",
    meaning: "Tek ve e\u015fsiz olan.",
    title: "EL-FERD \u2014 Tek ve e\u015fsiz olan.",
    body: "Ferd; z\u00e2t\u0131nda, s\u0131fatlar\u0131nda ve fiillerinde tek olan, e\u015fi, benzeri, orta\u011f\u0131 ve dengi bulunmayan demektir. K\u00e2inattaki her varl\u0131\u011fa da bu teklik ve e\u015fsizlik m\u00fchr\u00fcn\u00fc basm\u0131\u015ft\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** K\u0131\u015f\u0131n ya\u011fan kar tanelerini mikroskop alt\u0131nda inceleyen bilim insanlar\u0131 hayret verici bir ger\u00e7ekle kar\u015f\u0131la\u015fm\u0131\u015flard\u0131r: Ya\u011fan milyarlarca kar tanesinin her biri alt\u0131gen kristal yap\u0131s\u0131ndad\u0131r, fakat hi\u00e7birinin deseni bir di\u011ferinin ayn\u0131s\u0131 de\u011fildir! Aynen bunun gibi d\u00fcnyadaki hi\u00e7bir insan\u0131n parmak izi, g\u00f6z retinas\u0131 veya y\u00fcz hatlar\u0131 birbirine tam olarak benzemez. Bu e\u015fsizlik, onlar\u0131 yaratan Sanatk\u00e2r'\u0131n Ferd (tek ve benzersiz) oldu\u011funu g\u00f6sterir.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Ferd olan Allah\u2019a inanan bir gen\u00e7, kendisinin de bu d\u00fcnyada benzersiz bir vazife i\u00e7in yarat\u0131ld\u0131\u011f\u0131n\u0131 bilir. Zaman\u0131n\u0131 bo\u015fa harcamaz, kendine verilen \u00f6zel kabiliyetleri hay\u0131r yolunda geli\u015ftirir.",
  },
  {
    weekNumber: 26,
    name: "EL-EHAD",
    arabic: "\u0627\u064e\u0644\u0652\u0623\u064e\u062d\u064e\u062f\u064f",
    meaning: "Bir ve tek olan.",
    title: "EL-EHAD \u2014 Bir ve tek olan.",
    body: "Ehad; par\u00e7alara ayr\u0131lmayan, orta\u011f\u0131 ve benzeri olmayan, mutlak anlamda Bir oland\u0131r. B\u00fct\u00fcn k\u00e2inat O\u2019nun birli\u011finin \u015fahididir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Evrendeki fizik yasalar\u0131n\u0131 d\u00fc\u015f\u00fcnelim: D\u00fcnyam\u0131zda yer\u00e7ekimi nas\u0131l i\u015fliyorsa, milyonlarca \u0131\u015f\u0131k y\u0131l\u0131 uzaktaki bir galakside de yer\u00e7ekimi ayn\u0131 form\u00fclle i\u015fler. Buradaki su molek\u00fcl\u00fc ile Mars'taki buzullar\u0131n molek\u00fcler yap\u0131s\u0131 ayn\u0131 iki hidrojen ve bir oksijenden olu\u015fur. B\u00fct\u00fcn evrende ayn\u0131 kanunlar\u0131n, ayn\u0131 yap\u0131 ta\u015flar\u0131n\u0131n ge\u00e7erli olmas\u0131; k\u00e2inat\u0131n tek bir Ehad olan Yarat\u0131c\u0131n\u0131n eseri oldu\u011funu ispatlar.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Ehad olan Allah\u2019a iman etmek, kalbimizi b\u00f6l\u00fck p\u00f6r\u00e7\u00fck olmaktan kurtar\u0131r. Farkl\u0131 sahte g\u00fc\u00e7lerin pe\u015finde ko\u015fmaz; yaln\u0131zca Bir olan Rabbimizin r\u0131zas\u0131n\u0131 arar, huzurlu ve dosdo\u011fru bir hayat ya\u015far\u0131z.",
  },
  {
    weekNumber: 27,
    name: "EL-V\u0130TR",
    arabic: "\u0627\u064e\u0644\u0652\u0648\u0650\u062a\u0652\u0631\u064f",
    meaning: "Tek olan, teki seven.",
    title: "EL-V\u0130TR \u2014 Tek olan, teki seven.",
    body: "Vitr, tek olan, dengi ve benzeri bulunmayan demektir. Peygamber Efendimiz (sav) \u015f\u00f6yle buyurmu\u015ftur: 'Allah tektir, teki sever.'\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** G\u00fcne\u015f sistemimizin merkezinde tek bir G\u00fcne\u015f vard\u0131r ve b\u00fct\u00fcn gezegenler bu tek merkezin etraf\u0131nda muazzam bir ahenkle d\u00f6ner. \u0130nsan bedenini y\u00f6neten tek bir beyin ve tek bir kalp vard\u0131r. E\u011fer bir \u00fclkede iki padi\u015fah, bir s\u0131n\u0131fta iki m\u00fcd\u00fcr veya bir arabada iki \u015fof\u00f6r olsayd\u0131 karga\u015fa \u00e7\u0131kard\u0131. K\u00e2inattaki bu muhte\u015fem d\u00fczen, tek bir Y\u00f6neticinin (El-Vitr) varl\u0131\u011f\u0131n\u0131 g\u00f6sterir.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Yats\u0131 namaz\u0131ndan sonra k\u0131ld\u0131\u011f\u0131m\u0131z Vitir namaz\u0131 bize bu ismi hat\u0131rlat\u0131r. Hayat\u0131m\u0131zda teklik, d\u00fcr\u00fcstl\u00fck ve sadeli\u011fi ilke edinir; kalbimizi tek bir amaca, Allah'\u0131n r\u0131zas\u0131na odaklar\u0131z.",
  },
  {
    weekNumber: 28,
    name: "EL-B\u00c2K\u00ce",
    arabic: "\u0627\u064e\u0644\u0652\u0628\u064e\u0627\u0642\u0650\u064a",
    meaning: "Varl\u0131\u011f\u0131 sonsuz olan.",
    title: "EL-B\u00c2K\u00ce \u2014 Varl\u0131\u011f\u0131 sonsuz olan.",
    body: "B\u00e2k\u00ee, varl\u0131\u011f\u0131n\u0131n ba\u015flang\u0131c\u0131 olmad\u0131\u011f\u0131 gibi sonu da olmayan, ebed\u00ee ve d\u00e2im\u00ee oland\u0131r. K\u00e2inattaki her \u015fey do\u011far, ya\u015far ve \u00f6l\u00fcr; ancak Allah ebediyen diridir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Mevsimlerin ak\u0131\u015f\u0131n\u0131 seyredelim: \u0130lkbaharda ye\u015feren yapraklar, yaz\u0131n meyveye durur, sonbaharda sarar\u0131p topra\u011fa d\u00f6k\u00fcl\u00fcr ve k\u0131\u015f\u0131n yok olur. G\u00f6ky\u00fcz\u00fcndeki devasa y\u0131ld\u0131zlar bile yak\u0131tlar\u0131n\u0131 t\u00fcketip s\u00f6nerler. \u0130nsanlar, hayvanlar ve bitkiler f\u00e2nidir, gelip ge\u00e7erler. B\u00fct\u00fcn bu gelip ge\u00e7i\u015fler arkas\u0131nda hi\u00e7 de\u011fi\u015fmeyen, daima var olan Sonsuz B\u00e2k\u00ee Rabbimizi g\u00f6sterir.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** 'Y\u00e2 B\u00e2k\u00ee ente'l-B\u00e2k\u00ee' (Ey B\u00e2k\u00ee olan Allah\u0131m, ebed\u00ee olan ancak Sensin) diyerek fani d\u00fcnyan\u0131n ge\u00e7ici dertlerine a\u015f\u0131r\u0131 \u00fcz\u00fclmekten kurtuluruz. Kalbimizi ge\u00e7ici \u015feylere de\u011fil, ebed\u00ee olan Rabbimize ve ahiret yurduna ba\u011flar\u0131z.",
  },
  {
    weekNumber: 29,
    name: "EL-HAYY",
    arabic: "\u0627\u064e\u0644\u0652\u062d\u064e\u064a\u064f\u0651",
    meaning: "Daima diri olan.",
    title: "EL-HAYY \u2014 Daima diri olan.",
    body: "Hayy, ger\u00e7ek ve ezel\u00ee hayat\u0131n sahibi, hayat kayna\u011f\u0131 olan ve b\u00fct\u00fcn varl\u0131klara hayat ba\u011f\u0131\u015flayan Y\u00fcce Allah\u2019t\u0131r. O\u2019nun hayat\u0131 uyku, yorulma veya \u00f6l\u00fcm gibi eksikliklerden uzakt\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** K\u0131\u015f\u0131n donmu\u015f, kurumu\u015f ve \u00e2deta \u00f6lm\u00fc\u015f gibi duran kupkuru topra\u011f\u0131 d\u00fc\u015f\u00fcnelim. Bahar ya\u011fmurlar\u0131 ya\u011fd\u0131\u011f\u0131nda o cans\u0131z \u00e7amurdan milyonlarca rengarenk \u00e7i\u00e7ek, taptaze \u00e7imenler ve b\u00f6cekler nas\u0131l f\u0131\u015fk\u0131r\u0131r? Cans\u0131z atomlar bir araya gelerek nas\u0131l g\u00f6ren bir g\u00f6z, hisseden bir kalp ve d\u00fc\u015f\u00fcnen bir beyin olur? Cans\u0131z maddelere hayat \u00fcfleyen, Hayy olan Allah\u2019t\u0131r.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Her sabah uyand\u0131\u011f\u0131m\u0131zda bize yeni bir hayat bah\u015feden Rabbimize \u015f\u00fckrederiz. Hayat\u0131m\u0131z\u0131 tembellikle de\u011fil; ibadetle, ilim \u00f6\u011frenmekle ve faydal\u0131 i\u015fler yapmakla diri tutar\u0131z.",
  },
  {
    weekNumber: 30,
    name: "EL-KAYY\u00dbM",
    arabic: "\u0627\u064e\u0644\u0652\u0642\u064e\u064a\u064f\u0651\u0648\u0645\u064f",
    meaning: "Her \u015feyi ayakta tutan.",
    title: "EL-KAYY\u00dbM \u2014 Her \u015feyi ayakta tutan.",
    body: "Kayy\u00fbm, varl\u0131\u011f\u0131 kendinden olan, hi\u00e7bir deste\u011fe ihtiya\u00e7 duymayan, g\u00f6kleri, yeri ve b\u00fct\u00fcn varl\u0131klar\u0131 her an ayakta tutan ve idare eden demektir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** D\u00fcnya uzay bo\u015flu\u011funda hi\u00e7bir yere ba\u011fl\u0131 olmadan, bir dire\u011fe dayanmadan saniyede 30 kilometre h\u0131zla d\u00f6ner. Atomun \u00e7ekirde\u011fi etraf\u0131nda d\u00f6nen elektronlar milyarlarca y\u0131ld\u0131r y\u00f6r\u00fcngelerinden sapmaz. E\u011fer Kayy\u00fbm olan Rabbimiz k\u00e2inat\u0131 bir saniye bile g\u00f6zetmeyi b\u0131raksa, b\u00fct\u00fcn g\u00f6k cisimleri birbirine \u00e7arpar, atomlar da\u011f\u0131l\u0131r ve her \u015fey yok olurdu.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** \u00c2yet\u00fc'l-K\u00fcrs\u00ee'de her g\u00fcn 'All\u00e2hu l\u00e2 il\u00e2he ill\u00e2 h\u00fcve'l-hayyu'l-kayy\u00fbm' diye anar\u0131z. K\u00e2inat\u0131 ayakta tutan Rabbimizin bizi de her an g\u00f6r\u00fcp g\u00f6zetti\u011fini bilerek g\u00fcven i\u00e7inde ya\u015far\u0131z.",
  },
  {
    weekNumber: 31,
    name: "EL-AL\u00ceM",
    arabic: "\u0627\u064e\u0644\u0652\u0639\u064e\u0644\u0650\u064a\u0645\u064f",
    meaning: "Her \u015feyi bilen.",
    title: "EL-AL\u00ceM \u2014 Her \u015feyi bilen.",
    body: "Al\u00eem, olmu\u015f, olan ve gelecekte olacak her \u015feyi, gizliyi ve a\u00e7\u0131\u011f\u0131, k\u00fc\u00e7\u00fck ve b\u00fcy\u00fc\u011f\u00fc eksiksiz ve m\u00fckemmel bilen Allah\u2019t\u0131r. O\u2019nun ilminden hi\u00e7bir \u015fey saklanamaz.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Bir insan\u0131n tek bir h\u00fccresindeki DNA sarmal\u0131nda 3 milyar harflik devasa bir bilgi k\u00fct\u00fcphanesi sakl\u0131d\u0131r! Bu k\u00fct\u00fcphanede g\u00f6z rengimizden boyumuza, parmak izimizden sa\u00e7\u0131m\u0131z\u0131n teline kadar b\u00fct\u00fcn plan yaz\u0131lm\u0131\u015ft\u0131r. Okyanusun en karanl\u0131k derinli\u011findeki bir bal\u0131\u011f\u0131n ihtiyac\u0131n\u0131 da, g\u00f6ky\u00fcz\u00fcndeki bir ku\u015fun kanat \u00e7\u0131rp\u0131\u015f\u0131n\u0131 da Al\u00eem olan Allah eksiksiz bilir.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Al\u00eem olan Allah'\u0131n kalbimizden ge\u00e7en en gizli niyetleri bile bildi\u011fini unutmay\u0131z. Bu \u015fuur bizi yaln\u0131zken bile k\u00f6t\u00fcl\u00fck yapmaktan korur; i\u00e7imizi ve d\u0131\u015f\u0131m\u0131z\u0131 temiz tutmam\u0131z\u0131 sa\u011flar.",
  },
  {
    weekNumber: 32,
    name: "EL-HAB\u00ceR",
    arabic: "\u0627\u064e\u0644\u0652\u062e\u064e\u0628\u0650\u064a\u0631\u064f",
    meaning: "Her \u015feyden haberdar olan.",
    title: "EL-HAB\u00ceR \u2014 Her \u015feyden haberdar olan.",
    body: "Hab\u00eer, her \u015feyin en gizli taraflar\u0131ndan, i\u00e7 y\u00fcz\u00fcnden, perde arkas\u0131ndaki inceliklerinden tam anlam\u0131yla haberdar olan demektir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Zifiri karanl\u0131k bir gecede, siyah bir ta\u015f\u0131n \u00fczerinde y\u00fcr\u00fcyen simsiyah bir kar\u0131ncan\u0131n ayak sesinden ve kalbindeki ihtiya\u00e7tan haberdar olan bir Rabbimiz vard\u0131r. Yapraklar\u0131n i\u00e7inde fotosentez yapan kloroplastlar\u0131n durumundan, topra\u011f\u0131n metrelerce alt\u0131ndaki tohumun \u00e7atlama an\u0131na kadar k\u00e2inattaki her f\u0131s\u0131lt\u0131 O'na an\u0131nda ula\u015f\u0131r.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** \u0130nsanlar bazen bizi yanl\u0131\u015f anlayabilir veya \u00e7ekti\u011fimiz s\u0131k\u0131nt\u0131lar\u0131 kimse bilmeyebilir. Fakat Hab\u00eer olan Allah i\u00e7imizdeki h\u00fczn\u00fc, d\u00f6kt\u00fc\u011f\u00fcm\u00fcz gizli g\u00f6zya\u015f\u0131n\u0131 ve samimi \u00e7abam\u0131z\u0131 \u00e7ok iyi bilir. Bu inan\u00e7 g\u00f6nl\u00fcm\u00fcze e\u015fsiz bir ferahl\u0131k verir.",
  },
  {
    weekNumber: 33,
    name: "ES-SEM\u00ce",
    arabic: "\u0627\u0644\u0633\u064e\u0651\u0645\u0650\u064a\u0639\u064f",
    meaning: "Her \u015feyi i\u015fiten.",
    title: "ES-SEM\u00ce \u2014 Her \u015feyi i\u015fiten.",
    body: "Sem\u00ee, k\u00e2inattaki b\u00fct\u00fcn sesleri, f\u0131s\u0131lt\u0131lar\u0131, dualar\u0131 ve i\u00e7ten ge\u00e7en yakar\u0131\u015flar\u0131 hi\u00e7bir vas\u0131taya ihtiya\u00e7 duymadan ayn\u0131 anda ve birbirine kar\u0131\u015ft\u0131rmadan i\u015fiten demektir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Yery\u00fcz\u00fcnde ayn\u0131 anda konu\u015fan 8 milyar insan\u0131n sesini, g\u00f6ky\u00fcz\u00fcndeki milyarlarca ku\u015fun c\u0131v\u0131lt\u0131s\u0131n\u0131, r\u00fczg\u00e2r\u0131n u\u011fultusunu, denizin dalgas\u0131n\u0131 ve yaprak alt\u0131ndaki minik bir b\u00f6ce\u011fin \u00e7\u0131t\u0131rt\u0131s\u0131n\u0131 d\u00fc\u015f\u00fcnelim. Sem\u00ee olan Rabbimiz, bir sesi i\u015fitmesi di\u011fer sesleri i\u015fitmesine engel olmadan hepsini birden, tam bir netlikle duyar.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Dudaklar\u0131m\u0131z\u0131 bile k\u0131p\u0131rdatmadan kalbimizden ge\u00e7irdi\u011fimiz samimi bir duay\u0131 Rabbimizin i\u015fitti\u011fini bilmek ne b\u00fcy\u00fck bir tesellidir! Ayn\u0131 zamanda a\u011fz\u0131m\u0131zdan \u00e7\u0131kan k\u00f6t\u00fc ve k\u0131r\u0131c\u0131 s\u00f6zlerden de sak\u0131nmam\u0131z\u0131 sa\u011flar.",
  },
  {
    weekNumber: 34,
    name: "EL-BAS\u00ceR",
    arabic: "\u0627\u064e\u0644\u0652\u0628\u064e\u0635\u0650\u064a\u0631\u064f",
    meaning: "Her \u015feyi g\u00f6ren.",
    title: "EL-BAS\u00ceR \u2014 Her \u015feyi g\u00f6ren.",
    body: "Bas\u00eer, ayd\u0131nl\u0131kta ya da zifiri karanl\u0131kta, uzayda ya da yerin yedi kat dibinde olan her \u015feyi eksiksiz ve apa\u00e7\u0131k g\u00f6ren demektir. O\u2019nun g\u00f6rmesi i\u00e7in g\u00f6ze, \u0131\u015f\u0131\u011fa veya mesafeye ihtiya\u00e7 yoktur.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Kartal kilometrelerce y\u00fcksekten yerdeki minik bir fareyi g\u00f6rebilir; bayku\u015f zifiri karanl\u0131kta av\u0131n\u0131 se\u00e7ebilir. Canl\u0131lara bu g\u00f6rme kabiliyetini veren Allah'\u0131n g\u00f6rmesi ise s\u0131n\u0131r tan\u0131maz. Okyanusun en dip tabakalar\u0131ndaki \u0131\u015f\u0131ks\u0131z yar\u0131klarda ya\u015fayan canl\u0131lar\u0131n hareketlerini de, uzay\u0131n milyarlarca \u0131\u015f\u0131k y\u0131l\u0131 \u00f6tesindeki bir y\u0131ld\u0131z\u0131n par\u0131lt\u0131s\u0131n\u0131 da ayn\u0131 anda apa\u00e7\u0131k g\u00f6r\u00fcr.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Kimsenin olmad\u0131\u011f\u0131 bir yerde bile Allah\u2019\u0131n bizi g\u00f6rd\u00fc\u011f\u00fcn\u00fc bilmek (ihsan \u015fuuru), bizi gizli g\u00fcnahlardan korur. Yapt\u0131\u011f\u0131m\u0131z k\u00fc\u00e7\u00fcc\u00fck bir iyili\u011fin bile bo\u015fa gitmeyece\u011fini bilerek iyilik yapma \u015fevkimizi art\u0131r\u0131r.",
  },
  {
    weekNumber: 35,
    name: "EL-MUC\u00ceB",
    arabic: "\u0627\u064e\u0644\u0652\u0645\u064f\u062c\u0650\u064a\u0628\u064f",
    meaning: "Dualara cevap veren.",
    title: "EL-MUC\u00ceB \u2014 Dualara cevap veren.",
    body: "Muc\u00eeb, kendisine el a\u00e7\u0131p dua edenlerin yakar\u0131\u015flar\u0131na cevap veren, isteklerini geri \u00e7evirmeyen ve kullar\u0131na \u015fah damar\u0131ndan daha yak\u0131n olan Rabbimizdir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Kurakl\u0131ktan \u00e7atlayan topraklar ve boynu b\u00fck\u00fclen fidanlar lisan-\u0131 halleriyle suya dua ederler; Muc\u00eeb olan Allah bulutlar\u0131 g\u00f6ndererek ya\u011fmurla cevap verir. A\u00e7l\u0131ktan inleyen minik bir yavrunun sesine annesini \u015fefkatle ko\u015fturur. K\u00e2inattaki b\u00fct\u00fcn canl\u0131lar\u0131n ihtiya\u00e7 dualar\u0131 her an hikmetli bir \u015fekilde cevapland\u0131r\u0131l\u0131r.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** 'Bana dua edin, size cevap vereyim' buyuran Rabbimize g\u00fcvenerek ellerimizi a\u00e7ar\u0131z. Bazen istedi\u011fimiz \u015fey hemen verilir, bazen daha hay\u0131rl\u0131s\u0131 verilir, bazen de ahirete saklan\u0131r. Fakat hi\u00e7bir duam\u0131z asla bo\u015fa gitmez.",
  },
  {
    weekNumber: 36,
    name: "EL-M\u00dcSTE\u00c2N",
    arabic:
      "\u0627\u064e\u0644\u0652\u0645\u064f\u0633\u0652\u062a\u064e\u0639\u064e\u0627\u0646\u064f",
    meaning: "Yard\u0131m\u0131 istenen, ger\u00e7ek yard\u0131m sahibi.",
    title: "EL-M\u00dcSTE\u00c2N \u2014 Yard\u0131m\u0131 istenen, ger\u00e7ek yard\u0131m sahibi.",
    body: "M\u00fcste\u00e2n, zorluklar ve \u00e7aresizlikler kar\u015f\u0131s\u0131nda yard\u0131m\u0131 talep edilen, kendisine g\u00fcvenilip s\u0131\u011f\u0131n\u0131lan ve ger\u00e7ek yard\u0131m yaln\u0131zca O'ndan gelen demektir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Okyanusta korkun\u00e7 bir f\u0131rt\u0131naya yakalanan bir gemiyi d\u00fc\u015f\u00fcnelim. Dev dalgalar gemiyi yutmak \u00fczereyken kaptan da yolcular da b\u00fct\u00fcn sebeplerin t\u00fckendi\u011fini anlarlar ve f\u0131traten g\u00f6\u011fe y\u00f6nelip Y\u00fcce Yarat\u0131c\u0131'dan yard\u0131m dilerler. En \u00e7aresiz anlarda kalbimizde uyanan bu s\u0131\u011f\u0131nma duygusu, M\u00fcste\u00e2n olan Allah'\u0131n varl\u0131\u011f\u0131n\u0131n kalbimizdeki silinmez m\u00fchr\u00fcd\u00fcr.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Fatiha Suresi'nde her namazda '\u0130yy\u00e2ke na'b\u00fcd\u00fc ve iyy\u00e2ke neste'\u00een' (Yaln\u0131z Sana kulluk eder ve yaln\u0131z Senden yard\u0131m dileriz) deriz. Ba\u015fkalar\u0131na boyun e\u011fmez, zor zamanlar\u0131m\u0131zda \u00f6ncelikle Allah'a iltica ederek yard\u0131m isteriz.",
  },
  {
    weekNumber: 37,
    name: "EL-H\u00c2D\u00ce",
    arabic: "\u0627\u064e\u0644\u0652\u0647\u064e\u0627\u062f\u0650\u064a",
    meaning: "Do\u011fru yolu g\u00f6steren.",
    title: "EL-H\u00c2D\u00ce \u2014 Do\u011fru yolu g\u00f6steren.",
    body: "H\u00e2d\u00ee, kullar\u0131na do\u011fru yolu, hidayeti, kurtulu\u015f rehberli\u011fini g\u00f6steren ve yaratt\u0131\u011f\u0131 varl\u0131klara hayatlar\u0131n\u0131 nas\u0131l s\u00fcrd\u00fcreceklerini ilham eden demektir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Yumurtadan yeni \u00e7\u0131kan minik caretta caretta deniz kaplumba\u011falar\u0131n\u0131 d\u00fc\u015f\u00fcnelim. Hi\u00e7 kimse onlara ders vermedi\u011fi halde, yumurtadan \u00e7\u0131kar \u00e7\u0131kmaz arkalar\u0131na bile bakmadan do\u011frudan denize do\u011fru ko\u015farlar! G\u00f6\u00e7men ku\u015flar pusulalar\u0131 ve haritalar\u0131 olmadan binlerce kilometrelik yolu hi\u00e7 \u015fa\u015f\u0131rmadan nas\u0131l bulurlar? Bu canl\u0131lara yollar\u0131n\u0131 g\u00f6steren ve kalplerine bu bilgiyi f\u0131s\u0131ldayan El-H\u00e2d\u00ee olan Rabbimizdir.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** \u0130nsan i\u00e7in en b\u00fcy\u00fck hidayet, Allah\u2019a iman etmek ve g\u00fczel ahlakla ya\u015famakt\u0131r. Her g\u00fcn 'Rabbimiz, bizi do\u011fru yola (s\u0131rat-\u0131 m\u00fcstakime) ilet' diye dua ederek H\u00e2d\u00ee isminin nurunu dileriz.",
  },
  {
    weekNumber: 38,
    name: "EL-FETT\u00c2H",
    arabic: "\u0627\u064e\u0644\u0652\u0641\u064e\u062a\u064e\u0651\u0627\u062d\u064f",
    meaning: "Kap\u0131lar\u0131 a\u00e7an, g\u00fc\u00e7l\u00fckleri \u00e7\u00f6zen.",
    title:
      "EL-FETT\u00c2H \u2014 Kap\u0131lar\u0131 a\u00e7an, g\u00fc\u00e7l\u00fckleri \u00e7\u00f6zen.",
    body: "Fett\u00e2h, kilitli kap\u0131lar\u0131 a\u00e7an, zorluklar\u0131 kolayla\u015ft\u0131ran, karanl\u0131klar\u0131 ayd\u0131nl\u0131\u011fa \u00e7\u0131karan ve her t\u00fcrl\u00fc hay\u0131r kap\u0131s\u0131n\u0131 ard\u0131na kadar aralayan Y\u00fcce Allah\u2019t\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** K\u0131\u015f\u0131n donan yery\u00fcz\u00fcn\u00fc, \u00e7\u0131plak kalan a\u011fa\u00e7lar\u0131 ve karlar alt\u0131ndaki topra\u011f\u0131 d\u00fc\u015f\u00fcnelim. Bahar geldi\u011finde Fett\u00e2h ismi tecelli eder; kilitli tohum kabuklar\u0131 a\u00e7\u0131l\u0131r, tomurcuklar patlar, g\u00f6ky\u00fcz\u00fcn\u00fcn rahmet kap\u0131lar\u0131 a\u00e7\u0131l\u0131r ve yery\u00fcz\u00fc rengarenk bir hayata uyan\u0131r. Sert bir tohumun i\u00e7inden narin bir filizin kap\u0131y\u0131 a\u00e7\u0131p g\u00fcne\u015fe \u00e7\u0131kmas\u0131 Fett\u00e2h isminin mucizesidir.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Derslerimizde zorland\u0131\u011f\u0131m\u0131zda, i\u015flerimiz \u00e7\u0131kmaza girdi\u011finde veya \u00e7aresiz hissetti\u011fimizde Fett\u00e2h ismini zikrederiz. Biliriz ki Allah bir kap\u0131y\u0131 kaparsa, rahmetiyle bin kap\u0131y\u0131 a\u00e7maya muktedirdir.",
  },
  {
    weekNumber: 39,
    name: "EL-K\u00c2F\u00ce",
    arabic: "\u0627\u064e\u0644\u0652\u0643\u064e\u0627\u0641\u0650\u064a",
    meaning: "Kullar\u0131na yeten.",
    title: "EL-K\u00c2F\u00ce \u2014 Kullar\u0131na yeten.",
    body: "K\u00e2f\u00ee, kullar\u0131n\u0131n b\u00fct\u00fcn ihtiya\u00e7lar\u0131n\u0131 kar\u015f\u0131lamaya yeten, ba\u015fka hi\u00e7bir \u015feye muhta\u00e7 b\u0131rakmayan ve Kendisine g\u00fcvenen kullar\u0131na k\u00e2fi gelen demektir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** D\u00fcnyam\u0131z canl\u0131lar\u0131n hayat\u0131 i\u00e7in \u00f6ylesine eksiksiz donat\u0131lm\u0131\u015ft\u0131r ki ba\u015fka hi\u00e7bir gezegenden yard\u0131m almaya ihtiyac\u0131 yoktur. Atmosferi oksijeni \u00fcretir, okyanuslar\u0131 suyu buharla\u015ft\u0131r\u0131p ya\u011fmur yapar, topra\u011f\u0131 besin verir, g\u00fcne\u015fi \u0131s\u0131t\u0131r ve ayd\u0131nlat\u0131r. Rabbimiz yaratt\u0131\u011f\u0131 d\u00fcnyaya k\u00e2fi geldi\u011fi gibi, onun i\u00e7indeki her bir canl\u0131ya da tam anlam\u0131yla k\u00e2fidir.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Kur'an-\u0131 Kerim'de \u015f\u00f6yle buyrulur: 'Allah kuluna k\u00e2fi de\u011fil midir?' (Z\u00fcmer Suresi, 36). Bu ayeti kalbine yerle\u015ftiren bir gen\u00e7, insanlar\u0131n takdirine veya alk\u0131\u015f\u0131na ba\u011f\u0131ml\u0131 olmaz; Allah'\u0131n r\u0131zas\u0131n\u0131n kendisine yetece\u011fini bilir.",
  },
  {
    weekNumber: 40,
    name: "EL-EM\u00c2N",
    arabic: "\u0627\u064e\u0644\u0652\u0623\u064e\u0645\u064e\u0627\u0646\u064f",
    meaning: "G\u00fcven veren.",
    title: "EL-EM\u00c2N \u2014 G\u00fcven veren.",
    body: "Em\u00e2n, korkular\u0131 gideren, g\u00fcven ve huzur veren, kendisine s\u0131\u011f\u0131nanlar\u0131 her t\u00fcrl\u00fc tehlikeden muhafaza eden demektir. Ger\u00e7ek g\u00fcvenlik ancak O\u2019nun korumas\u0131 alt\u0131ndad\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Anne karn\u0131ndaki bebe\u011fi d\u00fc\u015f\u00fcnelim. Amniyon s\u0131v\u0131s\u0131n\u0131n i\u00e7inde, her t\u00fcrl\u00fc d\u0131\u015f darbeden, sars\u0131nt\u0131dan ve tehlikeden korunakl\u0131 g\u00fcvenli bir be\u015fiktedir. Ayn\u0131 \u015fekilde uzayda saatte 100 bin km h\u0131zla d\u00f6nen D\u00fcnyam\u0131z, g\u00f6kta\u015flar\u0131na ve zararl\u0131 \u0131\u015f\u0131nlara kar\u015f\u0131 atmosfer ve manyetosfer z\u0131rhlar\u0131yla kaplanm\u0131\u015f g\u00fcvenli bir uzay gemisi gibidir. Bu k\u00e2inat saray\u0131nda bizi emniyette ya\u015fatan El-Em\u00e2n olan Rabbimizdir.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Korktu\u011fumuzda, yaln\u0131z kald\u0131\u011f\u0131m\u0131zda veya gelece\u011fe dair endi\u015felendi\u011fimizde Em\u00e2n ismine s\u0131\u011f\u0131n\u0131r\u0131z. Ayn\u0131 zamanda biz de \u00e7evremize g\u00fcven veren, s\u00f6z\u00fcnde duran ve h\u0131yanet etmeyen g\u00fcvenilir bir insan (el-em\u00een) olmaya \u00e7al\u0131\u015f\u0131r\u0131z.",
  },
  {
    weekNumber: 41,
    name: "E\u015e-\u015e\u00c2F\u00ce",
    arabic: "\u0627\u0644\u0634\u064e\u0651\u0627\u0641\u0650\u064a",
    meaning: "\u015eifa veren.",
    title: "E\u015e-\u015e\u00c2F\u00ce \u2014 \u015eifa veren.",
    body: "\u015e\u00e2f\u00ee, her t\u00fcrl\u00fc madd\u00ee ve m\u00e2nev\u00ee hastal\u0131\u011fa \u015fifa veren, dertlere derman olan Y\u00fcce Allah\u2019t\u0131r. \u0130la\u00e7lar ve doktorlar birer vesiledir; \u015fifay\u0131 yaratan ise yaln\u0131zca \u015e\u00e2f\u00ee olan Allah't\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Yery\u00fcz\u00fcndeki binlerce \u015fifal\u0131 bitkiyi d\u00fc\u015f\u00fcnelim: Ihlamur g\u00f6\u011fs\u00fc yumu\u015fat\u0131r, nane mideyi ferahlat\u0131r, papatya sakinle\u015ftirir, bal ise binbir derde devad\u0131r. V\u00fccudumuzda ise bir yara a\u00e7\u0131ld\u0131\u011f\u0131nda h\u00fccreler an\u0131nda haberle\u015fir, fibrin lifleri yaray\u0131 \u00f6rter, akyuvarlar mikroplar\u0131 temizler ve deri kendini yeniler. Bu muazzam tamirat \u015e\u00e2f\u00ee isminin her an i\u015fleyen tecellisidir.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Hastaland\u0131\u011f\u0131m\u0131zda doktora gider, ilac\u0131m\u0131z\u0131 i\u00e7eriz; fakat \u015fifay\u0131 do\u011frudan Rabbimizden dileriz. Hasta ziyaretinde bulunarak 'Ey insanlar\u0131n Rabbi, \u015fifa ver, \u015e\u00e2f\u00ee ancak Sensin' diye dua ederiz.",
  },
  {
    weekNumber: 42,
    name: "EL-MU\u00c2F\u00ce",
    arabic: "\u0627\u064e\u0644\u0652\u0645\u064f\u0639\u064e\u0627\u0641\u0650\u064a",
    meaning: "Afiyet veren.",
    title: "EL-MU\u00c2F\u00ce \u2014 Afiyet veren.",
    body: "Mu\u00e2f\u00ee, dertleri, belalar\u0131 ve s\u0131k\u0131nt\u0131lar\u0131 defedip insana beden\u00ee, ruh\u00ee ve ahl\u00e2k\u00ee afiyet, esenlik ve selamet veren demektir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** \u015eiddetli bir f\u0131rt\u0131nan\u0131n ard\u0131ndan havan\u0131n a\u00e7t\u0131\u011f\u0131n\u0131, denizin duruldu\u011funu ve g\u00fcne\u015fin a\u00e7mas\u0131yla tabiat\u0131n derin bir nefes ald\u0131\u011f\u0131n\u0131 g\u00f6r\u00fcr\u00fcz. A\u011f\u0131r bir hastal\u0131ktan kurtulan bir insan\u0131n y\u00fcz\u00fcne yeniden renk gelir, ad\u0131mlar\u0131na kuvvet, g\u00f6zlerine ne\u015fe dolar. Bu esenlik ve sa\u011fl\u0131k hali Mu\u00e2f\u00ee isminin kullar\u0131na ba\u011f\u0131\u015flad\u0131\u011f\u0131 bir l\u00fctuftur.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Peygamber Efendimiz (sav) dualar\u0131nda en \u00e7ok 'Allah\u2019tan af ve afiyet dileyiniz' buyurmu\u015ftur. Sa\u011fl\u0131kl\u0131 ge\u00e7en her an\u0131m\u0131z\u0131n k\u0131ymetini bilir, afiyet nimetine \u015f\u00fckrederiz.",
  },
  {
    weekNumber: 43,
    name: "EL-GAFF\u00c2R",
    arabic: "\u0627\u064e\u0644\u0652\u063a\u064e\u0641\u064e\u0651\u0627\u0631\u064f",
    meaning: "\u00c7ok ba\u011f\u0131\u015flayan.",
    title: "EL-GAFF\u00c2R \u2014 \u00c7ok ba\u011f\u0131\u015flayan.",
    body: "Gaff\u00e2r, kullar\u0131n\u0131n g\u00fcnahlar\u0131n\u0131 tekrar tekrar ba\u011f\u0131\u015flayan, kusurlar\u0131 \u00f6rten, t\u00f6vbe edenlerin ge\u00e7mi\u015f g\u00fcnahlar\u0131n\u0131 affedip yok sayan sonsuz ma\u011ffiret sahibidir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Sonbaharda sararan yapraklar d\u00f6k\u00fcl\u00fcr, k\u0131\u015f\u0131n tabiat \u00e2deta karanl\u0131\u011fa ve \u00f6l\u00fcme b\u00fcr\u00fcn\u00fcr. Fakat bahar geldi\u011finde yery\u00fcz\u00fc b\u00fct\u00fcn ge\u00e7mi\u015fini unuttururcas\u0131na yepyeni, tertemiz \u00e7i\u00e7eklerle ve ye\u015filliklerle donat\u0131l\u0131r. Sanki k\u0131\u015f hi\u00e7 ya\u015fanmam\u0131\u015f gibi taptaze bir sayfa a\u00e7\u0131l\u0131r. Tabiat\u0131n bu ar\u0131n\u0131\u015f\u0131, Gaff\u00e2r olan Rabbimizin g\u00fcnahlar\u0131 silip temizleyen aff\u0131n\u0131 d\u00fc\u015f\u00fcnd\u00fcr\u00fcr.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Bir hata yapt\u0131\u011f\u0131m\u0131zda asla 'Ben art\u0131k iflah olmam' diyerek \u015feytana f\u0131rsat vermeyiz. Hemen samimiyetle t\u00f6vbe ederiz; biliriz ki Allah'\u0131n aff\u0131 bizim g\u00fcnahlar\u0131m\u0131zdan sonsuz kat daha b\u00fcy\u00fckt\u00fcr. Biz de arkada\u015flar\u0131m\u0131z\u0131n hatalar\u0131n\u0131 ba\u011f\u0131\u015flamay\u0131 \u00f6\u011freniriz.",
  },
  {
    weekNumber: 44,
    name: "ES-SETT\u00c2R",
    arabic: "\u0627\u0644\u0633\u064e\u0651\u062a\u064e\u0651\u0627\u0631\u064f",
    meaning: "Kusurlar\u0131 \u00f6rten.",
    title: "ES-SETT\u00c2R \u2014 Kusurlar\u0131 \u00f6rten.",
    body: "Sett\u00e2r, kullar\u0131n\u0131n ay\u0131plar\u0131n\u0131, \u00e7irkinliklerini, g\u00fcnahlar\u0131n\u0131 ve gizli kusurlar\u0131n\u0131 \u00f6rten, onlar\u0131 rezil ve r\u00fcsvay etmeyen Y\u00fcce Rabbimizdir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Kendi bedenimize bakal\u0131m: \u0130skeletimiz, kaslar\u0131m\u0131z, damarlar\u0131m\u0131z ve i\u00e7 organlar\u0131m\u0131z hayati vazifeler g\u00f6r\u00fcr ama g\u00f6r\u00fcnt\u00fc olarak ham ve karma\u015f\u0131kt\u0131r. Sett\u00e2r olan Rabbimiz b\u00fct\u00fcn bu karma\u015f\u0131k yap\u0131y\u0131 p\u00fcr\u00fczs\u00fcz, yumu\u015fac\u0131k ve estetik bir deri \u00f6rt\u00fcs\u00fcyle g\u00fczellikle \u00f6rtm\u00fc\u015ft\u00fcr. Toprak da d\u00f6k\u00fclen yapraklar\u0131 ve \u00e7\u00fcr\u00fcyen art\u0131klar\u0131 \u00f6rterek onlar\u0131 faydal\u0131 g\u00fcbreye d\u00f6n\u00fc\u015ft\u00fcr\u00fcr.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Sett\u00e2r olan Allah bizim nice kusurlar\u0131m\u0131z\u0131 \u00f6rterken, bizim ba\u015fkalar\u0131n\u0131n ay\u0131plar\u0131n\u0131 ara\u015ft\u0131rmam\u0131z ve yaymam\u0131z \u00e7ok \u00e7irkindir. M\u00fcmin, karde\u015finin hatas\u0131n\u0131 gizler, kimseyi utand\u0131rmaz ve kusurlar\u0131 \u00f6rtmede gece gibi olur.",
  },
  {
    weekNumber: 45,
    name: "EL-ADL",
    arabic: "\u0627\u064e\u0644\u0652\u0639\u064e\u062f\u0652\u0644\u064f",
    meaning: "Mutlak adalet sahibi.",
    title: "EL-ADL \u2014 Mutlak adalet sahibi.",
    body: "Adl, mutlak adalet sahibi, her \u015feyi yerli yerine koyan, hi\u00e7bir varl\u0131\u011fa zerre kadar haks\u0131zl\u0131k yapmayan ve mizan\u0131 kusursuz kuran Allah\u2019t\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Atomun yap\u0131s\u0131n\u0131 d\u00fc\u015f\u00fcnelim: \u00c7ekirdekteki pozitif y\u00fckl\u00fc protonlar ile etraf\u0131ndaki negatif y\u00fckl\u00fc elektronlar\u0131n say\u0131s\u0131 birbirine tam olarak e\u015fittir. E\u011fer bu adaletli denge trilyonda bir oran\u0131nda \u015fa\u015fsayd\u0131, evrendeki hi\u00e7bir madde bir arada duramazd\u0131. Ormanlardaki kurtlar ile geyiklerin, avlar ile avc\u0131lar\u0131n dengesi de ekolojik bir adalet terazisiyle korunur.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Adl ismini \u00f6\u011frenen bir gen\u00e7; oyun oynarken hile yapmaz, arkada\u015flar\u0131n\u0131n hakk\u0131n\u0131 yemez, zay\u0131flar\u0131 korur ve her zaman adaletin ve do\u011frulu\u011fun yan\u0131nda yer al\u0131r.",
  },
  {
    weekNumber: 46,
    name: "ED-DEYY\u00c2N",
    arabic: "\u0627\u0644\u062f\u064e\u0651\u064a\u064e\u0651AN\u064f",
    meaning: "Kar\u015f\u0131l\u0131k veren, h\u00fck\u00fcm ve hesap sahibi.",
    title: "ED-DEYY\u00c2N \u2014 Kar\u015f\u0131l\u0131k veren, h\u00fck\u00fcm ve hesap sahibi.",
    body: "Deyy\u00e2n, herkesin yapt\u0131\u011f\u0131n\u0131n kar\u015f\u0131l\u0131\u011f\u0131n\u0131 tam\u0131 tam\u0131na veren, hi\u00e7bir ameli zayi etmeyen, m\u00fck\u00e2fat ve ceza g\u00fcn\u00fcn\u00fcn mutlak h\u00e2kimidir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Fizikteki 'etki-tepki' kanununu d\u00fc\u015f\u00fcnelim: Bir topu duvara ne kadar kuvvetle atarsan\u0131z, ayn\u0131 kuvvetle size geri d\u00f6ner. Topra\u011fa bu\u011fday ekerseniz bu\u011fday bi\u00e7ersiniz, arpa ekerseniz arpa bi\u00e7ersiniz; elma \u00e7ekirde\u011finden diken \u00e7\u0131kmaz. K\u00e2inattaki bu sebep-sonu\u00e7 kanunu, insan\u0131n yapt\u0131\u011f\u0131 iyiliklerin de k\u00f6t\u00fcl\u00fcklerin de mutlaka kar\u015f\u0131l\u0131\u011f\u0131n\u0131 bulaca\u011f\u0131n\u0131 hayk\u0131r\u0131r.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Deyy\u00e2n ismini bilen insan; kimsenin g\u00f6rmedi\u011fi yerde yapt\u0131\u011f\u0131 k\u00fc\u00e7\u00fcc\u00fck bir tebess\u00fcm\u00fcn ve sadakan\u0131n bile kar\u015f\u0131l\u0131\u011f\u0131n\u0131 g\u00f6rece\u011fini bilir. K\u00f6t\u00fcl\u00fck yapmaktan \u00e7ekinir; \u00e7\u00fcnk\u00fc bilir ki hi\u00e7bir k\u00f6t\u00fcl\u00fck kar\u015f\u0131l\u0131ks\u0131z kalmayacakt\u0131r.",
  },
  {
    weekNumber: 47,
    name: "ES-S\u00c2DIKU\u2019L-VA\u2018D",
    arabic:
      "\u0635\u064e\u0627\u062f\u0650\u0642\u064f \u0627\u0644\u0652\u0648\u064e\u0639\u0652\u062f\u0650",
    meaning: "S\u00f6z\u00fcnden d\u00f6nmeyen.",
    title: "ES-S\u00c2DIKU\u2019L-VA\u2018D \u2014 S\u00f6z\u00fcnden d\u00f6nmeyen.",
    body: "S\u00e2d\u0131ku\u2019l-Va\u2018d, verdi\u011fi s\u00f6z\u00fc mutlaka yerine getiren, vaadinden asla d\u00f6nmeyen ve g\u00fcvenin mutlak kayna\u011f\u0131 olan Y\u00fcce Allah\u2019t\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** G\u00fcne\u015f her sabah vaat edilen dakikada do\u011far; k\u0131\u015f mevsiminin ard\u0131ndan bahar hi\u00e7 \u015fa\u015fmadan \u00e7\u0131kagelir. Gece g\u00fcnd\u00fcz\u00fc kovalar, denizlerin gel-git vakitleri dakikas\u0131 dakikas\u0131na ger\u00e7ekle\u015fir. K\u00e2inattaki bu il\u00e2h\u00ee randevular\u0131n hi\u00e7birinde gecikme veya cayma olmaz. Nizamdaki bu sars\u0131lmaz sadakat, Rabbimizin vaadinde ne kadar do\u011fru oldu\u011funu g\u00f6sterir.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Allah\u2019\u0131n '\u0130nan\u0131p g\u00fczel i\u015fler yapanlara cennet vard\u0131r' vaadine t\u00fcm kalbimizle g\u00fcveniriz. Biz de verdi\u011fimiz s\u00f6zleri mutlaka tutar, s\u00f6z\u00fcnden d\u00f6nmeyen d\u00fcr\u00fcst ve g\u00fcvenilir birer m\u00fcmin oluruz.",
  },
  {
    weekNumber: 48,
    name: "EL-MAHM\u00dbD",
    arabic: "\u0627\u064e\u0644\u0652\u0645\u064e\u062d\u0652\u0645\u064f\u0648\u062f\u064f",
    meaning: "\u00d6vg\u00fcye lay\u0131k olan.",
    title: "EL-MAHM\u00dbD \u2014 \u00d6vg\u00fcye lay\u0131k olan.",
    body: "Mahm\u00fbd, b\u00fct\u00fcn varl\u0131klar\u0131n diliyle \u00f6v\u00fclen, her t\u00fcrl\u00fc hamde ve te\u015fekk\u00fcre en lay\u0131k olan Y\u00fcce Rabbimizdir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** \u015e\u0131r\u0131l \u015f\u0131r\u0131l akan duru dereler, r\u00fczg\u00e2rda tatl\u0131 tatl\u0131 f\u0131s\u0131lda\u015fan a\u011fa\u00e7 yapraklar\u0131, sabah\u0131n seherinde \u015fak\u0131yan b\u00fclb\u00fcller ve denizlerin k\u0131y\u0131ya vuran dalgalar\u0131... B\u00fct\u00fcn bu sesler dikkatle dinlendi\u011finde, k\u00e2inat\u0131n devasa bir zikir halkas\u0131 kurup Mahm\u00fbd olan Yarat\u0131c\u0131lar\u0131n\u0131 hamd ile tesbih etti\u011fini anlar\u0131z.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** G\u00fcne 'Elhamd\u00fclill\u00e2h' diyerek ba\u015flar, yemekten sonra 'Elhamd\u00fclill\u00e2h' deriz. Bize ula\u015fan her g\u00fczellikte ger\u00e7ek \u00f6vg\u00fcn\u00fcn sebeplere de\u011fil, onlar\u0131 yaratan Rabbimize ait oldu\u011funu biliriz.",
  },
  {
    weekNumber: 49,
    name: "EL-MEC\u00ceD",
    arabic: "\u0627\u064e\u0644\u0652\u0645\u064e\u062c\u0650\u064a\u062f\u064f",
    meaning: "\u015ean\u0131 ve ikram\u0131 y\u00fcce olan.",
    title: "EL-MEC\u00ceD \u2014 \u015ean\u0131 ve ikram\u0131 y\u00fcce olan.",
    body: "Mec\u00eed, \u015fan\u0131, \u015ferefi, kudreti ve ululu\u011fu sonsuz olan; ayn\u0131 zamanda c\u00f6mertli\u011fi ve ihsan\u0131 son derece geni\u015f olan Y\u00fcce Allah\u2019t\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Gece g\u00f6ky\u00fcz\u00fcn\u00fc bir kubbe gibi saran Samanyolu ve y\u0131ld\u0131zlar toplulu\u011funa bakal\u0131m. Devasa nebulalar (y\u0131ld\u0131z do\u011fumevleri), rengarenk gaz bulutlar\u0131 ve uzay\u0131n ak\u0131l almaz derinlikleri il\u00e2h\u00ee bir saray\u0131n g\u00f6rkemli avizeleri gibidir. Bu muazzam ihti\u015fam, Mec\u00eed olan Rabbimizin \u015fan\u0131n\u0131n ne kadar y\u00fcce oldu\u011funu g\u00f6zler \u00f6n\u00fcne serer.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Namazlar\u0131m\u0131zda Salli-B\u00e2rik dualar\u0131n\u0131 okurken '\u0130nneke ham\u00eed\u00fcn mec\u00eed' (\u015e\u00fcphesiz Sen \u00f6vg\u00fcye lay\u0131k ve \u015fan\u0131 y\u00fcce olans\u0131n) deriz. O'nun y\u00fcce \u015fan\u0131n\u0131 anarak kalbimizi k\u00fc\u00e7\u00fclt\u00fcc\u00fc kibirden ve basit menfaatlerden koruruz.",
  },
  {
    weekNumber: 50,
    name: "EL-HANN\u00c2N",
    arabic: "\u0627\u064e\u0644\u0652\u062d\u064e\u0646\u064e\u0651AN\u064f",
    meaning: "\u00c7ok merhamet ve \u015fefkat g\u00f6steren.",
    title: "EL-HANN\u00c2N \u2014 \u00c7ok merhamet ve \u015fefkat g\u00f6steren.",
    body: "Hann\u00e2n, merhameti pek bol olan, kullar\u0131na derin bir \u015fefkatle y\u00f6nelen, dertlilerin ah\u0131n\u0131 i\u015fitip onlar\u0131 rahmet kuca\u011f\u0131yla saran demektir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Yavrusunu korumak i\u00e7in kendisinden kat kat b\u00fcy\u00fck y\u0131rt\u0131c\u0131 k\u00f6pe\u011fe kar\u015f\u0131 t\u00fcylerini kabart\u0131p kanatlar\u0131n\u0131 a\u00e7an cesur bir anne tavu\u011fu d\u00fc\u015f\u00fcnelim. Normalde bir \u00e7\u0131t\u0131rt\u0131dan ka\u00e7an \u00fcrkek bir hayvana can\u0131n\u0131 feda ettiren o derin \u015fefkat nereden gelmektedir? Elbette Hann\u00e2n olan Allah\u2019\u0131n kalplere yerle\u015ftirdi\u011fi engin merhamet damlas\u0131ndan!\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** Kalbimiz darald\u0131\u011f\u0131nda 'Y\u00e2 Hann\u00e2n, Y\u00e2 Menn\u00e2n' diye Rabbimize iltica ederiz. Biz de insanlara, kimsesizlere ve hayvanlara kar\u015f\u0131 kalbimizi yumu\u015fat\u0131r, \u015fefkatli bir dost oluruz.",
  },
  {
    weekNumber: 51,
    name: "EL-MA\u2018R\u00dbF",
    arabic: "\u0627\u064e\u0644\u0652\u0645\u064e\u0639\u0652\u0631\u064f\u0648\u0641\u064f",
    meaning: "\u0130yili\u011fi bilinen, ihsan\u0131 tan\u0131nan.",
    title: "EL-MA\u2018R\u00dbF \u2014 \u0130yili\u011fi bilinen, ihsan\u0131 tan\u0131nan.",
    body: "Ma\u2018r\u00fbf, b\u00fct\u00fcn varl\u0131klar taraf\u0131ndan iyili\u011fiyle, l\u00fctfuyla ve c\u00f6mertli\u011fiyle bilinen; ak\u0131llar\u0131n ve kalplerin O'nun ihsanlar\u0131na \u015fahitlik etti\u011fi demektir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** D\u00fcnyan\u0131n neresine giderseniz gidin; kutuplarda da, Afrika'n\u0131n \u00e7\u00f6llerinde de, yemye\u015fil yaylalarda da ya\u015fayan insanlar iyili\u011fin, adaletin ve g\u00fczelli\u011fin k\u0131ymetini f\u0131traten bilirler. \u00c7\u00fcnk\u00fc k\u00e2inat sofras\u0131nda tad\u0131lan her nimet, ak\u0131l sahiplerine Ma\u2018r\u00fbf olan Allah'\u0131n iyiliklerini tan\u0131tm\u0131\u015ft\u0131r. G\u00fcne\u015fin do\u011fu\u015fu, suyun tad\u0131 ve anne kuca\u011f\u0131 evrensel bir iyilik lisan\u0131d\u0131r.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** 'Emr-i bi'l-ma'r\u00fbf' (iyili\u011fi emretmek ve yaymak) bizim en \u00f6nemli vazifemizdir. \u00c7evremizde g\u00fczel, do\u011fru ve faydal\u0131 olan her \u015feyi destekler, k\u00f6t\u00fcl\u00fcklerin \u00f6n\u00fcne ge\u00e7eriz.",
  },
  {
    weekNumber: 52,
    name: "EL-B\u00dcRH\u00c2N",
    arabic: "\u0627\u064e\u0644\u0652\u0628\u064f\u0631\u0652\u0647\u064e\u0627\u0646\u064f",
    meaning: "Varl\u0131\u011f\u0131na ve birli\u011fine deliller g\u00f6steren.",
    title:
      "EL-B\u00dcRH\u00c2N \u2014 Varl\u0131\u011f\u0131na ve birli\u011fine deliller g\u00f6steren.",
    body: "B\u00fcrh\u00e2n, varl\u0131\u011f\u0131na, birli\u011fine ve sonsuz kudretine k\u00e2inat\u0131n her zerresinde apa\u00e7\u0131k deliller, delaletler ve belgeler sergileyen demektir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Bal ar\u0131s\u0131n\u0131n yapt\u0131\u011f\u0131 alt\u0131gen petekleri inceleyelim: Matematik\u00e7iler hesaplam\u0131\u015ft\u0131r ki en az balmumu ile en fazla bal\u0131 depolaman\u0131n tek kusursuz geometrik yolu alt\u0131gendir! Ar\u0131 bu ileri geometriyi nereden bilmektedir? Ya da g\u00f6z\u00fcm\u00fcz\u00fcn i\u00e7indeki 130 milyon \u0131\u015f\u0131k alg\u0131lay\u0131c\u0131 h\u00fccreyi d\u00fc\u015f\u00fcnelim. K\u00e2inattaki her bir varl\u0131k, Yarat\u0131c\u0131s\u0131n\u0131n varl\u0131\u011f\u0131n\u0131 ve ustal\u0131\u011f\u0131n\u0131 ispatlayan sars\u0131lmaz birer b\u00fcrhand\u0131r (delildir).\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** \u0130man\u0131m\u0131z k\u00f6r\u00fc k\u00f6r\u00fcne bir taklit de\u011fil; k\u00e2inattaki milyonlarca b\u00fcrhan\u0131 g\u00f6rerek ula\u015f\u0131lan tahk\u00eek\u00ee ve sa\u011flam bir imand\u0131r. Fenleri, biyolojiyi ve astronomiyi okurken Rabbimizin delillerine hayran oluruz.",
  },
  {
    weekNumber: 53,
    name: "EL-GAR\u00ceB",
    arabic: "\u0627\u064e\u0644\u0652\u063a\u064e\u0631\u0650\u064a\u0628\u064f",
    meaning:
      "Kullar\u0131na yak\u0131nl\u0131\u011f\u0131 \u015fa\u015f\u0131rt\u0131c\u0131 ve \u00f6zel olan.",
    title:
      "EL-GAR\u00ceB \u2014 Kullar\u0131na yak\u0131nl\u0131\u011f\u0131 \u015fa\u015f\u0131rt\u0131c\u0131 ve \u00f6zel olan.",
    body: "Gar\u00eeb, kuluna olan yak\u0131nl\u0131\u011f\u0131, l\u00fctfu ve muamelesi al\u0131\u015f\u0131lm\u0131\u015f kal\u0131plar\u0131 ve insan akl\u0131n\u0131n s\u0131n\u0131rlar\u0131n\u0131 a\u015fan; koca k\u00e2inat\u0131 y\u00f6netirken tek bir kulun gizli f\u0131s\u0131lt\u0131s\u0131n\u0131 bile yaln\u0131z b\u0131rakmayan demektir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** Trilyonlarca galaksiyi, milyarlarca y\u0131ld\u0131z\u0131 ve devasa gezegenleri ayn\u0131 anda y\u00f6neten Y\u00fcce Allah; ayn\u0131 anda odas\u0131nda tek ba\u015f\u0131na a\u011flayan k\u00fc\u00e7\u00fck bir \u00e7ocu\u011fun kalbindeki h\u00fczn\u00fc de duyar ve ona sekinet verir. B\u00fcy\u00fckl\u00fc\u011f\u00fc O'nu k\u00fc\u00e7\u00fck \u015feylerle ilgilenmekten al\u0131koymaz; \u015fan\u0131n\u0131n y\u00fcceli\u011fi O'nu kuluna \u015fah damar\u0131ndan daha yak\u0131n olmaktan al\u0131koymaz. Bu benzersiz yak\u0131nl\u0131k Gar\u00eeb isminin s\u0131rr\u0131d\u0131r.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** D\u00fcnyada herkes bizi unutsa, kimsesiz kalsak veya gurbete d\u00fc\u015fsek bile Rabbimizin bize bizden daha yak\u0131n oldu\u011funu biliriz. Asla yaln\u0131zl\u0131k \u00e7ekmeyiz; \u00e7\u00fcnk\u00fc her an bizi i\u015fiten ve sahip \u00e7\u0131kan bir Rabbimiz vard\u0131r.",
  },
  {
    weekNumber: 54,
    name: "EL-AT\u00dbF",
    arabic: "\u0627\u064e\u0644\u0652\u0639\u064e\u0637\u064f\u0648\u0641\u064f",
    meaning: "\u00c7ok merhametli ve \u015fefkatli davranan.",
    title: "EL-AT\u00dbF \u2014 \u00c7ok merhametli ve \u015fefkatli davranan.",
    body: "At\u00fbf, kullar\u0131na kar\u015f\u0131 fevkalade merhametli, ba\u011f\u0131\u015flay\u0131c\u0131, \u015fefkatle sar\u0131p sarmalayan ve onlara her zaman iyilikle y\u00f6nelen demektir.\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** So\u011fuk k\u0131\u015f g\u00fcnlerinde ku\u015flar\u0131n t\u00fcylerini kabartarak kendi do\u011fal yal\u0131t\u0131m montlar\u0131n\u0131 olu\u015fturmas\u0131n\u0131, topra\u011f\u0131n k\u0131\u015f uykusuna yatan tohumlar\u0131 \u015fefkatli bir anne gibi koynunda saklamas\u0131n\u0131 d\u00fc\u015f\u00fcnelim. Bahar geldi\u011finde dondurucu so\u011fuklar\u0131n yerini \u0131l\u0131k r\u00fczg\u00e2rlara b\u0131rakmas\u0131, k\u00e2inat\u0131n At\u00fbf olan Rabbimizin s\u0131cac\u0131k \u015fefkatiyle ku\u015fat\u0131ld\u0131\u011f\u0131n\u0131 hissettirir.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** At\u00fbf ismini bilen insan, ailesine, arkada\u015flar\u0131na ve \u00e7evresine kar\u015f\u0131 sert ve kaba olmaz. \u015eefkatli, ba\u011f\u0131\u015flay\u0131c\u0131, g\u00fcler y\u00fczl\u00fc ve kalpleri kazanan yumu\u015fak bir dille muamele eder.",
  },
  {
    weekNumber: 55,
    name: "ALLAH",
    arabic: "\u0627\u064e\u0644\u0644\u0651\u0670\u0647\u064f",
    meaning: "B\u00fct\u00fcn g\u00fczel isimlerin sahibi olan Rabbimiz.",
    title: "ALLAH \u2014 B\u00fct\u00fcn g\u00fczel isimlerin sahibi olan Rabbimiz.",
    body: "Allah (Lafza-i Cel\u00e2l), b\u00fct\u00fcn g\u00fczel isimleri (Esm\u00e2\u00fc'l-H\u00fcsn\u00e2) ve y\u00fcce s\u0131fatlar\u0131 kendinde toplayan, ibadete lay\u0131k tek il\u00e2h olan Rabbimizin en y\u00fcce ve \u00f6zel ismidir (\u0130sm-i \u00c2zam).\n\n\ud83c\udf0c **K\u00e2inattaki \u00d6rne\u011fi:** \u015eimdiye kadar \u00f6\u011frendi\u011fimiz 54 ismin tecellilerini bir araya getirelim: K\u00e2inattaki e\u015fsiz g\u00fczellik (Cem\u00eel), sonsuz merhamet (Rahm\u00e2n ve Rah\u00eem), r\u0131z\u0131klar\u0131n m\u00fckemmel da\u011f\u0131t\u0131m\u0131 (Rezz\u00e2k), nizam ve uyum (B\u00e2ri ve Musavvir), canl\u0131lar\u0131n hayat\u0131 (Hayy ve Kayy\u00fbm)... B\u00fct\u00fcn bu tecelliler, devasa bir k\u00e2inat korosu gibi tek bir A\u011f\u0131zdan, tek bir Z\u00e2t'\u0131n ad\u0131n\u0131 hayk\u0131r\u0131r: ALLAH! Zerrelerden k\u00fcrelere her \u015fey O'nun kuludur.\n\n\ud83c\udf31 **Hayat\u0131m\u0131za Yans\u0131mas\u0131:** 'L\u00e2 il\u00e2he illall\u00e2h' (Allah'tan ba\u015fka il\u00e2h yoktur) diyerek b\u00fct\u00fcn sahte il\u00e2hlar\u0131 ve hevesleri reddederiz. Hayat\u0131m\u0131z\u0131n merkezine Allah sevgisini ve r\u0131zas\u0131n\u0131 koyar, O'na lay\u0131k bir kul olmaya gayret ederiz.",
  },
];

/**
 * Lise (4., 5. ve 6. Sınıflar) için 55 haftalık Esmâü'l-Hüsnâ müfredatı
 * Derin tefekkür, kozmolojik, biyolojik ve varoluşsal boyutlarıyla.
 */
export const liseEsmaCurriculum: readonly EsmaCurriculumItem[] = [
  {
    weekNumber: 1,
    name: "EL-CEM\u00ceL",
    arabic: "\u0627\u064e\u0644\u0652\u062c\u064e\u0645\u0650\u064a\u0644\u064f",
    meaning: "Mutlak g\u00fczellik sahibi, g\u00fczelle\u015ftiren.",
    title: "EL-CEM\u00ceL \u2014 Mutlak g\u00fczellik sahibi, g\u00fczelle\u015ftiren.",
    body: "K\u00e2inattaki estetik nizam, yaln\u0131zca g\u00f6rsel bir haz vesilesi de\u011fil; g\u00fczelli\u011fin ezeli ve ebedi kayna\u011f\u0131 olan Z\u00e2t-\u0131 Z\u00fclcel\u00e2l'e a\u00e7\u0131lan muazzam bir tefekk\u00fcr penceresidir. Galaksilerin helezonik kollar\u0131ndan bir \u00e7i\u00e7e\u011fin ta\u00e7 yapraklar\u0131ndaki alt\u0131n orana, su damlas\u0131n\u0131n k\u00fcresel zarafetinden k\u0131\u015f kristallerinin fraktal mimarisine kadar her varl\u0131k, mutlak g\u00fczellik sahibi El-Cem\u00eel ismini hayk\u0131r\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Tabiatta fonksiyonellik ile estetik kusursuz bir uyum i\u00e7indedir. Bir kartal\u0131n s\u00fcz\u00fcl\u00fc\u015f\u00fc aerodinamik bir harika oldu\u011fu kadar nefes kesici bir zarafettir; bir mercan resifinin biyo\u00e7e\u015fitlili\u011fi deniz alt\u0131n\u0131 bir sanat galerisine \u00e7evirir. K\u00e2inat, rastlant\u0131sal kaosun de\u011fil; her ayr\u0131nt\u0131s\u0131 sevgi ve g\u00fczellikle tasarlanm\u0131\u015f il\u00e2h\u00ee bir tablonun ad\u0131d\u0131r.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** Cem\u00eel ismini idrak eden fert, g\u00fczelli\u011fi ge\u00e7ici formlara ba\u011flay\u0131p t\u00fcketmek yerine o g\u00fczelli\u011fin Sahibine y\u00f6nelir (marifetullah). Kendi i\u00e7 d\u00fcnyas\u0131n\u0131, ahlak\u0131n\u0131 ve d\u00fc\u015f\u00fcncelerini tezkiye ederek varolu\u015fun bu evrensel g\u00fczellik korosuna ahenkle dahil olur.",
  },
  {
    weekNumber: 2,
    name: "ER-RAHM\u00c2N",
    arabic: "\u0627\u064e\u0644\u0631\u064e\u0651\u062d\u0652\u0645\u0670\u0646\u064f",
    meaning: "Rahmeti b\u00fct\u00fcn varl\u0131\u011f\u0131 ku\u015fatan.",
    title: "ER-RAHM\u00c2N \u2014 Rahmeti b\u00fct\u00fcn varl\u0131\u011f\u0131 ku\u015fatan.",
    body: "Rahm\u00e2n ismi; il\u00e2h\u00ee rahmetin varl\u0131k sahas\u0131na \u00e7\u0131k\u0131\u015ftaki kapsay\u0131c\u0131l\u0131\u011f\u0131n\u0131, kar\u015f\u0131l\u0131ks\u0131z ve evrensel l\u00fctfunu ifade eder. Kozmik d\u00fczenin her parametresi, canl\u0131l\u0131\u011f\u0131n var olabilmesi ve devam\u0131 i\u00e7in ola\u011fan\u00fcst\u00fc bir hassasiyetle (fine-tuning) ayarlanm\u0131\u015ft\u0131r. Bu genel rahmet, hak edi\u015fe veya talebe ba\u011fl\u0131 olmaks\u0131z\u0131n t\u00fcm mahlukata \u015famildir.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** D\u00fcnya\u2019n\u0131n G\u00fcne\u015f\u2019e mesafesinden manyetosferin g\u00fcne\u015f r\u00fczg\u00e2rlar\u0131n\u0131 sapt\u0131rmas\u0131na, suyun donarken yo\u011funlu\u011funun azal\u0131p g\u00f6llerin dipten de\u011fil \u00fcstten donmas\u0131na kadar her fizik\u00ee kanun, varl\u0131\u011f\u0131n hayat bulmas\u0131 i\u00e7in seferber edilmi\u015f birer Rahm\u00e2n\u00ee tecellidir. \u00c7\u00f6l\u00fcn ortas\u0131ndaki bir kakt\u00fcs\u00fcn su depolama mimarisi ile kutuplardaki penguenin \u0131s\u0131 yal\u0131t\u0131m\u0131 ayn\u0131 ku\u015fat\u0131c\u0131 rahmetin tezah\u00fcr\u00fcd\u00fcr.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** Rahm\u00e2n isminin \u015fuuruna eren insan; varolu\u015fu kozmik bir l\u00fctuf olarak okur. Hayat\u0131n merkezine \u015f\u00fck\u00fcr ve emanet bilincini yerle\u015ftirir. Tabiat\u0131 s\u00f6m\u00fcr\u00fclecek bir meta de\u011fil, il\u00e2h\u00ee rahmetin sergisi olarak korur ve b\u00fct\u00fcn mahlukata kar\u015f\u0131 merhameti ahlak edinir.",
  },
  {
    weekNumber: 3,
    name: "ER-RAH\u00ceM",
    arabic: "\u0627\u064e\u0644\u0631\u064e\u0651\u062d\u0650\u064a\u0645\u064f",
    meaning: "Merhameti s\u00fcrekli olan.",
    title: "ER-RAH\u00ceM \u2014 Merhameti s\u00fcrekli olan.",
    body: "Rah\u00eem ismi; il\u00e2h\u00ee merhametin s\u00fcreklili\u011fini, irade ve y\u00f6neli\u015f sahibi varl\u0131klara y\u00f6nelik hususi l\u00fctuf ve inayetini temsil eder. Rahm\u00e2n ismi varl\u0131\u011f\u0131 in\u015fa eden genel zemin iken, Rah\u00eem ismi ferdin i\u00e7 d\u00fcnyas\u0131nda, duas\u0131nda ve manevi tek\u00e2m\u00fcl\u00fcnde tecelli eden derin bir himayedir.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Canl\u0131lar d\u00fcnyas\u0131nda yavru bak\u0131m\u0131ndaki fedak\u00e2rl\u0131k ve koruma i\u00e7g\u00fcd\u00fcs\u00fc Rah\u00eem isminin b\u00fcy\u00fcleyici bir yans\u0131mas\u0131d\u0131r. Bir ceylan\u0131n yavrusunu y\u0131rt\u0131c\u0131lara kar\u015f\u0131 can\u0131 pahas\u0131na savunmas\u0131, h\u00fccrelerimizin DNA hasarlar\u0131n\u0131 anbean tamir eden enzim mekanizmalar\u0131 (DNA repair) ve insan\u0131n psikolojik y\u0131k\u0131mlardan sonra yeniden toparlanma (resilience) kabiliyeti bu ismin canl\u0131 \u015fahitleridir.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** Rah\u00eem ismine muhatap olan insan, kendi zaaf ve acziyetini bir \u00fcmitsizlik sebebi de\u011fil; sonsuz merhamet derg\u00e2h\u0131na a\u00e7\u0131lan bir iltica kap\u0131s\u0131 olarak g\u00f6r\u00fcr. Bu idrak, ki\u015fide hem sa\u011flam bir tevekk\u00fcl ve rec\u00e2 (\u00fcmit) dengesi kurar hem de ba\u015fkalar\u0131n\u0131n yaralar\u0131n\u0131 saran merhametli bir \u015fahsiyet in\u015fa eder.",
  },
  {
    weekNumber: 4,
    name: "ER-RA\u00dbF",
    arabic: "\u0627\u064e\u0644\u0631\u064e\u0651\u0624\u064f\u0648\u0641\u064f",
    meaning: "\u015eefkati pek engin olan.",
    title: "ER-RA\u00dbF \u2014 \u015eefkati pek engin olan.",
    body: "Ra\u00fbf ismi; il\u00e2h\u00ee \u015fefkatin en lat\u00eef, en hassas ve esirgeyici derecesini ifade eder. Merhametin \u00f6tesinde, mahlukat\u0131n ac\u0131 ve s\u0131k\u0131nt\u0131 \u00e7ekmesini \u00f6nleyen, onlar\u0131 g\u00f6r\u00fcn\u00fcr ve g\u00f6r\u00fcnmez tehlikelerden koruyan il\u00e2h\u00ee bir ihtimamd\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** K\u0131\u015f mevsimi yakla\u015f\u0131rken a\u011fa\u00e7lar\u0131n \u00f6z sular\u0131n\u0131 k\u00f6klerine \u00e7ekerek donmaktan korunmas\u0131, g\u00f6\u00e7men ku\u015flar\u0131n dondurucu kutup so\u011fuklar\u0131 bast\u0131rmadan binlerce kilometre g\u00fcneye y\u00f6nlendirilmesi ve insan\u0131n g\u00f6z kapaklar\u0131n\u0131n bir toz tanesi kar\u015f\u0131s\u0131nda saniyenin onda biri h\u0131z\u0131nda kendili\u011finden kapanmas\u0131 Ra\u00fbf isminin biyolojik koruma kalkanlar\u0131d\u0131r.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** \u0130nsan, hayat\u0131ndaki musibet ve zahmetlerin ard\u0131ndaki gizli korumay\u0131 Ra\u00fbf ismiyle fark eder. 'Rabbim beni benden daha \u00e7ok koruyor ve esirgiyor' inanc\u0131, kalpte sars\u0131lmaz bir i\u00e7 huzuru meydana getirir; insan ili\u015fkilerinde de k\u0131r\u0131c\u0131 olmayan, esirgeyici ve yap\u0131c\u0131 bir nezaket do\u011furur.",
  },
  {
    weekNumber: 5,
    name: "EL-MUHS\u0130N",
    arabic: "\u0627\u064e\u0644\u0652\u0645\u064f\u062d\u0652\u0633\u0650\u0646\u064f",
    meaning: "\u0130hsan\u0131 bol olan, g\u00fczellikle muamele eden.",
    title: "EL-MUHS\u0130N \u2014 \u0130hsan\u0131 bol olan, g\u00fczellikle muamele eden.",
    body: "Muhsin ismi; yarat\u0131l\u0131\u015ftaki kusursuz i\u015f\u00e7ili\u011fi, s\u0131n\u0131rs\u0131z c\u00f6mertli\u011fi ve varl\u0131\u011fa sunulan l\u00fctuflar\u0131n zarafetini ifade eder. \u0130hsan; bir \u015feyi hem en y\u00fcksek kemal mertebesinde yapmak hem de muhatab\u0131na fazl\u0131ndan kar\u015f\u0131l\u0131ks\u0131z sunmakt\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Bitkiler \u00e2lemindeki fotosentez mucizesi, g\u00fcne\u015f \u0131\u015f\u0131\u011f\u0131n\u0131 ve karbondioksiti \u015fekere ve oksijene \u00e7evirirken yery\u00fcz\u00fcn\u00fcn t\u00fcm dengesini sa\u011flar. Canl\u0131lar\u0131n anatomisindeki milimetrik ahenk, g\u00f6z\u00fcn odaklanma mekanizmas\u0131, beynin n\u00f6ronal iletim h\u0131z\u0131 gibi ola\u011fan\u00fcst\u00fc detaylar k\u00e2inatta hi\u00e7bir \u015feyin ba\u015ftan savma yap\u0131lmad\u0131\u011f\u0131n\u0131, her \u015feyin bir 'Muhsin' eliyle m\u00fckemmel k\u0131l\u0131nd\u0131\u011f\u0131n\u0131 g\u00f6sterir.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** M\u00fcmin, amelinde ihsan derecesini hedefler: 'Allah\u2019\u0131 g\u00f6r\u00fcyormu\u015f\u00e7as\u0131na ya\u015famak'. Bu \u015fuur, hem mesleki hayatta y\u00fcksek kalite ve d\u00fcr\u00fcstl\u00fck (i\u015fini en iyi yapma ahlak\u0131) hem de sosyal m\u00fcnasebetlerde k\u00f6t\u00fcl\u00fc\u011fe bile iyilikle kar\u015f\u0131l\u0131k verme olgunlu\u011funu netice verir.",
  },
  {
    weekNumber: 6,
    name: "EL-KER\u00ceM",
    arabic: "\u0627\u064e\u0644\u0652\u0643\u064e\u0631\u0650\u064a\u0645\u064f",
    meaning: "C\u00f6mertli\u011fi ve ikram\u0131 sonsuz olan.",
    title: "EL-KER\u00ceM \u2014 C\u00f6mertli\u011fi ve ikram\u0131 sonsuz olan.",
    body: "Ker\u00eem ismi; mutlak zenginlikten ta\u015fan, hi\u00e7bir menfaate ve \u015farta ba\u011fl\u0131 olmayan s\u0131n\u0131rs\u0131z c\u00f6mertli\u011fi ifade eder. \u0130l\u00e2h\u00ee kerem, mahlukat\u0131n sadece asgari hayati ihtiya\u00e7lar\u0131n\u0131 de\u011fil; onlar\u0131n konforunu, lezzet ve estetik alg\u0131s\u0131n\u0131 da zenginle\u015ftiren bir l\u00fctuf tufan\u0131d\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Yery\u00fcz\u00fc katmanlar\u0131ndaki zengin maden yataklar\u0131, okyanuslardaki milyonlarca tonluk besin d\u00f6ng\u00fcs\u00fc ve bir meyve a\u011fac\u0131n\u0131n y\u00fczlerce tohum \u00fcretmesi il\u00e2h\u00ee keremin bollu\u011funu g\u00f6sterir. A\u011fa\u00e7, \u00fcretti\u011fi y\u00fczlerce meyvenin hi\u00e7birini kendisi yemez; b\u00fct\u00fcn\u00fcyle di\u011fer canl\u0131lar\u0131n istifadesine sunulan c\u00f6mert bir ikram vas\u0131tas\u0131d\u0131r.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** \u0130nsan, sahip oldu\u011fu zek\u00e2, s\u0131hhat, zaman ve servetin kendi ba\u015far\u0131s\u0131n\u0131n mutlak m\u00fclk\u00fc de\u011fil, Ker\u00eem olan Allah\u2019\u0131n emanet bir ikram\u0131 oldu\u011funu kavrar. Bu kavray\u0131\u015f; kibir ve bencilli\u011fi y\u0131kar, infak ve di\u011fergaml\u0131k (ba\u015fkalar\u0131n\u0131 d\u00fc\u015f\u00fcnme) ahlak\u0131n\u0131 k\u00f6kle\u015ftirir.",
  },
  {
    weekNumber: 7,
    name: "EL-MENN\u00c2N",
    arabic: "\u0627\u064e\u0644\u0652\u0645\u064e\u0646\u064e\u0651\u0627\u0646\u064f",
    meaning: "Nimetleri ard\u0131 ard\u0131na ihsan eden.",
    title: "EL-MENN\u00c2N \u2014 Nimetleri ard\u0131 ard\u0131na ihsan eden.",
    body: "Menn\u00e2n ismi; varl\u0131\u011f\u0131n ba\u015flang\u0131c\u0131ndan nihayetine kadar kesintisiz devam eden ontolojik ve pratik nimet ak\u0131\u015f\u0131n\u0131 ifade eder. 'Minnet' yaln\u0131zca O'na aittir; \u00e7\u00fcnk\u00fc varl\u0131\u011f\u0131 yokluktan \u00e7ekip \u00e7\u0131karan ve her an varl\u0131kta tutan yeg\u00e2ne kudret O'dur.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Atmosferdeki gazlar\u0131n dengesi (y\u00fczde 78 azot, y\u00fczde 21 oksijen) milyonlarca y\u0131ld\u0131r canl\u0131l\u0131\u011f\u0131n bo\u011fulmadan ya da yanmadan nefes alabilece\u011fi milimetrik oranda tutulmaktad\u0131r. Karbon ve azot d\u00f6ng\u00fcleri, okyanus ak\u0131nt\u0131lar\u0131 ve mevsimsel ritimler; hayat sahnesinin arkas\u0131nda durmaks\u0131z\u0131n \u00e7al\u0131\u015fan kesintisiz bir Menn\u00e2n\u00ee l\u00fctuf zinciridir.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** \u0130nsan \u00e7o\u011fu zaman s\u00fcrekli sahip oldu\u011fu nimetleri (sa\u011fl\u0131k, ak\u0131l, solunan hava) tabii bir hak zanneder; ancak bir anl\u0131k yoklu\u011funda \u00e7aresiz kal\u0131r. Menn\u00e2n isminin idraki; gaflet perdesini y\u0131rtar, s\u00fcrekli bir fark\u0131ndal\u0131k ve minnettarl\u0131k hali olu\u015fturur.",
  },
  {
    weekNumber: 8,
    name: "ER-REZZ\u00c2K",
    arabic: "\u0627\u064e\u0644\u0631\u064e\u0651\u0632\u064e\u0651\u0627\u0642\u064f",
    meaning: "B\u00fct\u00fcn canl\u0131lar\u0131n r\u0131zk\u0131n\u0131 veren.",
    title:
      "ER-REZZ\u00c2K \u2014 B\u00fct\u00fcn canl\u0131lar\u0131n r\u0131zk\u0131n\u0131 veren.",
    body: "Rezz\u00e2k ismi; canl\u0131l\u0131\u011f\u0131n biyolojik, zihinsel ve ruhsal devaml\u0131l\u0131\u011f\u0131 i\u00e7in muhta\u00e7 oldu\u011fu b\u00fct\u00fcn madd\u00ee-m\u00e2nev\u00ee g\u0131dalar\u0131 takdir edip ula\u015ft\u0131ran mutlak r\u0131z\u0131k vericili\u011fi ifade eder. Bedenin r\u0131zk\u0131 g\u0131da iken, akl\u0131n r\u0131zk\u0131 ilim, kalbin r\u0131zk\u0131 ise marifet ve muhabbettir.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** D\u00fcnya ekosistemindeki besin piramidi (trofik zincir) inan\u0131lmaz bir denge \u00fczerindedir. G\u00fcne\u015f enerjisini kimyasal enerjiye \u00e7eviren fitoplanktonlar ve bitkiler, onlar\u0131 t\u00fcketen otoburlar ve etoburlar aras\u0131ndaki enerji transferi hi\u00e7bir fabrikan\u0131n eri\u015femeyece\u011fi bir lojistik dehad\u0131r. Anne karn\u0131ndaki ceninin g\u00f6bek kordonuyla beslenmesi, do\u011fumla birlikte s\u00fct\u00fcn ba\u015flamas\u0131 Rezz\u00e2k isminin kusursuz zamanlamas\u0131n\u0131 g\u00f6sterir.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** Rezz\u00e2k inanc\u0131, insan\u0131 r\u0131zk\u0131n sahte sahiplerine (patronlar, d\u00fcnyev\u00ee g\u00fc\u00e7ler) boyun e\u011fmekten ve r\u0131z\u0131k kayg\u0131s\u0131yla harama y\u00f6nelmekten kurtar\u0131r. \u0130zzetli, onurlu ve \u00e7al\u0131\u015fkan bir duru\u015f kazand\u0131r\u0131r; sebepleri birer vazifeli bilir, \u015f\u00fckr\u00fc do\u011frudan Rezz\u00e2k-\u0131 Ker\u00eem'e sunar.",
  },
  {
    weekNumber: 9,
    name: "EL-LAT\u00ceF",
    arabic: "\u0627\u064e\u0644\u0644\u064e\u0651\u0637\u0650\u064a\u0641\u064f",
    meaning: "L\u00fctfu ince, bilgisi ve ihsan\u0131 n\u00fcfuz edici olan.",
    title: "EL-LAT\u00ceF \u2014 L\u00fctfu ince, bilgisi ve ihsan\u0131 n\u00fcfuz edici olan.",
    body: "Lat\u00eef ismi iki temel buudu ihtiva eder: Birincisi, ilminin en mikro, s\u00fcbjektif ve girift detaylara kadar n\u00fcfuz etmesi; ikincisi, l\u00fctuf ve inayetini sebepler perdesi arkas\u0131ndan en hassas ve sezilmez yollarla tecelli ettirmesidir.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** K\u0131lcal damar a\u011f\u0131m\u0131z\u0131n h\u00fccreler aras\u0131 madde al\u0131\u015fveri\u015findeki hassas bas\u0131n\u00e7 dengesi, fotonlar\u0131n g\u00f6zdeki rodopsin pigmentine \u00e7arp\u0131p g\u00f6rme duyusuna d\u00f6n\u00fc\u015fmesi ve tohumun \u00e7imlenirken topraktaki mikro mineralleri atomik d\u00fczeyde se\u00e7ip b\u00fcnyesine almas\u0131 Lat\u00eef isminin biyokimyasal harikalar\u0131d\u0131r. Tabiatta hi\u00e7bir hoyratl\u0131k yoktur; her hadise ipeksi bir zarafetle ger\u00e7ekle\u015fir.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** Lat\u00eef olan Allah\u2019a iman; insan\u0131n hadiselerin yaln\u0131z zahir\u00ee kaba y\u00fcz\u00fcne tak\u0131l\u0131p kalmas\u0131n\u0131 engeller. G\u00f6r\u00fcn\u00fcrde zorluk gibi duran imtihanlar\u0131n sat\u0131r aralar\u0131ndaki ince hikmet ve l\u00fctuflar\u0131 ke\u015ffetmeyi \u00f6\u011fretir. Ki\u015fiyi basiretle donat\u0131r, ruh d\u00fcnyas\u0131nda derin bir letafet ve zarafet filizlendirir.",
  },
  {
    weekNumber: 10,
    name: "EL-VED\u00dbD",
    arabic: "\u0627\u064e\u0644\u0652\u0648\u064e\u062f\u064f\u0648\u062f\u064f",
    meaning: "Seven ve sevilmeye en l\u00e2y\u0131k olan.",
    title: "EL-VED\u00dbD \u2014 Seven ve sevilmeye en l\u00e2y\u0131k olan.",
    body: "Ved\u00fbd ismi; varl\u0131\u011f\u0131n kozmik ontolojisindeki \u00e7ekim, muhabbet ve sempati enerjisinin il\u00e2h\u00ee menba\u0131d\u0131r. Allah mahlukat\u0131 yokluk karanl\u0131\u011f\u0131ndan sevgiyle var etmi\u015f, k\u00e2inat\u0131 birbiriyle cezbe ve cazibe kanunlar\u0131yla kenetlemi\u015ftir.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Atom alt\u0131 par\u00e7ac\u0131klar\u0131 bir arada tutan g\u00fc\u00e7l\u00fc n\u00fckleer kuvvetten, gezegenleri y\u0131ld\u0131zlar\u0131n etraf\u0131nda dans ettiren k\u00fctle\u00e7ekim kuvvetine kadar her \u015fey kozmik bir muhabbet cezbeli\u011fidir. Biyolojik \u00e2lemde ise simbiyotik ya\u015fam birliktelikleri (likenler, mikoriza mantarlar\u0131, resif ekosistemleri) varl\u0131\u011f\u0131n \u00e7at\u0131\u015fma de\u011fil, derin bir dayan\u0131\u015fma ve \u00fclfet \u00fczerine kuruldu\u011funu ispatlar.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** \u0130nsan kalbindeki sonsuz sevme kapasitesi, ancak sonsuz kemal sahibi El-Ved\u00fbd ile tatmin olabilir. Fani varl\u0131klara y\u00f6nelen sevgiler birer g\u00f6lge ve basamakt\u0131r; as\u0131l hedef, k\u00e2inattaki b\u00fct\u00fcn g\u00fczelliklerin aynas\u0131nda Ved\u00fbd-u Z\u00fclcel\u00e2l'i sevmek ve O'nun sevgisine mazhar olmakt\u0131r.",
  },
  {
    weekNumber: 11,
    name: "EL-HAB\u00ceB",
    arabic: "\u0627\u064e\u0644\u0652\u062d\u064e\u0628\u0650\u064a\u0628\u064f",
    meaning: "Sevilen, sevgisi g\u00f6n\u00fcllerde yer eden.",
    title: "EL-HAB\u00ceB \u2014 Sevilen, sevgisi g\u00f6n\u00fcllerde yer eden.",
    body: "Hab\u00eeb ismi; kalplerin f\u0131tr\u00ee \u00e7ekim merkezi, varl\u0131\u011f\u0131n nihai gayesi ve sevgiye lay\u0131k tek hakiki ma\u015fuk olu\u015fu remzeder. Sevgi, insan\u0131n ruhunda ebediyete a\u00e7\u0131lan en kuvvetli pusulad\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** B\u00fct\u00fcn k\u00e2inat adeta bir il\u00e2h\u00ee a\u015fk mektubudur. G\u00f6ky\u00fcz\u00fcndeki y\u0131ld\u0131zlar\u0131n kandiller gibi donat\u0131lmas\u0131, yery\u00fcz\u00fcn\u00fcn reng\u00e2renk hal\u0131larla serilmesi ve her baharda y\u00fcz binlerce t\u00fcr\u00fcn yeniden dirilerek \u015fenlik kurmas\u0131; H\u00e2l\u0131k-\u0131 Z\u00fclcel\u00e2l'in kullar\u0131na olan sevgisini ve Kendisini sevdirmek istedi\u011fini a\u00e7\u0131k\u00e7a ilan eder.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** \u0130nsan kalbindeki bo\u015fluk, sonlu d\u00fcnyal\u0131klarla dolmaz. Hab\u00eeb olan Allah\u2019a y\u00f6nelen muhabbet; kalbi par\u00e7alanmaktan, k\u0131r\u0131lmaktan ve d\u00fcnyev\u00ee h\u00fcsranlardan muhafaza eder. Ger\u00e7ek dostlu\u011fun O\u2019nunla kurulan ba\u011f oldu\u011funu idrak eden ruh, hakiki h\u00fcrriyete kavu\u015fur.",
  },
  {
    weekNumber: 12,
    name: "EL-H\u00c2LIK",
    arabic: "\u0627\u064e\u0644\u0652\u062e\u064e\u0627\u0644\u0650\u0642\u064f",
    meaning: "Her \u015feyi yaratan.",
    title: "EL-H\u00c2LIK \u2014 Her \u015feyi yaratan.",
    body: "H\u00e2l\u0131k ismi; mutlak yokluktan (adem) varl\u0131k sahas\u0131na \u00e7\u0131karma kudretini ve varl\u0131\u011f\u0131n ontolojik mimarisini yoktan var etmeyi (halk) ifade eder. \u0130l\u00e2h\u00ee yaratma; tek seferlik deist bir ba\u015flang\u0131\u00e7 de\u011fil, her an yenilenen dinamik bir varolu\u015f (halk-\u0131 ced\u00eed) s\u00fcrecidir.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Kuantum vakumundaki s\u0131f\u0131r noktas\u0131 enerjisinden s\u00fcrekli par\u00e7ac\u0131klar\u0131n varl\u0131k alan\u0131na \u00e7\u0131kmas\u0131, y\u0131ld\u0131zlar\u0131n kalbindeki n\u00fckleer f\u00fczyonla yeni elementlerin sentezlenmesi ve bir zigottan trilyonlarca \u00f6zelle\u015fmi\u015f h\u00fccreye sahip kompleks bir organizman\u0131n ad\u0131m ad\u0131m yarat\u0131lmas\u0131 H\u00e2l\u0131k isminin kesintisiz yarat\u0131l\u0131\u015f \u015f\u00f6lenidir.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** \u0130nsan, hi\u00e7bir atomunu kendisinin icat etmedi\u011fi bir bedende ve m\u00fclk\u00fcnde ya\u015far. H\u00e2l\u0131k ismini kavrayan ak\u0131l; kibrin sa\u00e7mal\u0131\u011f\u0131n\u0131 anlar, tevazu elbisesini giyer ve yarat\u0131l\u0131\u015f gayesini sorgulayarak hayat\u0131n\u0131 hikmet zeminine oturtur.",
  },
  {
    weekNumber: 13,
    name: "EL-B\u00c2R\u0130",
    arabic: "\u0627\u064e\u0644\u0652\u0628\u064e\u0627\u0631\u0650\u0626\u064f",
    meaning: "Varl\u0131klar\u0131 uyumlu ve uygun bi\u00e7imde var eden.",
    title: "EL-B\u00c2R\u0130 \u2014 Varl\u0131klar\u0131 uyumlu ve uygun bi\u00e7imde var eden.",
    body: "B\u00e2ri ismi; yarat\u0131lan varl\u0131klar\u0131n anatomik, fizyolojik ve kozmik par\u00e7alar\u0131n\u0131n birbirine kusursuz bir tenas\u00fcp (oran ve uyum) i\u00e7inde kenetlenmesini, p\u00fcr\u00fczs\u00fcz ve ahenkli bir \u015fekilde tanzim edilmesini ifade eder.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Atmosfer bas\u0131nc\u0131 ile insan damarlar\u0131ndaki kan bas\u0131nc\u0131n\u0131n birbirini s\u0131f\u0131rlamas\u0131, yer\u00e7ekimi ivmesi ile kas-iskelet sistemimizin mukavemet dengesi, fotosentez ile h\u00fccresel solunum aras\u0131ndaki gaz d\u00f6ng\u00fcs\u00fcn\u00fcn tam \u00f6rt\u00fc\u015fmesi B\u00e2ri isminin ekolojik ve biyolojik tezah\u00fcrleridir. Hi\u00e7bir uzuv fazla ya da eksik de\u011fildir; sistemler kusursuz bir senfoni gibi i\u015fler.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** K\u00e2inatta kaosun de\u011fil, mutlak bir uyumun h\u00fck\u00fcm s\u00fcrd\u00fc\u011f\u00fcn\u00fc g\u00f6ren m\u00fctefekkir; hayat\u0131ndaki z\u0131tl\u0131klar\u0131n (ac\u0131-tatl\u0131, keder-sevin\u00e7) da il\u00e2h\u00ee bir dengenin par\u00e7as\u0131 oldu\u011funu fark eder. Bu idrak, olaylara b\u00fct\u00fcnc\u00fcl ve hikmetli bakabilme olgunlu\u011fu sa\u011flar.",
  },
  {
    weekNumber: 14,
    name: "EL-MUSAVV\u0130R",
    arabic: "\u0627\u064e\u0644\u0652\u0645\u064f\u0635\u064e\u0648\u0650\u0651\u0631\u064f",
    meaning: "Varl\u0131klara s\u00fbret ve \u00f6zellik veren.",
    title: "EL-MUSAVV\u0130R \u2014 Varl\u0131klara s\u00fbret ve \u00f6zellik veren.",
    body: "Musavvir ismi; varl\u0131\u011f\u0131n soyut maddesine somut bir form, estetik bir kimlik ve karakteristik bir geometri kazand\u0131ran il\u00e2h\u00ee tasar\u0131m\u0131 remzeder. Her bir t\u00fcr ve birey, adeta il\u00e2h\u00ee bir m\u00fchr\u00fcn e\u015fsiz birer bask\u0131s\u0131d\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Molek\u00fcler biyolojide proteinlerin \u00fc\u00e7 boyutlu katlanma (protein folding) geometrisi, bir milimetrenin milyonda biri \u00f6l\u00e7e\u011findeki kurgusuyla h\u00fccrenin b\u00fct\u00fcn fonksiyonunu belirler. Deniz kabuklar\u0131ndaki logaritmik spiraller, ay\u00e7i\u00e7e\u011findeki Fibonacci dizilimi ve minerallerin kristal kafes yap\u0131lar\u0131 Musavvir isminin matematiksel ve geometrik tecellileridir.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** \u0130nsan, fiziki ve ruhi suretinin rastgele bir mutasyon y\u0131\u011f\u0131n\u0131 de\u011fil, il\u00e2h\u00ee bir tasar\u0131m\u0131n \u015faheseri oldu\u011funu anlar. Bu fark\u0131ndal\u0131k; bedenine ve ruhuna sayg\u0131 duymay\u0131, yarat\u0131l\u0131\u015f gayesine uygun bir ahlak\u00ee suret (h\u00fcsn-\u00fc ahlak) ku\u015fanmay\u0131 gerektirir.",
  },
  {
    weekNumber: 15,
    name: "ES-S\u00dcBH\u00c2N",
    arabic: "\u0627\u0644\u0633\u064f\u0651\u0628\u0652\u062d\u064e\u0627\u0646\u064f",
    meaning: "Her t\u00fcrl\u00fc noksanl\u0131ktan m\u00fcnezzeh olan.",
    title: "ES-S\u00dcBH\u00c2N \u2014 Her t\u00fcrl\u00fc noksanl\u0131ktan m\u00fcnezzeh olan.",
    body: "S\u00fcbh\u00e2n ismi (tenzih hakikati); Z\u00e2t-\u0131 B\u00e2ri'nin cisimden, zamandan, mek\u00e2ndan, aczden, cehaletten ve mahlukata ait her t\u00fcrl\u00fc kay\u0131t ve noksanl\u0131ktan mutlak surette m\u00fcnezzeh oldu\u011funu ilan eder.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Termodinamik ve kozmolojik kanunlar\u0131n k\u00e2inat \u00e7ap\u0131ndaki \u015fa\u015fmaz tutarl\u0131l\u0131\u011f\u0131, kuantum d\u00fcnyas\u0131ndan g\u00f6kadalara kadar hi\u00e7bir yerde ontolojik bir \u00e7atlak ve karma\u015fa bulunmamas\u0131 (M\u00fclk Suresi 3. ayet: 'G\u00f6z\u00fcn\u00fc \u00e7evir de bak, bir kusur g\u00f6rebilir misin?') S\u00fcbh\u00e2n isminin k\u00e2inattaki tenzih\u00ee m\u00fchr\u00fcd\u00fcr. Sistem kusursuzdur, \u00e7\u00fcnk\u00fc Mimar\u0131 noksanl\u0131ktan beridir.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** S\u00fcbhanallah zikri; akl\u0131n Allah hakk\u0131nda yanl\u0131\u015f tasavvurlara, te\u015fbih ve tecsime kaymas\u0131n\u0131 engelleyen en b\u00fcy\u00fck fikr\u00ee kalkand\u0131r. \u0130nsan, kendi zihn\u00ee s\u0131n\u0131rl\u0131l\u0131klar\u0131n\u0131n fark\u0131na var\u0131r; Rabbini noksan s\u0131fatlardan tenzih edip kemal s\u0131fatlarla \u00f6verek tevhidin safiyetini muhafaza eder.",
  },
  {
    weekNumber: 16,
    name: "EL-AZ\u00ceM",
    arabic: "\u0627\u064e\u0644\u0652\u0639\u064e\u0638\u0650\u064a\u0645\u064f",
    meaning: "Azameti sonsuz olan.",
    title: "EL-AZ\u00ceM \u2014 Azameti sonsuz olan.",
    body: "Az\u00eem ismi; Z\u00e2t\u00ee, s\u0131f\u00e2t\u00ee ve fiil\u00ee b\u00fcy\u00fckl\u00fc\u011f\u00fc hi\u00e7bir hudut ve tasavvurla s\u0131n\u0131rland\u0131r\u0131lamayan mutlak azamet sahibini ifade eder. Mahlukat\u0131n b\u00fcy\u00fckl\u00fc\u011f\u00fc g\u00f6receli ve s\u0131n\u0131rl\u0131 iken, O\u2019nun azameti hakikidir.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Milyarlarca \u0131\u015f\u0131k y\u0131l\u0131 geni\u015fli\u011findeki kozmik a\u011flar (cosmic webs), trilyonlarca G\u00fcne\u015f k\u00fctlesine sahip s\u00fcper k\u00fctleli kara delikler ve evrendeki ak\u0131l almaz madde-enerji yo\u011funlu\u011fu Az\u00eem isminin kozmolojik aynalar\u0131d\u0131r. En devasa g\u00f6k cisimleri bile O'nun 'K\u00fcn' (Ol) emri kar\u015f\u0131s\u0131nda bir kum tanesinden daha k\u00fc\u00e7\u00fck kal\u0131r.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** Azamet-i il\u00e2hiyeyi tefekk\u00fcr eden insan; kendi kibir ve gururunun ne kadar komik bir yan\u0131lsama oldu\u011funu anlar. Bu idrak, ki\u015fide hem derin bir tevazu hem de d\u00fcnyev\u00ee sahte g\u00fc\u00e7ler kar\u015f\u0131s\u0131nda e\u011filmeyen sars\u0131lmaz bir ruh\u00ee asalet ve cesaret meydana getirir.",
  },
  {
    weekNumber: 17,
    name: "EL-AL\u0130YY",
    arabic: "\u0627\u064e\u0644\u0652\u0639\u064e\u0644\u0650\u064a\u064f\u0651",
    meaning: "Y\u00fcceli\u011fi her \u015feyin \u00fcst\u00fcnde olan.",
    title: "EL-AL\u0130YY \u2014 Y\u00fcceli\u011fi her \u015feyin \u00fcst\u00fcnde olan.",
    body: "Aliyy ismi; ontolojik hiyerar\u015finin zirvesinde, b\u00fct\u00fcn varl\u0131k mertebelerinden a\u015fk\u0131n (m\u00fcte\u00e2l) ve mutlak kahr ve galebe sahibi y\u00fcceli\u011fi ifade eder.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** K\u00e2inattaki hiyerar\u015fik yap\u0131 (atom alt\u0131 kuarklardan molek\u00fcllere, h\u00fccrelerden biyosfere, gezegenlerden galaktik k\u00fcmelere) bir d\u00fczen piramididir. Aliyy ismi, b\u00fct\u00fcn bu kozmik basamaklar\u0131n fevkinde, hi\u00e7bir \u015feye ba\u011f\u0131ml\u0131 olmadan her \u015feye h\u00fckmeden mutlak a\u015fk\u0131nl\u0131\u011f\u0131 g\u00f6sterir.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** Aliyy isminin \u015fuuru; insan\u0131n kalbini baya\u011f\u0131, s\u00fcfli ve al\u00e7alt\u0131c\u0131 heveslerden kurtar\u0131r. \u0130nsana ulv\u00ee gayeler, y\u00fcksek ahl\u00e2k\u00ee idealler ve himmet y\u00fcceli\u011fi kazand\u0131r\u0131r. Kul, ancak En Y\u00fcce olana ba\u011flanarak kendi r\u00fctbesini y\u00fckseltebilir.",
  },
  {
    weekNumber: 18,
    name: "EL-M\u00dcTE\u00c2L",
    arabic: "\u0627\u064e\u0644\u0652\u0645\u064f\u062a\u064e\u0639\u064e\u0627\u0644\u0650",
    meaning: "Her t\u00fcrl\u00fc s\u0131n\u0131rl\u0131l\u0131ktan y\u00fcce olan.",
    title:
      "EL-M\u00dcTE\u00c2L \u2014 Her t\u00fcrl\u00fc s\u0131n\u0131rl\u0131l\u0131ktan y\u00fcce olan.",
    body: "M\u00fcte\u00e2l ismi; a\u015fk\u0131nl\u0131\u011f\u0131n (transcendence) en mutlak ifadesidir. Yarat\u0131lm\u0131\u015flara mahsus hi\u00e7bir kay\u0131t, hudut, keyfiyet veya zihni tasavvur O\u2019na isnat edilemez.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** K\u00e2inat geni\u015flemekte ve zaman akmaktad\u0131r; her yarat\u0131lm\u0131\u015f varl\u0131k uzay-zaman dokusuna mahk\u00fbmdur. M\u00fcte\u00e2l ismi, zaman\u0131 ve mek\u00e2n\u0131 birer koordinat olarak var eden, fakat kendisi hi\u00e7bir fiziksel boyutla s\u0131n\u0131rland\u0131r\u0131lamayan mutlak ba\u011f\u0131ms\u0131zl\u0131\u011f\u0131 ilan eder.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** Bu isim; insan\u0131n zihn\u00ee putlar \u00fcretmesini engeller. 'Akl\u0131na her ne gelirse, Allah ondan ba\u015fkad\u0131r' d\u00fcsturuyla insan\u0131 dogmatik s\u0131n\u0131rl\u0131l\u0131klardan ar\u0131nd\u0131r\u0131r; sonsuz bir hu\u015f\u00fb ve marifet ufkuna kanatland\u0131r\u0131r.",
  },
  {
    weekNumber: 19,
    name: "ES-SULT\u00c2N",
    arabic: "\u0627\u0644\u0633\u064f\u0651\u0644\u0652\u0637\u064e\u0627\u0646\u064f",
    meaning: "Mutlak h\u00e2kimiyet sahibi.",
    title: "ES-SULT\u00c2N \u2014 Mutlak h\u00e2kimiyet sahibi.",
    body: "Sult\u00e2n ismi; kozmik krall\u0131\u011f\u0131n (m\u00fclk ve melek\u00fbt) yeg\u00e2ne egemenli\u011fini, ferman\u0131na kar\u015f\u0131 konulamaz mutlak otoriteyi temsil eder. B\u00fct\u00fcn fizik\u00ee yasalar, O'nun iradesinin k\u00e2inattaki icraat memurlar\u0131d\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Termodinami\u011fin entropi yasas\u0131ndan genel g\u00f6relili\u011fin uzay-zaman b\u00fck\u00fclmesine kadar k\u00e2inattaki t\u00fcm kanunlar sars\u0131lmaz bir disiplinle i\u015fler. Hi\u00e7bir gezegen y\u00f6r\u00fcngesinden firar edemez, hi\u00e7bir foton \u0131\u015f\u0131k h\u0131z\u0131n\u0131n s\u0131n\u0131r\u0131n\u0131 delemez. Bu kozmik itaat, mutlak bir Sultan'\u0131n h\u00fck\u00fcmranl\u0131\u011f\u0131n\u0131 g\u00f6sterir.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** Sult\u00e2n-\u0131 Ezel\u00ee'ye kul olan bir insan; fani varl\u0131klar\u0131n k\u00f6lesi olmaktan kurtulur. Bu idrak ki\u015fiye ger\u00e7ek bir h\u00fcrriyet ve asalet kazand\u0131r\u0131r; O'nun r\u0131zas\u0131na uygun ya\u015famay\u0131 en b\u00fcy\u00fck \u015feref bilir.",
  },
  {
    weekNumber: 20,
    name: "EL-KAD\u00ceR",
    arabic: "\u0627\u064e\u0644\u0652\u0642\u064e\u062f\u0650\u064a\u0631\u064f",
    meaning: "Kudreti her \u015feye yeten.",
    title: "EL-KAD\u00ceR \u2014 Kudreti her \u015feye yeten.",
    body: "Kad\u00eer ismi; z\u00e2t\u00ee, sonsuz ve hi\u00e7bir acziyetle kesintiye u\u011framayan mutlak kudreti ifade eder. \u0130mk\u00e2n dairesindeki her \u015fey, O'nun kudreti kar\u015f\u0131s\u0131nda e\u015fittir; bir zerre ile bir galaksi ayn\u0131 kolayl\u0131kla yarat\u0131l\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Atomun \u00e7ekirde\u011finde sakl\u0131 duran ve par\u00e7aland\u0131\u011f\u0131nda devasa \u015fehirleri ayd\u0131nlatabilecek potansiyele sahip g\u00fc\u00e7l\u00fc n\u00fckleer kuvvet, s\u00fcpernova patlamalar\u0131ndaki ak\u0131l almaz enerji bo\u015fal\u0131mlar\u0131 ve k\u00e2inat\u0131n 13.8 milyar y\u0131ld\u0131r s\u00fcregelen kinetik geni\u015flemesi Kad\u00eer isminin kudret tezah\u00fcrleridir.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** Kad\u00eer-i Z\u00fclcel\u00e2l'e dayanan insan; g\u00fc\u00e7s\u00fczl\u00fc\u011f\u00fcnden do\u011fan korku ve kayg\u0131lar\u0131 a\u015far. Sebepler d\u00fcnyas\u0131nda elinden gelen gayreti g\u00f6sterir; fakat neticeyi kudretin ger\u00e7ek Sahibine havale ederek sars\u0131lmaz bir emniyete ula\u015f\u0131r.",
  },
  {
    weekNumber: 21,
    name: "EL-KAHH\u00c2R",
    arabic: "\u0627\u064e\u0644\u0652\u0642\u064e\u0647\u064e\u0651\u0627\u0631\u064f",
    meaning: "Mutlak kudreti kar\u015f\u0131s\u0131nda her \u015fey boyun e\u011fen.",
    title:
      "EL-KAHH\u00c2R \u2014 Mutlak kudreti kar\u015f\u0131s\u0131nda her \u015fey boyun e\u011fen.",
    body: "Kahh\u00e2r ismi; il\u00e2h\u00ee adaletin ve cel\u00e2lin galebe \u00e7alan, nizam\u0131 bozan hi\u00e7bir unsura ge\u00e7it vermeyen mutlak h\u00e2kimiyetini temsil eder. Varl\u0131k sahnesindeki hi\u00e7bir kibirli g\u00fc\u00e7, bu iradenin kar\u015f\u0131s\u0131nda tutunamaz.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Uzaydaki dev kara deliklerin hi\u00e7bir \u0131\u015f\u0131\u011f\u0131n ve maddenin ka\u00e7amayaca\u011f\u0131 \u00e7ekim kudreti, y\u0131ld\u0131zlar\u0131 yutan k\u00fctle\u00e7ekimsel tekillikler ve jeolojik \u00e7a\u011flarda yery\u00fcz\u00fcn\u00fc yeniden \u015fekillendiren tektonik k\u0131r\u0131lmalar Kahh\u00e2r isminin kozmik azametidir.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** Bu isim; insan\u0131n i\u00e7indeki nefsan\u00ee kibri, enaniyeti ve d\u00fcnyev\u00ee g\u00fc\u00e7 vehimlerini darmada\u011f\u0131n eder. Zalimlerin cezas\u0131z kalmayaca\u011f\u0131 inanc\u0131yla adalete olan g\u00fcveni peki\u015ftirir ve insan\u0131 cel\u00e2l\u00ee bir takva ile donat\u0131r.",
  },
  {
    weekNumber: 22,
    name: "EL-CEBB\u00c2R",
    arabic: "\u0627\u064e\u0644\u0652\u062c\u064e\u0628\u064e\u0651\u0627\u0631\u064f",
    meaning: "Kudreti \u00fcst\u00fcn, diledi\u011fini ger\u00e7ekle\u015ftiren ve onaran.",
    title:
      "EL-CEBB\u00c2R \u2014 Kudreti \u00fcst\u00fcn, diledi\u011fini ger\u00e7ekle\u015ftiren ve onaran.",
    body: "Cebb\u00e2r ismi; hem cebr\u00ee kudretiyle diledi\u011fini mutlak surette icra eden cel\u00e2l\u00ee cepheyi, hem de 'cebr' k\u00f6k\u00fcnden gelen k\u0131r\u0131lan\u0131 d\u00fczeltme, eksikleri tamamlama ve yaralar\u0131 sarma cem\u00e2l\u00ee \u015fifas\u0131n\u0131 b\u00fcnyesinde toplar.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Canl\u0131 dokulardaki h\u00fccresel rejenerasyon (karaci\u011ferin kendini yenilemesi, kertenkelenin kopan kuyru\u011funu tamamlamas\u0131), atmosferin ozon tabakas\u0131ndaki delikleri kimyasal s\u00fcre\u00e7lerle tamir etmesi ve ekosistemlerin tahribatlardan sonra g\u00f6sterdi\u011fi homeostatik denge Cebb\u00e2r isminin onar\u0131c\u0131 m\u00fchr\u00fcd\u00fcr.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** M\u00fcmin, k\u0131r\u0131lan \u00fcmitlerini, da\u011f\u0131lan i\u00e7 d\u00fcnyas\u0131n\u0131 ve manevi yaralar\u0131n\u0131 Cebb\u00e2r olan Allah\u2019\u0131n tamir edece\u011fine inan\u0131r. Bu isim, ki\u015fiye sars\u0131lmaz bir ruhsal dayan\u0131kl\u0131l\u0131k ve hayata yeniden ba\u015flama azmi kazand\u0131r\u0131r.",
  },
  {
    weekNumber: 23,
    name: "EL-GAN\u00ce",
    arabic: "\u0627\u064e\u0644\u0652\u063a\u064e\u0646\u0650\u064a\u064f\u0651",
    meaning: "Mutlak zengin, hi\u00e7bir \u015feye muhta\u00e7 olmayan.",
    title: "EL-GAN\u00ce \u2014 Mutlak zengin, hi\u00e7bir \u015feye muhta\u00e7 olmayan.",
    body: "Gan\u00ee ismi; varl\u0131\u011f\u0131 z\u00e2t\u0131ndan olan (v\u00e2cib\u00fc'l-v\u00fcc\u00fbd), hi\u00e7bir sebebe, mek\u00e2na, zamana ve mahluka asla ihtiya\u00e7 duymayan mutlak isti\u011fn\u00e2 halini ifade eder. Mahlukat\u0131n zenginli\u011fi ba\u011f\u0131ml\u0131 ve emanet iken, O'nunki mutlakt\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** K\u00e2inattaki madde-enerji toplam\u0131n\u0131n t\u00fckenmez zenginli\u011fi, G\u00fcne\u015f'in 4.5 milyar y\u0131ld\u0131r etraf\u0131na sa\u00e7t\u0131\u011f\u0131 ve sadece milyarda ikisi d\u00fcnyam\u0131za ula\u015fan devasa radyasyon rezervi Gan\u00ee isminin kozmik yans\u0131malar\u0131d\u0131r. \u0130l\u00e2h\u00ee hazineler vermekle t\u00fckenmez.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** \u0130nsan f\u0131traten fakir ve muhta\u00e7t\u0131r. Kendi acziyetini Gan\u00ee olan Allah'\u0131n derg\u00e2h\u0131na sunan fert, d\u00fcnyev\u00ee h\u0131rslardan ve a\u015fa\u011f\u0131l\u0131k komplekslerinden kurtulur. Kalp zenginli\u011fi (g\u0131ne'n-nefs) kazanarak ger\u00e7ek h\u00fcrriyeti tadar.",
  },
  {
    weekNumber: 24,
    name: "ES-SAMED",
    arabic: "\u0627\u0644\u0635\u064e\u0651\u0645\u064e\u062f\u064f",
    meaning:
      "Her \u015feyin kendisine y\u00f6neldi\u011fi, kendisi hi\u00e7bir \u015feye muhta\u00e7 olmayan.",
    title:
      "ES-SAMED \u2014 Her \u015feyin kendisine y\u00f6neldi\u011fi, kendisi hi\u00e7bir \u015feye muhta\u00e7 olmayan.",
    body: "Samed ismi; tevhidin kalbidir. B\u00fct\u00fcn mahlukat\u0131n ontolojik ve pratik olarak varl\u0131kta kalabilmek i\u00e7in her an muhta\u00e7 oldu\u011fu (fakr-\u0131 mutlak), Z\u00e2t-\u0131 Akdes'in ise hi\u00e7bir \u015feye ihtiya\u00e7 duymad\u0131\u011f\u0131 mutlak yetkinli\u011fi ifade eder.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Kuantum alan teorisindeki vakum dalgalanmalar\u0131ndan canl\u0131 h\u00fccrelerin homeostazisine kadar k\u00e2inattaki her dinamik, d\u0131\u015far\u0131dan s\u00fcrekli bir varl\u0131k ve enerji girdisine muhta\u00e7t\u0131r. Hi\u00e7bir sistem kendi kendine yetemez (kapal\u0131 sistemlerin entropisi artar). Bu durum, t\u00fcm k\u00e2inat\u0131n her an Samed olan bir M\u00fcdebbir'e muhta\u00e7 oldu\u011funu bilimsel olarak hayk\u0131r\u0131r.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** Samed ismini kavrayan m\u00fcmin; fani varl\u0131klara bel ba\u011flamaktan kurtulur. Kalbini arac\u0131lar\u0131n k\u00f6leli\u011finden azat eder; do\u011frudan do\u011fruya H\u00e2l\u0131k-\u0131 Z\u00fclcel\u00e2l'e iltica ederek tevhidin izzetini ya\u015far.",
  },
  {
    weekNumber: 25,
    name: "EL-FERD",
    arabic: "\u0627\u064e\u0644\u0652\u0641\u064e\u0631\u0652\u062f\u064f",
    meaning: "Tek ve benzersiz olan.",
    title: "EL-FERD \u2014 Tek ve benzersiz olan.",
    body: "Ferd ismi; Z\u00e2t-\u0131 \u0130l\u00e2hiyye'nin e\u015fsizli\u011fini ve b\u00f6l\u00fcnmez tekli\u011fini (ferdiyyet) ifade eder. K\u00e2inattaki her bir mevcudun nev'i i\u00e7inde benzersiz bir fert olarak tanzim edilmesi bu ismin cilvesidir.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Genetik bilimindeki \u00e7e\u015fitlilik harikas\u0131 (biyo-\u00e7e\u015fitlilik): Milyarlarca canl\u0131n\u0131n ayn\u0131 d\u00f6rt n\u00fckleotit bazla (A, T, G, C) kodlanmas\u0131na ra\u011fmen her bir ferdin kendine mahsus bir genom haritas\u0131na ve fenotipe sahip olmas\u0131 Ferd isminin biyomolek\u00fcler imzas\u0131d\u0131r.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** M\u00fcmin, k\u00e2inattaki bu ferdiyet m\u00fchr\u00fcn\u00fc okuyarak \u015firk ve ortakl\u0131k ihtimallerini k\u00f6k\u00fcnden reddeder. Her bir varl\u0131\u011f\u0131n do\u011frudan do\u011fruya tek bir Sanatk\u00e2r'\u0131n hususi bir eseri oldu\u011funu idrak eder.",
  },
  {
    weekNumber: 26,
    name: "EL-EHAD",
    arabic: "\u0627\u064e\u0644\u0652\u0623\u064e\u062d\u064e\u062f\u064f",
    meaning: "Birli\u011fi b\u00f6l\u00fcnmez ve benzersiz olan.",
    title: "EL-EHAD \u2014 Birli\u011fi b\u00f6l\u00fcnmez ve benzersiz olan.",
    body: "Ehad ismi; Z\u00e2t-\u0131 \u0130l\u00e2hiyye'nin k\u0131s\u0131mlara, c\u00fczlere ve par\u00e7alara ayr\u0131lmaktan m\u00fcnezzeh mutlak basitli\u011fini (ittihad ve bas\u00e2tet) ve b\u00f6l\u00fcnmez vahdetini remzeder.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Do\u011fadaki fizik\u00ee kuvvetlerin birle\u015fik alan teorisinde (Grand Unified Theory) tek bir k\u00f6k kuvvete i\u015faret etmesi, evrensel fizik sabitlerinin (\u0131\u015f\u0131k h\u0131z\u0131, Planck sabiti, k\u00fctle\u00e7ekim sabiti) k\u00e2inat\u0131n her noktas\u0131nda tekd\u00fcze ge\u00e7erlili\u011fi Ehad isminin kozmolojik vahdet delilidir. K\u00e2inat tek bir ustan\u0131n elinden \u00e7\u0131km\u0131\u015f bir kitapt\u0131r.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** \u0130hl\u00e2s Suresi'nin ba\u015f\u0131nda ilan edilen 'Kul h\u00fcvall\u00e2hu ehad' hakikati; tevhidi zihinde ve kalpte berrakla\u015ft\u0131r\u0131r. \u0130nsan\u0131 \u015firk \u015f\u00fcphelerinden ar\u0131nd\u0131r\u0131r, par\u00e7alanm\u0131\u015f heveslerden tek bir k\u0131bleye y\u00f6neltir.",
  },
  {
    weekNumber: 27,
    name: "EL-V\u0130TR",
    arabic: "\u0627\u064e\u0644\u0652\u0648\u0650\u062a\u0652\u0631\u064f",
    meaning: "Tek ve e\u015fsiz olan.",
    title: "EL-V\u0130TR \u2014 Tek ve e\u015fsiz olan.",
    body: "Vitr ismi; tekli\u011fi, simetri ve asimetrinin ahengini, varl\u0131\u011f\u0131n nihai merkezile\u015fmesini ifade eder. Tek olan Z\u00e2t, varl\u0131kta da teklik ve sadelik i\u00e7indeki ihti\u015fam\u0131 tecelli ettirmi\u015ftir.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Atomun merkezindeki tek \u00e7ekirdek, h\u00fccrenin merkezindeki tek \u00e7ekirdek\u00e7ik, canl\u0131n\u0131n tek bir genetik programla kodlanmas\u0131 ve galaksilerin tekil merkezler etraf\u0131nda d\u00f6nmesi k\u00e2inattaki 'merkez\u00ee teklik' kanunudur. \u00c7okluk (kesret), daima bir tekli\u011fe (vahdet) ba\u011flanarak nizam bulur.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** M\u00fcmin, da\u011f\u0131n\u0131k d\u00fcnyev\u00ee me\u015fgalelerin kalbini istila etmesine izin vermez. Kalbin tek merkezli pusulas\u0131n\u0131 Vitr olan Rabbine \u00e7evirir; ihlas ve samimiyetle tevhidi ya\u015far.",
  },
  {
    weekNumber: 28,
    name: "EL-B\u00c2K\u00ce",
    arabic: "\u0627\u064e\u0644\u0652\u0628\u064e\u0627\u0642\u0650\u064a",
    meaning: "Varl\u0131\u011f\u0131n\u0131n sonu olmayan.",
    title: "EL-B\u00c2K\u00ce \u2014 Varl\u0131\u011f\u0131n\u0131n sonu olmayan.",
    body: "B\u00e2k\u00ee ismi; ontolojik bekay\u0131, zamana ba\u011fl\u0131 olmayan mutlak ebediyeti ifade eder. K\u00e2inattaki b\u00fct\u00fcn mevcudat zeval ve fenaya mahk\u00fbmken, O Z\u00e2t-\u0131 Z\u00fclcel\u00e2l fenadan m\u00fcnezzehtir.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Evrenin termodinamik kaderi (entropi art\u0131\u015f\u0131 ve \u0131s\u0131 \u00f6l\u00fcm\u00fc), y\u0131ld\u0131zlar\u0131n s\u00fcpernova ile \u00e7\u00f6k\u00fc\u015f\u00fc ve biyolojik t\u00fcrlerin nesiller boyu devredilip bireylerin \u00f6lmesi mahlukat\u0131n fanili\u011fini hayk\u0131r\u0131r. Mevcudat s\u00fcrekli de\u011fi\u015fen dalgalar gibidir; deniz ise B\u00e2k\u00ee olan Yarat\u0131c\u0131'n\u0131n daim\u00ee tasarrufudur.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** Fanilik \u015fuuru, insan\u0131 d\u00fcnyev\u00ee putlardan ve ge\u00e7ici lezzetlerin esaretinden kurtar\u0131r. 'Baki bir hakikat, fani \u015feylere feda edilmez' bilinciyle amel eder; \u00f6mr\u00fcn\u00fc B\u00e2k\u00ee olan\u0131n r\u0131zas\u0131 do\u011frultusunda ebedile\u015ftirir.",
  },
  {
    weekNumber: 29,
    name: "EL-HAYY",
    arabic: "\u0627\u064e\u0644\u0652\u062d\u064e\u064a\u064f\u0651",
    meaning: "Ezeli ve ebed\u00ee hayat sahibi.",
    title: "EL-HAYY \u2014 Ezeli ve ebed\u00ee hayat sahibi.",
    body: "Hayy ismi; b\u00fct\u00fcn s\u0131f\u00e2t-\u0131 kemaliyenin esas\u0131 ve menba\u0131d\u0131r. Hayat, varl\u0131\u011f\u0131n en y\u00fcksek zirvesi ve k\u00e2inat\u0131n en k\u0131ymetli neticesidir. Ger\u00e7ek hayat, z\u00e2t\u00ee ve kesintisiz olan il\u00e2h\u00ee hayatt\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Cans\u0131z elementlerin (karbon, hidrojen, oksijen, azot) bir araya gelerek h\u00fccresel d\u00fczeyde metabolizma, \u00fcreme, homeostaz ve bilin\u00e7 gibi muazzam bir hayat mucizesine d\u00f6n\u00fc\u015fmesi (abiyogenez tart\u0131\u015fmalar\u0131n\u0131 a\u015fan il\u00e2h\u00ee teshir) Hayy isminin en parlak tecellisidir. Hayat, k\u00f6r maddeden tesad\u00fcfen \u00e7\u0131kamayacak kadar y\u00fcksek bir nurdur.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** M\u00fcmin, beden\u00ee hayat\u0131n yan\u0131nda kalb\u00ee ve ruh\u00ee hayat\u0131n da diri tutulmas\u0131 gerekti\u011fini bilir. \u0130man, marifetullah ve zikir kalbin hayat\u0131d\u0131r; bu sayede insan ebed\u00ee bir hayata namzet olur.",
  },
  {
    weekNumber: 30,
    name: "EL-KAYY\u00dbM",
    arabic: "\u0627\u064e\u0644\u0652\u0642\u064e\u064a\u064f\u0651\u0648\u0645\u064f",
    meaning: "Varl\u0131\u011f\u0131 kendinden, her \u015feyi ayakta tutan.",
    title: "EL-KAYY\u00dbM \u2014 Varl\u0131\u011f\u0131 kendinden, her \u015feyi ayakta tutan.",
    body: "Kayy\u00fbm ismi; varl\u0131\u011f\u0131n k\u0131vam\u0131n\u0131, s\u00fcreklili\u011fini ve kozmik dengenin her an yenilenen nizam\u0131n\u0131 (kayy\u00fbmiyet) ifade eder. Varl\u0131k, ba\u011f\u0131ms\u0131z bir t\u00f6z de\u011fil; her an il\u00e2h\u00ee irade ile ayakta tutulan bir tecelliler manzumesidir.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** D\u00f6rt temel fiziksel kuvvetin (k\u00fctle\u00e7ekim, elektromanyetizma, g\u00fc\u00e7l\u00fc ve zay\u0131f n\u00fckleer kuvvetler) k\u00e2inat \u00e7ap\u0131ndaki hassas dengesi ve kuantum seviyesindeki kararl\u0131l\u0131k Kayy\u00fbm isminin fiziki tezah\u00fcr\u00fcd\u00fcr. Madde kendi kendine ayakta duramaz; her an il\u00e2h\u00ee kudretle varl\u0131kta tutulur.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** Kayy\u00fbm ismini idrak eden fert; sebeplere mutlak g\u00fc\u00e7 vehmetmekten vazge\u00e7er. Hayat\u0131ndaki dengelerin, s\u0131hhatinin ve imk\u00e2nlar\u0131n\u0131n her an Allah\u2019\u0131n tutmas\u0131yla ayakta durdu\u011funu bilir; derin bir tevazu ve teslimiyet ku\u015fan\u0131r.",
  },
  {
    weekNumber: 31,
    name: "EL-AL\u00ceM",
    arabic: "\u0627\u064e\u0644\u0652\u0639\u064e\u0644\u0650\u064a\u0645\u064f",
    meaning: "\u0130lmi her \u015feyi ku\u015fatan.",
    title: "EL-AL\u00ceM \u2014 \u0130lmi her \u015feyi ku\u015fatan.",
    body: "Al\u00eem ismi; zaman ve mek\u00e2n kay\u0131tlar\u0131n\u0131 a\u015fan, ezelden ebede her zerre ve hadiseyi bizzat ve k\u00fcll\u00ee olarak ku\u015fatan mutlak ilmi ifade eder. Bilinmeyen (gayb) ve bilinen (\u015fehadet) O'nun nezdinde birdir.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** K\u00e2inattaki bilgi kuram\u0131 (information theory): Bir tohumun genetik kodundaki muazzam algoritmik bilgi, atomlar\u0131n periyodik tablodaki matematiksel d\u00fczeni ve fizik kanunlar\u0131n\u0131n rasyonel form\u00fclleri evrenin sonsuz bir ilimle programland\u0131\u011f\u0131n\u0131 kan\u0131tlar. K\u00f6r tesad\u00fcf bilgi \u00fcretemez.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** \u0130lim sahibi olmak insan\u0131 gurura de\u011fil, Al\u00eem olan\u0131n kar\u015f\u0131s\u0131nda acziyetini idrake g\u00f6t\u00fcrmelidir. 'Bize \u00f6\u011fretti\u011finden ba\u015fka bizim hi\u00e7bir bilgimiz yoktur' \u015fuuru, hakiki ilmin ve hikmetin kap\u0131s\u0131d\u0131r.",
  },
  {
    weekNumber: 32,
    name: "EL-HAB\u00ceR",
    arabic: "\u0627\u064e\u0644\u0652\u062e\u064e\u0628\u0650\u064a\u0631\u064f",
    meaning: "Her \u015feyin i\u00e7 y\u00fcz\u00fcnden haberdar olan.",
    title: "EL-HAB\u00ceR \u2014 Her \u015feyin i\u00e7 y\u00fcz\u00fcnden haberdar olan.",
    body: "Hab\u00eer ismi; ilmin e\u015fyan\u0131n k\u00fcnh\u00fcne, b\u00e2t\u0131n\u0131na, gizli niyetlere ve en mikro titre\u015fimlerine kadar n\u00fcfuz eden derinlik boyutudur. Hi\u00e7bir maske ve perde O'nun vukufiyetini engelleyemez.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** H\u00fccre \u00e7ekirde\u011findeki epigenetik mekanizmalar, \u00e7evresel etkilere g\u00f6re genlerin a\u00e7\u0131l\u0131p kapanmas\u0131 ve n\u00f6ronlar aras\u0131ndaki sinaptik kimyasal sinyalle\u015fmeler Hab\u00eer isminin biyolojideki hassas haberdarl\u0131k sahneleridir. K\u00e2inatta hi\u00e7bir \u015fey ba\u015f\u0131bo\u015f ve habersiz cereyan etmez.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** Hab\u00eer olan Allah\u2019\u0131n huzurunda ya\u015famak; insan\u0131 riyadan (g\u00f6steri\u015f) ve yapmac\u0131kl\u0131ktan ar\u0131nd\u0131r\u0131r. \u0130\u00e7i ba\u015fka, d\u0131\u015f\u0131 ba\u015fka olan m\u00fcnaf\u0131k\u00e7a tav\u0131rlardan kurtar\u0131r; kalb\u00ee bir d\u00fcr\u00fcstl\u00fck (ihlas ve s\u0131dk) kazand\u0131r\u0131r.",
  },
  {
    weekNumber: 33,
    name: "ES-SEM\u00ce",
    arabic: "\u0627\u0644\u0633\u064e\u0651\u0645\u0650\u064a\u0639\u064f",
    meaning: "B\u00fct\u00fcn sesleri ve yakar\u0131\u015flar\u0131 i\u015fiten.",
    title: "ES-SEM\u00ce \u2014 B\u00fct\u00fcn sesleri ve yakar\u0131\u015flar\u0131 i\u015fiten.",
    body: "Sem\u00ee ismi; mahlukat\u0131n sesli ve sessiz b\u00fct\u00fcn frekanslardaki hitap ve yakar\u0131\u015flar\u0131n\u0131, lisan-\u0131 kal (s\u00f6z) ve lisan-\u0131 hal (ihtiya\u00e7 dili) ile yapt\u0131\u011f\u0131 b\u00fct\u00fcn talepleri i\u015fiten mutlak semi' s\u0131fat\u0131n\u0131 ifade eder.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Biyolojik \u00e2lemde ses dalgalar\u0131n\u0131n iletimi ve kulaktaki salyangoz (koklea) mekanizmas\u0131n\u0131n havadaki titre\u015fimleri elektriksel sinyallere \u00e7evirmesi Sem\u00ee isminin m\u00fckemmel bir aletidir. Ancak il\u00e2h\u00ee i\u015fitme ses dalgalar\u0131na muhta\u00e7 de\u011fildir; atomlar\u0131n titre\u015fiminden kalbin sessiz s\u0131z\u0131s\u0131na kadar her \u015feyi do\u011frudan ihata eder.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** M\u00fcmin, yaln\u0131zl\u0131k anlar\u0131nda bile hi\u00e7bir zaman 'sahipsiz ve duyulmayan' olmad\u0131\u011f\u0131n\u0131 bilir. Sessizce d\u00f6kt\u00fc\u011f\u00fc g\u00f6zya\u015f\u0131n\u0131n ve kalbinden ge\u00e7irdi\u011fi samimi niyaz\u0131n Sem\u00ee-i Mutlak taraf\u0131ndan i\u015fitildi\u011fini bilmek, insana sonsuz bir emniyet ve dua \u015fevki verir.",
  },
  {
    weekNumber: 34,
    name: "EL-BAS\u00ceR",
    arabic: "\u0627\u064e\u0644\u0652\u0628\u064e\u0635\u0650\u064a\u0631\u064f",
    meaning: "B\u00fct\u00fcn varl\u0131\u011f\u0131 ve gizlilikleri g\u00f6ren.",
    title:
      "EL-BAS\u00ceR \u2014 B\u00fct\u00fcn varl\u0131\u011f\u0131 ve gizlilikleri g\u00f6ren.",
    body: "Bas\u00eer ismi; varl\u0131\u011f\u0131n madd\u00ee ve manev\u00ee b\u00fct\u00fcn boyutlar\u0131n\u0131, mikroskobik derinliklerinden makro kozmik ufuklar\u0131na kadar eksiksiz m\u00fc\u015fahede eden il\u00e2h\u00ee basar s\u0131fat\u0131n\u0131 remzeder.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Elektromanyetik spektrumun g\u00f6r\u00fcn\u00fcr \u0131\u015f\u0131ktan gama \u0131\u015f\u0131nlar\u0131na, radyo dalgalar\u0131ndan X \u0131\u015f\u0131nlar\u0131na kadar uzanan devasa dalga boylar\u0131 evrenin her k\u00f6\u015fesini ayd\u0131nlat\u0131r. \u0130nsan g\u00f6z\u00fc bu spektrumun yaln\u0131zca binde birlik k\u00fc\u00e7\u00fck bir aral\u0131\u011f\u0131n\u0131 g\u00f6r\u00fcrken, Bas\u00eer olan Allah t\u00fcm dalga boylar\u0131n\u0131, karanl\u0131k maddeyi ve karanl\u0131k enerjiyi b\u00fct\u00fcn \u00e7\u0131plakl\u0131\u011f\u0131yla her an g\u00f6r\u00fcr.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** Bas\u00eer isminin idraki; insanda 'murakabe' bilincini uyand\u0131r\u0131r. \u0130nsan, hayat kameras\u0131n\u0131n her an kay\u0131tta oldu\u011funu ve her fiilinin g\u00f6r\u00fcld\u00fc\u011f\u00fcn\u00fc bilir; hayat\u0131n\u0131 iffet, do\u011fruluk ve d\u00fcr\u00fcstl\u00fck \u00e7izgisine oturtur.",
  },
  {
    weekNumber: 35,
    name: "EL-MUC\u00ceB",
    arabic: "\u0627\u064e\u0644\u0652\u0645\u064f\u062c\u0650\u064a\u0628\u064f",
    meaning: "Duaya kar\u015f\u0131l\u0131k veren.",
    title: "EL-MUC\u00ceB \u2014 Duaya kar\u015f\u0131l\u0131k veren.",
    body: "Muc\u00eeb ismi; mahlukat\u0131n lisan-\u0131 istidat (kabiliyet dili), lisan-\u0131 f\u0131tr\u00ee ihtiya\u00e7 (a\u00e7l\u0131k, susuzluk) ve lisan-\u0131 \u0131zd\u0131rar (\u00e7aresizlik dili) ile yapt\u0131\u011f\u0131 b\u00fct\u00fcn dualara hikmet ve rahmetle icabet eden il\u00e2h\u00ee l\u00fctfu ifade eder.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Tohumun topra\u011f\u0131n alt\u0131nda \u00e7atlay\u0131p 'g\u00fcne\u015fe ve hayata \u00e7\u0131kmak istiyorum' duas\u0131na yer\u00e7ekimini yenen geotropizma ve fototropizma mekanizmalar\u0131yla cevap verilmesi, ar\u0131n\u0131n bal yapma kabiliyetine \u00e7i\u00e7eklerin nektarla kar\u015f\u0131l\u0131k vermesi Muc\u00eeb isminin ekolojik cevaplar\u0131d\u0131r. \u0130stekler kar\u015f\u0131l\u0131ks\u0131z kalmaz.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** Dua, m\u00fcminin en b\u00fcy\u00fck manev\u00ee g\u00fcc\u00fcd\u00fcr. Muc\u00eeb olan Allah'a y\u00f6nelen insan; dualar\u0131n cevaps\u0131z kalmayaca\u011f\u0131n\u0131, ancak cevab\u0131n kulun hevesine g\u00f6re de\u011fil, il\u00e2h\u00ee hikmete g\u00f6re en hay\u0131rl\u0131 surette verilece\u011fini bilir; \u00fcmit ve tevekk\u00fclle dua eder.",
  },
  {
    weekNumber: 36,
    name: "EL-M\u00dcSTE\u00c2N",
    arabic:
      "\u0627\u064e\u0644\u0652\u0645\u064f\u0633\u0652\u062a\u064e\u0639\u064e\u0627\u0646\u064f",
    meaning: "Kendinden yard\u0131m istenen.",
    title: "EL-M\u00dcSTE\u00c2N \u2014 Kendinden yard\u0131m istenen.",
    body: "M\u00fcste\u00e2n ismi; k\u00e2inattaki b\u00fct\u00fcn sebeplerin nihayetinde birer perde oldu\u011funu, hakiki tesir ve nusretin (inayet) yaln\u0131zca Z\u00e2t-\u0131 B\u00e2ri'den gelebilece\u011fini ifade eder.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Zorlu tabiat \u015fartlar\u0131nda canl\u0131lar\u0131n hayatta kalabilmesi i\u00e7in bah\u015fedilen ola\u011fan\u00fcst\u00fc adaptasyon mekanizmalar\u0131 (\u00e7\u00f6lde su tasarrufu, kutuplarda donma \u00f6nleyici proteinler) sebepleri a\u015fan il\u00e2h\u00ee bir yard\u0131m ve donat\u0131md\u0131r. Mahlukat kendi ba\u015f\u0131na kalsa hi\u00e7bir zorlu\u011fu a\u015famazd\u0131.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** M\u00fcmin; 'L\u00e2 havle ve l\u00e2 kuvvete ill\u00e2 bill\u00e2h' (G\u00fc\u00e7 ve kuvvet ancak Allah'tand\u0131r) \u015fuuruyla ya\u015far. \u0130nsanlardan medet umup hayal k\u0131r\u0131kl\u0131\u011f\u0131na u\u011framak yerine, ger\u00e7ek yard\u0131m kap\u0131s\u0131na y\u00f6nelir; izzet ve metanet sahibi olur.",
  },
  {
    weekNumber: 37,
    name: "EL-H\u00c2D\u00ce",
    arabic: "\u0627\u064e\u0644\u0652\u0647\u064e\u0627\u062f\u0650\u064a",
    meaning: "Hidayet eden, do\u011fru yolu g\u00f6steren.",
    title: "EL-H\u00c2D\u00ce \u2014 Hidayet eden, do\u011fru yolu g\u00f6steren.",
    body: "H\u00e2d\u00ee ismi; varl\u0131\u011f\u0131n yarat\u0131l\u0131\u015f gayesine do\u011fru sevk edilmesini, f\u0131tr\u00ee ilhamlar\u0131 (sevk-i il\u00e2h\u00ee) ve insan i\u00e7in ak\u0131l, peygamberler ve vahiy vas\u0131tas\u0131yla ebed\u00ee kurtulu\u015f yolunun g\u00f6sterilmesini ifade eder.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** G\u00f6\u00e7men somon bal\u0131klar\u0131n\u0131n okyanuslar\u0131 a\u015f\u0131p do\u011fduklar\u0131 nehir yata\u011f\u0131n\u0131 koku haf\u0131zas\u0131yla bulmas\u0131, ar\u0131lar\u0131n g\u00fcne\u015fin a\u00e7\u0131s\u0131na g\u00f6re dans ederek kovandaki di\u011fer ar\u0131lara \u00e7i\u00e7eklerin koordinatlar\u0131n\u0131 bildirmesi H\u00e2d\u00ee isminin tabiat f\u0131trat\u0131ndaki k\u0131lavuzlu\u011fudur.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** En b\u00fcy\u00fck nimet ve zenginlik, do\u011fru yolda (hidayet \u00fczere) olmakt\u0131r. \u0130nsan akl\u0131 tek ba\u015f\u0131na hakikati b\u00fct\u00fcn\u00fcyle ku\u015fatamaz; vahyin rehberli\u011fine muhta\u00e7t\u0131r. H\u00e2d\u00ee ismine s\u0131\u011f\u0131nan fert, sapk\u0131nl\u0131klardan ve \u015f\u00fcphe girdaplar\u0131ndan muhafaza olur.",
  },
  {
    weekNumber: 38,
    name: "EL-FETT\u00c2H",
    arabic: "\u0627\u064e\u0644\u0652\u0641\u064e\u062a\u064e\u0651\u0627\u062d\u064f",
    meaning:
      "A\u00e7an, \u00e7\u00f6z\u00fcm ve \u00e7\u0131k\u0131\u015f yollar\u0131 ihsan eden.",
    title:
      "EL-FETT\u00c2H \u2014 A\u00e7an, \u00e7\u00f6z\u00fcm ve \u00e7\u0131k\u0131\u015f yollar\u0131 ihsan eden.",
    body: "Fett\u00e2h ismi; kapal\u0131 olan her t\u00fcrl\u00fc madd\u00ee ve m\u00e2nev\u00ee t\u0131kan\u0131kl\u0131\u011f\u0131 a\u00e7an, fetihler m\u00fcyesser k\u0131lan, hak ile b\u00e2t\u0131l aras\u0131n\u0131 adaletle ay\u0131ran mutlak fetih sahibini temsil eder.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** H\u00fccre b\u00f6l\u00fcnmesinde kromozomlar\u0131n ayr\u0131lmas\u0131, bir \u00e7i\u00e7e\u011fin ta\u00e7 yapraklar\u0131n\u0131n fotosentez i\u00e7in \u0131\u015f\u0131\u011fa a\u00e7\u0131lmas\u0131 ve embriyonun anne rahmindeki geli\u015fim evrelerinde organ kap\u0131lar\u0131n\u0131n tek tek a\u00e7\u0131lmas\u0131 Fett\u00e2h isminin biyolojik a\u00e7\u0131l\u0131mlar\u0131d\u0131r.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** M\u00fcmin, hi\u00e7bir musibet veya imtihan kar\u015f\u0131s\u0131nda y\u0131lg\u0131nl\u0131\u011fa d\u00fc\u015fmez. 'Kap\u0131lar\u0131 a\u00e7an Fett\u00e2h vard\u0131r' inanc\u0131, en karanl\u0131k dehlizlerde bile kalpte \u00fcmit kandilini yakar; gayret ve sebat azmini kam\u00e7\u0131lar.",
  },
  {
    weekNumber: 39,
    name: "EL-K\u00c2F\u00ce",
    arabic: "\u0627\u064e\u0644\u0652\u0643\u064e\u0627\u0641\u0650\u064a",
    meaning: "B\u00fct\u00fcn ihtiya\u00e7lara k\u00e2fi gelen.",
    title: "EL-K\u00c2F\u00ce \u2014 B\u00fct\u00fcn ihtiya\u00e7lara k\u00e2fi gelen.",
    body: "K\u00e2f\u00ee ismi; Z\u00e2t-\u0131 Akdes'in her t\u00fcrl\u00fc ihtiya\u00e7ta tek ba\u015f\u0131na yeterli oldu\u011funu, O varsa hi\u00e7bir \u015feyin eksik olmad\u0131\u011f\u0131n\u0131, O yoksa hi\u00e7bir \u015feyin kifayet etmeyece\u011fini ifade eder.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** D\u00fcnya biyosferinin kendi kendini besleyen ve temizleyen kapal\u0131 bir ekolojik d\u00f6ng\u00fcye sahip olmas\u0131, ya\u015fam i\u00e7in gereken her elementin yer kabu\u011funda yeterli miktarda bulunmas\u0131 il\u00e2h\u00ee kifayetin tabiat kan\u0131t\u0131d\u0131r.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** \u0130nsan ruhu, fani hi\u00e7bir \u015feyle tam doyuma ula\u015famaz. 'Hasb\u00fcnall\u00e2h ve ni'mel vek\u00eel' (Allah bize yeter, O ne g\u00fczel vekildir) hakikati, kalbe sonsuz bir zenginlik ve doyum ba\u011f\u0131\u015flar; d\u00fcnyev\u00ee endi\u015fe ve tela\u015flar\u0131 teskin eder.",
  },
  {
    weekNumber: 40,
    name: "EL-EM\u00c2N",
    arabic: "\u0627\u064e\u0644\u0652\u0623\u064e\u0645\u064e\u0627\u0646\u064f",
    meaning: "Emniyet ve g\u00fcven veren.",
    title: "EL-EM\u00c2N \u2014 Emniyet ve g\u00fcven veren.",
    body: "Em\u00e2n ismi; korku, panik ve kozmik tehditler kar\u015f\u0131s\u0131nda s\u0131\u011f\u0131n\u0131lacak yeg\u00e2ne emniyet ve selamet kalesidir. B\u00fct\u00fcn varolu\u015f, O'nun teminat\u0131 alt\u0131ndad\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** D\u00fcnya'n\u0131n manyetik alan\u0131n\u0131n (Van Allen radyasyon ku\u015faklar\u0131) g\u00fcne\u015f patlamalar\u0131ndan sa\u00e7\u0131lan \u00f6l\u00fcmc\u00fcl radyasyonu sapt\u0131rmas\u0131 ve atmosferin s\u00fcrt\u00fcnme kuvvetiyle g\u00f6kta\u015flar\u0131n\u0131 yak\u0131p buharla\u015ft\u0131rmas\u0131 Em\u00e2n isminin kozmik kalkanlar\u0131d\u0131r. Korkutucu uzay bo\u015flu\u011funda yery\u00fcz\u00fc s\u00fck\u00fbnetle d\u00f6ner.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** M\u00fcmin; ger\u00e7ek g\u00fcvenli\u011fin ordularda, paralarda veya s\u0131\u011f\u0131naklarda de\u011fil, Allah\u2019\u0131n himayesinde oldu\u011funu kavrar. Bu \u015fuur kalbe emniyet ve sekine indirir; ki\u015fiyi korkakl\u0131ktan kurtararak cesur ve g\u00fcvenilir k\u0131lar.",
  },
  {
    weekNumber: 41,
    name: "E\u015e-\u015e\u00c2F\u00ce",
    arabic: "\u0627\u0644\u0634\u064e\u0651\u0627\u0641\u0650\u064a",
    meaning: "\u015eifan\u0131n ger\u00e7ek sahibi.",
    title: "E\u015e-\u015e\u00c2F\u00ce \u2014 \u015eifan\u0131n ger\u00e7ek sahibi.",
    body: "\u015e\u00e2f\u00ee ismi; hem biyolojik organizmadaki hastal\u0131klar\u0131 bertaraf eden, hem de kalb\u00ee ve ruh\u00ee marazlar\u0131 (\u015f\u00fcphe, haset, kin, gaflet) tedavi eden mutlak \u015fifa kayna\u011f\u0131n\u0131 ifade eder.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** \u0130mm\u00fcnoloji biliminin ortaya koydu\u011fu antikor mekanizmalar\u0131: V\u00fccuda giren bir patojene kar\u015f\u0131 lenfositlerin \u00f6zel kilit-anahtar uyumuyla antikor \u00fcretmesi, h\u00fccrelerin ba\u011f\u0131\u015f\u0131kl\u0131k haf\u0131zas\u0131 (haf\u0131za h\u00fccreleri) kurarak ayn\u0131 mikrobu bir daha sokmamas\u0131 \u015e\u00e2f\u00ee isminin mikrobiyolojik \u015faheseridir.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** M\u00fcmin; sebepleri ihmal etmeden hekime ve ilaca ba\u015fvurur; ancak kalben bilir ki \u015fifa maddeden de\u011fil, \u015e\u00e2f\u00ee-i Hakik\u00ee'nin '\u015eifa bul' iradesinden kaynaklan\u0131r. Ayn\u0131 zamanda Kur'an ve zikrin kalplere \u015fifa oldu\u011funu idrak eder.",
  },
  {
    weekNumber: 42,
    name: "EL-MU\u00c2F\u00ce",
    arabic: "\u0627\u064e\u0644\u0652\u0645\u064f\u0639\u064e\u0627\u0641\u0650\u064a",
    meaning: "Afiyet ihsan eden.",
    title: "EL-MU\u00c2F\u00ce \u2014 Afiyet ihsan eden.",
    body: "Mu\u00e2f\u00ee ismi; sa\u011fl\u0131\u011f\u0131n ve esenli\u011fin yaln\u0131zca ar\u0131zi hastal\u0131klardan kurtulmak de\u011fil, b\u00fct\u00fcnc\u00fcl bir selamet, huzur ve denge (well-being) hali olarak devam etmesini ifade eder.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Ekolojik dengenin f\u0131rt\u0131nalar, volkanik patlamalar veya kurakl\u0131klar gibi b\u00fcy\u00fck sars\u0131nt\u0131lardan sonra kendini h\u0131zla toparlay\u0131p homeostaza kavu\u015fmas\u0131 (ekolojik dayan\u0131kl\u0131l\u0131k - resilience) Mu\u00e2f\u00ee isminin k\u00e2inattaki esenlik m\u00fchr\u00fcd\u00fcr.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** Afiyet; d\u00fcnyev\u00ee nimetlerin en b\u00fcy\u00fc\u011f\u00fcd\u00fcr. Mu\u00e2f\u00ee olan Allah'a s\u0131\u011f\u0131nan m\u00fcmin; hem beden\u00ee s\u0131hhati hem de kalb\u00ee istikameti diler; afiyet anlar\u0131n\u0131 rehavetle de\u011fil, \u015f\u00fck\u00fcr ve hay\u0131r yolunda de\u011ferlendirir.",
  },
  {
    weekNumber: 43,
    name: "EL-GAFF\u00c2R",
    arabic: "\u0627\u064e\u0644\u0652\u063a\u064e\u0641\u064e\u0651\u0627\u0631\u064f",
    meaning: "Tekrar tekrar ba\u011f\u0131\u015flayan.",
    title: "EL-GAFF\u00c2R \u2014 Tekrar tekrar ba\u011f\u0131\u015flayan.",
    body: "Gaff\u00e2r ismi; ma\u011ffiretin kemal derecesini, kul ne kadar \u00e7ok g\u00fcnah i\u015flerse i\u015flesin samimi bir t\u00f6vbeyle d\u00f6nd\u00fc\u011f\u00fcnde onu tekrar tekrar ve b\u00fct\u00fcn\u00fcyle affetme b\u00fcy\u00fckl\u00fc\u011f\u00fcn\u00fc temsil eder.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Atmosferin ve denizlerin kendi kendini filtreleyen ar\u0131tma mekanizmalar\u0131, topra\u011f\u0131n \u00e7\u00fcr\u00fcyen organik at\u0131klar\u0131 mikroorganizmalarla par\u00e7alay\u0131p temiz minerallere d\u00f6n\u00fc\u015ft\u00fcrmesi k\u00e2inattaki madd\u00ee ma\u011ffiret ve temizlenme ayetleridir. Tabiat kirlili\u011fi bar\u0131nd\u0131rmaz, temizler.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** Gaff\u00e2r ismine inanan insan; g\u00fcnah\u0131n getirdi\u011fi psikolojik eziklik ve yeis girdab\u0131ndan kurtulur. T\u00f6vbe ile yenilenir, ruhunu ar\u0131nd\u0131r\u0131r. Ba\u015fkalar\u0131n\u0131n kusurlar\u0131n\u0131 affetmeyen birinin il\u00e2h\u00ee aff\u0131 beklemeye hakk\u0131 olmad\u0131\u011f\u0131n\u0131 bilerek ba\u011f\u0131\u015flay\u0131c\u0131 olur.",
  },
  {
    weekNumber: 44,
    name: "ES-SETT\u00c2R",
    arabic: "\u0627\u0644\u0633\u064e\u0651\u062a\u064e\u0651\u0627\u0631\u064f",
    meaning: "Ay\u0131plar\u0131 ve eksiklikleri \u00f6rten.",
    title: "ES-SETT\u00c2R \u2014 Ay\u0131plar\u0131 ve eksiklikleri \u00f6rten.",
    body: "Sett\u00e2r ismi; hilmin ve hay\u00e2n\u0131n il\u00e2h\u00ee kayna\u011f\u0131d\u0131r. Kulun manev\u00ee \u00e7irkinliklerini ve g\u00fcnahlar\u0131n\u0131 ba\u015fkalar\u0131n\u0131n g\u00f6z\u00fcnden saklayan, onun haysiyet ve \u015ferefini muhafaza eden il\u00e2h\u00ee sett\u00e2riyettir.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Yery\u00fcz\u00fcn\u00fcn \u00e7\u0131plak ta\u015f ve kaya tabakalar\u0131n\u0131n ye\u015fil bitki \u00f6rt\u00fcs\u00fc ve reng\u00e2renk toprakla \u00f6rt\u00fclmesi, gece karanl\u0131\u011f\u0131n\u0131n bir \u00f6rt\u00fc gibi \u00e7ekilerek yorgunluklar\u0131 gizlemesi k\u00e2inattaki Sett\u00e2r tecellileridir. \u00c7irkinlikler \u00f6rt\u00fcl\u00fcr, g\u00fczellikler sergilenir.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** \u0130nsan, e\u011fer kalbinden ge\u00e7en b\u00fct\u00fcn d\u00fc\u015f\u00fcnceler aln\u0131na yaz\u0131lsayd\u0131 toplum i\u00e7ine \u00e7\u0131kamayaca\u011f\u0131n\u0131 hat\u0131rlar. Sett\u00e2r olan Rabbine derin bir minnet duyar; ba\u015fkalar\u0131n\u0131n kusurlar\u0131n\u0131 tecess\u00fcs etmekten sak\u0131n\u0131r ve ay\u0131plar\u0131 \u00f6rt\u00fcc\u00fc bir ahlak ku\u015fan\u0131r.",
  },
  {
    weekNumber: 45,
    name: "EL-ADL",
    arabic: "\u0627\u064e\u0644\u0652\u0639\u064e\u062f\u0652\u0644\u064f",
    meaning: "Mutlak adalet sahibi.",
    title: "EL-ADL \u2014 Mutlak adalet sahibi.",
    body: "Adl ismi; kozmik ve ahlak\u00ee mizan\u0131 kuran, her varl\u0131\u011fa f\u0131trat\u0131na uygun hak ve kabiliyetleri veren, zerre kadar zul\u00fcmden m\u00fcnezzeh mutlak adaleti ifade eder.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Astrofizikteki k\u00fctle\u00e7ekim ile geni\u015fleme kuvveti aras\u0131ndaki denge, kimyadaki k\u00fctlenin ve enerjinin korunumu kanunu ve genetik koddaki hassas oranlar Adl isminin kozmik adalet terazisidir. K\u00e2inatta hi\u00e7bir \u015fey israf edilmez ve hi\u00e7bir kuvvet \u00f6l\u00e7\u00fcs\u00fcz b\u0131rak\u0131lmaz.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** M\u00fcmin; d\u00fcnyadaki g\u00f6r\u00fcn\u00fcr adaletsizliklerin ahiretteki 'B\u00fcy\u00fck Mahkeme'de (Mahkeme-i K\u00fcbr\u00e2) zerre miskal atlanmadan adaletle \u00e7\u00f6z\u00fclece\u011fine inan\u0131r. Bu inan\u00e7, zulme kar\u015f\u0131 diren\u00e7 azmi verir ve ki\u015fiyi her \u015fartta adil olmaya y\u00f6nlendirir.",
  },
  {
    weekNumber: 46,
    name: "ED-DEYY\u00c2N",
    arabic: "\u0627\u0644\u062f\u064e\u0651\u064a\u064e\u0651AN\u064f",
    meaning: "Hesap g\u00f6ren ve kar\u015f\u0131l\u0131k veren.",
    title: "ED-DEYY\u00c2N \u2014 Hesap g\u00f6ren ve kar\u015f\u0131l\u0131k veren.",
    body: "Deyy\u00e2n ismi; ahl\u00e2k\u00ee kozmolojinin teminat\u0131d\u0131r. Varl\u0131kta hi\u00e7bir amel, niyet ve eylem kar\u015f\u0131l\u0131ks\u0131z kalmaz; hesap g\u00fcn\u00fc herkes amelinin neticesiyle y\u00fczle\u015fir.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Termodinamikteki enerjinin korunumu ve nedensellik (causality) ilkesi: Evrende hi\u00e7bir eylem yok olmaz, her etki bir tepki do\u011furur. Fiziksel d\u00fcnyadaki bu yasa, ahlak\u00ee d\u00fcnyada Deyy\u00e2n isminin kar\u015f\u0131l\u0131k verme ve hesap sorma hakikatinin bir aynas\u0131d\u0131r.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** \u0130nsan ba\u015f\u0131bo\u015f b\u0131rak\u0131lmam\u0131\u015ft\u0131r. Deyy\u00e2n olan Allah\u2019\u0131n huzurunda hesaba \u00e7ekilece\u011fini bilen m\u00fctefekkir fert; hayat\u0131n\u0131 derin bir sorumlulukla tanzim eder. \u0130yilikleri kar\u015f\u0131l\u0131ks\u0131z kalmayaca\u011f\u0131 gibi, zul\u00fcmlerin de yan\u0131na k\u00e2r kalmayaca\u011f\u0131n\u0131 bilerek metanet bulur.",
  },
  {
    weekNumber: 47,
    name: "ES-S\u00c2DIKU\u2019L-VA\u2018D",
    arabic:
      "\u0635\u064e\u0627\u062f\u0650\u0642\u064f \u0627\u0644\u0652\u0648\u064e\u0639\u0652\u062f\u0650",
    meaning: "Vaadinde sad\u0131k olan.",
    title: "ES-S\u00c2DIKU\u2019L-VA\u2018D \u2014 Vaadinde sad\u0131k olan.",
    body: "S\u00e2d\u0131ku\u2019l-Va\u2018d ismi; il\u00e2h\u00ee kel\u00e2m\u0131n ve vaadin mutlak hakikatini ve g\u00fcvenilirli\u011fini ifade eder. Z\u00e2t-\u0131 Z\u00fclcel\u00e2l i\u00e7in vaadinden hulf (cayma) muhaldir.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** G\u00f6k mekani\u011findeki y\u00f6r\u00fcngesel periyotlar ve gezegen hareketleri \u00f6yle dakiktir ki g\u00f6kbilimciler y\u00fczlerce y\u0131l sonraki g\u00fcne\u015f tutulmas\u0131n\u0131n saniyesini bug\u00fcnden hesaplayabilirler. Kozmik vaatler asla \u015fa\u015fmaz.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** Allah\u2019\u0131n m\u00fcminlere zafer, sabredenlere ecir ve m\u00fcttakilere ebed\u00ee saadet vaadi hakt\u0131r. S\u00e2d\u0131ku\u2019l-Va\u2018d olan Rabbine g\u00fcvenen insan; d\u00fcnyev\u00ee f\u0131rt\u0131nalarda sars\u0131lmaz bir itminan ve yeissiz bir \u00fcmitle y\u00fcr\u00fcr.",
  },
  {
    weekNumber: 48,
    name: "EL-MAHM\u00dbD",
    arabic: "\u0627\u064e\u0644\u0652\u0645\u064e\u062d\u0652\u0645\u064f\u0648\u062f\u064f",
    meaning: "Hamd ve \u00f6vg\u00fcye lay\u0131k olan.",
    title: "EL-MAHM\u00dbD \u2014 Hamd ve \u00f6vg\u00fcye lay\u0131k olan.",
    body: "Mahm\u00fbd ismi; Z\u00e2t\u00ee kemalat\u0131, s\u0131n\u0131rs\u0131z nimetleri ve kusursuz icraatlar\u0131 sebebiyle k\u00e2inattaki b\u00fct\u00fcn varl\u0131klar\u0131n f\u0131traten hamd etti\u011fi mutlak \u00f6vg\u00fc sahibini ifade eder.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** \u0130sr\u00e2 Suresi 44. ayette buyruldu\u011fu gibi: 'Yedi g\u00f6k, yer ve bunlarda bulunanlar O'nu tesbih eder; O'nu hamd ile tesbih etmeyen hi\u00e7bir \u015fey yoktur.' Atomlar\u0131n d\u00f6n\u00fc\u015f\u00fcnden y\u0131ld\u0131zlar\u0131n \u0131\u015f\u0131mas\u0131na kadar her hareket bir lisan-\u0131 hal ile hamddir.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** Hamd; nimetin fark\u0131nda olmak ve minnettarl\u0131\u011f\u0131 itiraf etmektir. El-Mahm\u00fbd\u2019a hamd eden insan; nimetlerin arkas\u0131ndaki il\u00e2h\u00ee cem\u00e2l ve kem\u00e2li m\u00fc\u015fahede eder, nank\u00f6rl\u00fckten kurtulup marifet mertebesine y\u00fckselir.",
  },
  {
    weekNumber: 49,
    name: "EL-MEC\u00ceD",
    arabic: "\u0627\u064e\u0644\u0652\u0645\u064e\u062c\u0650\u064a\u062f\u064f",
    meaning: "\u015ean\u0131 y\u00fcce, ikram\u0131 geni\u015f olan.",
    title: "EL-MEC\u00ceD \u2014 \u015ean\u0131 y\u00fcce, ikram\u0131 geni\u015f olan.",
    body: "Mec\u00eed ismi; cel\u00e2l ve cem\u00e2l s\u0131fatlar\u0131n\u0131n m\u00fckemmel terkibidir: Hem sonsuz azamet, \u015fan ve \u015feref (mecidiyet), hem de s\u0131n\u0131rs\u0131z ihsan ve kerem sahibidir.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Galaksi k\u00fcmelerinin (Hubble derin uzay foto\u011fraflar\u0131nda g\u00f6r\u00fclen rengarenk galaksi adalar\u0131) olu\u015fturdu\u011fu kozmik ihti\u015fam Mec\u00eed isminin mimarisidir. Evren alelade bir baraka de\u011fil, \u015fan\u0131 y\u00fcce bir Melik'in muhte\u015fem saray\u0131d\u0131r.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** M\u00fcmin; b\u00f6ylesine y\u00fcce ve ker\u00eem bir Rabbe kul olman\u0131n asaletini hisseder. D\u00fcnyev\u00ee unvanlar\u0131n ve sahte makamlar\u0131n pe\u015finde k\u00fc\u00e7\u00fclmez; ger\u00e7ek \u015ferefin Allah kat\u0131ndaki takvada oldu\u011funu idrak eder.",
  },
  {
    weekNumber: 50,
    name: "EL-HANN\u00c2N",
    arabic: "\u0627\u064e\u0644\u0652\u062d\u064e\u0646\u064e\u0651AN\u064f",
    meaning: "Merhameti ve \u015fefkati \u00e7ok olan.",
    title: "EL-HANN\u00c2N \u2014 Merhameti ve \u015fefkati \u00e7ok olan.",
    body: "Hann\u00e2n ismi; il\u00e2h\u00ee rahmetin rikkat, incelik, \u00f6zlem ve kucaklay\u0131c\u0131 \u015fefkat buudunu ifade eder. Anne \u015fefkatinin k\u00e2inat \u00e7ap\u0131ndaki il\u00e2h\u00ee asl\u0131d\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Memeli hayvanlar\u0131n yavrular\u0131na g\u00f6sterdi\u011fi ak\u0131l almaz ihtimam, penguenlerin dondurucu kutup k\u0131\u015f\u0131nda yumurtalar\u0131n\u0131 ayaklar\u0131n\u0131n \u00fczerinde aylarca a\u00e7 kalarak korumas\u0131 Hann\u00e2n isminin f\u0131trattaki tezah\u00fcr\u00fcd\u00fcr. Tabiatta \u015fefkat kanunu h\u00fck\u00fcmrand\u0131r.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** \u0130nsan; g\u00fcnahk\u00e2r veya aciz de olsa Hann\u00e2n olan Rabbinden asla \u00fcmit kesmez. O'nun \u015fefkat sinesine s\u0131\u011f\u0131narak teselli bulur ve kendi hayat\u0131nda da insanlara kar\u015f\u0131 rikkatli, ba\u011f\u0131\u015flay\u0131c\u0131 ve merhametli bir g\u00f6n\u00fcl insan\u0131 olur.",
  },
  {
    weekNumber: 51,
    name: "EL-MA\u2018R\u00dbF",
    arabic: "\u0627\u064e\u0644\u0652\u0645\u064e\u0639\u0652\u0631\u064f\u0648\u0641\u064f",
    meaning: "\u0130yilik ve ihsan\u0131yla tan\u0131nan.",
    title: "EL-MA\u2018R\u00dbF \u2014 \u0130yilik ve ihsan\u0131yla tan\u0131nan.",
    body: "Ma\u2018r\u00fbf ismi; f\u0131trat\u0131n ink\u00e2r edemeyece\u011fi apa\u00e7\u0131k iyiliklerin, vicdan\u0131n tan\u0131d\u0131\u011f\u0131 ezeli hakikatlerin menba\u0131d\u0131r. Allah hem ak\u0131llarca bilinen (ma'r\u00fbf) hem de ihsan\u0131yla tan\u0131nand\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** K\u00e2inattaki genel faydal\u0131l\u0131k (teleoloji): Tabiatta abes, l\u00fczumsuz ve b\u00fct\u00fcn\u00fcyle zararl\u0131 hi\u00e7bir \u015fey yoktur. Zehirli bir y\u0131lan\u0131n zehrinden ila\u00e7 \u00fcretilmesi, yanarda\u011f lavlar\u0131n\u0131n topra\u011f\u0131 en verimli minerallerle beslemesi k\u00e2inatta mutlak bir 'hay\u0131r ve marufiyet' nizam\u0131n\u0131n i\u015fledi\u011fini g\u00f6sterir.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** M\u00fcmin; vicdan\u0131n\u0131n sesini dinleyerek marufu (iyiyi) m\u00fcnkerden (k\u00f6t\u00fcden) ay\u0131rt eder. Hayat\u0131n\u0131 iyili\u011fi yaymaya ve yery\u00fcz\u00fcnde marufun h\u00e2kim olmas\u0131na adar.",
  },
  {
    weekNumber: 52,
    name: "EL-B\u00dcRH\u00c2N",
    arabic: "\u0627\u064e\u0644\u0652\u0628\u064f\u0631\u0652\u0647\u064e\u0627\u0646\u064f",
    meaning: "Varl\u0131k ve birli\u011fine deliller g\u00f6steren.",
    title: "EL-B\u00dcRH\u00c2N \u2014 Varl\u0131k ve birli\u011fine deliller g\u00f6steren.",
    body: "B\u00fcrh\u00e2n ismi; \u015f\u00fcpheleri zail eden, akl\u0131 ikna eden, varl\u0131k ve birli\u011fini g\u00fcne\u015f gibi apa\u00e7\u0131k delillerle (burhan-\u0131 kat'\u00ee) ispatlayan il\u00e2h\u00ee h\u00fccceti remzeder.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Evrenin bir ba\u015flang\u0131c\u0131n\u0131n olmas\u0131 (Big Bang kozmolojisi), entropi kanununun i\u015faret etti\u011fi sonluluk ve k\u00e2inattaki 'antropik prensip' (evrenin parametrelerinin insan ya\u015fam\u0131na milimetrik ayarl\u0131 olmas\u0131) ink\u00e2r\u0131 imk\u00e2ns\u0131z akl\u00ee ve kozmik b\u00fcrhanlard\u0131r.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** Tahk\u00eek\u00ee iman; k\u00e2inat kitab\u0131n\u0131 il\u00e2h\u00ee bir b\u00fcrhan olarak okumakla kazan\u0131l\u0131r. M\u00fcmin, bilimsel ke\u015fifleri dinin z\u0131dd\u0131 de\u011fil, B\u00fcrh\u00e2n olan Allah\u2019\u0131n sanat delillerinin \u015ferhi olarak g\u00f6r\u00fcr ve marifetini derinle\u015ftirir.",
  },
  {
    weekNumber: 53,
    name: "EL-GAR\u00ceB",
    arabic: "\u0627\u064e\u0644\u0652\u063a\u064e\u0631\u0650\u064a\u0628\u064f",
    meaning:
      "Kuluna yak\u0131nl\u0131\u011f\u0131 ve l\u00fctfu al\u0131\u015f\u0131lm\u0131\u015f \u00f6l\u00e7\u00fcleri a\u015fan.",
    title:
      "EL-GAR\u00ceB \u2014 Kuluna yak\u0131nl\u0131\u011f\u0131 ve l\u00fctfu al\u0131\u015f\u0131lm\u0131\u015f \u00f6l\u00e7\u00fcleri a\u015fan.",
    body: "Gar\u00eeb ismi; Z\u00e2t-\u0131 \u0130l\u00e2hiyye'nin tenzih\u00ee azameti ile te\u015fbih\u00ee kurbiyetinin (yak\u0131nl\u0131\u011f\u0131n\u0131n) ak\u0131llar\u0131 hayrette b\u0131rakan tecellisidir: E\u015fi ve benzeri olmayan, mahlukata benzemeyen Z\u00e2t, ayn\u0131 zamanda kuluna \u015fah damar\u0131ndan daha yak\u0131nd\u0131r.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Makro kozmostaki u\u00e7suz bucaks\u0131z azamet ile mikro kozmostaki (kuantum seviyesindeki) hassas g\u00f6zetimin ayn\u0131 anda ve kusursuz icra edilmesi: Samanyolu'nu d\u00f6nd\u00fcren irade, ayn\u0131 anda bir vir\u00fcs\u00fcn RNA mutasyonunu da kontrol etmektedir. Bu a\u015fk\u0131n yak\u0131nl\u0131k ak\u0131llara hayret verir.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** M\u00fcmin; d\u00fcnyev\u00ee gurbetlerde ve yaln\u0131zl\u0131klarda bu isme s\u0131\u011f\u0131n\u0131r. 'Y\u00e2 Gar\u00eeb' niyaz\u0131yla, kimsenin anlamad\u0131\u011f\u0131 i\u00e7 \u00e7eki\u015flerini O'na a\u00e7ar; al\u0131\u015f\u0131lm\u0131\u015f sebeplerin t\u00fckendi\u011fi yerde O'nun hususi inayetini m\u00fc\u015fahede eder.",
  },
  {
    weekNumber: 54,
    name: "EL-AT\u00dbF",
    arabic: "\u0627\u064e\u0644\u0652\u0639\u064e\u0637\u064f\u0648\u0641\u064f",
    meaning: "\u015eefkat ve merhametle muamele eden.",
    title: "EL-AT\u00dbF \u2014 \u015eefkat ve merhametle muamele eden.",
    body: "At\u00fbf ismi; il\u00e2h\u00ee l\u00fctfun e\u011filimini, mahlukata do\u011fru y\u00f6nelen s\u0131cak ve kucaklay\u0131c\u0131 merhamet dalgas\u0131n\u0131 (at\u0131fet) temsil eder. Gazab\u0131n\u0131 rahmetiyle a\u015fan il\u00e2h\u00ee muameledir.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** Atmosferin yery\u00fcz\u00fcn\u00fc sar\u0131p sarmalayan sera etkisiyle canl\u0131lar\u0131n dondurucu uzay so\u011fu\u011funda donmas\u0131n\u0131 engellemesi, suyun \u00f6zg\u00fcl \u0131s\u0131s\u0131n\u0131n y\u00fcksekli\u011fi sayesinde denizlerin ani s\u0131cakl\u0131k de\u011fi\u015fimlerini yumu\u015fatmas\u0131 k\u00e2inattaki At\u00fbf tecellileridir. \u015eartlar daima hayat lehine yumu\u015fat\u0131l\u0131r.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** At\u00fbf olan Allah\u2019a y\u00f6nelen kul; O'nun rahmetinden asla \u00fcmit kesmez. Kendi davran\u0131\u015flar\u0131nda da sertlik ve kabal\u0131\u011f\u0131 terk ederek 'r\u0131fk' (nezaket ve yumu\u015fakl\u0131k) ahlak\u0131n\u0131 ku\u015fan\u0131r; \u00e7evresine \u015fefkat sa\u00e7ar.",
  },
  {
    weekNumber: 55,
    name: "ALLAH",
    arabic: "\u0627\u064e\u0644\u0644\u0651\u0670\u0647\u064f",
    meaning:
      "B\u00fct\u00fcn kemal isim ve s\u0131fatlar\u0131n\u0131 kendinde toplayan Rabbimizin \u00f6zel ismi.",
    title:
      "ALLAH \u2014 B\u00fct\u00fcn kemal isim ve s\u0131fatlar\u0131n\u0131 kendinde toplayan Rabbimizin \u00f6zel ismi.",
    body: "Lafza-i Cel\u00e2l (ALLAH); Z\u00e2t-\u0131 V\u00e2cib\u00fc'l-V\u00fcc\u00fbd'un \u0130sm-i C\u00e2mi'idir. B\u00fct\u00fcn esm\u00e2-i h\u00fcsn\u00e2 ve s\u0131f\u00e2t-\u0131 cel\u00e2liye ve cem\u00e2liye bu isimde m\u00fcndemi\u00e7tir; k\u00e2inat\u0131n nihai hakikati ve tevh\u00eed-i hakik\u00eenin zirvesidir.\n\n\ud83c\udf0c **K\u00e2inattaki Tecellisi:** K\u00e2inat kitab\u0131n\u0131n tamam\u0131: Kozmik ufuklardan atom alt\u0131 sicimlere, genetik kodlardan bilin\u00e7 ufkuna kadar b\u00fct\u00fcn mevcudat, Allah lafz\u0131n\u0131n harfleri ve kelimeleridir. Her bir isim bir pencere a\u00e7ar; 'Allah' ismi ise o pencerelerin tamam\u0131n\u0131 kucaklayan mutlak g\u00fcne\u015f gibidir.\n\n\ud83c\udf31 **Tefekk\u00fcr Boyutu:** Hayat\u0131n en y\u00fcksek gayesi; 'Allah' isminin ihtiva etti\u011fi cem\u00e2l ve cel\u00e2le muhatap olup marifetullah, muhabbetullah ve ubudiyet ufkuna ula\u015fmakt\u0131r. Kul, b\u00fct\u00fcn esman\u0131n tecellilerini kalbinde cem ederek k\u00e2inat\u0131n en \u015ferefli halifesi makam\u0131na y\u00fckselir.",
  },
];

/**
 * Belirli bir sınıf için 55 Esmâü'l-Hüsnâ kartını döner.
 * - Hafta 1-16: Eylül - Aralık 2026 (4 ay x 4 hafta)
 * - Hafta 17-48: Ocak - Ağustos 2027 (8 ay x 4 hafta)
 * - Hafta 49-55: Ekstra 1-7 (48 haftalık standart müfredat kuralı sonrası ilave kartlar)
 */
export function getEsmaEntriesForGrade(grade: number): CurriculumEntry[] {
  const items = grade <= 3 ? ortaokulEsmaCurriculum : liseEsmaCurriculum;

  return items.map((item) => {
    if (item.weekNumber <= 48) {
      const monthIndex = Math.floor((item.weekNumber - 1) / 4); // 0..11
      const month = monthIndex < 4 ? 9 + monthIndex : monthIndex - 3;
      const year = monthIndex < 4 ? 2026 : 2027;
      const weekInMonth = ((item.weekNumber - 1) % 4) + 1;
      const id = makeEsmaEntryId(month, weekInMonth, grade, false);

      return {
        id,
        grade,
        categoryId: "esma",
        month,
        week: weekInMonth,
        year,
        isExtra: false,
        arabic: item.arabic,
        title: item.title,
        body: item.body,
      };
    }

    const extraOrder = item.weekNumber - 48; // 1..7
    const id = makeEsmaEntryId(8, 4, grade, true, extraOrder);

    return {
      id,
      grade,
      categoryId: "esma",
      month: 8,
      week: 4,
      year: 2027,
      isExtra: true,
      extraOrder,
      arabic: item.arabic,
      title: item.title,
      body: item.body,
    };
  });
}

/**
 * 6 Belçika sınıfı için tüm Esmâü'l-Hüsnâ kayıtlarını döner (toplam 330 kayıt).
 */
export function getAllEsmaEntries(): CurriculumEntry[] {
  const all: CurriculumEntry[] = [];
  for (let grade = 1; grade <= 6; grade++) {
    all.push(...getEsmaEntriesForGrade(grade));
  }
  return all;
}

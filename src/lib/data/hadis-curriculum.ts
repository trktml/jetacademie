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

function makeHadisEntryId(
  month: number,
  week: number,
  grade: number = 1,
  isExtra: boolean = false,
  extraOrder?: number
): string {
  const prefix = grade === 1 ? "" : `g${grade}-`;
  if (isExtra) {
    return `${prefix}hadis-extra-${extraOrder ?? 1}`;
  }
  const monthSlug = monthSlugs[month] ?? `m${month}`;
  return `${prefix}hadis-${monthSlug}-${week}`;
}

export interface HadisCurriculumItem {
  weekNumber: number;
  topic: string;
  arabic: string;
  turkish: string;
  source: string;
  authenticity: string;
  verifyUrl: string;
  title: string;
  body: string;
}

/**
 * Ortaokul (1., 2. ve 3. Sınıflar) için 55 haftalık Hadis programı
 * Kaynak: mufredat-docs/hadis/ORTAOKUL_55_HAFTALIK_HADIS_PROGRAMI_FINAL.docx
 */
export const ortaokulHadisCurriculum: readonly HadisCurriculumItem[] = [
  {
    weekNumber: 1,
    topic: "Niyet: Bir işi neden yapıyorum?",
    arabic:
      "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ.",
    turkish:
      "Ameller niyetlere göredir. Her insan için ancak niyet ettiği vardır. Kimin hicreti elde edeceği bir dünya menfaati veya evleneceği bir kadın için ise, onun hicreti de hicret ettiği şey içindir.",
    source: "Sahîh-i Buhârî, no. 1",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:1",
    title: "Niyet: Bir işi neden yapıyorum?",
    body: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ.\n\nTürkçe Anlamı:\n"Ameller niyetlere göredir. Her insan için ancak niyet ettiği vardır. Kimin hicreti elde edeceği bir dünya menfaati veya evleneceği bir kadın için ise, onun hicreti de hicret ettiği şey içindir."\n\nKaynak: Sahîh-i Buhârî, no. 1 (Sahih)',
  },
  {
    weekNumber: 2,
    topic: "İslâm’ın beş temel direği",
    arabic:
      "بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلاَةِ، وَإِيتَاءِ الزَّكَاةِ، وَالْحَجِّ، وَصَوْمِ رَمَضَانَ.",
    turkish:
      "İslâm beş temel üzerine kurulmuştur: Allah’tan başka ilâh olmadığına ve Muhammed’in Allah’ın Resûlü olduğuna şehadet etmek, namazı kılmak, zekâtı vermek, haccetmek ve Ramazan orucunu tutmak.",
    source: "Sahîh-i Buhârî, no. 8",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:8",
    title: "İslâm’ın beş temel direği",
    body: 'بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلاَةِ، وَإِيتَاءِ الزَّكَاةِ، وَالْحَجِّ، وَصَوْمِ رَمَضَانَ.\n\nTürkçe Anlamı:\n"İslâm beş temel üzerine kurulmuştur: Allah’tan başka ilâh olmadığına ve Muhammed’in Allah’ın Resûlü olduğuna şehadet etmek, namazı kılmak, zekâtı vermek, haccetmek ve Ramazan orucunu tutmak."\n\nKaynak: Sahîh-i Buhârî, no. 8 (Sahih)',
  },
  {
    weekNumber: 3,
    topic: "Dinde denge: Zorlaştırmadan devam etmek",
    arabic:
      "إِنَّ الدِّينَ يُسْرٌ، وَلَنْ يُشَادَّ الدِّينَ أَحَدٌ إِلاَّ غَلَبَهُ، فَسَدِّدُوا وَقَارِبُوا وَأَبْشِرُوا، وَاسْتَعِينُوا بِالْغَدْوَةِ وَالرَّوْحَةِ وَشَىْءٍ مِنَ الدُّلْجَةِ.",
    turkish:
      "Din kolaylıktır. Dini kendisi için aşırı zorlaştıran kimse buna devam edemez. Bu yüzden doğruyu hedefleyin, gücünüz yettiğince ona yaklaşın ve ümitli olun. Sabah, akşam ve gecenin bir bölümünü değerlendirerek güç kazanın.",
    source: "Sahîh-i Buhârî, no. 39",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:39",
    title: "Dinde denge: Zorlaştırmadan devam etmek",
    body: 'إِنَّ الدِّينَ يُسْرٌ، وَلَنْ يُشَادَّ الدِّينَ أَحَدٌ إِلاَّ غَلَبَهُ، فَسَدِّدُوا وَقَارِبُوا وَأَبْشِرُوا، وَاسْتَعِينُوا بِالْغَدْوَةِ وَالرَّوْحَةِ وَشَىْءٍ مِنَ الدُّلْجَةِ.\n\nTürkçe Anlamı:\n"Din kolaylıktır. Dini kendisi için aşırı zorlaştıran kimse buna devam edemez. Bu yüzden doğruyu hedefleyin, gücünüz yettiğince ona yaklaşın ve ümitli olun. Sabah, akşam ve gecenin bir bölümünü değerlendirerek güç kazanın."\n\nKaynak: Sahîh-i Buhârî, no. 39 (Sahih)',
  },
  {
    weekNumber: 4,
    topic: "Kur’ân: Öğrenmek ve öğretmek",
    arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ.",
    turkish: "Sizin en hayırlınız, Kur’ân’ı öğrenen ve onu öğretendir.",
    source: "Sahîh-i Buhârî, no. 5027",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:5027",
    title: "Kur’ân: Öğrenmek ve öğretmek",
    body: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ.\n\nTürkçe Anlamı:\n"Sizin en hayırlınız, Kur’ân’ı öğrenen ve onu öğretendir."\n\nKaynak: Sahîh-i Buhârî, no. 5027 (Sahih)',
  },
  {
    weekNumber: 5,
    topic: "Dini doğru anlamak büyük bir hayırdır",
    arabic:
      "مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ، وَإِنَّمَا أَنَا قَاسِمٌ وَاللَّهُ يُعْطِي، وَلَنْ تَزَالَ هَذِهِ الأُمَّةُ قَائِمَةً عَلَى أَمْرِ اللَّهِ لاَ يَضُرُّهُمْ مَنْ خَالَفَهُمْ حَتَّى يَأْتِيَ أَمْرُ اللَّهِ.",
    turkish:
      "Allah kimin hakkında hayır dilerse ona dini doğru anlama kabiliyeti verir. Ben ancak paylaştırırım; asıl veren Allah’tır. Bu ümmetten bir topluluk Allah’ın emrine bağlı kalmaya devam edecek; Allah’ın emri gelinceye kadar onlara karşı çıkanlar kendilerine zarar veremeyecektir.",
    source: "Sahîh-i Buhârî, no. 71",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:71",
    title: "Dini doğru anlamak büyük bir hayırdır",
    body: 'مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ، وَإِنَّمَا أَنَا قَاسِمٌ وَاللَّهُ يُعْطِي، وَلَنْ تَزَالَ هَذِهِ الأُمَّةُ قَائِمَةً عَلَى أَمْرِ اللَّهِ لاَ يَضُرُّهُمْ مَنْ خَالَفَهُمْ حَتَّى يَأْتِيَ أَمْرُ اللَّهِ.\n\nTürkçe Anlamı:\n"Allah kimin hakkında hayır dilerse ona dini doğru anlama kabiliyeti verir. Ben ancak paylaştırırım; asıl veren Allah’tır. Bu ümmetten bir topluluk Allah’ın emrine bağlı kalmaya devam edecek; Allah’ın emri gelinceye kadar onlara karşı çıkanlar kendilerine zarar veremeyecektir."\n\nKaynak: Sahîh-i Buhârî, no. 71 (Sahih)',
  },
  {
    weekNumber: 6,
    topic: "Öğrenirken denge: Bıktırmadan, düzenli ilerlemek",
    arabic:
      "كَانَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَتَخَوَّلُنَا بِالْمَوْعِظَةِ فِي الْأَيَّامِ، كَرَاهَةَ السَّآمَةِ عَلَيْنَا.",
    turkish: "Peygamberimiz, bıkıp usanmamamız için bize öğüt vereceği uygun günleri gözetirdi.",
    source: "Sahîh-i Buhârî, no. 68",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:68",
    title: "Öğrenirken denge: Bıktırmadan, düzenli ilerlemek",
    body: 'كَانَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَتَخَوَّلُنَا بِالْمَوْعِظَةِ فِي الْأَيَّامِ، كَرَاهَةَ السَّآمَةِ عَلَيْنَا.\n\nTürkçe Anlamı:\n"Peygamberimiz, bıkıp usanmamamız için bize öğüt vereceği uygun günleri gözetirdi."\n\nKaynak: Sahîh-i Buhârî, no. 68 (Sahih)',
  },
  {
    weekNumber: 7,
    topic: "Güçlü mümin: Faydalı olana yönel, Allah’tan yardım iste",
    arabic:
      "الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ مِنَ الْمُؤْمِنِ الضَّعِيفِ، وَفِي كُلٍّ خَيْرٌ. احْرِصْ عَلَى مَا يَنْفَعُكَ، وَاسْتَعِنْ بِاللَّهِ وَلَا تَعْجَزْ، وَإِنْ أَصَابَكَ شَيْءٌ فَلَا تَقُلْ: لَوْ أَنِّي فَعَلْتُ كَانَ كَذَا وَكَذَا، وَلَكِنْ قُلْ: قَدَرُ اللَّهِ وَمَا شَاءَ فَعَلَ، فَإِنَّ «لَوْ» تَفْتَحُ عَمَلَ الشَّيْطَانِ.",
    turkish:
      "Güçlü mümin, zayıf müminden daha hayırlı ve Allah’a daha sevimlidir; bununla birlikte ikisinde de hayır vardır. Sana fayda verecek şeye gayret et, Allah’tan yardım iste ve acze düşme. Başına bir şey gelirse: “Şöyle yapsaydım böyle olurdu” deme; “Allah’ın takdiri budur, O dilediğini yapar” de. Çünkü “keşke” sözü şeytana kapı açar.",
    source: "Sahîh-i Müslim, no. 2664",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2664",
    title: "Güçlü mümin: Faydalı olana yönel, Allah’tan yardım iste",
    body: 'الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ مِنَ الْمُؤْمِنِ الضَّعِيفِ، وَفِي كُلٍّ خَيْرٌ. احْرِصْ عَلَى مَا يَنْفَعُكَ، وَاسْتَعِنْ بِاللَّهِ وَلَا تَعْجَزْ، وَإِنْ أَصَابَكَ شَيْءٌ فَلَا تَقُلْ: لَوْ أَنِّي فَعَلْتُ كَانَ كَذَا وَكَذَا، وَلَكِنْ قُلْ: قَدَرُ اللَّهِ وَمَا شَاءَ فَعَلَ، فَإِنَّ «لَوْ» تَفْتَحُ عَمَلَ الشَّيْطَانِ.\n\nTürkçe Anlamı:\n"Güçlü mümin, zayıf müminden daha hayırlı ve Allah’a daha sevimlidir; bununla birlikte ikisinde de hayır vardır. Sana fayda verecek şeye gayret et, Allah’tan yardım iste ve acze düşme. Başına bir şey gelirse: “Şöyle yapsaydım böyle olurdu” deme; “Allah’ın takdiri budur, O dilediğini yapar” de. Çünkü “keşke” sözü şeytana kapı açar."\n\nKaynak: Sahîh-i Müslim, no. 2664 (Sahih)',
  },
  {
    weekNumber: 8,
    topic: "İmanın tadı: Allah sevgisi ve Allah için sevmek",
    arabic:
      "ثَلاَثٌ مَنْ كُنَّ فِيهِ وَجَدَ حَلاَوَةَ الإِيمَانِ أَنْ يَكُونَ اللَّهُ وَرَسُولُهُ أَحَبَّ إِلَيْهِ مِمَّا سِوَاهُمَا، وَأَنْ يُحِبَّ الْمَرْءَ لاَ يُحِبُّهُ إِلاَّ لِلَّهِ، وَأَنْ يَكْرَهَ أَنْ يَعُودَ فِي الْكُفْرِ كَمَا يَكْرَهُ أَنْ يُقْذَفَ فِي النَّارِ.",
    turkish:
      "Şu üç özellik kimde bulunursa imanın tadını hisseder: Allah ve Resûlü’nü her şeyden daha çok sevmek; bir insanı yalnız Allah için sevmek; imandan uzaklaşmayı ateşe atılmak kadar kötü görmek.",
    source: "Sahîh-i Buhârî, no. 16",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:16",
    title: "İmanın tadı: Allah sevgisi ve Allah için sevmek",
    body: 'ثَلاَثٌ مَنْ كُنَّ فِيهِ وَجَدَ حَلاَوَةَ الإِيمَانِ أَنْ يَكُونَ اللَّهُ وَرَسُولُهُ أَحَبَّ إِلَيْهِ مِمَّا سِوَاهُمَا، وَأَنْ يُحِبَّ الْمَرْءَ لاَ يُحِبُّهُ إِلاَّ لِلَّهِ، وَأَنْ يَكْرَهَ أَنْ يَعُودَ فِي الْكُفْرِ كَمَا يَكْرَهُ أَنْ يُقْذَفَ فِي النَّارِ.\n\nTürkçe Anlamı:\n"Şu üç özellik kimde bulunursa imanın tadını hisseder: Allah ve Resûlü’nü her şeyden daha çok sevmek; bir insanı yalnız Allah için sevmek; imandan uzaklaşmayı ateşe atılmak kadar kötü görmek."\n\nKaynak: Sahîh-i Buhârî, no. 16 (Sahih)',
  },
  {
    weekNumber: 9,
    topic: "İman hayatın birçok alanına uzanır",
    arabic:
      "الإِيمَانُ بِضْعٌ وَسَبْعُونَ أَوْ بِضْعٌ وَسِتُّونَ شُعْبَةً فَأَفْضَلُهَا قَوْلُ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَدْنَاهَا إِمَاطَةُ الأَذَى عَنِ الطَّرِيقِ وَالْحَيَاءُ شُعْبَةٌ مِنَ الإِيمَانِ.",
    turkish:
      "İmanın yetmişten fazla -yahut altmıştan fazla- şubesi vardır. En üstünü “Lâ ilâhe illallah” demektir; en aşağısı yoldan eziyet veren şeyi kaldırmaktır. Hayâ da imanın bir şubesidir.",
    source: "Sahîh-i Müslim, no. 35b",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:35b",
    title: "İman hayatın birçok alanına uzanır",
    body: 'الإِيمَانُ بِضْعٌ وَسَبْعُونَ أَوْ بِضْعٌ وَسِتُّونَ شُعْبَةً فَأَفْضَلُهَا قَوْلُ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَدْنَاهَا إِمَاطَةُ الأَذَى عَنِ الطَّرِيقِ وَالْحَيَاءُ شُعْبَةٌ مِنَ الإِيمَانِ.\n\nTürkçe Anlamı:\n"İmanın yetmişten fazla -yahut altmıştan fazla- şubesi vardır. En üstünü “Lâ ilâhe illallah” demektir; en aşağısı yoldan eziyet veren şeyi kaldırmaktır. Hayâ da imanın bir şubesidir."\n\nKaynak: Sahîh-i Müslim, no. 35b (Sahih)',
  },
  {
    weekNumber: 10,
    topic: "Hayâ: İmanın bir parçası",
    arabic:
      "مَرَّ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ عَلَى رَجُلٍ مِنَ الْأَنْصَارِ وَهُوَ يَعِظُ أَخَاهُ فِي الْحَيَاءِ، فَقَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «دَعْهُ، فَإِنَّ الْحَيَاءَ مِنَ الْإِيمَانِ».",
    turkish:
      "Allah Resûlü, Ensar’dan bir kişinin kardeşine hayâ konusunda öğüt verdiğini gördü ve: “Onu bırak; çünkü hayâ imandandır” buyurdu.",
    source: "Sahîh-i Buhârî, no. 24",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:24",
    title: "Hayâ: İmanın bir parçası",
    body: 'مَرَّ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ عَلَى رَجُلٍ مِنَ الْأَنْصَارِ وَهُوَ يَعِظُ أَخَاهُ فِي الْحَيَاءِ، فَقَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «دَعْهُ، فَإِنَّ الْحَيَاءَ مِنَ الْإِيمَانِ».\n\nTürkçe Anlamı:\n"Allah Resûlü, Ensar’dan bir kişinin kardeşine hayâ konusunda öğüt verdiğini gördü ve: “Onu bırak; çünkü hayâ imandandır” buyurdu."\n\nKaynak: Sahîh-i Buhârî, no. 24 (Sahih)',
  },
  {
    weekNumber: 11,
    topic: "Müslüman olmak: Dilimden ve elimden zarar gelmesin",
    arabic:
      "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ، وَالْمُهَاجِرُ مَنْ هَجَرَ مَا نَهَى اللَّهُ عَنْهُ.",
    turkish:
      "Müslüman, diğer Müslümanların dilinden ve elinden emin olduğu kimsedir. Muhacir ise Allah’ın yasakladığı şeyleri terk eden kimsedir.",
    source: "Sahîh-i Buhârî, no. 10",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:10",
    title: "Müslüman olmak: Dilimden ve elimden zarar gelmesin",
    body: 'الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ، وَالْمُهَاجِرُ مَنْ هَجَرَ مَا نَهَى اللَّهُ عَنْهُ.\n\nTürkçe Anlamı:\n"Müslüman, diğer Müslümanların dilinden ve elinden emin olduğu kimsedir. Muhacir ise Allah’ın yasakladığı şeyleri terk eden kimsedir."\n\nKaynak: Sahîh-i Buhârî, no. 10 (Sahih)',
  },
  {
    weekNumber: 12,
    topic: "Kardeşlik: Kendim için istediğimi başkası için de istemek",
    arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ.",
    turkish:
      "Sizden biri, kendisi için sevdiği şeyi kardeşi için de sevmedikçe imanı olgunlaşmış olmaz.",
    source: "Sahîh-i Buhârî, no. 13",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:13",
    title: "Kardeşlik: Kendim için istediğimi başkası için de istemek",
    body: 'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ.\n\nTürkçe Anlamı:\n"Sizden biri, kendisi için sevdiği şeyi kardeşi için de sevmedikçe imanı olgunlaşmış olmaz."\n\nKaynak: Sahîh-i Buhârî, no. 13 (Sahih)',
  },
  {
    weekNumber: 13,
    topic: "Müminler birbirini ayakta tutan bir bina gibidir",
    arabic:
      "إِنَّ الْمُؤْمِنَ لِلْمُؤْمِنِ كَالْبُنْيَانِ، يَشُدُّ بَعْضُهُ بَعْضًا. وَشَبَّكَ أَصَابِعَهُ.",
    turkish:
      "Müminin mümine karşı durumu, parçaları birbirini sağlamlaştıran bir bina gibidir. Peygamberimiz bunu söylerken parmaklarını birbirine geçirdi.",
    source: "Sahîh-i Buhârî, no. 481",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:481",
    title: "Müminler birbirini ayakta tutan bir bina gibidir",
    body: 'إِنَّ الْمُؤْمِنَ لِلْمُؤْمِنِ كَالْبُنْيَانِ، يَشُدُّ بَعْضُهُ بَعْضًا. وَشَبَّكَ أَصَابِعَهُ.\n\nTürkçe Anlamı:\n"Müminin mümine karşı durumu, parçaları birbirini sağlamlaştıran bir bina gibidir. Peygamberimiz bunu söylerken parmaklarını birbirine geçirdi."\n\nKaynak: Sahîh-i Buhârî, no. 481 (Sahih)',
  },
  {
    weekNumber: 14,
    topic: "Müminler bir beden gibidir",
    arabic:
      "مَثَلُ الْمُؤْمِنِينَ فِي تَوَادِّهِمْ وَتَرَاحُمِهِمْ وَتَعَاطُفِهِمْ مَثَلُ الْجَسَدِ إِذَا اشْتَكَى مِنْهُ عُضْوٌ تَدَاعَى لَهُ سَائِرُ الْجَسَدِ بِالسَّهَرِ وَالْحُمَّى.",
    turkish:
      "Müminler birbirlerini sevme, merhamet etme ve birbirlerine ilgi göstermede tek bir beden gibidir. Bedenin bir organı rahatsız olduğunda diğer organlar da uykusuzluk ve ateşle onun acısına ortak olur.",
    source: "Sahîh-i Müslim, no. 2586a",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2586a",
    title: "Müminler bir beden gibidir",
    body: 'مَثَلُ الْمُؤْمِنِينَ فِي تَوَادِّهِمْ وَتَرَاحُمِهِمْ وَتَعَاطُفِهِمْ مَثَلُ الْجَسَدِ إِذَا اشْتَكَى مِنْهُ عُضْوٌ تَدَاعَى لَهُ سَائِرُ الْجَسَدِ بِالسَّهَرِ وَالْحُمَّى.\n\nTürkçe Anlamı:\n"Müminler birbirlerini sevme, merhamet etme ve birbirlerine ilgi göstermede tek bir beden gibidir. Bedenin bir organı rahatsız olduğunda diğer organlar da uykusuzluk ve ateşle onun acısına ortak olur."\n\nKaynak: Sahîh-i Müslim, no. 2586a (Sahih)',
  },
  {
    weekNumber: 15,
    topic: "Arkadaş seçimi: Yanımdaki insan beni değiştirir",
    arabic:
      "مَثَلُ الْجَلِيسِ الصَّالِحِ وَالسَّوْءِ كَحَامِلِ الْمِسْكِ وَنَافِخِ الْكِيرِ، فَحَامِلُ الْمِسْكِ إِمَّا أَنْ يُحْذِيَكَ، وَإِمَّا أَنْ تَبْتَاعَ مِنْهُ، وَإِمَّا أَنْ تَجِدَ مِنْهُ رِيحًا طَيِّبَةً، وَنَافِخُ الْكِيرِ إِمَّا أَنْ يُحْرِقَ ثِيَابَكَ، وَإِمَّا أَنْ تَجِدَ رِيحًا خَبِيثَةً.",
    turkish:
      "İyi arkadaş ile kötü arkadaşın durumu, misk taşıyan kimse ile körük üfleyen kimse gibidir. Misk taşıyan kişi ya sana güzel koku verir, ya ondan satın alırsın ya da yanında güzel bir koku bulursun. Körük üfleyen ise ya elbiseni yakar ya da ondan kötü bir koku duyarsın.",
    source: "Sahîh-i Buhârî, no. 5534",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:5534",
    title: "Arkadaş seçimi: Yanımdaki insan beni değiştirir",
    body: 'مَثَلُ الْجَلِيسِ الصَّالِحِ وَالسَّوْءِ كَحَامِلِ الْمِسْكِ وَنَافِخِ الْكِيرِ، فَحَامِلُ الْمِسْكِ إِمَّا أَنْ يُحْذِيَكَ، وَإِمَّا أَنْ تَبْتَاعَ مِنْهُ، وَإِمَّا أَنْ تَجِدَ مِنْهُ رِيحًا طَيِّبَةً، وَنَافِخُ الْكِيرِ إِمَّا أَنْ يُحْرِقَ ثِيَابَكَ، وَإِمَّا أَنْ تَجِدَ رِيحًا خَبِيثَةً.\n\nTürkçe Anlamı:\n"İyi arkadaş ile kötü arkadaşın durumu, misk taşıyan kimse ile körük üfleyen kimse gibidir. Misk taşıyan kişi ya sana güzel koku verir, ya ondan satın alırsın ya da yanında güzel bir koku bulursun. Körük üfleyen ise ya elbiseni yakar ya da ondan kötü bir koku duyarsın."\n\nKaynak: Sahîh-i Buhârî, no. 5534 (Sahih)',
  },
  {
    weekNumber: 16,
    topic: "Allah için dostluk",
    arabic:
      "أَنَّ رَجُلاً زَارَ أَخًا لَهُ فِي قَرْيَةٍ أُخْرَى فَأَرْصَدَ اللَّهُ لَهُ عَلَى مَدْرَجَتِهِ مَلَكًا فَلَمَّا أَتَى عَلَيْهِ قَالَ أَيْنَ تُرِيدُ قَالَ أُرِيدُ أَخًا لِي فِي هَذِهِ الْقَرْيَةِ. قَالَ هَلْ لَكَ عَلَيْهِ مِنْ نِعْمَةٍ تَرُبُّهَا قَالَ لاَ غَيْرَ أَنِّي أَحْبَبْتُهُ فِي اللَّهِ عَزَّ وَجَلَّ. قَالَ فَإِنِّي رَسُولُ اللَّهِ إِلَيْكَ بِأَنَّ اللَّهَ قَدْ أَحَبَّكَ كَمَا أَحْبَبْتَهُ فِيهِ.",
    turkish:
      "Bir kişi başka bir şehirdeki din kardeşini ziyarete gitti. Allah onun yoluna bir melek gönderdi. Melek ona nereye gittiğini sordu. Adam, o şehirdeki kardeşini ziyarete gittiğini söyledi. Melek: “Onun sana yaptığı ve karşılığını vermek istediğin bir iyilik mi var?” diye sordu. Adam: “Hayır; onu yalnız Allah için seviyorum” dedi. Melek de: “Ben Allah’ın sana gönderdiği elçiyim; sen onu Allah için sevdiğin gibi Allah da seni sevmiştir” dedi.",
    source: "Sahîh-i Müslim, no. 2567a",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2567a",
    title: "Allah için dostluk",
    body: 'أَنَّ رَجُلاً زَارَ أَخًا لَهُ فِي قَرْيَةٍ أُخْرَى فَأَرْصَدَ اللَّهُ لَهُ عَلَى مَدْرَجَتِهِ مَلَكًا فَلَمَّا أَتَى عَلَيْهِ قَالَ أَيْنَ تُرِيدُ قَالَ أُرِيدُ أَخًا لِي فِي هَذِهِ الْقَرْيَةِ. قَالَ هَلْ لَكَ عَلَيْهِ مِنْ نِعْمَةٍ تَرُبُّهَا قَالَ لاَ غَيْرَ أَنِّي أَحْبَبْتُهُ فِي اللَّهِ عَزَّ وَجَلَّ. قَالَ فَإِنِّي رَسُولُ اللَّهِ إِلَيْكَ بِأَنَّ اللَّهَ قَدْ أَحَبَّكَ كَمَا أَحْبَبْتَهُ فِيهِ.\n\nTürkçe Anlamı:\n"Bir kişi başka bir şehirdeki din kardeşini ziyarete gitti. Allah onun yoluna bir melek gönderdi. Melek ona nereye gittiğini sordu. Adam, o şehirdeki kardeşini ziyarete gittiğini söyledi. Melek: “Onun sana yaptığı ve karşılığını vermek istediğin bir iyilik mi var?” diye sordu. Adam: “Hayır; onu yalnız Allah için seviyorum” dedi. Melek de: “Ben Allah’ın sana gönderdiği elçiyim; sen onu Allah için sevdiğin gibi Allah da seni sevmiştir” dedi."\n\nKaynak: Sahîh-i Müslim, no. 2567a (Sahih)',
  },
  {
    weekNumber: 17,
    topic: "Selâm: Sevgiyi çoğaltan küçük davranış",
    arabic:
      "لَا تَدْخُلُونَ الْجَنَّةَ حَتَّى تُؤْمِنُوا، وَلَا تُؤْمِنُوا حَتَّى تَحَابُّوا، أَوَلَا أَدُلُّكُمْ عَلَى شَيْءٍ إِذَا فَعَلْتُمُوهُ تَحَابَبْتُمْ؟ أَفْشُوا السَّلَامَ بَيْنَكُمْ.",
    turkish:
      "İman etmedikçe cennete giremezsiniz; birbirinizi sevmedikçe de imanınız olgunlaşmaz. Size, yaptığınızda birbirinizi seveceğiniz bir şeyi göstereyim mi? Aranızda selâmı yayın.",
    source: "Sahîh-i Müslim, no. 54a",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:54a",
    title: "Selâm: Sevgiyi çoğaltan küçük davranış",
    body: 'لَا تَدْخُلُونَ الْجَنَّةَ حَتَّى تُؤْمِنُوا، وَلَا تُؤْمِنُوا حَتَّى تَحَابُّوا، أَوَلَا أَدُلُّكُمْ عَلَى شَيْءٍ إِذَا فَعَلْتُمُوهُ تَحَابَبْتُمْ؟ أَفْشُوا السَّلَامَ بَيْنَكُمْ.\n\nTürkçe Anlamı:\n"İman etmedikçe cennete giremezsiniz; birbirinizi sevmedikçe de imanınız olgunlaşmaz. Size, yaptığınızda birbirinizi seveceğiniz bir şeyi göstereyim mi? Aranızda selâmı yayın."\n\nKaynak: Sahîh-i Müslim, no. 54a (Sahih)',
  },
  {
    weekNumber: 18,
    topic: "İyilik: İkram etmek ve selâmı yaymak",
    arabic:
      "أَنَّ رَجُلاً سَأَلَ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ أَيُّ الإِسْلاَمِ خَيْرٌ قَالَ: «تُطْعِمُ الطَّعَامَ، وَتَقْرَأُ السَّلاَمَ عَلَى مَنْ عَرَفْتَ وَمَنْ لَمْ تَعْرِفْ».",
    turkish:
      "Bir adam Peygamberimize, “İslâm’ın hangi davranışı daha hayırlıdır?” diye sordu. O da: “Yemek yedirmen ve tanıdığın-tanımadığın herkese selâm vermen” buyurdu.",
    source: "Sahîh-i Buhârî, no. 12",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:12",
    title: "İyilik: İkram etmek ve selâmı yaymak",
    body: 'أَنَّ رَجُلاً سَأَلَ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ أَيُّ الإِسْلاَمِ خَيْرٌ قَالَ: «تُطْعِمُ الطَّعَامَ، وَتَقْرَأُ السَّلاَمَ عَلَى مَنْ عَرَفْتَ وَمَنْ لَمْ تَعْرِفْ».\n\nTürkçe Anlamı:\n"Bir adam Peygamberimize, “İslâm’ın hangi davranışı daha hayırlıdır?” diye sordu. O da: “Yemek yedirmen ve tanıdığın-tanımadığın herkese selâm vermen” buyurdu."\n\nKaynak: Sahîh-i Buhârî, no. 12 (Sahih)',
  },
  {
    weekNumber: 19,
    topic: "Selâmı başlatmak",
    arabic:
      "يُسَلِّمُ الصَّغِيرُ عَلَى الْكَبِيرِ، وَالْمَارُّ عَلَى الْقَاعِدِ، وَالْقَلِيلُ عَلَى الْكَثِيرِ.",
    turkish:
      "Küçük büyüğe, yürüyüp geçen oturana, az olan topluluk da çok olan topluluğa selâm verir.",
    source: "Sahîh-i Buhârî, no. 6231",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:6231",
    title: "Selâmı başlatmak",
    body: 'يُسَلِّمُ الصَّغِيرُ عَلَى الْكَبِيرِ، وَالْمَارُّ عَلَى الْقَاعِدِ، وَالْقَلِيلُ عَلَى الْكَثِيرِ.\n\nTürkçe Anlamı:\n"Küçük büyüğe, yürüyüp geçen oturana, az olan topluluk da çok olan topluluğa selâm verir."\n\nKaynak: Sahîh-i Buhârî, no. 6231 (Sahih)',
  },
  {
    weekNumber: 20,
    topic: "Kimseyi dışarıda bırakan gizli konuşma yapmamak",
    arabic:
      "إِذَا كُنْتُمْ ثَلاَثَةً فَلاَ يَتَنَاجَى اثْنَانِ دُونَ الآخَرِ حَتَّى تَخْتَلِطُوا بِالنَّاسِ مِنْ أَجْلِ أَنْ يُحْزِنَهُ.",
    turkish:
      "Üç kişi olduğunuzda, başka insanlar yanınıza gelinceye kadar ikiniz üçüncü kişiyi dışarıda bırakarak gizlice konuşmasın; çünkü bu onu üzebilir.",
    source: "Sahîh-i Müslim, no. 2184a",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2184a",
    title: "Kimseyi dışarıda bırakan gizli konuşma yapmamak",
    body: 'إِذَا كُنْتُمْ ثَلاَثَةً فَلاَ يَتَنَاجَى اثْنَانِ دُونَ الآخَرِ حَتَّى تَخْتَلِطُوا بِالنَّاسِ مِنْ أَجْلِ أَنْ يُحْزِنَهُ.\n\nTürkçe Anlamı:\n"Üç kişi olduğunuzda, başka insanlar yanınıza gelinceye kadar ikiniz üçüncü kişiyi dışarıda bırakarak gizlice konuşmasın; çünkü bu onu üzebilir."\n\nKaynak: Sahîh-i Müslim, no. 2184a (Sahih)',
  },
  {
    weekNumber: 21,
    topic: "Komşu, misafir ve dil: İmanın günlük hayattaki izi",
    arabic:
      "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلَا يُؤْذِ جَارَهُ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيُكْرِمْ ضَيْفَهُ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ.",
    turkish:
      "Allah’a ve âhiret gününe iman eden komşusuna eziyet etmesin. Allah’a ve âhiret gününe iman eden misafirine ikram etsin. Allah’a ve âhiret gününe iman eden ya hayır söylesin ya da sussun.",
    source: "Sahîh-i Buhârî, no. 6018",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:6018",
    title: "Komşu, misafir ve dil: İmanın günlük hayattaki izi",
    body: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلَا يُؤْذِ جَارَهُ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيُكْرِمْ ضَيْفَهُ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ.\n\nTürkçe Anlamı:\n"Allah’a ve âhiret gününe iman eden komşusuna eziyet etmesin. Allah’a ve âhiret gününe iman eden misafirine ikram etsin. Allah’a ve âhiret gününe iman eden ya hayır söylesin ya da sussun."\n\nKaynak: Sahîh-i Buhârî, no. 6018 (Sahih)',
  },
  {
    weekNumber: 22,
    topic: "Doğruluk: Küçük tercihler karaktere dönüşür",
    arabic:
      "إِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ، وَإِنَّ الْبِرَّ يَهْدِي إِلَى الْجَنَّةِ، وَإِنَّ الرَّجُلَ لَيَصْدُقُ حَتَّى يَكُونَ صِدِّيقًا، وَإِنَّ الْكَذِبَ يَهْدِي إِلَى الْفُجُورِ، وَإِنَّ الْفُجُورَ يَهْدِي إِلَى النَّارِ، وَإِنَّ الرَّجُلَ لَيَكْذِبُ حَتَّى يُكْتَبَ عِنْدَ اللَّهِ كَذَّابًا.",
    turkish:
      "Doğruluk iyiliğe götürür, iyilik de cennete götürür. İnsan doğru söylemeye devam eder ve sonunda Allah katında doğru sözlü biri olarak yazılır. Yalan ise kötülüğe götürür, kötülük de ateşe götürür. İnsan yalan söylemeye devam eder ve sonunda Allah katında yalancı olarak yazılır.",
    source: "Sahîh-i Buhârî, no. 6094",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:6094",
    title: "Doğruluk: Küçük tercihler karaktere dönüşür",
    body: 'إِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ، وَإِنَّ الْبِرَّ يَهْدِي إِلَى الْجَنَّةِ، وَإِنَّ الرَّجُلَ لَيَصْدُقُ حَتَّى يَكُونَ صِدِّيقًا، وَإِنَّ الْكَذِبَ يَهْدِي إِلَى الْفُجُورِ، وَإِنَّ الْفُجُورَ يَهْدِي إِلَى النَّارِ، وَإِنَّ الرَّجُلَ لَيَكْذِبُ حَتَّى يُكْتَبَ عِنْدَ اللَّهِ كَذَّابًا.\n\nTürkçe Anlamı:\n"Doğruluk iyiliğe götürür, iyilik de cennete götürür. İnsan doğru söylemeye devam eder ve sonunda Allah katında doğru sözlü biri olarak yazılır. Yalan ise kötülüğe götürür, kötülük de ateşe götürür. İnsan yalan söylemeye devam eder ve sonunda Allah katında yalancı olarak yazılır."\n\nKaynak: Sahîh-i Buhârî, no. 6094 (Sahih)',
  },
  {
    weekNumber: 23,
    topic: "Kısa ama güçlü öğüt: Öfkelenme",
    arabic:
      "أَنَّ رَجُلاً قَالَ لِلنَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ أَوْصِنِي. قَالَ: «لاَ تَغْضَبْ». فَرَدَّدَ مِرَارًا، قَالَ: «لاَ تَغْضَبْ».",
    turkish:
      "Bir adam Peygamberimize: “Bana öğüt ver” dedi. Peygamberimiz: “Öfkelenme” buyurdu. Adam isteğini birkaç kez tekrarladı; Peygamberimiz her defasında: “Öfkelenme” buyurdu.",
    source: "Sahîh-i Buhârî, no. 6116",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:6116",
    title: "Kısa ama güçlü öğüt: Öfkelenme",
    body: 'أَنَّ رَجُلاً قَالَ لِلنَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ أَوْصِنِي. قَالَ: «لاَ تَغْضَبْ». فَرَدَّدَ مِرَارًا، قَالَ: «لاَ تَغْضَبْ».\n\nTürkçe Anlamı:\n"Bir adam Peygamberimize: “Bana öğüt ver” dedi. Peygamberimiz: “Öfkelenme” buyurdu. Adam isteğini birkaç kez tekrarladı; Peygamberimiz her defasında: “Öfkelenme” buyurdu."\n\nKaynak: Sahîh-i Buhârî, no. 6116 (Sahih)',
  },
  {
    weekNumber: 24,
    topic: "Gerçek güç: Öfke anında kendini tutabilmek",
    arabic:
      "لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ.",
    turkish:
      "Güçlü kimse, insanları güreşte yenen kişi değildir. Asıl güçlü kimse, öfkelendiği zaman kendine hâkim olabilendir.",
    source: "Sahîh-i Buhârî, no. 6114",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:6114",
    title: "Gerçek güç: Öfke anında kendini tutabilmek",
    body: 'لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ.\n\nTürkçe Anlamı:\n"Güçlü kimse, insanları güreşte yenen kişi değildir. Asıl güçlü kimse, öfkelendiği zaman kendine hâkim olabilendir."\n\nKaynak: Sahîh-i Buhârî, no. 6114 (Sahih)',
  },
  {
    weekNumber: 25,
    topic: "Yumuşaklık: Güzel davranışı daha da güzelleştiren şey",
    arabic:
      "إِنَّ الرِّفْقَ لَا يَكُونُ فِي شَيْءٍ إِلَّا زَانَهُ، وَلَا يُنْزَعُ مِنْ شَيْءٍ إِلَّا شَانَهُ.",
    turkish:
      "Yumuşaklık hangi şeyde bulunursa onu güzelleştirir; hangi şeyden çıkarılırsa onu çirkinleştirir.",
    source: "Sahîh-i Müslim, no. 2594a",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2594a",
    title: "Yumuşaklık: Güzel davranışı daha da güzelleştiren şey",
    body: 'إِنَّ الرِّفْقَ لَا يَكُونُ فِي شَيْءٍ إِلَّا زَانَهُ، وَلَا يُنْزَعُ مِنْ شَيْءٍ إِلَّا شَانَهُ.\n\nTürkçe Anlamı:\n"Yumuşaklık hangi şeyde bulunursa onu güzelleştirir; hangi şeyden çıkarılırsa onu çirkinleştirir."\n\nKaynak: Sahîh-i Müslim, no. 2594a (Sahih)',
  },
  {
    weekNumber: 26,
    topic: "Küçük iyilik diye bir şey yok",
    arabic:
      "لَا تَحْقِرَنَّ مِنَ الْمَعْرُوفِ شَيْئًا، وَلَوْ أَنْ تَلْقَى أَخَاكَ بِوَجْهٍ طَلْقٍ.",
    turkish: "Hiçbir iyiliği küçümseme; kardeşini güler yüzle karşılaman bile olsa.",
    source: "Sahîh-i Müslim, no. 2626",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2626",
    title: "Küçük iyilik diye bir şey yok",
    body: 'لَا تَحْقِرَنَّ مِنَ الْمَعْرُوفِ شَيْئًا، وَلَوْ أَنْ تَلْقَى أَخَاكَ بِوَجْهٍ طَلْقٍ.\n\nTürkçe Anlamı:\n"Hiçbir iyiliği küçümseme; kardeşini güler yüzle karşılaman bile olsa."\n\nKaynak: Sahîh-i Müslim, no. 2626 (Sahih)',
  },
  {
    weekNumber: 27,
    topic: "Her gün iyilik için yeni bir fırsat",
    arabic:
      "كُلُّ سُلَامَى مِنَ النَّاسِ عَلَيْهِ صَدَقَةٌ كُلَّ يَوْمٍ تَطْلُعُ فِيهِ الشَّمْسُ، يَعْدِلُ بَيْنَ الِاثْنَيْنِ صَدَقَةٌ، وَيُعِينُ الرَّجُلَ عَلَى دَابَّتِهِ فَيَحْمِلُ عَلَيْهَا أَوْ يَرْفَعُ عَلَيْهَا مَتَاعَهُ صَدَقَةٌ، وَالْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ، وَكُلُّ خُطْوَةٍ يَخْطُوهَا إِلَى الصَّلَاةِ صَدَقَةٌ، وَيُمِيطُ الْأَذَى عَنِ الطَّرِيقِ صَدَقَةٌ.",
    turkish:
      "İnsanın her bir eklemi için, güneşin doğduğu her gün bir sadaka gerekir. İki kişi arasında adaletle hükmetmek sadakadır. Birine bineğine binmesinde yardım etmek veya eşyasını yüklemek sadakadır. Güzel bir söz sadakadır. Namaza giderken atılan her adım sadakadır. Yoldan insanlara zarar veren bir şeyi kaldırmak da sadakadır.",
    source: "Sahîh-i Buhârî, no. 2989",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:2989",
    title: "Her gün iyilik için yeni bir fırsat",
    body: 'كُلُّ سُلَامَى مِنَ النَّاسِ عَلَيْهِ صَدَقَةٌ كُلَّ يَوْمٍ تَطْلُعُ فِيهِ الشَّمْسُ، يَعْدِلُ بَيْنَ الِاثْنَيْنِ صَدَقَةٌ، وَيُعِينُ الرَّجُلَ عَلَى دَابَّتِهِ فَيَحْمِلُ عَلَيْهَا أَوْ يَرْفَعُ عَلَيْهَا مَتَاعَهُ صَدَقَةٌ، وَالْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ، وَكُلُّ خُطْوَةٍ يَخْطُوهَا إِلَى الصَّلَاةِ صَدَقَةٌ، وَيُمِيطُ الْأَذَى عَنِ الطَّرِيقِ صَدَقَةٌ.\n\nTürkçe Anlamı:\n"İnsanın her bir eklemi için, güneşin doğduğu her gün bir sadaka gerekir. İki kişi arasında adaletle hükmetmek sadakadır. Birine bineğine binmesinde yardım etmek veya eşyasını yüklemek sadakadır. Güzel bir söz sadakadır. Namaza giderken atılan her adım sadakadır. Yoldan insanlara zarar veren bir şeyi kaldırmak da sadakadır."\n\nKaynak: Sahîh-i Buhârî, no. 2989 (Sahih)',
  },
  {
    weekNumber: 28,
    topic: "Veren el olabilmek",
    arabic:
      "الْيَدُ الْعُلْيَا خَيْرٌ مِنَ الْيَدِ السُّفْلَى، فَالْيَدُ الْعُلْيَا هِيَ الْمُنْفِقَةُ، وَالسُّفْلَى هِيَ السَّائِلَةُ.",
    turkish:
      "Üstte olan el, altta olan elden daha hayırlıdır. Üstte olan el veren; altta olan el ise isteyen eldir.",
    source: "Sahîh-i Buhârî, no. 1429",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:1429",
    title: "Veren el olabilmek",
    body: 'الْيَدُ الْعُلْيَا خَيْرٌ مِنَ الْيَدِ السُّفْلَى، فَالْيَدُ الْعُلْيَا هِيَ الْمُنْفِقَةُ، وَالسُّفْلَى هِيَ السَّائِلَةُ.\n\nTürkçe Anlamı:\n"Üstte olan el, altta olan elden daha hayırlıdır. Üstte olan el veren; altta olan el ise isteyen eldir."\n\nKaynak: Sahîh-i Buhârî, no. 1429 (Sahih)',
  },
  {
    weekNumber: 29,
    topic: "Dikilen bir ağaç bile sadakaya dönüşebilir",
    arabic:
      "مَا مِنْ مُسْلِمٍ يَغْرِسُ غَرْسًا، أَوْ يَزْرَعُ زَرْعًا، فَيَأْكُلُ مِنْهُ طَيْرٌ أَوْ إِنْسَانٌ أَوْ بَهِيمَةٌ، إِلاَّ كَانَ لَهُ بِهِ صَدَقَةٌ.",
    turkish:
      "Bir Müslüman bir ağaç diker veya bir şey eker de ondan bir kuş, insan ya da hayvan yerse bu, o kişi için sadaka olur.",
    source: "Sahîh-i Buhârî, no. 2320",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:2320",
    title: "Dikilen bir ağaç bile sadakaya dönüşebilir",
    body: 'مَا مِنْ مُسْلِمٍ يَغْرِسُ غَرْسًا، أَوْ يَزْرَعُ زَرْعًا، فَيَأْكُلُ مِنْهُ طَيْرٌ أَوْ إِنْسَانٌ أَوْ بَهِيمَةٌ، إِلاَّ كَانَ لَهُ بِهِ صَدَقَةٌ.\n\nTürkçe Anlamı:\n"Bir Müslüman bir ağaç diker veya bir şey eker de ondan bir kuş, insan ya da hayvan yerse bu, o kişi için sadaka olur."\n\nKaynak: Sahîh-i Buhârî, no. 2320 (Sahih)',
  },
  {
    weekNumber: 30,
    topic: "Zayıfın ve ihtiyaç sahibinin yanında olmak",
    arabic:
      "السَّاعِي عَلَى الْأَرْمَلَةِ وَالْمِسْكِينِ كَالْمُجَاهِدِ فِي سَبِيلِ اللَّهِ، أَوْ كَالَّذِي يَصُومُ النَّهَارَ وَيَقُومُ اللَّيْلَ.",
    turkish:
      "Dulun ve yoksulun ihtiyacı için çalışan kimse, Allah yolunda gayret eden kimse gibidir; yahut gündüzleri oruç tutup geceleri ibadet eden kimse gibidir.",
    source: "Sahîh-i Buhârî, no. 6006",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:6006",
    title: "Zayıfın ve ihtiyaç sahibinin yanında olmak",
    body: 'السَّاعِي عَلَى الْأَرْمَلَةِ وَالْمِسْكِينِ كَالْمُجَاهِدِ فِي سَبِيلِ اللَّهِ، أَوْ كَالَّذِي يَصُومُ النَّهَارَ وَيَقُومُ اللَّيْلَ.\n\nTürkçe Anlamı:\n"Dulun ve yoksulun ihtiyacı için çalışan kimse, Allah yolunda gayret eden kimse gibidir; yahut gündüzleri oruç tutup geceleri ibadet eden kimse gibidir."\n\nKaynak: Sahîh-i Buhârî, no. 6006 (Sahih)',
  },
  {
    weekNumber: 31,
    topic: "Yetimi gözetmek: Peygamberimize yakın bir yol",
    arabic:
      "أَنَا وَكَافِلُ الْيَتِيمِ فِي الْجَنَّةِ هَكَذَا. وَقَالَ بِإِصْبَعَيْهِ السَّبَّابَةِ وَالْوُسْطَى.",
    turkish:
      "“Ben ve yetimi gözetip ihtiyaçlarını üstlenen kimse cennette böyle yan yana olacağız” buyurdu ve işaret parmağıyla orta parmağını yan yana gösterdi.",
    source: "Sahîh-i Buhârî, no. 6005",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:6005",
    title: "Yetimi gözetmek: Peygamberimize yakın bir yol",
    body: 'أَنَا وَكَافِلُ الْيَتِيمِ فِي الْجَنَّةِ هَكَذَا. وَقَالَ بِإِصْبَعَيْهِ السَّبَّابَةِ وَالْوُسْطَى.\n\nTürkçe Anlamı:\n"“Ben ve yetimi gözetip ihtiyaçlarını üstlenen kimse cennette böyle yan yana olacağız” buyurdu ve işaret parmağıyla orta parmağını yan yana gösterdi."\n\nKaynak: Sahîh-i Buhârî, no. 6005 (Sahih)',
  },
  {
    weekNumber: 32,
    topic: "Kardeşini yalnız bırakmamak",
    arabic:
      "الْمُسْلِمُ أَخُو الْمُسْلِمِ، لَا يَظْلِمُهُ وَلَا يُسْلِمُهُ، وَمَنْ كَانَ فِي حَاجَةِ أَخِيهِ كَانَ اللَّهُ فِي حَاجَتِهِ، وَمَنْ فَرَّجَ عَنْ مُسْلِمٍ كُرْبَةً فَرَّجَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرُبَاتِ يَوْمِ الْقِيَامَةِ، وَمَنْ سَتَرَ مُسْلِمًا سَتَرَهُ اللَّهُ يَوْمَ الْقِيَامَةِ.",
    turkish:
      "Müslüman, Müslümanın kardeşidir; ona zulmetmez ve onu yalnız bırakmaz. Kim kardeşinin ihtiyacını gidermeye çalışırsa Allah da onun ihtiyacını giderir. Kim bir Müslümanın sıkıntısını giderirse Allah da kıyamet günündeki sıkıntılarından birini giderir. Kim bir Müslümanın kusurunu örterse Allah da kıyamet günü onun kusurunu örter.",
    source: "Sahîh-i Buhârî, no. 2442",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:2442",
    title: "Kardeşini yalnız bırakmamak",
    body: 'الْمُسْلِمُ أَخُو الْمُسْلِمِ، لَا يَظْلِمُهُ وَلَا يُسْلِمُهُ، وَمَنْ كَانَ فِي حَاجَةِ أَخِيهِ كَانَ اللَّهُ فِي حَاجَتِهِ، وَمَنْ فَرَّجَ عَنْ مُسْلِمٍ كُرْبَةً فَرَّجَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرُبَاتِ يَوْمِ الْقِيَامَةِ، وَمَنْ سَتَرَ مُسْلِمًا سَتَرَهُ اللَّهُ يَوْمَ الْقِيَامَةِ.\n\nTürkçe Anlamı:\n"Müslüman, Müslümanın kardeşidir; ona zulmetmez ve onu yalnız bırakmaz. Kim kardeşinin ihtiyacını gidermeye çalışırsa Allah da onun ihtiyacını giderir. Kim bir Müslümanın sıkıntısını giderirse Allah da kıyamet günündeki sıkıntılarından birini giderir. Kim bir Müslümanın kusurunu örterse Allah da kıyamet günü onun kusurunu örter."\n\nKaynak: Sahîh-i Buhârî, no. 2442 (Sahih)',
  },
  {
    weekNumber: 33,
    topic: "Anne-baba hakkı: En güzel ilgiyi kim hak eder?",
    arabic:
      "جَاءَ رَجُلٌ إِلَى رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ فَقَالَ: يَا رَسُولَ اللَّهِ، مَنْ أَحَقُّ بِحُسْنِ صَحَابَتِي؟ قَالَ: «أُمُّكَ». قَالَ: ثُمَّ مَنْ؟ قَالَ: «أُمُّكَ». قَالَ: ثُمَّ مَنْ؟ قَالَ: «أُمُّكَ». قَالَ: ثُمَّ مَنْ؟ قَالَ: «ثُمَّ أَبُوكَ».",
    turkish:
      "Bir adam Allah Resûlü’ne geldi ve: “Ey Allah’ın Resûlü! İnsanlar içinde güzel ilgime en çok kim hak sahibidir?” diye sordu. “Annen” buyurdu. “Sonra kim?” dedi. “Annen” buyurdu. “Sonra kim?” dedi. “Annen” buyurdu. Adam yine “Sonra kim?” deyince “Sonra baban” buyurdu.",
    source: "Sahîh-i Buhârî, no. 5971",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:5971",
    title: "Anne-baba hakkı: En güzel ilgiyi kim hak eder?",
    body: 'جَاءَ رَجُلٌ إِلَى رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ فَقَالَ: يَا رَسُولَ اللَّهِ، مَنْ أَحَقُّ بِحُسْنِ صَحَابَتِي؟ قَالَ: «أُمُّكَ». قَالَ: ثُمَّ مَنْ؟ قَالَ: «أُمُّكَ». قَالَ: ثُمَّ مَنْ؟ قَالَ: «أُمُّكَ». قَالَ: ثُمَّ مَنْ؟ قَالَ: «ثُمَّ أَبُوكَ».\n\nTürkçe Anlamı:\n"Bir adam Allah Resûlü’ne geldi ve: “Ey Allah’ın Resûlü! İnsanlar içinde güzel ilgime en çok kim hak sahibidir?” diye sordu. “Annen” buyurdu. “Sonra kim?” dedi. “Annen” buyurdu. “Sonra kim?” dedi. “Annen” buyurdu. Adam yine “Sonra kim?” deyince “Sonra baban” buyurdu."\n\nKaynak: Sahîh-i Buhârî, no. 5971 (Sahih)',
  },
  {
    weekNumber: 34,
    topic: "Öncelikler: Namaz, anne-baba ve fedakârlık",
    arabic:
      "سَأَلْتُ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ أَىُّ الْعَمَلِ أَحَبُّ إِلَى اللَّهِ قَالَ: «الصَّلاَةُ عَلَى وَقْتِهَا». قَالَ ثُمَّ أَىٌّ قَالَ: «ثُمَّ بِرُّ الْوَالِدَيْنِ». قَالَ ثُمَّ أَىٌّ قَالَ: «الْجِهَادُ فِي سَبِيلِ اللَّهِ». قَالَ حَدَّثَنِي بِهِنَّ وَلَوِ اسْتَزَدْتُهُ لَزَادَنِي.",
    turkish:
      "Abdullah b. Mes‘ûd, Peygamberimize “Allah’ın en sevdiği amel hangisidir?” diye sordu. “Namazı vaktinde kılmak” buyurdu. “Sonra hangisi?” dedi. “Anne-babaya iyilik etmek” buyurdu. “Sonra hangisi?” dedi. “Allah yolunda cihad etmek” buyurdu. Abdullah, daha fazla sorsaydı Peygamberimizin daha fazla cevap vereceğini de ekledi.",
    source: "Sahîh-i Buhârî, no. 527",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:527",
    title: "Öncelikler: Namaz, anne-baba ve fedakârlık",
    body: 'سَأَلْتُ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ أَىُّ الْعَمَلِ أَحَبُّ إِلَى اللَّهِ قَالَ: «الصَّلاَةُ عَلَى وَقْتِهَا». قَالَ ثُمَّ أَىٌّ قَالَ: «ثُمَّ بِرُّ الْوَالِدَيْنِ». قَالَ ثُمَّ أَىٌّ قَالَ: «الْجِهَادُ فِي سَبِيلِ اللَّهِ». قَالَ حَدَّثَنِي بِهِنَّ وَلَوِ اسْتَزَدْتُهُ لَزَادَنِي.\n\nTürkçe Anlamı:\n"Abdullah b. Mes‘ûd, Peygamberimize “Allah’ın en sevdiği amel hangisidir?” diye sordu. “Namazı vaktinde kılmak” buyurdu. “Sonra hangisi?” dedi. “Anne-babaya iyilik etmek” buyurdu. “Sonra hangisi?” dedi. “Allah yolunda cihad etmek” buyurdu. Abdullah, daha fazla sorsaydı Peygamberimizin daha fazla cevap vereceğini de ekledi."\n\nKaynak: Sahîh-i Buhârî, no. 527 (Sahih)',
  },
  {
    weekNumber: 35,
    topic: "Merhamet: Güçlü insanın kalbi katı değildir",
    arabic:
      "قَبَّلَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ الْحَسَنَ بْنَ عَلِيٍّ وَعِنْدَهُ الْأَقْرَعُ بْنُ حَابِسٍ التَّمِيمِيُّ جَالِسًا، فَقَالَ الْأَقْرَعُ: إِنَّ لِي عَشَرَةً مِنَ الْوَلَدِ مَا قَبَّلْتُ مِنْهُمْ أَحَدًا. فَنَظَرَ إِلَيْهِ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ ثُمَّ قَالَ: «مَنْ لَا يَرْحَمُ لَا يُرْحَمُ».",
    turkish:
      "Allah Resûlü, Hasan b. Ali’yi öptü. Yanında oturan Akra‘ b. Hâbis: “Benim on çocuğum var; hiçbirini öpmedim” dedi. Allah Resûlü ona baktı ve: “Merhamet etmeyene merhamet edilmez” buyurdu.",
    source: "Sahîh-i Buhârî, no. 5997",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:5997",
    title: "Merhamet: Güçlü insanın kalbi katı değildir",
    body: 'قَبَّلَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ الْحَسَنَ بْنَ عَلِيٍّ وَعِنْدَهُ الْأَقْرَعُ بْنُ حَابِسٍ التَّمِيمِيُّ جَالِسًا، فَقَالَ الْأَقْرَعُ: إِنَّ لِي عَشَرَةً مِنَ الْوَلَدِ مَا قَبَّلْتُ مِنْهُمْ أَحَدًا. فَنَظَرَ إِلَيْهِ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ ثُمَّ قَالَ: «مَنْ لَا يَرْحَمُ لَا يُرْحَمُ».\n\nTürkçe Anlamı:\n"Allah Resûlü, Hasan b. Ali’yi öptü. Yanında oturan Akra‘ b. Hâbis: “Benim on çocuğum var; hiçbirini öpmedim” dedi. Allah Resûlü ona baktı ve: “Merhamet etmeyene merhamet edilmez” buyurdu."\n\nKaynak: Sahîh-i Buhârî, no. 5997 (Sahih)',
  },
  {
    weekNumber: 36,
    topic: "Görünüş değil kalp ve amel",
    arabic:
      "إِنَّ اللَّهَ لَا يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ، وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ.",
    turkish:
      "Allah sizin dış görünüşlerinize ve mallarınıza bakmaz; kalplerinize ve amellerinize bakar.",
    source: "Sahîh-i Müslim, no. 2564c",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2564c",
    title: "Görünüş değil kalp ve amel",
    body: 'إِنَّ اللَّهَ لَا يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ، وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ.\n\nTürkçe Anlamı:\n"Allah sizin dış görünüşlerinize ve mallarınıza bakmaz; kalplerinize ve amellerinize bakar."\n\nKaynak: Sahîh-i Müslim, no. 2564c (Sahih)',
  },
  {
    weekNumber: 37,
    topic: "Zan, kıskançlık, takip ve sosyal ilişkiler",
    arabic:
      "إِيَّاكُمْ وَالظَّنَّ فَإِنَّ الظَّنَّ أَكْذَبُ الْحَدِيثِ، وَلَا تَحَسَّسُوا وَلَا تَجَسَّسُوا وَلَا تَنَافَسُوا وَلَا تَحَاسَدُوا وَلَا تَبَاغَضُوا وَلَا تَدَابَرُوا، وَكُونُوا عِبَادَ اللَّهِ إِخْوَانًا.",
    turkish:
      "Zandan sakının; çünkü zan, sözlerin en yalancısıdır. Birbirinizin gizli hâllerini araştırmayın, birbirinizi gözetlemeyin, kötü bir rekabete girmeyin, birbirinize haset etmeyin, kin tutmayın, birbirinize sırt çevirmeyin. Allah’ın kulları olarak kardeş olun.",
    source: "Sahîh-i Müslim, no. 2563a",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2563a",
    title: "Zan, kıskançlık, takip ve sosyal ilişkiler",
    body: 'إِيَّاكُمْ وَالظَّنَّ فَإِنَّ الظَّنَّ أَكْذَبُ الْحَدِيثِ، وَلَا تَحَسَّسُوا وَلَا تَجَسَّسُوا وَلَا تَنَافَسُوا وَلَا تَحَاسَدُوا وَلَا تَبَاغَضُوا وَلَا تَدَابَرُوا، وَكُونُوا عِبَادَ اللَّهِ إِخْوَانًا.\n\nTürkçe Anlamı:\n"Zandan sakının; çünkü zan, sözlerin en yalancısıdır. Birbirinizin gizli hâllerini araştırmayın, birbirinizi gözetlemeyin, kötü bir rekabete girmeyin, birbirinize haset etmeyin, kin tutmayın, birbirinize sırt çevirmeyin. Allah’ın kulları olarak kardeş olun."\n\nKaynak: Sahîh-i Müslim, no. 2563a (Sahih)',
  },
  {
    weekNumber: 38,
    topic: "Vermek, affetmek ve tevazu",
    arabic:
      "مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ، وَمَا زَادَ اللَّهُ عَبْدًا بِعَفْوٍ إِلَّا عِزًّا، وَمَا تَوَاضَعَ أَحَدٌ لِلَّهِ إِلَّا رَفَعَهُ اللَّهُ.",
    turkish:
      "Sadaka malı eksiltmez. Bir kul affettikçe Allah onun izzetini artırır. Kim Allah için tevazu gösterirse Allah onu yükseltir.",
    source: "Sahîh-i Müslim, no. 2588",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2588",
    title: "Vermek, affetmek ve tevazu",
    body: 'مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ، وَمَا زَادَ اللَّهُ عَبْدًا بِعَفْوٍ إِلَّا عِزًّا، وَمَا تَوَاضَعَ أَحَدٌ لِلَّهِ إِلَّا رَفَعَهُ اللَّهُ.\n\nTürkçe Anlamı:\n"Sadaka malı eksiltmez. Bir kul affettikçe Allah onun izzetini artırır. Kim Allah için tevazu gösterirse Allah onu yükseltir."\n\nKaynak: Sahîh-i Müslim, no. 2588 (Sahih)',
  },
  {
    weekNumber: 39,
    topic: "Sofra terbiyesi: Besmele, sağ el ve önünden yemek",
    arabic:
      "كُنْتُ غُلَامًا فِي حَجْرِ رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ وَكَانَتْ يَدِي تَطِيشُ فِي الصَّحْفَةِ، فَقَالَ لِي رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «يَا غُلَامُ، سَمِّ اللَّهَ، وَكُلْ بِيَمِينِكَ، وَكُلْ مِمَّا يَلِيكَ». فَمَا زَالَتْ تِلْكَ طِعْمَتِي بَعْدُ.",
    turkish:
      "Ömer b. Ebî Seleme anlatıyor: Çocukken Allah Resûlü’nün yanında bulunuyordum. Yemek yerken elim tabağın her tarafına gidiyordu. Allah Resûlü bana: “Yavrum! Allah’ın adını an, sağ elinle ye ve önünden ye” buyurdu. Bundan sonra hep böyle yedim.",
    source: "Sahîh-i Buhârî, no. 5376",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:5376",
    title: "Sofra terbiyesi: Besmele, sağ el ve önünden yemek",
    body: 'كُنْتُ غُلَامًا فِي حَجْرِ رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ وَكَانَتْ يَدِي تَطِيشُ فِي الصَّحْفَةِ، فَقَالَ لِي رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «يَا غُلَامُ، سَمِّ اللَّهَ، وَكُلْ بِيَمِينِكَ، وَكُلْ مِمَّا يَلِيكَ». فَمَا زَالَتْ تِلْكَ طِعْمَتِي بَعْدُ.\n\nTürkçe Anlamı:\n"Ömer b. Ebî Seleme anlatıyor: Çocukken Allah Resûlü’nün yanında bulunuyordum. Yemek yerken elim tabağın her tarafına gidiyordu. Allah Resûlü bana: “Yavrum! Allah’ın adını an, sağ elinle ye ve önünden ye” buyurdu. Bundan sonra hep böyle yedim."\n\nKaynak: Sahîh-i Buhârî, no. 5376 (Sahih)',
  },
  {
    weekNumber: 40,
    topic: "Yemeği ayıplamamak",
    arabic:
      "مَا عَابَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ طَعَامًا قَطُّ، إِنِ اشْتَهَاهُ أَكَلَهُ، وَإِنْ كَرِهَهُ تَرَكَهُ.",
    turkish: "Peygamberimiz hiçbir yemeği ayıplamazdı. İsterse yer, istemezse bırakırdı.",
    source: "Sahîh-i Buhârî, no. 5409",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:5409",
    title: "Yemeği ayıplamamak",
    body: 'مَا عَابَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ طَعَامًا قَطُّ، إِنِ اشْتَهَاهُ أَكَلَهُ، وَإِنْ كَرِهَهُ تَرَكَهُ.\n\nTürkçe Anlamı:\n"Peygamberimiz hiçbir yemeği ayıplamazdı. İsterse yer, istemezse bırakırdı."\n\nKaynak: Sahîh-i Buhârî, no. 5409 (Sahih)',
  },
  {
    weekNumber: 41,
    topic: "Yemekten ve içmekten sonra şükür",
    arabic:
      "إِنَّ اللَّهَ لَيَرْضَى عَنِ الْعَبْدِ أَنْ يَأْكُلَ الأَكْلَةَ فَيَحْمَدَهُ عَلَيْهَا أَوْ يَشْرَبَ الشَّرْبَةَ فَيَحْمَدَهُ عَلَيْهَا.",
    turkish:
      "Allah, kulunun bir şey yiyip bunun için O’na hamdetmesinden veya bir şey içip bunun için O’na hamdetmesinden razı olur.",
    source: "Sahîh-i Müslim, no. 2734a",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2734a",
    title: "Yemekten ve içmekten sonra şükür",
    body: 'إِنَّ اللَّهَ لَيَرْضَى عَنِ الْعَبْدِ أَنْ يَأْكُلَ الأَكْلَةَ فَيَحْمَدَهُ عَلَيْهَا أَوْ يَشْرَبَ الشَّرْبَةَ فَيَحْمَدَهُ عَلَيْهَا.\n\nTürkçe Anlamı:\n"Allah, kulunun bir şey yiyip bunun için O’na hamdetmesinden veya bir şey içip bunun için O’na hamdetmesinden razı olur."\n\nKaynak: Sahîh-i Müslim, no. 2734a (Sahih)',
  },
  {
    weekNumber: 42,
    topic: "Hapşırma: Dua ile birbirine iyilik dilemek",
    arabic:
      "إِذَا عَطَسَ أَحَدُكُمْ فَلْيَقُلِ الْحَمْدُ لِلَّهِ، وَلْيَقُلْ لَهُ أَخُوهُ أَوْ صَاحِبُهُ: يَرْحَمُكَ اللَّهُ، فَإِذَا قَالَ لَهُ يَرْحَمُكَ اللَّهُ فَلْيَقُلْ: يَهْدِيكُمُ اللَّهُ وَيُصْلِحُ بَالَكُمْ.",
    turkish:
      "Biriniz hapşırınca “Elhamdülillâh” desin. Kardeşi veya arkadaşı ona “Yerhamükellah - Allah sana merhamet etsin” desin. O da buna karşılık: “Yehdîkümullâhu ve yuslihu bâleküm - Allah size hidayet versin ve hâlinizi düzeltsin” desin.",
    source: "Sahîh-i Buhârî, no. 6224",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:6224",
    title: "Hapşırma: Dua ile birbirine iyilik dilemek",
    body: 'إِذَا عَطَسَ أَحَدُكُمْ فَلْيَقُلِ الْحَمْدُ لِلَّهِ، وَلْيَقُلْ لَهُ أَخُوهُ أَوْ صَاحِبُهُ: يَرْحَمُكَ اللَّهُ، فَإِذَا قَالَ لَهُ يَرْحَمُكَ اللَّهُ فَلْيَقُلْ: يَهْدِيكُمُ اللَّهُ وَيُصْلِحُ بَالَكُمْ.\n\nTürkçe Anlamı:\n"Biriniz hapşırınca “Elhamdülillâh” desin. Kardeşi veya arkadaşı ona “Yerhamükellah - Allah sana merhamet etsin” desin. O da buna karşılık: “Yehdîkümullâhu ve yuslihu bâleküm - Allah size hidayet versin ve hâlinizi düzeltsin” desin."\n\nKaynak: Sahîh-i Buhârî, no. 6224 (Sahih)',
  },
  {
    weekNumber: 43,
    topic: "İzin istemek: Israr etmemek",
    arabic: "إِذَا اسْتَأْذَنَ أَحَدُكُمْ ثَلاَثًا فَلَمْ يُؤْذَنْ لَهُ، فَلْيَرْجِعْ.",
    turkish: "Biriniz üç defa izin istediği hâlde kendisine izin verilmezse geri dönsün.",
    source: "Sahîh-i Buhârî, no. 6245",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:6245",
    title: "İzin istemek: Israr etmemek",
    body: 'إِذَا اسْتَأْذَنَ أَحَدُكُمْ ثَلاَثًا فَلَمْ يُؤْذَنْ لَهُ، فَلْيَرْجِعْ.\n\nTürkçe Anlamı:\n"Biriniz üç defa izin istediği hâlde kendisine izin verilmezse geri dönsün."\n\nKaynak: Sahîh-i Buhârî, no. 6245 (Sahih)',
  },
  {
    weekNumber: 44,
    topic: "Zaman ve sağlık: Kaybetmeden değerini bilmek",
    arabic: "نِعْمَتَانِ مَغْبُونٌ فِيهِمَا كَثِيرٌ مِنَ النَّاسِ: الصِّحَّةُ وَالْفَرَاغُ.",
    turkish:
      "İki nimet vardır ki insanların çoğu onların değerini bilmekte aldanır: Sağlık ve boş vakit.",
    source: "Sahîh-i Buhârî, no. 6412",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:6412",
    title: "Zaman ve sağlık: Kaybetmeden değerini bilmek",
    body: 'نِعْمَتَانِ مَغْبُونٌ فِيهِمَا كَثِيرٌ مِنَ النَّاسِ: الصِّحَّةُ وَالْفَرَاغُ.\n\nTürkçe Anlamı:\n"İki nimet vardır ki insanların çoğu onların değerini bilmekte aldanır: Sağlık ve boş vakit."\n\nKaynak: Sahîh-i Buhârî, no. 6412 (Sahih)',
  },
  {
    weekNumber: 45,
    topic: "Dünyada yolcu bilinci",
    arabic:
      "أَخَذَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ بِمَنْكِبِي فَقَالَ: «كُنْ فِي الدُّنْيَا كَأَنَّكَ غَرِيبٌ أَوْ عَابِرُ سَبِيلٍ». وَكَانَ ابْنُ عُمَرَ يَقُولُ: إِذَا أَمْسَيْتَ فَلَا تَنْتَظِرِ الصَّبَاحَ، وَإِذَا أَصْبَحْتَ فَلَا تَنْتَظِرِ الْمَسَاءَ، وَخُذْ مِنْ صِحَّتِكَ لِمَرَضِكَ، وَمِنْ حَيَاتِكَ لِمَوْتِكَ.",
    turkish:
      "Abdullah b. Ömer anlatıyor: Allah Resûlü omzumdan tuttu ve: “Dünyada bir garip veya bir yolcu gibi ol” buyurdu. İbn Ömer de şöyle derdi: “Akşama çıktığında sabahı bekleme; sabaha çıktığında akşamı bekleme. Sağlığından hastalığın için, hayatından ölümün için pay ayır.”",
    source: "Sahîh-i Buhârî, no. 6416",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:6416",
    title: "Dünyada yolcu bilinci",
    body: 'أَخَذَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ بِمَنْكِبِي فَقَالَ: «كُنْ فِي الدُّنْيَا كَأَنَّكَ غَرِيبٌ أَوْ عَابِرُ سَبِيلٍ». وَكَانَ ابْنُ عُمَرَ يَقُولُ: إِذَا أَمْسَيْتَ فَلَا تَنْتَظِرِ الصَّبَاحَ، وَإِذَا أَصْبَحْتَ فَلَا تَنْتَظِرِ الْمَسَاءَ، وَخُذْ مِنْ صِحَّتِكَ لِمَرَضِكَ، وَمِنْ حَيَاتِكَ لِمَوْتِكَ.\n\nTürkçe Anlamı:\n"Abdullah b. Ömer anlatıyor: Allah Resûlü omzumdan tuttu ve: “Dünyada bir garip veya bir yolcu gibi ol” buyurdu. İbn Ömer de şöyle derdi: “Akşama çıktığında sabahı bekleme; sabaha çıktığında akşamı bekleme. Sağlığından hastalığın için, hayatından ölümün için pay ayır.”"\n\nKaynak: Sahîh-i Buhârî, no. 6416 (Sahih)',
  },
  {
    weekNumber: 46,
    topic: "Az da olsa devamlı amel",
    arabic:
      "سَدِّدُوا وَقَارِبُوا، وَاعْلَمُوا أَنْ لَنْ يُدْخِلَ أَحَدَكُمْ عَمَلُهُ الْجَنَّةَ، وَأَنَّ أَحَبَّ الأَعْمَالِ أَدْوَمُهَا إِلَى اللَّهِ، وَإِنْ قَلَّ.",
    turkish:
      "Doğruyu hedefleyin ve gücünüz yettiğince ona yaklaşın. Şunu bilin ki hiçbiriniz yalnız ameli sayesinde cennete giremez. Allah’ın en sevdiği amel, az da olsa en devamlı olandır.",
    source: "Sahîh-i Buhârî, no. 6464",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:6464",
    title: "Az da olsa devamlı amel",
    body: 'سَدِّدُوا وَقَارِبُوا، وَاعْلَمُوا أَنْ لَنْ يُدْخِلَ أَحَدَكُمْ عَمَلُهُ الْجَنَّةَ، وَأَنَّ أَحَبَّ الأَعْمَالِ أَدْوَمُهَا إِلَى اللَّهِ، وَإِنْ قَلَّ.\n\nTürkçe Anlamı:\n"Doğruyu hedefleyin ve gücünüz yettiğince ona yaklaşın. Şunu bilin ki hiçbiriniz yalnız ameli sayesinde cennete giremez. Allah’ın en sevdiği amel, az da olsa en devamlı olandır."\n\nKaynak: Sahîh-i Buhârî, no. 6464 (Sahih)',
  },
  {
    weekNumber: 47,
    topic: "Dile hafif, terazide ağır iki zikir",
    arabic:
      "كَلِمَتَانِ خَفِيفَتَانِ عَلَى اللِّسَانِ، ثَقِيلَتَانِ فِي الْمِيزَانِ، حَبِيبَتَانِ إِلَى الرَّحْمَنِ، سُبْحَانَ اللَّهِ الْعَظِيمِ، سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.",
    turkish:
      "Dile hafif, mizanda ağır ve Rahmân’a sevgili iki söz vardır: “Sübhânallâhi’l-azîm” ve “Sübhânallâhi ve bihamdihî.”",
    source: "Sahîh-i Buhârî, no. 6406",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:6406",
    title: "Dile hafif, terazide ağır iki zikir",
    body: 'كَلِمَتَانِ خَفِيفَتَانِ عَلَى اللِّسَانِ، ثَقِيلَتَانِ فِي الْمِيزَانِ، حَبِيبَتَانِ إِلَى الرَّحْمَنِ، سُبْحَانَ اللَّهِ الْعَظِيمِ، سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.\n\nTürkçe Anlamı:\n"Dile hafif, mizanda ağır ve Rahmân’a sevgili iki söz vardır: “Sübhânallâhi’l-azîm” ve “Sübhânallâhi ve bihamdihî.”"\n\nKaynak: Sahîh-i Buhârî, no. 6406 (Sahih)',
  },
  {
    weekNumber: 48,
    topic: "Temizlik, namaz, sadaka, sabır ve Kur’ân",
    arabic:
      "الطُّهُورُ شَطْرُ الْإِيمَانِ، وَالْحَمْدُ لِلَّهِ تَمْلَأُ الْمِيزَانَ، وَسُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ تَمْلَآنِ - أَوْ تَمْلَأُ - مَا بَيْنَ السَّمَاوَاتِ وَالْأَرْضِ، وَالصَّلَاةُ نُورٌ، وَالصَّدَقَةُ بُرْهَانٌ، وَالصَّبْرُ ضِيَاءٌ، وَالْقُرْآنُ حُجَّةٌ لَكَ أَوْ عَلَيْكَ، كُلُّ النَّاسِ يَغْدُو فَبَائِعٌ نَفْسَهُ فَمُعْتِقُهَا أَوْ مُوبِقُهَا.",
    turkish:
      "Taharet, yani temizlik, imanın yarısıdır. “Elhamdülillâh” mizânı doldurur. “Sübhânallah” ve “Elhamdülillâh” göklerle yer arasını doldurur. Namaz bir nurdur; sadaka bir delildir; sabır bir aydınlıktır. Kur’ân senin lehine veya aleyhine bir delildir. Her insan sabahleyin çıkar ve kendi nefsini bir yöne satar: Kimi onu özgürleştirir, kimi de helâke götürür.",
    source: "Sahîh-i Müslim, no. 223",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:223",
    title: "Temizlik, namaz, sadaka, sabır ve Kur’ân",
    body: 'الطُّهُورُ شَطْرُ الْإِيمَانِ، وَالْحَمْدُ لِلَّهِ تَمْلَأُ الْمِيزَانَ، وَسُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ تَمْلَآنِ - أَوْ تَمْلَأُ - مَا بَيْنَ السَّمَاوَاتِ وَالْأَرْضِ، وَالصَّلَاةُ نُورٌ، وَالصَّدَقَةُ بُرْهَانٌ، وَالصَّبْرُ ضِيَاءٌ، وَالْقُرْآنُ حُجَّةٌ لَكَ أَوْ عَلَيْكَ، كُلُّ النَّاسِ يَغْدُو فَبَائِعٌ نَفْسَهُ فَمُعْتِقُهَا أَوْ مُوبِقُهَا.\n\nTürkçe Anlamı:\n"Taharet, yani temizlik, imanın yarısıdır. “Elhamdülillâh” mizânı doldurur. “Sübhânallah” ve “Elhamdülillâh” göklerle yer arasını doldurur. Namaz bir nurdur; sadaka bir delildir; sabır bir aydınlıktır. Kur’ân senin lehine veya aleyhine bir delildir. Her insan sabahleyin çıkar ve kendi nefsini bir yöne satar: Kimi onu özgürleştirir, kimi de helâke götürür."\n\nKaynak: Sahîh-i Müslim, no. 223 (Sahih)',
  },
  {
    weekNumber: 49,
    topic: "İyiliğe yol göstermek de iyiliktir",
    arabic:
      "جَاءَ رَجُلٌ إِلَى النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ فَقَالَ إِنِّي أُبْدِعَ بِي فَاحْمِلْنِي فَقَالَ: «مَا عِنْدِي». فَقَالَ رَجُلٌ يَا رَسُولَ اللَّهِ أَنَا أَدُلُّهُ عَلَى مَنْ يَحْمِلُهُ فَقَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «مَنْ دَلَّ عَلَى خَيْرٍ فَلَهُ مِثْلُ أَجْرِ فَاعِلِهِ».",
    turkish:
      "Bir adam Peygamberimize gelip bineğinin kalmadığını söyleyerek yardım istedi. Peygamberimiz yanında verecek bir şey olmadığını söyledi. Başka biri, ona yardımcı olabilecek birini gösterebileceğini söyledi. Bunun üzerine Peygamberimiz: “Bir iyiliğe yol gösteren, onu yapanın sevabı kadar sevap alır” buyurdu.",
    source: "Sahîh-i Müslim, no. 1893a",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:1893a",
    title: "İyiliğe yol göstermek de iyiliktir",
    body: 'جَاءَ رَجُلٌ إِلَى النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ فَقَالَ إِنِّي أُبْدِعَ بِي فَاحْمِلْنِي فَقَالَ: «مَا عِنْدِي». فَقَالَ رَجُلٌ يَا رَسُولَ اللَّهِ أَنَا أَدُلُّهُ عَلَى مَنْ يَحْمِلُهُ فَقَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «مَنْ دَلَّ عَلَى خَيْرٍ فَلَهُ مِثْلُ أَجْرِ فَاعِلِهِ».\n\nTürkçe Anlamı:\n"Bir adam Peygamberimize gelip bineğinin kalmadığını söyleyerek yardım istedi. Peygamberimiz yanında verecek bir şey olmadığını söyledi. Başka biri, ona yardımcı olabilecek birini gösterebileceğini söyledi. Bunun üzerine Peygamberimiz: “Bir iyiliğe yol gösteren, onu yapanın sevabı kadar sevap alır” buyurdu."\n\nKaynak: Sahîh-i Müslim, no. 1893a (Sahih)',
  },
  {
    weekNumber: 50,
    topic: "Öldükten sonra da devam eden üç iyilik",
    arabic:
      "إِذَا مَاتَ الإِنْسَانُ انْقَطَعَ عَنْهُ عَمَلُهُ إِلاَّ مِنْ ثَلاَثَةٍ إِلاَّ مِنْ صَدَقَةٍ جَارِيَةٍ أَوْ عِلْمٍ يُنْتَفَعُ بِهِ أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ.",
    turkish:
      "İnsan öldüğünde ameli kesilir; ancak üç şey devam eder: devam eden bir sadaka, insanların faydalandığı bir ilim ve kendisine dua eden hayırlı bir evlat.",
    source: "Sahîh-i Müslim, no. 1631",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:1631",
    title: "Öldükten sonra da devam eden üç iyilik",
    body: 'إِذَا مَاتَ الإِنْسَانُ انْقَطَعَ عَنْهُ عَمَلُهُ إِلاَّ مِنْ ثَلاَثَةٍ إِلاَّ مِنْ صَدَقَةٍ جَارِيَةٍ أَوْ عِلْمٍ يُنْتَفَعُ بِهِ أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ.\n\nTürkçe Anlamı:\n"İnsan öldüğünde ameli kesilir; ancak üç şey devam eder: devam eden bir sadaka, insanların faydalandığı bir ilim ve kendisine dua eden hayırlı bir evlat."\n\nKaynak: Sahîh-i Müslim, no. 1631 (Sahih)',
  },
  {
    weekNumber: 51,
    topic: "Doğru bilgiyi taşımak ve Peygamberimiz adına söz uydurmamak",
    arabic:
      "بَلِّغُوا عَنِّي وَلَوْ آيَةً، وَحَدِّثُوا عَنْ بَنِي إِسْرَائِيلَ وَلَا حَرَجَ، وَمَنْ كَذَبَ عَلَيَّ مُتَعَمِّدًا فَلْيَتَبَوَّأْ مَقْعَدَهُ مِنَ النَّارِ.",
    turkish:
      "Benden bir âyet bile olsa başkalarına ulaştırın. İsrâiloğullarından da nakilde bulunabilirsiniz; bunda bir sakınca yoktur. Fakat kim benim adıma bile bile yalan söylerse cehennemdeki yerine hazırlansın.",
    source: "Sahîh-i Buhârî, no. 3461",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:3461",
    title: "Doğru bilgiyi taşımak ve Peygamberimiz adına söz uydurmamak",
    body: 'بَلِّغُوا عَنِّي وَلَوْ آيَةً، وَحَدِّثُوا عَنْ بَنِي إِسْرَائِيلَ وَلَا حَرَجَ، وَمَنْ كَذَبَ عَلَيَّ مُتَعَمِّدًا فَلْيَتَبَوَّأْ مَقْعَدَهُ مِنَ النَّارِ.\n\nTürkçe Anlamı:\n"Benden bir âyet bile olsa başkalarına ulaştırın. İsrâiloğullarından da nakilde bulunabilirsiniz; bunda bir sakınca yoktur. Fakat kim benim adıma bile bile yalan söylerse cehennemdeki yerine hazırlansın."\n\nKaynak: Sahîh-i Buhârî, no. 3461 (Sahih)',
  },
  {
    weekNumber: 52,
    topic: "Küçük bir hediyeyi küçümsememek",
    arabic:
      "يَا نِسَاءَ الْمُسْلِمَاتِ لاَ تَحْقِرَنَّ جَارَةٌ لِجَارَتِهَا وَلَوْ فِرْسِنَ شَاةٍ.",
    turkish:
      "Ey Müslüman kadınlar! Bir komşu, komşusunun vereceği hediyeyi -koyun paçası kadar küçük olsa bile- küçümsemesin.",
    source: "Sahîh-i Buhârî, no. 6017",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:6017",
    title: "Küçük bir hediyeyi küçümsememek",
    body: 'يَا نِسَاءَ الْمُسْلِمَاتِ لاَ تَحْقِرَنَّ جَارَةٌ لِجَارَتِهَا وَلَوْ فِرْسِنَ شَاةٍ.\n\nTürkçe Anlamı:\n"Ey Müslüman kadınlar! Bir komşu, komşusunun vereceği hediyeyi -koyun paçası kadar küçük olsa bile- küçümsemesin."\n\nKaynak: Sahîh-i Buhârî, no. 6017 (Sahih)',
  },
  {
    weekNumber: 53,
    topic: "İlim, yardımlaşma ve Kur’ân halkası",
    arabic:
      "مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا نَفَّسَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ وَمَنْ يَسَّرَ عَلَى مُعْسِرٍ يَسَّرَ اللَّهُ عَلَيْهِ فِي الدُّنْيَا وَالآخِرَةِ وَمَنْ سَتَرَ مُسْلِمًا سَتَرَهُ اللَّهُ فِي الدُّنْيَا وَالآخِرَةِ وَاللَّهُ فِي عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِي عَوْنِ أَخِيهِ وَمَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ وَمَا اجْتَمَعَ قَوْمٌ فِي بَيْتٍ مِنْ بُيُوتِ اللَّهِ يَتْلُونَ كِتَابَ اللَّهِ وَيَتَدَارَسُونَهُ بَيْنَهُمْ إِلاَّ نَزَلَتْ عَلَيْهِمُ السَّكِينَةُ وَغَشِيَتْهُمُ الرَّحْمَةُ وَحَفَّتْهُمُ الْمَلاَئِكَةُ وَذَكَرَهُمُ اللَّهُ فِيمَنْ عِنْدَهُ وَمَنْ بَطَّأَ بِهِ عَمَلُهُ لَمْ يُسْرِعْ بِهِ نَسَبُهُ.",
    turkish:
      "Kim bir müminin dünya sıkıntılarından birini giderirse Allah da onun kıyamet günü sıkıntılarından birini giderir. Kim zor durumda olana kolaylık sağlarsa Allah da ona dünyada ve âhirette kolaylık sağlar. Kim bir Müslümanın kusurunu örterse Allah da onun kusurunu dünyada ve âhirette örter. Kul, kardeşine yardım ettiği sürece Allah da ona yardım eder. Kim ilim aramak için bir yola girerse Allah ona cennete giden yolu kolaylaştırır. Bir topluluk Allah’ın evlerinden birinde toplanıp Allah’ın kitabını okur ve aralarında müzakere ederse üzerlerine huzur iner, onları rahmet kaplar, melekler kuşatır ve Allah onları katındakilere anar. Ameli kendisini geri bırakan kişiyi soyu ileri götüremez.",
    source: "Sahîh-i Müslim, no. 2699a",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2699a",
    title: "İlim, yardımlaşma ve Kur’ân halkası",
    body: 'مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا نَفَّسَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ وَمَنْ يَسَّرَ عَلَى مُعْسِرٍ يَسَّرَ اللَّهُ عَلَيْهِ فِي الدُّنْيَا وَالآخِرَةِ وَمَنْ سَتَرَ مُسْلِمًا سَتَرَهُ اللَّهُ فِي الدُّنْيَا وَالآخِرَةِ وَاللَّهُ فِي عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِي عَوْنِ أَخِيهِ وَمَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ وَمَا اجْتَمَعَ قَوْمٌ فِي بَيْتٍ مِنْ بُيُوتِ اللَّهِ يَتْلُونَ كِتَابَ اللَّهِ وَيَتَدَارَسُونَهُ بَيْنَهُمْ إِلاَّ نَزَلَتْ عَلَيْهِمُ السَّكِينَةُ وَغَشِيَتْهُمُ الرَّحْمَةُ وَحَفَّتْهُمُ الْمَلاَئِكَةُ وَذَكَرَهُمُ اللَّهُ فِيمَنْ عِنْدَهُ وَمَنْ بَطَّأَ بِهِ عَمَلُهُ لَمْ يُسْرِعْ بِهِ نَسَبُهُ.\n\nTürkçe Anlamı:\n"Kim bir müminin dünya sıkıntılarından birini giderirse Allah da onun kıyamet günü sıkıntılarından birini giderir. Kim zor durumda olana kolaylık sağlarsa Allah da ona dünyada ve âhirette kolaylık sağlar. Kim bir Müslümanın kusurunu örterse Allah da onun kusurunu dünyada ve âhirette örter. Kul, kardeşine yardım ettiği sürece Allah da ona yardım eder. Kim ilim aramak için bir yola girerse Allah ona cennete giden yolu kolaylaştırır. Bir topluluk Allah’ın evlerinden birinde toplanıp Allah’ın kitabını okur ve aralarında müzakere ederse üzerlerine huzur iner, onları rahmet kaplar, melekler kuşatır ve Allah onları katındakilere anar. Ameli kendisini geri bırakan kişiyi soyu ileri götüremez."\n\nKaynak: Sahîh-i Müslim, no. 2699a (Sahih)',
  },
  {
    weekNumber: 54,
    topic: "İki güzel imrenme: İmkânı ve bilgiyi hayırda kullanmak",
    arabic:
      "لاَ حَسَدَ إِلاَّ فِي اثْنَتَيْنِ رَجُلٌ آتَاهُ اللَّهُ مَالاً فَسُلِّطَ عَلَى هَلَكَتِهِ فِي الْحَقِّ، وَرَجُلٌ آتَاهُ اللَّهُ الْحِكْمَةَ، فَهْوَ يَقْضِي بِهَا وَيُعَلِّمُهَا.",
    turkish:
      "Ancak iki kişiye imrenilir: Allah’ın mal verdiği ve onu hak yolunda harcayan kişi; Allah’ın hikmet verdiği, onunla hükmeden ve onu başkalarına öğreten kişi.",
    source: "Sahîh-i Buhârî, no. 73",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:73",
    title: "İki güzel imrenme: İmkânı ve bilgiyi hayırda kullanmak",
    body: 'لاَ حَسَدَ إِلاَّ فِي اثْنَتَيْنِ رَجُلٌ آتَاهُ اللَّهُ مَالاً فَسُلِّطَ عَلَى هَلَكَتِهِ فِي الْحَقِّ، وَرَجُلٌ آتَاهُ اللَّهُ الْحِكْمَةَ، فَهْوَ يَقْضِي بِهَا وَيُعَلِّمُهَا.\n\nTürkçe Anlamı:\n"Ancak iki kişiye imrenilir: Allah’ın mal verdiği ve onu hak yolunda harcayan kişi; Allah’ın hikmet verdiği, onunla hükmeden ve onu başkalarına öğreten kişi."\n\nKaynak: Sahîh-i Buhârî, no. 73 (Sahih)',
  },
  {
    weekNumber: 55,
    topic: "Müminin iki hâli: Şükür ve sabır",
    arabic:
      "عَجَبًا لأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ وَلَيْسَ ذَاكَ لأَحَدٍ إِلاَّ لِلْمُؤْمِنِ إِنْ أَصَابَتْهُ سَرَّاءُ شَكَرَ فَكَانَ خَيْرًا لَهُ وَإِنْ أَصَابَتْهُ ضَرَّاءُ صَبَرَ فَكَانَ خَيْرًا لَهُ.",
    turkish:
      "Müminin hâli ne şaşırtıcıdır! Onun her işi kendisi için hayırdır; bu özellik yalnız mümine aittir. Sevindirici bir durumla karşılaşırsa şükreder, bu onun için hayır olur. Bir sıkıntıyla karşılaşırsa sabreder, bu da onun için hayır olur.",
    source: "Sahîh-i Müslim, no. 2999",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2999",
    title: "Müminin iki hâli: Şükür ve sabır",
    body: 'عَجَبًا لأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ وَلَيْسَ ذَاكَ لأَحَدٍ إِلاَّ لِلْمُؤْمِنِ إِنْ أَصَابَتْهُ سَرَّاءُ شَكَرَ فَكَانَ خَيْرًا لَهُ وَإِنْ أَصَابَتْهُ ضَرَّاءُ صَبَرَ فَكَانَ خَيْرًا لَهُ.\n\nTürkçe Anlamı:\n"Müminin hâli ne şaşırtıcıdır! Onun her işi kendisi için hayırdır; bu özellik yalnız mümine aittir. Sevindirici bir durumla karşılaşırsa şükreder, bu onun için hayır olur. Bir sıkıntıyla karşılaşırsa sabreder, bu da onun için hayır olur."\n\nKaynak: Sahîh-i Müslim, no. 2999 (Sahih)',
  },
] as const;

/**
 * Lise (4., 5. ve 6. Sınıflar) için 55 haftalık Hadis programı
 * Kaynak: mufredat-docs/hadis/LISE_55_HAFTALIK_HADIS_PROGRAMI_FINAL.docx
 */
export const liseHadisCurriculum: readonly HadisCurriculumItem[] = [
  {
    weekNumber: 1,
    topic: "Niyet: Bir işi neden yapıyorum?",
    arabic:
      "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ.",
    turkish:
      "Ameller niyetlere göredir. Her insan için ancak niyet ettiği vardır. Kimin hicreti elde edeceği bir dünya menfaati veya evleneceği bir kadın için ise, onun hicreti de hicret ettiği şey içindir.",
    source: "Sahîh-i Buhârî, no. 1",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:1",
    title: "Niyet: Bir işi neden yapıyorum?",
    body: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ.\n\nTürkçe Anlamı:\n"Ameller niyetlere göredir. Her insan için ancak niyet ettiği vardır. Kimin hicreti elde edeceği bir dünya menfaati veya evleneceği bir kadın için ise, onun hicreti de hicret ettiği şey içindir."\n\nKaynak: Sahîh-i Buhârî, no. 1 (Sahih)',
  },
  {
    weekNumber: 2,
    topic: "İslâm’ın beş temel direği",
    arabic:
      "بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلاَةِ، وَإِيتَاءِ الزَّكَاةِ، وَالْحَجِّ، وَصَوْمِ رَمَضَانَ.",
    turkish:
      "İslâm beş temel üzerine kurulmuştur: Allah’tan başka ilâh olmadığına ve Muhammed’in Allah’ın Resûlü olduğuna şehadet etmek, namazı kılmak, zekâtı vermek, haccetmek ve Ramazan orucunu tutmak.",
    source: "Sahîh-i Buhârî, no. 8",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:8",
    title: "İslâm’ın beş temel direği",
    body: 'بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلاَةِ، وَإِيتَاءِ الزَّكَاةِ، وَالْحَجِّ، وَصَوْمِ رَمَضَانَ.\n\nTürkçe Anlamı:\n"İslâm beş temel üzerine kurulmuştur: Allah’tan başka ilâh olmadığına ve Muhammed’in Allah’ın Resûlü olduğuna şehadet etmek, namazı kılmak, zekâtı vermek, haccetmek ve Ramazan orucunu tutmak."\n\nKaynak: Sahîh-i Buhârî, no. 8 (Sahih)',
  },
  {
    weekNumber: 3,
    topic: "Helâl, haram ve şüpheli alanlar: Kalbi korumak",
    arabic:
      "الْحَلَالُ بَيِّنٌ وَالْحَرَامُ بَيِّنٌ، وَبَيْنَهُمَا مُشَبَّهَاتٌ لَا يَعْلَمُهَا كَثِيرٌ مِنَ النَّاسِ، فَمَنِ اتَّقَى الْمُشَبَّهَاتِ اسْتَبْرَأَ لِدِينِهِ وَعِرْضِهِ، وَمَنْ وَقَعَ فِي الشُّبُهَاتِ كَرَاعٍ يَرْعَى حَوْلَ الْحِمَى يُوشِكُ أَنْ يُوَاقِعَهُ. أَلَا وَإِنَّ لِكُلِّ مَلِكٍ حِمًى، أَلَا إِنَّ حِمَى اللَّهِ فِي أَرْضِهِ مَحَارِمُهُ، أَلَا وَإِنَّ فِي الْجَسَدِ مُضْغَةً إِذَا صَلَحَتْ صَلَحَ الْجَسَدُ كُلُّهُ، وَإِذَا فَسَدَتْ فَسَدَ الْجَسَدُ كُلُّهُ، أَلَا وَهِيَ الْقَلْبُ.",
    turkish:
      "Helâl bellidir, haram da bellidir. İkisinin arasında insanların çoğunun hükmünü bilmediği şüpheli şeyler vardır. Şüpheli şeylerden sakınan kişi dinini ve onurunu korumuş olur. Şüpheli şeylere giren kişi ise koruluğun çevresinde sürüsünü otlatan çoban gibidir; neredeyse içine düşecektir. Dikkat edin: Her hükümdarın bir koruluğu vardır. Allah’ın yeryüzündeki koruluğu da haram kıldığı şeylerdir. Dikkat edin: Bedende bir et parçası vardır; o düzgün olursa bütün beden düzgün olur, o bozulursa bütün beden bozulur. İşte o kalptir.",
    source: "Sahîh-i Buhârî, no. 52",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:52",
    title: "Helâl, haram ve şüpheli alanlar: Kalbi korumak",
    body: 'الْحَلَالُ بَيِّنٌ وَالْحَرَامُ بَيِّنٌ، وَبَيْنَهُمَا مُشَبَّهَاتٌ لَا يَعْلَمُهَا كَثِيرٌ مِنَ النَّاسِ، فَمَنِ اتَّقَى الْمُشَبَّهَاتِ اسْتَبْرَأَ لِدِينِهِ وَعِرْضِهِ، وَمَنْ وَقَعَ فِي الشُّبُهَاتِ كَرَاعٍ يَرْعَى حَوْلَ الْحِمَى يُوشِكُ أَنْ يُوَاقِعَهُ. أَلَا وَإِنَّ لِكُلِّ مَلِكٍ حِمًى، أَلَا إِنَّ حِمَى اللَّهِ فِي أَرْضِهِ مَحَارِمُهُ، أَلَا وَإِنَّ فِي الْجَسَدِ مُضْغَةً إِذَا صَلَحَتْ صَلَحَ الْجَسَدُ كُلُّهُ، وَإِذَا فَسَدَتْ فَسَدَ الْجَسَدُ كُلُّهُ، أَلَا وَهِيَ الْقَلْبُ.\n\nTürkçe Anlamı:\n"Helâl bellidir, haram da bellidir. İkisinin arasında insanların çoğunun hükmünü bilmediği şüpheli şeyler vardır. Şüpheli şeylerden sakınan kişi dinini ve onurunu korumuş olur. Şüpheli şeylere giren kişi ise koruluğun çevresinde sürüsünü otlatan çoban gibidir; neredeyse içine düşecektir. Dikkat edin: Her hükümdarın bir koruluğu vardır. Allah’ın yeryüzündeki koruluğu da haram kıldığı şeylerdir. Dikkat edin: Bedende bir et parçası vardır; o düzgün olursa bütün beden düzgün olur, o bozulursa bütün beden bozulur. İşte o kalptir."\n\nKaynak: Sahîh-i Buhârî, no. 52 (Sahih)',
  },
  {
    weekNumber: 4,
    topic: "İmanın tadı: Allah sevgisi ve Allah için sevmek",
    arabic:
      "ثَلاَثٌ مَنْ كُنَّ فِيهِ وَجَدَ حَلاَوَةَ الإِيمَانِ أَنْ يَكُونَ اللَّهُ وَرَسُولُهُ أَحَبَّ إِلَيْهِ مِمَّا سِوَاهُمَا، وَأَنْ يُحِبَّ الْمَرْءَ لاَ يُحِبُّهُ إِلاَّ لِلَّهِ، وَأَنْ يَكْرَهَ أَنْ يَعُودَ فِي الْكُفْرِ كَمَا يَكْرَهُ أَنْ يُقْذَفَ فِي النَّارِ.",
    turkish:
      "Şu üç özellik kimde bulunursa imanın tadını hisseder: Allah ve Resûlü’nü her şeyden daha çok sevmek; bir insanı yalnız Allah için sevmek; imandan uzaklaşmayı ateşe atılmak kadar kötü görmek.",
    source: "Sahîh-i Buhârî, no. 16",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:16",
    title: "İmanın tadı: Allah sevgisi ve Allah için sevmek",
    body: 'ثَلاَثٌ مَنْ كُنَّ فِيهِ وَجَدَ حَلاَوَةَ الإِيمَانِ أَنْ يَكُونَ اللَّهُ وَرَسُولُهُ أَحَبَّ إِلَيْهِ مِمَّا سِوَاهُمَا، وَأَنْ يُحِبَّ الْمَرْءَ لاَ يُحِبُّهُ إِلاَّ لِلَّهِ، وَأَنْ يَكْرَهَ أَنْ يَعُودَ فِي الْكُفْرِ كَمَا يَكْرَهُ أَنْ يُقْذَفَ فِي النَّارِ.\n\nTürkçe Anlamı:\n"Şu üç özellik kimde bulunursa imanın tadını hisseder: Allah ve Resûlü’nü her şeyden daha çok sevmek; bir insanı yalnız Allah için sevmek; imandan uzaklaşmayı ateşe atılmak kadar kötü görmek."\n\nKaynak: Sahîh-i Buhârî, no. 16 (Sahih)',
  },
  {
    weekNumber: 5,
    topic: "Dinde denge: Zorlaştırmadan devam etmek",
    arabic:
      "إِنَّ الدِّينَ يُسْرٌ، وَلَنْ يُشَادَّ الدِّينَ أَحَدٌ إِلاَّ غَلَبَهُ، فَسَدِّدُوا وَقَارِبُوا وَأَبْشِرُوا، وَاسْتَعِينُوا بِالْغَدْوَةِ وَالرَّوْحَةِ وَشَىْءٍ مِنَ الدُّلْجَةِ.",
    turkish:
      "Din kolaylıktır. Dini kendisi için aşırı zorlaştıran kimse buna devam edemez. Bu yüzden doğruyu hedefleyin, gücünüz yettiğince ona yaklaşın ve ümitli olun. Sabah, akşam ve gecenin bir bölümünü değerlendirerek güç kazanın.",
    source: "Sahîh-i Buhârî, no. 39",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:39",
    title: "Dinde denge: Zorlaştırmadan devam etmek",
    body: 'إِنَّ الدِّينَ يُسْرٌ، وَلَنْ يُشَادَّ الدِّينَ أَحَدٌ إِلاَّ غَلَبَهُ، فَسَدِّدُوا وَقَارِبُوا وَأَبْشِرُوا، وَاسْتَعِينُوا بِالْغَدْوَةِ وَالرَّوْحَةِ وَشَىْءٍ مِنَ الدُّلْجَةِ.\n\nTürkçe Anlamı:\n"Din kolaylıktır. Dini kendisi için aşırı zorlaştıran kimse buna devam edemez. Bu yüzden doğruyu hedefleyin, gücünüz yettiğince ona yaklaşın ve ümitli olun. Sabah, akşam ve gecenin bir bölümünü değerlendirerek güç kazanın."\n\nKaynak: Sahîh-i Buhârî, no. 39 (Sahih)',
  },
  {
    weekNumber: 6,
    topic: "Dini doğru anlamak büyük bir hayırdır",
    arabic:
      "مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ، وَإِنَّمَا أَنَا قَاسِمٌ وَاللَّهُ يُعْطِي، وَلَنْ تَزَالَ هَذِهِ الأُمَّةُ قَائِمَةً عَلَى أَمْرِ اللَّهِ لاَ يَضُرُّهُمْ مَنْ خَالَفَهُمْ حَتَّى يَأْتِيَ أَمْرُ اللَّهِ.",
    turkish:
      "Allah kimin hakkında hayır dilerse ona dini doğru anlama kabiliyeti verir. Ben ancak paylaştırırım; asıl veren Allah’tır. Bu ümmetten bir topluluk Allah’ın emrine bağlı kalmaya devam edecek; Allah’ın emri gelinceye kadar onlara karşı çıkanlar kendilerine zarar veremeyecektir.",
    source: "Sahîh-i Buhârî, no. 71",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:71",
    title: "Dini doğru anlamak büyük bir hayırdır",
    body: 'مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ، وَإِنَّمَا أَنَا قَاسِمٌ وَاللَّهُ يُعْطِي، وَلَنْ تَزَالَ هَذِهِ الأُمَّةُ قَائِمَةً عَلَى أَمْرِ اللَّهِ لاَ يَضُرُّهُمْ مَنْ خَالَفَهُمْ حَتَّى يَأْتِيَ أَمْرُ اللَّهِ.\n\nTürkçe Anlamı:\n"Allah kimin hakkında hayır dilerse ona dini doğru anlama kabiliyeti verir. Ben ancak paylaştırırım; asıl veren Allah’tır. Bu ümmetten bir topluluk Allah’ın emrine bağlı kalmaya devam edecek; Allah’ın emri gelinceye kadar onlara karşı çıkanlar kendilerine zarar veremeyecektir."\n\nKaynak: Sahîh-i Buhârî, no. 71 (Sahih)',
  },
  {
    weekNumber: 7,
    topic: "Kur’ân: Öğrenmek ve öğretmek",
    arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ.",
    turkish: "Sizin en hayırlınız, Kur’ân’ı öğrenen ve onu öğretendir.",
    source: "Sahîh-i Buhârî, no. 5027",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:5027",
    title: "Kur’ân: Öğrenmek ve öğretmek",
    body: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ.\n\nTürkçe Anlamı:\n"Sizin en hayırlınız, Kur’ân’ı öğrenen ve onu öğretendir."\n\nKaynak: Sahîh-i Buhârî, no. 5027 (Sahih)',
  },
  {
    weekNumber: 8,
    topic: "İki güzel imrenme: İmkânı ve bilgiyi hayırda kullanmak",
    arabic:
      "لاَ حَسَدَ إِلاَّ فِي اثْنَتَيْنِ رَجُلٌ آتَاهُ اللَّهُ مَالاً فَسُلِّطَ عَلَى هَلَكَتِهِ فِي الْحَقِّ، وَرَجُلٌ آتَاهُ اللَّهُ الْحِكْمَةَ، فَهْوَ يَقْضِي بِهَا وَيُعَلِّمُهَا.",
    turkish:
      "Ancak iki kişiye imrenilir: Allah’ın mal verdiği ve onu hak yolunda harcayan kişi; Allah’ın hikmet verdiği, onunla hükmeden ve onu başkalarına öğreten kişi.",
    source: "Sahîh-i Buhârî, no. 73",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:73",
    title: "İki güzel imrenme: İmkânı ve bilgiyi hayırda kullanmak",
    body: 'لاَ حَسَدَ إِلاَّ فِي اثْنَتَيْنِ رَجُلٌ آتَاهُ اللَّهُ مَالاً فَسُلِّطَ عَلَى هَلَكَتِهِ فِي الْحَقِّ، وَرَجُلٌ آتَاهُ اللَّهُ الْحِكْمَةَ، فَهْوَ يَقْضِي بِهَا وَيُعَلِّمُهَا.\n\nTürkçe Anlamı:\n"Ancak iki kişiye imrenilir: Allah’ın mal verdiği ve onu hak yolunda harcayan kişi; Allah’ın hikmet verdiği, onunla hükmeden ve onu başkalarına öğreten kişi."\n\nKaynak: Sahîh-i Buhârî, no. 73 (Sahih)',
  },
  {
    weekNumber: 9,
    topic: "Güçlü mümin: Faydalı olana yönel, Allah’tan yardım iste",
    arabic:
      "الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ مِنَ الْمُؤْمِنِ الضَّعِيفِ، وَفِي كُلٍّ خَيْرٌ. احْرِصْ عَلَى مَا يَنْفَعُكَ، وَاسْتَعِنْ بِاللَّهِ وَلَا تَعْجَزْ، وَإِنْ أَصَابَكَ شَيْءٌ فَلَا تَقُلْ: لَوْ أَنِّي فَعَلْتُ كَانَ كَذَا وَكَذَا، وَلَكِنْ قُلْ: قَدَرُ اللَّهِ وَمَا شَاءَ فَعَلَ، فَإِنَّ «لَوْ» تَفْتَحُ عَمَلَ الشَّيْطَانِ.",
    turkish:
      "Güçlü mümin, zayıf müminden daha hayırlı ve Allah’a daha sevimlidir; bununla birlikte ikisinde de hayır vardır. Sana fayda verecek şeye gayret et, Allah’tan yardım iste ve acze düşme. Başına bir şey gelirse: “Şöyle yapsaydım böyle olurdu” deme; “Allah’ın takdiri budur, O dilediğini yapar” de. Çünkü “keşke” sözü şeytana kapı açar.",
    source: "Sahîh-i Müslim, no. 2664",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2664",
    title: "Güçlü mümin: Faydalı olana yönel, Allah’tan yardım iste",
    body: 'الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ مِنَ الْمُؤْمِنِ الضَّعِيفِ، وَفِي كُلٍّ خَيْرٌ. احْرِصْ عَلَى مَا يَنْفَعُكَ، وَاسْتَعِنْ بِاللَّهِ وَلَا تَعْجَزْ، وَإِنْ أَصَابَكَ شَيْءٌ فَلَا تَقُلْ: لَوْ أَنِّي فَعَلْتُ كَانَ كَذَا وَكَذَا، وَلَكِنْ قُلْ: قَدَرُ اللَّهِ وَمَا شَاءَ فَعَلَ، فَإِنَّ «لَوْ» تَفْتَحُ عَمَلَ الشَّيْطَانِ.\n\nTürkçe Anlamı:\n"Güçlü mümin, zayıf müminden daha hayırlı ve Allah’a daha sevimlidir; bununla birlikte ikisinde de hayır vardır. Sana fayda verecek şeye gayret et, Allah’tan yardım iste ve acze düşme. Başına bir şey gelirse: “Şöyle yapsaydım böyle olurdu” deme; “Allah’ın takdiri budur, O dilediğini yapar” de. Çünkü “keşke” sözü şeytana kapı açar."\n\nKaynak: Sahîh-i Müslim, no. 2664 (Sahih)',
  },
  {
    weekNumber: 10,
    topic: "Zaman ve sağlık: Kaybetmeden değerini bilmek",
    arabic: "نِعْمَتَانِ مَغْبُونٌ فِيهِمَا كَثِيرٌ مِنَ النَّاسِ: الصِّحَّةُ وَالْفَرَاغُ.",
    turkish:
      "İki nimet vardır ki insanların çoğu onların değerini bilmekte aldanır: Sağlık ve boş vakit.",
    source: "Sahîh-i Buhârî, no. 6412",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:6412",
    title: "Zaman ve sağlık: Kaybetmeden değerini bilmek",
    body: 'نِعْمَتَانِ مَغْبُونٌ فِيهِمَا كَثِيرٌ مِنَ النَّاسِ: الصِّحَّةُ وَالْفَرَاغُ.\n\nTürkçe Anlamı:\n"İki nimet vardır ki insanların çoğu onların değerini bilmekte aldanır: Sağlık ve boş vakit."\n\nKaynak: Sahîh-i Buhârî, no. 6412 (Sahih)',
  },
  {
    weekNumber: 11,
    topic: "Dünyada yolcu bilinci",
    arabic:
      "أَخَذَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ بِمَنْكِبِي فَقَالَ: «كُنْ فِي الدُّنْيَا كَأَنَّكَ غَرِيبٌ أَوْ عَابِرُ سَبِيلٍ». وَكَانَ ابْنُ عُمَرَ يَقُولُ: إِذَا أَمْسَيْتَ فَلَا تَنْتَظِرِ الصَّبَاحَ، وَإِذَا أَصْبَحْتَ فَلَا تَنْتَظِرِ الْمَسَاءَ، وَخُذْ مِنْ صِحَّتِكَ لِمَرَضِكَ، وَمِنْ حَيَاتِكَ لِمَوْتِكَ.",
    turkish:
      "Abdullah b. Ömer anlatıyor: Allah Resûlü omzumdan tuttu ve: “Dünyada bir garip veya bir yolcu gibi ol” buyurdu. İbn Ömer de şöyle derdi: “Akşama çıktığında sabahı bekleme; sabaha çıktığında akşamı bekleme. Sağlığından hastalığın için, hayatından ölümün için pay ayır.”",
    source: "Sahîh-i Buhârî, no. 6416",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:6416",
    title: "Dünyada yolcu bilinci",
    body: 'أَخَذَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ بِمَنْكِبِي فَقَالَ: «كُنْ فِي الدُّنْيَا كَأَنَّكَ غَرِيبٌ أَوْ عَابِرُ سَبِيلٍ». وَكَانَ ابْنُ عُمَرَ يَقُولُ: إِذَا أَمْسَيْتَ فَلَا تَنْتَظِرِ الصَّبَاحَ، وَإِذَا أَصْبَحْتَ فَلَا تَنْتَظِرِ الْمَسَاءَ، وَخُذْ مِنْ صِحَّتِكَ لِمَرَضِكَ، وَمِنْ حَيَاتِكَ لِمَوْتِكَ.\n\nTürkçe Anlamı:\n"Abdullah b. Ömer anlatıyor: Allah Resûlü omzumdan tuttu ve: “Dünyada bir garip veya bir yolcu gibi ol” buyurdu. İbn Ömer de şöyle derdi: “Akşama çıktığında sabahı bekleme; sabaha çıktığında akşamı bekleme. Sağlığından hastalığın için, hayatından ölümün için pay ayır.”"\n\nKaynak: Sahîh-i Buhârî, no. 6416 (Sahih)',
  },
  {
    weekNumber: 12,
    topic: "Gerçek zenginlik",
    arabic: "لَيْسَ الْغِنَى عَنْ كَثْرَةِ الْعَرَضِ، وَلَكِنَّ الْغِنَى غِنَى النَّفْسِ.",
    turkish: "Zenginlik, malın çokluğu değildir; gerçek zenginlik gönül zenginliğidir.",
    source: "Sahîh-i Buhârî, no. 6446",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:6446",
    title: "Gerçek zenginlik",
    body: 'لَيْسَ الْغِنَى عَنْ كَثْرَةِ الْعَرَضِ، وَلَكِنَّ الْغِنَى غِنَى النَّفْسِ.\n\nTürkçe Anlamı:\n"Zenginlik, malın çokluğu değildir; gerçek zenginlik gönül zenginliğidir."\n\nKaynak: Sahîh-i Buhârî, no. 6446 (Sahih)',
  },
  {
    weekNumber: 13,
    topic: "Az da olsa devamlı amel",
    arabic:
      "سَدِّدُوا وَقَارِبُوا، وَاعْلَمُوا أَنْ لَنْ يُدْخِلَ أَحَدَكُمْ عَمَلُهُ الْجَنَّةَ، وَأَنَّ أَحَبَّ الأَعْمَالِ أَدْوَمُهَا إِلَى اللَّهِ، وَإِنْ قَلَّ.",
    turkish:
      "Doğruyu hedefleyin ve gücünüz yettiğince ona yaklaşın. Şunu bilin ki hiçbiriniz yalnız ameli sayesinde cennete giremez. Allah’ın en sevdiği amel, az da olsa en devamlı olandır.",
    source: "Sahîh-i Buhârî, no. 6464",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:6464",
    title: "Az da olsa devamlı amel",
    body: 'سَدِّدُوا وَقَارِبُوا، وَاعْلَمُوا أَنْ لَنْ يُدْخِلَ أَحَدَكُمْ عَمَلُهُ الْجَنَّةَ، وَأَنَّ أَحَبَّ الأَعْمَالِ أَدْوَمُهَا إِلَى اللَّهِ، وَإِنْ قَلَّ.\n\nTürkçe Anlamı:\n"Doğruyu hedefleyin ve gücünüz yettiğince ona yaklaşın. Şunu bilin ki hiçbiriniz yalnız ameli sayesinde cennete giremez. Allah’ın en sevdiği amel, az da olsa en devamlı olandır."\n\nKaynak: Sahîh-i Buhârî, no. 6464 (Sahih)',
  },
  {
    weekNumber: 14,
    topic: "Görünüş değil kalp ve amel",
    arabic:
      "إِنَّ اللَّهَ لَا يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ، وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ.",
    turkish:
      "Allah sizin dış görünüşlerinize ve mallarınıza bakmaz; kalplerinize ve amellerinize bakar.",
    source: "Sahîh-i Müslim, no. 2564c",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2564c",
    title: "Görünüş değil kalp ve amel",
    body: 'إِنَّ اللَّهَ لَا يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ، وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ.\n\nTürkçe Anlamı:\n"Allah sizin dış görünüşlerinize ve mallarınıza bakmaz; kalplerinize ve amellerinize bakar."\n\nKaynak: Sahîh-i Müslim, no. 2564c (Sahih)',
  },
  {
    weekNumber: 15,
    topic: "İhlâs: Allah için yapılan işe başka amaç karıştırmamak",
    arabic:
      "قَالَ اللَّهُ تَبَارَكَ وَتَعَالَى أَنَا أَغْنَى الشُّرَكَاءِ عَنِ الشِّرْكِ مَنْ عَمِلَ عَمَلاً أَشْرَكَ فِيهِ مَعِي غَيْرِي تَرَكْتُهُ وَشِرْكَهُ.",
    turkish:
      "Allah Teâlâ şöyle buyurur: “Ben ortaklıktan en uzak olanım. Kim bir amel işlerken Benimle birlikte başka birini de ona ortak ederse onu da ortak koştuğu şeyi de terk ederim.”",
    source: "Sahîh-i Müslim, no. 2985",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2985",
    title: "İhlâs: Allah için yapılan işe başka amaç karıştırmamak",
    body: 'قَالَ اللَّهُ تَبَارَكَ وَتَعَالَى أَنَا أَغْنَى الشُّرَكَاءِ عَنِ الشِّرْكِ مَنْ عَمِلَ عَمَلاً أَشْرَكَ فِيهِ مَعِي غَيْرِي تَرَكْتُهُ وَشِرْكَهُ.\n\nTürkçe Anlamı:\n"Allah Teâlâ şöyle buyurur: “Ben ortaklıktan en uzak olanım. Kim bir amel işlerken Benimle birlikte başka birini de ona ortak ederse onu da ortak koştuğu şeyi de terk ederim.”"\n\nKaynak: Sahîh-i Müslim, no. 2985 (Sahih)',
  },
  {
    weekNumber: 16,
    topic: "Din samimiyettir",
    arabic:
      "الدِّينُ النَّصِيحَةُ. قُلْنَا: لِمَنْ؟ قَالَ: لِلَّهِ وَلِكِتَابِهِ وَلِرَسُولِهِ وَلِأَئِمَّةِ الْمُسْلِمِينَ وَعَامَّتِهِمْ.",
    turkish:
      "“Din samimiyettir.” “Kime karşı?” diye sorduk. “Allah’a, kitabına, Resûlü’ne, Müslümanların yöneticilerine ve bütün Müslümanlara karşı” buyurdu.",
    source: "Sahîh-i Müslim, no. 55a",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:55a",
    title: "Din samimiyettir",
    body: 'الدِّينُ النَّصِيحَةُ. قُلْنَا: لِمَنْ؟ قَالَ: لِلَّهِ وَلِكِتَابِهِ وَلِرَسُولِهِ وَلِأَئِمَّةِ الْمُسْلِمِينَ وَعَامَّتِهِمْ.\n\nTürkçe Anlamı:\n"“Din samimiyettir.” “Kime karşı?” diye sorduk. “Allah’a, kitabına, Resûlü’ne, Müslümanların yöneticilerine ve bütün Müslümanlara karşı” buyurdu."\n\nKaynak: Sahîh-i Müslim, no. 55a (Sahih)',
  },
  {
    weekNumber: 17,
    topic: "Müslüman olmak: Dilimden ve elimden zarar gelmesin",
    arabic:
      "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ، وَالْمُهَاجِرُ مَنْ هَجَرَ مَا نَهَى اللَّهُ عَنْهُ.",
    turkish:
      "Müslüman, diğer Müslümanların dilinden ve elinden emin olduğu kimsedir. Muhacir ise Allah’ın yasakladığı şeyleri terk eden kimsedir.",
    source: "Sahîh-i Buhârî, no. 10",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:10",
    title: "Müslüman olmak: Dilimden ve elimden zarar gelmesin",
    body: 'الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ، وَالْمُهَاجِرُ مَنْ هَجَرَ مَا نَهَى اللَّهُ عَنْهُ.\n\nTürkçe Anlamı:\n"Müslüman, diğer Müslümanların dilinden ve elinden emin olduğu kimsedir. Muhacir ise Allah’ın yasakladığı şeyleri terk eden kimsedir."\n\nKaynak: Sahîh-i Buhârî, no. 10 (Sahih)',
  },
  {
    weekNumber: 18,
    topic: "Komşu, misafir ve dil: İmanın günlük hayattaki izi",
    arabic:
      "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلَا يُؤْذِ جَارَهُ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيُكْرِمْ ضَيْفَهُ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ.",
    turkish:
      "Allah’a ve âhiret gününe iman eden komşusuna eziyet etmesin. Allah’a ve âhiret gününe iman eden misafirine ikram etsin. Allah’a ve âhiret gününe iman eden ya hayır söylesin ya da sussun.",
    source: "Sahîh-i Buhârî, no. 6018",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:6018",
    title: "Komşu, misafir ve dil: İmanın günlük hayattaki izi",
    body: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلَا يُؤْذِ جَارَهُ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيُكْرِمْ ضَيْفَهُ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ.\n\nTürkçe Anlamı:\n"Allah’a ve âhiret gününe iman eden komşusuna eziyet etmesin. Allah’a ve âhiret gününe iman eden misafirine ikram etsin. Allah’a ve âhiret gününe iman eden ya hayır söylesin ya da sussun."\n\nKaynak: Sahîh-i Buhârî, no. 6018 (Sahih)',
  },
  {
    weekNumber: 19,
    topic: "Doğruluk: Küçük tercihler karaktere dönüşür",
    arabic:
      "إِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ، وَإِنَّ الْبِرَّ يَهْدِي إِلَى الْجَنَّةِ، وَإِنَّ الرَّجُلَ لَيَصْدُقُ حَتَّى يَكُونَ صِدِّيقًا، وَإِنَّ الْكَذِبَ يَهْدِي إِلَى الْفُجُورِ، وَإِنَّ الْفُجُورَ يَهْدِي إِلَى النَّارِ، وَإِنَّ الرَّجُلَ لَيَكْذِبُ حَتَّى يُكْتَبَ عِنْدَ اللَّهِ كَذَّابًا.",
    turkish:
      "Doğruluk iyiliğe götürür, iyilik de cennete götürür. İnsan doğru söylemeye devam eder ve sonunda Allah katında doğru sözlü biri olarak yazılır. Yalan ise kötülüğe götürür, kötülük de ateşe götürür. İnsan yalan söylemeye devam eder ve sonunda Allah katında yalancı olarak yazılır.",
    source: "Sahîh-i Buhârî, no. 6094",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:6094",
    title: "Doğruluk: Küçük tercihler karaktere dönüşür",
    body: 'إِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ، وَإِنَّ الْبِرَّ يَهْدِي إِلَى الْجَنَّةِ، وَإِنَّ الرَّجُلَ لَيَصْدُقُ حَتَّى يَكُونَ صِدِّيقًا، وَإِنَّ الْكَذِبَ يَهْدِي إِلَى الْفُجُورِ، وَإِنَّ الْفُجُورَ يَهْدِي إِلَى النَّارِ، وَإِنَّ الرَّجُلَ لَيَكْذِبُ حَتَّى يُكْتَبَ عِنْدَ اللَّهِ كَذَّابًا.\n\nTürkçe Anlamı:\n"Doğruluk iyiliğe götürür, iyilik de cennete götürür. İnsan doğru söylemeye devam eder ve sonunda Allah katında doğru sözlü biri olarak yazılır. Yalan ise kötülüğe götürür, kötülük de ateşe götürür. İnsan yalan söylemeye devam eder ve sonunda Allah katında yalancı olarak yazılır."\n\nKaynak: Sahîh-i Buhârî, no. 6094 (Sahih)',
  },
  {
    weekNumber: 20,
    topic: "Güvenilir karakter: Yalan, söz ve emanet",
    arabic:
      "آيَةُ الْمُنَافِقِ ثَلَاثٌ: إِذَا حَدَّثَ كَذَبَ، وَإِذَا وَعَدَ أَخْلَفَ، وَإِذَا اؤْتُمِنَ خَانَ.",
    turkish:
      "Münafıklık alameti üçtür: Konuştuğunda yalan söyler, söz verdiğinde sözünde durmaz, kendisine emanet edildiğinde hıyanet eder.",
    source: "Sahîh-i Buhârî, no. 33",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:33",
    title: "Güvenilir karakter: Yalan, söz ve emanet",
    body: 'آيَةُ الْمُنَافِقِ ثَلَاثٌ: إِذَا حَدَّثَ كَذَبَ، وَإِذَا وَعَدَ أَخْلَفَ، وَإِذَا اؤْتُمِنَ خَانَ.\n\nTürkçe Anlamı:\n"Münafıklık alameti üçtür: Konuştuğunda yalan söyler, söz verdiğinde sözünde durmaz, kendisine emanet edildiğinde hıyanet eder."\n\nKaynak: Sahîh-i Buhârî, no. 33 (Sahih)',
  },
  {
    weekNumber: 21,
    topic: "Karakter alarmı: Dört nifak özelliği",
    arabic:
      "أَرْبَعٌ مَنْ كُنَّ فِيهِ كَانَ مُنَافِقًا خَالِصًا، وَمَنْ كَانَتْ فِيهِ خَصْلَةٌ مِنْهُنَّ كَانَتْ فِيهِ خَصْلَةٌ مِنَ النِّفَاقِ حَتَّى يَدَعَهَا إِذَا اؤْتُمِنَ خَانَ وَإِذَا حَدَّثَ كَذَبَ وَإِذَا عَاهَدَ غَدَرَ، وَإِذَا خَاصَمَ فَجَرَ.",
    turkish:
      "Şu dört özellik kimde birlikte bulunursa onda nifak özellikleri tamamlanmış olur. Bunlardan biri kimde bulunursa, onu bırakıncaya kadar kendisinde nifaktan bir özellik bulunur: Kendisine güvenilince hıyanet etmek, konuşunca yalan söylemek, sözleşince sözünden dönmek ve tartışınca sınırı aşmak.",
    source: "Sahîh-i Buhârî, no. 34",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:34",
    title: "Karakter alarmı: Dört nifak özelliği",
    body: 'أَرْبَعٌ مَنْ كُنَّ فِيهِ كَانَ مُنَافِقًا خَالِصًا، وَمَنْ كَانَتْ فِيهِ خَصْلَةٌ مِنْهُنَّ كَانَتْ فِيهِ خَصْلَةٌ مِنَ النِّفَاقِ حَتَّى يَدَعَهَا إِذَا اؤْتُمِنَ خَانَ وَإِذَا حَدَّثَ كَذَبَ وَإِذَا عَاهَدَ غَدَرَ، وَإِذَا خَاصَمَ فَجَرَ.\n\nTürkçe Anlamı:\n"Şu dört özellik kimde birlikte bulunursa onda nifak özellikleri tamamlanmış olur. Bunlardan biri kimde bulunursa, onu bırakıncaya kadar kendisinde nifaktan bir özellik bulunur: Kendisine güvenilince hıyanet etmek, konuşunca yalan söylemek, sözleşince sözünden dönmek ve tartışınca sınırı aşmak."\n\nKaynak: Sahîh-i Buhârî, no. 34 (Sahih)',
  },
  {
    weekNumber: 22,
    topic: "Zan, kıskançlık, takip ve sosyal ilişkiler",
    arabic:
      "إِيَّاكُمْ وَالظَّنَّ فَإِنَّ الظَّنَّ أَكْذَبُ الْحَدِيثِ، وَلَا تَحَسَّسُوا وَلَا تَجَسَّسُوا وَلَا تَنَافَسُوا وَلَا تَحَاسَدُوا وَلَا تَبَاغَضُوا وَلَا تَدَابَرُوا، وَكُونُوا عِبَادَ اللَّهِ إِخْوَانًا.",
    turkish:
      "Zandan sakının; çünkü zan, sözlerin en yalancısıdır. Birbirinizin gizli hâllerini araştırmayın, birbirinizi gözetlemeyin, kötü bir rekabete girmeyin, birbirinize haset etmeyin, kin tutmayın, birbirinize sırt çevirmeyin. Allah’ın kulları olarak kardeş olun.",
    source: "Sahîh-i Müslim, no. 2563a",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2563a",
    title: "Zan, kıskançlık, takip ve sosyal ilişkiler",
    body: 'إِيَّاكُمْ وَالظَّنَّ فَإِنَّ الظَّنَّ أَكْذَبُ الْحَدِيثِ، وَلَا تَحَسَّسُوا وَلَا تَجَسَّسُوا وَلَا تَنَافَسُوا وَلَا تَحَاسَدُوا وَلَا تَبَاغَضُوا وَلَا تَدَابَرُوا، وَكُونُوا عِبَادَ اللَّهِ إِخْوَانًا.\n\nTürkçe Anlamı:\n"Zandan sakının; çünkü zan, sözlerin en yalancısıdır. Birbirinizin gizli hâllerini araştırmayın, birbirinizi gözetlemeyin, kötü bir rekabete girmeyin, birbirinize haset etmeyin, kin tutmayın, birbirinize sırt çevirmeyin. Allah’ın kulları olarak kardeş olun."\n\nKaynak: Sahîh-i Müslim, no. 2563a (Sahih)',
  },
  {
    weekNumber: 23,
    topic: "Gıybet nedir? Sosyal medyada da aynı ölçü",
    arabic:
      "أَتَدْرُونَ مَا الْغِيبَةُ؟ قَالُوا: اللَّهُ وَرَسُولُهُ أَعْلَمُ. قَالَ: ذِكْرُكَ أَخَاكَ بِمَا يَكْرَهُ. قِيلَ: أَفَرَأَيْتَ إِنْ كَانَ فِي أَخِي مَا أَقُولُ؟ قَالَ: إِنْ كَانَ فِيهِ مَا تَقُولُ فَقَدِ اغْتَبْتَهُ، وَإِنْ لَمْ يَكُنْ فِيهِ فَقَدْ بَهَتَّهُ.",
    turkish:
      "“Gıybet nedir, biliyor musunuz?” buyurdu. Sahâbîler: “Allah ve Resûlü daha iyi bilir” dediler. “Kardeşini, hoşlanmayacağı bir şeyle anmandır” buyurdu. “Söylediğim şey onda gerçekten varsa ne olur?” denildi. “Eğer söylediğin onda varsa gıybet etmiş olursun; yoksa ona iftira etmiş olursun” buyurdu.",
    source: "Sahîh-i Müslim, no. 2589",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2589",
    title: "Gıybet nedir? Sosyal medyada da aynı ölçü",
    body: 'أَتَدْرُونَ مَا الْغِيبَةُ؟ قَالُوا: اللَّهُ وَرَسُولُهُ أَعْلَمُ. قَالَ: ذِكْرُكَ أَخَاكَ بِمَا يَكْرَهُ. قِيلَ: أَفَرَأَيْتَ إِنْ كَانَ فِي أَخِي مَا أَقُولُ؟ قَالَ: إِنْ كَانَ فِيهِ مَا تَقُولُ فَقَدِ اغْتَبْتَهُ، وَإِنْ لَمْ يَكُنْ فِيهِ فَقَدْ بَهَتَّهُ.\n\nTürkçe Anlamı:\n"“Gıybet nedir, biliyor musunuz?” buyurdu. Sahâbîler: “Allah ve Resûlü daha iyi bilir” dediler. “Kardeşini, hoşlanmayacağı bir şeyle anmandır” buyurdu. “Söylediğim şey onda gerçekten varsa ne olur?” denildi. “Eğer söylediğin onda varsa gıybet etmiş olursun; yoksa ona iftira etmiş olursun” buyurdu."\n\nKaynak: Sahîh-i Müslim, no. 2589 (Sahih)',
  },
  {
    weekNumber: 24,
    topic: "Gerçek iflas: İbadet var ama kul hakkı da var",
    arabic:
      "أَتَدْرُونَ مَا الْمُفْلِسُ؟ قَالُوا: الْمُفْلِسُ فِينَا مَنْ لَا دِرْهَمَ لَهُ وَلَا مَتَاعَ. فَقَالَ: إِنَّ الْمُفْلِسَ مِنْ أُمَّتِي يَأْتِي يَوْمَ الْقِيَامَةِ بِصَلَاةٍ وَصِيَامٍ وَزَكَاةٍ، وَيَأْتِي قَدْ شَتَمَ هَذَا وَقَذَفَ هَذَا وَأَكَلَ مَالَ هَذَا وَسَفَكَ دَمَ هَذَا وَضَرَبَ هَذَا، فَيُعْطَى هَذَا مِنْ حَسَنَاتِهِ وَهَذَا مِنْ حَسَنَاتِهِ، فَإِنْ فَنِيَتْ حَسَنَاتُهُ قَبْلَ أَنْ يُقْضَى مَا عَلَيْهِ أُخِذَ مِنْ خَطَايَاهُمْ فَطُرِحَتْ عَلَيْهِ، ثُمَّ طُرِحَ فِي النَّارِ.",
    turkish:
      "“Müflis kimdir, biliyor musunuz?” buyurdu. Sahâbîler: “Bizce müflis, parası ve malı olmayan kişidir” dediler. Bunun üzerine şöyle buyurdu: “Ümmetimin gerçek müflisi, kıyamet günü namaz, oruç ve zekâtla gelir; fakat birine sövmüş, birine iftira etmiş, birinin malını haksız yere yemiş, birinin kanını dökmüş, birini dövmüştür. İyiliklerinden hak sahiplerine verilir. Üzerindeki haklar bitmeden iyilikleri tükenirse onların günahlarından alınır, onun üzerine yüklenir; sonra ateşe atılır.”",
    source: "Sahîh-i Müslim, no. 2581",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2581",
    title: "Gerçek iflas: İbadet var ama kul hakkı da var",
    body: 'أَتَدْرُونَ مَا الْمُفْلِسُ؟ قَالُوا: الْمُفْلِسُ فِينَا مَنْ لَا دِرْهَمَ لَهُ وَلَا مَتَاعَ. فَقَالَ: إِنَّ الْمُفْلِسَ مِنْ أُمَّتِي يَأْتِي يَوْمَ الْقِيَامَةِ بِصَلَاةٍ وَصِيَامٍ وَزَكَاةٍ، وَيَأْتِي قَدْ شَتَمَ هَذَا وَقَذَفَ هَذَا وَأَكَلَ مَالَ هَذَا وَسَفَكَ دَمَ هَذَا وَضَرَبَ هَذَا، فَيُعْطَى هَذَا مِنْ حَسَنَاتِهِ وَهَذَا مِنْ حَسَنَاتِهِ، فَإِنْ فَنِيَتْ حَسَنَاتُهُ قَبْلَ أَنْ يُقْضَى مَا عَلَيْهِ أُخِذَ مِنْ خَطَايَاهُمْ فَطُرِحَتْ عَلَيْهِ، ثُمَّ طُرِحَ فِي النَّارِ.\n\nTürkçe Anlamı:\n"“Müflis kimdir, biliyor musunuz?” buyurdu. Sahâbîler: “Bizce müflis, parası ve malı olmayan kişidir” dediler. Bunun üzerine şöyle buyurdu: “Ümmetimin gerçek müflisi, kıyamet günü namaz, oruç ve zekâtla gelir; fakat birine sövmüş, birine iftira etmiş, birinin malını haksız yere yemiş, birinin kanını dökmüş, birini dövmüştür. İyiliklerinden hak sahiplerine verilir. Üzerindeki haklar bitmeden iyilikleri tükenirse onların günahlarından alınır, onun üzerine yüklenir; sonra ateşe atılır.”"\n\nKaynak: Sahîh-i Müslim, no. 2581 (Sahih)',
  },
  {
    weekNumber: 25,
    topic: "Kısa ama güçlü öğüt: Öfkelenme",
    arabic:
      "أَنَّ رَجُلاً قَالَ لِلنَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ أَوْصِنِي. قَالَ: «لاَ تَغْضَبْ». فَرَدَّدَ مِرَارًا، قَالَ: «لاَ تَغْضَبْ».",
    turkish:
      "Bir adam Peygamberimize: “Bana öğüt ver” dedi. Peygamberimiz: “Öfkelenme” buyurdu. Adam isteğini birkaç kez tekrarladı; Peygamberimiz her defasında: “Öfkelenme” buyurdu.",
    source: "Sahîh-i Buhârî, no. 6116",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:6116",
    title: "Kısa ama güçlü öğüt: Öfkelenme",
    body: 'أَنَّ رَجُلاً قَالَ لِلنَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ أَوْصِنِي. قَالَ: «لاَ تَغْضَبْ». فَرَدَّدَ مِرَارًا، قَالَ: «لاَ تَغْضَبْ».\n\nTürkçe Anlamı:\n"Bir adam Peygamberimize: “Bana öğüt ver” dedi. Peygamberimiz: “Öfkelenme” buyurdu. Adam isteğini birkaç kez tekrarladı; Peygamberimiz her defasında: “Öfkelenme” buyurdu."\n\nKaynak: Sahîh-i Buhârî, no. 6116 (Sahih)',
  },
  {
    weekNumber: 26,
    topic: "Gerçek güç: Öfke anında kendini tutabilmek",
    arabic:
      "لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ.",
    turkish:
      "Güçlü kimse, insanları güreşte yenen kişi değildir. Asıl güçlü kimse, öfkelendiği zaman kendine hâkim olabilendir.",
    source: "Sahîh-i Buhârî, no. 6114",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:6114",
    title: "Gerçek güç: Öfke anında kendini tutabilmek",
    body: 'لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ.\n\nTürkçe Anlamı:\n"Güçlü kimse, insanları güreşte yenen kişi değildir. Asıl güçlü kimse, öfkelendiği zaman kendine hâkim olabilendir."\n\nKaynak: Sahîh-i Buhârî, no. 6114 (Sahih)',
  },
  {
    weekNumber: 27,
    topic: "Yumuşaklık: Güzel davranışı daha da güzelleştiren şey",
    arabic:
      "إِنَّ الرِّفْقَ لَا يَكُونُ فِي شَيْءٍ إِلَّا زَانَهُ، وَلَا يُنْزَعُ مِنْ شَيْءٍ إِلَّا شَانَهُ.",
    turkish:
      "Yumuşaklık hangi şeyde bulunursa onu güzelleştirir; hangi şeyden çıkarılırsa onu çirkinleştirir.",
    source: "Sahîh-i Müslim, no. 2594a",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2594a",
    title: "Yumuşaklık: Güzel davranışı daha da güzelleştiren şey",
    body: 'إِنَّ الرِّفْقَ لَا يَكُونُ فِي شَيْءٍ إِلَّا زَانَهُ، وَلَا يُنْزَعُ مِنْ شَيْءٍ إِلَّا شَانَهُ.\n\nTürkçe Anlamı:\n"Yumuşaklık hangi şeyde bulunursa onu güzelleştirir; hangi şeyden çıkarılırsa onu çirkinleştirir."\n\nKaynak: Sahîh-i Müslim, no. 2594a (Sahih)',
  },
  {
    weekNumber: 28,
    topic: "Vermek, affetmek ve tevazu",
    arabic:
      "مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ، وَمَا زَادَ اللَّهُ عَبْدًا بِعَفْوٍ إِلَّا عِزًّا، وَمَا تَوَاضَعَ أَحَدٌ لِلَّهِ إِلَّا رَفَعَهُ اللَّهُ.",
    turkish:
      "Sadaka malı eksiltmez. Bir kul affettikçe Allah onun izzetini artırır. Kim Allah için tevazu gösterirse Allah onu yükseltir.",
    source: "Sahîh-i Müslim, no. 2588",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2588",
    title: "Vermek, affetmek ve tevazu",
    body: 'مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ، وَمَا زَادَ اللَّهُ عَبْدًا بِعَفْوٍ إِلَّا عِزًّا، وَمَا تَوَاضَعَ أَحَدٌ لِلَّهِ إِلَّا رَفَعَهُ اللَّهُ.\n\nTürkçe Anlamı:\n"Sadaka malı eksiltmez. Bir kul affettikçe Allah onun izzetini artırır. Kim Allah için tevazu gösterirse Allah onu yükseltir."\n\nKaynak: Sahîh-i Müslim, no. 2588 (Sahih)',
  },
  {
    weekNumber: 29,
    topic: "Kardeşlik: Kendim için istediğimi başkası için de istemek",
    arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ.",
    turkish:
      "Sizden biri, kendisi için sevdiği şeyi kardeşi için de sevmedikçe imanı olgunlaşmış olmaz.",
    source: "Sahîh-i Buhârî, no. 13",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:13",
    title: "Kardeşlik: Kendim için istediğimi başkası için de istemek",
    body: 'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ.\n\nTürkçe Anlamı:\n"Sizden biri, kendisi için sevdiği şeyi kardeşi için de sevmedikçe imanı olgunlaşmış olmaz."\n\nKaynak: Sahîh-i Buhârî, no. 13 (Sahih)',
  },
  {
    weekNumber: 30,
    topic: "Müminler birbirini ayakta tutan bir bina gibidir",
    arabic:
      "إِنَّ الْمُؤْمِنَ لِلْمُؤْمِنِ كَالْبُنْيَانِ، يَشُدُّ بَعْضُهُ بَعْضًا. وَشَبَّكَ أَصَابِعَهُ.",
    turkish:
      "Müminin mümine karşı durumu, parçaları birbirini sağlamlaştıran bir bina gibidir. Peygamberimiz bunu söylerken parmaklarını birbirine geçirdi.",
    source: "Sahîh-i Buhârî, no. 481",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:481",
    title: "Müminler birbirini ayakta tutan bir bina gibidir",
    body: 'إِنَّ الْمُؤْمِنَ لِلْمُؤْمِنِ كَالْبُنْيَانِ، يَشُدُّ بَعْضُهُ بَعْضًا. وَشَبَّكَ أَصَابِعَهُ.\n\nTürkçe Anlamı:\n"Müminin mümine karşı durumu, parçaları birbirini sağlamlaştıran bir bina gibidir. Peygamberimiz bunu söylerken parmaklarını birbirine geçirdi."\n\nKaynak: Sahîh-i Buhârî, no. 481 (Sahih)',
  },
  {
    weekNumber: 31,
    topic: "Müminler bir beden gibidir",
    arabic:
      "مَثَلُ الْمُؤْمِنِينَ فِي تَوَادِّهِمْ وَتَرَاحُمِهِمْ وَتَعَاطُفِهِمْ مَثَلُ الْجَسَدِ إِذَا اشْتَكَى مِنْهُ عُضْوٌ تَدَاعَى لَهُ سَائِرُ الْجَسَدِ بِالسَّهَرِ وَالْحُمَّى.",
    turkish:
      "Müminler birbirlerini sevme, merhamet etme ve birbirlerine ilgi göstermede tek bir beden gibidir. Bedenin bir organı rahatsız olduğunda diğer organlar da uykusuzluk ve ateşle onun acısına ortak olur.",
    source: "Sahîh-i Müslim, no. 2586a",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2586a",
    title: "Müminler bir beden gibidir",
    body: 'مَثَلُ الْمُؤْمِنِينَ فِي تَوَادِّهِمْ وَتَرَاحُمِهِمْ وَتَعَاطُفِهِمْ مَثَلُ الْجَسَدِ إِذَا اشْتَكَى مِنْهُ عُضْوٌ تَدَاعَى لَهُ سَائِرُ الْجَسَدِ بِالسَّهَرِ وَالْحُمَّى.\n\nTürkçe Anlamı:\n"Müminler birbirlerini sevme, merhamet etme ve birbirlerine ilgi göstermede tek bir beden gibidir. Bedenin bir organı rahatsız olduğunda diğer organlar da uykusuzluk ve ateşle onun acısına ortak olur."\n\nKaynak: Sahîh-i Müslim, no. 2586a (Sahih)',
  },
  {
    weekNumber: 32,
    topic: "Arkadaş seçimi: Yanımdaki insan beni değiştirir",
    arabic:
      "مَثَلُ الْجَلِيسِ الصَّالِحِ وَالسَّوْءِ كَحَامِلِ الْمِسْكِ وَنَافِخِ الْكِيرِ، فَحَامِلُ الْمِسْكِ إِمَّا أَنْ يُحْذِيَكَ، وَإِمَّا أَنْ تَبْتَاعَ مِنْهُ، وَإِمَّا أَنْ تَجِدَ مِنْهُ رِيحًا طَيِّبَةً، وَنَافِخُ الْكِيرِ إِمَّا أَنْ يُحْرِقَ ثِيَابَكَ، وَإِمَّا أَنْ تَجِدَ رِيحًا خَبِيثَةً.",
    turkish:
      "İyi arkadaş ile kötü arkadaşın durumu, misk taşıyan kimse ile körük üfleyen kimse gibidir. Misk taşıyan kişi ya sana güzel koku verir, ya ondan satın alırsın ya da yanında güzel bir koku bulursun. Körük üfleyen ise ya elbiseni yakar ya da ondan kötü bir koku duyarsın.",
    source: "Sahîh-i Buhârî, no. 5534",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:5534",
    title: "Arkadaş seçimi: Yanımdaki insan beni değiştirir",
    body: 'مَثَلُ الْجَلِيسِ الصَّالِحِ وَالسَّوْءِ كَحَامِلِ الْمِسْكِ وَنَافِخِ الْكِيرِ، فَحَامِلُ الْمِسْكِ إِمَّا أَنْ يُحْذِيَكَ، وَإِمَّا أَنْ تَبْتَاعَ مِنْهُ، وَإِمَّا أَنْ تَجِدَ مِنْهُ رِيحًا طَيِّبَةً، وَنَافِخُ الْكِيرِ إِمَّا أَنْ يُحْرِقَ ثِيَابَكَ، وَإِمَّا أَنْ تَجِدَ رِيحًا خَبِيثَةً.\n\nTürkçe Anlamı:\n"İyi arkadaş ile kötü arkadaşın durumu, misk taşıyan kimse ile körük üfleyen kimse gibidir. Misk taşıyan kişi ya sana güzel koku verir, ya ondan satın alırsın ya da yanında güzel bir koku bulursun. Körük üfleyen ise ya elbiseni yakar ya da ondan kötü bir koku duyarsın."\n\nKaynak: Sahîh-i Buhârî, no. 5534 (Sahih)',
  },
  {
    weekNumber: 33,
    topic: "Allah için dostluk",
    arabic:
      "أَنَّ رَجُلاً زَارَ أَخًا لَهُ فِي قَرْيَةٍ أُخْرَى فَأَرْصَدَ اللَّهُ لَهُ عَلَى مَدْرَجَتِهِ مَلَكًا فَلَمَّا أَتَى عَلَيْهِ قَالَ أَيْنَ تُرِيدُ قَالَ أُرِيدُ أَخًا لِي فِي هَذِهِ الْقَرْيَةِ. قَالَ هَلْ لَكَ عَلَيْهِ مِنْ نِعْمَةٍ تَرُبُّهَا قَالَ لاَ غَيْرَ أَنِّي أَحْبَبْتُهُ فِي اللَّهِ عَزَّ وَجَلَّ. قَالَ فَإِنِّي رَسُولُ اللَّهِ إِلَيْكَ بِأَنَّ اللَّهَ قَدْ أَحَبَّكَ كَمَا أَحْبَبْتَهُ فِيهِ.",
    turkish:
      "Bir kişi başka bir şehirdeki din kardeşini ziyarete gitti. Allah onun yoluna bir melek gönderdi. Melek ona nereye gittiğini sordu. Adam, o şehirdeki kardeşini ziyarete gittiğini söyledi. Melek: “Onun sana yaptığı ve karşılığını vermek istediğin bir iyilik mi var?” diye sordu. Adam: “Hayır; onu yalnız Allah için seviyorum” dedi. Melek de: “Ben Allah’ın sana gönderdiği elçiyim; sen onu Allah için sevdiğin gibi Allah da seni sevmiştir” dedi.",
    source: "Sahîh-i Müslim, no. 2567a",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2567a",
    title: "Allah için dostluk",
    body: 'أَنَّ رَجُلاً زَارَ أَخًا لَهُ فِي قَرْيَةٍ أُخْرَى فَأَرْصَدَ اللَّهُ لَهُ عَلَى مَدْرَجَتِهِ مَلَكًا فَلَمَّا أَتَى عَلَيْهِ قَالَ أَيْنَ تُرِيدُ قَالَ أُرِيدُ أَخًا لِي فِي هَذِهِ الْقَرْيَةِ. قَالَ هَلْ لَكَ عَلَيْهِ مِنْ نِعْمَةٍ تَرُبُّهَا قَالَ لاَ غَيْرَ أَنِّي أَحْبَبْتُهُ فِي اللَّهِ عَزَّ وَجَلَّ. قَالَ فَإِنِّي رَسُولُ اللَّهِ إِلَيْكَ بِأَنَّ اللَّهَ قَدْ أَحَبَّكَ كَمَا أَحْبَبْتَهُ فِيهِ.\n\nTürkçe Anlamı:\n"Bir kişi başka bir şehirdeki din kardeşini ziyarete gitti. Allah onun yoluna bir melek gönderdi. Melek ona nereye gittiğini sordu. Adam, o şehirdeki kardeşini ziyarete gittiğini söyledi. Melek: “Onun sana yaptığı ve karşılığını vermek istediğin bir iyilik mi var?” diye sordu. Adam: “Hayır; onu yalnız Allah için seviyorum” dedi. Melek de: “Ben Allah’ın sana gönderdiği elçiyim; sen onu Allah için sevdiğin gibi Allah da seni sevmiştir” dedi."\n\nKaynak: Sahîh-i Müslim, no. 2567a (Sahih)',
  },
  {
    weekNumber: 34,
    topic: "İyilik: İkram etmek ve selâmı yaymak",
    arabic:
      "أَنَّ رَجُلاً سَأَلَ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ أَيُّ الإِسْلاَمِ خَيْرٌ قَالَ: «تُطْعِمُ الطَّعَامَ، وَتَقْرَأُ السَّلاَمَ عَلَى مَنْ عَرَفْتَ وَمَنْ لَمْ تَعْرِفْ».",
    turkish:
      "Bir adam Peygamberimize, “İslâm’ın hangi davranışı daha hayırlıdır?” diye sordu. O da: “Yemek yedirmen ve tanıdığın-tanımadığın herkese selâm vermen” buyurdu.",
    source: "Sahîh-i Buhârî, no. 12",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:12",
    title: "İyilik: İkram etmek ve selâmı yaymak",
    body: 'أَنَّ رَجُلاً سَأَلَ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ أَيُّ الإِسْلاَمِ خَيْرٌ قَالَ: «تُطْعِمُ الطَّعَامَ، وَتَقْرَأُ السَّلاَمَ عَلَى مَنْ عَرَفْتَ وَمَنْ لَمْ تَعْرِفْ».\n\nTürkçe Anlamı:\n"Bir adam Peygamberimize, “İslâm’ın hangi davranışı daha hayırlıdır?” diye sordu. O da: “Yemek yedirmen ve tanıdığın-tanımadığın herkese selâm vermen” buyurdu."\n\nKaynak: Sahîh-i Buhârî, no. 12 (Sahih)',
  },
  {
    weekNumber: 35,
    topic: "Selâm: Sevgiyi çoğaltan küçük davranış",
    arabic:
      "لَا تَدْخُلُونَ الْجَنَّةَ حَتَّى تُؤْمِنُوا، وَلَا تُؤْمِنُوا حَتَّى تَحَابُّوا، أَوَلَا أَدُلُّكُمْ عَلَى شَيْءٍ إِذَا فَعَلْتُمُوهُ تَحَابَبْتُمْ؟ أَفْشُوا السَّلَامَ بَيْنَكُمْ.",
    turkish:
      "İman etmedikçe cennete giremezsiniz; birbirinizi sevmedikçe de imanınız olgunlaşmaz. Size, yaptığınızda birbirinizi seveceğiniz bir şeyi göstereyim mi? Aranızda selâmı yayın.",
    source: "Sahîh-i Müslim, no. 54a",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:54a",
    title: "Selâm: Sevgiyi çoğaltan küçük davranış",
    body: 'لَا تَدْخُلُونَ الْجَنَّةَ حَتَّى تُؤْمِنُوا، وَلَا تُؤْمِنُوا حَتَّى تَحَابُّوا، أَوَلَا أَدُلُّكُمْ عَلَى شَيْءٍ إِذَا فَعَلْتُمُوهُ تَحَابَبْتُمْ؟ أَفْشُوا السَّلَامَ بَيْنَكُمْ.\n\nTürkçe Anlamı:\n"İman etmedikçe cennete giremezsiniz; birbirinizi sevmedikçe de imanınız olgunlaşmaz. Size, yaptığınızda birbirinizi seveceğiniz bir şeyi göstereyim mi? Aranızda selâmı yayın."\n\nKaynak: Sahîh-i Müslim, no. 54a (Sahih)',
  },
  {
    weekNumber: 36,
    topic: "Kimseyi dışarıda bırakan gizli konuşma yapmamak",
    arabic:
      "إِذَا كُنْتُمْ ثَلاَثَةً فَلاَ يَتَنَاجَى اثْنَانِ دُونَ الآخَرِ حَتَّى تَخْتَلِطُوا بِالنَّاسِ مِنْ أَجْلِ أَنْ يُحْزِنَهُ.",
    turkish:
      "Üç kişi olduğunuzda, başka insanlar yanınıza gelinceye kadar ikiniz üçüncü kişiyi dışarıda bırakarak gizlice konuşmasın; çünkü bu onu üzebilir.",
    source: "Sahîh-i Müslim, no. 2184a",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2184a",
    title: "Kimseyi dışarıda bırakan gizli konuşma yapmamak",
    body: 'إِذَا كُنْتُمْ ثَلاَثَةً فَلاَ يَتَنَاجَى اثْنَانِ دُونَ الآخَرِ حَتَّى تَخْتَلِطُوا بِالنَّاسِ مِنْ أَجْلِ أَنْ يُحْزِنَهُ.\n\nTürkçe Anlamı:\n"Üç kişi olduğunuzda, başka insanlar yanınıza gelinceye kadar ikiniz üçüncü kişiyi dışarıda bırakarak gizlice konuşmasın; çünkü bu onu üzebilir."\n\nKaynak: Sahîh-i Müslim, no. 2184a (Sahih)',
  },
  {
    weekNumber: 37,
    topic: "Anne-baba hakkı: En güzel ilgiyi kim hak eder?",
    arabic:
      "جَاءَ رَجُلٌ إِلَى رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ فَقَالَ: يَا رَسُولَ اللَّهِ، مَنْ أَحَقُّ بِحُسْنِ صَحَابَتِي؟ قَالَ: «أُمُّكَ». قَالَ: ثُمَّ مَنْ؟ قَالَ: «أُمُّكَ». قَالَ: ثُمَّ مَنْ؟ قَالَ: «أُمُّكَ». قَالَ: ثُمَّ مَنْ؟ قَالَ: «ثُمَّ أَبُوكَ».",
    turkish:
      "Bir adam Allah Resûlü’ne geldi ve: “Ey Allah’ın Resûlü! İnsanlar içinde güzel ilgime en çok kim hak sahibidir?” diye sordu. “Annen” buyurdu. “Sonra kim?” dedi. “Annen” buyurdu. “Sonra kim?” dedi. “Annen” buyurdu. Adam yine “Sonra kim?” deyince “Sonra baban” buyurdu.",
    source: "Sahîh-i Buhârî, no. 5971",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:5971",
    title: "Anne-baba hakkı: En güzel ilgiyi kim hak eder?",
    body: 'جَاءَ رَجُلٌ إِلَى رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ فَقَالَ: يَا رَسُولَ اللَّهِ، مَنْ أَحَقُّ بِحُسْنِ صَحَابَتِي؟ قَالَ: «أُمُّكَ». قَالَ: ثُمَّ مَنْ؟ قَالَ: «أُمُّكَ». قَالَ: ثُمَّ مَنْ؟ قَالَ: «أُمُّكَ». قَالَ: ثُمَّ مَنْ؟ قَالَ: «ثُمَّ أَبُوكَ».\n\nTürkçe Anlamı:\n"Bir adam Allah Resûlü’ne geldi ve: “Ey Allah’ın Resûlü! İnsanlar içinde güzel ilgime en çok kim hak sahibidir?” diye sordu. “Annen” buyurdu. “Sonra kim?” dedi. “Annen” buyurdu. “Sonra kim?” dedi. “Annen” buyurdu. Adam yine “Sonra kim?” deyince “Sonra baban” buyurdu."\n\nKaynak: Sahîh-i Buhârî, no. 5971 (Sahih)',
  },
  {
    weekNumber: 38,
    topic: "Öncelikler: Namaz, anne-baba ve fedakârlık",
    arabic:
      "سَأَلْتُ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ أَىُّ الْعَمَلِ أَحَبُّ إِلَى اللَّهِ قَالَ: «الصَّلاَةُ عَلَى وَقْتِهَا». قَالَ ثُمَّ أَىٌّ قَالَ: «ثُمَّ بِرُّ الْوَالِدَيْنِ». قَالَ ثُمَّ أَىٌّ قَالَ: «الْجِهَادُ فِي سَبِيلِ اللَّهِ». قَالَ حَدَّثَنِي بِهِنَّ وَلَوِ اسْتَزَدْتُهُ لَزَادَنِي.",
    turkish:
      "Abdullah b. Mes‘ûd, Peygamberimize “Allah’ın en sevdiği amel hangisidir?” diye sordu. “Namazı vaktinde kılmak” buyurdu. “Sonra hangisi?” dedi. “Anne-babaya iyilik etmek” buyurdu. “Sonra hangisi?” dedi. “Allah yolunda cihad etmek” buyurdu. Abdullah, daha fazla sorsaydı Peygamberimizin daha fazla cevap vereceğini de ekledi.",
    source: "Sahîh-i Buhârî, no. 527",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:527",
    title: "Öncelikler: Namaz, anne-baba ve fedakârlık",
    body: 'سَأَلْتُ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ أَىُّ الْعَمَلِ أَحَبُّ إِلَى اللَّهِ قَالَ: «الصَّلاَةُ عَلَى وَقْتِهَا». قَالَ ثُمَّ أَىٌّ قَالَ: «ثُمَّ بِرُّ الْوَالِدَيْنِ». قَالَ ثُمَّ أَىٌّ قَالَ: «الْجِهَادُ فِي سَبِيلِ اللَّهِ». قَالَ حَدَّثَنِي بِهِنَّ وَلَوِ اسْتَزَدْتُهُ لَزَادَنِي.\n\nTürkçe Anlamı:\n"Abdullah b. Mes‘ûd, Peygamberimize “Allah’ın en sevdiği amel hangisidir?” diye sordu. “Namazı vaktinde kılmak” buyurdu. “Sonra hangisi?” dedi. “Anne-babaya iyilik etmek” buyurdu. “Sonra hangisi?” dedi. “Allah yolunda cihad etmek” buyurdu. Abdullah, daha fazla sorsaydı Peygamberimizin daha fazla cevap vereceğini de ekledi."\n\nKaynak: Sahîh-i Buhârî, no. 527 (Sahih)',
  },
  {
    weekNumber: 39,
    topic: "Yetimi gözetmek: Peygamberimize yakın bir yol",
    arabic:
      "أَنَا وَكَافِلُ الْيَتِيمِ فِي الْجَنَّةِ هَكَذَا. وَقَالَ بِإِصْبَعَيْهِ السَّبَّابَةِ وَالْوُسْطَى.",
    turkish:
      "“Ben ve yetimi gözetip ihtiyaçlarını üstlenen kimse cennette böyle yan yana olacağız” buyurdu ve işaret parmağıyla orta parmağını yan yana gösterdi.",
    source: "Sahîh-i Buhârî, no. 6005",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:6005",
    title: "Yetimi gözetmek: Peygamberimize yakın bir yol",
    body: 'أَنَا وَكَافِلُ الْيَتِيمِ فِي الْجَنَّةِ هَكَذَا. وَقَالَ بِإِصْبَعَيْهِ السَّبَّابَةِ وَالْوُسْطَى.\n\nTürkçe Anlamı:\n"“Ben ve yetimi gözetip ihtiyaçlarını üstlenen kimse cennette böyle yan yana olacağız” buyurdu ve işaret parmağıyla orta parmağını yan yana gösterdi."\n\nKaynak: Sahîh-i Buhârî, no. 6005 (Sahih)',
  },
  {
    weekNumber: 40,
    topic: "Zayıfın ve ihtiyaç sahibinin yanında olmak",
    arabic:
      "السَّاعِي عَلَى الْأَرْمَلَةِ وَالْمِسْكِينِ كَالْمُجَاهِدِ فِي سَبِيلِ اللَّهِ، أَوْ كَالَّذِي يَصُومُ النَّهَارَ وَيَقُومُ اللَّيْلَ.",
    turkish:
      "Dulun ve yoksulun ihtiyacı için çalışan kimse, Allah yolunda gayret eden kimse gibidir; yahut gündüzleri oruç tutup geceleri ibadet eden kimse gibidir.",
    source: "Sahîh-i Buhârî, no. 6006",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:6006",
    title: "Zayıfın ve ihtiyaç sahibinin yanında olmak",
    body: 'السَّاعِي عَلَى الْأَرْمَلَةِ وَالْمِسْكِينِ كَالْمُجَاهِدِ فِي سَبِيلِ اللَّهِ، أَوْ كَالَّذِي يَصُومُ النَّهَارَ وَيَقُومُ اللَّيْلَ.\n\nTürkçe Anlamı:\n"Dulun ve yoksulun ihtiyacı için çalışan kimse, Allah yolunda gayret eden kimse gibidir; yahut gündüzleri oruç tutup geceleri ibadet eden kimse gibidir."\n\nKaynak: Sahîh-i Buhârî, no. 6006 (Sahih)',
  },
  {
    weekNumber: 41,
    topic: "Kardeşini yalnız bırakmamak",
    arabic:
      "الْمُسْلِمُ أَخُو الْمُسْلِمِ، لَا يَظْلِمُهُ وَلَا يُسْلِمُهُ، وَمَنْ كَانَ فِي حَاجَةِ أَخِيهِ كَانَ اللَّهُ فِي حَاجَتِهِ، وَمَنْ فَرَّجَ عَنْ مُسْلِمٍ كُرْبَةً فَرَّجَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرُبَاتِ يَوْمِ الْقِيَامَةِ، وَمَنْ سَتَرَ مُسْلِمًا سَتَرَهُ اللَّهُ يَوْمَ الْقِيَامَةِ.",
    turkish:
      "Müslüman, Müslümanın kardeşidir; ona zulmetmez ve onu yalnız bırakmaz. Kim kardeşinin ihtiyacını gidermeye çalışırsa Allah da onun ihtiyacını giderir. Kim bir Müslümanın sıkıntısını giderirse Allah da kıyamet günündeki sıkıntılarından birini giderir. Kim bir Müslümanın kusurunu örterse Allah da kıyamet günü onun kusurunu örter.",
    source: "Sahîh-i Buhârî, no. 2442",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:2442",
    title: "Kardeşini yalnız bırakmamak",
    body: 'الْمُسْلِمُ أَخُو الْمُسْلِمِ، لَا يَظْلِمُهُ وَلَا يُسْلِمُهُ، وَمَنْ كَانَ فِي حَاجَةِ أَخِيهِ كَانَ اللَّهُ فِي حَاجَتِهِ، وَمَنْ فَرَّجَ عَنْ مُسْلِمٍ كُرْبَةً فَرَّجَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرُبَاتِ يَوْمِ الْقِيَامَةِ، وَمَنْ سَتَرَ مُسْلِمًا سَتَرَهُ اللَّهُ يَوْمَ الْقِيَامَةِ.\n\nTürkçe Anlamı:\n"Müslüman, Müslümanın kardeşidir; ona zulmetmez ve onu yalnız bırakmaz. Kim kardeşinin ihtiyacını gidermeye çalışırsa Allah da onun ihtiyacını giderir. Kim bir Müslümanın sıkıntısını giderirse Allah da kıyamet günündeki sıkıntılarından birini giderir. Kim bir Müslümanın kusurunu örterse Allah da kıyamet günü onun kusurunu örter."\n\nKaynak: Sahîh-i Buhârî, no. 2442 (Sahih)',
  },
  {
    weekNumber: 42,
    topic: "Her gün iyilik için yeni bir fırsat",
    arabic:
      "كُلُّ سُلَامَى مِنَ النَّاسِ عَلَيْهِ صَدَقَةٌ كُلَّ يَوْمٍ تَطْلُعُ فِيهِ الشَّمْسُ، يَعْدِلُ بَيْنَ الِاثْنَيْنِ صَدَقَةٌ، وَيُعِينُ الرَّجُلَ عَلَى دَابَّتِهِ فَيَحْمِلُ عَلَيْهَا أَوْ يَرْفَعُ عَلَيْهَا مَتَاعَهُ صَدَقَةٌ، وَالْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ، وَكُلُّ خُطْوَةٍ يَخْطُوهَا إِلَى الصَّلَاةِ صَدَقَةٌ، وَيُمِيطُ الْأَذَى عَنِ الطَّرِيقِ صَدَقَةٌ.",
    turkish:
      "İnsanın her bir eklemi için, güneşin doğduğu her gün bir sadaka gerekir. İki kişi arasında adaletle hükmetmek sadakadır. Birine bineğine binmesinde yardım etmek veya eşyasını yüklemek sadakadır. Güzel bir söz sadakadır. Namaza giderken atılan her adım sadakadır. Yoldan insanlara zarar veren bir şeyi kaldırmak da sadakadır.",
    source: "Sahîh-i Buhârî, no. 2989",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:2989",
    title: "Her gün iyilik için yeni bir fırsat",
    body: 'كُلُّ سُلَامَى مِنَ النَّاسِ عَلَيْهِ صَدَقَةٌ كُلَّ يَوْمٍ تَطْلُعُ فِيهِ الشَّمْسُ، يَعْدِلُ بَيْنَ الِاثْنَيْنِ صَدَقَةٌ، وَيُعِينُ الرَّجُلَ عَلَى دَابَّتِهِ فَيَحْمِلُ عَلَيْهَا أَوْ يَرْفَعُ عَلَيْهَا مَتَاعَهُ صَدَقَةٌ، وَالْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ، وَكُلُّ خُطْوَةٍ يَخْطُوهَا إِلَى الصَّلَاةِ صَدَقَةٌ، وَيُمِيطُ الْأَذَى عَنِ الطَّرِيقِ صَدَقَةٌ.\n\nTürkçe Anlamı:\n"İnsanın her bir eklemi için, güneşin doğduğu her gün bir sadaka gerekir. İki kişi arasında adaletle hükmetmek sadakadır. Birine bineğine binmesinde yardım etmek veya eşyasını yüklemek sadakadır. Güzel bir söz sadakadır. Namaza giderken atılan her adım sadakadır. Yoldan insanlara zarar veren bir şeyi kaldırmak da sadakadır."\n\nKaynak: Sahîh-i Buhârî, no. 2989 (Sahih)',
  },
  {
    weekNumber: 43,
    topic: "Dikilen bir ağaç bile sadakaya dönüşebilir",
    arabic:
      "مَا مِنْ مُسْلِمٍ يَغْرِسُ غَرْسًا، أَوْ يَزْرَعُ زَرْعًا، فَيَأْكُلُ مِنْهُ طَيْرٌ أَوْ إِنْسَانٌ أَوْ بَهِيمَةٌ، إِلاَّ كَانَ لَهُ بِهِ صَدَقَةٌ.",
    turkish:
      "Bir Müslüman bir ağaç diker veya bir şey eker de ondan bir kuş, insan ya da hayvan yerse bu, o kişi için sadaka olur.",
    source: "Sahîh-i Buhârî, no. 2320",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:2320",
    title: "Dikilen bir ağaç bile sadakaya dönüşebilir",
    body: 'مَا مِنْ مُسْلِمٍ يَغْرِسُ غَرْسًا، أَوْ يَزْرَعُ زَرْعًا، فَيَأْكُلُ مِنْهُ طَيْرٌ أَوْ إِنْسَانٌ أَوْ بَهِيمَةٌ، إِلاَّ كَانَ لَهُ بِهِ صَدَقَةٌ.\n\nTürkçe Anlamı:\n"Bir Müslüman bir ağaç diker veya bir şey eker de ondan bir kuş, insan ya da hayvan yerse bu, o kişi için sadaka olur."\n\nKaynak: Sahîh-i Buhârî, no. 2320 (Sahih)',
  },
  {
    weekNumber: 44,
    topic: "Veren el olabilmek",
    arabic:
      "الْيَدُ الْعُلْيَا خَيْرٌ مِنَ الْيَدِ السُّفْلَى، فَالْيَدُ الْعُلْيَا هِيَ الْمُنْفِقَةُ، وَالسُّفْلَى هِيَ السَّائِلَةُ.",
    turkish:
      "Üstte olan el, altta olan elden daha hayırlıdır. Üstte olan el veren; altta olan el ise isteyen eldir.",
    source: "Sahîh-i Buhârî, no. 1429",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:1429",
    title: "Veren el olabilmek",
    body: 'الْيَدُ الْعُلْيَا خَيْرٌ مِنَ الْيَدِ السُّفْلَى، فَالْيَدُ الْعُلْيَا هِيَ الْمُنْفِقَةُ، وَالسُّفْلَى هِيَ السَّائِلَةُ.\n\nTürkçe Anlamı:\n"Üstte olan el, altta olan elden daha hayırlıdır. Üstte olan el veren; altta olan el ise isteyen eldir."\n\nKaynak: Sahîh-i Buhârî, no. 1429 (Sahih)',
  },
  {
    weekNumber: 45,
    topic: "Gençlik ve karakter: Allah’ın gölgesinde yedi insan",
    arabic:
      "سَبْعَةٌ يُظِلُّهُمُ اللَّهُ فِي ظِلِّهِ يَوْمَ لاَ ظِلَّ إِلاَّ ظِلُّهُ الإِمَامُ الْعَادِلُ، وَشَابٌّ نَشَأَ فِي عِبَادَةِ رَبِّهِ، وَرَجُلٌ قَلْبُهُ مُعَلَّقٌ فِي الْمَسَاجِدِ، وَرَجُلاَنِ تَحَابَّا فِي اللَّهِ اجْتَمَعَا عَلَيْهِ وَتَفَرَّقَا عَلَيْهِ، وَرَجُلٌ طَلَبَتْهُ امْرَأَةٌ ذَاتُ مَنْصِبٍ وَجَمَالٍ فَقَالَ إِنِّي أَخَافُ اللَّهَ، وَرَجُلٌ تَصَدَّقَ أَخْفَى حَتَّى لاَ تَعْلَمَ شِمَالُهُ مَا تُنْفِقُ يَمِينُهُ، وَرَجُلٌ ذَكَرَ اللَّهَ خَالِيًا فَفَاضَتْ عَيْنَاهُ.",
    turkish:
      "Allah, kendi gölgesinden başka gölgenin bulunmadığı günde yedi kişiyi gölgelendirir: adaletli yönetici; Rabbine kulluk içinde yetişen genç; kalbi mescitlere bağlı kimse; Allah için birbirini seven, bu sevgiyle buluşup ayrılan iki kişi; makam ve güzellik sahibi bir kadın kendisini harama çağırdığında “Ben Allah’tan korkarım” diyen kişi; sağ elinin verdiğini sol eli bilmeyecek kadar gizli sadaka veren kişi; yalnızken Allah’ı anıp gözleri yaşaran kişi.",
    source: "Sahîh-i Buhârî, no. 660",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:660",
    title: "Gençlik ve karakter: Allah’ın gölgesinde yedi insan",
    body: 'سَبْعَةٌ يُظِلُّهُمُ اللَّهُ فِي ظِلِّهِ يَوْمَ لاَ ظِلَّ إِلاَّ ظِلُّهُ الإِمَامُ الْعَادِلُ، وَشَابٌّ نَشَأَ فِي عِبَادَةِ رَبِّهِ، وَرَجُلٌ قَلْبُهُ مُعَلَّقٌ فِي الْمَسَاجِدِ، وَرَجُلاَنِ تَحَابَّا فِي اللَّهِ اجْتَمَعَا عَلَيْهِ وَتَفَرَّقَا عَلَيْهِ، وَرَجُلٌ طَلَبَتْهُ امْرَأَةٌ ذَاتُ مَنْصِبٍ وَجَمَالٍ فَقَالَ إِنِّي أَخَافُ اللَّهَ، وَرَجُلٌ تَصَدَّقَ أَخْفَى حَتَّى لاَ تَعْلَمَ شِمَالُهُ مَا تُنْفِقُ يَمِينُهُ، وَرَجُلٌ ذَكَرَ اللَّهَ خَالِيًا فَفَاضَتْ عَيْنَاهُ.\n\nTürkçe Anlamı:\n"Allah, kendi gölgesinden başka gölgenin bulunmadığı günde yedi kişiyi gölgelendirir: adaletli yönetici; Rabbine kulluk içinde yetişen genç; kalbi mescitlere bağlı kimse; Allah için birbirini seven, bu sevgiyle buluşup ayrılan iki kişi; makam ve güzellik sahibi bir kadın kendisini harama çağırdığında “Ben Allah’tan korkarım” diyen kişi; sağ elinin verdiğini sol eli bilmeyecek kadar gizli sadaka veren kişi; yalnızken Allah’ı anıp gözleri yaşaran kişi."\n\nKaynak: Sahîh-i Buhârî, no. 660 (Sahih)',
  },
  {
    weekNumber: 46,
    topic: "Sorumluluk: Herkes bir emanet alanının başında",
    arabic:
      "أَلَا كُلُّكُمْ رَاعٍ، وَكُلُّكُمْ مَسْئُولٌ عَنْ رَعِيَّتِهِ، فَالْإِمَامُ الَّذِي عَلَى النَّاسِ رَاعٍ وَهُوَ مَسْئُولٌ عَنْ رَعِيَّتِهِ، وَالرَّجُلُ رَاعٍ عَلَى أَهْلِ بَيْتِهِ وَهُوَ مَسْئُولٌ عَنْ رَعِيَّتِهِ، وَالْمَرْأَةُ رَاعِيَةٌ عَلَى أَهْلِ بَيْتِ زَوْجِهَا وَوَلَدِهِ وَهِيَ مَسْئُولَةٌ عَنْهُمْ، وَعَبْدُ الرَّجُلِ رَاعٍ عَلَى مَالِ سَيِّدِهِ وَهُوَ مَسْئُولٌ عَنْهُ، أَلَا فَكُلُّكُمْ رَاعٍ وَكُلُّكُمْ مَسْئُولٌ عَنْ رَعِيَّتِهِ.",
    turkish:
      "Dikkat edin: Hepiniz birer sorumlusunuz ve hepiniz sorumluluğunuz altındakilerden hesaba çekileceksiniz. İnsanların başındaki yönetici sorumludur; ailesinin başındaki kişi ailesinden sorumludur; kadın evinden ve çocuklarından sorumludur; hizmetinde bulunduğu kişinin malını koruyan kimse de ondan sorumludur. Dikkat edin: Hepiniz birer sorumlusunuz ve hepiniz sorumluluğunuz altındakilerden hesaba çekileceksiniz.",
    source: "Sahîh-i Buhârî, no. 7138",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:7138",
    title: "Sorumluluk: Herkes bir emanet alanının başında",
    body: 'أَلَا كُلُّكُمْ رَاعٍ، وَكُلُّكُمْ مَسْئُولٌ عَنْ رَعِيَّتِهِ، فَالْإِمَامُ الَّذِي عَلَى النَّاسِ رَاعٍ وَهُوَ مَسْئُولٌ عَنْ رَعِيَّتِهِ، وَالرَّجُلُ رَاعٍ عَلَى أَهْلِ بَيْتِهِ وَهُوَ مَسْئُولٌ عَنْ رَعِيَّتِهِ، وَالْمَرْأَةُ رَاعِيَةٌ عَلَى أَهْلِ بَيْتِ زَوْجِهَا وَوَلَدِهِ وَهِيَ مَسْئُولَةٌ عَنْهُمْ، وَعَبْدُ الرَّجُلِ رَاعٍ عَلَى مَالِ سَيِّدِهِ وَهُوَ مَسْئُولٌ عَنْهُ، أَلَا فَكُلُّكُمْ رَاعٍ وَكُلُّكُمْ مَسْئُولٌ عَنْ رَعِيَّتِهِ.\n\nTürkçe Anlamı:\n"Dikkat edin: Hepiniz birer sorumlusunuz ve hepiniz sorumluluğunuz altındakilerden hesaba çekileceksiniz. İnsanların başındaki yönetici sorumludur; ailesinin başındaki kişi ailesinden sorumludur; kadın evinden ve çocuklarından sorumludur; hizmetinde bulunduğu kişinin malını koruyan kimse de ondan sorumludur. Dikkat edin: Hepiniz birer sorumlusunuz ve hepiniz sorumluluğunuz altındakilerden hesaba çekileceksiniz."\n\nKaynak: Sahîh-i Buhârî, no. 7138 (Sahih)',
  },
  {
    weekNumber: 47,
    topic: "İyiliğe yol göstermek de iyiliktir",
    arabic:
      "جَاءَ رَجُلٌ إِلَى النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ فَقَالَ إِنِّي أُبْدِعَ بِي فَاحْمِلْنِي فَقَالَ: «مَا عِنْدِي». فَقَالَ رَجُلٌ يَا رَسُولَ اللَّهِ أَنَا أَدُلُّهُ عَلَى مَنْ يَحْمِلُهُ فَقَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «مَنْ دَلَّ عَلَى خَيْرٍ فَلَهُ مِثْلُ أَجْرِ فَاعِلِهِ».",
    turkish:
      "Bir adam Peygamberimize gelip bineğinin kalmadığını söyleyerek yardım istedi. Peygamberimiz yanında verecek bir şey olmadığını söyledi. Başka biri, ona yardımcı olabilecek birini gösterebileceğini söyledi. Bunun üzerine Peygamberimiz: “Bir iyiliğe yol gösteren, onu yapanın sevabı kadar sevap alır” buyurdu.",
    source: "Sahîh-i Müslim, no. 1893a",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:1893a",
    title: "İyiliğe yol göstermek de iyiliktir",
    body: 'جَاءَ رَجُلٌ إِلَى النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ فَقَالَ إِنِّي أُبْدِعَ بِي فَاحْمِلْنِي فَقَالَ: «مَا عِنْدِي». فَقَالَ رَجُلٌ يَا رَسُولَ اللَّهِ أَنَا أَدُلُّهُ عَلَى مَنْ يَحْمِلُهُ فَقَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «مَنْ دَلَّ عَلَى خَيْرٍ فَلَهُ مِثْلُ أَجْرِ فَاعِلِهِ».\n\nTürkçe Anlamı:\n"Bir adam Peygamberimize gelip bineğinin kalmadığını söyleyerek yardım istedi. Peygamberimiz yanında verecek bir şey olmadığını söyledi. Başka biri, ona yardımcı olabilecek birini gösterebileceğini söyledi. Bunun üzerine Peygamberimiz: “Bir iyiliğe yol gösteren, onu yapanın sevabı kadar sevap alır” buyurdu."\n\nKaynak: Sahîh-i Müslim, no. 1893a (Sahih)',
  },
  {
    weekNumber: 48,
    topic: "İyiliği çoğaltmak da kötülüğü yaymak da sorumluluktur",
    arabic:
      "مَنْ دَعَا إِلَى هُدًى كَانَ لَهُ مِنَ الأَجْرِ مِثْلُ أُجُورِ مَنْ تَبِعَهُ لاَ يَنْقُصُ ذَلِكَ مِنْ أُجُورِهِمْ شَيْئًا وَمَنْ دَعَا إِلَى ضَلاَلَةٍ كَانَ عَلَيْهِ مِنَ الإِثْمِ مِثْلُ آثَامِ مَنْ تَبِعَهُ لاَ يَنْقُصُ ذَلِكَ مِنْ آثَامِهِمْ شَيْئًا.",
    turkish:
      "Kim insanları doğru bir yola çağırırsa, kendisine uyanların sevabı kadar sevap kazanır; onların sevabından hiçbir şey eksilmez. Kim de insanları yanlış bir yola çağırırsa, kendisine uyanların günahı kadar günah yüklenir; onların günahından da hiçbir şey eksilmez.",
    source: "Sahîh-i Müslim, no. 2674",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2674",
    title: "İyiliği çoğaltmak da kötülüğü yaymak da sorumluluktur",
    body: 'مَنْ دَعَا إِلَى هُدًى كَانَ لَهُ مِنَ الأَجْرِ مِثْلُ أُجُورِ مَنْ تَبِعَهُ لاَ يَنْقُصُ ذَلِكَ مِنْ أُجُورِهِمْ شَيْئًا وَمَنْ دَعَا إِلَى ضَلاَلَةٍ كَانَ عَلَيْهِ مِنَ الإِثْمِ مِثْلُ آثَامِ مَنْ تَبِعَهُ لاَ يَنْقُصُ ذَلِكَ مِنْ آثَامِهِمْ شَيْئًا.\n\nTürkçe Anlamı:\n"Kim insanları doğru bir yola çağırırsa, kendisine uyanların sevabı kadar sevap kazanır; onların sevabından hiçbir şey eksilmez. Kim de insanları yanlış bir yola çağırırsa, kendisine uyanların günahı kadar günah yüklenir; onların günahından da hiçbir şey eksilmez."\n\nKaynak: Sahîh-i Müslim, no. 2674 (Sahih)',
  },
  {
    weekNumber: 49,
    topic: "Doğru bilgiyi taşımak ve Peygamberimiz adına söz uydurmamak",
    arabic:
      "بَلِّغُوا عَنِّي وَلَوْ آيَةً، وَحَدِّثُوا عَنْ بَنِي إِسْرَائِيلَ وَلَا حَرَجَ، وَمَنْ كَذَبَ عَلَيَّ مُتَعَمِّدًا فَلْيَتَبَوَّأْ مَقْعَدَهُ مِنَ النَّارِ.",
    turkish:
      "Benden bir âyet bile olsa başkalarına ulaştırın. İsrâiloğullarından da nakilde bulunabilirsiniz; bunda bir sakınca yoktur. Fakat kim benim adıma bile bile yalan söylerse cehennemdeki yerine hazırlansın.",
    source: "Sahîh-i Buhârî, no. 3461",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:3461",
    title: "Doğru bilgiyi taşımak ve Peygamberimiz adına söz uydurmamak",
    body: 'بَلِّغُوا عَنِّي وَلَوْ آيَةً، وَحَدِّثُوا عَنْ بَنِي إِسْرَائِيلَ وَلَا حَرَجَ، وَمَنْ كَذَبَ عَلَيَّ مُتَعَمِّدًا فَلْيَتَبَوَّأْ مَقْعَدَهُ مِنَ النَّارِ.\n\nTürkçe Anlamı:\n"Benden bir âyet bile olsa başkalarına ulaştırın. İsrâiloğullarından da nakilde bulunabilirsiniz; bunda bir sakınca yoktur. Fakat kim benim adıma bile bile yalan söylerse cehennemdeki yerine hazırlansın."\n\nKaynak: Sahîh-i Buhârî, no. 3461 (Sahih)',
  },
  {
    weekNumber: 50,
    topic: "Öldükten sonra da devam eden üç iyilik",
    arabic:
      "إِذَا مَاتَ الإِنْسَانُ انْقَطَعَ عَنْهُ عَمَلُهُ إِلاَّ مِنْ ثَلاَثَةٍ إِلاَّ مِنْ صَدَقَةٍ جَارِيَةٍ أَوْ عِلْمٍ يُنْتَفَعُ بِهِ أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ.",
    turkish:
      "İnsan öldüğünde ameli kesilir; ancak üç şey devam eder: devam eden bir sadaka, insanların faydalandığı bir ilim ve kendisine dua eden hayırlı bir evlat.",
    source: "Sahîh-i Müslim, no. 1631",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:1631",
    title: "Öldükten sonra da devam eden üç iyilik",
    body: 'إِذَا مَاتَ الإِنْسَانُ انْقَطَعَ عَنْهُ عَمَلُهُ إِلاَّ مِنْ ثَلاَثَةٍ إِلاَّ مِنْ صَدَقَةٍ جَارِيَةٍ أَوْ عِلْمٍ يُنْتَفَعُ بِهِ أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ.\n\nTürkçe Anlamı:\n"İnsan öldüğünde ameli kesilir; ancak üç şey devam eder: devam eden bir sadaka, insanların faydalandığı bir ilim ve kendisine dua eden hayırlı bir evlat."\n\nKaynak: Sahîh-i Müslim, no. 1631 (Sahih)',
  },
  {
    weekNumber: 51,
    topic: "İlim, yardımlaşma ve Kur’ân halkası",
    arabic:
      "مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا نَفَّسَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ وَمَنْ يَسَّرَ عَلَى مُعْسِرٍ يَسَّرَ اللَّهُ عَلَيْهِ فِي الدُّنْيَا وَالآخِرَةِ وَمَنْ سَتَرَ مُسْلِمًا سَتَرَهُ اللَّهُ فِي الدُّنْيَا وَالآخِرَةِ وَاللَّهُ فِي عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِي عَوْنِ أَخِيهِ وَمَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ وَمَا اجْتَمَعَ قَوْمٌ فِي بَيْتٍ مِنْ بُيُوتِ اللَّهِ يَتْلُونَ كِتَابَ اللَّهِ وَيَتَدَارَسُونَهُ بَيْنَهُمْ إِلاَّ نَزَلَتْ عَلَيْهِمُ السَّكِينَةُ وَغَشِيَتْهُمُ الرَّحْمَةُ وَحَفَّتْهُمُ الْمَلاَئِكَةُ وَذَكَرَهُمُ اللَّهُ فِيمَنْ عِنْدَهُ وَمَنْ بَطَّأَ بِهِ عَمَلُهُ لَمْ يُسْرِعْ بِهِ نَسَبُهُ.",
    turkish:
      "Kim bir müminin dünya sıkıntılarından birini giderirse Allah da onun kıyamet günü sıkıntılarından birini giderir. Kim zor durumda olana kolaylık sağlarsa Allah da ona dünyada ve âhirette kolaylık sağlar. Kim bir Müslümanın kusurunu örterse Allah da onun kusurunu dünyada ve âhirette örter. Kul, kardeşine yardım ettiği sürece Allah da ona yardım eder. Kim ilim aramak için bir yola girerse Allah ona cennete giden yolu kolaylaştırır. Bir topluluk Allah’ın evlerinden birinde toplanıp Allah’ın kitabını okur ve aralarında müzakere ederse üzerlerine huzur iner, onları rahmet kaplar, melekler kuşatır ve Allah onları katındakilere anar. Ameli kendisini geri bırakan kişiyi soyu ileri götüremez.",
    source: "Sahîh-i Müslim, no. 2699a",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2699a",
    title: "İlim, yardımlaşma ve Kur’ân halkası",
    body: 'مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا نَفَّسَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ وَمَنْ يَسَّرَ عَلَى مُعْسِرٍ يَسَّرَ اللَّهُ عَلَيْهِ فِي الدُّنْيَا وَالآخِرَةِ وَمَنْ سَتَرَ مُسْلِمًا سَتَرَهُ اللَّهُ فِي الدُّنْيَا وَالآخِرَةِ وَاللَّهُ فِي عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِي عَوْنِ أَخِيهِ وَمَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ وَمَا اجْتَمَعَ قَوْمٌ فِي بَيْتٍ مِنْ بُيُوتِ اللَّهِ يَتْلُونَ كِتَابَ اللَّهِ وَيَتَدَارَسُونَهُ بَيْنَهُمْ إِلاَّ نَزَلَتْ عَلَيْهِمُ السَّكِينَةُ وَغَشِيَتْهُمُ الرَّحْمَةُ وَحَفَّتْهُمُ الْمَلاَئِكَةُ وَذَكَرَهُمُ اللَّهُ فِيمَنْ عِنْدَهُ وَمَنْ بَطَّأَ بِهِ عَمَلُهُ لَمْ يُسْرِعْ بِهِ نَسَبُهُ.\n\nTürkçe Anlamı:\n"Kim bir müminin dünya sıkıntılarından birini giderirse Allah da onun kıyamet günü sıkıntılarından birini giderir. Kim zor durumda olana kolaylık sağlarsa Allah da ona dünyada ve âhirette kolaylık sağlar. Kim bir Müslümanın kusurunu örterse Allah da onun kusurunu dünyada ve âhirette örter. Kul, kardeşine yardım ettiği sürece Allah da ona yardım eder. Kim ilim aramak için bir yola girerse Allah ona cennete giden yolu kolaylaştırır. Bir topluluk Allah’ın evlerinden birinde toplanıp Allah’ın kitabını okur ve aralarında müzakere ederse üzerlerine huzur iner, onları rahmet kaplar, melekler kuşatır ve Allah onları katındakilere anar. Ameli kendisini geri bırakan kişiyi soyu ileri götüremez."\n\nKaynak: Sahîh-i Müslim, no. 2699a (Sahih)',
  },
  {
    weekNumber: 52,
    topic: "İnsanlara dini sevdiren üslup",
    arabic: "يَسِّرُوا وَلَا تُعَسِّرُوا، وَبَشِّرُوا وَلَا تُنَفِّرُوا.",
    turkish: "Kolaylaştırın, zorlaştırmayın; müjdeleyin, nefret ettirmeyin.",
    source: "Sahîh-i Buhârî, no. 69",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:69",
    title: "İnsanlara dini sevdiren üslup",
    body: 'يَسِّرُوا وَلَا تُعَسِّرُوا، وَبَشِّرُوا وَلَا تُنَفِّرُوا.\n\nTürkçe Anlamı:\n"Kolaylaştırın, zorlaştırmayın; müjdeleyin, nefret ettirmeyin."\n\nKaynak: Sahîh-i Buhârî, no. 69 (Sahih)',
  },
  {
    weekNumber: 53,
    topic: "İman hayatın birçok alanına uzanır",
    arabic:
      "الإِيمَانُ بِضْعٌ وَسَبْعُونَ أَوْ بِضْعٌ وَسِتُّونَ شُعْبَةً فَأَفْضَلُهَا قَوْلُ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَدْنَاهَا إِمَاطَةُ الأَذَى عَنِ الطَّرِيقِ وَالْحَيَاءُ شُعْبَةٌ مِنَ الإِيمَانِ.",
    turkish:
      "İmanın yetmişten fazla -yahut altmıştan fazla- şubesi vardır. En üstünü “Lâ ilâhe illallah” demektir; en aşağısı yoldan eziyet veren şeyi kaldırmaktır. Hayâ da imanın bir şubesidir.",
    source: "Sahîh-i Müslim, no. 35b",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:35b",
    title: "İman hayatın birçok alanına uzanır",
    body: 'الإِيمَانُ بِضْعٌ وَسَبْعُونَ أَوْ بِضْعٌ وَسِتُّونَ شُعْبَةً فَأَفْضَلُهَا قَوْلُ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَدْنَاهَا إِمَاطَةُ الأَذَى عَنِ الطَّرِيقِ وَالْحَيَاءُ شُعْبَةٌ مِنَ الإِيمَانِ.\n\nTürkçe Anlamı:\n"İmanın yetmişten fazla -yahut altmıştan fazla- şubesi vardır. En üstünü “Lâ ilâhe illallah” demektir; en aşağısı yoldan eziyet veren şeyi kaldırmaktır. Hayâ da imanın bir şubesidir."\n\nKaynak: Sahîh-i Müslim, no. 35b (Sahih)',
  },
  {
    weekNumber: 54,
    topic: "Peygamberimizin kurtarma gayreti",
    arabic:
      "إِنَّمَا مَثَلِي وَمَثَلُ النَّاسِ كَمَثَلِ رَجُلٍ اسْتَوْقَدَ نَارًا، فَلَمَّا أَضَاءَتْ مَا حَوْلَهُ جَعَلَ الْفَرَاشُ وَهَذِهِ الدَّوَابُّ الَّتِي تَقَعُ فِي النَّارِ يَقَعْنَ فِيهَا، فَجَعَلَ يَنْزِعُهُنَّ وَيَغْلِبْنَهُ فَيَقْتَحِمْنَ فِيهَا، فَأَنَا آخُذُ بِحُجَزِكُمْ عَنِ النَّارِ، وَأَنْتُمْ تَقْتَحِمُونَ فِيهَا.",
    turkish:
      "Benim insanlarla durumum, ateş yakan bir adamın durumuna benzer. Ateş çevreyi aydınlatınca kelebekler ve ateşe düşen küçük canlılar ona doğru koşmaya başlar. Adam onları ateşten uzaklaştırmaya çalışır; fakat onlar onu aşarak ateşe atılırlar. Ben de sizi ateşten uzak tutmak için kuşaklarınızdan tutuyorum; siz ise ona doğru atılıyorsunuz.",
    source: "Sahîh-i Buhârî, no. 6483",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/bukhari:6483",
    title: "Peygamberimizin kurtarma gayreti",
    body: 'إِنَّمَا مَثَلِي وَمَثَلُ النَّاسِ كَمَثَلِ رَجُلٍ اسْتَوْقَدَ نَارًا، فَلَمَّا أَضَاءَتْ مَا حَوْلَهُ جَعَلَ الْفَرَاشُ وَهَذِهِ الدَّوَابُّ الَّتِي تَقَعُ فِي النَّارِ يَقَعْنَ فِيهَا، فَجَعَلَ يَنْزِعُهُنَّ وَيَغْلِبْنَهُ فَيَقْتَحِمْنَ فِيهَا، فَأَنَا آخُذُ بِحُجَزِكُمْ عَنِ النَّارِ، وَأَنْتُمْ تَقْتَحِمُونَ فِيهَا.\n\nTürkçe Anlamı:\n"Benim insanlarla durumum, ateş yakan bir adamın durumuna benzer. Ateş çevreyi aydınlatınca kelebekler ve ateşe düşen küçük canlılar ona doğru koşmaya başlar. Adam onları ateşten uzaklaştırmaya çalışır; fakat onlar onu aşarak ateşe atılırlar. Ben de sizi ateşten uzak tutmak için kuşaklarınızdan tutuyorum; siz ise ona doğru atılıyorsunuz."\n\nKaynak: Sahîh-i Buhârî, no. 6483 (Sahih)',
  },
  {
    weekNumber: 55,
    topic: "Müminin iki hâli: Şükür ve sabır",
    arabic:
      "عَجَبًا لأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ وَلَيْسَ ذَاكَ لأَحَدٍ إِلاَّ لِلْمُؤْمِنِ إِنْ أَصَابَتْهُ سَرَّاءُ شَكَرَ فَكَانَ خَيْرًا لَهُ وَإِنْ أَصَابَتْهُ ضَرَّاءُ صَبَرَ فَكَانَ خَيْرًا لَهُ.",
    turkish:
      "Müminin hâli ne şaşırtıcıdır! Onun her işi kendisi için hayırdır; bu özellik yalnız mümine aittir. Sevindirici bir durumla karşılaşırsa şükreder, bu onun için hayır olur. Bir sıkıntıyla karşılaşırsa sabreder, bu da onun için hayır olur.",
    source: "Sahîh-i Müslim, no. 2999",
    authenticity: "Sahih",
    verifyUrl: "https://sunnah.com/muslim:2999",
    title: "Müminin iki hâli: Şükür ve sabır",
    body: 'عَجَبًا لأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ وَلَيْسَ ذَاكَ لأَحَدٍ إِلاَّ لِلْمُؤْمِنِ إِنْ أَصَابَتْهُ سَرَّاءُ شَكَرَ فَكَانَ خَيْرًا لَهُ وَإِنْ أَصَابَتْهُ ضَرَّاءُ صَبَرَ فَكَانَ خَيْرًا لَهُ.\n\nTürkçe Anlamı:\n"Müminin hâli ne şaşırtıcıdır! Onun her işi kendisi için hayırdır; bu özellik yalnız mümine aittir. Sevindirici bir durumla karşılaşırsa şükreder, bu onun için hayır olur. Bir sıkıntıyla karşılaşırsa sabreder, bu da onun için hayır olur."\n\nKaynak: Sahîh-i Müslim, no. 2999 (Sahih)',
  },
] as const;

/**
 * Belirtilen sınıf (1-6) için 55 haftalık Hadis müfredat girişlerini üretir.
 * - 1, 2, 3. sınıflar: Ortaokul müfredatı
 * - 4, 5, 6. sınıflar: Lise müfredatı
 * - Hafta 1-16: Eylül - Aralık 2026 (4 ay x 4 hafta)
 * - Hafta 17-48: Ocak - Ağustos 2027 (8 ay x 4 hafta)
 * - Hafta 49-55: Ekstra 1-7 (48 haftalık standart müfredat kuralı sonrası ilave kartlar)
 */
export function getHadisEntriesForGrade(grade: number): CurriculumEntry[] {
  const items = grade <= 3 ? ortaokulHadisCurriculum : liseHadisCurriculum;

  return items.map((item) => {
    if (item.weekNumber <= 48) {
      const monthIndex = Math.floor((item.weekNumber - 1) / 4); // 0..11
      const month = monthIndex < 4 ? 9 + monthIndex : monthIndex - 3;
      const year = monthIndex < 4 ? 2026 : 2027;
      const weekInMonth = ((item.weekNumber - 1) % 4) + 1;
      const id = makeHadisEntryId(month, weekInMonth, grade, false);

      return {
        id,
        grade,
        categoryId: "hadis",
        month,
        week: weekInMonth,
        year,
        isExtra: false,
        title: item.title,
        body: item.body,
        resourceUrl: item.verifyUrl,
      };
    }

    const extraOrder = item.weekNumber - 48; // 1..7
    const id = makeHadisEntryId(8, 4, grade, true, extraOrder);

    return {
      id,
      grade,
      categoryId: "hadis",
      month: 8,
      week: 4,
      year: 2027,
      isExtra: true,
      extraOrder,
      title: item.title,
      body: item.body,
      resourceUrl: item.verifyUrl,
    };
  });
}

/**
 * 6 Belçika sınıfı için tüm Hadis kayıtlarını döner (toplam 330 kayıt).
 */
export function getAllHadisEntries(): CurriculumEntry[] {
  const all: CurriculumEntry[] = [];
  for (let grade = 1; grade <= 6; grade++) {
    all.push(...getHadisEntriesForGrade(grade));
  }
  return all;
}

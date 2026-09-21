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

function makeAyetEntryId(
  month: number,
  week: number,
  grade: number = 1,
  isExtra: boolean = false,
  extraOrder?: number
): string {
  const prefix = grade === 1 ? "" : `g${grade}-`;
  if (isExtra) {
    return `${prefix}ayet-extra-${extraOrder ?? 1}`;
  }
  const monthSlug = monthSlugs[month] ?? `m${month}`;
  return `${prefix}ayet-${monthSlug}-${week}`;
}

export interface AyetCurriculumItem {
  weekNumber: number;
  surahVerse: string;
  topic: string;
  arabic: string;
  translation: string;
  explanation: string;
  title: string;
  body: string;
}

/**
 * Ortaokul (1., 2. ve 3. Sınıflar) için 55 haftalık Ayet Kütüphanesi müfredatı
 * Kaynak: mufredat-docs/ayet/01_ORTAOKUL_AYET_KUTUPHANESI_55.docx
 */
export const ortaokulAyetCurriculum: readonly AyetCurriculumItem[] = [
  {
    weekNumber: 1,
    surahVerse: "Fâtiha 1/1",
    topic: "Her işe Allah’ın adıyla başlamak",
    arabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
    translation: "Rahmân ve rahîm olan Allah’ın adıyla",
    explanation:
      "Mümin, işine Allah’ı hatırlayarak başlar. Bu, yaptığı işi güzel ve doğru yapma sorumluluğunu da hatırlatır.",
    title: "Fâtiha 1/1 — Her işe Allah’ın adıyla başlamak",
    body: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ\n\nMeâl (Suat Yıldırım):\n"Rahmân ve rahîm olan Allah’ın adıyla"\n\nAçıklama:\nMümin, işine Allah’ı hatırlayarak başlar. Bu, yaptığı işi güzel ve doğru yapma sorumluluğunu da hatırlatır.',
  },
  {
    weekNumber: 2,
    surahVerse: "Fâtiha 1/2",
    topic: "Şükretmek ve hamdetmek",
    arabic: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ",
    translation: "Bütün hamdler, övgüler âlemlerin Rabbi Allah’adır.",
    explanation:
      "Sahip olduğumuz nimetlerin kaynağını bilmek şükür duygusunu geliştirir. Hamd, yalnız sözle değil nimeti doğru kullanmakla da gösterilir.",
    title: "Fâtiha 1/2 — Şükretmek ve hamdetmek",
    body: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ\n\nMeâl (Suat Yıldırım):\n"Bütün hamdler, övgüler âlemlerin Rabbi Allah’adır."\n\nAçıklama:\nSahip olduğumuz nimetlerin kaynağını bilmek şükür duygusunu geliştirir. Hamd, yalnız sözle değil nimeti doğru kullanmakla da gösterilir.',
  },
  {
    weekNumber: 3,
    surahVerse: "Fâtiha 1/3",
    topic: "Allah’ın merhametini tanımak",
    arabic: "ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
    translation: "O rahmândır, rahîmdir.",
    explanation: "Allah’ın rahmeti, kulun O’na güvenmesini ve ümidini korumasını öğretir.",
    title: "Fâtiha 1/3 — Allah’ın merhametini tanımak",
    body: 'ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ\n\nMeâl (Suat Yıldırım):\n"O rahmândır, rahîmdir."\n\nAçıklama:\nAllah’ın rahmeti, kulun O’na güvenmesini ve ümidini korumasını öğretir.',
  },
  {
    weekNumber: 4,
    surahVerse: "Fâtiha 1/4",
    topic: "Hesap gününü unutmamak",
    arabic: "مَـٰلِكِ يَوْمِ ٱلدِّينِ",
    translation: "Din gününün, hesap gününün tek hâkimidir.",
    explanation:
      "Yaptığımız iyilik ve kötülüklerin karşılıksız kalmayacağını bilmek, davranışlarımızı daha dikkatli seçmemize yardım eder.",
    title: "Fâtiha 1/4 — Hesap gününü unutmamak",
    body: 'مَـٰلِكِ يَوْمِ ٱلدِّينِ\n\nMeâl (Suat Yıldırım):\n"Din gününün, hesap gününün tek hâkimidir."\n\nAçıklama:\nYaptığımız iyilik ve kötülüklerin karşılıksız kalmayacağını bilmek, davranışlarımızı daha dikkatli seçmemize yardım eder.',
  },
  {
    weekNumber: 5,
    surahVerse: "Fâtiha 1/5",
    topic: "Kulluk ve yardım istemek",
    arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    translation: "(Haydi öyleyse deyiniz): “Yalnız Sana ibadet eder, yalnız senden medet umarız.”",
    explanation:
      "İbadet yalnız Allah’a yapılır; gerçek yardım da O’ndan istenir. İnsan çalışır, tedbir alır ve Allah’a dayanır.",
    title: "Fâtiha 1/5 — Kulluk ve yardım istemek",
    body: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ\n\nMeâl (Suat Yıldırım):\n"(Haydi öyleyse deyiniz): “Yalnız Sana ibadet eder, yalnız senden medet umarız.”"\n\nAçıklama:\nİbadet yalnız Allah’a yapılır; gerçek yardım da O’ndan istenir. İnsan çalışır, tedbir alır ve Allah’a dayanır.',
  },
  {
    weekNumber: 6,
    surahVerse: "Fâtiha 1/6",
    topic: "Doğru yolu istemek",
    arabic: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
    translation: "Bizi doğru yola, Sana doğru varan yola ilet.",
    explanation:
      "Doğru yolu bulmak ve o yolda kalmak için Allah’tan yardım istemek müminin sürekli duasıdır.",
    title: "Fâtiha 1/6 — Doğru yolu istemek",
    body: 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ\n\nMeâl (Suat Yıldırım):\n"Bizi doğru yola, Sana doğru varan yola ilet."\n\nAçıklama:\nDoğru yolu bulmak ve o yolda kalmak için Allah’tan yardım istemek müminin sürekli duasıdır.',
  },
  {
    weekNumber: 7,
    surahVerse: "Fâtiha 1/7",
    topic: "İyi insanların yolunu seçmek",
    arabic:
      "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
    translation:
      "Nimet ve lütfuna nail ettiklerinin yoluna ilet. Gazaba uğrayanların ve sapkınlarınkine değil.",
    explanation: "İnsan, kendisine güzel örnek olacak kimselerin yolunu seçmeye çalışmalıdır.",
    title: "Fâtiha 1/7 — İyi insanların yolunu seçmek",
    body: 'صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ\n\nMeâl (Suat Yıldırım):\n"Nimet ve lütfuna nail ettiklerinin yoluna ilet. Gazaba uğrayanların ve sapkınlarınkine değil."\n\nAçıklama:\nİnsan, kendisine güzel örnek olacak kimselerin yolunu seçmeye çalışmalıdır.',
  },
  {
    weekNumber: 8,
    surahVerse: "Bakara 2/27",
    topic: "Sözünde durmak ve bağları korumak",
    arabic:
      "ٱلَّذِينَ يَنقُضُونَ عَهْدَ ٱللَّهِ مِنۢ بَعْدِ مِيثَـٰقِهِۦ وَيَقْطَعُونَ مَآ أَمَرَ ٱللَّهُ بِهِۦٓ أَن يُوصَلَ وَيُفْسِدُونَ فِى ٱلْأَرْضِ ۚ أُو۟لَـٰٓئِكَ هُمُ ٱلْخَـٰسِرُونَ",
    translation:
      "Bu fâsıklar o kimselerdir ki Allah’a kesin söz verdikten sonra sözlerinden dönerler. Allah’ın riayet edilmesini emrettiği ilişkileri keserler ve yeryüzünde fitne ve fesat çıkarırlar. İşte bunlar ziyana uğrayanların ta kendileridir.",
    explanation:
      "Verilen sözü bozmak ve korunması gereken ilişkileri koparmak insana ve topluma zarar verir.",
    title: "Bakara 2/27 — Sözünde durmak ve bağları korumak",
    body: 'ٱلَّذِينَ يَنقُضُونَ عَهْدَ ٱللَّهِ مِنۢ بَعْدِ مِيثَـٰقِهِۦ وَيَقْطَعُونَ مَآ أَمَرَ ٱللَّهُ بِهِۦٓ أَن يُوصَلَ وَيُفْسِدُونَ فِى ٱلْأَرْضِ ۚ أُو۟لَـٰٓئِكَ هُمُ ٱلْخَـٰسِرُونَ\n\nMeâl (Suat Yıldırım):\n"Bu fâsıklar o kimselerdir ki Allah’a kesin söz verdikten sonra sözlerinden dönerler. Allah’ın riayet edilmesini emrettiği ilişkileri keserler ve yeryüzünde fitne ve fesat çıkarırlar. İşte bunlar ziyana uğrayanların ta kendileridir."\n\nAçıklama:\nVerilen sözü bozmak ve korunması gereken ilişkileri koparmak insana ve topluma zarar verir.',
  },
  {
    weekNumber: 9,
    surahVerse: "Bakara 2/28",
    topic: "Hayatı veren Allah’tır",
    arabic:
      "كَيْفَ تَكْفُرُونَ بِٱللَّهِ وَكُنتُمْ أَمْوَٰتًا فَأَحْيَـٰكُمْ ۖ ثُمَّ يُمِيتُكُمْ ثُمَّ يُحْيِيكُمْ ثُمَّ إِلَيْهِ تُرْجَعُونَ",
    translation:
      "Ey kâfirler! Allah’ı nasıl inkâr edebilirsiniz ki siz ölü iken size hayatı veren O’dur. Şunu bilin ki tayin ettiği vâde gelince sizi öldürecek, yine diriltecek ve sonunda O’nun huzuruna götürüleceksiniz.",
    explanation:
      "Hayatımızın Allah’tan geldiğini ve sonunda O’na döneceğimizi bilmek, hayatı daha sorumlu yaşamayı öğretir.",
    title: "Bakara 2/28 — Hayatı veren Allah’tır",
    body: 'كَيْفَ تَكْفُرُونَ بِٱللَّهِ وَكُنتُمْ أَمْوَٰتًا فَأَحْيَـٰكُمْ ۖ ثُمَّ يُمِيتُكُمْ ثُمَّ يُحْيِيكُمْ ثُمَّ إِلَيْهِ تُرْجَعُونَ\n\nMeâl (Suat Yıldırım):\n"Ey kâfirler! Allah’ı nasıl inkâr edebilirsiniz ki siz ölü iken size hayatı veren O’dur. Şunu bilin ki tayin ettiği vâde gelince sizi öldürecek, yine diriltecek ve sonunda O’nun huzuruna götürüleceksiniz."\n\nAçıklama:\nHayatımızın Allah’tan geldiğini ve sonunda O’na döneceğimizi bilmek, hayatı daha sorumlu yaşamayı öğretir.',
  },
  {
    weekNumber: 10,
    surahVerse: "Bakara 2/34",
    topic: "Kibirden sakınmak",
    arabic:
      "وَإِذْ قُلْنَا لِلْمَلَـٰٓئِكَةِ ٱسْجُدُوا۟ لِـَٔادَمَ فَسَجَدُوٓا۟ إِلَّآ إِبْلِيسَ أَبَىٰ وَٱسْتَكْبَرَ وَكَانَ مِنَ ٱلْكَـٰفِرِينَ",
    translation:
      "O vakit meleklere: “Adem için secde edin!” dedik. İblis dışındaki bütün melekler secde ettiler. İblis bunu yapmadı, kibrine yedirmedi ve kâfirlerden oldu.",
    explanation:
      "İblis’in hatasının temelinde kibir vardı. Bilgi veya başarı insanı başkalarından üstün görmeye değil, daha mütevazı olmaya götürmelidir.",
    title: "Bakara 2/34 — Kibirden sakınmak",
    body: 'وَإِذْ قُلْنَا لِلْمَلَـٰٓئِكَةِ ٱسْجُدُوا۟ لِـَٔادَمَ فَسَجَدُوٓا۟ إِلَّآ إِبْلِيسَ أَبَىٰ وَٱسْتَكْبَرَ وَكَانَ مِنَ ٱلْكَـٰفِرِينَ\n\nMeâl (Suat Yıldırım):\n"O vakit meleklere: “Adem için secde edin!” dedik. İblis dışındaki bütün melekler secde ettiler. İblis bunu yapmadı, kibrine yedirmedi ve kâfirlerden oldu."\n\nAçıklama:\nİblis’in hatasının temelinde kibir vardı. Bilgi veya başarı insanı başkalarından üstün görmeye değil, daha mütevazı olmaya götürmelidir.',
  },
  {
    weekNumber: 11,
    surahVerse: "Bakara 2/43",
    topic: "Namaz ve paylaşma",
    arabic: "وَأَقِيمُوا۟ ٱلصَّلَوٰةَ وَءَاتُوا۟ ٱلزَّكَوٰةَ وَٱرْكَعُوا۟ مَعَ ٱلرَّٰكِعِينَ",
    translation: "Hem namazı tam kılın, zekâtı verin, rükû edenlerle beraber siz de namaz kılın.",
    explanation:
      "Namaz Allah’la bağı, zekât ve paylaşma ise insanlarla olan sorumluluğu canlı tutar.",
    title: "Bakara 2/43 — Namaz ve paylaşma",
    body: 'وَأَقِيمُوا۟ ٱلصَّلَوٰةَ وَءَاتُوا۟ ٱلزَّكَوٰةَ وَٱرْكَعُوا۟ مَعَ ٱلرَّٰكِعِينَ\n\nMeâl (Suat Yıldırım):\n"Hem namazı tam kılın, zekâtı verin, rükû edenlerle beraber siz de namaz kılın."\n\nAçıklama:\nNamaz Allah’la bağı, zekât ve paylaşma ise insanlarla olan sorumluluğu canlı tutar.',
  },
  {
    weekNumber: 12,
    surahVerse: "Bakara 2/238",
    topic: "Namazı korumak",
    arabic:
      "حَـٰفِظُوا۟ عَلَى ٱلصَّلَوَٰتِ وَٱلصَّلَوٰةِ ٱلْوُسْطَىٰ وَقُومُوا۟ لِلَّهِ قَـٰنِتِينَ",
    translation:
      "Namazlara, hele salat-ı vustaya dikkat edin ve kalkın huşû ile Allah’ın divanında durun.",
    explanation:
      "Namazı vakit ve dikkat bakımından korumak, günlük hayatın düzen kazanmasına yardım eder.",
    title: "Bakara 2/238 — Namazı korumak",
    body: 'حَـٰفِظُوا۟ عَلَى ٱلصَّلَوَٰتِ وَٱلصَّلَوٰةِ ٱلْوُسْطَىٰ وَقُومُوا۟ لِلَّهِ قَـٰنِتِينَ\n\nMeâl (Suat Yıldırım):\n"Namazlara, hele salat-ı vustaya dikkat edin ve kalkın huşû ile Allah’ın divanında durun."\n\nAçıklama:\nNamazı vakit ve dikkat bakımından korumak, günlük hayatın düzen kazanmasına yardım eder.',
  },
  {
    weekNumber: 13,
    surahVerse: "Bakara 2/285",
    topic: "İman esaslarını birlikte kabul etmek",
    arabic:
      "ءَامَنَ ٱلرَّسُولُ بِمَآ أُنزِلَ إِلَيْهِ مِن رَّبِّهِۦ وَٱلْمُؤْمِنُونَ ۚ كُلٌّ ءَامَنَ بِٱللَّهِ وَمَلَـٰٓئِكَتِهِۦ وَكُتُبِهِۦ وَرُسُلِهِۦ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِۦ ۚ وَقَالُوا۟ سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ ٱلْمَصِيرُ",
    translation:
      'Peygamber, Rabbi tarafından kendisine ne indirildi ise ona iman etti, müminler de! Onlardan her biri Allah’a, meleklerine, kitaplarına ve peygamberlerine iman etti. "O’nun resullerinden hiç birini diğerinden ayırt etmeyiz." dediler ve eklediler: "İşittik ve itaat ettik ya Rabbenâ, affını dileriz, dönüşümüz Sanadır."',
    explanation:
      "Mümin Allah’a, meleklerine, kitaplarına ve peygamberlerine iman eder; Allah’ın peygamberlerinden hiçbirini inkâr etmez.",
    title: "Bakara 2/285 — İman esaslarını birlikte kabul etmek",
    body: 'ءَامَنَ ٱلرَّسُولُ بِمَآ أُنزِلَ إِلَيْهِ مِن رَّبِّهِۦ وَٱلْمُؤْمِنُونَ ۚ كُلٌّ ءَامَنَ بِٱللَّهِ وَمَلَـٰٓئِكَتِهِۦ وَكُتُبِهِۦ وَرُسُلِهِۦ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِۦ ۚ وَقَالُوا۟ سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ ٱلْمَصِيرُ\n\nMeâl (Suat Yıldırım):\n"Peygamber, Rabbi tarafından kendisine ne indirildi ise ona iman etti, müminler de! Onlardan her biri Allah’a, meleklerine, kitaplarına ve peygamberlerine iman etti. "O’nun resullerinden hiç birini diğerinden ayırt etmeyiz." dediler ve eklediler: "İşittik ve itaat ettik ya Rabbenâ, affını dileriz, dönüşümüz Sanadır.""\n\nAçıklama:\nMümin Allah’a, meleklerine, kitaplarına ve peygamberlerine iman eder; Allah’ın peygamberlerinden hiçbirini inkâr etmez.',
  },
  {
    weekNumber: 14,
    surahVerse: "Bakara 2/286",
    topic: "Gücün kadar sorumluluk",
    arabic:
      "لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا ٱكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَآ إِن نَّسِينَآ أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَآ إِصْرًا كَمَا حَمَلْتَهُۥ عَلَى ٱلَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِۦ ۖ وَٱعْفُ عَنَّا وَٱغْفِرْ لَنَا وَٱرْحَمْنَآ ۚ أَنتَ مَوْلَىٰنَا فَٱنصُرْنَا عَلَى ٱلْقَوْمِ ٱلْكَـٰفِرِينَ",
    translation:
      "Allah hiçbir kimseyi güç yetiremeyeceği bir şekilde yükümlü tutmaz. Herkesin kazandığı iyilik kendi lehine, işlediği fenalık da kendi aleyhinedir. Ya Rabbenâ! Eğer unuttuk veya kasıtsız olarak yanlış yaptıysak bundan dolayı bizi sorumlu tutma! Ya Rabbenâ! Bizden öncekilere yüklediğin gibi ağır yük yükleme! Ya Rabbenâ! Takat getiremeyeceğimiz şeylerle bizi yükümlü tutma! Affet bizi, lütfen bağışla kusurlarımızı, merhamet buyur bize! Sensin Mevlâmız, yardımcımız! Kâfir topluluklara karşı Sen yardım eyle bize!",
    explanation:
      "Allah insana taşıyamayacağı bir sorumluluk yüklemez. Bu, zorlukta ümit verir; aynı zamanda yapabildiğimizden sorumlu olduğumuzu hatırlatır.",
    title: "Bakara 2/286 — Gücün kadar sorumluluk",
    body: 'لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا ٱكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَآ إِن نَّسِينَآ أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَآ إِصْرًا كَمَا حَمَلْتَهُۥ عَلَى ٱلَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِۦ ۖ وَٱعْفُ عَنَّا وَٱغْفِرْ لَنَا وَٱرْحَمْنَآ ۚ أَنتَ مَوْلَىٰنَا فَٱنصُرْنَا عَلَى ٱلْقَوْمِ ٱلْكَـٰفِرِينَ\n\nMeâl (Suat Yıldırım):\n"Allah hiçbir kimseyi güç yetiremeyeceği bir şekilde yükümlü tutmaz. Herkesin kazandığı iyilik kendi lehine, işlediği fenalık da kendi aleyhinedir. Ya Rabbenâ! Eğer unuttuk veya kasıtsız olarak yanlış yaptıysak bundan dolayı bizi sorumlu tutma! Ya Rabbenâ! Bizden öncekilere yüklediğin gibi ağır yük yükleme! Ya Rabbenâ! Takat getiremeyeceğimiz şeylerle bizi yükümlü tutma! Affet bizi, lütfen bağışla kusurlarımızı, merhamet buyur bize! Sensin Mevlâmız, yardımcımız! Kâfir topluluklara karşı Sen yardım eyle bize!"\n\nAçıklama:\nAllah insana taşıyamayacağı bir sorumluluk yüklemez. Bu, zorlukta ümit verir; aynı zamanda yapabildiğimizden sorumlu olduğumuzu hatırlatır.',
  },
  {
    weekNumber: 15,
    surahVerse: "Âl-i İmrân 3/8",
    topic: "Kalbin doğrulukta kalması için dua",
    arabic:
      "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ ٱلْوَهَّابُ",
    translation:
      "Ey bizim Kerîm Rabbimiz, bize hidâyet verdikten sonra kalplerimizi saptırma ve katından bize bir rahmet bağışla. Şüphesiz bağışı bol olan Vehhab Sensin Sen!",
    explanation:
      "İnsan doğruyu bulduktan sonra da kalbinin doğrulukta kalması için dua etmeli ve kendini korumalıdır.",
    title: "Âl-i İmrân 3/8 — Kalbin doğrulukta kalması için dua",
    body: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ ٱلْوَهَّابُ\n\nMeâl (Suat Yıldırım):\n"Ey bizim Kerîm Rabbimiz, bize hidâyet verdikten sonra kalplerimizi saptırma ve katından bize bir rahmet bağışla. Şüphesiz bağışı bol olan Vehhab Sensin Sen!"\n\nAçıklama:\nİnsan doğruyu bulduktan sonra da kalbinin doğrulukta kalması için dua etmeli ve kendini korumalıdır.',
  },
  {
    weekNumber: 16,
    surahVerse: "Âl-i İmrân 3/31",
    topic: "Allah sevgisini Peygamberimizi örnek alarak göstermek",
    arabic:
      "قُلْ إِن كُنتُمْ تُحِبُّونَ ٱللَّهَ فَٱتَّبِعُونِى يُحْبِبْكُمُ ٱللَّهُ وَيَغْفِرْ لَكُمْ ذُنُوبَكُمْ ۗ وَٱللَّهُ غَفُورٌ رَّحِيمٌ",
    translation:
      'Ey Resulüm, de ki: "Ey insanlar, eğer Allah’ı seviyorsanız, gelin bana uyun ki Allah da sizi sevsin ve günahlarınızı bağışlasın. Allah gafurdur, rahimdir (çok affedicidir, engin merhamet ve ihsan sahibidir)."',
    explanation:
      "Allah’ı sevmek yalnız bir duygu değildir; Peygamberimizin gösterdiği güzel yolu izlemeye çalışmakla görünür hâle gelir.",
    title: "Âl-i İmrân 3/31 — Allah sevgisini Peygamberimizi örnek alarak göstermek",
    body: 'قُلْ إِن كُنتُمْ تُحِبُّونَ ٱللَّهَ فَٱتَّبِعُونِى يُحْبِبْكُمُ ٱللَّهُ وَيَغْفِرْ لَكُمْ ذُنُوبَكُمْ ۗ وَٱللَّهُ غَفُورٌ رَّحِيمٌ\n\nMeâl (Suat Yıldırım):\n"Ey Resulüm, de ki: "Ey insanlar, eğer Allah’ı seviyorsanız, gelin bana uyun ki Allah da sizi sevsin ve günahlarınızı bağışlasın. Allah gafurdur, rahimdir (çok affedicidir, engin merhamet ve ihsan sahibidir).""\n\nAçıklama:\nAllah’ı sevmek yalnız bir duygu değildir; Peygamberimizin gösterdiği güzel yolu izlemeye çalışmakla görünür hâle gelir.',
  },
  {
    weekNumber: 17,
    surahVerse: "Âl-i İmrân 3/32",
    topic: "Allah ve Resulüne itaat",
    arabic:
      "قُلْ أَطِيعُوا۟ ٱللَّهَ وَٱلرَّسُولَ ۖ فَإِن تَوَلَّوْا۟ فَإِنَّ ٱللَّهَ لَا يُحِبُّ ٱلْكَـٰفِرِينَ",
    translation:
      'De ki: "Allah’a ve Resulullaha itaat ediniz. Şayet yüzçevirirlerse, bilsinler ki Allah kâfirleri sevmez."',
    explanation:
      "Mümin, Allah’ın emirlerini ve Peygamberimizin sahih rehberliğini hayatında ölçü kabul eder.",
    title: "Âl-i İmrân 3/32 — Allah ve Resulüne itaat",
    body: 'قُلْ أَطِيعُوا۟ ٱللَّهَ وَٱلرَّسُولَ ۖ فَإِن تَوَلَّوْا۟ فَإِنَّ ٱللَّهَ لَا يُحِبُّ ٱلْكَـٰفِرِينَ\n\nMeâl (Suat Yıldırım):\n"De ki: "Allah’a ve Resulullaha itaat ediniz. Şayet yüzçevirirlerse, bilsinler ki Allah kâfirleri sevmez.""\n\nAçıklama:\nMümin, Allah’ın emirlerini ve Peygamberimizin sahih rehberliğini hayatında ölçü kabul eder.',
  },
  {
    weekNumber: 18,
    surahVerse: "Âl-i İmrân 3/190",
    topic: "Kâinat üzerinde düşünmek",
    arabic:
      "إِنَّ فِى خَلْقِ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ وَٱخْتِلَـٰفِ ٱلَّيْلِ وَٱلنَّهَارِ لَـَٔايَـٰتٍ لِّأُو۟لِى ٱلْأَلْبَـٰبِ",
    translation:
      "Muhakkak göklerin ve yerin yaratılışında, gece ile gündüzün birbiri ardınca gelişinde düşünen insanlar için elbette birçok dersler vardır.",
    explanation:
      "Gökyüzü, yeryüzü ve zamanın düzeni rastgele bakıp geçilecek şeyler değildir; insan bunlar üzerinde düşünerek Allah’ın kudretini fark eder.",
    title: "Âl-i İmrân 3/190 — Kâinat üzerinde düşünmek",
    body: 'إِنَّ فِى خَلْقِ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ وَٱخْتِلَـٰفِ ٱلَّيْلِ وَٱلنَّهَارِ لَـَٔايَـٰتٍ لِّأُو۟لِى ٱلْأَلْبَـٰبِ\n\nMeâl (Suat Yıldırım):\n"Muhakkak göklerin ve yerin yaratılışında, gece ile gündüzün birbiri ardınca gelişinde düşünen insanlar için elbette birçok dersler vardır."\n\nAçıklama:\nGökyüzü, yeryüzü ve zamanın düzeni rastgele bakıp geçilecek şeyler değildir; insan bunlar üzerinde düşünerek Allah’ın kudretini fark eder.',
  },
  {
    weekNumber: 19,
    surahVerse: "Âl-i İmrân 3/191",
    topic: "Hem zikretmek hem düşünmek",
    arabic:
      "ٱلَّذِينَ يَذْكُرُونَ ٱللَّهَ قِيَـٰمًا وَقُعُودًا وَعَلَىٰ جُنُوبِهِمْ وَيَتَفَكَّرُونَ فِى خَلْقِ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ رَبَّنَا مَا خَلَقْتَ هَـٰذَا بَـٰطِلًا سُبْحَـٰنَكَ فَقِنَا عَذَابَ ٱلنَّارِ",
    translation:
      "Onlar ki Allah’ı gâh ayakta divan durarak, gâh oturarak, gâh yanları üzere zikreder, göklerin ve yerin yaratılışı hakkında düşünürler ve derler ki: “Ey büyük Rabbimiz! Sen bunları gayesiz, boşuna yaratmadın. Seni bu gibi noksanlardan tenzih ederiz. Sen bizi o ateş azabından koru!”",
    explanation:
      "Kur’an, Allah’ı hatırlamakla yaratılış üzerinde düşünmeyi birlikte öğretir. İman, kalbi ve aklı beraber çalıştırır.",
    title: "Âl-i İmrân 3/191 — Hem zikretmek hem düşünmek",
    body: 'ٱلَّذِينَ يَذْكُرُونَ ٱللَّهَ قِيَـٰمًا وَقُعُودًا وَعَلَىٰ جُنُوبِهِمْ وَيَتَفَكَّرُونَ فِى خَلْقِ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ رَبَّنَا مَا خَلَقْتَ هَـٰذَا بَـٰطِلًا سُبْحَـٰنَكَ فَقِنَا عَذَابَ ٱلنَّارِ\n\nMeâl (Suat Yıldırım):\n"Onlar ki Allah’ı gâh ayakta divan durarak, gâh oturarak, gâh yanları üzere zikreder, göklerin ve yerin yaratılışı hakkında düşünürler ve derler ki: “Ey büyük Rabbimiz! Sen bunları gayesiz, boşuna yaratmadın. Seni bu gibi noksanlardan tenzih ederiz. Sen bizi o ateş azabından koru!”"\n\nAçıklama:\nKur’an, Allah’ı hatırlamakla yaratılış üzerinde düşünmeyi birlikte öğretir. İman, kalbi ve aklı beraber çalıştırır.',
  },
  {
    weekNumber: 20,
    surahVerse: "Âl-i İmrân 3/193",
    topic: "İman çağrısına cevap vermek",
    arabic:
      "رَّبَّنَآ إِنَّنَا سَمِعْنَا مُنَادِيًا يُنَادِى لِلْإِيمَـٰنِ أَنْ ءَامِنُوا۟ بِرَبِّكُمْ فَـَٔامَنَّا ۚ رَبَّنَا فَٱغْفِرْ لَنَا ذُنُوبَنَا وَكَفِّرْ عَنَّا سَيِّـَٔاتِنَا وَتَوَفَّنَا مَعَ ٱلْأَبْرَارِ",
    translation:
      "Ya Rabbena! Biz, imana çağıran ve ‘Rabbinize inanın’ diye tevhide davet eden bir zatı duyduk ve icabet ettik. Artık Sen bizi affet, kusurlarımızı bağışla ve iyilerle birlikte bizim canımızı al.",
    explanation:
      "Doğruyu duyduğunda ona yönelmek ve Allah’tan bağışlanma istemek, öğrenilen bilginin davranışa dönüşmesidir.",
    title: "Âl-i İmrân 3/193 — İman çağrısına cevap vermek",
    body: 'رَّبَّنَآ إِنَّنَا سَمِعْنَا مُنَادِيًا يُنَادِى لِلْإِيمَـٰنِ أَنْ ءَامِنُوا۟ بِرَبِّكُمْ فَـَٔامَنَّا ۚ رَبَّنَا فَٱغْفِرْ لَنَا ذُنُوبَنَا وَكَفِّرْ عَنَّا سَيِّـَٔاتِنَا وَتَوَفَّنَا مَعَ ٱلْأَبْرَارِ\n\nMeâl (Suat Yıldırım):\n"Ya Rabbena! Biz, imana çağıran ve ‘Rabbinize inanın’ diye tevhide davet eden bir zatı duyduk ve icabet ettik. Artık Sen bizi affet, kusurlarımızı bağışla ve iyilerle birlikte bizim canımızı al."\n\nAçıklama:\nDoğruyu duyduğunda ona yönelmek ve Allah’tan bağışlanma istemek, öğrenilen bilginin davranışa dönüşmesidir.',
  },
  {
    weekNumber: 21,
    surahVerse: "Âl-i İmrân 3/194",
    topic: "Allah’ın vaadine güvenmek",
    arabic:
      "رَبَّنَا وَءَاتِنَا مَا وَعَدتَّنَا عَلَىٰ رُسُلِكَ وَلَا تُخْزِنَا يَوْمَ ٱلْقِيَـٰمَةِ ۗ إِنَّكَ لَا تُخْلِفُ ٱلْمِيعَادَ",
    translation:
      "Ya Rabbena! Resullerin vasıtasıyla bize vaad ettiğin mükâfatları bize lütfet, bizi kıyamet günü rüsvay ve perişan eyleme. Sen asla sözünden dönmezsin.",
    explanation: "Mümin Allah’ın verdiği sözün doğru olduğuna güvenir ve dua etmeyi bırakmaz.",
    title: "Âl-i İmrân 3/194 — Allah’ın vaadine güvenmek",
    body: 'رَبَّنَا وَءَاتِنَا مَا وَعَدتَّنَا عَلَىٰ رُسُلِكَ وَلَا تُخْزِنَا يَوْمَ ٱلْقِيَـٰمَةِ ۗ إِنَّكَ لَا تُخْلِفُ ٱلْمِيعَادَ\n\nMeâl (Suat Yıldırım):\n"Ya Rabbena! Resullerin vasıtasıyla bize vaad ettiğin mükâfatları bize lütfet, bizi kıyamet günü rüsvay ve perişan eyleme. Sen asla sözünden dönmezsin."\n\nAçıklama:\nMümin Allah’ın verdiği sözün doğru olduğuna güvenir ve dua etmeyi bırakmaz.',
  },
  {
    weekNumber: 22,
    surahVerse: "Asr 103/2",
    topic: "Zararın farkına varmak",
    arabic: "إِنَّ ٱلْإِنسَـٰنَ لَفِى خُسْرٍ",
    translation: "İnsanlar hüsranda.",
    explanation:
      "İnsan zamanı ve imkânlarını doğru kullanmadığında kayba uğrayabilir. Bu kısa ayet, hayatı amaçsız geçirmemek için güçlü bir uyarıdır.",
    title: "Asr 103/2 — Zararın farkına varmak",
    body: 'إِنَّ ٱلْإِنسَـٰنَ لَفِى خُسْرٍ\n\nMeâl (Suat Yıldırım):\n"İnsanlar hüsranda."\n\nAçıklama:\nİnsan zamanı ve imkânlarını doğru kullanmadığında kayba uğrayabilir. Bu kısa ayet, hayatı amaçsız geçirmemek için güçlü bir uyarıdır.',
  },
  {
    weekNumber: 23,
    surahVerse: "Nisâ 4/1",
    topic: "Akrabalık bağlarını korumak",
    arabic:
      "يَـٰٓأَيُّهَا ٱلنَّاسُ ٱتَّقُوا۟ رَبَّكُمُ ٱلَّذِى خَلَقَكُم مِّن نَّفْسٍ وَٰحِدَةٍ وَخَلَقَ مِنْهَا زَوْجَهَا وَبَثَّ مِنْهُمَا رِجَالًا كَثِيرًا وَنِسَآءً ۚ وَٱتَّقُوا۟ ٱللَّهَ ٱلَّذِى تَسَآءَلُونَ بِهِۦ وَٱلْأَرْحَامَ ۚ إِنَّ ٱللَّهَ كَانَ عَلَيْكُمْ رَقِيبًا",
    translation:
      "Ey insanlar! Sizi bir tek kişiden yaratan ve ondan da eşini yaratıp o ikisinden bir çok erkekler ve kadınlar türeten Rabbinize karşı gelmekten sakının. Adını anıp Kendisini vesile ederek birbirinizden dilekte bulunduğunuz Allah’a saygısızlık etmekten ve akrabalık bağlarını koparmaktan sakınınız. Allah sizin üzerinizde tam bir gözeticidir.",
    explanation:
      "İnsanların aynı yaratılış ailesinden geldiğini bilmek, akrabalık bağlarına ve insan onuruna saygıyı güçlendirir.",
    title: "Nisâ 4/1 — Akrabalık bağlarını korumak",
    body: 'يَـٰٓأَيُّهَا ٱلنَّاسُ ٱتَّقُوا۟ رَبَّكُمُ ٱلَّذِى خَلَقَكُم مِّن نَّفْسٍ وَٰحِدَةٍ وَخَلَقَ مِنْهَا زَوْجَهَا وَبَثَّ مِنْهُمَا رِجَالًا كَثِيرًا وَنِسَآءً ۚ وَٱتَّقُوا۟ ٱللَّهَ ٱلَّذِى تَسَآءَلُونَ بِهِۦ وَٱلْأَرْحَامَ ۚ إِنَّ ٱللَّهَ كَانَ عَلَيْكُمْ رَقِيبًا\n\nMeâl (Suat Yıldırım):\n"Ey insanlar! Sizi bir tek kişiden yaratan ve ondan da eşini yaratıp o ikisinden bir çok erkekler ve kadınlar türeten Rabbinize karşı gelmekten sakının. Adını anıp Kendisini vesile ederek birbirinizden dilekte bulunduğunuz Allah’a saygısızlık etmekten ve akrabalık bağlarını koparmaktan sakınınız. Allah sizin üzerinizde tam bir gözeticidir."\n\nAçıklama:\nİnsanların aynı yaratılış ailesinden geldiğini bilmek, akrabalık bağlarına ve insan onuruna saygıyı güçlendirir.',
  },
  {
    weekNumber: 24,
    surahVerse: "En‘âm 6/95",
    topic: "Bir tohumda yaratılışı görmek",
    arabic:
      "إِنَّ ٱللَّهَ فَالِقُ ٱلْحَبِّ وَٱلنَّوَىٰ ۖ يُخْرِجُ ٱلْحَىَّ مِنَ ٱلْمَيِّتِ وَمُخْرِجُ ٱلْمَيِّتِ مِنَ ٱلْحَىِّ ۚ ذَٰلِكُمُ ٱللَّهُ ۖ فَأَنَّىٰ تُؤْفَكُونَ",
    translation:
      "Taneleri ve çekirdekleri çatlatıp yararak (her şeyi gelişme yoluna koyan) Allah’tır. Ölüden diriyi O çıkarır, diriden ölüyü çıkaran da O’dur. İşte bunları yapandır gerçek İlah! Artık nasıl oluyor da haktan uzaklaştırılıyorsunuz?",
    explanation:
      "Bir çekirdeğin yarılıp canlı bir bitkiye dönüşmesi, Allah’ın yaratmasındaki kudreti ve düzeni düşündürür.",
    title: "En‘âm 6/95 — Bir tohumda yaratılışı görmek",
    body: 'إِنَّ ٱللَّهَ فَالِقُ ٱلْحَبِّ وَٱلنَّوَىٰ ۖ يُخْرِجُ ٱلْحَىَّ مِنَ ٱلْمَيِّتِ وَمُخْرِجُ ٱلْمَيِّتِ مِنَ ٱلْحَىِّ ۚ ذَٰلِكُمُ ٱللَّهُ ۖ فَأَنَّىٰ تُؤْفَكُونَ\n\nMeâl (Suat Yıldırım):\n"Taneleri ve çekirdekleri çatlatıp yararak (her şeyi gelişme yoluna koyan) Allah’tır. Ölüden diriyi O çıkarır, diriden ölüyü çıkaran da O’dur. İşte bunları yapandır gerçek İlah! Artık nasıl oluyor da haktan uzaklaştırılıyorsunuz?"\n\nAçıklama:\nBir çekirdeğin yarılıp canlı bir bitkiye dönüşmesi, Allah’ın yaratmasındaki kudreti ve düzeni düşündürür.',
  },
  {
    weekNumber: 25,
    surahVerse: "En‘âm 6/141",
    topic: "İsraf etmemek ve hakkı vermek",
    arabic:
      "وَهُوَ ٱلَّذِىٓ أَنشَأَ جَنَّـٰتٍ مَّعْرُوشَـٰتٍ وَغَيْرَ مَعْرُوشَـٰتٍ وَٱلنَّخْلَ وَٱلزَّرْعَ مُخْتَلِفًا أُكُلُهُۥ وَٱلزَّيْتُونَ وَٱلرُّمَّانَ مُتَشَـٰبِهًا وَغَيْرَ مُتَشَـٰبِهٍ ۚ كُلُوا۟ مِن ثَمَرِهِۦٓ إِذَآ أَثْمَرَ وَءَاتُوا۟ حَقَّهُۥ يَوْمَ حَصَادِهِۦ ۖ وَلَا تُسْرِفُوٓا۟ ۚ إِنَّهُۥ لَا يُحِبُّ ٱلْمُسْرِفِينَ",
    translation:
      "Asmalı - asmasız bağ ve bahçeleri, mahsûlleri, çeşit çeşit hurma ve ekinleri, birbirine şekil ve renk yönünden benzer, tat bakımından benzemez tarzda yaratıp yetiştiren hep O’dur. Her biri mahsul verince ürününden yeyin, devşirildiği gün hakkını (öşürünü) da verin, israf etmeyin, çünkü O müsrifleri sevmez.",
    explanation: "Nimetlerden yararlanırken başkasının hakkını unutmamak ve israf etmemek gerekir.",
    title: "En‘âm 6/141 — İsraf etmemek ve hakkı vermek",
    body: 'وَهُوَ ٱلَّذِىٓ أَنشَأَ جَنَّـٰتٍ مَّعْرُوشَـٰتٍ وَغَيْرَ مَعْرُوشَـٰتٍ وَٱلنَّخْلَ وَٱلزَّرْعَ مُخْتَلِفًا أُكُلُهُۥ وَٱلزَّيْتُونَ وَٱلرُّمَّانَ مُتَشَـٰبِهًا وَغَيْرَ مُتَشَـٰبِهٍ ۚ كُلُوا۟ مِن ثَمَرِهِۦٓ إِذَآ أَثْمَرَ وَءَاتُوا۟ حَقَّهُۥ يَوْمَ حَصَادِهِۦ ۖ وَلَا تُسْرِفُوٓا۟ ۚ إِنَّهُۥ لَا يُحِبُّ ٱلْمُسْرِفِينَ\n\nMeâl (Suat Yıldırım):\n"Asmalı - asmasız bağ ve bahçeleri, mahsûlleri, çeşit çeşit hurma ve ekinleri, birbirine şekil ve renk yönünden benzer, tat bakımından benzemez tarzda yaratıp yetiştiren hep O’dur. Her biri mahsul verince ürününden yeyin, devşirildiği gün hakkını (öşürünü) da verin, israf etmeyin, çünkü O müsrifleri sevmez."\n\nAçıklama:\nNimetlerden yararlanırken başkasının hakkını unutmamak ve israf etmemek gerekir.',
  },
  {
    weekNumber: 26,
    surahVerse: "Bakara 2/25",
    topic: "İman ve güzel işlerin karşılığı",
    arabic:
      "وَبَشِّرِ ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّـٰلِحَـٰتِ أَنَّ لَهُمْ جَنَّـٰتٍ تَجْرِى مِن تَحْتِهَا ٱلْأَنْهَـٰرُ ۖ كُلَّمَا رُزِقُوا۟ مِنْهَا مِن ثَمَرَةٍ رِّزْقًا ۙ قَالُوا۟ هَـٰذَا ٱلَّذِى رُزِقْنَا مِن قَبْلُ ۖ وَأُتُوا۟ بِهِۦ مُتَشَـٰبِهًا ۖ وَلَهُمْ فِيهَآ أَزْوَٰجٌ مُّطَهَّرَةٌ ۖ وَهُمْ فِيهَا خَـٰلِدُونَ",
    translation:
      "İman edip makbul ve güzel işler yapanları müjdele: Onlara içinden ırmaklar akan cennetler vardır. Öyle cennetler ki ne zaman, meyvelerinden kendilerine birşey ikram edilirse: “Bu, daha önce de dünyada yediğimiz şey!” diyecekler. Oysa bu, onların aynısı olmayıp, benzeri olarak kendilerine sunulacaktır. Orada onların tertemiz eşleri de olacak ve onlar orada devamlı kalacaklardır.",
    explanation:
      "Kur’an, iman edip güzel işler yapanlara Allah’ın güzel karşılık hazırladığını bildirir. İyilik yaparken karşılığın kaybolmayacağına güvenmek ümit verir.",
    title: "Bakara 2/25 — İman ve güzel işlerin karşılığı",
    body: 'وَبَشِّرِ ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّـٰلِحَـٰتِ أَنَّ لَهُمْ جَنَّـٰتٍ تَجْرِى مِن تَحْتِهَا ٱلْأَنْهَـٰرُ ۖ كُلَّمَا رُزِقُوا۟ مِنْهَا مِن ثَمَرَةٍ رِّزْقًا ۙ قَالُوا۟ هَـٰذَا ٱلَّذِى رُزِقْنَا مِن قَبْلُ ۖ وَأُتُوا۟ بِهِۦ مُتَشَـٰبِهًا ۖ وَلَهُمْ فِيهَآ أَزْوَٰجٌ مُّطَهَّرَةٌ ۖ وَهُمْ فِيهَا خَـٰلِدُونَ\n\nMeâl (Suat Yıldırım):\n"İman edip makbul ve güzel işler yapanları müjdele: Onlara içinden ırmaklar akan cennetler vardır. Öyle cennetler ki ne zaman, meyvelerinden kendilerine birşey ikram edilirse: “Bu, daha önce de dünyada yediğimiz şey!” diyecekler. Oysa bu, onların aynısı olmayıp, benzeri olarak kendilerine sunulacaktır. Orada onların tertemiz eşleri de olacak ve onlar orada devamlı kalacaklardır."\n\nAçıklama:\nKur’an, iman edip güzel işler yapanlara Allah’ın güzel karşılık hazırladığını bildirir. İyilik yaparken karşılığın kaybolmayacağına güvenmek ümit verir.',
  },
  {
    weekNumber: 27,
    surahVerse: "A‘râf 7/54",
    topic: "Kâinattaki düzen",
    arabic:
      "إِنَّ رَبَّكُمُ ٱللَّهُ ٱلَّذِى خَلَقَ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضَ فِى سِتَّةِ أَيَّامٍ ثُمَّ ٱسْتَوَىٰ عَلَى ٱلْعَرْشِ يُغْشِى ٱلَّيْلَ ٱلنَّهَارَ يَطْلُبُهُۥ حَثِيثًا وَٱلشَّمْسَ وَٱلْقَمَرَ وَٱلنُّجُومَ مُسَخَّرَٰتٍۭ بِأَمْرِهِۦٓ ۗ أَلَا لَهُ ٱلْخَلْقُ وَٱلْأَمْرُ ۗ تَبَارَكَ ٱللَّهُ رَبُّ ٱلْعَـٰلَمِينَ",
    translation:
      "Rabbiniz o Allah’tır ki gökleri ve yeri altı günde yarattı. Sonra da arşa istiva buyurdu. O Allah ki geceyi, durmadan onu kovalayan gündüze bürür. Güneş, ay ve bütün yıldızlar hep O’nun buyruğu ile hareket ederler. İyi bilesiniz ki yaratmak da, emretmek yetkisi de O’na mahsustur. Evet o Rabbülâlemin olan Allah ne yücedir!",
    explanation:
      "Gece, gündüz, güneş, ay ve yıldızlardaki düzen Allah’ın yaratması ve hükmü altındadır.",
    title: "A‘râf 7/54 — Kâinattaki düzen",
    body: 'إِنَّ رَبَّكُمُ ٱللَّهُ ٱلَّذِى خَلَقَ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضَ فِى سِتَّةِ أَيَّامٍ ثُمَّ ٱسْتَوَىٰ عَلَى ٱلْعَرْشِ يُغْشِى ٱلَّيْلَ ٱلنَّهَارَ يَطْلُبُهُۥ حَثِيثًا وَٱلشَّمْسَ وَٱلْقَمَرَ وَٱلنُّجُومَ مُسَخَّرَٰتٍۭ بِأَمْرِهِۦٓ ۗ أَلَا لَهُ ٱلْخَلْقُ وَٱلْأَمْرُ ۗ تَبَارَكَ ٱللَّهُ رَبُّ ٱلْعَـٰلَمِينَ\n\nMeâl (Suat Yıldırım):\n"Rabbiniz o Allah’tır ki gökleri ve yeri altı günde yarattı. Sonra da arşa istiva buyurdu. O Allah ki geceyi, durmadan onu kovalayan gündüze bürür. Güneş, ay ve bütün yıldızlar hep O’nun buyruğu ile hareket ederler. İyi bilesiniz ki yaratmak da, emretmek yetkisi de O’na mahsustur. Evet o Rabbülâlemin olan Allah ne yücedir!"\n\nAçıklama:\nGece, gündüz, güneş, ay ve yıldızlardaki düzen Allah’ın yaratması ve hükmü altındadır.',
  },
  {
    weekNumber: 28,
    surahVerse: "Tevbe 9/100",
    topic: "Güzel örneklerin izinden gitmek",
    arabic:
      "وَٱلسَّـٰبِقُونَ ٱلْأَوَّلُونَ مِنَ ٱلْمُهَـٰجِرِينَ وَٱلْأَنصَارِ وَٱلَّذِينَ ٱتَّبَعُوهُم بِإِحْسَـٰنٍ رَّضِىَ ٱللَّهُ عَنْهُمْ وَرَضُوا۟ عَنْهُ وَأَعَدَّ لَهُمْ جَنَّـٰتٍ تَجْرِى تَحْتَهَا ٱلْأَنْهَـٰرُ خَـٰلِدِينَ فِيهَآ أَبَدًا ۚ ذَٰلِكَ ٱلْفَوْزُ ٱلْعَظِيمُ",
    translation:
      "İslâm’da birinci dereceyi kazanan Muhacirler ve Ensar ile onlara güzelce tâbi olanlar yok mu? Allah onlardan razı, onlar da Allah’tan râzı oldular. Allah onlara içlerinden ırmaklar akan cennetler hazırladı. Onlar oralara devamlı kalmak üzere gireceklerdir. İşte en büyük mutluluk, en büyük başarı!",
    explanation:
      "İlk Müslümanların fedakârlık ve sadakati, sonraki nesiller için güzel örnekler taşır.",
    title: "Tevbe 9/100 — Güzel örneklerin izinden gitmek",
    body: 'وَٱلسَّـٰبِقُونَ ٱلْأَوَّلُونَ مِنَ ٱلْمُهَـٰجِرِينَ وَٱلْأَنصَارِ وَٱلَّذِينَ ٱتَّبَعُوهُم بِإِحْسَـٰنٍ رَّضِىَ ٱللَّهُ عَنْهُمْ وَرَضُوا۟ عَنْهُ وَأَعَدَّ لَهُمْ جَنَّـٰتٍ تَجْرِى تَحْتَهَا ٱلْأَنْهَـٰرُ خَـٰلِدِينَ فِيهَآ أَبَدًا ۚ ذَٰلِكَ ٱلْفَوْزُ ٱلْعَظِيمُ\n\nMeâl (Suat Yıldırım):\n"İslâm’da birinci dereceyi kazanan Muhacirler ve Ensar ile onlara güzelce tâbi olanlar yok mu? Allah onlardan razı, onlar da Allah’tan râzı oldular. Allah onlara içlerinden ırmaklar akan cennetler hazırladı. Onlar oralara devamlı kalmak üzere gireceklerdir. İşte en büyük mutluluk, en büyük başarı!"\n\nAçıklama:\nİlk Müslümanların fedakârlık ve sadakati, sonraki nesiller için güzel örnekler taşır.',
  },
  {
    weekNumber: 29,
    surahVerse: "Yûnus 10/62",
    topic: "Allah’a yakın kulların güveni",
    arabic: "أَلَآ إِنَّ أَوْلِيَآءَ ٱللَّهِ لَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ",
    translation: "İyi bilesiniz ki Allah’ın velîlerine korku yoktur, onlar üzüntüye de uğramazlar.",
    explanation:
      "Allah’a iman edip doğru yaşayan insan, korku ve ümitsizliğin kendisini yönetmesine izin vermemeye çalışır.",
    title: "Yûnus 10/62 — Allah’a yakın kulların güveni",
    body: 'أَلَآ إِنَّ أَوْلِيَآءَ ٱللَّهِ لَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ\n\nMeâl (Suat Yıldırım):\n"İyi bilesiniz ki Allah’ın velîlerine korku yoktur, onlar üzüntüye de uğramazlar."\n\nAçıklama:\nAllah’a iman edip doğru yaşayan insan, korku ve ümitsizliğin kendisini yönetmesine izin vermemeye çalışır.',
  },
  {
    weekNumber: 30,
    surahVerse: "Hicr 15/9",
    topic: "Kur’an’ın korunması",
    arabic: "إِنَّا نَحْنُ نَزَّلْنَا ٱلذِّكْرَ وَإِنَّا لَهُۥ لَحَـٰفِظُونَ",
    translation: "Hiç şüphe yok ki o zikri, Kur’ân’ı Biz indirdik, onu koruyacak olan da Biz’iz.",
    explanation:
      "Kur’an’ın Allah tarafından indirildiğine ve korunduğuna inanmak, ona güvenle yönelmeyi öğretir.",
    title: "Hicr 15/9 — Kur’an’ın korunması",
    body: 'إِنَّا نَحْنُ نَزَّلْنَا ٱلذِّكْرَ وَإِنَّا لَهُۥ لَحَـٰفِظُونَ\n\nMeâl (Suat Yıldırım):\n"Hiç şüphe yok ki o zikri, Kur’ân’ı Biz indirdik, onu koruyacak olan da Biz’iz."\n\nAçıklama:\nKur’an’ın Allah tarafından indirildiğine ve korunduğuna inanmak, ona güvenle yönelmeyi öğretir.',
  },
  {
    weekNumber: 31,
    surahVerse: "Nahl 16/36",
    topic: "Peygamberlerin ortak çağrısı",
    arabic:
      "وَلَقَدْ بَعَثْنَا فِى كُلِّ أُمَّةٍ رَّسُولًا أَنِ ٱعْبُدُوا۟ ٱللَّهَ وَٱجْتَنِبُوا۟ ٱلطَّـٰغُوتَ ۖ فَمِنْهُم مَّنْ هَدَى ٱللَّهُ وَمِنْهُم مَّنْ حَقَّتْ عَلَيْهِ ٱلضَّلَـٰلَةُ ۚ فَسِيرُوا۟ فِى ٱلْأَرْضِ فَٱنظُرُوا۟ كَيْفَ كَانَ عَـٰقِبَةُ ٱلْمُكَذِّبِينَ",
    translation:
      "Biz her millete bir peygamber gönderdik. O da “Allah’a ibadet edin, tağuttan uzak durun!” dedi. Sonra onlardan bir kısmına Allah hidâyet nasib etti, bir kısmı hakkında da sapacaklarına dair hüküm kesinleşti. İşte gezin dolaşın dünyayı da peygamberleri yalancı sayanların âkıbetlerinin ne olduğunu görün!",
    explanation:
      "Peygamberlerin temel çağrısı Allah’a kulluk etmek ve Allah’ın yerine konulan sahte otoritelerden uzak durmaktır.",
    title: "Nahl 16/36 — Peygamberlerin ortak çağrısı",
    body: 'وَلَقَدْ بَعَثْنَا فِى كُلِّ أُمَّةٍ رَّسُولًا أَنِ ٱعْبُدُوا۟ ٱللَّهَ وَٱجْتَنِبُوا۟ ٱلطَّـٰغُوتَ ۖ فَمِنْهُم مَّنْ هَدَى ٱللَّهُ وَمِنْهُم مَّنْ حَقَّتْ عَلَيْهِ ٱلضَّلَـٰلَةُ ۚ فَسِيرُوا۟ فِى ٱلْأَرْضِ فَٱنظُرُوا۟ كَيْفَ كَانَ عَـٰقِبَةُ ٱلْمُكَذِّبِينَ\n\nMeâl (Suat Yıldırım):\n"Biz her millete bir peygamber gönderdik. O da “Allah’a ibadet edin, tağuttan uzak durun!” dedi. Sonra onlardan bir kısmına Allah hidâyet nasib etti, bir kısmı hakkında da sapacaklarına dair hüküm kesinleşti. İşte gezin dolaşın dünyayı da peygamberleri yalancı sayanların âkıbetlerinin ne olduğunu görün!"\n\nAçıklama:\nPeygamberlerin temel çağrısı Allah’a kulluk etmek ve Allah’ın yerine konulan sahte otoritelerden uzak durmaktır.',
  },
  {
    weekNumber: 32,
    surahVerse: "Nahl 16/44",
    topic: "Kur’an’ı anlamaya çalışmak",
    arabic:
      "بِٱلْبَيِّنَـٰتِ وَٱلزُّبُرِ ۗ وَأَنزَلْنَآ إِلَيْكَ ٱلذِّكْرَ لِتُبَيِّنَ لِلنَّاسِ مَا نُزِّلَ إِلَيْهِمْ وَلَعَلَّهُمْ يَتَفَكَّرُونَ",
    translation:
      "Evet, belgeler, mûcizeler ve kitaplarla gönderdik onları. Sana da ey Resulüm bu zikri indirdik ki kendilerine indirileni insanlara açıklayasın. Umulur ki düşünüp anlarlar.",
    explanation:
      "Kur’an yalnız okunmak için değil, anlaşılmak ve düşünülmek için de indirilmiştir; Peygamberimiz onun açıklayıcısıdır.",
    title: "Nahl 16/44 — Kur’an’ı anlamaya çalışmak",
    body: 'بِٱلْبَيِّنَـٰتِ وَٱلزُّبُرِ ۗ وَأَنزَلْنَآ إِلَيْكَ ٱلذِّكْرَ لِتُبَيِّنَ لِلنَّاسِ مَا نُزِّلَ إِلَيْهِمْ وَلَعَلَّهُمْ يَتَفَكَّرُونَ\n\nMeâl (Suat Yıldırım):\n"Evet, belgeler, mûcizeler ve kitaplarla gönderdik onları. Sana da ey Resulüm bu zikri indirdik ki kendilerine indirileni insanlara açıklayasın. Umulur ki düşünüp anlarlar."\n\nAçıklama:\nKur’an yalnız okunmak için değil, anlaşılmak ve düşünülmek için de indirilmiştir; Peygamberimiz onun açıklayıcısıdır.',
  },
  {
    weekNumber: 33,
    surahVerse: "İsrâ 17/24",
    topic: "Anne-babaya merhamet",
    arabic:
      "وَٱخْفِضْ لَهُمَا جَنَاحَ ٱلذُّلِّ مِنَ ٱلرَّحْمَةِ وَقُل رَّبِّ ٱرْحَمْهُمَا كَمَا رَبَّيَانِى صَغِيرًا",
    translation:
      "Şefkatle, tevazu ile kol kanat ger onlara ve şöyle dua et: “Ya Rabbî, onlar küçüklüğümde nasıl beni ihtimamla yetiştirdilerse, ona mükâfat olarak Sen de onlara merhamet buyur!”",
    explanation:
      "Anne-babaya şefkatli ve alçak gönüllü davranmak, onlar için dua etmek Kur’an’ın açık öğütlerindendir.",
    title: "İsrâ 17/24 — Anne-babaya merhamet",
    body: 'وَٱخْفِضْ لَهُمَا جَنَاحَ ٱلذُّلِّ مِنَ ٱلرَّحْمَةِ وَقُل رَّبِّ ٱرْحَمْهُمَا كَمَا رَبَّيَانِى صَغِيرًا\n\nMeâl (Suat Yıldırım):\n"Şefkatle, tevazu ile kol kanat ger onlara ve şöyle dua et: “Ya Rabbî, onlar küçüklüğümde nasıl beni ihtimamla yetiştirdilerse, ona mükâfat olarak Sen de onlara merhamet buyur!”"\n\nAçıklama:\nAnne-babaya şefkatli ve alçak gönüllü davranmak, onlar için dua etmek Kur’an’ın açık öğütlerindendir.',
  },
  {
    weekNumber: 34,
    surahVerse: "Kehf 18/23",
    topic: "Geleceği Allah’ın dilemesine bağlamak",
    arabic: "وَلَا تَقُولَنَّ لِشَا۟ىْءٍ إِنِّى فَاعِلٌ ذَٰلِكَ غَدًا",
    translation:
      "Hiçbir konuda: Allah’ın dilemesine bağlamaksızın, ‘Ben yarın mutlaka şöyle şöyle yapacağım’ deme!",
    explanation:
      "Plan yapmak gerekir; fakat geleceğin bütünüyle bizim kontrolümüzde olmadığını da bilmeliyiz. “İnşallah” bu bilinci taşır.",
    title: "Kehf 18/23 — Geleceği Allah’ın dilemesine bağlamak",
    body: 'وَلَا تَقُولَنَّ لِشَا۟ىْءٍ إِنِّى فَاعِلٌ ذَٰلِكَ غَدًا\n\nMeâl (Suat Yıldırım):\n"Hiçbir konuda: Allah’ın dilemesine bağlamaksızın, ‘Ben yarın mutlaka şöyle şöyle yapacağım’ deme!"\n\nAçıklama:\nPlan yapmak gerekir; fakat geleceğin bütünüyle bizim kontrolümüzde olmadığını da bilmeliyiz. “İnşallah” bu bilinci taşır.',
  },
  {
    weekNumber: 35,
    surahVerse: "Kehf 18/24",
    topic: "Unutunca Allah’ı hatırlamak",
    arabic:
      "إِلَّآ أَن يَشَآءَ ٱللَّهُ ۚ وَٱذْكُر رَّبَّكَ إِذَا نَسِيتَ وَقُلْ عَسَىٰٓ أَن يَهْدِيَنِ رَبِّى لِأَقْرَبَ مِنْ هَـٰذَا رَشَدًا",
    translation:
      "Bunu unuttuğun takdirde Allah’ı zikret ve: ‘Umarım ki Rabbim, doğru olma yönünden beni daha isabetli davranışa muvaffak kılar’ de.",
    explanation:
      "Bir şeyi unuttuğumuzda Allah’ı hatırlamak ve daha doğru davranış için O’ndan yardım istemek güzel bir kulluk tavrıdır.",
    title: "Kehf 18/24 — Unutunca Allah’ı hatırlamak",
    body: 'إِلَّآ أَن يَشَآءَ ٱللَّهُ ۚ وَٱذْكُر رَّبَّكَ إِذَا نَسِيتَ وَقُلْ عَسَىٰٓ أَن يَهْدِيَنِ رَبِّى لِأَقْرَبَ مِنْ هَـٰذَا رَشَدًا\n\nMeâl (Suat Yıldırım):\n"Bunu unuttuğun takdirde Allah’ı zikret ve: ‘Umarım ki Rabbim, doğru olma yönünden beni daha isabetli davranışa muvaffak kılar’ de."\n\nAçıklama:\nBir şeyi unuttuğumuzda Allah’ı hatırlamak ve daha doğru davranış için O’ndan yardım istemek güzel bir kulluk tavrıdır.',
  },
  {
    weekNumber: 36,
    surahVerse: "En‘âm 6/151",
    topic: "Temel ahlâk sınırları",
    arabic:
      "قُلْ تَعَالَوْا۟ أَتْلُ مَا حَرَّمَ رَبُّكُمْ عَلَيْكُمْ ۖ أَلَّا تُشْرِكُوا۟ بِهِۦ شَيْـًٔا ۖ وَبِٱلْوَٰلِدَيْنِ إِحْسَـٰنًا ۖ وَلَا تَقْتُلُوٓا۟ أَوْلَـٰدَكُم مِّنْ إِمْلَـٰقٍ ۖ نَّحْنُ نَرْزُقُكُمْ وَإِيَّاهُمْ ۖ وَلَا تَقْرَبُوا۟ ٱلْفَوَٰحِشَ مَا ظَهَرَ مِنْهَا وَمَا بَطَنَ ۖ وَلَا تَقْتُلُوا۟ ٱلنَّفْسَ ٱلَّتِى حَرَّمَ ٱللَّهُ إِلَّا بِٱلْحَقِّ ۚ ذَٰلِكُمْ وَصَّىٰكُم بِهِۦ لَعَلَّكُمْ تَعْقِلُونَ",
    translation:
      "De ki: “Gelin Rabbinizin size neleri haram kıldığını ben okuyup açıklayayım: O’na hiçbir şeyi ortak yapmayın, anneye babaya iyi davranın, fakirlik endişesiyle çocuklarınızı öldürmeyin, çünkü sizin de onların da rızkını veren Biz’iz. Kötülüklerin, fuhşiyatın açığına da gizlisine de yaklaşmayın. Allah’ın muhterem kıldığı cana haksız yere kıymayın. İşte aklınızı kullanırsınız diye Allah size bunları emrediyor.”",
    explanation:
      "Bu ayet; Allah’a ortak koşmamayı, anne-babaya iyi davranmayı, insan hayatını korumayı ve açık-gizli kötülüklerden uzak durmayı birlikte öğretir.",
    title: "En‘âm 6/151 — Temel ahlâk sınırları",
    body: 'قُلْ تَعَالَوْا۟ أَتْلُ مَا حَرَّمَ رَبُّكُمْ عَلَيْكُمْ ۖ أَلَّا تُشْرِكُوا۟ بِهِۦ شَيْـًٔا ۖ وَبِٱلْوَٰلِدَيْنِ إِحْسَـٰنًا ۖ وَلَا تَقْتُلُوٓا۟ أَوْلَـٰدَكُم مِّنْ إِمْلَـٰقٍ ۖ نَّحْنُ نَرْزُقُكُمْ وَإِيَّاهُمْ ۖ وَلَا تَقْرَبُوا۟ ٱلْفَوَٰحِشَ مَا ظَهَرَ مِنْهَا وَمَا بَطَنَ ۖ وَلَا تَقْتُلُوا۟ ٱلنَّفْسَ ٱلَّتِى حَرَّمَ ٱللَّهُ إِلَّا بِٱلْحَقِّ ۚ ذَٰلِكُمْ وَصَّىٰكُم بِهِۦ لَعَلَّكُمْ تَعْقِلُونَ\n\nMeâl (Suat Yıldırım):\n"De ki: “Gelin Rabbinizin size neleri haram kıldığını ben okuyup açıklayayım: O’na hiçbir şeyi ortak yapmayın, anneye babaya iyi davranın, fakirlik endişesiyle çocuklarınızı öldürmeyin, çünkü sizin de onların da rızkını veren Biz’iz. Kötülüklerin, fuhşiyatın açığına da gizlisine de yaklaşmayın. Allah’ın muhterem kıldığı cana haksız yere kıymayın. İşte aklınızı kullanırsınız diye Allah size bunları emrediyor.”"\n\nAçıklama:\nBu ayet; Allah’a ortak koşmamayı, anne-babaya iyi davranmayı, insan hayatını korumayı ve açık-gizli kötülüklerden uzak durmayı birlikte öğretir.',
  },
  {
    weekNumber: 37,
    surahVerse: "Yûsuf 12/82",
    topic: "Bir iddiayı delille desteklemek",
    arabic:
      "وَسْـَٔلِ ٱلْقَرْيَةَ ٱلَّتِى كُنَّا فِيهَا وَٱلْعِيرَ ٱلَّتِىٓ أَقْبَلْنَا فِيهَا ۖ وَإِنَّا لَصَـٰدِقُونَ",
    translation:
      "İnanmazsan, gittiğimiz şehrin ahalisine ve yine içinde geldiğimiz kafilede bulunanlara sor. Bütün samimiyetimizle ifade ediyoruz ki söylediğimiz doğrunun ta kendisidir.",
    explanation:
      "Bir haber veya iddia önemliyse, onu doğrulayabilecek kişilere ve bilgilere bakmak gerekir. Duyduğumuz her şeyi kontrol etmeden doğru kabul etmemeliyiz.",
    title: "Yûsuf 12/82 — Bir iddiayı delille desteklemek",
    body: 'وَسْـَٔلِ ٱلْقَرْيَةَ ٱلَّتِى كُنَّا فِيهَا وَٱلْعِيرَ ٱلَّتِىٓ أَقْبَلْنَا فِيهَا ۖ وَإِنَّا لَصَـٰدِقُونَ\n\nMeâl (Suat Yıldırım):\n"İnanmazsan, gittiğimiz şehrin ahalisine ve yine içinde geldiğimiz kafilede bulunanlara sor. Bütün samimiyetimizle ifade ediyoruz ki söylediğimiz doğrunun ta kendisidir."\n\nAçıklama:\nBir haber veya iddia önemliyse, onu doğrulayabilecek kişilere ve bilgilere bakmak gerekir. Duyduğumuz her şeyi kontrol etmeden doğru kabul etmemeliyiz.',
  },
  {
    weekNumber: 38,
    surahVerse: "Hac 22/77",
    topic: "İbadet ve iyilik birlikte",
    arabic:
      "يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱرْكَعُوا۟ وَٱسْجُدُوا۟ وَٱعْبُدُوا۟ رَبَّكُمْ وَٱفْعَلُوا۟ ٱلْخَيْرَ لَعَلَّكُمْ تُفْلِحُونَ ۩",
    translation:
      "Ey iman edenler! Rükû edin, secde edin, Rabbinize ibadet edin, hayır işleyin ki felaha eresiniz.",
    explanation:
      "Kur’an, ibadet etmeyi ve hayır işlemeyi birlikte emreder. İyi Müslümanlık yalnız sözde değil, davranışta da görülür.",
    title: "Hac 22/77 — İbadet ve iyilik birlikte",
    body: 'يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱرْكَعُوا۟ وَٱسْجُدُوا۟ وَٱعْبُدُوا۟ رَبَّكُمْ وَٱفْعَلُوا۟ ٱلْخَيْرَ لَعَلَّكُمْ تُفْلِحُونَ ۩\n\nMeâl (Suat Yıldırım):\n"Ey iman edenler! Rükû edin, secde edin, Rabbinize ibadet edin, hayır işleyin ki felaha eresiniz."\n\nAçıklama:\nKur’an, ibadet etmeyi ve hayır işlemeyi birlikte emreder. İyi Müslümanlık yalnız sözde değil, davranışta da görülür.',
  },
  {
    weekNumber: 39,
    surahVerse: "Ankebût 29/41",
    topic: "Gerçek dayanağı seçmek",
    arabic:
      "مَثَلُ ٱلَّذِينَ ٱتَّخَذُوا۟ مِن دُونِ ٱللَّهِ أَوْلِيَآءَ كَمَثَلِ ٱلْعَنكَبُوتِ ٱتَّخَذَتْ بَيْتًا ۖ وَإِنَّ أَوْهَنَ ٱلْبُيُوتِ لَبَيْتُ ٱلْعَنكَبُوتِ ۖ لَوْ كَانُوا۟ يَعْلَمُونَ",
    translation:
      "Allah’tan başka dost edinenlerin durumu, kendine yuva yapan örümceğin durumu gibidir. Halbuki, evlerin en çürüğü şüphesiz örümcek yuvasıdır. Keşke bilselerdi.",
    explanation:
      "Allah’tan başka şeyleri mutlak güven ve dayanak hâline getirmek, örümcek ağı kadar zayıf bir güvene dönüşebilir.",
    title: "Ankebût 29/41 — Gerçek dayanağı seçmek",
    body: 'مَثَلُ ٱلَّذِينَ ٱتَّخَذُوا۟ مِن دُونِ ٱللَّهِ أَوْلِيَآءَ كَمَثَلِ ٱلْعَنكَبُوتِ ٱتَّخَذَتْ بَيْتًا ۖ وَإِنَّ أَوْهَنَ ٱلْبُيُوتِ لَبَيْتُ ٱلْعَنكَبُوتِ ۖ لَوْ كَانُوا۟ يَعْلَمُونَ\n\nMeâl (Suat Yıldırım):\n"Allah’tan başka dost edinenlerin durumu, kendine yuva yapan örümceğin durumu gibidir. Halbuki, evlerin en çürüğü şüphesiz örümcek yuvasıdır. Keşke bilselerdi."\n\nAçıklama:\nAllah’tan başka şeyleri mutlak güven ve dayanak hâline getirmek, örümcek ağı kadar zayıf bir güvene dönüşebilir.',
  },
  {
    weekNumber: 40,
    surahVerse: "Duhâ 93/8",
    topic: "Nimeti fark etmek",
    arabic: "وَوَجَدَكَ عَآئِلًا فَأَغْنَىٰ",
    translation: "Seni muhtaç bulup ihtiyacını gidermedi mi?",
    explanation:
      "Peygamberimizin ihtiyaç içindeyken Allah’ın lütfuna kavuşması, insanın kendi hayatındaki nimetleri fark edip şükretmesini hatırlatır.",
    title: "Duhâ 93/8 — Nimeti fark etmek",
    body: 'وَوَجَدَكَ عَآئِلًا فَأَغْنَىٰ\n\nMeâl (Suat Yıldırım):\n"Seni muhtaç bulup ihtiyacını gidermedi mi?"\n\nAçıklama:\nPeygamberimizin ihtiyaç içindeyken Allah’ın lütfuna kavuşması, insanın kendi hayatındaki nimetleri fark edip şükretmesini hatırlatır.',
  },
  {
    weekNumber: 41,
    surahVerse: "Ahzâb 33/40",
    topic: "Peygamberimizin son peygamber oluşu",
    arabic:
      "مَّا كَانَ مُحَمَّدٌ أَبَآ أَحَدٍ مِّن رِّجَالِكُمْ وَلَـٰكِن رَّسُولَ ٱللَّهِ وَخَاتَمَ ٱلنَّبِيِّـۧنَ ۗ وَكَانَ ٱللَّهُ بِكُلِّ شَىْءٍ عَلِيمًا",
    translation:
      "Muhammed içinizden hiçbir erkeğin babası değildir, lâkin Allah’ın resulü ve peygamberlerin sonuncusudur. Allah her şeyi hakkıyla bilir.",
    explanation: "Hz. Muhammed Allah’ın Resulü ve peygamberlerin sonuncusudur.",
    title: "Ahzâb 33/40 — Peygamberimizin son peygamber oluşu",
    body: 'مَّا كَانَ مُحَمَّدٌ أَبَآ أَحَدٍ مِّن رِّجَالِكُمْ وَلَـٰكِن رَّسُولَ ٱللَّهِ وَخَاتَمَ ٱلنَّبِيِّـۧنَ ۗ وَكَانَ ٱللَّهُ بِكُلِّ شَىْءٍ عَلِيمًا\n\nMeâl (Suat Yıldırım):\n"Muhammed içinizden hiçbir erkeğin babası değildir, lâkin Allah’ın resulü ve peygamberlerin sonuncusudur. Allah her şeyi hakkıyla bilir."\n\nAçıklama:\nHz. Muhammed Allah’ın Resulü ve peygamberlerin sonuncusudur.',
  },
  {
    weekNumber: 42,
    surahVerse: "Duhâ 93/4",
    topic: "Zorlukta ümitli olmak",
    arabic: "وَلَلْءَاخِرَةُ خَيْرٌ لَّكَ مِنَ ٱلْأُولَىٰ",
    translation: "Elbette senin için her zaman, işin sonu, başından daha hayırlıdır.",
    explanation:
      "Ayet doğrudan Peygamberimize hitap eder. Sıkıntılı bir dönemin ardından Allah’ın daha hayırlı bir sonuç yaratabileceğini hatırlatarak ümit verir.",
    title: "Duhâ 93/4 — Zorlukta ümitli olmak",
    body: 'وَلَلْءَاخِرَةُ خَيْرٌ لَّكَ مِنَ ٱلْأُولَىٰ\n\nMeâl (Suat Yıldırım):\n"Elbette senin için her zaman, işin sonu, başından daha hayırlıdır."\n\nAçıklama:\nAyet doğrudan Peygamberimize hitap eder. Sıkıntılı bir dönemin ardından Allah’ın daha hayırlı bir sonuç yaratabileceğini hatırlatarak ümit verir.',
  },
  {
    weekNumber: 43,
    surahVerse: "Şûrâ 42/11",
    topic: "Allah hiçbir şeye benzemez",
    arabic:
      "فَاطِرُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ ۚ جَعَلَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًا وَمِنَ ٱلْأَنْعَـٰمِ أَزْوَٰجًا ۖ يَذْرَؤُكُمْ فِيهِ ۚ لَيْسَ كَمِثْلِهِۦ شَىْءٌ ۖ وَهُوَ ٱلسَّمِيعُ ٱلْبَصِيرُ",
    translation:
      "O gökleri ve yeri yoktan yaratandır. Size kendi nefislerinizden eşler yarattığı gibi davarlara da eşler yarattı. O, bu düzen içinde sizi üretiyor. Onun benzeri hiçbir şey yoktur. O, her şeyi hakkıyla işitir ve bilir.",
    explanation:
      "Allah yaratılmışlara benzemez. Onu insan veya başka bir varlık gibi düşünmemek gerekir.",
    title: "Şûrâ 42/11 — Allah hiçbir şeye benzemez",
    body: 'فَاطِرُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ ۚ جَعَلَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًا وَمِنَ ٱلْأَنْعَـٰمِ أَزْوَٰجًا ۖ يَذْرَؤُكُمْ فِيهِ ۚ لَيْسَ كَمِثْلِهِۦ شَىْءٌ ۖ وَهُوَ ٱلسَّمِيعُ ٱلْبَصِيرُ\n\nMeâl (Suat Yıldırım):\n"O gökleri ve yeri yoktan yaratandır. Size kendi nefislerinizden eşler yarattığı gibi davarlara da eşler yarattı. O, bu düzen içinde sizi üretiyor. Onun benzeri hiçbir şey yoktur. O, her şeyi hakkıyla işitir ve bilir."\n\nAçıklama:\nAllah yaratılmışlara benzemez. Onu insan veya başka bir varlık gibi düşünmemek gerekir.',
  },
  {
    weekNumber: 44,
    surahVerse: "Haşr 59/9",
    topic: "Kardeşini kendine tercih edebilmek",
    arabic:
      "وَٱلَّذِينَ تَبَوَّءُو ٱلدَّارَ وَٱلْإِيمَـٰنَ مِن قَبْلِهِمْ يُحِبُّونَ مَنْ هَاجَرَ إِلَيْهِمْ وَلَا يَجِدُونَ فِى صُدُورِهِمْ حَاجَةً مِّمَّآ أُوتُوا۟ وَيُؤْثِرُونَ عَلَىٰٓ أَنفُسِهِمْ وَلَوْ كَانَ بِهِمْ خَصَاصَةٌ ۚ وَمَن يُوقَ شُحَّ نَفْسِهِۦ فَأُو۟لَـٰٓئِكَ هُمُ ٱلْمُفْلِحُونَ",
    translation:
      "Bunlardan önce Medine’yi yurt edinip imana sarılanlar ise, kendi beldelerine hicret edenlere sevgi besler, onlara verilen ganimetlerden ötürü içlerinde bir kıskanma veya istek duymazlar. Hatta kendileri ihtiyaç duysalar bile o kardeşlerine öncelik verir, onlara verilmesini tercih ederler. Her kim nefsinin hırsından ve mala düşkünlüğünden kendini kurtarırsa, işte felah ve mutluluğa erenler onlar olacaklardır.",
    explanation:
      "Gerçek cömertlik bazen kendi ihtiyacı varken bile başkasını düşünmeyi gerektirir.",
    title: "Haşr 59/9 — Kardeşini kendine tercih edebilmek",
    body: 'وَٱلَّذِينَ تَبَوَّءُو ٱلدَّارَ وَٱلْإِيمَـٰنَ مِن قَبْلِهِمْ يُحِبُّونَ مَنْ هَاجَرَ إِلَيْهِمْ وَلَا يَجِدُونَ فِى صُدُورِهِمْ حَاجَةً مِّمَّآ أُوتُوا۟ وَيُؤْثِرُونَ عَلَىٰٓ أَنفُسِهِمْ وَلَوْ كَانَ بِهِمْ خَصَاصَةٌ ۚ وَمَن يُوقَ شُحَّ نَفْسِهِۦ فَأُو۟لَـٰٓئِكَ هُمُ ٱلْمُفْلِحُونَ\n\nMeâl (Suat Yıldırım):\n"Bunlardan önce Medine’yi yurt edinip imana sarılanlar ise, kendi beldelerine hicret edenlere sevgi besler, onlara verilen ganimetlerden ötürü içlerinde bir kıskanma veya istek duymazlar. Hatta kendileri ihtiyaç duysalar bile o kardeşlerine öncelik verir, onlara verilmesini tercih ederler. Her kim nefsinin hırsından ve mala düşkünlüğünden kendini kurtarırsa, işte felah ve mutluluğa erenler onlar olacaklardır."\n\nAçıklama:\nGerçek cömertlik bazen kendi ihtiyacı varken bile başkasını düşünmeyi gerektirir.',
  },
  {
    weekNumber: 45,
    surahVerse: "Mümtehine 60/8",
    topic: "Farklı olana iyilik ve adalet",
    arabic:
      "لَّا يَنْهَىٰكُمُ ٱللَّهُ عَنِ ٱلَّذِينَ لَمْ يُقَـٰتِلُوكُمْ فِى ٱلدِّينِ وَلَمْ يُخْرِجُوكُم مِّن دِيَـٰرِكُمْ أَن تَبَرُّوهُمْ وَتُقْسِطُوٓا۟ إِلَيْهِمْ ۚ إِنَّ ٱللَّهَ يُحِبُّ ٱلْمُقْسِطِينَ",
    translation:
      "Dininizden ötürü sizinle savaşmayan, sizi yerinizden, yurdunuzdan etmeyen kâfirlere gelince, Allah sizi, onlara iyilik etmeden, adalet ve insaf gözetmeden menetmez. Çünkü Allah âdil olanları sever.",
    explanation:
      "Dininden dolayı bize düşmanlık etmeyen insanlara karşı iyilik ve adaletle davranmak Kur’an’ın öğrettiği bir ilkedir.",
    title: "Mümtehine 60/8 — Farklı olana iyilik ve adalet",
    body: 'لَّا يَنْهَىٰكُمُ ٱللَّهُ عَنِ ٱلَّذِينَ لَمْ يُقَـٰتِلُوكُمْ فِى ٱلدِّينِ وَلَمْ يُخْرِجُوكُم مِّن دِيَـٰرِكُمْ أَن تَبَرُّوهُمْ وَتُقْسِطُوٓا۟ إِلَيْهِمْ ۚ إِنَّ ٱللَّهَ يُحِبُّ ٱلْمُقْسِطِينَ\n\nMeâl (Suat Yıldırım):\n"Dininizden ötürü sizinle savaşmayan, sizi yerinizden, yurdunuzdan etmeyen kâfirlere gelince, Allah sizi, onlara iyilik etmeden, adalet ve insaf gözetmeden menetmez. Çünkü Allah âdil olanları sever."\n\nAçıklama:\nDininden dolayı bize düşmanlık etmeyen insanlara karşı iyilik ve adaletle davranmak Kur’an’ın öğrettiği bir ilkedir.',
  },
  {
    weekNumber: 46,
    surahVerse: "Müzzemmil 73/5",
    topic: "Kur’an ağır ve değerli bir sözdür",
    arabic: "إِنَّا سَنُلْقِى عَلَيْكَ قَوْلًا ثَقِيلًا",
    translation: "Biz sana pek ağır bir söz vahyedeceğiz.",
    explanation:
      "Kur’an sıradan bir metin değildir. Onu ciddiyetle okumak, anlamaya çalışmak ve hayatımıza taşımak gerekir.",
    title: "Müzzemmil 73/5 — Kur’an ağır ve değerli bir sözdür",
    body: 'إِنَّا سَنُلْقِى عَلَيْكَ قَوْلًا ثَقِيلًا\n\nMeâl (Suat Yıldırım):\n"Biz sana pek ağır bir söz vahyedeceğiz."\n\nAçıklama:\nKur’an sıradan bir metin değildir. Onu ciddiyetle okumak, anlamaya çalışmak ve hayatımıza taşımak gerekir.',
  },
  {
    weekNumber: 47,
    surahVerse: "Duhâ 93/3",
    topic: "Allah’ın terk etmediğini bilmek",
    arabic: "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ",
    translation: "Ey Resulüm! Rabbin seni terk etmedi, sana darılmadı da.",
    explanation:
      "Zor zamanlar, Allah’ın kulunu terk ettiği anlamına gelmez. Ümit ve dua korunmalıdır.",
    title: "Duhâ 93/3 — Allah’ın terk etmediğini bilmek",
    body: 'مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ\n\nMeâl (Suat Yıldırım):\n"Ey Resulüm! Rabbin seni terk etmedi, sana darılmadı da."\n\nAçıklama:\nZor zamanlar, Allah’ın kulunu terk ettiği anlamına gelmez. Ümit ve dua korunmalıdır.',
  },
  {
    weekNumber: 48,
    surahVerse: "Duhâ 93/5",
    topic: "Geleceğe ümit ile bakmak",
    arabic: "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰٓ",
    translation:
      "Elbette Rabbin sana ileride öyle ihsan edecek, ta ki sen de O’ndan ve verdiğinden razı olacaksın.",
    explanation:
      "Ayet doğrudan Peygamberimize hitap eder; bize de sıkıntı karşısında Allah’ın lütfundan ümit kesmemeyi öğretir.",
    title: "Duhâ 93/5 — Geleceğe ümit ile bakmak",
    body: 'وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰٓ\n\nMeâl (Suat Yıldırım):\n"Elbette Rabbin sana ileride öyle ihsan edecek, ta ki sen de O’ndan ve verdiğinden razı olacaksın."\n\nAçıklama:\nAyet doğrudan Peygamberimize hitap eder; bize de sıkıntı karşısında Allah’ın lütfundan ümit kesmemeyi öğretir.',
  },
  {
    weekNumber: 49,
    surahVerse: "Duhâ 93/6",
    topic: "Geçmiş nimetleri hatırlamak",
    arabic: "أَلَمْ يَجِدْكَ يَتِيمًا فَـَٔاوَىٰ",
    translation: "Seni yetim bulup barındırmadı mı?",
    explanation:
      "Peygamberimizin yetimken Allah’ın himayesine kavuşması, insanın hayatındaki nimetleri fark etmesi gerektiğini hatırlatır.",
    title: "Duhâ 93/6 — Geçmiş nimetleri hatırlamak",
    body: 'أَلَمْ يَجِدْكَ يَتِيمًا فَـَٔاوَىٰ\n\nMeâl (Suat Yıldırım):\n"Seni yetim bulup barındırmadı mı?"\n\nAçıklama:\nPeygamberimizin yetimken Allah’ın himayesine kavuşması, insanın hayatındaki nimetleri fark etmesi gerektiğini hatırlatır.',
  },
  {
    weekNumber: 50,
    surahVerse: "Duhâ 93/9",
    topic: "Yetimi incitmemek",
    arabic: "فَأَمَّا ٱلْيَتِيمَ فَلَا تَقْهَرْ",
    translation: "Öyle ise, sakın yetimi güçsüz bulup hakkını yeme, sakın onu küçümseyip üzme!",
    explanation:
      "Güçsüz durumda olan bir çocuğu küçümsemek, üzmek veya hakkını yemek Kur’an ahlâkına aykırıdır.",
    title: "Duhâ 93/9 — Yetimi incitmemek",
    body: 'فَأَمَّا ٱلْيَتِيمَ فَلَا تَقْهَرْ\n\nMeâl (Suat Yıldırım):\n"Öyle ise, sakın yetimi güçsüz bulup hakkını yeme, sakın onu küçümseyip üzme!"\n\nAçıklama:\nGüçsüz durumda olan bir çocuğu küçümsemek, üzmek veya hakkını yemek Kur’an ahlâkına aykırıdır.',
  },
  {
    weekNumber: 51,
    surahVerse: "Duhâ 93/10",
    topic: "İsteyeni azarlamamak",
    arabic: "وَأَمَّا ٱلسَّآئِلَ فَلَا تَنْهَرْ",
    translation: "İsteyene de kaba davranma, onu azarlama!",
    explanation: "Yardım isteyen birine yardım edemiyorsak bile kaba ve kırıcı davranmamalıyız.",
    title: "Duhâ 93/10 — İsteyeni azarlamamak",
    body: 'وَأَمَّا ٱلسَّآئِلَ فَلَا تَنْهَرْ\n\nMeâl (Suat Yıldırım):\n"İsteyene de kaba davranma, onu azarlama!"\n\nAçıklama:\nYardım isteyen birine yardım edemiyorsak bile kaba ve kırıcı davranmamalıyız.',
  },
  {
    weekNumber: 52,
    surahVerse: "Duhâ 93/11",
    topic: "Nimetleri hatırlamak",
    arabic: "وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ",
    translation: "Rabbinin nimetlerini ise durmayıp söyle!",
    explanation:
      "Allah’ın verdiği nimetleri fark etmek şükre götürür; nimeti anlatmak da kibir değil, şükür bilinciyle olmalıdır.",
    title: "Duhâ 93/11 — Nimetleri hatırlamak",
    body: 'وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ\n\nMeâl (Suat Yıldırım):\n"Rabbinin nimetlerini ise durmayıp söyle!"\n\nAçıklama:\nAllah’ın verdiği nimetleri fark etmek şükre götürür; nimeti anlatmak da kibir değil, şükür bilinciyle olmalıdır.',
  },
  {
    weekNumber: 53,
    surahVerse: "Kadr 97/1",
    topic: "Kadir gecesi ve Kur’an",
    arabic: "إِنَّآ أَنزَلْنَـٰهُ فِى لَيْلَةِ ٱلْقَدْرِ",
    translation: "Biz Kur’ân’ı indirdik kadir gecesi.",
    explanation:
      "Kur’an’ın Kadir gecesinde indirilmeye başlanması, bu gecenin ve vahyin değerini hatırlatır.",
    title: "Kadr 97/1 — Kadir gecesi ve Kur’an",
    body: 'إِنَّآ أَنزَلْنَـٰهُ فِى لَيْلَةِ ٱلْقَدْرِ\n\nMeâl (Suat Yıldırım):\n"Biz Kur’ân’ı indirdik kadir gecesi."\n\nAçıklama:\nKur’an’ın Kadir gecesinde indirilmeye başlanması, bu gecenin ve vahyin değerini hatırlatır.',
  },
  {
    weekNumber: 54,
    surahVerse: "Asr 103/1",
    topic: "Zamanın değerini bilmek",
    arabic: "وَٱلْعَصْرِ",
    translation: "Yemin ederim zamana:",
    explanation:
      "Zaman geri getirilemeyen bir nimettir. Bu yüzden onu boş yere tüketmemeye çalışmalıyız.",
    title: "Asr 103/1 — Zamanın değerini bilmek",
    body: 'وَٱلْعَصْرِ\n\nMeâl (Suat Yıldırım):\n"Yemin ederim zamana:"\n\nAçıklama:\nZaman geri getirilemeyen bir nimettir. Bu yüzden onu boş yere tüketmemeye çalışmalıyız.',
  },
  {
    weekNumber: 55,
    surahVerse: "Asr 103/3",
    topic: "İman, iyi iş, hak ve sabır",
    arabic:
      "إِلَّا ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّـٰلِحَـٰتِ وَتَوَاصَوْا۟ بِٱلْحَقِّ وَتَوَاصَوْا۟ بِٱلصَّبْرِ",
    translation:
      "Ancak şunlar müstesna: İman edip makbul ve güzel işler yapanlar, bir de birbirlerine hakkı ve sabrı tavsiye edenler.",
    explanation:
      "Zarardan kurtuluş yalnız iyi niyetle olmaz; iman, güzel işler, doğruluğu ve sabrı birbirimize hatırlatmak birlikte gerekir.",
    title: "Asr 103/3 — İman, iyi iş, hak ve sabır",
    body: 'إِلَّا ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّـٰلِحَـٰتِ وَتَوَاصَوْا۟ بِٱلْحَقِّ وَتَوَاصَوْا۟ بِٱلصَّبْرِ\n\nMeâl (Suat Yıldırım):\n"Ancak şunlar müstesna: İman edip makbul ve güzel işler yapanlar, bir de birbirlerine hakkı ve sabrı tavsiye edenler."\n\nAçıklama:\nZarardan kurtuluş yalnız iyi niyetle olmaz; iman, güzel işler, doğruluğu ve sabrı birbirimize hatırlatmak birlikte gerekir.',
  },
] as const;

/**
 * Lise (4., 5. ve 6. Sınıflar) için 55 haftalık Ayet Kütüphanesi müfredatı
 * Kaynak: mufredat-docs/ayet/01_LISE_AYET_KUTUPHANESI_55.docx
 */
export const liseAyetCurriculum: readonly AyetCurriculumItem[] = [
  {
    weekNumber: 1,
    surahVerse: "Fâtiha 1/5",
    topic: "Kulluk ve istiâne",
    arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    translation: "(Haydi öyleyse deyiniz): “Yalnız Sana ibadet eder, yalnız senden medet umarız.”",
    explanation:
      "İnsanın kulluğunu yalnız Allah’a yöneltmesi, yardımın nihai kaynağını da Allah bilmesi tevhidin günlük hayattaki ifadesidir.",
    title: "Fâtiha 1/5 — Kulluk ve istiâne",
    body: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ\n\nMeâl (Suat Yıldırım):\n"(Haydi öyleyse deyiniz): “Yalnız Sana ibadet eder, yalnız senden medet umarız.”"\n\nAçıklama:\nİnsanın kulluğunu yalnız Allah’a yöneltmesi, yardımın nihai kaynağını da Allah bilmesi tevhidin günlük hayattaki ifadesidir.',
  },
  {
    weekNumber: 2,
    surahVerse: "Fâtiha 1/6",
    topic: "Hidayet talebi",
    arabic: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
    translation: "Bizi doğru yola, Sana doğru varan yola ilet.",
    explanation:
      "Doğruyu bilmek kadar doğru istikamette kalmak da önemlidir; bu yüzden hidayet talebi sürekli yenilenir.",
    title: "Fâtiha 1/6 — Hidayet talebi",
    body: 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ\n\nMeâl (Suat Yıldırım):\n"Bizi doğru yola, Sana doğru varan yola ilet."\n\nAçıklama:\nDoğruyu bilmek kadar doğru istikamette kalmak da önemlidir; bu yüzden hidayet talebi sürekli yenilenir.',
  },
  {
    weekNumber: 3,
    surahVerse: "Bakara 2/27",
    topic: "Ahit, ilişki ve toplumsal sorumluluk",
    arabic:
      "ٱلَّذِينَ يَنقُضُونَ عَهْدَ ٱللَّهِ مِنۢ بَعْدِ مِيثَـٰقِهِۦ وَيَقْطَعُونَ مَآ أَمَرَ ٱللَّهُ بِهِۦٓ أَن يُوصَلَ وَيُفْسِدُونَ فِى ٱلْأَرْضِ ۚ أُو۟لَـٰٓئِكَ هُمُ ٱلْخَـٰسِرُونَ",
    translation:
      "Bu fâsıklar o kimselerdir ki Allah’a kesin söz verdikten sonra sözlerinden dönerler. Allah’ın riayet edilmesini emrettiği ilişkileri keserler ve yeryüzünde fitne ve fesat çıkarırlar. İşte bunlar ziyana uğrayanların ta kendileridir.",
    explanation:
      "Söz bozmak, korunması emredilen bağları koparmak ve fesat üretmek bireysel tercihten öte toplumsal sonuçlar doğurur.",
    title: "Bakara 2/27 — Ahit, ilişki ve toplumsal sorumluluk",
    body: 'ٱلَّذِينَ يَنقُضُونَ عَهْدَ ٱللَّهِ مِنۢ بَعْدِ مِيثَـٰقِهِۦ وَيَقْطَعُونَ مَآ أَمَرَ ٱللَّهُ بِهِۦٓ أَن يُوصَلَ وَيُفْسِدُونَ فِى ٱلْأَرْضِ ۚ أُو۟لَـٰٓئِكَ هُمُ ٱلْخَـٰسِرُونَ\n\nMeâl (Suat Yıldırım):\n"Bu fâsıklar o kimselerdir ki Allah’a kesin söz verdikten sonra sözlerinden dönerler. Allah’ın riayet edilmesini emrettiği ilişkileri keserler ve yeryüzünde fitne ve fesat çıkarırlar. İşte bunlar ziyana uğrayanların ta kendileridir."\n\nAçıklama:\nSöz bozmak, korunması emredilen bağları koparmak ve fesat üretmek bireysel tercihten öte toplumsal sonuçlar doğurur.',
  },
  {
    weekNumber: 4,
    surahVerse: "Bakara 2/28",
    topic: "Hayat, ölüm ve dönüş",
    arabic:
      "كَيْفَ تَكْفُرُونَ بِٱللَّهِ وَكُنتُمْ أَمْوَٰتًا فَأَحْيَـٰكُمْ ۖ ثُمَّ يُمِيتُكُمْ ثُمَّ يُحْيِيكُمْ ثُمَّ إِلَيْهِ تُرْجَعُونَ",
    translation:
      "Ey kâfirler! Allah’ı nasıl inkâr edebilirsiniz ki siz ölü iken size hayatı veren O’dur. Şunu bilin ki tayin ettiği vâde gelince sizi öldürecek, yine diriltecek ve sonunda O’nun huzuruna götürüleceksiniz.",
    explanation:
      "İnsanın varlığı kendi kendine başlamadığı gibi kendi kendine de sona ermez; ayet hayatı ahiret ve hesap bilinciyle birlikte düşünmeye çağırır.",
    title: "Bakara 2/28 — Hayat, ölüm ve dönüş",
    body: 'كَيْفَ تَكْفُرُونَ بِٱللَّهِ وَكُنتُمْ أَمْوَٰتًا فَأَحْيَـٰكُمْ ۖ ثُمَّ يُمِيتُكُمْ ثُمَّ يُحْيِيكُمْ ثُمَّ إِلَيْهِ تُرْجَعُونَ\n\nMeâl (Suat Yıldırım):\n"Ey kâfirler! Allah’ı nasıl inkâr edebilirsiniz ki siz ölü iken size hayatı veren O’dur. Şunu bilin ki tayin ettiği vâde gelince sizi öldürecek, yine diriltecek ve sonunda O’nun huzuruna götürüleceksiniz."\n\nAçıklama:\nİnsanın varlığı kendi kendine başlamadığı gibi kendi kendine de sona ermez; ayet hayatı ahiret ve hesap bilinciyle birlikte düşünmeye çağırır.',
  },
  {
    weekNumber: 5,
    surahVerse: "Bakara 2/34",
    topic: "Kibrin bilgiye galip gelmesi",
    arabic:
      "وَإِذْ قُلْنَا لِلْمَلَـٰٓئِكَةِ ٱسْجُدُوا۟ لِـَٔادَمَ فَسَجَدُوٓا۟ إِلَّآ إِبْلِيسَ أَبَىٰ وَٱسْتَكْبَرَ وَكَانَ مِنَ ٱلْكَـٰفِرِينَ",
    translation:
      "O vakit meleklere: “Adem için secde edin!” dedik. İblis dışındaki bütün melekler secde ettiler. İblis bunu yapmadı, kibrine yedirmedi ve kâfirlerden oldu.",
    explanation:
      "İblis’in problemi bilgisizlikten çok kibirdi. Bilmek, insanı itaate ve tevazuya götürmüyorsa bilgi ahlâkî olgunluk üretmemiş demektir.",
    title: "Bakara 2/34 — Kibrin bilgiye galip gelmesi",
    body: 'وَإِذْ قُلْنَا لِلْمَلَـٰٓئِكَةِ ٱسْجُدُوا۟ لِـَٔادَمَ فَسَجَدُوٓا۟ إِلَّآ إِبْلِيسَ أَبَىٰ وَٱسْتَكْبَرَ وَكَانَ مِنَ ٱلْكَـٰفِرِينَ\n\nMeâl (Suat Yıldırım):\n"O vakit meleklere: “Adem için secde edin!” dedik. İblis dışındaki bütün melekler secde ettiler. İblis bunu yapmadı, kibrine yedirmedi ve kâfirlerden oldu."\n\nAçıklama:\nİblis’in problemi bilgisizlikten çok kibirdi. Bilmek, insanı itaate ve tevazuya götürmüyorsa bilgi ahlâkî olgunluk üretmemiş demektir.',
  },
  {
    weekNumber: 6,
    surahVerse: "Bakara 2/43",
    topic: "İbadet ve sosyal sorumluluk",
    arabic: "وَأَقِيمُوا۟ ٱلصَّلَوٰةَ وَءَاتُوا۟ ٱلزَّكَوٰةَ وَٱرْكَعُوا۟ مَعَ ٱلرَّٰكِعِينَ",
    translation: "Hem namazı tam kılın, zekâtı verin, rükû edenlerle beraber siz de namaz kılın.",
    explanation:
      "Namaz ve zekâtın birlikte zikredilmesi, kullukla toplumsal sorumluluğun birbirinden koparılamayacağını gösterir.",
    title: "Bakara 2/43 — İbadet ve sosyal sorumluluk",
    body: 'وَأَقِيمُوا۟ ٱلصَّلَوٰةَ وَءَاتُوا۟ ٱلزَّكَوٰةَ وَٱرْكَعُوا۟ مَعَ ٱلرَّٰكِعِينَ\n\nMeâl (Suat Yıldırım):\n"Hem namazı tam kılın, zekâtı verin, rükû edenlerle beraber siz de namaz kılın."\n\nAçıklama:\nNamaz ve zekâtın birlikte zikredilmesi, kullukla toplumsal sorumluluğun birbirinden koparılamayacağını gösterir.',
  },
  {
    weekNumber: 7,
    surahVerse: "Bakara 2/238",
    topic: "İbadet disiplini",
    arabic:
      "حَـٰفِظُوا۟ عَلَى ٱلصَّلَوَٰتِ وَٱلصَّلَوٰةِ ٱلْوُسْطَىٰ وَقُومُوا۟ لِلَّهِ قَـٰنِتِينَ",
    translation:
      "Namazlara, hele salat-ı vustaya dikkat edin ve kalkın huşû ile Allah’ın divanında durun.",
    explanation:
      "Namazları koruma emri, zaman, dikkat ve devamlılık açısından düzenli bir ibadet hayatı kurmayı gerektirir.",
    title: "Bakara 2/238 — İbadet disiplini",
    body: 'حَـٰفِظُوا۟ عَلَى ٱلصَّلَوَٰتِ وَٱلصَّلَوٰةِ ٱلْوُسْطَىٰ وَقُومُوا۟ لِلَّهِ قَـٰنِتِينَ\n\nMeâl (Suat Yıldırım):\n"Namazlara, hele salat-ı vustaya dikkat edin ve kalkın huşû ile Allah’ın divanında durun."\n\nAçıklama:\nNamazları koruma emri, zaman, dikkat ve devamlılık açısından düzenli bir ibadet hayatı kurmayı gerektirir.',
  },
  {
    weekNumber: 8,
    surahVerse: "Bakara 2/285",
    topic: "İmanın bütünlüğü",
    arabic:
      "ءَامَنَ ٱلرَّسُولُ بِمَآ أُنزِلَ إِلَيْهِ مِن رَّبِّهِۦ وَٱلْمُؤْمِنُونَ ۚ كُلٌّ ءَامَنَ بِٱللَّهِ وَمَلَـٰٓئِكَتِهِۦ وَكُتُبِهِۦ وَرُسُلِهِۦ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِۦ ۚ وَقَالُوا۟ سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ ٱلْمَصِيرُ",
    translation:
      'Peygamber, Rabbi tarafından kendisine ne indirildi ise ona iman etti, müminler de! Onlardan her biri Allah’a, meleklerine, kitaplarına ve peygamberlerine iman etti. "O’nun resullerinden hiç birini diğerinden ayırt etmeyiz." dediler ve eklediler: "İşittik ve itaat ettik ya Rabbenâ, affını dileriz, dönüşümüz Sanadır."',
    explanation:
      "İman; Allah, melekler, kitaplar ve peygamberler arasında parçalanamaz bir bütünlük kurar ve ‘işittik, itaat ettik’ sözüyle davranışa yönelir.",
    title: "Bakara 2/285 — İmanın bütünlüğü",
    body: 'ءَامَنَ ٱلرَّسُولُ بِمَآ أُنزِلَ إِلَيْهِ مِن رَّبِّهِۦ وَٱلْمُؤْمِنُونَ ۚ كُلٌّ ءَامَنَ بِٱللَّهِ وَمَلَـٰٓئِكَتِهِۦ وَكُتُبِهِۦ وَرُسُلِهِۦ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِۦ ۚ وَقَالُوا۟ سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ ٱلْمَصِيرُ\n\nMeâl (Suat Yıldırım):\n"Peygamber, Rabbi tarafından kendisine ne indirildi ise ona iman etti, müminler de! Onlardan her biri Allah’a, meleklerine, kitaplarına ve peygamberlerine iman etti. "O’nun resullerinden hiç birini diğerinden ayırt etmeyiz." dediler ve eklediler: "İşittik ve itaat ettik ya Rabbenâ, affını dileriz, dönüşümüz Sanadır.""\n\nAçıklama:\nİman; Allah, melekler, kitaplar ve peygamberler arasında parçalanamaz bir bütünlük kurar ve ‘işittik, itaat ettik’ sözüyle davranışa yönelir.',
  },
  {
    weekNumber: 9,
    surahVerse: "Bakara 2/286",
    topic: "Sorumluluk ile kapasite arasındaki denge",
    arabic:
      "لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا ٱكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَآ إِن نَّسِينَآ أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَآ إِصْرًا كَمَا حَمَلْتَهُۥ عَلَى ٱلَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِۦ ۖ وَٱعْفُ عَنَّا وَٱغْفِرْ لَنَا وَٱرْحَمْنَآ ۚ أَنتَ مَوْلَىٰنَا فَٱنصُرْنَا عَلَى ٱلْقَوْمِ ٱلْكَـٰفِرِينَ",
    translation:
      "Allah hiçbir kimseyi güç yetiremeyeceği bir şekilde yükümlü tutmaz. Herkesin kazandığı iyilik kendi lehine, işlediği fenalık da kendi aleyhinedir. Ya Rabbenâ! Eğer unuttuk veya kasıtsız olarak yanlış yaptıysak bundan dolayı bizi sorumlu tutma! Ya Rabbenâ! Bizden öncekilere yüklediğin gibi ağır yük yükleme! Ya Rabbenâ! Takat getiremeyeceğimiz şeylerle bizi yükümlü tutma! Affet bizi, lütfen bağışla kusurlarımızı, merhamet buyur bize! Sensin Mevlâmız, yardımcımız! Kâfir topluluklara karşı Sen yardım eyle bize!",
    explanation:
      "İlâhî sorumluluk insanın gücünü yok saymaz. Ayet hem mazeretçiliği hem de insanı ezip geçen aşırı yük anlayışını dengeler.",
    title: "Bakara 2/286 — Sorumluluk ile kapasite arasındaki denge",
    body: 'لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا ٱكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَآ إِن نَّسِينَآ أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَآ إِصْرًا كَمَا حَمَلْتَهُۥ عَلَى ٱلَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِۦ ۖ وَٱعْفُ عَنَّا وَٱغْفِرْ لَنَا وَٱرْحَمْنَآ ۚ أَنتَ مَوْلَىٰنَا فَٱنصُرْنَا عَلَى ٱلْقَوْمِ ٱلْكَـٰفِرِينَ\n\nMeâl (Suat Yıldırım):\n"Allah hiçbir kimseyi güç yetiremeyeceği bir şekilde yükümlü tutmaz. Herkesin kazandığı iyilik kendi lehine, işlediği fenalık da kendi aleyhinedir. Ya Rabbenâ! Eğer unuttuk veya kasıtsız olarak yanlış yaptıysak bundan dolayı bizi sorumlu tutma! Ya Rabbenâ! Bizden öncekilere yüklediğin gibi ağır yük yükleme! Ya Rabbenâ! Takat getiremeyeceğimiz şeylerle bizi yükümlü tutma! Affet bizi, lütfen bağışla kusurlarımızı, merhamet buyur bize! Sensin Mevlâmız, yardımcımız! Kâfir topluluklara karşı Sen yardım eyle bize!"\n\nAçıklama:\nİlâhî sorumluluk insanın gücünü yok saymaz. Ayet hem mazeretçiliği hem de insanı ezip geçen aşırı yük anlayışını dengeler.',
  },
  {
    weekNumber: 10,
    surahVerse: "Âl-i İmrân 3/7",
    topic: "Muhkem ve müteşabih karşısında ilmî edep",
    arabic:
      "هُوَ ٱلَّذِىٓ أَنزَلَ عَلَيْكَ ٱلْكِتَـٰبَ مِنْهُ ءَايَـٰتٌ مُّحْكَمَـٰتٌ هُنَّ أُمُّ ٱلْكِتَـٰبِ وَأُخَرُ مُتَشَـٰبِهَـٰتٌ ۖ فَأَمَّا ٱلَّذِينَ فِى قُلُوبِهِمْ زَيْغٌ فَيَتَّبِعُونَ مَا تَشَـٰبَهَ مِنْهُ ٱبْتِغَآءَ ٱلْفِتْنَةِ وَٱبْتِغَآءَ تَأْوِيلِهِۦ ۗ وَمَا يَعْلَمُ تَأْوِيلَهُۥٓ إِلَّا ٱللَّهُ ۗ وَٱلرَّٰسِخُونَ فِى ٱلْعِلْمِ يَقُولُونَ ءَامَنَّا بِهِۦ كُلٌّ مِّنْ عِندِ رَبِّنَا ۗ وَمَا يَذَّكَّرُ إِلَّآ أُو۟لُوا۟ ٱلْأَلْبَـٰبِ",
    translation:
      "Bu muazzam kitabı sana indiren Odur. Onun âyetlerinin bir kısmı muhkem olup bunlar Kitabın esasıdır. Âyetlerin bir kısmı ise müteşabihtir. Kalplerinde eğrilik olanlar sırf fitne çıkarmak, insanları saptırmak ve kendi arzularına göre yorumlamak için müteşabih kısmına tutunup onlarla uğraşır dururlar. Halbuki onların hakikatini, gerçek yorumunu Allah’tan başkası bilemez. İlimde ileri gidenler: “Biz ona olduğu gibi inandık. Hepsi de Rabbimizin katından gelmiştir” derler. Bunları ancak tam akıl sahipleri düşünüp anlar ve şöyle yalvarırlar:",
    explanation:
      "Her ayeti keyfî yorumlamak doğru değildir. Ayet, açık hükümlerle müteşabih ifadeleri ayırmayı ve anlamada niyet ile yöntemin önemini öğretir.",
    title: "Âl-i İmrân 3/7 — Muhkem ve müteşabih karşısında ilmî edep",
    body: 'هُوَ ٱلَّذِىٓ أَنزَلَ عَلَيْكَ ٱلْكِتَـٰبَ مِنْهُ ءَايَـٰتٌ مُّحْكَمَـٰتٌ هُنَّ أُمُّ ٱلْكِتَـٰبِ وَأُخَرُ مُتَشَـٰبِهَـٰتٌ ۖ فَأَمَّا ٱلَّذِينَ فِى قُلُوبِهِمْ زَيْغٌ فَيَتَّبِعُونَ مَا تَشَـٰبَهَ مِنْهُ ٱبْتِغَآءَ ٱلْفِتْنَةِ وَٱبْتِغَآءَ تَأْوِيلِهِۦ ۗ وَمَا يَعْلَمُ تَأْوِيلَهُۥٓ إِلَّا ٱللَّهُ ۗ وَٱلرَّٰسِخُونَ فِى ٱلْعِلْمِ يَقُولُونَ ءَامَنَّا بِهِۦ كُلٌّ مِّنْ عِندِ رَبِّنَا ۗ وَمَا يَذَّكَّرُ إِلَّآ أُو۟لُوا۟ ٱلْأَلْبَـٰبِ\n\nMeâl (Suat Yıldırım):\n"Bu muazzam kitabı sana indiren Odur. Onun âyetlerinin bir kısmı muhkem olup bunlar Kitabın esasıdır. Âyetlerin bir kısmı ise müteşabihtir. Kalplerinde eğrilik olanlar sırf fitne çıkarmak, insanları saptırmak ve kendi arzularına göre yorumlamak için müteşabih kısmına tutunup onlarla uğraşır dururlar. Halbuki onların hakikatini, gerçek yorumunu Allah’tan başkası bilemez. İlimde ileri gidenler: “Biz ona olduğu gibi inandık. Hepsi de Rabbimizin katından gelmiştir” derler. Bunları ancak tam akıl sahipleri düşünüp anlar ve şöyle yalvarırlar:"\n\nAçıklama:\nHer ayeti keyfî yorumlamak doğru değildir. Ayet, açık hükümlerle müteşabih ifadeleri ayırmayı ve anlamada niyet ile yöntemin önemini öğretir.',
  },
  {
    weekNumber: 11,
    surahVerse: "Âl-i İmrân 3/8",
    topic: "Kalbin istikameti için dua",
    arabic:
      "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ ٱلْوَهَّابُ",
    translation:
      "Ey bizim Kerîm Rabbimiz, bize hidâyet verdikten sonra kalplerimizi saptırma ve katından bize bir rahmet bağışla. Şüphesiz bağışı bol olan Vehhab Sensin Sen!",
    explanation:
      "Bilgi ve hidayet elde etmek tek başına yeterli değildir; insan, kalbinin eğrilmemesi için Allah’a yönelmeli ve kendi iradesini de korumalıdır.",
    title: "Âl-i İmrân 3/8 — Kalbin istikameti için dua",
    body: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ ٱلْوَهَّابُ\n\nMeâl (Suat Yıldırım):\n"Ey bizim Kerîm Rabbimiz, bize hidâyet verdikten sonra kalplerimizi saptırma ve katından bize bir rahmet bağışla. Şüphesiz bağışı bol olan Vehhab Sensin Sen!"\n\nAçıklama:\nBilgi ve hidayet elde etmek tek başına yeterli değildir; insan, kalbinin eğrilmemesi için Allah’a yönelmeli ve kendi iradesini de korumalıdır.',
  },
  {
    weekNumber: 12,
    surahVerse: "Âl-i İmrân 3/9",
    topic: "Ahiret ve hesap bilinci",
    arabic:
      "رَبَّنَآ إِنَّكَ جَامِعُ ٱلنَّاسِ لِيَوْمٍ لَّا رَيْبَ فِيهِ ۚ إِنَّ ٱللَّهَ لَا يُخْلِفُ ٱلْمِيعَادَ",
    translation:
      "Sen, geleceğinde hiç şüphe olmayan bir günde bütün insanları bir araya toplayacaksın. Allah sözünden asla dönmez.",
    explanation:
      "İnsanların yeniden bir araya getirileceği gün, adaletin ve sorumluluğun nihai ufkudur.",
    title: "Âl-i İmrân 3/9 — Ahiret ve hesap bilinci",
    body: 'رَبَّنَآ إِنَّكَ جَامِعُ ٱلنَّاسِ لِيَوْمٍ لَّا رَيْبَ فِيهِ ۚ إِنَّ ٱللَّهَ لَا يُخْلِفُ ٱلْمِيعَادَ\n\nMeâl (Suat Yıldırım):\n"Sen, geleceğinde hiç şüphe olmayan bir günde bütün insanları bir araya toplayacaksın. Allah sözünden asla dönmez."\n\nAçıklama:\nİnsanların yeniden bir araya getirileceği gün, adaletin ve sorumluluğun nihai ufkudur.',
  },
  {
    weekNumber: 13,
    surahVerse: "Âl-i İmrân 3/31",
    topic: "Allah sevgisinin ölçüsü",
    arabic:
      "قُلْ إِن كُنتُمْ تُحِبُّونَ ٱللَّهَ فَٱتَّبِعُونِى يُحْبِبْكُمُ ٱللَّهُ وَيَغْفِرْ لَكُمْ ذُنُوبَكُمْ ۗ وَٱللَّهُ غَفُورٌ رَّحِيمٌ",
    translation:
      'Ey Resulüm, de ki: "Ey insanlar, eğer Allah’ı seviyorsanız, gelin bana uyun ki Allah da sizi sevsin ve günahlarınızı bağışlasın. Allah gafurdur, rahimdir (çok affedicidir, engin merhamet ve ihsan sahibidir)."',
    explanation:
      "Allah sevgisi soyut bir iddia olarak bırakılmaz; Peygamberimizin sahih örnekliğini izleme sorumluluğuyla sınanır.",
    title: "Âl-i İmrân 3/31 — Allah sevgisinin ölçüsü",
    body: 'قُلْ إِن كُنتُمْ تُحِبُّونَ ٱللَّهَ فَٱتَّبِعُونِى يُحْبِبْكُمُ ٱللَّهُ وَيَغْفِرْ لَكُمْ ذُنُوبَكُمْ ۗ وَٱللَّهُ غَفُورٌ رَّحِيمٌ\n\nMeâl (Suat Yıldırım):\n"Ey Resulüm, de ki: "Ey insanlar, eğer Allah’ı seviyorsanız, gelin bana uyun ki Allah da sizi sevsin ve günahlarınızı bağışlasın. Allah gafurdur, rahimdir (çok affedicidir, engin merhamet ve ihsan sahibidir).""\n\nAçıklama:\nAllah sevgisi soyut bir iddia olarak bırakılmaz; Peygamberimizin sahih örnekliğini izleme sorumluluğuyla sınanır.',
  },
  {
    weekNumber: 14,
    surahVerse: "Âl-i İmrân 3/32",
    topic: "İtaatin ölçüsü",
    arabic:
      "قُلْ أَطِيعُوا۟ ٱللَّهَ وَٱلرَّسُولَ ۖ فَإِن تَوَلَّوْا۟ فَإِنَّ ٱللَّهَ لَا يُحِبُّ ٱلْكَـٰفِرِينَ",
    translation:
      'De ki: "Allah’a ve Resulullaha itaat ediniz. Şayet yüzçevirirlerse, bilsinler ki Allah kâfirleri sevmez."',
    explanation:
      "Dinî bağlılık, Allah’ın ve Resulünün rehberliğini kabul etmeyi gerektirir; yalnız kişisel beğeniye göre seçici davranmakla sınırlı değildir.",
    title: "Âl-i İmrân 3/32 — İtaatin ölçüsü",
    body: 'قُلْ أَطِيعُوا۟ ٱللَّهَ وَٱلرَّسُولَ ۖ فَإِن تَوَلَّوْا۟ فَإِنَّ ٱللَّهَ لَا يُحِبُّ ٱلْكَـٰفِرِينَ\n\nMeâl (Suat Yıldırım):\n"De ki: "Allah’a ve Resulullaha itaat ediniz. Şayet yüzçevirirlerse, bilsinler ki Allah kâfirleri sevmez.""\n\nAçıklama:\nDinî bağlılık, Allah’ın ve Resulünün rehberliğini kabul etmeyi gerektirir; yalnız kişisel beğeniye göre seçici davranmakla sınırlı değildir.',
  },
  {
    weekNumber: 15,
    surahVerse: "Âl-i İmrân 3/190",
    topic: "Akıl ve kâinatı okuma",
    arabic:
      "إِنَّ فِى خَلْقِ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ وَٱخْتِلَـٰفِ ٱلَّيْلِ وَٱلنَّهَارِ لَـَٔايَـٰتٍ لِّأُو۟لِى ٱلْأَلْبَـٰبِ",
    translation:
      "Muhakkak göklerin ve yerin yaratılışında, gece ile gündüzün birbiri ardınca gelişinde düşünen insanlar için elbette birçok dersler vardır.",
    explanation:
      "Gökler, yer ve zamanın düzeni; düşünen insanı yaratılışın anlamı ve sorumluluk üzerine düşünmeye çağıran ayetlerdir.",
    title: "Âl-i İmrân 3/190 — Akıl ve kâinatı okuma",
    body: 'إِنَّ فِى خَلْقِ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ وَٱخْتِلَـٰفِ ٱلَّيْلِ وَٱلنَّهَارِ لَـَٔايَـٰتٍ لِّأُو۟لِى ٱلْأَلْبَـٰبِ\n\nMeâl (Suat Yıldırım):\n"Muhakkak göklerin ve yerin yaratılışında, gece ile gündüzün birbiri ardınca gelişinde düşünen insanlar için elbette birçok dersler vardır."\n\nAçıklama:\nGökler, yer ve zamanın düzeni; düşünen insanı yaratılışın anlamı ve sorumluluk üzerine düşünmeye çağıran ayetlerdir.',
  },
  {
    weekNumber: 16,
    surahVerse: "Âl-i İmrân 3/191",
    topic: "Zikir ile tefekkürü birleştirmek",
    arabic:
      "ٱلَّذِينَ يَذْكُرُونَ ٱللَّهَ قِيَـٰمًا وَقُعُودًا وَعَلَىٰ جُنُوبِهِمْ وَيَتَفَكَّرُونَ فِى خَلْقِ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ رَبَّنَا مَا خَلَقْتَ هَـٰذَا بَـٰطِلًا سُبْحَـٰنَكَ فَقِنَا عَذَابَ ٱلنَّارِ",
    translation:
      "Onlar ki Allah’ı gâh ayakta divan durarak, gâh oturarak, gâh yanları üzere zikreder, göklerin ve yerin yaratılışı hakkında düşünürler ve derler ki: “Ey büyük Rabbimiz! Sen bunları gayesiz, boşuna yaratmadın. Seni bu gibi noksanlardan tenzih ederiz. Sen bizi o ateş azabından koru!”",
    explanation:
      "Kur’an, kalbin Allah’ı hatırlamasıyla aklın yaratılışı düşünmesini aynı kulluk bilincinde buluşturur.",
    title: "Âl-i İmrân 3/191 — Zikir ile tefekkürü birleştirmek",
    body: 'ٱلَّذِينَ يَذْكُرُونَ ٱللَّهَ قِيَـٰمًا وَقُعُودًا وَعَلَىٰ جُنُوبِهِمْ وَيَتَفَكَّرُونَ فِى خَلْقِ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ رَبَّنَا مَا خَلَقْتَ هَـٰذَا بَـٰطِلًا سُبْحَـٰنَكَ فَقِنَا عَذَابَ ٱلنَّارِ\n\nMeâl (Suat Yıldırım):\n"Onlar ki Allah’ı gâh ayakta divan durarak, gâh oturarak, gâh yanları üzere zikreder, göklerin ve yerin yaratılışı hakkında düşünürler ve derler ki: “Ey büyük Rabbimiz! Sen bunları gayesiz, boşuna yaratmadın. Seni bu gibi noksanlardan tenzih ederiz. Sen bizi o ateş azabından koru!”"\n\nAçıklama:\nKur’an, kalbin Allah’ı hatırlamasıyla aklın yaratılışı düşünmesini aynı kulluk bilincinde buluşturur.',
  },
  {
    weekNumber: 17,
    surahVerse: "Âl-i İmrân 3/193",
    topic: "Hakikati duyunca cevap vermek",
    arabic:
      "رَّبَّنَآ إِنَّنَا سَمِعْنَا مُنَادِيًا يُنَادِى لِلْإِيمَـٰنِ أَنْ ءَامِنُوا۟ بِرَبِّكُمْ فَـَٔامَنَّا ۚ رَبَّنَا فَٱغْفِرْ لَنَا ذُنُوبَنَا وَكَفِّرْ عَنَّا سَيِّـَٔاتِنَا وَتَوَفَّنَا مَعَ ٱلْأَبْرَارِ",
    translation:
      "Ya Rabbena! Biz, imana çağıran ve ‘Rabbinize inanın’ diye tevhide davet eden bir zatı duyduk ve icabet ettik. Artık Sen bizi affet, kusurlarımızı bağışla ve iyilerle birlikte bizim canımızı al.",
    explanation:
      "Bilgi, insanı karar vermeye çağırır. Hakikati duyduğunu söyleyen kişi, iman ve bağışlanma duasıyla buna cevap verir.",
    title: "Âl-i İmrân 3/193 — Hakikati duyunca cevap vermek",
    body: 'رَّبَّنَآ إِنَّنَا سَمِعْنَا مُنَادِيًا يُنَادِى لِلْإِيمَـٰنِ أَنْ ءَامِنُوا۟ بِرَبِّكُمْ فَـَٔامَنَّا ۚ رَبَّنَا فَٱغْفِرْ لَنَا ذُنُوبَنَا وَكَفِّرْ عَنَّا سَيِّـَٔاتِنَا وَتَوَفَّنَا مَعَ ٱلْأَبْرَارِ\n\nMeâl (Suat Yıldırım):\n"Ya Rabbena! Biz, imana çağıran ve ‘Rabbinize inanın’ diye tevhide davet eden bir zatı duyduk ve icabet ettik. Artık Sen bizi affet, kusurlarımızı bağışla ve iyilerle birlikte bizim canımızı al."\n\nAçıklama:\nBilgi, insanı karar vermeye çağırır. Hakikati duyduğunu söyleyen kişi, iman ve bağışlanma duasıyla buna cevap verir.',
  },
  {
    weekNumber: 18,
    surahVerse: "Âl-i İmrân 3/194",
    topic: "Dua ve ilâhî vaade güven",
    arabic:
      "رَبَّنَا وَءَاتِنَا مَا وَعَدتَّنَا عَلَىٰ رُسُلِكَ وَلَا تُخْزِنَا يَوْمَ ٱلْقِيَـٰمَةِ ۗ إِنَّكَ لَا تُخْلِفُ ٱلْمِيعَادَ",
    translation:
      "Ya Rabbena! Resullerin vasıtasıyla bize vaad ettiğin mükâfatları bize lütfet, bizi kıyamet günü rüsvay ve perişan eyleme. Sen asla sözünden dönmezsin.",
    explanation:
      "Mümin, Allah’ın vaadine güvenirken kendi kusurunu ve ahiretteki hesabı da unutmadan dua eder.",
    title: "Âl-i İmrân 3/194 — Dua ve ilâhî vaade güven",
    body: 'رَبَّنَا وَءَاتِنَا مَا وَعَدتَّنَا عَلَىٰ رُسُلِكَ وَلَا تُخْزِنَا يَوْمَ ٱلْقِيَـٰمَةِ ۗ إِنَّكَ لَا تُخْلِفُ ٱلْمِيعَادَ\n\nMeâl (Suat Yıldırım):\n"Ya Rabbena! Resullerin vasıtasıyla bize vaad ettiğin mükâfatları bize lütfet, bizi kıyamet günü rüsvay ve perişan eyleme. Sen asla sözünden dönmezsin."\n\nAçıklama:\nMümin, Allah’ın vaadine güvenirken kendi kusurunu ve ahiretteki hesabı da unutmadan dua eder.',
  },
  {
    weekNumber: 19,
    surahVerse: "Âl-i İmrân 3/195",
    topic: "Emeğin değeri ve ortak insanlık",
    arabic:
      "فَٱسْتَجَابَ لَهُمْ رَبُّهُمْ أَنِّى لَآ أُضِيعُ عَمَلَ عَـٰمِلٍ مِّنكُم مِّن ذَكَرٍ أَوْ أُنثَىٰ ۖ بَعْضُكُم مِّنۢ بَعْضٍ ۖ فَٱلَّذِينَ هَاجَرُوا۟ وَأُخْرِجُوا۟ مِن دِيَـٰرِهِمْ وَأُوذُوا۟ فِى سَبِيلِى وَقَـٰتَلُوا۟ وَقُتِلُوا۟ لَأُكَفِّرَنَّ عَنْهُمْ سَيِّـَٔاتِهِمْ وَلَأُدْخِلَنَّهُمْ جَنَّـٰتٍ تَجْرِى مِن تَحْتِهَا ٱلْأَنْهَـٰرُ ثَوَابًا مِّنْ عِندِ ٱللَّهِ ۗ وَٱللَّهُ عِندَهُۥ حُسْنُ ٱلثَّوَابِ",
    translation:
      "Onların Rabbi de dualarına şöyle icabet buyurdu: “Sizden gerek erkek, gerek kadın hayır işleyen hiçbir kimsenin çalışmasını zayi etmem. Çünkü siz birbirinizdensiniz, birbirinizden farkınız yoktur. Benim rızam için hicret edenlerin, vatanlarından sürülenlerin, Benim yolumda işkenceye, zarara uğrayanların, Benim yolumda savaşanların ve öldürülenlerin elbette kusurlarını örtecek ve elbette onları Allah tarafından mükâfat olarak içinden ırmaklar akan cennetlere yerleştireceğim. En güzel ödüller Allah’ın yanındadır.”",
    explanation:
      "Ayet, kadın veya erkek hiçbir hayır sahibinin emeğinin boşa gitmeyeceğini bildirir; insanın değeri sorumluluk ve amelle ilişkilendirilir.",
    title: "Âl-i İmrân 3/195 — Emeğin değeri ve ortak insanlık",
    body: 'فَٱسْتَجَابَ لَهُمْ رَبُّهُمْ أَنِّى لَآ أُضِيعُ عَمَلَ عَـٰمِلٍ مِّنكُم مِّن ذَكَرٍ أَوْ أُنثَىٰ ۖ بَعْضُكُم مِّنۢ بَعْضٍ ۖ فَٱلَّذِينَ هَاجَرُوا۟ وَأُخْرِجُوا۟ مِن دِيَـٰرِهِمْ وَأُوذُوا۟ فِى سَبِيلِى وَقَـٰتَلُوا۟ وَقُتِلُوا۟ لَأُكَفِّرَنَّ عَنْهُمْ سَيِّـَٔاتِهِمْ وَلَأُدْخِلَنَّهُمْ جَنَّـٰتٍ تَجْرِى مِن تَحْتِهَا ٱلْأَنْهَـٰرُ ثَوَابًا مِّنْ عِندِ ٱللَّهِ ۗ وَٱللَّهُ عِندَهُۥ حُسْنُ ٱلثَّوَابِ\n\nMeâl (Suat Yıldırım):\n"Onların Rabbi de dualarına şöyle icabet buyurdu: “Sizden gerek erkek, gerek kadın hayır işleyen hiçbir kimsenin çalışmasını zayi etmem. Çünkü siz birbirinizdensiniz, birbirinizden farkınız yoktur. Benim rızam için hicret edenlerin, vatanlarından sürülenlerin, Benim yolumda işkenceye, zarara uğrayanların, Benim yolumda savaşanların ve öldürülenlerin elbette kusurlarını örtecek ve elbette onları Allah tarafından mükâfat olarak içinden ırmaklar akan cennetlere yerleştireceğim. En güzel ödüller Allah’ın yanındadır.”"\n\nAçıklama:\nAyet, kadın veya erkek hiçbir hayır sahibinin emeğinin boşa gitmeyeceğini bildirir; insanın değeri sorumluluk ve amelle ilişkilendirilir.',
  },
  {
    weekNumber: 20,
    surahVerse: "Nisâ 4/1",
    topic: "Ortak yaratılış ve akrabalık hukuku",
    arabic:
      "يَـٰٓأَيُّهَا ٱلنَّاسُ ٱتَّقُوا۟ رَبَّكُمُ ٱلَّذِى خَلَقَكُم مِّن نَّفْسٍ وَٰحِدَةٍ وَخَلَقَ مِنْهَا زَوْجَهَا وَبَثَّ مِنْهُمَا رِجَالًا كَثِيرًا وَنِسَآءً ۚ وَٱتَّقُوا۟ ٱللَّهَ ٱلَّذِى تَسَآءَلُونَ بِهِۦ وَٱلْأَرْحَامَ ۚ إِنَّ ٱللَّهَ كَانَ عَلَيْكُمْ رَقِيبًا",
    translation:
      "Ey insanlar! Sizi bir tek kişiden yaratan ve ondan da eşini yaratıp o ikisinden bir çok erkekler ve kadınlar türeten Rabbinize karşı gelmekten sakının. Adını anıp Kendisini vesile ederek birbirinizden dilekte bulunduğunuz Allah’a saygısızlık etmekten ve akrabalık bağlarını koparmaktan sakınınız. Allah sizin üzerinizde tam bir gözeticidir.",
    explanation:
      "İnsanların aynı kökten gelişi, hem insan onurunu hem de akrabalık bağlarını koruma sorumluluğunu temellendirir.",
    title: "Nisâ 4/1 — Ortak yaratılış ve akrabalık hukuku",
    body: 'يَـٰٓأَيُّهَا ٱلنَّاسُ ٱتَّقُوا۟ رَبَّكُمُ ٱلَّذِى خَلَقَكُم مِّن نَّفْسٍ وَٰحِدَةٍ وَخَلَقَ مِنْهَا زَوْجَهَا وَبَثَّ مِنْهُمَا رِجَالًا كَثِيرًا وَنِسَآءً ۚ وَٱتَّقُوا۟ ٱللَّهَ ٱلَّذِى تَسَآءَلُونَ بِهِۦ وَٱلْأَرْحَامَ ۚ إِنَّ ٱللَّهَ كَانَ عَلَيْكُمْ رَقِيبًا\n\nMeâl (Suat Yıldırım):\n"Ey insanlar! Sizi bir tek kişiden yaratan ve ondan da eşini yaratıp o ikisinden bir çok erkekler ve kadınlar türeten Rabbinize karşı gelmekten sakının. Adını anıp Kendisini vesile ederek birbirinizden dilekte bulunduğunuz Allah’a saygısızlık etmekten ve akrabalık bağlarını koparmaktan sakınınız. Allah sizin üzerinizde tam bir gözeticidir."\n\nAçıklama:\nİnsanların aynı kökten gelişi, hem insan onurunu hem de akrabalık bağlarını koruma sorumluluğunu temellendirir.',
  },
  {
    weekNumber: 21,
    surahVerse: "En‘âm 6/141",
    topic: "Üretim, paylaşım ve israf",
    arabic:
      "وَهُوَ ٱلَّذِىٓ أَنشَأَ جَنَّـٰتٍ مَّعْرُوشَـٰتٍ وَغَيْرَ مَعْرُوشَـٰتٍ وَٱلنَّخْلَ وَٱلزَّرْعَ مُخْتَلِفًا أُكُلُهُۥ وَٱلزَّيْتُونَ وَٱلرُّمَّانَ مُتَشَـٰبِهًا وَغَيْرَ مُتَشَـٰبِهٍ ۚ كُلُوا۟ مِن ثَمَرِهِۦٓ إِذَآ أَثْمَرَ وَءَاتُوا۟ حَقَّهُۥ يَوْمَ حَصَادِهِۦ ۖ وَلَا تُسْرِفُوٓا۟ ۚ إِنَّهُۥ لَا يُحِبُّ ٱلْمُسْرِفِينَ",
    translation:
      "Asmalı - asmasız bağ ve bahçeleri, mahsûlleri, çeşit çeşit hurma ve ekinleri, birbirine şekil ve renk yönünden benzer, tat bakımından benzemez tarzda yaratıp yetiştiren hep O’dur. Her biri mahsul verince ürününden yeyin, devşirildiği gün hakkını (öşürünü) da verin, israf etmeyin, çünkü O müsrifleri sevmez.",
    explanation:
      "Nimetten yararlanmak meşrudur; fakat üretimde başkasının hakkını gözetmek ve israf etmemek ekonomik ahlâkın temelidir.",
    title: "En‘âm 6/141 — Üretim, paylaşım ve israf",
    body: 'وَهُوَ ٱلَّذِىٓ أَنشَأَ جَنَّـٰتٍ مَّعْرُوشَـٰتٍ وَغَيْرَ مَعْرُوشَـٰتٍ وَٱلنَّخْلَ وَٱلزَّرْعَ مُخْتَلِفًا أُكُلُهُۥ وَٱلزَّيْتُونَ وَٱلرُّمَّانَ مُتَشَـٰبِهًا وَغَيْرَ مُتَشَـٰبِهٍ ۚ كُلُوا۟ مِن ثَمَرِهِۦٓ إِذَآ أَثْمَرَ وَءَاتُوا۟ حَقَّهُۥ يَوْمَ حَصَادِهِۦ ۖ وَلَا تُسْرِفُوٓا۟ ۚ إِنَّهُۥ لَا يُحِبُّ ٱلْمُسْرِفِينَ\n\nMeâl (Suat Yıldırım):\n"Asmalı - asmasız bağ ve bahçeleri, mahsûlleri, çeşit çeşit hurma ve ekinleri, birbirine şekil ve renk yönünden benzer, tat bakımından benzemez tarzda yaratıp yetiştiren hep O’dur. Her biri mahsul verince ürününden yeyin, devşirildiği gün hakkını (öşürünü) da verin, israf etmeyin, çünkü O müsrifleri sevmez."\n\nAçıklama:\nNimetten yararlanmak meşrudur; fakat üretimde başkasının hakkını gözetmek ve israf etmemek ekonomik ahlâkın temelidir.',
  },
  {
    weekNumber: 22,
    surahVerse: "En‘âm 6/151",
    topic: "Temel ahlâk sınırları",
    arabic:
      "قُلْ تَعَالَوْا۟ أَتْلُ مَا حَرَّمَ رَبُّكُمْ عَلَيْكُمْ ۖ أَلَّا تُشْرِكُوا۟ بِهِۦ شَيْـًٔا ۖ وَبِٱلْوَٰلِدَيْنِ إِحْسَـٰنًا ۖ وَلَا تَقْتُلُوٓا۟ أَوْلَـٰدَكُم مِّنْ إِمْلَـٰقٍ ۖ نَّحْنُ نَرْزُقُكُمْ وَإِيَّاهُمْ ۖ وَلَا تَقْرَبُوا۟ ٱلْفَوَٰحِشَ مَا ظَهَرَ مِنْهَا وَمَا بَطَنَ ۖ وَلَا تَقْتُلُوا۟ ٱلنَّفْسَ ٱلَّتِى حَرَّمَ ٱللَّهُ إِلَّا بِٱلْحَقِّ ۚ ذَٰلِكُمْ وَصَّىٰكُم بِهِۦ لَعَلَّكُمْ تَعْقِلُونَ",
    translation:
      "De ki: “Gelin Rabbinizin size neleri haram kıldığını ben okuyup açıklayayım: O’na hiçbir şeyi ortak yapmayın, anneye babaya iyi davranın, fakirlik endişesiyle çocuklarınızı öldürmeyin, çünkü sizin de onların da rızkını veren Biz’iz. Kötülüklerin, fuhşiyatın açığına da gizlisine de yaklaşmayın. Allah’ın muhterem kıldığı cana haksız yere kıymayın. İşte aklınızı kullanırsınız diye Allah size bunları emrediyor.”",
    explanation:
      "Tevhid, anne-babaya iyilik, canın dokunulmazlığı ve hayasızlıktan uzak durma gibi ilkeler insan hayatının temel dokunulmazlıklarını korur.",
    title: "En‘âm 6/151 — Temel ahlâk sınırları",
    body: 'قُلْ تَعَالَوْا۟ أَتْلُ مَا حَرَّمَ رَبُّكُمْ عَلَيْكُمْ ۖ أَلَّا تُشْرِكُوا۟ بِهِۦ شَيْـًٔا ۖ وَبِٱلْوَٰلِدَيْنِ إِحْسَـٰنًا ۖ وَلَا تَقْتُلُوٓا۟ أَوْلَـٰدَكُم مِّنْ إِمْلَـٰقٍ ۖ نَّحْنُ نَرْزُقُكُمْ وَإِيَّاهُمْ ۖ وَلَا تَقْرَبُوا۟ ٱلْفَوَٰحِشَ مَا ظَهَرَ مِنْهَا وَمَا بَطَنَ ۖ وَلَا تَقْتُلُوا۟ ٱلنَّفْسَ ٱلَّتِى حَرَّمَ ٱللَّهُ إِلَّا بِٱلْحَقِّ ۚ ذَٰلِكُمْ وَصَّىٰكُم بِهِۦ لَعَلَّكُمْ تَعْقِلُونَ\n\nMeâl (Suat Yıldırım):\n"De ki: “Gelin Rabbinizin size neleri haram kıldığını ben okuyup açıklayayım: O’na hiçbir şeyi ortak yapmayın, anneye babaya iyi davranın, fakirlik endişesiyle çocuklarınızı öldürmeyin, çünkü sizin de onların da rızkını veren Biz’iz. Kötülüklerin, fuhşiyatın açığına da gizlisine de yaklaşmayın. Allah’ın muhterem kıldığı cana haksız yere kıymayın. İşte aklınızı kullanırsınız diye Allah size bunları emrediyor.”"\n\nAçıklama:\nTevhid, anne-babaya iyilik, canın dokunulmazlığı ve hayasızlıktan uzak durma gibi ilkeler insan hayatının temel dokunulmazlıklarını korur.',
  },
  {
    weekNumber: 23,
    surahVerse: "A‘râf 7/54",
    topic: "Yaratmak ve hükmetmek",
    arabic:
      "إِنَّ رَبَّكُمُ ٱللَّهُ ٱلَّذِى خَلَقَ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضَ فِى سِتَّةِ أَيَّامٍ ثُمَّ ٱسْتَوَىٰ عَلَى ٱلْعَرْشِ يُغْشِى ٱلَّيْلَ ٱلنَّهَارَ يَطْلُبُهُۥ حَثِيثًا وَٱلشَّمْسَ وَٱلْقَمَرَ وَٱلنُّجُومَ مُسَخَّرَٰتٍۭ بِأَمْرِهِۦٓ ۗ أَلَا لَهُ ٱلْخَلْقُ وَٱلْأَمْرُ ۗ تَبَارَكَ ٱللَّهُ رَبُّ ٱلْعَـٰلَمِينَ",
    translation:
      "Rabbiniz o Allah’tır ki gökleri ve yeri altı günde yarattı. Sonra da arşa istiva buyurdu. O Allah ki geceyi, durmadan onu kovalayan gündüze bürür. Güneş, ay ve bütün yıldızlar hep O’nun buyruğu ile hareket ederler. İyi bilesiniz ki yaratmak da, emretmek yetkisi de O’na mahsustur. Evet o Rabbülâlemin olan Allah ne yücedir!",
    explanation:
      "Ayet, kâinattaki düzeni Allah’ın yaratması ve emriyle ilişkilendirir; varlık ile otorite arasındaki tevhid bağını kurar.",
    title: "A‘râf 7/54 — Yaratmak ve hükmetmek",
    body: 'إِنَّ رَبَّكُمُ ٱللَّهُ ٱلَّذِى خَلَقَ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضَ فِى سِتَّةِ أَيَّامٍ ثُمَّ ٱسْتَوَىٰ عَلَى ٱلْعَرْشِ يُغْشِى ٱلَّيْلَ ٱلنَّهَارَ يَطْلُبُهُۥ حَثِيثًا وَٱلشَّمْسَ وَٱلْقَمَرَ وَٱلنُّجُومَ مُسَخَّرَٰتٍۭ بِأَمْرِهِۦٓ ۗ أَلَا لَهُ ٱلْخَلْقُ وَٱلْأَمْرُ ۗ تَبَارَكَ ٱللَّهُ رَبُّ ٱلْعَـٰلَمِينَ\n\nMeâl (Suat Yıldırım):\n"Rabbiniz o Allah’tır ki gökleri ve yeri altı günde yarattı. Sonra da arşa istiva buyurdu. O Allah ki geceyi, durmadan onu kovalayan gündüze bürür. Güneş, ay ve bütün yıldızlar hep O’nun buyruğu ile hareket ederler. İyi bilesiniz ki yaratmak da, emretmek yetkisi de O’na mahsustur. Evet o Rabbülâlemin olan Allah ne yücedir!"\n\nAçıklama:\nAyet, kâinattaki düzeni Allah’ın yaratması ve emriyle ilişkilendirir; varlık ile otorite arasındaki tevhid bağını kurar.',
  },
  {
    weekNumber: 24,
    surahVerse: "Tevbe 9/100",
    topic: "Örnek nesil ve güzel takip",
    arabic:
      "وَٱلسَّـٰبِقُونَ ٱلْأَوَّلُونَ مِنَ ٱلْمُهَـٰجِرِينَ وَٱلْأَنصَارِ وَٱلَّذِينَ ٱتَّبَعُوهُم بِإِحْسَـٰنٍ رَّضِىَ ٱللَّهُ عَنْهُمْ وَرَضُوا۟ عَنْهُ وَأَعَدَّ لَهُمْ جَنَّـٰتٍ تَجْرِى تَحْتَهَا ٱلْأَنْهَـٰرُ خَـٰلِدِينَ فِيهَآ أَبَدًا ۚ ذَٰلِكَ ٱلْفَوْزُ ٱلْعَظِيمُ",
    translation:
      "İslâm’da birinci dereceyi kazanan Muhacirler ve Ensar ile onlara güzelce tâbi olanlar yok mu? Allah onlardan razı, onlar da Allah’tan râzı oldular. Allah onlara içlerinden ırmaklar akan cennetler hazırladı. Onlar oralara devamlı kalmak üzere gireceklerdir. İşte en büyük mutluluk, en büyük başarı!",
    explanation:
      "İlk Müslümanların fedakârlığı tarih bilgisi olarak kalmaz; onları güzel biçimde izleme çağrısıyla sonraki nesillere ahlâkî bir örnek sunar.",
    title: "Tevbe 9/100 — Örnek nesil ve güzel takip",
    body: 'وَٱلسَّـٰبِقُونَ ٱلْأَوَّلُونَ مِنَ ٱلْمُهَـٰجِرِينَ وَٱلْأَنصَارِ وَٱلَّذِينَ ٱتَّبَعُوهُم بِإِحْسَـٰنٍ رَّضِىَ ٱللَّهُ عَنْهُمْ وَرَضُوا۟ عَنْهُ وَأَعَدَّ لَهُمْ جَنَّـٰتٍ تَجْرِى تَحْتَهَا ٱلْأَنْهَـٰرُ خَـٰلِدِينَ فِيهَآ أَبَدًا ۚ ذَٰلِكَ ٱلْفَوْزُ ٱلْعَظِيمُ\n\nMeâl (Suat Yıldırım):\n"İslâm’da birinci dereceyi kazanan Muhacirler ve Ensar ile onlara güzelce tâbi olanlar yok mu? Allah onlardan razı, onlar da Allah’tan râzı oldular. Allah onlara içlerinden ırmaklar akan cennetler hazırladı. Onlar oralara devamlı kalmak üzere gireceklerdir. İşte en büyük mutluluk, en büyük başarı!"\n\nAçıklama:\nİlk Müslümanların fedakârlığı tarih bilgisi olarak kalmaz; onları güzel biçimde izleme çağrısıyla sonraki nesillere ahlâkî bir örnek sunar.',
  },
  {
    weekNumber: 25,
    surahVerse: "Yûnus 10/62",
    topic: "Veli olmanın anlamı",
    arabic: "أَلَآ إِنَّ أَوْلِيَآءَ ٱللَّهِ لَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ",
    translation: "İyi bilesiniz ki Allah’ın velîlerine korku yoktur, onlar üzüntüye de uğramazlar.",
    explanation:
      "Allah’a yakınlık olağanüstülük iddiasından önce iman ve istikametle ilgilidir; gerçek güvenin kaynağı Allah’la kurulan bu bağdır.",
    title: "Yûnus 10/62 — Veli olmanın anlamı",
    body: 'أَلَآ إِنَّ أَوْلِيَآءَ ٱللَّهِ لَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ\n\nMeâl (Suat Yıldırım):\n"İyi bilesiniz ki Allah’ın velîlerine korku yoktur, onlar üzüntüye de uğramazlar."\n\nAçıklama:\nAllah’a yakınlık olağanüstülük iddiasından önce iman ve istikametle ilgilidir; gerçek güvenin kaynağı Allah’la kurulan bu bağdır.',
  },
  {
    weekNumber: 26,
    surahVerse: "Yûsuf 12/82",
    topic: "Bir iddiayı delille desteklemek",
    arabic:
      "وَسْـَٔلِ ٱلْقَرْيَةَ ٱلَّتِى كُنَّا فِيهَا وَٱلْعِيرَ ٱلَّتِىٓ أَقْبَلْنَا فِيهَا ۖ وَإِنَّا لَصَـٰدِقُونَ",
    translation:
      "İnanmazsan, gittiğimiz şehrin ahalisine ve yine içinde geldiğimiz kafilede bulunanlara sor. Bütün samimiyetimizle ifade ediyoruz ki söylediğimiz doğrunun ta kendisidir.",
    explanation:
      "Hz. Yusuf kıssasındaki bu söz, bir iddianın dışarıdan doğrulanabilir şahit ve bilgiyle desteklenebileceğini gösteren dikkat çekici bir örnektir.",
    title: "Yûsuf 12/82 — Bir iddiayı delille desteklemek",
    body: 'وَسْـَٔلِ ٱلْقَرْيَةَ ٱلَّتِى كُنَّا فِيهَا وَٱلْعِيرَ ٱلَّتِىٓ أَقْبَلْنَا فِيهَا ۖ وَإِنَّا لَصَـٰدِقُونَ\n\nMeâl (Suat Yıldırım):\n"İnanmazsan, gittiğimiz şehrin ahalisine ve yine içinde geldiğimiz kafilede bulunanlara sor. Bütün samimiyetimizle ifade ediyoruz ki söylediğimiz doğrunun ta kendisidir."\n\nAçıklama:\nHz. Yusuf kıssasındaki bu söz, bir iddianın dışarıdan doğrulanabilir şahit ve bilgiyle desteklenebileceğini gösteren dikkat çekici bir örnektir.',
  },
  {
    weekNumber: 27,
    surahVerse: "Yûsuf 12/100",
    topic: "Nimetleri okumak ve geçmişi anlamlandırmak",
    arabic:
      "وَرَفَعَ أَبَوَيْهِ عَلَى ٱلْعَرْشِ وَخَرُّوا۟ لَهُۥ سُجَّدًا ۖ وَقَالَ يَـٰٓأَبَتِ هَـٰذَا تَأْوِيلُ رُءْيَـٰىَ مِن قَبْلُ قَدْ جَعَلَهَا رَبِّى حَقًّا ۖ وَقَدْ أَحْسَنَ بِىٓ إِذْ أَخْرَجَنِى مِنَ ٱلسِّجْنِ وَجَآءَ بِكُم مِّنَ ٱلْبَدْوِ مِنۢ بَعْدِ أَن نَّزَغَ ٱلشَّيْطَـٰنُ بَيْنِى وَبَيْنَ إِخْوَتِىٓ ۚ إِنَّ رَبِّى لَطِيفٌ لِّمَا يَشَآءُ ۚ إِنَّهُۥ هُوَ ٱلْعَلِيمُ ٱلْحَكِيمُ",
    translation:
      "Annesi ile babasını tahtına oturttu. Hepsi onun önünde saygı ile eğildiler. Yusuf: “Babacığım! dedi, işte küçükken gördüğüm rüyanın tabiri! Rabbim o rüyayı gerçekleştirdi. O, bana nice ihsanlarda bulundu: Beni zindandan kurtardı ve nihayet, Şeytan benimle kardeşlerimin arasını bozduktan sonra sizi çölden getirip bana kavuşturmakla da beni ihsanına mazhar etti. Gerçekten Rabbim dilediği kimse hakkında latifdir (dilediği hususları çok güzel, pek ince bir tarzda gerçekleştirir). Şüphesiz O alîmdir, hakîmdir (herşeyi hakkıyla bilen, tam hikmet sahibidir).”",
    explanation:
      "Hz. Yusuf yaşadığı uzun imtihanı, sonunda Allah’ın lütfunu görerek anlamlandırır; başarı onu geçmiş acıları inkâra değil şükre götürür.",
    title: "Yûsuf 12/100 — Nimetleri okumak ve geçmişi anlamlandırmak",
    body: 'وَرَفَعَ أَبَوَيْهِ عَلَى ٱلْعَرْشِ وَخَرُّوا۟ لَهُۥ سُجَّدًا ۖ وَقَالَ يَـٰٓأَبَتِ هَـٰذَا تَأْوِيلُ رُءْيَـٰىَ مِن قَبْلُ قَدْ جَعَلَهَا رَبِّى حَقًّا ۖ وَقَدْ أَحْسَنَ بِىٓ إِذْ أَخْرَجَنِى مِنَ ٱلسِّجْنِ وَجَآءَ بِكُم مِّنَ ٱلْبَدْوِ مِنۢ بَعْدِ أَن نَّزَغَ ٱلشَّيْطَـٰنُ بَيْنِى وَبَيْنَ إِخْوَتِىٓ ۚ إِنَّ رَبِّى لَطِيفٌ لِّمَا يَشَآءُ ۚ إِنَّهُۥ هُوَ ٱلْعَلِيمُ ٱلْحَكِيمُ\n\nMeâl (Suat Yıldırım):\n"Annesi ile babasını tahtına oturttu. Hepsi onun önünde saygı ile eğildiler. Yusuf: “Babacığım! dedi, işte küçükken gördüğüm rüyanın tabiri! Rabbim o rüyayı gerçekleştirdi. O, bana nice ihsanlarda bulundu: Beni zindandan kurtardı ve nihayet, Şeytan benimle kardeşlerimin arasını bozduktan sonra sizi çölden getirip bana kavuşturmakla da beni ihsanına mazhar etti. Gerçekten Rabbim dilediği kimse hakkında latifdir (dilediği hususları çok güzel, pek ince bir tarzda gerçekleştirir). Şüphesiz O alîmdir, hakîmdir (herşeyi hakkıyla bilen, tam hikmet sahibidir).”"\n\nAçıklama:\nHz. Yusuf yaşadığı uzun imtihanı, sonunda Allah’ın lütfunu görerek anlamlandırır; başarı onu geçmiş acıları inkâra değil şükre götürür.',
  },
  {
    weekNumber: 28,
    surahVerse: "Hicr 15/9",
    topic: "Vahyin korunması",
    arabic: "إِنَّا نَحْنُ نَزَّلْنَا ٱلذِّكْرَ وَإِنَّا لَهُۥ لَحَـٰفِظُونَ",
    translation: "Hiç şüphe yok ki o zikri, Kur’ân’ı Biz indirdik, onu koruyacak olan da Biz’iz.",
    explanation:
      "Kur’an’ın korunması inancı, Müslümanın vahiy metnine güveninin temel dayanaklarından biridir.",
    title: "Hicr 15/9 — Vahyin korunması",
    body: 'إِنَّا نَحْنُ نَزَّلْنَا ٱلذِّكْرَ وَإِنَّا لَهُۥ لَحَـٰفِظُونَ\n\nMeâl (Suat Yıldırım):\n"Hiç şüphe yok ki o zikri, Kur’ân’ı Biz indirdik, onu koruyacak olan da Biz’iz."\n\nAçıklama:\nKur’an’ın korunması inancı, Müslümanın vahiy metnine güveninin temel dayanaklarından biridir.',
  },
  {
    weekNumber: 29,
    surahVerse: "Nahl 16/36",
    topic: "Tevhid çağrısının sürekliliği",
    arabic:
      "وَلَقَدْ بَعَثْنَا فِى كُلِّ أُمَّةٍ رَّسُولًا أَنِ ٱعْبُدُوا۟ ٱللَّهَ وَٱجْتَنِبُوا۟ ٱلطَّـٰغُوتَ ۖ فَمِنْهُم مَّنْ هَدَى ٱللَّهُ وَمِنْهُم مَّنْ حَقَّتْ عَلَيْهِ ٱلضَّلَـٰلَةُ ۚ فَسِيرُوا۟ فِى ٱلْأَرْضِ فَٱنظُرُوا۟ كَيْفَ كَانَ عَـٰقِبَةُ ٱلْمُكَذِّبِينَ",
    translation:
      "Biz her millete bir peygamber gönderdik. O da “Allah’a ibadet edin, tağuttan uzak durun!” dedi. Sonra onlardan bir kısmına Allah hidâyet nasib etti, bir kısmı hakkında da sapacaklarına dair hüküm kesinleşti. İşte gezin dolaşın dünyayı da peygamberleri yalancı sayanların âkıbetlerinin ne olduğunu görün!",
    explanation:
      "Peygamberlerin ortak çağrısı Allah’a kulluk ve tağuttan uzak durmaktır; bu, risalet tarihinin temel çizgisini gösterir.",
    title: "Nahl 16/36 — Tevhid çağrısının sürekliliği",
    body: 'وَلَقَدْ بَعَثْنَا فِى كُلِّ أُمَّةٍ رَّسُولًا أَنِ ٱعْبُدُوا۟ ٱللَّهَ وَٱجْتَنِبُوا۟ ٱلطَّـٰغُوتَ ۖ فَمِنْهُم مَّنْ هَدَى ٱللَّهُ وَمِنْهُم مَّنْ حَقَّتْ عَلَيْهِ ٱلضَّلَـٰلَةُ ۚ فَسِيرُوا۟ فِى ٱلْأَرْضِ فَٱنظُرُوا۟ كَيْفَ كَانَ عَـٰقِبَةُ ٱلْمُكَذِّبِينَ\n\nMeâl (Suat Yıldırım):\n"Biz her millete bir peygamber gönderdik. O da “Allah’a ibadet edin, tağuttan uzak durun!” dedi. Sonra onlardan bir kısmına Allah hidâyet nasib etti, bir kısmı hakkında da sapacaklarına dair hüküm kesinleşti. İşte gezin dolaşın dünyayı da peygamberleri yalancı sayanların âkıbetlerinin ne olduğunu görün!"\n\nAçıklama:\nPeygamberlerin ortak çağrısı Allah’a kulluk ve tağuttan uzak durmaktır; bu, risalet tarihinin temel çizgisini gösterir.',
  },
  {
    weekNumber: 30,
    surahVerse: "Nahl 16/44",
    topic: "Vahiy ve nebevî açıklama",
    arabic:
      "بِٱلْبَيِّنَـٰتِ وَٱلزُّبُرِ ۗ وَأَنزَلْنَآ إِلَيْكَ ٱلذِّكْرَ لِتُبَيِّنَ لِلنَّاسِ مَا نُزِّلَ إِلَيْهِمْ وَلَعَلَّهُمْ يَتَفَكَّرُونَ",
    translation:
      "Evet, belgeler, mûcizeler ve kitaplarla gönderdik onları. Sana da ey Resulüm bu zikri indirdik ki kendilerine indirileni insanlara açıklayasın. Umulur ki düşünüp anlarlar.",
    explanation:
      "Kur’an’ın anlaşılmasında Peygamberimizin açıklayıcı görevi önemlidir; vahiy ile sünnet arasındaki ilişki bu çerçevede görülmelidir.",
    title: "Nahl 16/44 — Vahiy ve nebevî açıklama",
    body: 'بِٱلْبَيِّنَـٰتِ وَٱلزُّبُرِ ۗ وَأَنزَلْنَآ إِلَيْكَ ٱلذِّكْرَ لِتُبَيِّنَ لِلنَّاسِ مَا نُزِّلَ إِلَيْهِمْ وَلَعَلَّهُمْ يَتَفَكَّرُونَ\n\nMeâl (Suat Yıldırım):\n"Evet, belgeler, mûcizeler ve kitaplarla gönderdik onları. Sana da ey Resulüm bu zikri indirdik ki kendilerine indirileni insanlara açıklayasın. Umulur ki düşünüp anlarlar."\n\nAçıklama:\nKur’an’ın anlaşılmasında Peygamberimizin açıklayıcı görevi önemlidir; vahiy ile sünnet arasındaki ilişki bu çerçevede görülmelidir.',
  },
  {
    weekNumber: 31,
    surahVerse: "İsrâ 17/24",
    topic: "Anne-baba hukukunda tevazu",
    arabic:
      "وَٱخْفِضْ لَهُمَا جَنَاحَ ٱلذُّلِّ مِنَ ٱلرَّحْمَةِ وَقُل رَّبِّ ٱرْحَمْهُمَا كَمَا رَبَّيَانِى صَغِيرًا",
    translation:
      "Şefkatle, tevazu ile kol kanat ger onlara ve şöyle dua et: “Ya Rabbî, onlar küçüklüğümde nasıl beni ihtimamla yetiştirdilerse, ona mükâfat olarak Sen de onlara merhamet buyur!”",
    explanation:
      "Anne-babaya iyilik yalnız maddî destek değildir; şefkat, tevazu ve dua da bu hukukun parçasıdır.",
    title: "İsrâ 17/24 — Anne-baba hukukunda tevazu",
    body: 'وَٱخْفِضْ لَهُمَا جَنَاحَ ٱلذُّلِّ مِنَ ٱلرَّحْمَةِ وَقُل رَّبِّ ٱرْحَمْهُمَا كَمَا رَبَّيَانِى صَغِيرًا\n\nMeâl (Suat Yıldırım):\n"Şefkatle, tevazu ile kol kanat ger onlara ve şöyle dua et: “Ya Rabbî, onlar küçüklüğümde nasıl beni ihtimamla yetiştirdilerse, ona mükâfat olarak Sen de onlara merhamet buyur!”"\n\nAçıklama:\nAnne-babaya iyilik yalnız maddî destek değildir; şefkat, tevazu ve dua da bu hukukun parçasıdır.',
  },
  {
    weekNumber: 32,
    surahVerse: "Kehf 18/23",
    topic: "Plan yapmak ve mutlak kontrol iddiasından kaçınmak",
    arabic: "وَلَا تَقُولَنَّ لِشَا۟ىْءٍ إِنِّى فَاعِلٌ ذَٰلِكَ غَدًا",
    translation:
      "Hiçbir konuda: Allah’ın dilemesine bağlamaksızın, ‘Ben yarın mutlaka şöyle şöyle yapacağım’ deme!",
    explanation:
      "İnsan gelecek için plan yapar fakat sonucu kendi iradesine mutlak biçimde bağlamaz. ‘İnşallah’ sorumluluğu terk etmek değil, haddini bilmektir.",
    title: "Kehf 18/23 — Plan yapmak ve mutlak kontrol iddiasından kaçınmak",
    body: 'وَلَا تَقُولَنَّ لِشَا۟ىْءٍ إِنِّى فَاعِلٌ ذَٰلِكَ غَدًا\n\nMeâl (Suat Yıldırım):\n"Hiçbir konuda: Allah’ın dilemesine bağlamaksızın, ‘Ben yarın mutlaka şöyle şöyle yapacağım’ deme!"\n\nAçıklama:\nİnsan gelecek için plan yapar fakat sonucu kendi iradesine mutlak biçimde bağlamaz. ‘İnşallah’ sorumluluğu terk etmek değil, haddini bilmektir.',
  },
  {
    weekNumber: 33,
    surahVerse: "Kehf 18/24",
    topic: "Unutma, zikir ve daha isabetli olana yönelme",
    arabic:
      "إِلَّآ أَن يَشَآءَ ٱللَّهُ ۚ وَٱذْكُر رَّبَّكَ إِذَا نَسِيتَ وَقُلْ عَسَىٰٓ أَن يَهْدِيَنِ رَبِّى لِأَقْرَبَ مِنْ هَـٰذَا رَشَدًا",
    translation:
      "Bunu unuttuğun takdirde Allah’ı zikret ve: ‘Umarım ki Rabbim, doğru olma yönünden beni daha isabetli davranışa muvaffak kılar’ de.",
    explanation:
      "Hata veya unutma sonrasında insan yeniden yönünü belirleyebilir; ayet zikirle birlikte daha doğru davranış arayışını öğretir.",
    title: "Kehf 18/24 — Unutma, zikir ve daha isabetli olana yönelme",
    body: 'إِلَّآ أَن يَشَآءَ ٱللَّهُ ۚ وَٱذْكُر رَّبَّكَ إِذَا نَسِيتَ وَقُلْ عَسَىٰٓ أَن يَهْدِيَنِ رَبِّى لِأَقْرَبَ مِنْ هَـٰذَا رَشَدًا\n\nMeâl (Suat Yıldırım):\n"Bunu unuttuğun takdirde Allah’ı zikret ve: ‘Umarım ki Rabbim, doğru olma yönünden beni daha isabetli davranışa muvaffak kılar’ de."\n\nAçıklama:\nHata veya unutma sonrasında insan yeniden yönünü belirleyebilir; ayet zikirle birlikte daha doğru davranış arayışını öğretir.',
  },
  {
    weekNumber: 34,
    surahVerse: "Hac 22/73",
    topic: "Sahte mutlaklıklara karşı tevhid",
    arabic:
      "يَـٰٓأَيُّهَا ٱلنَّاسُ ضُرِبَ مَثَلٌ فَٱسْتَمِعُوا۟ لَهُۥٓ ۚ إِنَّ ٱلَّذِينَ تَدْعُونَ مِن دُونِ ٱللَّهِ لَن يَخْلُقُوا۟ ذُبَابًا وَلَوِ ٱجْتَمَعُوا۟ لَهُۥ ۖ وَإِن يَسْلُبْهُمُ ٱلذُّبَابُ شَيْـًٔا لَّا يَسْتَنقِذُوهُ مِنْهُ ۚ ضَعُفَ ٱلطَّالِبُ وَٱلْمَطْلُوبُ",
    translation:
      "Ey insanlar! İşte size bir misal veriliyor, ona iyi kulak verin: Sizin Allah’tan başka yalvardığınız bütün sahte tanrılar güç birliği yapsalar da, bir sinek bile yaratamazlar. Hatta sinek onlardan bir şey kapsa, onu dahi kurtarıp geri alamazlar. İsteyen de, kendinden istenilen de, kaçan da kovalayan da ne kadar güçsüz!",
    explanation:
      "İnsanın ilahlaştırdığı veya mutlak güç atfettiği varlıkların yaratma kudretinden yoksun oluşu, tevhidin aklî yönünü çarpıcı bir temsille gösterir.",
    title: "Hac 22/73 — Sahte mutlaklıklara karşı tevhid",
    body: 'يَـٰٓأَيُّهَا ٱلنَّاسُ ضُرِبَ مَثَلٌ فَٱسْتَمِعُوا۟ لَهُۥٓ ۚ إِنَّ ٱلَّذِينَ تَدْعُونَ مِن دُونِ ٱللَّهِ لَن يَخْلُقُوا۟ ذُبَابًا وَلَوِ ٱجْتَمَعُوا۟ لَهُۥ ۖ وَإِن يَسْلُبْهُمُ ٱلذُّبَابُ شَيْـًٔا لَّا يَسْتَنقِذُوهُ مِنْهُ ۚ ضَعُفَ ٱلطَّالِبُ وَٱلْمَطْلُوبُ\n\nMeâl (Suat Yıldırım):\n"Ey insanlar! İşte size bir misal veriliyor, ona iyi kulak verin: Sizin Allah’tan başka yalvardığınız bütün sahte tanrılar güç birliği yapsalar da, bir sinek bile yaratamazlar. Hatta sinek onlardan bir şey kapsa, onu dahi kurtarıp geri alamazlar. İsteyen de, kendinden istenilen de, kaçan da kovalayan da ne kadar güçsüz!"\n\nAçıklama:\nİnsanın ilahlaştırdığı veya mutlak güç atfettiği varlıkların yaratma kudretinden yoksun oluşu, tevhidin aklî yönünü çarpıcı bir temsille gösterir.',
  },
  {
    weekNumber: 35,
    surahVerse: "Hac 22/74",
    topic: "Allah’ı gereği gibi takdir etmek",
    arabic: "مَا قَدَرُوا۟ ٱللَّهَ حَقَّ قَدْرِهِۦٓ ۗ إِنَّ ٱللَّهَ لَقَوِىٌّ عَزِيزٌ",
    translation:
      "Onlar Allah’ı gereği gibi tanıyıp takdir edemediler. Şüphesiz Allah Kavî’dir, Azîz’dir; pek güçlüdür, mutlak galiptir.",
    explanation:
      "Allah tasavvurundaki eksiklik, kulluk ve değer ölçülerini de bozar. Ayet Allah’ın kudretini ve üstünlüğünü doğru tanımaya çağırır.",
    title: "Hac 22/74 — Allah’ı gereği gibi takdir etmek",
    body: 'مَا قَدَرُوا۟ ٱللَّهَ حَقَّ قَدْرِهِۦٓ ۗ إِنَّ ٱللَّهَ لَقَوِىٌّ عَزِيزٌ\n\nMeâl (Suat Yıldırım):\n"Onlar Allah’ı gereği gibi tanıyıp takdir edemediler. Şüphesiz Allah Kavî’dir, Azîz’dir; pek güçlüdür, mutlak galiptir."\n\nAçıklama:\nAllah tasavvurundaki eksiklik, kulluk ve değer ölçülerini de bozar. Ayet Allah’ın kudretini ve üstünlüğünü doğru tanımaya çağırır.',
  },
  {
    weekNumber: 36,
    surahVerse: "Hac 22/75",
    topic: "Risaletin ilâhî seçimi",
    arabic:
      "ٱللَّهُ يَصْطَفِى مِنَ ٱلْمَلَـٰٓئِكَةِ رُسُلًا وَمِنَ ٱلنَّاسِ ۚ إِنَّ ٱللَّهَ سَمِيعٌۢ بَصِيرٌ",
    translation:
      "Allah meleklerden de elçiler seçer, insanlardan da. Şüphesiz Allah her şeyi işitir, her şeyi görür.",
    explanation:
      "Elçilik görevinin Allah’ın seçimiyle gerçekleşmesi, vahyin kaynağının insan iradesi değil ilâhî irade olduğunu hatırlatır.",
    title: "Hac 22/75 — Risaletin ilâhî seçimi",
    body: 'ٱللَّهُ يَصْطَفِى مِنَ ٱلْمَلَـٰٓئِكَةِ رُسُلًا وَمِنَ ٱلنَّاسِ ۚ إِنَّ ٱللَّهَ سَمِيعٌۢ بَصِيرٌ\n\nMeâl (Suat Yıldırım):\n"Allah meleklerden de elçiler seçer, insanlardan da. Şüphesiz Allah her şeyi işitir, her şeyi görür."\n\nAçıklama:\nElçilik görevinin Allah’ın seçimiyle gerçekleşmesi, vahyin kaynağının insan iradesi değil ilâhî irade olduğunu hatırlatır.',
  },
  {
    weekNumber: 37,
    surahVerse: "Hac 22/76",
    topic: "İlâhî bilgi ve dönüş",
    arabic:
      "يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۗ وَإِلَى ٱللَّهِ تُرْجَعُ ٱلْأُمُورُ",
    translation:
      "Onların önlerinde olanı da arkalarında olanı da bilir. Bütün işler sonunda yalnız Allah’a döndürülür.",
    explanation:
      "Allah’ın bilgisi geçmişi, geleceği ve görünmeyeni kuşatır; bütün işlerin O’na dönmesi hesap bilincini tamamlar.",
    title: "Hac 22/76 — İlâhî bilgi ve dönüş",
    body: 'يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۗ وَإِلَى ٱللَّهِ تُرْجَعُ ٱلْأُمُورُ\n\nMeâl (Suat Yıldırım):\n"Onların önlerinde olanı da arkalarında olanı da bilir. Bütün işler sonunda yalnız Allah’a döndürülür."\n\nAçıklama:\nAllah’ın bilgisi geçmişi, geleceği ve görünmeyeni kuşatır; bütün işlerin O’na dönmesi hesap bilincini tamamlar.',
  },
  {
    weekNumber: 38,
    surahVerse: "Hac 22/77",
    topic: "İbadetten hayra uzanan kulluk",
    arabic:
      "يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱرْكَعُوا۟ وَٱسْجُدُوا۟ وَٱعْبُدُوا۟ رَبَّكُمْ وَٱفْعَلُوا۟ ٱلْخَيْرَ لَعَلَّكُمْ تُفْلِحُونَ ۩",
    translation:
      "Ey iman edenler! Rükû edin, secde edin, Rabbinize ibadet edin, hayır işleyin ki felaha eresiniz.",
    explanation:
      "Rükû ve secde ile başlayan ayet, kulluğu hayır işlemeye bağlar. İbadet toplumsal iyilikten kopuk değildir.",
    title: "Hac 22/77 — İbadetten hayra uzanan kulluk",
    body: 'يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱرْكَعُوا۟ وَٱسْجُدُوا۟ وَٱعْبُدُوا۟ رَبَّكُمْ وَٱفْعَلُوا۟ ٱلْخَيْرَ لَعَلَّكُمْ تُفْلِحُونَ ۩\n\nMeâl (Suat Yıldırım):\n"Ey iman edenler! Rükû edin, secde edin, Rabbinize ibadet edin, hayır işleyin ki felaha eresiniz."\n\nAçıklama:\nRükû ve secde ile başlayan ayet, kulluğu hayır işlemeye bağlar. İbadet toplumsal iyilikten kopuk değildir.',
  },
  {
    weekNumber: 39,
    surahVerse: "Hac 22/78",
    topic: "Kimlik, sorumluluk ve kolaylık",
    arabic:
      "وَجَـٰهِدُوا۟ فِى ٱللَّهِ حَقَّ جِهَادِهِۦ ۚ هُوَ ٱجْتَبَىٰكُمْ وَمَا جَعَلَ عَلَيْكُمْ فِى ٱلدِّينِ مِنْ حَرَجٍ ۚ مِّلَّةَ أَبِيكُمْ إِبْرَٰهِيمَ ۚ هُوَ سَمَّىٰكُمُ ٱلْمُسْلِمِينَ مِن قَبْلُ وَفِى هَـٰذَا لِيَكُونَ ٱلرَّسُولُ شَهِيدًا عَلَيْكُمْ وَتَكُونُوا۟ شُهَدَآءَ عَلَى ٱلنَّاسِ ۚ فَأَقِيمُوا۟ ٱلصَّلَوٰةَ وَءَاتُوا۟ ٱلزَّكَوٰةَ وَٱعْتَصِمُوا۟ بِٱللَّهِ هُوَ مَوْلَىٰكُمْ ۖ فَنِعْمَ ٱلْمَوْلَىٰ وَنِعْمَ ٱلنَّصِيرُ",
    translation:
      "Allah uğrunda gerektiği gibi cihad edin. Sizi O seçti. Dinde size hiçbir güçlük yüklemedi. Babanız İbrahim’in dinine uyun. Bundan önce de bu Kur’an’da da size Müslüman adını O verdi. Ta ki Resûl size şahit olsun, siz de bütün insanlara şahit olasınız. Haydi namazı hakkıyla ifa edin, zekâtı verin ve Allah’a sımsıkı bağlanın. Sizin Mevlânız O’dur. O ne güzel Mevlâ, ne güzel yardımcıdır!",
    explanation:
      "Müslüman kimliği yalnız bir isim değil; namaz, zekât, Allah’a bağlılık ve insanlığa şahitlik sorumluluğu taşır. Ayet dinde güçlük çıkarılmadığını da vurgular.",
    title: "Hac 22/78 — Kimlik, sorumluluk ve kolaylık",
    body: 'وَجَـٰهِدُوا۟ فِى ٱللَّهِ حَقَّ جِهَادِهِۦ ۚ هُوَ ٱجْتَبَىٰكُمْ وَمَا جَعَلَ عَلَيْكُمْ فِى ٱلدِّينِ مِنْ حَرَجٍ ۚ مِّلَّةَ أَبِيكُمْ إِبْرَٰهِيمَ ۚ هُوَ سَمَّىٰكُمُ ٱلْمُسْلِمِينَ مِن قَبْلُ وَفِى هَـٰذَا لِيَكُونَ ٱلرَّسُولُ شَهِيدًا عَلَيْكُمْ وَتَكُونُوا۟ شُهَدَآءَ عَلَى ٱلنَّاسِ ۚ فَأَقِيمُوا۟ ٱلصَّلَوٰةَ وَءَاتُوا۟ ٱلزَّكَوٰةَ وَٱعْتَصِمُوا۟ بِٱللَّهِ هُوَ مَوْلَىٰكُمْ ۖ فَنِعْمَ ٱلْمَوْلَىٰ وَنِعْمَ ٱلنَّصِيرُ\n\nMeâl (Suat Yıldırım):\n"Allah uğrunda gerektiği gibi cihad edin. Sizi O seçti. Dinde size hiçbir güçlük yüklemedi. Babanız İbrahim’in dinine uyun. Bundan önce de bu Kur’an’da da size Müslüman adını O verdi. Ta ki Resûl size şahit olsun, siz de bütün insanlara şahit olasınız. Haydi namazı hakkıyla ifa edin, zekâtı verin ve Allah’a sımsıkı bağlanın. Sizin Mevlânız O’dur. O ne güzel Mevlâ, ne güzel yardımcıdır!"\n\nAçıklama:\nMüslüman kimliği yalnız bir isim değil; namaz, zekât, Allah’a bağlılık ve insanlığa şahitlik sorumluluğu taşır. Ayet dinde güçlük çıkarılmadığını da vurgular.',
  },
  {
    weekNumber: 40,
    surahVerse: "Furkân 25/32",
    topic: "Vahyin tedricî gelişi",
    arabic:
      "وَقَالَ ٱلَّذِينَ كَفَرُوا۟ لَوْلَا نُزِّلَ عَلَيْهِ ٱلْقُرْءَانُ جُمْلَةً وَٰحِدَةً ۚ كَذَٰلِكَ لِنُثَبِّتَ بِهِۦ فُؤَادَكَ ۖ وَرَتَّلْنَـٰهُ تَرْتِيلًا",
    translation:
      "Bir de o kâfirler dediler ki: “Bu Kur’ân ona toptan, bir defada indirilmeli değil miydi?” Halbuki Biz vahiyle senin kalbini pekiştirmek için böyle ara ara indirdik ve onu parça parça okuduk.",
    explanation:
      "Kur’an’ın parça parça indirilmesi, vahyin eğitim ve kalbi güçlendirme boyutunu gösterir; değişim her zaman bir anda gerçekleşmez.",
    title: "Furkân 25/32 — Vahyin tedricî gelişi",
    body: 'وَقَالَ ٱلَّذِينَ كَفَرُوا۟ لَوْلَا نُزِّلَ عَلَيْهِ ٱلْقُرْءَانُ جُمْلَةً وَٰحِدَةً ۚ كَذَٰلِكَ لِنُثَبِّتَ بِهِۦ فُؤَادَكَ ۖ وَرَتَّلْنَـٰهُ تَرْتِيلًا\n\nMeâl (Suat Yıldırım):\n"Bir de o kâfirler dediler ki: “Bu Kur’ân ona toptan, bir defada indirilmeli değil miydi?” Halbuki Biz vahiyle senin kalbini pekiştirmek için böyle ara ara indirdik ve onu parça parça okuduk."\n\nAçıklama:\nKur’an’ın parça parça indirilmesi, vahyin eğitim ve kalbi güçlendirme boyutunu gösterir; değişim her zaman bir anda gerçekleşmez.',
  },
  {
    weekNumber: 41,
    surahVerse: "Furkân 25/33",
    topic: "Soru karşısında hakikate dayanmak",
    arabic: "وَلَا يَأْتُونَكَ بِمَثَلٍ إِلَّا جِئْنَـٰكَ بِٱلْحَقِّ وَأَحْسَنَ تَفْسِيرًا",
    translation:
      "Onların sana itiraz için getirdikleri hiç bir temsil, hiç bir soru olmaz ki, ona karşı Biz sana gerçek durumu bildirmeyelim ve en güzel açıklamayı yapmayalım.",
    explanation:
      "İtiraz ve sorular karşısında amaç tartışmayı kazanmak değil, gerçeği daha açık biçimde ortaya koymaktır.",
    title: "Furkân 25/33 — Soru karşısında hakikate dayanmak",
    body: 'وَلَا يَأْتُونَكَ بِمَثَلٍ إِلَّا جِئْنَـٰكَ بِٱلْحَقِّ وَأَحْسَنَ تَفْسِيرًا\n\nMeâl (Suat Yıldırım):\n"Onların sana itiraz için getirdikleri hiç bir temsil, hiç bir soru olmaz ki, ona karşı Biz sana gerçek durumu bildirmeyelim ve en güzel açıklamayı yapmayalım."\n\nAçıklama:\nİtiraz ve sorular karşısında amaç tartışmayı kazanmak değil, gerçeği daha açık biçimde ortaya koymaktır.',
  },
  {
    weekNumber: 42,
    surahVerse: "Ankebût 29/41",
    topic: "Zayıf dayanaklar",
    arabic:
      "مَثَلُ ٱلَّذِينَ ٱتَّخَذُوا۟ مِن دُونِ ٱللَّهِ أَوْلِيَآءَ كَمَثَلِ ٱلْعَنكَبُوتِ ٱتَّخَذَتْ بَيْتًا ۖ وَإِنَّ أَوْهَنَ ٱلْبُيُوتِ لَبَيْتُ ٱلْعَنكَبُوتِ ۖ لَوْ كَانُوا۟ يَعْلَمُونَ",
    translation:
      "Allah’tan başka dost edinenlerin durumu, kendine yuva yapan örümceğin durumu gibidir. Halbuki, evlerin en çürüğü şüphesiz örümcek yuvasıdır. Keşke bilselerdi.",
    explanation:
      "Allah’ın yerine mutlak dayanak hâline getirilen güç, statü veya başka varlıklar gerçekte sanıldığı kadar sağlam olmayabilir.",
    title: "Ankebût 29/41 — Zayıf dayanaklar",
    body: 'مَثَلُ ٱلَّذِينَ ٱتَّخَذُوا۟ مِن دُونِ ٱللَّهِ أَوْلِيَآءَ كَمَثَلِ ٱلْعَنكَبُوتِ ٱتَّخَذَتْ بَيْتًا ۖ وَإِنَّ أَوْهَنَ ٱلْبُيُوتِ لَبَيْتُ ٱلْعَنكَبُوتِ ۖ لَوْ كَانُوا۟ يَعْلَمُونَ\n\nMeâl (Suat Yıldırım):\n"Allah’tan başka dost edinenlerin durumu, kendine yuva yapan örümceğin durumu gibidir. Halbuki, evlerin en çürüğü şüphesiz örümcek yuvasıdır. Keşke bilselerdi."\n\nAçıklama:\nAllah’ın yerine mutlak dayanak hâline getirilen güç, statü veya başka varlıklar gerçekte sanıldığı kadar sağlam olmayabilir.',
  },
  {
    weekNumber: 43,
    surahVerse: "Ankebût 29/69",
    topic: "Gayret ile hidayet arasındaki ilişki",
    arabic:
      "وَٱلَّذِينَ جَـٰهَدُوا۟ فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا ۚ وَإِنَّ ٱللَّهَ لَمَعَ ٱلْمُحْسِنِينَ",
    translation:
      "Ama bizim yolumuzda cihad edenleri, elbette kendi yollarımıza eriştireceğiz. Hiç şüphe yok ki Allah iyi davrananlarla beraberdir.",
    explanation:
      "Hidayet pasif bekleyiş değildir; samimi gayret, mücahede ve iyi davranışla birlikte düşünülür.",
    title: "Ankebût 29/69 — Gayret ile hidayet arasındaki ilişki",
    body: 'وَٱلَّذِينَ جَـٰهَدُوا۟ فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا ۚ وَإِنَّ ٱللَّهَ لَمَعَ ٱلْمُحْسِنِينَ\n\nMeâl (Suat Yıldırım):\n"Ama bizim yolumuzda cihad edenleri, elbette kendi yollarımıza eriştireceğiz. Hiç şüphe yok ki Allah iyi davrananlarla beraberdir."\n\nAçıklama:\nHidayet pasif bekleyiş değildir; samimi gayret, mücahede ve iyi davranışla birlikte düşünülür.',
  },
  {
    weekNumber: 44,
    surahVerse: "Ahzâb 33/40",
    topic: "Nübüvvetin tamamlanması",
    arabic:
      "مَّا كَانَ مُحَمَّدٌ أَبَآ أَحَدٍ مِّن رِّجَالِكُمْ وَلَـٰكِن رَّسُولَ ٱللَّهِ وَخَاتَمَ ٱلنَّبِيِّـۧنَ ۗ وَكَانَ ٱللَّهُ بِكُلِّ شَىْءٍ عَلِيمًا",
    translation:
      "Muhammed içinizden hiçbir erkeğin babası değildir, lâkin Allah’ın resulü ve peygamberlerin sonuncusudur. Allah her şeyi hakkıyla bilir.",
    explanation:
      "Hz. Muhammed’in Allah’ın Resulü ve peygamberlerin sonuncusu oluşu, İslâm’ın nübüvvet anlayışının temel esaslarındandır.",
    title: "Ahzâb 33/40 — Nübüvvetin tamamlanması",
    body: 'مَّا كَانَ مُحَمَّدٌ أَبَآ أَحَدٍ مِّن رِّجَالِكُمْ وَلَـٰكِن رَّسُولَ ٱللَّهِ وَخَاتَمَ ٱلنَّبِيِّـۧنَ ۗ وَكَانَ ٱللَّهُ بِكُلِّ شَىْءٍ عَلِيمًا\n\nMeâl (Suat Yıldırım):\n"Muhammed içinizden hiçbir erkeğin babası değildir, lâkin Allah’ın resulü ve peygamberlerin sonuncusudur. Allah her şeyi hakkıyla bilir."\n\nAçıklama:\nHz. Muhammed’in Allah’ın Resulü ve peygamberlerin sonuncusu oluşu, İslâm’ın nübüvvet anlayışının temel esaslarındandır.',
  },
  {
    weekNumber: 45,
    surahVerse: "Fâtır 35/24",
    topic: "Risaletin evrenselliği",
    arabic:
      "إِنَّآ أَرْسَلْنَـٰكَ بِٱلْحَقِّ بَشِيرًا وَنَذِيرًا ۚ وَإِن مِّنْ أُمَّةٍ إِلَّا خَلَا فِيهَا نَذِيرٌ",
    translation:
      "Evet, Biz seni gerçeğin ta kendisine malik olarak, rahmetle müjdeleyen ve kâfirleri azapla uyaran bir Peygamber olarak gönderdik. Zaten uyaran bir peygamber gelmiş olmayan hiçbir ümmet yoktur.",
    explanation:
      "İnsanlığın farklı toplumlarına uyarıcılar gönderilmiş olması, ilâhî rehberliğin tarih boyunca sürdüğünü gösterir.",
    title: "Fâtır 35/24 — Risaletin evrenselliği",
    body: 'إِنَّآ أَرْسَلْنَـٰكَ بِٱلْحَقِّ بَشِيرًا وَنَذِيرًا ۚ وَإِن مِّنْ أُمَّةٍ إِلَّا خَلَا فِيهَا نَذِيرٌ\n\nMeâl (Suat Yıldırım):\n"Evet, Biz seni gerçeğin ta kendisine malik olarak, rahmetle müjdeleyen ve kâfirleri azapla uyaran bir Peygamber olarak gönderdik. Zaten uyaran bir peygamber gelmiş olmayan hiçbir ümmet yoktur."\n\nAçıklama:\nİnsanlığın farklı toplumlarına uyarıcılar gönderilmiş olması, ilâhî rehberliğin tarih boyunca sürdüğünü gösterir.',
  },
  {
    weekNumber: 46,
    surahVerse: "Şûrâ 42/11",
    topic: "Tenzih ilkesi",
    arabic:
      "فَاطِرُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ ۚ جَعَلَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًا وَمِنَ ٱلْأَنْعَـٰمِ أَزْوَٰجًا ۖ يَذْرَؤُكُمْ فِيهِ ۚ لَيْسَ كَمِثْلِهِۦ شَىْءٌ ۖ وَهُوَ ٱلسَّمِيعُ ٱلْبَصِيرُ",
    translation:
      "O gökleri ve yeri yoktan yaratandır. Size kendi nefislerinizden eşler yarattığı gibi davarlara da eşler yarattı. O, bu düzen içinde sizi üretiyor. Onun benzeri hiçbir şey yoktur. O, her şeyi hakkıyla işitir ve bilir.",
    explanation:
      "Allah hiçbir yaratılmışa benzemez. İlâhî sıfatlar konuşulurken insan biçimci tasavvurlardan kaçınmanın temel ölçüsü budur.",
    title: "Şûrâ 42/11 — Tenzih ilkesi",
    body: 'فَاطِرُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ ۚ جَعَلَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًا وَمِنَ ٱلْأَنْعَـٰمِ أَزْوَٰجًا ۖ يَذْرَؤُكُمْ فِيهِ ۚ لَيْسَ كَمِثْلِهِۦ شَىْءٌ ۖ وَهُوَ ٱلسَّمِيعُ ٱلْبَصِيرُ\n\nMeâl (Suat Yıldırım):\n"O gökleri ve yeri yoktan yaratandır. Size kendi nefislerinizden eşler yarattığı gibi davarlara da eşler yarattı. O, bu düzen içinde sizi üretiyor. Onun benzeri hiçbir şey yoktur. O, her şeyi hakkıyla işitir ve bilir."\n\nAçıklama:\nAllah hiçbir yaratılmışa benzemez. İlâhî sıfatlar konuşulurken insan biçimci tasavvurlardan kaçınmanın temel ölçüsü budur.',
  },
  {
    weekNumber: 47,
    surahVerse: "Fetih 48/10",
    topic: "Söz ve bağlılık sorumluluğu",
    arabic:
      "إِنَّ ٱلَّذِينَ يُبَايِعُونَكَ إِنَّمَا يُبَايِعُونَ ٱللَّهَ يَدُ ٱللَّهِ فَوْقَ أَيْدِيهِمْ ۚ فَمَن نَّكَثَ فَإِنَّمَا يَنكُثُ عَلَىٰ نَفْسِهِۦ ۖ وَمَنْ أَوْفَىٰ بِمَا عَـٰهَدَ عَلَيْهُ ٱللَّهَ فَسَيُؤْتِيهِ أَجْرًا عَظِيمًا",
    translation:
      "Sana biat edenler, gerçekte Allah’a biat etmektedirler. Allah’ın eli, hepsinin ellerinin üstündedir. Kim sözünden dönerse, kendi aleyhine olarak döneklik eder. Ama kim Allah’a verdiği sözünde durursa, Allah ona pek büyük mükâfat verir.",
    explanation:
      "Bir sözleşme veya bağlılık sözü yalnız karşı tarafa değil, kişinin kendi ahlâkına karşı da sorumluluk doğurur; sözden dönmenin sonucu önce kişiye döner.",
    title: "Fetih 48/10 — Söz ve bağlılık sorumluluğu",
    body: 'إِنَّ ٱلَّذِينَ يُبَايِعُونَكَ إِنَّمَا يُبَايِعُونَ ٱللَّهَ يَدُ ٱللَّهِ فَوْقَ أَيْدِيهِمْ ۚ فَمَن نَّكَثَ فَإِنَّمَا يَنكُثُ عَلَىٰ نَفْسِهِۦ ۖ وَمَنْ أَوْفَىٰ بِمَا عَـٰهَدَ عَلَيْهُ ٱللَّهَ فَسَيُؤْتِيهِ أَجْرًا عَظِيمًا\n\nMeâl (Suat Yıldırım):\n"Sana biat edenler, gerçekte Allah’a biat etmektedirler. Allah’ın eli, hepsinin ellerinin üstündedir. Kim sözünden dönerse, kendi aleyhine olarak döneklik eder. Ama kim Allah’a verdiği sözünde durursa, Allah ona pek büyük mükâfat verir."\n\nAçıklama:\nBir sözleşme veya bağlılık sözü yalnız karşı tarafa değil, kişinin kendi ahlâkına karşı da sorumluluk doğurur; sözden dönmenin sonucu önce kişiye döner.',
  },
  {
    weekNumber: 48,
    surahVerse: "Haşr 59/8",
    topic: "Hicret ve fedakârlık",
    arabic:
      "لِلْفُقَرَآءِ ٱلْمُهَـٰجِرِينَ ٱلَّذِينَ أُخْرِجُوا۟ مِن دِيَـٰرِهِمْ وَأَمْوَٰلِهِمْ يَبْتَغُونَ فَضْلًا مِّنَ ٱللَّهِ وَرِضْوَٰنًا وَيَنصُرُونَ ٱللَّهَ وَرَسُولَهُۥٓ ۚ أُو۟لَـٰٓئِكَ هُمُ ٱلصَّـٰدِقُونَ",
    translation:
      "Allah’ın nasib ettiği bu ganimet malları o hicret eden fakirlere aittir ki, onlar Allah’ın lütfunu ve rızasını taleb etmek, Allah’ın dinine ve Resulüne destek vermek için yurtlarından ve mallarından edildiler. İşte imanlarında sadık ve samimi olanlar ancak onlardır.",
    explanation:
      "Muhacirlerin mal ve yurt kaybına rağmen inançları uğruna gösterdikleri fedakârlık, değerler uğruna bedel ödeme bilincini öğretir.",
    title: "Haşr 59/8 — Hicret ve fedakârlık",
    body: 'لِلْفُقَرَآءِ ٱلْمُهَـٰجِرِينَ ٱلَّذِينَ أُخْرِجُوا۟ مِن دِيَـٰرِهِمْ وَأَمْوَٰلِهِمْ يَبْتَغُونَ فَضْلًا مِّنَ ٱللَّهِ وَرِضْوَٰنًا وَيَنصُرُونَ ٱللَّهَ وَرَسُولَهُۥٓ ۚ أُو۟لَـٰٓئِكَ هُمُ ٱلصَّـٰدِقُونَ\n\nMeâl (Suat Yıldırım):\n"Allah’ın nasib ettiği bu ganimet malları o hicret eden fakirlere aittir ki, onlar Allah’ın lütfunu ve rızasını taleb etmek, Allah’ın dinine ve Resulüne destek vermek için yurtlarından ve mallarından edildiler. İşte imanlarında sadık ve samimi olanlar ancak onlardır."\n\nAçıklama:\nMuhacirlerin mal ve yurt kaybına rağmen inançları uğruna gösterdikleri fedakârlık, değerler uğruna bedel ödeme bilincini öğretir.',
  },
  {
    weekNumber: 49,
    surahVerse: "Haşr 59/9",
    topic: "Îsâr: başkasını kendine tercih etmek",
    arabic:
      "وَٱلَّذِينَ تَبَوَّءُو ٱلدَّارَ وَٱلْإِيمَـٰنَ مِن قَبْلِهِمْ يُحِبُّونَ مَنْ هَاجَرَ إِلَيْهِمْ وَلَا يَجِدُونَ فِى صُدُورِهِمْ حَاجَةً مِّمَّآ أُوتُوا۟ وَيُؤْثِرُونَ عَلَىٰٓ أَنفُسِهِمْ وَلَوْ كَانَ بِهِمْ خَصَاصَةٌ ۚ وَمَن يُوقَ شُحَّ نَفْسِهِۦ فَأُو۟لَـٰٓئِكَ هُمُ ٱلْمُفْلِحُونَ",
    translation:
      "Bunlardan önce Medine’yi yurt edinip imana sarılanlar ise, kendi beldelerine hicret edenlere sevgi besler, onlara verilen ganimetlerden ötürü içlerinde bir kıskanma veya istek duymazlar. Hatta kendileri ihtiyaç duysalar bile o kardeşlerine öncelik verir, onlara verilmesini tercih ederler. Her kim nefsinin hırsından ve mala düşkünlüğünden kendini kurtarırsa, işte felah ve mutluluğa erenler onlar olacaklardır.",
    explanation:
      "Ensarın muhacirlere karşı tavrı, kıskançlığı aşan ve kendi ihtiyacına rağmen başkasını önceleyebilen yüksek bir paylaşma ahlâkıdır.",
    title: "Haşr 59/9 — Îsâr: başkasını kendine tercih etmek",
    body: 'وَٱلَّذِينَ تَبَوَّءُو ٱلدَّارَ وَٱلْإِيمَـٰنَ مِن قَبْلِهِمْ يُحِبُّونَ مَنْ هَاجَرَ إِلَيْهِمْ وَلَا يَجِدُونَ فِى صُدُورِهِمْ حَاجَةً مِّمَّآ أُوتُوا۟ وَيُؤْثِرُونَ عَلَىٰٓ أَنفُسِهِمْ وَلَوْ كَانَ بِهِمْ خَصَاصَةٌ ۚ وَمَن يُوقَ شُحَّ نَفْسِهِۦ فَأُو۟لَـٰٓئِكَ هُمُ ٱلْمُفْلِحُونَ\n\nMeâl (Suat Yıldırım):\n"Bunlardan önce Medine’yi yurt edinip imana sarılanlar ise, kendi beldelerine hicret edenlere sevgi besler, onlara verilen ganimetlerden ötürü içlerinde bir kıskanma veya istek duymazlar. Hatta kendileri ihtiyaç duysalar bile o kardeşlerine öncelik verir, onlara verilmesini tercih ederler. Her kim nefsinin hırsından ve mala düşkünlüğünden kendini kurtarırsa, işte felah ve mutluluğa erenler onlar olacaklardır."\n\nAçıklama:\nEnsarın muhacirlere karşı tavrı, kıskançlığı aşan ve kendi ihtiyacına rağmen başkasını önceleyebilen yüksek bir paylaşma ahlâkıdır.',
  },
  {
    weekNumber: 50,
    surahVerse: "Mümtehine 60/8",
    topic: "Farklı inanç mensuplarıyla adalet",
    arabic:
      "لَّا يَنْهَىٰكُمُ ٱللَّهُ عَنِ ٱلَّذِينَ لَمْ يُقَـٰتِلُوكُمْ فِى ٱلدِّينِ وَلَمْ يُخْرِجُوكُم مِّن دِيَـٰرِكُمْ أَن تَبَرُّوهُمْ وَتُقْسِطُوٓا۟ إِلَيْهِمْ ۚ إِنَّ ٱللَّهَ يُحِبُّ ٱلْمُقْسِطِينَ",
    translation:
      "Dininizden ötürü sizinle savaşmayan, sizi yerinizden, yurdunuzdan etmeyen kâfirlere gelince, Allah sizi, onlara iyilik etmeden, adalet ve insaf gözetmeden menetmez. Çünkü Allah âdil olanları sever.",
    explanation:
      "Din farklılığı, saldırganlık göstermeyen insanlara karşı iyilik ve adaleti terk etme gerekçesi değildir.",
    title: "Mümtehine 60/8 — Farklı inanç mensuplarıyla adalet",
    body: 'لَّا يَنْهَىٰكُمُ ٱللَّهُ عَنِ ٱلَّذِينَ لَمْ يُقَـٰتِلُوكُمْ فِى ٱلدِّينِ وَلَمْ يُخْرِجُوكُم مِّن دِيَـٰرِكُمْ أَن تَبَرُّوهُمْ وَتُقْسِطُوٓا۟ إِلَيْهِمْ ۚ إِنَّ ٱللَّهَ يُحِبُّ ٱلْمُقْسِطِينَ\n\nMeâl (Suat Yıldırım):\n"Dininizden ötürü sizinle savaşmayan, sizi yerinizden, yurdunuzdan etmeyen kâfirlere gelince, Allah sizi, onlara iyilik etmeden, adalet ve insaf gözetmeden menetmez. Çünkü Allah âdil olanları sever."\n\nAçıklama:\nDin farklılığı, saldırganlık göstermeyen insanlara karşı iyilik ve adaleti terk etme gerekçesi değildir.',
  },
  {
    weekNumber: 51,
    surahVerse: "Müzzemmil 73/5",
    topic: "Vahyin ağırlığı",
    arabic: "إِنَّا سَنُلْقِى عَلَيْكَ قَوْلًا ثَقِيلًا",
    translation: "Biz sana pek ağır bir söz vahyedeceğiz.",
    explanation:
      "Kur’an ‘ağır bir söz’dür; onu yalnız hızlı tüketilecek bir içerik gibi değil, anlamı ve sorumluluğu olan vahiy olarak karşılamak gerekir.",
    title: "Müzzemmil 73/5 — Vahyin ağırlığı",
    body: 'إِنَّا سَنُلْقِى عَلَيْكَ قَوْلًا ثَقِيلًا\n\nMeâl (Suat Yıldırım):\n"Biz sana pek ağır bir söz vahyedeceğiz."\n\nAçıklama:\nKur’an ‘ağır bir söz’dür; onu yalnız hızlı tüketilecek bir içerik gibi değil, anlamı ve sorumluluğu olan vahiy olarak karşılamak gerekir.',
  },
  {
    weekNumber: 52,
    surahVerse: "Kıyâmet 75/17",
    topic: "Kur’an’ın korunup okutulması",
    arabic: "إِنَّ عَلَيْنَا جَمْعَهُۥ وَقُرْءَانَهُۥ",
    translation: "Çünkü vahyi senin kalbinde toplamak ve onu okutmak Bize ait bir iştir.",
    explanation:
      "Vahyin Peygamberimizin kalbinde toplanması ve okutulması Allah’ın teminatıyla ilişkilendirilir.",
    title: "Kıyâmet 75/17 — Kur’an’ın korunup okutulması",
    body: 'إِنَّ عَلَيْنَا جَمْعَهُۥ وَقُرْءَانَهُۥ\n\nMeâl (Suat Yıldırım):\n"Çünkü vahyi senin kalbinde toplamak ve onu okutmak Bize ait bir iştir."\n\nAçıklama:\nVahyin Peygamberimizin kalbinde toplanması ve okutulması Allah’ın teminatıyla ilişkilendirilir.',
  },
  {
    weekNumber: 53,
    surahVerse: "Kıyâmet 75/18",
    topic: "Kur’an’ı dikkatle takip etmek",
    arabic: "فَإِذَا قَرَأْنَـٰهُ فَٱتَّبِعْ قُرْءَانَهُۥ",
    translation: "O halde Biz Kur’ân’ı okuduğumuzda, sen de onun okunuşunu izle.",
    explanation:
      "Vahiy okunurken onu izleme emri, dinleme ve öğrenmede dikkat ile teslimiyetin önemini gösterir.",
    title: "Kıyâmet 75/18 — Kur’an’ı dikkatle takip etmek",
    body: 'فَإِذَا قَرَأْنَـٰهُ فَٱتَّبِعْ قُرْءَانَهُۥ\n\nMeâl (Suat Yıldırım):\n"O halde Biz Kur’ân’ı okuduğumuzda, sen de onun okunuşunu izle."\n\nAçıklama:\nVahiy okunurken onu izleme emri, dinleme ve öğrenmede dikkat ile teslimiyetin önemini gösterir.',
  },
  {
    weekNumber: 54,
    surahVerse: "Kıyâmet 75/19",
    topic: "Kur’an’ın açıklanması",
    arabic: "ثُمَّ إِنَّ عَلَيْنَا بَيَانَهُۥ",
    translation: "Ayrıca onu açıklamak da bize ait bir iştir.",
    explanation:
      "Vahyin açıklanması da ilâhî rehberliğin bir parçasıdır; Kur’an’ı anlamak, lafzı okumakla sınırlı değildir.",
    title: "Kıyâmet 75/19 — Kur’an’ın açıklanması",
    body: 'ثُمَّ إِنَّ عَلَيْنَا بَيَانَهُۥ\n\nMeâl (Suat Yıldırım):\n"Ayrıca onu açıklamak da bize ait bir iştir."\n\nAçıklama:\nVahyin açıklanması da ilâhî rehberliğin bir parçasıdır; Kur’an’ı anlamak, lafzı okumakla sınırlı değildir.',
  },
  {
    weekNumber: 55,
    surahVerse: "Asr 103/3",
    topic: "Hüsrandan kurtuluşun dört esası",
    arabic:
      "إِلَّا ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّـٰلِحَـٰتِ وَتَوَاصَوْا۟ بِٱلْحَقِّ وَتَوَاصَوْا۟ بِٱلصَّبْرِ",
    translation:
      "Ancak şunlar müstesna: İman edip makbul ve güzel işler yapanlar, bir de birbirlerine hakkı ve sabrı tavsiye edenler.",
    explanation:
      "İman, salih amel, hakkı tavsiye ve sabrı tavsiye; bireysel inançla toplumsal sorumluluğu aynı çerçevede birleştirir.",
    title: "Asr 103/3 — Hüsrandan kurtuluşun dört esası",
    body: 'إِلَّا ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّـٰلِحَـٰتِ وَتَوَاصَوْا۟ بِٱلْحَقِّ وَتَوَاصَوْا۟ بِٱلصَّبْرِ\n\nMeâl (Suat Yıldırım):\n"Ancak şunlar müstesna: İman edip makbul ve güzel işler yapanlar, bir de birbirlerine hakkı ve sabrı tavsiye edenler."\n\nAçıklama:\nİman, salih amel, hakkı tavsiye ve sabrı tavsiye; bireysel inançla toplumsal sorumluluğu aynı çerçevede birleştirir.',
  },
] as const;

/**
 * Belirtilen sınıf (1-6) için 55 haftalık Ayet müfredat girişlerini üretir.
 * - 1, 2, 3. sınıflar: Ortaokul müfredatı
 * - 4, 5, 6. sınıflar: Lise müfredatı
 * - Hafta 1-16: Eylül - Aralık 2026 (4 ay x 4 hafta)
 * - Hafta 17-48: Ocak - Ağustos 2027 (8 ay x 4 hafta)
 * - Hafta 49-55: Ekstra 1-7 (48 haftalık standart müfredat kuralı sonrası ilave kartlar)
 */
export function getAyetEntriesForGrade(grade: number): CurriculumEntry[] {
  const items = grade <= 3 ? ortaokulAyetCurriculum : liseAyetCurriculum;

  return items.map((item) => {
    if (item.weekNumber <= 48) {
      const monthIndex = Math.floor((item.weekNumber - 1) / 4); // 0..11
      const month = monthIndex < 4 ? 9 + monthIndex : monthIndex - 3;
      const year = monthIndex < 4 ? 2026 : 2027;
      const weekInMonth = ((item.weekNumber - 1) % 4) + 1;
      const id = makeAyetEntryId(month, weekInMonth, grade, false);

      return {
        id,
        grade,
        categoryId: "ayet",
        month,
        week: weekInMonth,
        year,
        isExtra: false,
        title: item.title,
        body: item.body,
      };
    }

    const extraOrder = item.weekNumber - 48; // 1..7
    const id = makeAyetEntryId(8, 4, grade, true, extraOrder);

    return {
      id,
      grade,
      categoryId: "ayet",
      month: 8,
      week: 4,
      year: 2027,
      isExtra: true,
      extraOrder,
      title: item.title,
      body: item.body,
    };
  });
}

/**
 * 6 Belçika sınıfı için tüm Ayet kayıtlarını döner (toplam 330 kayıt).
 */
export function getAllAyetEntries(): CurriculumEntry[] {
  const all: CurriculumEntry[] = [];
  for (let grade = 1; grade <= 6; grade++) {
    all.push(...getAyetEntriesForGrade(grade));
  }
  return all;
}

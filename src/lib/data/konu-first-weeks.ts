import type { KonuCurriculumItem } from "./konu-curriculum";

function toSuperscript(value: string): string {
  return value.replace(/\d/g, (digit) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(digit)]);
}

export type LessonDraft = Omit<KonuCurriculumItem, "body">;

function buildBody(lesson: LessonDraft): string {
  const sections = lesson.sections.map((section) => {
    const heading = section.heading ? `### ${section.heading}\n\n` : "";
    const paragraphs = section.paragraphs
      .map((paragraph) => {
        if (section.kind === "arabic") return `> ${paragraph}`;
        if (section.kind === "quote") {
          return `> “${paragraph}”${section.citation ? ` ${toSuperscript(section.citation)}` : ""}`;
        }
        return `${paragraph}${section.citation ? ` ${toSuperscript(section.citation)}` : ""}`;
      })
      .join("\n\n");

    return `${heading}${paragraphs}`;
  });

  const questions = lesson.discussionQuestions.map(
    (question, index) => `${index + 1}. ${question}`
  );
  const application = lesson.application
    ? [
        `### ${lesson.application.title}`,
        ...lesson.application.items.map((item) => `- ${item}`),
      ].join("\n\n")
    : "";
  const takeaway = ["# Bana Ne Söylüyor?", ...lesson.takeaway.map((item) => `- ${item}`)].join(
    "\n\n"
  );
  const vocabulary = lesson.vocab.length
    ? [
        "# Bu Hafta Tanıştığımız Kelimeler",
        ...lesson.vocab.map((item) => `**${item.word}** — ${item.definition}`),
      ].join("\n\n")
    : "";
  const sources = lesson.sources
    .map((source, index) => `${toSuperscript(String(index + 1))} ${source}`)
    .join("\n\n");

  return [
    `# ${lesson.title}`,
    lesson.subtitle,
    ...sections,
    questions.length ? `### Düşünelim ve Konuşalım\n\n${questions.join("\n\n")}` : "",
    application,
    takeaway,
    vocabulary,
    sources ? `# Dipnotlar\n\n${sources}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}

export function createLesson(lesson: LessonDraft): KonuCurriculumItem {
  return { ...lesson, body: buildBody(lesson) };
}

const firstWeekDrafts: readonly LessonDraft[] = [
  {
    id: "konu-eylul-1",
    grade: 1,
    weekNumber: 1,
    month: 9,
    week: 1,
    year: 2026,
    title: "Bu Eser Neden Hâlâ Okunuyor?",
    subtitle:
      "Bu kadar farklı insanın yıllardır okuduğu, çoğalttığı ve araştırdığı bir eserde ne var?",
    readingMinutes: 7,
    sections: [
      {
        heading: "Bir tohumun sessiz gücü",
        paragraphs: [
          "Avucunda duran küçücük bir tohum düşün. Sert, kuru ve hareketsiz görünür. Fakat toprağa bırakıldığında, o sert kabuğunu delip filizlenir; incecik bir dal güneşe doğru yükselir ve sonunda koca bir meyve ağacına dönüşür. Bir tohumun o sert toprağı yarıp hayata çıkmasını sağlayan güç nedir? İşte insan, çevresine bu gözle bakmaya başladığında kâinattaki her şeyin bir anlam taşıdığını fark eder.",
          "Kitaplar da tohumlara benzer. Çoğu kitap birkaç yıl okunur, sonra raflarda unutulur. Fakat bazı eserler vardır ki, aradan bir asır geçmesine rağmen hâlâ gençler, öğretmenler ve ilim insanları tarafından dikkatle okunur, çoğaltılır ve üzerinde düşünülür. Bediüzzaman Said Nursî’nin yazdığı Risale-i Nur külliyatı da işte böyle bir yolculuğa sahiptir. İnsanlar onu sadece bilgi edinmek için değil; kendilerini, dünyayı ve Yaratıcılarını daha derinden anlamak için okurlar.",
        ],
      },
      {
        heading: "Kâinatın ortak lisanı ve Bismillah",
        paragraphs: [
          "Risale-i Nur’un ilk kitabı olan Sözler, çok bilinen fakat anlamı üzerinde az durulan bir kelimeyle başlar: Bismillâh. Yazar, bu kelimenin sadece dudaktan dökülen bir söz değil, varlığın özündeki güveni ifade eden bir anahtar olduğunu anlatır:",
        ],
      },
      {
        heading: null,
        kind: "quote",
        citation: "1",
        paragraphs: [
          "<u>Bismillâh</u> her hayrın başıdır. Biz dahi başta ona başlarız. Bil ey nefsim! Şu mübarek kelime, İslâm nişanı olduğu gibi, bütün mevcudâtın <u>lisân-ı hâl</u> ile <u>vird-i zebânıdır</u>.",
        ],
      },
      {
        heading: "Hâl diliyle konuşan varlıklar",
        paragraphs: [
          "Burada geçen lisân-ı hâl, bir varlığın söz söylemeden, kendi yapısı ve duruşuyla bir hakikati anlatması demektir. Örneğin bir elma ağacı konuşmaz; fakat kupkuru çamurlu topraktan tatlı, sulu ve renkli elmalar sunarak bize sonsuz bir cömertliği ve şefkati ilan eder. İşte bu, ağacın lisân-ı hâlidir.",
          "İnsan da bu dünyaya geldiğinde sayısız ihtiyacı olan, fakat tek başına hiçbirini karşılayamayacak kadar güçsüz bir varlıktır. Acıktığında buğdayı yaratmaya gücü yetmez, hastalandığında vücudundaki hücreleri kendi başına yönetemez. İşte Bismillâh demek, insanın bu güçsüzlüğünü kabul edip sonsuz kudret sahibi olan Allah’a güvenmesi, O’nun adıyla adım atmasıdır.",
        ],
      },
      {
        heading: "Korkudan güvene uzanan yol",
        paragraphs: [
          "Fethullah Gülen Hocaefendi, Bismillah kelimesinin insana kazandırdığı bu büyük iç huzuru ve cesareti şöyle açıklar:",
        ],
      },
      {
        heading: null,
        kind: "quote",
        citation: "2",
        paragraphs: [
          "‘<u>Bismillâh</u>’a dayanan insan, bütün kâinata meydan okuyabilir. Çünkü orada Allah’a güvenme, dayanma ve <u>itimat</u> etmekten bahsedilmektedir. Dünyanın kapısı ‘Bismillâh’la açılmıştır. Kâinat ‘Bismillâh’la kurulmuştur.",
        ],
      },
      {
        heading: "İlk adımı atmak",
        paragraphs: [
          "Risale-i Nur pasajı varlıkların hâl diliyle Allah’a dayandığını gösterirken, Hocaefendi’nin sözü bunun insanın kalbindeki karşılığını açar: Allah’a güvenen ve O’nun adıyla yola çıkan bir insan, zorluklar karşısında telaşa kapılmaz ve yalnızlık hissetmez.",
          "Bu eserleri okurken acele etmeyeceğiz. Bütün kitapları bir günde bitirmek gerekmiyor. Anlamadığımız bir kelimeyle karşılaştığımızda durup anlamına bakmak, bir cümleyi arkadaşımızla konuşmak ve o cümlenin kendi hayatımıza ne söylediği üzerinde tefekkür etmek en güzel başlangıçtır.",
        ],
      },
      {
        heading: "Âyet — İsrâ 17/9",
        kind: "arabic",
        citation: "3",
        paragraphs: [
          "﴿ إِنَّ هَٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ وَيُبَشِّرُ الْمُؤْمِنِينَ الَّذِينَ يَعْمَلُونَ الصَّالِحَاتِ أَنَّ لَهُمْ أَجْرًا كَبِيرًا ﴾",
        ],
      },
      {
        heading: "Suat Yıldırım Meali",
        kind: "quote",
        citation: "3",
        paragraphs: [
          "Gerçekten bu Kur’ân insanları en doğru yola, en isabetli tutuma yöneltir. Yararlı işler yapan müminlere nail olacakları büyük mükâfatı müjdeler.",
        ],
      },
      {
        heading: "Âyetin dersimizle bağlantısı",
        paragraphs: [
          "Kur’an-ı Kerim, insanı hayattaki en doğru ve dengeli yola ileten ilahî rehberdir. Risale-i Nur gibi eserler de Kur’an’ın bu rehberliğini çağımızın insanına ve gençlerine açıklayan tefsirlerdir. Bir kitabı okurken onun Kur’an’ın hakikatlerine nasıl tercüman olduğunu fark etmek, okumamıza derinlik kazandırır.",
        ],
      },
    ],
    discussionQuestions: [
      "Bir tohumun veya meyve ağacının konuşmadan 'hâl diliyle' bize anlattığı şey nedir?",
      "Bir işe başlarken 'Bismillah' demek insanın içindeki korku ve telaşı nasıl giderir?",
    ],
    application: {
      title: "Bu haftanın küçük adımı",
      items: [
        "Bir 'Merak Defteri' edin; ilk sayfasına bu hafta tabiatta gördüğün ve sana hâl dilini hatırlatan bir gözlemini yaz.",
        "Güne veya ders çalışmaya başlarken 'Bismillah' diyerek dur; bu kelimenin sana verdiği güven hissini kalbinde fark et.",
      ],
    },
    takeaway: [
      "Bir esere peşin hükümle değil, merak ve anlama niyetiyle yaklaşabilirim.",
      "Kâinattaki varlıkların hâl diliyle büyük bir intizamı ve rahmeti gösterdiğini fark edebilirim.",
      "Kendi güçsüzlüğümü hissettiğimde Allah’a güvenip itimat ederek iç huzuru bulabilirim.",
      "Anlamadığım bir kelimeyle karşılaştığımda pes etmek yerine anlamını araştırabilirim.",
    ],
    vocab: [
      {
        word: "Bismillâh",
        definition:
          "“Allah’ın adıyla” anlamına gelen, her hayırlı işe başlarken söylenen mübarek başlangıç sözü.",
      },
      {
        word: "Lisân-ı hâl",
        definition:
          "Bir varlığın konuşmadan; durumu, yapısı ve işleyişiyle bir anlam ifade etmesi; hâl dili.",
      },
      {
        word: "Vird-i zebân",
        definition: "Dilden düşürülmeyen, sürekli ve alışkanlıkla tekrarlanan söz.",
      },
      {
        word: "Mevcudât",
        definition: "Yaratılmış bütün varlıklar, kâinattaki her şey.",
      },
      {
        word: "İtimat",
        definition: "Birine tam anlamıyla güvenmek, emniyetle ona dayanmak.",
      },
      {
        word: "Tefekkür",
        definition: "Bir şeyin anlamı ve bize ne gösterdiği üzerinde dikkatlice düşünme.",
      },
    ],
    sources: [
      "Bediüzzaman Said Nursî, Sözler, Birinci Söz (İstanbul: Şahdamar Yayınları, 2007), s. 26.",
      "M. Fethullah Gülen, Fâtiha Üzerine Mülâhazalar (İzmir: Nil Yayınları, 1998), s. 57.",
      "Suat Yıldırım, Kur’ân-ı Hakîm’in Açıklamalı Meali (İstanbul: Define Yayınları, 2007), İsrâ 17/9, s. 282.",
    ],
  },
  {
    id: "konu-eylul-2",
    grade: 1,
    weekNumber: 2,
    month: 9,
    week: 2,
    year: 2026,
    title: "Bediüzzaman Kimdir?",
    subtitle: "Bu eserlerin arkasında nasıl bir hayat ve ilim yolculuğu var?",
    readingMinutes: 6,
    sections: [
      {
        heading: "Bir ömrün sessiz yönü",
        paragraphs: [
          "Bediüzzaman Said Nursî’yi tanımak, sadece doğum ve vefat tarihlerini ezberlemek değildir. Genç yaşından itibaren ilme duyduğu derin iştiyak, karşılaştığı bütün zorluklara rağmen Kur’an hakikatlerini anlatma gayesi onun hayat çizgisini oluşturur.",
          "O, rahat bir hayat sürmek yerine insanların imanını güçlendirmeyi en büyük vazife bilmiştir. Tarihçe-i Hayat’ta geçen şu cümle onun hayatındaki temel önceliği gösterir:",
        ],
      },
      {
        heading: null,
        kind: "quote",
        citation: "1",
        paragraphs: [
          "Bütün <u>mesaimi</u> ve hayatımı Kur’ân’ın <u>hizmetine</u> ve <u>iman</u> hakikatlerinin neşrine hasrettim.",
        ],
      },
      {
        heading: "Zorluklar karşısında sebat",
        paragraphs: [
          "Hocaefendi, Bediüzzaman’ın zor şartlar altında bile ümidini ve sebatını kaybetmeyişini gençlere örnek gösterir:",
        ],
      },
      {
        heading: null,
        kind: "quote",
        citation: "2",
        paragraphs: [
          "O, en karanlık dönemlerde dahi <u>yeise</u> düşmemiş, daima <u>ümit</u> meşalesini elinde tutmuştur.",
        ],
      },
      {
        heading: "Âyet — Ahzâb 33/21",
        kind: "arabic",
        citation: "3",
        paragraphs: [
          "﴿ لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ لِّمَن كَانَ يَرْجُو اللَّهَ وَالْيَوْمَ الْآخِرَ وَذَكَرَ اللَّهَ كَثِيرًا ﴾",
        ],
      },
      {
        heading: "Suat Yıldırım Meali",
        kind: "quote",
        citation: "3",
        paragraphs: [
          "Hakikaten, Allah’ın Resulünde sizler için, Allah’a ve âhiret gününe kavuşmayı arzu edenler ve Allah’ı çok ananlar için en mükemmel bir örnek vardır.",
        ],
      },
      {
        heading: "Âyetin dersimizle bağlantısı",
        paragraphs: [
          "Âyet, Peygamber Efendimiz’in (s.a.v.) hayatındaki en güzel örneklik vasfını hatırlatır. İlim ehli ve dava insanları da Efendimiz’in ahlâkını takip ederek insanlığa faydalı bir ömür sürmüşlerdir.",
        ],
      },
    ],
    discussionQuestions: [
      "Bir insanın zorluklar karşısında vazgeçmemesini sağlayan güç nedir?",
      "İlim öğrenmek bir insanın hayat gayesini nasıl etkiler?",
    ],
    application: {
      title: "Bu haftanın uygulaması",
      items: [
        "Bediüzzaman’ın hayatında seni en çok etkileyen bir özelliği defterine not et.",
        "Kendi hayatında zorlandığın bir işte sebat göstermek için küçük bir hedef koy.",
      ],
    },
    takeaway: [
      "Büyük gayelerin fedakârlık ve sebat gerektirdiğini öğrenebilirim.",
      "Zor şartlarda bile ümidimi kaybetmemeyi ilke edinebilirim.",
    ],
    vocab: [
      { word: "Mesai", definition: "Bir amaç uğruna harcanan emek, çalışma ve gayret." },
      {
        word: "Hizmet",
        definition: "İnsanların iyiliği ve Allah rızası için yapılan faydalı işler.",
      },
      { word: "Yeis", definition: "Ümitsizlik, karamsarlık, vazgeçme duygusu." },
      {
        word: "Ümit",
        definition: "Geleceğe güvenle bakma, Allah’ın rahmetinden bekleyiş içinde olma.",
      },
    ],
    sources: [
      "Bediüzzaman Said Nursî, Tarihçe-i Hayat (İstanbul: Şahdamar Yayınları, 2007), s. 45.",
      "M. Fethullah Gülen, Prizma-7: Zihin Harmanı (İstanbul: Nil Yayınları, 2011), s. 7.",
      "Suat Yıldırım, Kur’ân-ı Hakîm’in Açıklamalı Meali (İstanbul: Define Yayınları, 2007), Ahzâb 33/21, s. 420.",
    ],
  },
  {
    id: "konu-eylul-3",
    grade: 1,
    weekNumber: 3,
    month: 9,
    week: 3,
    year: 2026,
    title: "Hocaefendi ve Risale-i Nur",
    subtitle: "Bir insan bir eseri niçin hayatı boyunca tekrar tekrar okur?",
    readingMinutes: 6,
    sections: [
      {
        heading: "Kitapla kurulan ömürlük dostluk",
        paragraphs: [
          "Bir kitabı sadece bir kez okuyup bırakmakla, onu hayat boyu başvurulan bir dost kılmak arasında büyük fark vardır. Fethullah Gülen Hocaefendi’nin hayatında Risale-i Nur, gençliğinden itibaren sürekli okunan, düşünülen ve hayatla bağları aranan bir başvuru kaynağı olmuştur.",
        ],
      },
      {
        heading: "Tekrar okumanın sırrı",
        paragraphs: [
          "Mesnevî-i Nuriye’de Bediüzzaman, derin metinlere tekrar tekrar dönmenin önemini şöyle anlatır:",
        ],
      },
      {
        heading: null,
        kind: "quote",
        citation: "1",
        paragraphs: [
          "<u>Mütâlaasına</u> tekrar ile devam edilirse, <u>me’lûf</u> ve <u>me’nûs</u> bir şekil alır.",
        ],
      },
      {
        heading: "Âyet — Müzzemmil 73/4",
        kind: "arabic",
        citation: "2",
        paragraphs: ["﴿ أَوْ زِدْ عَلَيْهِ وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا ﴾"],
      },
      {
        heading: "Suat Yıldırım Meali",
        kind: "quote",
        citation: "2",
        paragraphs: [
          "Yahut buna biraz ekle ve Kur’ân’ı tane tane, hakkını vererek, düşüne düşüne oku.",
        ],
      },
    ],
    discussionQuestions: [
      "Bir kitabı tekrar okumak bize ne kazandırır?",
      "Düşünerek okumak ile aceleyle okumak arasındaki fark nedir?",
    ],
    application: {
      title: "Bu haftanın uygulaması",
      items: [
        "Daha önce okuduğun bir hikâyeyi veya pasajı bu kez yavaşça yeniden oku ve yeni fark ettiğin bir noktayı yaz.",
      ],
    },
    takeaway: [
      "Derin metinlerin tekrar okundukça tanıdık ve bereketli hâle geleceğini bilirim.",
      "Okumada acele etmek yerine anlamaya odaklanabilirim.",
    ],
    vocab: [
      {
        word: "Mütâlaa",
        definition: "Bir metni dikkatle, üzerinde düşünerek ve inceleyerek okuma.",
      },
      { word: "Me’lûf", definition: "Alışılmış, tanıdık ve yakın gelen." },
      { word: "Me’nûs", definition: "Dostluk ve ülfet peyda edilmiş, sevilen ve benimsenen." },
    ],
    sources: [
      "Bediüzzaman Said Nursî, Mesnevî-i Nûriye (İstanbul: Şahdamar Yayınları, 2007), s. 78.",
      "Suat Yıldırım, Kur’ân-ı Hakîm’in Açıklamalı Meali (İstanbul: Define Yayınları, 2007), Müzzemmil 73/4, s. 574.",
    ],
  },
  {
    id: "konu-eylul-4",
    grade: 1,
    weekNumber: 4,
    month: 9,
    week: 4,
    year: 2026,
    title: "Biz Bu Eserleri Nasıl Okuyacağız?",
    subtitle: "Bir metni anlamadığımızda ne yapacağız?",
    readingMinutes: 6,
    sections: [
      {
        heading: "Anlamadığımız yerde durmak",
        paragraphs: [
          "Bir kitap okurken bilmediğimiz bir kelime çıktığında hemen kitabı kapatmak kolay yoldur. Fakat öğrenmenin başladığı yer tam da orasıdır. Kelimenin altını çizmek, sözlüğe bakmak ve arkadaşımıza sormak okumayı zenginleştirir.",
        ],
      },
      {
        heading: "Cevabı son saymamak",
        paragraphs: ["Hocaefendi, Zihin Harmanı’nda araştırmanın sürekliliğine dikkat çeker:"],
      },
      {
        heading: null,
        kind: "quote",
        citation: "1",
        paragraphs: ["Burada cevap mahiyetinde arz edilen şeyleri de <u>kâfi</u> görmeyin."],
      },
      {
        heading: "Âyet — Zümer 39/9",
        kind: "arabic",
        citation: "2",
        paragraphs: [
          "﴿ قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ إِنَّمَا يَتَذَكَّرُ أُولُو الْأَلْبَابِ ﴾",
        ],
      },
      {
        heading: "Suat Yıldırım Meali",
        kind: "quote",
        citation: "2",
        paragraphs: [
          "De ki: 'Hiç bilenlerle bilmeyenler bir olur mu?' Ancak akıl sahipleri ibret ve öğüt alır.",
        ],
      },
    ],
    discussionQuestions: [
      "Okurken bilmediğin bir kelimeyle karşılaştığında ne yaparsın?",
      "Merak duygusu bir öğrenciye nasıl güç kazandırır?",
    ],
    application: {
      title: "Bu haftanın uygulaması",
      items: [
        "Bu hafta okuduğun bir metinden bilmediğin 3 kelimeyi tespit edip sözlükten anlamlarını öğren.",
      ],
    },
    takeaway: [
      "Bilmeyişimi bir kusur değil, yeni bir öğrenme fırsatı olarak görebilirim.",
      "Hazır cevaplarla yetinmeyip araştırmayı sürdürebilirim.",
    ],
    vocab: [
      { word: "Kâfi", definition: "Yeterli, kâfi gelen." },
      { word: "İbret", definition: "Bir olaydan veya bilgiden çıkarılan ders." },
      {
        word: "Ulü’l-elbâb",
        definition: "Aklını ve basiretini kullanarak hakikati kavrayan derin kavrayış sahipleri.",
      },
    ],
    sources: [
      "M. Fethullah Gülen, Prizma-7: Zihin Harmanı (İstanbul: Nil Yayınları, 2011), s. 8.",
      "Suat Yıldırım, Kur’ân-ı Hakîm’in Açıklamalı Meali (İstanbul: Define Yayınları, 2007), Zümer 39/9, s. 458.",
    ],
  },
  {
    id: "g2-konu-eylul-1",
    grade: 2,
    weekNumber: 1,
    month: 9,
    week: 1,
    year: 2026,
    title: "İki Kilimlik Bir Dükkânda Başlayan Yolculuk",
    subtitle: "Bir kitap insanın hayatında nasıl sıradan bir kitap olmaktan çıkar?",
    readingMinutes: 8,
    sections: [
      {
        heading: "Bir sayfa insanın dünyasını nasıl değiştirir?",
        paragraphs: [
          "Raflarda binlerce kitap durur. Sayfaları çevrilir, bazen bir sınava hazırlanmak bazen vakit geçirmek için okunur. Fakat bazı anlar vardır ki, okunan tek bir sayfa bir insanın hayatında dönüm noktası olur. O andan sonra kişi dünyaya, insanlara ve geleceğe aynı gözle bakamaz. Bir kitap insanın elinde nasıl sıradan bir nesne olmaktan çıkıp hayatın pusulasına dönüşür?",
          "Fethullah Gülen Hocaefendi, gençlik yıllarında Erzurum’da Murat Paşa Camii yakınlarında, Tahta Cami civarında iki kilim serili küçük bir marangoz dükkânında Risale-i Nur ile ilk kez karşılaştığı o anı anlatır. Henüz medrese talebesi olan genç bir insan, orada okunan Sözler’i dinlerken varoluşun ve imanın sorularına yepyeni bir ufuktan cevap verildiğini hisseder. Mekân iki kilimlik dar bir yerdir; fakat orada açılan düşünce dünyası bütün bir hayatı kucaklayacak kadar geniştir.",
        ],
      },
      {
        heading: "Barla’nın dağ köyünden yayılan ışık",
        paragraphs: [
          "Mekânın küçüklüğü ile fikrin büyüklüğü arasındaki bu tezat, Risale-i Nur’un bizzat telif edildiği yerde de karşımıza çıkar. Bediüzzaman Said Nursî, 1926 yılında dağlar arasındaki tenha bir köy olan Barla’ya sürgün edildiğinde tek bir odada, tecrit ve sıkı gözetim altında yaşamıştır. Fakat Tarihçe-i Hayat o dönemi şöyle kaydeder:",
        ],
      },
      {
        heading: null,
        kind: "quote",
        citation: "1",
        paragraphs: [
          "Bu itibarla <u>Barla</u>, Risale-i Nur <u>dershane</u>sinin ilk merkezi idi. Barla’daki hayatı gerçi <u>nefiy</u> ve <u>inzivâ</u> içinde ve <u>tarassut</u> altında geçmekle acı idi; fakat Risale-i Nur hakikatlerinin <u>telif</u> yeri olduğundan, Üstad’ın en tatlı ve şirin hayatı da yine Barla hayatıdır, denilebilir.",
        ],
      },
      {
        heading: "Zorlukların içinde yeşeren şevk",
        paragraphs: [
          "Nefiy (sürgün), inzivâ (yalnızlık) ve tarassut (sürekli takip ve gözetim) içinde geçen bir hayat nasıl 'en tatlı hayat' olabilir? Çünkü insan inandığı bir hakikati başkalarına ulaştırma gayesiyle yaşıyorsa, odanın darlığı veya sürgün şartları onun ruhunu daraltamaz. Barla’daki o tek göz odada yazılan risaleler, elden ele, köyden köye binlerce insan tarafından elle yazılarak çoğaltılmıştır.",
          "Bir fikrin gücü, onun arkasındaki imkânların bolluğundan değil, hakikate olan samimi bağlılıktan doğar. İki kilimlik dükkânda okunan o satırlar da Barla’daki bu ihlaslı başlangıcın bir devamıdır.",
        ],
      },
      {
        heading: "Zâhirî bakış ile dikkatli nazar",
        paragraphs: [
          "Hocaefendi, bir esere sadece dışarıdan bakmakla onun hakikatine nüfuz etmek arasındaki farkı şöyle ifade eder:",
        ],
      },
      {
        heading: null,
        kind: "quote",
        citation: "2",
        paragraphs: [
          "Perdeyi yırtıp, danede hakikatı gösteren <u>dikkat-i nazar</u>dır; <u>zâhirî nazar</u> değil.",
        ],
      },
      {
        heading: "Kitapla kurulan derin bağ",
        paragraphs: [
          "Zâhirî nazar, yani yüzeysel bakış, bir tohumda sadece kahverengi kuru bir kabuk görür. Dikkat-i nazar ise o tohumun çatlayıp bir meyve bahçesine dönüşme potansiyelini fark eder. Erzurum’daki o küçük dükkânda ya da Barla’daki küçük odada yapılan şey, işte bu dikkat-i nazardı.",
          "Bizler de bu yıl metinleri okurken sadece kelimelerin üzerinden göz gezdirmeyeceğiz. 'Yazar bu cümlede hangi hakikate kapı açıyor? Bu düşünce benim hayatımda neyi değiştirebilir?' diye soracağız. Bir kitap, ancak onunla böyle bir dikkat bağı kurduğumuzda bize yol gösteren bir rehbere dönüşür.",
        ],
      },
      {
        heading: "Âyet — En'âm 6/122",
        kind: "arabic",
        citation: "3",
        paragraphs: [
          "﴿ أَوَمَن كَانَ مَيْتًا فَأَحْيَيْنَاهُ وَجَعَلْنَا لَهُ نُورًا يَمْشِي بِهِ فِي النَّاسِ كَمَن مَّثَلُهُ فِي الظُّلُمَاتِ لَيْسَ بِخَارِجٍ مِّنْهَا ﴾",
        ],
      },
      {
        heading: "Suat Yıldırım Meali",
        kind: "quote",
        citation: "3",
        paragraphs: [
          "Ölü iken kendisini dirilttiğimiz ve insanlar arasında yürümesi için kendisine bir nur verdiğimiz kimse, karanlıklarda kalıp ondan hiç çıkamayan kimse gibi olur mu?",
        ],
      },
      {
        heading: "Âyetin dersimizle bağlantısı",
        paragraphs: [
          "Âyet-i kerime, hakikatten habersiz bir hayatı ölüme; iman ve ilimle aydınlanan bir hayatı ise dirilişe benzetir. Bir insanın hakiki bir eserle tanışıp hayatının gayesini bulması, işte bu ilahî nurla dirilmenin ve karanlıklardan aydınlığa çıkmanın güzel bir misalidir.",
        ],
      },
    ],
    discussionQuestions: [
      "Barla'daki sürgün hayatı bütün zorluklarına rağmen neden Bediüzzaman için 'en tatlı hayat' olarak nitelendirilmiştir?",
      "Bir kitaba 'zâhirî nazarla' bakmak ile 'dikkat-i nazarla' bakmak arasında öğrenme açısından ne gibi farklar vardır?",
    ],
    application: {
      title: "Bu haftanın uygulaması",
      items: [
        "Okuma yaptığın köşeyi veya masayı sadeleştir; orayı kendi 'dikkat-i nazar' mekânın olarak belirle.",
        "Bu hafta okuduğun kısa bir paragrafı seç; yüzeysel geçmek yerine üzerine iki derin soru sorup not al.",
      ],
    },
    takeaway: [
      "Bir çalışmanın değerini başladığı mekânın büyüklüğüyle değil, taşıdığı niyetin samimiyetiyle ölçebilirim.",
      "Zor şartlar altında bile inandığım hakikatleri öğrenme ve yaşama gayemi diri tutabilirim.",
      "Okuduğum metinlere yüzeysel değil, derindeki anlamı arayan bir dikkatle yaklaşabilirim.",
      "Hakikatle kurulan samimi bir bağın insanın bütün hayat ufkunu aydınlatabileceğini fark edebilirim.",
    ],
    vocab: [
      {
        word: "Nefiy",
        definition: "Kendi isteği dışında, zorla başka bir yere sürgün edilme.",
      },
      {
        word: "İnzivâ",
        definition:
          "Toplumdan ve kalabalıklardan uzaklaşıp tek başına tefekkür ve ibadetle baş başa kalma.",
      },
      {
        word: "Tarassut",
        definition: "Birini sürekli gözetim altında tutma, gizlice veya açıkça takip etme.",
      },
      {
        word: "Telif",
        definition: "Bir konuyu araştırıp düşünerek kitap veya risale hâlinde yazma.",
      },
      {
        word: "Dikkat-i nazar",
        definition:
          "Bir şeyin dış görünüşüyle yetinmeyip derinlemesine, hakikatini kavramak için dikkatle bakış.",
      },
      {
        word: "Zâhirî nazar",
        definition: "Bir şeye yalnızca yüzeysel, dıştan ve ayrıntısına girmeden bakış.",
      },
    ],
    sources: [
      "Bediüzzaman Said Nursî, Tarihçe-i Hayat (İstanbul: Şahdamar Yayınları, 2007), s. 666.",
      "M. Fethullah Gülen, Fasıldan Fasıla-1 (İzmir: Nil Yayınları, 2008), s. 243.",
      "Suat Yıldırım, Kur’ân-ı Hakîm’in Açıklamalı Meali (İstanbul: Define Yayınları, 2007), En'âm 6/122, s. 142.",
    ],
  },
  {
    id: "g3-konu-eylul-1",
    grade: 3,
    weekNumber: 1,
    month: 9,
    week: 1,
    year: 2026,
    title: "Bir Hakikat Hayata Ne Zaman Girer?",
    subtitle: "Bir şeyi bilmekle onu yaşamak arasındaki fark nedir?",
    readingMinutes: 9,
    sections: [
      {
        heading: "Bilgi ile davranış arasındaki köprü",
        paragraphs: [
          "Bir tıp öğrencisi sağlıklı beslenmenin bütün kurallarını ezbere bilebilir; fakat kendisi zararlı gıdalarla besleniyorsa bu bilgi onun bedenine fayda vermez. Benzer şekilde, dürüstlüğün ve adaletin faziletini en güzel cümlelerle anlatan bir insan, küçük bir menfaat karşısında hemen yalana başvuruyorsa bildiği doğrular henüz onun şahsiyetine mal olmamış demektir.",
          "Bir hakikat zihnimizde bir fikir olarak durduğu sürece sadece bir yük veya malumattır. O ne zaman kalbimize iner, irademizi harekete geçirir ve davranışlarımıza yansırsa işte o zaman gerçek bir 'değer' hâline gelir. Peki, bildiğimiz bir doğruyu günlük hayatın karmaşasında yaşanır kılan asıl saik nedir?",
        ],
      },
      {
        heading: "İhlas: Amelin ruhu",
        paragraphs: [
          "Bediüzzaman Said Nursî, Lem’alar adlı eserindeki Yirmi Birinci Lem’a’da (İhlas Risalesi), amelleri ayakta tutan ve onları kalıcı kılan temel esası şöyle formüle eder:",
        ],
      },
      {
        heading: null,
        kind: "quote",
        citation: "1",
        paragraphs: [
          "<u>Amelinizde</u> <u>rızâ-yı ilâhî</u> olmalı. Eğer O râzı olsa, bütün dünya küsse ehemmiyeti yok. Eğer O kabul etse, bütün halk reddetse te’siri yok. O râzı olduktan ve kabul ettikten sonra, isterse ve hikmeti iktizâ ederse, sizler istemek talebinde olmadığınız hâlde, halklara da kabul ettirir, onları da râzı eder.",
        ],
      },
      {
        heading: "Beklentisiz iyilik ve iç huzuru",
        paragraphs: [
          "İhlas, yapılan bir iyiliği veya görevi insanların takdiri, alkışı ya da maddi bir karşılık için değil; sırf Allah emrettiği ve O razı olduğu için yapabilmektir. İnsan davranışlarını başkalarının övgüsüne bağladığında, o övgü kesildiği an gayretini de kaybeder. Bir arkadaşına yardım ettiğinde teşekkür görmeyince küsen insan, henüz o yardımı tam bir ihlasla yapamamış demektir.",
          "Fakat hedefini 'rızâ-yı ilâhî' kılan bir kişi, kimseden teşekkür beklemez. O bilir ki, doğru bir davranışın gerçek mükâfatı insanların alkışında değil, Allah katındaki değerindedir. İşte bu şuur, insanı başkalarının övgüsüne köle olmaktan kurtarır ve ona sarsılmaz bir ahlâkî istikrar kazandırır.",
        ],
      },
      {
        heading: "Nazarî bilgiden amelî derinliğe",
        paragraphs: [
          "Fethullah Gülen Hocaefendi, bilginin sadece teorik bir malumat olmaktan çıkıp kalpte iman nuruna dönüşmesini doğrudan doğruya amele bağlar:",
        ],
      },
      {
        heading: null,
        kind: "quote",
        citation: "2",
        paragraphs: [
          "Gerçekten Allah’a iman meselesi, insanın kalbinde ancak <u>amel</u> sayesinde tamamiyetle belirir ve imanın ruhuna ancak amel sayesinde erilebilir. Yoksa <u>nazarî malumat</u>la o ulvî hakikate ve ufka ulaşılamaz.",
        ],
      },
      {
        heading: "Temsil: Yaşayarak anlatmak",
        paragraphs: [
          "Risale-i Nur ameldeki ihlası ve gaye birliğini kurarken, Hocaefendi amelin insanın iç dünyasındaki inşai gücüne dikkat çeker. Kitaplardan okuduğumuz nazarî malumat (teorik bilgi), ancak hayata geçirildiğinde kalpte kökleşir. İbadet, dürüstlük, fedakârlık ve şefkat yaşandıkça imanın nuru kalpte parıldar.",
          "Buna İslâm ahlâkında temsil denir. Temsil, inandığı hakikati sözle anlatmaktan önce hâliyle, duruşuyla ve ahlâkıyla göstermektir. İnsanlar süslü nutuklardan çok, zorluklar karşısında adaletini ve merhametini kaybetmeyen şahsiyetlerden etkilenirler. Bu yıl amacımız, öğrendiğimiz her hakikatin hayatımızdaki karşılığını aramak ve onu küçük de olsa bir davranışla temsil edebilmektir.",
        ],
      },
      {
        heading: "Âyet — Saff 61/2–3",
        kind: "arabic",
        citation: "3",
        paragraphs: [
          "﴿ يَا أَيُّهَا الَّذِينَ آمَنُوا لِمَ تَقُولُونَ مَا لَا تَفْعَلُونَ ۝ كَبُرَ مَقْتًا عِندَ اللَّهِ أَن تَقُولُوا مَا لَا تَفْعَلُونَ ﴾",
        ],
      },
      {
        heading: "Suat Yıldırım Meali",
        kind: "quote",
        citation: "3",
        paragraphs: [
          "Ey iman edenler! Yapmayacağınız şeyleri niçin söylüyorsunuz? Yapmayacağınız şeyleri söylemeniz, Allah katında en çok nefret edilen bir davranıştır.",
        ],
      },
      {
        heading: "Âyetin dersimizle bağlantısı",
        paragraphs: [
          "Âyet-i kerime, insanın sözü ile eylemi arasındaki çelişkiye karşı en kuvvetli uyarıyı yapar. İnandığını söylemek bir iddiadır; onu yaşamak ise o iddianın ispatıdır. Hayatımızda sözlerimiz ile davranışlarımız arasındaki mesafeyi kapatmak, ahlâkî olgunluğun temel şartıdır.",
        ],
      },
    ],
    discussionQuestions: [
      "Bir insanın bildiği ahlâkî doğrular ile günlük hayatındaki tercihleri arasında neden boşluk oluşur?",
      "İhlas prensibi bir gencin okulda veya arkadaş çevresindeki davranışlarına nasıl bir bağımsızlık ve özgüven kazandırır?",
    ],
    application: {
      title: "Bu haftanın uygulaması",
      items: [
        "Bildiğin fakat ertelediğin tek bir ahlâkî adımı belirle (örn. evde yardım etmek, bir arkadaşının hakkını korumak).",
        "Bu davranışı hafta boyunca kimseden teşekkür veya takdir beklemeden, sadece Allah rızası için sürdür.",
      ],
    },
    takeaway: [
      "Bilginin gerçek kıymetinin ancak yaşandığında ve ahlâka dönüştüğünde ortaya çıktığını bilirim.",
      "Yaptığım hayırlı işlerde insanların alkışını değil, Allah’ın rızasını aramayı ilke edinebilirim.",
      "Sözlerim ile davranışlarım arasındaki uyumu gözeterek temsil şuuruna sahip bir duruş sergileyebilirim.",
      "Teorik malumatla yetinmeyip inandığım değerleri küçük ve sürekli adımlarla hayata taşıyabilirim.",
    ],
    vocab: [
      {
        word: "Amel",
        definition:
          "İnancın ve bilginin gereği olarak yapılan her türlü hayırlı iş, davranış ve ibadet.",
      },
      {
        word: "Rızâ-yı ilâhî",
        definition: "Allah’ın hoşnutluğu, rızası ve sevgisi; amellerin en yüce hedefi.",
      },
      {
        word: "Nazarî malumat",
        definition:
          "Yalnızca zihinde teorik olarak kalan, hayata ve uygulamaya geçirilmemiş bilgi.",
      },
      {
        word: "İhlas",
        definition:
          "İbadet ve iyilikleri yalnız Allah rızası için yapma, her türlü gösteriş ve menfaatten arınma samimiyeti.",
      },
      {
        word: "Temsil",
        definition:
          "İnandığı hakikatleri bizzat yaşayarak, örnek hâl ve ahlâkıyla başkalarına gösterme hali.",
      },
    ],
    sources: [
      "Bediüzzaman Said Nursî, Lem’alar, Yirmi Birinci Lem'a (İstanbul: Şahdamar Yayınları, 2007), s. 220.",
      "M. Fethullah Gülen, Sohbet Atmosferi (İstanbul: Nil Yayınları, 2015), s. 51.",
      "Suat Yıldırım, Kur’ân-ı Hakîm’in Açıklamalı Meali (İstanbul: Define Yayınları, 2007), Saff 61/2–3, s. 550.",
    ],
  },
  {
    id: "g4-konu-eylul-1",
    grade: 4,
    weekNumber: 1,
    month: 9,
    week: 1,
    year: 2026,
    title: "Bir Kitap Ne Zaman 'Kaynak' Olur?",
    subtitle:
      "Bir kitabı sadece okumakla, bir sorumuz olduğunda ona başvurmak arasında ne fark vardır?",
    readingMinutes: 10,
    sections: [
      {
        heading: "Bilgi çağında kaynak disiplini",
        paragraphs: [
          "Günümüzde her gün yüzlerce iddia, sosyal medya iletisi ve alıntı önümüze düşüyor. Altında tanınmış bir düşünürün veya bilim insanının fotoğrafı bulunan bir cümlenin hemen paylaşıldığını görürüz. Oysa bir görselin üzerine isim yazmak, o sözün gerçekten o kişiye ait olduğunu kanıtlamaz. Çoğu zaman söz bağlamından koparılmış, tahrif edilmiş veya bütünüyle uydurulmuştur.",
          "Lise seviyesinde bir zihin için artık en temel mesele şudur: Bir kitabı baştan sona rastgele okuyup geçmekle, zihnimizdeki bir meseleyi çözmek için ona güvenilir bir 'kaynak' olarak başvurmak arasında ne fark vardır? Bir metin ne zaman delil sayılır, ne zaman sadece yazarın şahsi kanaati olarak kalır?",
        ],
      },
      {
        heading: "İhtisas alanı ve yetkinlik sınırı",
        paragraphs: [
          "Bediüzzaman Said Nursî, akıl yürütme ve delil yöntemini anlattığı Muhâkemât adlı eserinde, her ilmin kendi sınırları ve uzmanlığı içinde değerlendirilmesi gerektiğini şu veciz tespitle ortaya koyar:",
        ],
      },
      {
        heading: null,
        kind: "quote",
        citation: "1",
        paragraphs: [
          "Kim bir şeyde çok <u>tevaggul</u> etse, galiben başkasında <u>gabîleşmesine</u> sebebiyet verir. Bu sırra binaendir ki, maddiyatta tevaggul eden, mâneviyatta gabîleşir ve <u>sathî</u> olur. Bu noktaya nazaran, maddiyatta <u>maharati</u> olanın mâneviyatta hükmü <u>hüccet</u> olmasına sebep olmadığı gibi, çok defa sözü dahi <u>şâyân-ı istimâ</u> değildir.",
        ],
      },
      {
        heading: "Her meselenin kendi terazisi",
        paragraphs: [
          "Bu pasaj bize çok temel bir metodoloji sunar: Bir insanın bir alanda çok yetkin (mahir) olması, onun her alanda söz söyleyebileceği anlamına gelmez. Fizikte veya biyolojide Nobel ödülü almış bir bilim insanının ahlâk, varoluş veya din konusundaki şahsi kanaatleri mutlak bir hakikat ya da hüccet (kesin delil) değildir. Gözümüz ağrıdığında en usta mühendise değil doktora gideriz; köprü yaptırırken de doktora değil mühendise müracaat ederiz.",
          "Aynı kural dinî ve fikrî metinler için de geçerlidir. Kur'an ayeti esastır; meal o ayetin Türkçe aktarımıdır; tefsir bir âlimin ayeti anlama çabasıdır; okuyucunun çıkarımı ise kendi yorumudur. Bu dört katmanı birbirine karıştırmadan, her birine kendi değerini vererek okumak kaynak ahlâkının ilk adımıdır.",
        ],
      },
      {
        heading: "Metinle tahkik temelli ilişki",
        paragraphs: [
          "Fethullah Gülen Hocaefendi, meselelerin kulaktan dolma özetlerle geçiştirilmemesi ve bizzat kaynaklara inilerek incelenmesi gerektiğini şöyle vurgular:",
        ],
      },
      {
        heading: null,
        kind: "quote",
        citation: "2",
        paragraphs: [
          "Bu itibarla, sizden de rica edeceğim, meseleleri sadece burada dinlemekle bırakmayalım; onları tahkik edelim, araştıralım ve temel kaynaklara inelim.",
        ],
      },
      {
        heading: "Sorudan metne doğru yürümek",
        paragraphs: [
          "Risale-i Nur kaynakların sınırını ve yetkinlik şartını belirlerken, Hocaefendi dinlenen veya okunan bilginin peşine düşüp onu tahkik etme sorumluluğunu bize yükler. Bir kitabı kaynak kılmak, aklımızdaki soruyu netleştirmek, o soruyla ilgili bölümleri tespit etmek, delil örgüsünü incelemek ve cümlenin öncesi ile sonrasını birlikte tartmaktır.",
          "Bu yıl lise hayatımızda kaynakla ilişkimiz böyle gelişecek. Bir fikri savunurken 'Biri böyle demişti' demek yerine; yazarın eserini, bölümünü, dayandığı delili ve o delilin geçerlilik sınırını gösterebilen bir araştırma disiplini kazanacağız.",
        ],
      },
      {
        heading: "Âyet — Nisâ 4/59",
        kind: "arabic",
        citation: "3",
        paragraphs: [
          "﴿ يَا أَيُّهَا الَّذِينَ آمَنُوا أَطِيعُوا اللَّهَ وَأَطِيعُوا الرَّسُولَ وَأُولِي الْأَمْرِ مِنكُمْ فَإِن تَنَازَعْتُمْ فِي شَيْءٍ فَرُدُّوهُ إِلَى اللَّهِ وَالرَّسُولِ إِن كُنتُمْ تُؤْمِنُونَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ ذَٰلِكَ خَيْرٌ وَأَحْسَنُ تَأْوِيلًا ﴾",
        ],
      },
      {
        heading: "Suat Yıldırım Meali",
        kind: "quote",
        citation: "3",
        paragraphs: [
          "Ey iman edenler! Allah’a itaat edin. Resulüne ve sizden olan ülülemre de itaat edin. Eğer hakkında ihtilâfa düştüğünüz bir mesele olursa onu Allah’a ve Resulüne arzediniz. Böyle yapmanız hem daha hayırlı, hem de netice bakımından daha güzeldir.",
        ],
      },
      {
        heading: "Âyetin dersimizle bağlantısı",
        paragraphs: [
          "Âyet-i kerime, fikir ayrılığı ve anlaşmazlık anında keyfî yorumlara sapmak yerine temel kaynaklara —Allah’ın Kitabı’na ve Resulullah’ın Sünneti’ne— başvurmayı emreder. Bu, İslâm düşüncesindeki kaynak merkezli düşünme disiplininin kurucu ilkesidir.",
        ],
      },
    ],
    discussionQuestions: [
      "Bir alanda uzman olan bir kişinin başka bir alandaki görüşlerini mutlak doğru saymak neden tehlikelidir?",
      "Bir metni okurken 'yazarın asıl ifadesi' ile 'bizim o ifadeden çıkardığımız yorum' arasındaki ayrımı yapmak neden önemlidir?",
    ],
    application: {
      title: "Bu haftanın uygulaması — Kaynak Kartı",
      items: [
        "Sosyal medyada veya bir sohbette karşılaştığın çarpıcı bir alıntıyı seç.",
        "Bu sözün kaynağını araştır: Kitabın adını, bölümünü ve asıl bağlamını bularak bir kaynak kartına kaydet.",
      ],
    },
    takeaway: [
      "Duyduğum her bilgiyi araştırmadan kabul etmek yerine kaynağını ve delilini sorgulayabilirim.",
      "Maddi ilimlerdeki yetkinliğin manevi meselelerde kendiliğinden hüccet oluşturmayacağını bilirim.",
      "Kaynak metin ile o metin üzerine yapılan kişisel yorumları birbirinden titizlikle ayırabilirim.",
      "Bir meseleyi yüzeysel kabullerle değil, temel kaynaklarına inerek tahkik etme alışkanlığı kazanabilirim.",
    ],
    vocab: [
      {
        word: "Tevaggul",
        definition: "Bir mesele veya ilim dalıyla kendini kaptırırcasına derinlemesine uğraşma.",
      },
      {
        word: "Gabîleşmek",
        definition:
          "Bir alana aşırı yoğunlaşmaktan dolayı diğer sahalarda anlayışı ve kavrayışı zayıflamak.",
      },
      {
        word: "Sathî",
        definition: "Yüzeysel, derinliği olmayan, meselenin köküne inemeyen sığ yaklaşım.",
      },
      {
        word: "Maharet",
        definition: "Bir işte gösterilen ustalık, uzmanlık ve beceri.",
      },
      {
        word: "Hüccet",
        definition: "Şüpheye yer bırakmayacak derecede açık, geçerli ve bağlayıcı delil.",
      },
      {
        word: "Şâyân-ı istimâ",
        definition: "Dinlenmeye değer, kulak verilmesi ve ciddiye alınması gereken söz.",
      },
    ],
    sources: [
      "Bediüzzaman Said Nursî, Muhâkemât, Birinci Makale (İstanbul: Şahdamar Yayınları, 2007), s. 20 (asıl sayfa 12).",
      "M. Fethullah Gülen, Zihin Harmanı (Prizma-7) (İstanbul: Nil Yayınları, 2011), s. 8.",
      "Suat Yıldırım, Kur’ân-ı Hakîm’in Açıklamalı Meali (İstanbul: Define Yayınları, 2007), Nisâ 4/59, s. 86.",
    ],
  },
  {
    id: "g5-konu-eylul-1",
    grade: 5,
    weekNumber: 1,
    month: 9,
    week: 1,
    year: 2026,
    title: "Bu Yıl Bir Metni Nasıl Daha Derin Okuyacağız?",
    subtitle: "Bir şeyi anlamakla, onun neden doğru olduğunu araştırmak arasında ne fark vardır?",
    readingMinutes: 11,
    sections: [
      {
        heading: "Taklitten tahkike doğru",
        paragraphs: [
          "Bir paragrafı okuyup 'Yazar burada ne demek istiyor?' sorusunu sormak anlamanın ilk basamağıdır. Ancak lise son sınıflara yaklaşan bir zihin için bu soru artık yetersiz kalır. Şimdi asıl mesele şudur: 'Yazar bu iddiaya hangi gerekçeyle vardı? Hangi delili kullandı? Kurduğu mantık örgüsünde bir kopukluk var mı?'",
          "İşte bu sorgulama, düşünceyi taklit seviyesinden tahkik seviyesine taşır. Taklitte kişi, sevdiği bir yazarın her sözünü delilsiz benimser. Tahkikte ise delili tartar, iddia ile ispat arasındaki bağı görür. Bu yıl amacımız metinleri yalnız okumak değil; düşüncenin mimarisini çözümlemektir.",
        ],
      },
      {
        heading: "Öz ile kabuk: Lübb ve kışır dengesi",
        paragraphs: [
          "Bediüzzaman Said Nursî, Muhâkemât adlı eserinin On İkinci Mukaddime’sinde derin okumanın ve doğru muhakemenin temel yasasını şöyle özetler:",
        ],
      },
      {
        heading: null,
        kind: "quote",
        citation: "1",
        paragraphs: [
          "<u>Lübbü</u> bulmayan, <u>kışır</u> ile meşgul olur. Hakikati tanımayan, <u>hayâlâta</u> sapar. <u>Sırat-ı müstakîmi</u> göremeyen, <u>ifrat</u> ve <u>tefrite</u> düşer. <u>Muvâzenesiz</u> ve <u>mizansız</u> olan çok aldanır, aldatır.",
        ],
      },
      {
        heading: "Düşüncede mizan ve ifrat-tefrit tuzağı",
        paragraphs: [
          "Buradaki kavramlar derin bir düşünce haritası sunar. Lübb, bir şeyin özü, çekirdeği ve esasıdır; kışır ise o özü koruyan dış kabuktur. Bir metinde asıl hakikat lübbtür; yazarın kullandığı edebi sanatlar, benzetmeler ve örnekler ise kışırdır. Kabukla oyalanıp özü kaçıran insan, hakikati anlayamaz.",
          "Aynı şekilde, zihninde sağlam bir mizan (ölçü ve denge) kuramayan insan ya ifrata (aşırılığa) ya da tefrite (ihmalkârlığa) savrulur. Doğru düşünce, sırat-ı müstakîmde, yani ifrat ve tefritten uzak mutedil çizgide yürümektir. Bir metni derinlemesine okumak, kabuğu soyup öze ulaşma ve o özü dengeli bir mizanla tartma gayretidir.",
        ],
      },
      {
        heading: "Tefekkürsüz ilim, tahlilsiz malumat",
        paragraphs: [
          "Fethullah Gülen Hocaefendi, bilginin analiz ve tefekkürle yoğrulmadığında zihinde nasıl anlamsız bir yüke dönüşeceğini şöyle açıklar:",
        ],
      },
      {
        heading: null,
        kind: "quote",
        citation: "2",
        paragraphs: [
          "Tefekkür, aklın bir meyvesi, kalbin bir nûrudur. Tefekkürsüz ilim, ruhsuz bir ceset; tahlilsiz mâlumat ise tasnif edilmemiş bir yığından ibarettir.",
        ],
      },
      {
        heading: "Metin haritası çıkarmak",
        paragraphs: [
          "Nursî’nin lübb-kışır uyarısı ile Hocaefendi’nin tahlil ve tefekkür vurgusu aynı hakikatte birleşir: Bir metni ezberlemek derin okuma değildir. Derin okuma; yazarın ana sorusunu, ortaya koyduğu iddiayı, getirdiği delili ve vardığı neticeyi bir harita gibi zihnimizde ayrıştırabilmektir.",
          "Bu yıl çalışacağımız her metinde şu dört adımı uygulayacağız: 1) Metnin cevap aradığı temel soru nedir? 2) Savunduğu ana iddia nedir? 3) Getirdiği delil (lübb) nedir? 4) Bu delilin benim dünyamdaki karşılığı nedir? Böyle bir okuma disiplini, zihnimizi hem aldanmaktan hem de başkalarını aldatmaktan koruyan en güçlü kalkandır.",
        ],
      },
      {
        heading: "Âyet — Sâd 38/29",
        kind: "arabic",
        citation: "3",
        paragraphs: [
          "﴿ كِتَابٌ أَنزَلْنَاهُ إِلَيْكَ مُبَارَكٌ لِّيَدَّبَّرُوا آيَاتِهِ وَلِيَتَذَكَّرَ أُولُوا الْأَلْبَابِ ﴾",
        ],
      },
      {
        heading: "Suat Yıldırım Meali",
        kind: "quote",
        citation: "3",
        paragraphs: [
          "Biz sana feyizli ve bereketli bir kitap indirdik ki insanlar onun âyetlerini iyice düşünsünler ve aklı yerinde olanlar ders ve ibret alsınlar.",
        ],
      },
      {
        heading: "Âyetin dersimizle bağlantısı",
        paragraphs: [
          "Âyette geçen 'tedebbür', bir sözün ardını, önünü, hikmetini ve delillerini derinlemesine düşünmektir. 'Ülü'l-elbâb' ise lübb sahipleri, yani kabukta takılmayıp özü kavrayan basiretli akıl sahipleridir. Kur’an bizden yüzeyde kalan bir okuma değil, tedebbürle derinleşen bir zihin tavrı talep eder.",
        ],
      },
    ],
    discussionQuestions: [
      "Bir metinde 'öz' (lübb) ile 'kabuk' (kışır) arasındaki ayrım nasıl yapılabilir?",
      "Düşüncede 'muvâzene ve mizan'ı kaybetmek insanı günlük hayatta hangi aşırılıklara (ifrat ve tefrit) sürükler?",
    ],
    application: {
      title: "Bu haftanın uygulaması — Düşünce Haritası",
      items: [
        "Bu hafta inceleyeceğin bir sayfayı seç; altına çizgi çekmek yerine dört kutu oluştur: Soru, İddia, Delil, Kendi Yorumum.",
        "Yazarın iddiası ile getirdiği delili ayrı cümlelerle kaydet.",
      ],
    },
    takeaway: [
      "Metinleri ezbere kabullenmek yerine delillerini ve akıl yürütme zincirini tahlil edebilirim.",
      "Şekil ve kabukla oyalanmayıp meselenin özüne (lübb) inme gayreti gösterebilirim.",
      "Düşüncelerimde aşırılıklardan (ifrat ve tefrit) uzak durup dengeli bir mizan kurabilirim.",
      "Tefekkür ve tahlil ile işlenmeyen bilginin zihinde atıl bir yığın olarak kalacağını fark edebilirim.",
    ],
    vocab: [
      {
        word: "Lübb",
        definition: "Bir şeyin özü, esası, en kıymetli ve saf çekirdeği.",
      },
      {
        word: "Kışır",
        definition: "Bir şeyin dış kabuğu, dış yüzeyi, zâhirî tarafı.",
      },
      {
        word: "Hayâlât",
        definition: "Gerçeğe dayanmayan asılsız kuruntular, boş ve temelsiz hayaller.",
      },
      {
        word: "Sırat-ı müstakîm",
        definition: "Her türlü aşırılıktan ve sapmadan uzak, dosdoğru ve dengeli istikamet.",
      },
      {
        word: "İfrat ve tefrit",
        definition:
          "Bir konuda haddi aşıp aşırıya gitme (ifrat) ile gereğinden az yapıp ihmal etme (tefrit) uçları.",
      },
      {
        word: "Muvâzene ve mizan",
        definition: "Fikrî denge, adaletli ölçü ve hakikati tartan değerlendirme kıstası.",
      },
    ],
    sources: [
      "Bediüzzaman Said Nursî, Muhâkemât, On İkinci Mukaddime (İstanbul: Şahdamar Yayınları, 2007), s. 43 (asıl sayfa 35).",
      "M. Fethullah Gülen, Ölçü veya Yoldaki Işıklar (İzmir: Nil Yayınları, 2004), s. 35.",
      "Suat Yıldırım, Kur’ân-ı Hakîm’in Açıklamalı Meali (İstanbul: Define Yayınları, 2007), Sâd 38/29, s. 453.",
    ],
  },
  {
    id: "g6-konu-eylul-1",
    grade: 6,
    weekNumber: 1,
    month: 9,
    week: 1,
    year: 2026,
    title: "Bu Yıl Parçaları Nasıl Bir Bütüne Dönüştüreceğiz?",
    subtitle:
      "Yıllardır öğrendiğimiz iman ve ahlâk hakikatleri hayatımızda nasıl tek bir yön ve duruş oluşturabilir?",
    readingMinutes: 12,
    sections: [
      {
        heading: "Bölünmüş dünyalar ve merkez arayışı",
        paragraphs: [
          "Bir yanda üniversite sınavı ve kariyer planları, diğer yanda arkadaşlıklar, aile sorumlulukları, ibadet ve sosyal hayat... Çağımızda bir gencin zihni onlarca farklı parçaya bölünmüş durumdadır. Her alanda farklı beklentiler, farklı kurallar ve farklı baskılar vardır. Eğer bu alanlar arasında tutarlı bir bağ kurulamazsa, insan kendi içinde parçalanır; okulda başka, evde başka, yalnız kaldığında bambaşka bir kişiliğe bürünür.",
          "Altı yıllık bir eğitimin zirvesinde, yetişkinlik eşiğindeyken sorulacak en hayati soru şudur: Bugüne kadar öğrendiğimiz inanç, ahlâk ve bilgi parçaları hayatımızda nasıl tek bir sağlam omurga oluşturabilir? Hayatımızın farklı dairelerini birbirini destekleyen bir bütüne nasıl dönüştürebiliriz?",
        ],
      },
      {
        heading: "Vazifelerin hiyerarşisi ve hakâik-i imaniye",
        paragraphs: [
          "Bediüzzaman Said Nursî, Kastamonu Lâhikası'ndaki Yirmi Yedinci Mektup'ta hayatın geniş daireleri arasındaki öncelik hiyerarşisini ve merkezi şöyle açıklar:",
        ],
      },
      {
        heading: null,
        kind: "quote",
        citation: "1",
        paragraphs: [
          "Evet, bu zaman hem iman ve din için, hem <u>hayat-ı içtimaî</u> ve şeriat için, hem <u>hukuk-u âmme</u> ve siyaset-i İslâmiye için gayet ehemmiyetli birer müceddit ister. Fakat en ehemmiyetlisi, <u>hakâik-i imaniyeyi</u> muhafaza noktasında <u>tecdid</u> vazifesi, en mukaddes ve en büyüğüdür. Şeriat ve hayat-ı içtimaiye ve siyasiye daireleri ona nispeten ikinci, üçüncü, dördüncü derecede kalıyor.",
        ],
      },
      {
        heading: "Merkezi kaybetmemek",
        paragraphs: [
          "Bu pasajda muazzam bir merkez tespiti vardır: İnsan sosyal hayatın (hayat-ı içtimaiye) ve kariyerin cazibesine kapılıp dış dairelerde kaybolabilir. Oysa merkezde durması gereken şey hakâik-i imaniyedir; yani insanın Allah ile olan bağı, kalbindeki inanç ve ahlâkî duruşudur. Merkez sağlam kurulmadığında, dıştaki daireler ne kadar parlak görünürse görünüversin ilk krizde çökmeye mahkûmdur.",
          "Meslek sahibi olmak, topluma hizmet etmek, aile kurmak elbette vazifedir. Fakat bütün bu vazifeler, merkezdeki iman ve ahlâk nurundan beslendiği ölçüde bir anlam ve istikamet kazanır.",
        ],
      },
      {
        heading: "Bütünlük, denge ve gâye-i hayal",
        paragraphs: [
          "Fethullah Gülen Hocaefendi, Kendi Dünyamıza Doğru eserinde dağınık çabaların bir gaye etrafında bütünleşmemesi durumunda ortaya çıkacak tehlikeyi şöyle ifade eder:",
        ],
      },
      {
        heading: null,
        kind: "quote",
        citation: "2",
        paragraphs: [
          "Zaten, <u>bütünlük</u> ve <u>denge</u>, daha sağlam bir organizasyona bağlanmamışsa, parça parça hareketler ne kadar canlı ve çalımlı da olsa, umumî maksat istikametinde birbirlerini desteklemeleri şöyle dursun, bazen hareketsizlikten daha kötü sonuçlar da doğurabilirler... Hedef unutulup ortada <u>gâye-i hayal</u> kalmayınca, kim olursa olsun artık egoizmanın ağına düşülmesi... kaçınılmaz olacaktır.",
        ],
      },
      {
        heading: "Şahsiyetin inşası: Düşünceden temsile",
        paragraphs: [
          "Nursî merkezi tespit ederken, Hocaefendi o merkezin etrafında kurulacak bütünlük ve dengeyi şart koşar. Eğer bir insanın hayatında 'gâye-i hayal' yani yüksek bir mefkûre ve ideal yoksa, zihin kaçınılmaz olarak küçük hesapların, bencilliğin ve savrulmaların ağına düşer.",
          "Bu son yılımızda yapacağımız şey, parçaları birleştirmektir. Fıkıhtan öğrendiğimiz adaleti arkadaşlığımıza, kelamdan öğrendiğimiz tevhidi kâinata bakışımıza, ahlâktan öğrendiğimiz ihlası meslek tercihimize taşıyacağız. Parçaların bütüne kavuştuğu bu şahsiyet inşası, üniversite kapısından içeri girdiğimizde bize her fırtınada ayakta kalabilecek sağlam bir duruş kazandıracaktır.",
        ],
      },
      {
        heading: "Âyet — Bakara 2/208",
        kind: "arabic",
        citation: "3",
        paragraphs: [
          "﴿ يَا أَيُّهَا الَّذِينَ آمَنُوا ادْخُلُوا فِي السِّلْمِ كَافَّةً وَلَا تَتَّبِعُوا خُطُوَاتِ الشَّيْطَانِ إِنَّهُ لَكُمْ عَدُوٌّ مُّبِينٌ ﴾",
        ],
      },
      {
        heading: "Suat Yıldırım Meali",
        kind: "quote",
        citation: "3",
        paragraphs: [
          "Ey iman edenler! Hepiniz toptan barış ve selamete girin de şeytanın adımlarını izlemeyin! Çünkü o, sizin aranızı açan belli bir düşmandır.",
        ],
      },
      {
        heading: "Âyetin dersimizle bağlantısı",
        paragraphs: [
          "Âyette geçen 'es-silm', hem İslâm teslimiyeti hem de iç ve dış barıştır; 'kâffeten' ise topyekûn, hayatın bütün alanlarını kapsayacak bir bütünsellikle girmektir. İmanı hayatın sadece bir köşesine hapsedip diğer alanları başıboş bırakmak yerine, hayatın tamamını aynı adalet ve istikamet dairesinde birleştirmek emredilmektedir.",
        ],
      },
    ],
    discussionQuestions: [
      "İnsanın mesleki hedefleri ile ahlâki değerleri arasında bir kopukluk olduğunda nasıl bir şahsiyet krizi ortaya çıkar?",
      "Bediüzzaman’ın 'hakâik-i imaniye merkezdir' tespiti, bir gencin üniversite ve kariyer planlamasında ne tür bir öncelik sıralaması gerektirir?",
    ],
    application: {
      title: "Bu haftanın uygulaması — Şahsî Bütünlük Haritası",
      items: [
        "Ortaya tek bir merkez çiz: İman ve Ahlâkî Duruşum.",
        "Etrafına dört halka yerleştir: Eğitim/Kariyer, Aile, Sosyal İlişkiler, Şahsî Zaman.",
        "Her halkanın merkezdeki değerden nasıl beslendiğini tek bir somut hedef cümlesiyle yaz.",
      ],
    },
    takeaway: [
      "Hayatımın farklı alanlarını birbirine zıt kompartımanlar olarak değil, tek bir ahlâkî omurganın parçaları olarak görebilirim.",
      "İman ve istikameti hayatımın merkezine yerleştirerek dış dairelerdeki savrulmalardan korunabilirim.",
      "Kariyer ve gelecek planlarımı yalnızca maddi başarıyla değil, insanlığa hizmet gayesiyle bütünleştirebilirim.",
      "Yüksek bir 'gâye-i hayal' sahibi olmanın insanı bencillikten ve anlamsızlıktan kurtaracağını bilirim.",
    ],
    vocab: [
      {
        word: "Hayat-ı içtimaiye",
        definition:
          "Toplumsal hayat, insanların bir arada oluşturduğu sosyal düzen ve ilişkiler ağı.",
      },
      {
        word: "Hukuk-u âmme",
        definition: "Kamu hukuku, bütün toplumun ortak haklarını ve adaletini ilgilendiren alan.",
      },
      {
        word: "Hakâik-i imaniye",
        definition: "İmanın temel hakikatleri, inanç esasları.",
      },
      {
        word: "Tecdid",
        definition:
          "Bir şeyi aslına ve özüne sadık kalarak çağın anlayışına uygun biçimde yenileme, canlandırma.",
      },
      {
        word: "Gâye-i hayal",
        definition: "İnsanın hayatına yön veren, uğruna yaşadığı en yüksek ideal ve yüce ufuk.",
      },
      {
        word: "Bütünlük ve denge",
        definition:
          "İnanç, düşünce ve eylem boyutlarının birbirini tamamlayan ahenkli bir birlik oluşturması.",
      },
    ],
    sources: [
      "Bediüzzaman Said Nursî, Kastamonu Lâhikası, Yirmi Yedinci Mektup’tan (İstanbul: Şahdamar Yayınları, 2007), s. 164 (asıl sayfa 158).",
      "M. Fethullah Gülen, Ruhumuzun Heykelini Dikerken-2 (Kendi Dünyamıza Doğru) (İstanbul: Nil Yayınları, 2004), s. 41.",
      "Suat Yıldırım, Kur’ân-ı Hakîm’in Açıklamalı Meali (İstanbul: Define Yayınları, 2007), Bakara 2/208, s. 32.",
    ],
  },
];

export const firstWeekKonuItems: readonly KonuCurriculumItem[] = firstWeekDrafts.map(createLesson);

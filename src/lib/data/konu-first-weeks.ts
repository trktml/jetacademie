import type { KonuCurriculumItem } from "./konu-curriculum";

type LessonDraft = Omit<KonuCurriculumItem, "body">;

function buildBody(lesson: LessonDraft): string {
  const sections = lesson.sections.map((section) => {
    const heading = section.heading ? `### ${section.heading}\n\n` : "";
    const paragraphs = section.paragraphs
      .map((paragraph) => {
        if (section.kind === "arabic") return `> ${paragraph}`;
        if (section.kind === "quote") {
          return `> “${paragraph}”${section.citation ? ` [${section.citation}]` : ""}`;
        }
        return `${paragraph}${section.citation ? ` [${section.citation}]` : ""}`;
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
  const takeaway = ["### Bana ne söylüyor?", ...lesson.takeaway.map((item) => `- ${item}`)].join(
    "\n\n"
  );
  const vocabulary = lesson.vocab.length
    ? [
        "### Kelimeler",
        ...lesson.vocab.map((item) => `- **${item.word}:** ${item.definition}`),
      ].join("\n\n")
    : "";
  const sources = lesson.sources.map((source, index) => `[${index + 1}] ${source}`).join("\n\n");

  return [
    `# ${lesson.title}`,
    lesson.subtitle,
    ...sections,
    questions.length ? `### Düşünelim ve Konuşalım\n\n${questions.join("\n\n")}` : "",
    application,
    takeaway,
    vocabulary,
    sources ? `### Kaynaklar\n\n${sources}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}

function createLesson(lesson: LessonDraft): KonuCurriculumItem {
  return { ...lesson, body: buildBody(lesson) };
}

const quranMealSource = (verses: string) =>
  `Suat Yıldırım, Kur’ân-ı Hakîm ve Açıklamalı Meali (İstanbul: Işık Yayınları, 2005), ${verses}.`;

const shahdamarSource = (title: string, detail: string) =>
  `Bediüzzaman Said Nursî, ${title} (İstanbul: Şahdamar Yayınları, 2007), ${detail}.`;

const nilSource = (title: string, year: number, detail: string) =>
  `M. Fethullah Gülen, ${title} (İstanbul: Nil Yayınları, ${year}), ${detail}.`;

export const firstWeekKonuItems: readonly KonuCurriculumItem[] = [
  createLesson({
    id: "konu-eylul-1",
    grade: 1,
    weekNumber: 1,
    month: 9,
    week: 1,
    year: 2026,
    title: "Benim Büyük Sorularım",
    subtitle: "Bir soruyu sormak, öğrenmenin ilk adımı olabilir mi?",
    readingMinutes: 4,
    sections: [
      {
        heading: "Soru sormak ayıp değil",
        paragraphs: [
          "Bazen insan gece gökyüzüne bakıp “Yıldızlar nasıl duruyor?” diye sorar. Bazen de “Ben niçin varım?”, “İyilik neden önemli?” ya da “Beni kim seviyor?” diye düşünür. Bunlar çocukça sorular değil; insan olmanın doğal parçalarıdır.",
          "Her sorunun cevabını hemen bulamayabiliriz. Bir soruyu dikkatle taşımak, doğru yere bakmak ve güvenilir bir kaynağa danışmak da öğrenmenin parçasıdır. Kaynak seçerken kimin yazdığını ve konuyla ilişkisini sorabiliriz. Bu yıl merak ettiğimiz şeyleri küçümsemeden konuşacağız.",
        ],
      },
      {
        heading: "Gökyüzüne biraz dikkatle bakalım",
        kind: "arabic",
        citation: "1",
        paragraphs: [
          "إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِأُولِي الْأَلْبَابِ ۝ الَّذِينَ يَذْكُرُونَ اللَّهَ قِيَامًا وَقُعُودًا وَعَلَىٰ جُنُوبِهِمْ وَيَتَفَكَّرُونَ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ رَبَّنَا مَا خَلَقْتَ هَٰذَا بَاطِلًا سُبْحَانَكَ فَقِنَا عَذَابَ النَّارِ",
        ],
      },
      {
        heading: "Ayetin meâlinden kısa bir bölüm",
        kind: "quote",
        citation: "1",
        paragraphs: ["düşünen insanlar"],
      },
      {
        heading: "Ayet bize ne düşündürüyor?",
        paragraphs: [
          "Âl-i İmrân sûresinin bu ayetleri, gökleri ve yeri düşünmeye çağırır. Burada düşünmek, yalnızca aklımızdan bir şey geçirmek değildir; gördüğümüz şeyler üzerine dikkatle durmaktır. Bir yıldızın güzelliğini fark edebilir, sonra onun nasıl oluştuğunu araştırabiliriz.",
          "Ayetin tamamı Allah’ı anmayı, yaratılış üzerinde düşünmeyi ve dua etmeyi birlikte anlatır. Böyle dikkatli düşünmeye tefekkür diyebiliriz. Merakımız bizi hem gözlem yapmaya hem de öğrendiklerimiz karşısında şükretmeye götürebilir.",
        ],
      },
      {
        heading: "Risale-i Nur’dan",
        kind: "quote",
        citation: "2",
        paragraphs: [
          "Bir kitap el yazısıyla yazılırsa, yalnız bir adama ve bir kaleme ihtiyaç vardır.",
        ],
      },
      {
        heading: "Bu söz bize ne söylüyor?",
        paragraphs: [
          "Bediüzzaman Said Nursî bu cümlede, bir kitabı yazmak için gereken emeği hatırlatır. Bir fikri yazıya geçirmek zaman ve dikkat ister. Bu, yazılan her şeyin otomatik olarak doğru olduğu anlamına gelmez; fakat bir eseri okurken arkasındaki emeği ve anlatılan fikri incelememiz için güzel bir başlangıçtır.",
        ],
      },
      {
        heading: "Pırlanta’dan",
        kind: "quote",
        citation: "3",
        paragraphs: ["Ben, halkın yapısına tercüman olan bu soruları saygıyla karşılıyorum."],
      },
      {
        heading: "Sorularımızı ciddiye alalım",
        paragraphs: [
          "Hocaefendi’nin bu sözü, soru soran insanı küçümsememeyi hatırlatıyor. Bir soruyu saygıyla dinlemek, her cevabı hemen kabul etmek demek değildir. Önce soruyu anlamaya, sonra cevabın dayandığı kaynağı görmeye çalışırız.",
        ],
      },
    ],
    discussionQuestions: [
      "Son zamanlarda aklına takılan büyük bir soru neydi?",
      "Bir sorunun cevabını ararken kimlerden veya hangi kaynaklardan yardım alabilirsin?",
      "Bir şeyi merak edince önce gözlem yapmak sana nasıl yardımcı olur?",
    ],
    application: {
      title: "Merak defterimi açıyorum",
      items: [
        "Bir sayfaya bu hafta aklına gelen üç soruyu yaz.",
        "Sorularından birini seçip yanına “Bunu nereden öğrenebilirim?” diye not düş.",
        "Hafta sonunda sorunun cevabını bulamasan bile öğrendiğin yeni bir şeyi yaz.",
      ],
    },
    takeaway: [
      "Büyük sorular sormak öğrenmenin doğal bir parçasıdır.",
      "Merak ettiğim şeyi gözlemleyebilir ve güvenilir kaynaklardan araştırabilirim.",
      "Bir soruyu saygıyla dinlemek, onu hemen cevaba bağlamaktan daha iyidir.",
    ],
    sources: [
      quranMealSource("Âl-i İmrân 3/190–191"),
      shahdamarSource("Mesnevî-i Nûriye, trc. Abdülmecid Nursî", "Dördüncü Lem’a, PDF s. 21"),
      nilSource("Prizma-7: Zihin Harmanı", 2011, "s. 7"),
    ],
    vocab: [
      { word: "Tefekkür", definition: "Bir şey üzerinde dikkatle düşünüp anlamını aramak." },
      { word: "Kaynak", definition: "Bir bilgi ya da düşünceyi öğrendiğimiz eser veya kişi." },
      { word: "Gözlem", definition: "Bir şeyi dikkatle inceleyip fark ettiklerimizi anlatmak." },
    ],
  }),
  createLesson({
    id: "konu-eylul-2",
    grade: 1,
    weekNumber: 2,
    month: 9,
    week: 2,
    year: 2026,
    title: "Bu Eser Neden Hâlâ Okunuyor?",
    subtitle: "Bir metne yıllar sonra yeniden dönünce yeni bir şey bulabilir miyiz?",
    readingMinutes: 4,
    sections: [
      {
        heading: "Aynı sayfa, başka bir zaman",
        paragraphs: [
          "Sevdiğin bir hikâyeyi bir kez okuduktan sonra tekrar açtığını düşün. İlk seferinde olayları merak etmiş olabilirsin. İkinci seferinde bir kahramanın neden öyle davrandığını fark edebilirsin. Sen büyüdükçe aynı cümleye başka bir soru da sorabilirsin.",
          "Risale-i Nur uzun zamandır okunan eserlerden biridir. Onu okuyanların bulunması, içindeki her düşüncenin kendiliğinden kanıtlandığı anlamına gelmez. Bir metni dikkatle okumak, ne söylediğini ve hangi gerekçeleri sunduğunu anlamaya çalışmaktır.",
        ],
      },
      {
        heading: "Kur’an’dan bir ayet",
        kind: "arabic",
        citation: "1",
        paragraphs: [
          "إِنَّ هَٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ وَيُبَشِّرُ الْمُؤْمِنِينَ الَّذِينَ يَعْمَلُونَ الصَّالِحَاتِ أَنَّ لَهُمْ أَجْرًا كَبِيرًا",
        ],
      },
      {
        heading: "Ayetin meâlinden kısa bir bölüm",
        kind: "quote",
        citation: "1",
        paragraphs: ["en doğru yola"],
      },
      {
        heading: "Kur’an’ın rehberliği",
        paragraphs: [
          "İsrâ sûresinin 9. ayeti Kur’an’ın insanı doğru olana yöneltmesini anlatır. Ayetteki bu mesajı düşünürken, Kur’an’ın ne söylediğini kendi bağlamında okumaya ve açıklamasını güvenilir meallerden takip etmeye çalışırız.",
          "Bir kitabın neden okunduğunu anlamanın yolu yalnızca kaç kişinin okuduğuna bakmak değildir. Metnin ne anlattığını, okurun hayatına nasıl seslendiğini ve düşüncelerinin hangi delillere dayandığını da incelemeliyiz.",
        ],
      },
      {
        heading: "Risale-i Nur’dan",
        kind: "quote",
        citation: "2",
        paragraphs: [
          "Yüzer milyon insanlar her gün usanmadan kemâl-i iştiyakla ve ihtiyaçla okurlar.",
        ],
      },
      {
        heading: "Alıntının bağlamını görelim",
        paragraphs: [
          "Bu cümle Sözler’de Kur’an’ın insanlar tarafından okunmasından söz edilen bölümde yer alır. Alıntı, Kur’an’a duyulan ilgiyi anlatır; Risale-i Nur’u okuyanların sayısı hakkında bir istatistik vermez. Bir fikri değerlendirirken alıntının hangi eserden ve hangi konu içinde geldiğine bakmak önemlidir.",
        ],
      },
      {
        heading: "Pırlanta’dan",
        kind: "quote",
        citation: "3",
        paragraphs: ["Muhteva ve mânâ itibarıyla kâinat da bir kitaptır."],
      },
      {
        heading: "Kâinatı okumak",
        paragraphs: [
          "Hocaefendi burada kâinatı, dikkatle bakılıp anlamı araştırılabilecek bir kitap gibi anlatır. Bu bir benzetmedir: gökyüzünü, bir ağacı ya da yağmurun gelişini gözlemleyip sorular sorabiliriz. Gözlemimizle, o gözlem hakkında kurduğumuz yorumu birbirinden ayırmayı da öğreniriz.",
        ],
      },
    ],
    discussionQuestions: [
      "Daha önce okuduğun bir hikâyeye tekrar dönünce ne fark ettin?",
      "Bir kitabın çok okunması ile içindeki her fikrin doğru olması aynı şey midir?",
      "Kâinatı bir kitap gibi düşünmek hangi gözlem sorularını aklına getiriyor?",
    ],
    application: {
      title: "Bir metne ikinci bakış",
      items: [
        "Sevdiğin kısa bir paragrafı yeniden oku.",
        "İlk okuyuşunda ne düşündüğünü ve şimdi aklına gelen yeni soruyu iki ayrı cümleyle yaz.",
        "Yeni düşünceni metindeki hangi kelime veya cümlenin başlattığını göster.",
      ],
    },
    takeaway: [
      "Bir metne yeniden dönmek, yeni sorular fark etmemi sağlayabilir.",
      "Bir eserin çok okunması tek başına doğruluk kanıtı değildir; metnin kendisini de incelemeliyim.",
      "Alıntıyı anlamak için hangi eserde ve hangi bağlamda geçtiğini öğrenmeliyim.",
    ],
    sources: [
      quranMealSource("İsrâ 17/9"),
      shahdamarSource("Sözler", "Yirmi Beşinci Söz, Onuncu Mesele, s. 498"),
      nilSource("Kur’an’ın Altın İkliminde", 2011, "s. 9"),
    ],
    vocab: [
      { word: "Bağlam", definition: "Bir sözün söylendiği konu ve çevresindeki bilgiler." },
      { word: "Rehber", definition: "Doğru yolu bulmaya yardım eden şey veya kişi." },
      {
        word: "Benzetme",
        definition: "Bir şeyi, ortak bir yönü olan başka bir şeye benzeterek anlatmak.",
      },
    ],
  }),
  createLesson({
    id: "konu-eylul-3",
    grade: 1,
    weekNumber: 3,
    month: 9,
    week: 3,
    year: 2026,
    title: "Bediüzzaman Kimdir?",
    subtitle: "Bir insanı tanımak için yalnızca adını ve tarihleri bilmek yeter mi?",
    readingMinutes: 4,
    sections: [
      {
        heading: "Bir hayatı tanımaya başlamak",
        citation: "2",
        paragraphs: [
          "Bediüzzaman Said Nursî, Bitlis’in Nurs köyünde doğmuş bir İslam âlimi ve yazardır. Küçük yaşlardan itibaren medreselerde eğitim aldı. Hayatının farklı dönemlerinde başka şehirlerde yaşadı; Barla’da bulunduğu yıllarda Risale-i Nur eserlerinin önemli bir kısmını kaleme aldı.",
          "Bunlar, hayatının yalnızca birkaç durağı. Bir insanı tanımak için tarihler kadar, hangi sorular üzerinde çalıştığını ve neyi önemli gördüğünü de araştırabiliriz.",
        ],
      },
      {
        heading: "Peygamberimizin örnekliği",
        kind: "arabic",
        citation: "1",
        paragraphs: [
          "لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ لِّمَن كَانَ يَرْجُو اللَّهَ وَالْيَوْمَ الْآخِرَ وَذَكَرَ اللَّهَ كَثِيرًا",
        ],
      },
      {
        heading: "Ayetin meâlinden kısa bir bölüm",
        kind: "quote",
        citation: "1",
        paragraphs: ["mükemmel bir nümune vardır"],
      },
      {
        heading: "İki farklı yeri karıştırmayalım",
        paragraphs: [
          "Ahzâb sûresinin bu ayeti, Allah Resulü Hz. Muhammed’i müminler için örnek gösterir. Bu ayet Bediüzzaman’dan söz etmez. Bediüzzaman bir peygamber değil; hayatını ve eserlerini inceleyebileceğimiz bir âlimdir. Onun öğrenme gayreti ve zor zamanlarda çalışmaya devam etmesi, örnek alınabilecek insanî özelliklerdir.",
          "Bir kişiyi sevmek, onu hiç hata yapmayan biri saymayı gerektirmez. Hayatını tarihî kaynaklardan öğrenebilir, değerli bulduğumuz yönlerini kendi yaşımıza uygun biçimde düşünebiliriz.",
        ],
      },
      {
        heading: "Risale-i Nur’dan",
        kind: "quote",
        citation: "3",
        paragraphs: ["İman insanı insan eder."],
      },
      {
        heading: "Bu cümle hakkında düşünelim",
        paragraphs: [
          "Bediüzzaman bu kısa cümleyi Sözler’de iman konusunu anlatırken kullanır. Burada imanın insana anlam, sorumluluk ve iyi davranış yönü kazandırması üzerinde düşünmeye çağrılıyoruz. Cümleyi ezberlemek yerine, “İnancım davranışlarımda nasıl görünür?” diye sorabiliriz.",
        ],
      },
      {
        heading: "Pırlanta’dan",
        kind: "quote",
        citation: "4",
        paragraphs: ["Gelen sorular umumiyet itibarıyla çok geniş alanlı geliyor."],
      },
      {
        heading: "Bir sorunun peşinden gitmek",
        paragraphs: [
          "Hocaefendi, soru soran insanların bazen büyük ve geniş konular açtığını söylüyor. Büyük soruları küçük parçalara ayırmak, onları daha iyi anlamamıza yardım eder. Bediüzzaman’ın hayatını öğrenirken de bir anda her şeyi ezberlemek yerine, her dönemde ne öğrendiğimizi sorabiliriz.",
        ],
      },
    ],
    discussionQuestions: [
      "Bir insanın hayatını tanırken hangi bilgilere bakmak istersin?",
      "Peygamberimizin örnekliği ile bir âlimin örnek alınabilecek yönleri aynı şey midir?",
      "Bediüzzaman’ın hangi özelliğini kendi hayatında küçük bir adımla deneyebilirsin?",
    ],
    application: {
      title: "Üç duraklı hayat çizgisi",
      items: [
        "Bir kâğıda Nurs, medrese yılları ve Barla adlarını üç durak olarak yaz.",
        "Her durağın yanına kaynaktan öğrendiğin bir bilgiyi not et.",
        "Sonuna “Bunu öğrenmek için hangi kaynağa baktım?” sorusunun cevabını ekle.",
      ],
    },
    takeaway: [
      "Bediüzzaman Said Nursî bir âlim ve yazardır; Hz. Muhammed ise peygamberimizdir.",
      "Bir insanı tanırken hayatındaki olaylara ve tekrar eden gayretlerine birlikte bakabilirim.",
      "Örnek aldığım bir özelliği küçük ve uygulanabilir bir davranışa dönüştürebilirim.",
    ],
    sources: [
      quranMealSource("Ahzâb 33/21"),
      shahdamarSource("Tarihçe-i Hayat", "“İlk Hayatı” ve “Barla Hayatı” bölümleri"),
      shahdamarSource("Sözler", "Yirmi Üçüncü Söz, PDF s. 358"),
      nilSource("Prizma-7: Zihin Harmanı", 2011, "s. 7"),
    ],
    vocab: [
      { word: "Âlim", definition: "Bir alanda derin bilgi edinmiş, çalışan ve öğreten kişi." },
      { word: "Biyografi", definition: "Bir insanın hayatını anlatan yazı veya kitap." },
      {
        word: "Dönüm noktası",
        definition: "Bir hayatın gidişinde önemli yeri olan olay veya dönem.",
      },
    ],
  }),
  createLesson({
    id: "konu-eylul-4",
    grade: 1,
    weekNumber: 4,
    month: 9,
    week: 4,
    year: 2026,
    title: "Bir Kitapla Nasıl Arkadaş Olunur? — Hocaefendi ve Risale Okuma Kültürü",
    subtitle: "Bir kitabı anlamak için onu bitirmek mi, onunla düşünmek mi gerekir?",
    readingMinutes: 4,
    sections: [
      {
        heading: "Okuma bir yarış değil",
        paragraphs: [
          "Bazı kitaplarda bugün günlük konuşmada pek kullanmadığımız kelimeler bulunur. Bir cümleyi ilk okuyuşta anlamazsak bu, kitabı okuyamayacağımız anlamına gelmez. Yavaşlayabilir, bilmediğimiz kelimeyi işaretleyebilir ve paragrafı yeniden okuyabiliriz.",
          "Bir okuma arkadaşın, öğretmenin ya da aileden biriyle konuşmak da işe yarar. Önce “Bu bölüm bana ne söylüyor?” diye düşünürüz; sonra kendi cevabımızı metindeki cümlelerle karşılaştırırız.",
        ],
      },
      {
        heading: "Kur’an’dan bir ayet",
        kind: "arabic",
        citation: "1",
        paragraphs: ["أَوْ زِدْ عَلَيْهِ وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا"],
      },
      {
        heading: "Ayetin meâlinden kısa bir bölüm",
        kind: "quote",
        citation: "1",
        paragraphs: ["tertîl ile, düşünerek oku"],
      },
      {
        heading: "Ayetin asıl konusu ve bizim çıkarımımız",
        paragraphs: [
          "Müzzemmil sûresindeki bu ayet Kur’an’ı tertil ile, yani ölçülü ve açık biçimde okumaktan söz eder. Ayetin ilk konusu Kur’an tilavetidir. Buradan, okuduğumuz bir metne acele etmeden yaklaşmak için de güzel bir okuma alışkanlığı çıkarabiliriz.",
        ],
      },
      {
        heading: "Risale-i Nur’dan",
        kind: "quote",
        citation: "2",
        paragraphs: ["Mütâlaasına tekrar ile devam edilirse, me’lûf ve me’nûs bir şekil alır."],
      },
      {
        heading: "Tekrar, metni tanıtır",
        paragraphs: [
          "Bediüzzaman burada tekrar tekrar okumayı anlatır: Bir metne yeniden döndükçe ona alışır, cümlelerini daha iyi tanırız. Anlamadığımız yeri sormak ve gerektiğinde bir açıklama kaynağına bakmak da okumanın parçasıdır.",
        ],
      },
      {
        heading: "Pırlanta’dan",
        kind: "quote",
        citation: "3",
        paragraphs: ["Kitap okumama bizim büyük dertlerimizdendir."],
      },
      {
        heading: "Hocaefendi’nin okuma çağrısı",
        paragraphs: [
          "Bu cümle kitap okumayı ertelemememiz gerektiğini hatırlatıyor. Bir seferde çok sayfa bitirmek zorunda değiliz. Kısa bir bölümü anlayarak okumak, sorularımızı not etmek ve sonra yeniden dönmek iyi bir başlangıçtır.",
        ],
      },
    ],
    discussionQuestions: [
      "Bir kitabı okurken zorlandığında hangi adımı deneyebilirsin?",
      "Bir cümleyi kendi sözlerinle anlatmak onu anlamana nasıl yardım eder?",
      "Bir arkadaşınla aynı metni konuşurken farklı neler fark edebilirsiniz?",
    ],
    application: {
      title: "On dakikalık okuma arkadaşlığı",
      items: [
        "Kısa bir paragrafı yavaşça oku ve bilmediğin bir kelimenin altını çiz.",
        "Paragrafı ikinci kez oku; ana fikrini kendi cümlenle anlat.",
        "Bir arkadaşına veya öğretmenine hâlâ aklında kalan soruyu sor.",
      ],
    },
    takeaway: [
      "Anlamadığım cümleyi işaretleyip yeniden okuyabilirim.",
      "Kısa ve düzenli okuma, bir metni tanımama yardım eder.",
      "Okuma arkadaşlığı, kendi düşüncemi metinle karşılaştırmamı sağlar.",
    ],
    sources: [
      quranMealSource("Müzzemmil 73/3–4; alıntı 73/4’ün meâlinden seçilmiştir"),
      shahdamarSource("Mesnevî-i Nûriye, trc. Abdülmecid Nursî", "İ’tizar, PDF s. 78"),
      nilSource("Prizma-7: Zihin Harmanı", 2011, "s. 8"),
    ],
    vocab: [
      { word: "Mütalaa", definition: "Bir metni dikkatle okuyup üzerinde düşünme." },
      { word: "Tertil", definition: "Ölçülü, tane tane ve açık okuma." },
      { word: "Müzakere", definition: "Bir konuyu birlikte konuşup anlamaya çalışma." },
    ],
  }),
  createLesson({
    id: "g2-konu-eylul-1",
    grade: 2,
    weekNumber: 1,
    month: 9,
    week: 1,
    year: 2026,
    title: "Geçen Yıldan Bugüne: Bir Metni İkinci Kez Okumak",
    subtitle: "Metin aynı kaldığı hâlde okurun fark ettiği şeyler değişebilir.",
    readingMinutes: 5,
    sections: [
      {
        heading: "İlk okuyuş bir başlangıçtır",
        paragraphs: [
          "Geçen yıl bir metinle tanıştık. Şimdi ona yeniden dönerken yalnızca “Ne yazıyor?” diye değil, “Bu cümleler nasıl bir fikir kuruyor?” diye de soracağız. Bir temsil, ana düşünce, örnek ve sonuç arasındaki ilişkiyi bulmaya çalışacağız.",
          "İkinci okuyuşta daha önce fark etmediğimiz bir kelime ya da bağlantı görebiliriz. Bu, metnin değiştiğini değil; bizim dikkatimizin geliştiğini gösterebilir.",
        ],
      },
      {
        heading: "Kur’an’dan bir ayet",
        kind: "arabic",
        citation: "1",
        paragraphs: [
          "وَقُرْآنًا فَرَقْنَاهُ لِتَقْرَأَهُ عَلَى النَّاسِ عَلَىٰ مُكْثٍ وَنَزَّلْنَاهُ تَنْزِيلًا",
        ],
      },
      {
        heading: "Ayetin meâlinden kısa bir bölüm",
        kind: "quote",
        citation: "1",
        paragraphs: ["sindire sindire"],
      },
      {
        heading: "Ayetin bağlamını gözden kaçırmayalım",
        paragraphs: [
          "İsrâ sûresinin 106. ayeti Kur’an’ın insanlara zaman içinde, bölüm bölüm indirilmesini anlatır. Buradaki “sindire sindire” sözü ayetin kendi bağlamında vahyin insanlara ulaştırılış biçimiyle ilgilidir. Biz bunu, öğrenirken acele etmemek için de bir hatırlatma olarak düşünebiliriz.",
        ],
      },
      {
        heading: "Risale-i Nur’dan",
        kind: "quote",
        citation: "2",
        paragraphs: ["Fakat gazete gibi okumayın!"],
      },
      {
        heading: "Yavaş okuma ne kazandırır?",
        paragraphs: [
          "Mektubat’taki bu kısa uyarı, önemli bir metni göz gezdirip geçmememizi söyler. Bir paragrafta önce soruyu, sonra verilen örneği ve sonunda ulaşılan fikri bulabiliriz. Böylece metnin cümlelerini ezberlemek yerine nasıl düşündüğünü anlarız.",
        ],
      },
      {
        heading: "Pırlanta’dan",
        kind: "quote",
        citation: "3",
        paragraphs: ["Kitapları okumak suretiyle bu müşkilleri çözmek mümkün."],
      },
      {
        heading: "Zorlandığımız yere geri dönmek",
        paragraphs: [
          "Hocaefendi, bazı soruların kitaplara dönerek çalışılabileceğini ifade ediyor. Her sorunun cevabı tek bir kitapta bulunmayabilir. Önce güçlüğümüzü açıkça belirleyip, konuya uygun ve güvenilir kaynağı aramak gerekir.",
        ],
      },
    ],
    discussionQuestions: [
      "Bir metni ikinci kez okuyunca ilk seferde kaçırdığın ne oldu?",
      "Bir paragrafta örnekle ana düşünceyi nasıl ayırt edebilirsin?",
      "Bir soru kitabın dışında başka hangi kaynağa yöneltebilir?",
    ],
    application: {
      title: "İki okuyuş, iki not",
      items: [
        "Geçen yıldan hatırladığın kısa bir metni seç ve bir kez oku.",
        "İlk notuna aklında kalan ana fikri yaz.",
        "Metni yeniden okuyup yeni bir kelimeyi, örneği veya soruyu ikinci notuna ekle.",
      ],
    },
    takeaway: [
      "İkinci okuyuş, bir metnin içindeki bağlantıları fark ettirebilir.",
      "Bir ayetin önce kendi bağlamında ne söylediğini anlamaya çalışmalıyım.",
      "Zorlandığım yerde acele etmek yerine soruyu belirleyip uygun kaynağa dönebilirim.",
    ],
    sources: [
      quranMealSource("İsrâ 17/106"),
      shahdamarSource("Mektubat", "On İkinci Mektup, PDF s. 59"),
      nilSource("Sohbet Atmosferi", 2015, "s. 12"),
    ],
    vocab: [
      { word: "Ana düşünce", definition: "Bir metnin okura anlatmak istediği temel fikir." },
      { word: "Temsil", definition: "Bir fikri örnek veya benzetmeyle anlatma yolu." },
      { word: "Bağlantı", definition: "İki düşünce, örnek veya cümle arasındaki ilişki." },
      { word: "Müşkül", definition: "Anlaşılması veya çözülmesi güç olan konu." },
      { word: "Bağlam", definition: "Bir sözün geçtiği konu ve onu çevreleyen bilgiler." },
    ],
  }),
  createLesson({
    id: "g3-konu-eylul-1",
    grade: 3,
    weekNumber: 1,
    month: 9,
    week: 1,
    year: 2026,
    title: "Bir Hakikat Hayata Ne Zaman Girer?",
    subtitle: "Bir doğruyu bilmekle onu günlük hayatta uygulamak arasında nasıl bir köprü kurarız?",
    readingMinutes: 5,
    sections: [
      {
        heading: "Bilgi davranışa nasıl dönüşür?",
        paragraphs: [
          "Bir konuda “dürüst olmak önemlidir” demek kolaydır. Asıl soru, kimse görmediğinde de doğruyu söyleyip söylemediğimizdir. Bir hakikat, yalnızca bildiğimiz bir cümle olarak kalmayıp seçimlerimizi etkilemeye başladığında hayatımıza girmiş olur.",
          "Bu, bir anda kusursuz olmak demek değildir. Önce hangi davranışı değiştirmek istediğimizi seçer, küçük ve sürdürülebilir bir adım atarız. Sonra neyin işe yaradığını düşünürüz.",
        ],
      },
      {
        heading: "Kur’an’dan bir uyarı",
        kind: "arabic",
        citation: "1",
        paragraphs: [
          "يَا أَيُّهَا الَّذِينَ آمَنُوا لِمَ تَقُولُونَ مَا لَا تَفْعَلُونَ ۝ كَبُرَ مَقْتًا عِندَ اللَّهِ أَن تَقُولُوا مَا لَا تَفْعَلُونَ",
        ],
      },
      {
        heading: "Ayetin meâlinden kısa bir bölüm",
        kind: "quote",
        citation: "1",
        paragraphs: ["yapmayacağınız şeyleri"],
      },
      {
        heading: "Küçük bir adım seçelim",
        paragraphs: [
          "Saff sûresinin 2–3. ayetleri, söylenenle yapılanın birbirinden uzak düşmesine karşı güçlü bir uyarıdır. Bu uyarıyı başkalarını suçlamak için değil, kendi sözümüzle davranışımızı karşılaştırmak için okuyabiliriz.",
          "Kendimize çok büyük sözler verip yapamayınca umutsuzluğa düşmek yerine, bu hafta tutabileceğimiz küçük bir söz seçelim: örneğin verilen bir işi zamanında bitirmek ya da bir arkadaşımıza verdiğimiz sözü hatırlamak.",
        ],
      },
      {
        heading: "Risale-i Nur’dan",
        kind: "quote",
        citation: "2",
        paragraphs: ["Amelinizde rıza-yı İlâhî olmalı."],
      },
      {
        heading: "Niyet ve davranış",
        paragraphs: [
          "Lem’alar’daki bu cümle, yaptığımız işte Allah’ın rızasını gözetmeyi hatırlatır. Niyetimizi davranışımızdan ayıramayız: iyilik istediğimizi söylüyorsak, bunu güvenilir ve faydalı bir davranışla göstermeye çalışırız.",
        ],
      },
      {
        heading: "Pırlanta’dan",
        kind: "quote",
        citation: "3",
        paragraphs: ["Herkes kendi çapında, kendisine yüklenen vazifeyi yapmalı."],
      },
      {
        heading: "Kendi payıma düşeni görmek",
        paragraphs: [
          "Hocaefendi’nin sözü, herkesin yapabileceği bir katkı bulunduğunu düşündürüyor. Kendimize uygun bir sorumluluk seçmek, hem gerçekçi hem de devam edilebilir bir başlangıçtır. Küçük bir iyilik, küçümsenecek bir iş değildir.",
        ],
      },
    ],
    discussionQuestions: [
      "Bir değer bildiğin hâlde uygulamakta zorlandığın bir durum var mı?",
      "Küçük bir davranış, verdiğin bir sözü tutmana nasıl yardım edebilir?",
      "Bir işi yaparken niyetini ve sonucunu nasıl birlikte düşünebilirsin?",
    ],
    application: {
      title: "Bir haftalık küçük söz",
      items: [
        "Bir hafta boyunca sürdürebileceğin tek bir davranış seç.",
        "Bunu ne zaman yapacağını belirle; örneğin okuldan dönünce veya derse başlamadan önce.",
        "Hafta sonunda kendini yargılamadan gözden geçir: Ne kolaydı, ne zor geldi, neyi değiştirebilirim?",
      ],
    },
    takeaway: [
      "Bir düşünce, davranışlarımı etkilediğinde hayatımda yer bulur.",
      "Saff sûresindeki uyarıyı önce kendi söz ve davranışımı gözden geçirmek için okuyabilirim.",
      "Küçük ama devam ettirilebilir bir adım seçmek daha gerçekçi bir başlangıçtır.",
    ],
    sources: [
      quranMealSource("Saff 61/2–3"),
      shahdamarSource("Lem’alar", "Yirminci Lem’a, PDF s. 220"),
      nilSource("Sohbet Atmosferi", 2015, "s. 8"),
    ],
    vocab: [
      {
        word: "Hakikat",
        definition: "Doğru ve gerçek olan; üzerinde düşünülüp anlaşılması gereken bilgi.",
      },
      { word: "Niyet", definition: "Bir işi yaparken içimizde taşıdığımız amaç." },
      { word: "Sorumluluk", definition: "Üzerimize düşen işi fark edip yerine getirme görevi." },
      {
        word: "Sürdürülebilir",
        definition: "Uzun süre devam ettirilebilecek ölçüde gerçekçi olan.",
      },
      {
        word: "Rıza",
        definition: "Hoşnutluk ve kabul; bu derste Allah’ın razı olmasını gözetmek.",
      },
    ],
  }),
  createLesson({
    id: "g4-konu-eylul-1",
    grade: 4,
    weekNumber: 1,
    month: 9,
    week: 1,
    year: 2026,
    title: "Bir Kitap Ne Zaman Kaynak Olur?",
    subtitle:
      "Bir cümleyi aktarırken onun nereden geldiğini ve neyi desteklediğini gösterebilir miyiz?",
    readingMinutes: 6,
    sections: [
      {
        heading: "Bilgi ile kaynağı yan yana düşünmek",
        paragraphs: [
          "Bir arkadaşın “Bir kitapta böyle yazıyordu” dediğinde şu soruları sorabiliriz: Hangi kitap? Sözü kim yazmış? Hangi bölümde geçiyor? Bu cümle anlatılan iddiayı gerçekten destekliyor mu? Bu sorular tartışmayı zorlaştırmak için değil, bilgiyi izleyebilmek içindir.",
          "Bir kaynağın adı ve sayfası belli olmalı; ayrıca ele aldığımız soruyla ilgili olmalıdır. Yorum ile doğrudan metni birbirinden ayırmak da gerekir. Hiçbir kaynak, her konuda tek başına her soruyu çözmek zorunda değildir.",
        ],
      },
      {
        heading: "Kur’an’dan bir ayet",
        kind: "arabic",
        citation: "1",
        paragraphs: [
          "يَا أَيُّهَا الَّذِينَ آمَنُوا أَطِيعُوا اللَّهَ وَأَطِيعُوا الرَّسُولَ وَأُولِي الْأَمْرِ مِنكُمْ فَإِن تَنَازَعْتُمْ فِي شَيْءٍ فَرُدُّوهُ إِلَى اللَّهِ وَالرَّسُولِ إِن كُنتُمْ تُؤْمِنُونَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ ذَٰلِكَ خَيْرٌ وَأَحْسَنُ تَأْوِيلًا",
        ],
      },
      {
        heading: "Ayetin meâlinden kısa bir bölüm",
        kind: "quote",
        citation: "1",
        paragraphs: ["Allah’a ve Resulüne"],
      },
      {
        heading: "Ayetin işaret ettiği kaynak",
        paragraphs: [
          "Nisâ sûresinin 59. ayeti, müminler arasındaki anlaşmazlıkların Allah’a ve Resulüne götürülmesini söyler. Ayetin kendi dinî bağlamını korumalıyız; buradan herhangi bir yazarın her cümlesini sorgulamadan kabul etmek sonucu çıkmaz. Bir iddiayı anlamak için önce asıl metne ve konunun uzmanlık kaynaklarına bakarız.",
        ],
      },
      {
        heading: "Risale-i Nur’dan",
        kind: "quote",
        citation: "2",
        paragraphs: ["Mesâil iki kısımdır: Birisinde, telâhuk-u efkâr tesir eder."],
      },
      {
        heading: "Eski kelimeleri açalım",
        paragraphs: [
          "Bediüzzaman bu cümlede bazı meselelerin, farklı fikirlerin zaman içinde bir araya gelmesiyle daha iyi anlaşılabildiğini anlatır. “Telâhuk-u efkâr” fikirlerin birbirine eklenmesi demektir. Bu, bir konuyu tek bir cümleye sığdırmak yerine farklı kaynakları okuyup karşılaştırmamız gerektiğini hatırlatır.",
        ],
      },
      {
        heading: "Pırlanta’dan",
        kind: "quote",
        citation: "3",
        paragraphs: ["mânâ ve muhtevası anlaşılacak olan bu kâinat"],
      },
      {
        heading: "Gözlem ile yorumu ayıralım",
        paragraphs: [
          "Hocaefendi kâinatı anlamı incelenecek bir eser gibi anlatır. Bir ağacın yapraklarını saymak gözlemdir; “Bu düzen bana ne düşündürüyor?” sorusu ise yorumdur. İkisi de değerlidir ama aynı şey değildir. Kaynak okurken de önce ne söylendiğini, sonra bu sözün nasıl yorumlandığını ayırabiliriz.",
        ],
      },
    ],
    discussionQuestions: [
      "Bir kaynağın izini sürebilmek için hangi bilgileri not etmeliyiz?",
      "Bir cümlede gözlem, yorum ve iddiayı nasıl ayırt edebiliriz?",
      "Bir ayetin kendi bağlamını korumak neden önemlidir?",
    ],
    application: {
      title: "Küçük bir kaynak kartı",
      items: [
        "İncelediğin bir cümlenin yazarını ve eser adını yaz.",
        "Cümlenin geçtiği bölüm veya sayfayı bulup not et.",
        "Bir cümleyle, bu kaynağın araştırdığın soruyla nasıl ilgili olduğunu açıkla.",
      ],
    },
    takeaway: [
      "Bir iddiayı kaynağına kadar takip edebilmeliyim.",
      "Kaynağın ne dediğini ve bizim onu nasıl yorumladığımızı ayırmalıyım.",
      "Ayetleri kendi bağlamında okuyup ilgili kaynaklarla birlikte düşünmeliyim.",
    ],
    sources: [
      quranMealSource("Nisâ 4/59"),
      shahdamarSource("Muhâkemât", "PDF s. 20"),
      nilSource("Asrın Getirdiği Tereddütler-1", 2011, "PDF s. 6"),
    ],
    vocab: [
      { word: "İddia", definition: "Doğru olduğu söylenen ve gerekçesi incelenebilen düşünce." },
      { word: "Yorum", definition: "Bir metin veya olay hakkında yapılan açıklama." },
      { word: "İzini sürmek", definition: "Bir bilginin nereden geldiğini adım adım bulmak." },
      {
        word: "Telâhuk-u efkâr",
        definition: "Fikirlerin birbirine eklenmesi ve birlikte gelişmesi.",
      },
      { word: "Muhteva", definition: "Bir metnin veya şeyin içinde bulunan anlam ve içerik." },
    ],
  }),
  createLesson({
    id: "g5-konu-eylul-1",
    grade: 5,
    weekNumber: 1,
    month: 9,
    week: 1,
    year: 2026,
    title: "Bu Yıl Bir Metni Nasıl Daha Derin Okuyacağız?",
    subtitle: "Derin okuma, daha çok sayfa değil; daha iyi soru ve daha sağlam gerekçe demektir.",
    readingMinutes: 6,
    sections: [
      {
        heading: "Bir metne dört yönden bakmak",
        paragraphs: [
          "Bu yıl bir metni okurken dört adım deneyebiliriz: Önce hangi soruya cevap aradığımızı yazarız. Sonra metnin temel iddiasını buluruz. İddiayı destekleyen delil ve örnekleri işaretleriz. Son olarak, metnin hangi bağlamda yazıldığını ve hangi soruları açık bıraktığını düşünürüz.",
          "Bu yöntem metni peşinen kabul etmek ya da reddetmek için değildir. Amacı, ne söylendiğini adil biçimde anlamak ve gerekçelerin ne kadar güçlü olduğunu incelemektir.",
        ],
      },
      {
        heading: "Kur’an’dan bir ayet",
        kind: "arabic",
        citation: "1",
        paragraphs: [
          "كِتَابٌ أَنزَلْنَاهُ إِلَيْكَ مُبَارَكٌ لِّيَدَّبَّرُوا آيَاتِهِ وَلِيَتَذَكَّرَ أُولُوا الْأَلْبَابِ",
        ],
      },
      {
        heading: "Ayetin meâlinden kısa bir bölüm",
        kind: "quote",
        citation: "1",
        paragraphs: ["iyice düşünsünler"],
      },
      {
        heading: "Tedebbür ve dikkatli okuma",
        paragraphs: [
          "Sâd sûresinin 29. ayeti Kur’an ayetleri üzerinde düşünmeye çağırır. Ayetin ilk olarak Kur’an hakkında söylediğini koruyarak okuruz. Bu çağrı, kendi metin okumamızda da acele hüküm vermememiz için anlamlı bir örnek olabilir.",
          "Bir metinden alıntı yaparken önce alıntının öncesini ve sonrasını okuruz. Ardından kendi yorumumuzu ayrı cümlede belirtiriz. Böylece yazarın sözüyle bizim çıkarımımız birbirine karışmaz.",
        ],
      },
      {
        heading: "Risale-i Nur’dan",
        kind: "quote",
        citation: "2",
        paragraphs: ["Muvâzenesiz ve mizansız olan çok aldanır, aldatır."],
      },
      {
        heading: "İlk izlenimden sonra",
        paragraphs: [
          "Muhâkemât’taki bu cümle, ölçüsüz ve dengesiz düşünmenin insanı yanıltabileceğini söyler. Burada denge; iddiayı dayandığı delille, karşı örneklerle ve metnin bağlamıyla birlikte tartmaktır. Bir cümle güçlü görünse bile, onu hangi delilin desteklediğini ve başka açıklama bulunup bulunmadığını sorabiliriz.",
        ],
      },
      {
        heading: "Pırlanta’dan",
        kind: "quote",
        citation: "3",
        paragraphs: [
          "Elde kabul edilmiş ön hakikat olmadan deneyin herhangi bir şeyi ispatlayamayacağı açıktır.",
        ],
      },
      {
        heading: "Bu görüşü nasıl değerlendirelim?",
        paragraphs: [
          "Hocaefendi bu felsefî bölümde, gözlem ve deney sonuçlarını yorumlarken bazı başlangıç kabullerinin rol oynadığını savunur. Bu, deneylerin işe yaramadığı anlamına gelmez. Bilim insanları ölçümler yapar, sonuçları tekrar inceler ve başlangıçtaki açıklamalarını yeni kanıtlara göre değiştirebilir. Buradaki çalışma sorusu şudur: Bir iddiayı değerlendirirken hangi varsayımları kullanıyoruz ve kanıtlarımız neler?",
        ],
      },
    ],
    discussionQuestions: [
      "Bir yazarın iddiasıyla o iddiaya verdiği delili nasıl ayırabilirsin?",
      "Bir metni peşinen kabul etmek veya reddetmek okumayı nasıl etkiler?",
      "Bilimsel bir açıklamada gözlem, yorum ve varsayım hangi yollarla incelenebilir?",
    ],
    application: {
      title: "Derin okuma notu",
      items: [
        "Kısa bir paragraf seçip cevap aradığı soruyu yaz.",
        "Temel iddiayı ve onu destekleyen bir gerekçeyi ayrı ayrı belirt.",
        "Kendi yorumunu “Ben buradan şu sonucu çıkarıyorum” diye başlayan ayrı bir cümleyle yaz.",
      ],
    },
    takeaway: [
      "Derin okuma, soru, iddia, gerekçe ve bağlamı birlikte incelemektir.",
      "Yazarın cümlesiyle benim yorumumu ayırmalıyım.",
      "Bir felsefî görüşü incelerken onu kanıtlanmış bilimsel sonuç gibi sunmamalıyım.",
    ],
    sources: [
      quranMealSource("Sâd 38/29"),
      shahdamarSource("Muhâkemât", "PDF s. 43"),
      nilSource("Varlığın Metafizik Boyutu", 2011, "“Bilimin Cehaleti” bölümü, PDF s. 6"),
    ],
    vocab: [
      { word: "İddia", definition: "Doğru olduğu savunulan düşünce veya önerme." },
      { word: "Gerekçe", definition: "Bir iddiayı desteklemek için sunulan neden." },
      {
        word: "Varsayım",
        definition: "Bir düşünceyi kurarken başlangıçta doğru kabul edilen fikir.",
      },
      { word: "Tedebbür", definition: "Bir ayet üzerinde dikkatle ve derinlemesine düşünme." },
      { word: "Muhakeme", definition: "Bilgi ve gerekçeleri karşılaştırarak sonuca ulaşma." },
    ],
  }),
  createLesson({
    id: "g6-konu-eylul-1",
    grade: 6,
    weekNumber: 1,
    month: 9,
    week: 1,
    year: 2026,
    title: "Bu Yıl Parçaları Nasıl Bir Bütüne Dönüştüreceğiz?",
    subtitle: "Bilgileri biriktirmek kadar aralarındaki bağı görmek de önemlidir.",
    readingMinutes: 7,
    sections: [
      {
        heading: "Bir bütün kurmak",
        paragraphs: [
          "Altı yıldır okuduğumuz konular birbirinden kopuk başlıklar olarak kalmasın. İnanç, ibadet, insan ilişkileri, sorumluluk ve kaynak okuma arasında hangi bağlar olduğunu araştıracağız. Bir kavramın başka bir kavrama nasıl geçtiğini gösteren bir harita hazırlayacağız.",
          "Bütün kurmak, aklımıza gelen her fikri tek bir sonuca bağlamak değildir. Önce her parçanın ne söylediğini doğru anlamalı, sonra aralarındaki gerçek ilişkiyi göstermeliyiz. Bilmediğimiz veya tartışmaya açık kalan noktaları da haritamızda belirtebiliriz.",
        ],
      },
      {
        heading: "Kur’an’dan bir ayet",
        kind: "arabic",
        citation: "1",
        paragraphs: [
          "يَا أَيُّهَا الَّذِينَ آمَنُوا ادْخُلُوا فِي السِّلْمِ كَافَّةً وَلَا تَتَّبِعُوا خُطُوَاتِ الشَّيْطَانِ إِنَّهُ لَكُمْ عَدُوٌّ مُّبِينٌ",
        ],
      },
      {
        heading: "Ayetin meâlinden kısa bir bölüm",
        kind: "quote",
        citation: "1",
        paragraphs: ["barış ve selamete girin"],
      },
      {
        heading: "Bütünlük kurarken bağlamı korumak",
        paragraphs: [
          "Bakara sûresinin 208. ayetindeki “silm” kelimesi Suat Yıldırım mealinde barış ve selamet anlamlarıyla karşılanır. Ayeti kendi bağlamında okuruz. Bu derste ondan, öğrendiğimiz değerleri hayatın farklı alanlarında birbiriyle uyumlu düşünmek için de yararlanıyoruz; bu, ayetin tek açıklaması olduğunu söylemek değildir.",
        ],
      },
      {
        heading: "Risale-i Nur’dan",
        kind: "quote",
        citation: "2",
        paragraphs: [
          "Risaletü’n-Nur’un kitapları birbirine tercih edilmez. Her birinin kendi makamında riyaseti var.",
        ],
      },
      {
        heading: "Her parçanın yerini görmek",
        paragraphs: [
          "Kastamonu Lâhikası’ndaki bu cümle, Risale-i Nur külliyatındaki farklı kitapların ayrı konularda değer taşıdığını söyler. Bir bütünü anlamak için her parçanın kendi işlevine bakarız. Bu yaklaşımı kendi müfredatımıza da uygulayabilir; bir yılda öğrendiğimiz kavramın diğer yıllarla nasıl birleştiğini gösterebiliriz.",
        ],
      },
      {
        heading: "Pırlanta’dan",
        kind: "quote",
        citation: "3",
        paragraphs: [
          "geçmiş kitapların doğru yönlerini bünyesinde toplamış olmakla da mucizevî ayrı bir derinlik gösterir.",
        ],
      },
      {
        heading: "Bir metin, önceki bilgileri nasıl bir araya getirir?",
        paragraphs: [
          "Hocaefendi bu cümlede Kur’an’ın önceki kitaplarla ilişkisini anlatır. Bunu, her kitabın bütün bilgileri içerdiği şeklinde genişletmemeliyiz. Bizim çalışmamız için soru şudur: Bir metin önceki bilgileri nasıl kullanıyor; hangi yönlerini doğruluyor veya açıklıyor? Cevap verirken metni ve bağlamını göstermeliyiz.",
        ],
      },
    ],
    discussionQuestions: [
      "Bir bütün kurarken önce parçaları ayrı ayrı anlamak neden gerekir?",
      "Hangi kavramları önceki yılların dersleri arasında ilişkilendirebilirsin?",
      "Bir metnin başka kaynaklarla ilişkisini anlatırken hangi kanıtları göstermelisin?",
    ],
    application: {
      title: "Altı yıllık kavram haritası",
      items: [
        "Ortaya “anlam, sorumluluk ve hayat” başlıklarından birini yaz.",
        "Önceki yıllardan üç kavram seçip her birini kısa bir tanımla ekle.",
        "Kavramlar arasında yalnızca metin veya dersle gösterebildiğin bağlantılara ok çiz; emin olmadıklarını soru işaretiyle işaretle.",
      ],
    },
    takeaway: [
      "Bütün kurmak, parçaları doğru anlamak ve aralarındaki bağı göstermektir.",
      "Bir ayetin anlamını aktarırken bağlamı korumalıyım.",
      "Bir metnin başka eserlerle ilişkisini iddiam ve kaynağımla birlikte açıklamalıyım.",
    ],
    sources: [
      quranMealSource("Bakara 2/208"),
      shahdamarSource("Kastamonu Lâhikası", "PDF s. 12"),
      nilSource("Kur’an’ın Altın İkliminde", 2011, "s. 9"),
    ],
    vocab: [
      {
        word: "Bütünleştirmek",
        definition: "Ayrı parçalar arasındaki anlamlı ilişkileri göstermek.",
      },
      { word: "Külliyat", definition: "Bir yazarın birbiriyle ilişkili eserlerinin bütünü." },
      { word: "Bağlam", definition: "Bir sözün kendi konusu ve çevresindeki bilgiler." },
      { word: "Makam", definition: "Bir şeyin veya konunun kendine özgü yeri ve işlevi." },
      {
        word: "Mukayese",
        definition: "İki veya daha fazla şeyi benzer ve farklı yönleriyle karşılaştırma.",
      },
    ],
  }),
];

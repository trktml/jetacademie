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
    ? ["# Kelimeler", ...lesson.vocab.map((item) => `- **${item.word}:** ${item.definition}`)].join(
        "\n\n"
      )
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
    lesson.weekNumber <= 2
      ? "### Öğretmen İçin 40 Dakikalık Akış\n\nGiriş ve kısa bireysel not: 5 dakika. Kaynaklarla tanışma ve âyet: 6 dakika. İki özgün pasajı yavaş okuyup kelimeleri açıklama: 10 dakika. İki düşünme sorusu üzerinde gönüllü paylaşım: 8 dakika. Uygulama kartını hazırlayıp bir arkadaşla karşılaştırma: 8 dakika. Bana Ne Söylüyor bölümünden kişisel bir kazanım seçerek kapanış: 3 dakika. Kısa destek içerikleri gerektiğinde kullanılabilir; uzun dinleme kaydı ders dışında kalır. Değerlendirmede metni anlama, kaynakla yorumu ayırma ve uygulamayı açıklama gözlenir; öğrencinin kişisel inancı puanlanmaz."
      : "",
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
    title: "Benim Büyük Sorularım",
    subtitle: "Sorularımızı küçümsemeden, birlikte öğrenmeye başlamak",
    readingMinutes: 10,
    sections: [
      {
        heading: "Bir sorunun başladığı yer",
        paragraphs: [
          "Bir tohumun avucunda durduğunu düşün. Küçücük görünüyor. Toprağa bırakıldığında büyüyüp ağaca dönüşebiliyor. Fen dersinde bunun hangi şartlarda gerçekleştiğini öğrenirsin. Sonra başka bir düşünce belirir: Bu kadar küçük bir başlangıçta bu kadar çok imkânın bulunması sana ne anlatır? Birini araştırırken diğerini de merak edebilirsin.",
          "Bazen sorularımızı söylemeden önce çevremizdekilerin ne düşüneceğini hesaplarız. Arkadaşlarının hepsi biliyormuş gibi görünüyorsa susmak kolay gelir. Oysa soru sormak eksikliğini ilan etmek değildir. Anlamadığın yeri görünür hâle getirir. Öğretmenin de bir şeyi bilmiyorsa birlikte kaynağa bakabilirsiniz. Bu derste kimse sorusu yüzünden küçümsenmeyecek.",
          "Merakın bir kısmı gözleme dayanır; bir kısmı da iyilik, adalet ve hayatın anlamıyla ilgilidir. Bir ağacın büyümesini incelemek için bilimsel kaynaklara başvururuz. İnsanın niçin iyilik yaptığı üzerinde düşünürken dinî metinler ve günlük tecrübeler de önümüze gelir. Farklı soruların farklı araştırma yolları olabilir.",
        ],
      },
      {
        heading: "İki yazarla tanışıyoruz",
        paragraphs: [
          "Risale-i Nur, Bediüzzaman Said Nursî’nin iman ve Kur’an üzerine yazdığı eserlerin bütünüdür. Sözler ve Lem’alar bu bütünün iki kitabıdır. Birbirini tamamlayan eserler topluluğuna *külliyat* denir. Bu eserlerle, insanın kendisini ve dünyayı anlamasına yardım eden düşünceler üzerinden tanışacağız. Bugün bütün kitapları bilmemiz gerekmiyor; kısa bir cümleyi anlayarak başlamak yeterli.²",
          "Hocaefendi diye anılan M. Fethullah Gülen’in eserleri de derslerimizde okuyacağımız kaynaklar arasındadır. Bu hafta Zihin Harmanı adlı kitabındaki soru-cevap yaklaşımıyla tanışıyoruz. Bir yazarın düşüncesini öğrenmek için önce onun kendi cümlesini okuyacağız. Sonra bu cümleyi açıklayan ders metnini inceleyeceğiz. Alıntı ile açıklama farklı şeylerdir.³",
        ],
      },
      {
        heading: "Âyet — Âl-i İmrân 3/190–191",
        kind: "arabic",
        citation: "1",
        paragraphs: [
          "﴿ إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِأُولِي الْأَلْبَابِ ۝ الَّذِينَ يَذْكُرُونَ اللَّهَ قِيَامًا وَقُعُودًا وَعَلَىٰ جُنُوبِهِمْ وَيَتَفَكَّرُونَ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ رَبَّنَا مَا خَلَقْتَ هَٰذَا بَاطِلًا سُبْحَانَكَ فَقِنَا عَذَابَ النَّارِ ﴾",
        ],
      },
      {
        heading: "Suat Yıldırım Meali",
        citation: "1",
        kind: "quote",
        paragraphs: [
          "Muhakkak göklerin ve yerin yaratılışında, gece ile gündüzün birbiri ardınca gelip sürelerinin uzayıp kısalmasında düşünen insanlar için elbette birçok deliller vardır. Onlar ki Allah’ı gâh ayakta divan durarak, gâh oturarak, gâh yanları üzere zikreder, göklerin ve yerin yaratılışı hakkında düşünür ve derler ki: “Ey Yüce Rabbimiz! Sen bunları gayesiz, boşuna yaratmadın. Seni bu gibi noksanlardan tenzih ederiz. Sen bizi o ateş azabından koru!”",
        ],
      },
      {
        heading: "Âyetin dersimizle bağlantısı",
        paragraphs: [
          "Bu iki ayet gökler, yer ve zaman üzerinde düşünmeyi Allah’ı anma ve dua ile birlikte anlatır. *Tefekkür*, gördüğümüz şeyin üzerinde dikkatle durmaktır. Ayetteki düşünme çağrısı bütün soruların bir anda çözüleceğini söylemez; bakmayı ve anlam aramayı ciddiye almaya yöneltir.",
        ],
      },
      {
        heading: "RİSALE-İ NUR’DAN",
        citation: "2",
        kind: "quote",
        paragraphs: ["Biri zikir, biri şükür, biri fikirdir."],
      },
      {
        heading: "Bu pasajı nasıl anlayabiliriz?",
        paragraphs: [
          "Birinci Söz’de bu cümle, insanın aldığı nimetler karşısındaki tutumu anlatılırken geçer. *Zikir* Allah’ı anmak, *şükür* verilenin değerini bilip teşekkür etmek, fikir ise dikkatle düşünmektir. Bugün Birinci Söz’ün bütün temsilini işlemiyoruz. Bu kısa cümleyle, düşünmenin kaynak metinlerde de bir yeri olduğunu fark ediyoruz.",
          "Bir elmayı yalnız tadıyla değerlendirebilirsin. Biraz durduğunda onu yetiştiren ağacı, toprağı, suyu ve emek veren insanları da fark edersin. Bu gözlem, metindeki nimet üzerinde düşünme fikrini anlamaya yardım eder. Elmanın nasıl büyüdüğünü öğrenmekle, ona nasıl karşılık verdiğini düşünmek birlikte ilerleyebilir.",
        ],
      },
      {
        heading: "HOCAEFENDİ’NİN ESERLERİNDEN",
        citation: "3",
        kind: "quote",
        paragraphs: ["Ben, halkın yapısına tercüman olan bu soruları saygıyla karşılıyorum."],
      },
      {
        heading: "Bu pasaj bize ne anlatıyor?",
        paragraphs: [
          "Zihin Harmanı’nın girişinde Hocaefendi, kendisine yöneltilen farklı seviyelerdeki sorulara nasıl yaklaşmak istediğini anlatır. Kolay görünen bir soru, onu soran kişi için gerçekten önemli olabilir. Bu nedenle önce soruyu dinlemek gerekir. Soruyu küçümsememek, duyduğumuz her cevabı araştırmadan kabul etmek anlamına gelmez.",
          "Bir arkadaşın senin bildiğin bir kelimeyi sorarsa ona kısa ve anlaşılır bir açıklama yapabilirsin. Onun yerine utanmasına yol açacak bir söz söylemek, öğrenme kapısını kapatır. Bu dersteki okuma arkadaşlığımız, soruyu söyleyebilme ve cevabı birlikte arayabilme güveniyle başlayacak.",
        ],
      },
      {
        heading: "Bağlantıyı kuralım",
        paragraphs: [
          "Risale pasajı nimet üzerinde düşünmeye bir yer açıyor. Hocaefendi’nin pasajı ise bu düşünceden doğan soruya saygıyla yaklaşmayı gösteriyor. Böylece merak, tek başına aklımıza gelen bir şey olmaktan çıkıp birlikte öğrenmenin başlangıcına dönüşüyor. Sınıfta biri doğayla, biri adaletle ilgili soru getirebilir; ikisine de uygun kaynak aranır.",
          "Merak defterine yalnız cevabı yazma. Önce soruyu, sonra gözlemlediğin şeyi ve danışacağın kaynağı ayrı satırlara koy. Bilmediğin bir kelimenin yanına küçük bir işaret bırak. Bugün herkesin bütün sorularını çözmeyeceğiz. Bir soruyu daha açık ifade etmek de dersin gerçek bir kazanımıdır.",
        ],
      },
    ],
    discussionQuestions: [
      "Bir soruyu sınıfta rahatça sorabilmen için nasıl bir dinleme ortamı gerekir?",
      "Bu hafta merak ettiğin bir konuyu araştırırken ilk hangi kaynağa başvurursun, neden?",
    ],
    application: {
      title: "Merak defterimi açıyorum",
      items: [
        "Merak defterine bir sorunu yaz; altına bir gözlem ve danışacağın kaynağı ekle.",
        "Bir arkadaşınla defterleri değiştirip birbirinizin sorusunu anlamını bozmadan kendi cümlenizle aktarın.",
        "Hafta boyunca yeni gördüğün bir şeyi veya anlamını öğrendiğin bir kelimeyi aynı sayfaya ekle.",
      ],
    },
    takeaway: [
      "Sorumu söylemek için her şeyi biliyor olmam gerekmiyor.",
      "Bir arkadaşımın sorusunu küçümsemeden dinleyebilirim.",
      "Merak ettiğim konuya uygun bir kaynak arayabilirim.",
      "Anlamadığım kelimeyi işaretlemek okumaya devam etmeme yardım eder.",
    ],
    sources: [
      "Suat Yıldırım, Kur’ân-ı Hakîm’in Açıklamalı Meali (İstanbul: Define Yayınları, 2007), Âl-i İmrân 3/190–191, 79 (yerel PDF, 87).",
      "Said Nursî, Sözler (İstanbul: Şahdamar Yayınları, 2007), Birinci Söz, 6 (yerel PDF, 28).",
      "M. Fethullah Gülen, Zihin Harmanı (Prizma-7) (İstanbul: Nil Yayınları, 2011), yerel PDF, 7.",
    ],
    vocab: [
      {
        word: "Tefekkür",
        definition: "Bir şey üzerinde dikkatle düşünüp anlamını aramak.",
      },
      {
        word: "Kaynak",
        definition: "Bir bilgi ya da düşünceyi öğrendiğimiz eser veya kişi.",
      },
      {
        word: "Gözlem",
        definition: "Bir şeyi dikkatle inceleyip fark ettiklerimizi anlatmak.",
      },
      {
        word: "Külliyat",
        definition: "Bir yazarın birbirini tamamlayan eserlerinin bütünü.",
      },
      {
        word: "Zikir",
        definition: "Allah’ı anmak; O’nu hatırlayarak yönelmek.",
      },
      {
        word: "Şükür",
        definition: "Verilenin değerini bilmek ve teşekkürünü sözle, davranışla göstermek.",
      },
    ],
  },
  {
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
      "Suat Yıldırım, Kur’ân-ı Hakîm ve Açıklamalı Meali (İstanbul: Işık Yayınları, 2005), İsrâ 17/9.",
      "Bediüzzaman Said Nursî, Sözler (İstanbul: Şahdamar Yayınları, 2007), Yirmi Beşinci Söz, Onuncu Mesele, s. 498.",
      "M. Fethullah Gülen, Kur’an’ın Altın İkliminde (İstanbul: Nil Yayınları, 2011), s. 9.",
    ],
    vocab: [
      {
        word: "Bağlam",
        definition: "Bir sözün söylendiği konu ve çevresindeki bilgiler.",
      },
      {
        word: "Rehber",
        definition: "Doğru yolu bulmaya yardım eden şey veya kişi.",
      },
      {
        word: "Benzetme",
        definition: "Bir şeyi, ortak bir yönü olan başka bir şeye benzeterek anlatmak.",
      },
    ],
  },
  {
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
      "Suat Yıldırım, Kur’ân-ı Hakîm ve Açıklamalı Meali (İstanbul: Işık Yayınları, 2005), Ahzâb 33/21.",
      "Bediüzzaman Said Nursî, Tarihçe-i Hayat (İstanbul: Şahdamar Yayınları, 2007), “İlk Hayatı” ve “Barla Hayatı” bölümleri.",
      "Bediüzzaman Said Nursî, Sözler (İstanbul: Şahdamar Yayınları, 2007), Yirmi Üçüncü Söz, PDF s. 358.",
      "M. Fethullah Gülen, Prizma-7: Zihin Harmanı (İstanbul: Nil Yayınları, 2011), s. 7.",
    ],
    vocab: [
      {
        word: "Âlim",
        definition: "Bir alanda derin bilgi edinmiş, çalışan ve öğreten kişi.",
      },
      {
        word: "Biyografi",
        definition: "Bir insanın hayatını anlatan yazı veya kitap.",
      },
      {
        word: "Dönüm noktası",
        definition: "Bir hayatın gidişinde önemli yeri olan olay veya dönem.",
      },
    ],
  },
  {
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
      "Suat Yıldırım, Kur’ân-ı Hakîm ve Açıklamalı Meali (İstanbul: Işık Yayınları, 2005), Müzzemmil 73/3–4; alıntı 73/4’ün meâlinden seçilmiştir.",
      "Bediüzzaman Said Nursî, Mesnevî-i Nûriye, trc. Abdülmecid Nursî (İstanbul: Şahdamar Yayınları, 2007), İ’tizar, PDF s. 78.",
      "M. Fethullah Gülen, Prizma-7: Zihin Harmanı (İstanbul: Nil Yayınları, 2011), s. 8.",
    ],
    vocab: [
      {
        word: "Mütalaa",
        definition: "Bir metni dikkatle okuyup üzerinde düşünme.",
      },
      {
        word: "Tertil",
        definition: "Ölçülü, tane tane ve açık okuma.",
      },
      {
        word: "Müzakere",
        definition: "Bir konuyu birlikte konuşup anlamaya çalışma.",
      },
    ],
  },
  {
    id: "g2-konu-eylul-1",
    grade: 2,
    weekNumber: 1,
    month: 9,
    week: 1,
    year: 2026,
    title: "Geçen Yıldan Bugüne: Bir Metni İkinci Kez Okumak",
    subtitle: "Aynı cümlede yeni bir bağlantı fark etmek",
    readingMinutes: 10,
    sections: [
      {
        heading: "Eski bir notun yanına yeni bir not",
        paragraphs: [
          "Geçen yıl bir maçtan sonra tuttuğun notu bugün yeniden okuduğunu düşün. O gün sadece sonucu yazmış olabilirsin. Bugün takım arkadaşının seni nasıl desteklediğini de hatırlarsın. Olay değişmedi; senin dikkat ettiğin şeyler değişti. Bir kitapla ikinci karşılaşmada da benzer bir durum yaşanabilir.",
          "Bir cümleyi hatırlamak, onu bütünüyle anladığımız anlamına gelmez. İlk okuyuşta kelimeleri çözmüş, ikinci okuyuşta kelimeler arasındaki bağı fark etmiş olabiliriz. Bazen de önceki yorumumuzun metinde bulunmadığını görürüz. Bu, ilk okumayı değersiz kılmaz; yeni okumanın bize kazandırdığı bir düzeltmedir.",
          "İkinci okuma yalnızca aynı işlemi tekrarlamak değildir. Başlangıçta kısa bir not tutup sonra metne dönmek, dikkatimizi sınamamızı sağlar. İlk notunu silmek yerine yanına yeni gördüğünü yaz. İki not arasındaki fark, düşüncenin hangi noktada geliştiğini gösterir.",
        ],
      },
      {
        heading: "Okuduklarımızın yerini hatırlayalım",
        paragraphs: [
          "Geçen yıl bu programa katılmadıysan da derse başlayabilirsin. Risale-i Nur, Said Nursî’nin iman ve Kur’an meselelerini ele aldığı eserler bütünüdür. Mesnevî-i Nûriye bu külliyatın bir parçasıdır. Hocaefendi’nin Zihin Harmanı adlı eserinden de okuma ve araştırmaya dair bir pasaj seçeceğiz. Bu iki yazarın sözlerini ayrı kutularda göreceksin; altlarındaki açıklamalar ise ders için hazırlanmış yorumlardır.² ³",
          "Bir kitabın yeniden okunması, her cümlesini ezberlemek anlamına gelmez. Önceki bilgimizle yeni örnekler arasında ilişki kurabiliriz. Geçen yıl yabancı görünen bir kelime, bu yıl arkadaşlıkta yaşadığımız bir olay sayesinde anlaşılır hâle gelebilir. Bunun için ilk okumanın izini saklamak, eski notu silmeden yanına yenisini eklemek yararlıdır.",
        ],
      },
      {
        heading: "Âyet — İsrâ 17/106",
        kind: "arabic",
        citation: "1",
        paragraphs: [
          "﴿ وَقُرْآنًا فَرَقْنَاهُ لِتَقْرَأَهُ عَلَى النَّاسِ عَلَىٰ مُكْثٍ وَنَزَّلْنَاهُ تَنْزِيلًا ﴾",
        ],
      },
      {
        heading: "Suat Yıldırım Meali",
        citation: "1",
        kind: "quote",
        paragraphs: [
          "Hem o vahyi, insanların zihinlerine sindire sindire okuman için zaman zaman gelen Kur’ân dersleri halinde indirdik",
        ],
      },
      {
        heading: "Âyetin dersimizle bağlantısı",
        paragraphs: [
          "Ayet, Kur’an’ın insanlara zaman içinde okunması ve indirilmesi hakkındadır. Onu yalnız kitap okuma hızına ilişkin bir teknik öneri gibi sunmuyoruz. Bu bağlamı koruyarak, öğrenmenin zamana yayılmasını dersimizdeki tekrar okumayla ilişkilendiriyoruz. Bir cümleyi sindirmek, anlamını ve hayatındaki karşılığını düşünmeye zaman ayırmaktır.",
        ],
      },
      {
        heading: "RİSALE-İ NUR’DAN",
        citation: "2",
        kind: "quote",
        paragraphs: ["Mütâlaasına tekrar ile devam edilirse, me’lûf ve me’nûs bir şekil alır."],
      },
      {
        heading: "Bu pasajı nasıl anlayabiliriz?",
        paragraphs: [
          "Buradaki *mütâlaa*, metni üzerinde durarak okumaktır. *Me’lûf* ve *me’nûs*, alışılmış ve yakın hissedilen anlamlarına gelir. Yazar, Mesnevî-i Nûriye’nin dilindeki yoğunluk sebebiyle okumaktan vazgeçilmemesini, tekrarın metinle tanışıklığı artıracağını söyler. Cümle, anlaşılmayan şeyi anlamış gibi göstermemizi istemez.",
          "Geçen yıl okuduğun “Biri zikir, biri şükür, biri fikirdir.” cümlesini yeniden ele alabilirsin. İlk notta yalnız kelimelerin karşılığını yazmış olabilirsin. İkinci okumada düşünme ile şükür arasındaki ilişkiyi görebilirsin. Önceki notun yoksa bugün ilk notunu oluştur; aynı metne ders sonunda dönerek küçük bir karşılaştırma yap.",
        ],
      },
      {
        heading: "HOCAEFENDİ’NİN ESERLERİNDEN",
        citation: "3",
        kind: "quote",
        paragraphs: [
          "Bu itibarla, sizden de rica edeceğim, meseleleri sadece burada dinlemekle bırakmayalım.",
        ],
      },
      {
        heading: "Bu pasaj bize ne anlatıyor?",
        paragraphs: [
          "Hocaefendi bu bölümde soru-cevap oturumundaki açıklamaları dinlemekle yetinmemeyi, okuma ve araştırmayla devam etmeyi önerir. Bir konuşmayı anlamış gibi hissetmek kolay olabilir; kendi cümlenle açıklamaya çalıştığında eksik kalan yerler ortaya çıkar. Bu fark, yeniden okumanın başlangıcıdır.",
          "Ders arkadaşına bir cümleyi açıklarken onun notuyla kendi notunu karşılaştırabilirsin. Farklı bir yorumla karşılaşırsan hemen düzeltmeye girişmeden metindeki dayanağı birlikte bulun. Bir yerde anlaşamazsan o yeri işaretleyip öğretmenle incele. Yeniden okumak, aynı sonucu daha yüksek sesle tekrarlamak değildir.",
        ],
      },
      {
        heading: "Bağlantıyı kuralım",
        paragraphs: [
          "Risale pasajı tekrar okumanın metne yakınlık kazandırabileceğini söylüyor. Hocaefendi’nin pasajı ise dinlemenin ardından çalışmayı sürdürmeye çağırıyor. İkisi bir araya geldiğinde okuma, yalnız bir kez duyup bitirilen bir iş olmaktan çıkıyor. Aynı kısa cümleye bir gözlem ve yeni bir kelime bilgisiyle dönebiliriz.",
          "İlk okuma notuna “Bugün bunu şöyle anlıyorum” diye başla. İkinci notta önceki cümlenin yanına yeni fark ettiğin bağı yaz. İlk yorumunda bir hata bulursan düzeltmeyi açıkça göster. Değişim, kendini kötü hissetme sebebi değil, metne daha dikkatli baktığının işaretidir.",
        ],
      },
    ],
    discussionQuestions: [
      "Aynı cümlede ilk okuduğunda görmediğin bir bağlantıyı ikinci okumada fark etmene ne yardım eder?",
      "Yeni yorumunun metinde karşılığı bulunduğunu nasıl gösterebilirsin?",
    ],
    application: {
      title: "İki okumanın izini karşılaştırıyorum",
      items: [
        "Birinci Söz’den “Biri zikir, biri şükür, biri fikirdir.” cümlesini oku; ilk anladığını iki cümleyle kaydet.",
        "Kelime açıklamalarına baktıktan sonra cümleyi yeniden oku; ikinci notunu ilkini silmeden yanına yaz.",
        "Hafta sonunda iki not arasındaki farkı ve buna yardımcı olan şeyi belirt.",
      ],
    },
    takeaway: [
      "Eski notumla yeni yorumumu karşılaştırabilirim.",
      "Tekrar okumak, düşüncemi düzeltmeme de imkân verir.",
      "Duyduğum cevabın ardından kaynağa bakabilirim.",
      "Yeni fark ettiğim bağlantıyı kendi cümlemle anlatabilirim.",
    ],
    sources: [
      "Suat Yıldırım, Kur’ân-ı Hakîm’in Açıklamalı Meali (İstanbul: Define Yayınları, 2007), İsrâ 17/106, 301 (yerel PDF, 309).",
      "Said Nursî, Mesnevî-i Nûriye, trc. Abdülmecid Nursî (İstanbul: Şahdamar Yayınları, 2007), “İ’tizar” (yerel PDF, 78).",
      "M. Fethullah Gülen, Zihin Harmanı (Prizma-7) (İstanbul: Nil Yayınları, 2011), yerel PDF, 8.",
    ],
    vocab: [
      {
        word: "Ana düşünce",
        definition: "Bir metnin okura anlatmak istediği temel fikir.",
      },
      {
        word: "Temsil",
        definition: "Bir fikri örnek veya benzetmeyle anlatma yolu.",
      },
      {
        word: "Bağlantı",
        definition: "İki düşünce, örnek veya cümle arasındaki ilişki.",
      },
      {
        word: "Müşkül",
        definition: "Anlaşılması veya çözülmesi güç olan konu.",
      },
      {
        word: "Bağlam",
        definition: "Bir sözün geçtiği konu ve onu çevreleyen bilgiler.",
      },
      {
        word: "Mütâlaa",
        definition: "Bir metni üzerinde durarak ve anlamaya çalışarak okuma.",
      },
      {
        word: "Me’lûf ve me’nûs",
        definition: "Tanıdık ve yakın hissedilen; tekrar karşılaşınca yabancılığı azalan.",
      },
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
    subtitle: "Bilgiden küçük bir karara, karardan tekrara",
    readingMinutes: 10,
    sections: [
      {
        heading: "Bilmek ile yapmak arasındaki mesafe",
        paragraphs: [
          "Bir grup ödevinde herkes iş bölümüne katılıyor. Sen de arkadaşına akşam dosyayı göndereceğini söylüyorsun. Sonra oyun uzuyor, saat geçiyor ve dosya kalıyor. Sözünde durmanın önemli olduğunu zaten biliyordun. Bu örnekte eksik olan yeni bir bilgi değil; bilginin o akşamki seçimine ulaşmasıdır. Bu, ders için hazırlanmış bir örnektir.",
          "Bir hakikati duymak, onu anlamak ve onunla yaşamak birbirinden farklı adımlardır. Anlamak, davranışın neden önemli olduğunu görmeyi sağlar. Uygulamak içinse küçük ve belirli bir karar gerekir. “Daha sorumlu olacağım” ifadesi iyi bir başlangıç olabilir ama hangi işi ne zaman yapacağını söylemez.",
          "Bir aksama yaşadığında kendini bütünüyle başarısız ilan etmek yerine olayın yerini belirle. Verdiğin söz gerçekçi miydi, gereken zamanı ayırdın mı, gecikmeyi haber verdin mi; bunları ayrı ayrı inceleyebilirsin. Telafi etmek, özür dilemek ve planı küçültmek de öğrenmenin parçasıdır. Bir kişinin iç dünyasını tek bir davranışla puanlayamayız.",
        ],
      },
      {
        heading: "Kaynaklardan davranışa",
        paragraphs: [
          "Risale-i Nur, Said Nursî’nin iman ve Kur’an üzerine kaleme aldığı eserler bütünüdür. Bu yıl pasajları yalnız açıklamakla kalmayıp günlük seçimlerle ilişkilendireceğiz. Hocaefendi’nin eserlerini de aynı dikkatle okuyacağız. Bir metnin güzel görünmesiyle, hayatımızda karşılık bulması ayrı aşamalardır. Alıntı kutusu yazarın sözünü, ardından gelen açıklama ise bu dersin yorumunu gösterir.² ³",
          "İlk dört hafta kaynaklara ve okuma biçimimize yeniden alışma zamanıdır. Bugün ihlâs konusunun bütün ayrıntılarını öğrenmeyeceğiz. Bir kısa cümleyi, niyetimizle davranışımız arasındaki bağı fark etmek için okuyacağız. Bir arkadaşın her şeyi bilmemesi, onunla alay etmeyi haklı çıkarmaz. Öğrenme ortamının ilk uygulaması, yanındaki kişinin sorusuna alan açmaktır.",
        ],
      },
      {
        heading: "Âyet — Saff 61/2–3",
        kind: "arabic",
        citation: "1",
        paragraphs: [
          "﴿ يَا أَيُّهَا الَّذِينَ آمَنُوا لِمَ تَقُولُونَ مَا لَا تَفْعَلُونَ ۝ كَبُرَ مَقْتًا عِندَ اللَّهِ أَن تَقُولُوا مَا لَا تَفْعَلُونَ ﴾",
        ],
      },
      {
        heading: "Suat Yıldırım Meali",
        citation: "1",
        kind: "quote",
        paragraphs: [
          "Ey iman edenler! Niçin yapmayacağınız şeyleri söylüyorsunuz? Yapmayacağınız şeyleri söylemek, Allah’ın en çok nefret ettiği şeylerdendir.",
        ],
      },
      {
        heading: "Âyetin dersimizle bağlantısı",
        paragraphs: [
          "Bu uyarı, sözle davranış arasındaki tutarlılığın önemini gösterir. Dersteki amaç kimseyi utandırmak veya yaptığı bir hatayla tanımlamak değildir. Ayeti, verdiğimiz sözü gerçekçi biçimde kurmak ve eksik kaldığımızda düzeltmek için okuyacağız. Kişisel örneğini sınıfta paylaşmak zorunda değilsin.",
        ],
      },
      {
        heading: "RİSALE-İ NUR’DAN",
        citation: "2",
        kind: "quote",
        paragraphs: ["Amelinizde rızâ-yı ilâhî olmalı."],
      },
      {
        heading: "Bu pasajı nasıl anlayabiliriz?",
        paragraphs: [
          "*Amel*, yapılan iş ve davranıştır. *Rızâ-yı ilâhî*, Allah’ın hoşnutluğunu gözetmektir. Bu cümle Yirmi Birinci Lem’a’daki ihlâs dersinin ilk düsturudur. Burada bir davranışın iç yönü, yani hangi amaçla yapıldığı öne çıkar. Biz bu hafta ayrıntılı bir ihlâs incelemesi yerine, bildiğimiz değerin küçük bir işe dönüşmesini çalışıyoruz.",
          "Bir arkadaşına yardım etmek, yalnız övgü alacağın zaman yapacağın bir işe dönüşebilir. Buna karşılık gerçekten işini kolaylaştırmak istediğinde, kimsenin görmediği anda da dosyayı düzenlersin. İki durumda dışarıdan görünen iş benzeyebilir. Metin, davranışın amacı üzerine düşünmemize yardım eder; başkasının niyetini tahmin ederek hüküm vermemize izin vermez.",
        ],
      },
      {
        heading: "HOCAEFENDİ’NİN ESERLERİNDEN",
        citation: "3",
        kind: "quote",
        paragraphs: [
          "Müslümanlığı amelî olarak yaşama, kalbde iman nurunun belirmesi daha ziyade insanın inandıklarını yaşamasına bağlıdır.",
        ],
      },
      {
        heading: "Bu pasaj bize ne anlatıyor?",
        paragraphs: [
          "Sohbet Atmosferi’ndeki bu pasaj, imanın insanın yaşayışıyla ilişkisini vurgular. Burada anlatılan, bilgiye hiç ihtiyaç olmadığı değildir. Metnin çevresinde öğrenme ve anlatma da ele alınır. Ancak bir düşüncenin insanın hayatında yer edinmesi, onun yalnız zihinde duran bir bilgi olarak kalmamasını gerektirir.",
          "Sorumluluk hakkında iyi bir açıklama yapabilirsin. Onun hayata girmesi içinse söz verdiğin dosyayı zamanında gönderme gibi belirli bir iş seçersin. Küçük adımın tekrar edilmesi, bilgiyi tecrübeyle karşılaştırmana yardım eder. Bir gün aksama olursa nedenini not edip yeniden denemek gerekir; arkadaşlarına karşı üstünlük göstermek değil.",
        ],
      },
      {
        heading: "Bağlantıyı kuralım",
        paragraphs: [
          "Risale pasajında işin amacı, Hocaefendi’nin pasajında inandığının yaşayışa yansıması öne çıkıyor. Bu nedenle uygulamamız iki parçalıdır: davranışın hangi değere dayanacağını söylemek ve onu ne zaman yapacağını belirlemek. Niyet, planın yerini tutmaz; plan da amacımız üzerine düşünme ihtiyacını ortadan kaldırmaz.",
          "Bu hafta tek bir uygulama seç: grup ödevindeki işini akşam belli bir saatte tamamlamak gibi. Yapmayı planladığın işi, zamanı ve gerekirse telafi adımını yaz. Haftanın sonunda yalnız tamamlandı veya tamamlanmadı işareti koyma; neyin kolaylaştırdığını, neyin zorlaştırdığını da bir cümleyle belirt. Bu kayıt kişisel inancını değil, öğrenme adımını görünür kılar.",
        ],
      },
    ],
    discussionQuestions: [
      "Önemli olduğunu bildiğin bir davranışı yapmanı hangi küçük düzenleme kolaylaştırabilir?",
      "Bir aksama yaşandığında öğrenmeye devam etmek ile mazeret üretmek arasındaki farkı nasıl anlarsın?",
    ],
    application: {
      title: "Bir haftalık küçük karar",
      items: [
        "Bu hafta uygulayacağın tek bir davranış belirle; işini, zamanını ve amacını yaz.",
        "Uygulamayı kolaylaştıracak bir hatırlatıcı seç; takvim notu veya çalışma masasındaki küçük bir kâğıt olabilir.",
        "Hafta sonunda gerçekleşen adımı ve aksayan kısmın telafisini birer cümleyle kaydet.",
      ],
    },
    takeaway: [
      "Bildiğim bir değeri küçük ve belirli bir işe dönüştürebilirim.",
      "Niyetimle planımı birlikte düşünmeliyim.",
      "Aksayan bir işi haber verip telafi edebilirim.",
      "Arkadaşımın iç dünyasını tek davranışından değerlendiremem.",
    ],
    sources: [
      "Suat Yıldırım, Kur’ân-ı Hakîm’in Açıklamalı Meali (İstanbul: Define Yayınları, 2007), Saff 61/2–3, 590 (yerel PDF, 598).",
      "Said Nursî, Lem’alar (İstanbul: Şahdamar Yayınları, 2007), Yirmi Birinci Lem’a, Birinci Düstur, 200 (yerel PDF, 220).",
      "M. Fethullah Gülen, Sohbet Atmosferi (İstanbul: Nil Yayınları, 2015), yerel PDF, 51.",
    ],
    vocab: [
      {
        word: "Hakikat",
        definition: "Doğru ve gerçek olan; üzerinde düşünülüp anlaşılması gereken bilgi.",
      },
      {
        word: "Niyet",
        definition: "Bir işi yaparken içimizde taşıdığımız amaç.",
      },
      {
        word: "Sorumluluk",
        definition: "Üzerimize düşen işi fark edip yerine getirme görevi.",
      },
      {
        word: "Sürdürülebilir",
        definition: "Uzun süre devam ettirilebilecek ölçüde gerçekçi olan.",
      },
      {
        word: "Rıza",
        definition: "Hoşnutluk ve kabul; bu derste Allah’ın razı olmasını gözetmek.",
      },
      {
        word: "Amel",
        definition: "Yapılan iş; bilginin ve niyetin davranışta görünmesi.",
      },
      {
        word: "Rızâ-yı ilâhî",
        definition: "Allah’ın hoşnutluğu; bir işi O’nun razı olmasını gözeterek yapmak.",
      },
    ],
  },
  {
    id: "g4-konu-eylul-1",
    grade: 4,
    weekNumber: 1,
    month: 9,
    week: 1,
    year: 2026,
    title: "Bir Kitap Ne Zaman Kaynak Olur?",
    subtitle: "Asıl metin, açıklama, yorum ve kişisel kanaati ayırmak",
    readingMinutes: 10,
    sections: [
      {
        heading: "Paylaşılan cümlenin izini sürmek",
        paragraphs: [
          "Bir sosyal medya görselinde sevdiğin bir yazara ait olduğu söylenen bir cümle görüyorsun. Altında yazarın fotoğrafı var, kitap adı yok. Cümle hoşuna gidiyor; fakat bir fotoğraf o sözün o kişiye ait olduğunu göstermez. Kaynak aramak için önce eseri, sonra bölümü, ardından cümlenin çevresindeki metni bulmak gerekir.",
          "Aynı sayfada dört farklı katman bulunabilir: aktarılan asıl metin, onu açıklayan yorum, bir iddiayı destekleyen gerekçe ve okuyucunun kişisel kanaati. Bunları tek bir “kitapta yazıyor” ifadesinde toplarsak hangisinin kime ait olduğunu kaybederiz. Bir kitabın kaynak oluşu, araştırdığımız soruya izlenebilir ve ilgili bilgi sunmasıyla ilişkilidir.",
          "Bir fen sorusunun cevabı için deney ve bilimsel araştırma gerekir. Bir yazarın kendi düşüncesi araştırılıyorsa onun eserine başvururuz. Dinî bir hüküm konusunda ise asıl kaynaklar ve o konuda yetkin açıklamalar gerekir. Bir kaynağın bir alanda değerli olması, her alanda aynı yetkinliğe sahip olduğunu göstermez.",
        ],
      },
      {
        heading: "Kaynakların birbirinden farklı görevleri",
        paragraphs: [
          "İslâmî öğrenmede Kur’an ve sünnet temel başvuru kaynaklarıdır. Bir meal, Kur’an’ın Türkçe anlamını aktarma çalışmasıdır; Arapça metnin kendisiyle aynı şey değildir. Risale-i Nur, Said Nursî’nin Kur’an ve iman meselelerine dair açıklamalarını içerir. Hocaefendi’nin eserleri de bu konulardaki düşünce ve yorumlarını öğrenmek için okunur. Bugün bu eserleri birbiriyle karıştırmadan tanımaya başlıyoruz.¹ ² ³",
          "Bir kaynak değerlendirmesi, yazara saygısızlık yapmak değildir. Aksine, onun söylemediği bir şeyi ona yüklememeyi sağlar. Bir yazarın sözünü doğru aktarmak, kendi fikrimizi de dürüstçe ortaya koymaktır. İlk haftalarda amaç çok kitap adı öğrenmek değil, hangi soruya hangi tür kaynakla yaklaşılacağını fark etmektir.",
        ],
      },
      {
        heading: "Âyet — Nisâ 4/59",
        kind: "arabic",
        citation: "1",
        paragraphs: [
          "﴿ يَا أَيُّهَا الَّذِينَ آمَنُوا أَطِيعُوا اللَّهَ وَأَطِيعُوا الرَّسُولَ وَأُولِي الْأَمْرِ مِنكُمْ فَإِن تَنَازَعْتُمْ فِي شَيْءٍ فَرُدُّوهُ إِلَى اللَّهِ وَالرَّسُولِ إِن كُنتُمْ تُؤْمِنُونَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ ذَٰلِكَ خَيْرٌ وَأَحْسَنُ تَأْوِيلًا ﴾",
        ],
      },
      {
        heading: "Suat Yıldırım Meali",
        citation: "1",
        kind: "quote",
        paragraphs: [
          "Ey iman edenler! Allah’a itaat edin. Resulüne ve sizden olan ülülemre de itaat edin. Eğer Allah’a ve âhirete iman ediyorsanız, hakkında ihtilâfa düştüğünüz meseleyi Allah’a ve Resulüne arzediniz. Böyle yapmanız hem daha hayırlı, hem de netice bakımından daha güzeldir.",
        ],
      },
      {
        heading: "Âyetin dersimizle bağlantısı",
        paragraphs: [
          "Ayet, anlaşmazlıkta Allah’a ve Resulüne başvurmayı öğütler. Bu derste temel kaynakla onu açıklayan metin arasındaki ayrımı öğrenmemize yardımcı olur. Bir yorum kitabındaki cümleyi ayetin kendisi gibi sunamayız. Ayeti bütün bilimsel ya da günlük sorular için aynı türden cevap veren bir kaynakmış gibi de kullanmayız.",
        ],
      },
      {
        heading: "RİSALE-İ NUR’DAN",
        citation: "2",
        kind: "quote",
        paragraphs: ["Birisinde, telâhuk-u efkâr tesir eder. Belki ona mütevakkıftır."],
      },
      {
        heading: "Bu pasajı nasıl anlayabiliriz?",
        paragraphs: [
          "Cümle, metinde “Mesâil iki kısımdır” ifadesinin ardından gelir. *Telâhuk-u efkâr*, fikirlerin birbirine eklenmesidir; *mütevakkıf*, bir şeye bağlı olan anlamındadır. Yazar burada bazı meselelerde bilginin birikerek gelişmesini ele alır. Aynı sayfada meselelerin hepsini aynı türden saymaz. Bu ayrımı korumadan kısa alıntıdan “her bilgi çoğunlukla belirlenir” sonucu çıkaramayız.",
          "Bir sınıf araştırmasında farklı öğrencilerin bulduğu bilgiler birlikte daha geniş bir tablo oluşturabilir. Yine de her bilgi araştırılan soruyla ilgili olmalıdır. Coğrafya kitabı bir yerin konumunu, yazarın eseri ise o yazarın düşüncesini gösterir. İkisi aynı işe cevap vermek zorunda değildir. Kaynak türünü soruya göre seçmek, ortak araştırmayı da daha doğru hâle getirir.",
        ],
      },
      {
        heading: "HOCAEFENDİ’NİN ESERLERİNDEN",
        citation: "3",
        kind: "quote",
        paragraphs: ["Burada cevap mahiyetinde arz edilen şeyleri de kâfi görmeyin."],
      },
      {
        heading: "Bu pasaj bize ne anlatıyor?",
        paragraphs: [
          "Hocaefendi, Zihin Harmanı’nda kendi soru-cevap açıklamalarının ardından okuyucuyu araştırmaya davet eder. Kendi cevabını son durak olarak sunmaması, okuma kültürü açısından dikkat çekicidir. Bir öğretmenin açıklaması yararlı olabilir; fakat aktarılan bilginin kaynağını görmek ayrı bir iştir.",
          "Bir paylaşımda “Hocaefendi böyle diyor” cümlesini gördüğünde eser adını isteyebilirsin. Kitabı bulduktan sonra alıntı ile yorum arasındaki sınırı işaretlersin. Bunu, yazara karşı mesafe koymak için değil, onun sözünü doğru aktarmak için yaparsın. Araştırma, hem yazara hem okuyucuya karşı bir sorumluluktur.",
        ],
      },
      {
        heading: "Bağlantıyı kuralım",
        paragraphs: [
          "Risale pasajı bilgi türlerinin ayrılmasına, Hocaefendi’nin pasajı açıklamanın ardından araştırmanın devam etmesine dikkat çekiyor. Günlük hayatta bu ikisini bir kaynak kartında birleştirebiliriz: yazar, eser, bölüm, sayfa, asıl cümle ve kendi açıklamamız. Kartın sonunda, bu kaynağın hangi soruya cevap verdiğini tek cümleyle belirtiriz.",
          "Kitap adı veya sayfa bulunamıyorsa boşluğu tahminle doldurma. “Kaynak doğrulaması gerekli” diye not et. Cümle kulağa doğru gelse bile aidiyeti ayrı bir araştırmadır. İddianın doğruluğu, sözün gerçekten o yazara ait olması ve bizim yorumumuzun uygunluğu birbirinden farklı kontrollerdir.",
        ],
      },
    ],
    discussionQuestions: [
      "Bir iddianın kaynağını bulmak ile o iddiayı değerlendirmek arasındaki fark nedir?",
      "Bir yazarın cümlesiyle kendi yorumunu kaynak kartında nasıl ayırırsın?",
    ],
    application: {
      title: "Kendi kaynak kartım",
      items: [
        "Dersin bir alıntısı için yazar, eser, bölüm ve sayfa içeren kaynak kartı hazırla.",
        "Alıntıyı aynen yaz; kendi açıklamanı altına ayrı bir cümleyle ekle.",
        "Kartın sonuna kaynağın hangi soruya cevap verdiğini ve doğrulanmayı bekleyen bir ayrıntı varsa onu belirt.",
      ],
    },
    takeaway: [
      "Kaynağı bilinmeyen sözü bir yazara yüklememeliyim.",
      "Alıntı ile kendi açıklamamı ayırabilirim.",
      "Araştırdığım soruya uygun kaynak türünü seçebilirim.",
      "Bilmediğim ayrıntıyı tahmin etmek yerine açıkça işaretleyebilirim.",
    ],
    sources: [
      "Suat Yıldırım, Kur’ân-ı Hakîm’in Açıklamalı Meali (İstanbul: Define Yayınları, 2007), Nisâ 4/59, 90 (yerel PDF, 98).",
      "Said Nursî, Muhâkemât (İstanbul: Şahdamar Yayınları, 2007), Birinci Makale, 12 (yerel PDF, 20).",
      "M. Fethullah Gülen, Zihin Harmanı (Prizma-7) (İstanbul: Nil Yayınları, 2011), yerel PDF, 8.",
    ],
    vocab: [
      {
        word: "İddia",
        definition: "Doğru olduğu söylenen ve gerekçesi incelenebilen düşünce.",
      },
      {
        word: "Yorum",
        definition: "Bir metin veya olay hakkında yapılan açıklama.",
      },
      {
        word: "İzini sürmek",
        definition: "Bir bilginin nereden geldiğini adım adım bulmak.",
      },
      {
        word: "Telâhuk-u efkâr",
        definition: "Fikirlerin birbirine eklenmesi ve birlikte gelişmesi.",
      },
      {
        word: "Muhteva",
        definition: "Bir metnin veya şeyin içinde bulunan anlam ve içerik.",
      },
      {
        word: "Mütevakkıf",
        definition: "Bir şeyin gerçekleşmesi için başka bir şeye bağlı olması.",
      },
      {
        word: "Ülülemr",
        definition: "Toplumsal işlerde sorumluluk ve yönetim üstlenenler.",
      },
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
    subtitle: "Soruyu, iddiayı, dayanağı ve yorumu görünür kılmak",
    readingMinutes: 10,
    sections: [
      {
        heading: "Altını çizmekten harita çıkarmaya",
        paragraphs: [
          "Bir paragrafın altını bütünüyle çizdiğinde, sonunda hangi düşüncenin öne çıktığını seçmek zorlaşır. Cümleler etkileyici olabilir; fakat metnin sorusu ve dayanağı görünür hâle gelmemiştir. Bu yıl okuma notumuz yalnız beğendiğimiz cümlelerden oluşmayacak. Beğenimizin yanında gerekçeyi de kaydedeceğiz.",
          "Okuma protokolümüz beş öğeden oluşuyor: metnin cevap aradığı soru, ana iddiası, dayanağı, bizim yorumumuz ve açıkta kalan nokta. Bu öğeler aynı şey değildir. Bir temsil, soyut düşünceyi görünür kılabilir; fakat temsilin her ayrıntısı bağımsız bir delil sayılmaz. Bir aktarımın bulunması da aktarımın yorumlanışını kendiliğinden doğrulamaz.",
          "Metnin açıkta bıraktığı noktayı yazmak, onda mutlaka kusur bulmak değildir. Bazen yazar başka bir soruya cevap verdiği için bizim merakımız bu paragrafta karşılanmaz. O zaman ilgili başka bölüme gitmek veya yetkin bir kişiye danışmak gerekir. Bilmediğimizi görünür kılmak, okuma notunun güçlü tarafıdır.",
        ],
      },
      {
        heading: "Tanışıklığı okuma becerisine dönüştürmek",
        paragraphs: [
          "Risale-i Nur’dan ve Hocaefendi’nin eserlerinden parçalar okumuş olabilirsin. Hiç okumadıysan bu derste aynı kısa pasaj üzerinden çalışabilirsin. Risale-i Nur, Said Nursî’nin iman ve Kur’an meselelerini açıklayan külliyatıdır. Hocaefendi’nin eserlerinde ise soru-cevap, sohbet ve kavram açıklaması gibi farklı anlatım biçimleri bulunur. Her metni kendi konusu ve amacı içinde okuyacağız.² ³",
          "Derin okuma, yazarın her fikrini benimsemek için kurulmuş bir yöntem değildir. Onun ne dediğini, hangi gerekçeyle dediğini ve bizim ne çıkardığımızı ayırma çabasıdır. Bu ayrım sevdiğimiz bir yazar için de geçerlidir. Bir cümleyi güçlü bulduğumuzda önce onu anlamalı, sonra kendi fikrimizle ilişkisini kurmalıyız.",
        ],
      },
      {
        heading: "Âyet — Sâd 38/29",
        kind: "arabic",
        citation: "1",
        paragraphs: [
          "﴿ كِتَابٌ أَنزَلْنَاهُ إِلَيْكَ مُبَارَكٌ لِّيَدَّبَّرُوا آيَاتِهِ وَلِيَتَذَكَّرَ أُولُوا الْأَلْبَابِ ﴾",
        ],
      },
      {
        heading: "Suat Yıldırım Meali",
        citation: "1",
        kind: "quote",
        paragraphs: [
          "Biz sana feyizli ve bereketli bir kitap indirdik ki insanlar onun âyetlerini iyice düşünsünler ve aklı yerinde olanlar ders ve ibret alsınlar.",
        ],
      },
      {
        heading: "Âyetin dersimizle bağlantısı",
        paragraphs: [
          "Ayet, Kur’an’ın ayetleri üzerinde düşünmeyi ve ders almayı anlatır. *Tedebbür*, bir sözün önünü sonunu ve anlam bağlantılarını dikkate alarak üzerinde durmaktır. Buradaki çağrının Kur’an’a ilişkin olduğunu koruyoruz. Kendi okuma yöntemimizde bağlamı gözetmek için bu çağrıdan yararlanabiliriz.",
        ],
      },
      {
        heading: "RİSALE-İ NUR’DAN",
        citation: "2",
        kind: "quote",
        paragraphs: ["Muvâzenesiz ve mizansız olan çok aldanır, aldatır."],
      },
      {
        heading: "Bu pasajı nasıl anlayabiliriz?",
        paragraphs: [
          "*Muvâzene* karşılaştırıp tartma, *mizan* ölçü anlamına gelir. Bu kısa cümle Muhâkemât’ta hakikati kavramak ve ölçüyü korumak üzerinde durulan bölümde bulunur. Ölçü aramak, yazarın söylediklerini kendi bağlamında incelemeyi ve dayanak ile sonuç arasındaki bağı görmeyi gerektirir.",
          "Bir metin güçlü bir örnek verince örneğin etkisine kapılabiliriz. Okuma haritasında önce örneğin neyi gösterdiğini, ardından hangi sınırlar içinde gösterdiğini yazarız. Düşünceler arasında bağlantı kurmakla yeni bir kanıt elde etmek aynı şey değildir. Bugün yalnız bu ayrımı çalışıyoruz; metnin bütün tartışmasını bir cümleye sığdırmıyoruz.",
        ],
      },
      {
        heading: "HOCAEFENDİ’NİN ESERLERİNDEN",
        citation: "3",
        kind: "quote",
        paragraphs: [
          "Müslümanın soru sorup bunlara cevaplar araması ayrı mesele, bunları kavraması ayrı bir meseledir.",
        ],
      },
      {
        heading: "Bu pasaj bize ne anlatıyor?",
        paragraphs: [
          "Hocaefendi bu cümlenin devamında kavramayı tetkik ve araştırmayla ilişkilendirir. Cevabı duymak, onun hangi soruya ve hangi gerekçeye karşılık geldiğini gösterebilmekle aynı aşama değildir. Bu yüzden okuma haritasında cevap kadar cevabın dayanağına da yer veririz.",
          "Sevdiğin bir açıklamayı kendi sözlerinle aktarmayı dene. Ardından kendi cümlende bulunan her önemli iddianın asıl metinde karşılığını ara. Bulamadığın bir bağlantı senin yorumun olabilir; onu böyle işaretle. Yorum yapmak okumanın parçasıdır, fakat yorumu yazarın cümlesiymiş gibi sunmak değildir.",
        ],
      },
      {
        heading: "Bağlantıyı kuralım",
        paragraphs: [
          "Risale pasajı ölçüyü korumayı, Hocaefendi’nin pasajı cevabı kavramak için çalışmayı hatırlatıyor. Beş öğeli okuma haritası bu iki dikkati uygulamaya dönüştürüyor. Metnin kendisiyle kendi çıkarımımız yan yana görülebiliyor; neyi hâlâ bilmediğimiz de gizlenmiyor.",
          "Bugün önce yalnız Risale cümlesini haritalayacağız. Sorusu: okurken yanılmayı nasıl azaltabiliriz. Ana iddiası: ölçüsüz değerlendirme yanıltabilir. Dayanağı için cümlenin çevresindeki bölümü incelemek gerekir; tek alıntı bütün gerekçeyi göstermez. Kendi yorumumuz: güçlü görünen ifadeyi bağlamıyla tartmak. Açık nokta: bu ölçünün farklı örneklerde nasıl kurulacağı. Bu son nokta ilerleyen derslere bırakılabilir.",
        ],
      },
    ],
    discussionQuestions: [
      "Seni etkileyen bir örneğin neyi gösterdiğini ve neyi göstermediğini nasıl ayırırsın?",
      "Bir pasajın açık bıraktığı noktayı yazmak, o pasajı anlamana nasıl yardım eder?",
    ],
    application: {
      title: "Beş kutuda okuma haritam",
      items: [
        "Dersin kısa Risale pasajını soru, ana iddia, dayanak, yorum ve açık nokta kutularına yerleştir.",
        "Asıl metinde bulunmayan kendi çıkarımını yorum kutusunda göster; gerekçeyi bu cümleden çıkaramıyorsan bunu belirt.",
        "Arkadaşının haritasıyla karşılaştırıp metne dayanan tek bir düzeltme yap.",
      ],
    },
    takeaway: [
      "Beğendiğim cümlenin iddiasını ve dayanağını ayrı yazabilirim.",
      "Bir örneğin sınırlarını görmek düşüncemi güçlendirir.",
      "Yorumumun bana ait olduğunu gösterebilirim.",
      "Açıkta kalan bir nokta, sonraki araştırmama yön verebilir.",
    ],
    sources: [
      "Suat Yıldırım, Kur’ân-ı Hakîm’in Açıklamalı Meali (İstanbul: Define Yayınları, 2007), Sâd 38/29, 479 (yerel PDF, 487).",
      "Said Nursî, Muhâkemât (İstanbul: Şahdamar Yayınları, 2007), On İkinci Mukaddime, 35 (yerel PDF, 43).",
      "M. Fethullah Gülen, Zihin Harmanı (Prizma-7) (İstanbul: Nil Yayınları, 2011), yerel PDF, 8.",
    ],
    vocab: [
      {
        word: "İddia",
        definition: "Doğru olduğu savunulan düşünce veya önerme.",
      },
      {
        word: "Gerekçe",
        definition: "Bir iddiayı desteklemek için sunulan neden.",
      },
      {
        word: "Varsayım",
        definition: "Bir düşünceyi kurarken başlangıçta doğru kabul edilen fikir.",
      },
      {
        word: "Tedebbür",
        definition: "Bir ayet üzerinde dikkatle ve derinlemesine düşünme.",
      },
      {
        word: "Muhakeme",
        definition: "Bilgi ve gerekçeleri karşılaştırarak sonuca ulaşma.",
      },
      {
        word: "Muvâzene",
        definition: "Düşünceleri ve gerekçeleri karşılaştırarak tartma.",
      },
      {
        word: "Mizan",
        definition: "Bir değerlendirmede kullanılan ölçü.",
      },
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
    subtitle: "Kimlik, ilişki, ibadet ve sorumluluk arasında gerekçeli bağlar kurmak",
    readingMinutes: 10,
    sections: [
      {
        heading: "Birbirine değmeyen bilgiler",
        paragraphs: [
          "Bir yanda üniversite için bölüm seçimi, başka bir yanda arkadaşlık, ibadet ve evdeki sorumluluklar duruyor. Her biri hakkında bazı şeyler biliyorsun. Fakat karar verirken bu alanlar birbirine hiç değmiyorsa bilgi, hayatın yönünü belirlemekte zorlanır. Bu yıl ayrı başlıkların aralarındaki bağlantıları araştıracağız.",
          "Önceki yıllarda karşılaşmış olabileceğin merak, niyet, emanet, adalet ve sorumluluk kavramlarını yeniden ele alacağız. Programa yeni katılan biri de kısa tanımlardan başlayarak harita kurabilir. Bir bütün oluşturmak için altı yıllık bütün metinleri ezberlemiş olmak gerekmez. Üç kavram arasındaki gerekçeli bağlantı, yalnız kelimelerle dolu bir sayfadan daha açıklayıcı olabilir.",
          "Bütünlük, hayatın her alanına tek ve değişmez bir cevap vermek değildir. Aynı değer farklı şartlarda farklı davranışlar gerektirebilir. Aileye karşı sorumlulukla eğitim ihtiyacı arasında seçim yaparken her iki alanın gerçek şartlarını görmemiz gerekir. Harita, gerilimi örtmek için değil, seçenekleri ve etkilediğimiz insanları görünür kılmak için hazırlanır.",
        ],
      },
      {
        heading: "Kaynaklar haritada aynı yere konmaz",
        paragraphs: [
          "Risale-i Nur, Said Nursî’nin iman ve Kur’an üzerine yazdığı farklı eserleri bir araya getirir. Her eserin bütün içindeki yerini kendi sorusu belirler. Hocaefendi’nin eserleriyle kuracağımız ilişki de bu dikkati gerektirir. İki kaynaktaki benzer kelimeler, kendiliğinden aynı iddianın dile getirildiğini göstermez; sözün öncesi ve sonrası incelenmelidir.² ³",
          "Bu yıl üniversiteye ve yeni sorumluluklara yaklaşırken kişisel bir kaynak haritası kuracağız. Kur’an, hadis, açıklama eserleri ve kendi yorumumuz haritada ayrı yerlerde duracak. Kaynakların birbirini desteklediği noktaları gösterirken farklılıklarını da koruyacağız. Böylece bütünlük, aynılaştırma yerine anlamlı ilişkiler kurma becerisi hâline gelecek.",
        ],
      },
      {
        heading: "Âyet — Bakara 2/208",
        kind: "arabic",
        citation: "1",
        paragraphs: [
          "﴿ يَا أَيُّهَا الَّذِينَ آمَنُوا ادْخُلُوا فِي السِّلْمِ كَافَّةً وَلَا تَتَّبِعُوا خُطُوَاتِ الشَّيْطَانِ إِنَّهُ لَكُمْ عَدُوٌّ مُّبِينٌ ﴾",
        ],
      },
      {
        heading: "Suat Yıldırım Meali",
        citation: "1",
        kind: "quote",
        paragraphs: [
          "Ey iman edenler! Hepiniz toptan barış ve selamete girin de şeytanın adımlarını izlemeyin! Çünkü o, sizin aranızı açan belli bir düşmandır.",
        ],
      },
      {
        heading: "Âyetin dersimizle bağlantısı",
        paragraphs: [
          "Bu mealde barış ve selamet vurgusu vardır. Ayetin ana çağrısını kendi bağlamıyla ele alıyoruz; onu doğrudan bir kavram haritası talimatına dönüştürmüyoruz. Dersimizde ondan hareketle değerlerimizi farklı alanlarda uyumlu yaşama üzerinde durmak, bizim kurduğumuz eğitim bağlantısıdır.",
        ],
      },
      {
        heading: "RİSALE-İ NUR’DAN",
        citation: "2",
        kind: "quote",
        paragraphs: [
          "Risaletü’n-Nur’un kitapları birbirine tercih edilmez. Her birinin kendi makamında riyâseti var.",
        ],
      },
      {
        heading: "Bu pasajı nasıl anlayabiliriz?",
        paragraphs: [
          "Kastamonu Lâhikası’ndaki bu cümle, Risale-i Nur’un farklı eserlerinin kendi ele aldıkları meselelerdeki yerini anlatır. *Makam* burada konunun yeri, *riyâset* ise o yerde öne çıkma anlamında düşünülebilir. Cümle, kitapların aynı başlıkları tekrarladığı anlamına gelmez. Bütünü anlamak için her parçanın kendine özgü işlevini görmek gerekir.",
          "Kendi öğrenme haritamızda da ibadet bilgisiyle arkadaşlıkta adalet aynı kutuya yazılmaz. Ancak ikisi sorumluluk kavramıyla ilişkilendirilebilir. İbadette zamanını düzenlemek, arkadaşlıkta ise verdiğin sözü tutmak bu bağı somutlaştırır. Bu, pasajın doğrudan öğrenci hayatı hakkında bir hükmü değil, dersimizin ondan hareketle kurduğu açıklamadır.",
        ],
      },
      {
        heading: "HOCAEFENDİ’NİN ESERLERİNDEN",
        citation: "3",
        kind: "quote",
        paragraphs: [
          "Bu itibarla, sizden de rica edeceğim, meseleleri sadece burada dinlemekle bırakmayalım.",
        ],
      },
      {
        heading: "Bu pasaj bize ne anlatıyor?",
        paragraphs: [
          "Hocaefendi, dinlemenin ardından okuma ve araştırmanın sürmesini ister. Bütün kurmak için de bir konuşmadan hatırladığımız ifadeleri toplamak yeterli değildir. Her kavramın anlamını kaynağında bulmak ve bağlantıyı açık bir cümleyle anlatmak gerekir. Bu yaklaşım, yalnız hazır cevapları taşımak yerine kendi öğrenme sorumluluğunu üstlenmeye yardım eder.",
          "Örneğin emanet ile meslek seçimini ilişkilendirirken “meslek emanettir” yazmakla yetinme. Hangi kabiliyetin, hangi insanın ihtiyacının ve hangi sorumluluğun bu bağlantıda yer aldığını göster. Kaynakta bulunmayan meslek hükmünü yazara yükleme. Haritanda kendi yorumuna yer verebilirsin; yorumun kime ait olduğunu belirtmen yeterlidir.",
        ],
      },
      {
        heading: "Bağlantıyı kuralım",
        paragraphs: [
          "Risale pasajı bütünün parçalarının kendine özgü yerini, Hocaefendi’nin pasajı öğrenmenin etkin olarak sürmesini vurguluyor. Haritamızda hem parçayı hem parçalar arasındaki bağı göstereceğiz. Bir okun yanına “ilişkilidir” yazmak yeterli değildir; ilişkinin nasıl kurulduğunu anlatan kısa bir cümle gerekir.",
          "Örnek bir bağlantı şöyle kurulabilir: niyet, zaman kullanımı ve sorumluluk. Bir arkadaşın işini kolaylaştırmayı amaçladığında zamanını buna göre ayırırsın; sorumluluk da sözünü tutup gecikmede haber vermene dönüşür. Başka bir durumda aynı kavramların ilişkisi farklı olabilir. Açık kalan bir bağlantıyı kesik çizgiyle göstermek, haritayı eksik değil dürüst yapar.",
        ],
      },
    ],
    discussionQuestions: [
      "Seçtiğin üç kavram arasında gerekçesiyle gösterebildiğin bir bağlantı nedir?",
      "İki sorumluluk çatıştığında haritanda hangi şartlara ve kimlerin ihtiyaçlarına yer verirsin?",
    ],
    application: {
      title: "Altı yıllık kavram haritam",
      items: [
        "Kimlik, ilişki, ibadet, sorumluluk ve kaynak başlıklarını sayfaya yerleştir; üç kavramı uygun yerlere ekle.",
        "İki kavram arasına bir ok çiz ve bağın nasıl kurulduğunu tam bir cümleyle açıkla; kaynak ile kendi yorumunu ayır.",
        "Seçtiğin bir gelecek kararını haritada incele; araştırılacak bağlantıyı kesik çizgiyle göster.",
      ],
    },
    takeaway: [
      "Kavramlar arasındaki bağı yalnız adlarını yazarak kuramam.",
      "Kaynakların farklı görevlerini koruyarak bütün oluşturabilirim.",
      "Kararımın kimleri ve hangi sorumlulukları etkilediğini görebilirim.",
      "Emin olmadığım ilişkiyi açıkça işaretleyip araştırmaya devam edebilirim.",
    ],
    sources: [
      "Suat Yıldırım, Kur’ân-ı Hakîm’in Açıklamalı Meali (İstanbul: Define Yayınları, 2007), Bakara 2/208, 36 (yerel PDF, 44).",
      "Said Nursî, Kastamonu Lâhikası (İstanbul: Şahdamar Yayınları, 2007), Yirmi Yedinci Mektup’tan, 6 (yerel PDF, 12).",
      "M. Fethullah Gülen, Zihin Harmanı (Prizma-7) (İstanbul: Nil Yayınları, 2011), yerel PDF, 8.",
    ],
    vocab: [
      {
        word: "Bütünleştirmek",
        definition: "Ayrı parçalar arasındaki anlamlı ilişkileri göstermek.",
      },
      {
        word: "Külliyat",
        definition: "Bir yazarın birbiriyle ilişkili eserlerinin bütünü.",
      },
      {
        word: "Bağlam",
        definition: "Bir sözün kendi konusu ve çevresindeki bilgiler.",
      },
      {
        word: "Makam",
        definition: "Bir şeyin veya konunun kendine özgü yeri ve işlevi.",
      },
      {
        word: "Mukayese",
        definition: "İki veya daha fazla şeyi benzer ve farklı yönleriyle karşılaştırma.",
      },
      {
        word: "Riyâset",
        definition: "Bir konumda öne çıkma; pasajda eserin kendi konusundaki yeri.",
      },
    ],
  },
];

export const firstWeekKonuItems: readonly KonuCurriculumItem[] = firstWeekDrafts.map(createLesson);

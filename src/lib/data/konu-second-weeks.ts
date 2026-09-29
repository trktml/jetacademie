import type { KonuCurriculumItem, KonuSection } from "./konu-curriculum";
import { createLesson, type LessonDraft } from "./konu-first-weeks";

function prose(heading: string, ...paragraphs: string[]): KonuSection {
  return { heading, paragraphs };
}

function quotation(heading: string, paragraph: string, citation: string): KonuSection {
  return { heading, paragraphs: [paragraph], kind: "quote", citation };
}

function verse(reference: string, arabic: string, meal: string, connection: string): KonuSection[] {
  return [
    { heading: `Âyet — ${reference}`, paragraphs: [arabic], kind: "arabic", citation: "3" },
    quotation("Suat Yıldırım Meali", meal, "3"),
    prose("Âyetin dersimizle bağlantısı", connection),
  ];
}

const mealSource = (reference: string, page: number) =>
  `Suat Yıldırım, Kur’ân-ı Hakîm’in Açıklamalı Meali (İstanbul: Define Yayınları, 2007), ${reference}, s. ${page}.`;

const drafts: readonly LessonDraft[] = [
  {
    id: "konu-eylul-2",
    grade: 1,
    weekNumber: 2,
    month: 9,
    week: 2,
    year: 2026,
    title: "Bediüzzaman kimdir?",
    subtitle: "Bu eserlerin arkasında nasıl bir hayat ve ilim yolculuğu var?",
    readingMinutes: 8,
    sections: [
      prose(
        "Bir hayat hikâyesinin kapısını aralamak",
        "İnsan bir eseri okurken onu yazan kişinin nasıl bir yoldan geçtiğini merak eder. Okuduğumuz kitaplar boşlukta doğmaz; arkalarında yaşanmış tecrübeler, zorluklar ve büyük bir öğrenme azmi vardır. Bediüzzaman Said Nursî’nin hayatı da çocukluk yıllarından itibaren ilme, hakikate ve öğrenmeye duyulan derin bir muhabbetle başlar.",
        "Bitlis’in Hizan ilçesine bağlı Nurs köyünde dünyaya gelen küçük Said, çevresindeki dünyayı dikkatle inceler. Ağabeyi Molla Abdullah’ın medreseden köye her dönüşünde kazandığı olgunluğu ve ilmin onda oluşturduğu güzelliği görür. Bu gözlem onda büyük bir ilim arzusu uyandırır ve henüz küçük yaşta ilim tahsil etmek için yola çıkar."
      ),
      prose(
        "İlmin izzeti ve öğrenme aşkı",
        "Molla Said, medreselerde okurken yalnızca kitaplardaki bilgileri ezberlemekle yetinmez; her cümlenin mantığını kavramak ister. Karşılaştığı güçlüklere sabreder, gecelerini gündüzlerine katarak okur. Onun hayatında öne çıkan en belirgin vasıflardan biri de ilmin vakar ve haysiyetini korumasıdır. Başkasına minnet etmemek ve ilmi dünyevî bir menfaate alet etmemek onun hayat boyu taşıyacağı temel bir prensip olur.",
        "Tarihçe-i Hayat’ta onun bu ilim şevki ve tahsil hayatındaki sebatı şöyle nakledilir:"
      ),
      quotation(
        "Risale-i Nur’dan — Tarihçe-i Hayat (İlk Hayatı)",
        "Molla Abdullah’ın gittikçe <u>tekâmül</u> ederek köydeki okumamış arkadaşlarından okumakla tezahür eden <u>meziyet</u>ini düşünüp hayran kaldı. Bunun üzerine ciddî bir <u>şevk</u> ile <u>tahsil</u>i gözüne aldı... Zaman gösterdi ki şimdi muhteşem bir ağaç mahiyetini alan Risale-i Nur’un muazzam ve geniş hizmetinin levâzımatından olan <u>izzet-i ilmiye</u>yi, Cenâb-ı Hak, Molla Said’in ruhunda, ta o zaman küçük bir çekirdek olarak dercetmişti.",
        "1"
      ),
      prose(
        "İlimde doymamak ve sürekli arayış",
        "Bu pasaj, öğrenmenin insanı nasıl değiştirdiğini ve geliştirdiğini anlatır. Tekâmül, bir insanın adım adım olgunlaşmasıdır. Küçük Said, okuyan ağabeyindeki bu farkı görünce ilme yönelir. Ancak onun ilim yolculuğundaki hedefi bir makam sahibi olmak veya başkalarına üstünlük taslamak değildir. İzzet-i ilmiye, ilmin şerefini korumak, doğru bildiğinden taviz vermemek ve öğrendiğini Allah rızası için öğrenmektir.",
        "İlim öğrenirken insan çabuk yorulabilir veya birkaç bilgi öğrendiğinde kendisini yeterli görebilir. Oysa hakiki ilim talipleri, öğrendikçe ne kadar az bildiklerini fark ederler."
      ),
      prose(
        "Öğrenmenin ucu bucağı yoktur",
        "Fethullah Gülen Hocaefendi, gerçek ilim erlerinin bu doymak bilmeyen öğrenme ve araştırma tutkusunu şöyle ifade eder:"
      ),
      quotation(
        "Hocaefendi’nin eserinden — Ölçü veya Yoldaki Işıklar",
        "Bir insanın okuyup-öğrendikleri ne kadar çok olursa olsun, hiçbir zaman onu okuyup-öğrenmekten alıkoymamalıdır. Gerçek ilim adamları, daha çok, sürekli araştırmalarının yanında, bildiklerini yetersiz bulan kimseler arasından çıkmıştır. İnsanlar arasında kıymet ve şeref, ilim ve <u>mârifet</u> iledir.",
        "2"
      ),
      prose(
        "Öğrenme azmini hayata taşımak",
        "İki pasaj birleştiğinde karşımıza şu hakikat çıkar: İlim bir yarış değil, ömür boyu süren bir olgunlaşma yolculuğudur. Bediüzzaman’ın çocukluğundaki o saf şevk ile Hocaefendi’nin dikkat çektiği ‘bildiğini yetersiz bulma’ tefekkürü aynı kökten beslenir.",
        "Sen de bugün okulda veya odanda bir kitabı açtığında yalnız sınavı geçmeyi düşünme. Öğrendiğin her doğru cümlenin seni nasıl daha anlayışlı, daha sabırlı ve çevresine daha faydalı bir insan yapacağına odaklan. İlmin gerçek değeri, kalbinde uyandırdığı merak ve edep duygusundadır."
      ),
      ...verse(
        "Tâhâ 20/114",
        "فَتَعَالَى اللَّهُ الْمَلِكُ الْحَقُّ ۗ وَلَا تَعْجَلْ بِالْقُرْآنِ مِن قَبْلِ أَن يُقْضَىٰ إِلَيْكَ وَحْيُهُ ۖ وَقُل رَّبِّ زِدْنِي عِلْمًا",
        "Gerçek Hükümran olan Allah, yüceler yücesidir. Sana vahyedilmesi henüz tamamlanmadan önce Kur’ân’ı aceleyle okumaya kalkışma; ve de ki: ‘Rabbim, benim ilmimi artır!’",
        "Âyet, insanın bilgi karşısında aceleci ve kibirli olmaması gerektiğini, daima Rabbinden ilmini artırmasını niyaz eden bir öğrenci kalbi taşıması gerektiğini öğretir. Bediüzzaman’ın genç yaştaki ilim arayışı da bu duanın hayattaki bir yankısıdır."
      ),
    ],
    discussionQuestions: [
      "Bir insanın çok şey bilmesi ile o bilginin onu olgunlaştırması (tekâmül ettirmesi) arasında nasıl bir fark vardır?",
      "Gerçek ilim taliplerinin bildiklerini hiçbir zaman 'yeterli' görmemeleri onların gayretine nasıl etki eder?",
    ],
    application: {
      title: "Bu haftanın küçük adımı",
      items: [
        "Merak Defteri'ne bu hafta öğrenmek istediğin fakat henüz bilmediğin üç kavram veya konuyu yaz.",
        "Ders çalışmaya başlarken Tâhâ sûresindeki 'Rabbim, ilmimi artır' duasını oku ve zihnini öğrenmeye aç.",
      ],
    },
    takeaway: [
      "İlmin insanı tekâmül ettiren ve ahlakını güzelleştiren manevi bir yolculuk olduğunu fark edebilirim.",
      "Öğrendiğim bilgileri başkalarına üstünlük taslamak için değil, Allah rızası ve insanlara fayda için öğrenmeye niyet edebilirim.",
      "Karşılaştığım zor konularda hemen pes etmek yerine sabırla araştırmayı sürdürebilirim.",
      "Ne kadar çok öğrenirsem öğreneyim, kendimi daima öğrenmeye muhtaç bir ilim talebesi olarak görebilirim.",
    ],
    vocab: [
      { word: "Tekâmül", definition: "Adım adım olgunlaşma, gelişme ve kemale erme." },
      {
        word: "Meziyet",
        definition: "Bir kimseyi benzerlerinden üstün kılan iyi nitelik, fazilet.",
      },
      { word: "Şevk", definition: "Bir şeyi yapma konusundaki güçlü istek, gayret ve coşku." },
      { word: "Tahsil", definition: "İlim öğrenme, bilgi edinme faaliyeti." },
      {
        word: "İzzet-i ilmiye",
        definition:
          "İlmin vakarını ve haysiyetini koruma, ilmi basit menfaatlere alet etmeme erdemi.",
      },
      {
        word: "Mârifet",
        definition: "Eşyanın ve hakikatlerin iç yüzünü anlama, derin kavrayış ve hüner.",
      },
    ],
    sources: [
      "Bediüzzaman Said Nursî, Tarihçe-i Hayat, İlk Hayatı (İstanbul: Şahdamar Yayınları, 2007), s. 36.",
      "M. Fethullah Gülen, Ölçü veya Yoldaki Işıklar (İzmir: Nil Yayınları, 2000), s. 60.",
      mealSource("Tâhâ 20/114", 319),
    ],
  },
  {
    id: "g2-konu-eylul-2",
    grade: 2,
    weekNumber: 2,
    month: 9,
    week: 2,
    year: 2026,
    title: "Bediüzzaman: Bir Ömür Neden İman Meselelerine Adanır?",
    subtitle: "Bir insan niçin rahatını değil, inandığı bir hakikati anlatmayı seçer?",
    readingMinutes: 9,
    sections: [
      prose(
        "Rahatlık mı, sorumluluk mu?",
        "Çoğu insan hayatında rahat bir düzen kurmayı, zorluklardan uzak kalmayı ve kendi huzurunu öncelemeyi seçer. Bu anlaşılabilir bir insanî istektir. Fakat tarihe baktığımızda bazı şahsiyetlerin kendi rahatlarını, sıhhatlerini ve dünyevî menfaatlerini hiçe sayarak toplumun geleceği ve manevi selameti için kendilerini adadıklarını görürüz. Bir insanı bütün konforunu feda edip çileli bir yolu seçmeye iten sebep ne olabilir?",
        "Bediüzzaman Said Nursî’nin hayat çizgisi, bu sorunun en canlı cevabıdır. 1925-1926 yıllarında Anadolu’nun ücra bir kasabası olan Barla’ya sürgün edildiğinde, amaç onu toplumdan tecrit etmek, susturmak ve eser yazamaz hale getirmekti. Fakat o, yalnızlığı ve sürgün şartlarını bir mazeret saymadı. Barla’nın dağlarında ve bağlarında, bir çınar ağacının dallarında veya küçük bir odada, iman hakikatlerini anlatan Risale-i Nur’u telif etmeye başladı."
      ),
      prose(
        "Barla’nın sessizliğinde yankılanan feryat",
        "Barla, bir köşeye çekilip dinlenme yeri değildi; manevi bir yangının farkına varıp onu söndürmek için çırpınma meydanıydı. Bediüzzaman, insanların imanlarının sarsıldığı, inançsızlık cereyanlarının genç zihinleri tehdit ettiği bir çağda sessiz kalamazdı. Kendi canını, sağlığını veya maruz kaldığı haksızlıkları düşünmeye vakti bile olmadığını söylüyordu.",
        "Nitekim yıllar sonra kendisine yapılan baskı ve haksızlıklara neden aldırmadığını sorduklarında, içindeki bu derin mesuliyet hissini unutulmaz bir temsille ifade edecekti:"
      ),
      quotation(
        "Risale-i Nur’dan — Tarihçe-i Hayat (Tahliller)",
        "Bana, ‘Sen şuna buna niçin sataştın?’ diyorlar. Farkında değilim. Karşımda müthiş bir yangın var. Alevleri göklere yükseliyor. İçinde evlâdım yanıyor, imanım tutuşmuş yanıyor. O yangını söndürmeye, imanımı kurtarmaya koşuyorum. Yolda biri beni kösteklemek istemiş de ayağım ona çarpmış; ne ehemmiyeti var? O müthiş yangın karşısında bu küçük hâdise bir kıymet ifade eder mi?... Yoksa şahsımın mâruz kaldığı zahmet ve <u>meşakkat</u>leri düşünmeye bile vaktim yoktur. Keşke bunun bin misli meşakkate mâruz kalsam da iman kalesinin <u>istikbal</u>i <u>selâmet</u>te olsa!",
        "1"
      ),
      prose(
        "Yangını gören insanın telaşı",
        "Bir binanın alevler içinde yandığını ve içeride masum çocukların feryat ettiğini gören bir insan ne yapar? 'Üstüm kirlenir mi, ayağım bir taşa çarpar mı?' diye düşünmez. Bütün varlığıyla alevlerin içine atılır. Bediüzzaman’ın gözünde inançsızlık ve ahlaki çöküntü, insanlığın ebedi geleceğini tehdit eden devasa bir manevi yangındı.",
        "Bu yüzden Barla’da geçen sürgün yılları, onun için bir mahrumiyet değil, bir adanmışlık destanına dönüştü. El yazısıyla çoğaltılan risaleler köyden köye ulaştı; çünkü onu yazan kalp şahsi menfaatini değil, başkalarının ebedi hayatını düşünüyordu."
      ),
      prose(
        "Yaşatmak için yaşamak",
        "Fethullah Gülen Hocaefendi, bu fedakarlık ruhunu ve başkalarının manevi dirilişi için kendi rahatını terk etme ahlakını şöyle tahlil eder:"
      ),
      quotation(
        "Hocaefendi’nin eserinden — Kırık Testi-15 (Yolun Kaderi)",
        "İşte maddî menfaatlerin yanında belirli makamları elde etme söz konusu olduğunda başkalarını kendine tercih edebilme, belki maddî menfaatlerin ötesinde bir <u>îsâr</u> hasletidir. Bu haslete sahip bir insan yaşamayı değil, <u>yaşatma</u>yı tercih edecek ve 'Gerekirse ben ölüp gideyim, önemli olan âlemin yaşamasıdır. Eğer bir milletin ayakta durması benim kurban edilmeme bağlıysa, Cenâb-ı Hak tez elden bunu bana nasip etsin!' diyecek kadar yürekli davranacaktır.",
        "2"
      ),
      prose(
        "Fedakârlığı bugüne taşımak",
        "İki metin bir araya geldiğinde bencillikten uzaklaşmanın sırrını gösterir. Bediüzzaman'ın yangın karşısındaki telaşı ile Hocaefendi’nin 'yaşatmak için yaşamak' ideali birbirini tamamlar. Büyük fikirler ve kalıcı eserler, ancak şahsi rahatını davasına feda edebilen adanmış yüreklerin omzunda yükselir.",
        "Günlük hayatında sen de küçük fedakarlıklarla bu ruhu tadabilirsin. Arkadaşın dersi anlamadığında kendi oyun vaktinden ayırıp ona anlatmak, yorgun olduğun halde ailene yardım etmek, bencilce 'önce ben' demek yerine 'önce kardeşim' diyebilmek bu büyük ahlakın senin yaşındaki adımlarıdır."
      ),
      ...verse(
        "Bakara 2/269",
        "يُؤْتِي الْحِكْمَةَ مَن يَشَاءُ ۚ وَمَن يُؤْتَ الْحِكْمَةَ فَقَدْ أُوتِيَ خَيْرًا كَثِيرًا ۗ وَمَا يَذَّكَّرُ إِلَّا أُولُو الْأَلْبَابِ",
        "O, hikmeti dilediğine verir. Kime hikmet verilmişse, ona pek çok hayır verilmiştir. Bunu ancak derin kavrayış sahibi akıl sahipleri düşünüp anlar.",
        "Âyette geçen hikmet, olayların ardındaki hakikati kavrama ve hayatı en isabetli gayeye göre yaşama basiretidir. Bediüzzaman’ın geçici dünya rahatı yerine iman hizmetini tercih etmesi, Kur’an’ın tarif ettiği bu derin hikmetin bir meyvesidir."
      ),
    ],
    discussionQuestions: [
      "Bediüzzaman'ın 'Karşımda müthiş bir yangın var' sözü, onun maruz kaldığı haksızlıklara karşı tavrını nasıl açıklar?",
      "Bir insanın 'yaşamak' yerine 'başkalarını yaşatmayı' tercih etmesi bugünün dünyasında ne anlama gelir?",
    ],
    application: {
      title: "Bu haftanın küçük adımı",
      items: [
        "Bu hafta kendi rahatından fedakârlık ederek bir arkadaşının veya aile fertlerinin işini kolaylaştıracak bir adım at.",
        "Karşılaştığın küçük bir zorlukta şikâyet etmek yerine, o işin başkalarına sağlayacağı faydayı düşünerek sabret.",
      ],
    },
    takeaway: [
      "Hayatın sadece kendi rahatımı ve zevklerimi düşünmekten ibaret olmadığını kavrayabilirim.",
      "Toplumun ve sevdiklerimin manevi huzuru için yeri geldiğinde fedakârlık yapmanın değerini anlayabilirim.",
      "Zor şartlar altında dahi ümitsizliğe kapılmadan hayırlı işler üretmeye devam edebilirim.",
      "Başkalarının iyiliği için emek vermeyi bir yük değil, bir onur ve olgunluk vesilesi olarak görebilirim.",
    ],
    vocab: [
      { word: "Meşakkat", definition: "Güçlük, zahmet, zorluk." },
      { word: "İstikbal", definition: "Gelecek zaman." },
      {
        word: "Selâmet",
        definition: "Korku ve tehlikelerden uzak olma, esenlik ve güvenlik.",
      },
      {
        word: "Îsâr",
        definition:
          "Başkasının ihtiyacını kendi ihtiyacına tercih etme; fedakârlık ve cömertliğin en yüksek derecesi.",
      },
      {
        word: "Yaşatmak",
        definition:
          "Kendi menfaatini unutup başkalarının maddî ve manevî dirilişi için çaba göstermek.",
      },
      {
        word: "Hikmet",
        definition:
          "Eşyanın hakikatini ve gayesini anlama, isabetli ve doğru hareket etme yeteneği.",
      },
    ],
    sources: [
      "Bediüzzaman Said Nursî, Tarihçe-i Hayat, Tahliller (İstanbul: Şahdamar Yayınları, 2007), s. 621.",
      "M. Fethullah Gülen, Kırık Testi-15 (Yolun Kaderi) (İstanbul: Define Yayınları, 2018), s. 337.",
      mealSource("Bakara 2/269", 44),
    ],
  },
  {
    id: "g3-konu-eylul-2",
    grade: 3,
    weekNumber: 2,
    month: 9,
    week: 2,
    year: 2026,
    title: "Bediüzzaman: Bilgi Neden Sorumluluk Doğurur?",
    subtitle: "İnsan bildiği bir hakikate göre yaşamazsa bilgi tek başına yeterli olur mu?",
    readingMinutes: 9,
    sections: [
      prose(
        "Bilgi bir ayrıcalık mıdır, emanet mi?",
        "Günümüzde bilgiye ulaşmak son derece kolaylaştı; birkaç tuşla kütüphaneler dolusu malumata erişebiliyoruz. Fakat bilginin artması insanın ahlaken de olgunlaştığı anlamına gelir mi? Bir insanın çok şey bilmesi onu kendiliğinden güvenilir, mütevazı ve adil bir fert yapar mı? Bilgi, sahibine kibir ve üstünlük taslama hissi veriyorsa orada bir eksiklik var demektir.",
        "Bediüzzaman Said Nursî’nin hayatına baktığımızda, sahip olduğu olağanüstü ilmi hiçbir zaman bir şahsî üstünlük vesilesi yapmadığını görürüz. O, doğu ve batı ilimlerini, fen ve felsefeyi en üst düzeyde bildiği halde insanlarla ilişkisinde daima mahviyet ve tevazu içinde hareket etmiştir. Onun dünyasında ilim, nefsi büyütmek için değil; hakikati yaşamak ve Allah’ın rızasını kazanmak için bir vasıtadır."
      ),
      prose(
        "Ben bir hiçim: Şahsî kibri aşmak",
        "Tarihçe-i Hayat’ta kaydedildiğine göre, insanlar onun ilmine ve yazdığı eserlerin tesirine hayran kalıp kendisine aşırı iltifat ettiklerinde, o bu övgüleri hemen reddederdi. Eserlerdeki güzelliğin Kur’an’a ait olduğunu, kendisinin ise sadece aciz bir tercüman ve ders arkadaşı olduğunu vurgulardı.",
        "Şöhretten, alkıştan ve dünyevî menfaatlerden kaçınması onun ilmi bir emanet olarak görmesinden kaynaklanıyordu. Bu mesuliyet şuurunu talebelerine şöyle açıklar:"
      ),
      quotation(
        "Risale-i Nur’dan — Tarihçe-i Hayat (Tahliller)",
        "Zaman şahıs zamanı değil, <u>şahs-ı mânevî</u> zamanıdır. Risale-i Nur’da şahıs yok, şahs-ı mânevî var. Ben bir hiçim. Risale-i Nur, Kur’ân’ın malıdır, Kur’ân’dan süzülmüştür... Mesleğimizin esası, <u>âzamî ihlâs</u> ve <u>terk-i enaniyettir</u>. İhlâslı bir dirhem amel, ihlâssız yüz batman amele müreccahtır. İnsanların maddî mânevî hediyelerinden hürmet ve <u>teveccüh-ü âmmeden</u>, şöhretten şiddetle kaçıyorum.",
        "1"
      ),
      prose(
        "İhlâs ve amelin tartısı",
        "Pasajdaki terk-i enaniyet, insanın kendi benliğini ve kibrini bir kenara bırakması demektir. İhlâs ise yapılan her işi sırf Allah rızası için yapmak, gösterişten ve övgü beklentisinden uzak durmaktır. Bediüzzaman, 'İhlâslı bir dirhem amel, ihlâssız yüz batman amele müreccahtır' diyerek ölçünün çoklukta değil, samimiyet ve niyette olduğunu belirtir.",
        "Bilgi amel ile birleşmediğinde ve ihlasla yoğrulmadığında sahibinin sırtında bir yüke dönüşür. Bir hakikati bilmek, o hakikati hayatımıza yansıtma ve çevremize hüsn-ü misal olma sorumluluğunu da beraberinde getirir."
      ),
      prose(
        "Önemli olan amelin kalitesidir",
        "Fethullah Gülen Hocaefendi, amellerin ve gayretlerin Allah katındaki gerçek değerini tahlil ederken bu ihlas sırrına şöyle işaret eder:"
      ),
      quotation(
        "Hocaefendi’nin eserinden — Prizma-1",
        "Evet, Allah kendi katında amelleri değerlendirirken, onun azlığına ve çokluğuna göre değil, o işin ihlâslıca yapılıp yapılmadığına bakar. Onun için Bediüzzaman’ın ifadeleriyle 'Bazen bir zerre ihlâslı amel, batmanlarla hâlis olmayana <u>râcih</u> gelebilir.'... İnsanın ihlâsını, samimiyetini ve Rabbisi ile irtibatını koruması, elbette onun ecir ve sevabının da çok olmasını netice verecektir.",
        "2"
      ),
      prose(
        "Sorumluluğu kuşanmak",
        "İki metin ortak bir hakikati haykırır: Bilgi insanı gurura değil, tevazu ve amele sevk etmelidir. Çok bilmek değil, bildiğinin hakkını vermek ve niyetini tertemiz tutmak esastır.",
        "Sınıfta veya arkadaş çevrende daha çok şey bildiğinde bunu bir üstünlük gibi göstermek yerine, bilginin sende oluşturduğu saygı ve sorumlulukla hareket et. Bir gerçeği öğrendiğinde önce 'Ben bunu hayatımda ne kadar uyguluyorum?' diye kendine sor. Bilginin bereketi, yaşandığı ölçüde ortaya çıkar."
      ),
      ...verse(
        "Fâtır 35/28",
        "إِنَّمَا يَخْشَى اللَّهَ مِنْ عِبَادِهِ الْعُلَمَاءُ ۗ إِنَّ اللَّهَ عَزِيزٌ غَفُورٌ",
        "Kulları içinde Allah'tan ancak âlimler (O’nun büyüklüğünün ve sorumluluğunun farkında olanlar) hakkıyla saygı duyar. Şüphesiz Allah azîzdir, gafûrdur.",
        "Âyet, gerçek ilmin insanda saygı, edep ve derin bir haşyet duygusu uyandırdığını gösterir. Kuru bilgi insanı kibirlendirebilir; fakat hakiki ilim insanı Yaratan’ın huzurunda aczini ve sorumluluğunu bilmeye yöneltir."
      ),
    ],
    discussionQuestions: [
      "İhlâslı bir dirhem amel, ihlâssız yüz batman amele müreccahtır sözü, ders çalışma ve ibadet hayatımızda bize hangi ölçüyü verir?",
      "Bir insanın çok bilgili olması ile o bilginin sorumluluğunu taşıyabilmesi arasında nasıl bir fark vardır?",
    ],
    application: {
      title: "Bu haftanın küçük adımı",
      items: [
        "Bildiğin güzel bir ahlaki ilkeyi bu hafta hiç kimsenin görmediği bir durumda samimiyetle uygula.",
        "Arkadaşlarınla konuşurken bilgini üstünlük taslamak için değil, onlara faydalı olmak niyetiyle aktar.",
      ],
    },
    takeaway: [
      "Bilginin bir imtiyaz veya kibir sebebi değil, yerine getirilmesi gereken bir emanet olduğunu fark edebilirim.",
      "Yaptığım işlerde gösteriş ve alkış aramak yerine samimiyeti ve Allah rızasını önceleyebilirim.",
      "Öğrendiğim hakikatleri sadece zihnimde tutmayıp davranışlarıma ve ahlakıma yansıtabilirim.",
      "Kendi meziyetlerimi öne çıkarmak yerine, ortak çalışmanın ve şahs-ı manevinin değerini kavrayabilirim.",
    ],
    vocab: [
      {
        word: "Şahs-ı mânevî",
        definition: "Ortak bir gaye etrafında birleşen topluluğun oluşturduğu manevi birlik.",
      },
      {
        word: "Âzamî ihlâs",
        definition:
          "Yapılan amelde hiçbir menfaat gözetmeksizin sırf Allah rızasını hedeflemenin en üst derecesi.",
      },
      {
        word: "Terk-i enaniyet",
        definition: "Benlik, gurur ve kibrini bütünüyle terk etme erdemi.",
      },
      {
        word: "Teveccüh-ü âmme",
        definition: "Halkın bir kimseye gösterdiği ilgi, sevgi ve takdir.",
      },
      { word: "Râcih", definition: "Daha üstün, daha değerli ve tercih edilen." },
      {
        word: "Haşyet",
        definition: "Allah’ın büyüklüğünü kavrayarak duyulan derin hürmet ve saygı.",
      },
    ],
    sources: [
      "Bediüzzaman Said Nursî, Tarihçe-i Hayat, Tahliller (İstanbul: Şahdamar Yayınları, 2007), s. 686.",
      "M. Fethullah Gülen, Prizma-1 (İstanbul: Nil Yayınları, 1997), s. 131.",
      mealSource("Fâtır 35/28", 436),
    ],
  },
  {
    id: "g4-konu-eylul-2",
    grade: 4,
    weekNumber: 2,
    month: 9,
    week: 2,
    year: 2026,
    title: "Bediüzzaman: Çağın İman Sorularına Neden Yöneldi?",
    subtitle: "Bir düşünür kendi döneminin hangi sorularını merkeze alır ve neden?",
    readingMinutes: 10,
    sections: [
      prose(
        "Dönemin ruhunu ve temel yarasını okumak",
        "Büyük mütefekkirleri sıradan yazarlardan ayıran en temel husus, yaşadıkları çağın asıl meselesini doğru teşhis edebilme kabiliyetleridir. 20. yüzyılın başı, sadece siyasî ve askerî altüst oluşların değil; pozitivist, materyalist ve şüpheci felsefelerin insanlığın inanç dünyasını sarstığı çalkantılı bir dönemdi. Pek çok aydın meseleyi sadece siyasette veya kurumların yapısında görürken, Bediüzzaman Said Nursî asıl tehlikenin zihinlerde ve kalplerde yaşanan inanç erozyonu olduğunu fark etti.",
        "Van’da bulunduğu yıllarda Vali Tahir Paşa’nın konağında dünyadaki gelişmeleri ve basını yakından takip ediyordu. Bir gün gazetede okuduğu bir haber, onun hayatının akışını tamamen değiştirecek ve onu Risale-i Nur’un telifine götürecek kıvılcımı yaktı."
      ),
      prose(
        "Sönmez ve söndürülmez bir güneş",
        "İngiliz Meclisi’nde Sömürgeler Bakanı Gladstone’un Kur’an-ı Kerim’i eline alarak yaptığı konuşma ve İslam dünyasını Kur’an’dan uzaklaştırma planı gazetelere yansımıştı. Bu haber Bediüzzaman’ın ruhunda tarifsiz bir gayret ve hamiyet uyandırdı. O, klasik bir savunma refleksiyle değil, Kur’an’ın hakikatlerini asrın idrakine sunacak bir ilim ve tefekkür hamlesiyle karşılık vermeye karar verdi.",
        "Tarihçe-i Hayat bu tarihî dönüm noktasını şöyle kaydeder:"
      ),
      quotation(
        "Risale-i Nur’dan — Tarihçe-i Hayat (İlk Hayatı)",
        "İngiliz Meclis-i Meb’usân’ında Müstemlekât Nâzırı, elinde Kur’ân-ı Kerîm’i göstererek söylediği bir nutukta: 'Bu Kur’ân, İslâmların elinde bulundukça biz onlara hâkim olamayız. Ne yapıp yapmalıyız, bu Kur’ân’ı onların elinden kaldırmalıyız; yahut müslümanları Kur’ân’dan soğutmalıyız.' diye hitabede bulunmuş. İşte bu müthiş haber, onda tarifin fevkinde bir tesir uyandırmıştı... Bediüzzaman’ın, bu havâdis üzerine: 'Kur’ân’ın <u>sönmez ve söndürülmez</u> mânevî bir güneş hükmünde olduğunu, ben dünyaya <u>isbat</u> edeceğim ve göstereceğim.' diye kuvvetli bir niyet ruhunda uyanır.",
        "1"
      ),
      prose(
        "Kök sebebe yönelmek: Neden siyaset değil de iman?",
        "Bediüzzaman, İkinci Meşrutiyet ve Birinci Dünya Savaşı yıllarını yaşamış, cephede savaşmış ve esaret görmüş bir insandı. Fakat Cumhuriyet döneminde bütün siyasî ve dünyevî meşgaleleri bir kenara bırakarak kendisini sadece iman hakikatlerinin izah ve ispatına vakfetti. Neden? Çünkü kalbi hasta olan bir cemiyetin idarî formüllerle kurtulamayacağını görüyordu.",
        "'Ben cemiyetin iç hayatını, manevi varlığını, vicdan ve imanını terennüm ediyorum' diyordu. İman kalesi sarsıldığı takdirde hiçbir siyasî çabanın toplumu ayakta tutamayacağını biliyordu. Onun çağın sorularına yönelişi, doğrudan kalbe ve akla hitap eden bir iman inşasıydı."
      ),
      prose(
        "Asrın idrakine Kur’an’ı söyletmek",
        "Fethullah Gülen Hocaefendi, zamanın gereksinimlerini doğru okuyup İslam’ın evrensel hakikatlerini çağın diline tercüme etme lüzumunu şöyle ifade eder:"
      ),
      quotation(
        "Hocaefendi’nin eserinden — Fasıldan Fasıla-5 (Fikir Atlası)",
        "Maslahat, 'hâl'in icabı karşısında İslâm’ın temel esaslarından ayrılmaksızın gerekli olanın yapılması; Âkif’in ifadesiyle, '<u>Asrın idraki</u>yle Kur’ân’ın söyletilmesi' hakikatidir. Mutlak İlim Sahibi Yüce Yaratıcı... vaz’ettiği ahkâmda binlerce <u>maslahat</u> gizlidir. Bu maslahatları düşünüp-araştırıp bulmak, İslâm’ın daha iyi anlaşılması bakımından oldukça önemlidir.",
        "2"
      ),
      prose(
        "Zamanın sorularına hikmetli cevaplar",
        "Bu iki bakış açısı aynı ufukta buluşur: Dinî hakikatler çağın uzağında donup kalmış dogmalar değildir; her asrın dertlerine derman sunan canlı pınarlardır. Bediüzzaman, 20. yüzyılın fen ve felsefeden gelen şüphelerine karşı Kur’an’ın aklî ve mantıkî delillerini ortaya koydu; Hocaefendi ise bu tefekkür mirasını küresel çapta eğitime ve ahlaka taşıdı.",
        "Kendi hayatında da karşılaştığın sorulara ve tereddütlere gözlerini kapatma. Bir düşüncenin arkasındaki asıl gerekçeyi ara, çağının sorularını anla ve inancını temelsiz ezberlerle değil, derin bir kavrayışla savun."
      ),
      ...verse(
        "Nahl 16/125",
        "ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ ۖ وَجَادِلْهُم بِالَّتِي هِيَ أَحْسَنُ ۚ إِنَّ رَبَّكَ هُوَ أَعْلَمُ بِمَن ضَلَّ عَن سَبِيلِهِ ۖ وَهُوَ أَعْلَمُ بِالْمُهْتَدِينَ",
        "(İnsanları) Rabbinin yoluna hikmetle ve güzel öğütle davet et. Onlarla en güzel şekilde mücadele et! Muhakkak ki Rabbin, yolundan sapanları en iyi bildiği gibi, doğru yolda olanları da en iyi bilendir.",
        "Âyet, tebliğ ve davette en temel yöntemin hikmet (ikna edici akıl ve basiret) ve güzel öğüt olduğunu emreder. Bediüzzaman’ın çağın şüphelerine karşı cebir veya siyasetle değil, akla ve kalbe hitap eden Risale-i Nur delilleriyle çıkması bu âyetin tam bir uygulamasıdır."
      ),
    ],
    discussionQuestions: [
      "Bediüzzaman'ın cemiyetin kurtuluşunu siyasî mücadelede değil de iman hakikatlerinin ispatında görmesi hangi tarihî teşhise dayanır?",
      "Asrın idrakiyle Kur'an'ı söyletmek ilkesi, günümüz gençlerinin inanç meselelerine yaklaşımında nasıl bir yöntem sunar?",
    ],
    application: {
      title: "Bu haftanın küçük adımı",
      items: [
        "Günümüzde gençlerin zihnini meşgul eden bir inanç veya ahlak sorusunu belirle ve bu konunun temelindeki aklî delilleri araştır.",
        "Arkadaşlarınla fikir tartışması yaparken peşin hüküm yerine Nahl sûresinde tavsiye edilen hikmetli ve güzel dili tercih et.",
      ],
    },
    takeaway: [
      "Yaşadığım çağın fikir akımlarını ve temel sorularını doğru tahlil etmenin önemini kavrayabilirim.",
      "İnancımı yüzeysel sloganlarla değil, akla ve mantığa hitap eden sağlam delillerle temellendirebilirim.",
      "Toplumsal meselelerde yüzeysel tartışmalara kapılmak yerine, ahlak ve vicdan boyutunu merkeze alabilirim.",
      "İnsanlarla iletişimde hikmetli, kucaklayıcı ve ikna edici bir üslup benimseyebilirim.",
    ],
    vocab: [
      {
        word: "Sönmez ve söndürülmez",
        definition:
          "Hakikatinin ebedi olduğunu ve hiçbir beşerî kuvvetin onu yok edemeyeceğini bildiren vasıf.",
      },
      {
        word: "İsbat",
        definition: "Bir davanın veya hakikatin doğruluğunu delillerle ortaya koyma.",
      },
      {
        word: "Asrın idraki",
        definition: "Yaşanılan çağın anlayış seviyesi, bilgi düzeyi ve düşünce tarzı.",
      },
      {
        word: "Maslahat",
        definition: "İnsanların dünya ve ahiret yararına olan, hikmetli ve faydalı durum.",
      },
      {
        word: "Hikmet",
        definition: "Akla ve gerçeğe uygun söz, derin kavrayış, sağlam yöntem.",
      },
    ],
    sources: [
      "Bediüzzaman Said Nursî, Tarihçe-i Hayat, İlk Hayatı (İstanbul: Şahdamar Yayınları, 2007), s. 53.",
      "M. Fethullah Gülen, Fasıldan Fasıla-5 (Fikir Atlası) (İzmir: Nil Yayınları, 2002), s. 64.",
      mealSource("Nahl 16/125", 280),
    ],
  },
  {
    id: "g5-konu-eylul-2",
    grade: 5,
    weekNumber: 2,
    month: 9,
    week: 2,
    year: 2026,
    title: "Bediüzzaman: İman Hakikatlerini Neden Delille Anlatıyor?",
    subtitle: "Bir iman meselesinde yalnız sonucu söylemek yerine delil kurmak niçin önemlidir?",
    readingMinutes: 10,
    sections: [
      prose(
        "Taklitten tahkike giden köprü",
        "İnsanın inancı nasıl kurulur? Anne babamızdan veya çevremizden devraldığımız inanç, başlangıçta değerli bir mirastır; fakat modern dünyanın sorgulayıcı ortamında tek başına taklit yeterli kalmaz. Taklidî iman, şiddetli bir şüphe rüzgârı karşısında sarsılabilir. İmanın kökleşmesi, aklın ikna olması ve kalbin mutmain hale gelmesi için tahkikî imana, yani delillere dayanan sarsılmaz bir kavrayışa ihtiyaç vardır.",
        "Bediüzzaman Said Nursî, eserlerinde meseleleri 'inanmalısınız' diyerek dayatmaz. Bir matematik teoremini ispat eder gibi adım adım deliller kurar; kâinatı, insan fıtratını ve varlığın nizamını birer şahit olarak dinleyiciye sunar. Akıl, mantık ve vicdan aynı anda tatmin olmadan gerçek bir teslimiyetin kurulamayacağını savunur."
      ),
      prose(
        "Geleceğin dünyasında hükmedecek olan: Aklî bürhan",
        "1911 yılında Şam Emevî Camii’nde okuduğu ve İslam dünyasının geleceğine dair reçeteler sunduğu Hutbe-i Şâmiye’de Bediüzzaman, geleceğin dünyasında ilim, akıl ve fennin hükmedeceğini belirtir. Bu çağda insanları zorla veya körü körüne taklitle bir inanca bağlamak mümkün değildir. Kur’an talebeleri olarak Müslümanların en büyük gücü, aklî bürhana dayanmalarıdır.",
        "Tarihçe-i Hayat’ta yer alan bu tespit, onun telif metodunun omurgasını teşkil eder:"
      ),
      quotation(
        "Risale-i Nur’dan — Tarihçe-i Hayat (Hutbe-i Şâmiye)",
        "Hâsıl-ı kelâm: Biz Kur’ân şâkirtleri olan müslümanlar, <u>burhana</u> tâbi oluyoruz; akıl ve fikir ve kalbimizle <u>hakâik-i imaniyeye</u> giriyoruz. Başka dinlerin bazı efrâtları gibi ruhbanları taklit için burhanı bırakmıyoruz. Onun için akıl ve ilim ve fennin hükmettiği istikbalde, elbette <u>burhan-ı aklîye</u> istinat eden ve bütün hükümlerini akla tesbit ettiren Kur’ân hükmedecek!",
        "1"
      ),
      prose(
        "Temsil ve muhakemenin gücü",
        "Burhan, doğruluğu kesin olan mantıkî delil demektir. Bediüzzaman, en soyut iman hakikatlerini dahi somut temsillerle aklın yakınına getirir. Güneşin aynalardaki tecellisinden yola çıkarak tevhid hakikatini; bir sarayın intizamından hareketle kâinatın Hâlıkını izah eder. Bu sayede akıl itiraz edecek bir nokta bulamaz; kalp de o hakikati sevgiyle kucaklar.",
        "Onun düşüncesinde akıl ve nakil birbirinin zıddı değil, iki müttefikidir. Akıl doğru işletildiğinde kâinattaki her zerrenin bir tevhid mührü taşıdığını görür."
      ),
      prose(
        "Kâinat kitabındaki ilahî mühürler",
        "Fethullah Gülen Hocaefendi, kâinat ile ilahî deliller arasındaki bu kopmaz irtibatı ve ilimlerin şahitliğini şöyle izah eder:"
      ),
      quotation(
        "Hocaefendi’nin eserinden — Asrın Getirdiği Tereddütler-1",
        "Evet, Yüce Yaratıcı’nın her eserinde kendine ait mühürlerin, <u>sikkelerin</u> bulunması, O’nun varlığına bir değil, binlerce delillerdir. İlimlerin, kâinatın sırlarına ışık tutmaya başladığı günümüzde, her fen kendine has diliyle O’nun varlığını ilân etmekte ve O’nu haykırmaktadır. Her şey gidip O’na dayanmakta; bütün karanlıklar, izah edilemeyecek gibi görünen şeyler, O’nunla aydınlığa kavuşmaktadır.",
        "2"
      ),
      prose(
        "Düşünerek inanmak",
        "İki düşünürün birleştiği nokta gayet açıktır: İslam inancı, aklı bir kenara bırakmayı değil; aklı son sınırına kadar çalıştırıp varlığın derinliklerindeki delilleri okumayı ister. Bediüzzaman bürhan-ı aklîyi rehber edinirken, Hocaefendi pozitif ilimlerin ulaştığı her yeni keşfin ilahî sanata bir ayna olduğunu gösterir.",
        "Lise seviyesindeki bir genç için inanç, ezberlenmiş kalıplar olmaktan çıkmalıdır. İncelediğin bir fizik kanununda, bir biyolojik hücrenin işleyişinde veya tarihin akışında Yaratıcı’nın mührünü görebilmek, tahkikî imanın kapısını aralar. Delille öğrenilen iman, hayatın fırtınaları karşısında sarsılmaz bir kaleye dönüşür."
      ),
      ...verse(
        "Fussilet 41/53",
        "سَنُرِيهِمْ آيَاتِنَا فِي الْآفَاقِ وَفِي أَنفُسِهِمْ حَتَّىٰ يَتَبَيَّنَ لَهُمْ أَنَّهُ الْحَقُّ ۗ أَوَلَمْ يَكْفِ بِرَبِّكَ أَنَّهُ عَلَىٰ كُلِّ شَيْءٍ شَهِيدٌ",
        "Biz onlara hem ufuklarda (dış dünyada ve kâinatta) hem de kendi nefislerinde âyetlerimizi (delillerimizi) göstereceğiz; ta ki onun hak olduğu kendilerine açıkça belli olsun. Rabbinin her şeye şahit olması yetmez mi?",
        "Âyet, Allah’ın varlığına ve Kur’an’ın hakikatine dair delillerin hem dış âlemde (âfâk) hem de insanın kendi iç dünyasında (enfüs) sürekli tezahür edeceğini haber verir. Bediüzzaman’ın delile dayalı tefekkür metodu, bu âyetin vadettiği hakikatlerin bir tefsiridir."
      ),
    ],
    discussionQuestions: [
      "Taklidî iman ile tahkikî iman arasındaki fark, modern çağın felsefî ve ilmî şüpheleri karşısında nasıl belirleyici olur?",
      "Akıl ve ilim ve fennin hükmettiği istikbalde Kur'an hükmedecek ifadesi, ilim ile din arasındaki ilişkiyi nasıl konumlandırır?",
    ],
    application: {
      title: "Bu haftanın küçük adımı",
      items: [
        "Biyoloji veya fizik dersinde öğrendiğin bir doğa kanununu tefekkür gözüyle incele ve ardındaki ilahî intizamı gösteren bir delil notu çıkar.",
        "Bir inanç konusunu açıklarken sadece 'böyle inanmalıyız' demek yerine, aklî ve mantıkî gerekçelerle fikrini temellendirmeyi dene.",
      ],
    },
    takeaway: [
      "İnancımı taklitten kurtarıp aklî deliller ve derin tefekkürle tahkikî seviyeye çıkarabilirim.",
      "Fen ve ilimlerin kâinattaki mükemmel nizamı göstererek imana kuvvet verdiğini fark edebilirim.",
      "Dinî hakikatleri savunurken kör taassuptan uzak durup aklî bürhan ve mantıkî tutarlılığı esas alabilirim.",
      "Hem kâinat kitabını hem de kendi iç dünyamı ilahî birer delil olarak okuma basiretini kazanabilirim.",
    ],
    vocab: [
      {
        word: "Burhan",
        definition: "Kesin, inkâr edilemez, şüphe bırakmayan aklî delil.",
      },
      {
        word: "Burhan-ı aklî",
        definition: "Mantık ve akıl yürütme kurallarına uygun olarak kurulan kesin delil.",
      },
      {
        word: "Hakâik-i imaniye",
        definition: "İman esasları, imanın temel hakikatleri.",
      },
      {
        word: "Sikke",
        definition:
          "Bir hükümdarın veya ustanın kimliğini gösteren mühür, damga; kâinattaki ilahî imza.",
      },
      {
        word: "Âfâk",
        definition: "Dış dünya, çevre, kâinatın geniş boyutları.",
      },
      {
        word: "Enfüs",
        definition: "İnsanın kendi iç dünyası, ruhu ve vicdanı.",
      },
    ],
    sources: [
      "Bediüzzaman Said Nursî, Tarihçe-i Hayat, İlk Hayatı (Hutbe-i Şâmiye) (İstanbul: Şahdamar Yayınları, 2007), s. 93.",
      "M. Fethullah Gülen, Asrın Getirdiği Tereddütler-1 (İzmir: Nil Yayınları, 1997), s. 31.",
      mealSource("Fussilet 41/53", 481),
    ],
  },
  {
    id: "g6-konu-eylul-2",
    grade: 6,
    weekNumber: 2,
    month: 9,
    week: 2,
    year: 2026,
    title: "Bediüzzaman: Bir Ömür Nasıl Bir Merkez Etrafında Toplanır?",
    subtitle:
      "Bir insanın farklı kararlarını ve fedakârlıklarını tek bir ana gaye nasıl birleştirir?",
    readingMinutes: 11,
    sections: [
      prose(
        "Dağınıklığı aşmak ve tevhid-i kıble",
        "İnsan ömrü sayısız tercihin, yol ayrımının ve çelişkinin kesiştiği bir alandır. Çoğu zaman dağınık arzular, küçük hırslar ve gelip geçici hedefler insanın enerjisini parçalar. Oysa büyük bir fikrin ve davanın taşıyıcısı olan şahsiyetler, ömürlerini tek bir merkez etrafında toplamayı başarmışlardır. Tevhid-i kıble etmek, yani bütün eylem ve kararlarını yüksek bir gaye-i hayale bağlamak, insanı tarihin dalgaları karşısında sarsılmaz bir kaya haline getirir.",
        "Bediüzzaman Said Nursî’nin seksen yılı aşan çileli ömrüne baktığımızda; mahkemeler, hapisler, sürgünler, zehirlenmeler ve savaşlarla dolu bu hayatın hiçbir anında ana gayesinden sapmadığını görürüz. O gaye, Kur’an ve iman hizmetidir. Şahsî ikbalini, rahatını, hatta manevi makamlarını dahi bu gayenin önüne asla geçirmemiştir."
      ),
      prose(
        "Cenneti dahi feda edebilme ufku",
        "Afyon Mahkemesi müdafaalarında düşmanlarının kendisine yönelttiği 'siyasi nüfuz arayışı' veya 'makam peşinde koşma' iddialarına verdiği cevap, onun hayat felsefesinin en çarpıcı zirvesidir. O, değil dünya makamlarını, lüzum olsa ahiret hayatını ve herkesin arzuladığı makamları dahi insanların imanının selameti için feda etmeye hazır olduğunu ilan etmiştir.",
        "Tarihçe-i Hayat’taki bu manifesto, bir ömrün nasıl mutlak bir gaye etrafında billurlaştığını gösterir:"
      ),
      quotation(
        "Risale-i Nur’dan — Tarihçe-i Hayat (Afyon Hayatı)",
        "Hiçbir vakit böyle haddimden tecavüz edip iman hakikatlerini şahsiyetime bir makam, şan u şeref kazandırmaya âlet etmediğime bu yetmiş beş, hususan otuz senelik hayatım ve yüz otuz Nur Risaleleri... şehâdet ederler. Evet Nur şâkirtleri biliyorlar ve mahkemelerde hüccetlerini göstermişim ki; şahsıma değil bir makam, şan u şeref ve şöhret vermek ve uhrevî ve mânevî bir mertebe kazandırmak, belki bütün kanaat ve kuvvetimle ehl-i imana bir <u>hizmet-i imaniye</u> yapmak için, değil yalnız dünya hayatımı ve <u>fâni makamatımı</u>, belki –lüzum olsa– âhiret hayatımı ve herkesin aradığı uhrevî bâki mertebeleri feda etmeyi; hatta cehennemden bazı bîçâreleri kurtarmaya vesile olmak için –lüzum olsa– cenneti bırakıp cehenneme girmeyi kabul ettiğimi hakikî kardeşlerim bilirler.",
        "1"
      ),
      prose(
        "Şahsı ve makamı aşan yüksek ideal",
        "Bu sözler basit bir edebiyat veya hamaset değildir; seksen senelik bir hayatın fiilen ortaya koyduğu bir duruştur. İnsanların çoğu dini bir makam veya dünyevi bir itibar vesilesi yapma tehlikesiyle karşı karşıya kalabilirken, Bediüzzaman şahsını tamamen silmiştir. Hizmet-i imaniye, onun dünyasında her şeyin üstünde tutulan gayetü’l-gayattır.",
        "Bir ömrün tek bir merkezde toplanması, insanın içindeki bütün ikincil hesapları yakıp kül etmesiyle mümkündür. Nefsini aşamayan, menfaat ve rahat tutkusunu terk edemeyen bir ruh, böyle bir istikameti koruyamaz."
      ),
      prose(
        "Mefkûre insanının vasıfları",
        "Fethullah Gülen Hocaefendi, hayatını tek bir yüce ülküye bağlayan mefkûre insanının ruh yapısını ve adanmışlık felsefesini şöyle tasvir eder:"
      ),
      quotation(
        "Hocaefendi’nin eserinden — Ruhumuzun Heykelini Dikerken-1",
        "Gerçek <u>mefkûre insanı</u>, aynı zamanda bir hikmet eridir... İçinde yaşadığı topluma karşı tam bir sorumluluk örneğidir. Hedefine ulaşma uğrunda –ki en başta Yaratan’ın hoşnutluğu gelir– Allah’ın kendisine bahşettiği her şeyi, hem de gözünü kırpmadan feda eder... O, nefsine hâkim, hakikate mahkûm, makama-mansıba karşı alâkasız ve şöhret, tama, tenperverlik, rahat tutkusu gibi şeyleri öldürücü birer zehir kabul etme esprisiyle gönlünün derinliklerinde sürekli bir mücadele içindedir.",
        "2"
      ),
      prose(
        "Kendi hayat merkezini inşa etmek",
        "Bediüzzaman’ın Afyon zindanında haykırdığı dava şuuru ile Hocaefendi’nin tarif ettiği mefkûre insanı, aynı yüksek ahlakın iki cephesidir. Biri hayatıyla bu modelin zirvesini sergilemiş, diğeri bu modeli evrensel bir neslin ideali haline getirmiştir.",
        "Genç bir yetişkin olarak üniversiteye ve hayata adım atarken senin hayatının merkezinde ne olacak? Geçici heveslerin, popüler rüzgârların veya şahsi kariyer planlarının seni savurmasına izin vermemek için kendi hayat gayeni belirlemelisin. Bir insan yüksek bir ülküye bağlandığı ölçüde büyür; küçük hesaplara kilitlendiği ölçüde küçülür. Ömrünü Allah rızasına ve insanlığa hizmete vakfedenler, geride tükenmeyen bir manevi miras bırakırlar."
      ),
      ...verse(
        "Yûsuf 12/108",
        "قُلْ هَٰذِهِ سَبِيلِي أَدْعُو إِلَى اللَّهِ ۚ عَلَىٰ بَصِيرَةٍ أَنَا وَمَنِ اتَّبَعَنِي ۖ وَسُبْحَانَ اللَّهِ وَمَا أَنَا مِنَ الْمُشْرِكِينَ",
        "De ki: İşte benim yolum budur! Ben basiretle (kesin bir delile, aydınlık bir kavrayışa dayanarak) Allah’a çağırıyorum; ben ve bana tâbi olanlar da. Allah’ı her türlü noksanlıktan tenzih ederim ve ben asla müşriklerden değilim.",
        "Âyet, peygamberî davetin temel vasfını basiret ve net bir yol olarak belirler. Bediüzzaman’ın hayatındaki tavizsiz istikamet ve mefkûre insanının tek bir gaye etrafında kenetlenmesi, Kur’an’ın çizdiği bu aydınlık yolun bir takipçisi olmaktır."
      ),
    ],
    discussionQuestions: [
      "Bediüzzaman'ın 'şahsıma bir makam veya şan u şeref kazandırmamak' konusundaki hassasiyeti, bir davanın samimiyetini nasıl korur?",
      "Bir gencin hayatında 'tek bir yüksek gaye' belirlemesi onun günlük kararlarına ve kariyer tercihlerine nasıl yansır?",
    ],
    application: {
      title: "Bu haftanın küçük adımı",
      items: [
        "Kendi hayatında seni meşgul eden hedefleri listele; bunların hangilerinin geçici, hangilerinin kalıcı bir yüksek gayeye hizmet ettiğini değerlendir.",
        "Bir niyet mektubu yaz: Hayatta yapmak istediğin mesleği ve çalışmaları hangi yüce ahlaki/manevi amaca vakfetmek istediğini bir sayfada netleştir.",
      ],
    },
    takeaway: [
      "Hayatımı gelip geçici dağınık hevesler yerine yüksek ve kalıcı bir gaye etrafında toplayabilirim.",
      "Şahsi menfaat ve şöhret tutkusunu aşarak başkalarının iyiliği için samimiyetle çalışmayı öğrenebilirim.",
      "Karşılaştığım zorluklar ve baskılar karşısında inandığım hakikatten taviz vermeyen bir sebat geliştirebilirim.",
      "Düşüncelerimi ve eylemlerimi basiret, samimiyet ve ihlas esası üzerine kurabilirim.",
    ],
    vocab: [
      {
        word: "Hizmet-i imaniye",
        definition:
          "İnsanların imanını kurtarmak ve hakikati anlatmak için yapılan ihlaslı gayret.",
      },
      {
        word: "Fâni makamat",
        definition: "Dünyaya ait geçici rütbeler, mevkiler ve unvanlar.",
      },
      {
        word: "Mefkûre insanı",
        definition:
          "Yüce bir ideale gönül vermiş, şahsi menfaatini davası uğruna feda edebilen adanmış fert.",
      },
      {
        word: "Basiret",
        definition:
          "Kalp gözüyle hakikati sezme, doğruyu yanlıştan ayıran derin kavrayış ve feraset.",
      },
      {
        word: "Tevhid-i kıble",
        definition:
          "Kalbini ve hedefini tek bir yöne, en yüce gaye olan Allah rızasına çevirme; dağınıklıktan kurtulma.",
      },
      {
        word: "Gayetü’l-gayat",
        definition: "Hedeflerin en yücesi, nihai ve en son gaye.",
      },
    ],
    sources: [
      "Bediüzzaman Said Nursî, Tarihçe-i Hayat, Afyon Hayatı (İstanbul: Şahdamar Yayınları, 2007), s. 582-583.",
      "M. Fethullah Gülen, Ruhumuzun Heykelini Dikerken-1 (İzmir: Nil Yayınları, 1998), s. 91.",
      mealSource("Yûsuf 12/108", 247),
    ],
  },
];

export const secondWeekKonuItems: readonly KonuCurriculumItem[] = drafts.map(createLesson);

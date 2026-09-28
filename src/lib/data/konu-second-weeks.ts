import type { KonuSection } from "./konu-curriculum";
import { createLesson, type LessonDraft } from "./konu-first-weeks";

function prose(heading: string, ...paragraphs: string[]): KonuSection {
  return { heading, paragraphs };
}
function quotation(heading: string, paragraph: string, citation: string): KonuSection {
  return { heading, paragraphs: [paragraph], kind: "quote", citation };
}
function verse(reference: string, arabic: string, meal: string, connection: string): KonuSection[] {
  return [
    { heading: `Âyet — ${reference}`, paragraphs: [arabic], kind: "arabic", citation: "1" },
    quotation("Suat Yıldırım Meali", meal, "1"),
    prose("Âyetin dersimizle bağlantısı", connection),
  ];
}
const mealSource = (reference: string, page: number) =>
  `Suat Yıldırım, Kur’ân-ı Hakîm’in Açıklamalı Meali (İstanbul: Define Yayınları, 2007), ${page}, ${reference}. Yerel PDF sayfası ${page + 8}.`;
const historySource =
  "Alparslan Açıkgenç, “Said Nursi”, TDV İslâm Ansiklopedisi (erişim 27 Eylül 2026), https://islamansiklopedisi.org.tr/said-nursi. Biyografik bilgilerin kaynağı; dersin günlük hayat örnekleri eğitim amaçlı kurgudur.";
const prizmaSource = (page: number) =>
  `M. Fethullah Gülen, Zihin Harmanı (Prizma-7) (İstanbul: Nil Yayınları, 2011), giriş, yerel PDF sayfası ${page}. Basılı sayfa numarası yerine doğrulanan PDF sayfası verilmiştir.`;
const drafts: readonly LessonDraft[] = [
  {
    id: "konu-eylul-2",
    grade: 1,
    weekNumber: 2,
    month: 9,
    week: 2,
    year: 2026,
    title: "Bu Eser Neden Hâlâ Okunuyor?",
    subtitle: "Aynı cümleye yeni bir dikkatle dönmek",
    readingMinutes: 10,
    sections: [
      prose(
        "Geçen yıl gördüğün sayfa",
        "Bir hikâyeyi yeniden okuduğunda daha önce dikkat etmediğin bir davranışı fark edebilirsin. İlk okuyuşta olayın sonunu merak edersin. Sonraki okuyuşta kahramanın arkadaşına nasıl davrandığına bakarsın. Sayfa değişmemiştir. Senin dikkat ettiğin yer değişmiştir. Bu, ilk okuyuşunun boşa gittiği anlamına gelmez. Yeni okuyuş, öncekinin üzerine bir şey eklemiştir.",
        "Bu hafta şöyle bir sınıf örneği düşünelim. Bir öğrenci, arkadaşına yardım etmeyi anlatan kısa bir metin okuyor. İlk gün yardımın güzel olduğunu yazıyor. Bir hafta sonra grup ödevinde arkadaşının işini de üstlenip yoruluyor. Metne yeniden döndüğünde yardımın nasıl yapılacağına dikkat ediyor. Onun yaşadığı olay, aynı cümleyi başka bir yönden görmesine yardım ediyor. Bu örnek ders için kurulmuş bir durumdur; tarihî bir hikâye değildir.",
        "Bir eserin eski olması, her cümlesini kendiliğinden doğru veya bugünün her sorununa yeterli yapmaz. Yine de insanın hayatı, iyilik ve sorumluluk üzerine düşünmesini sağlayan metinlere farklı zamanlarda dönebiliriz. Okumanın değeri yalnız bitirdiğimiz sayfa sayısında değildir. Anladığımız bir fikri kendi cümlemizle söyleyebilmek de ilerlemedir."
      ),
      prose(
        "Risale-i Nur’la tanışırken",
        "Bediüzzaman Said Nursî’nin Risale-i Nur eserlerinde Kur’an ve iman üzerine açıklamalar bulunur. Mesnevî-i Nuriye bu eserlerden biridir. Onu bütün soruların cevaplarını ezberleyeceğimiz bir liste gibi okumayacağız. Kısa bir pasajın hangi düşünceye kapı açtığını anlamaya çalışacağız. Kur’an’ın kendisiyle, bir yazarın Kur’an üzerine açıklamasını da birbirinden ayıracağız.²",
        "Bazen eski bir kelime okumayı durdurur. Hemen vazgeçmek yerine kelimeyi işaretleyip anlamına bakabiliriz. Öğretmenin açıklamasından sonra cümleye tekrar dönmek, ilk bakışta kapalı görünen yeri açabilir. Bugün bir kitabın tamamını anlamak zorunda değilsin. Bir cümledeki bağlantıyı fark etmek başlangıç için yeterlidir."
      ),
      ...verse(
        "İsrâ 17/9",
        "إِنَّ هَٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ وَيُبَشِّرُ الْمُؤْمِنِينَ الَّذِينَ يَعْمَلُونَ الصَّالِحَاتِ أَنَّ لَهُمْ أَجْرًا كَبِيرًا",
        "Gerçekten bu Kur’ân insanları en doğru yola, en isabetli tutuma yöneltir. Yararlı işler yapan müminlere nail olacakları büyük mükâfatı müjdeler.",
        "Âyet Kur’an’ın rehberliğini yararlı işler yapmakla birlikte anlatır. *Rehberlik*, bir yolu seçerken yön göstermektir. Kur’an’ı okumak ile onun üzerine yazılmış bir açıklamayı okumak aynı şey değildir. Risale dersimiz, bu rehberliği anlamak için bir yazarın düşüncesini inceleme imkânı sunar."
      ),
      quotation(
        "Risale-i Nur’dan — Mesnevî-i Nuriye",
        "Mütâlaasına tekrar ile devam edilirse, me’lûf ve me’nûs bir şekil alır.",
        "2"
      ),
      prose(
        "Bu pasajı nasıl anlayabiliriz?",
        "Burada *mütâlaa*, dikkatle okumayı anlatır. *Me’lûf* ve *me’nûs*, alışılan ve yakınlık duyulan demektir. Yazar, zor görünen kendi metnine tekrar dönmeyi önerir. Bir kelimeyi ve cümledeki yerini öğrendikçe metin daha tanıdık hâle gelebilir. Tekrar aynı satırları hızla geçmek değildir; bu kez anlamadığın yerde durmayı da içerir.",
        "Bir spor hareketini çalışırken yalnız tekrar sayısını saymazsın. Hareketin nerede aksadığına da bakarsın. Okumada da benzer bir dikkat işe yarar. İlk notun ‘Bu cümleyi anlamadım’ olabilir. Sonraki notunda kelimenin anlamını ve cümlenin ana fikrini yazabilirsin. Küçük farkı görmek, kendini başkalarıyla yarıştırmaktan daha yararlıdır."
      ),
      quotation(
        "Hocaefendi’nin eserinden — Zihin Harmanı",
        "Burada cevap mahiyetinde arz edilen şeyleri de kâfi görmeyin.",
        "3"
      ),
      prose(
        "İki pasajın buluştuğu yer",
        "Hocaefendi diye anılan M. Fethullah Gülen, bu giriş bölümünde dinlenen cevabın ardından araştırmayı sürdürmeye çağırır. *Kâfi*, yeterli demektir. Bir cevabı duymak, onun anlamını bütünüyle kavramış olmak değildir. Kitaba dönmek, bir kelimeyi öğrenmek ve öğretmenden açıklama istemek bu çağrının dersimizdeki karşılığıdır.",
        "Nursî’nin cümlesi metne yeniden yaklaşmayı; Gülen’in cümlesi verilen cevabı öğrenmenin sonu saymamayı öne çıkarıyor. İkisi de okuyucuya küçük bir iş bırakıyor. Bugün bir cümleyi seçip önce ne anladığını yaz. Sonra kelime açıklamasını oku ve notuna bir ek yap. Yeni notunda farklı bir bağlantı varsa onu asıl metnin sözü gibi göstermeden belirt."
      ),
    ],
    discussionQuestions: [
      "Bir metin aynı kalırken ikinci okuyuşta fark ettiğimiz şey neden değişebilir?",
      "Bir cevabı duymakla onu kendi cümlenle açıklayabilmek arasında nasıl bir fark var?",
    ],
    application: {
      title: "Bu haftanın uygulaması — İki okuyuş kartı",
      items: [
        "Risale pasajını bir kez okuyup ilk anladığını iki cümleyle yaz.",
        "Kelimelere bakıp yeniden oku; yeni fark ettiğin bağlantıyı başka renkle ekle.",
        "Kartında yazarın cümlesi ile kendi açıklaman için ayrı yer aç; haftaya bir ek yap.",
      ],
    },
    takeaway: [
      "Anlamadığım kelimeyi işaretleyip yardım isteyebilirim.",
      "Aynı metne yeni bir dikkatle dönebilirim.",
      "Kendi yorumumu yazarın cümlesinden ayırabilirim.",
      "Okuma ilerlememi küçük bir farkla görebilirim.",
    ],
    vocab: [
      { word: "Rehberlik", definition: "Yön gösterme, bir yolu anlamaya yardım etme." },
      { word: "Mütâlaa", definition: "Dikkat ederek okuma ve inceleme." },
      { word: "Me’lûf", definition: "Alışılmış, tanıdık." },
      { word: "Me’nûs", definition: "Yakınlık duyulan, yadırganmayan." },
      { word: "Kâfi", definition: "Yeterli." },
    ],
    sources: [
      mealSource("İsrâ 17/9", 290),
      "Said Nursî, Mesnevî-i Nuriye, çev. Abdülmecid Nursî (İstanbul: Şahdamar Yayınları, 2007), “İ’tizar”, yerel PDF sayfası 78. Alıntı, yazarın kendi metnini yeniden okumaya dair açıklamasındandır.",
      prizmaSource(8),
    ],
  },
  {
    id: "g2-konu-eylul-2",
    grade: 2,
    weekNumber: 2,
    month: 9,
    week: 2,
    year: 2026,
    title: "İki Kilimlik Bir Dükkândan Başlayan Okuma Yolculuğu",
    subtitle: "Bir dönüm noktasını yer, zaman ve kaynakla anlamak",
    readingMinutes: 10,
    sections: [
      prose(
        "Küçük bir yer, uzun bir çalışma",
        "Bir okul kulübünün ilk toplantısını düşün. Birkaç sandalye, ödünç alınmış bir kitap ve konuşmak isteyen birkaç öğrenci var. Henüz büyük bir kütüphane veya geniş bir salon yok. Buna rağmen düzenli okuma başlayabilir. Bu, ders için kurulmuş bir örnektir. Bir çalışmanın büyüklüğünü yalnız başladığı odanın genişliğiyle ölçemeyeceğimizi düşündürür.",
        "Planımızdaki ‘iki kilimlik dükkân’ ifadesi küçük başlangıçları çağrıştırıyor. Ancak bu ayrıntının Bediüzzaman’ın hayatına ait olduğunu doğrulayan bir kaynak tespit edilmedi. Kaynak doğrulaması gerekli. Bu nedenle bir dükkânda kimlerin oturduğunu veya neler söylediğini tarihî olaymış gibi anlatmıyoruz. Bugün doğrulanabilen bir dönüm noktasına, Barla yıllarına bakacağız.",
        "Bediüzzaman’ın hayatını okumak, peş peşe övgü cümleleri öğrenmekten fazlasıdır. Bir düşüncenin hangi şartlarda yazıldığını fark etmeye yardım eder. Bir yazarın yaşadığı zorluklar bize bağlam verir; metinde savunduğu düşüncenin gerekçelerini ise metnin içinde ayrıca ararız."
      ),
      prose(
        "Haritada üç durak",
        "TDV İslâm Ansiklopedisi, Said Nursî’nin 1923’te Van’a dönmesini, 1925’te Burdur’a sürgün edilmesini ve 1926’da Barla’ya gönderilmesini anlatır. Barla döneminde Risale-i Nur eserlerinin önemli bir kısmı yazılmıştır. Haritada Van, Burdur ve Isparta’ya bağlı Barla’yı bulabiliriz. Bu üç durak bize bir dönüm noktasını izleme imkânı verir.⁴",
        "Bu sırayı gösteren çizgiye *kronoloji* denir. Çizginin altında yalnız kaynakta bulunan bilgileri yazalım. ‘Van’da bulunuyor’, ‘Burdur’a gönderiliyor’, ‘Barla’da eserler yazıyor’ gibi kısa notlar yeterlidir. Kaynak söylemediğinde onun o gün hangi cümleyi düşündüğünü bilemeyiz. Harita, tarihî bilgiye hayalî ayrıntı eklemek için kullanılmaz.",
        "Eserin ortaya çıktığı şartlara *bağlam* diyoruz. Konuşulan dili, dönemin imkânlarını ve yazarın muhataplarını bilmek bir cümleyi anlamayı kolaylaştırabilir. Fakat bağlam ile cümlenin anlamı ayrı işlerdir. Aynı kâğıtta iki kutu açarsan bunu daha rahat görürsün: ‘Hayatındaki olay’ ve ‘Metinde söylediği düşünce’."
      ),
      ...verse(
        "Alak 96/1–5",
        "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۝ خَلَقَ الْإِنْسَانَ مِنْ عَلَقٍ ۝ اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ۝ الَّذِي عَلَّمَ بِالْقَلَمِ ۝ عَلَّمَ الْإِنْسَانَ مَا لَمْ يَعْلَمْ",
        "Yaratan Rabbinin adıyla oku, İnsanı (rahim cidarına) yapışan bir hücreden yaratan. Oku! Rabbin sonsuz kerem sahibidir. Kalemle yazmayı öğretendir. İnsana bilmediklerini öğretendir.",
        "Bu âyetlerde okuma, yaratılış ve öğrenme birlikte anılır. Kalemle yazma, öğrenilenin kaydedilmesini de düşündürür. Biyografi çalışmamızda bir bilgiyi not ederken kaynağını yazmak bu dikkati geliştirebilir. Âyet, belirli bir yazarın hayatındaki bütün ayrıntıları doğrulayan bir belge değildir."
      ),
      quotation(
        "Risale-i Nur’dan — Barla Lâhikası",
        "Çünkü ben Kur’ân-ı Hakîm’in sırf bir hizmetkârıyım, o mukaddes dükkânın bir dellâlıyım.",
        "2"
      ),
      prose(
        "Bu pasajı nasıl anlayabiliriz?",
        "Nursî bu mektupta kendisine aşırı değer verilmesi yerine Kur’an’a hizmetini öne çıkarır. *Dellâl*, bir şeyi duyuran ve tanıtan kişidir. Buradaki dükkân bir *temsil*, yani fikri görünür kılan benzetmedir. Bu cümleden gerçek bir dükkânın ölçüsünü veya içindeki eşyaları çıkaramayız. Başlıkta geçen dükkânla alıntıdaki benzetmeyi tek bir tarihî sahneye dönüştürmemeliyiz.",
        "Bir öğrenci, kulüp toplantısında güzel bir açıklama yaptığında herkes onu alkışlayabilir. Sonra arkadaşlarının metni gerçekten anlayıp anlamadığını kontrol etmesi, yaptığı işin amacına dönmesini sağlar. Bu günlük örnek, yazarın kendi rolünü açıklama ve hizmet olarak görmesini anlamamıza yardım eder. Metnin sözü ile bizim örneğimiz ayrı kalır."
      ),
      quotation(
        "Hocaefendi’nin eserinden — Zihin Harmanı",
        "Bu itibarla, sizden de rica edeceğim, meseleleri sadece burada dinlemekle bırakmayalım.",
        "3"
      ),
      prose(
        "Biyografiden okuma alışkanlığına",
        "Gülen, dinleyiciyi cevaptan sonra okumaya ve araştırmaya çağırır. Bir hayat hikâyesini dinlemek de ilk adım olabilir. Sonraki adım, bir bilgiyi kaynağında bulup kendi notunu oluşturmaktır. *Mesele*, üzerinde durulan konu demektir. Konuyu yalnız başlığıyla hatırlamak yerine hangi bilgiye dayandığını gösterebiliriz.",
        "İki pasaj birlikte okunduğunda kişiyi tanımakla metni incelemek arasında bir denge kuruluyor. Nursî kendi şahsından çok yaptığı hizmete dikkat çekiyor; Gülen dinlenen anlatının ardından öğrencinin emek vermesini istiyor. Harita kartımız bu emeğin küçük bir örneği olacak. Bir olay notunun yanına kaynak, bir metin cümlesinin yanına açıklama yazacağız."
      ),
    ],
    discussionQuestions: [
      "Bir eserin yazıldığı şartları bilmek, onun cümlelerini anlamamıza nasıl yardım eder?",
      "Alıntıdaki dükkânı gerçek bir mekân gibi anlatırsak hangi bilgi hatasını yaparız?",
    ],
    application: {
      title: "Bu haftanın uygulaması — Harita ve kaynak kartı",
      items: [
        "Van, Burdur ve Barla’yı haritada işaretle; 1923, 1925 ve 1926 tarihlerini kaynakla kaydet.",
        "Kartın bir yüzüne biyografik olayları, diğer yüzüne Barla Lâhikası pasajını ve kendi açıklamanı yaz.",
        "Doğrulanmayan ‘iki kilim’ ayrıntısını tarihî bilgi kutusuna ekleme; doğrulama notu olarak ayır.",
      ],
    },
    takeaway: [
      "Bir hayat hikâyesini yer ve zamanla izleyebilirim.",
      "Benzetmeyi tarihî olayla karıştırmamalıyım.",
      "Bir yazarı tanırken kendi metnine de dönebilirim.",
      "Bilmediğim ayrıntıyı tamamlamak yerine kaynağını arayabilirim.",
    ],
    vocab: [
      { word: "Kronoloji", definition: "Olayları zaman sırasıyla gösterme." },
      { word: "Bağlam", definition: "Bir olayın veya sözün içinde bulunduğu şartlar." },
      { word: "Dellâl", definition: "Bir şeyi duyuran, tanıtan kişi." },
      { word: "Temsil", definition: "Bir düşünceyi benzetmeyle anlatma." },
      { word: "Mesele", definition: "Üzerinde düşünülen konu." },
    ],
    sources: [
      mealSource("Alak 96/1–5", 653),
      "Said Nursî, Barla Lâhikası (İstanbul: Şahdamar Yayınları, 2007), 255, “Yirmi Altıncı Mektub’un İkinci Mebhası’nın Âhiri”. Yerel PDF sayfası 259.",
      prizmaSource(8),
      historySource,
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
    subtitle: "Öğrendiğini bir üstünlük işaretinden ortak faydaya taşımak",
    readingMinutes: 10,
    sections: [
      prose(
        "Bilginin sende kaldığı an",
        "Bir grup ödevinde kaynak taramasını sen yaptın. Diğerleri bir grafiğin hangi veriyi gösterdiğini karıştırıyor. Doğru açıklamayı biliyorsun. Paylaştığında sunum düzelecek; paylaşmadığında son söz yine sana kalacak. Bu ders için kurulmuş durumda bilgi, yalnız kişisel başarıyla ilgili değildir. Başkasının çalışmasının doğruluğunu da etkiler.",
        "Bir şeyi bilmek, her konuda konuşmak zorunda olmak anlamına gelmez. Emin olmadığında ‘Bunu kontrol edelim’ demek de sorumlu bir davranıştır. Bildiğini paylaşmak ile yanlış bilgiyi kendinden emin bir sesle yaymak aynı şey değildir. Bilginin sorumluluğu, hem yardımcı olmayı hem sınırını bilmeyi içerir.",
        "Bediüzzaman’ı bu hafta yalnız güçlü hafızası üzerinden tanımayacağız. Öğrendiklerini hangi işe yönelttiğine bakacağız. Bir insanın çok şey hatırlaması ilgi çekici olabilir; fakat bilgiyi öğretime, araştırmaya ve insanların sorularına ayırması farklı bir dikkat gerektirir."
      ),
      prose(
        "Eğitim fikrinden yazıya",
        "Said Nursî’nin biyografisinde Van’daki okumaları ve din ilimleriyle diğer ilimlerin birlikte okutulmasını amaçlayan Medresetüzzehrâ projesi anlatılır. Daha sonraki yıllarında Risale-i Nur eserlerini yazması ve talebeler yetiştirmesi öne çıkar. Bu çizgi, bilgi arayışının eğitimle bağlantısını görmemize yardım eder.⁴",
        "Bu bilgileri üç basamaklı bir çizgiye yerleştirebiliriz: öğrenmek, bir eğitim ihtiyacını fark etmek ve çalışmayı başkalarının faydasına sunmak. Bu, hayatının bütün ayrıntılarını açıklayan tek bir şema değildir. Bugün biyografide izleyeceğimiz bağ budur. Nursî’nin kendi eserindeki cümleye geçerken artık olay anlatısından düşünce incelemesine geçiyoruz."
      ),
      ...verse(
        "Bakara 2/159–160",
        "إِنَّ الَّذِينَ يَكْتُمُونَ مَا أَنْزَلْنَا مِنَ الْبَيِّنَاتِ وَالْهُدَىٰ مِنْ بَعْدِ مَا بَيَّنَّاهُ لِلنَّاسِ فِي الْكِتَابِ أُولَٰئِكَ يَلْعَنُهُمُ اللَّهُ وَيَلْعَنُهُمُ اللَّاعِنُونَ ۝ إِلَّا الَّذِينَ تَابُوا وَأَصْلَحُوا وَبَيَّنُوا فَأُولَٰئِكَ أَتُوبُ عَلَيْهِمْ وَأَنَا التَّوَّابُ الرَّحِيمُ",
        "İnsanlar için biz kitapta açıkladıktan sonra, indirmiş olduğumuz aşikâr delilleri ve hidâyeti gizleyenler var ya, işte onlara Allah lânet ettiği gibi, Lânet edebilecek herkes de lânet eder. Ancak onlardan tövbe edip hallerini düzelten ve gerçekleri açıklayanlara gelince: Ben onların tövbelerini kabul ederim. Zira tövbeleri kabul eden, çok merhametli olan Ben’im.",
        "Âyetler, kitapta açıklanan delillerin ve hidâyetin gizlenmesini ele alır; ardından hatayı düzeltme ve açıklama yolunu gösterir. Buradaki ağır uyarıyı sınıfta cevap vermekte zorlanan öğrenciye yöneltmiyoruz. Dersimizin bağlantısı, açıklama sorumluluğu ve yanlış yaptığında düzeltme imkânıdır. *Hidâyet*, doğru yolu gösteren rehberliktir."
      ),
      quotation(
        "Risale-i Nur’dan — Muhakemat",
        "Birisinde, telâhuk-u efkâr tesir eder. Belki ona mütevakkıftır.",
        "2"
      ),
      prose(
        "Bu pasajı nasıl anlayabiliriz?",
        "Pasajın öncesinde meselelerin iki kısım olduğu söylenir. Seçtiğimiz cümle, bir bölümünde düşüncelerin birbirine eklenmesinin etkili olduğunu anlatır. *Telâhuk-u efkâr*, fikirlerin birbirine katılmasıdır. *Mütevakkıf*, bir şeye bağlı olmak demektir. Yazar bütün meselelerin aynı şekilde çözüleceğini ileri sürmüyor; farklı düşünme alanlarını ayırıyor.",
        "Bir araştırmada bir öğrenci veriyi toplar, diğeri tabloyu kontrol eder, üçüncüsü açıklamadaki boşluğu fark eder. Her katkının kaydı tutulduğunda ortak çalışma ilerler. Ders örneğimizde bilgi, arkadaşını susturmak için kullanılacak bir araç olmaktan çıkar. Kendi katkını açıkça belirtirken başkasının katkısına da yer açabilirsin.",
        "Sorumluluk, arkadaşının bütün işini onun yerine yapmak değildir. Kullandığın kaynağı göstermek, hatayı açıklamak ve öğrenmesine imkân bırakmak daha yararlı olabilir. Yardımın ardından onun kendi cümlesini kurmasına zaman tanımak, bilginin yalnız sende kalmasını önler."
      ),
      quotation(
        "Hocaefendi’nin eserinden — Sohbet Atmosferi",
        "Müslümanlığı amelî olarak yaşama, kalbde iman nurunun belirmesi daha ziyade insanın inandıklarını yaşamasına bağlıdır.",
        "3"
      ),
      prose(
        "Anlayışın davranışa geçtiği yer",
        "Gülen’in pasajında *amelî*, uygulamayla ilgili demektir. İnanç üzerine konuşmakla onu yaşayışa taşımak arasındaki bağa dikkat çekilir. Bu cümleyi bir arkadaşımızın imanını ölçmek için kullanmıyoruz. Kendi davranışımızda *tutarlılık* arıyoruz. Bilgiyi faydaya dönüştürmek, derste bu bağ üzerinde çalışabileceğimiz somut bir alandır.",
        "Nursî’nin pasajı fikirlerin ortaklaşmasını; Gülen’in pasajı anlaşılan düşüncenin yaşayışa geçmesini öne çıkarır. Bunları birleştirdiğimizde açıklama, dinleme ve düzeltme gibi küçük davranışlar belirir. Grup ödevindeki grafiği açıklayıp kaynağını göstermek bunlardan biridir. Bu hafta başarı ölçümüz her cevabı bilmek değil, seçtiğimiz katkıyı doğru ve anlaşılır biçimde sunabilmektir."
      ),
    ],
    discussionQuestions: [
      "Bildiğini paylaşmakla arkadaşının bütün işini onun yerine yapmak arasındaki fark nedir?",
      "Bir hatayı fark ettiğinde bilgiyi sorumluluğa dönüştüren davranış hangisi olabilir?",
    ],
    application: {
      title: "Bu haftanın uygulaması — Bilgiden katkıya",
      items: [
        "Bir grup çalışmasında bildiğin ve kaynağını gösterebildiğin tek bir bilgi seç.",
        "Bilgiyi iki cümleyle açıkla; arkadaşının kendi açıklamasını kurmasına zaman ver.",
        "Kartına katkını, kaynağını ve gerekirse yaptığın düzeltmeyi yaz; arkadaşını puanlama.",
      ],
    },
    takeaway: [
      "Bilgimi başkasının öğrenmesine yardım etmek için kullanabilirim.",
      "Emin olmadığım yerde sınırımı söyleyebilirim.",
      "Ortak çalışmada başkasının katkısını görünür kılabilirim.",
      "Yanlış aktardığım bilgiyi düzeltebilirim.",
    ],
    vocab: [
      { word: "Hidâyet", definition: "Doğru yolu gösteren rehberlik." },
      {
        word: "Telâhuk-u efkâr",
        definition: "Fikirlerin birbirine katılması, düşüncelerin birikmesi.",
      },
      { word: "Mütevakkıf", definition: "Bir şeye bağlı olan." },
      { word: "Amelî", definition: "Uygulama ve yaşayışla ilgili." },
      {
        word: "Tutarlılık",
        definition: "Söylenen düşünceyle yapılan işin birbirine uygun olması.",
      },
    ],
    sources: [
      mealSource("Bakara 2/159–160", 27),
      "Said Nursî, Muhakemat (İstanbul: Şahdamar Yayınları, 2007), 12, “Birinci Makale”. Yerel PDF sayfası 20; meselelerin iki türünü ayıran paragraftan bölüm.",
      "M. Fethullah Gülen, Sohbet Atmosferi (İstanbul: Nil Yayınları, 2015), yerel PDF sayfası 51. Basılı sayfa numarası doğrulanmadığı için PDF sayfası kullanılmıştır.",
      historySource,
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
    subtitle: "Bir metnin sorusunu kendi zamanının içinde görmek",
    readingMinutes: 10,
    sections: [
      prose(
        "Sorunun değişen dili",
        "Aynı inanç konusu farklı zamanlarda farklı kelimelerle sorulabilir. Bir insan, karşılaştığı bir doğa olayı üzerinden yaratılışı düşünür. Başka biri, çevrim içi izlediği bir iddianın dinle ilişkisini araştırır. Ortak bir konu vardır; fakat sorunun geliş yolu, dayandığı bilgi ve onu dile getiren kişinin ihtiyacı aynı olmayabilir. Muhatabı anlamadan hazır bir cevabı tekrarlamak, bu farkı gözden kaçırır.",
        "Ders için şöyle bir durum düşünelim. Bir arkadaşın bir videodaki bilimsel iddiadan sonra inançla ilgili kararsızlığını anlatıyor. Önce videonun gerçekten ne söylediğini birlikte belirliyorsunuz. Bilimsel açıklamanın doğruluğunu ilgili kaynakla, ona eklenen felsefî yorumu kendi gerekçeleriyle inceliyorsunuz. Arkadaşının sorusunu kendininkine benzetip değiştirmeden dinlemek, düşünme işinin başlangıcı oluyor.",
        "Bu hafta Bediüzzaman’ın bütün cevaplarını öğrenmeye çalışmayacağız. Onun hangi ihtiyaçlara yöneldiğini ve bir metnin bu ihtiyaçla nasıl bağ kurduğunu inceleyeceğiz. Tarihî bir yazarın sorusuyla bugünkü sorumuzu karşılaştırabiliriz; ikisini aynı kabul etmek için acele etmemeliyiz."
      ),
      prose(
        "Dönem, ihtiyaç ve metin",
        "Said Nursî’nin hayatı Osmanlı’nın son döneminden Cumhuriyet dönemine uzanır. Biyografisinde eğitim, savaş, esaret ve Barla’daki yazı çalışmaları anlatılır; iman konularındaki materyalizm eleştirisi de açıklanır.⁴ Bu çerçeve, dönemin bütün insanlarını tek görüşe indirgemez.",
        "Bir dönemde yaygın olan düşünceyi *fikrî akım* diye adlandırabiliriz. Böyle bir akımın adını bilmek, ona yöneltilen eleştirinin nedenini kavramaya yetmez. Kaynakta hangi iddianın ele alındığını, yazarın nasıl cevap verdiğini ve hangi kavramları kullandığını ayırmak gerekir. Bir biyografi bize çalışma şartlarını gösterir; cevabın yapısını görmek için doğrudan metne geçeriz."
      ),
      ...verse(
        "Nahl 16/125",
        "ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ وَجَادِلْهُمْ بِالَّتِي هِيَ أَحْسَنُ إِنَّ رَبَّكَ هُوَ أَعْلَمُ بِمَنْ ضَلَّ عَنْ سَبِيلِهِ وَهُوَ أَعْلَمُ بِالْمُهْتَدِينَ",
        "Sen insanları Allah yoluna hikmetle, güzel ve makul öğütlerle dâvet et, gerektiği zaman da onlarla en güzel tarzda mücadele et! Rabbin, elbette, yolundan sapanları en iyi bildiği gibi kimlerin doğru yola geleceğini de pek iyi bilir.",
        "Âyet, anlatımın içeriği kadar yoluna da dikkat çeker. *Hikmet*, yerinde ve isabetli bir anlayışla hareket etmeyi içerir. En güzel tarzda konuşmak, soruyu küçümsememeyi ve karşıdakini dinlemeyi düşündürür. Dersimizde bir görüşü incelemek, onu soran kişiyi etiketleme hakkı vermez."
      ),
      quotation(
        "Risale-i Nur’dan — Mesnevî-i Nuriye",
        "Çünkü bu risale, dehşetli bir zamanda nefsimin hücumuna karşı yapılan âni ve irticalî bir münakaşadır.",
        "2"
      ),
      prose(
        "Bu pasajı nasıl anlayabiliriz?",
        "Yazar, bu girişte kendi metninin oluşma şartlarını anlatır. *İrticalî*, önceden hazırlanmış bir konuşma düzeni olmadan o anda ortaya çıkan demektir. *Münakaşa*, burada düşünceler arasındaki tartışmayı anlatır. Pasaj, soruların yalnız dışarıdan gelmediğini; yazarın kendi iç mücadelesinin de yazıyla ilişkili olduğunu görmemizi sağlar.",
        "Bu cümleden Risale-i Nur’un bütün bölümlerinin aynı biçimde yazıldığı sonucunu çıkarmıyoruz. Seçtiğimiz eserin girişinde anlatılan özel bir bağlam var. Okumada bu sınıra dikkat etmek, yazarı tanımayı daha sağlam hâle getirir. Onun kendi ifadesiyle bizim geniş yorumumuz ayrı kalır.",
        "Bir öğrencinin zihnindeki tereddüt de dışarıdan kolayca görülemeyebilir. Hazır bir açıklama vermeden önce hangi kavramı anlamadığını fark etmek yararlıdır. Dinlemek, cevaptan vazgeçmek değildir; cevabın gerçek soruyla buluşmasını sağlamaktır. Kaynak incelemesinde de önce cümlenin hangi ihtiyaca karşılık geldiğini belirliyoruz."
      ),
      quotation(
        "Hocaefendi’nin eserinden — Zihin Harmanı",
        "Ben, halkın yapısına tercüman olan bu soruları saygıyla karşılıyorum.",
        "3"
      ),
      prose(
        "Soruyu ciddiye almak",
        "Gülen, giriş bölümünde farklı seviyelerde gelen sorulara aynı saygıyla yaklaşmayı önerir. *Muhatap*, sözün yöneldiği kişidir. Bir sorunun bize basit veya zor gelmesi, onu soranın öğrenme ihtiyacını azaltmaz. Bir öğrencinin sorusunu yeniden kendi kelimelerinle söyleyip onun anlatımına uygun olup olmadığını kontrol etmek bu saygının günlük karşılığı olabilir.",
        "Nursî’nin pasajı yazının bir düşünme ihtiyacından doğmasını; Gülen’in pasajı muhatabın sorusunu ciddiye almayı görünür kılar. Bu iki dikkat birlikte, eski metni ezberlenen cevapların deposu olarak görmemizi önler. Bugünkü soruyu açıkça yazıp eski metnin gerçekten hangi kısmıyla ilişki kurduğunu gösterebiliriz. İlişki kuramadığımız bir yerde bunu söylemek de okumanın parçasıdır."
      ),
    ],
    discussionQuestions: [
      "Tarihî bir metnin ele aldığı soruyla bugünkü sorumuzu karşılaştırırken hangi farklara dikkat etmeliyiz?",
      "Bir soruyu saygıyla dinlemek, vereceğimiz açıklamayı nasıl değiştirebilir?",
    ],
    application: {
      title: "Bu haftanın uygulaması — Soru ve bağlam kartı",
      items: [
        "Günlük hayatta karşılaşabileceğin bir inanç sorusunu, kimseye ait özel bir konuşmayı ifşa etmeden yaz.",
        "Mesnevî pasajında yazarın anlattığı ihtiyacı ayrı bir kutuda göster.",
        "İki kutu arasında bir ortak nokta ve bir fark belirt; metnin söylemediği cevabı ona nispet etme.",
      ],
    },
    takeaway: [
      "Bir soruyu sahibinin anlatımıyla anlamaya çalışabilirim.",
      "Yazarın zamanı ile kendi zamanım arasında farkları görebilirim.",
      "Bilimsel açıklama ile ona eklenen yorumu ayırabilirim.",
      "Anlamadığım soruya hazır cevap vermeden kaynak arayabilirim.",
    ],
    vocab: [
      { word: "Fikrî akım", definition: "Belirli görüşler etrafında gelişen düşünce yönelimi." },
      { word: "Hikmet", definition: "Yerinde, isabetli anlayış ve davranış." },
      {
        word: "İrticalî",
        definition: "Önceden hazırlanmış bir düzen olmadan o anda ortaya çıkan.",
      },
      { word: "Münakaşa", definition: "Bir konu üzerindeki tartışma." },
      { word: "Muhatap", definition: "Sözün veya açıklamanın yöneldiği kişi." },
    ],
    sources: [
      mealSource("Nahl 16/125", 288),
      "Said Nursî, Mesnevî-i Nuriye, çev. Abdülmecid Nursî (İstanbul: Şahdamar Yayınları, 2007), “İ’tizar”, yerel PDF sayfası 78.",
      prizmaSource(7),
      historySource,
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
    subtitle: "İddia, gerekçe ve temsilin yerini belirlemek",
    readingMinutes: 10,
    sections: [
      prose(
        "İkna olmak ve gerekçeyi görmek",
        "Bir fikri, güvendiğin bir insan söylediği için benimseyebilirsin. Daha sonra onun gerekçesini de görmek istersin. Bu talep, konuşanı değersizleştirmez. Düşünceyi hangi bağlantılar üzerinden kabul ettiğini anlamaya yardım eder. İman konularını incelerken de iddianın yanında dayanağına, kavramlarına ve akıl yürütmesine dikkat edebiliriz.",
        "Ders için bir örnek kuralım. Arkadaşın, düzenli bir kütüphaneyi planlı çalışma için örnek gösteriyor. Bu benzetme sana fikri yakınlaştırabilir. Ancak kütüphanenin düzeniyle üzerinde konuşulan başka bir düzen arasında hangi yönlerin benzediği ayrıca açıklanmalıdır. Benzetmenin etkileyici olması, bütün bağlantıları kendiliğinden kurmaz. Bu ayrımı fark etmek okumanın değerini azaltmaz; düşünceyi daha dikkatle incelemeyi sağlar.",
        "Bediüzzaman’ın eserleriyle tanışırken bugün bir iman meselesinin bütün delillerini çözmeyeceğiz. Önce metni incelemek için gerekli birkaç ayrımı öğreneceğiz. Bir yazarın amacı, ileri sürdüğü düşünce ve bu düşünceyi anlatmak için kullandığı örnek aynı kutuya konduğunda hangi parçanın hangi işi yaptığını göremeyiz."
      ),
      prose(
        "Bir düşünme yöntemini tanımak",
        "TDV biyografisi, Said Nursî’nin iman meselelerinde delillere önem verdiğini ve tabiatta gördüğü gaye ile düzen üzerinde durduğunu belirtir.⁴ Bu, onun yaklaşımını tanımak için bir çerçevedir. Belirli bir delili değerlendirmek için ise o delilin kurulduğu metni okumamız gerekir. Yazarın hayatındaki zorluklar, düşüncesinin gerekçesinin yerine geçmez.",
        "Bir metinde önce *iddia*, yani savunulan düşünce bulunur. Sonra onun *gerekçe*si, niçin kabul edilmesi istendiği açıklanır. Bazen bir *temsil*, soyut ilişkiyi görünür kılmak için eklenir. Okurken bu parçaları farklı renklerle işaretleyebiliriz. Bir renk diğerinin yerini doldurmaz. Metinde açıkça bulunmayan ara bağlantıyı kendi yorumumuz olarak belirtmek gerekir."
      ),
      ...verse(
        "İbrâhîm 14/52",
        "هَٰذَا بَلَاغٌ لِلنَّاسِ وَلِيُنْذَرُوا بِهِ وَلِيَعْلَمُوا أَنَّمَا هُوَ إِلَٰهٌ وَاحِدٌ وَلِيَذَّكَّرَ أُولُو الْأَلْبَابِ",
        "İşte bu Kur’ân insanlara beliğ bir tebliğdir, ta ki onunla uyarılsınlar, ta ki Allah’ın tek İlah olduğunu bilsinler. Ve ta ki aklı ve vicdanı temiz olanlar, düşünüp ders alsınlar...",
        "Âyet, bildirme, bilme ve düşünüp ders alma arasında bağ kurar. *Tebliğ*, bir mesajı ulaştırmaktır. Burada Kur’an’ın çağrısını okuyoruz; ardından bir yazarın bu çağrı üzerine kurduğu düşünceyi inceliyoruz. Âyetle yazarın açıklamasını ayrı tutmak, her metnin konumunu korur."
      ),
      quotation(
        "Risale-i Nur’dan — Muhakemat",
        "Muvâzenesiz ve mizansız olan çok aldanır, aldatır.",
        "2"
      ),
      prose(
        "Bu pasajı nasıl anlayabiliriz?",
        "Bu kısa cümle, On İkinci Mukaddime’de hakikat, hayal, ölçü ve aşırılıklar üzerinde duran paragraftandır. *Muvâzene*, denge ve karşılaştırma; *mizan*, ölçü demektir. Yazarın uyarısı, düşünürken ölçüsüz davranmanın hem kişinin kendisini hem başkasını yanıltabileceğini hatırlatır. Bir düşünceyi sevdiğimiz için gerekçesini incelemeden aktarabiliriz. Tam tersine, hoşumuza gitmediği için okumadan reddedebiliriz.",
        "Dersimizin çıkarımı şudur: Önce cümlenin neyi savunduğunu doğru aktaralım. Sonra kullanılan gerekçenin o iddiayla ilişkisini gösterelim. Bir örneğin yalnız açıklayıcı olduğu yerde onu tek başına kesin ispat diye sunmayalım. Bu adımlar, yazara karşı dikkati de kendi muhakememize karşı dürüstlüğü de korur.",
        "*Delil*, bir iddiayı desteklemek için gösterilen dayanaktır. Delilin türü konuya göre değişebilir. Bir tarihî olay için belge ve rivayet; bir matematik önermesi için ilgili akıl yürütme gerekir. Bu derste bütün alanlara tek ölçü dayatmıyoruz. Seçtiğimiz kaynakta hangi dayanağın kullanıldığını ve neyi desteklediğini görünür kılıyoruz."
      ),
      quotation(
        "Hocaefendi’nin eserinden — Zihin Harmanı",
        "Müslümanın soru sorup bunlara cevaplar araması ayrı mesele, bunları kavraması ayrı bir meseledir.",
        "3"
      ),
      prose(
        "Cevabı bulduktan sonra",
        "Gülen, bu cümlenin ardından kavramanın araştırmayla ilişkisini anlatır. Cevabın yerini bulmakla onun düşünme yapısını görmek arasındaki fark önemlidir. Bir açıklamayı ezberden söyleyebilirsin; fakat bağlantısını göstermek için kendi cümlelerini kurman gerekir. Kaynak cümlesini değiştirmeden aktarmak ve yorumunu ayrı yazmak bu çalışmanın iki parçasıdır.",
        "Nursî’nin pasajındaki ölçü çağrısı ile Gülen’in kavrama vurgusu, okuma kartımızda birleşiyor. Kartın ilk satırına yazarın cümlesi, ikinci satırına bizim açıklamamız, üçüncü satırına bu açıklamayı nasıl kurduğumuz gelecek. Bir benzetme eklediğimizde onun sınırını da yazacağız. Böylece metne duyduğumuz yakınlık, metni inceleyen bir emeğe dönüşecek."
      ),
    ],
    discussionQuestions: [
      "Bir temsilin açıklamaya yardım etmesiyle bir iddiayı ispat etmesi arasındaki fark nedir?",
      "Bir cevabı kavradığımızı göstermek için ezberden söylemenin ötesinde ne yapabiliriz?",
    ],
    application: {
      title: "Bu haftanın uygulaması — İddia, gerekçe, örnek",
      items: [
        "Muhakemat pasajını aynen yaz; altına kendi açıklamanı ekle.",
        "Dersin kütüphane örneğinde iddiayı, gerekçeyi ve temsili ayrı satırlarda göster.",
        "Temsilin yardım ettiği bir yönü ve açıklamadığı bir yönü belirt; kendi örneğini yazarın sözü olarak sunma.",
      ],
    },
    takeaway: [
      "Bir düşünceyi dayanağıyla birlikte okumaya çalışabilirim.",
      "Temsilin neyi açıkladığını ve sınırını gösterebilirim.",
      "Sevdiğim bir görüşün gerekçesini de inceleyebilirim.",
      "Kaynak cümlesiyle kendi muhakememi ayırabilirim.",
    ],
    vocab: [
      { word: "İddia", definition: "Doğru olduğu savunulan düşünce." },
      { word: "Gerekçe", definition: "Bir düşüncenin niçin kabul edildiğini açıklayan neden." },
      { word: "Temsil", definition: "Bir fikri örnek veya benzetmeyle anlatma." },
      { word: "Tebliğ", definition: "Bir mesajı ulaştırma." },
      { word: "Muvâzene", definition: "Denge, karşılaştırma." },
      { word: "Mizan", definition: "Ölçü." },
      { word: "Delil", definition: "Bir iddiayı desteklemek için gösterilen dayanak." },
    ],
    sources: [
      mealSource("İbrâhîm 14/52", 269),
      "Said Nursî, Muhakemat (İstanbul: Şahdamar Yayınları, 2007), 35, “On İkinci Mukaddime”. Yerel PDF sayfası 43.",
      prizmaSource(8),
      historySource,
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
    subtitle: "Değişen yöntemler içinde devam eden amacı izlemek",
    readingMinutes: 10,
    sections: [
      prose(
        "Bir hayatı tek cümleye sığdırmadan",
        "Üniversiteye geçişi düşünürken dersler, meslek seçenekleri, aile ilişkileri ve toplumsal sorumluluklar aynı anda önüne gelir. Bu alanların hepsinin aynı işi yapması gerekmez. Yine de kararlarında hangi ölçülere başvurduğunu görmek, parçaların birbirini nasıl etkilediğini anlamana yardım eder. Hayatın merkezi üzerine düşünmek, bütün seçenekleri bugün kesinleştirmek değildir.",
        "Ders için bir örnek kuralım. Bir öğrenci hem akademik başarıyı hem faydalı bir çalışma yapmayı önemsiyor. Gönüllü bir işe katıldığında verdiği sözleri tutmaya, sınava hazırlandığında da grup arkadaşının hakkını korumaya çalışıyor. Ortak değer, farklı işlerde farklı biçimde görünür oluyor. Bütün zamanını tek bir etkinliğe vermeden de kararlar arasında bağlantı kurulabilir.",
        "Bir tarihî kişiyi okurken benzer bir dikkat gerekir. Hayatındaki her olayı tek bir açıklamaya indirgemek, değişimleri görünmez yapar. Buna karşılık yalnız olay listesi çıkarmak da uzun süre devam eden amacı göstermeyebilir. Bediüzzaman’ın hayatında zaman, yöntem ve amaç sütunlarını birlikte okuyacağız."
      ),
      prose(
        "Üç dönem, değişen çalışma yolları",
        "TDV biyografisi, Said Nursî’nin kendi hayatını Eski Said, Yeni Said ve Üçüncü Said diye ayırdığını aktarır. Bu ayırımın hizmet yöntemleriyle ilgili olduğunu da belirtir. Eğitim girişimleri, sonraki yazı ve talebe çalışmaları, son dönemde insanlarla görüşmeleri farklı çalışma yollarını gösterir.⁴ Bu, sınırlı bir çerçevedir.",
        "Dönemleri bir *kronoloji* çizgisine yerleştirirken amaç ile yöntemi ayıralım. Eğitim projesi bir yöntem olabilir; yazı yoluyla açıklama başka bir yöntemdir. Ortak yönü göstermek, bu iki çalışmanın aynı şartlarda gerçekleştiğini iddia etmek değildir. Değişen şartlar, devam eden bir niyetin farklı biçimlerde görünmesine yol açabilir.",
        "Yazarın kendi amaç cümlesi de tek başına bütün davranışlarının ölçüsü sayılamaz. Onu biyografik bilgi ve metinlerle birlikte okumak gerekir. Bir kişiye saygı duymak, hayatının karmaşıklığını silmeyi gerektirmez. Bu hafta bağlılık duyulan amaç ile o amacın günlük kararları nasıl etkileyebileceği üzerinde duruyoruz."
      ),
      ...verse(
        "En’âm 6/162–163",
        "قُلْ إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ ۝ لَا شَرِيكَ لَهُ وَبِذَٰلِكَ أُمِرْتُ وَأَنَا أَوَّلُ الْمُسْلِمِينَ",
        "De ki: “Benim namazım da, her türlü ibadetlerim de, hayatım da ölümüm de hep Rabbülalemin olan Allah’a aittir. Eşi ortağı yoktur O’nun. Bana verilen emir budur. O’na ilk teslim olan da benim.",
        "Planda En’âm 6/162 yer alır. Suat Yıldırım bu âyeti 163 ile birlikte çevirdiği için meal bütünlüğü korunarak ikisi birlikte verilmiştir. İbadet, hayat ve ölüm aynı yöneliş içinde anılır. Bu bütünlüğü, her işin birbirine benzemesi olarak okumuyoruz; farklı alanlarda Allah’a karşı sorumluluğun gözetilmesini düşünüyoruz."
      ),
      quotation("Risale-i Nur’dan — Lem’alar", "Amelinizde rızâ-yı ilâhî olmalı.", "2"),
      prose(
        "Bu pasajı nasıl anlayabiliriz?",
        "Yirmi Birinci Lem’a’da bu cümle ilk düstur olarak yer alır. *Amel*, yapılan iş; *rızâ-yı ilâhî*, Allah’ın hoşnutluğudur. *Düstur*, davranışa yön veren ilkedir. Pasaj bir hizmetin hangi amaçla yapıldığını merkeze alır. Takdir edilmek, başarılı olmak veya görünür olmak gibi beklentilerle karşılaşan kişinin yönelişini gözden geçirmesini sağlar.",
        "Bir merkez seçmek, başkalarının hakkını göz ardı etme veya eleştiriyi hiç dinlememe yetkisi vermez. İyi bir amaç, kullanılan her yöntemi kendiliğinden iyi yapmaz. Grup çalışmasında faydalı bir sonuç isterken arkadaşının emeğini sahiplenmek, amaç ile davranış arasındaki bağı zayıflatır. Dersimizde ilkeyi, somut bir kararın niteliğiyle birlikte inceleyeceğiz.",
        "Üniversite hedefini belirlerken de yalnız kazanacağın unvanı değil, nasıl çalışacağını ve hangi sorumlulukları sürdüreceğini düşünebilirsin. Bu, her öğrencinin aynı mesleği veya aynı hayat planını seçmesi anlamına gelmez. Bir ilkenin farklı tercihlerde nasıl görünür olduğunu açıklayabilmek daha anlamlıdır."
      ),
      quotation(
        "Hocaefendi’nin eserinden — Sohbet Atmosferi",
        "Müslümanlığı amelî olarak yaşama, kalbde iman nurunun belirmesi daha ziyade insanın inandıklarını yaşamasına bağlıdır.",
        "3"
      ),
      prose(
        "Merkez ile yaşayış arasındaki bağ",
        "Gülen’in cümlesi, inanılan düşüncenin *amelî*, yani yaşanan yönünü vurgular. Bir hayat amacı yalnız yazılı bir niyet olarak kaldığında onun kararlarla ilişkisini göremeyiz. Bir işi planlamak, verilen sözü yerine getirmek ve yanlış bir adımı düzeltmek bu ilişkinin gözlenebilir örnekleridir. Burada kişilerin inancını ölçmüyoruz; kendi kararımızın açıklanabilirliğini inceliyoruz.",
        "Nursî’nin pasajı işin yöneldiği amacı, Gülen’in pasajı bu yönelişin yaşayışa geçmesini öne çıkarır. Birlikte okunduğunda ‘amacım’ ve ‘bu hafta yapacağım iş’ arasında bir köprü kuruluyor. Köprünün sağlamlığı için davranışın başkasının hakkını nasıl etkilediğini de yazabiliriz. Biyografi çalışmamız böylece kişiyi öven bir portreden, amaç ile yöntem ilişkisini inceleyen bir okumaya dönüşür."
      ),
    ],
    discussionQuestions: [
      "Bir hayatın farklı dönemlerinde yöntem değişirken amaç nasıl devam edebilir?",
      "İyi bir amacı, kullandığımız yöntemin ve başkalarının hakkının değerlendirilmesiyle nasıl birlikte düşünebiliriz?",
    ],
    application: {
      title: "Bu haftanın uygulaması — Amaç, yöntem, hak",
      items: [
        "Biyografiden iki çalışma biçimi seç; zamanını, yöntemini ve ortak amacını ayrı sütunlarda kaynakla göster.",
        "Kendi üniversite veya çalışma hedefinden tek bir karar seç; bu kararın dayandığı ilkeyi yaz.",
        "Bu hafta atabileceğin bir adımı ve başkasının hakkını korumak için gözettiğin sınırı ekle.",
      ],
    },
    takeaway: [
      "Bir hayatın devam eden amacıyla değişen yöntemlerini birlikte okuyabilirim.",
      "İlkemi somut bir kararla ilişkilendirebilirim.",
      "İyi bir amaçla birlikte yöntemin doğruluğunu da gözetebilirim.",
      "Kendi planımda başkasının hakkına yer açabilirim.",
    ],
    vocab: [
      { word: "Kronoloji", definition: "Olayları zaman sırasına yerleştirme." },
      { word: "Amel", definition: "Yapılan iş, davranış." },
      { word: "Rızâ-yı ilâhî", definition: "Allah’ın hoşnutluğu." },
      { word: "Düstur", definition: "Davranışa yön veren ilke." },
      { word: "Amelî", definition: "Yaşayış ve uygulamayla ilgili." },
      { word: "Yöntem", definition: "Bir amaca ulaşmak için izlenen çalışma yolu." },
    ],
    sources: [
      mealSource("En’âm 6/162–163", 155),
      "Said Nursî, Lem’alar (İstanbul: Şahdamar Yayınları, 2007), 200, “Yirmi Birinci Lem’a”, “Birinci Düsturunuz”. Yerel PDF sayfası 220.",
      "M. Fethullah Gülen, Sohbet Atmosferi (İstanbul: Nil Yayınları, 2015), yerel PDF sayfası 51. Basılı sayfa numarası doğrulanmadığı için PDF sayfası kullanılmıştır.",
      historySource,
    ],
  },
];

export const secondWeekKonuItems = drafts.map(createLesson);

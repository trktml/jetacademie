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

function makeAdabEntryId(
  month: number,
  week: number,
  grade: number = 1,
  isExtra: boolean = false,
  extraOrder?: number
): string {
  const prefix = grade === 1 ? "" : `g${grade}-`;
  if (isExtra) {
    return `${prefix}adab-i-muaseret-extra-${extraOrder ?? 1}`;
  }
  const monthSlug = monthSlugs[month] ?? `m${month}`;
  return `${prefix}adab-i-muaseret-${monthSlug}-${week}`;
}

export interface AdabCurriculumItem {
  weekNumber: number;
  unit: string;
  topic: string;
  title: string;
  body: string;
  pdfUrl?: string;
  pageCount?: number;
}

/**
 * Ortaokul (1., 2. ve 3. Sınıflar) için 30 haftalık Adab-ı Muaşeret müfredatı
 * Kaynak: Peygamber Efendimizin Sünnetleri - Gül Gibi Hayat (Muştu Yayınları)
 * Her hafta 3 görsel / sayfa içerecek şekilde modüler PDF'lere bölünmüştür.
 */
export const ortaokulAdabCurriculum: readonly AdabCurriculumItem[] = [
  {
    weekNumber: 1,
    unit: "Âdâb-ı Muaşeret",
    topic: "Ahdinde Durmak, Dostu Aramak ve Kusurları Örtmek",
    title: "Âdâb-ı Muaşeret — Ahdinde Durmak, Dostu Aramak ve Kusurları Örtmek",
    body: "• Peygamber Efendimiz ahdinde durur, vaadinde sadık olur, sözünden asla caymazdı.\n• Dostlarını sık sık arar, hâl ve hatırlarını sorardı.\n• İnsanların kusurlarını yüzüne vurmaz; ikaz ve hatırlatmaları genele söylerdi.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-01.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 2,
    unit: "Âdâb-ı Muaşeret",
    topic: "Hediyeleşmek ve Selâmı Yaymak",
    title: "Âdâb-ı Muaşeret — Hediyeleşmek ve Selâmı Yaymak",
    body: "• Peygamber Efendimiz gelen hediyeleri kabul eder; hediyenin aynısıyla veya daha güzeliyle karşılık verirdi.\n• İnsanlar arasında sevgi ve muhabbetin yayılması için selâm vermeyi ve almayı teşvik ederdi.\n• Eve girince selâm verirdi; ev boş olsa dahi selâm vermeyi ihmal etmezdi.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-02.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 3,
    unit: "Âdâb-ı Muaşeret",
    topic: "Şaka Âdâbı, Hitaba Yönelmek ve Tebessüm",
    title: "Âdâb-ı Muaşeret — Şaka Âdâbı, Hitaba Yönelmek ve Tebessüm",
    body: "• Peygamberimiz şaka yaparken bile daima doğru konuşur, haktan ve nezaketten ayrılmazdı.\n• Kendisine seslenildiğinde sadece başıyla değil, bütün vücuduyla yönelerek muhatabına tam değer verirdi.\n• Rahatsız edici ölçüde kahkahayla gülmez; O’nun gülmesi daima vakur ve nurlu bir tebessümdü.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-03.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 4,
    unit: "Âdâb-ı Muaşeret",
    topic: "Misafirlik, Temizlik ve Hayırlı İşlere Sağla Başlamak",
    title: "Âdâb-ı Muaşeret — Misafirlik, Temizlik ve Hayırlı İşlere Sağla Başlamak",
    body: "• Peygamberimiz misafirlerini kapıda hürmetle karşılar ve ayrılırken kapıya kadar bizzat uğurlardı.\n• Tuvalete girerken sol ayakla girer, çıkarken sağ ayakla çıkardı.\n• Hayırlı ve temiz işleri sağ eliyle yapar; hayırlı ve güzel yerlere önce sağ ayağıyla girerdi.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-04.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 5,
    unit: "Âdâb-ı Muaşeret",
    topic: "Yürüyüş Âdâbı, Ev Halkına Selâm ve Musâfaha",
    title: "Âdâb-ı Muaşeret — Yürüyüş Âdâbı, Ev Halkına Selâm ve Musâfaha",
    body: "• Peygamberimiz önüne bakarak yürür; yolda ilerlerken etrafı rahatsız edecek şekilde sağa sola bakınmazdı.\n• Eve girince ilk önce ev halkına selâm verirdi.\n• Selâmla birlikte tebessüm ederek samimiyetle musâfahada bulunur, hâl hatır sorardı.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-05.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 6,
    unit: "Âdâb-ı Muaşeret",
    topic: "Kucaklaşmak, Musâfaha İnceliği ve Söz Taşımamak",
    title: "Âdâb-ı Muaşeret — Kucaklaşmak, Musâfaha İnceliği ve Söz Taşımamak",
    body: "• Musâfaha ile birlikte hürmet, samimiyet ve şefkate vesile olan içten kucaklaşmalarda bulunurdu.\n• Musâfahada karşı taraf elini çekmedikçe elini çekmez; muhatabına değer verdiğini hissettirirdi.\n• Kendisine başkalarının aleyhinde söz ve dedikodu taşınmasından hoşlanmaz, buna engel olurdu.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-06.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 7,
    unit: "Âdâb-ı Muaşeret",
    topic: "Tefekkür, Tane Tane Konuşmak ve Allah İçin Öfke",
    title: "Âdâb-ı Muaşeret — Tefekkür, Tane Tane Konuşmak ve Allah İçin Öfke",
    body: "• Peygamberimiz çoğu zaman susup tefekkür eder, ancak ihtiyaç olduğunda hayırlı sözler konuşurdu.\n• Tane tane ve orta bir ses tonuyla konuşur; dinleyenin ezberleyebileceği netlikte hitap ederdi.\n• Kendi nefsi ve dünyalık şeyler için asla öfkelenmez, yalnızca hak çiğnendiğinde Allah için celallenirdi.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-07.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 8,
    unit: "Âdâb-ı Muaşeret",
    topic: "Kavmiyetçilikten Kaçınmak, Temizlik ve Esneme Âdâbı",
    title: "Âdâb-ı Muaşeret — Kavmiyetçilikten Kaçınmak, Temizlik ve Esneme Âdâbı",
    body: "• Irkçılık ve kavmiyetçilik yapanları sevmez; hiçbir milletin diğerine üstünlük taslayamayacağını vurgulardı.\n• Beden, elbise ve çevre temizliğine her zaman en üst seviyede özen gösterirdi.\n• Namazda veya toplumda esneme gelirse ağzı kapatmayı tavsiye eder, dikkatsiz esnemekten sakındırırdı.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-08.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 9,
    unit: "Âdâb-ı Muaşeret",
    topic: "Kapı Çalma Âdâbı, Hasta Ziyareti ve Güzel Koku",
    title: "Âdâb-ı Muaşeret — Kapı Çalma Âdâbı, Hasta Ziyareti ve Güzel Koku",
    body: "• Bir eve gittiğinde kapıyı üç defa çalar, cevap verilmezse ayrılır; kapının tam karşısında durup içeriyi gözetlemezdi.\n• Hasta akraba ve dostlarını ziyaret eder, onlara ümit verir ve ziyareti uzatıp rahatsızlık vermezdi.\n• Ağır olmayan ferahlatıcı güzel kokuları ve çiçek ikramlarını geri çevirmezdi.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-09.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 10,
    unit: "Âdâb-ı Muaşeret",
    topic: "Vakarla Yürümek, Kişisel Bakım ve Kötü Sözden Sakınmak",
    title: "Âdâb-ı Muaşeret — Vakarla Yürümek, Kişisel Bakım ve Kötü Sözden Sakınmak",
    body: "• Vakar ve sükûnetle, ayaklarını yere sürtüp gürültü çıkarmadan dikkatle yürürdü.\n• Ayna, tarak, misvak gibi kişisel bakım gereçlerini zaman zaman yanında bulundururdu.\n• Kötü ve kaba söz söyleme ihtimali olan ortamlardan ve kişilerden uzak dururdu.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-10.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 11,
    unit: "Âdâb-ı Muaşeret",
    topic: "Beden Artıklarını Korumak, Öfkeyi Yatıştırmak ve Tırnak Bakımı",
    title: "Âdâb-ı Muaşeret — Beden Artıklarını Korumak, Öfkeyi Yatıştırmak ve Tırnak Bakımı",
    body: "• Kendisine ait saç, tırnak gibi beden parçalarını ayakaltı yerlere atmaz, uygun şekilde defneder veya kaldırırdı.\n• Öfkelenildiğinde ayaktaysa oturmayı, oturuyorsa uzanmayı veya abdest almayı tavsiye ederdi.\n• Tırnaklarını genellikle cuma günleri düzenli olarak keserdi.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-11.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 12,
    unit: "Âdâb-ı Muaşeret",
    topic: "Ayakkabı Kontrolü, Tertip ve Temiz Giyim",
    title: "Âdâb-ı Muaşeret — Ayakkabı Kontrolü, Tertip ve Temiz Giyim",
    body: "• Ayakkabısını giymeden önce içine bakar veya ters çevirerek yabancı cisim ve böceklerden korurdu.\n• Yaşadığı mekânda düzen ve tertibe çok önem verir, Müslümanlara da dağınıklıktan kaçınmayı öğütlerdi.\n• Elbisesinin temiz ve tertipli olmasına titizlik gösterir, sade ve uyumlu giyinirdi.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-12.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 13,
    unit: "Âdâb-ı Muaşeret",
    topic: "Lüksten Kaçınmak, Komşuluk Hakları ve Vefakârlık",
    title: "Âdâb-ı Muaşeret — Lüksten Kaçınmak, Komşuluk Hakları ve Vefakârlık",
    body: "• Elbisesiyle övünmez, kıyafette gösteriş ve israftan kaçınarak sade kalmayı tercih ederdi.\n• Komşuluk ilişkilerine büyük önem verir, komşularını düzenli olarak ziyaret edip hâllerini sorardı.\n• Kendisine ve ashabına iyiliği dokunan hiç kimseyi unutmaz, ömür boyu vefakâr davranırdı.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-13.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 14,
    unit: "Âdâb-ı Muaşeret",
    topic: "Aksırma Âdâbı ve Güzel Koku Sürünmek",
    title: "Âdâb-ı Muaşeret — Aksırma Âdâbı ve Güzel Koku Sürünmek",
    body: "• Aksırınca “Elhamdülillâh” der, bunu işitenin “Yerhamükellâh”, kendisinin de “Yehdînâ ve yehdîkümullâh” demesini tavsiye ederdi.\n• Aksırdığı zaman eliyle veya mendille ağzını kapatır, sesini yükseltmemeye özen gösterirdi.\n• Güzel kokular sürünür ve temiz kokmayı çevresindekilere de tavsiye ederdi.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-14.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 15,
    unit: "Âdâb-ı Muaşeret & Şefkat",
    topic: "Hayırlı Alışveriş, Anne Babaya İhsan ve İtaat",
    title: "Âdâb-ı Muaşeret & Şefkat — Hayırlı Alışveriş, Anne Babaya İhsan ve İtaat",
    body: "• Alışverişe ve her hayırlı işe besmeleyle başlar, alışverişi sağ elle dürüstçe yapardı.\n• “Cennet anaların ayakları altındadır” buyurarak anne babaya ihsanda bulunmayı ve hayır dualarını almayı tavsiye ederdi.\n• Anne babanın meşru isteklerine itaat etmeyi, onların kalbini asla kırmamayı öğütlerdi.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-15.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 16,
    unit: "Şefkat",
    topic: "Çocuklara Merhamet, Sözünde Durmak ve Yardımseverlik",
    title: "Şefkat — Çocuklara Merhamet, Sözünde Durmak ve Yardımseverlik",
    body: "• Çocuklara karşı son derece merhametli davranır, başlarını okşar ve hatırlarını sorardı.\n• Birisine bir söz verdiği veya vaatte bulunduğu zaman ne olursa olsun yerine getirirdi.\n• Kendisinden yapabileceği bir yardım istendiğinde asla “hayır” demez, elinden geleni yapardı.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-16.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 17,
    unit: "Şefkat",
    topic: "Arkadaşı Aramak, Hediyeleşmek ve Hayvanlara Merhamet",
    title: "Şefkat — Arkadaşı Aramak, Hediyeleşmek ve Hayvanlara Merhamet",
    body: "• Arkadaşlarından birini birkaç gün görmediğinde mutlaka sorar, arar veya ziyaret ederdi.\n• İnsanları birbirine bağlamak ve sevindirmek için hediyeleşmeyi teşvik ederdi.\n• Hayvanlara fazla yük yüklenmemesini, iyi bakılmasını ve onlara şefkat gösterilmesini emrederdi.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-17.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 18,
    unit: "Şefkat",
    topic: "Cömertlik, Sıla-i Rahim ve Alın Teri",
    title: "Şefkat — Cömertlik, Sıla-i Rahim ve Alın Teri",
    body: "• “Cömert Allah’a yakın, cimri ise uzaktır” buyurarak elindeki nimetleri cömertçe paylaşırdı.\n• Akrabalarını sık sık ziyaret eder (sıla-i rahim) ve bağları koparmanın manevi zararından sakındırırdı.\n• “İşçinin ücretini alnının teri kurumadan veriniz” buyurarak emeğin hakkını geciktirmeden öderdi.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-18.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 19,
    unit: "Şefkat",
    topic: "Dert Dinlemek, İlme Destek ve Yapılan İyiliği Unutmamak",
    title: "Şefkat — Dert Dinlemek, İlme Destek ve Yapılan İyiliği Unutmamak",
    body: "• İnsanların dertleriyle yakından ilgilenir, onları dinleyip teselli ederdi.\n• İlim öğrenen kimselere destek olur, eğitim yolundaki gençlerin ihtiyaçlarını karşılardı.\n• Kendisine yapılan en küçük bir iyiliği dahi asla unutmaz, minnetle yâd ederdi.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-19.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 20,
    unit: "Şefkat",
    topic: "Nezaket, Dargınları Barıştırmak ve Yardım İsteyeni Geri Çevirmemek",
    title: "Şefkat — Nezaket, Dargınları Barıştırmak ve Yardım İsteyeni Geri Çevirmemek",
    body: "• İnsanlarla konuşurken daima nazik davranır, ağzından asla kaba ve kırıcı bir kelime çıkmazdı.\n• Küs ve dargın olanları hemen barıştırır, aradaki soğukluğu gidermeye gayret ederdi.\n• Kapısına yardım için gelen ihtiyaç sahiplerini asla geri çevirmez, imkânınca yardımcı olurdu.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-20.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 21,
    unit: "Yerken İçerken",
    topic: "Besmele ile Başlamak, Nimete Şükür ve Ölçülü Yemek",
    title: "Yerken İçerken — Besmele ile Başlamak, Nimete Şükür ve Ölçülü Yemek",
    body: "• Yemeğe ve içeceğe mutlaka besmele ile başlardı.\n• Allah’ın sayısız nimetlerini tefekkür ederek yer, sofradan kalkarken “Elhamdülillâh” diyerek şükrederdi.\n• Tam doymadan sofradan kalkar; midenin üçte birini yemeğe, üçte birini suya, üçte birini havaya ayırmayı tavsiye ederdi.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-21.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 22,
    unit: "Yerken İçerken",
    topic: "Tabağı Bitirmek, Misafire İkram ve Üç Nefeste İçmek",
    title: "Yerken İçerken — Tabağı Bitirmek, Misafire İkram ve Üç Nefeste İçmek",
    body: "• Tabağa yiyebileceği kadar yemek koyar, artırıp israf etmez ve tabağını temizce bitirirdi.\n• Misafirlerine elindeki en güzel nimetlerden ikram eder, onları hoşnut etmek için gayret gösterirdi.\n• Suyu acele etmeden, oturarak ve üç nefeste içer; bunun daha sağlıklı ve afiyetli olduğunu belirtirdi.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-22.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 23,
    unit: "Yerken İçerken",
    topic: "Yaslanmamak, Yiyeceğe Üfürmemek ve İkramı Kabul Etmek",
    title: "Yerken İçerken — Yaslanmamak, Yiyeceğe Üfürmemek ve İkramı Kabul Etmek",
    body: "• Yemek yerken bir yere yaslanarak oturmaz; sofrada vakar ve tevazu içinde otururdu.\n• Yemeğe veya sıcak içeceğe üfürmez, kabın içine nefes vermekten kaçınırdı.\n• Kendisine hediye ve ikram edilen yiyeceği nezaketle kabul eder ve yerdi.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-23.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 24,
    unit: "Yerken İçerken",
    topic: "Yiyecek Kaplarını Kapatmak, Yemeği Soğutmak ve El Yıkamak",
    title: "Yerken İçerken — Yiyecek Kaplarını Kapatmak, Yemeği Soğutmak ve El Yıkamak",
    body: "• Yiyecek ve içecek kaplarının üzerinin kapalı tutulmasını emreder, açıkta bırakmazdı.\n• Yemeği çok sıcakken yemekten hoşlanmaz; biraz ılımasını ve soğutularak yenilmesini tavsiye ederdi.\n• Yemekten önce ellerini, yemekten sonra da hem ağzını hem de ellerini mutlaka yıkardı.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-24.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 25,
    unit: "Yerken İçerken",
    topic: "Davete İcabet, Sofrada Birliktelik ve Acıkınca Yemek",
    title: "Yerken İçerken — Davete İcabet, Sofrada Birliktelik ve Acıkınca Yemek",
    body: "• Önemli bir mazereti yoksa yemek davetlerine icabet eder, hazırlanan ikramı tebessümle yerdi.\n• Sofradakiler doymadan sofradan kalkmaz, izin almadan kalkıp gitmeyi nezaketsizlik sayardı.\n• İyice acıkmadan sofraya oturmaz, lüzumsuz atıştırmalardan kaçınırdı.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-25.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 26,
    unit: "Yerken İçerken & Hayatın İçinden",
    topic: "Su İçme Âdâbı, Önünden Yemek ve Namazda Esnememek",
    title: "Yerken İçerken & Hayatın İçinden — Su İçme Âdâbı, Önünden Yemek ve Namazda Esnememek",
    body: "• Suyu dibi görünen temiz kaptan ve oturarak içer; ayakta su içmekten sakınırdı.\n• Yemeği kabın ortasından değil, tabağın kendi önüne gelen tarafından yerdi.\n• Namazda esnemeyi hoş karşılamaz, ibadet esnasında gafletten uzak dururdu.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-26.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 27,
    unit: "Hayatın İçinden",
    topic: "Ezanı Dinlemek, Ezan Duası ve Daima Abdestli Olmak",
    title: "Hayatın İçinden — Ezanı Dinlemek, Ezan Duası ve Daima Abdestli Olmak",
    body: "• Okunan ezanı saygıyla ve sessizce dinler, müezzinin sözlerini içinden tekrar ederdi.\n• Ezan bittikten sonra Peygamber Efendimiz’e vesile makamını dileyen ezan duasını okurdu.\n• Gündelik hayatında daima abdestli bulunmaya özen gösterir, abdestini taze tutardı.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-27.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 28,
    unit: "Hayatın İçinden",
    topic: "Konuşmaya Allah’ın Adıyla Başlamak, Kabir Ziyareti ve Vefat Edenleri Hayırla Anmak",
    title:
      "Hayatın İçinden — Konuşmaya Allah’ın Adıyla Başlamak, Kabir Ziyareti ve Vefat Edenleri Hayırla Anmak",
    body: "• Konuşmaya Allah’ın adıyla başlar ve konuşmasını Allah’ın adıyla bitirirdi.\n• Kabirlerin ziyaret edilmesini tavsiye eder, faniliği hatırlamak için bizzat kabirleri ziyaret ederdi.\n• Vefat etmiş yakınları ve geçmiş büyükleri daima güzel ahlâk ve hayırla yâd ederdi.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-28.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 29,
    unit: "Yatarken",
    topic: "Abdestli Uyumak, Diş Temizliği ve Sağ Tarafa Yatmak",
    title: "Yatarken — Abdestli Uyumak, Diş Temizliği ve Sağ Tarafa Yatmak",
    body: "• Gece yatağa girmeden önce mutlaka abdest alır, abdestli olarak uyumaya özen gösterirdi.\n• Yatmadan önce dişlerini misvaklar veya temizler, ağız hijyenini ihmal etmezdi.\n• Yatağa yatınca önce sağ tarafına yatar, sağ elini sağ yanağının altına koyarak günün manevi muhasebesini yapardı.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-29.pdf",
    pageCount: 3,
  },
  {
    weekNumber: 30,
    unit: "Yatarken",
    topic: "Yatış Duruşu, Koruyucu Sureler ve Erken Uyanmak",
    title: "Yatarken — Yatış Duruşu, Koruyucu Sureler ve Erken Uyanmak",
    body: "• Yüzükoyun yatmaktan hoşlanmaz, sırtüstü veya sağ tarafa yatmayı tavsiye ederdi.\n• Yatağa girdiğinde avuçlarını açarak İhlas, Felak ve Nas surelerini okur, avucuna üfleyip vücuduna sürerdi.\n• Sabah erkenden uyanır, erken kalkmanın berekete ve zindeliğe vesile olduğunu vurgulardı.",
    pdfUrl: "/curriculum/adab/ortaokul/hafta-30.pdf",
    pageCount: 3,
  },
] as const;

export const liseAdabCurriculum: readonly AdabCurriculumItem[] = [
  {
    weekNumber: 1,
    unit: "Edep, Güzel Ahlâk ve Hilim",
    topic: "Edep Nedir?",
    title: "Edep, Güzel Ahlâk ve Hilim — Edep Nedir?",
    body: "• İnsanlarla konuşurken nazik bir kelime seçmek.\n• Ortak alanlarda başkalarının rahatını hesaba katmak.\n• Her gün çevremde gördüğüm bir güzel davranışı fark etmek.",
  },
  {
    weekNumber: 2,
    unit: "Edep, Güzel Ahlâk ve Hilim",
    topic: "Güzel Ahlâkı Önce Kendimde Yaşamak",
    title: "Edep, Güzel Ahlâk ve Hilim — Güzel Ahlâkı Önce Kendimde Yaşamak",
    body: "• Başkasından beklediğim bir güzel davranışı önce kendim yapmak.\n• Bir eşyamı, zamanımı veya emeğimi ihtiyaç olduğunda paylaşmak.\n• Oturuş, kalkış, yürüyüş, tebessüm ve hitabımda nezaketi gözetmek.",
  },
  {
    weekNumber: 3,
    unit: "Edep, Güzel Ahlâk ve Hilim",
    topic: "Hilim: Öfkemi Yönetiyorum",
    title: "Edep, Güzel Ahlâk ve Hilim — Hilim: Öfkemi Yönetiyorum",
    body: "• Öfkelendiğimde hemen cevap vermeden kısa bir ara vermek.\n• Ses tonumu yükseltmemek.\n• Küçük bir kusuru büyütmemek ve mümkünse affetmek.\n• Tartışmada uzlaştırıcı bir cümle kurmak.",
  },
  {
    weekNumber: 4,
    unit: "Edep, Güzel Ahlâk ve Hilim",
    topic: "Tahrik Karşısında Görevime Devam Ediyorum",
    title: "Edep, Güzel Ahlâk ve Hilim — Tahrik Karşısında Görevime Devam Ediyorum",
    body: "• Beni kızdıran sözlere benzer bir kötülükle karşılık vermemek.\n• Gereksiz tartışma yerine asıl görevime dönmek.\n• Gerilim yükseldiğinde ortamı sakinleştiren bir cümle kurmak.",
  },
  {
    weekNumber: 5,
    unit: "Edep, Güzel Ahlâk ve Hilim",
    topic: "Hak, Borç ve Nezaket",
    title: "Edep, Güzel Ahlâk ve Hilim — Hak, Borç ve Nezaket",
    body: "• Ödünç aldığım şeyi kararlaştırılan zamanda geri vermek.\n• Bir hakkımı isterken hakaret etmeden açık konuşmak.\n• İki tarafı da daha nazik ve adil davranmaya çağırmak.\n• Hata veya gecikme olduysa telafi etmek.",
  },
  {
    weekNumber: 6,
    unit: "Edep, Güzel Ahlâk ve Hilim",
    topic: "Kabalığa Karşı Sınır ve İyilik",
    title: "Edep, Güzel Ahlâk ve Hilim — Kabalığa Karşı Sınır ve İyilik",
    body: "• Beni inciten davranışın yanlış olduğunu sakin biçimde söylemek.\n• Gerektiğinde özür istemek veya özür dilemek.\n• Kabalığı yeni bir kabalıkla büyütmemek.\n• İyilik yaparken karşı tarafın kusuruna takılıp kalmamak.",
  },
  {
    weekNumber: 7,
    unit: "Edep, Güzel Ahlâk ve Hilim",
    topic: "Okuma Parçası: Öfke, İyilik ve Emanet",
    title: "Edep, Güzel Ahlâk ve Hilim — Okuma Parçası: Öfke, İyilik ve Emanet",
    body: "• Öfkeyi ilk anda büyütmemek; sabredip sakinleşmesini beklemek.\n• Gösteriş yapmadan bir iyilik yapmak.\n• Bana emanet edilen eşya veya sırrı korumak.",
  },
  {
    weekNumber: 8,
    unit: "Edep, Güzel Ahlâk ve Hilim",
    topic: "Okuma Parçası: Yardım ve Gıybetten Uzak Durma",
    title: "Edep, Güzel Ahlâk ve Hilim — Okuma Parçası: Yardım ve Gıybetten Uzak Durma",
    body: "• İhtiyaç bildiren birine gücüm yettiğince yardımcı olmak.\n• Yardım ederken kendi imkân ve sınırlarımı da gözetmek.\n• Gıybet başlayan konuşmaya katılmamak; konuyu değiştirmek veya ortamdan ayrılmak.",
  },
  {
    weekNumber: 9,
    unit: "Yaşlılara Hürmet",
    topic: "Saygılı Hitap ve Dinleme",
    title: "Yaşlılara Hürmet — Saygılı Hitap ve Dinleme",
    body: "• Yaşlılara saygılı hitap etmek.\n• Yanlarında ses tonumu yükseltmemek.\n• Saygı dışı tavır ve mimiklerden kaçınmak.\n• Bir toplulukta onlara önce söz vermek ve sözlerini kesmeden dinlemek.",
  },
  {
    weekNumber: 10,
    unit: "Yaşlılara Hürmet",
    topic: "Öncelik Vermek ve Hizmet Etmek",
    title: "Yaşlılara Hürmet — Öncelik Vermek ve Hizmet Etmek",
    body: "• Toplu taşımada veya bekleme sırasında ihtiyaç sahibi yaşlıya yer/öncelik vermek.\n• Kapı, eşya taşıma veya yön bulma gibi bir konuda izin isteyerek yardımcı olmak.\n• Herkesin bir gün yaşlanacağını hatırlayarak sabırlı davranmak.",
  },
  {
    weekNumber: 11,
    unit: "Selâm Verme Âdâbı",
    topic: "Girişte ve Ayrılışta Selâm",
    title: "Selâm Verme Âdâbı — Girişte ve Ayrılışta Selâm",
    body: "• Bir topluluğa girince konuşmaya başlamadan selâm vermek.\n• İçinde kimse bulunmayan yere girerken kitapta öğretilen selâm ifadesini kullanmak.\n• Karşılaşırken olduğu gibi ayrılırken de selâm vermek.",
  },
  {
    weekNumber: 12,
    unit: "Selâm Verme Âdâbı",
    topic: "Selâmı Kim Başlatır, Kim Cevaplar?",
    title: "Selâm Verme Âdâbı — Selâmı Kim Başlatır, Kim Cevaplar?",
    body: "• Selâm vermek için karşı tarafın başlamasını beklememek.\n• Kitapta sayılan karşılaşma durumlarında selâmı başlatmak.\n• Bir topluluğa verilen selâmın cevapsız kalmamasını sağlamak.",
  },
  {
    weekNumber: 13,
    unit: "Selâm Verme Âdâbı",
    topic: "Merhaba Demek ve Selâmı Duyurmak",
    title: "Selâm Verme Âdâbı — Merhaba Demek ve Selâmı Duyurmak",
    body: "• Gelen kişiyi “merhaba” gibi sıcak bir ifadeyle karşılamak.\n• Selâma gecikmeden cevap vermek.\n• Cevabımı karşı tarafın duyabileceği sesle söylemek.\n• Selâmı duymazlıktan gelmemek.",
  },
  {
    weekNumber: 14,
    unit: "Selâm Verme Âdâbı",
    topic: "Selâm Verirken Uygun Zamanı Gözetmek",
    title: "Selâm Verme Âdâbı — Selâm Verirken Uygun Zamanı Gözetmek",
    body: "• Temiz olmayan/mahrem bir yerde selâm ifadesini kullanmamak.\n• Yanlış bir davranışı onaylar görünmeden, kişiyi aşağılamayan bir tutum göstermek.\n• Kur’ân okuyan, hadis aktaran veya ilim müzakere eden kişiyi bölmemek; işi bitince selâm vermek.\n• Ezan, namaz veya kâmet hâlindeki kişiden cevap beklememek.",
  },
  {
    weekNumber: 15,
    unit: "Selâm Verme Âdâbı",
    topic: "Cevap Veremeyeni Zorlamamak ve Musâfaha",
    title: "Selâm Verme Âdâbı — Cevap Veremeyeni Zorlamamak ve Musâfaha",
    body: "• Cevap veremeyecek durumda olan kişiyi selâmla karşılık vermeye zorlamamak.\n• Selâm verirken aşağı doğru bükülmemek.\n• Uygun olduğunda, hijyen ve karşılıklı rızayı gözeterek musâfaha etmek.\n• Karşılaştığım kişi için iyi dilekte bulunmak.",
  },
  {
    weekNumber: 16,
    unit: "Hapşırma Âdâbı",
    topic: "Hapşırırken Çevremi Koruyorum",
    title: "Hapşırma Âdâbı — Hapşırırken Çevremi Koruyorum",
    body: "• Hapşırırken ağız ve burnumu mendille veya dirsek içiyle kapatmak.\n• Kitapta öğretilen “Elhamdülillâh - Yerhamükâllah - Yehdînâ ve yehdîkümullah” karşılığını doğru sırayla öğrenmek.\n• Sonrasında ellerimi temizlemek ve çevre hijyenini gözetmek.",
  },
  {
    weekNumber: 17,
    unit: "Yemek Yeme Âdâbı",
    topic: "Yemeğe Temiz ve Bilinçli Başlamak",
    title: "Yemek Yeme Âdâbı — Yemeğe Temiz ve Bilinçli Başlamak",
    body: "• Yemekten önce ve sonra ellerimi yıkamak.\n• Yemeğe besmeleyle başlamak; sağ elle ve önümden yemek.\n• Yemek bitince “Elhamdülillâh” demek.\n• Besmeleyi unuttuğumu yemek sırasında hatırlarsam kitapta verilen “Bismillâhi evvelehû ve âhirahû” ifadesini söylemek.",
  },
  {
    weekNumber: 18,
    unit: "Yemek Yeme Âdâbı",
    topic: "Sofrada Ölçü ve Nezaket",
    title: "Yemek Yeme Âdâbı — Sofrada Ölçü ve Nezaket",
    body: "• Acele etmeden, lokmayı iyice çiğneyerek yemek.\n• Yemeğe yaşça veya mevkice büyük olan kişinin başlamasını beklemek.\n• Yemeği üfleyerek soğutmamak.\n• Ağzım doluyken konuşmamak/gülmemek ve tiksinti uyandıracak davranışlardan kaçınmak.",
  },
  {
    weekNumber: 19,
    unit: "Yemek Yeme Âdâbı",
    topic: "Sofrada Göz Hakkı, Teşekkür ve İsraf",
    title: "Yemek Yeme Âdâbı — Sofrada Göz Hakkı, Teşekkür ve İsraf",
    body: "• Başkasının lokmasına ve ne kadar yediğine bakmamak.\n• Yemeği hazırlayana teşekkür etmek.\n• Sofra kurulurken ve kaldırılırken yardımcı olmak.\n• Tabağıma yiyebileceğim kadar alarak israf etmemek.",
  },
  {
    weekNumber: 20,
    unit: "Yemek Yeme Âdâbı",
    topic: "Yemek Davetinde İzin ve Zamanlama",
    title: "Yemek Yeme Âdâbı — Yemek Davetinde İzin ve Zamanlama",
    body: "• Davet veya izin olmadan bir sofraya katılmamak.\n• Davet edildiğimde makul bir engelim yoksa uygun biçimde cevap vermek.\n• Davetli olmayan birini getirmeden önce ev sahibinden izin istemek.\n• Yemek bittikten sonra ev sahibini zorlamadan, müsaade isteyerek ayrılmak.",
  },
  {
    weekNumber: 21,
    unit: "Temizlik ve Tuvalet Âdâbı",
    topic: "Kişisel Temizlik ve Güzel Görünüm",
    title: "Temizlik ve Tuvalet Âdâbı — Kişisel Temizlik ve Güzel Görünüm",
    body: "• Beden ve kıyafet temizliğime dikkat etmek.\n• Ağız, burun ve diş temizliğini düzenli yapmak.\n• Temizlik sonrası ıslaklığı uygun biçimde kurulamak.\n• Güzel görünmeye çalışırken ağır koku ile başkalarını rahatsız etmemek.",
  },
  {
    weekNumber: 22,
    unit: "Temizlik ve Tuvalet Âdâbı",
    topic: "Çevreyi ve Ortak Alanları Temiz Tutmak",
    title: "Temizlik ve Tuvalet Âdâbı — Çevreyi ve Ortak Alanları Temiz Tutmak",
    body: "• Çöpümü ortak alanda bırakmamak.\n• Yol, dinlenme yeri ve ortak kullanım alanlarını kirletmemek.\n• Kullandığım alanı bulduğumdan daha temiz bırakmak.\n• Yakın ortamda başkalarını rahatsız edebilecek kokuları hesaba katmak.",
  },
  {
    weekNumber: 23,
    unit: "Temizlik ve Tuvalet Âdâbı",
    topic: "Tuvalete Giriş ve Mahremiyet",
    title: "Temizlik ve Tuvalet Âdâbı — Tuvalete Giriş ve Mahremiyet",
    body: "• Kıyafetimin kirlenmesini önleyecek biçimde hazırlanmak.\n• Girmeden önce kitapta verilen duayı öğrenmek.\n• Sol ayakla girip sağ ayakla çıkmayı hatırlamak.\n• İhtiyacımı oturarak ve mahremiyeti koruyarak gidermek.",
  },
  {
    weekNumber: 24,
    unit: "Temizlik ve Tuvalet Âdâbı",
    topic: "Tuvaleti Temiz Bırakmak",
    title: "Temizlik ve Tuvalet Âdâbı — Tuvaleti Temiz Bırakmak",
    body: "• Tuvalette konuşmamak, bir şey yememek ve gereksiz oyalanmamak.\n• Temizliği sol elle; musluk, kapı ve maşrapa gibi araçları sağ elle kullanmak.\n• Çıkmadan önce kişisel temizliği ve tuvaletin temiz bırakıldığını kontrol etmek; ellerimi yıkamak.\n• Acele etmeden yeterli süre beklemek (istibrâ).",
  },
  {
    weekNumber: 25,
    unit: "Toplantı Âdâbı",
    topic: "Zaman, Ortam ve Hazırlık",
    title: "Toplantı Âdâbı — Zaman, Ortam ve Hazırlık",
    body: "• Toplantının yerini ve saatini önceden bilip zamanında gitmek.\n• Ev sahibi/düzenleyici rolündeysem temizlik, ses, ışık ve sıcaklığı ayarlamak.\n• Başlangıç gecikirse okuma/dinleme gibi yararlı bir işle beklemek.\n• Görevimi tamamlayıp kalem, kâğıt ve gerekli malzemelerle hazırlıklı gelmek.",
  },
  {
    weekNumber: 26,
    unit: "Toplantı Âdâbı",
    topic: "Fikir, Görünüm ve İzin",
    title: "Toplantı Âdâbı — Fikir, Görünüm ve İzin",
    body: "• Fikrimi saygılı ve anlaşılır biçimde söylemek; kabul edilmezse diretmemek.\n• Dikkati dağıtmayacak, temiz ve ortama uygun kıyafetle katılmak; güler yüzlü olmak.\n• Yaşça ve bilgice ileride olanlara hürmet göstermek.\n• Zorunlu olmadıkça çıkmamak; çıkmam gerekirse izin istemek ve işleri önceden ayarlamak.",
  },
  {
    weekNumber: 27,
    unit: "Toplantı Âdâbı",
    topic: "Mahremiyet, Telefon, İkram ve Mazeret",
    title: "Toplantı Âdâbı — Mahremiyet, Telefon, İkram ve Mazeret",
    body: "• Kalabalık içinde üçüncü kişiyi dışlayan gizli konuşma yapmamak.\n• Telefonu dışarıda bırakmak, kapatmak veya sessize almak.\n• İkramı toplantının akışını bozmayacak sadelikte hazırlamak/sunmak.\n• Önemli bir sebeple katılamazsam önceden izin istemek ve haber vermek.",
  },
  {
    weekNumber: 28,
    unit: "Toplantı Âdâbı",
    topic: "Söz Düzeni, Kusuru Düzeltme ve Karara Sadakat",
    title: "Toplantı Âdâbı — Söz Düzeni, Kusuru Düzeltme ve Karara Sadakat",
    body: "• Temiz, bakımlı ve ortama uygun görünümle toplantıya katılmak (kaynakta çorap ve sakal/bıyık düzeni ayrıca belirtilir).\n• Söz verildiğinde veya fikrim sorulduğunda konuşmak; herkesin aynı anda konuşmasına katılmamak.\n• Bir kusuru topluluk içinde kişiyi mahcup etmeden genel ve yapıcı biçimde ifade etmek.\n• Anlamadığım veya uygun bulmadığım kararı toplantıda sormak; sonradan çekiştirmemek.",
  },
  {
    weekNumber: 29,
    unit: "İnsanlarla Konuşma ve Nasihat Âdâbı",
    topic: "Konuşmaya Saygıyla Başlamak",
    title: "İnsanlarla Konuşma ve Nasihat Âdâbı — Konuşmaya Saygıyla Başlamak",
    body: "• Söze selâmla başlayıp hâl-hatır sormak.\n• Muhataba uygun “bey, hanım, abi, abla, hoca” gibi saygı ifadeleri kullanmak.\n• Büyüklere “siz” diye hitap etmek; aşırı samimi/senli-benli konuşmamak.\n• Sıcak, saygılı bir ses tonu kullanmak ve gönül kırmamak.",
  },
  {
    weekNumber: 30,
    unit: "İnsanlarla Konuşma ve Nasihat Âdâbı",
    topic: "Ölçülü ve Yerinde Konuşmak",
    title: "İnsanlarla Konuşma ve Nasihat Âdâbı — Ölçülü ve Yerinde Konuşmak",
    body: "• Beni çağıran kişiye “buyurun/efendim” gibi edepli bir ifadeyle cevap vermek.\n• Çok yüksek veya duyulmayacak kadar kısık konuşmamak.\n• Birini bulunduğu ortamda överken ya da eleştirirken aşırıya kaçmamak.\n• Söyleyeceğim söz yararlı değilse susabilmek.",
  },
  {
    weekNumber: 31,
    unit: "İnsanlarla Konuşma ve Nasihat Âdâbı",
    topic: "Temiz Söz, Doğru Cevap ve İçtenlik",
    title: "İnsanlarla Konuşma ve Nasihat Âdâbı — Temiz Söz, Doğru Cevap ve İçtenlik",
    body: "• Gıybet, laf taşıma ve ahlâk dışı/kaba ifadelerden uzak durmak.\n• Bildiğim soruya kısa ve net; bilmediğime dürüstçe “bilmiyorum” diye cevap vermek.\n• Başkasına söz hakkı verip dinlemeyi öğrenmek.\n• Nasihat ederken samimi olmak ve önce anlattığım değere kendim sarılmak.",
  },
  {
    weekNumber: 32,
    unit: "Ziyaret ve Misafir Ağırlama Âdâbı",
    topic: "Sıla-i Rahim: Bağları Canlı Tutmak",
    title: "Ziyaret ve Misafir Ağırlama Âdâbı — Sıla-i Rahim: Bağları Canlı Tutmak",
    body: "• Akrabama güler yüz, tatlı söz, selâm ve hâl-hatırla yakınlık göstermek; hakkında iyi düşünmek ve hayır dilemek.\n• Akraba ve özellikle yaşlıları ziyaret etmek/yoklamak, yapılacak işlerine bedenî yardımla destek olmak.\n• İmkân ve aile rehberliği içinde ihtiyaç sahibi akrabaya maddi destek vermek veya destek organizasyonuna katılmak.\n• Bayramlarla sınırlı kalmadan yakınlarla irtibatı sürdürmek; acı ve tatlı günlerde yalnız bırakmamak.",
  },
  {
    weekNumber: 33,
    unit: "Ziyaret ve Misafir Ağırlama Âdâbı",
    topic: "Ev Sahibi: Karşılama ve Ortam Hazırlığı",
    title: "Ziyaret ve Misafir Ağırlama Âdâbı — Ev Sahibi: Karşılama ve Ortam Hazırlığı",
    body: "• Misafiri kapıda bizzat karşılamak ve giderken uğurlamak.\n• Güler yüzlü, temiz ve bakımlı görünmek.\n• Pijama/şort/atlet gibi ev hâli yerine misafire uygun düzgün kıyafet seçmek (kaynakta şalvar da örneklenir).\n• Misafir odası, yemek alanı, tuvalet ve banyo gibi yerlerin temizlik, düzen, ses, ışık, sıcaklık ve kokusunu kontrol etmek.",
  },
  {
    weekNumber: 34,
    unit: "Ziyaret ve Misafir Ağırlama Âdâbı",
    topic: "Ev Sahibi: Hoş Geldiniz, İkram ve İhtiyaç",
    title: "Ziyaret ve Misafir Ağırlama Âdâbı — Ev Sahibi: Hoş Geldiniz, İkram ve İhtiyaç",
    body: "• “Hoş geldiniz” diyerek memnuniyetimi belirtmek.\n• Misafiri yalnız bırakmamak; aynı zamanda bunaltmamak.\n• İkramı uygun bir sehpa/zeminde özenle sunmak ve sıcak bir ortam oluşturmak.\n• İhtiyacı olup olmadığını sormak ve yapabildiğim ihtiyacı karşılamak.",
  },
  {
    weekNumber: 35,
    unit: "Ziyaret ve Misafir Ağırlama Âdâbı",
    topic: "Ev Sahibi: Misafirin Yanında Davranış",
    title: "Ziyaret ve Misafir Ağırlama Âdâbı — Ev Sahibi: Misafirin Yanında Davranış",
    body: "• Misafirin yanında kimseyi azarlamamak veya çekiştirmemek.\n• Ceket/palto gibi dış giysisini izinle alıp uygun yere asmak.\n• Uygunsa temiz terlik sunmak.\n• Misafiri dağınık olmayan, rahat hareket edebileceği uygun bir yere almak.",
  },
  {
    weekNumber: 36,
    unit: "Ziyaret ve Misafir Ağırlama Âdâbı",
    topic: "Ev Sahibi: Sohbette Yerini Bilmek",
    title: "Ziyaret ve Misafir Ağırlama Âdâbı — Ev Sahibi: Sohbette Yerini Bilmek",
    body: "• Misafir bir büyüğüme geldiyse, gerekiyorsa yanında bulunmak; özel görüşme ihtimalinde mahremiyet sağlamak.\n• Sohbete katılmam uygunsa ev sahibinden fazla konuşmamak ve gereksiz yere lafa karışmamak.\n• Zor bir anım olsa bile misafire istenmediği hissini vermemek.\n• Misafiri tek başına bırakmak yerine onunla ilgilenecek birini ayarlamak.",
  },
  {
    weekNumber: 37,
    unit: "Ziyaret ve Misafir Ağırlama Âdâbı",
    topic: "Ev Sahibi: Sofra, Zaman ve Kapsayıcılık",
    title: "Ziyaret ve Misafir Ağırlama Âdâbı — Ev Sahibi: Sofra, Zaman ve Kapsayıcılık",
    body: "• Uzaktan gelen misafire sormadan uygun bir sofra hazırlamak ve yalnızsa ona eşlik etmek.\n• Birlikteyken sık sık saate bakmamak.\n• Misafirin yanında gizli konuşmamak ve ona yönelikmiş izlenimi verecek biçimde gülüşmemek.\n• Kapıdan bakıp kaçmamak; odaya girdiysem hâl-hatır sormak, vaktim kısıtlıysa özür ve izinle ayrılmak.",
  },
  {
    weekNumber: 38,
    unit: "Ziyaret ve Misafir Ağırlama Âdâbı",
    topic: "Ev Sahibi: Güzel Uğurlama ve Gece Misafiri",
    title: "Ziyaret ve Misafir Ağırlama Âdâbı — Ev Sahibi: Güzel Uğurlama ve Gece Misafiri",
    body: "• Misafirin dış giysisini tutmak ve geldiğinden memnun olduğumu söylemek.\n• Gidene kadar kapıda beklemek; çıkar çıkmaz kapıyı yüzüne kapanır gibi kapatmamak.\n• Gece kalacak misafir için temiz yatak, nevresim/çarşaf, havlu ve gerekiyorsa gece kıyafeti hazırlamak.",
  },
  {
    weekNumber: 39,
    unit: "Ziyaret ve Misafir Ağırlama Âdâbı",
    topic: "Misafir: Kapıda İzin ve Doğru Zaman",
    title: "Ziyaret ve Misafir Ağırlama Âdâbı — Misafir: Kapıda İzin ve Doğru Zaman",
    body: "• Kapı açılınca evin içini görecek biçimde durmamak.\n• Kapıyı/telefonu üç kez denedikten sonra cevap yoksa ısrar etmemek.\n• Eve girerken ve çıkarken; kaynakta belirtildiği üzere boş eve girerken de selâm vermek.\n• Davete ne erken ne geç, kararlaştırılan zamanda gitmek.",
  },
  {
    weekNumber: 40,
    unit: "Ziyaret ve Misafir Ağırlama Âdâbı",
    topic: "Misafir: Hazırlık, Hediye ve Gösterilen Yere Oturmak",
    title:
      "Ziyaret ve Misafir Ağırlama Âdâbı — Misafir: Hazırlık, Hediye ve Gösterilen Yere Oturmak",
    body: "• Temiz ve düzgün kıyafetle gitmek.\n• Mümkünse külfetsiz bir hediye götürmek.\n• Kapıyı çalıp ev sahibi izin verdikten sonra içeri girmek.\n• Sağa sola bakmamak; ev sahibinin gösterdiği yere oturmak; başka misafire izinsiz ikram yapmamak ve lavabo/tuvalet için izin istemek.",
  },
  {
    weekNumber: 41,
    unit: "Ziyaret ve Misafir Ağırlama Âdâbı",
    topic: "Misafir: İkramı Beğenmek ve Muhatabı Gözetmek",
    title: "Ziyaret ve Misafir Ağırlama Âdâbı — Misafir: İkramı Beğenmek ve Muhatabı Gözetmek",
    body: "• Gelen yemekte kusur bulmamak ve kusur görsem de söylememek.\n• Özel bir yemek istememek; seçenek sunulursa en zahmetsiz olanı seçmek.\n• Yaşlı/hasta kişileri daha sık ama kısa süreli ziyaret etmek; konuşma biçimini durumlarına göre ayarlamak.\n• Dinî veya siyasî görüş farklılığında ev sahibini ve oradakileri üzecek sözlerden kaçınmak.",
  },
  {
    weekNumber: 42,
    unit: "Ziyaret ve Misafir Ağırlama Âdâbı",
    topic: "Misafir: Memnuniyetle ve Haber Vererek Ayrılmak",
    title: "Ziyaret ve Misafir Ağırlama Âdâbı — Misafir: Memnuniyetle ve Haber Vererek Ayrılmak",
    body: "• Gönül hoşluğuyla ve memnuniyetimi ifade ederek ayrılmak.\n• Ev sahibinden izinsiz/habersiz evi terk etmemek.\n• Ev sahibinin işi varsa ziyareti uzatmadan müsaade istemek.\n• Ziyarete gidemeyeceksem önceden haber verip izin/özür bildirmek.",
  },
  {
    weekNumber: 43,
    unit: "Ziyaret ve Misafir Ağırlama Âdâbı",
    topic: "Okuma Parçası: Ziyareti Hayatın Parçası Yapmak",
    title: "Ziyaret ve Misafir Ağırlama Âdâbı — Okuma Parçası: Ziyareti Hayatın Parçası Yapmak",
    body: "• Bir süredir görmediğim yakınımın hâl-hatırını sormak.\n• Ziyarette ev sahibi için iyi dilekte/duada bulunmak.\n• İhtiyaca göre bireysel veya toplu ziyaret biçimini seçmek.\n• Mesafe ya da yoğunluk olsa da bağı tamamen koparmamak.",
  },
  {
    weekNumber: 44,
    unit: "Sohbet Âdâbı",
    topic: "Sohbete Yer ve Gönül Hazırlığı",
    title: "Sohbet Âdâbı — Sohbete Yer ve Gönül Hazırlığı",
    body: "• Sohbet yerini düzenlemek; konuşmacı için sehpa ve su hazırlamak.\n• Sohbetten önce zihnen ve manen hazırlanmak.\n• Esneme, hapşırma veya zorunlu konuşmayı edep içinde yapmak; sohbetin havasını bozmamak.\n• Düzgün ve saygılı oturmak.",
  },
  {
    weekNumber: 45,
    unit: "Sohbet Âdâbı",
    topic: "Sohbeti Dinlemek ve İzinle Ayrılmak",
    title: "Sohbet Âdâbı — Sohbeti Dinlemek ve İzinle Ayrılmak",
    body: "• Sorumu sohbet bitiminde ve gerçekten ihtiyaç varsa sormak.\n• Konuşmacı kalkmadan kalkmamak veya ortalıkta dolaşmamak.\n• Ayrılmam gerekiyorsa müsaade istemek.\n• Güvendiğim, bilgili kişilerle yararlı sohbet ortamlarına katılmak.",
  },
  {
    weekNumber: 46,
    unit: "İlim Öğrenme ve Öğretme Âdâbı",
    topic: "İlim Avcısı Olmak",
    title: "İlim Öğrenme ve Öğretme Âdâbı — İlim Avcısı Olmak",
    body: "• Merak ettiğim bir konuda güvenilir bilgi aramak.\n• Her gün kısa da olsa düzenli okumak.\n• Öğrendiğim bir bilgiyi davranışa dönüştürmek.\n• Doğru bilgiyi uygun biçimde bir başkasıyla paylaşmak.",
  },
  {
    weekNumber: 47,
    unit: "İlim Öğrenme ve Öğretme Âdâbı",
    topic: "Öğrenmeye Kendi İsteğimle Başlamak",
    title: "İlim Öğrenme ve Öğretme Âdâbı — Öğrenmeye Kendi İsteğimle Başlamak",
    body: "• Öğrenmeyi yalnızca ailemin zorlaması olarak görmemek; kendime bir amaç bulmak.\n• İlk başarısızlıkta vazgeçmemek.\n• Derse hazırlıklı ve istekli girmek.\n• Öğretmeni can kulağıyla dinlemek.",
  },
  {
    weekNumber: 48,
    unit: "İlim Öğrenme ve Öğretme Âdâbı",
    topic: "Sormak, Danışmak ve Çalışma Ortamı Kurmak",
    title: "İlim Öğrenme ve Öğretme Âdâbı — Sormak, Danışmak ve Çalışma Ortamı Kurmak",
    body: "• Anlamadığım konuyu yeniden sormak.\n• Başarılı bir öğrenciye yöntemini danışmak.\n• Düzenli ve gerçekçi bir çalışma programı hazırlamak.\n• Dikkatimi destekleyen rahat bir çalışma yeri seçmek.",
  },
  {
    weekNumber: 49,
    unit: "İlim Öğrenme ve Öğretme Âdâbı",
    topic: "Gayret, Kavrama ve Uygulama",
    title: "İlim Öğrenme ve Öğretme Âdâbı — Gayret, Kavrama ve Uygulama",
    body: "• Sonuca değil, elimden gelen düzenli gayrete odaklanmak.\n• Bir konuyu anlamadan sırf bitirmiş olmak için diğerine geçmemek.\n• Öğrendiğim uygulanabilir bir bilgiyi aynı hafta kullanmak.",
  },
  {
    weekNumber: 50,
    unit: "İlim Öğrenme ve Öğretme Âdâbı",
    topic: "Öğrenme Çevresi ve Öğretmene Saygı",
    title: "İlim Öğrenme ve Öğretme Âdâbı — Öğrenme Çevresi ve Öğretmene Saygı",
    body: "• Beni öğrenmekten soğutan kişi, içerik veya alışkanlıkların etkisini azaltmak.\n• Öğrenmeyi destekleyen arkadaş ve ortamları çoğaltmak.\n• Öğreten kişiye saygılı ve mütevazı davranmak.",
  },
  {
    weekNumber: 51,
    unit: "İlim Öğrenme ve Öğretme Âdâbı",
    topic: "Akranıma Öğretirken Hazırlık ve Örneklik",
    title: "İlim Öğrenme ve Öğretme Âdâbı — Akranıma Öğretirken Hazırlık ve Örneklik",
    body: "• Anlatacağım konuyu iyi öğrenmek, güncel/doğru bilgiyi kontrol etmek ve hazırlıksız anlatmamak.\n• Konuyu karşımdakinin seviyesine indirerek anlatmak; zor gösterip cesaretini kırmamak.\n• Sözüm, yaşayışım ve davranışımla örnek olmak; saygıyı baskıyla istemek yerine davranışımla kazanmak.",
  },
  {
    weekNumber: 52,
    unit: "İlim Öğrenme ve Öğretme Âdâbı",
    topic: "Öğretirken Sevgi, Şefkat ve Onur",
    title: "İlim Öğrenme ve Öğretme Âdâbı — Öğretirken Sevgi, Şefkat ve Onur",
    body: "• Bildiğimi en iyi ve anlaşılır biçimde aktarmaya gayret etmek.\n• Başarılı olanı aşırı yüceltmemek, zorlananı küçümsememek.\n• Arkadaşımın kusurunu topluluk önünde sayıp utandırmamak; affedici ve hoşgörülü olmak.",
  },
  {
    weekNumber: 53,
    unit: "İlim Öğrenme ve Öğretme Âdâbı",
    topic: "Öğretirken Dinlemek, Adil Olmak ve Çıkar Gözetmemek",
    title: "İlim Öğrenme ve Öğretme Âdâbı — Öğretirken Dinlemek, Adil Olmak ve Çıkar Gözetmemek",
    body: "• Yardım ettiğim kişinin problemini dinlemek ve duygusuna ortak olmak; sağlıklı sınırı korumak.\n• Değerlendirme yetkim varsa bunu tehdit olarak kullanmamak ve adil davranmak.\n• Pahalı hediye, ziyafet veya ayrıcalık beklentisiyle öğretmemek; haysiyet ve tarafsızlığı korumak.",
  },
  {
    weekNumber: 54,
    unit: "İlim Öğrenme ve Öğretme Âdâbı",
    topic: "Okuma Parçası: İlim Yolu ve Topluma Fayda",
    title: "İlim Öğrenme ve Öğretme Âdâbı — Okuma Parçası: İlim Yolu ve Topluma Fayda",
    body: "• Öğrenmek için emek ve yol zahmetini göze almak.\n• Bilgimi yalnız kendim için değil çevreme yarar sağlamak için kullanmak.\n• Doğru bilgiyi güvenilir biçimde sonraki kişilere aktarmak.",
  },
] as const;

/**
 * Belirtilen sınıf (1-6) için 54 haftalık Adab-ı Muaşeret müfredat girişlerini üretir.
 * - 1, 2, 3. sınıflar: Ortaokul müfredatı
 * - 4, 5, 6. sınıflar: Lise müfredatı
 * - Hafta 1-16: Eylül - Aralık 2026 (4 ay x 4 hafta)
 * - Hafta 17-48: Ocak - Ağustos 2027 (8 ay x 4 hafta)
 * - Hafta 49-54: Ekstra 1-6 (48 haftalık standart müfredat kuralı sonrası ilave kartlar)
 */
/**
 * Belirtilen sınıf (1-6) için Adab-ı Muaşeret müfredat girişlerini üretir.
 * - 1, 2, 3. sınıflar: Ortaokul müfredatı (30 hafta x 3 görsel modüler PDF)
 * - 4, 5, 6. sınıflar: Lise müfredatı (54 hafta: 48 standart + 6 ekstra)
 */
export function getAdabEntriesForGrade(grade: number): CurriculumEntry[] {
  if (grade <= 3) {
    return ortaokulAdabCurriculum.map((item) => {
      const monthIndex = Math.floor((item.weekNumber - 1) / 4); // 0..7
      const month = monthIndex < 4 ? 9 + monthIndex : monthIndex - 3;
      const year = monthIndex < 4 ? 2026 : 2027;
      const weekInMonth = ((item.weekNumber - 1) % 4) + 1;
      const id = makeAdabEntryId(month, weekInMonth, grade, false);

      return {
        id,
        grade,
        categoryId: "adab-i-muaseret",
        month,
        week: weekInMonth,
        year,
        isExtra: false,
        title: item.title,
        body: item.body,
        pdfUrl: item.pdfUrl,
        pageCount: item.pageCount,
      };
    });
  }

  return liseAdabCurriculum.map((item) => {
    if (item.weekNumber <= 48) {
      const monthIndex = Math.floor((item.weekNumber - 1) / 4); // 0..11
      const month = monthIndex < 4 ? 9 + monthIndex : monthIndex - 3;
      const year = monthIndex < 4 ? 2026 : 2027;
      const weekInMonth = ((item.weekNumber - 1) % 4) + 1;
      const id = makeAdabEntryId(month, weekInMonth, grade, false);

      return {
        id,
        grade,
        categoryId: "adab-i-muaseret",
        month,
        week: weekInMonth,
        year,
        isExtra: false,
        title: item.title,
        body: item.body,
        pdfUrl: item.pdfUrl,
        pageCount: item.pageCount,
      };
    }

    const extraOrder = item.weekNumber - 48; // 1..6
    const id = makeAdabEntryId(8, 4, grade, true, extraOrder);

    return {
      id,
      grade,
      categoryId: "adab-i-muaseret",
      month: 8,
      week: 4,
      year: 2027,
      isExtra: true,
      extraOrder,
      title: item.title,
      body: item.body,
      pdfUrl: item.pdfUrl,
      pageCount: item.pageCount,
    };
  });
}

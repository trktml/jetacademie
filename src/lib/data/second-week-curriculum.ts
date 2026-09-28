import type { CurriculumCategoryId, CurriculumEntry } from "@/lib/curriculum";
import { secondWeekKonuItems } from "./konu-second-weeks";

const accessDate = "27 Eylül 2026";
type SupportingText = {
  title: string;
  text: string;
  takeaway: readonly string[];
  source: string;
  url: string;
  arabic?: string;
  meaning?: string;
};
const hadiths: readonly SupportingText[] = [
  {
    title: "Okumanın başkasına ulaşan faydası",
    arabic: "أَوْ عِلْمٍ يُنْتَفَعُ بِهِ",
    meaning: "Yahut kendisinden yararlanılan bir bilgi.",
    text: "Bu bölüm, insanın ölümünden sonra da faydası devam eden üç işi anlatan hadisin içindedir: devam eden sadaka, faydalanılan bilgi ve dua eden hayırlı evlat.¹ Seçilen kısa bölümün öncesi, niçin bilginin kalıcı faydasından söz edildiğini gösterir.\n\nBu hafta yeniden okuduğun bir cümleyi arkadaşına anlaşılır biçimde açıklayabilirsin. Bunu hadisteki sevabın miktarını hesaplayan bir işlem olarak görmüyoruz. Bilginin başkasının öğrenmesine yardım etmesini düşünüyoruz.",
    takeaway: [
      "Okuduğumu doğru açıklayarak başkasına yardım edebilirim.",
      "Bir cümleyi önce kaynağında anlayabilirim.",
      "Bilginin faydasını yalnız kendi başarımda aramamalıyım.",
    ],
    source: "Müslim, el-Câmiʿu’s-sahîh, Vasiyyet, hadis 1631",
    url: "https://sunnah.com/muslim:1631",
  },
  {
    title: "Okumaya hangi niyetle başlıyorum?",
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    meaning: "Ameller niyetlere göredir; her kişiye ancak niyet ettiği vardır.",
    text: "Hadisin devamında hicret örneğiyle niyetin yapılan işteki yeri açıklanır.¹ Bu hafta Bediüzzaman’ın bir dönüm noktasını incelerken olaylarla yazarın kendi amaç cümlesini ayırıyoruz. Başkasının niyetini kesin olarak okuyamayız; onun açıklamasını ve kaynakta bulunan davranışını kaydedebiliriz.\n\nKendi okuma niyetini bir cümleyle yaz. Bir kişiyi övmek için bilgi toplamakla onun metnini anlamak için araştırmak, aynı notları seçmene yol açmayabilir. Niyetini, yapacağın küçük çalışma adımıyla ilişkilendir.",
    takeaway: [
      "Kendi okuma amacımı açıkça söyleyebilirim.",
      "Başkasının içinden geçenleri kesin bilgi gibi sunmamalıyım.",
      "Niyetimi kaynak inceleyen bir adımla destekleyebilirim.",
    ],
    source: "Buhârî, el-Câmiʿu’s-sahîh, Bed’ü’l-vahy, hadis 1",
    url: "https://sunnah.com/bukhari:1",
  },
  {
    title: "Bildiklerini açıklamanın sorumluluğu",
    arabic:
      "مَنْ سُئِلَ عَنْ عِلْمٍ فَكَتَمَهُ أَلْجَمَهُ اللَّهُ بِلِجَامٍ مِنْ نَارٍ يَوْمَ الْقِيَامَةِ",
    meaning:
      "Kendisine bir bilgi sorulup onu gizleyen kimseye Allah kıyamet günü ateşten bir gem vurur.",
    text: "Rivayet, bilinen bir bilgiyi sorulduğunda gizlemeye yönelik ağır bir uyarıdır. Çevrim içi kayıtta Elbânî’nin değerlendirmesi ‘hasen sahih’ olarak verilir.¹ Bunu cevap vermekten çekinen, henüz öğrenmemiş veya açıklamakta zorlanan bir öğrenciyi korkutmak için kullanmıyoruz.\n\nDersimizin bağlantısı, bilgiyi sırf başkasını geride bırakmak için saklamama sorumluluğudur. Emin olmadığın konuda araştırma isteyebilir, kişisel bilgileri koruyabilir ve uzmanlık gerektiren bir soruyu doğru kişiye yönlendirebilirsin. Sorumlu paylaşım, her şeyi herkese yaymak demek değildir.",
    takeaway: [
      "Bildiğim ve doğruladığım bilgiyi faydalı biçimde paylaşabilirim.",
      "Bilmediğim konuda biliyormuş gibi konuşmamalıyım.",
      "Paylaşırken mahremiyeti ve konunun sınırını gözetebilirim.",
    ],
    source: "Ebû Dâvûd, es-Sünen, İlim, hadis 3658; çevrim içi değerlendirme: Elbânî, hasen sahih",
    url: "https://sunnah.com/abudawud:3658",
  },
  {
    title: "Muhatabı uzaklaştırmadan açıklamak",
    arabic: "يَسِّرُوا وَلاَ تُعَسِّرُوا، وَبَشِّرُوا وَلاَ تُنَفِّرُوا",
    meaning: "Kolaylaştırın, zorlaştırmayın; müjdeleyin, nefret ettirmeyin.",
    text: "Buhârî bu rivayeti insanları bıktırmadan bilgi ve öğüt verme bağlamındaki bölümde aktarır.¹ Muhatabın öğrenme şartlarını gözetmek, sorusunu değiştirmek veya doğru bilgiyi saklamak değildir. Açıklamanın dilini ve yoğunluğunu onun anlayabileceği biçimde düzenlemeyi düşündürür.\n\nBediüzzaman’ın çağının sorularına yönelişini incelerken de metnin muhatabını ve ihtiyacını belirliyoruz. Günlük bir konuşmada önce soruyu dinleyip ortak kavramları açıklamak, hazır bir metni aralıksız aktarmaktan daha uygun olabilir.",
    takeaway: [
      "Açıklamamın muhatabın sorusuyla ilişkisini kontrol edebilirim.",
      "Anlaşılmayan kelimeyi açıklayabilirim.",
      "Konuşmanın süresini ve yoğunluğunu gözetebilirim.",
    ],
    source: "Buhârî, el-Câmiʿu’s-sahîh, İlim, hadis 69",
    url: "https://sunnah.com/bukhari:69",
  },
  {
    title: "Duyduğunu doğru ulaştırmak",
    arabic: "لِيُبَلِّغِ الشَّاهِدُ الْغَائِبَ",
    meaning: "Burada bulunan, bulunmayana ulaştırsın.",
    text: "Bu kısa bölüm, can, mal ve onurun korunmasını bildiren bir konuşmanın sonunda yer alır. Rivayetin devamında kendisine aktarılan kişinin daha iyi kavrayabileceği belirtilir.¹ Yalnız kendi anladığımızı korumak yetmez; aktarımın başkasının kavramasına imkân verecek doğrulukta olması da önemlidir.\n\nDelil çalışmasında yazarın iddiasını değiştirerek aktarmak, daha ilk adımda düşünme imkânını bozar. Bir arkadaşına açıklama yaparken önce kısa kaynak cümlesini aynen ver, sonra kendi yorumuna geç. Kaynağı ve yorumu ayrı göstermek, yeniden inceleme fırsatı bırakır.",
    takeaway: [
      "Alıntıyı doğru aktarabilirim.",
      "Kendi açıklamamı rivayetin sözü gibi göstermemeliyim.",
      "Dinleyenin yeniden kaynağa dönmesine imkân verebilirim.",
    ],
    source: "Buhârî, el-Câmiʿu’s-sahîh, İlim, hadis 67",
    url: "https://sunnah.com/bukhari/3/9",
  },
  {
    title: "Amaç ile yapılan iş arasındaki bağ",
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    meaning: "Ameller niyetlere göredir; her kişiye ancak niyet ettiği vardır.",
    text: "Rivayet niyetin ameldeki yerini hicret örneğiyle açıklar.¹ Hayatın merkezini düşünürken amaç cümlesinin yanında davranışlarımızı da inceleyebiliriz. Bu hadis, iyi bir niyet söylemenin her yöntemi doğru hâle getirdiğini ifade etmez.\n\nÜniversite veya çalışma planındaki bir kararını ele al. Niyetini, kullandığın yöntemi ve başkalarının hakkını ayrı satırlarda göster. Birinde fark ettiğin uyumsuzluğu düzeltmek, amacınla davranışın arasındaki bağı güçlendirebilir. Başkasının niyetini yargılamaya geçmeden kendi kararında dur.",
    takeaway: [
      "Amacımı seçtiğim davranışla birlikte değerlendirebilirim.",
      "İyi niyetle beraber yöntemin doğruluğunu da gözetebilirim.",
      "Kendi kararımı gözden geçirirken başkasının iç dünyasını yargılamamalıyım.",
    ],
    source: "Buhârî, el-Câmiʿu’s-sahîh, Bed’ü’l-vahy, hadis 1",
    url: "https://sunnah.com/bukhari:1",
  },
];
const siyer: readonly SupportingText[] = [
  {
    title: "İlk vahiy: Okuma çağrısıyla tanışmak",
    text: "Hz. Âişe’nin rivayetinde Hira’daki ilk vahiy tecrübesi anlatılır ve Alak sûresinin ilk âyetleri aktarılır. Hz. Hatice’nin desteği de bu anlatıda yer alır.¹ Okuma çağrısıyla başlayan bu tecrübe, Kur’an’ın rehberliğiyle tanışmanın siyer içindeki önemli bir başlangıcıdır.\n\nİsrâ 17/9’da okuduğumuz rehberlik vurgusunu bu başlangıçla birlikte düşünebiliriz. Kur’an’ın vahiy oluşuyla bir yazarın onun üzerine yazdığı açıklamayı ayrı tutuyoruz. Risale metnine dönerken de onun Kur’an’ı anlamaya yönelik bir eser olduğunu hatırlıyoruz.",
    takeaway: [
      "İlk vahiy anlatısını kaynağında bulunan ayrıntılarla öğrenebilirim.",
      "Kur’an ile onun açıklaması arasındaki farkı koruyabilirim.",
      "Okuduğum metne rehberlik fikriyle yeniden dönebilirim.",
    ],
    source: "Buhârî, el-Câmiʿu’s-sahîh, Bed’ü’l-vahy, hadis 3",
    url: "https://sunnah.com/bukhari:3",
  },
  {
    title: "İlk vahyin yakın çevrede karşılanması",
    text: "İlk vahiy rivayetinde Hz. Muhammed’in Hz. Hatice’ye dönmesi, onun desteği ve Varaka b. Nevfel’le görüşme anlatılır.¹ Büyük bir başlangıcın önce yakın çevrede karşılanmasını, kaynakta bulunan bu kişiler üzerinden görüyoruz. Sonraki yayılma sürecinin bütün ayrıntılarını bu tek rivayetten çıkarmıyoruz.\n\nHarita ve kronoloji çalışmasında da aynı dikkat gereklidir. Kaynakta bulunan kişilerle olayları kaydetmek yeterlidir. Küçük bir başlangıcı anlamlı göstermek için hayalî konuşma veya mekân ayrıntısı eklemek zorunda değiliz.",
    takeaway: [
      "Bir olayın ilk çevresini kaynakla belirleyebilirim.",
      "Bir rivayetin anlatmadığı dönemi ondan çıkarmamalıyım.",
      "Küçük başlangıçları abartılı ayrıntılar eklemeden inceleyebilirim.",
    ],
    source: "Buhârî, el-Câmiʿu’s-sahîh, Bed’ü’l-vahy, hadis 3",
    url: "https://sunnah.com/bukhari:3",
  },
  {
    title: "Mesajı ulaştırma sorumluluğu",
    text: "Veda Haccı’na dair rivayette Hz. Peygamber can, mal ve onurun korunmasını bildirir ve orada bulunanlardan sözünü bulunmayanlara ulaştırmalarını ister.¹ Bilgi, dinleyicinin zihninde kalacak bir hatıra olarak bırakılmaz; başkasına doğru aktarılması gereken bir mesajdır.\n\nBu tarihî örnek, sınıftaki her paylaşımın aynı göreve eşit olduğu anlamına gelmez. Dersimizde üzerinde durduğumuz bağ, öğrenilenin başkasının faydasına doğru biçimde ulaşmasıdır. Bir kaynak cümlesini açıklarken onun kapsamını korumak bu sorumluluğun küçük bir uygulamasıdır.",
    takeaway: [
      "Paylaştığım bilginin doğruluğunu gözetebilirim.",
      "Bir mesajın kapsamını aktarımda koruyabilirim.",
      "Bilgiyi başkasının faydasıyla birlikte düşünebilirim.",
    ],
    source: "Buhârî, el-Câmiʿu’s-sahîh, hadis 4406",
    url: "https://sunnah.com/bukhari:4406",
  },
  {
    title: "Anlaşılmayan kavrama açıklama getirmek",
    text: "Bir rivayette sahabiler bir âyette geçen zulüm ifadesini okuyunca bunun kendileriyle ilgili ağır bir sonuç doğurduğunu düşünürler. Hz. Peygamber, Lokmân sûresindeki açıklamaya başvurarak burada kastedilenin şirk olduğunu belirtir.¹ Soru, metnin bir kavramının nasıl anlaşılacağıyla ilgilidir; cevap da bu kavramı açıklığa kavuşturur.\n\nGünümüzdeki bir soruyu dinlerken de hangi kelimenin hangi anlamda kullanıldığını belirlemek gerekir. Bu rivayeti her soruya tek bir âyetle cevap bulunacağını göstermek için kullanmıyoruz. Metni ve muhatabın anlamasını birlikte gözeten açıklama biçimine bakıyoruz.",
    takeaway: [
      "Sorunun takıldığı kavramı belirleyebilirim.",
      "Açıklama için ilgili metne dönebilirim.",
      "Bir örneğin sınırını koruyabilirim.",
    ],
    source: "Buhârî, el-Câmiʿu’s-sahîh, hadis 3360",
    url: "https://sunnah.com/bukhari:3360",
  },
  {
    title: "Açıklamanın dayanağını göstermek",
    text: "Sahabilerin bir âyetteki zulüm ifadesi üzerine tereddüdünü anlatan rivayette Hz. Peygamber, açıklamasını Lokmân sûresindeki şirk ifadesiyle ilişkilendirir.¹ Burada yalnız sonuç söylenmez; sonucun hangi metinle bağ kurduğu da görülür.\n\nDelil incelemesinde bu dikkatten yararlanabiliriz: söylenen düşünceyi ve gösterilen dayanağı ayrı kaydetmek. Rivayetin kendi açıklamasını, ders için kurduğumuz kütüphane benzetmesinden ayırıyoruz. Peygamber’in açıklamasıyla bir öğrencinin akıl yürütmesi aynı kaynak konumunda değildir.",
    takeaway: [
      "Bir açıklamanın gösterdiği dayanağı kaydedebilirim.",
      "Kaynağı kendi örneğimle karıştırmamalıyım.",
      "Aktardığım ilişkinin metinde gerçekten bulunup bulunmadığını kontrol edebilirim.",
    ],
    source: "Buhârî, el-Câmiʿu’s-sahîh, hadis 3360",
    url: "https://sunnah.com/bukhari:3360",
  },
  {
    title: "Aile hayatı ile ibadet arasındaki bağ",
    text: "Hz. Âişe’nin rivayetinde Resûlullah’ın evde ailesinin işlerine yardım ettiği, namaz vakti geldiğinde namaza çıktığı anlatılır.¹ Aile içindeki emek ile ibadet, aynı hayat içinde farklı işler olarak yer alır. Bu rivayet toplumsal hayatının bütün yönlerini anlatmaz; bugün seçtiğimiz sınırlı örnektir.\n\nBir hayatın merkezini düşünürken farklı sorumlulukların aynı gün içinde nasıl karşılık bulduğuna bakabiliriz. Kendi planında ders, aile ve gönüllü çalışma için verdiğin sözleri kaydet. Bir alandaki iyi niyeti, diğer alandaki sorumluluğu unutmanın gerekçesi yapma.",
    takeaway: [
      "Hayatın farklı alanlarında sorumluluklarımı birlikte görebilirim.",
      "Bir rivayetin kapsamını koruyabilirim.",
      "Amaç cümlemi günlük emekle ilişkilendirebilirim.",
    ],
    source: "Buhârî, el-Câmiʿu’s-sahîh, hadis 676",
    url: "https://sunnah.com/bukhari:676",
  },
];
const sahabe: readonly SupportingText[] = [
  {
    title: "Zeyd b. Sâbit: Okunan metni korumak",
    text: "Zeyd b. Sâbit vahiy kâtiplerindendir. Kur’an’ın Hz. Ebû Bekir döneminde bir araya getirilmesinde ve Hz. Osman döneminde mushafların çoğaltılmasında görev almıştır.¹ Böylece öğrenme, yazma ve metni sonraki nesillere ulaştırma sorumluluğu onun hayatında bir arada görülür.\n\nYeniden okuma kartımız bu tarihî çalışmayla aynı işlem değildir. Ancak asıl cümleyi değiştirmeden kaydetme dikkatini geliştirebiliriz. İkinci okuyuşunda oluşan kendi açıklamanı, kaydettiğin kaynak cümlesinin yanına ayrı yaz.",
    takeaway: [
      "Metni olduğu gibi kaydetmeye dikkat edebilirim.",
      "Yeni açıklamamı asıl cümleden ayırabilirim.",
      "Bir bilginin sonraki okuyucuya doğru ulaşmasını önemseyebilirim.",
    ],
    source: "Bünyamin Erul, “Zeyd b. Sâbit”, TDV İslâm Ansiklopedisi",
    url: "https://islamansiklopedisi.org.tr/zeyd-b-sabit",
  },
  {
    title: "Hz. Hatice: Başlangıçtaki destek ve güven",
    text: "Hz. Hatice, ilk vahiy tecrübesinin ardından Hz. Muhammed’e destek olmuş, onu dinlemiş ve Varaka b. Nevfel’le görüşmesine eşlik etmiştir.¹ Bu, yeni bir durum karşısında yakın çevrenin desteğini gösteren kaynaklı bir örnektir. Onun adına kaynağın aktarmadığı bir konuşma yazmıyoruz.\n\nBir arkadaşın yeni bir okuma çalışmasına başladığında onu dinlemek ve ihtiyaç duyduğu kaynağı bulmasına yardım etmek, kendi hayatında deneyebileceğin küçük bir destektir. Bu uygulamayı tarihî olayın aynısı saymıyoruz; anlatıdan bir ilişki biçimi üzerinde düşünüyoruz.",
    takeaway: [
      "Bir başlangıçta desteğin yerini fark edebilirim.",
      "Dinlemeden hazır yorum yapmamaya çalışabilirim.",
      "Tarihî anlatıya hayalî söz eklememeliyim.",
    ],
    source: "M. Yaşar Kandemir, “Hatice”, TDV İslâm Ansiklopedisi",
    url: "https://islamansiklopedisi.org.tr/hatice",
  },
  {
    title: "Zeyd b. Sâbit: Bilgiyi emanet olarak taşımak",
    text: "Zeyd b. Sâbit’in vahiy kâtipliği ve Kur’an’ın derlenip çoğaltılmasındaki görevleri, metni koruma sorumluluğunu gösterir.¹ Sahip olunan bilgi burada yalnız bir yetenek işareti değildir; başkalarının okuyacağı kaynağın doğruluğuyla ilişkilidir.\n\nGrup çalışmasında kullandığın bir alıntının sahibini, eserini ve sayfasını yaz. Sonra alıntıyla açıklamanın sınırını kontrol et. Kaynak gösterme işini başkasına üstün görünmek için değil, onun da kontrol edebilmesine yardım etmek için yap.",
    takeaway: [
      "Bilgiyi başkasının erişebileceği biçimde kaydedebilirim.",
      "Aktarımın doğruluğu için emek verebilirim.",
      "Kaynak göstermekle ortak çalışmayı güçlendirebilirim.",
    ],
    source: "Bünyamin Erul, “Zeyd b. Sâbit”, TDV İslâm Ansiklopedisi",
    url: "https://islamansiklopedisi.org.tr/zeyd-b-sabit",
  },
  {
    title: "Mus‘ab b. Umeyr: Yeni bir çevrede öğretmek",
    text: "Mus‘ab b. Umeyr, Birinci Akabe Biatı’nın ardından Medine’ye öğretici olarak gönderilmiş, Es‘ad b. Zürâre’nin desteğiyle çalışmıştır.¹ Bilginin yeni bir çevreye taşınması, o çevredeki insanlarla ilişki kurmayı da gerektirir. Biyografik bilgi, onun adına bugünkü bir sınıf konuşması üretmemize izin vermez.\n\nBu haftanın muhatabı anlama çalışmasında, bir kavramı bilmeyen arkadaşına kısa bir açıklama hazırla. Önce onun nerede zorlandığını dinle. Doğru bilgiyi koruyarak örneğin dilini anlaşılır hâle getir.",
    takeaway: [
      "Öğretirken muhatabın ihtiyacını dinleyebilirim.",
      "Bilgiyi anlaşılır bir dille açıklayabilirim.",
      "Tarihî kişi adına kaynaksız konuşma yazmamalıyım.",
    ],
    source: "Hüseyin Algül, “Mus‘ab b. Umeyr”, TDV İslâm Ansiklopedisi",
    url: "https://islamansiklopedisi.org.tr/musab-b-umeyr",
  },
  {
    title: "Hz. Ali: Bilgi ve hüküm verirken dikkat",
    text: "TDV maddesinin ilmî şahsiyet bölümünde Hz. Ali’nin Kur’an ve dinî ilimlerle ilgili bilgisi, meseleleri değerlendirme ve hüküm verme yönü anlatılır.¹ Burada ona nispet edilen fakat doğrulanmayan vecizelerden birini aktarmıyoruz. Kaynakta incelenen bilgi ve değerlendirme ilişkisini esas alıyoruz.\n\nBir görüşü değerlendirirken önce dayandığı bilgiyi belirle. Sonucu, onu söyleyen kişiye duyduğun yakınlığın tek başına üretmediğini göster. Dersindeki iddia, gerekçe ve örnek ayrımı, acele hüküm vermemek için kullanabileceğin küçük bir yöntemdir.",
    takeaway: [
      "Bir değerlendirmenin dayandığı bilgiyi arayabilirim.",
      "Kaynaksız bir vecizeyi tanınmış bir kişiye nispet etmemeliyim.",
      "Sonuçla gerekçe arasındaki bağlantıyı gösterebilirim.",
    ],
    source: "M. Yaşar Kandemir, “Ali” (ilmî şahsiyeti, 2. bölüm), TDV İslâm Ansiklopedisi",
    url: "https://islamansiklopedisi.org.tr/ali#2",
  },
  {
    title: "Hz. Ebû Bekir: Farklı görevlerde devam eden sorumluluk",
    text: "Hz. Ebû Bekir ilk Müslümanlar arasında yer almış, hicrette Hz. Peygamber’e arkadaşlık etmiş ve daha sonra ilk halife olmuştur.¹ Arkadaşlık ve yöneticilik farklı görevlerdir. Bir kişinin hayatında değişen görevlere bakarak devam eden bağlılık ile yeni sorumlulukların ilişkisini inceleyebiliriz.\n\nBu biyografiyi her dönemdeki bütün kararları tek bir cümleyle açıklamak için kullanmıyoruz. Kendi planında öğrenci, aile üyesi ve grup arkadaşı olarak üstlendiğin görevleri ayır. Ortak bir ilkenin bu görevlerde nasıl farklı davranışlara dönüştüğünü bir örnekle göster.",
    takeaway: [
      "Değişen görevlerle devam eden değerleri birlikte düşünebilirim.",
      "Bir biyografiyi tek bir övgü cümlesine indirgememeliyim.",
      "Kendi sorumluluklarım arasında bağlantı kurabilirim.",
    ],
    source: "Mustafa Fayda, “Ebû Bekir”, TDV İslâm Ansiklopedisi",
    url: "https://islamansiklopedisi.org.tr/ebu-bekir",
  },
];
const videoThemes = [
  "Kur’an, kitap, okuma, Risale-i Nur’u anlama",
  "Said Nursî, Barla, eserlerin yazılması",
  "ilim, sorumluluk, Said Nursî",
  "Bediüzzaman, çağın soruları, iman",
  "Bediüzzaman, delil, iman hakikatleri",
  "Bediüzzaman, hayat gayesi, iman hizmeti",
];
const videoTasks = [
  "Yeniden okumanın anlamaya nasıl yardım ettiğine dair bir ifadeyi kendi cümlenle özetle.",
  "Biyografik anlatımla konuşmacının yorumunu ayır; anlatılan olay için yazılı kaynakla karşılaştırma yap.",
  "Bilginin başkasının faydasına dönüştüğü bir davranışı not et.",
  "Konuşmada ele alınan soruyu ve o sorunun muhatabını ayrı belirt.",
  "Bir iddiayı, onun dayanağını ve varsa açıklayıcı benzetmesini ayır.",
  "Amaç ile çalışma yönteminin birbirine bağlandığı bir örneği kaydet.",
];
function entry(
  grade: number,
  categoryId: CurriculumCategoryId,
  title: string,
  body: string,
  resourceUrl?: string
): CurriculumEntry {
  return {
    id: `g${grade}-${categoryId}-eylul-2`,
    grade,
    categoryId,
    month: 9,
    week: 2,
    year: 2026,
    isExtra: false,
    title,
    body,
    resourceUrl,
  };
}
function supportingBody(content: SupportingText, word: string, definition: string): string {
  const hadith = content.arabic
    ? `**Hadisin Arapça metninden seçilen bölüm:**\n\n> ${content.arabic}\n\n**Türkçe anlamı (ders için çeviri):**\n\n> “${content.meaning}”¹\n\n`
    : "";
  return `# ${content.title}\n\n${hadith}${content.text}\n\n# Bana Ne Söylüyor?\n\n${content.takeaway.map((value) => `- ${value}`).join("\n\n")}\n\n# Kelimeler\n\n- **${word}:** ${definition}\n\n# Dipnotlar\n\n¹ ${content.source} (erişim ${accessDate}), ${content.url}. ${content.arabic ? "Numara bu çevrim içi dizinin numaralandırmasıdır; Türkçe çeviri ders için hazırlanmıştır." : "Ders için kaynaklı kısa anlatım; doğrudan alıntı değildir."}`;
}
/** Only September week two; preserves existing weeks and intentional seed exclusions. */
export function getSecondWeekCurriculumEntries(): CurriculumEntry[] {
  return secondWeekKonuItems.flatMap((item) => {
    const n = item.grade - 1;
    const arabic = item.sections.find((section) => section.kind === "arabic")!;
    const meal = item.sections.find((section) => section.heading === "Suat Yıldırım Meali")!;
    const note = item.sections.find(
      (section) => section.heading === "Âyetin dersimizle bağlantısı"
    )!;
    const videoUrl = "https://herkul.org/herkul-nagme/";
    return [
      entry(item.grade, "konu", item.title, item.body),
      entry(
        item.grade,
        "ayet",
        arabic.heading!,
        `# ${arabic.heading}\n\n> ${arabic.paragraphs[0]}\n\n**Suat Yıldırım Meali:**\n\n> “${meal.paragraphs[0]}”¹\n\n${note.paragraphs.join("\n\n")}\n\n# Bana Ne Söylüyor?\n\n- Âyeti kendi konusu içinde okuyabilirim.\n- Meal ile dersin yorumunu ayırabilirim.\n- Ana dersteki uygulamayla bağını açıklayabilirim.\n\n# Kelimeler\n\n- **Meal:** Kur’an’ın anlamının başka dilde aktarılması.\n\n# Dipnotlar\n\n¹ ${item.sources[0]}`
      ),
      entry(
        item.grade,
        "hadis",
        hadiths[n].title,
        supportingBody(hadiths[n], "Rivayet", "Bir sözün veya olayın kaynağıyla aktarılması."),
        hadiths[n].url
      ),
      entry(
        item.grade,
        "efendimiz",
        siyer[n].title,
        supportingBody(
          siyer[n],
          "Siyer",
          "Hz. Peygamber’in hayatını inceleyen bilgi ve anlatı alanı."
        ),
        siyer[n].url
      ),
      entry(
        item.grade,
        "sahabe-kissalari",
        sahabe[n].title,
        supportingBody(
          sahabe[n],
          "Sahabi",
          "Hz. Peygamber’i mümin olarak görüp Müslüman olarak vefat eden kişi."
        ),
        sahabe[n].url
      ),
      entry(
        item.grade,
        "hocaefendi-dinleme",
        `Arşiv araştırması — ${item.title}`,
        `# Dinleme kaynağını araştırıyorum\n\nBu hafta için arşivde aranacak kelimeler: **${videoThemes[n]}**.¹\n\nBu kayıt bir arşiv araştırma etkinliğidir. Haftaya uygun belirli bir video, toplam süre ve kısa kesit zaman kodları henüz doğrulanmamıştır; arşiv bağlantısı hazır bir sohbet kaydı olarak sunulmaz. Öğretmen, bulduğu kaydı önceden dinleyip yaş grubuna uygunluğunu, başlığını, yayın tarihini ve süresini kontrol ederek kullanabilir.\n\n### Kaynak kartı ve dinleme notu\n\n- Bulunan kaydın tam bağlantısını, başlığını ve tarihini yaz.\n- Kaydı dinlemeden süre veya zaman kodu üretme; doğrulanan kesitin başlangıç ve bitişini kaydet.\n- ${videoTasks[n]}\n- Dinleme 40 dakikalık ana dersin dışında isteğe bağlı destektir. Uygun kayıt bulunmazsa ana dersteki doğrulanmış Hocaefendi pasajıyla çalış.\n\n# Bana Ne Söylüyor?\n\n- Başlıkla içeriğin gerçekten örtüşmesini kontrol edebilirim.\n- Kendi özetimi konuşmacının sözü gibi aktarmamalıyım.\n- Doğrulanmayan süreyi kesin bilgi olarak kaydetmemeliyim.\n\n# Kelimeler\n\n- **Arşiv:** Kaynakların saklanıp erişime sunulduğu düzenli bütün.\n- **Zaman kodu:** Kayıttaki belirli anı dakika ve saniyeyle gösteren bilgi.\n\n# Dipnotlar\n\n¹ Herkul, “Herkul Nağme” arşivi (erişim ${accessDate}), ${videoUrl}. Kaynak doğrulaması gerekli: konuya uygun belirli video ve kesit henüz seçilmemiştir.`,
        videoUrl
      ),
    ];
  });
}

import type { CurriculumCategoryId, CurriculumEntry } from "@/lib/curriculum";
import { firstWeekKonuItems } from "./konu-first-weeks";

const accessDate = "28 Eylül 2026";

interface CategoryContent {
  title: string;
  body: string;
  url?: string;
}

const hadithData: CategoryContent[] = [
  {
    title: "Öğrenmek ve Öğretmek",
    body: `# Öğrenmek ve Öğretmek

**Hadisin Arapça metni:**

خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ

**Türkçe anlamı:**

“Sizin en hayırlınız, Kur’an’ı öğrenen ve öğretendir.”¹

Peygamber Efendimiz (s.a.v.), bilginin değerini onu başkalarıyla paylaşmak ve hayata taşımakla açıklar. Öğrenmek insanı geliştirir; öğrendiğini başkasına anlatmak ise hem bilgiyi pekiştirir hem de iyiliği çoğaltır. Bu hafta öğrendiğin kısa bir hakikati arkadaşına kendi kelimelerinle anlatabilirsin.

# Bana Ne Söylüyor?

- Öğrenmeyi sadece kendim için değil, başkalarına faydalı olmak için isteyebilirim.
- Anladığım bir güzelliği arkadaşımla paylaşarak çoğaltabilirim.
- Kur’an’ın rehberliğini öğrenmeye zaman ayırabilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Rivayet:** Peygamber Efendimiz’den (s.a.v.) nakledilen söz, fiil veya haber.
**Talim:** Bir bilgiyi veya beceriyi başkasına öğretme, eğitme faaliyeti.

# Dipnotlar

¹ Buhârî, el-Câmiʿu’s-sahîh, Fedâilü’l-Kur’ân, hadis 5027, Sunnah.com (erişim ${accessDate}), https://sunnah.com/bukhari:5027.`,
    url: "https://sunnah.com/bukhari:5027",
  },
  {
    title: "İlim Yolculuğuna Çıkmak",
    body: `# İlim Yolculuğuna Çıkmak

**Hadisin Arapça metni:**

مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ

**Türkçe anlamı:**

“Kim ilim tahsil etmek için bir yola girerse, Allah ona cennete giden yolu kolaylaştırır.”¹

Bu hadis-i şerif, insanın hakikati aramak için gösterdiği her gayretin kutsal bir yolculuk olduğunu bildirir. İlim öğrenmek için açılan her sayfa, sorulan her samimi soru ve harcanan her dakika insanı olgunlaştırır ve manevi derecesini yükseltir.

# Bana Ne Söylüyor?

- İlim öğrenme gayretimin manevi bir değeri olduğunu fark edebilirim.
- Karşılaştığım zorlukları aşmak için öğrenme azmimi diri tutabilirim.
- Hakikati ararken harcadığım zamanın kıymetini bilebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**İlim:** Gerçeği, varlığın hakikatini ve faydalı bilgiyi sistemli olarak kavrama.
**Sülûk:** Bir gaye veya hakikat uğruna belirli bir yola girip sebatla yürüme.

# Dipnotlar

¹ Müslim, el-Câmiʿu’s-sahîh, Zikir ve Dua, hadis 2699, Sunnah.com (erişim ${accessDate}), https://sunnah.com/muslim:2699.`,
    url: "https://sunnah.com/muslim:2699",
  },
  {
    title: "Suretler Değil, Kalpler ve Ameller",
    body: `# Suretler Değil, Kalpler ve Ameller

**Hadisin Arapça metni:**

إِنَّ اللَّهَ لاَ يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ

**Türkçe anlamı:**

“Allah sizin sûretlerinize ve mallarınıza bakmaz; fakat kalplerinize ve amellerinize bakar.”¹

Bu rivayet, insanın asıl değerinin dış görünüşünde veya zenginliğinde değil; kalbindeki samimiyette ve yaptığı hayırlı amellerde olduğunu ilan eder. İhlas ile yapılan küçük bir iyilik, gösteriş için yapılan büyük işlerden kat kat üstündür.

# Bana Ne Söylüyor?

- İnsanları dış görünüşlerine veya maddi durumlarına göre yargılamamayı öğrenebilirim.
- Davranışlarımda samimiyeti ve Allah rızasını gözetebilirim.
- Kalbimin niyetini ve ahlâkımı sürekli gözden geçirebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**İhlas:** İbadet ve davranışları gösterişten arındırıp sırf Allah rızası için yapma.
**Amel:** İnancın gereği olarak yerine getirilen her türlü hayırlı eylem ve tutum.

# Dipnotlar

¹ Müslim, el-Câmiʿu’s-sahîh, Birr ve Sıla, hadis 2564, Sunnah.com (erişim ${accessDate}), https://sunnah.com/muslim:2564.`,
    url: "https://sunnah.com/muslim:2564",
  },
  {
    title: "Dinde Derin Anlayış ve Kavrayış",
    body: `# Dinde Derin Anlayış ve Kavrayış

**Hadisin Arapça metni:**

مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ

**Türkçe anlamı:**

“Allah, hakkında hayır dilediği kimseye dinde derin bir kavrayış ve anlayış verir.”¹

Hadiste geçen *fıkıh*, bir meselenin sadece kabuğunu bilmek değil; arka planındaki hikmeti, delili ve gayeyi derinlemesine kavramaktır. Bir kitabın sayfalarında gezinirken yüzeysel ezbercilikle yetinmeyip meselenin özüne inmek, Allah’ın insana lütfettiği en büyük hayırlardandır.

# Bana Ne Söylüyor?

- Dini hükümleri ve hakikatleri yüzeysel değil, hikmetleriyle kavramaya çalışabilirim.
- Ezberlemekle yetinmeyip derin kavrayış sahibi olmayı hedefleyebilirim.
- Anlayışımın artması için dua ve gayretle çalışabilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Tefakkuh:** Bir konuyu derinlemesine, incelikleriyle ve delilleriyle anlama kabiliyeti.
**Basiret:** Kalp gözüyle hakikati doğru sezme, doğruyu yanlıştan ayırt etme gücü.

# Dipnotlar

¹ Buhârî, el-Câmiʿu’s-sahîh, İlim, hadis 71, Sunnah.com (erişim ${accessDate}), https://sunnah.com/bukhari:71.`,
    url: "https://sunnah.com/bukhari:71",
  },
  {
    title: "Az da Olsa Devamlı Olan Amel",
    body: `# Az da Olsa Devamlı Olan Amel

**Hadisin Arapça metni:**

وَأَنَّ أَحَبَّ الأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا، وَإِنْ قَلَّ

**Türkçe anlamı:**

“Allah katında amellerin en sevimlisi, az da olsa devamlı olanıdır.”¹

Büyük hedeflere bir günde ulaşılamaz. İlimde ve ahlâkta ilerlemenin sırrı, her gün düzenli ve sebatla atılan küçük adımlardır. Bir gün sabahlara kadar çalışıp günlerce hiçbir şey yapmamak yerine; her gün 15 dakika dikkatle okumak insanı gerçek bir derinliğe ulaştırır.

# Bana Ne Söylüyor?

- Büyük işlerin düzenli küçük adımlarla başarıldığını fark edebilirim.
- Okuma ve ibadetlerimde süreklilik kazanmaya odaklanabilirim.
- Bir gün aksadığında ümitsizliğe düşmeyip ertesi gün kararlılıkla devam edebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Sebat:** Bir kararda ve doğru yolda zorluklara rağmen kararlılıkla durma.
**İstikamet:** Doğruluktan ayrılmadan, dengeli ve sürekli bir çizgide hayat sürme.

# Dipnotlar

¹ Buhârî, el-Câmiʿu’s-sahîh, Rikāk, hadis 6464, Sunnah.com (erişim ${accessDate}), https://sunnah.com/bukhari:6464.`,
    url: "https://sunnah.com/bukhari:6464",
  },
  {
    title: "Birbirini Kenetleyen Sağlam Yapı",
    body: `# Birbirini Kenetleyen Sağlam Yapı

**Hadisin Arapça metni:**

إِنَّ الْمُؤْمِنَ لِلْمُؤْمِنِ كَالْبُنْيَانِ، يَشُدُّ بَعْضُهُ بَعْضًا

**Türkçe anlamı:**

“Mümin, diğer mümin için parçaları birbirini kenetleyip güçlendiren sağlam bir bina gibidir.”¹

Peygamber Efendimiz (s.a.v.), inananların birlik ve dayanışmasını tuğlaları birbirine kenetlenmiş muhkem bir yapıya benzetir. Her mümin o yapının vazgeçilmez bir taşıdır. Fertlerin bencillikten sıyrılıp ortak bir mefkûre etrafında kenetlenmesi, topluma sarsılmaz bir kudret ve ahlâkî duruş kazandırır.

# Bana Ne Söylüyor?

- Kendi başarım kadar arkadaşlarımın ve toplumun iyiliğini de düşünebilirim.
- Dayanışma ve kardeşlik şuurunu günlük ilişkilerimde canlı tutabilirim.
- Toplumun birlik ve huzuruna katkı sunacak bir duruş sergileyebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Bünyan:** Sağlam temeller üzerine kurulmuş, parçaları birbirine bağlı bina, yapı.
**Uhuvvet:** Samimi inanç birliğinden doğan derin kardeşlik bağı.

# Dipnotlar

¹ Buhârî, el-Câmiʿu’s-sahîh, Salât, hadis 481, Sunnah.com (erişim ${accessDate}), https://sunnah.com/bukhari:481.`,
    url: "https://sunnah.com/bukhari:481",
  },
];

const siyerData: CategoryContent[] = [
  {
    title: "Hira Mağarası ve İlk Vahiy",
    body: `# Hira Mağarası ve İlk Vahiy

Peygamber Efendimiz (s.a.v.), peygamberlik verilmeden önceki dönemde Mekke’nin kargaşasından uzaklaşarak Hira Mağarası’nda günlerce tefekküre çekilirdi. Kâinatın yaratılışı, insanın varoluş gayesi ve toplumdaki haksızlıklar üzerinde derin düşüncelere dalardı. Nihayet Ramazan ayının bir gecesinde Cebrail (a.s.) geldi ve insanlığa ilk ilahî emri ulaştırdı: “Yaratan Rabbinin adıyla oku!”¹

Bu ilk emir, okumanın sadece harfleri birleştirmek değil; kâinatı, insanı ve varlığı Yaratıcının adıyla anlamlandırmak olduğunu gösterir.

# Bana Ne Söylüyor?

- Hayatın telaşı içinde zaman zaman durup düşünmeye ihtiyaç olduğunu fark edebilirim.
- Okumayı Yaratıcımı ve kendimi tanıma vesilesi olarak görebilirim.
- Tefekkürün insanı hakikate hazırlayan mühim bir adım olduğunu bilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Tefekkür:** Varlık ve olaylar üzerinde derinlemesine, ibret nazarıyla düşünme.
**Vahiy:** Allah’ın peygamberlerine bildirdiği ilahî mesaj ve emirler.

# Dipnotlar

¹ Buhârî, el-Câmiʿu’s-sahîh, Bed’ü’l-vahy, hadis 3, Sunnah.com (erişim ${accessDate}), https://sunnah.com/bukhari:3.`,
    url: "https://sunnah.com/bukhari:3",
  },
  {
    title: "Dârü’l-Erkam: Küçük Bir Evde Başlayan Diriliş",
    body: `# Dârü’l-Erkam: Küçük Bir Evde Başlayan Diriliş

İslâm’ın ilk yıllarında Mekke’de müşriklerin ağır baskıları sürerken, Hz. Peygamber (s.a.v.) genç sahabi Erkam b. Ebi’l-Erkam’ın evini bir buluşma ve öğrenme merkezi yaptı. Orada toplanan ilk müslümanlar, gelen ayetleri dinliyor, namaz kılıyor ve hayatlarını Kur’an’ın ahlâkıyla inşa ediyorlardı.¹

Mekke’nin en dar ve mütevazı evlerinden biri olan Dârü’l-Erkam, kısa sürede dünyayı değiştirecek şahsiyetlerin yetiştiği bir ilim ve ihlas ocağına dönüştü.

# Bana Ne Söylüyor?

- Mekânın sadeliğinin yapılan işin büyüklüğüne engel olmadığını görebilirim.
- Hakikati öğrenmek için bir araya gelmenin kardeşliği güçlendirdiğini bilirim.
- Samimi bir başlangıcın zamanla dünyayı aydınlatacak neticeler vereceğine inanabilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Dâr:** Ev, konak, merkezî mekân.
**Muallim:** İlim öğreten, yol gösteren rehber ve öğretmen.

# Dipnotlar

¹ İbn Hişâm, es-Sîretü’n-nebeviyye (Beyrut: Dârü’l-Kütübi’l-İlmiyye), c. 1, s. 260.`,
    url: "https://islamansiklopedisi.org.tr/darulerkam",
  },
  {
    title: "Öğüt ile Yaşayışın Birlikteliği",
    body: `# Öğüt ile Yaşayışın Birlikteliği

Hz. Âişe validemize Resûlullah’ın (s.a.v.) ahlâkı sorulduğunda şu veciz cevabı vermiştir: “Sen Kur’an okumuyor musun? Onun ahlâkı Kur’an’dı.”¹ Peygamber Efendimiz, ümmetine emrettiği her güzelliği önce kendi hayatında en mükemmel şekilde yaşamış; insanları söylerken tereddüde düşürmeyen canlı bir örnek olmuştur.

Evde ailesine yardım eden, sokakta selamı yayan, fakirlerin derdiyle dertlenen Efendimiz (s.a.v.), temsilin tebliğden önce geldiğini göstermiştir.

# Bana Ne Söylüyor?

- Doğru bildiğim değerleri önce kendi hayatımda yaşamaya gayret edebilirim.
- İnsanlara güzel ahlâkımla örnek olmanın sözden daha etkili olduğunu fark edebilirim.
- Efendimiz’in Kur’an ahlâkını günlük ilişkilerimde rehber edinebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Üsve-i Hasene:** En güzel örnek, takip edilmesi gereken mükemmel şahsiyet.
**Temsil:** İnandığı hakikatleri bizzat yaşayarak başkalarına numune olma.

# Dipnotlar

¹ Müslim, el-Câmiʿu’s-sahîh, Müsâfirîn, hadis 746, Sunnah.com (erişim ${accessDate}), https://sunnah.com/muslim:746.`,
    url: "https://sunnah.com/muslim:746",
  },
  {
    title: "Âyetleri Kaynağından Öğrenmek",
    body: `# Âyetleri Kaynağından Öğrenmek

En‘âm sûresinin “İman edip de imanlarına zulüm bulaştırmayanlar...” ayeti indiğinde sahabiler telaşlanarak “Hangimiz nefsine zulmetmez ki?” diye endişe ettiler. Bunun üzerine Peygamber Efendimiz (s.a.v.), buradaki zulmün Lokman aleyhisselamın oğluna dediği gibi “şirk” olduğunu açıklayarak zihinlerindeki şüpheyi giderdi.¹

Sahabe-i kiram, anlaşılmayan bir meselede kendi tahminleriyle yetinmeyip doğrudan vahyin kaynağına başvurarak doğru manayı öğrenme hassasiyetini göstermiştir.

# Bana Ne Söylüyor?

- Anlamadığım bir ayet veya dini konuda tahmin yürütmek yerine güvenilir kaynağa başvurabilirim.
- Soru sormanın öğrenmenin en tabii ve sıhhatli yolu olduğunu bilirim.
- Kaynağa gitmenin insanı yanlış yorumlardan koruyacağını fark edebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Tefsir:** Kur’an-ı Kerim ayetlerini açıklama, manalarını ortaya koyma ilmi.
**Hikmet:** Bir hükmün veya sözün derin gayesi, ardındaki isabetli maksat.

# Dipnotlar

¹ Buhârî, el-Câmiʿu’s-sahîh, Tefsîr, hadis 4628, Sunnah.com (erişim ${accessDate}), https://sunnah.com/bukhari:4628.`,
    url: "https://sunnah.com/bukhari:4628",
  },
  {
    title: "Muâz b. Cebel’in Hüküm Usulü",
    body: `# Muâz b. Cebel’in Hüküm Usulü

Peygamber Efendimiz (s.a.v.), genç sahabi Muâz b. Cebel’i Yemen’e vali ve kadı olarak gönderirken sordu: “Sana bir dava geldiğinde neyle hükmedersin?” Muâz: “Allah’ın Kitabı ile.” dedi. “Onda bulamazsan?” buyurdu. “Resûlullah’ın Sünneti ile.” dedi. “Onda da açıkça bulamazsan?” diye sorunca Muâz: “Kendi aklımla ictihad ederim (hüküm çıkarırım).” dedi. Bunun üzerine Efendimiz (s.a.v.) memnuniyetle onun göğsüne vurdu ve Allah’a hamdetti.¹

Bu olay, İslâm düşüncesinde kaynak hiyerarşisini ve basiretli muhakeme disiplinini ortaya koyan en meşhur tarihi tablodur.

# Bana Ne Söylüyor?

- Karşılaştığım meselelerde önce temel kaynaklara, ardından sağlam usullere başvurabilirim.
- Aklımı ve muhakememi vahyin rehberliğinde doğru işletmeyi öğrenebilirim.
- Sorumluluk alırken bilgi ve yöntem sahibi olmanın değerini bilebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**İçtihad:** Bir hüküm çıkarmak için bütün zihnî gayreti sarf etme, derin muhakeme.
**Kaza:** Hukuki ve ahlâki bir meselede hakkaniyetle hüküm verme görevi.

# Dipnotlar

¹ Ebû Dâvûd, es-Sünen, Akdiye, hadis 3592, Sunnah.com (erişim ${accessDate}), https://sunnah.com/abudawud:3592.`,
    url: "https://sunnah.com/abudawud:3592",
  },
  {
    title: "Veda Haccı: Bütünlük ve Haklar",
    body: `# Veda Haccı: Bütünlük ve Haklar

Peygamber Efendimiz (s.a.v.), yüz bini aşkın sahabiye hitap ettiği Veda Hutbesi’nde inanç, insan hakları, adalet ve sosyal sorumlulukları tek bir bütün olarak ilan etmiştir. “Ey insanlar! Kanlarınız, mallarınız ve canlarınız mukaddestir...” buyurarak fertlerin haklarını teminat altına almış; orada bulunanlardan bu evrensel mesajı bulunmayanlara ulaştırmalarını istemiştir.¹

Veda Hutbesi, dinin tamamlandığı ve hayatın bütün alanlarının ilahi adaletle kucaklandığı muazzam bir vasiyetnamedir.

# Bana Ne Söylüyor?

- İnsan haklarının ve adaletin inancımın ayrılmaz bir parçası olduğunu bilirim.
- Öğrendiğim evrensel güzellikleri sonraki nesillere aktarma sorumluluğu duyabilirim.
- Hayatımın her alanında adalet ve emanet şuurunu koruyabilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Hürmet:** Dokunulmazlık, saygınlık ve kutsiyet.
**Tebliğ:** Hakikati doğru, eksiksiz ve açık şekilde muhataplara ulaştırma.

# Dipnotlar

¹ Buhârî, el-Câmiʿu’s-sahîh, Hac, hadis 1741; Meğâzî, hadis 4406, Sunnah.com (erişim ${accessDate}), https://sunnah.com/bukhari:4406.`,
    url: "https://sunnah.com/bukhari:4406",
  },
];

const sahabeData: CategoryContent[] = [
  {
    title: "Hz. Ali: Genç Yaşta İlim ve Hikmet",
    body: `# Hz. Ali: Genç Yaşta İlim ve Hikmet

Hz. Ali (r.a.), çocuk yaşından itibaren Peygamber Efendimiz’in (s.a.v.) hanesinde büyümüş, vahyin inişine ilk günden itibaren şahit olmuştur. Yaşının genç olması onu büyük hakikatleri anlamaktan alıkoymamış; cesareti, üstün zekâsı ve ilme olan derin iştiyakıyla ashabın en seçkin âlimleri arasında yer almıştır.¹

Peygamberimiz onun hakkında “Ben ilmin şehriyim, Ali de onun kapısıdır.” buyurarak onun kavrayış derinliğini taltif etmiştir.

# Bana Ne Söylüyor?

- Yaşımın genç olmasının büyük hakikatleri öğrenmeme engel olmadığını fark edebilirim.
- İlim ve hikmete aşkla sarılarak kendimi yetiştirebilirim.
- Sorularımı cesaretle sorup doğru kaynaktan öğrenme gayreti gösterebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Fetanet:** Üstün zekâ, derin kavrayış ve basiret.
**İntisap:** Bir davaya, rehbere veya hakikat yoluna gönülden bağlanma.

# Dipnotlar

¹ Ethem Ruhi Fığlalı, “Ali”, TDV İslâm Ansiklopedisi (erişim ${accessDate}), https://islamansiklopedisi.org.tr/ali.`,
    url: "https://islamansiklopedisi.org.tr/ali",
  },
  {
    title: "Mus‘ab b. Umeyr: Hayatın Gayesini Bulmak",
    body: `# Mus‘ab b. Umeyr: Hayatın Gayesini Bulmak

Mus‘ab b. Umeyr (r.a.), Mekke’nin en zengin, en şık ve en itibarlı ailelerinden birinin genciydi. Ancak Dârü’l-Erkam’da Kur’an ile tanıştığında, geçici dünya süslerinin insanın kalbini doyurmaya yetmeyeceğini anladı. Ailesinin bütün servetini ve baskılarını geride bırakıp hakikati seçti.¹

Daha sonra Medine’ye ilk İslâm muallimi olarak gönderildi ve nezaketi, tatlı dili ve Kur’an tilavetiyle koskoca bir şehrin kalbini fethetti.

# Bana Ne Söylüyor?

- Gerçek değerimin sahip olduğum maddi imkânlarda değil, inandığım davada olduğunu bilirim.
- Zorluklar karşısında inancımdan taviz vermeme kararlılığı gösterebilirim.
- Güzel ahlâk ve nezaketle insanlara hakikati sevdirebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Muallim:** İlim ve ahlâk öğreten, örnek olan rehber.
**Fedakârlık:** Yüce bir gaye uğruna şahsi menfaatlerinden seve seve vazgeçebilme.

# Dipnotlar

¹ Hüseyin Algül, “Mus‘ab b. Umeyr”, TDV İslâm Ansiklopedisi (erişim ${accessDate}), https://islamansiklopedisi.org.tr/musab-b-umeyr.`,
    url: "https://islamansiklopedisi.org.tr/musab-b-umeyr",
  },
  {
    title: "Abdullah b. Ömer: Bildiğini Yaşama Titizliği",
    body: `# Abdullah b. Ömer: Bildiğini Yaşama Titizliği

Hz. Ömer’in oğlu Abdullah (r.a.), Peygamber Efendimiz’in (s.a.v.) sünnetini ve ahlâkını günlük hayatında en ince teferruatına kadar yaşamasıyla tanınır. Bir hadisi duyduğunda onu sadece rivayet etmekle kalmaz; hemen kendi davranışlarına tatbik ederdi.¹

Onun hayatında ilim ile amel, söz ile eylem arasında hiçbir boşluk yoktu. Bu titizliği onu ashabın en hürmet edilen fakihlerinden biri kılmıştır.

# Bana Ne Söylüyor?

- Öğrendiğim sünnetleri ve güzellikleri hayatıma geçirme titizliği gösterebilirim.
- Bildiğim hakikatin bende bir ahlâkî sorumluluk doğurduğunu fark edebilirim.
- İlim ile amel uyumunu hayatımın merkezine koyabilirim.

# Bu Hafta Tanıştığımız Kelimeler

**İttiba:** Bir rehberin yolunu ve sünnetini samimiyetle izleme, ona uyma.
**Fakih:** Dinin inceliklerini, hükümlerini ve hikmetlerini derinlemesine bilen âlim.

# Dipnotlar

¹ M. Yaşar Kandemir, “Abdullah b. Ömer”, TDV İslâm Ansiklopedisi (erişim ${accessDate}), https://islamansiklopedisi.org.tr/abdullah-b-omer-b-hattap.`,
    url: "https://islamansiklopedisi.org.tr/abdullah-b-omer-b-hattap",
  },
  {
    title: "Zeyd b. Sâbit: Kaynağı Muhafaza Hassasiyeti",
    body: `# Zeyd b. Sâbit: Kaynağı Muhafaza Hassasiyeti

Zeyd b. Sâbit (r.a.), genç yaşta Kur’an’ı ezberlemiş, İbranice ve Süryanice gibi yabancı dilleri öğrenmiş ve Peygamberimiz’in vahiy kâtipliğini üstlenmiştir. Hz. Ebû Bekir ve Hz. Osman dönemlerinde Kur’an ayetlerinin Mushaf hâlinde toplanması ve çoğaltılması heyetine başkanlık etmiştir.¹

Zeyd, ezberinde olmasına rağmen her ayet için en az iki güvenilir yazılı şahit aramış; kaynak metni korumanın ne kadar titiz bir sorumluluk olduğunu tarihe kazımıştır.

# Bana Ne Söylüyor?

- Kaynak metinleri korumanın ve doğru aktarmanın büyük bir emanet olduğunu bilirim.
- Bilgiye ulaşırken ve aktarırken şahitlik ve doğrulama disiplinine sadık kalabilirim.
- Yabancı dil öğrenerek ve ilimde derinleşerek faydalı bir şahsiyet olabilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Kitâbetü’l-vahy:** İnen ayetleri Peygamberimiz’in huzurunda bizzat yazıya geçirme görevi.
**Mushaf:** Kur’an-ı Kerim sayfalarının bir araya getirilip ciltlenmiş hali.

# Dipnotlar

¹ Bünyamin Erul, “Zeyd b. Sâbit”, TDV İslâm Ansiklopedisi (erişim ${accessDate}), https://islamansiklopedisi.org.tr/zeyd-b-sabit.`,
    url: "https://islamansiklopedisi.org.tr/zeyd-b-sabit",
  },
  {
    title: "Abdullah b. Mes‘ûd: Kur’an’ı Derinlemesine Anlamak",
    body: `# Abdullah b. Mes‘ûd: Kur’an’ı Derinlemesine Anlamak

Abdullah b. Mes‘ûd (r.a.), ilk Müslümanlardan olup Kur’an tilavetini bizzat Resûlullah’ın ağzından dinlemiş ve ezberlemiştir. O, “Allah’ın Kitabı’ndan inen hiçbir ayet yoktur ki, ben onun nerede ve kimin hakkında indiğini bilmeyeyim.” derdi.¹

İbn Mes‘ûd, ayetlerin sadece lafzını değil; iniş sebebini (esbâb-ı nüzul), delilini ve insan hayatındaki hikmetini kavramış büyük bir tefsir ve fıkıh öncüsüdür.

# Bana Ne Söylüyor?

- Okuduğum metinlerin iniş bağlamını ve hikmetini araştırmayı öğrenebilirim.
- Bir eseri lafzıyla birlikte manasıyla da kavramaya gayret edebilirim.
- İlimde derinleşmenin insana tevazu ve hakikat aşkı kazandıracağını fark edebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Esbâb-ı Nüzul:** Kur’an ayetlerinin inişine vesile olan tarihi olay ve sebepler.
**Tefakkuh:** İlimde ve Kur’an anlayışında derinleşme mertebesi.

# Dipnotlar

¹ İsmail Cerrahoğlu, “Abdullah b. Mes‘ûd”, TDV İslâm Ansiklopedisi (erişim ${accessDate}), https://islamansiklopedisi.org.tr/abdullah-b-mesud.`,
    url: "https://islamansiklopedisi.org.tr/abdullah-b-mesud",
  },
  {
    title: "Hz. Ebû Bekir: Sarsılmaz Sıddıkiyet ve Bütünlük",
    body: `# Hz. Ebû Bekir: Sarsılmaz Sıddıkiyet ve Bütünlük

Hz. Ebû Bekir (r.a.), İslâm davasına ilk günden vefatına kadar tek bir şüphe duymadan, tereddütsüz bağlanan sıddıkiyet timsalidir. Mirac hadisesinde müşrikler onu tereddüde düşürmek istediklerinde: “O söylüyorsa şüphesiz doğrudur!” diyerek imanın sarsılmaz bir teslimiyet olduğunu göstermiştir.¹

Onun hayatında inanç, infak, hilafet ve ahlâk arasında hiçbir parçalanma yoktu. Bütün varlığı ve hayatı tek bir yüce merkeze kilitlenmişti.

# Bana Ne Söylüyor?

- Hayatımın her anında sadakat ve istikameti korumayı ilke edinebilirim.
- İmanımı şüphelerden arındırıp sarsılmaz bir teslimiyetle sağlamlaştırabilirim.
- İnancım ile fedakârlığım arasında tutarlı bir bütünlük kurabilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Sıddîk:** Hakikati tereddütsüz tasdik eden, sözünde ve sadakatinde zirveye ulaşan.
**İnfak:** Allah rızası için malını, vaktini ve imkânlarını başkalarına cömertçe sarf etme.

# Dipnotlar

¹ Ethem Ruhi Fığlalı, “Ebû Bekir”, TDV İslâm Ansiklopedisi (erişim ${accessDate}), https://islamansiklopedisi.org.tr/ebu-bekir.`,
    url: "https://islamansiklopedisi.org.tr/ebu-bekir",
  },
];

const dinlemeData: CategoryContent[] = [
  {
    title: "Kâinat Kitabını Okuma ve Tefekkür",
    body: `# Kâinat Kitabını Okuma ve Tefekkür

Bu haftaki dinleme kaydımız, kâinat kitabının sayfalarını tefekkür gözüyle okumanın ve varlıklardaki intizamı fark etmenin insana kazandırdığı iç aydınlığı ele almaktadır.¹ Dinlerken kâinatın hâl dili ile insanın Bismillah demesi arasındaki irtibata dikkat kesil.

# Bana Ne Söylüyor?

- Dinlediğim sohbetten kâinata bakışımı değiştirecek bir fikir çıkarabilirim.
- Tefekkürün kalbimi ve zihnimi nasıl diri tuttuğunu hissedebilirim.
- Dinlediklerimi ana dersteki okumalarımla birleştirebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Mütâlaa:** Bir hakikati dikkatle ve üzerinde düşünerek inceleme.
**Tefekkür:** Varlık ve olayların perde arkasındaki ilahi hikmetleri düşünme.

# Dipnotlar

¹ Herkul, “Kâinat Kitabını Okuma ve Tefekkür”, Herkul Nağme (erişim ${accessDate}), https://herkul.org/herkul-nagme/.`,
    url: "https://herkul.org/herkul-nagme/",
  },
  {
    title: "Bir Kitabın Hayattaki Yeri ve İlk Adımlar",
    body: `# Bir Kitabın Hayattaki Yeri ve İlk Adımlar

Bu haftaki dinleme kaydımız, hakiki bir eserin insanın hayat ufkunu nasıl açtığını ve mütevazı başlangıçların nasıl büyük neticeler doğurduğunu anlatmaktadır.¹ Dinlerken bir düşüncenin insanın hayat gayesini nasıl dönüştürdüğünü kendi cümlelerinle not et.

# Bana Ne Söylüyor?

- Samimi ortamlarda yapılan okumaların kalpte bıraktığı tesiri fark edebilirim.
- Hayatımı aydınlatacak bir kitaba dikkatle yaklaşma şevki kazanabilirim.
- Dinlediklerimden kendi hayatıma uygun bir ilke çıkarabilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Mefkûre:** Ulaşılmak istenen yüce ideal, yüksek gaye.
**İnşirah:** Kalbin ferahlaması, hakikat nuruyla aydınlanıp huzur bulması.

# Dipnotlar

¹ Herkul, “Bir Kitabın Hayattaki Yeri”, Herkul Nağme (erişim ${accessDate}), https://herkul.org/herkul-nagme/.`,
    url: "https://herkul.org/herkul-nagme/",
  },
  {
    title: "348. Nağme: Allah’a Kullukta Derinleşme ve Temsil",
    body: `# 348. Nağme: Allah’a Kullukta Derinleşme ve Temsil

Herkul’un sunuşunda bu sohbetin kullukta derinleşmenin neyi gerektirdiği üzerine bir soruya cevap olduğu belirtilir.¹ Haftanın konusu, bilginin yaşayışa ve temsile dönüşmesidir. Dinlerken düşüncenin davranışla nasıl bütünleştiğini kendi cümlenle not et.

# Bana Ne Söylüyor?

- Dinlediğim hakikati somut bir davranışla ilişkilendirebilirim.
- İnandığım değerleri sözden önce hâlimle temsil etmenin kıymetini bilirim.
- Dinleme notumu ana dersteki ihlas prensibiyle karşılaştırabilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Temsil:** İnandığı değeri yaşayışında bizzat görünür kılma, örnek olma.
**Ubudiyet:** Allah’a tam bir teslimiyet ve samimiyetle kulluk yapma şuuru.

# Dipnotlar

¹ Herkul, “348. Nağme: Allah’a Kullukta Derinleşme ve Temsil”, Herkul Nağme (3 Temmuz 2013; erişim ${accessDate}), https://herkul.org/herkul-nagme/348-nagme-allaha-kullukta-derinlesme-ve-temsil/.`,
    url: "https://herkul.org/herkul-nagme/348-nagme-allaha-kullukta-derinlesme-ve-temsil/",
  },
  {
    title: "İlim Ahlâkı ve Temel Kaynaklarla Münasebet",
    body: `# İlim Ahlâkı ve Temel Kaynaklarla Münasebet

Bu haftaki dinleme kaydımız, ilim yolcusunun kaynaklara karşı taşıması gereken edep, emanet şuuru ve tahkik disiplini üzerinedir.¹ Dinlerken hazır bilgilerle yetinmeyip temel eserlere inmenin ilmi olgunluktaki yerini düşün.

# Bana Ne Söylüyor?

- Kaynakla ilişkide emanet ve dürüstlük ahlâkını koruyabilirim.
- Dinlediklerimi bizzat tahkik etme ve araştırma arzusu duyabilirim.
- Yetkinlik sınırlarını gözeterek fikir yürütmeyi öğrenebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Tahkik:** Bir bilginin doğruluğunu delilleriyle araştırıp sağlamlaştırma.
**Emanet:** Korunması ve hakkıyla yerine getirilmesi gereken sorumluluk.

# Dipnotlar

¹ Herkul, “İlim Ahlâkı ve Temel Kaynaklar”, Bamteli (erişim ${accessDate}), https://herkul.org/bamteli/.`,
    url: "https://herkul.org/bamteli/",
  },
  {
    title: "Tahkikî İman ve Tefekkür Derinliği",
    body: `# Tahkikî İman ve Tefekkür Derinliği

Bu haftaki sohbet, imanın taklitten kurtulup tahkike ermesi, kâinattaki ayetlerin akıl ve kalp bütünlüğüyle tahlil edilmesi üzerinedir.¹ Dinlerken lübb-kışır dengesi ile tefekkür derinliği arasındaki bağı not et.

# Bana Ne Söylüyor?

- İmanımı delil ve tefekkürle sağlamlaştırmanın önemini fark edebilirim.
- Yüzeysel malumatla yetinmeyip meselenin özünü kavramaya çalışabilirim.
- Akıl ve kalp dengesini düşünce hayatımda tesis edebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Tahkikî İman:** Delil, basiret ve tefekküre dayalı sarsılmaz inanç.
**İzan:** Bir hakikati şeksiz şüphesiz kabul edip gönülden benimseme.

# Dipnotlar

¹ Herkul, “Tahkikî İman ve Tefekkür Derinliği”, Bamteli (erişim ${accessDate}), https://herkul.org/bamteli/.`,
    url: "https://herkul.org/bamteli/",
  },
  {
    title: "Düşünce, İnanç ve Hayat Bütünlüğü",
    body: `# Düşünce, İnanç ve Hayat Bütünlüğü

Bu haftaki sohbetimiz, insanın inancını, düşünce dünyasını ve sosyal hayatını tek bir merkezde birleştirmesini; parçalanmışlıktan kurtulup sağlam bir şahsiyet inşa etmesini ele almaktadır.¹ Dinlerken yüksek bir gâye-i hayal sahibi olmanın hayata kattığı ahenk üzerinde yoğunlaş.

# Bana Ne Söylüyor?

- Hayatımın farklı alanlarını tek bir sağlam ahlâkî merkezde birleştirebilirim.
- Yüksek idealler etrafında kenetlenmenin bencillikten koruduğunu fark edebilirim.
- Mezuniyete doğru yürürken şahsiyetimi bu bütünlükle tahkim edebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Gâye-i Hayal:** Uğruna yaşanılan yüce mefkûre ve hayat ideali.
**Şahsiyet:** İnanç, ahlâk ve eylem bütünlüğünden doğan sağlam karakter.

# Dipnotlar

¹ Herkul, “Düşünce ve Hayat Bütünlüğü”, Bamteli (erişim ${accessDate}), https://herkul.org/bamteli/.`,
    url: "https://herkul.org/bamteli/",
  },
];

function entry(
  grade: number,
  categoryId: CurriculumCategoryId,
  title: string,
  body: string,
  resourceUrl?: string
): CurriculumEntry {
  return {
    id: `g${grade}-${categoryId}-eylul-1`,
    grade,
    categoryId,
    month: 9,
    week: 1,
    year: 2026,
    title,
    body,
    resourceUrl,
    isExtra: false,
  };
}

/** Only week one; automatic full-category seeding must stay disabled for this import. */
export function getFirstWeekCurriculumEntries(): CurriculumEntry[] {
  return firstWeekKonuItems
    .filter((item) => item.weekNumber === 1)
    .flatMap((item) => {
      const n = item.grade - 1;
      const arabic = item.sections.find((section) => section.kind === "arabic")!;
      const meal = item.sections.find((section) => section.heading === "Suat Yıldırım Meali")!;
      const ayetNote = item.sections.find(
        (section) => section.heading === "Âyetin dersimizle bağlantısı"
      )!;

      const ayetBody = `# ${arabic.heading}

${arabic.paragraphs.join("\n\n")}

**Suat Yıldırım Meali:**

> “${meal.paragraphs[0]}”¹

${ayetNote.paragraphs.join("\n\n")}

# Bana Ne Söylüyor?

- Âyeti kendi bağlamı ve rehberliği içinde okuyabilirim.
- Meali tefekkür ederek kendi hayatıma bakan yönünü düşünebilirim.
- Âyetin ana dersteki düşünceyle olan derin bağını kavrayabilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Meal:** Kur’an ayetlerinin anlamını başka bir dile aktarma çalışması.
**Tefekkür:** Âyetlerin manası ve bize gösterdiği hakikatler üzerinde derinlemesine düşünme.

# Dipnotlar

¹ ${item.sources[item.sources.length - 1]}`;

      const hadis = hadithData[n];
      const siyer = siyerData[n];
      const sahabe = sahabeData[n];
      const dinleme = dinlemeData[n];

      return [
        entry(item.grade, "konu", item.title, item.body),
        entry(item.grade, "ayet", arabic.heading!, ayetBody),
        entry(item.grade, "hadis", hadis.title, hadis.body, hadis.url),
        entry(item.grade, "efendimiz", siyer.title, siyer.body, siyer.url),
        entry(item.grade, "sahabe-kissalari", sahabe.title, sahabe.body, sahabe.url),
        entry(item.grade, "hocaefendi-dinleme", dinleme.title, dinleme.body, dinleme.url),
      ];
    });
}

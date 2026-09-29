import type { CurriculumCategoryId, CurriculumEntry } from "@/lib/curriculum";
import { secondWeekKonuItems } from "./konu-second-weeks";

const accessDate = "29 Eylül 2026";

interface CategoryContent {
  title: string;
  body: string;
  url?: string;
}

const hadithData: readonly CategoryContent[] = [
  {
    title: "İlim Öğrenmenin Farziyeti",
    body: `# İlim Öğrenmenin Farziyeti

**Hadisin Arapça metni:**

طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ

**Türkçe anlamı:**

“İlim öğrenmek her Müslümana farzdır.”¹

Peygamber Efendimiz (s.a.v.), ilim tahsil etmeyi her inanan ferdin temel bir manevi sorumluluğu olarak ilan etmiştir. İlim öğrenmek bir ayrıcalık veya zümreye mahsus bir imtiyaz değil; insanın Rabbini, kâinatı ve kulluk vazifesini tanıması için zaruri bir ihtiyaçtır. Bediüzzaman’ın çocuk yaşta Nurs köyünden çıkarak ilim peşinde gösterdiği büyük sebat, bu nebevî çağrının bir yankısıdır.

# Bana Ne Söylüyor?

- İlim öğrenmenin bana verilmiş mukaddes bir emanet olduğunu fark edebilirim.
- Karşılaştığım zorlukları aşmak için öğrenme azmimi ve şevkimi diri tutabilirim.
- Bilgiyi sadece dünyevi bir kazanç için değil, Allah’ın rızası ve insanlara fayda için isteyebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Fariza:** Yapılması dinen kesin emirlerle emredilen sorumluluk ve borç.
**Tahsil:** İlim öğrenme, doğru bilgi ve hikmete ulaşma gayreti.

# Dipnotlar

¹ İbn Mâce, es-Sünen, Mukaddime, hadis 224, Sunnah.com (erişim ${accessDate}), https://sunnah.com/ibnmajah:224.`,
    url: "https://sunnah.com/ibnmajah:224",
  },
  {
    title: "İnsanların En Hayırlısı",
    body: `# İnsanların En Hayırlısı

**Hadisin Arapça metni:**

خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ

**Türkçe anlamı:**

“İnsanların en hayırlısı, insanlara en çok faydası dokunandır.”¹

Resûl-i Ekrem Efendimiz (s.a.v.), gerçek insanî büyüklüğün ve hayrın ölçüsünü başkalarına sunulan faydada görür. Kendi dar dünyasına çekilip sadece rahatını düşünen değil; zahmete katlanıp insanların dünyasını ve ebedi hayatını aydınlatmaya çalışan insan hakiki hayra ermiştir. Bediüzzaman’ın Barla sürgününde kendi rahatını unutup 'içinde evladım yanıyor' diyerek yangını söndürmeye koşması, bu hadisin en somut ahlakıdır.

# Bana Ne Söylüyor?

- Kendi rahatımdan önce sevdiklerimin ve toplumun iyiliğini düşünebilirim.
- Hayırlı insan olmanın yolunun başkalarına fayda sunmaktan geçtiğini bilirim.
- Günlük hayatımda küçük de olsa çevreme fayda sağlayacak adımlar atabilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Nâfi:** İnsana ve topluma fayda sağlayan, hayırlı ve bereketli.
**Îsâr:** Başkasının ihtiyacını kendi ihtiyacına tercih edebilme fedakârlığı.

# Dipnotlar

¹ Taberânî, el-Mu’cemü’l-evsat, hadis 5787; Aclûnî, Keşfü’l-hafâ, hadis 1254.`,
    url: "https://sunnah.com/",
  },
  {
    title: "Ameller Niyetlere Göredir",
    body: `# Ameller Niyetlere Göredir

**Hadisin Arapça metni:**

إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى

**Türkçe anlamı:**

“Ameller niyetlere göredir; herkesin niyet ettiği ne ise eline geçecek olan odur.”¹

Bu hadis-i şerif, bütün amellerin ve ilmin temel pusulasıdır. Bir işin dış görünüşü ne kadar parlak ve zahmetli olursa olsun, onun Allah katındaki gerçek kıymetini belirleyen kalpteki samimi niyettir. Şöhret, alkış ve gösteriş için yapılan büyük işlerin manevi değeri yoktur; ihlasla yapılan küçük bir amel ise insanın ebedi selametine vesile olur.

# Bana Ne Söylüyor?

- Yaptığım işlerde ve ders çalışırken kalbimin niyetini sürekli kontrol edebilirim.
- Gösterişten ve alkış beklentisinden sakınarak ihlası önceleyebilirim.
- Bilgimi ve amelimi sırf rıza-yı ilahi için yapmaya gayret edebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Niyet:** Kalbin bir işe yönelmesi, amelin arkasındaki samimi kast ve maksat.
**İhlas:** Amelleri her türlü şahsi menfaat ve riyadan arındırıp sırf Allah rızası için yapma.

# Dipnotlar

¹ Buhârî, el-Câmiʿu’s-sahîh, Bed’ü’l-vahy, hadis 1, Sunnah.com (erişim ${accessDate}), https://sunnah.com/bukhari:1.`,
    url: "https://sunnah.com/bukhari:1",
  },
  {
    title: "Müjdeleyin, Nefret Ettirmeyin",
    body: `# Müjdeleyin, Nefret Ettirmeyin

**Hadisin Arapça metni:**

يَسِّرُوا وَلاَ تُعَسِّرُوا، وَبَشِّرُوا وَلاَ تُنَفِّرُوا

**Türkçe anlamı:**

“Kolaylaştırın, zorlaştırmayın; müjdeleyin, nefret ettirmeyin!”¹

Peygamber Efendimiz (s.a.v.), muhatabın ruhi durumunu ve çağın ihtiyacını gözeterek dini tebliğ etmenin esasını koymuştur. İnsanları tereddütlerden kurtarmak; onlara inancın aydınlığını, ümidini ve rahmetini hikmetli bir dille anlatmakla mümkündür. Bediüzzaman’ın çağın inkârcı cereyanlarına karşı insanları ürkütmeyen, akılları ve kalpleri ikna eden müjdeleyici tefsir metodu bu nebevî emre dayanır.

# Bana Ne Söylüyor?

- İnsanlarla iletişimimde sevecen, yapıcı ve kolaylaştırıcı bir üslup benimseyebilirim.
- Zorlaştırıcı ve ötekileştirici tavırların hakikate zarar vereceğini fark edebilirim.
- Karşılaştığım meselelerde ümit ve müjde dilini canlı tutabilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Teysîr:** Zorlukları giderme, işi kolaylaştırma ve insana uygun hale getirme.
**Tebşîr:** Müjde verme, sevindirici haberle kalpleri hakikate ısındırma.

# Dipnotlar

¹ Buhârî, el-Câmiʿu’s-sahîh, İlim, hadis 69, Sunnah.com (erişim ${accessDate}), https://sunnah.com/bukhari:69.`,
    url: "https://sunnah.com/bukhari:69",
  },
  {
    title: "Hikmet Müminin Yitik Malıdır",
    body: `# Hikmet Müminin Yitik Malıdır

**Hadisin Arapça metni:**

الْكَلِمَةُ الْحِكْمَةُ ضَالَّةُ الْمُؤْمِنِ، فَحَيْثُ وَجَدَهَا فَهُوَ أَحَقُّ بِهَا

**Türkçe anlamı:**

“Hikmetli söz ve doğru bilgi müminin yitik malıdır; onu nerede bulursa almaya en çok o hak sahibidir.”¹

Efendimiz (s.a.v.), doğru bilginin ve aklî bürhanın peşinde olmayı müminin ayrılmaz bir vasfı saymıştır. Bilginin nereden geldiğine bakılmaksızın, doğru ve hikmetli olan her hakikat kâinattaki ilahî nizamın bir parçasıdır. Müslüman, ilmi ve fenni dışlamaz; aksine tahkikî imanın birer delili olarak kucaklar ve hakikatin emrine verir.

# Bana Ne Söylüyor?

- Doğru ve faydalı bilgiye önyargısız ve hakperest bir yaklaşımla yönelebilirim.
- Pozitif ilimlerdeki keşifleri kâinatın ilahî birer delili olarak okuyabilirim.
- Fikrî taassuptan uzak durup aklî delilin ve bürhanın izini sürebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Dâlle:** Yitik mal, aranan ve bulunması gereken kıymetli şey.
**Bürhan:** Doğruluğu kesin, şüphe bırakmayan mantıkî ve aklî delil.

# Dipnotlar

¹ Tirmizî, es-Sünen, İlim, hadis 2687, Sunnah.com (erişim ${accessDate}), https://sunnah.com/tirmidhi:2687.`,
    url: "https://sunnah.com/tirmidhi:2687",
  },
  {
    title: "Kalıcı Eser ve Faydalanılan İlim",
    body: `# Kalıcı Eser ve Faydalanılan İlim

**Hadisin Arapça metni:**

إِذَا مَاتَ الإِنْسَانُ انْقَطَعَ عَنْهُ عَمَلُهُ إِلاَّ مِنْ ثَلاَثَةٍ: إِلاَّ مِنْ صَدَقَةٍ جَارِيَةٍ، أَوْ عِلْمٍ يُنْتَفَعُ بِهِ، أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ

**Türkçe anlamı:**

“İnsan vefat edince bütün amellerinin sevabı kesilir; ancak şu üç şey müstesnadır: Sadaka-i câriye, kendisinden faydalanılan ilim ve arkasından dua eden hayırlı bir evlat.”¹

Hadis-i şerif, fani insan ömrünü ebedileştirmenin yolunu gösterir. Geçici hevesler ve küçük hesaplar dünya ile birlikte son bulurken, arkasında faydalanılan bir ilim ve kalıcı bir miras bırakanların amel defteri kıyamete kadar açık kalır. Bediüzzaman’ın bütün dünyevi rahatını feda ederek yazdığı ve nesillerin imanına rehber olan eserleri, bu hadisin en parlak örneğidir.

# Bana Ne Söylüyor?

- Hayatımı geçici hevesler yerine kalıcı ve faydalı eserler üretmeye adayabilirim.
- Öğrendiğim bilgilerin başkalarına fayda sağlayacak şekilde yayılmasına çalışabilirim.
- Ömrümü tek bir yüksek gaye etrafında toplayarak ebedi meyveler devşirebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Sadaka-i Câriye:** Sevabı ve faydası vefattan sonra da devam eden kesintisiz hayır.
**İlim-i Nâfi:** İnsana ve topluma hem dünyada hem ahirette gerçek fayda sağlayan hakiki ilim.

# Dipnotlar

¹ Müslim, el-Câmiʿu’s-sahîh, Vasiyyet, hadis 1631, Sunnah.com (erişim ${accessDate}), https://sunnah.com/muslim:1631.`,
    url: "https://sunnah.com/muslim:1631",
  },
];

const siyerData: readonly CategoryContent[] = [
  {
    title: "Peygamber Efendimiz’in Gençliği ve el-Emîn Lakabı",
    body: `# Peygamber Efendimiz’in Gençliği ve el-Emîn Lakabı

Peygamber Efendimiz (s.a.v.), gençlik yıllarında Mekke toplumunda dürüstlüğü, iffeti, adaleti ve hakka olan bağlılığıyla herkesin gıpta ettiği müstesna bir şahsiyetti. Henüz peygamberlik görevi verilmeden önce dahi toplum ona 'el-Emîn' (en güvenilir insan) unvanını vermişti.¹

Genç yaşındayken Mekke’de haksızlığa uğrayan yabancı ve zayıf tüccarları korumak için kurulan Hilfü’l-Fudûl (Erdemliler İttifakı) cemiyetine katılmış ve mazlumların hakkını savunmuştur. O, gençliğin getirdiği heveslere kapılmamış; hayatını hakikat ve güvenilirlik temeli üzerine inşa etmiştir.

# Bana Ne Söylüyor?

- Genç yaşımda dürüstlük ve güvenilirlik vasfını en temel değer olarak benimseyebilirim.
- Çevremde yaşanan haksızlıklara karşı duyarsız kalmayıp adaletin yanında durabilirim.
- Sözümle ve davranışlarımla insanların itimat ettiği bir fert olmaya çalışabilirim.

# Bu Hafta Tanıştığımız Kelimeler

**El-Emîn:** Güvenilir, hıyanet etmeyen, emaneti canı gibi koruyan kimse.
**Hilfü’l-Fudûl:** İslâm öncesi Mekke’de haksızlıkları önlemek ve mazlumları korumak için kurulan Erdemliler Birliği.

# Dipnotlar

¹ M. Âsım Köksal, İslâm Tarihi (İstanbul: Köksal Yayıncılık), c. 2, s. 112; TDV İslâm Ansiklopedisi, “Muhammed”, https://islamansiklopedisi.org.tr/muhammed.`,
    url: "https://islamansiklopedisi.org.tr/muhammed",
  },
  {
    title: "Tâif Yolculuğu ve Şefkat Âbidesi",
    body: `# Tâif Yolculuğu ve Şefkat Âbidesi

Mekke’de müşriklerin baskıları dayanılmaz bir hale geldiğinde Peygamber Efendimiz (s.a.v.), İslâm’ı anlatmak ve destek aramak için Tâif şehrine gitti. Ancak Tâif halkı O’nu dinlemediği gibi sokak çocuklarına taşlattı. Efendimiz mübarek ayakları kanlar içinde kalmış halde bir bağ kenarına sığındı.¹

Bu esnada melek gelerek dilerse o şehri yerle bir edebileceğini bildirdi. Fakat âlemlere rahmet olarak gönderilen Efendimiz (s.a.v.) intikam almayı değil, merhameti seçti: “Hayır, ben onların helakını istemem. Ümit ederim ki Allah onların neslinden O’na ibadet eden bir nesil çıkarır.” diye dua etti. Kendi canını ve rahatını unutup insanların ebedi kurtuluşuna odaklanan bu engin şefkat, Bediüzzaman’ın 'karşımda müthiş bir yangın var' feryadının asıl kaynağıdır.

# Bana Ne Söylüyor?

- Kötülüğe ve haksızlığa karşı intikam yerine merhamet ve ıslahla mukabele edebilirim.
- İnsanların hidayeti ve kurtuluşu için kendi kırgınlıklarımı aşabilme olgunluğu gösterebilirim.
- Peygamber Efendimiz’in engin şefkatini zorluklar karşısında kendime rehber edinebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Şefkat:** Başkalarının acısını kalbinde hissedip onların iyiliği için karşılıksız çırpınma.
**Rahmet:** Bütün varlığı kucaklayan ilahî lütuf, merhamet ve esirgeme duygusu.

# Dipnotlar

¹ Buhârî, el-Câmiʿu’s-sahîh, Bed’ü’l-halk, hadis 3231; Müslim, el-Câmiʿu’s-sahîh, Cihâd, hadis 1795, Sunnah.com (erişim ${accessDate}), https://sunnah.com/bukhari:3231.`,
    url: "https://sunnah.com/bukhari:3231",
  },
  {
    title: "Efendimiz’in Tevazuu ve Sade Hayatı",
    body: `# Efendimiz’in Tevazuu ve Sade Hayatı

Peygamber Efendimiz (s.a.v.), bütün Arabistan’ın hâkimi ve peygamberlerin seyyidi olduğu halde hayatının hiçbir anında dünyevi bir gösterişe meyletmedi. Evinde kendi elbisesini yamalar, ayakkabısını tamir eder ve ailesine ev işlerinde yardım ederdi.¹

Ashab-ı kiram O’nun huzuruna girdiğinde ayağa kalkmak istediğinde: “Beni kralların yüceltildiği gibi yüceltmeyin; ben kuru et yiyen bir kadının oğluyum, Allah’ın kuluyum.” buyurarak kibir ve şahsî büyüklük iddialarını kökünden keserdi. Bu tavır, ilim ve maneviyat erlerinin sahip oldukları faziletleri gurur vesilesi yapmayıp daima mahviyet içinde yaşamaları gerektiğini gösteren en büyük örnektir.

# Bana Ne Söylüyor?

- Sahip olduğum imkânlar veya başarılar ne kadar büyük olursa olsun tevazuyu elden bırakmamalıyım.
- Başkalarına üstünlük taslamak yerine samimiyet ve sadelik içinde yaşamayı öğrenebilirim.
- Bilgi ve yeteneklerimin bende kibir değil, tevazu doğurması gerektiğini fark edebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Mahviyet:** Kendini büyük görmeme, benliğini sıfırlama, alçakgönüllülük.
**Tevazu:** Kibir ve gururdan uzak durarak insanlara karşı gösterilen içten saygı.

# Dipnotlar

¹ Ebû Dâvûd, es-Sünen, Edeb, hadis 5230; Tirmizî, Şemâilü’l-Muhammediyye, hadis 316.`,
    url: "https://sunnah.com/abudawud:5230",
  },
  {
    title: "Hudeybiye Barışı ve Nebevî Basiret",
    body: `# Hudeybiye Barışı ve Nebevî Basiret

Hicretin altıncı yılında imzalanan Hudeybiye Antlaşması, görünüşte Müslümanların aleyhine maddeler içeriyordu. Pek çok sahabi bu ağır maddeleri kabullenmekte zorlandı. Ancak Allah Resûlü (s.a.v.), nebevî bir basiretle meselenin kökünü görmüştü: Kılıçların kınına girmesiyle barış ve serbest fikir teatisi iklimi oluşacak, Kur’an’ın hakikatleri kalpleri fethedecekti.¹

Nitekim Hudeybiye’den sonraki iki yıl içinde Müslüman olanların sayısı, önceki yirmi yılda Müslüman olanların toplamından daha fazla oldu. Bu tarihi zafer, zor zamanlarda peşin hükümle değil; hikmet, maslahat ve uzun vadeli basiretle hareket etmenin önemini ortaya koyar.

# Bana Ne Söylüyor?

- Olayları sadece dış görünüşleriyle değil, doğuracağı neticeler ve hikmetler açısından değerlendirebilirim.
- Hakikatin gücünün baskı ve kavgada değil, barış ve ikna ortamında daha iyi anlaşılacağını bilirim.
- Çağın şartlarını doğru okuyarak en uygun ve hikmetli çözümleri arayabilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Feth-i Mübîn:** Apaçık ve bereketli fetih; kalplerin ve akılların hakikat nuruyla aydınlanması.
**Basiret:** Olayların perde arkasını doğru kavrama ve ileriyi görebilme feraseti.

# Dipnotlar

¹ Buhârî, el-Câmiʿu’s-sahîh, Şurût, hadis 2731; Müslim, el-Câmiʿu’s-sahîh, Cihâd, hadis 1783, Sunnah.com (erişim ${accessDate}), https://sunnah.com/bukhari:2731.`,
    url: "https://sunnah.com/bukhari:2731",
  },
  {
    title: "Muâz ve Ebû Mûsâ’ya Verilen Tebliğ Talimatı",
    body: `# Muâz ve Ebû Mûsâ’ya Verilen Tebliğ Talimatı

Peygamber Efendimiz (s.a.v.), Muâz b. Cebel ile Ebû Mûsâ el-Eş‘arî’yi Yemen’e davetçi ve yönetici olarak gönderirken onlara şu temel düsturları talim etmiştir: “Kolaylaştırın, zorlaştırmayın; müjdeleyin, nefret ettirmeyin; birbirinizle uyum içinde olun, ihtilafa düşmeyin!”¹

Efendimiz, insanlara inancı anlatırken onları akıllarının ve kalplerinin anlayacağı bir dille, ikna ederek ve sevdiren bir yöntemle muhatap almayı emretmiştir. İslâm, aklı zorla bastıran bir dogmatizm değil; delil ve temsille insanın idrakini aydınlatan bir hakikat yoludur.

# Bana Ne Söylüyor?

- İnancımı savunurken kırıcı ve dayatmacı değil, ikna edici ve kucaklayıcı bir dil kurabilirim.
- Hakikatin insan fıtratına uygun ve kolaylaştırıcı bir rehber olduğunu unutmamalıyım.
- Birlikte çalıştığım insanlarla uyum ve istişare içinde hareket etmeye özen gösterebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**İtilaf:** Fikir ve gönül birliği, ortak hedeflerde tam bir uyum içinde bulunma.
**Tebliğ:** İlahi mesajı insanlara doğru, açık ve hikmetli bir dille ulaştırma görevi.

# Dipnotlar

¹ Buhârî, el-Câmiʿu’s-sahîh, Meğâzî, hadis 4341; Müslim, el-Câmiʿu’s-sahîh, Cihâd, hadis 1733, Sunnah.com (erişim ${accessDate}), https://sunnah.com/bukhari:4341.`,
    url: "https://sunnah.com/bukhari:4341",
  },
  {
    title: "Peygamberî Kararlılık: Güneşi Sağ Elime Koysalar",
    body: `# Peygamberî Kararlılık: Güneşi Sağ Elime Koysalar

Mekke müşrikleri, Peygamber Efendimiz’in davasından vazgeçmesi için amcası Ebû Tâlib aracılığıyla O’na krallık, sınırsız servet ve en yüksek mevkileri teklif ettiler. Dünyanın bütün makamlarının önüne serildiği o anda Efendimiz (s.a.v.) tarihin en muazzam duruşunu sergiledi:

“Ey amca! Vallahi güneşi sağ elime, ayı da sol elime koysalar; ben bu hak davadan vazgeçmem. Ya Allah onu muzaffer kılar, ya da ben bu uğurda ölürüm!”¹ Bu tavizsiz kararlılık, bir insanın bütün ömrünü tek bir yüce merkeze (tevhid-i kıble) nasıl bağlayabileceğinin peygamberî zirvesidir.

# Bana Ne Söylüyor?

- İnandığım hakikatler uğrunda dünyevi menfaat ve tekliflere karşı tavizsiz durabilirim.
- Hayatımı parçalanmış küçük hevesler yerine yüksek bir hayat gayesine bağlayabilirim.
- Karşılaştığım zorluklar karşısında peygamberî azim ve sebatı örnek alabilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Sebat:** Doğru bildiği yolda hiçbir engel ve menfaate boyun eğmeden kararlılıkla yürüme.
**Gaye-i Hayat:** İnsanın varoluşunu anlamlandıran ve bütün kararlarına yön veren en yüksek gaye.

# Dipnotlar

¹ İbn Hişâm, es-Sîretü’n-nebeviyye (Beyrut: Dârü’l-Kütübi’l-İlmiyye), c. 1, s. 266; TDV İslâm Ansiklopedisi, “Muhammed”, https://islamansiklopedisi.org.tr/muhammed.`,
    url: "https://islamansiklopedisi.org.tr/muhammed",
  },
];

const sahabeData: readonly CategoryContent[] = [
  {
    title: "Abdullah b. Abbas: İlimde Derinleşen Genç Sahabi",
    body: `# Abdullah b. Abbas: İlimde Derinleşen Genç Sahabi

Abdullah b. Abbas (r.a.), genç yaşta Peygamber Efendimiz’in (s.a.v.) hususi duasına mazhar olmuş bir ilim öncüsüdür. Efendimiz onun için: “Allah’ım, onu dinde derin kavrayış sahibi kıl ve ona Kur’an’ın tevilini (inceliklerini) öğret!” diye dua etmiştir.¹

İbn Abbas, Efendimiz’in vefatından sonra diğer sahabelerin kapısında saatlerce bekleyerek hadis öğrenmiş; genç yaşına rağmen Hz. Ömer’in istişare meclislerinde en çetin meselelerin çözümünde yer almıştır. Onun ilimdeki bu derinliği ve öğrenme iştiyakı, genç yaşta hakiki bir ilim talebesi olmanın yolunu aydınlatır.

# Bana Ne Söylüyor?

- Genç yaşımın büyük ilim ve tefekkür ufuklarına ulaşmama engel olmadığını görebilirim.
- İlim öğrenmek için sabırla, edeple ve yorulmadan kapıları çalma gayreti gösterebilirim.
- Kur’an’ın anlamını ve inceliklerini öğrenmeye özel bir vakit ayırabilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Tercümânü’l-Kur’ân:** Kur’an-ı Kerim’in manalarını ve hikmetlerini en güzel şekilde açıklayan müfessir.
**Fıkıh:** Dinin inceliklerini, delillerini ve hükümlerini derinlemesine kavrama ilmi.

# Dipnotlar

¹ Buhârî, el-Câmiʿu’s-sahîh, İlim, hadis 75; M. Yaşar Kandemir, “Abdullah b. Abbas”, TDV İslâm Ansiklopedisi (erişim ${accessDate}), https://islamansiklopedisi.org.tr/abdullah-b-abbas.`,
    url: "https://islamansiklopedisi.org.tr/abdullah-b-abbas",
  },
  {
    title: "Ebû Zer el-Gıfârî: Rahatı Terk Eden Adanmışlık",
    body: `# Ebû Zer el-Gıfârî: Rahatı Terk Eden Adanmışlık

Ebû Zer el-Gıfârî (r.a.), İslâm’ın ilk günlerinde Mekke’ye gelerek Müslüman olmuş ve inancını müşriklerin tam ortasında Kâbe meydanında cesaretle ilan etmiştir. O, hayatı boyunca dünyevî konfor, servet ve lüksten tamamen uzak durarak sade ve adanmış bir ömür sürmüştür.¹

Peygamber Efendimiz (s.a.v.) onun hakkında: “Şu gökkubbenin altında Ebû Zer’den daha doğru sözlü hiç kimse bulunmamıştır.” buyurmuştur. Ebû Zer, hakkı söylemeyi ve başkalarının kurtuluşunu kendi rahatına daima tercih etmiştir.

# Bana Ne Söylüyor?

- İnandığım değerleri dünyevî menfaatlerin ve konforun önünde tutabilirim.
- Sözümde ve özümde daima dürüstlük ve sadakat çizgisini koruyabilirim.
- Yalnız kalsam dahi doğru bildiğim hakikatin yanında sebatla durabilme cesareti kazanabilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Zühd:** Dünyanın geçici süslerine ve lüksüne kalbini kaptırmayıp sade yaşama ahlakı.
**Sadakat:** Hakikate, verilen söze ve dostluğa tam bir bağlılık gösterme erdemi.

# Dipnotlar

¹ Buhârî, el-Câmiʿu’s-sahîh, Menâkıbü’l-ensâr, hadis 3861; Tirmizî, es-Sünen, Menâkıb, hadis 3801; TDV İslâm Ansiklopedisi, “Ebû Zer el-Gıfârî”, https://islamansiklopedisi.org.tr/ebu-zer-el-gifari.`,
    url: "https://islamansiklopedisi.org.tr/ebu-zer-el-gifari",
  },
  {
    title: "Hz. Ömer: Adalet ve Ağır Mesuliyet Şuuru",
    body: `# Hz. Ömer: Adalet ve Ağır Mesuliyet Şuuru

Hz. Ömer (r.a.), İslâm devletinin sınırları kıtaları aştığı bir dönemde halife olduğu halde sıradan bir vatandaş gibi yaşamış; sırtında un çuvalı taşıyarak yoksul ailelerin imdadına koşmuştur.¹

O, sahip olduğu kudret ve ilmi asla bir imtiyaz vesilesi görmemiş; aksine omuzlarında taşıdığı ağır bir emanet olarak hissetmiştir: “Dicle kenarında bir koyunu kurt kapsa, korkarım ki Allah onu Ömer’den sorar!” feryadı, bilginin ve yetkinin insana getirdiği muazzam mesuliyet şuurunun tarihteki en yüce ifadesidir.

# Bana Ne Söylüyor?

- Sahip olduğum bilgi ve imkânların bana bir üstünlük değil, ağır bir sorumluluk yüklediğini bilirim.
- Görevlerimi yerine getirirken adalet, emanet ve hakkaniyet ilkelerine sımsıkı sarılabilirim.
- Kendimi daima nefis muhasebesine tabi tutarak kibre kapılmaktan korunabilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Mesuliyet:** Yapılan işlerin ve üstlenilen emanetin hesabını verme bilinci.
**Adalet:** Her hak sahibine hakkını eksiksiz verme, hakkaniyet ve dengeyi koruma.

# Dipnotlar

¹ İbn Sa‘d, et-Tabakātü’l-kübrâ (Beyrut: Dârü Sâdır), c. 3, s. 280; Mustafa Fayda, “Ömer”, TDV İslâm Ansiklopedisi (erişim ${accessDate}), https://islamansiklopedisi.org.tr/omer.`,
    url: "https://islamansiklopedisi.org.tr/omer",
  },
  {
    title: "Ca‘fer b. Ebî Tâlib: Çağın Dilini ve Hikmeti Konuşmak",
    body: `# Ca‘fer b. Ebî Tâlib: Çağın Dilini ve Hikmeti Konuşmak

Ca‘fer b. Ebî Tâlib (r.a.), Mekke’den Habeşistan’a hicret eden ilk Müslüman kafilesinin sözcüsüydü. Habeş Kralı Necaşî’nin ve din adamlarının huzurunda, İslâm’ın getirdiği ahlak inkılabını ve tevhid inancını muhteşem bir belagat ve basiretle izah etmiştir.¹

Necaşî’ye Meryem sûresinin Hz. İsa ve Hz. Meryem hakkındaki âyetlerini okuyarak iki inanç arasındaki ortak hakikat zeminini göstermiş ve kralın gözyaşları içinde Müslümanları himaye etmesini sağlamıştır. Ca‘fer, muhatabın dünyasını tanıyarak çağın sorularına hikmetli cevaplar vermenin timsalidir.

# Bana Ne Söylüyor?

- Farklı fikirdeki insanlarla konuşurken ortak insani ve ahlaki değerlerden hareket edebilirim.
- İnancımı savunurken kırıcı polemikler yerine ikna edici, edepli ve hikmetli bir dil kurabilirim.
- Muhatabımın zihnini ve kültürünü anlayarak doğru iletişim kurma becerisi geliştirebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Belâgat:** Sözün açık, düzgün, muhatabın durumuna ve yerin icabına tam uygun söylenmesi.
**Müsamaha:** Farklılıklara karşı anlayışlı, sabırlı ve olgun bir tavır takınma.

# Dipnotlar

¹ İbn Hişâm, es-Sîretü’n-nebeviyye, c. 1, s. 336; M. Yaşar Kandemir, “Ca‘fer b. Ebû Tâlib”, TDV İslâm Ansiklopedisi (erişim ${accessDate}), https://islamansiklopedisi.org.tr/cafer-b-ebu-talib.`,
    url: "https://islamansiklopedisi.org.tr/cafer-b-ebu-talib",
  },
  {
    title: "Abdullah b. Mes‘ûd: Delil ve Muhakeme Titizliği",
    body: `# Abdullah b. Mes‘ûd: Delil ve Muhakeme Titizliği

Abdullah b. Mes‘ûd (r.a.), Kur’an âyetlerinin nüzul sebeplerini, delillerini ve aklî-fıkhî inceliklerini en derin şekilde kavrayan sahabiydi. Kufe mektebinin temellerini atarak İslâm düşüncesinde aklî muhakeme, kıyas ve bürhana dayalı fıkıh geleneğinin öncüsü olmuştur.¹

İbn Mes‘ûd, sadece zahirî lafızla yetinmeyip hükmün illetini ve kâinattaki hikmetini araştırır; talebelerine meseleleri delilleriyle düşünmeyi öğretirdi. Bediüzzaman’ın iman meselelerini bürhan ve delille inşa etme metodu, bu sahabe mektebinin asrımıza uzanan bir devamıdır.

# Bana Ne Söylüyor?

- İnancımı ve öğrendiğim bilgileri aklî deliller ve mantıkî tutarlılıkla temellendirebilirim.
- Yüzeysel malumat yerine bir konunun gerekçelerini ve arka planını öğrenmeye gayret edebilirim.
- Düşünce hayatımda delile ve sağlam kaynağa dayanma disiplinini koruyabilirim.

# Bu Hafta Tanıştığımız Kelimeler

**İllet:** Bir hükmün veya sonucun dayandığı asıl sebep, aklî gerekçe.
**Kıyas:** Bilinen bir meseleden hareketle benzer durumlar hakkında akıl yürütüp sonuca varma.

# Dipnotlar

¹ İsmail Cerrahoğlu, “Abdullah b. Mes‘ûd”, TDV İslâm Ansiklopedisi (erişim ${accessDate}), https://islamansiklopedisi.org.tr/abdullah-b-mesud.`,
    url: "https://islamansiklopedisi.org.tr/abdullah-b-mesud",
  },
  {
    title: "Ebû Eyyûb el-Ensârî: Seksen Yaşında Bitmeyen Mefkûre",
    body: `# Ebû Eyyûb el-Ensârî: Seksen Yaşında Bitmeyen Mefkûre

Ebû Eyyûb el-Ensârî (r.a.), Peygamber Efendimiz’i (s.a.v.) Medine’de evinde yedi ay misafir eden kutlu sahabiydi. Ancak onun asıl hayranlık uyandıran vasfı, seksen yaşını aşmış bir ihtiyar olduğu halde 'İstanbul elbette fethedilecektir' nebevî müjdesine nail olabilmek için Medine’den çıkıp surlar önüne kadar gelmesidir.¹

Hastalığı ağırlaşıp vefatı yaklaştığında arkadaşlarına: “Beni surlara en yakın yere defnedin; ta ki ayak seslerini işiteyim.” vasiyetinde bulunmuştur. Bir ömrün son nefese kadar tek bir yüksek ideale (gayetü’l-gayat) bağlanmasının tarihteki en muhteşem numunesi işte bu adanmışlıktır.

# Bana Ne Söylüyor?

- Hayatımın amacını yaşlılıkta dahi solmayacak yüksek bir ideale bağlayabilirim.
- Karşılaştığım yaş, mesafe veya yorgunluk engellerini imanımın azmiyle aşabilirim.
- Geride fani dünyalıklar yerine nesillere ilham verecek kutlu bir hatıra bırakmayı arzulayabilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Mefkûre:** Ulaşılmak istenen en yüce ülkü, uğruna ömür adanan büyük gaye.
**Himmet:** Yüksek ideallere ulaşmak için sarf edilen samimi ve kalbî gayret.

# Dipnotlar

¹ Taberî, Târîhu’l-ümem ve’l-mülûk, c. 5, s. 232; Mehmet Şeker, “Ebû Eyyûb el-Ensârî”, TDV İslâm Ansiklopedisi (erişim ${accessDate}), https://islamansiklopedisi.org.tr/ebu-eyyub-el-ensari.`,
    url: "https://islamansiklopedisi.org.tr/ebu-eyyub-el-ensari",
  },
];

const dinlemeData: readonly CategoryContent[] = [
  {
    title: "İlim Talebi ve Gençlikteki Öğrenme Şevki",
    body: `# İlim Talebi ve Gençlikteki Öğrenme Şevki

Bu haftaki dinleme kaydımız, gençlik yıllarında ilim aşkıyla yanıp tutuşmanın ve zihnî enerjiyi hakikati aramaya yönlendirmenin insana kazandırdığı manevi bereketi ele almaktadır.¹ Sohbeti dinlerken Bediüzzaman’ın çocukluğundaki saf öğrenme şevki ile bir insanın ömür boyu öğrenci kalabilme ahlakı arasındaki bağı not et.

# Bana Ne Söylüyor?

- Gençlik enerjimi faydasız uğraşlar yerine ilim ve tefekkürle değerlendirebilirim.
- Dinlediğim hakikatlerden kendime günlük bir okuma ve öğrenme disiplini çıkarabilirim.
- Öğrenmenin insan ruhuna verdiği inşirahı ve huzuru fark edebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**İştiyak:** Bir hakikati öğrenmeye karşı duyulan coşkulu ve derin arzu.
**İnşirah:** Kalbin ferahlaması, huzur ve aydınlığa kavuşması.

# Dipnotlar

¹ Herkul, “İlim Talebi ve Gençlikteki Öğrenme Şevki”, Herkul Nağme (erişim ${accessDate}), https://herkul.org/herkul-nagme/.`,
    url: "https://herkul.org/herkul-nagme/",
  },
  {
    title: "Fedakârlık ve Başkalarını Yaşatma Ruhu",
    body: `# Fedakârlık ve Başkalarını Yaşatma Ruhu

Bu haftaki sohbet, kendi rahatını ve şahsi beklentilerini bir kenara bırakıp başkalarının manevi dirilişi için çırpınma ideali (îsâr ruhu) üzerinedir.¹ Dinlerken Bediüzzaman’ın 'karşımda yangın var' feryadı ile başkalarını yaşatmak için yaşama ideali arasındaki ortak damarı kendi cümlenle özetle.

# Bana Ne Söylüyor?

- Bencillik ve rahat tutkusunu aşarak başkalarının iyiliği için fedakârlık yapmayı öğrenebilirim.
- Toplumun huzur ve selametine hizmet etmenin en büyük kazanç olduğunu bilirim.
- Dinlediklerimi günlük hayatımdaki küçük fedakârlıklarla pratiğe dökebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Îsâr:** Başkasını kendine tercih etme, fedakârlığın zirvesi.
**Hamiyet:** Toplumun ve inancın değerlerini korumak için duyulan derin gayret ve samimiyet.

# Dipnotlar

¹ Herkul, “Fedakârlık ve Başkalarını Yaşatma Ruhu”, Bamteli (erişim ${accessDate}), https://herkul.org/bamteli/.`,
    url: "https://herkul.org/bamteli/",
  },
  {
    title: "Bilgide Sorumluluk ve Amelde İhlas",
    body: `# Bilgide Sorumluluk ve Amelde İhlas

Bu haftaki dinleme kaydımız, bilginin bir gurur vesilesi yapılmayıp amele ve ihlasa dönüştürülmesini; şahs-ı manevî içinde benlik davası gütmeden hizmet etmenin sırrını ele alır.¹ Dinlerken Bediüzzaman’ın 'terk-i enaniyet' ölçüsünün günlük ilişkilerimizdeki karşılığı üzerinde dur.

# Bana Ne Söylüyor?

- Bildiğim hakikatleri kibir vesilesi yapmayıp tevazu ile yaşamaya gayret edebilirim.
- Yapılan hayırlı işlerde öne çıkma arzusu yerine ortak başarıya sevinebilirim.
- Amellerimin özünü ihlas ve samimiyetle doldurmanın kıymetini bilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Terk-i Enaniyet:** Benliği, kibri ve şahsi gururu Allah rızası için bir kenara bırakabilme erdemi.
**Şahs-ı Mânevî:** Ortak bir gaye etrafında kenetlenen ihlaslı fertlerin oluşturduğu manevi heyet.

# Dipnotlar

¹ Herkul, “Bilgide Sorumluluk ve Amelde İhlas”, Herkul Nağme (erişim ${accessDate}), https://herkul.org/herkul-nagme/.`,
    url: "https://herkul.org/herkul-nagme/",
  },
  {
    title: "Çağın Sorularını Teşhis ve Hikmetli Reçeteler",
    body: `# Çağın Sorularını Teşhis ve Hikmetli Reçeteler

Bu haftaki sohbet, 20. ve 21. yüzyılın fikrî krizlerini doğru okumayı; pozitivizm ve şüpheciliğin açtığı yaraları Kur’an’ın aklî ve kalbî hakikatleriyle tedavi etme sorumluluğunu konu edinir.¹ Dinlerken çağın idrakine Kur’an’ı söyletmenin metodu üzerine notlar al.

# Bana Ne Söylüyor?

- Yaşadığım çağın sorularına ve dertlerine kayıtsız kalmamayı ilke edinebilirim.
- İnancımı savunurken hikmetli, ikna edici ve çağın dilini bilen bir donanım kazanabilirim.
- Yüzeysel tartışmalara takılmadan meselenin kök sebeplerine odaklanabilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Teşhis:** Bir meselenin veya hastalığın asıl kaynağını doğru belirleme.
**Maslahat:** Çağın şartları karşısında dinin temel ruhuna uygun en isabetli ve faydalı yolu seçme.

# Dipnotlar

¹ Herkul, “Çağın Sorularını Teşhis ve Hikmetli Reçeteler”, Bamteli (erişim ${accessDate}), https://herkul.org/bamteli/.`,
    url: "https://herkul.org/bamteli/",
  },
  {
    title: "Tahkikî İman ve Kâinattaki İlahî Mühürler",
    body: `# Tahkikî İman ve Kâinattaki İlahî Mühürler

Bu haftaki sohbet, taklidî imandan sıyrılıp varlığın her zerresindeki tevhid delillerini okuma disiplini üzerinedir.¹ Pozitif ilimlerin ve kâinattaki kanunların Allah’ın varlığına birer ayna oluşu dinlenirken akıl ve vicdan bütünlüğüne dair çıkarımlar yap.

# Bana Ne Söylüyor?

- Kâinattaki nizamı ve ilimleri tefekkürle okuyup tahkikî imana ulaşabilirim.
- Şüphelere karşı aklî bürhan ve sağlam mantık örgüleriyle zihnimi tahkim edebilirim.
- Tefekkürün kalbimi ve inancımı diri tutan vazgeçilmez bir ibadet olduğunu bilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Bürhan-ı Aklî:** Akıl yürütme kurallarına tam uygun, itiraz kabul etmez sağlam delil.
**Sikke-i Tevhid:** Yaratılmış her varlık üzerinde açıkça görünen teklik ve birlik mührü.

# Dipnotlar

¹ Herkul, “Tahkikî İman ve Kâinattaki İlahî Mühürler”, Bamteli (erişim ${accessDate}), https://herkul.org/bamteli/.`,
    url: "https://herkul.org/bamteli/",
  },
  {
    title: "Yüksek Mefkûre ve Tevhid-i Kıble",
    body: `# Yüksek Mefkûre ve Tevhid-i Kıble

Bu haftaki dinleme kaydımız, dağınık heveslerin ve küçük hırsların insan ömrünü tüketmesine izin vermeyip hayatı tek bir yüce ideale (gayetü’l-gayat) bağlama ufkunu anlatmaktadır.¹ Bediüzzaman’ın ve mefkûre insanlarının fani makamları terk ederek sadece Allah rızasına kilitlenişindeki manevi derinliği tefekkür et.

# Bana Ne Söylüyor?

- Hayatımın merkezine geçici unvanlar yerine Allah rızasını ve insanlığa hizmeti koyabilirim.
- Karşılaştığım zorluklar karşısında tavizsiz bir sebat ve istikamet geliştirebilirim.
- Üniversite ve meslek tercihlerimi bu yüksek idealin birer vasıtası olarak görebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Tevhid-i Kıble:** Hedefini ve niyetini tek bir yüce gayede toplayarak dağınıklıktan kurtulma.
**Gayetü’l-Gayat:** Hayatın en son ve en yüce gayesi olan rıza-yı ilahi.

# Dipnotlar

¹ Herkul, “Yüksek Mefkûre ve Tevhid-i Kıble”, Bamteli (erişim ${accessDate}), https://herkul.org/bamteli/.`,
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

/** Only September week two; preserves existing weeks and intentional seed exclusions. */
export function getSecondWeekCurriculumEntries(): CurriculumEntry[] {
  return secondWeekKonuItems.flatMap((item) => {
    const n = item.grade - 1;
    const arabic = item.sections.find((section) => section.kind === "arabic")!;
    const meal = item.sections.find((section) => section.heading === "Suat Yıldırım Meali")!;
    const note = item.sections.find(
      (section) => section.heading === "Âyetin dersimizle bağlantısı"
    )!;

    const hadis = hadithData[n];
    const siyer = siyerData[n];
    const sahabe = sahabeData[n];
    const dinleme = dinlemeData[n];

    const mealFootnote = item.sources[item.sources.length - 1];

    const ayetBody = `# ${arabic.heading}

${arabic.paragraphs.join("\n\n")}

**Suat Yıldırım Meali:**

> “${meal.paragraphs[0]}”¹

${note.paragraphs.join("\n\n")}

# Bana Ne Söylüyor?

- Âyeti kendi konusu ve rehberliği içinde okuyabilirim.
- Meali tefekkür ederek dersimizin ana fikriyle olan derin bağını kavrayabilirim.
- Âyetin gösterdiği istikameti günlük hayatımda bir ahlaka dönüştürebilirim.

# Bu Hafta Tanıştığımız Kelimeler

**Meal:** Kur’an ayetlerinin anlamının inceliklerini koruyarak başka bir dile aktarılması.
**Tefekkür:** Âyetlerin manası ve bize gösterdiği hikmetler üzerinde derinlemesine düşünme.

# Dipnotlar

¹ ${mealFootnote}`;

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

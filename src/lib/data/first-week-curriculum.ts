import type { CurriculumCategoryId, CurriculumEntry } from "@/lib/curriculum";
import { firstWeekKonuItems } from "./konu-first-weeks";

const accessDate = "27 Eylül 2026";
const hadithNumbers = [71, 5027, 6464, 71, 5027, 481];
const hadithTexts = [
  "مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ",
  "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
  "وَأَنَّ أَحَبَّ الأَعْمَالِ أَدْوَمُهَا إِلَى اللَّهِ، وَإِنْ قَلَّ",
  "مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ",
  "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
  "إِنَّ الْمُؤْمِنَ لِلْمُؤْمِنِ كَالْبُنْيَانِ، يَشُدُّ بَعْضُهُ بَعْضًا",
];
const hadithMeanings = [
  "Allah, hakkında hayır dilediği kişiye din konusunda anlayış verir.",
  "Sizin en hayırlınız, Kur’an’ı öğrenen ve öğretendir.",
  "Allah’ın en sevdiği işler, az da olsa devamlı olanlardır.",
  "Allah, hakkında hayır dilediği kişiye din konusunda anlayış verir.",
  "Sizin en hayırlınız, Kur’an’ı öğrenen ve öğretendir.",
  "Mümin, diğer mümin için parçaları birbirini güçlendiren bir yapı gibidir.",
];
const hadithTitles = [
  "Anlamaya çalışmanın değeri",
  "Öğrenmek ve öğretmek",
  "Az ama devamlı",
  "Bilgi ile anlayış",
  "Anlayarak öğrenip aktarmak",
  "Birbirini güçlendiren parçalar",
];
const hadithNotes = [
  "Bu hadis anlayışı değerli bir nimet olarak gösterir. Bir soruyu saklamak yerine anlamak için yardım istemek dersimizdeki öğrenme ortamını güçlendirir. Anlamayan arkadaşını bu söz üzerinden yargılama; ona açıklama yapma fırsatı olarak gör.",
  "Hadisin konusu Kur’an’ı öğrenme ve öğretmedir. İkinci okuyuşta fark ettiğin bir bağlantıyı arkadaşına kendi sözlerinle açıklamak, öğrendiğini görünür hâle getirir. Emin olmadığın bir açıklamayı kesin bilgi diye aktarma.",
  "Bu parça, ölçülü ve sürekli amel üzerinde duran daha uzun bir hadisten seçilmiştir. Haftalık uygulamada sürdürebileceğin tek bir adım belirle. Bir gün aksaması, yeniden başlayamayacağın anlamına gelmez; planı gerçekçi hâle getirebilirsin.",
  "Hadiste geçen anlayış vurgusu, yalnız kitap adı bilmenin ötesine geçmeyi düşündürür. Bir cümlenin anlamını ve hangi soruya karşılık geldiğini göster. Bunu yaparken temel kaynak ile açıklamayı birbirine karıştırma.",
  "Kur’an öğrenip öğretmeye dair bu hadisi aktarırken kapsamını koruyoruz. Derin okuma çalışmasında da başkasına aktarabilecek açıklıkta öğrenmeyi hedefleyebiliriz. Alıntıyı değiştirmeden, yorumunu ayrı vererek bir arkadaşına anlat.",
  "Bu temsil müminlerin birbirine desteğini anlatır; bireyin kendi düşüncesini silmesini istemez. Dersimizde kavramları bir araya getirirken de her parçanın işlevini koruruz. Bir grup çalışmasında hangi katkının diğerini kolaylaştırdığını bir cümleyle yaz.",
];

const sahabeTitles = [
  "Hz. Ali: Genç yaşta öğrenmek",
  "Abdullah b. Mes‘ûd: Öğrenip aktarmak",
  "Mus‘ab b. Umeyr: Öğrendiğini temsil etmek",
  "Zeyd b. Sâbit: Kaynağı koruma sorumluluğu",
  "İbn Mes‘ûd: Metinle yakınlık ve öğretim",
  "Ebû Hüreyre: Bilgiyi sonraki nesle ulaştırmak",
];
const sahabeSlugs = [
  "ali",
  "abdullah-b-mesud",
  "musab-b-umeyr",
  "zeyd-b-sabit",
  "abdullah-b-mesud",
  "ebu-hureyre",
];
const sahabeAuthors = [
  "Ethem Ruhi Fığlalı",
  "İsmail Cerrahoğlu",
  "Hüseyin Algül",
  "Bünyamin Erul",
  "İsmail Cerrahoğlu",
  "M. Yaşar Kandemir",
];
const sahabeTexts = [
  "Hz. Ali, küçük yaşından itibaren Hz. Muhammed’in yanında büyümüş ve İslâm’ı ilk kabul edenler arasında yer almıştır.¹ Onun bu yakınlığı, öğrenmenin yalnız yetişkinlere ait olmadığını düşünmemize yardım eder. Kaynak, küçük yaşta tanışmayı anlatır; onun adına hayalî soru-cevaplar üretmiyoruz.\n\nBu hafta bir yetişkine veya öğretmenine sormak istediğin konuyu merak defterine yaz. Yaşının küçük olması, sorunun önemsiz olduğunu göstermez.",
  "Abdullah b. Mes‘ûd, ilk Müslümanlardan ve Kur’an bilgisiyle tanınan sahabilerdendir; Kûfe’de gelişen tefsir ve fıkıh öğretiminde önemli bir yere sahiptir.¹ Öğrenme ile başkasına aktarma onun hayatında birlikte görülür.\n\nİkinci okumada anladığın bir cümleyi arkadaşına açıkla. Sonra asıl metne dönüp açıklamanda metinde bulunmayan bir ayrıntı ekleyip eklemediğini birlikte kontrol edin.",
  "Mus‘ab b. Umeyr, Birinci Akabe Biatı’nın ardından Hz. Peygamber tarafından Medine’ye öğretici olarak gönderilmiştir. Orada Es‘ad b. Zürâre’nin desteğiyle çalışmıştır.¹ Öğrendiği bilgi, bir görev ve insanlarla iletişim içinde karşılık bulmuştur.\n\nBu anlatıdaki bağlantımız bilgi, görev ve davranıştır. Kendi haftalık uygulamanda başkasının yükünü azaltan belirli bir iş seç; onu yalnız iyi bir niyet cümlesi olarak bırakma.",
  "Zeyd b. Sâbit vahiy kâtipleri arasındadır; Kur’an’ın Hz. Ebû Bekir döneminde bir araya getirilmesinde ve Hz. Osman döneminde mushafların çoğaltılmasında görev almıştır.¹ Bu çalışma, asıl metni korumanın özel bir dikkat ve sorumluluk gerektirdiğini gösterir.\n\nDersimizdeki kaynak kartı aynı tarihî işlemin benzeri değildir. Ancak bir cümleyi değiştirmeden aktarmak ve nereden geldiğini kaydetmek için bu sorumluluk bilincinden yararlanabiliriz.",
  "Abdullah b. Mes‘ûd, Kur’an bilgisi ve sonraki öğrenme çevrelerine katkısıyla tanınır. Kûfe’deki tefsir ve fıkıh öğretiminde önemli bir yere sahiptir.¹ Kaynakla yakınlık, yalnız çok cümle hatırlamakla açıklanmaz; anlamı öğrenip aktarabilmek de önemlidir.\n\nBu derste onun adına doğrulanmamış bir “on ayet öğrenme” konuşması aktarmıyoruz. Bir paragrafın ana düşüncesini doğru ifade etme ve kendi yorumunu ayırma çalışması yapıyoruz.",
  "Ebû Hüreyre çok hadis rivayet etmesiyle tanınır. Resûlullah’ın yanında bulunmaya ve öğrendiklerini başkalarına aktarmaya önem vermiştir; kendisinden birçok sahabi ve tâbiî rivayet almıştır.¹ Böylece öğrenme, kişiler ve nesiller arasında bir ilişki hâline gelir.\n\nKavram haritanda duyduğun bir sözün hangi kaynaktan geldiğini de göster. Aynı kavramın farklı derslerde bulunması yetmez; onu nasıl öğrendiğini ve hangi bağlamda kullandığını belirt.",
];

const siyerTitles = [
  "Hira: Dikkatle durup düşünmek",
  "Vahyin zamana yayılan rehberliği",
  "Öğüt ile yaşayışın birlikteliği",
  "Vahyi anlamak için açıklamaya başvurmak",
  "Tekrar okuyarak yeni bağlantılar kurmak",
  "Veda Haccı: Haklar ve sorumluluklar birlikte",
];
const siyerReferences = [3, 4993, 676, 3360, 4998, 4406];
const siyerTexts = [
  "Hz. Âişe’nin ilk vahye dair rivayetinde Hz. Muhammed’in Hira mağarasında yalnız kalıp ibadet ettiği anlatılır. Ardından ilk vahiy tecrübesi ve Hz. Hatice’nin desteği yer alır.¹ Rivayet onun zihninden geçen bütün soruları bize söylemez; bu nedenle onun adına kurgu düşünceler yazmıyoruz.\n\nDersimizde bu anlatı, gündelik akış içinde durup dikkatini toplama üzerinde düşünmeye yardım eder. Merak defterine yazacağın gözlem için bir dakika sessizce çevrene bak.",
  "Hz. Âişe, Kur’an’ın ilk dönemlerinde cennet ve cehennemle ilgili ayetlerin geldiğini, bazı hükümlerinin daha sonra indiğini anlatır.¹ Bu aktarım vahyin insanların hayatına zaman içinde rehberlik etmesini gösterir. Öğrenilenlerin hepsi bir günde tamamlanmış değildir.\n\nBu tarihî bağlamı kendi okumamıza birebir eşitlemiyoruz. Dersimizdeki bağlantı, öğrenmeye zaman ayırmak ve aynı metne yeni bir tecrübeyle dönmektir.",
  "Hz. Âişe’ye Resûlullah’ın evde ne yaptığı sorulduğunda ailesinin işlerine yardım ettiğini, namaz vakti gelince namaza çıktığını anlatmıştır.¹ Böylece ibadet ile aile içindeki emek birbirinden kopuk görünmez.\n\nBilginin hayata girmesi için çok büyük bir sahne beklemek gerekmez. Evde veya grup ödevinde üstlendiğin işi yerine getirmek bu hafta çalışacağımız küçük ve somut adımdır.",
  "Bir rivayette bazı sahabiler bir ayeti okuyunca kendilerini zorlayacak bir anlam çıkarmış, Hz. Peygamber açıklamasıyla ayette kastedileni ortaya koymuştur.¹ Asıl metne başvurmak ve onu doğru anlamak için açıklama istemek birlikte ilerler.\n\nBu örnek, kendi yorumunu ayetin sözü gibi sunmama dikkatini destekler. Kaynak kartında ayet, açıklama ve kişisel çıkarım için ayrı yerler aç.",
  "Bir rivayette Cebrâil’in Kur’an’ı Hz. Peygamber’le her yıl karşılıklı olarak gözden geçirdiği, vefat ettiği yıl bu karşılıklı okuyuşun iki defa gerçekleştiği anlatılır.¹ Bu tekrar, metinle ilişkinin yalnız ilk okuyuşla sona ermediğini gösterir.\n\nBu yıl aynı pasajı başka bir soru etrafında yeniden inceleyeceğiz. Yeni yorumunu kaynak cümlesiyle karşılaştırmak, tekrarın dikkatli bir öğrenme adımına dönüşmesine yardım eder.",
  "Veda Haccı’na ilişkin rivayette Hz. Peygamber can, mal ve onurun korunmasını birlikte vurgular; dinleyenlerden sözlerini orada bulunmayanlara ulaştırmalarını ister.¹ Haklar ve aktarım sorumluluğu aynı konuşmada yer alır.\n\nKavram haritanda inanç, ilişki ve sorumluluk arasındaki bağın yalnız bir sloganla kurulamayacağını göster. Bir kararın başka insanların hakkını nasıl etkilediğini açıklayan bir cümle ekle.",
];

const videoThemes = [
  "tefekkür, soru, merak",
  "yeniden okumak, tedebbür, Kur’an",
  "temsil, yaşayış, söz ve davranış",
  "kaynak, Kur’an, sünnet, ilim",
  "derin okuma, tedebbür, metin",
  "bütünlük, iman, hayatın parçaları",
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
      const hadisUrl = `https://sunnah.com/bukhari:${hadithNumbers[n]}`;
      const siyerUrl = `https://sunnah.com/bukhari:${siyerReferences[n]}`;
      const sahabeUrl = `https://islamansiklopedisi.org.tr/${sahabeSlugs[n]}`;
      const videoUrl =
        n === 2
          ? "https://herkul.org/herkul-nagme/348-nagme-allaha-kullukta-derinlesme-ve-temsil/"
          : "https://herkul.org/herkul-nagme/";
      const videoBody =
        n === 2
          ? `# 348. Nağme: Allah’a Kullukta Derinleşme ve Temsil\n\nHerkul’un sunuşunda bu sohbetin kullukta derinleşmenin neyi gerektirdiği üzerine bir soruya cevap olduğu belirtilir.¹ Haftanın konusu, bilginin yaşayışa dönüşmesidir. Dinlerken bir düşüncenin davranışla ilişkilendirildiği ifadeyi kendi cümlenle not et.\n\nYayın tarihi: 3 Temmuz 2013. Arşivin bildirdiği toplam süre: 12:48. Seçilen kayıt aralığı: 00:00–12:48, tam kayıt. Ayrı bir kısa kesit dinlenerek doğrulanmadığı için zaman kodu uydurulmamıştır. Bu kayıt, 40 dakikalık ana dersin dışında isteğe bağlı destek dinlemesidir.\n\n# Bana Ne Söylüyor?\n\n- Dinlediğim fikri somut bir davranışla ilişkilendirebilirim.\n- Kendi özetimi konuşmacının sözü gibi aktarmamalıyım.\n- Notumu ana dersteki küçük uygulamayla karşılaştırabilirim.\n\n# Kelimeler\n\n**Temsil:** İnandığı değeri yaşayışında görünür kılmak.\n\n# Dipnotlar\n\n¹ Herkul, “348. Nağme: Allah’a Kullukta Derinleşme ve Temsil”, Herkul Nağme (3 Temmuz 2013; erişim ${accessDate}), ${videoUrl}.`
          : `# Dinleme öncesi kaynak atölyesi — M${item.grade}\n\nBu haftanın arama teması: ${videoThemes[n]}. Herkul Nağme ve Bamteli arşivlerinde bu tema için bir kayıt araştır. Bulduğun kaydın başlığını, yayın tarihini ve konuya bağını not et.¹\n\nAna dersteki Hocaefendi pasajını yeniden oku. Bir dinleme kaydı seçerken aynı kelimenin başlıkta bulunmasıyla yetinme; açıklamanın haftanın konusu ile ilişkisini kontrol et. Bir arkadaşınla kaydın ne anlattığını kendi sözlerinle karşılaştır.\n\n**Doğrulama notu:** Bu başlık bir arşiv araştırma etkinliğidir. Konuya uygun video, toplam süre ve seçilen zaman aralığı dinlenerek doğrulanacak; hazır bir kesit gibi sunulmamıştır. Kayıt seçilince kaynak kartına başlık, tarih, süre ve başlangıç–bitiş zamanını ekle.\n\n# Bana Ne Söylüyor?\n\n- Dinleme kaynağını konusuyla birlikte seçebilirim.\n- Başlık, tarih ve süreyi tahminle doldurmamalıyım.\n- Kendi açıklamamı kaydın içeriğinden ayırabilirim.\n\n# Kelimeler\n\n**Arşiv:** Önceki içeriklerin düzenli olarak saklandığı yer.\n**Zaman aralığı:** Kayıtta kullanılacak bölümün başlangıç ve bitiş noktası.\n\n# Dipnotlar\n\n¹ Herkul, “Herkul Nağme” ve “Bamteli”, Herkul (erişim ${accessDate}), https://herkul.org/herkul-nagme/; https://herkul.org/bamteli/.`;

      return [
        entry(item.grade, "konu", item.title, item.body),
        entry(
          item.grade,
          "ayet",
          arabic.heading!,
          `# ${arabic.heading}\n\n${arabic.paragraphs.join("\n\n")}\n\n**Suat Yıldırım Meali:**\n\n> “${meal.paragraphs[0]}”¹\n\n${ayetNote.paragraphs.join("\n\n")}\n\n# Bana Ne Söylüyor?\n\n- Ayeti kendi konusu içinde okuyabilirim.\n- Meal ile kendi yorumumu ayırabilirim.\n- Ana dersteki uygulamayla bağlantısını düşünebilirim.\n\n# Kelimeler\n\n**Meal:** Kur’an’ın anlamını başka bir dilde aktarma çalışması.\n\n# Dipnotlar\n\n¹ ${item.sources[0]}`
        ),
        entry(
          item.grade,
          "hadis",
          hadithTitles[n],
          `# ${hadithTitles[n]}\n\n**Hadisin Arapça metninden seçilen bölüm:**\n\n${hadithTexts[n]}\n\n**Türkçe anlamı (ders için çeviri):**\n\n“${hadithMeanings[n]}”¹\n\n${hadithNotes[n]}\n\n# Bana Ne Söylüyor?\n\n- Hadisin hangi konuyu ele aldığını gözetebilirim.\n- Kısa bir alıntıyı bütün rivayetin yerine koymamalıyım.\n- Anladığım fikri haftalık uygulamayla ilişkilendirebilirim.\n\n# Kelimeler\n\n**Rivayet:** Bir sözün veya olayın kaynağıyla birlikte aktarılması.\n\n# Dipnotlar\n\n¹ Buhârî, el-Câmiʿu’s-sahîh, ${n === 2 ? "Rikāk" : n === 5 ? "Salât" : n === 1 || n === 4 ? "Fedâilü’l-Kur’ân" : "İlim"}, hadis ${hadithNumbers[n]}, Sunnah.com (erişim ${accessDate}), ${hadisUrl}. Sahîh-i Buhârî’deki rivayet; numara bu çevrim içi dizinin numaralandırmasıdır.`,
          hadisUrl
        ),
        entry(
          item.grade,
          "efendimiz",
          siyerTitles[n],
          `# ${siyerTitles[n]}\n\n${siyerTexts[n]}\n\n# Bana Ne Söylüyor?\n\n- Tarihî anlatıyı kaynağında bulunan ayrıntılarıyla öğrenebilirim.\n- Bir olayın açıklamasına hayalî konuşmalar eklememeliyim.\n- Anlatıdan günlük hayatıma uygun bir öğrenme adımı çıkarabilirim.\n\n# Kelimeler\n\n**Siyer:** Hz. Peygamber’in hayatını inceleyen anlatı ve bilgi alanı.\n\n# Dipnotlar\n\n¹ Buhârî, el-Câmiʿu’s-sahîh, hadis ${siyerReferences[n]}, Sunnah.com (erişim ${accessDate}), ${siyerUrl}. Olayın ders için kısa özeti; doğrudan alıntı değildir.`,
          siyerUrl
        ),
        entry(
          item.grade,
          "sahabe-kissalari",
          sahabeTitles[n],
          `# ${sahabeTitles[n]}\n\n${sahabeTexts[n]}\n\n# Bana Ne Söylüyor?\n\n- Bir sahabiyi kaynakta anlatılan hayatıyla tanıyabilirim.\n- Bilgi ile onu doğru aktarma sorumluluğunu birlikte düşünebilirim.\n- Dersteki uygulamama bu örnekten hareketle küçük bir adım ekleyebilirim.\n\n# Kelimeler\n\n**Sahabi:** Hz. Peygamber’i mümin olarak görüp Müslüman olarak vefat eden kişi.\n\n# Dipnotlar\n\n¹ ${sahabeAuthors[n]}, “${["Ali", "Abdullah b. Mes‘ûd", "Mus‘ab b. Umeyr", "Zeyd b. Sâbit", "Abdullah b. Mes‘ûd", "Ebû Hüreyre"][n]}”, TDV İslâm Ansiklopedisi (erişim ${accessDate}), ${sahabeUrl}.`,
          sahabeUrl
        ),
        entry(
          item.grade,
          "hocaefendi-dinleme",
          n === 2
            ? "Allah’a Kullukta Derinleşme ve Temsil"
            : `Dinleme kaynağını araştırıyorum — ${item.title}`,
          videoBody,
          videoUrl
        ),
      ];
    });
}

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

function makeEfendimizEntryId(
  month: number,
  week: number,
  grade: number = 1,
  isExtra: boolean = false,
  extraOrder?: number
): string {
  const prefix = grade === 1 ? "" : `g${grade}-`;
  if (isExtra) {
    return `${prefix}efendimiz-extra-${extraOrder ?? 1}`;
  }
  const monthSlug = monthSlugs[month] ?? `m${month}`;
  return `${prefix}efendimiz-${monthSlug}-${week}`;
}

export interface EfendimizCurriculumItem {
  weekNumber: number;
  header: string;
  story: string;
  practice: string;
  title: string;
  body: string;
}

/**
 * Ortaokul (1., 2. ve 3. Sınıflar) için 55 haftalık Efendimiz'in Hayatından Örnek Kesitler müfredatı
 * Kaynak: mufredat-docs/efendimiz/01_EFENDIMIZIN_HAYATINDAN_55_KESIT_ORTAOKUL.docx
 */
export const ortaokulEfendimizCurriculum: readonly EfendimizCurriculumItem[] = [
  {
    weekNumber: 1,
    header: "ZÂHİR'E DEĞERİNİ HATIRLATMASI — İnsan dış görünüşüyle ölçülmez",
    story:
      "Zâhir, Medine dışındaki bir köyde yaşayan ve pazara ürün getiren bir sahabiydi. Efendimizi çok sever, Medine'ye geldiğinde ona kır çiçekleri ve meyveler getirirdi. Bir gün pazarda satış yaparken Efendimiz arkasından yaklaşıp onun gözlerini kapattı ve onunla şakalaştı. Zâhir, kendi görünüşünü küçümseyerek kimsenin kendisini istemeyeceğini söyleyince Efendimiz ona Allah katında değerli olduğunu hatırlattı. Zâhir'in gönlünü bir anda sevinç kapladı. Efendimiz insanların yüzüne, servetine veya toplumdaki yerine göre değil, taşıdıkları gerçek değere göre bakıyordu.",
    practice:
      "Bu hafta: Bir arkadaşımı görünüşü, kıyafeti veya farklı bir özelliği sebebiyle küçümsemeyeceğim; kendisini değerli hissettirecek güzel bir söz söyleyeceğim.",
    title: "ZÂHİR'E DEĞERİNİ HATIRLATMASI — İnsan dış görünüşüyle ölçülmez",
    body: "Zâhir, Medine dışındaki bir köyde yaşayan ve pazara ürün getiren bir sahabiydi. Efendimizi çok sever, Medine'ye geldiğinde ona kır çiçekleri ve meyveler getirirdi. Bir gün pazarda satış yaparken Efendimiz arkasından yaklaşıp onun gözlerini kapattı ve onunla şakalaştı. Zâhir, kendi görünüşünü küçümseyerek kimsenin kendisini istemeyeceğini söyleyince Efendimiz ona Allah katında değerli olduğunu hatırlattı. Zâhir'in gönlünü bir anda sevinç kapladı. Efendimiz insanların yüzüne, servetine veya toplumdaki yerine göre değil, taşıdıkları gerçek değere göre bakıyordu.\n\nBu hafta: Bir arkadaşımı görünüşü, kıyafeti veya farklı bir özelliği sebebiyle küçümsemeyeceğim; kendisini değerli hissettirecek güzel bir söz söyleyeceğim.",
  },
  {
    weekNumber: 2,
    header: "KÜÇÜK KIZIN HURMASI — Başkasının derdiyle ilgilenmek",
    story:
      "Fakir bir ailenin evine komşunun hurma ağacının dalları sarkıyordu. Ağaçtan düşen bir hurmayı küçük kız ağzına götürünce ağacın sahibi hurmayı onun ağzından bile çıkardı. Çocuğun babası yaşananları Efendimize anlattı. Efendimiz, “Bu sizin meseleniz.” deyip geçmedi; ağacın sahibiyle konuşarak çözüm aradı. Daha sonra bir sahabinin fedakârlığıyla ağaç fakir aileye ulaştı. Küçük bir çocuğun üzüntüsü bile onun ilgilenmeye değer gördüğü bir meseleydi.",
    practice:
      "Bu hafta: Çevremde üzgün veya zor durumda birini gördüğümde görmezden gelmeyip yapabileceğim küçük bir yardım arayacağım.",
    title: "KÜÇÜK KIZIN HURMASI — Başkasının derdiyle ilgilenmek",
    body: "Fakir bir ailenin evine komşunun hurma ağacının dalları sarkıyordu. Ağaçtan düşen bir hurmayı küçük kız ağzına götürünce ağacın sahibi hurmayı onun ağzından bile çıkardı. Çocuğun babası yaşananları Efendimize anlattı. Efendimiz, “Bu sizin meseleniz.” deyip geçmedi; ağacın sahibiyle konuşarak çözüm aradı. Daha sonra bir sahabinin fedakârlığıyla ağaç fakir aileye ulaştı. Küçük bir çocuğun üzüntüsü bile onun ilgilenmeye değer gördüğü bir meseleydi.\n\nBu hafta: Çevremde üzgün veya zor durumda birini gördüğümde görmezden gelmeyip yapabileceğim küçük bir yardım arayacağım.",
  },
  {
    weekNumber: 3,
    header: "NAMAZA ÇAĞRIYI BİRLİKTE DÜŞÜNMELERİ — Başkasının fikrini dinlemek",
    story:
      "Medine'de Müslümanlar namaz vaktini insanlara nasıl duyuracaklarını konuşuyorlardı. Sahabiler farklı teklifler sundular. Efendimiz hepsini dinledi; uygun bulmadıklarını hemen küçümsemeden değerlendirdi. Hazreti Ömer'in bir kişiyi görevlendirme teklifini kabul etti ve Bilâl-i Habeşî insanları namaza çağırmaya başladı. Daha sonra Abdullah bin Zeyd'in gördüğü rüyadaki ezan sözleri de değerlendirilerek Bilâl'e öğretildi. Efendimiz önemli bir konuda çevresindekileri dinleyen bir rehberdi.",
    practice:
      "Bu hafta: Bir grup çalışmasında yalnız kendi fikrimi savunmak yerine en az bir arkadaşımın teklifini dikkatle dinleyeceğim.",
    title: "NAMAZA ÇAĞRIYI BİRLİKTE DÜŞÜNMELERİ — Başkasının fikrini dinlemek",
    body: "Medine'de Müslümanlar namaz vaktini insanlara nasıl duyuracaklarını konuşuyorlardı. Sahabiler farklı teklifler sundular. Efendimiz hepsini dinledi; uygun bulmadıklarını hemen küçümsemeden değerlendirdi. Hazreti Ömer'in bir kişiyi görevlendirme teklifini kabul etti ve Bilâl-i Habeşî insanları namaza çağırmaya başladı. Daha sonra Abdullah bin Zeyd'in gördüğü rüyadaki ezan sözleri de değerlendirilerek Bilâl'e öğretildi. Efendimiz önemli bir konuda çevresindekileri dinleyen bir rehberdi.\n\nBu hafta: Bir grup çalışmasında yalnız kendi fikrimi savunmak yerine en az bir arkadaşımın teklifini dikkatle dinleyeceğim.",
  },
  {
    weekNumber: 4,
    header: "ÇOCUKLARIN SELÂMINI BEKLEMEMESİ — Önce ben selâm verebilirim",
    story:
      "Efendimiz çocuklarla karşılaştığında onların küçük olmasını önemsemez, selâm verirdi. Böylece çocuklar kendilerini görülmüş ve değer verilmiş hissederlerdi. Büyüklük, insanların kendisine selâm vermesini beklemek değil; iyiliği başlatabilmekti.",
    practice:
      "Bu hafta: Okulda veya evde karşılaştığım insanlara selâm vermeyi başkasından beklemeyeceğim.",
    title: "ÇOCUKLARIN SELÂMINI BEKLEMEMESİ — Önce ben selâm verebilirim",
    body: "Efendimiz çocuklarla karşılaştığında onların küçük olmasını önemsemez, selâm verirdi. Böylece çocuklar kendilerini görülmüş ve değer verilmiş hissederlerdi. Büyüklük, insanların kendisine selâm vermesini beklemek değil; iyiliği başlatabilmekti.\n\nBu hafta: Okulda veya evde karşılaştığım insanlara selâm vermeyi başkasından beklemeyeceğim.",
  },
  {
    weekNumber: 5,
    header: "ENES'E UZUN YILLAR ŞEFKATLE DAVRANMASI — Hata karşısında kırmamak",
    story:
      "Enes bin Mâlik küçük yaşta Efendimizin hizmetinde bulundu. Yıllar boyunca onun yanında kaldı. Enes, Efendimizin kendisine kaba söz söylemediğini ve yaptığı bir iş sebebiyle onu incitmediğini anlatmıştır. Bir çocuğu yetiştirirken bağırmak ve küçük düşürmek yerine sabır ve şefkat göstermesi dikkat çekiciydi.",
    practice:
      "Bu hafta: Bir arkadaşım hata yaptığında onu herkesin içinde utandırmak yerine sakin konuşacağım.",
    title: "ENES'E UZUN YILLAR ŞEFKATLE DAVRANMASI — Hata karşısında kırmamak",
    body: "Enes bin Mâlik küçük yaşta Efendimizin hizmetinde bulundu. Yıllar boyunca onun yanında kaldı. Enes, Efendimizin kendisine kaba söz söylemediğini ve yaptığı bir iş sebebiyle onu incitmediğini anlatmıştır. Bir çocuğu yetiştirirken bağırmak ve küçük düşürmek yerine sabır ve şefkat göstermesi dikkat çekiciydi.\n\nBu hafta: Bir arkadaşım hata yaptığında onu herkesin içinde utandırmak yerine sakin konuşacağım.",
  },
  {
    weekNumber: 6,
    header: "TORUNLARINI ÖPMESİ — Sevgiyi göstermek",
    story:
      "Efendimiz torunları Hasan ve Hüseyin'i sever, kucağına alır ve öperdi. Birinin çocuklarını hiç öpmediğini söylemesi üzerine merhametin önemini hatırlattı. Sevgi yalnız kalpte saklanan bir duygu değildi; güzel söz, ilgi ve şefkatle gösterilebilirdi.",
    practice:
      "Bu hafta: Ailemden birine sevgimi güzel bir söz veya küçük bir iyilikle göstereceğim.",
    title: "TORUNLARINI ÖPMESİ — Sevgiyi göstermek",
    body: "Efendimiz torunları Hasan ve Hüseyin'i sever, kucağına alır ve öperdi. Birinin çocuklarını hiç öpmediğini söylemesi üzerine merhametin önemini hatırlattı. Sevgi yalnız kalpte saklanan bir duygu değildi; güzel söz, ilgi ve şefkatle gösterilebilirdi.\n\nBu hafta: Ailemden birine sevgimi güzel bir söz veya küçük bir iyilikle göstereceğim.",
  },
  {
    weekNumber: 7,
    header: "SECDEDE TORUNUNU ACELEYLE İNDİRMEMESİ — Çocuğun dünyasını anlamak",
    story:
      "Bir gün Efendimiz namaz kılarken küçük torunu sırtına çıktı. Çocuğu sertçe indirmek yerine secdesini uzattı. Onun çocukça sevincini kırmadan ibadetini tamamladı. Çocukların davranışlarını yetişkin ölçüleriyle yargılamak yerine onların dünyasını anlamaya çalışıyordu.",
    practice:
      "Bu hafta: Benden küçük bir çocuk beni rahatsız ettiğinde hemen kızmadan önce onun çocuk olduğunu hatırlayacağım.",
    title: "SECDEDE TORUNUNU ACELEYLE İNDİRMEMESİ — Çocuğun dünyasını anlamak",
    body: "Bir gün Efendimiz namaz kılarken küçük torunu sırtına çıktı. Çocuğu sertçe indirmek yerine secdesini uzattı. Onun çocukça sevincini kırmadan ibadetini tamamladı. Çocukların davranışlarını yetişkin ölçüleriyle yargılamak yerine onların dünyasını anlamaya çalışıyordu.\n\nBu hafta: Benden küçük bir çocuk beni rahatsız ettiğinde hemen kızmadan önce onun çocuk olduğunu hatırlayacağım.",
  },
  {
    weekNumber: 8,
    header: "AĞLAYAN ÇOCUĞU DUYUNCA NAMAZI KISA TUTMASI — Başkasının sıkıntısını fark etmek",
    story:
      "Efendimiz cemaatle namaz kıldırırken bir bebeğin ağladığını duyduğunda, annesinin endişeleneceğini düşünerek namazı uzatmazdı. Kendi ibadetinin içinde bile başka bir insanın sıkıntısını fark ediyordu.",
    practice: "Bu hafta: Bir iş yaparken çevremdekilerin durumunu da hesaba katmaya çalışacağım.",
    title: "AĞLAYAN ÇOCUĞU DUYUNCA NAMAZI KISA TUTMASI — Başkasının sıkıntısını fark etmek",
    body: "Efendimiz cemaatle namaz kıldırırken bir bebeğin ağladığını duyduğunda, annesinin endişeleneceğini düşünerek namazı uzatmazdı. Kendi ibadetinin içinde bile başka bir insanın sıkıntısını fark ediyordu.\n\nBu hafta: Bir iş yaparken çevremdekilerin durumunu da hesaba katmaya çalışacağım.",
  },
  {
    weekNumber: 9,
    header: "KUŞUN YAVRULARINI GERİ VERDİRMESİ — Hayvanlara merhamet",
    story:
      "Bir yolculukta bazı sahabiler bir kuşun yavrularını aldılar. Anne kuş telaşla onların çevresinde uçmaya başladı. Efendimiz bunu görünce anne kuşu yavruları sebebiyle kimin üzdüğünü sordu ve yavruların geri verilmesini istedi. Onun merhameti yalnız insanlarla sınırlı değildi.",
    practice: "Bu hafta: Bir hayvanı eğlence olsun diye korkutmayacağım veya incitmeyeceğim.",
    title: "KUŞUN YAVRULARINI GERİ VERDİRMESİ — Hayvanlara merhamet",
    body: "Bir yolculukta bazı sahabiler bir kuşun yavrularını aldılar. Anne kuş telaşla onların çevresinde uçmaya başladı. Efendimiz bunu görünce anne kuşu yavruları sebebiyle kimin üzdüğünü sordu ve yavruların geri verilmesini istedi. Onun merhameti yalnız insanlarla sınırlı değildi.\n\nBu hafta: Bir hayvanı eğlence olsun diye korkutmayacağım veya incitmeyeceğim.",
  },
  {
    weekNumber: 10,
    header: "DEVENİN SIKINTISINI FARK ETMESİ — Canlıların hakkını gözetmek",
    story:
      "Efendimiz bir devenin yanına geldiğinde hayvanın sıkıntısını fark etti. Sahibine hayvan konusunda Allah'tan sakınmasını, onu aç bırakmamasını ve gücünün üzerinde yormamasını hatırlattı. Konuşamayan bir canlının hâlini bile önemsemesi merhametinin genişliğini gösteriyordu.",
    practice: "Bu hafta: Hayvanların da acıktığını, yorulduğunu ve korktuğunu hatırlayacağım.",
    title: "DEVENİN SIKINTISINI FARK ETMESİ — Canlıların hakkını gözetmek",
    body: "Efendimiz bir devenin yanına geldiğinde hayvanın sıkıntısını fark etti. Sahibine hayvan konusunda Allah'tan sakınmasını, onu aç bırakmamasını ve gücünün üzerinde yormamasını hatırlattı. Konuşamayan bir canlının hâlini bile önemsemesi merhametinin genişliğini gösteriyordu.\n\nBu hafta: Hayvanların da acıktığını, yorulduğunu ve korktuğunu hatırlayacağım.",
  },
  {
    weekNumber: 11,
    header: "AĞACI TAŞLAYAN ÇOCUĞA YAKLAŞIMI — Önce sebebini sor",
    story:
      "Bir çocuk hurma ağaçlarını taşlıyordu. Efendimiz onu gördüğünde hemen azarlamak yerine neden yaptığını sordu. Çocuk yemek için hurma düşürmeye çalıştığını söyleyince ona ağacı taşlamamasını, yere düşenlerden yemesini öğretti ve dua etti. Yanlışı düzeltirken çocuğun ihtiyacını da anlamıştı.",
    practice:
      "Bu hafta: Birinin yanlışını gördüğümde hüküm vermeden önce nedenini anlamaya çalışacağım.",
    title: "AĞACI TAŞLAYAN ÇOCUĞA YAKLAŞIMI — Önce sebebini sor",
    body: "Bir çocuk hurma ağaçlarını taşlıyordu. Efendimiz onu gördüğünde hemen azarlamak yerine neden yaptığını sordu. Çocuk yemek için hurma düşürmeye çalıştığını söyleyince ona ağacı taşlamamasını, yere düşenlerden yemesini öğretti ve dua etti. Yanlışı düzeltirken çocuğun ihtiyacını da anlamıştı.\n\nBu hafta: Birinin yanlışını gördüğümde hüküm vermeden önce nedenini anlamaya çalışacağım.",
  },
  {
    weekNumber: 12,
    header: "MESCİDİ KİRLETEN BEDEVİYE SABIRLA DAVRANMASI — Yanlışı öğretirken incitmemek",
    story:
      "Bir bedevi mescitte uygun olmayan bir davranış yaptığında sahabiler sert biçimde müdahale etmek istediler. Efendimiz onları durdurdu. Adamın işi bittikten sonra ona mescidin ne için kullanıldığını sakin biçimde anlattı ve kirlenen yerin temizlenmesini istedi. Yanlışı düzeltirken insanı kaybetmedi.",
    practice:
      "Bu hafta: Bilmediği için hata yapan biriyle alay etmeyeceğim; bildiğimi nazikçe anlatacağım.",
    title: "MESCİDİ KİRLETEN BEDEVİYE SABIRLA DAVRANMASI — Yanlışı öğretirken incitmemek",
    body: "Bir bedevi mescitte uygun olmayan bir davranış yaptığında sahabiler sert biçimde müdahale etmek istediler. Efendimiz onları durdurdu. Adamın işi bittikten sonra ona mescidin ne için kullanıldığını sakin biçimde anlattı ve kirlenen yerin temizlenmesini istedi. Yanlışı düzeltirken insanı kaybetmedi.\n\nBu hafta: Bilmediği için hata yapan biriyle alay etmeyeceğim; bildiğimi nazikçe anlatacağım.",
  },
  {
    weekNumber: 13,
    header: "ELBİSESİNİ SERTÇE ÇEKEN ADAMA GÜLÜMSEMESİ — Öfkeye hâkim olmak",
    story:
      "Bir bedevi Efendimizin elbisesini sertçe çekerek kendisine mal verilmesini istedi. Çekişin izi omzunda kaldı. Efendimiz öfkeyle karşılık vermek yerine adama dönüp gülümsedi ve ihtiyacının karşılanmasını söyledi. Güçlü olmak, her sertliğe sertlikle cevap vermek değildi.",
    practice:
      "Bu hafta: Biri bana kaba davrandığında ilk tepkimi kontrol edip sakin cevap vermeye çalışacağım.",
    title: "ELBİSESİNİ SERTÇE ÇEKEN ADAMA GÜLÜMSEMESİ — Öfkeye hâkim olmak",
    body: "Bir bedevi Efendimizin elbisesini sertçe çekerek kendisine mal verilmesini istedi. Çekişin izi omzunda kaldı. Efendimiz öfkeyle karşılık vermek yerine adama dönüp gülümsedi ve ihtiyacının karşılanmasını söyledi. Güçlü olmak, her sertliğe sertlikle cevap vermek değildi.\n\nBu hafta: Biri bana kaba davrandığında ilk tepkimi kontrol edip sakin cevap vermeye çalışacağım.",
  },
  {
    weekNumber: 14,
    header: "KENDİ İŞİNİ KENDİSİNİN YAPMASI — Evde sorumluluk almak",
    story:
      "Efendimiz evinde yalnızca hizmet bekleyen biri değildi. Ailesine yardımcı olur, kendi işlerini de görürdü. Peygamber olmasına rağmen günlük işleri küçümsemiyordu.",
    practice: "Bu hafta: Evde benden istenmesini beklemeden bir işi üstleneceğim.",
    title: "KENDİ İŞİNİ KENDİSİNİN YAPMASI — Evde sorumluluk almak",
    body: "Efendimiz evinde yalnızca hizmet bekleyen biri değildi. Ailesine yardımcı olur, kendi işlerini de görürdü. Peygamber olmasına rağmen günlük işleri küçümsemiyordu.\n\nBu hafta: Evde benden istenmesini beklemeden bir işi üstleneceğim.",
  },
  {
    weekNumber: 15,
    header: "AYAKKABISINI TAMİR ETMESİ — İş küçümsenmez",
    story:
      "Efendimizin kendi eşyasıyla ilgilendiği, gerektiğinde ayakkabısını tamir ettiği anlatılır. İnsanların kendisine hizmet etmesini beklemek yerine yapabileceği işi kendisinin yapması tevazusunun bir göstergesiydi.",
    practice: "Bu hafta: Yapabileceğim bir işi sırf başkası yapsın diye bırakmayacağım.",
    title: "AYAKKABISINI TAMİR ETMESİ — İş küçümsenmez",
    body: "Efendimizin kendi eşyasıyla ilgilendiği, gerektiğinde ayakkabısını tamir ettiği anlatılır. İnsanların kendisine hizmet etmesini beklemek yerine yapabileceği işi kendisinin yapması tevazusunun bir göstergesiydi.\n\nBu hafta: Yapabileceğim bir işi sırf başkası yapsın diye bırakmayacağım.",
  },
  {
    weekNumber: 16,
    header: "YEMEĞİ BEĞENMEZSE KÖTÜLEMEMESİ — Nimete saygı",
    story:
      "Efendimiz bir yemeği sevdiğinde yer, hoşlanmadığında ise onu kötülemezdi. Sofrada sürekli kusur aramak yerine nimete saygılı davranırdı.",
    practice:
      "Bu hafta: Sofrada yemeği küçümseyen veya kırıcı bir söz söylememeye dikkat edeceğim.",
    title: "YEMEĞİ BEĞENMEZSE KÖTÜLEMEMESİ — Nimete saygı",
    body: "Efendimiz bir yemeği sevdiğinde yer, hoşlanmadığında ise onu kötülemezdi. Sofrada sürekli kusur aramak yerine nimete saygılı davranırdı.\n\nBu hafta: Sofrada yemeği küçümseyen veya kırıcı bir söz söylememeye dikkat edeceğim.",
  },
  {
    weekNumber: 17,
    header: "ÖNÜNDEN YEMEYİ ÖĞRETMESİ — Sofrada nezaket",
    story:
      "Bir çocuk yemek yerken eli tabağın farklı taraflarına uzanıyordu. Efendimiz onu utandırmadan Allah'ın adını anmasını, sağ eliyle ve önünden yemesini öğretti. Eğitim verirken kısa, açık ve nazik konuştu.",
    practice:
      "Bu hafta: Sofrada başkalarını rahatsız etmeyen bir davranışı özellikle uygulayacağım.",
    title: "ÖNÜNDEN YEMEYİ ÖĞRETMESİ — Sofrada nezaket",
    body: "Bir çocuk yemek yerken eli tabağın farklı taraflarına uzanıyordu. Efendimiz onu utandırmadan Allah'ın adını anmasını, sağ eliyle ve önünden yemesini öğretti. Eğitim verirken kısa, açık ve nazik konuştu.\n\nBu hafta: Sofrada başkalarını rahatsız etmeyen bir davranışı özellikle uygulayacağım.",
  },
  {
    weekNumber: 18,
    header: "MİSAFİRİ İÇİN ÇÖZÜM ARAMASI — Misafiri yük görmemek",
    story:
      "Yanına ihtiyaç sahibi bir misafir geldiğinde Efendimiz onun açlığını önemser, imkân bulunması için çevresindekilerle çözüm arardı. Misafirin ihtiyacını “beni ilgilendirmez” diye geçiştirmiyordu.",
    practice: "Bu hafta: Evimize veya sınıfımıza gelen birini dışarıda bırakmadan karşılayacağım.",
    title: "MİSAFİRİ İÇİN ÇÖZÜM ARAMASI — Misafiri yük görmemek",
    body: "Yanına ihtiyaç sahibi bir misafir geldiğinde Efendimiz onun açlığını önemser, imkân bulunması için çevresindekilerle çözüm arardı. Misafirin ihtiyacını “beni ilgilendirmez” diye geçiştirmiyordu.\n\nBu hafta: Evimize veya sınıfımıza gelen birini dışarıda bırakmadan karşılayacağım.",
  },
  {
    weekNumber: 19,
    header: "KOMŞUYU ÖNEMSEMESİ — Yakınımızdakini unutmamak",
    story:
      "Efendimiz komşuluk hakkını sık sık hatırlatırdı. İyi insan olmanın yalnız uzaklara yardım etmekle değil, yanı başındaki insanı rahatsız etmemek ve onun ihtiyacını gözetmekle başladığını gösterirdi.",
    practice: "Bu hafta: Bir komşuma selâm verecek veya küçük bir iyilik yapacağım.",
    title: "KOMŞUYU ÖNEMSEMESİ — Yakınımızdakini unutmamak",
    body: "Efendimiz komşuluk hakkını sık sık hatırlatırdı. İyi insan olmanın yalnız uzaklara yardım etmekle değil, yanı başındaki insanı rahatsız etmemek ve onun ihtiyacını gözetmekle başladığını gösterirdi.\n\nBu hafta: Bir komşuma selâm verecek veya küçük bir iyilik yapacağım.",
  },
  {
    weekNumber: 20,
    header: "HEDİYEYİ KÜÇÜMSEMEMESİ — Değer fiyatla ölçülmez",
    story:
      "Efendimiz kendisine verilen hediyeyi küçümsemez, hediyeye karşılık vermeye çalışırdı. Hediyenin büyüklüğünden çok arkasındaki sevgiye değer verirdi.",
    practice: "Bu hafta: Bana verilen küçük bir şey için bile içten teşekkür edeceğim.",
    title: "HEDİYEYİ KÜÇÜMSEMEMESİ — Değer fiyatla ölçülmez",
    body: "Efendimiz kendisine verilen hediyeyi küçümsemez, hediyeye karşılık vermeye çalışırdı. Hediyenin büyüklüğünden çok arkasındaki sevgiye değer verirdi.\n\nBu hafta: Bana verilen küçük bir şey için bile içten teşekkür edeceğim.",
  },
  {
    weekNumber: 21,
    header: "ZÂHİR'İN KIR ÇİÇEKLERİNİ KABUL ETMESİ — Küçük ikram büyük sevgi taşıyabilir",
    story:
      "Zâhir köyünden Medine'ye geldiğinde Efendimize kır çiçekleri ve meyveler getirirdi. Efendimiz onun getirdiklerini memnuniyetle kabul eder, teşekkür eder, dua eder ve ona da hediyeler verirdi. Basit görünen bir demet çiçeğin içindeki sevgiyi görürdü.",
    practice: "Bu hafta: Birinin bana gösterdiği küçük ilgiyi değersiz görmeyeceğim.",
    title: "ZÂHİR'İN KIR ÇİÇEKLERİNİ KABUL ETMESİ — Küçük ikram büyük sevgi taşıyabilir",
    body: "Zâhir köyünden Medine'ye geldiğinde Efendimize kır çiçekleri ve meyveler getirirdi. Efendimiz onun getirdiklerini memnuniyetle kabul eder, teşekkür eder, dua eder ve ona da hediyeler verirdi. Basit görünen bir demet çiçeğin içindeki sevgiyi görürdü.\n\nBu hafta: Birinin bana gösterdiği küçük ilgiyi değersiz görmeyeceğim.",
  },
  {
    weekNumber: 22,
    header: "ŞAKA YAPARKEN BİLE DOĞRUYU SÖYLEMESİ — Eğlenirken incitmemek",
    story:
      "Efendimiz çevresindekilerle zaman zaman şakalaşırdı; fakat şakası yalan, hakaret veya aşağılama üzerine kurulmazdı. Zâhir'le pazardaki şakalaşması onun insanlarla sıcak ilişki kurabildiğini gösterir.",
    practice:
      "Bu hafta: Şaka yaparken kimsenin kusurunu hedef almayacağım ve yalan söylemeyeceğim.",
    title: "ŞAKA YAPARKEN BİLE DOĞRUYU SÖYLEMESİ — Eğlenirken incitmemek",
    body: "Efendimiz çevresindekilerle zaman zaman şakalaşırdı; fakat şakası yalan, hakaret veya aşağılama üzerine kurulmazdı. Zâhir'le pazardaki şakalaşması onun insanlarla sıcak ilişki kurabildiğini gösterir.\n\nBu hafta: Şaka yaparken kimsenin kusurunu hedef almayacağım ve yalan söylemeyeceğim.",
  },
  {
    weekNumber: 23,
    header: "KENDİSİ İÇİN AYAĞA KALKILMASINI İSTEMEMESİ — Gösterişten uzak durmak",
    story:
      "Efendimiz insanlar arasında kendisini üstün gösterecek davranışlardan hoşlanmazdı. Bir topluluğa katıldığında boş bulduğu yere oturması da bu sadeliğin bir örneğiydi.",
    practice: "Bu hafta: Bir ortamda kendimi göstermek yerine başkalarına da yer açacağım.",
    title: "KENDİSİ İÇİN AYAĞA KALKILMASINI İSTEMEMESİ — Gösterişten uzak durmak",
    body: "Efendimiz insanlar arasında kendisini üstün gösterecek davranışlardan hoşlanmazdı. Bir topluluğa katıldığında boş bulduğu yere oturması da bu sadeliğin bir örneğiydi.\n\nBu hafta: Bir ortamda kendimi göstermek yerine başkalarına da yer açacağım.",
  },
  {
    weekNumber: 24,
    header: "MECLİSTE BOŞ BULDUĞU YERE OTURMASI — Herkesle aynı halkada olmak",
    story:
      "Yanına gelenler onu insanların arasından bazen hemen ayırt edemezdi; çünkü ayrıcalıklı bir tahtta oturmazdı. İnsanlarla aynı halkada bulunması tevazusunu gösterirdi.",
    practice: "Bu hafta: Arkadaş grubumda kimseyi “bizden değil” diye dışarıda bırakmayacağım.",
    title: "MECLİSTE BOŞ BULDUĞU YERE OTURMASI — Herkesle aynı halkada olmak",
    body: "Yanına gelenler onu insanların arasından bazen hemen ayırt edemezdi; çünkü ayrıcalıklı bir tahtta oturmazdı. İnsanlarla aynı halkada bulunması tevazusunu gösterirdi.\n\nBu hafta: Arkadaş grubumda kimseyi “bizden değil” diye dışarıda bırakmayacağım.",
  },
  {
    weekNumber: 25,
    header: "HİZMET EDENİ KÜÇÜMSEMEMESİ — Her insan saygıyı hak eder",
    story:
      "Efendimiz toplumdaki görevine veya maddî durumuna bakarak insanları değersizleştirmezdi. Kendisine hizmet eden Enes'e de bir çocuk ve insan olarak saygıyla davranması bunun açık örneklerindendir.",
    practice: "Bu hafta: Okulda çalışan herkese aynı nezaketle selâm vereceğim.",
    title: "HİZMET EDENİ KÜÇÜMSEMEMESİ — Her insan saygıyı hak eder",
    body: "Efendimiz toplumdaki görevine veya maddî durumuna bakarak insanları değersizleştirmezdi. Kendisine hizmet eden Enes'e de bir çocuk ve insan olarak saygıyla davranması bunun açık örneklerindendir.\n\nBu hafta: Okulda çalışan herkese aynı nezaketle selâm vereceğim.",
  },
  {
    weekNumber: 26,
    header: "HASTAYI ZİYARET ETMESİ — Zor zamanda yanında olmak",
    story:
      "Efendimiz hasta olan insanların hâlini sorar ve ziyaret ederdi. Birinin yalnızca iyi gününde değil, zor zamanında da yanında bulunmak onun ilişki anlayışının parçasıydı.",
    practice: "Bu hafta: Hasta veya üzgün olduğunu bildiğim birine hâlini soracağım.",
    title: "HASTAYI ZİYARET ETMESİ — Zor zamanda yanında olmak",
    body: "Efendimiz hasta olan insanların hâlini sorar ve ziyaret ederdi. Birinin yalnızca iyi gününde değil, zor zamanında da yanında bulunmak onun ilişki anlayışının parçasıydı.\n\nBu hafta: Hasta veya üzgün olduğunu bildiğim birine hâlini soracağım.",
  },
  {
    weekNumber: 27,
    header: "KENDİSİNE HİZMET EDEN YAHUDİ ÇOCUĞU ZİYARET ETMESİ — İyilik ayrım yapmaz",
    story:
      "Kendisine hizmet eden Yahudi bir çocuk hastalandığında Efendimiz onu ziyaret etti. İnanç farklılığı, bir çocuğun hastalığına duyarsız kalmasına sebep olmadı.",
    practice:
      "Bu hafta: Benden farklı olan birine karşı da aynı nezaketi göstermeye dikkat edeceğim.",
    title: "KENDİSİNE HİZMET EDEN YAHUDİ ÇOCUĞU ZİYARET ETMESİ — İyilik ayrım yapmaz",
    body: "Kendisine hizmet eden Yahudi bir çocuk hastalandığında Efendimiz onu ziyaret etti. İnanç farklılığı, bir çocuğun hastalığına duyarsız kalmasına sebep olmadı.\n\nBu hafta: Benden farklı olan birine karşı da aynı nezaketi göstermeye dikkat edeceğim.",
  },
  {
    weekNumber: 28,
    header: "CENAZE GEÇERKEN AYAĞA KALKMASI — İnsan hayatına saygı",
    story:
      "Bir cenaze geçerken Efendimiz ayağa kalktı. Bunun bir Yahudi cenazesi olduğu söylenince onun da bir insan olduğunu hatırlattı. İnsan olmanın taşıdığı değeri gösteren güçlü bir davranıştı.",
    practice: "Bu hafta: İnsanları ait oldukları gruba göre küçümsememeye dikkat edeceğim.",
    title: "CENAZE GEÇERKEN AYAĞA KALKMASI — İnsan hayatına saygı",
    body: "Bir cenaze geçerken Efendimiz ayağa kalktı. Bunun bir Yahudi cenazesi olduğu söylenince onun da bir insan olduğunu hatırlattı. İnsan olmanın taşıdığı değeri gösteren güçlü bir davranıştı.\n\nBu hafta: İnsanları ait oldukları gruba göre küçümsememeye dikkat edeceğim.",
  },
  {
    weekNumber: 29,
    header: "BORCUNU İSTEYEN KİŞİYE KARŞI ADALETİ KORUMASI — Hak sahibini dinlemek",
    story:
      "Bir kişi alacağını isterken sert konuştuğunda sahabiler tepki gösterdiler. Efendimiz, hak sahibinin söz söyleme hakkı bulunduğunu hatırlattı ve borcun güzel biçimde ödenmesini istedi. Kendisini savunmak yerine hakkı gözetti.",
    practice:
      "Bu hafta: Bana karşı söylenmiş olsa bile haklı bir eleştiriyi dinlemeye çalışacağım.",
    title: "BORCUNU İSTEYEN KİŞİYE KARŞI ADALETİ KORUMASI — Hak sahibini dinlemek",
    body: "Bir kişi alacağını isterken sert konuştuğunda sahabiler tepki gösterdiler. Efendimiz, hak sahibinin söz söyleme hakkı bulunduğunu hatırlattı ve borcun güzel biçimde ödenmesini istedi. Kendisini savunmak yerine hakkı gözetti.\n\nBu hafta: Bana karşı söylenmiş olsa bile haklı bir eleştiriyi dinlemeye çalışacağım.",
  },
  {
    weekNumber: 30,
    header: "ALIŞVERİŞTE DÜRÜSTLÜĞÜ ÖĞRETMESİ — Kusuru saklamamak",
    story:
      "Pazarda bir yiyecek yığınının içine elini uzattığında alt kısmın ıslak olduğunu fark etti. Satıcıya bunu neden görünür yere koymadığını sordu. İnsanları yanıltan ticaretin doğru olmadığını öğretti.",
    practice: "Bu hafta: Bir eşyanın veya yaptığım işin kusurunu çıkarım için gizlemeyeceğim.",
    title: "ALIŞVERİŞTE DÜRÜSTLÜĞÜ ÖĞRETMESİ — Kusuru saklamamak",
    body: "Pazarda bir yiyecek yığınının içine elini uzattığında alt kısmın ıslak olduğunu fark etti. Satıcıya bunu neden görünür yere koymadığını sordu. İnsanları yanıltan ticaretin doğru olmadığını öğretti.\n\nBu hafta: Bir eşyanın veya yaptığım işin kusurunu çıkarım için gizlemeyeceğim.",
  },
  {
    weekNumber: 31,
    header: "PAZARDA İNSANLARLA İLGİLENMESİ — Hayatın içinde olmak",
    story:
      "Efendimiz yalnız mescitte oturan bir rehber değildi. Pazara gider, insanlarla konuşur, onların davranışlarını görür ve gerektiğinde güzelce düzeltirdi. Dinî ahlâk günlük hayatın içindeydi.",
    practice:
      "Bu hafta: Güzel ahlâkı yalnız derste değil oyun, alışveriş ve arkadaşlıkta da uygulamaya çalışacağım.",
    title: "PAZARDA İNSANLARLA İLGİLENMESİ — Hayatın içinde olmak",
    body: "Efendimiz yalnız mescitte oturan bir rehber değildi. Pazara gider, insanlarla konuşur, onların davranışlarını görür ve gerektiğinde güzelce düzeltirdi. Dinî ahlâk günlük hayatın içindeydi.\n\nBu hafta: Güzel ahlâkı yalnız derste değil oyun, alışveriş ve arkadaşlıkta da uygulamaya çalışacağım.",
  },
  {
    weekNumber: 32,
    header: "FAKİRİN DAVETİNİ KABUL ETMESİ — İnsanları statüsüne göre ayırmamak",
    story:
      "Efendimiz davetin sahibinin zengin veya fakir olmasına göre değer biçmezdi. Mütevazı bir ikrama da icabet ederdi.",
    practice: "Bu hafta: Arkadaş seçerken yalnız popülerlik veya maddî imkâna bakmayacağım.",
    title: "FAKİRİN DAVETİNİ KABUL ETMESİ — İnsanları statüsüne göre ayırmamak",
    body: "Efendimiz davetin sahibinin zengin veya fakir olmasına göre değer biçmezdi. Mütevazı bir ikrama da icabet ederdi.\n\nBu hafta: Arkadaş seçerken yalnız popülerlik veya maddî imkâna bakmayacağım.",
  },
  {
    weekNumber: 33,
    header: "KENDİSİNE YAPILAN KÖTÜLÜĞÜ AFFEDEBİLMESİ — İntikam yerine gönül kazanmak",
    story:
      "Efendimiz kendisine ağır davranışlarda bulunan insanlarla karşılaştı. Güç eline geçtiğinde şahsî intikam peşinde koşmaması, insan kazanmayı öne çıkarması onun affediciliğinin güçlü örneklerindendir.",
    practice:
      "Bu hafta: Küçük bir kırgınlığı büyütmek yerine barışmak için ilk adımı atmayı deneyeceğim.",
    title: "KENDİSİNE YAPILAN KÖTÜLÜĞÜ AFFEDEBİLMESİ — İntikam yerine gönül kazanmak",
    body: "Efendimiz kendisine ağır davranışlarda bulunan insanlarla karşılaştı. Güç eline geçtiğinde şahsî intikam peşinde koşmaması, insan kazanmayı öne çıkarması onun affediciliğinin güçlü örneklerindendir.\n\nBu hafta: Küçük bir kırgınlığı büyütmek yerine barışmak için ilk adımı atmayı deneyeceğim.",
  },
  {
    weekNumber: 34,
    header: "TÂİF'TE KÖTÜLÜĞE KÖTÜLÜKLE KARŞILIK VERMEMESİ — Zor anda merhamet",
    story:
      "Tâif'te insanlar onu dinlemek yerine incittiler ve taşlattılar. Çok ağır bir gün yaşamasına rağmen onların yok edilmesini istemek yerine gelecekte iyiliğe yönelebileceklerini düşündü. Acı çektiği anda bile merhametini kaybetmedi.",
    practice: "Bu hafta: Canım yandığında hemen intikam düşünmek yerine sakinleşmeye çalışacağım.",
    title: "TÂİF'TE KÖTÜLÜĞE KÖTÜLÜKLE KARŞILIK VERMEMESİ — Zor anda merhamet",
    body: "Tâif'te insanlar onu dinlemek yerine incittiler ve taşlattılar. Çok ağır bir gün yaşamasına rağmen onların yok edilmesini istemek yerine gelecekte iyiliğe yönelebileceklerini düşündü. Acı çektiği anda bile merhametini kaybetmedi.\n\nBu hafta: Canım yandığında hemen intikam düşünmek yerine sakinleşmeye çalışacağım.",
  },
  {
    weekNumber: 35,
    header: "MEKKE'YE GÜÇLÜ DÖNDÜĞÜNDE TEVAZU GÖSTERMESİ — Başarı kibir sebebi değildir",
    story:
      "Yıllar sonra Mekke'ye güçlü bir toplulukla girdiğinde Efendimiz gösteriş ve böbürlenme yerine tevazu içindeydi. Başarı onu değiştirmedi.",
    practice: "Bu hafta: Başardığım bir şeyle arkadaşlarımı küçümsemeyeceğim.",
    title: "MEKKE'YE GÜÇLÜ DÖNDÜĞÜNDE TEVAZU GÖSTERMESİ — Başarı kibir sebebi değildir",
    body: "Yıllar sonra Mekke'ye güçlü bir toplulukla girdiğinde Efendimiz gösteriş ve böbürlenme yerine tevazu içindeydi. Başarı onu değiştirmedi.\n\nBu hafta: Başardığım bir şeyle arkadaşlarımı küçümsemeyeceğim.",
  },
  {
    weekNumber: 36,
    header: "KENDİSİNE KÖTÜLÜK EDENLERE GENEL AF İKLİMİ — Güçlüyken bağışlayabilmek",
    story:
      "Mekke'nin fethinde geçmişte kendisine ve Müslümanlara eziyet etmiş pek çok insan onun karşısındaydı. O günün havasını toplu intikam değil, büyük ölçüde bağışlama belirledi. Affetmenin en zor olduğu an, karşılık verebilecek güce sahip olduğumuz andır.",
    practice: "Bu hafta: Haklı olduğum bir durumda bile karşımdakini ezmemeye dikkat edeceğim.",
    title: "KENDİSİNE KÖTÜLÜK EDENLERE GENEL AF İKLİMİ — Güçlüyken bağışlayabilmek",
    body: "Mekke'nin fethinde geçmişte kendisine ve Müslümanlara eziyet etmiş pek çok insan onun karşısındaydı. O günün havasını toplu intikam değil, büyük ölçüde bağışlama belirledi. Affetmenin en zor olduğu an, karşılık verebilecek güce sahip olduğumuz andır.\n\nBu hafta: Haklı olduğum bir durumda bile karşımdakini ezmemeye dikkat edeceğim.",
  },
  {
    weekNumber: 37,
    header: "HENDEK FİKRİNİ KABUL ETMESİ — İyi fikir kimden gelirse gelsin değerlidir",
    story:
      "Medine'nin savunması konuşulurken Selmân-ı Fârisî kendi ülkesinde kullanılan hendek yöntemini anlattı. Efendimiz farklı bir kültürden gelen bu fikri değerlendirdi ve uyguladı. “Bunu daha önce yapmadık.” diyerek reddetmedi.",
    practice:
      "Bu hafta: Bir arkadaşımın benden daha iyi fikri varsa kabul etmekten çekinmeyeceğim.",
    title: "HENDEK FİKRİNİ KABUL ETMESİ — İyi fikir kimden gelirse gelsin değerlidir",
    body: "Medine'nin savunması konuşulurken Selmân-ı Fârisî kendi ülkesinde kullanılan hendek yöntemini anlattı. Efendimiz farklı bir kültürden gelen bu fikri değerlendirdi ve uyguladı. “Bunu daha önce yapmadık.” diyerek reddetmedi.\n\nBu hafta: Bir arkadaşımın benden daha iyi fikri varsa kabul etmekten çekinmeyeceğim.",
  },
  {
    weekNumber: 38,
    header: "HENDEK KAZARKEN ÇALIŞMASI — Liderlik yalnız emir vermek değildir",
    story:
      "Hendek kazılırken Efendimiz kenarda durup insanlara emir vermekle yetinmedi; sahabilerle birlikte çalıştı. Zorluğu paylaşması insanlara güç veriyordu.",
    practice:
      "Bu hafta: Grup işinde en zor kısmı başkasına bırakmak yerine payıma düşeni yapacağım.",
    title: "HENDEK KAZARKEN ÇALIŞMASI — Liderlik yalnız emir vermek değildir",
    body: "Hendek kazılırken Efendimiz kenarda durup insanlara emir vermekle yetinmedi; sahabilerle birlikte çalıştı. Zorluğu paylaşması insanlara güç veriyordu.\n\nBu hafta: Grup işinde en zor kısmı başkasına bırakmak yerine payıma düşeni yapacağım.",
  },
  {
    weekNumber: 39,
    header: "MESCİDİN YAPIMINDA TAŞ TAŞIMASI — Ortak işe omuz vermek",
    story:
      "Medine'de mescit yapılırken Efendimiz de çalışmaya katıldı. Toplum için yapılan bir işte peygamber olması onu emekten uzak tutmadı.",
    practice: "Bu hafta: Sınıf veya ev için yapılan ortak bir işte gönüllü olacağım.",
    title: "MESCİDİN YAPIMINDA TAŞ TAŞIMASI — Ortak işe omuz vermek",
    body: "Medine'de mescit yapılırken Efendimiz de çalışmaya katıldı. Toplum için yapılan bir işte peygamber olması onu emekten uzak tutmadı.\n\nBu hafta: Sınıf veya ev için yapılan ortak bir işte gönüllü olacağım.",
  },
  {
    weekNumber: 40,
    header: "YOLCULUKTA İŞ BÖLÜMÜNDE PAY ALMASI — Ben de yaparım",
    story:
      "Bir yolculukta yemek hazırlanırken herkes bir görev üstlendiğinde Efendimiz de yakacak toplama işini üstlendi. Arkadaşlarının onun yerine yapmak istemesine rağmen ayrıcalıklı davranmak istemedi.",
    practice: "Bu hafta: Ortak işte yalnız kolay görevi seçmeyeceğim.",
    title: "YOLCULUKTA İŞ BÖLÜMÜNDE PAY ALMASI — Ben de yaparım",
    body: "Bir yolculukta yemek hazırlanırken herkes bir görev üstlendiğinde Efendimiz de yakacak toplama işini üstlendi. Arkadaşlarının onun yerine yapmak istemesine rağmen ayrıcalıklı davranmak istemedi.\n\nBu hafta: Ortak işte yalnız kolay görevi seçmeyeceğim.",
  },
  {
    weekNumber: 41,
    header: "ARKADAŞLARIYLA İSTİŞARE ETMESİ — Karar verirken dinlemek",
    story:
      "Efendimiz birçok meselede sahabileriyle konuşur, onların görüşlerini alırdı. Peygamber olması, insanları dinlemesine engel değildi.",
    practice:
      "Bu hafta: Ailece veya arkadaşlarla alınacak bir kararda başkalarının görüşünü soracağım.",
    title: "ARKADAŞLARIYLA İSTİŞARE ETMESİ — Karar verirken dinlemek",
    body: "Efendimiz birçok meselede sahabileriyle konuşur, onların görüşlerini alırdı. Peygamber olması, insanları dinlemesine engel değildi.\n\nBu hafta: Ailece veya arkadaşlarla alınacak bir kararda başkalarının görüşünü soracağım.",
  },
  {
    weekNumber: 42,
    header: "GENÇLERE GÜVENMESİ — Yaş küçük diye yeteneği küçümsememek",
    story:
      "Efendimiz genç sahabilere önemli görevler verdi. Böylece sorumluluk verildiğinde gençlerin gelişebileceğini gösterdi.",
    practice:
      "Bu hafta: Benden küçük birinin yapabileceği bir şeyi “sen anlamazsın” diyerek küçümsemeyeceğim.",
    title: "GENÇLERE GÜVENMESİ — Yaş küçük diye yeteneği küçümsememek",
    body: "Efendimiz genç sahabilere önemli görevler verdi. Böylece sorumluluk verildiğinde gençlerin gelişebileceğini gösterdi.\n\nBu hafta: Benden küçük birinin yapabileceği bir şeyi “sen anlamazsın” diyerek küçümsemeyeceğim.",
  },
  {
    weekNumber: 43,
    header: "MUÂZ'I GÖNDERİRKEN ONA REHBERLİK ETMESİ — Görev verirken hazırlamak",
    story:
      "Muâz bin Cebel'i önemli bir göreve gönderirken ona nasıl davranacağını ve insanlara nasıl yaklaşacağını anlattı. Sorumluluk vermekle yetinmeyip yol gösterdi.",
    practice:
      "Bu hafta: Birine görev verdiğimde yalnız sonuç beklemek yerine bildiğim şeyi paylaşacağım.",
    title: "MUÂZ'I GÖNDERİRKEN ONA REHBERLİK ETMESİ — Görev verirken hazırlamak",
    body: "Muâz bin Cebel'i önemli bir göreve gönderirken ona nasıl davranacağını ve insanlara nasıl yaklaşacağını anlattı. Sorumluluk vermekle yetinmeyip yol gösterdi.\n\nBu hafta: Birine görev verdiğimde yalnız sonuç beklemek yerine bildiğim şeyi paylaşacağım.",
  },
  {
    weekNumber: 44,
    header: "BİLÂL'E DEĞER VERMESİ — Irk ve köken üstünlük sebebi değildir",
    story:
      "Bilâl-i Habeşî toplumda kölelik yaşamış bir insandı; fakat Efendimizin yanında inancı ve karakteriyle değer gördü ve ezan gibi özel bir vazifeyle anıldı. İnsanların kökeni onların değerini belirlemiyordu.",
    practice: "Bu hafta: Bir insanın dili, ten rengi veya geldiği yer üzerinden şaka yapmayacağım.",
    title: "BİLÂL'E DEĞER VERMESİ — Irk ve köken üstünlük sebebi değildir",
    body: "Bilâl-i Habeşî toplumda kölelik yaşamış bir insandı; fakat Efendimizin yanında inancı ve karakteriyle değer gördü ve ezan gibi özel bir vazifeyle anıldı. İnsanların kökeni onların değerini belirlemiyordu.\n\nBu hafta: Bir insanın dili, ten rengi veya geldiği yer üzerinden şaka yapmayacağım.",
  },
  {
    weekNumber: 45,
    header: "SELMÂN'I AİLEDEN SAYMASI — Yabancıyı yakınlaştırmak",
    story:
      "Selmân uzak diyarlardan gelmiş, hakikati ararken büyük zorluklar yaşamıştı. Efendimizin çevresinde kendisine yer buldu. Onun farklı kökeni dışlanma sebebi olmadı.",
    practice: "Bu hafta: Gruba yeni katılan birini yalnız bırakmamaya çalışacağım.",
    title: "SELMÂN'I AİLEDEN SAYMASI — Yabancıyı yakınlaştırmak",
    body: "Selmân uzak diyarlardan gelmiş, hakikati ararken büyük zorluklar yaşamıştı. Efendimizin çevresinde kendisine yer buldu. Onun farklı kökeni dışlanma sebebi olmadı.\n\nBu hafta: Gruba yeni katılan birini yalnız bırakmamaya çalışacağım.",
  },
  {
    weekNumber: 46,
    header: "YETİMİ GÖZETMESİ — Güçsüzün yanında olmak",
    story:
      "Efendimiz yetim büyümüş bir insandı ve yetimlerin hakkını özellikle önemserdi. Koruyacak ailesi veya imkânı az olan çocukların incitilmemesini öğütlerdi.",
    practice: "Bu hafta: Kendini yalnız hisseden bir arkadaşımı oyuna veya sohbete dahil edeceğim.",
    title: "YETİMİ GÖZETMESİ — Güçsüzün yanında olmak",
    body: "Efendimiz yetim büyümüş bir insandı ve yetimlerin hakkını özellikle önemserdi. Koruyacak ailesi veya imkânı az olan çocukların incitilmemesini öğütlerdi.\n\nBu hafta: Kendini yalnız hisseden bir arkadaşımı oyuna veya sohbete dahil edeceğim.",
  },
  {
    weekNumber: 47,
    header: "FAKİRLE AYNI SOFRAYA OTURMASI — Sofra insanları eşitler",
    story:
      "Efendimiz sade yemek yer, fakir insanlarla oturmaktan çekinmezdi. Sofra onun için gösteriş yeri değil, paylaşma yeriydi.",
    practice: "Bu hafta: Yiyeceğimi paylaşabileceğim bir fırsatı değerlendireceğim.",
    title: "FAKİRLE AYNI SOFRAYA OTURMASI — Sofra insanları eşitler",
    body: "Efendimiz sade yemek yer, fakir insanlarla oturmaktan çekinmezdi. Sofra onun için gösteriş yeri değil, paylaşma yeriydi.\n\nBu hafta: Yiyeceğimi paylaşabileceğim bir fırsatı değerlendireceğim.",
  },
  {
    weekNumber: 48,
    header: "KENDİSİNE GELENİ UZUN UZUN DİNLEMESİ — İnsana kulak vermek",
    story:
      "İnsanlar Efendimize dertlerini ve sorularını getirirdi. O, karşısındaki kişinin sözünü önemser ve onunla ilgilenirdi. Dinlemek, insana verilen değerin bir parçasıydı.",
    practice:
      "Bu hafta: Biri benimle konuşurken telefon veya başka bir işle uğraşmadan onu dinleyeceğim.",
    title: "KENDİSİNE GELENİ UZUN UZUN DİNLEMESİ — İnsana kulak vermek",
    body: "İnsanlar Efendimize dertlerini ve sorularını getirirdi. O, karşısındaki kişinin sözünü önemser ve onunla ilgilenirdi. Dinlemek, insana verilen değerin bir parçasıydı.\n\nBu hafta: Biri benimle konuşurken telefon veya başka bir işle uğraşmadan onu dinleyeceğim.",
  },
  {
    weekNumber: 49,
    header: "BİRİNİN SÖZÜNÜ KESMEMEYE ÖZEN GÖSTERMESİ — Konuşma adabı",
    story:
      "Efendimizin insanlarla iletişiminde karşısındakine yönelmek ve onu dinlemek dikkat çeker. Güzel konuşmak kadar güzel dinlemek de ahlâkın parçasıdır.",
    practice: "Bu hafta: Bir arkadaşım konuşurken sözünü tamamlamasına fırsat vereceğim.",
    title: "BİRİNİN SÖZÜNÜ KESMEMEYE ÖZEN GÖSTERMESİ — Konuşma adabı",
    body: "Efendimizin insanlarla iletişiminde karşısındakine yönelmek ve onu dinlemek dikkat çeker. Güzel konuşmak kadar güzel dinlemek de ahlâkın parçasıdır.\n\nBu hafta: Bir arkadaşım konuşurken sözünü tamamlamasına fırsat vereceğim.",
  },
  {
    weekNumber: 50,
    header: "KÖTÜ SÖZ YERİNE GÜZEL SÖZÜ SEÇMESİ — Dilimiz karakterimizi gösterir",
    story:
      "Efendimiz kaba ve kırıcı konuşmayı benimsemezdi. İnsanları düzeltirken bile hakaret yerine anlaşılır ve ölçülü söz kullanırdı.",
    practice: "Bu hafta: Kızdığım anda kullanacağım kelimeleri özellikle kontrol edeceğim.",
    title: "KÖTÜ SÖZ YERİNE GÜZEL SÖZÜ SEÇMESİ — Dilimiz karakterimizi gösterir",
    body: "Efendimiz kaba ve kırıcı konuşmayı benimsemezdi. İnsanları düzeltirken bile hakaret yerine anlaşılır ve ölçülü söz kullanırdı.\n\nBu hafta: Kızdığım anda kullanacağım kelimeleri özellikle kontrol edeceğim.",
  },
  {
    weekNumber: 51,
    header: "İYİLİĞE TEŞEKKÜR ETMESİ — Yapılanı fark etmek",
    story:
      "Zâhir'in getirdiği kır çiçeklerini kabul edip ona teşekkür etmesi gibi Efendimiz insanların iyiliklerini görürdü. Teşekkür, yapılan iyiliğin büyüklüğüne değil gönülden gelmesine bakar.",
    practice: "Bu hafta: Bana yardımcı olan en az bir kişiye açıkça teşekkür edeceğim.",
    title: "İYİLİĞE TEŞEKKÜR ETMESİ — Yapılanı fark etmek",
    body: "Zâhir'in getirdiği kır çiçeklerini kabul edip ona teşekkür etmesi gibi Efendimiz insanların iyiliklerini görürdü. Teşekkür, yapılan iyiliğin büyüklüğüne değil gönülden gelmesine bakar.\n\nBu hafta: Bana yardımcı olan en az bir kişiye açıkça teşekkür edeceğim.",
  },
  {
    weekNumber: 52,
    header: "HEDİYEYE HEDİYEYLE KARŞILIK VERMESİ — İyiliği karşılıksız bırakmamak",
    story:
      "Efendimiz hediye kabul eder ve imkân bulduğunda karşılığını verirdi. İyiliğin yeni bir iyiliği doğurmasını isterdi.",
    practice: "Bu hafta: Bana iyilik yapan birine ben de bir iyilik yapacağım.",
    title: "HEDİYEYE HEDİYEYLE KARŞILIK VERMESİ — İyiliği karşılıksız bırakmamak",
    body: "Efendimiz hediye kabul eder ve imkân bulduğunda karşılığını verirdi. İyiliğin yeni bir iyiliği doğurmasını isterdi.\n\nBu hafta: Bana iyilik yapan birine ben de bir iyilik yapacağım.",
  },
  {
    weekNumber: 53,
    header: "ÇOCUKLARLA ŞAKALAŞMASI — Büyük olmak ciddi görünmek demek değildir",
    story:
      "Efendimiz çocuklarla konuşur, onların seviyesine iner ve onları sevindirirdi. Çocukları yalnız susturulması gereken küçükler olarak görmezdi.",
    practice: "Bu hafta: Benden küçük bir çocukla onun hoşuna gidecek güzel bir sohbet kuracağım.",
    title: "ÇOCUKLARLA ŞAKALAŞMASI — Büyük olmak ciddi görünmek demek değildir",
    body: "Efendimiz çocuklarla konuşur, onların seviyesine iner ve onları sevindirirdi. Çocukları yalnız susturulması gereken küçükler olarak görmezdi.\n\nBu hafta: Benden küçük bir çocukla onun hoşuna gidecek güzel bir sohbet kuracağım.",
  },
  {
    weekNumber: 54,
    header: "İNSANLARIN İSİMLERİNİ VE HÂLLERİNİ ÖNEMSEMESİ — Herkes görülmek ister",
    story:
      "Efendimizin çevresindeki insanlarla yakın ilgisi, onların kendilerini topluluğun değerli bir parçası hissetmesini sağlıyordu. Zâhir gibi toplumda kolayca geri planda kalabilecek bir insanla özel olarak ilgilenmesi bunun canlı örneğidir.",
    practice: "Bu hafta: Genellikle sessiz kalan bir arkadaşıma hâlini soracağım.",
    title: "İNSANLARIN İSİMLERİNİ VE HÂLLERİNİ ÖNEMSEMESİ — Herkes görülmek ister",
    body: "Efendimizin çevresindeki insanlarla yakın ilgisi, onların kendilerini topluluğun değerli bir parçası hissetmesini sağlıyordu. Zâhir gibi toplumda kolayca geri planda kalabilecek bir insanla özel olarak ilgilenmesi bunun canlı örneğidir.\n\nBu hafta: Genellikle sessiz kalan bir arkadaşıma hâlini soracağım.",
  },
  {
    weekNumber: 55,
    header: "GÜZEL AHLÂKIYLA İNSANLARIN GÖNLÜNÜ KAZANMASI — Onu örnek almak",
    story:
      "Bu 55 kesitte Efendimizi yalnız tarihî olayların içinde değil; çocukla konuşurken, arkadaşını dinlerken, hayvana merhamet ederken, sofrada, pazarda, evde, yolculukta ve zor bir insanla karşılaşırken gördük. Onu örnek almak yalnız hayatındaki olayları bilmek değildir. Asıl hedef, “Efendimiz benim yerimde olsaydı nasıl davranırdı?” sorusunu günlük hayatımıza taşıyabilmektir.",
    practice:
      "Bu hafta: Bu çalışmadaki davranışlardan birini seçip bir hafta boyunca özellikle uygulayacağım.",
    title: "GÜZEL AHLÂKIYLA İNSANLARIN GÖNLÜNÜ KAZANMASI — Onu örnek almak",
    body: "Bu 55 kesitte Efendimizi yalnız tarihî olayların içinde değil; çocukla konuşurken, arkadaşını dinlerken, hayvana merhamet ederken, sofrada, pazarda, evde, yolculukta ve zor bir insanla karşılaşırken gördük. Onu örnek almak yalnız hayatındaki olayları bilmek değildir. Asıl hedef, “Efendimiz benim yerimde olsaydı nasıl davranırdı?” sorusunu günlük hayatımıza taşıyabilmektir.\n\nBu hafta: Bu çalışmadaki davranışlardan birini seçip bir hafta boyunca özellikle uygulayacağım.",
  },
] as const;

/**
 * Lise (4., 5. ve 6. Sınıflar) için 55 haftalık Efendimiz'in Hayatından Örnek Kesitler müfredatı
 * Kaynak: mufredat-docs/efendimiz/02_EFENDIMIZIN_HAYATINDAN_55_KESIT_LISE.docx
 */
export const liseEfendimizCurriculum: readonly EfendimizCurriculumItem[] = [
  {
    weekNumber: 1,
    header: "ZÂHİR'İN GÖNLÜNE DOKUNMASI — Değer, görünüşten daha derindir",
    story:
      "Zâhir Medine dışındaki bir köyde yaşayan, ürünlerini pazarda satan bir sahabiydi. Medine'ye geldiğinde Efendimize kır çiçekleri ve meyveler getirirdi. Bir gün pazarda çalışırken Efendimiz arkasından gelip onunla şakalaştı. Zâhir, görünüşünü küçümseyerek kendisinin değersiz olduğunu ima edince Efendimiz Allah katındaki değerini hatırlattı. Birkaç kelimeyle onun zayıf gördüğü tarafını utanç olmaktan çıkarıp gönlünü onardı. İnsanlara rol, görüntü ve statü üzerinden değil, taşıdıkları insanî değer üzerinden bakıyordu.",
    practice:
      "Hayata taşı: Çevrende kendisini yetersiz veya değersiz hisseden birine, yapmacık övgü değil gerçek bir değerini fark ettiren söz söyle.",
    title: "ZÂHİR'İN GÖNLÜNE DOKUNMASI — Değer, görünüşten daha derindir",
    body: "Zâhir Medine dışındaki bir köyde yaşayan, ürünlerini pazarda satan bir sahabiydi. Medine'ye geldiğinde Efendimize kır çiçekleri ve meyveler getirirdi. Bir gün pazarda çalışırken Efendimiz arkasından gelip onunla şakalaştı. Zâhir, görünüşünü küçümseyerek kendisinin değersiz olduğunu ima edince Efendimiz Allah katındaki değerini hatırlattı. Birkaç kelimeyle onun zayıf gördüğü tarafını utanç olmaktan çıkarıp gönlünü onardı. İnsanlara rol, görüntü ve statü üzerinden değil, taşıdıkları insanî değer üzerinden bakıyordu.\n\nHayata taşı: Çevrende kendisini yetersiz veya değersiz hisseden birine, yapmacık övgü değil gerçek bir değerini fark ettiren söz söyle.",
  },
  {
    weekNumber: 2,
    header: "KÜÇÜK KIZIN HURMASI — Adalet, güçsüzün derdini ciddiye almakla başlar",
    story:
      "Fakir bir ailenin evine komşularının hurma ağacının dalları sarkıyordu. Yere düşen hurmalardan birini yiyen küçük kızın ağzından hurmanın alınmasına kadar varan katı davranış aileyi incitti. Baba meseleyi Efendimize anlattığında o bunu küçük bir komşuluk tartışması saymadı. Ağaç sahibiyle konuştu, çözüm aradı; bir sahabinin büyük fedakârlığı sonucunda ağaç fakir aileye verildi. Onun adalet anlayışında sesi az çıkan insanın derdi de görünür hâle geliyordu.",
    practice:
      "Hayata taşı: Bir anlaşmazlıkta yalnız güçlü ve çok konuşan tarafı değil, kendini anlatmakta zorlanan tarafı da dinle.",
    title: "KÜÇÜK KIZIN HURMASI — Adalet, güçsüzün derdini ciddiye almakla başlar",
    body: "Fakir bir ailenin evine komşularının hurma ağacının dalları sarkıyordu. Yere düşen hurmalardan birini yiyen küçük kızın ağzından hurmanın alınmasına kadar varan katı davranış aileyi incitti. Baba meseleyi Efendimize anlattığında o bunu küçük bir komşuluk tartışması saymadı. Ağaç sahibiyle konuştu, çözüm aradı; bir sahabinin büyük fedakârlığı sonucunda ağaç fakir aileye verildi. Onun adalet anlayışında sesi az çıkan insanın derdi de görünür hâle geliyordu.\n\nHayata taşı: Bir anlaşmazlıkta yalnız güçlü ve çok konuşan tarafı değil, kendini anlatmakta zorlanan tarafı da dinle.",
  },
  {
    weekNumber: 3,
    header: "ZÂHİR'LE PAZARDA ŞAKALAŞMASI — Ciddiyet, soğukluk değildir",
    story:
      "Efendimiz Zâhir'in arkasından yaklaşarak gözlerini kapatmış ve onunla şakalaşmıştı. Bu sıcak ilişki, peygamberlik vakarının insanlarla arasına duvar örmediğini gösterir. Fakat şakanın sonunda Zâhir'in onurunu yükselten bir söz vardır; mizah birini küçültmenin aracı değildir.",
    practice:
      "Hayata taşı: Şaka yaparken bir insanın bedeni, ailesi, başarısızlığı veya hassasiyetini malzeme yapma.",
    title: "ZÂHİR'LE PAZARDA ŞAKALAŞMASI — Ciddiyet, soğukluk değildir",
    body: "Efendimiz Zâhir'in arkasından yaklaşarak gözlerini kapatmış ve onunla şakalaşmıştı. Bu sıcak ilişki, peygamberlik vakarının insanlarla arasına duvar örmediğini gösterir. Fakat şakanın sonunda Zâhir'in onurunu yükselten bir söz vardır; mizah birini küçültmenin aracı değildir.\n\nHayata taşı: Şaka yaparken bir insanın bedeni, ailesi, başarısızlığı veya hassasiyetini malzeme yapma.",
  },
  {
    weekNumber: 4,
    header: "NAMAZA ÇAĞRI MESELESİNİ İSTİŞARE ETMESİ — Dinlemek liderliğin parçasıdır",
    story:
      "Medine'de namaz vaktinin nasıl duyurulacağı konuşulurken farklı sahabiler farklı teklifler sundular. Efendimiz teklifleri dinledi ve değerlendirdi. Hazreti Ömer'in önerisiyle Bilâl'in insanları çağırması, ardından Abdullah bin Zeyd'in ezanla ilgili rüyasının değerlendirilmesi sürecinde kararın etrafında ortak akıl oluştu. Otorite sahibi olmak, başkalarının düşüncesine ihtiyaç duymadığını göstermek değildi.",
    practice:
      "Hayata taşı: Bir grup kararında kendi fikrini söylemeden önce iki kişinin görüşünü gerçekten anlamaya çalış.",
    title: "NAMAZA ÇAĞRI MESELESİNİ İSTİŞARE ETMESİ — Dinlemek liderliğin parçasıdır",
    body: "Medine'de namaz vaktinin nasıl duyurulacağı konuşulurken farklı sahabiler farklı teklifler sundular. Efendimiz teklifleri dinledi ve değerlendirdi. Hazreti Ömer'in önerisiyle Bilâl'in insanları çağırması, ardından Abdullah bin Zeyd'in ezanla ilgili rüyasının değerlendirilmesi sürecinde kararın etrafında ortak akıl oluştu. Otorite sahibi olmak, başkalarının düşüncesine ihtiyaç duymadığını göstermek değildi.\n\nHayata taşı: Bir grup kararında kendi fikrini söylemeden önce iki kişinin görüşünü gerçekten anlamaya çalış.",
  },
  {
    weekNumber: 5,
    header: "HENDEKTE SELMÂN'IN FİKRİNİ KABUL ETMESİ — Fikrin değerini sahibinin kökeni belirlemez",
    story:
      "Medine ciddi bir tehditle karşılaştığında Selmân-ı Fârisî, İran'da kullanılan hendek savunmasını teklif etti. Bu, Arapların alışık olduğu bir yöntem değildi. Efendimiz “Biz böyle yapmayız.” demedi; işe yarayan fikri değerlendirdi. Yeniliğe açıklık ve farklı tecrübelerden yararlanmak onun liderlik tavrının önemli bir örneğidir.",
    practice:
      "Hayata taşı: Sana yabancı gelen bir fikri, kim söylediğine değil gerekçesine bakarak değerlendir.",
    title: "HENDEKTE SELMÂN'IN FİKRİNİ KABUL ETMESİ — Fikrin değerini sahibinin kökeni belirlemez",
    body: "Medine ciddi bir tehditle karşılaştığında Selmân-ı Fârisî, İran'da kullanılan hendek savunmasını teklif etti. Bu, Arapların alışık olduğu bir yöntem değildi. Efendimiz “Biz böyle yapmayız.” demedi; işe yarayan fikri değerlendirdi. Yeniliğe açıklık ve farklı tecrübelerden yararlanmak onun liderlik tavrının önemli bir örneğidir.\n\nHayata taşı: Sana yabancı gelen bir fikri, kim söylediğine değil gerekçesine bakarak değerlendir.",
  },
  {
    weekNumber: 6,
    header: "HENDEĞİ KENDİSİNİN DE KAZMASI — Lider, yükü paylaşır",
    story:
      "Hendek kazılırken şartlar ağırdı. Efendimiz insanlara görev dağıtıp kenara çekilmedi; kendisi de çalıştı. Böylece liderliğin ayrıcalık değil sorumluluk olduğunu davranışıyla gösterdi.",
    practice:
      "Hayata taşı: Grup çalışmasında görünür kısmı değil, gerçekten yük alan bir görevi üstlen.",
    title: "HENDEĞİ KENDİSİNİN DE KAZMASI — Lider, yükü paylaşır",
    body: "Hendek kazılırken şartlar ağırdı. Efendimiz insanlara görev dağıtıp kenara çekilmedi; kendisi de çalıştı. Böylece liderliğin ayrıcalık değil sorumluluk olduğunu davranışıyla gösterdi.\n\nHayata taşı: Grup çalışmasında görünür kısmı değil, gerçekten yük alan bir görevi üstlen.",
  },
  {
    weekNumber: 7,
    header: "MESCİT YAPILIRKEN ÇALIŞMASI — Ortak iyilik emek ister",
    story:
      "Medine'de mescit inşa edilirken Efendimiz de taş ve kerpiç taşıyanların arasındaydı. Toplum için önemli bir projenin başında olmak onu bedensel emekten muaf kılmadı.",
    practice:
      "Hayata taşı: Ortak kullanılan bir alanın düzeni veya temizliği için senden istenmeden katkı ver.",
    title: "MESCİT YAPILIRKEN ÇALIŞMASI — Ortak iyilik emek ister",
    body: "Medine'de mescit inşa edilirken Efendimiz de taş ve kerpiç taşıyanların arasındaydı. Toplum için önemli bir projenin başında olmak onu bedensel emekten muaf kılmadı.\n\nHayata taşı: Ortak kullanılan bir alanın düzeni veya temizliği için senden istenmeden katkı ver.",
  },
  {
    weekNumber: 8,
    header: "YOLCULUKTA YAKACAK TOPLAMAYI ÜSTLENMESİ — Ayrıcalık talep etmemek",
    story:
      "Bir yolculukta yemek hazırlığı için görevler paylaşılırken Efendimiz de yakacak toplama görevini aldı. Arkadaşları onun yerine yapabileceklerini söylediklerinde ayrıcalıklı tutulmayı istemedi. İnsanlarla beraber olmak, yükü de beraber taşımaktı.",
    practice: "Hayata taşı: Arkadaş grubunda zor işi sürekli aynı kişilere bırakma.",
    title: "YOLCULUKTA YAKACAK TOPLAMAYI ÜSTLENMESİ — Ayrıcalık talep etmemek",
    body: "Bir yolculukta yemek hazırlığı için görevler paylaşılırken Efendimiz de yakacak toplama görevini aldı. Arkadaşları onun yerine yapabileceklerini söylediklerinde ayrıcalıklı tutulmayı istemedi. İnsanlarla beraber olmak, yükü de beraber taşımaktı.\n\nHayata taşı: Arkadaş grubunda zor işi sürekli aynı kişilere bırakma.",
  },
  {
    weekNumber: 9,
    header: "ENES'E YILLARCA KABA DAVRANMAMASI — Eğitimde onur kırmamak",
    story:
      "Enes bin Mâlik küçük yaşından itibaren uzun süre Efendimizin yanında bulundu. Enes'in hatıralarında, Efendimizin kendisini azarlayan ve sürekli kusur arayan biri olmadığı özellikle görülür. Bir gencin gelişmesi için hatasını yüzüne vurmak yerine güvenli bir ilişki kuruyordu.",
    practice:
      "Hayata taşı: Birinin hatasını düzeltmen gerekiyorsa kişiliğini değil davranışı konuş.",
    title: "ENES'E YILLARCA KABA DAVRANMAMASI — Eğitimde onur kırmamak",
    body: "Enes bin Mâlik küçük yaşından itibaren uzun süre Efendimizin yanında bulundu. Enes'in hatıralarında, Efendimizin kendisini azarlayan ve sürekli kusur arayan biri olmadığı özellikle görülür. Bir gencin gelişmesi için hatasını yüzüne vurmak yerine güvenli bir ilişki kuruyordu.\n\nHayata taşı: Birinin hatasını düzeltmen gerekiyorsa kişiliğini değil davranışı konuş.",
  },
  {
    weekNumber: 10,
    header: "AĞACI TAŞLAYAN ÇOCUĞA “NEDEN?” DİYE SORMASI — Hükümden önce anlamak",
    story:
      "Bir çocuk hurma ağaçlarını taşlarken yakalandı. Efendimiz onu doğrudan suçlamak yerine niçin yaptığını sordu. Çocuk açlığını anlatınca ona ağacı taşlamadan yere düşen hurmalardan yiyebileceğini söyledi ve dua etti. Davranışın arkasındaki ihtiyacı görmek, doğru çözümü mümkün kıldı.",
    practice: "Hayata taşı: Seni kızdıran bir davranışta tepki vermeden önce sebebini sor.",
    title: "AĞACI TAŞLAYAN ÇOCUĞA “NEDEN?” DİYE SORMASI — Hükümden önce anlamak",
    body: "Bir çocuk hurma ağaçlarını taşlarken yakalandı. Efendimiz onu doğrudan suçlamak yerine niçin yaptığını sordu. Çocuk açlığını anlatınca ona ağacı taşlamadan yere düşen hurmalardan yiyebileceğini söyledi ve dua etti. Davranışın arkasındaki ihtiyacı görmek, doğru çözümü mümkün kıldı.\n\nHayata taşı: Seni kızdıran bir davranışta tepki vermeden önce sebebini sor.",
  },
  {
    weekNumber: 11,
    header: "MESCİDİ KİRLETEN BEDEVİYİ UTANDIRMAMASI — Yanlış ile insanı ayırmak",
    story:
      "Bir bedevi mescidin içinde uygunsuz bir davranış yaptığında çevredekiler sert biçimde müdahale etmek istedi. Efendimiz onları durdurdu; olay bittikten sonra mescidin maksadını adama anlattı ve kirlenen yerin temizlenmesini istedi. Yanlış düzeltildi fakat insan aşağılanmadı.",
    practice: "Hayata taşı: Bilmediği için hata yapan birini topluluk önünde küçük düşürme.",
    title: "MESCİDİ KİRLETEN BEDEVİYİ UTANDIRMAMASI — Yanlış ile insanı ayırmak",
    body: "Bir bedevi mescidin içinde uygunsuz bir davranış yaptığında çevredekiler sert biçimde müdahale etmek istedi. Efendimiz onları durdurdu; olay bittikten sonra mescidin maksadını adama anlattı ve kirlenen yerin temizlenmesini istedi. Yanlış düzeltildi fakat insan aşağılanmadı.\n\nHayata taşı: Bilmediği için hata yapan birini topluluk önünde küçük düşürme.",
  },
  {
    weekNumber: 12,
    header: "ELBİSESİNİ SERTÇE ÇEKEN ADAMA KARŞILIK VERMEMESİ — Tepkini seçebilirsin",
    story:
      "Bir bedevi Efendimizin elbisesini öyle sert çekti ki kumaşın izi omzunda kaldı; ardından kaba biçimde yardım istedi. Efendimiz anlık öfkesinin peşinden gitmedi, adama dönüp gülümsedi ve ihtiyacının karşılanmasını istedi. Karşı tarafın üslubu, onun kendi ahlâkını belirlemedi.",
    practice:
      "Hayata taşı: Sana sert davranıldığında cevabını karşı tarafın seviyesine göre değil kendi değerlerine göre seç.",
    title: "ELBİSESİNİ SERTÇE ÇEKEN ADAMA KARŞILIK VERMEMESİ — Tepkini seçebilirsin",
    body: "Bir bedevi Efendimizin elbisesini öyle sert çekti ki kumaşın izi omzunda kaldı; ardından kaba biçimde yardım istedi. Efendimiz anlık öfkesinin peşinden gitmedi, adama dönüp gülümsedi ve ihtiyacının karşılanmasını istedi. Karşı tarafın üslubu, onun kendi ahlâkını belirlemedi.\n\nHayata taşı: Sana sert davranıldığında cevabını karşı tarafın seviyesine göre değil kendi değerlerine göre seç.",
  },
  {
    weekNumber: 13,
    header: "BORCUNU İSTEYEN KİŞİNİN HAKKINI KORUMASI — Eleştirenin de hakkı olabilir",
    story:
      "Alacağını isteyen bir kişi sert konuşunca sahabiler ona tepki göstermek istedi. Efendimiz hak sahibinin konuşma hakkı bulunduğunu belirterek borcun güzelce ödenmesini istedi. Kendisinin hedef olduğu bir olayda bile hakkaniyeti kişisel gururunun önüne koydu.",
    practice:
      "Hayata taşı: Üslubu hoşuna gitmese bile bir eleştirinin haklı kısmını ayırmaya çalış.",
    title: "BORCUNU İSTEYEN KİŞİNİN HAKKINI KORUMASI — Eleştirenin de hakkı olabilir",
    body: "Alacağını isteyen bir kişi sert konuşunca sahabiler ona tepki göstermek istedi. Efendimiz hak sahibinin konuşma hakkı bulunduğunu belirterek borcun güzelce ödenmesini istedi. Kendisinin hedef olduğu bir olayda bile hakkaniyeti kişisel gururunun önüne koydu.\n\nHayata taşı: Üslubu hoşuna gitmese bile bir eleştirinin haklı kısmını ayırmaya çalış.",
  },
  {
    weekNumber: 14,
    header: "PAZARDA ISLAK YİYECEĞİ FARK ETMESİ — Şeffaflık ahlâktır",
    story:
      "Pazarda yiyecek satan birinin malına elini uzattığında alt tarafın ıslak olduğunu fark etti. Satıcı yağmurdan ıslandığını söyleyince bunun müşterinin görebileceği yerde olması gerektiğini belirtti. Kusuru gizleyerek avantaj sağlamak, güveni bozan bir davranıştı.",
    practice:
      "Hayata taşı: Yaptığın işte sana avantaj sağlayacak olsa bile önemli bir kusuru gizleme.",
    title: "PAZARDA ISLAK YİYECEĞİ FARK ETMESİ — Şeffaflık ahlâktır",
    body: "Pazarda yiyecek satan birinin malına elini uzattığında alt tarafın ıslak olduğunu fark etti. Satıcı yağmurdan ıslandığını söyleyince bunun müşterinin görebileceği yerde olması gerektiğini belirtti. Kusuru gizleyerek avantaj sağlamak, güveni bozan bir davranıştı.\n\nHayata taşı: Yaptığın işte sana avantaj sağlayacak olsa bile önemli bir kusuru gizleme.",
  },
  {
    weekNumber: 15,
    header: "YEMEĞİ KÖTÜLEMEMESİ — Zevk ile saygıyı ayırmak",
    story:
      "Efendimiz bir yemeği seviyorsa yer, hoşlanmıyorsa bırakır; fakat yemeği kötülemezdi. Kişisel beğeniyi nimeti veya hazırlayan kişiyi aşağılamaya dönüştürmezdi.",
    practice: "Hayata taşı: Beğenmediğin bir şey hakkında gereksiz kırıcı yorum yapma.",
    title: "YEMEĞİ KÖTÜLEMEMESİ — Zevk ile saygıyı ayırmak",
    body: "Efendimiz bir yemeği seviyorsa yer, hoşlanmıyorsa bırakır; fakat yemeği kötülemezdi. Kişisel beğeniyi nimeti veya hazırlayan kişiyi aşağılamaya dönüştürmezdi.\n\nHayata taşı: Beğenmediğin bir şey hakkında gereksiz kırıcı yorum yapma.",
  },
  {
    weekNumber: 16,
    header: "SOFRADA ÇOCUĞU NAZİKÇE YÖNLENDİRMESİ — Kısa ve saygılı eğitim",
    story:
      "Bir çocuk yemek sırasında elini tabağın farklı yerlerine uzatıyordu. Efendimiz onu herkesin önünde utandırmadı; Allah'ın adını anmasını, sağ eliyle ve önünden yemesini söyledi. Öğretmek için uzun azarlamalara ihtiyaç duymadı.",
    practice:
      "Hayata taşı: Bildiğin bir konuda birini düzeltirken ses tonunu ve kelimelerini de doğru seç.",
    title: "SOFRADA ÇOCUĞU NAZİKÇE YÖNLENDİRMESİ — Kısa ve saygılı eğitim",
    body: "Bir çocuk yemek sırasında elini tabağın farklı yerlerine uzatıyordu. Efendimiz onu herkesin önünde utandırmadı; Allah'ın adını anmasını, sağ eliyle ve önünden yemesini söyledi. Öğretmek için uzun azarlamalara ihtiyaç duymadı.\n\nHayata taşı: Bildiğin bir konuda birini düzeltirken ses tonunu ve kelimelerini de doğru seç.",
  },
  {
    weekNumber: 17,
    header: "EVİNDE AİLESİNE YARDIM ETMESİ — Sorumluluk evin kapısında bitmez",
    story:
      "Efendimiz dışarıda büyük sorumluluklar taşırken evinde yalnız hizmet beklemez, ailesine yardımcı olurdu. Kamusal saygınlık, ev içindeki sorumluluğu ortadan kaldırmıyordu.",
    practice: "Hayata taşı: Evde “benim görevim değil” dediğin bir işi gönüllü olarak yap.",
    title: "EVİNDE AİLESİNE YARDIM ETMESİ — Sorumluluk evin kapısında bitmez",
    body: "Efendimiz dışarıda büyük sorumluluklar taşırken evinde yalnız hizmet beklemez, ailesine yardımcı olurdu. Kamusal saygınlık, ev içindeki sorumluluğu ortadan kaldırmıyordu.\n\nHayata taşı: Evde “benim görevim değil” dediğin bir işi gönüllü olarak yap.",
  },
  {
    weekNumber: 18,
    header: "KENDİ EŞYASIYLA İLGİLENMESİ — Bağımsızlık ve tevazu",
    story:
      "Kendi ayakkabısını tamir etmesi ve kişisel işlerini yapmasıyla ilgili rivayetler, onun günlük hayattaki sadeliğini gösterir. Yapabileceği işi sırf konumu sebebiyle başkasına yüklemiyordu.",
    practice:
      "Hayata taşı: Kendi sorumluluğundaki bir işi başkasının hatırlatmasını beklemeden tamamla.",
    title: "KENDİ EŞYASIYLA İLGİLENMESİ — Bağımsızlık ve tevazu",
    body: "Kendi ayakkabısını tamir etmesi ve kişisel işlerini yapmasıyla ilgili rivayetler, onun günlük hayattaki sadeliğini gösterir. Yapabileceği işi sırf konumu sebebiyle başkasına yüklemiyordu.\n\nHayata taşı: Kendi sorumluluğundaki bir işi başkasının hatırlatmasını beklemeden tamamla.",
  },
  {
    weekNumber: 19,
    header: "TORUNLARINI ÖPMESİ — Sevgi ifade edilmelidir",
    story:
      "Efendimiz Hasan ve Hüseyin'e sevgisini açıkça gösterirdi. Çocuklarını öpmediğini söyleyen birine merhametin önemini hatırlatması, duygusal mesafenin bir üstünlük olmadığını gösterir.",
    practice: "Hayata taşı: Sevdiğin bir insana bunu davranış veya sözle belli et.",
    title: "TORUNLARINI ÖPMESİ — Sevgi ifade edilmelidir",
    body: "Efendimiz Hasan ve Hüseyin'e sevgisini açıkça gösterirdi. Çocuklarını öpmediğini söyleyen birine merhametin önemini hatırlatması, duygusal mesafenin bir üstünlük olmadığını gösterir.\n\nHayata taşı: Sevdiğin bir insana bunu davranış veya sözle belli et.",
  },
  {
    weekNumber: 20,
    header: "SECDEDE TORUNUNU İNCİTMEMESİ — İbadetin içinde bile şefkat",
    story:
      "Küçük torunu namaz sırasında sırtına çıktığında Efendimiz onu sertçe uzaklaştırmadı; secdeyi uzattı. Çocuğun yaşına uygun davranışını anlayışla karşıladı.",
    practice: "Hayata taşı: Küçük bir çocuğun davranışını yetişkin niyetiyle yorumlamamaya çalış.",
    title: "SECDEDE TORUNUNU İNCİTMEMESİ — İbadetin içinde bile şefkat",
    body: "Küçük torunu namaz sırasında sırtına çıktığında Efendimiz onu sertçe uzaklaştırmadı; secdeyi uzattı. Çocuğun yaşına uygun davranışını anlayışla karşıladı.\n\nHayata taşı: Küçük bir çocuğun davranışını yetişkin niyetiyle yorumlamamaya çalış.",
  },
  {
    weekNumber: 21,
    header: "ÇOCUK AĞLAYINCA NAMAZI UZATMAMASI — Empati karar değiştirir",
    story:
      "Cemaatte bir bebeğin ağlamasını duyduğunda annesinin sıkıntısını düşünerek namazı kısa tuttuğunu ifade etmiştir. Başkasının hâlini anlamak, kendi planını gerektiğinde değiştirebilmekti.",
    practice:
      "Hayata taşı: Program yaparken yalnız kendi rahatını değil beraberindeki insanların durumunu da düşün.",
    title: "ÇOCUK AĞLAYINCA NAMAZI UZATMAMASI — Empati karar değiştirir",
    body: "Cemaatte bir bebeğin ağlamasını duyduğunda annesinin sıkıntısını düşünerek namazı kısa tuttuğunu ifade etmiştir. Başkasının hâlini anlamak, kendi planını gerektiğinde değiştirebilmekti.\n\nHayata taşı: Program yaparken yalnız kendi rahatını değil beraberindeki insanların durumunu da düşün.",
  },
  {
    weekNumber: 22,
    header: "KUŞUN YAVRULARINI GERİ VERDİRMESİ — Merhametin sınırı insan değildir",
    story:
      "Sahabiler bir kuşun yavrularını alınca anne kuş telaşla çevrelerinde uçtu. Efendimiz anne kuşun üzüldüğünü fark ederek yavruların geri verilmesini istedi. Küçük bir hayvanın korkusu bile dikkate değerdi.",
    practice: "Hayata taşı: Eğlence uğruna hiçbir canlıyı korkutma veya incitme.",
    title: "KUŞUN YAVRULARINI GERİ VERDİRMESİ — Merhametin sınırı insan değildir",
    body: "Sahabiler bir kuşun yavrularını alınca anne kuş telaşla çevrelerinde uçtu. Efendimiz anne kuşun üzüldüğünü fark ederek yavruların geri verilmesini istedi. Küçük bir hayvanın korkusu bile dikkate değerdi.\n\nHayata taşı: Eğlence uğruna hiçbir canlıyı korkutma veya incitme.",
  },
  {
    weekNumber: 23,
    header: "DEVENİN HÂLİNİ FARK ETMESİ — Güçsüz olanın hakkı",
    story:
      "Bir devenin sıkıntısını fark ettiğinde sahibine hayvan konusunda Allah'tan sakınmasını, onu aç bırakmamasını ve aşırı yormamasını hatırlattı. Sahip olmak sınırsız kullanım hakkı anlamına gelmiyordu.",
    practice:
      "Hayata taşı: Sana ait olan şeyler ve sorumluluğundaki canlılar üzerinde “istediğimi yaparım” anlayışını sorgula.",
    title: "DEVENİN HÂLİNİ FARK ETMESİ — Güçsüz olanın hakkı",
    body: "Bir devenin sıkıntısını fark ettiğinde sahibine hayvan konusunda Allah'tan sakınmasını, onu aç bırakmamasını ve aşırı yormamasını hatırlattı. Sahip olmak sınırsız kullanım hakkı anlamına gelmiyordu.\n\nHayata taşı: Sana ait olan şeyler ve sorumluluğundaki canlılar üzerinde “istediğimi yaparım” anlayışını sorgula.",
  },
  {
    weekNumber: 24,
    header: "YAHUDİ ÇOCUĞU HASTALIĞINDA ZİYARET ETMESİ — Farklılık merhameti durdurmaz",
    story:
      "Kendisine hizmet etmiş Yahudi bir çocuk hastalandığında Efendimiz onu ziyaret etti. İnanç farklılığı insanî ilgiyi ortadan kaldırmadı.",
    practice:
      "Hayata taşı: Senden farklı bir çevreden gelen birine iyilik yapmak için ortaklık arama.",
    title: "YAHUDİ ÇOCUĞU HASTALIĞINDA ZİYARET ETMESİ — Farklılık merhameti durdurmaz",
    body: "Kendisine hizmet etmiş Yahudi bir çocuk hastalandığında Efendimiz onu ziyaret etti. İnanç farklılığı insanî ilgiyi ortadan kaldırmadı.\n\nHayata taşı: Senden farklı bir çevreden gelen birine iyilik yapmak için ortaklık arama.",
  },
  {
    weekNumber: 25,
    header: "YAHUDİ CENAZESİ GEÇERKEN AYAĞA KALKMASI — İnsan olmanın değeri",
    story:
      "Bir cenaze geçerken ayağa kalktı. Cenazenin Yahudi olduğu söylendiğinde onun da bir insan olduğunu hatırlattı. Farklı kimlik, ölüm karşısındaki insanlık hürmetini yok etmedi.",
    practice: "Hayata taşı: Bir insanı tek bir kimlik etiketiyle değerlendirmemeye çalış.",
    title: "YAHUDİ CENAZESİ GEÇERKEN AYAĞA KALKMASI — İnsan olmanın değeri",
    body: "Bir cenaze geçerken ayağa kalktı. Cenazenin Yahudi olduğu söylendiğinde onun da bir insan olduğunu hatırlattı. Farklı kimlik, ölüm karşısındaki insanlık hürmetini yok etmedi.\n\nHayata taşı: Bir insanı tek bir kimlik etiketiyle değerlendirmemeye çalış.",
  },
  {
    weekNumber: 26,
    header: "BİLÂL'E VERDİĞİ DEĞER — Köken değil karakter",
    story:
      "Kölelik yaşamış Habeşli Bilâl, Efendimizin toplumunda değersiz bir kenar figür olarak kalmadı; ezan gibi sembolik bir vazifeyle öne çıktı. Toplumun yerleşik üstünlük ölçülerine karşı insan değerini inanç ve karakterle ilişkilendiren güçlü bir örnekti.",
    practice:
      "Hayata taşı: Dil, ırk, memleket veya ekonomik durum üzerinden yapılan küçümseyici mizaha katılma.",
    title: "BİLÂL'E VERDİĞİ DEĞER — Köken değil karakter",
    body: "Kölelik yaşamış Habeşli Bilâl, Efendimizin toplumunda değersiz bir kenar figür olarak kalmadı; ezan gibi sembolik bir vazifeyle öne çıktı. Toplumun yerleşik üstünlük ölçülerine karşı insan değerini inanç ve karakterle ilişkilendiren güçlü bir örnekti.\n\nHayata taşı: Dil, ırk, memleket veya ekonomik durum üzerinden yapılan küçümseyici mizaha katılma.",
  },
  {
    weekNumber: 27,
    header: "SELMÂN'I YAKININA ALMASI — Aidiyet kapısı açmak",
    story:
      "Selmân farklı bir coğrafyadan gelmiş ve uzun bir hakikat arayışı yaşamıştı. Efendimizin çevresinde kökeni sebebiyle yabancılaştırılmadı. Farklılık topluluğu zayıflatan değil zenginleştiren bir tecrübeye dönüştü.",
    practice: "Hayata taşı: Yeni gelen birinin gruba girebilmesi için ilk konuşmayı sen başlat.",
    title: "SELMÂN'I YAKININA ALMASI — Aidiyet kapısı açmak",
    body: "Selmân farklı bir coğrafyadan gelmiş ve uzun bir hakikat arayışı yaşamıştı. Efendimizin çevresinde kökeni sebebiyle yabancılaştırılmadı. Farklılık topluluğu zayıflatan değil zenginleştiren bir tecrübeye dönüştü.\n\nHayata taşı: Yeni gelen birinin gruba girebilmesi için ilk konuşmayı sen başlat.",
  },
  {
    weekNumber: 28,
    header: "GENÇLERE SORUMLULUK VERMESİ — Güven gelişimin önünü açar",
    story:
      "Efendimiz genç sahabilere ciddi sorumluluklar verdi. Yaşı tek başına yetersizlik ölçüsü saymadı; yetenek ve hazırlığı dikkate aldı. Gençleri yalnız geleceğin insanı değil, bugünün sorumluluk sahibi bireyleri olarak gördü.",
    practice:
      "Hayata taşı: Sorumluluk aldığında “nasıl olsa benden beklenmiyor” rahatlığına sığınma.",
    title: "GENÇLERE SORUMLULUK VERMESİ — Güven gelişimin önünü açar",
    body: "Efendimiz genç sahabilere ciddi sorumluluklar verdi. Yaşı tek başına yetersizlik ölçüsü saymadı; yetenek ve hazırlığı dikkate aldı. Gençleri yalnız geleceğin insanı değil, bugünün sorumluluk sahibi bireyleri olarak gördü.\n\nHayata taşı: Sorumluluk aldığında “nasıl olsa benden beklenmiyor” rahatlığına sığınma.",
  },
  {
    weekNumber: 29,
    header: "MUÂZ'I GÖREVE HAZIRLAMASI — Yetki kadar rehberlik",
    story:
      "Muâz bin Cebel'i göreve gönderirken ona insanlarla nasıl iletişim kuracağını ve önceliklerini anlattı. Birine görev vermek, onu yalnız bırakmak değildi; görevle beraber rehberlik de gerekiyordu.",
    practice: "Hayata taşı: Bir arkadaşına iş devrediyorsan gerekli bilgiyi de paylaş.",
    title: "MUÂZ'I GÖREVE HAZIRLAMASI — Yetki kadar rehberlik",
    body: "Muâz bin Cebel'i göreve gönderirken ona insanlarla nasıl iletişim kuracağını ve önceliklerini anlattı. Birine görev vermek, onu yalnız bırakmak değildi; görevle beraber rehberlik de gerekiyordu.\n\nHayata taşı: Bir arkadaşına iş devrediyorsan gerekli bilgiyi de paylaş.",
  },
  {
    weekNumber: 30,
    header: "FAKİRİN DAVETİNİ KABUL ETMESİ — Statü ilişkileri belirlememeli",
    story:
      "Efendimiz mütevazı davetleri küçümsemezdi. İnsanlarla ilişkisini onların servetine veya sofrasının zenginliğine göre kurmaması, toplumsal statü duvarlarını azaltıyordu.",
    practice: "Hayata taşı: İnsanlara sağladıkları imkâna göre yakınlık göstermediğinden emin ol.",
    title: "FAKİRİN DAVETİNİ KABUL ETMESİ — Statü ilişkileri belirlememeli",
    body: "Efendimiz mütevazı davetleri küçümsemezdi. İnsanlarla ilişkisini onların servetine veya sofrasının zenginliğine göre kurmaması, toplumsal statü duvarlarını azaltıyordu.\n\nHayata taşı: İnsanlara sağladıkları imkâna göre yakınlık göstermediğinden emin ol.",
  },
  {
    weekNumber: 31,
    header: "HEDİYEYİ KABUL EDİP KARŞILIK VERMESİ — İlişki tek taraflı değildir",
    story:
      "Zâhir'in kır çiçeklerini ve meyvelerini memnuniyetle kabul etmesi, teşekkür etmesi ve ona da hediyeler vermesi, küçük bir armağanın ardındaki sevgiyi gördüğünü gösterir.",
    practice: "Hayata taşı: Sana yapılan iyiliği sıradanlaştırma; fark ettiğini göster.",
    title: "HEDİYEYİ KABUL EDİP KARŞILIK VERMESİ — İlişki tek taraflı değildir",
    body: "Zâhir'in kır çiçeklerini ve meyvelerini memnuniyetle kabul etmesi, teşekkür etmesi ve ona da hediyeler vermesi, küçük bir armağanın ardındaki sevgiyi gördüğünü gösterir.\n\nHayata taşı: Sana yapılan iyiliği sıradanlaştırma; fark ettiğini göster.",
  },
  {
    weekNumber: 32,
    header: "MİSAFİRİN AÇLIĞINI MESELE EDİNMESİ — Misafirperverlik sorumluluktur",
    story:
      "İhtiyaç sahibi biri geldiğinde Efendimiz onun ihtiyacını gidermek için çözüm arar, çevresindekileri de iyiliğe ortak ederdi. İmkânın azlığı ilgisizliğin bahanesi değildi.",
    practice: "Hayata taşı: Birinin ihtiyacını tamamen çözemiyorsan bile yapabileceğin kısmı bul.",
    title: "MİSAFİRİN AÇLIĞINI MESELE EDİNMESİ — Misafirperverlik sorumluluktur",
    body: "İhtiyaç sahibi biri geldiğinde Efendimiz onun ihtiyacını gidermek için çözüm arar, çevresindekileri de iyiliğe ortak ederdi. İmkânın azlığı ilgisizliğin bahanesi değildi.\n\nHayata taşı: Birinin ihtiyacını tamamen çözemiyorsan bile yapabileceğin kısmı bul.",
  },
  {
    weekNumber: 33,
    header: "KOMŞULUK HAKKINI ÖNEMSEMESİ — Ahlâk en yakından başlar",
    story:
      "Komşunun ağacı hikâyesinde olduğu gibi, yan yana yaşayan insanların birbirine zarar vermesi onun ilgilendiği ahlâkî bir meseleydi. Büyük idealler, en yakındaki insanın hakkını çiğnemeyi meşru kılmaz.",
    practice: "Hayata taşı: Komşularını rahatsız edebilecek bir alışkanlığını gözden geçir.",
    title: "KOMŞULUK HAKKINI ÖNEMSEMESİ — Ahlâk en yakından başlar",
    body: "Komşunun ağacı hikâyesinde olduğu gibi, yan yana yaşayan insanların birbirine zarar vermesi onun ilgilendiği ahlâkî bir meseleydi. Büyük idealler, en yakındaki insanın hakkını çiğnemeyi meşru kılmaz.\n\nHayata taşı: Komşularını rahatsız edebilecek bir alışkanlığını gözden geçir.",
  },
  {
    weekNumber: 34,
    header: "TÂİF'TE İNTİKAM İSTEMEMESİ — Acı, ahlâkı belirlememeli",
    story:
      "Tâif'te reddedilmiş, aşağılanmış ve taşlanmıştı. Böyle bir anda karşılık verme imkânı gündeme geldiğinde yok edilmelerini istemedi; gelecekte içlerinden iyiliğe yönelecek insanlar çıkabileceğini düşündü. Geleceği, o anki öfkesinden daha geniş görebildi.",
    practice: "Hayata taşı: Çok kızdığın bir anda geri dönüşü zor bir karar verme.",
    title: "TÂİF'TE İNTİKAM İSTEMEMESİ — Acı, ahlâkı belirlememeli",
    body: "Tâif'te reddedilmiş, aşağılanmış ve taşlanmıştı. Böyle bir anda karşılık verme imkânı gündeme geldiğinde yok edilmelerini istemedi; gelecekte içlerinden iyiliğe yönelecek insanlar çıkabileceğini düşündü. Geleceği, o anki öfkesinden daha geniş görebildi.\n\nHayata taşı: Çok kızdığın bir anda geri dönüşü zor bir karar verme.",
  },
  {
    weekNumber: 35,
    header: "MEKKE'YE GİRERKEN TEVAZUSU — Zafer karakter sınavıdır",
    story:
      "Mekke'ye yıllar sonra güçlü biçimde dönerken gösterişli bir fatih tavrı yerine tevazu sergiledi. Başarı ve güç, kendisini geçmişteki sadeliğinden uzaklaştırmadı.",
    practice:
      "Hayata taşı: Başarı kazandığında seni destekleyen insanları ve başlangıç noktanı hatırla.",
    title: "MEKKE'YE GİRERKEN TEVAZUSU — Zafer karakter sınavıdır",
    body: "Mekke'ye yıllar sonra güçlü biçimde dönerken gösterişli bir fatih tavrı yerine tevazu sergiledi. Başarı ve güç, kendisini geçmişteki sadeliğinden uzaklaştırmadı.\n\nHayata taşı: Başarı kazandığında seni destekleyen insanları ve başlangıç noktanı hatırla.",
  },
  {
    weekNumber: 36,
    header: "FETİH GÜNÜ İNTİKAM İKLİMİ OLUŞTURMAMASI — Gücün ahlâkı",
    story:
      "Geçmişte ağır eziyetlere uğramış olmasına rağmen Mekke'nin fethi, toplu bir şahsî intikam gününe dönüşmedi. Gücün ele geçmesiyle ahlâkın terk edilmemesi, onun örnekliğinin en güçlü sahnelerindendir.",
    practice: "Hayata taşı: Bir tartışmada üstün duruma geçtiğinde karşı tarafı ezmekten kaçın.",
    title: "FETİH GÜNÜ İNTİKAM İKLİMİ OLUŞTURMAMASI — Gücün ahlâkı",
    body: "Geçmişte ağır eziyetlere uğramış olmasına rağmen Mekke'nin fethi, toplu bir şahsî intikam gününe dönüşmedi. Gücün ele geçmesiyle ahlâkın terk edilmemesi, onun örnekliğinin en güçlü sahnelerindendir.\n\nHayata taşı: Bir tartışmada üstün duruma geçtiğinde karşı tarafı ezmekten kaçın.",
  },
  {
    weekNumber: 37,
    header: "UHUD SONRASINDA YOLA DEVAM ETMESİ — Yenilgi kimliği belirlemez",
    story:
      "Uhud ağır kayıpların ve acının yaşandığı bir gündü. Efendimiz bu sarsıntının topluluğu tamamen dağıtmasına izin vermedi; sorumluluğu ve ümidi sürdürdü. Bir başarısızlık bütün geleceğin hükmü değildir.",
    practice:
      "Hayata taşı: Bir başarısızlığını “Ben zaten yapamıyorum.” cümlesine dönüştürme; bir sonraki adımı belirle.",
    title: "UHUD SONRASINDA YOLA DEVAM ETMESİ — Yenilgi kimliği belirlemez",
    body: "Uhud ağır kayıpların ve acının yaşandığı bir gündü. Efendimiz bu sarsıntının topluluğu tamamen dağıtmasına izin vermedi; sorumluluğu ve ümidi sürdürdü. Bir başarısızlık bütün geleceğin hükmü değildir.\n\nHayata taşı: Bir başarısızlığını “Ben zaten yapamıyorum.” cümlesine dönüştürme; bir sonraki adımı belirle.",
  },
  {
    weekNumber: 38,
    header: "HUDAYBİYE'DE SABIRLI DAVRANMASI — Her zor şart yenilgi değildir",
    story:
      "Hudeybiye'de bazı şartlar sahabilere ağır görünüyordu. Efendimiz anlık duygunun yerine daha geniş sonucu gözeten sabırlı bir tutum sergiledi. Bazen hemen kazanmak yerine uzun vadeli iyiliği seçmek gerekir.",
    practice: "Hayata taşı: Kısa vadede hoşuna gitmeyen bir kararın uzun vadeli sonucunu düşün.",
    title: "HUDAYBİYE'DE SABIRLI DAVRANMASI — Her zor şart yenilgi değildir",
    body: "Hudeybiye'de bazı şartlar sahabilere ağır görünüyordu. Efendimiz anlık duygunun yerine daha geniş sonucu gözeten sabırlı bir tutum sergiledi. Bazen hemen kazanmak yerine uzun vadeli iyiliği seçmek gerekir.\n\nHayata taşı: Kısa vadede hoşuna gitmeyen bir kararın uzun vadeli sonucunu düşün.",
  },
  {
    weekNumber: 39,
    header: "EŞLERİNİN GÖRÜŞÜNÜ DİKKATE ALMASI — Aile içinde istişare",
    story:
      "Hudeybiye sonrasında yaşanan zor bir anda Ümmü Seleme'nin görüşünü dinlemesi ve önerisini uygulaması, aile içindeki istişarenin güçlü bir örneğidir. Doğru fikir, yalnız resmî meclislerden çıkmaz.",
    practice:
      "Hayata taşı: Ailenden gelen bir öneriyi sırf “beni anlamazlar” diyerek reddetmeden dinle.",
    title: "EŞLERİNİN GÖRÜŞÜNÜ DİKKATE ALMASI — Aile içinde istişare",
    body: "Hudeybiye sonrasında yaşanan zor bir anda Ümmü Seleme'nin görüşünü dinlemesi ve önerisini uygulaması, aile içindeki istişarenin güçlü bir örneğidir. Doğru fikir, yalnız resmî meclislerden çıkmaz.\n\nHayata taşı: Ailenden gelen bir öneriyi sırf “beni anlamazlar” diyerek reddetmeden dinle.",
  },
  {
    weekNumber: 40,
    header: "KIZI FÂTIMA GELDİĞİNDE ONA DEĞER VERMESİ — Ailede saygı karşılıklıdır",
    story:
      "Efendimizin kızı Fâtıma'ya gösterdiği sevgi ve hürmet, ebeveyn-çocuk ilişkisinde yalnız küçüğün büyüğe saygısını değil büyüğün de çocuğuna değer vermesini gösterir.",
    practice: "Hayata taşı: Ailendeki birinin sözünü “nasıl olsa ailem” diyerek önemsizleştirme.",
    title: "KIZI FÂTIMA GELDİĞİNDE ONA DEĞER VERMESİ — Ailede saygı karşılıklıdır",
    body: "Efendimizin kızı Fâtıma'ya gösterdiği sevgi ve hürmet, ebeveyn-çocuk ilişkisinde yalnız küçüğün büyüğe saygısını değil büyüğün de çocuğuna değer vermesini gösterir.\n\nHayata taşı: Ailendeki birinin sözünü “nasıl olsa ailem” diyerek önemsizleştirme.",
  },
  {
    weekNumber: 41,
    header: "ÇOCUKLARA SELÂM VERMESİ — Saygı yaşa bağlı değildir",
    story:
      "Çocukların yanından geçerken onlara selâm vermesi, onların toplumda görünmez kişiler olmadığını gösteriyordu. Küçük olmak, saygıyı daha az hak etmek demek değildi.",
    practice: "Hayata taşı: Senden küçük insanlarla konuşurken üstten bir dil kullanma.",
    title: "ÇOCUKLARA SELÂM VERMESİ — Saygı yaşa bağlı değildir",
    body: "Çocukların yanından geçerken onlara selâm vermesi, onların toplumda görünmez kişiler olmadığını gösteriyordu. Küçük olmak, saygıyı daha az hak etmek demek değildi.\n\nHayata taşı: Senden küçük insanlarla konuşurken üstten bir dil kullanma.",
  },
  {
    weekNumber: 42,
    header: "ÇOCUKLARLA ŞAKALAŞMASI — İletişimde seviyeye inebilmek",
    story:
      "Efendimiz çocuklarla onların anlayacağı biçimde konuşur ve zaman zaman şakalaşırdı. İletişim, karşıdakinin dünyasına girebildiğinde etkili olur.",
    practice:
      "Hayata taşı: Bir şey anlatırken yalnız ne söyleyeceğini değil, karşındakinin nasıl anlayacağını da düşün.",
    title: "ÇOCUKLARLA ŞAKALAŞMASI — İletişimde seviyeye inebilmek",
    body: "Efendimiz çocuklarla onların anlayacağı biçimde konuşur ve zaman zaman şakalaşırdı. İletişim, karşıdakinin dünyasına girebildiğinde etkili olur.\n\nHayata taşı: Bir şey anlatırken yalnız ne söyleyeceğini değil, karşındakinin nasıl anlayacağını da düşün.",
  },
  {
    weekNumber: 43,
    header: "HASTALARI ZİYARET ETMESİ — İlişki zor zamanda belli olur",
    story:
      "Efendimiz hastaların hâlini sorar ve ziyaret ederdi. İnsanlarla bağını yalnız güçlü ve neşeli zamanlarında sürdürmezdi.",
    practice: "Hayata taşı: Zor durumda olduğunu bildiğin bir kişiye bugün ulaş.",
    title: "HASTALARI ZİYARET ETMESİ — İlişki zor zamanda belli olur",
    body: "Efendimiz hastaların hâlini sorar ve ziyaret ederdi. İnsanlarla bağını yalnız güçlü ve neşeli zamanlarında sürdürmezdi.\n\nHayata taşı: Zor durumda olduğunu bildiğin bir kişiye bugün ulaş.",
  },
  {
    weekNumber: 44,
    header: "YETİMİ GÖZETMESİ — Kırılgan olanı korumak",
    story:
      "Kendisi de yetim büyümüş olan Efendimiz yetimlerin korunmasına özel önem verdi. Güçsüzün hakkını savunmak, yalnız acıma duygusu değil toplumsal sorumluluktu.",
    practice: "Hayata taşı: Grubunda desteği az olan birinin yanında durabileceğin bir durum ara.",
    title: "YETİMİ GÖZETMESİ — Kırılgan olanı korumak",
    body: "Kendisi de yetim büyümüş olan Efendimiz yetimlerin korunmasına özel önem verdi. Güçsüzün hakkını savunmak, yalnız acıma duygusu değil toplumsal sorumluluktu.\n\nHayata taşı: Grubunda desteği az olan birinin yanında durabileceğin bir durum ara.",
  },
  {
    weekNumber: 45,
    header: "FAKİRLE AYNI SOFRADA OTURMASI — Eşitlik gündelik davranışta görünür",
    story:
      "Sade yemekler yer, toplumun yoksul kesimleriyle birlikte bulunmaktan çekinmezdi. İnsan eşitliği yalnız sözde değil kiminle oturduğumuzda da görünür.",
    practice: "Hayata taşı: Sosyal çevreni yalnız sana prestij kazandıran insanlardan oluşturma.",
    title: "FAKİRLE AYNI SOFRADA OTURMASI — Eşitlik gündelik davranışta görünür",
    body: "Sade yemekler yer, toplumun yoksul kesimleriyle birlikte bulunmaktan çekinmezdi. İnsan eşitliği yalnız sözde değil kiminle oturduğumuzda da görünür.\n\nHayata taşı: Sosyal çevreni yalnız sana prestij kazandıran insanlardan oluşturma.",
  },
  {
    weekNumber: 46,
    header: "MECLİSTE BOŞ BULDUĞU YERE OTURMASI — Makam gösterisine ihtiyaç duymamak",
    story:
      "Bir topluluğa geldiğinde özel bir yer talep etmek yerine boş bulduğu yere oturması, kişisel itibarı fiziksel ayrıcalıklarla göstermeye ihtiyaç duymadığını ortaya koyar.",
    practice: "Hayata taşı: Bir ortamda görünür olmak yerine faydalı olmaya odaklan.",
    title: "MECLİSTE BOŞ BULDUĞU YERE OTURMASI — Makam gösterisine ihtiyaç duymamak",
    body: "Bir topluluğa geldiğinde özel bir yer talep etmek yerine boş bulduğu yere oturması, kişisel itibarı fiziksel ayrıcalıklarla göstermeye ihtiyaç duymadığını ortaya koyar.\n\nHayata taşı: Bir ortamda görünür olmak yerine faydalı olmaya odaklan.",
  },
  {
    weekNumber: 47,
    header: "İNSANLARI DİNLEMESİ — Dikkat bir saygı biçimidir",
    story:
      "Kendisine soru veya dertle gelen insanlara yönelmesi, iletişiminde dikkatin önemini gösterir. Birini dinlemek, ona “Senin söylediğin benim için önemli.” demenin davranış biçimidir.",
    practice:
      "Hayata taşı: Biri sana önemli bir şey anlatırken ekranı bırak ve göz temasına dikkat et.",
    title: "İNSANLARI DİNLEMESİ — Dikkat bir saygı biçimidir",
    body: "Kendisine soru veya dertle gelen insanlara yönelmesi, iletişiminde dikkatin önemini gösterir. Birini dinlemek, ona “Senin söylediğin benim için önemli.” demenin davranış biçimidir.\n\nHayata taşı: Biri sana önemli bir şey anlatırken ekranı bırak ve göz temasına dikkat et.",
  },
  {
    weekNumber: 48,
    header: "KIRICI DİLDEN UZAK DURMASI — Doğru söz de güzel söylenebilir",
    story:
      "Efendimizin düzeltme biçiminde hakaret ve aşağılamanın belirleyici olmaması dikkat çeker. Haklı olmak, kırıcı olmayı zorunlu kılmaz.",
    practice: "Hayata taşı: Bir eleştirini kişiliğe saldırmadan tek cümleyle ifade etmeyi dene.",
    title: "KIRICI DİLDEN UZAK DURMASI — Doğru söz de güzel söylenebilir",
    body: "Efendimizin düzeltme biçiminde hakaret ve aşağılamanın belirleyici olmaması dikkat çeker. Haklı olmak, kırıcı olmayı zorunlu kılmaz.\n\nHayata taşı: Bir eleştirini kişiliğe saldırmadan tek cümleyle ifade etmeyi dene.",
  },
  {
    weekNumber: 49,
    header: "KENDİ ŞAHSI İÇİN İNTİKAM PEŞİNDE OLMAMASI — Ego ile hakkı ayırmak",
    story:
      "Kendisine yönelik pek çok kırıcı davranış karşısında şahsî öfkesini adaletin yerine koymadı. Kendi gururunun incinmesiyle gerçekten yanlış olan şeyi ayırabilmek güçlü bir ahlâkî olgunluktur.",
    practice:
      "Hayata taşı: Bir tartışmada “Hakkım mı çiğnendi, yoksa yalnız gururum mu incindi?” diye sor.",
    title: "KENDİ ŞAHSI İÇİN İNTİKAM PEŞİNDE OLMAMASI — Ego ile hakkı ayırmak",
    body: "Kendisine yönelik pek çok kırıcı davranış karşısında şahsî öfkesini adaletin yerine koymadı. Kendi gururunun incinmesiyle gerçekten yanlış olan şeyi ayırabilmek güçlü bir ahlâkî olgunluktur.\n\nHayata taşı: Bir tartışmada “Hakkım mı çiğnendi, yoksa yalnız gururum mu incindi?” diye sor.",
  },
  {
    weekNumber: 50,
    header: "VERDİĞİ SÖZE SADAKATİ — Güven küçük davranışlarla kurulur",
    story:
      "Efendimizin insanlar arasında güvenilir olarak tanınması yalnız büyük olaylardan değil, söz ve emanet konusundaki tutarlılığından besleniyordu. Güven bir anda değil tekrar eden davranışlarla oluşur.",
    practice:
      "Hayata taşı: Bu hafta verdiğin bir sözü özellikle takip edip zamanında yerine getir.",
    title: "VERDİĞİ SÖZE SADAKATİ — Güven küçük davranışlarla kurulur",
    body: "Efendimizin insanlar arasında güvenilir olarak tanınması yalnız büyük olaylardan değil, söz ve emanet konusundaki tutarlılığından besleniyordu. Güven bir anda değil tekrar eden davranışlarla oluşur.\n\nHayata taşı: Bu hafta verdiğin bir sözü özellikle takip edip zamanında yerine getir.",
  },
  {
    weekNumber: 51,
    header: "EMANETİ KORUMASI — Bize bırakılan şey bizim değildir",
    story:
      "Kendisine emanet edilen şeylere gösterdiği hassasiyet, güvenilirliğinin temel parçalarındandı. Emanet yalnız eşya değil; sır, görev ve sorumluluk da olabilir.",
    practice: "Hayata taşı: Sana emanet edilmiş bir eşya, sır veya görevi belirle ve hakkını koru.",
    title: "EMANETİ KORUMASI — Bize bırakılan şey bizim değildir",
    body: "Kendisine emanet edilen şeylere gösterdiği hassasiyet, güvenilirliğinin temel parçalarındandı. Emanet yalnız eşya değil; sır, görev ve sorumluluk da olabilir.\n\nHayata taşı: Sana emanet edilmiş bir eşya, sır veya görevi belirle ve hakkını koru.",
  },
  {
    weekNumber: 52,
    header: "KÖTÜLÜĞE İYİLİKLE KARŞILIK VEREBİLMESİ — Döngüyü biri kırmalıdır",
    story:
      "Efendimizin hayatındaki birçok karşılaşmada kaba davranışın aynı sertlikle büyütülmediğini görürüz. Birinin kötü tavrı, ikinci kişinin de kötü davranmasını zorunlu kılmaz.",
    practice:
      "Hayata taşı: Seni kızdıran bir kişiye bugün bilinçli olarak normal ve saygılı davran.",
    title: "KÖTÜLÜĞE İYİLİKLE KARŞILIK VEREBİLMESİ — Döngüyü biri kırmalıdır",
    body: "Efendimizin hayatındaki birçok karşılaşmada kaba davranışın aynı sertlikle büyütülmediğini görürüz. Birinin kötü tavrı, ikinci kişinin de kötü davranmasını zorunlu kılmaz.\n\nHayata taşı: Seni kızdıran bir kişiye bugün bilinçli olarak normal ve saygılı davran.",
  },
  {
    weekNumber: 53,
    header: "İYİLİĞİ FARK EDİP TEŞEKKÜR ETMESİ — Takdir insanı güçlendirir",
    story:
      "Zâhir'in küçük hediyesinden sahabilerin fedakârlıklarına kadar insanların yaptığı iyilikleri fark etmesi, ilişkilerindeki vefayı gösterir. İyiliği görmek onu çoğaltır.",
    practice: "Hayata taşı: Genellikle yaptığı iyilik fark edilmeyen bir kişiye teşekkür et.",
    title: "İYİLİĞİ FARK EDİP TEŞEKKÜR ETMESİ — Takdir insanı güçlendirir",
    body: "Zâhir'in küçük hediyesinden sahabilerin fedakârlıklarına kadar insanların yaptığı iyilikleri fark etmesi, ilişkilerindeki vefayı gösterir. İyiliği görmek onu çoğaltır.\n\nHayata taşı: Genellikle yaptığı iyilik fark edilmeyen bir kişiye teşekkür et.",
  },
  {
    weekNumber: 54,
    header: "HERKESLE AYNI İNSANÎ ZEMİNDE BULUŞMASI — Rol modelin günlük yüzü",
    story:
      "Efendimizin örnekliği yalnız büyük tarihî dönüm noktalarında görülmez. Pazarda Zâhir'le şakalaşırken, ağlayan çocuğun annesini düşünürken, bir hayvanın yorgunluğunu fark ederken veya evinde ailesine yardım ederken de aynı ahlâk vardır. Büyük karakter, gündelik küçük davranışların toplamında görünür.",
    practice: "Hayata taşı: Kimsenin seni değerlendirmediği bir anda da güzel davranmayı seç.",
    title: "HERKESLE AYNI İNSANÎ ZEMİNDE BULUŞMASI — Rol modelin günlük yüzü",
    body: "Efendimizin örnekliği yalnız büyük tarihî dönüm noktalarında görülmez. Pazarda Zâhir'le şakalaşırken, ağlayan çocuğun annesini düşünürken, bir hayvanın yorgunluğunu fark ederken veya evinde ailesine yardım ederken de aynı ahlâk vardır. Büyük karakter, gündelik küçük davranışların toplamında görünür.\n\nHayata taşı: Kimsenin seni değerlendirmediği bir anda da güzel davranmayı seç.",
  },
  {
    weekNumber: 55,
    header: "“BENİM YERİMDE OLSAYDI NASIL DAVRANIRDI?” — Bilgiden örnekliğe",
    story:
      "Bu programın hedefi 55 tarih bilgisi ezberlemek değildir. Efendimizi farklı insanlarla ve farklı şartlarda görerek onun davranış biçimini tanımaktır: güçlü olduğunda affeden, kızdığında ölçüyü koruyan, çocuğu ciddiye alan, yabancıyı dışlamayan, çalışırken yükü paylaşan, karar verirken dinleyen bir Peygamber. Onu tanımanın davranışa dönüşmesi için her yeni durumda şu soru anlamlıdır: “Efendimiz benim yerimde olsaydı nasıl bir ahlâk gösterirdi?”",
    practice:
      "Hayata taşı: Bu 55 olaydan seni en çok etkileyen bir davranışı seç ve bir hafta bilinçli biçimde uygula.",
    title: "“BENİM YERİMDE OLSAYDI NASIL DAVRANIRDI?” — Bilgiden örnekliğe",
    body: "Bu programın hedefi 55 tarih bilgisi ezberlemek değildir. Efendimizi farklı insanlarla ve farklı şartlarda görerek onun davranış biçimini tanımaktır: güçlü olduğunda affeden, kızdığında ölçüyü koruyan, çocuğu ciddiye alan, yabancıyı dışlamayan, çalışırken yükü paylaşan, karar verirken dinleyen bir Peygamber. Onu tanımanın davranışa dönüşmesi için her yeni durumda şu soru anlamlıdır: “Efendimiz benim yerimde olsaydı nasıl bir ahlâk gösterirdi?”\n\nHayata taşı: Bu 55 olaydan seni en çok etkileyen bir davranışı seç ve bir hafta bilinçli biçimde uygula.",
  },
] as const;

/**
 * Belirtilen sınıf (1-6) için 55 haftalık Efendimiz müfredat girişlerini üretir.
 * - 1, 2, 3. sınıflar: Ortaokul müfredatı
 * - 4, 5, 6. sınıflar: Lise müfredatı
 * - Hafta 1-16: Eylül - Aralık 2026 (4 ay x 4 hafta)
 * - Hafta 17-48: Ocak - Ağustos 2027 (8 ay x 4 hafta)
 * - Hafta 49-55: Ekstra 1-7 (48 haftalık standart müfredat kuralı sonrası ilave kartlar)
 */
export function getEfendimizEntriesForGrade(grade: number): CurriculumEntry[] {
  const items = grade <= 3 ? ortaokulEfendimizCurriculum : liseEfendimizCurriculum;

  return items.map((item) => {
    if (item.weekNumber <= 48) {
      const monthIndex = Math.floor((item.weekNumber - 1) / 4); // 0..11
      const month = monthIndex < 4 ? 9 + monthIndex : monthIndex - 3;
      const year = monthIndex < 4 ? 2026 : 2027;
      const weekInMonth = ((item.weekNumber - 1) % 4) + 1;
      const id = makeEfendimizEntryId(month, weekInMonth, grade, false);

      return {
        id,
        grade,
        categoryId: "efendimiz",
        month,
        week: weekInMonth,
        year,
        isExtra: false,
        title: item.title,
        body: item.body,
      };
    }

    const extraOrder = item.weekNumber - 48; // 1..7
    const id = makeEfendimizEntryId(8, 4, grade, true, extraOrder);

    return {
      id,
      grade,
      categoryId: "efendimiz",
      month: 8,
      week: 4,
      year: 2027,
      isExtra: true,
      extraOrder,
      title: item.title,
      body: item.body,
    };
  });
}

/**
 * 6 Belçika sınıfı için tüm Efendimiz kayıtlarını döner (toplam 330 kayıt).
 */
export function getAllEfendimizEntries(): CurriculumEntry[] {
  const all: CurriculumEntry[] = [];
  for (let grade = 1; grade <= 6; grade++) {
    all.push(...getEfendimizEntriesForGrade(grade));
  }
  return all;
}

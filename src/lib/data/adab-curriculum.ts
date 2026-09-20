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
}

/**
 * Ortaokul (1., 2. ve 3. Sınıflar) için 54 haftalık Adab-ı Muaşeret müfredatı
 * Kaynak: mufredat-docs/02_ORTAOKUL_ADAB-I_MUASERET_SADE.docx
 */
export const ortaokulAdabCurriculum: readonly AdabCurriculumItem[] = [
  {
    weekNumber: 1,
    unit: "Sohbet Âdâbı",
    topic: "Sohbete Yer ve Gönül Hazırlığı",
    title: "Sohbet Âdâbı — Sohbete Yer ve Gönül Hazırlığı",
    body: "• Sohbet yerini düzenlemek; konuşmacı için sehpa ve su hazırlamak.\n• Sohbetten önce zihnen ve manen hazırlanmak.\n• Esneme, hapşırma veya zorunlu konuşmayı edep içinde yapmak; sohbetin havasını bozmamak.\n• Düzgün ve saygılı oturmak.",
  },
  {
    weekNumber: 2,
    unit: "Sohbet Âdâbı",
    topic: "Sohbeti Dinlemek ve İzinle Ayrılmak",
    title: "Sohbet Âdâbı — Sohbeti Dinlemek ve İzinle Ayrılmak",
    body: "• Sorumu sohbet bitiminde ve gerçekten ihtiyaç varsa sormak.\n• Konuşmacı kalkmadan kalkmamak veya ortalıkta dolaşmamak.\n• Ayrılmam gerekiyorsa müsaade istemek.\n• Güvendiğim, bilgili kişilerle yararlı sohbet ortamlarına katılmak.",
  },
  {
    weekNumber: 3,
    unit: "İlim Öğrenme ve Öğretme Âdâbı",
    topic: "İlim Avcısı Olmak",
    title: "İlim Öğrenme ve Öğretme Âdâbı — İlim Avcısı Olmak",
    body: "• Merak ettiğim bir konuda güvenilir bilgi aramak.\n• Her gün kısa da olsa düzenli okumak.\n• Öğrendiğim bir bilgiyi davranışa dönüştürmek.\n• Doğru bilgiyi uygun biçimde bir başkasıyla paylaşmak.",
  },
  {
    weekNumber: 4,
    unit: "İlim Öğrenme ve Öğretme Âdâbı",
    topic: "Öğrenmeye Kendi İsteğimle Başlamak",
    title: "İlim Öğrenme ve Öğretme Âdâbı — Öğrenmeye Kendi İsteğimle Başlamak",
    body: "• Öğrenmeyi yalnızca ailemin zorlaması olarak görmemek; kendime bir amaç bulmak.\n• İlk başarısızlıkta vazgeçmemek.\n• Derse hazırlıklı ve istekli girmek.\n• Öğretmeni can kulağıyla dinlemek.",
  },
  {
    weekNumber: 5,
    unit: "İlim Öğrenme ve Öğretme Âdâbı",
    topic: "Sormak, Danışmak ve Çalışma Ortamı Kurmak",
    title: "İlim Öğrenme ve Öğretme Âdâbı — Sormak, Danışmak ve Çalışma Ortamı Kurmak",
    body: "• Anlamadığım konuyu yeniden sormak.\n• Başarılı bir öğrenciye yöntemini danışmak.\n• Düzenli ve gerçekçi bir çalışma programı hazırlamak.\n• Dikkatimi destekleyen rahat bir çalışma yeri seçmek.",
  },
  {
    weekNumber: 6,
    unit: "İlim Öğrenme ve Öğretme Âdâbı",
    topic: "Gayret, Kavrama ve Uygulama",
    title: "İlim Öğrenme ve Öğretme Âdâbı — Gayret, Kavrama ve Uygulama",
    body: "• Sonuca değil, elimden gelen düzenli gayrete odaklanmak.\n• Bir konuyu anlamadan sırf bitirmiş olmak için diğerine geçmemek.\n• Öğrendiğim uygulanabilir bir bilgiyi aynı hafta kullanmak.",
  },
  {
    weekNumber: 7,
    unit: "İlim Öğrenme ve Öğretme Âdâbı",
    topic: "Öğrenme Çevresi ve Öğretmene Saygı",
    title: "İlim Öğrenme ve Öğretme Âdâbı — Öğrenme Çevresi ve Öğretmene Saygı",
    body: "• Beni öğrenmekten soğutan kişi, içerik veya alışkanlıkların etkisini azaltmak.\n• Öğrenmeyi destekleyen arkadaş ve ortamları çoğaltmak.\n• Öğreten kişiye saygılı ve mütevazı davranmak.",
  },
  {
    weekNumber: 8,
    unit: "İlim Öğrenme ve Öğretme Âdâbı",
    topic: "Akranıma Öğretirken Hazırlık ve Örneklik",
    title: "İlim Öğrenme ve Öğretme Âdâbı — Akranıma Öğretirken Hazırlık ve Örneklik",
    body: "• Anlatacağım konuyu iyi öğrenmek, güncel/doğru bilgiyi kontrol etmek ve hazırlıksız anlatmamak.\n• Konuyu karşımdakinin seviyesine indirerek anlatmak; zor gösterip cesaretini kırmamak.\n• Sözüm, yaşayışım ve davranışımla örnek olmak; saygıyı baskıyla istemek yerine davranışımla kazanmak.",
  },
  {
    weekNumber: 9,
    unit: "İlim Öğrenme ve Öğretme Âdâbı",
    topic: "Öğretirken Sevgi, Şefkat ve Onur",
    title: "İlim Öğrenme ve Öğretme Âdâbı — Öğretirken Sevgi, Şefkat ve Onur",
    body: "• Bildiğimi en iyi ve anlaşılır biçimde aktarmaya gayret etmek.\n• Başarılı olanı aşırı yüceltmemek, zorlananı küçümsememek.\n• Arkadaşımın kusurunu topluluk önünde sayıp utandırmamak; affedici ve hoşgörülü olmak.",
  },
  {
    weekNumber: 10,
    unit: "İlim Öğrenme ve Öğretme Âdâbı",
    topic: "Öğretirken Dinlemek, Adil Olmak ve Çıkar Gözetmemek",
    title: "İlim Öğrenme ve Öğretme Âdâbı — Öğretirken Dinlemek, Adil Olmak ve Çıkar Gözetmemek",
    body: "• Yardım ettiğim kişinin problemini dinlemek ve duygusuna ortak olmak; sağlıklı sınırı korumak.\n• Değerlendirme yetkim varsa bunu tehdit olarak kullanmamak ve adil davranmak.\n• Pahalı hediye, ziyafet veya ayrıcalık beklentisiyle öğretmemek; haysiyet ve tarafsızlığı korumak.",
  },
  {
    weekNumber: 11,
    unit: "İlim Öğrenme ve Öğretme Âdâbı",
    topic: "Okuma Parçası: İlim Yolu ve Topluma Fayda",
    title: "İlim Öğrenme ve Öğretme Âdâbı — Okuma Parçası: İlim Yolu ve Topluma Fayda",
    body: "• Öğrenmek için emek ve yol zahmetini göze almak.\n• Bilgimi yalnız kendim için değil çevreme yarar sağlamak için kullanmak.\n• Doğru bilgiyi güvenilir biçimde sonraki kişilere aktarmak.",
  },
  {
    weekNumber: 12,
    unit: "Edep, Güzel Ahlâk ve Hilim",
    topic: "Edep Nedir?",
    title: "Edep, Güzel Ahlâk ve Hilim — Edep Nedir?",
    body: "• İnsanlarla konuşurken nazik bir kelime seçmek.\n• Ortak alanlarda başkalarının rahatını hesaba katmak.\n• Her gün çevremde gördüğüm bir güzel davranışı fark etmek.",
  },
  {
    weekNumber: 13,
    unit: "Edep, Güzel Ahlâk ve Hilim",
    topic: "Güzel Ahlâkı Önce Kendimde Yaşamak",
    title: "Edep, Güzel Ahlâk ve Hilim — Güzel Ahlâkı Önce Kendimde Yaşamak",
    body: "• Başkasından beklediğim bir güzel davranışı önce kendim yapmak.\n• Bir eşyamı, zamanımı veya emeğimi ihtiyaç olduğunda paylaşmak.\n• Oturuş, kalkış, yürüyüş, tebessüm ve hitabımda nezaketi gözetmek.",
  },
  {
    weekNumber: 14,
    unit: "Edep, Güzel Ahlâk ve Hilim",
    topic: "Hilim: Öfkemi Yönetiyorum",
    title: "Edep, Güzel Ahlâk ve Hilim — Hilim: Öfkemi Yönetiyorum",
    body: "• Öfkelendiğimde hemen cevap vermeden kısa bir ara vermek.\n• Ses tonumu yükseltmemek.\n• Küçük bir kusuru büyütmemek ve mümkünse affetmek.\n• Tartışmada uzlaştırıcı bir cümle kurmak.",
  },
  {
    weekNumber: 15,
    unit: "Edep, Güzel Ahlâk ve Hilim",
    topic: "Tahrik Karşısında Görevime Devam Ediyorum",
    title: "Edep, Güzel Ahlâk ve Hilim — Tahrik Karşısında Görevime Devam Ediyorum",
    body: "• Beni kızdıran sözlere benzer bir kötülükle karşılık vermemek.\n• Gereksiz tartışma yerine asıl görevime dönmek.\n• Gerilim yükseldiğinde ortamı sakinleştiren bir cümle kurmak.",
  },
  {
    weekNumber: 16,
    unit: "Edep, Güzel Ahlâk ve Hilim",
    topic: "Hak, Borç ve Nezaket",
    title: "Edep, Güzel Ahlâk ve Hilim — Hak, Borç ve Nezaket",
    body: "• Ödünç aldığım şeyi kararlaştırılan zamanda geri vermek.\n• Bir hakkımı isterken hakaret etmeden açık konuşmak.\n• İki tarafı da daha nazik ve adil davranmaya çağırmak.\n• Hata veya gecikme olduysa telafi etmek.",
  },
  {
    weekNumber: 17,
    unit: "Edep, Güzel Ahlâk ve Hilim",
    topic: "Kabalığa Karşı Sınır ve İyilik",
    title: "Edep, Güzel Ahlâk ve Hilim — Kabalığa Karşı Sınır ve İyilik",
    body: "• Beni inciten davranışın yanlış olduğunu sakin biçimde söylemek.\n• Gerektiğinde özür istemek veya özür dilemek.\n• Kabalığı yeni bir kabalıkla büyütmemek.\n• İyilik yaparken karşı tarafın kusuruna takılıp kalmamak.",
  },
  {
    weekNumber: 18,
    unit: "Edep, Güzel Ahlâk ve Hilim",
    topic: "Okuma Parçası: Öfke, İyilik ve Emanet",
    title: "Edep, Güzel Ahlâk ve Hilim — Okuma Parçası: Öfke, İyilik ve Emanet",
    body: "• Öfkeyi ilk anda büyütmemek; sabredip sakinleşmesini beklemek.\n• Gösteriş yapmadan bir iyilik yapmak.\n• Bana emanet edilen eşya veya sırrı korumak.",
  },
  {
    weekNumber: 19,
    unit: "Edep, Güzel Ahlâk ve Hilim",
    topic: "Okuma Parçası: Yardım ve Gıybetten Uzak Durma",
    title: "Edep, Güzel Ahlâk ve Hilim — Okuma Parçası: Yardım ve Gıybetten Uzak Durma",
    body: "• İhtiyaç bildiren birine gücüm yettiğince yardımcı olmak.\n• Yardım ederken kendi imkân ve sınırlarımı da gözetmek.\n• Gıybet başlayan konuşmaya katılmamak; konuyu değiştirmek veya ortamdan ayrılmak.",
  },
  {
    weekNumber: 20,
    unit: "Yaşlılara Hürmet",
    topic: "Saygılı Hitap ve Dinleme",
    title: "Yaşlılara Hürmet — Saygılı Hitap ve Dinleme",
    body: "• Yaşlılara saygılı hitap etmek.\n• Yanlarında ses tonumu yükseltmemek.\n• Saygı dışı tavır ve mimiklerden kaçınmak.\n• Bir toplulukta onlara önce söz vermek ve sözlerini kesmeden dinlemek.",
  },
  {
    weekNumber: 21,
    unit: "Yaşlılara Hürmet",
    topic: "Öncelik Vermek ve Hizmet Etmek",
    title: "Yaşlılara Hürmet — Öncelik Vermek ve Hizmet Etmek",
    body: "• Toplu taşımada veya bekleme sırasında ihtiyaç sahibi yaşlıya yer/öncelik vermek.\n• Kapı, eşya taşıma veya yön bulma gibi bir konuda izin isteyerek yardımcı olmak.\n• Herkesin bir gün yaşlanacağını hatırlayarak sabırlı davranmak.",
  },
  {
    weekNumber: 22,
    unit: "Selâm Verme Âdâbı",
    topic: "Girişte ve Ayrılışta Selâm",
    title: "Selâm Verme Âdâbı — Girişte ve Ayrılışta Selâm",
    body: "• Bir topluluğa girince konuşmaya başlamadan selâm vermek.\n• İçinde kimse bulunmayan yere girerken kitapta öğretilen selâm ifadesini kullanmak.\n• Karşılaşırken olduğu gibi ayrılırken de selâm vermek.",
  },
  {
    weekNumber: 23,
    unit: "Selâm Verme Âdâbı",
    topic: "Selâmı Kim Başlatır, Kim Cevaplar?",
    title: "Selâm Verme Âdâbı — Selâmı Kim Başlatır, Kim Cevaplar?",
    body: "• Selâm vermek için karşı tarafın başlamasını beklememek.\n• Kitapta sayılan karşılaşma durumlarında selâmı başlatmak.\n• Bir topluluğa verilen selâmın cevapsız kalmamasını sağlamak.",
  },
  {
    weekNumber: 24,
    unit: "Selâm Verme Âdâbı",
    topic: "Merhaba Demek ve Selâmı Duyurmak",
    title: "Selâm Verme Âdâbı — Merhaba Demek ve Selâmı Duyurmak",
    body: "• Gelen kişiyi “merhaba” gibi sıcak bir ifadeyle karşılamak.\n• Selâma gecikmeden cevap vermek.\n• Cevabımı karşı tarafın duyabileceği sesle söylemek.\n• Selâmı duymazlıktan gelmemek.",
  },
  {
    weekNumber: 25,
    unit: "Selâm Verme Âdâbı",
    topic: "Selâm Verirken Uygun Zamanı Gözetmek",
    title: "Selâm Verme Âdâbı — Selâm Verirken Uygun Zamanı Gözetmek",
    body: "• Temiz olmayan/mahrem bir yerde selâm ifadesini kullanmamak.\n• Yanlış bir davranışı onaylar görünmeden, kişiyi aşağılamayan bir tutum göstermek.\n• Kur’ân okuyan, hadis aktaran veya ilim müzakere eden kişiyi bölmemek; işi bitince selâm vermek.\n• Ezan, namaz veya kâmet hâlindeki kişiden cevap beklememek.",
  },
  {
    weekNumber: 26,
    unit: "Selâm Verme Âdâbı",
    topic: "Cevap Veremeyeni Zorlamamak ve Musâfaha",
    title: "Selâm Verme Âdâbı — Cevap Veremeyeni Zorlamamak ve Musâfaha",
    body: "• Cevap veremeyecek durumda olan kişiyi selâmla karşılık vermeye zorlamamak.\n• Selâm verirken aşağı doğru bükülmemek.\n• Uygun olduğunda, hijyen ve karşılıklı rızayı gözeterek musâfaha etmek.\n• Karşılaştığım kişi için iyi dilekte bulunmak.",
  },
  {
    weekNumber: 27,
    unit: "Hapşırma Âdâbı",
    topic: "Hapşırırken Çevremi Koruyorum",
    title: "Hapşırma Âdâbı — Hapşırırken Çevremi Koruyorum",
    body: "• Hapşırırken ağız ve burnumu mendille veya dirsek içiyle kapatmak.\n• Kitapta öğretilen “Elhamdülillâh - Yerhamükâllah - Yehdînâ ve yehdîkümullah” karşılığını doğru sırayla öğrenmek.\n• Sonrasında ellerimi temizlemek ve çevre hijyenini gözetmek.",
  },
  {
    weekNumber: 28,
    unit: "Yemek Yeme Âdâbı",
    topic: "Yemeğe Temiz ve Bilinçli Başlamak",
    title: "Yemek Yeme Âdâbı — Yemeğe Temiz ve Bilinçli Başlamak",
    body: "• Yemekten önce ve sonra ellerimi yıkamak.\n• Yemeğe besmeleyle başlamak; sağ elle ve önümden yemek.\n• Yemek bitince “Elhamdülillâh” demek.\n• Besmeleyi unuttuğumu yemek sırasında hatırlarsam kitapta verilen “Bismillâhi evvelehû ve âhirahû” ifadesini söylemek.",
  },
  {
    weekNumber: 29,
    unit: "Yemek Yeme Âdâbı",
    topic: "Sofrada Ölçü ve Nezaket",
    title: "Yemek Yeme Âdâbı — Sofrada Ölçü ve Nezaket",
    body: "• Acele etmeden, lokmayı iyice çiğneyerek yemek.\n• Yemeğe yaşça veya mevkice büyük olan kişinin başlamasını beklemek.\n• Yemeği üfleyerek soğutmamak.\n• Ağzım doluyken konuşmamak/gülmemek ve tiksinti uyandıracak davranışlardan kaçınmak.",
  },
  {
    weekNumber: 30,
    unit: "Yemek Yeme Âdâbı",
    topic: "Sofrada Göz Hakkı, Teşekkür ve İsraf",
    title: "Yemek Yeme Âdâbı — Sofrada Göz Hakkı, Teşekkür ve İsraf",
    body: "• Başkasının lokmasına ve ne kadar yediğine bakmamak.\n• Yemeği hazırlayana teşekkür etmek.\n• Sofra kurulurken ve kaldırılırken yardımcı olmak.\n• Tabağıma yiyebileceğim kadar alarak israf etmemek.",
  },
  {
    weekNumber: 31,
    unit: "Yemek Yeme Âdâbı",
    topic: "Yemek Davetinde İzin ve Zamanlama",
    title: "Yemek Yeme Âdâbı — Yemek Davetinde İzin ve Zamanlama",
    body: "• Davet veya izin olmadan bir sofraya katılmamak.\n• Davet edildiğimde makul bir engelim yoksa uygun biçimde cevap vermek.\n• Davetli olmayan birini getirmeden önce ev sahibinden izin istemek.\n• Yemek bittikten sonra ev sahibini zorlamadan, müsaade isteyerek ayrılmak.",
  },
  {
    weekNumber: 32,
    unit: "Temizlik ve Tuvalet Âdâbı",
    topic: "Kişisel Temizlik ve Güzel Görünüm",
    title: "Temizlik ve Tuvalet Âdâbı — Kişisel Temizlik ve Güzel Görünüm",
    body: "• Beden ve kıyafet temizliğime dikkat etmek.\n• Ağız, burun ve diş temizliğini düzenli yapmak.\n• Temizlik sonrası ıslaklığı uygun biçimde kurulamak.\n• Güzel görünmeye çalışırken ağır koku ile başkalarını rahatsız etmemek.",
  },
  {
    weekNumber: 33,
    unit: "Temizlik ve Tuvalet Âdâbı",
    topic: "Çevreyi ve Ortak Alanları Temiz Tutmak",
    title: "Temizlik ve Tuvalet Âdâbı — Çevreyi ve Ortak Alanları Temiz Tutmak",
    body: "• Çöpümü ortak alanda bırakmamak.\n• Yol, dinlenme yeri ve ortak kullanım alanlarını kirletmemek.\n• Kullandığım alanı bulduğumdan daha temiz bırakmak.\n• Yakın ortamda başkalarını rahatsız edebilecek kokuları hesaba katmak.",
  },
  {
    weekNumber: 34,
    unit: "Temizlik ve Tuvalet Âdâbı",
    topic: "Tuvalete Giriş ve Mahremiyet",
    title: "Temizlik ve Tuvalet Âdâbı — Tuvalete Giriş ve Mahremiyet",
    body: "• Kıyafetimin kirlenmesini önleyecek biçimde hazırlanmak.\n• Girmeden önce kitapta verilen duayı öğrenmek.\n• Sol ayakla girip sağ ayakla çıkmayı hatırlamak.\n• İhtiyacımı oturarak ve mahremiyeti koruyarak gidermek.",
  },
  {
    weekNumber: 35,
    unit: "Temizlik ve Tuvalet Âdâbı",
    topic: "Tuvaleti Temiz Bırakmak",
    title: "Temizlik ve Tuvalet Âdâbı — Tuvaleti Temiz Bırakmak",
    body: "• Tuvalette konuşmamak, bir şey yememek ve gereksiz oyalanmamak.\n• Temizliği sol elle; musluk, kapı ve maşrapa gibi araçları sağ elle kullanmak.\n• Çıkmadan önce kişisel temizliği ve tuvaletin temiz bırakıldığını kontrol etmek; ellerimi yıkamak.\n• Acele etmeden yeterli süre beklemek (istibrâ).",
  },
  {
    weekNumber: 36,
    unit: "Toplantı Âdâbı",
    topic: "Zaman, Ortam ve Hazırlık",
    title: "Toplantı Âdâbı — Zaman, Ortam ve Hazırlık",
    body: "• Toplantının yerini ve saatini önceden bilip zamanında gitmek.\n• Ev sahibi/düzenleyici rolündeysem temizlik, ses, ışık ve sıcaklığı ayarlamak.\n• Başlangıç gecikirse okuma/dinleme gibi yararlı bir işle beklemek.\n• Görevimi tamamlayıp kalem, kâğıt ve gerekli malzemelerle hazırlıklı gelmek.",
  },
  {
    weekNumber: 37,
    unit: "Toplantı Âdâbı",
    topic: "Fikir, Görünüm ve İzin",
    title: "Toplantı Âdâbı — Fikir, Görünüm ve İzin",
    body: "• Fikrimi saygılı ve anlaşılır biçimde söylemek; kabul edilmezse diretmemek.\n• Dikkati dağıtmayacak, temiz ve ortama uygun kıyafetle katılmak; güler yüzlü olmak.\n• Yaşça ve bilgice ileride olanlara hürmet göstermek.\n• Zorunlu olmadıkça çıkmamak; çıkmam gerekirse izin istemek ve işleri önceden ayarlamak.",
  },
  {
    weekNumber: 38,
    unit: "Toplantı Âdâbı",
    topic: "Mahremiyet, Telefon, İkram ve Mazeret",
    title: "Toplantı Âdâbı — Mahremiyet, Telefon, İkram ve Mazeret",
    body: "• Kalabalık içinde üçüncü kişiyi dışlayan gizli konuşma yapmamak.\n• Telefonu dışarıda bırakmak, kapatmak veya sessize almak.\n• İkramı toplantının akışını bozmayacak sadelikte hazırlamak/sunmak.\n• Önemli bir sebeple katılamazsam önceden izin istemek ve haber vermek.",
  },
  {
    weekNumber: 39,
    unit: "Toplantı Âdâbı",
    topic: "Söz Düzeni, Kusuru Düzeltme ve Karara Sadakat",
    title: "Toplantı Âdâbı — Söz Düzeni, Kusuru Düzeltme ve Karara Sadakat",
    body: "• Temiz, bakımlı ve ortama uygun görünümle toplantıya katılmak (kaynakta çorap ve sakal/bıyık düzeni ayrıca belirtilir).\n• Söz verildiğinde veya fikrim sorulduğunda konuşmak; herkesin aynı anda konuşmasına katılmamak.\n• Bir kusuru topluluk içinde kişiyi mahcup etmeden genel ve yapıcı biçimde ifade etmek.\n• Anlamadığım veya uygun bulmadığım kararı toplantıda sormak; sonradan çekiştirmemek.",
  },
  {
    weekNumber: 40,
    unit: "İnsanlarla Konuşma ve Nasihat Âdâbı",
    topic: "Konuşmaya Saygıyla Başlamak",
    title: "İnsanlarla Konuşma ve Nasihat Âdâbı — Konuşmaya Saygıyla Başlamak",
    body: "• Söze selâmla başlayıp hâl-hatır sormak.\n• Muhataba uygun “bey, hanım, abi, abla, hoca” gibi saygı ifadeleri kullanmak.\n• Büyüklere “siz” diye hitap etmek; aşırı samimi/senli-benli konuşmamak.\n• Sıcak, saygılı bir ses tonu kullanmak ve gönül kırmamak.",
  },
  {
    weekNumber: 41,
    unit: "İnsanlarla Konuşma ve Nasihat Âdâbı",
    topic: "Ölçülü ve Yerinde Konuşmak",
    title: "İnsanlarla Konuşma ve Nasihat Âdâbı — Ölçülü ve Yerinde Konuşmak",
    body: "• Beni çağıran kişiye “buyurun/efendim” gibi edepli bir ifadeyle cevap vermek.\n• Çok yüksek veya duyulmayacak kadar kısık konuşmamak.\n• Birini bulunduğu ortamda överken ya da eleştirirken aşırıya kaçmamak.\n• Söyleyeceğim söz yararlı değilse susabilmek.",
  },
  {
    weekNumber: 42,
    unit: "İnsanlarla Konuşma ve Nasihat Âdâbı",
    topic: "Temiz Söz, Doğru Cevap ve İçtenlik",
    title: "İnsanlarla Konuşma ve Nasihat Âdâbı — Temiz Söz, Doğru Cevap ve İçtenlik",
    body: "• Gıybet, laf taşıma ve ahlâk dışı/kaba ifadelerden uzak durmak.\n• Bildiğim soruya kısa ve net; bilmediğime dürüstçe “bilmiyorum” diye cevap vermek.\n• Başkasına söz hakkı verip dinlemeyi öğrenmek.\n• Nasihat ederken samimi olmak ve önce anlattığım değere kendim sarılmak.",
  },
  {
    weekNumber: 43,
    unit: "Ziyaret ve Misafir Ağırlama Âdâbı",
    topic: "Sıla-i Rahim: Bağları Canlı Tutmak",
    title: "Ziyaret ve Misafir Ağırlama Âdâbı — Sıla-i Rahim: Bağları Canlı Tutmak",
    body: "• Akrabama güler yüz, tatlı söz, selâm ve hâl-hatırla yakınlık göstermek; hakkında iyi düşünmek ve hayır dilemek.\n• Akraba ve özellikle yaşlıları ziyaret etmek/yoklamak, yapılacak işlerine bedenî yardımla destek olmak.\n• İmkân ve aile rehberliği içinde ihtiyaç sahibi akrabaya maddi destek vermek veya destek organizasyonuna katılmak.\n• Bayramlarla sınırlı kalmadan yakınlarla irtibatı sürdürmek; acı ve tatlı günlerde yalnız bırakmamak.",
  },
  {
    weekNumber: 44,
    unit: "Ziyaret ve Misafir Ağırlama Âdâbı",
    topic: "Ev Sahibi: Karşılama ve Ortam Hazırlığı",
    title: "Ziyaret ve Misafir Ağırlama Âdâbı — Ev Sahibi: Karşılama ve Ortam Hazırlığı",
    body: "• Misafiri kapıda bizzat karşılamak ve giderken uğurlamak.\n• Güler yüzlü, temiz ve bakımlı görünmek.\n• Pijama/şort/atlet gibi ev hâli yerine misafire uygun düzgün kıyafet seçmek (kaynakta şalvar da örneklenir).\n• Misafir odası, yemek alanı, tuvalet ve banyo gibi yerlerin temizlik, düzen, ses, ışık, sıcaklık ve kokusunu kontrol etmek.",
  },
  {
    weekNumber: 45,
    unit: "Ziyaret ve Misafir Ağırlama Âdâbı",
    topic: "Ev Sahibi: Hoş Geldiniz, İkram ve İhtiyaç",
    title: "Ziyaret ve Misafir Ağırlama Âdâbı — Ev Sahibi: Hoş Geldiniz, İkram ve İhtiyaç",
    body: "• “Hoş geldiniz” diyerek memnuniyetimi belirtmek.\n• Misafiri yalnız bırakmamak; aynı zamanda bunaltmamak.\n• İkramı uygun bir sehpa/zeminde özenle sunmak ve sıcak bir ortam oluşturmak.\n• İhtiyacı olup olmadığını sormak ve yapabildiğim ihtiyacı karşılamak.",
  },
  {
    weekNumber: 46,
    unit: "Ziyaret ve Misafir Ağırlama Âdâbı",
    topic: "Ev Sahibi: Misafirin Yanında Davranış",
    title: "Ziyaret ve Misafir Ağırlama Âdâbı — Ev Sahibi: Misafirin Yanında Davranış",
    body: "• Misafirin yanında kimseyi azarlamamak veya çekiştirmemek.\n• Ceket/palto gibi dış giysisini izinle alıp uygun yere asmak.\n• Uygunsa temiz terlik sunmak.\n• Misafiri dağınık olmayan, rahat hareket edebileceği uygun bir yere almak.",
  },
  {
    weekNumber: 47,
    unit: "Ziyaret ve Misafir Ağırlama Âdâbı",
    topic: "Ev Sahibi: Sohbette Yerini Bilmek",
    title: "Ziyaret ve Misafir Ağırlama Âdâbı — Ev Sahibi: Sohbette Yerini Bilmek",
    body: "• Misafir bir büyüğüme geldiyse, gerekiyorsa yanında bulunmak; özel görüşme ihtimalinde mahremiyet sağlamak.\n• Sohbete katılmam uygunsa ev sahibinden fazla konuşmamak ve gereksiz yere lafa karışmamak.\n• Zor bir anım olsa bile misafire istenmediği hissini vermemek.\n• Misafiri tek başına bırakmak yerine onunla ilgilenecek birini ayarlamak.",
  },
  {
    weekNumber: 48,
    unit: "Ziyaret ve Misafir Ağırlama Âdâbı",
    topic: "Ev Sahibi: Sofra, Zaman ve Kapsayıcılık",
    title: "Ziyaret ve Misafir Ağırlama Âdâbı — Ev Sahibi: Sofra, Zaman ve Kapsayıcılık",
    body: "• Uzaktan gelen misafire sormadan uygun bir sofra hazırlamak ve yalnızsa ona eşlik etmek.\n• Birlikteyken sık sık saate bakmamak.\n• Misafirin yanında gizli konuşmamak ve ona yönelikmiş izlenimi verecek biçimde gülüşmemek.\n• Kapıdan bakıp kaçmamak; odaya girdiysem hâl-hatır sormak, vaktim kısıtlıysa özür ve izinle ayrılmak.",
  },
  {
    weekNumber: 49,
    unit: "Ziyaret ve Misafir Ağırlama Âdâbı",
    topic: "Ev Sahibi: Güzel Uğurlama ve Gece Misafiri",
    title: "Ziyaret ve Misafir Ağırlama Âdâbı — Ev Sahibi: Güzel Uğurlama ve Gece Misafiri",
    body: "• Misafirin dış giysisini tutmak ve geldiğinden memnun olduğumu söylemek.\n• Gidene kadar kapıda beklemek; çıkar çıkmaz kapıyı yüzüne kapanır gibi kapatmamak.\n• Gece kalacak misafir için temiz yatak, nevresim/çarşaf, havlu ve gerekiyorsa gece kıyafeti hazırlamak.",
  },
  {
    weekNumber: 50,
    unit: "Ziyaret ve Misafir Ağırlama Âdâbı",
    topic: "Misafir: Kapıda İzin ve Doğru Zaman",
    title: "Ziyaret ve Misafir Ağırlama Âdâbı — Misafir: Kapıda İzin ve Doğru Zaman",
    body: "• Kapı açılınca evin içini görecek biçimde durmamak.\n• Kapıyı/telefonu üç kez denedikten sonra cevap yoksa ısrar etmemek.\n• Eve girerken ve çıkarken; kaynakta belirtildiği üzere boş eve girerken de selâm vermek.\n• Davete ne erken ne geç, kararlaştırılan zamanda gitmek.",
  },
  {
    weekNumber: 51,
    unit: "Ziyaret ve Misafir Ağırlama Âdâbı",
    topic: "Misafir: Hazırlık, Hediye ve Gösterilen Yere Oturmak",
    title:
      "Ziyaret ve Misafir Ağırlama Âdâbı — Misafir: Hazırlık, Hediye ve Gösterilen Yere Oturmak",
    body: "• Temiz ve düzgün kıyafetle gitmek.\n• Mümkünse külfetsiz bir hediye götürmek.\n• Kapıyı çalıp ev sahibi izin verdikten sonra içeri girmek.\n• Sağa sola bakmamak; ev sahibinin gösterdiği yere oturmak; başka misafire izinsiz ikram yapmamak ve lavabo/tuvalet için izin istemek.",
  },
  {
    weekNumber: 52,
    unit: "Ziyaret ve Misafir Ağırlama Âdâbı",
    topic: "Misafir: İkramı Beğenmek ve Muhatabı Gözetmek",
    title: "Ziyaret ve Misafir Ağırlama Âdâbı — Misafir: İkramı Beğenmek ve Muhatabı Gözetmek",
    body: "• Gelen yemekte kusur bulmamak ve kusur görsem de söylememek.\n• Özel bir yemek istememek; seçenek sunulursa en zahmetsiz olanı seçmek.\n• Yaşlı/hasta kişileri daha sık ama kısa süreli ziyaret etmek; konuşma biçimini durumlarına göre ayarlamak.\n• Dinî veya siyasî görüş farklılığında ev sahibini ve oradakileri üzecek sözlerden kaçınmak.",
  },
  {
    weekNumber: 53,
    unit: "Ziyaret ve Misafir Ağırlama Âdâbı",
    topic: "Misafir: Memnuniyetle ve Haber Vererek Ayrılmak",
    title: "Ziyaret ve Misafir Ağırlama Âdâbı — Misafir: Memnuniyetle ve Haber Vererek Ayrılmak",
    body: "• Gönül hoşluğuyla ve memnuniyetimi ifade ederek ayrılmak.\n• Ev sahibinden izinsiz/habersiz evi terk etmemek.\n• Ev sahibinin işi varsa ziyareti uzatmadan müsaade istemek.\n• Ziyarete gidemeyeceksem önceden haber verip izin/özür bildirmek.",
  },
  {
    weekNumber: 54,
    unit: "Ziyaret ve Misafir Ağırlama Âdâbı",
    topic: "Okuma Parçası: Ziyareti Hayatın Parçası Yapmak",
    title: "Ziyaret ve Misafir Ağırlama Âdâbı — Okuma Parçası: Ziyareti Hayatın Parçası Yapmak",
    body: "• Bir süredir görmediğim yakınımın hâl-hatırını sormak.\n• Ziyarette ev sahibi için iyi dilekte/duada bulunmak.\n• İhtiyaca göre bireysel veya toplu ziyaret biçimini seçmek.\n• Mesafe ya da yoğunluk olsa da bağı tamamen koparmamak.",
  },
] as const;

/**
 * Lise (4., 5. ve 6. Sınıflar) için 54 haftalık Adab-ı Muaşeret müfredatı
 * Kaynak: mufredat-docs/01_LISE_ADAB-I_MUASERET_SADE.docx
 */
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
export function getAdabEntriesForGrade(grade: number): CurriculumEntry[] {
  const items = grade <= 3 ? ortaokulAdabCurriculum : liseAdabCurriculum;

  return items.map((item) => {
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
    };
  });
}

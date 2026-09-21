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

function makeEsmaEntryId(
  month: number,
  week: number,
  grade: number = 1,
  isExtra: boolean = false,
  extraOrder?: number
): string {
  const prefix = grade === 1 ? "" : `g${grade}-`;
  if (isExtra) {
    return `${prefix}esma-extra-${extraOrder ?? 1}`;
  }
  const monthSlug = monthSlugs[month] ?? `m${month}`;
  return `${prefix}esma-${monthSlug}-${week}`;
}

export interface EsmaCurriculumItem {
  weekNumber: number;
  name: string;
  meaning: string;
  title: string;
  body: string;
}

/**
 * Ortaokul (1., 2. ve 3. Sınıflar) için 55 haftalık Esmâü'l-Hüsnâ müfredatı
 * Kaynak: mufredat-docs/esma/01_ESMAUL_HUSNA_55_GUN_ORTAOKUL_PROGRAMI.docx
 */
export const ortaokulEsmaCurriculum: readonly EsmaCurriculumItem[] = [
  {
    weekNumber: 1,
    name: "EL-CEMÎL",
    meaning: "Güzel olan, güzellik veren.",
    title: "EL-CEMÎL — Güzel olan, güzellik veren.",
    body: "Çevremizdeki çiçeklerin renkleri, gökyüzünün güzelliği ve güzel bir davranış bize Allah’ın Cemîl ismini hatırlatır. Güzellikleri yalnızca seyretmekle kalmayıp onları bize veren Rabbimizi düşünmek, kalbimizde şükür duygusunu büyütür. Biz de sözlerimizi ve davranışlarımızı güzelleştirerek bu güzelliklere güzelce karşılık vermeye çalışırız.",
  },
  {
    weekNumber: 2,
    name: "ER-RAHMÂN",
    meaning: "Merhameti bütün varlıkları kuşatan.",
    title: "ER-RAHMÂN — Merhameti bütün varlıkları kuşatan.",
    body: "Güneşin herkesi ısıtması, yağmurun toprağı canlandırması, havanın ve suyun bütün canlılara verilmesi Allah’ın geniş rahmetini düşündürür. Rahmân ismi, Rabbimizin ikramlarının yalnızca bize değil bütün varlıklara ulaştığını fark etmemizi sağlar. Bunu bilen çocuk, çevresindeki canlılara daha merhametli bakar.",
  },
  {
    weekNumber: 3,
    name: "ER-RAHÎM",
    meaning: "Çok merhamet eden.",
    title: "ER-RAHÎM — Çok merhamet eden.",
    body: "İnsan hata yaptığında yeniden doğruya dönebilir, üzgün olduğunda Rabbine sığınabilir ve her gün sayısız nimetle karşılaşır. Rahîm ismi bize Allah’ın kullarına merhametle muamele ettiğini hatırlatır. Bu ismi öğrenmek, ümitsiz olmak yerine Allah’ın rahmetine güvenmeyi öğretir.",
  },
  {
    weekNumber: 4,
    name: "ER-RAÛF",
    meaning: "Çok şefkatli olan.",
    title: "ER-RAÛF — Çok şefkatli olan.",
    body: "Bir annenin yavrusunu koruması ve onun için karşılık beklemeden emek vermesi şefkatin ne kadar kıymetli olduğunu gösterir. Kaynak kitapta da anne şefkati Rauf ismini anlamaya açılan bir pencere olarak anlatılır. Dünyadaki bütün şefkatler bize asıl şefkat kaynağının Allah olduğunu hatırlatır.",
  },
  {
    weekNumber: 5,
    name: "EL-MUHSİN",
    meaning: "İyilik ve ihsanda bulunan.",
    title: "EL-MUHSİN — İyilik ve ihsanda bulunan.",
    body: "Bazen daha istemeden bize ulaşan nimetleri düşünelim: hava, su, gözlerimiz, sevdiklerimiz ve rengârenk bir dünya… Muhsin ismi, Allah’ın kullarına bol bol ihsanda bulunduğunu öğretir. Bu nimetleri fark etmek bizi düşünmeye, Allah’ı anmaya ve teşekkür etmeye yöneltir.",
  },
  {
    weekNumber: 6,
    name: "EL-KERÎM",
    meaning: "Çok cömert, ikramı bol olan.",
    title: "EL-KERÎM — Çok cömert, ikramı bol olan.",
    body: "Bir meyvenin küçücük çekirdekten büyüyüp soframıza gelmesine kadar nice nimet bir araya gelir. Kerîm ismi, Allah’ın ikramlarının ne kadar bol olduğunu düşündürür. Nimeti fark eden insan, sahip olduklarını yalnız kendisi için görmez; paylaşmayı ve teşekkür etmeyi de öğrenir.",
  },
  {
    weekNumber: 7,
    name: "EL-MENNÂN",
    meaning: "Çokça nimet veren.",
    title: "EL-MENNÂN — Çokça nimet veren.",
    body: "Her gün tekrar tekrar aldığımız nefes, içtiğimiz su ve yediğimiz yiyecekler sıradan görünse de büyük nimetlerdir. Mennân ismi, nimetlerin sürekli verildiğini fark ettirir. Bu isim bize “Bende ne eksik?” diye düşünmeden önce “Bana neler verilmiş?” diye bakmayı öğretir.",
  },
  {
    weekNumber: 8,
    name: "ER-REZZÂK",
    meaning: "Rızık veren.",
    title: "ER-REZZÂK — Rızık veren.",
    body: "Kuşların, balıkların, insanların ve küçücük böceklerin bile kendilerine uygun yiyeceklerle beslenmesi üzerinde düşünmeye değer. Rezzâk ismi, bütün canlıların rızkını verenin Allah olduğunu hatırlatır. Bize düşen çalışmak, nimeti israf etmemek ve rızkın gerçek sahibine şükretmektir.",
  },
  {
    weekNumber: 9,
    name: "EL-LATÎF",
    meaning: "Lütfu ince ve güzel olan.",
    title: "EL-LATÎF — Lütfu ince ve güzel olan.",
    body: "Hayatımızdaki bazı iyilikleri hemen fark ederiz, bazılarını ise ancak zaman geçince anlarız. Latîf ismi, Allah’ın kullarına ince yollarla lütufta bulunduğunu düşündürür. Küçük bir iyiliği bile fark etmeyi öğrenmek, dünyaya daha dikkatli ve şükreden gözlerle bakmamıza yardım eder.",
  },
  {
    weekNumber: 10,
    name: "EL-VEDÛD",
    meaning: "Seven ve sevilen.",
    title: "EL-VEDÛD — Seven ve sevilen.",
    body: "Sevgi aileyi, arkadaşlığı ve iyiliği güzelleştirir. Vedûd ismi, gerçek ve güzel sevginin kaynağının Allah olduğunu hatırlatır. Rabbimizi sevmek, O’nun verdiği insanları ve nimetleri doğru biçimde sevmeyi; sevgimizi iyilik, sadakat ve güzel davranışlarla göstermeyi öğretir.",
  },
  {
    weekNumber: 11,
    name: "EL-HABÎB",
    meaning: "Sevgili, sevilen.",
    title: "EL-HABÎB — Sevgili, sevilen.",
    body: "İnsan sevdiğini hatırlar, onun hoşnut olacağı şeyleri yapmaya çalışır. Allah’ı sevmek de yalnızca bir söz değildir; O’nu anmak, verdiği nimetleri fark etmek ve güzel davranışlara yönelmekle güçlenir. Habîb ismi sevginin kalpte başlayıp davranışlara yansıması gerektiğini düşündürür.",
  },
  {
    weekNumber: 12,
    name: "EL-HÂLIK",
    meaning: "Yaratan.",
    title: "EL-HÂLIK — Yaratan.",
    body: "Bir ağacın yaprağı, bir kuşun kanadı ve insanın gözü birbirinden çok farklıdır; fakat hepsi ölçülü bir yaratılışa sahiptir. Hâlık ismi, varlıkları yaratanın Allah olduğunu öğretir. Çevremizi dikkatle incelemek, yaratılıştaki düzeni görmemize ve Rabbimizi daha yakından tanımamıza yardım eder.",
  },
  {
    weekNumber: 13,
    name: "EL-BÂRİ",
    meaning: "Varlıkları uygun ve düzenli yaratan.",
    title: "EL-BÂRİ — Varlıkları uygun ve düzenli yaratan.",
    body: "Her canlının yaşayacağı ortama uygun özellikleri vardır. Balığın suda, kuşun havada yaşayabilmesi bize yaratılıştaki uyumu düşündürür. Bâri ismi, varlıkların gelişigüzel değil kendilerine uygun bir düzen içinde yaratıldığını fark ettirir.",
  },
  {
    weekNumber: 14,
    name: "EL-MUSAVVİR",
    meaning: "Şekil ve özellik veren.",
    title: "EL-MUSAVVİR — Şekil ve özellik veren.",
    body: "Aynı türden iki yaprak bile bütünüyle birbirinin aynısı değildir. İnsanların yüzleri, hayvanların biçimleri ve çiçeklerin renkleri büyük bir çeşitlilik gösterir. Musavvir ismi, her varlığa kendine özgü şekil ve özellikler verenin Allah olduğunu hatırlatır.",
  },
  {
    weekNumber: 15,
    name: "ES-SÜBHÂN",
    meaning: "Her türlü eksiklikten uzak olan.",
    title: "ES-SÜBHÂN — Her türlü eksiklikten uzak olan.",
    body: "Kaynak kitapta tabiatın uyumu ve varlıklardaki kusursuzluk Sübhan ismini düşünmeye vesile olur. Allah yarattıklarına benzemez ve eksikliklerden uzaktır. Bu isim, kâinattaki düzeni seyrederken Rabbimizin yüceliğini ve kusursuzluğunu hatırlamamızı sağlar.",
  },
  {
    weekNumber: 16,
    name: "EL-AZÎM",
    meaning: "Pek yüce olan.",
    title: "EL-AZÎM — Pek yüce olan.",
    body: "Gökyüzünün genişliği, dağların büyüklüğü ve kâinatın ihtişamı insana kendi küçüklüğünü hatırlatabilir. Azîm ismi, gerçek büyüklük ve yüceliğin Allah’a ait olduğunu öğretir. Böylece insan kibirlenmek yerine hayranlık, saygı ve kulluk duygusu kazanır.",
  },
  {
    weekNumber: 17,
    name: "EL-ALİYY",
    meaning: "Çok yüce olan.",
    title: "EL-ALİYY — Çok yüce olan.",
    body: "İnsanların makamları ve güçleri değişebilir; Allah’ın yüceliği ise hiçbir şeye bağlı değildir. Aliyy ismi Rabbimizin her türlü eksik ve sınırlı ölçünün üstünde olduğunu düşündürür. Bu isim, kalbimizde Allah’a karşı saygıyı güçlendirir.",
  },
  {
    weekNumber: 18,
    name: "EL-MÜTEÂL",
    meaning: "Yüceliği her şeyin üstünde olan.",
    title: "EL-MÜTEÂL — Yüceliği her şeyin üstünde olan.",
    body: "Gördüğümüz her varlığın bir sınırı vardır. Müteâl ismi ise Allah’ın yaratılmışların sınırlılıklarından uzak ve yüce olduğunu hatırlatır. Rabbimizi tanırken O’nu yaratılmışlara benzetmemeyi ve yüceliğini düşünmeyi öğretir.",
  },
  {
    weekNumber: 19,
    name: "ES-SULTÂN",
    meaning: "Hüküm ve hâkimiyet sahibi.",
    title: "ES-SULTÂN — Hüküm ve hâkimiyet sahibi.",
    body: "Kâinatta gece ile gündüzün, mevsimlerin ve canlıların düzenli biçimde devam etmesi büyük bir hâkimiyeti düşündürür. Sultan ismi, gerçek hüküm ve hâkimiyetin Allah’a ait olduğunu hatırlatır. Bu bilgi insana güven verir ve sorumluluklarını ciddiye almasını sağlar.",
  },
  {
    weekNumber: 20,
    name: "EL-KADÎR",
    meaning: "Her şeye gücü yeten.",
    title: "EL-KADÎR — Her şeye gücü yeten.",
    body: "Küçücük bir tohumdan büyük bir ağacın çıkması, cansız görünen toprağın baharda canlanması Allah’ın kudretini düşündürür. Kadîr ismi, Allah’ın dilediğini yapmaya gücünün yettiğini öğretir. Zorluklar karşısında Rabbimize güvenmemize yardımcı olur.",
  },
  {
    weekNumber: 21,
    name: "EL-KAHHÂR",
    meaning: "Kudreti karşısında her şey boyun eğen.",
    title: "EL-KAHHÂR — Kudreti karşısında her şey boyun eğen.",
    body: "İnsan güçlü olabilir ama gücü sınırlıdır; yorulur, hastalanır ve her istediğini yapamaz. Kahhâr ismi, hiçbir gücün Allah’ın kudretinin önüne geçemeyeceğini hatırlatır. Bu isim bize güçle övünmemeyi ve gerçek kudret sahibini tanımayı öğretir.",
  },
  {
    weekNumber: 22,
    name: "EL-CEBBÂR",
    meaning: "Kudreti üstün olan, eksikleri gideren.",
    title: "EL-CEBBÂR — Kudreti üstün olan, eksikleri gideren.",
    body: "Kırılan bir dalın zamanla iyileşmesi, insanın üzüntüden sonra yeniden güç bulabilmesi bize onarılmayı düşündürür. Cebbâr ismi, Allah’ın kudretini ve kullarının hâllerini düzeltmeye muktedir olduğunu hatırlatır. Zor zamanlarda Rabbimize yönelmemize vesile olur.",
  },
  {
    weekNumber: 23,
    name: "EL-GANÎ",
    meaning: "Hiçbir şeye muhtaç olmayan.",
    title: "EL-GANÎ — Hiçbir şeye muhtaç olmayan.",
    body: "Biz suya, havaya, yiyeceğe ve birbirimize muhtacız. Allah ise hiçbir şeye muhtaç değildir; bütün varlıklar O’na muhtaçtır. Ganî ismi, Rabbimizin zenginliğinin ve ihtiyaçsızlığının mutlak olduğunu öğretir.",
  },
  {
    weekNumber: 24,
    name: "ES-SAMED",
    meaning: "Herkesin kendisine muhtaç olduğu, kendisi hiçbir şeye muhtaç olmayan.",
    title: "ES-SAMED — Herkesin kendisine muhtaç olduğu, kendisi hiçbir şeye muhtaç olmayan.",
    body: "İnsan bazen yardım ister, bazen de başkasına yardım eder. Samed ismi bize bütün ihtiyaçların sonunda Allah’a yöneldiğini hatırlatır. Dua ederken ve bir ihtiyacımız olduğunda kalbimizi Rabbimize çevirmemizin anlamını öğretir.",
  },
  {
    weekNumber: 25,
    name: "EL-FERD",
    meaning: "Tek ve eşsiz olan.",
    title: "EL-FERD — Tek ve eşsiz olan.",
    body: "Dünyada pek çok varlık vardır ama Allah’ın benzeri ve ortağı yoktur. Ferd ismi, Rabbimizin eşsizliğini düşünmemize yardım eder. Bu isim Allah’a kulluğun yalnız O’na yönelmesi gerektiğini hatırlatır.",
  },
  {
    weekNumber: 26,
    name: "EL-EHAD",
    meaning: "Bir ve tek olan.",
    title: "EL-EHAD — Bir ve tek olan.",
    body: "Ehad ismi, Allah’ın birliğini çok açık biçimde öğretir. O’nun eşi, benzeri ve ortağı yoktur. Kâinattaki düzenin tek bir bütün hâlinde işlemesi de bize bütün varlıkların aynı Yaratıcı’nın eseri olduğunu düşündürür.",
  },
  {
    weekNumber: 27,
    name: "EL-VİTR",
    meaning: "Tek olan, teki seven.",
    title: "EL-VİTR — Tek olan, teki seven.",
    body: "Vitr ismi Allah’ın birliğini ve eşsizliğini hatırlatan isimlerden biridir. Allah yaratılmışlar gibi değildir ve O’nun benzeri yoktur. Bu ismi öğrenmek tevhid düşüncesini kalbimizde güçlendirir.",
  },
  {
    weekNumber: 28,
    name: "EL-BÂKÎ",
    meaning: "Varlığı sonsuz olan.",
    title: "EL-BÂKÎ — Varlığı sonsuz olan.",
    body: "Çiçekler solar, mevsimler değişir, insanlar büyür; dünyadaki her şey değişime uğrar. Bâkî ismi, Allah’ın varlığının sonu olmadığını öğretir. Geçici şeyleri severken asıl kalıcı olan Rabbimizi unutmamamız gerektiğini hatırlatır.",
  },
  {
    weekNumber: 29,
    name: "EL-HAYY",
    meaning: "Daima diri olan.",
    title: "EL-HAYY — Daima diri olan.",
    body: "Canlılar doğar, büyür ve hayatları sona erer. Hayy ismi, Allah’ın hayatının başlangıcı ve sonu olmadığını, O’nun daima diri olduğunu hatırlatır. Bize hayatı veren Rabbimizi tanımaya ve hayat nimetinin değerini bilmeye çağırır.",
  },
  {
    weekNumber: 30,
    name: "EL-KAYYÛM",
    meaning: "Her şeyi ayakta tutan.",
    title: "EL-KAYYÛM — Her şeyi ayakta tutan.",
    body: "Dünya döner, canlılar hayatını sürdürür ve kâinattaki düzen devam eder. Kayyûm ismi, bütün varlığın Allah’ın kudretiyle ayakta durduğunu düşündürür. Biz uyur ve dinleniriz; Rabbimizin koruyup yönetmesi ise kesintiye uğramaz.",
  },
  {
    weekNumber: 31,
    name: "EL-ALÎM",
    meaning: "Her şeyi bilen.",
    title: "EL-ALÎM — Her şeyi bilen.",
    body: "Biz bazı şeyleri bilir, pek çoğunu bilmeyiz; hatta yarın ne olacağını bilemeyiz. Alîm ismi, Allah’ın bilgisinin her şeyi kuşattığını öğretir. Bu bilgi bize yalnızken de güzel davranmayı ve Rabbimizin bizi bildiğini hatırlamayı sağlar.",
  },
  {
    weekNumber: 32,
    name: "EL-HABÎR",
    meaning: "Her şeyden haberdar olan.",
    title: "EL-HABÎR — Her şeyden haberdar olan.",
    body: "Bir davranışın dışarıdan nasıl göründüğünü insanlar görebilir; fakat kalbimizdeki niyeti her zaman bilemezler. Habîr ismi, Allah’ın açık ve gizli her şeyden haberdar olduğunu hatırlatır. Bu yüzden iyiliği yalnız görünmek için değil samimiyetle yapmaya çalışırız.",
  },
  {
    weekNumber: 33,
    name: "ES-SEMÎ",
    meaning: "Her şeyi işiten.",
    title: "ES-SEMÎ — Her şeyi işiten.",
    body: "Çok kısık sesle konuşsak bile Allah bizi işitir. Semî ismi, hiçbir sesin Rabbimize gizli kalmadığını öğretir. Dua ederken sesimizin ne kadar yüksek olduğundan çok, kalbimizin samimiyetinin önemli olduğunu hatırlatır.",
  },
  {
    weekNumber: 34,
    name: "EL-BASÎR",
    meaning: "Her şeyi gören.",
    title: "EL-BASÎR — Her şeyi gören.",
    body: "Karanlıkta veya kimsenin bulunmadığı bir yerde yaptıklarımız insanlardan gizli kalabilir. Basîr ismi, Allah’ın her şeyi gördüğünü öğretir. Bu bilgi korkudan çok sorumluluk kazandırmalı; yalnızken de doğru olanı seçmemize yardım etmelidir.",
  },
  {
    weekNumber: 35,
    name: "EL-MUCÎB",
    meaning: "Dualara cevap veren.",
    title: "EL-MUCÎB — Dualara cevap veren.",
    body: "İnsan bazen sevincini, bazen korkusunu, bazen de ihtiyacını Rabbine anlatır. Mucîb ismi, Allah’ın kendisine yönelen kullarının duasını işittiğini ve karşılıksız bırakmadığını hatırlatır. Dua, Rabbimizle bağımızı canlı tutar.",
  },
  {
    weekNumber: 36,
    name: "EL-MÜSTEÂN",
    meaning: "Yardımı istenen, gerçek yardım sahibi.",
    title: "EL-MÜSTEÂN — Yardımı istenen, gerçek yardım sahibi.",
    body: "Zor bir işte arkadaşımızdan veya ailemizden yardım isteyebiliriz. Fakat bütün imkânları yaratan Allah’tır. Müsteân ismi, çaba gösterirken kalben Rabbimizden yardım istemeyi ve başarıyı yalnız kendimizden bilmemeyi öğretir.",
  },
  {
    weekNumber: 37,
    name: "EL-HÂDÎ",
    meaning: "Doğru yolu gösteren.",
    title: "EL-HÂDÎ — Doğru yolu gösteren.",
    body: "Bir yolculukta işaretler bize yön gösterir. Hayatta da doğru ile yanlışı ayırabilmek için rehberliğe ihtiyaç duyarız. Hâdî ismi, doğru yolu gösterenin Allah olduğunu hatırlatır; öğrenmeye, düşünmeye ve doğruyu seçmeye yöneltir.",
  },
  {
    weekNumber: 38,
    name: "EL-FETTÂH",
    meaning: "Kapıları açan, güçlükleri çözen.",
    title: "EL-FETTÂH — Kapıları açan, güçlükleri çözen.",
    body: "Bazen bir problem uzun süre çözülemez, sonra beklemediğimiz bir çıkış yolu belirir. Fettâh ismi, kapalı görünen yolları açmaya Allah’ın gücünün yettiğini hatırlatır. Bize çalışmayı bırakmadan dua etmeyi ve ümidimizi korumayı öğretir.",
  },
  {
    weekNumber: 39,
    name: "EL-KÂFÎ",
    meaning: "Kullarına yeten.",
    title: "EL-KÂFÎ — Kullarına yeten.",
    body: "İnsan her şeyi kontrol edemez. Elinden geleni yaptıktan sonra kalbinin güveneceği sağlam bir dayanağa ihtiyaç duyar. Kâfî ismi, Allah’ın kuluna yettiğini ve gerçek güvenin O’na dayanmakla güçlendiğini hatırlatır.",
  },
  {
    weekNumber: 40,
    name: "EL-EMÂN",
    meaning: "Güven veren.",
    title: "EL-EMÂN — Güven veren.",
    body: "Korktuğumuzda güvenli bir yere sığınmak isteriz. Allah’a iman eden insan da kalbiyle Rabbine sığınır. Emân ismi, gerçek güven ve huzurun kaynağını hatırlatır; bizi tedbirimizi aldıktan sonra Allah’a güvenmeye çağırır.",
  },
  {
    weekNumber: 41,
    name: "EŞ-ŞÂFÎ",
    meaning: "Şifa veren.",
    title: "EŞ-ŞÂFÎ — Şifa veren.",
    body: "Hastalandığımızda doktora gider, ilaç kullanır ve dinleniriz. Bunların hepsi şifaya vesiledir; şifanın gerçek sahibi Allah’tır. Şâfî ismi, tedaviyi ihmal etmeden Rabbimizden sağlık ve şifa istemeyi öğretir.",
  },
  {
    weekNumber: 42,
    name: "EL-MUÂFÎ",
    meaning: "Afiyet veren.",
    title: "EL-MUÂFÎ — Afiyet veren.",
    body: "Sağlıklı olduğumuz günlerde sağlığın ne büyük nimet olduğunu bazen unutabiliriz. Muâfî ismi, beden ve ruh afiyetinin Allah’ın nimeti olduğunu hatırlatır. Sağlığımızı korumak, nimetin kıymetini bilmenin bir yoludur.",
  },
  {
    weekNumber: 43,
    name: "EL-GAFFÂR",
    meaning: "Çok bağışlayan.",
    title: "EL-GAFFÂR — Çok bağışlayan.",
    body: "Hata yapmak doğru değildir; fakat hatasını anlayıp özür dilemek ve düzeltmeye çalışmak çok değerlidir. Gaffâr ismi, Allah’ın samimiyetle kendisine yönelen kullarını bağışladığını hatırlatır. Bu isim bizi hatada ısrar etmeye değil, tövbeye ve düzelmeye çağırır.",
  },
  {
    weekNumber: 44,
    name: "ES-SETTÂR",
    meaning: "Kusurları örten.",
    title: "ES-SETTÂR — Kusurları örten.",
    body: "İnsanların hatalarını araştırmak ve onları utandırmak güzel bir davranış değildir. Settâr ismi, Allah’ın kullarının kusurlarını örttüğünü hatırlatır. Biz de başkalarının ayıplarını yaymak yerine düzeltmeye yardımcı olmayı öğreniriz.",
  },
  {
    weekNumber: 45,
    name: "EL-ADL",
    meaning: "Mutlak adalet sahibi.",
    title: "EL-ADL — Mutlak adalet sahibi.",
    body: "Adalet, herkese hakkını vermek ve haksızlıktan kaçınmaktır. Allah’ın Adl ismi bize gerçek adaletin O’na ait olduğunu hatırlatır. Günlük hayatımızda sıra beklemekten paylaşmaya kadar pek çok yerde adil davranmayı öğrenebiliriz.",
  },
  {
    weekNumber: 46,
    name: "ED-DEYYÂN",
    meaning: "Karşılık veren, hüküm ve hesap sahibi.",
    title: "ED-DEYYÂN — Karşılık veren, hüküm ve hesap sahibi.",
    body: "Yaptığımız iyiliklerin ve yanlışların bir anlamı ve sonucu vardır. Deyyân ismi, Allah’ın kullarının yaptıklarını karşılıksız bırakmadığını ve adaletle hükmettiğini düşündürür. Bu isim sorumluluk duygumuzu güçlendirir.",
  },
  {
    weekNumber: 47,
    name: "ES-SÂDIKU’L-VA‘D",
    meaning: "Sözünden dönmeyen.",
    title: "ES-SÂDIKU’L-VA‘D — Sözünden dönmeyen.",
    body: "İnsan verdiği sözü unutabilir veya yerine getiremeyebilir. Allah ise vaadinden dönmez. Sâdıku’l-va‘d ismi, Rabbimizin sözüne güvenmeyi öğretirken bize de verdiğimiz sözlerde dürüst ve güvenilir olmayı hatırlatır.",
  },
  {
    weekNumber: 48,
    name: "EL-MAHMÛD",
    meaning: "Övgüye layık olan.",
    title: "EL-MAHMÛD — Övgüye layık olan.",
    body: "Gördüğümüz nimetler için teşekkür ederiz; bütün nimetlerin gerçek sahibi Allah olduğu için en büyük hamd O’na aittir. Mahmûd ismi, Rabbimizi nimetleri ve güzel isimleriyle tanıyıp övmeyi öğretir. Şükreden insan nimeti daha bilinçli kullanır.",
  },
  {
    weekNumber: 49,
    name: "EL-MECÎD",
    meaning: "Şanı ve ikramı yüce olan.",
    title: "EL-MECÎD — Şanı ve ikramı yüce olan.",
    body: "İnsanların ünü zamanla unutulabilir; Allah’ın yüceliği ise değişmez. Mecîd ismi, Rabbimizin şanının ve ikramının büyüklüğünü hatırlatır. Bu isim bize gerçek yüceliğin gösterişte değil Allah’a ait olduğunu öğretir.",
  },
  {
    weekNumber: 50,
    name: "EL-HANNÂN",
    meaning: "Çok merhamet ve şefkat gösteren.",
    title: "EL-HANNÂN — Çok merhamet ve şefkat gösteren.",
    body: "Bir yavrunun korunması, çaresiz bir canlının yardım görmesi ve sıkıntıdan sonra gelen ferahlık bize merhameti düşündürür. Hannân ismi, Allah’ın kullarına şefkatle muamele ettiğini hatırlatır. Biz de çevremize karşı daha yumuşak ve yardımsever olmaya çalışırız.",
  },
  {
    weekNumber: 51,
    name: "EL-MA‘RÛF",
    meaning: "İyiliği bilinen, ihsanı tanınan.",
    title: "EL-MA‘RÛF — İyiliği bilinen, ihsanı tanınan.",
    body: "Hayatımızda sürekli karşılaştığımız nimetler bazen gözümüze görünmez hâle gelir. Ma‘rûf ismi, Allah’ın iyilik ve ihsanlarını fark etmeye çağırır. Her gün birkaç nimeti bilinçli biçimde hatırlamak şükür alışkanlığı kazandırır.",
  },
  {
    weekNumber: 52,
    name: "EL-BÜRHÂN",
    meaning: "Varlığına ve birliğine deliller gösteren.",
    title: "EL-BÜRHÂN — Varlığına ve birliğine deliller gösteren.",
    body: "Bir esere baktığımızda onu yapanı düşünürüz. Kâinattaki düzen, güzellik ve ölçü de bizi Yaratıcı’yı düşünmeye yöneltir. Bürhân ismi, çevremizdeki varlıkları yalnız görmekle kalmayıp onların neyi gösterdiğini düşünmeyi öğretir.",
  },
  {
    weekNumber: 53,
    name: "EL-GARÎB",
    meaning: "Kullarına yakınlığı şaşırtıcı ve özel olan.",
    title: "EL-GARÎB — Kullarına yakınlığı şaşırtıcı ve özel olan.",
    body: "İnsan bazen kendisini yalnız hissedebilir. Allah ise kulunun duasını işitir ve hâlini bilir. Kaynak seride zikredilen Garîb ismi, Rabbimizle bağımızın yalnız kalabalık zamanlara bağlı olmadığını; insan tek başınayken de O’na yönelebileceğini düşündürür.",
  },
  {
    weekNumber: 54,
    name: "EL-ATÛF",
    meaning: "Çok merhametli ve şefkatli davranan.",
    title: "EL-ATÛF — Çok merhametli ve şefkatli davranan.",
    body: "Şefkat, bir başkasının hâlini fark edip ona incitmeden yaklaşmayı gerektirir. Atûf ismi, Allah’ın kullarına olan merhametini hatırlatır. Bu ismi öğrenen çocuk, özellikle küçük, yaşlı, hasta ve yardıma ihtiyacı olanlara karşı daha dikkatli olmayı öğrenir.",
  },
  {
    weekNumber: 55,
    name: "ALLAH",
    meaning: "Bütün güzel isimlerin sahibi olan Rabbimiz.",
    title: "ALLAH — Bütün güzel isimlerin sahibi olan Rabbimiz.",
    body: "Öğrendiğimiz Cemîl, Rahmân, Rahîm, Muhsin, Kadîr ve diğer bütün güzel isimler aynı Rabbimizi tanıtır. Her isim O’nu başka bir yönüyle tanımamıza yardım eder. Esmâü’l-Hüsnâ’yı öğrenmenin amacı yalnız isimleri ezberlemek değil, Allah’ı daha iyi tanımak, sevmek ve hayatımızı bu bilinçle güzelleştirmektir.",
  },
] as const;

/**
 * Lise (4., 5. ve 6. Sınıflar) için 55 haftalık Esmâü'l-Hüsnâ müfredatı
 * Kaynak: mufredat-docs/esma/02_ESMAUL_HUSNA_55_GUN_LISE_PROGRAMI.docx
 */
export const liseEsmaCurriculum: readonly EsmaCurriculumItem[] = [
  {
    weekNumber: 1,
    name: "EL-CEMÎL",
    meaning: "Mutlak güzellik sahibi, güzelleştiren.",
    title: "EL-CEMÎL — Mutlak güzellik sahibi, güzelleştiren.",
    body: "Kâinatta karşılaştığımız güzellikler, yalnız estetik bir haz vermekle kalmaz; bizi güzelliğin kaynağı üzerinde düşünmeye çağırır. Cemîl ismi, varlıklardaki güzelliği kendinden bilmek yerine onu veren Allah’a yönelmeyi öğretir. Böylece tabiat, sanat ve güzel ahlâk, marifetullaha açılan birer tefekkür penceresine dönüşür.",
  },
  {
    weekNumber: 2,
    name: "ER-RAHMÂN",
    meaning: "Rahmeti bütün varlığı kuşatan.",
    title: "ER-RAHMÂN — Rahmeti bütün varlığı kuşatan.",
    body: "Varlığın devamı için gerekli hava, su, ışık ve rızık gibi nimetlerin canlılara geniş biçimde ulaştırılması Rahmân ismini düşünmeye vesile olur. Bu isim, ilâhî rahmetin kuşatıcılığını fark ettirir. İnsan bu perspektifle nimet karşısında şükür, canlılar karşısında merhamet ve çevre karşısında sorumluluk geliştirir.",
  },
  {
    weekNumber: 3,
    name: "ER-RAHÎM",
    meaning: "Merhameti sürekli olan.",
    title: "ER-RAHÎM — Merhameti sürekli olan.",
    body: "Rahîm ismi, insanın Allah ile ilişkisinde ümit boyutunu canlı tutar. Hata, acziyet ve eksiklik insanı Rabbinden uzaklaştıran bir ümitsizliğe değil; tövbe, dua ve yeniden yönelişe sevk etmelidir. İlâhî merhameti tanımak, insanın başkalarına karşı da bağışlayıcı ve merhametli olmasını destekler.",
  },
  {
    weekNumber: 4,
    name: "ER-RAÛF",
    meaning: "Şefkati pek engin olan.",
    title: "ER-RAÛF — Şefkati pek engin olan.",
    body: "Kaynak seride Rauf ismi anne şefkati üzerinden somutlaştırılır: karşılık beklemeden koruyan, gözeten ve iyiliği isteyen şefkat. Bu örnek, yaratılmışlardaki şefkatin kaynağını düşünmeye götürür. İnsan şefkati kendine ait bağımsız bir üstünlük olarak değil, Allah’ın verdiği kıymetli bir duygu olarak görür.",
  },
  {
    weekNumber: 5,
    name: "EL-MUHSİN",
    meaning: "İhsanı bol olan, güzellikle muamele eden.",
    title: "EL-MUHSİN — İhsanı bol olan, güzellikle muamele eden.",
    body: "Muhsin ismi, insanın talep etmediği hâlde kendisine sunulan sayısız nimeti fark etmesini sağlar. Kaynak kitap bu farkındalığı fikir, zikir ve şükür ekseninde işler: nimeti düşünmek, vereni anmak ve teşekkür etmek. Böyle bir bakış, gündelik hayatı sıradanlıktan çıkarıp tefekkür alanına dönüştürür.",
  },
  {
    weekNumber: 6,
    name: "EL-KERÎM",
    meaning: "Cömertliği ve ikramı sonsuz olan.",
    title: "EL-KERÎM — Cömertliği ve ikramı sonsuz olan.",
    body: "İlâhî ikram yalnız zorunlu ihtiyaçların karşılanmasında değil; renk, koku, tat ve güzellik gibi hayatı zenginleştiren nimetlerde de görülür. Kerîm ismi, nimeti hak edilmiş bir mülk gibi değil ikram olarak okumayı öğretir. Bunun ahlâkî karşılığı paylaşma, kanaat ve şükürdür.",
  },
  {
    weekNumber: 7,
    name: "EL-MENNÂN",
    meaning: "Nimetleri ardı ardına ihsan eden.",
    title: "EL-MENNÂN — Nimetleri ardı ardına ihsan eden.",
    body: "İnsan çoğu zaman sürekli sahip olduğu nimetleri fark etmez; ancak kaybettiğinde onların değerini anlar. Mennân ismi, kesintisiz nimet akışına dikkat çeker. Nefes, zaman, sağlık, akıl ve ilişkiler üzerinde düşünmek insanın nimet algısını derinleştirir ve şükrü yalnız söz olmaktan çıkarır.",
  },
  {
    weekNumber: 8,
    name: "ER-REZZÂK",
    meaning: "Bütün canlıların rızkını veren.",
    title: "ER-REZZÂK — Bütün canlıların rızkını veren.",
    body: "Rızık yalnız yiyecekten ibaret değildir; hayatı sürdürmeye yarayan imkânların bütünü üzerinde düşünmeyi gerektirir. Rezzâk ismi, çalışmayı gereksizleştirmez; aksine sebeplere başvururken neticeyi ve nimeti mutlak biçimde kendinden bilmemeyi öğretir. Bu anlayış israfı azaltır, paylaşma bilincini artırır.",
  },
  {
    weekNumber: 9,
    name: "EL-LATÎF",
    meaning: "Lütfu ince, bilgisi ve ihsanı nüfuz edici olan.",
    title: "EL-LATÎF — Lütfu ince, bilgisi ve ihsanı nüfuz edici olan.",
    body: "Hayatın bazı lütufları açık, bazıları ise ancak zaman içinde anlaşılır. Latîf ismi, insanı olayların yalnız görünen yüzüne mahkûm olmamaya çağırır. İncelikleri fark eden bir tefekkür, insanın şükür kapasitesini artırır ve ilişkilerinde de daha nazik davranmasına zemin hazırlar.",
  },
  {
    weekNumber: 10,
    name: "EL-VEDÛD",
    meaning: "Seven ve sevilen.",
    title: "EL-VEDÛD — Seven ve sevilen.",
    body: "Vedûd ismi, sevginin yalnız duygusal bir hâl değil, bağlılık ve davranış üreten bir değer olduğunu düşündürür. Allah sevgisi nimetleri fark etme, O’nu anma ve hoşnutluğunu arama ile derinleşir. İnsanî sevgiler de bu ölçüyle bencillikten uzaklaşıp sadakat ve iyilik üretir.",
  },
  {
    weekNumber: 11,
    name: "EL-HABÎB",
    meaning: "Sevilen, sevgisi gönüllerde yer eden.",
    title: "EL-HABÎB — Sevilen, sevgisi gönüllerde yer eden.",
    body: "Sevgi insanın yönelişini belirler: insan sevdiğini anar ve onunla bağını korur. Habîb ismi, Allah ile ilişkinin yalnız bilgi düzeyinde kalmaması gerektiğini düşündürür. Marifet arttıkça muhabbetin, muhabbet arttıkça güzel davranışların güçlenmesi beklenir.",
  },
  {
    weekNumber: 12,
    name: "EL-HÂLIK",
    meaning: "Her şeyi yaratan.",
    title: "EL-HÂLIK — Her şeyi yaratan.",
    body: "Hâlık ismi varlığı tesadüfî ve başıboş okumak yerine yaratılmışlık bilinciyle değerlendirmeye çağırır. Canlıların yapısı, tabiatın düzeni ve insanın kendisi tefekkür konusu hâline gelir. Bu bakış insanın hem Rabbine karşı kulluk hem yaratılmışlara karşı emanet sorumluluğunu güçlendirir.",
  },
  {
    weekNumber: 13,
    name: "EL-BÂRİ",
    meaning: "Varlıkları uyumlu ve uygun biçimde var eden.",
    title: "EL-BÂRİ — Varlıkları uyumlu ve uygun biçimde var eden.",
    body: "Canlıların yapılarıyla yaşadıkları ortam arasındaki uyum, yaratılıştaki ölçüyü fark ettirir. Bâri ismi, varlığın gelişigüzel bir yığın değil düzenli bir bütün olduğunu düşündürür. Bu düzeni okumak, insanın kâinatı anlamlandırma biçimini derinleştirir.",
  },
  {
    weekNumber: 14,
    name: "EL-MUSAVVİR",
    meaning: "Varlıklara sûret ve özellik veren.",
    title: "EL-MUSAVVİR — Varlıklara sûret ve özellik veren.",
    body: "Yüzlerden yapraklara kadar sayısız biçim ve farklılık içinde bir düzen görülür. Musavvir ismi, çeşitliliği ilâhî sanat açısından düşünmeye imkân verir. İnsan kendi fiziksel özelliklerini üstünlük veya değersizlik sebebi yapmak yerine yaratılışın bir emaneti olarak görmeyi öğrenir.",
  },
  {
    weekNumber: 15,
    name: "ES-SÜBHÂN",
    meaning: "Her türlü noksanlıktan münezzeh olan.",
    title: "ES-SÜBHÂN — Her türlü noksanlıktan münezzeh olan.",
    body: "Kaynak seride Sübhan ismi, kâinattaki kusursuzluk ve uyum üzerinden açıklanır. Tesbih düşüncesi yalnız bir kelimeyi tekrar etmek değil, Allah’ı yaratılmışlara ait eksikliklerden tenzih etmektir. Kâinatın düzenini gözlemlemek bu tenzih bilincini besleyen bir tefekkür vesilesidir.",
  },
  {
    weekNumber: 16,
    name: "EL-AZÎM",
    meaning: "Azameti sonsuz olan.",
    title: "EL-AZÎM — Azameti sonsuz olan.",
    body: "İnsan büyüklüğü çoğu zaman ölçü, güç veya statüyle tanımlar. Azîm ismi ise gerçek ve mutlak yüceliğin Allah’a ait olduğunu bildirir. Bu farkındalık, insanın kendi başarılarını mutlaklaştırmasını önler; hayranlık, tevazu ve kulluk bilincini geliştirir.",
  },
  {
    weekNumber: 17,
    name: "EL-ALİYY",
    meaning: "Yüceliği her şeyin üstünde olan.",
    title: "EL-ALİYY — Yüceliği her şeyin üstünde olan.",
    body: "Aliyy ismi, Allah’ın yüceliğinin yaratılmışların mekânsal veya toplumsal üstünlükleriyle ölçülemeyeceğini düşündürür. İnsan sınırlı kavramlarla Rabbini kuşatamayacağını fark eder. Bu idrak, tevhid ve tenzih anlayışını derinleştirir.",
  },
  {
    weekNumber: 18,
    name: "EL-MÜTEÂL",
    meaning: "Her türlü sınırlılıktan yüce olan.",
    title: "EL-MÜTEÂL — Her türlü sınırlılıktan yüce olan.",
    body: "Müteâl ismi, Allah’ı yaratılmışlara benzetme eğiliminden koruyan güçlü bir tenzih perspektifi sunar. Varlıkların tamamı sınırlı ve muhtaçken Allah bu sınırlılıkların üstündedir. Bu isim, kullukta saygı ve zihinsel tevazu kazandırır.",
  },
  {
    weekNumber: 19,
    name: "ES-SULTÂN",
    meaning: "Mutlak hâkimiyet sahibi.",
    title: "ES-SULTÂN — Mutlak hâkimiyet sahibi.",
    body: "Kâinattaki düzen ve süreklilik, hâkimiyet kavramını düşünmeye açar. Sultan ismi, nihai hüküm ve tasarrufun Allah’a ait olduğunu hatırlatır. İnsan kendisine verilen sınırlı güç ve yetkiyi mutlaklaştırmak yerine emanet ve sorumluluk olarak görmelidir.",
  },
  {
    weekNumber: 20,
    name: "EL-KADÎR",
    meaning: "Kudreti her şeye yeten.",
    title: "EL-KADÎR — Kudreti her şeye yeten.",
    body: "Tabiatta sürekli gerçekleşen dönüşümler, hayatın ortaya çıkışı ve varlığın devamı kudret üzerinde düşünmeye çağırır. Kadîr ismi, insanın kendi gücünün sınırlarını kabul ederken Allah’ın kudretine güvenmesini sağlar. Tevekkül, bu güvenin çabayı terk etmeyen biçimidir.",
  },
  {
    weekNumber: 21,
    name: "EL-KAHHÂR",
    meaning: "Mutlak kudreti karşısında her şey boyun eğen.",
    title: "EL-KAHHÂR — Mutlak kudreti karşısında her şey boyun eğen.",
    body: "İnsan gücü sınırlı, geçici ve şartlara bağlıdır. Kahhâr ismi, mutlak güç iddialarını kırarak bütün varlığın Allah’ın hâkimiyeti altında olduğunu hatırlatır. Bu bilinç güç sahibi olduğunda kibirlenmemeyi, güçsüz olduğunda ise ümitsizliğe düşmemeyi destekler.",
  },
  {
    weekNumber: 22,
    name: "EL-CEBBÂR",
    meaning: "Kudreti üstün, dilediğini gerçekleştiren ve onaran.",
    title: "EL-CEBBÂR — Kudreti üstün, dilediğini gerçekleştiren ve onaran.",
    body: "Cebbâr ismi ilâhî kudretin karşı konulamazlığını hatırlatırken kırılanı onarma çağrışımıyla da insanın ümidini besler. İnsan her şeyi düzeltemez; fakat sebeplere sarılıp Rabbine yönelebilir. Bu isim acziyetin pasiflik değil dua ve gayret bilincine dönüşmesine yardım eder.",
  },
  {
    weekNumber: 23,
    name: "EL-GANÎ",
    meaning: "Mutlak zengin, hiçbir şeye muhtaç olmayan.",
    title: "EL-GANÎ — Mutlak zengin, hiçbir şeye muhtaç olmayan.",
    body: "İnsanın varlığı baştan sona ihtiyaçlarla çevrilidir. Ganî ismi, Allah’ın hiçbir varlığa ve hiçbir sebebe muhtaç olmadığını; aksine bütün varlıkların O’na muhtaç olduğunu öğretir. Bu karşılaştırma insanın bağımsızlık vehmini azaltır ve şükür bilincini artırır.",
  },
  {
    weekNumber: 24,
    name: "ES-SAMED",
    meaning: "Her şeyin kendisine yöneldiği, kendisi hiçbir şeye muhtaç olmayan.",
    title: "ES-SAMED — Her şeyin kendisine yöneldiği, kendisi hiçbir şeye muhtaç olmayan.",
    body: "Samed ismi insanın ihtiyaç tecrübesini tevhid bilincine bağlar. İnsan sebeplere müracaat eder fakat sebepleri mutlaklaştırmaz; nihai dayanma ve yönelişini Allah’a çevirir. Dua bu kulluk ve ihtiyaç bilincinin en açık ifadelerinden biridir.",
  },
  {
    weekNumber: 25,
    name: "EL-FERD",
    meaning: "Tek ve eşsiz olan.",
    title: "EL-FERD — Tek ve eşsiz olan.",
    body: "Ferd ismi Allah’ın zatında eşsizliğini ve ortağının bulunmadığını vurgular. Tevhid yalnız teorik bir bilgi değildir; insanın nihai güvenini, kulluğunu ve yönelişini kime tahsis edeceğini belirler. Bu yüzden Ferd ismi hayatın merkezini tekleştiren bir anlam taşır.",
  },
  {
    weekNumber: 26,
    name: "EL-EHAD",
    meaning: "Birliği bölünmez ve benzersiz olan.",
    title: "EL-EHAD — Birliği bölünmez ve benzersiz olan.",
    body: "Ehad ismi Allah’ın birliğini herhangi bir sayısal birlikten daha derin biçimde ifade eder: O’nun benzeri, dengi ve ortağı yoktur. Kâinattaki bütüncül düzen de tevhid tefekkürüne kapı açar. Bu isim inançta ve kullukta dağınıklığı önler.",
  },
  {
    weekNumber: 27,
    name: "EL-VİTR",
    meaning: "Tek ve eşsiz olan.",
    title: "EL-VİTR — Tek ve eşsiz olan.",
    body: "Vitr ismi Allah’ın tekliğini hatırlatan isimlerdendir. İnsan çokluk içinde yaşasa da varlığın nihai kaynağını ve kulluğun yöneldiği makamı bir bilir. Bu bilinç, Esmâü’l-Hüsnâ’nın çokluğunun farklı ilâhlar değil aynı Allah’ın farklı isimleri olduğunu anlamaya yardım eder.",
  },
  {
    weekNumber: 28,
    name: "EL-BÂKÎ",
    meaning: "Varlığının sonu olmayan.",
    title: "EL-BÂKÎ — Varlığının sonu olmayan.",
    body: "İnsan hayatı, ilişkiler ve maddî imkânlar değişir; dünyadaki hiçbir şey aynı hâlde kalmaz. Bâkî ismi, geçici olanla kalıcı olan arasındaki farkı düşündürür. Bu bilinç dünyayı değersizleştirmez; aksine geçici nimetleri doğru kullanıp kalıcı değerlere yönelmeyi öğretir.",
  },
  {
    weekNumber: 29,
    name: "EL-HAYY",
    meaning: "Ezeli ve ebedî hayat sahibi.",
    title: "EL-HAYY — Ezeli ve ebedî hayat sahibi.",
    body: "Canlıların hayatı verilmiş ve sınırlıdır; Allah’ın hayatı ise başka bir kaynağa bağlı değildir. Hayy ismi, hayat nimetinin kaynağını düşünmeye çağırır. İnsan kendi hayatını sahip olduğu mutlak bir mülk değil, anlamlı ve sorumlu kullanması gereken bir emanet olarak görür.",
  },
  {
    weekNumber: 30,
    name: "EL-KAYYÛM",
    meaning: "Varlığı kendinden, her şeyi ayakta tutan.",
    title: "EL-KAYYÛM — Varlığı kendinden, her şeyi ayakta tutan.",
    body: "Kâinattaki varlıklar birbirine bağlı sebepler içinde hayatını sürdürür. Kayyûm ismi, bütün bu sebepler zincirinin nihai olarak Allah’ın kudret ve idaresine bağlı olduğunu hatırlatır. Bu anlayış insanı sebepleri inkâr etmeye değil, onları mutlaklaştırmamaya götürür.",
  },
  {
    weekNumber: 31,
    name: "EL-ALÎM",
    meaning: "İlmi her şeyi kuşatan.",
    title: "EL-ALÎM — İlmi her şeyi kuşatan.",
    body: "İnsan bilgisi öğrenmeye, zamana ve tecrübeye bağlıdır; bu nedenle sınırlıdır. Alîm ismi, Allah’ın bilgisinin böyle bir sınırlılığa tâbi olmadığını düşündürür. Bunun ahlâkî sonucu, görünürlük için değil Allah’ın bildiği bilinciyle samimi davranmaya çalışmaktır.",
  },
  {
    weekNumber: 32,
    name: "EL-HABÎR",
    meaning: "Her şeyin iç yüzünden haberdar olan.",
    title: "EL-HABÎR — Her şeyin iç yüzünden haberdar olan.",
    body: "Habîr ismi, yalnız görünen davranışların değil niyetlerin ve gizli hâllerin de Allah’ın bilgisi dâhilinde olduğunu hatırlatır. Bu farkındalık ahlâkı dış denetimden iç denetime taşır. İnsan, kimsenin görmediği yerde de doğru kalmanın değerini kavrar.",
  },
  {
    weekNumber: 33,
    name: "ES-SEMÎ",
    meaning: "Her şeyi işiten.",
    title: "ES-SEMÎ — Her şeyi işiten.",
    body: "Semî ismi, dua ve kullukta mesafenin Allah için engel olmadığını öğretir. En sessiz yakarış dahi O’nun işitmesinin dışına çıkmaz. Bu, insanın duasına samimiyet kazandırırken dilini de sorumlu kullanmasını; söylediği sözlerin değerini düşünmesini sağlar.",
  },
  {
    weekNumber: 34,
    name: "EL-BASÎR",
    meaning: "Her şeyi gören.",
    title: "EL-BASÎR — Her şeyi gören.",
    body: "Basîr ismi, insanın görünür ve gizli davranışlarını sorumluluk alanına taşır. İlâhî görme bilinci yalnız korku üretmemeli; insanın iyiliği seyirci için değil hak olduğu için yapmasını sağlamalıdır. Böylece ahlâk, başkalarının bakışından bağımsızlaşır.",
  },
  {
    weekNumber: 35,
    name: "EL-MUCÎB",
    meaning: "Duaya karşılık veren.",
    title: "EL-MUCÎB — Duaya karşılık veren.",
    body: "Mucîb ismi, dua ile insanın acziyetini ve Allah’ın kudretini aynı ilişkide buluşturur. Duanın karşılığı her zaman insanın belirlediği biçim ve zamanda olmak zorunda değildir; fakat dua kulluğun, ümidin ve yönelişin ifadesidir. Bu bilinç dua ile gayreti birbirinin alternatifi olmaktan çıkarır.",
  },
  {
    weekNumber: 36,
    name: "EL-MÜSTEÂN",
    meaning: "Kendinden yardım istenen.",
    title: "EL-MÜSTEÂN — Kendinden yardım istenen.",
    body: "İnsan günlük hayatta pek çok kişiden yardım alır; fakat bütün imkânların nihai kaynağının Allah olduğunu bilmek tevhid bilincidir. Müsteân ismi, sebeplere başvurmakla Allah’a dayanmayı birlikte öğretir. Böylece başarı kibir, başarısızlık da mutlak ümitsizlik üretmez.",
  },
  {
    weekNumber: 37,
    name: "EL-HÂDÎ",
    meaning: "Hidayet eden, doğru yolu gösteren.",
    title: "EL-HÂDÎ — Hidayet eden, doğru yolu gösteren.",
    body: "Bilgiye ulaşmak ile doğru tercihte bulunmak aynı şey değildir. Hâdî ismi, insanın hakikati tanıma ve doğruya yönelme ihtiyacını hatırlatır. Bu nedenle kişi aklını, vahyin rehberliğini ve güvenilir bilgiyi kullanırken Rabbinden de hidayet ister.",
  },
  {
    weekNumber: 38,
    name: "EL-FETTÂH",
    meaning: "Açan, çözüm ve çıkış yolları ihsan eden.",
    title: "EL-FETTÂH — Açan, çözüm ve çıkış yolları ihsan eden.",
    body: "Hayatta bazı kapılar insan gücüyle hemen açılamaz. Fettâh ismi, imkânsız görünen durumlarda bile Allah’ın yeni yollar yaratabileceğini hatırlatır. Bu bilinç tembelliğe değil, sebeplere sarılma, dua ve ümit birlikteliğine çağırır.",
  },
  {
    weekNumber: 39,
    name: "EL-KÂFÎ",
    meaning: "Kullarına yeten.",
    title: "EL-KÂFÎ — Kullarına yeten.",
    body: "Modern insan çok sayıda güvence aracı üretse de mutlak güvenceye sahip değildir. Kâfî ismi, insanın elinden geleni yaptıktan sonra nihai güvenini Allah’a bağlamasını öğretir. Bu, tedbiri terk etmek değil tedbiri ilahlaştırmamaktır.",
  },
  {
    weekNumber: 40,
    name: "EL-EMÂN",
    meaning: "Emniyet ve güven veren.",
    title: "EL-EMÂN — Emniyet ve güven veren.",
    body: "Güven insanın temel ihtiyaçlarındandır; fakat dünyadaki güvenlik araçlarının tamamı sınırlıdır. Emân ismi, kalbin nihai sığınağının Allah olduğunu düşündürür. Tedbir ile tevekkülün birlikte yaşanması, bu ismin hayata yansıyan önemli bir boyutudur.",
  },
  {
    weekNumber: 41,
    name: "EŞ-ŞÂFÎ",
    meaning: "Şifanın gerçek sahibi.",
    title: "EŞ-ŞÂFÎ — Şifanın gerçek sahibi.",
    body: "Tıp, hekim ve ilaç şifaya vesile olan sebeplerdir. Şâfî ismi, sebepleri kullanırken şifayı mutlak biçimde onlara vermemeyi öğretir. Hastalık zamanında tedavi, dua ve sabrı birlikte düşünmek; sağlık zamanında ise nimetin kıymetini bilmek gerekir.",
  },
  {
    weekNumber: 42,
    name: "EL-MUÂFÎ",
    meaning: "Afiyet ihsan eden.",
    title: "EL-MUÂFÎ — Afiyet ihsan eden.",
    body: "Afiyet çoğu zaman kaybedilmeden değeri anlaşılmayan bir nimettir. Muâfî ismi, beden ve ruh sağlığını sıradan bir hak değil şükredilecek bir nimet olarak görmeye çağırır. Bu bakış insanın sağlığını koruma sorumluluğunu da artırır.",
  },
  {
    weekNumber: 43,
    name: "EL-GAFFÂR",
    meaning: "Tekrar tekrar bağışlayan.",
    title: "EL-GAFFÂR — Tekrar tekrar bağışlayan.",
    body: "Gaffâr ismi günahı önemsizleştirmez; aksine hatayı fark etme, pişmanlık, tövbe ve düzeltme kapısını açık tutar. İnsanın geçmiş hatası onun geleceğini bütünüyle belirlemek zorunda değildir. İlâhî bağışlanma ümidi, ahlâkî yenilenmenin önemli bir motivasyonudur.",
  },
  {
    weekNumber: 44,
    name: "ES-SETTÂR",
    meaning: "Kusurları örten.",
    title: "ES-SETTÂR — Kusurları örten.",
    body: "Settâr ismi insan ilişkilerinde mahremiyet ve kusur örtme ahlâkına kapı açar. Bir yanlışı düzeltmek başka, insanları teşhir etmek başkadır. Allah’ın örtücülüğünü düşünen kişi, başkalarının hatalarını dedikodu ve küçük düşürme malzemesi yapmaktan sakınır.",
  },
  {
    weekNumber: 45,
    name: "EL-ADL",
    meaning: "Mutlak adalet sahibi.",
    title: "EL-ADL — Mutlak adalet sahibi.",
    body: "Adl ismi, adaletin kişisel çıkar veya yakınlığa göre değiştirilemeyecek bir değer olduğunu düşündürür. İnsan sınırlı bilgisi nedeniyle her hükmünde kusursuz olamayabilir; Allah’ın adaleti ise eksiklikten uzaktır. Bu inanç, bireyi kendi ilişkilerinde hakkaniyete yöneltir.",
  },
  {
    weekNumber: 46,
    name: "ED-DEYYÂN",
    meaning: "Hesap gören ve karşılık veren.",
    title: "ED-DEYYÂN — Hesap gören ve karşılık veren.",
    body: "Deyyân ismi, insan davranışlarının ahlâkî ağırlığını hatırlatır. İyilik ve kötülüğün bütünüyle sonuçsuz kalmadığı bilinci, sorumluluk duygusunu derinleştirir. İnsan yalnız toplumun gördüğü davranışlarından değil, kendi iradesiyle yaptığı tercihlerden de sorumludur.",
  },
  {
    weekNumber: 47,
    name: "ES-SÂDIKU’L-VA‘D",
    meaning: "Vaadinde sadık olan.",
    title: "ES-SÂDIKU’L-VA‘D — Vaadinde sadık olan.",
    body: "İnsan verdiği sözleri şartlar nedeniyle yerine getiremeyebilir; Allah’ın vaadi ise insan sözü gibi değildir. Sâdıku’l-va‘d ismi, ilâhî vaade güveni besler. Bunun ahlâkî yansıması da insanın kendi sözünü hafife almaması ve güvenilir olmaya çalışmasıdır.",
  },
  {
    weekNumber: 48,
    name: "EL-MAHMÛD",
    meaning: "Hamd ve övgüye layık olan.",
    title: "EL-MAHMÛD — Hamd ve övgüye layık olan.",
    body: "Hamd, nimeti fark edip onu gerçek sahibine nispet etmeyi içerir. Mahmûd ismi, Allah’ın yalnız verdiği nimetler sebebiyle değil kemal ve yüceliği sebebiyle de övgüye layık olduğunu düşündürür. Bu anlayış şükrü yüzeysel bir teşekkürden bilinçli kulluğa taşır.",
  },
  {
    weekNumber: 49,
    name: "EL-MECÎD",
    meaning: "Şanı yüce, ikramı geniş olan.",
    title: "EL-MECÎD — Şanı yüce, ikramı geniş olan.",
    body: "İnsan şöhreti geçici ve başkalarının değerlendirmesine bağlıdır. Mecîd ismi, Allah’ın yüceliğinin böyle bir onaya ihtiyaç duymadığını hatırlatır. Gerçek şeref ve değer arayışını yalnız toplumsal görünürlüğe bağlamamak, bu ismin insana kazandırdığı önemli bir ölçüdür.",
  },
  {
    weekNumber: 50,
    name: "EL-HANNÂN",
    meaning: "Merhameti ve şefkati çok olan.",
    title: "EL-HANNÂN — Merhameti ve şefkati çok olan.",
    body: "Hannân ismi, merhametin yalnız acıma duygusu olmadığını; koruma, yardım etme ve iyiliği isteme boyutları taşıdığını düşündürür. İlâhî şefkati fark eden insan, güçsüzlere karşı sertlik yerine sorumluluk ve merhamet geliştirmeye çalışır.",
  },
  {
    weekNumber: 51,
    name: "EL-MA‘RÛF",
    meaning: "İyilik ve ihsanıyla tanınan.",
    title: "EL-MA‘RÛF — İyilik ve ihsanıyla tanınan.",
    body: "Nimetin sürekli olması bazen fark edilmesini zorlaştırır. Ma‘rûf ismi, alışkanlığın örttüğü iyilikleri yeniden görmeye çağırır. Bilinçli şükür, insanın sahip olduklarını sayması kadar onları doğru amaçlarla kullanmasını da gerektirir.",
  },
  {
    weekNumber: 52,
    name: "EL-BÜRHÂN",
    meaning: "Varlık ve birliğine deliller gösteren.",
    title: "EL-BÜRHÂN — Varlık ve birliğine deliller gösteren.",
    body: "Bürhân ismi, iman ile tefekkür arasındaki ilişkiyi güçlendirir. Kâinattaki düzen, ölçü, hayat ve güzellik yalnız seyredilecek manzaralar değil, anlam üzerinde düşünmeye çağıran işaretler olarak okunabilir. Böylece gözlem, marifetullah yolunda düşünsel bir faaliyete dönüşür.",
  },
  {
    weekNumber: 53,
    name: "EL-GARÎB",
    meaning: "Kuluna yakınlığı ve lütfu alışılmış ölçüleri aşan.",
    title: "EL-GARÎB — Kuluna yakınlığı ve lütfu alışılmış ölçüleri aşan.",
    body: "İnsanın yalnızlık hissi, Allah’ın bilgisinden ve işitmesinden uzak olduğu anlamına gelmez. Kaynak serinin zikrettiği Garîb ismi, kul ile Rabbi arasındaki ilişkinin fiziksel yakınlık ölçüleriyle sınırlanamayacağını düşündürür. Dua ve zikir, bu yakınlık bilincini canlı tutar.",
  },
  {
    weekNumber: 54,
    name: "EL-ATÛF",
    meaning: "Şefkat ve merhametle muamele eden.",
    title: "EL-ATÛF — Şefkat ve merhametle muamele eden.",
    body: "Atûf ismi, merhametin ilişkilerde incelik ve koruyuculuk olarak görünmesini düşündürür. İlâhî şefkat üzerinde tefekkür eden insanın bundan ahlâkî bir pay çıkarması beklenir: kırıcı olmamak, zayıfı gözetmek ve iyiliği karşılık beklemeden yapabilmek.",
  },
  {
    weekNumber: 55,
    name: "ALLAH",
    meaning: "Bütün kemal isim ve sıfatlarını kendinde toplayan Rabbimizin özel ismi.",
    title: "ALLAH — Bütün kemal isim ve sıfatlarını kendinde toplayan Rabbimizin özel ismi.",
    body: "Esmâü’l-Hüsnâ çalışmasının hedefi birbirinden kopuk 55 kavram ezberlemek değildir. Cemîl’den Rahmân’a, Alîm’den Kadîr’e kadar bütün isimler aynı Allah’ı farklı yönleriyle tanımamıza vesile olur. İsimler arasında kurulan bağ, marifeti derinleştirir; marifetin hedefi ise iman, muhabbet, şükür, tefekkür ve kulluk bilincini güçlendirmektir.",
  },
] as const;

/**
 * Belirtilen sınıf (1-6) için 55 haftalık Esmâü'l-Hüsnâ müfredat girişlerini üretir.
 * - 1, 2, 3. sınıflar: Ortaokul müfredatı
 * - 4, 5, 6. sınıflar: Lise müfredatı
 * - Hafta 1-16: Eylül - Aralık 2026 (4 ay x 4 hafta)
 * - Hafta 17-48: Ocak - Ağustos 2027 (8 ay x 4 hafta)
 * - Hafta 49-55: Ekstra 1-7 (48 haftalık standart müfredat kuralı sonrası ilave kartlar)
 */
export function getEsmaEntriesForGrade(grade: number): CurriculumEntry[] {
  const items = grade <= 3 ? ortaokulEsmaCurriculum : liseEsmaCurriculum;

  return items.map((item) => {
    if (item.weekNumber <= 48) {
      const monthIndex = Math.floor((item.weekNumber - 1) / 4); // 0..11
      const month = monthIndex < 4 ? 9 + monthIndex : monthIndex - 3;
      const year = monthIndex < 4 ? 2026 : 2027;
      const weekInMonth = ((item.weekNumber - 1) % 4) + 1;
      const id = makeEsmaEntryId(month, weekInMonth, grade, false);

      return {
        id,
        grade,
        categoryId: "esma",
        month,
        week: weekInMonth,
        year,
        isExtra: false,
        title: item.title,
        body: item.body,
      };
    }

    const extraOrder = item.weekNumber - 48; // 1..7
    const id = makeEsmaEntryId(8, 4, grade, true, extraOrder);

    return {
      id,
      grade,
      categoryId: "esma",
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
 * 6 Belçika sınıfı için tüm Esmâü'l-Hüsnâ kayıtlarını döner (toplam 330 kayıt).
 */
export function getAllEsmaEntries(): CurriculumEntry[] {
  const all: CurriculumEntry[] = [];
  for (let grade = 1; grade <= 6; grade++) {
    all.push(...getEsmaEntriesForGrade(grade));
  }
  return all;
}

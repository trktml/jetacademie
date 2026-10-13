import type { CurriculumEntry } from "@/lib/curriculum";

export interface TefekkurCurriculumItem {
  readonly weekNumber: number;
  readonly grade: number;
  readonly month: number;
  readonly weekInMonth: number;
  readonly year: number;
  readonly title: string;
  readonly summary: string;
  readonly body: string;
  readonly youtubeUrl: string;
}

const monthSlugs: Record<number, string> = {
  9: "eylul",
  10: "ekim",
};

function makeTefekkurEntryId(month: number, week: number, grade: number = 1): string {
  const prefix = grade === 1 ? "" : `g${grade}-`;
  const monthSlug = monthSlugs[month] ?? `m${month}`;
  return `${prefix}tefekkur-${monthSlug}-${week}`;
}

export const tefekkurCurriculumItems: readonly TefekkurCurriculumItem[] = [
  // --- 1. Hafta (Eylül · 1) ---
  {
    weekNumber: 1,
    grade: 1,
    month: 9,
    weekInMonth: 1,
    year: 2026,
    title: "Tembel Hayvanların Yüzme Sanatı",
    summary:
      "Ağaçlarda son derece yavaş hareket eden tembel hayvanların, orman parçaları arasında geçiş yapabilmek için suda ne denli ustaca yüzdüğünü tefekkür ediyoruz. Her canlıya fıtratına uygun kabiliyetler bahşeden İlahi rahmetin tecellisi.",
    body: "Ağaçlarda son derece yavaş hareket eden tembel hayvanların, orman parçaları arasında geçiş yapabilmek için suda ne denli ustaca yüzdüğünü tefekkür ediyoruz. Her canlıya ihtiyacı olan kabiliyetleri eksiksiz bağışlayan sonsuz ilim ve kudretin harika bir tecellisi.",
    youtubeUrl: "https://www.youtube.com/watch?v=3vTqnWF4tnc",
  },
  {
    weekNumber: 1,
    grade: 2,
    month: 9,
    weekInMonth: 1,
    year: 2026,
    title: "Ganj Timsahı Yavrularının Nehri Keşfi",
    summary:
      "Kadim Gandak Nehri'nde hayata gözlerini açan sevimli timsah yavrularının hayata tutunma mücadelesi ve yaratılıştaki kusursuz sevk-i İlahi.",
    body: "Kadim Gandak Nehri'nde hayata gözlerini açan sevimli timsah yavrularının hayata tutunma mücadelesi ve yaratılıştaki kusursuz sevk-i İlahi. Henüz minicikken akıntıyla baş etmeyi öğrenen bu canlılar, kâinattaki şefkat ve koruma kanununun birer ayetidir.",
    youtubeUrl: "https://www.youtube.com/watch?v=78lPSKBQMe4",
  },
  {
    weekNumber: 1,
    grade: 3,
    month: 9,
    weekInMonth: 1,
    year: 2026,
    title: "Tepeli Pelikanın İhtişamı",
    summary:
      "Tatlı su kuşlarının en görkemlilerinden biri olan Tepeli Pelikanın anatomisindeki hassas denge ve yakın plandan tüylerinin hayranlık uyandıran mimarisi.",
    body: "Tatlı su kuşlarının en görkemlilerinden biri olan Tepeli Pelikanın anatomisindeki hassas denge ve yakın plandan tüylerinin hayranlık uyandıran mimarisi. Havada ve suda yaşamaya elverişli kanat ve gaga yapısı, İlahi sanatın eşsiz zarafetini gözler önüne serer.",
    youtubeUrl: "https://www.youtube.com/watch?v=u_AI7HQHfAs",
  },
  {
    weekNumber: 1,
    grade: 4,
    month: 9,
    weekInMonth: 1,
    year: 2026,
    title: "Güneşgülü: Böcek Kapan Harika Bitki",
    summary:
      "Cape sundew (Güneşgülü) bitkisinin avlanma mekanizması; bitkiler âlemindeki olağanüstü biyolojik tasarım ve rızık kanununun hikmetleri.",
    body: "Cape sundew (Güneşgülü) bitkisinin avlanma mekanizması; bitkiler âlemindeki olağanüstü biyolojik tasarım ve rızık kanununun hikmetleri. Toprakta bulamadığı besini havadaki böceklerle karşılayan bu mucizevi bitki, Razzâk-ı Hakiki'nin sonsuz hikmetine ayna tutar.",
    youtubeUrl: "https://www.youtube.com/watch?v=ScEP3lg9zP4",
  },
  {
    weekNumber: 1,
    grade: 5,
    month: 9,
    weekInMonth: 1,
    year: 2026,
    title: "Denizanası ve Derinliklerin Huzuru",
    summary:
      "Okyanusların derinliklerinde adeta suyla birleşmiş gibi süzülen denizanalarının ritmik hareketleri ve kâinattaki dinlendirici ahenk.",
    body: "Okyanusların derinliklerinde adeta suyla birleşmiş gibi süzülen denizanalarının ritmik hareketleri ve kâinattaki dinlendirici ahenk. Beyin ve kemik yapısı olmaksızın mükemmel bir dengeyle hareket eden bu zarif varlıklar, derin denizlerdeki gizli tecellileri fısıldar.",
    youtubeUrl: "https://www.youtube.com/watch?v=VSH5voVeh-o",
  },
  {
    weekNumber: 1,
    grade: 6,
    month: 9,
    weekInMonth: 1,
    year: 2026,
    title: "Tavus Kuşunun Büyüleyici Nakışları",
    summary:
      "Tavus kuşunun kuyruk tüylerindeki renk armonisi, optik düzen ve hiçbir fırçanın taklit edemeyeceği İlahi nakışların temaşası.",
    body: "Tavus kuşunun kuyruk tüylerindeki renk armonisi, optik düzen ve hiçbir fırçanın taklit edemeyeceği İlahi nakışların temaşası. Her bir tüy tanesinde parıldayan göz motifleri ve kristal ışıltılar, Sanî-i Zülcelal'in kâinattaki estetik tecellisini sergiler.",
    youtubeUrl: "https://www.youtube.com/watch?v=uLDy6U4jZ2k",
  },

  // --- 2. Hafta (Eylül · 2) ---
  {
    weekNumber: 2,
    grade: 1,
    month: 9,
    weekInMonth: 2,
    year: 2026,
    title: "İzlanda Volkanlarının Gizemi",
    summary:
      "Yerkürenin derinliklerindeki akıl almaz sıcaklık ve yeryüzüne lavlar halinde fışkıran volkanik güç karşısında insanın hayreti ve tefekkürü.",
    body: "Yerkürenin derinliklerindeki akıl almaz sıcaklık ve yeryüzüne lavlar halinde fışkıran volkanik güç karşısında insanın hayreti ve tefekkürü. Yeryüzünün altındaki bu kaynayan enerji, hem dünyanın dinamik dengesini hem de Kudret-i İlahiye'nin azametini gösterir.",
    youtubeUrl: "https://www.youtube.com/watch?v=9GXwMUjr54I",
  },
  {
    weekNumber: 2,
    grade: 2,
    month: 9,
    weekInMonth: 2,
    year: 2026,
    title: "Renk Cümbüşü Kuşlar",
    summary:
      "Doğanın paletindeki en canlı renklerle bezenmiş kuşların canlılığı ve kanat çırpışlarındaki neşe dolu sanat.",
    body: "Doğanın paletindeki en canlı renklerle bezenmiş kuşların canlılığı ve kanat çırpışlarındaki neşe dolu sanat. Gökyüzünün bu sevimli sakinleri, Yaratıcı'nın güzelliğe ve renklere verdiği değeri gözler önüne serer.",
    youtubeUrl: "https://www.youtube.com/watch?v=aYuSVcwfzZQ",
  },
  {
    weekNumber: 2,
    grade: 3,
    month: 9,
    weekInMonth: 2,
    year: 2026,
    title: "Küçük ve Çevik Gelincik",
    summary:
      "Minyatür boyutuna rağmen inanılmaz derecede hızlı, çevik ve cesur bir yapıya sahip olan gelinciğin fıtri donanımı.",
    body: "Minyatür boyutuna rağmen inanılmaz derecede hızlı, çevik ve cesur bir yapıya sahip olan gelinciğin fıtri donanımı. Kar beyazı kış kürkünden esnek omurgasına kadar her uzvu, tabiatın zor şartlarında yaşamaya göre hassasça ayarlanmıştır.",
    youtubeUrl: "https://www.youtube.com/watch?v=Lk_oI04WKpg",
  },
  {
    weekNumber: 2,
    grade: 4,
    month: 9,
    weekInMonth: 2,
    year: 2026,
    title: "Kuşların Sevgi ve Şefkat Dili",
    summary:
      "Kuşlar âlemindeki kur hareketleri, birbirine özen gösterme ve temizleme davranışlarındaki samimi şefkat tecellileri.",
    body: "Kuşlar âlemindeki kur hareketleri, birbirine özen gösterme ve temizleme davranışlarındaki samimi şefkat tecellileri. Sevgi ve merhametin yalnızca insana has olmadığını, tüm canlılar alemine ilham edilmiş evrensel bir bağ olduğunu hatırlatır.",
    youtubeUrl: "https://www.youtube.com/watch?v=AWaD8eijVdw",
  },
  {
    weekNumber: 2,
    grade: 5,
    month: 9,
    weekInMonth: 2,
    year: 2026,
    title: "Nadir Görülen Beyaz Penguen",
    summary:
      "Antarktika'nın buzulları arasında ender rastlanan beyaz renkli penguenin asil duruşu ve kâinattaki çeşitliliğin sürprizleri.",
    body: "Antarktika'nın buzulları arasında ender rastlanan beyaz renkli penguenin asil duruşu ve kâinattaki çeşitliliğin sürprizleri. Milyonlarca benzer tür arasında böyle benzersiz bir nakşın ortaya çıkması, Yaratılışın tekdüze bir tesadüf değil, her an taze bir irade eseri olduğunu gösterir.",
    youtubeUrl: "https://www.youtube.com/watch?v=yB6e6aNQniA",
  },
  {
    weekNumber: 2,
    grade: 6,
    month: 9,
    weekInMonth: 2,
    year: 2026,
    title: "Kırmızı Kardinal Kuşunun Zarafeti",
    summary:
      "Karlı beyaz örtünün üzerinde alev gibi parıldayan kırmızı kardinal kuşunun göz alıcı güzelliği ve estetik yaratılış.",
    body: "Karlı beyaz örtünün üzerinde alev gibi parıldayan kırmızı kardinal kuşunun göz alıcı güzelliği ve estetik yaratılış. Kışın soğuk ve renksiz günlerinde içimizi ısıtan bu tablo, Rahman'ın kullarına sunduğu lütufkâr bir tebessümdür.",
    youtubeUrl: "https://www.youtube.com/watch?v=8JI4knark24",
  },

  // --- 3. Hafta (Eylül · 3) ---
  {
    weekNumber: 3,
    grade: 1,
    month: 9,
    weekInMonth: 3,
    year: 2026,
    title: "Sevimli Fok Balığının Huzuru",
    summary:
      "Kıyı kayalıklarında güneşlenen ve dinlenen sevimli fokun dinginliği; doğadaki huzur ve itminan ritmi.",
    body: "Kıyı kayalıklarında güneşlenen ve dinlenen sevimli fokun dinginliği; doğadaki huzur ve itminan ritmi. Yaratılış gayesine uygun yaşayan her varlığın içindeki o masum huzur, insanın da kendi fıtratına dönmesi gerektiğine işaret eder.",
    youtubeUrl: "https://www.youtube.com/watch?v=PqDHoeBvSZQ",
  },
  {
    weekNumber: 3,
    grade: 2,
    month: 9,
    weekInMonth: 3,
    year: 2026,
    title: "Doğadaki Zarif Alageyikler",
    summary:
      "Ormanların asil sakinleri olan alageyiklerin karlı tabiatta heybetli boynuzları ve zarif yürüyüşleriyle sergiledikleri asalet.",
    body: "Ormanların asil sakinleri olan alageyiklerin karlı tabiatta heybetli boynuzları ve zarif yürüyüşleriyle sergiledikleri asalet. Her adımındaki ölçü ve dikkat, vahşi doğanın dahi bir kanun ve nizam dairesinde işlediğini gösterir.",
    youtubeUrl: "https://www.youtube.com/watch?v=Xp0CpBJucR4",
  },
  {
    weekNumber: 3,
    grade: 3,
    month: 9,
    weekInMonth: 3,
    year: 2026,
    title: "Yalıçapkını: Doğanın Usta Dalgıcı",
    summary:
      "Havada asılı kalıp suyun altındaki balığı milimetrik bir hesapla yakalayan yalıçapkınının aerodinamik gaga ve göz tasarımı.",
    body: "Havada asılı kalıp suyun altındaki balığı milimetrik bir hesapla yakalayan yalıçapkınının aerodinamik gaga ve göz tasarımı. Suyun kırılma açısını kusursuzca telafi eden görme sistemi, modern yüksek hızlı trenlerin burnuna dahi ilham kaynağı olmuştur.",
    youtubeUrl: "https://www.youtube.com/watch?v=eFwxpetgEzM",
  },
  {
    weekNumber: 3,
    grade: 4,
    month: 9,
    weekInMonth: 3,
    year: 2026,
    title: "Deniz Kaplumbağası Yavrularının İlk Yolculuğu",
    summary:
      "Yumurtadan çıkar çıkmaz hiç görmedikleri devasa okyanusa doğru koşuşturan minik kaplumbağaların kalbine yerleştirilen ilahi pusula.",
    body: "Yumurtadan çıkar çıkmaz hiç görmedikleri devasa okyanusa doğru koşuşturan minik kaplumbağaların kalbine yerleştirilen ilahi pusula. Kimsenin öğretmediği bir rotayı şaşırmadan takip etmeleri, onların mutlak bir Sevk-i İlahi ile yönlendirildiğinin en açık delilidir.",
    youtubeUrl: "https://www.youtube.com/watch?v=dlOU2J_TwBU",
  },
  {
    weekNumber: 3,
    grade: 5,
    month: 9,
    weekInMonth: 3,
    year: 2026,
    title: "Dikenli Denizatı ve Okyanus Zarafeti",
    summary:
      "Mercanların arasında kamufle olan dikenli denizatının sıra dışı biyolojisi ve denizler alemindeki eşsiz estetik.",
    body: "Mercanların arasında kamufle olan dikenli denizatının sıra dışı biyolojisi ve denizler alemindeki eşsiz estetik. Kuyruğuyla yosunlara tutunan ve suyun akıntısında zarafetle dik duran bu minik canlı, Yaratıcı'nın zengin sanatını temsil eder.",
    youtubeUrl: "https://www.youtube.com/watch?v=KZWaWB_kXEw",
  },
  {
    weekNumber: 3,
    grade: 6,
    month: 9,
    weekInMonth: 3,
    year: 2026,
    title: "Kutup Martısının Renk Değiştiren Gagası",
    summary:
      "Puffin (Kutup Martısı) kuşunun mevsime göre renk değiştiren gagası ve kutup kıyılarındaki canlılığın hikmetleri.",
    body: "Puffin (Kutup Martısı) kuşunun mevsime göre renk değiştiren gagası ve kutup kıyılarındaki canlılığın hikmetleri. Üreme döneminde parlak turuncu ve sarı renklere bürünen bu gaga, kışın sadeliğe döner; kâinatta hiçbir detayın gayesiz olmadığını kanıtlar.",
    youtubeUrl: "https://www.youtube.com/watch?v=qmfs1K8qxrE",
  },

  // --- 4. Hafta (Eylül · 4) ---
  {
    weekNumber: 4,
    grade: 1,
    month: 9,
    weekInMonth: 4,
    year: 2026,
    title: "Sevimli Dağ Sıçanı (Marmot)",
    summary:
      "Alp çayırlarında iki ayağı üstüne dikilerek çevreyi gözetleyen marmotun sempatik hareketleri ve topluluk içindeki yardımlaşma dili.",
    body: "Alp çayırlarında iki ayağı üstüne dikilerek çevreyi gözetleyen marmotun sempatik hareketleri ve topluluk içindeki yardımlaşma dili. Bir tehlike anında ıslık çalarak tüm koloniyi uyaran bu sevimli canlı, fıtrata yerleştirilmiş dayanışma ahlakını gösterir.",
    youtubeUrl: "https://www.youtube.com/watch?v=WrboUW0nrq0",
  },
  {
    weekNumber: 4,
    grade: 2,
    month: 9,
    weekInMonth: 4,
    year: 2026,
    title: "Pofuduk Kaşif: Baykuş Yavrusu",
    summary:
      "Yumuşacık tüyleri ve koca meraklı gözleriyle dünyayı keşfetmeye çalışan minik baykuş yavrusunun sevimliliği.",
    body: "Yumuşacık tüyleri ve koca meraklı gözleriyle dünyayı keşfetmeye çalışan minik baykuş yavrusunun sevimliliği. Gece karanlığında en küçük çıtırtıyı bile duyan kulakları ve mükemmel gece görüşü, her canlıya özel ihsan edilen nimetlerin bir örneğidir.",
    youtubeUrl: "https://www.youtube.com/watch?v=q0gReLz2efU",
  },
  {
    weekNumber: 4,
    grade: 3,
    month: 9,
    weekInMonth: 4,
    year: 2026,
    title: "Gece Avcısı Yarasa",
    summary:
      "Zifiri karanlıkta ses dalgalarıyla kusursuz sonar haritalandırması yaparak yönünü bulan yarasanın hayret verici anatomisi.",
    body: "Zifiri karanlıkta ses dalgalarıyla kusursuz sonar haritalandırması yaparak yönünü bulan yarasanın hayret verici anatomisi. Gözleriyle değil çıkardığı frekansların yankısıyla havada uçan en küçük sineği dahi yakalayabilen bu uçan memeli, teknolojiye meydan okuyan ilahi bir mühendislik harikasıdır.",
    youtubeUrl: "https://www.youtube.com/watch?v=S3d9vEOOPjQ",
  },
  {
    weekNumber: 4,
    grade: 4,
    month: 9,
    weekInMonth: 4,
    year: 2026,
    title: "Atıştırmalık Bekleyen Sevimli Fok",
    summary:
      "Beslenmek için sabırla bekleyen fokun mizahi ve sevimli bakışları; yaratılıştaki rızık bekleme ve tevekkül hali.",
    body: "Beslenmek için sabırla bekleyen fokun mizahi ve sevimli bakışları; yaratılıştaki rızık bekleme ve tevekkül hali. Buzlu denizlerin bu tombul sakinleri, doğadaki masumiyeti ve samimi rızık arayışını temsil eder.",
    youtubeUrl: "https://www.youtube.com/watch?v=MX7_nWK6Cic",
  },
  {
    weekNumber: 4,
    grade: 5,
    month: 9,
    weekInMonth: 4,
    year: 2026,
    title: "Nadide ve Zarif Kuş Türleri",
    summary:
      "Doğada çok nadir rastlanan, asil tüy yapıları ve zarif hareketleriyle göz kamaştıran kuşların gizli güzellikleri.",
    body: "Doğada çok nadir rastlanan, asil tüy yapıları ve zarif hareketleriyle göz kamaştıran kuşların gizli güzellikleri. İnsan gözünün nadiren ulaştığı ücra köşelerde bile en yüksek zarafetle yaratılmış olmaları, kâinatın her noktasındaki mutlak güzellik gayesini fısıldar.",
    youtubeUrl: "https://www.youtube.com/watch?v=KMD4vNy8v7I",
  },
  {
    weekNumber: 4,
    grade: 6,
    month: 9,
    weekInMonth: 4,
    year: 2026,
    title: "Pelikanın Şaşırtıcı Esnemesi",
    summary:
      "Devasa gagasını ve esnek kesesini gerdirerek esneyen pelikanın şaşırtıcı anatomisi ve biyolojik fonksiyonelliği.",
    body: "Devasa gagasını ve esnek kesesini gerdirerek esneyen pelikanın şaşırtıcı anatomisi ve biyolojik fonksiyonelliği. Balıkları kepçe gibi toplayıp fazla suyu süzen bu mükemmel kese, mühendislik harikası bir organik filtredir.",
    youtubeUrl: "https://www.youtube.com/watch?v=zm-kAHum6Hs",
  },

  // --- 5. Hafta (Ekim · 1) ---
  {
    weekNumber: 5,
    grade: 1,
    month: 10,
    weekInMonth: 1,
    year: 2026,
    title: "Uçan Balıkların Kanat Çırpışı",
    summary:
      "Denizin altından fırlayıp yüzlerce metre boyunca havanın üzerinde süzülen uçan balıkların hayret verici kanat yüzgeçleri.",
    body: "Denizin altından fırlayıp yüzlerce metre boyunca havanın üzerinde süzülen uçan balıkların hayret verici kanat yüzgeçleri. Hem suda yüzüp hem havada süzülebilen bu canlılar, canlılar âlemindeki sınırsız yaratılış çeşitliliğinin bir kanıtıdır.",
    youtubeUrl: "https://www.youtube.com/watch?v=8x8QoaydQqw",
  },
  {
    weekNumber: 5,
    grade: 2,
    month: 10,
    weekInMonth: 1,
    year: 2026,
    title: "Kolombiya'nın Şeffaf Cam Kurbağası",
    summary:
      "Derisi tamamen şeffaf olan, atan kalbi ve iç organları dışarıdan gözlemlenebilen cam kurbağasının akıl almaz yaratılışı.",
    body: "Kolombiya yağmur ormanlarında yaşayan cam kurbağasının derisi adeta bir pencere gibidir. İç organlarının ve atan kalbinin çıplak gözle görülebildiği bu mucizevi canlı, İlahi sanatın şeffaflık ve kamuflaj alanındaki benzersiz bir mucizesidir.",
    youtubeUrl: "https://www.youtube.com/watch?v=Z5VvU4PxF28",
  },
  {
    weekNumber: 5,
    grade: 3,
    month: 10,
    weekInMonth: 1,
    year: 2026,
    title: "Sualtında Huzur Arayan Fok",
    summary:
      "Denizin mavi derinliklerinde adeta yerçekimsiz bir ortamdaymış gibi süzülen fok balığının dingin tefekkürü.",
    body: "Denizin mavi derinliklerinde adeta yerçekimsiz bir ortamdaymış gibi süzülen fok balığının dingin tefekkürü. Suyun altında dakikalarca nefesini tutup kalp atışlarını yavaşlatabilen fizyolojisi, derin denizlere uygun bir rahmet mucizesidir.",
    youtubeUrl: "https://www.youtube.com/watch?v=chS1bOkhZVc",
  },
  {
    weekNumber: 5,
    grade: 4,
    month: 10,
    weekInMonth: 1,
    year: 2026,
    title: "Erkek Kuşların Eşsiz Şarkısı",
    summary:
      "Dal uçlarına tünemiş kuşların iki notalı büyüleyici melodileri; doğadaki müzikal ahenk ve fıtri terennümler.",
    body: "Dal uçlarına tünemiş kuşların iki notalı büyüleyici melodileri; doğadaki müzikal ahenk ve fıtri terennümler. Her kuş türünün kendine has frekans ve besteyle ötmesi, kainat korosunun her ferdinin Yaratıcı'yı kendi lisanıyla tesbih ettiğini düşündürür.",
    youtubeUrl: "https://www.youtube.com/watch?v=DOPrFE1wRp0",
  },
  {
    weekNumber: 5,
    grade: 5,
    month: 10,
    weekInMonth: 1,
    year: 2026,
    title: "Süzülen Su Samuru",
    summary:
      "Suyun yüzeyinde sırtüstü kayarak neşeyle hareket eden su samurunun su geçirmez kürk tasarımı ve akrobatik yeteneği.",
    body: "Suyun yüzeyinde sırtüstü kayarak neşeyle hareket eden su samurunun su geçirmez kürk tasarımı ve akrobatik yeteneği. Bir santimetrekareye düşen yüz binlerce kıl kökü sayesinde derisi hiç ıslanmayan bu canlı, soğuk sularda kusursuz bir korumaya sahiptir.",
    youtubeUrl: "https://www.youtube.com/watch?v=hmFjSb9U1n4",
  },
  {
    weekNumber: 5,
    grade: 6,
    month: 10,
    weekInMonth: 1,
    year: 2026,
    title: "Uçuş Halindeki Tavus Kuşu",
    summary:
      "Metrelerce uzunluktaki rengarenk kuyruğuna rağmen göğe yükselip kanat çırpan tavus kuşunun havadaki görkemli silueti.",
    body: "Metrelerce uzunluktaki rengarenk kuyruğuna rağmen göğe yükselip kanat çırpan tavus kuşunun havadaki görkemli silueti. Ağır kuyruk teleklerine rağmen havalanabilen bu ihtişamlı kuş, estetik ile aerodinamik gücün harikulade bir buluşmasıdır.",
    youtubeUrl: "https://www.youtube.com/watch?v=k_zju7CPZd0",
  },

  // --- 6. Hafta (Ekim · 2) ---
  {
    weekNumber: 6,
    grade: 1,
    month: 10,
    weekInMonth: 2,
    year: 2026,
    title: "Çölün Boynuzlu Engereği",
    summary:
      "Kızgın kumların üzerinde yan yan süzülerek ayak izi bırakmadan ilerleyen boynuzlu engereğin özel pulları ve çöl uyumu.",
    body: "Kızgın kumların üzerinde yan yan süzülerek neredeyse kumla temasını minimuma indirip ilerleyen boynuzlu engereğin özel pulları ve çöl uyumu. Aşırı sıcakta bedenini koruyan bu hareket tarzı, zorlu şartlara karşı canlıya bahşedilen ilhamın örneğidir.",
    youtubeUrl: "https://www.youtube.com/watch?v=2-zY6MQ8yRY",
  },
  {
    weekNumber: 6,
    grade: 2,
    month: 10,
    weekInMonth: 2,
    year: 2026,
    title: "Dünyanın En Zeki Kuşları: Kuzgunlar",
    summary:
      "Alet kullanabilen, problemleri çözen ve hafızalarıyla insanları hayrete düşüren kuzgunların sıra dışı zekâsı.",
    body: "Alet kullanabilen, bulmacaları aşamalı olarak çözen ve karmaşık sosyal bağlar kuran kuzgunların akıl almaz zekâsı. Minik bir kuş beynine sığdırılan bu yüksek kavrayış kapasitesi, kâinattaki hikmetin ve ilmin sonsuzluğunu hatırlatır.",
    youtubeUrl: "https://www.youtube.com/watch?v=BxIZfXA5-3E",
  },
  {
    weekNumber: 6,
    grade: 3,
    month: 10,
    weekInMonth: 2,
    year: 2026,
    title: "Sualtının Gökkuşağı: Mercan Resifleri",
    summary:
      "Binlerce canlının bir arada yaşadığı rengarenk mercan resifleri ve deniz dibindeki akıl almaz ekosistem dengesi.",
    body: "Binlerce canlının bir arada yaşadığı rengarenk mercan resifleri ve deniz dibindeki akıl almaz ekosistem dengesi. Her bir mercanın ve balığın bir diğerine fayda sağladığı bu sualtı cenneti, kâinattaki muazzam yardımlaşma ve nizam kanununu ilan eder.",
    youtubeUrl: "https://www.youtube.com/watch?v=BtYi6l3T3RI",
  },
  {
    weekNumber: 6,
    grade: 4,
    month: 10,
    weekInMonth: 2,
    year: 2026,
    title: "Amazon Yağmur Ormanlarının Muhafızları",
    summary:
      "Dünyanın akciğerleri olan Amazon ormanlarındaki zengin biyoçeşitlilik ve yaratılış mirasını korumanın kutsiyeti.",
    body: "Dünyanın oksijen deposu olan Amazon havzasındaki milyonlarca canlı türü ve bu tabiat mirasını koruyan yerlilerin mücadelesi. Yeryüzünün her köşesindeki bu dengeyi muhafaza etmek, insana emanet edilen hilafet sorumluluğunun bir parçasıdır.",
    youtubeUrl: "https://www.youtube.com/watch?v=RECOMngbA6Y",
  },
  {
    weekNumber: 6,
    grade: 5,
    month: 10,
    weekInMonth: 2,
    year: 2026,
    title: "Doğada Su Molası Veren Geyik",
    summary:
      "Duru bir su kenarında susuzluğunu gideren masum geyiğin zarafeti ve hayat kaynağı olan suyun mucizesi.",
    body: "Duru bir su kenarında susuzluğunu gideren masum geyiğin zarafeti ve hayat kaynağı olan suyun mucizesi. Gökyüzünden indirilen tertemiz bir damla suyun milyonlarca canlının hayatını nasıl idame ettirdiğini tefekkür ediyoruz.",
    youtubeUrl: "https://www.youtube.com/watch?v=0VJWV9W_TiA",
  },
  {
    weekNumber: 6,
    grade: 6,
    month: 10,
    weekInMonth: 2,
    year: 2026,
    title: "Kuşların Eş Seçme Yarışı",
    summary:
      "Hızlı kanat çırpışları ve havada yaptıkları senkronize danslarla tabiatta hayatın sürekliliğini sağlayan kuşların yarışı.",
    body: "Hızlı kanat çırpışları ve havada yaptıkları senkronize danslarla tabiatta neslin devamını sağlayan kuşların yarışı. Enerji, ritim ve zarafet dolu bu sahneler, Yaratıcı'nın hayatı her bahar nasıl yeniden canlandırdığını gösterir.",
    youtubeUrl: "https://www.youtube.com/watch?v=7rXcB9e-Lvg",
  },
];

/**
 * Belirtilen sınıf (1-6) için 6 haftalık Tefekkür müfredat girişlerini üretir.
 */
export function getTefekkurEntriesForGrade(grade: number): CurriculumEntry[] {
  const gradeItems = tefekkurCurriculumItems.filter((item) => item.grade === grade);

  return gradeItems.map((item) => {
    const id = makeTefekkurEntryId(item.month, item.weekInMonth, grade);
    return {
      id,
      grade,
      categoryId: "tefekkur",
      month: item.month,
      week: item.weekInMonth,
      year: item.year,
      isExtra: false,
      title: item.title,
      body: item.body,
      resourceUrl: item.youtubeUrl,
    };
  });
}

/**
 * 6 Belçika sınıfının tamamı için toplam 36 Tefekkür kaydını döner.
 */
export function getAllTefekkurEntries(): CurriculumEntry[] {
  const all: CurriculumEntry[] = [];
  for (let grade = 1; grade <= 6; grade++) {
    all.push(...getTefekkurEntriesForGrade(grade));
  }
  return all;
}

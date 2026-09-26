/**
 * JetAcademie Yıllık Planlar ve Kazanımlar Veri Havuzu (M1–M6)
 *
 * mufredat-docs/planlar/Alti_Yillik_Mufredat_36_Hafta.md dokümanından derlenmiştir.
 * 6 sınıf, 54 ünite ve 216 haftalık kapsamlı kazanım, maksat ve müfredat akışını içerir.
 */

export interface PlanWeek {
  readonly weekNumber: number;
  readonly topic: string;
  readonly purpose: string;
  readonly mainQuestion: string;
  readonly primarySource: string;
  readonly isFamilyRespectHighlight?: boolean;
}

export interface PlanUnit {
  readonly unitNumber: number;
  readonly title: string;
  readonly period: string;
  readonly weeks: readonly PlanWeek[];
}

export interface GradePlan {
  readonly grade: number;
  readonly code: string;
  readonly schoolLevel: string;
  readonly title: string;
  readonly stage: string;
  readonly motto: string;
  readonly yearEndOutcome: string;
  readonly outcomeStatement: string;
  readonly coreGoals: readonly string[];
  readonly methodSteps: readonly string[];
  readonly familyRespectFocus: string;
  readonly units: readonly PlanUnit[];
}

export const curriculumPlans: readonly GradePlan[] = [
  {
    grade: 1,
    code: "M1",
    schoolLevel: "Ortaokul 1",
    title: "M1 Ortaokul 1 36 Haftalık Yıllık Planı",
    stage: "Merak, Hayret ve Muhabbet",
    motto: "Merak ediyorum, dinliyorum, tanımak ve okumak istiyorum.",
    yearEndOutcome:
      "Yıl sonunda kendisine verilen kısa bir bölümü gönüllü biçimde açıp okumaya istek duyması.",
    outcomeStatement:
      "Risale-i Nur bana yabancı gelmiyor. Bazı temsilleri ve konuları biliyorum. Merak ettiğimde kısa bir bölümü açıp okumak istiyorum.",
    coreGoals: [
      "Risale-i Nur’u tanıması ve metne karşı yabancılık hissinin azalması.",
      "Bediüzzaman ve Hocaefendi ile güvenilir kaynaklar üzerinden sıcak bir ilk bağ kurması.",
      "Kısa Risale metinlerini dinleyip okumaya başlaması; temsillerin ana fikrini kavraması.",
      "İman, kulluk, zaman, emanet, tevekkül, tefekkür, dua, şükür, uhuvvet, ihlâs, gençlik ve ümit gibi temel değerlerle Risale üzerinden tanışması.",
    ],
    methodSteps: ["MERAK ET", "OKU", "SOR", "ANLA", "HAYATINLA İLİŞKİLENDİR"],
    familyRespectFocus: "Teşekkür, sevgi, güzel söz, küçük hizmet.",
    units: [
      {
        unitNumber: 1,
        title: "1. Ünite — Tanışma, Merak ve Okuma Kültürü",
        period: "1–4. Haftalar",
        weeks: [
          {
            weekNumber: 1,
            topic: "Benim Büyük Sorularım",
            purpose:
              "Kendi merak ettiğimiz varlık ve hayat sorularını fark etmek ve sormaya cesaret etmek.",
            mainQuestion:
              "İnsan nereden geldiğini, nereye gittiğini ve neden var olduğunu neden merak eder?",
            primarySource: "Giriş ve tefekkür bahisleri; Birinci Söz başlangıcı",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 2,
            topic: "Bu Eser Neden Hâlâ Okunuyor?",
            purpose:
              "Risale-i Nur’un çağlar üstü etkisini ve günümüz insanının sorularına verdiği cevapları anlamak.",
            mainQuestion:
              "Bu kadar farklı insanın yıllardır okuduğu, çoğalttığı ve araştırdığı bir eserde ne var?",
            primarySource: "Risale-i Nur’a giriş; Birinci Söz’den ilk temas",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 3,
            topic: "Bediüzzaman Kimdir?",
            purpose: "Eserin müellifinin hayat mücadelesini, ilim aşkını ve samimiyetini tanımak.",
            mainQuestion: "Bu eserlerin arkasında nasıl bir hayat ve ilim yolculuğu var?",
            primarySource: "Tarihçe-i Hayat — İlk Hayatı",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 4,
            topic: "Bir Kitapla Nasıl Arkadaş Olunur? — Hocaefendi ve Risale Okuma Kültürü",
            purpose: "Bir eseri hayat arkadaşı gibi sindirerek ve severek okuma usulünü kavramak.",
            mainQuestion: "Bir metinle nasıl dost olunur ve anlamadığımızda ne yaparız?",
            primarySource: "Birinci Söz + okuma usulüne dair Pırlanta metinleri",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 2,
        title: "2. Ünite — Besmele, Bakış Açısı ve İbadet",
        period: "5–8. Haftalar",
        weeks: [
          {
            weekNumber: 5,
            topic: "1. Söz: Bismillah Her Hayrın Başındadır",
            purpose:
              "Hayata ve her işe Allah adıyla başlamanın manevî bereket ve gücünü keşfetmek.",
            mainQuestion:
              "Bismillah yalnız söylenen bir kelime midir, yoksa bir hayat tavrı mıdır?",
            primarySource: "Sözler — Birinci Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 6,
            topic: "Allah Namına Hareket Etmek Ne Demektir?",
            purpose: "Günlük davranışlarımızda 'O’nun adına hareket etme' şuurunu kazanmak.",
            mainQuestion:
              "Bir işi Allah namına yapmak davranışımızı ve niyetimizi nasıl değiştirir?",
            primarySource: "Sözler — Birinci Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 7,
            topic: "2. Söz: Aynı Dünya, Farklı Bakış",
            purpose:
              "İmanın insanın dünyaya, olaylara ve insanlara bakışını nasıl aydınlattığını görmek.",
            mainQuestion: "Aynı dünyaya bakan iki insan neden tamamen farklı şeyler görebilir?",
            primarySource: "Sözler — İkinci Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 8,
            topic: "3. Söz: İbadet Yük mü, Kazanç mı?",
            purpose:
              "İbadetin insan ruhuna getirdiği hafiflik, hürriyet ve gerçek kazancı fark etmek.",
            mainQuestion:
              "Allah’ın bizim ibadetimize ihtiyacı yoksa bizim ibadete niçin ihtiyacımız var?",
            primarySource: "Sözler — Üçüncü Söz",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 3,
        title: "3. Ünite — Zaman, Vazife ve Emanet",
        period: "9–12. Haftalar",
        weeks: [
          {
            weekNumber: 9,
            topic: "4. Söz: 24 Saatlik Sermayem",
            purpose:
              "Zaman nimetinin değerini ve 1 saatin 23 saati nasıl bereketlendirdiğini kavramak.",
            mainQuestion:
              "Bir günümüz bize verilmiş bir sermaye olabilir mi ve onu nasıl harcıyoruz?",
            primarySource: "Sözler — Dördüncü Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 10,
            topic: "5. Söz: Vazifem Ne?",
            purpose: "Yaratılış gayemizi ve kulluk vazifemizi keşfederek hayatı anlamlandırmak.",
            mainQuestion: "Dünyevî işlerimiz ile kulluk vazifemiz birbirinin rakibi midir?",
            primarySource: "Sözler — Beşinci Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 11,
            topic: "6. Söz: Hayat Gerçekten Bana mı Ait?",
            purpose:
              "Varlığımızın ve hayatımızın hakiki sahibini anlayarak emanet bilinci geliştirmek.",
            mainQuestion: "Bedenimiz, zamanımız ve sahip olduklarımız tamamen bizim midir?",
            primarySource: "Sözler — Altıncı Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 12,
            topic: "Kabiliyetlerim Birer Emanet mi?",
            purpose:
              "Sahip olduğumuz yetenekleri emanet bilip hayra ve insanlığa kullanma şuuru kazanmak.",
            mainQuestion: "Bir kabiliyetin kıymetini onu ne için kullandığımız belirler mi?",
            primarySource: "Sözler — Altıncı Söz",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 4,
        title: "4. Ünite — Tevekkül, Dünya ve Tefekkür",
        period: "13–16. Haftalar",
        weeks: [
          {
            weekNumber: 13,
            topic: "7. Söz: Her Şeye Yetişebilir miyim?",
            purpose:
              "İnsanın sınırlı gücünü ve sonsuz ihtiyaçlarını fark ederek haddini ve sığınağını bilmek.",
            mainQuestion:
              "Her şeye gücümüzün yetmemesi yalnızca bir eksiklik midir, yoksa bir kapı mı açar?",
            primarySource: "Sözler — Yedinci Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 14,
            topic: "Tevekkül: Çalışıp Sonucunu Bırakmak",
            purpose:
              "Elinden gelen gayreti gösterip gerisini Allah’a havale etmenin iç huzurunu öğrenmek.",
            mainQuestion:
              "Tevekkül çalışmayı bırakıp beklemek midir, yoksa çalışıp sonucu Allah’a bırakmak mı?",
            primarySource: "Sözler — Yedinci Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 15,
            topic: "8. Söz: Aynı Dünya, İki İnsan",
            purpose:
              "Olaylara pozitif ve iman penceresinden bakmanın getirdiği ferahlığı kavramak.",
            mainQuestion: "Yaşadığımız olay değişmeden, ona bakış açımız değişebilir mi?",
            primarySource: "Sözler — Sekizinci Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 16,
            topic: "Bakmak ile Görmek Aynı Şey mi?",
            purpose:
              "Etrafımızdaki varlıklara ve tabiata tefekkürle, ibret gözüyle bakmayı öğrenmek.",
            mainQuestion:
              "Her gün gördüğümüz şeyleri gerçekten görüyor muyuz, yoksa alışkanlık mı engelliyor?",
            primarySource: "Sözler — On Birinci Söz; Pırlanta’da tefekkür bahisleri",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 5,
        title: "5. Ünite — Kâinat, İnsan ve İmanın Değeri",
        period: "17–20. Haftalar",
        weeks: [
          {
            weekNumber: 17,
            topic: "11. Söz: Kâinat Bir Saray Gibi Okunabilir mi?",
            purpose: "Kâinattaki muazzam intizamı ve Sanatkârı’nı temaşa ederek hayranlık duymak.",
            mainQuestion: "Bir sanat eseri bize sanatçısı hakkında ne söyler?",
            primarySource: "Sözler — On Birinci Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 18,
            topic: "İnsan Bu Dünyada Niçin Var?",
            purpose: "İnsanın kâinattaki özel yerini, muhataplığını ve sorumluluğunu kavramak.",
            mainQuestion: "İnsan yalnızca yemek, eğlenmek ve yaşlanmak için mi yaratılmıştır?",
            primarySource: "Sözler — On Birinci Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 19,
            topic: "23. Söz: İman İnsana Ne Kazandırır?",
            purpose:
              "İmanın insanı hakiki insan yapıp gerçek kıymet ve haysiyet kazandırdığını görmek.",
            mainQuestion:
              "İnsanın gerçek kıymeti dış görünüşünden mi gelir, Allah’a intisabından mı?",
            primarySource: "Sözler — Yirmi Üçüncü Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 20,
            topic: "Kendime Nasıl Bakıyorum?",
            purpose:
              "Kendimizi yalnızca notlar ve insanların onaylarıyla değil, hakiki değerimizle tartmak.",
            mainQuestion:
              "Kendimi yalnızca başarılarım ve insanların düşünceleriyle değerlendirirsem ne kaybederim?",
            primarySource: "Sözler — Yirmi Üçüncü Söz",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 6,
        title: "6. Ünite — Acziyet, Dua, Şükür ve Namaz",
        period: "21–24. Haftalar",
        weeks: [
          {
            weekNumber: 21,
            topic: "İhtiyaçlarım Bana Ne Öğretiyor? — Acziyet",
            purpose:
              "Güçsüzlüğümüzün bizi Allah’a yaklaştıran en kıymetli kapı olduğunu fark etmek.",
            mainQuestion:
              "İhtiyaçlarımız ve sınırımız olmasaydı Allah’a yönelmeyi öğrenebilir miydik?",
            primarySource: "Yedinci Söz; Yirmi Üçüncü Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 22,
            topic: "Dua: İnsan Neden Dua Eder?",
            purpose:
              "Duanın bir sipariş listesi değil, doğrudan Allah ile irtibat ve kulluk olduğunu anlamak.",
            mainQuestion:
              "Dua ettiğimiz her şeyin aynen gerçekleşmemesi duanın karşılıksız kaldığı anlamına gelir mi?",
            primarySource: "Risale-i Nur’daki dua bahisleri; Yirmi Üçüncü Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 23,
            topic: "Şükür: Nimeti Fark Etmek",
            purpose:
              "Günlük hayatımızdaki görünmeyen sayısız nimeti fark edip minnettar bir kalp taşımak.",
            mainQuestion: "Bir nimete sahip olmakla onun kıymetini fark etmek aynı şey midir?",
            primarySource: "Mektubat — Şükür Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 24,
            topic: "9. Söz: Namazın Manası",
            purpose:
              "Namazın günün beş vaktindeki derin ruhî, bedenî ve manevî manasını keşfetmek.",
            mainQuestion:
              "Namaz yalnızca yerine getirilmesi gereken bir görev midir, yoksa ruhun nefes alması mı?",
            primarySource: "Sözler — Dokuzuncu Söz",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 7,
        title: "7. Ünite — Uhuvvet, Anne-Baba Hakkı ve Dostluk",
        period: "25–28. Haftalar",
        weeks: [
          {
            weekNumber: 25,
            topic: "Anne-Baba Hakkı: Bana Verilen Emeği Görmek",
            purpose:
              "Ailemizin üzerimizdeki görünmeyen fedakârlığını fark edip hürmet ve vefayla karşılık vermek.",
            mainQuestion:
              "Anne-babamın emeğine karşı sadece 'teşekkür ederim' demek yeterli midir?",
            primarySource:
              "Sözler — Otuz İkinci Söz; Lem’alar — Yirmi Dördüncü Lem’a; Hocaefendi vaazı",
            isFamilyRespectHighlight: true,
          },
          {
            weekNumber: 26,
            topic: "Bir Kusur Bütün İyilikleri Siler mi? — Gemi Temsili",
            purpose:
              "Arkadaşlıkta kusurlara değil iyiliklere odaklanma adaletini ve insafını öğrenmek.",
            mainQuestion:
              "Bir arkadaşımızın tek bir hatası onun bütün güzel huylarını yok saymamıza yeter mi?",
            primarySource: "Mektubat — Yirmi İkinci Mektup / Uhuvvet Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 27,
            topic: "Gıybet: Bir İnsan Yoksa Hakkında Nasıl Konuşuyorum?",
            purpose:
              "Başkalarının arkasından konuşmanın dostluğu, güveni ve kardeşliği nasıl yıktığını görmek.",
            mainQuestion: "Söylediğimiz şey doğru bile olsa arkasından konuşmak neden gıybettir?",
            primarySource: "Yirmi İkinci Mektup — Hâtime",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 28,
            topic: "Affetmek ve İlişkiyi Tamir Etmek",
            purpose:
              "Kırgınlıkları onarmak ve affetmenin getirdiği iç huzuru ve büyüklüğü yaşamak.",
            mainQuestion:
              "Affetmek yapılan yanlışı onaylamak mıdır, yoksa ilişkiye yeni bir şans vermek mi?",
            primarySource: "Mektubat — Yirmi İkinci Mektup",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 8,
        title: "8. Ünite — İhlâs, Sosyal Çevre ve Özgürlük",
        period: "29–32. Haftalar",
        weeks: [
          {
            weekNumber: 29,
            topic: "İhlâs: Kimse Görmese Yine Yapar mıydım?",
            purpose:
              "İyiliği gösteriş için değil, sırf Allah rızası ve vicdan için yapma samimiyetini kazanmak.",
            mainQuestion: "Kimse beni görmese ve övmese aynı iyiliği yine yapar mıydım?",
            primarySource: "Lem’alar — Yirmi Birinci Lem’a / İhlâs Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 30,
            topic: "Beğenilmek ve Gruba Ait Olmak",
            purpose:
              "Akran baskısı ve onay arayışı yerine kendi ahlâkî omurgasını ve şahsiyetini korumak.",
            mainQuestion: "İnsanların beni beğenmesi iyilik yapma motivasyonum olursa ne bozulur?",
            primarySource: "Lem’alar — Yirmi Birinci Lem’a",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 31,
            topic: "Rekabet, Kıskançlık ve Haset",
            purpose:
              "Kıskançlık yerine gıpta duymayı ve başkalarının başarısıyla sevinmeyi öğrenmek.",
            mainQuestion: "Başkasının başarılı olması benim başarısız olduğum anlamına gelir mi?",
            primarySource: "Lem’alar — Yirmi Birinci Lem’a",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 32,
            topic: "Gençlik Rehberi: Helâl Dairesi ve Özgürlük",
            purpose:
              "Helâl dairesinin keyfe kâfi olduğunu ve sınırların insanı koruyan gerçek özgürlük olduğunu görmek.",
            mainQuestion:
              "Özgür olmak istediğimiz her şeyi yapmak mıdır, yoksa doğru olanı seçebilmek mi?",
            primarySource: "Gençlik Rehberi",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 9,
        title: "9. Ünite — Gençlik, Ümit ve Bağımsız Okuma",
        period: "33–36. Haftalar",
        weeks: [
          {
            weekNumber: 33,
            topic: "Gençlik Bir Sermayedir",
            purpose:
              "Gençlik enerjisinin geçici hevesler yerine ebedî kazanca dönüşen bir sermaye olduğunu kavramak.",
            mainQuestion:
              "Gençlik neden yalnız eğlenme zamanı değil, hayatın en büyük imkânı olarak görülmelidir?",
            primarySource: "Gençlik Rehberi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 34,
            topic: "Ümitsizlik ve Yeniden Başlamak",
            purpose:
              "Hatalardan sonra yeise kapılmayıp daima tevbe ve azimle yeniden başlama gücü kazanmak.",
            mainQuestion:
              "Ümit yalnız 'her şey iyi olacak' diye düşünmek midir, yoksa yeniden gayret etmek mi?",
            primarySource: "Hutbe-i Şamiye",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 35,
            topic: "Benim Merak Ettiğim Bir Mesele",
            purpose:
              "Kendi merak ettiği bir Risale konusunu seçip bağımsızca araştırma hevesi duymak.",
            mainQuestion:
              "Ben gerçekten hangi konuyu veya temsili biraz daha yakından okumak istiyorum?",
            primarySource: "Yıl boyunca işlenen ilgili Risale bölümleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 36,
            topic: "Ben Artık Nasıl Okuyacağım?",
            purpose:
              "Yıl sonunda kendi başına okuma, düşünme ve anlama alışkanlığını sürdürme vizyonu kazanmak.",
            mainQuestion:
              "Dersler bittiğinde bu kitaplarla ve hakikat arayışıyla ilişkim nasıl devam edecek?",
            primarySource: "Seçilen Risale metni + okuma usulü Pırlanta bahisleri",
            isFamilyRespectHighlight: false,
          },
        ],
      },
    ],
  },
  {
    grade: 2,
    code: "M2",
    schoolLevel: "Ortaokul 2",
    title: "M2 Ortaokul 2 36 Haftalık Yıllık Planı",
    stage: "Okuma, Anlama ve Bağlantı Kurma",
    motto: "Kendim okuyorum ve anlamaya başlıyorum.",
    yearEndOutcome:
      "Yıl sonunda kısa bir Risale bölümünü seçip okuyarak ana fikrini açıklayabilmesi.",
    outcomeStatement:
      "Risale’den kısa bir bölümü kendim okuyabiliyorum; bilmediğim kelimeleri soruyor, ana fikrini buluyor ve anladığımı kendi cümlelerimle anlatmaya çalışıyorum.",
    coreGoals: [
      "Öğrencinin Risale-i Nur ve Hocaefendi/Pırlanta kaynaklarıyla sıcak ve güvenilir bir ilk ilişki kurması.",
      "Kısa bir Risale metnini kendi başına okuyabilmesi ve ana fikrini bulmaya başlaması.",
      "Temsillerde hangi unsurun neyi anlattığını fark etmesi.",
      "Bilmediği kelimeyi sormaktan ve bir paragrafı yeniden okumaktan çekinmemesi.",
      "Okuduğu metni kendi cümleleriyle ifade etmeye başlaması.",
      "İman, ahiret, tevhid, insan, dua, şükür, uhuvvet, ihlâs ve gençlik bahislerini M2 seviyesinde okuyup müzakere etmesi.",
    ],
    methodSteps: ["OKU", "DUR", "SOR", "BAĞLANTI KUR", "KENDİ CÜMLENLE ANLAT"],
    familyRespectFocus: "Görünmeyen emek, kırmamak, vefa ve büyüklere hürmet.",
    units: [
      {
        unitNumber: 1,
        title: "1. Ünite — Tanışma, Muhabbet ve Metin Çözme",
        period: "1–4. Haftalar",
        weeks: [
          {
            weekNumber: 1,
            topic: "Geçen Yıldan Bugüne: Bir Metni İkinci Kez Okumak",
            purpose:
              "Bir metni tekrar okumanın yeni anlam katmanları ve derinlikler açtığını fark etmek.",
            mainQuestion:
              "Daha önce okuduğumuz bir metne tekrar döndüğümüzde neden yeni şeyler keşfederiz?",
            primarySource: "Tarihçe-i Hayat — Isparta Hayatı; Pırlanta — kitap okuma bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 2,
            topic: "İki Kilimlik Bir Dükkândan Başlayan Okuma Yolculuğu",
            purpose:
              "Samimi ve mütevazı bir başlangıcın zamanla nasıl köklü bir ilim halkasına dönüştüğünü kavramak.",
            mainQuestion: "Bir kitap insanın hayatında nasıl sıradan bir kitap olmaktan çıkar?",
            primarySource: "Hocaefendi’nin Risale-i Nur’la tanışma hatırası; Tarihçe-i Hayat",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 3,
            topic: "Bediüzzaman: Bir Ömür Neden İman Meselelerine Adanır?",
            purpose:
              "İman hakikatlerinin insan ve toplum için neden bir ömrü adayacak kadar merkezî olduğunu anlamak.",
            mainQuestion: "Bir insan niçin rahatını değil, inandığı bir hakikati anlatmayı seçer?",
            primarySource: "Tarihçe-i Hayat — Barla ve Isparta çizgisi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 4,
            topic: "Bir Risale Metnini Nasıl Çözeriz?",
            purpose:
              "Metnin ana fikrini tespit etme, bilmediği kelimeleri sorma ve kendi cümleleriyle özetleme becerisi kazanmak.",
            mainQuestion:
              "Bir paragrafın ana fikrini nasıl bulur ve kendi cümlemizle nasıl anlatırız?",
            primarySource: "Sözler — Birinci Söz’den kısa okuma; Pırlanta — okuma usulü",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 2,
        title: "2. Ünite — Ölüm, Ahiret ve Yeniden Diriliş",
        period: "5–8. Haftalar",
        weeks: [
          {
            weekNumber: 5,
            topic: "10. Söz: Ölüm Bir Son mu?",
            purpose:
              "Ölümün bir yok oluş değil, terhis tezkeresi ve ebedî saadete açılan bir kapı olduğunu kavramak.",
            mainQuestion: "Ölüm her şeyin tamamen bitmesi anlamına mı gelir?",
            primarySource: "Sözler — Onuncu Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 6,
            topic: "10. Söz: Saraydan Memlekete",
            purpose: "Soyut ve büyük hakikatleri zihne yaklaştırmada temsillerin mantığını çözmek.",
            mainQuestion:
              "Bir padişah ve saray temsili, ahiret gibi büyük bir hakikati anlamamıza nasıl yardım eder?",
            primarySource: "Sözler — Onuncu Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 7,
            topic: "Adalet Yarım Kalır mı?",
            purpose:
              "Bu dünyada tam tecelli etmeyen adalet ve hakların mutlaka bir mahkeme-i kübrâ gerektirdiğini görmek.",
            mainQuestion: "Bu dünyada karşılığını bulmayan mazlumiyet ve haksızlıklar ne olacak?",
            primarySource: "Sözler — Onuncu Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 8,
            topic: "Bahar Yeniden Dirilişi Anlatabilir mi?",
            purpose:
              "Her baharda ölmüş yeryüzünün yeniden dirilişinde haşrin apaçık delillerini temaşa etmek.",
            mainQuestion:
              "Kuru ağaçların ve tohumların baharda uyanması ahiret hakkında bize ne düşündürür?",
            primarySource: "Sözler — Onuncu Söz",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 3,
        title: "3. Ünite — Temsil, Kâinat ve Sanatkâr",
        period: "9–12. Haftalar",
        weeks: [
          {
            weekNumber: 9,
            topic: "Bir Temsil Nasıl Okunur?",
            purpose:
              "Temsildeki simgelerin (padişah, saray, yolcu vb.) hakiki hakikatle kurduğu mantıksal bağı çözmek.",
            mainQuestion:
              "Bir hikâyeyi okurken temsil ile temsil edilen hakikat arasındaki köprüyü nasıl kurarız?",
            primarySource: "Sözler — Küçük Sözler ve temsiller",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 10,
            topic: "33. Söz: Kâinattan Açılan Bir Pencere",
            purpose:
              "Gözlemlediğimiz her bir varlıktan Allah’ın isim ve sıfatlarına tefekkür pencereleri açabilmek.",
            mainQuestion:
              "Gördüğümüz bir çiçekten, yıldızdan veya sudan Allah’ın isimlerine nasıl ulaşabiliriz?",
            primarySource: "Sözler — Otuz Üçüncü Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 11,
            topic: "Sanat Varsa Sanatkâr?",
            purpose:
              "Bir eserdeki ölçü, estetik ve sanatın kendiliğinden olamayacağını aklen kavramak.",
            mainQuestion:
              "Kendi kendine bir harf bile yazılmazken kâinattaki harika sanatlar sahipsiz olabilir mi?",
            primarySource: "Sözler — Otuz Üçüncü Söz / pencereler",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 12,
            topic: "Tabiat Risalesi: Eczane Misali",
            purpose:
              "Canlıların terkibindeki milimetrik dengelerin kör tabiat ve tesadüfle açıklanamayacağını görmek.",
            mainQuestion: "Bir eczanedeki yüzlerce kavanoz devrilip ilaç yapabilir mi?",
            primarySource: "Lem’alar — Yirmi Üçüncü Lem’a / Tabiat Risalesi",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 4,
        title: "4. Ünite — Sebep, Düzen ve Tevhid",
        period: "13–16. Haftalar",
        weeks: [
          {
            weekNumber: 13,
            topic: "Sebep ile Yapan Aynı Şey mi?",
            purpose:
              "Sebeplerin sadece bir perde olduğunu, hakiki fail ve yaratıcının Allah olduğunu ayırt etmek.",
            mainQuestion: "Elmayı bize uzatan ağaç mıdır, yoksa ağacı ve elmayı yaratan kudret mi?",
            primarySource: "Tabiat Risalesi — bina ve usta temsilleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 14,
            topic: "Düzen Tesadüf Olabilir mi?",
            purpose:
              "Kâinattaki hassas intizam karşısında tesadüf iddiasının akıl dışılığını fark etmek.",
            mainQuestion:
              "Bir saat veya telefon tesadüfen oluşamazken insan bedeni tesadüf olabilir mi?",
            primarySource: "Tabiat Risalesi ve tevhid bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 15,
            topic: "Aynı Hakikat Neden Farklı Örneklerle Anlatılır?",
            purpose:
              "Farklı zihin ve mizaçlara hitap etmede örnek çeşitliliğinin ikna gücünü anlamak.",
            mainQuestion:
              "Kur'an ve Risale neden aynı hakikati farklı temsiller ve misallerle tekrar eder?",
            primarySource: "Sözler ve Mektubat metodolojisi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 16,
            topic: "Tevhid Dünyaya Bakışımızı Nasıl Değiştirir?",
            purpose:
              "Her şeyi tek bir Rahman’a bağlamanın insana verdiği güven, emniyet ve hürriyeti yaşamak.",
            mainQuestion:
              "Her şeyin sahibinin tek olduğunu bilmek korkularımızı ve endişelerimizi nasıl dindirir?",
            primarySource: "Sözler / tevhid bahisleri; Pırlanta’da tevhid",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 5,
        title: "5. Ünite — İnsanın Kıymeti, Acziyet ve Dua",
        period: "17–20. Haftalar",
        weeks: [
          {
            weekNumber: 17,
            topic: "23. Söz: İnsan Neden Kıymetlidir?",
            purpose:
              "İnsanın gerçek değerinin madde ve servetinden değil, ilahi isimlerin aynası olmasından geldiğini idrak etmek.",
            mainQuestion: "İnsanın değeri sadece başarısından ve dış görünüşünden mi kaynaklanır?",
            primarySource: "Sözler — Yirmi Üçüncü Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 18,
            topic: "İman İnsanın Kendine Bakışını Değiştirir mi?",
            purpose:
              "Kendini Allah’ın aziz bir misafiri ve muhatabı bilmenin getirdiği asil özsaygıyı kazanmak.",
            mainQuestion:
              "Kendimizi Allah’a ait bildiğimizde özgüvenimiz ve davranışlarımız nasıl değişir?",
            primarySource: "Sözler — Yirmi Üçüncü Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 19,
            topic: "Güçsüz Olmak Her Zaman Kötü mü?",
            purpose:
              "Acziyet ve fakrın insanı Rabbine bağlayan ve rahmetini celbeden bir kuvvet olduğunu anlamak.",
            mainQuestion: "Bebekler güçsüz oldukları için mi sevilir ve korunurlar?",
            primarySource: "Yirmi Üçüncü Söz; Yedinci Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 20,
            topic: "Yalnız Değilim: Dua ve Tevekkül",
            purpose:
              "Dua ve tevekkülle hayattaki yalnızlık, çaresizlik ve sahipsizlik duygusunu aşmak.",
            mainQuestion: "Gücümüzün tükendiği yerde kime sığınır ve nereden güç alırız?",
            primarySource: "Yirmi Üçüncü Söz; dua ve tevekkül bahisleri",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 6,
        title: "6. Ünite — Zaman, Namaz ve Şükür",
        period: "21–24. Haftalar",
        weeks: [
          {
            weekNumber: 21,
            topic: "Zamanı Nasıl Okuyoruz?",
            purpose: "Geçen günlerin ve saatlerin ahirete ekilen bir tohum olduğunu idrak etmek.",
            mainQuestion:
              "Bir günümüz sadece geçen dakikalardan mı ibarettir, yoksa ebedî bir tarlanın tohumu mu?",
            primarySource: "Sözler — Dördüncü Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 22,
            topic: "Namaz Vakitleri Bize Ne Hatırlatır?",
            purpose:
              "Günün 5 vaktinin insanın ömür dönemleri ve kâinatın dönüşümleriyle derin irtibatını kavramak.",
            mainQuestion:
              "Günün belirli anlarında durup Allah’ın huzuruna çıkmak ruhumuza ne kazandırır?",
            primarySource: "Sözler — Dokuzuncu Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 23,
            topic: "Şükür: Nimeti Yeniden Görmek",
            purpose:
              "Alışkanlık perdesini yırtıp her gün sahip olduğumuz nimetlerin değerini yeniden fark etmek.",
            mainQuestion:
              "Sürekli elimizin altında olan nimetleri neden zamanla görmezden geliriz?",
            primarySource: "Mektubat — Şükür Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 24,
            topic: "Şükür Sadece “Elhamdülillah” Demek mi?",
            purpose:
              "Şükrü kuru bir kelimeden çıkarıp nimeti yerinde kullanarak fiilî bir ahlâka dönüştürmek.",
            mainQuestion: "Gözün, aklın ve sağlığın şükrü günlük hayatımızda nasıl ödenir?",
            primarySource: "Şükür Risalesi; Pırlanta — Şükür",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 7,
        title: "7. Ünite — Anne-Baba Hakkı, Uhuvvet ve Affetme",
        period: "25–28. Haftalar",
        weeks: [
          {
            weekNumber: 25,
            topic: "Anne-Baba Hakkı: Büyüdükçe Sorumluluğum Azalır mı?",
            purpose:
              "Büyüyüp bağımsızlaştıkça ebeveyne karşı vefa, sevgi, hürmet ve hizmetin daha da önem kazandığını anlamak.",
            mainQuestion:
              "Anne-babama daha az ihtiyaç duymaya başlamam, onlara hürmet ve vefamı azaltır mı?",
            primarySource:
              "Lem’alar — Yirmi Dördüncü Lem’a; Sözler — Otuz İkinci Söz; Hocaefendi vaazı",
            isFamilyRespectHighlight: true,
          },
          {
            weekNumber: 26,
            topic: "Bir Kusur Bütün İnsanı Siler mi? — Gemi Temsiline Yeniden Bakış",
            purpose:
              "İnsan ilişkilerinde adalet, insaf ve affediciliği bir ahlâk kuralı olarak benimsemek.",
            mainQuestion:
              "İçinde dokuz masum bir cani olan gemiyi batırmak nasıl zulümse, bir kusur için insanı silmek öyle midir?",
            primarySource: "Mektubat — Yirmi İkinci Mektup / Uhuvvet Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 27,
            topic: "Gıybet ve Yanlış Yorumlama",
            purpose:
              "Eksik bilgi ve suizanla başkaları hakkında konuşmanın kardeşliğe verdiği derin tahribatı önlemek.",
            mainQuestion:
              "Birinin arkasından doğru bir şeyi söylemek neden yine de kalbî bir cürüm ve gıybettir?",
            primarySource: "Yirmi İkinci Mektup — Hâtime",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 28,
            topic: "Affetmek ve İlişkiyi Tamir Etmek",
            purpose:
              "Hataları affedebilme, kin tutmama ve yapıcı iletişim kurma olgunluğu kazanmak.",
            mainQuestion:
              "Affetmek yapılan yanlışı doğru kabul etmek midir, yoksa ruhu kin yükünden azat etmek mi?",
            primarySource: "Yirmi İkinci Mektup; Pırlanta — Uhuvvet",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 8,
        title: "8. Ünite — İhlâs, Birlikte Çalışma ve Rekabet",
        period: "29–32. Haftalar",
        weeks: [
          {
            weekNumber: 29,
            topic: "İhlâs: İyiliği Kimin İçin Yapıyorum?",
            purpose:
              "İbadet ve hizmetlerde yalnız ve yalnız Allah rızasını gözetme gayesini pekiştirmek.",
            mainQuestion:
              "Kimse görmediğinde ve alkışlamadığında yaptığımız iyilikten aynı sevinci duyabiliyor muyuz?",
            primarySource: "Lem’alar — Yirmi Birinci Lem’a / İhlâs Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 30,
            topic: "Beğenilme İhtiyacı ve Dijital Görünürlük",
            purpose:
              "Sosyal medyada beğeni ve takdir arayışı ile ihlâs arasındaki kritik dengeyi kurabilmek.",
            mainQuestion:
              "Sosyal medyada aldığımız beğeniler yaptığımız işin samimiyetini zedeler mi?",
            primarySource: "Yirmi Birinci Lem’a; Pırlanta — İhlâs",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 31,
            topic: "Birlikte Çalışmak Neden Zor?",
            purpose:
              "Takım çalışmalarında nefis ve bencilliği aşıp ortak hayır ve hedefe odaklanmayı öğrenmek.",
            mainQuestion:
              "Tek başına başarmak ile birlikte kardeşçe başarmak arasındaki nefis engelini nasıl aşarız?",
            primarySource: "Yirmi Birinci Lem’a — Dördüncü Düstur",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 32,
            topic: "Rekabet, Gıpta ve Haset",
            purpose:
              "Hasedin yıpratıcılığından korunup başkalarının güzelliklerine gıpta ile sevinme asaletini kazanmak.",
            mainQuestion:
              "Bir arkadaşımızın başarısı neden bazen içimizi burkar ve bunu nasıl tedavi ederiz?",
            primarySource: "Yirmi Birinci Lem’a; Pırlanta — Haset",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 9,
        title: "9. Ünite — Gençlik, Kalıcı Değer ve Kendi Başına Okuma",
        period: "33–36. Haftalar",
        weeks: [
          {
            weekNumber: 33,
            topic: "Gençlik Bir Sermaye",
            purpose:
              "Gençlik döneminin geçici bir eğlence değil, ömür boyu meyve verecek bir emanet olduğunu fark etmek.",
            mainQuestion:
              "Gençliğimizi nasıl harcadığımız, gelecekteki ve ahiretteki bizi nasıl belirler?",
            primarySource: "Gençlik Rehberi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 34,
            topic: "Geçici Haz mı, Kalıcı Değer mi?",
            purpose:
              "Anlık heveslerin getirdiği pişmanlıklar ile kalıcı faziletlerin huzurunu ayırt etmek.",
            mainQuestion:
              "Bir saatlik gayrimeşru zevkin arkasındaki yüzlerce pişmanlığı hesap ediyor muyuz?",
            primarySource: "Gençlik Rehberi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 35,
            topic: "Ben Bir Risale Bölümü Seçiyorum ve Çözüyorum",
            purpose:
              "Kendi ilgi duyduğu bir Risale konusunu seçip sözlük ve metin tahliliyle bağımsızca incelemek.",
            mainQuestion:
              "Kendi seçtiğim bir Risale bahsini başından sonuna inceleyip ana fikrini çözebilir miyim?",
            primarySource: "Öğrencinin seçtiği ilgili Risale bölümü",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 36,
            topic: "Ben Okudum, Anladım, Anlatıyorum",
            purpose:
              "Anladığı hakikati akranlarına kendi özgün dili ve üslubuyla aktarabilme yetkinliği kazanmak.",
            mainQuestion:
              "Seçtiğim metnin ana fikrini iki-üç dakikada dinleyenleri ikna edecek şekilde özetleyebilir miyim?",
            primarySource: "Öğrencinin seçtiği Risale bölümü + Pırlanta’da okuma usulü",
            isFamilyRespectHighlight: false,
          },
        ],
      },
    ],
  },
  {
    grade: 3,
    code: "M3",
    schoolLevel: "Ortaokul 3",
    title: "M3 Ortaokul 3 36 Haftalık Yıllık Planı",
    stage: "Kendini Tanıma, İrade ve Hayata Taşıma",
    motto: "Okuduğum hakikatin hayatımla ilgisini görüyor ve uygulamaya çalışıyorum.",
    yearEndOutcome:
      "Yıl sonunda gerçek bir hayat meselesi seçip Risale ve Hocaefendi/Pırlanta kaynaklarından ilgili kısa metni bulması ve hayatına nasıl taşıyacağını açıklaması.",
    outcomeStatement:
      "Okuduğum bir Risale veya Pırlanta hakikatinin hayatımla ilgisini görebiliyor, bana ne söylediğini kendi cümlemle ifade ediyor ve küçük bir uygulama adımı seçebiliyorum.",
    coreGoals: [
      "Öğrencinin Risale-i Nur ve Hocaefendi/Pırlanta kaynaklarıyla yaşına uygun, sıcak ve güvenilir bir bağ kurması.",
      "Okuduğu bir hakikati yalnız anlamakla kalmayıp kendi hayatındaki karşılığını fark etmeye başlaması.",
      "Gençlik, irade, alışkanlık, emanet, niyet, ihlâs, arkadaşlık, gıybet, tefekkür, ölüm-ahiret, ümit ve sorumluluk gibi başlıklarda Risale metinleriyle düşünmesi.",
      "Bir problem karşısında 'Bu konuda okuduğum hakikat bana ne söylüyor?' sorusunu sormaya başlaması.",
      "Kendi hayatından küçük ve gerçekçi uygulama hedefleri koyabilmesi.",
    ],
    methodSteps: [
      "OKU",
      "ANLA",
      "KENDİ HAYATINLA BAĞ KUR",
      "KÜÇÜK BİR ADIM SEÇ",
      "UYGULA",
      "GERİ DÖNÜP DEĞERLENDİR",
    ],
    familyRespectFocus: "Fikir ayrılığı ve bağımsızlaşma içinde saygıyı korumak.",
    units: [
      {
        unitNumber: 1,
        title: "1. Ünite — Hakikat, Mesuliyet ve Hayata Taşıma",
        period: "1–4. Haftalar",
        weeks: [
          {
            weekNumber: 1,
            topic: "Bir Hakikat Hayata Ne Zaman Girer?",
            purpose:
              "Bilgiyi sadece zihinde tutmayıp günlük hayata, ahlâka ve davranışa aktarabilmek.",
            mainQuestion: "Bir hakikati bilmekle onu bizzat yaşamak arasındaki fark nedir?",
            primarySource: "Risale-i Nur’dan amel bağlantılı pasajlar; Pırlanta — ilim ve amel",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 2,
            topic: "Bediüzzaman: Bilgi Neden Sorumluluk Doğurur?",
            purpose:
              "Bildiğimiz bir hakikatin üzerimize yüklediği ahlâkî mesuliyet ve samimiyeti kavramak.",
            mainQuestion:
              "İnsan bildiği bir hakikate göre yaşamazsa bilgi tek başına kurtarıcı olur mu?",
            primarySource: "Tarihçe-i Hayat — mesuliyet ve aksiyon çizgisi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 3,
            topic: "Hocaefendi: Okumak İnsanı Değiştirmiyorsa Ne Eksik Kalır?",
            purpose: "Okumanın asıl gayesinin karakter, vicdan ve aksiyon inşası olduğunu anlamak.",
            mainQuestion:
              "Okuduğumuz eserler ahlâkımıza ve üslubumuza yansımıyorsa neyi eksik yapıyoruz?",
            primarySource: "Pırlanta — kitap okuma ve insan yetiştirme bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 4,
            topic: "Bu Metin Bana Ne Söylüyor?",
            purpose:
              "Okunan bir metinden doğrudan kendi hayatımıza ve tercihlerimize dönük hisse çıkarmak.",
            mainQuestion:
              "Bir Risale paragrafını kendi hayatımızdaki somut bir meseleyle nasıl ilişkilendiririz?",
            primarySource: "Kısa Risale metni + hayata taşıma yöntemi",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 2,
        title: "2. Ünite — Gençlik, İrade ve Alışkanlık",
        period: "5–8. Haftalar",
        weeks: [
          {
            weekNumber: 5,
            topic: "Gençlik Bir Sermaye",
            purpose:
              "Gençlik enerjisini ve vaktini geçici rüzgârlara kaptırmayıp geleceğe tohum kılmak.",
            mainQuestion: "Gençlik dönemi insanın eline geçmiş en büyük sermaye midir?",
            primarySource: "Gençlik Rehberi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 6,
            topic: "Gençlik Geçiyor: Ne Kalıyor?",
            purpose:
              "Hızla akıp giden gençliğin ardından pişmanlık değil, kalıcı faziletler bırakabilmek.",
            mainQuestion:
              "Yıllar sonra geriye baktığımızda gençliğimizden elimizde neyin kalmasını istiyoruz?",
            primarySource: "Gençlik Rehberi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 7,
            topic: "Helâl Dairesi ve Özgürlük",
            purpose:
              "Helâl sınırlarının insanı daraltan değil, huzur ve hakiki hürriyeti koruyan kale olduğunu görmek.",
            mainQuestion: "Sınırsızlık gerçek özgürlük müdür, yoksa nefsin esareti midir?",
            primarySource: "Gençlik Rehberi — Helâl Dairesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 8,
            topic: "İrade ve Alışkanlık",
            purpose:
              "İrademizi terbiye ederek erdemli alışkanlıklar kazanma ve zararlıları bırakma gücü elde etmek.",
            mainQuestion:
              "Alışkanlıklarımızın esiri miyiz, yoksa irademizle onları yönlendirebilir miyiz?",
            primarySource: "Pırlanta — İrade Terbiyesi; Gençlik Rehberi",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 3,
        title: "3. Ünite — Hayat, Emanet ve Kulluk",
        period: "9–12. Haftalar",
        weeks: [
          {
            weekNumber: 9,
            topic: "6. Söz: Hayat Bana mı Ait?",
            purpose:
              "Varlığımızın ve hayatımızın Allah’a aidiyetini idrak edip emanet bilinciyle yaşamak.",
            mainQuestion: "Hayatımızı Allah’a satmak (O’nun yoluna vakfetmek) bize ne kazandırır?",
            primarySource: "Sözler — Altıncı Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 10,
            topic: "Bedenim, Zamanım ve Dikkatim Birer Emanet mi?",
            purpose:
              "Bedenimizi, sağlığımızı ve dikkatimizi tüketen şeylere karşı emanet şuuruyla durmak.",
            mainQuestion:
              "Bedenimiz ve dikkatimiz bize kendi mülkümüz olarak mı verildi, emanet olarak mı?",
            primarySource: "Sözler — Altıncı Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 11,
            topic: "Kabiliyetlerimi Ne İçin Kullanıyorum?",
            purpose:
              "Bize lütfedilen zekâ, sanat ve konuşma yeteneklerini Hakk’a ve insanlığa hizmete adamak.",
            mainQuestion:
              "Yeteneklerimi sadece kendi egom için mi kullanıyorum, yoksa hayır için mi?",
            primarySource: "Sözler — Altıncı Söz; Pırlanta — İhlas ve Hizmet",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 12,
            topic: "Kulluk ve Özgürlük",
            purpose:
              "Yalnızca Allah’a kul olmanın insanı kula kul olmaktan ve bağımlılıklardan kurtardığını yaşamak.",
            mainQuestion: "İnsan Allah’a kul oldukça diğer bütün baskılardan nasıl özgürleşir?",
            primarySource: "Sözler — Altıncı ve Yirmi Üçüncü Söz",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 4,
        title: "4. Ünite — Niyet, Samimiyet ve Akran Baskısı",
        period: "13–16. Haftalar",
        weeks: [
          {
            weekNumber: 13,
            topic: "Niyet Aynı İşi Nasıl Değiştirir?",
            purpose:
              "Sıradan günlük işleri güzel bir niyetle ibadete ve sevaba dönüştürme sırrını kavramak.",
            mainQuestion:
              "Aynı fiili işleyen iki insandan birinin ameli nasıl nura, diğerininki külfete dönüşür?",
            primarySource: "Mesnevî-i Nuriye — Katre; İhlâs bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 14,
            topic: "Kimse Görmese Yine Yapar mıydım?",
            purpose:
              "Görünürlük ve alkış arzusundan sıyrılıp iç murakabe ve ihlâsla hareket edebilmek.",
            mainQuestion: "İç dünyamızda bizi harekete geçiren gerçek niyet nedir?",
            primarySource: "Lem’alar — Yirmi Birinci Lem’a",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 15,
            topic: "Beğenilme, Akran Onayı ve Gruba Ait Olmak",
            purpose: "Akran baskısı ve popülerlik uğruna kendi ahlâkî ilkelerinden taviz vermemek.",
            mainQuestion: "Bir grubun onayını almak için doğrularımdan vazgeçmeye değer mi?",
            primarySource: "Lem’alar — Yirmi Birinci Lem’a; Pırlanta — Şahsiyet",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 16,
            topic: "Rekabet ve Üstün Gelme İsteği",
            purpose:
              "Başkalarını ezme hırsı yerine kendi potansiyelini keşfedip hayırda yarışmayı öğrenmek.",
            mainQuestion:
              "Başarıyı başkalarını geride bırakmak mı sanıyoruz, yoksa kendimizi aşmak mı?",
            primarySource: "Yirmi Birinci Lem’a; Pırlanta — Haset ve Gıpta",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 5,
        title: "5. Ünite — Haset, Kıyas ve Hürmet",
        period: "17–20. Haftalar",
        weeks: [
          {
            weekNumber: 17,
            topic: "Haset: Başkasının İyiliği Neden Beni Rahatsız Eder?",
            purpose:
              "Hasedin hem ruhu hem kardeşliği kemiren bir ateş olduğunu fark edip kalbi arındırmak.",
            mainQuestion: "Başkasının nimet ve başarısına neden sevinemeyiz ve bunu nasıl yeneriz?",
            primarySource: "Lem’alar — Yirmi Birinci Lem’a; Mektubat — Yirmi İkinci Mektup",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 18,
            topic: "Kendimi Başkalarıyla Karşılaştırmak",
            purpose:
              "Sürekli başkalarıyla kıyaslama tuzağından kurtulup kendi biricik emanetine odaklanmak.",
            mainQuestion:
              "Sosyal medyada ve okulda kendimizi başkalarıyla kıyaslamak bize ne kaybettirir?",
            primarySource: "Pırlanta — Şahsiyet İnşası; Risale tefekkür bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 19,
            topic: "Anne-Baba Hakkı: Büyürken Hürmeti Nasıl Korurum?",
            purpose:
              "Ergenlik ve bağımsızlaşma sürecinde ebeveyne karşı sevgi, hürmet ve şefkati korumak.",
            mainQuestion:
              "Kendi ayaklarımın üzerinde durmaya başlarken anne-babama hürmetimi nasıl korurum?",
            primarySource:
              "Lem’alar — Yirmi Dördüncü Lem’a; Sözler — Otuz İkinci Söz; Hocaefendi vaazı",
            isFamilyRespectHighlight: true,
          },
          {
            weekNumber: 20,
            topic: "Arkadaşımın Kusurunu Görünce Ne Yapıyorum? — Gemi Temsili",
            purpose:
              "Arkadaş ilişkilerinde tek bir hataya takılıp insan silmek yerine affedici ve yapıcı olmak.",
            mainQuestion:
              "Bir hatasını gördüğümüz arkadaşımızın güzelliklerini de hatırlayabiliyor muyuz?",
            primarySource: "Mektubat — Yirmi İkinci Mektup / Uhuvvet Risalesi",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 6,
        title: "6. Ünite — Kusur, Affetme ve Dijital İz",
        period: "21–24. Haftalar",
        weeks: [
          {
            weekNumber: 21,
            topic: "Bir İnsanı Tek Hatasıyla Tanımlamak",
            purpose:
              "İnsanları etiketlememek, önyargıyla yaklaşmamak ve adalet duygusunu kaybetmemek.",
            mainQuestion:
              "Bir yanlışı yüzünden bir insanı tamamen kötü ilan etmek ne kadar adildir?",
            primarySource: "Uhuvvet Risalesi; Pırlanta — İnsaf ve Adalet",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 22,
            topic: "Özür Dilemek, Affetmek ve İlişkiyi Tamir Etmek",
            purpose:
              "Hata yapınca kibirlenmeden özür dileyebilme ve incindiğinde affedebilme olgunluğu.",
            mainQuestion:
              "Özür dilemek küçülmek midir, yoksa nefsi terbiye eden bir büyüklük müdür?",
            primarySource: "Yirmi İkinci Mektup; Hadis-i Şerifler ışığında ahlâk",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 23,
            topic: "Söz, Mesaj ve Dijital İz",
            purpose:
              "Dijital ortamlarda nezaket, mahremiyet ve sözün vebaline dikkat etme hassasiyeti kazanmak.",
            mainQuestion:
              "Yazdığımız bir mesajın, bıraktığımız bir yorumun ahirette hesabı var mıdır?",
            primarySource: "Pırlanta — Üslup ve Dil; Risale ahlâk bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 24,
            topic: "Gıybet, Suizan ve Yanlış Hikâye Kurmak",
            purpose:
              "Kafamızda senaryolar kurup insanlar hakkında suizanda bulunmaktan kalbi korumak.",
            mainQuestion:
              "Görünüşe bakıp insanların niyetleri hakkında kesin hüküm vermek neden günahtır?",
            primarySource: "Yirmi İkinci Mektup — Hâtime; Hüsn-ü zan prensibi",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 7,
        title: "7. Ünite — Sebepler, Kâinat ve Tefekkür",
        period: "25–28. Haftalar",
        weeks: [
          {
            weekNumber: 25,
            topic: "Tesadüf Bir Açıklama mıdır?",
            purpose:
              "Kâinattaki akıl almaz tasarım karşısında tesadüf iddiasının bilimsel ve mantıkî çöküşünü görmek.",
            mainQuestion:
              "Milyarlarca harfin yan yana gelip anlamlı bir kütüphane oluşturması tesadüf olabilir mi?",
            primarySource: "Tabiat Risalesi; Sözler — Yirmi İkinci Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 26,
            topic: "Sebepler Ne Kadar Güçlü?",
            purpose:
              "Görünen sebeplerin ardındaki sonsuz kudreti ve hikmeti fark ederek sebeplere tapmamak.",
            mainQuestion:
              "Toprak, su ve güneş bir araya gelse kendi akıllarıyla bir gül yapabilirler mi?",
            primarySource: "Tabiat Risalesi; On Yedinci Lem’a",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 27,
            topic: "İman Kâinata Bakışımı Nasıl Değiştirir?",
            purpose:
              "Kâinatı anlamsız bir maddeler yığını değil, her sayfası hikmet dolu bir mektup olarak okumak.",
            mainQuestion: "İman gözlüğüyle baktığımızda doğa ve varlıklar bize nasıl konuşur?",
            primarySource: "Sözler — İkinci ve On Birinci Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 28,
            topic: "Günlük Hayatta Tefekkür",
            purpose:
              "Günlük koşuşturmaca içinde durup gökyüzüne, bir yaprağa ve kendi varlığına ibretle bakmak.",
            mainQuestion: "Her gün 5 dakika durup kâinatı tefekkür etmek kalbimize ne kazandırır?",
            primarySource: "Pırlanta — Tefekkür Ufku; Sözler",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 8,
        title: "8. Ünite — Ölüm, Ahiret ve Diriliş",
        period: "29–32. Haftalar",
        weeks: [
          {
            weekNumber: 29,
            topic: "Ölüm Korkusu Bize Ne Söylüyor?",
            purpose:
              "Ölümün varlığının insanı karamsarlığa değil, hayatı sorumlu ve bilinçli yaşamaya sevk ettiğini görmek.",
            mainQuestion: "Ölüm gerçeği olmasaydı hayatın ve zamanın kıymeti bilinir miydi?",
            primarySource: "Onuncu Söz; Gençlik Rehberi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 30,
            topic: "Ahiret ve Adalet",
            purpose:
              "Dünyada mazlumların hakkını alacağı, zalimlerin hesap vereceği mutlak adalet yurdunu anlamak.",
            mainQuestion: "Bu dünyada cezasını çekmeden giden zalimlerin hesabı nerede görülecek?",
            primarySource: "Sözler — Onuncu Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 31,
            topic: "Bahar ve Yeniden Diriliş",
            purpose:
              "Kıştan sonra baharın gelmesinde ahiretin ve yeniden yaratılışın açık delillerini okumak.",
            mainQuestion:
              "Kuru kemiklerin ve ölü toprakların canlanması ahirete nasıl şahitlik eder?",
            primarySource: "Onuncu Söz — Dokuzuncu Hakikat",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 32,
            topic: "Ahiret İnancı Bugünümü Nasıl Değiştirir?",
            purpose:
              "Ahiret bilincinin bugünkü tercihlerimize getirdiği ciddiyet, vicdan ve huzuru yaşamak.",
            mainQuestion: "Yarın hesap vereceğini bilen bir insan bugün nasıl yaşar ve konuşur?",
            primarySource: "Onuncu Söz; Pırlanta — Ahiret İnancı",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 9,
        title: "9. Ünite — Ümit, Sabır ve Şahsî Meselem",
        period: "33–36. Haftalar",
        weeks: [
          {
            weekNumber: 33,
            topic: "Ümitsizlik Neden Tehlikelidir?",
            purpose:
              "Ümitsizliğin insanı manen felç eden en büyük tuzak olduğunu fark edip daima ümide sarılmak.",
            mainQuestion:
              "Ümitsizlik neden bütün ilerlemenin ve hayırların önündeki en büyük engeldir?",
            primarySource: "Hutbe-i Şamiye; Pırlanta — Yeis ve Ümit",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 34,
            topic: "Ümit Sadece İyi Düşünmek mi?",
            purpose:
              "Hakiki ümidin kuru bir temenni değil, fiilî gayret ve tevekkülle beslenen bir enerji olduğunu anlamak.",
            mainQuestion: "Çalışmadan ve adım atmadan sadece 'ümitliyim' demek yeterli midir?",
            primarySource: "Hutbe-i Şamiye; Pırlanta — Ümit Tohumları",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 35,
            topic: "Sıkıntı, Sabır ve Hz. Eyyûb",
            purpose:
              "Başa gelen zorluk ve hastalıklarda Hz. Eyyûb (a.s.) gibi metanet, sabır ve dua ile durabilmek.",
            mainQuestion: "Zorluklar ve imtihanlar insanı olgunlaştıran birer terbiye olabilir mi?",
            primarySource: "Lem’alar — İkinci Lem’a / Hz. Eyyûb bahsi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 36,
            topic: "Benim Hayatımdaki Gerçek Mesele Ne?",
            purpose:
              "Ortaokul müfredatını tamamlarken kendi hayat gayesini, ahlâkî önceliklerini netleştirmek.",
            mainQuestion: "3 yıllık okumanın ardından ben hayatımda en çok neyi dert ediniyorum?",
            primarySource: "Kişisel değerlendirme; Risale ve Pırlanta rehberliği",
            isFamilyRespectHighlight: false,
          },
        ],
      },
    ],
  },
  {
    grade: 4,
    code: "M4",
    schoolLevel: "Lise 1",
    title: "M4 Lise 1 36 Haftalık Yıllık Planı",
    stage: "İhtiyaç Hissetme, Soru Sorma ve Kaynağa Gitme",
    motto: "Sorularım ve ihtiyaçlarım için bu kaynaklara kendim başvuruyorum.",
    yearEndOutcome:
      "Yıl sonunda gerçek bir sorusu için Risale ve Pırlanta’dan kaynak bulup, iki kaynağın söylediğini karşılaştırarak kısa bir değerlendirme yapabilmesi.",
    outcomeStatement:
      "Bir imanî veya ahlâkî sorum olduğunda uygun anahtar kavramlarla Risale ve Pırlanta’da kaynak arayabiliyor, bulduğum metni bağlamıyla okuyup ana fikrini kendi cümlemle açıklayabiliyorum.",
    coreGoals: [
      "Öğrencinin Risale-i Nur ve Pırlanta kaynaklarını kendi imanî ve ahlâkî sorularında başvurabileceği rehberler olarak görmesi.",
      "Bir soruyu anahtar kavramlara ayırabilmesi ve uygun eser/bölüm aramaya başlaması.",
      "Bulduğu metni bağlamından koparmadan okuyup ana fikrini kendi cümleleriyle açıklayabilmesi.",
      "Tevhid, tabiat ve sebepler, ahiret, kader-irade, ene/benlik, dua-şükür, uhuvvet ve ihlâs gibi başlıklarda kaynak merkezli düşünmesi.",
      "Hocaefendi’nin metin ve sohbetlerini aynı konunun ikinci okuma penceresi olarak kullanabilmesi.",
    ],
    methodSteps: [
      "SORU",
      "ANAHTAR KAVRAM",
      "ESER / BÖLÜM",
      "ASLÎ METİN",
      "BAĞLAM",
      "KENDİ CÜMLENLE ÖZET",
      "İKİNCİ KAYNAKLA KARŞILAŞTIR",
    ],
    familyRespectFocus: "İtaatin sınırı, yanlış talep karşısında nezaket, ma‘ruf ile muamele.",
    units: [
      {
        unitNumber: 1,
        title: "1. Ünite — Kaynak Bilinci ve Arama Yöntemi",
        period: "1–4. Haftalar",
        weeks: [
          {
            weekNumber: 1,
            topic: "Bir Kitap Ne Zaman Kaynak Olur?",
            purpose:
              "Bir kitabı sadece baştan sona okumakla, sorularımız olduğunda ona müracaat etmek arasındaki farkı anlamak.",
            mainQuestion:
              "Bir eseri sorularımıza cevap veren yaşayan bir rehber kılmak ne demektir?",
            primarySource: "Risale-i Nur’dan giriş metinleri; Pırlanta’da okuma kültürü",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 2,
            topic: "Bediüzzaman: Çağın İman Sorularına Neden Yöneldi?",
            purpose:
              "20. yüzyılın getirdiği felsefî, pozitivist ve materyalist şüphelere Risale'nin verdiği cevapları kavramak.",
            mainQuestion:
              "Bediüzzaman neden siyaset veya münakaşa yerine doğrudan iman hakikatlerine odaklandı?",
            primarySource: "Tarihçe-i Hayat; Barla Hayatı ve telif gayesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 3,
            topic: "Hocaefendi: Bir Kaynakla Yıllarca Nasıl Yaşanır?",
            purpose:
              "Temel eserleri bir kez okuyup bırakmak yerine sürekli derinleşerek bir ömür okuma disiplini kazanmak.",
            mainQuestion:
              "Aynı kaynaklarla onlarca yıl bıkmadan nasıl yaşanır ve her defasında ne bulunur?",
            primarySource: "Pırlanta — Temel Eserler ve Okuma Ahlâkı",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 4,
            topic: "Sorudan Kaynağa: Aradığımı Nasıl Bulurum?",
            purpose:
              "Zihnimizdeki bir mesele için fihrist, indeks ve kavram taramasıyla doğru bahsi tespit edebilmek.",
            mainQuestion:
              "Aklımdaki bir soruya cevap ararken külliyatta doğru bölümü nasıl bulurum?",
            primarySource: "Risale-i Nur Fihristi; kavram arama disiplini",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 2,
        title: "2. Ünite — Bağlam, Tevhid ve Kâinatı Okumak",
        period: "5–8. Haftalar",
        weeks: [
          {
            weekNumber: 5,
            topic: "Kaynak, Açıklama ve Yorum Aynı Şey mi?",
            purpose:
              "Asıl metin, şerh ve kişisel yorumlar arasındaki ayrımı netleştirerek fikrî sıhhati korumak.",
            mainQuestion:
              "Yazarın bizzat yazdığı ifade ile bizim anladığımız yorumu nasıl ayırt ederiz?",
            primarySource: "Muhakemat; kaynak-metin tahlili",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 6,
            topic: "Bir Cümleyi Bağlamından Koparmak Ne Demektir?",
            purpose:
              "Metinleri öncesi ve sonrasıyla, yazıldığı maksat çerçevesinde anlama disiplini kazanmak.",
            mainQuestion: "Bir cümleyi bağlamından cımbızladığımızda anlam nasıl tahrif olabilir?",
            primarySource: "Muhakemat; okuma usulü",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 7,
            topic: "Tevhid Sadece “Allah Birdir” Demek midir?",
            purpose:
              "Tevhidin kuru bir teoloji değil, kâinattaki her hadiseyi O’na bağlayan dinamik bir bakış olduğunu görmek.",
            mainQuestion:
              "Tevhid inancı insanın kâinata, tabiata ve hadiselere bakışını nasıl dönüştürür?",
            primarySource: "Sözler — Yirmi İkinci ve Otuz Üçüncü Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 8,
            topic: "Kâinatı Bir Kitap Gibi Okumak",
            purpose:
              "Varlıklara manâ-yı harfî (Sanatkârı hesabına) bakma ve kâinatı bir Kur'an gibi tefekkür etme yeteneği kazanmak.",
            mainQuestion:
              "Varlıklara 'kendisi hesabına' bakmakla 'Sanatkârı hesabına' bakmak arasında ne fark vardır?",
            primarySource: "Sözler — On Birinci Söz; Mesnevî-i Nuriye",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 3,
        title: "3. Ünite — Güven, Tabiat ve Kanunlar",
        period: "9–12. Haftalar",
        weeks: [
          {
            weekNumber: 9,
            topic: "Allah’a İntisap ve İç Hürriyet",
            purpose:
              "Allah’a intisap etmenin insanı korkulardan, menfaat beklentilerinden ve sahte güçlerden kurtardığını yaşamak.",
            mainQuestion: "Sultan-ı Kâinat’a intisap eden bir kul başka güçlerden neden korkmaz?",
            primarySource: "Sözler — Yirmi Üçüncü Söz; Yedinci Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 10,
            topic: "Korkular, İhtiyaçlar ve Güven",
            purpose:
              "Gelecek kaygısı, başarısızlık korkusu ve yalnızlığı teslimiyet ve tevekkülle aşabilmek.",
            mainQuestion:
              "İçimizdeki bitmek bilmeyen ihtiyaç ve korkuları tevekkül ile nasıl sükûnete kavuştururuz?",
            primarySource: "Sözler — Yedinci Söz; Pırlanta — Güven ve Teslimiyet",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 11,
            topic: "“Tabiat Yapıyor” Demek Ne Demektir?",
            purpose:
              "Tabiatçılık iddiasının perde arkasını aralayıp tabiatın bir fail değil, sanat eseri olduğunu çözmek.",
            mainQuestion:
              "Tabiat kanunları bir şeyin sebebi midir, yoksa yürüyen intizamın adı mıdır?",
            primarySource: "Lem’alar — Yirmi Üçüncü Lem’a / Tabiat Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 12,
            topic: "Kanun ile Kanun Koyucu Aynı Şey mi?",
            purpose:
              "Yerçekimi veya fotosentez gibi kanunların kendi kendine var olamayacağını, bir Kanun Koyucu gerektirdiğini kavramak.",
            mainQuestion:
              "Trafik kuralları arabaları yönetir mi, yoksa kuralı koyan aklın iradesini mi yansıtır?",
            primarySource: "Tabiat Risalesi; tefekkür bahisleri",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 4,
        title: "4. Ünite — Sebepler, Soruyu Bulma ve Tevhid",
        period: "13–16. Haftalar",
        weeks: [
          {
            weekNumber: 13,
            topic: "Sebeplerin Gücü ve Sınırı",
            purpose:
              "Sebeplerin birer vasıtadan ibaret olduğunu, hakiki tesir ve yaratmanın sadece Allah’a ait olduğunu ayırt etmek.",
            mainQuestion:
              "Bir doktorun ilacı yazması hastayı iyileştirmeye yeter mi, şifayı veren kimdir?",
            primarySource: "Tabiat Risalesi; Lem’alar — On Yedinci Lem’a",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 14,
            topic: "Tesadüf Gerçek Bir Açıklama mı?",
            purpose:
              "Olasılık hesapları ve kâinattaki mükemmel nizam karşısında tesadüf safsatasını çürütmek.",
            mainQuestion:
              "Bilinçsiz atomlar ve kör tesadüfler bir araya gelip düşünen bir insan yapabilir mi?",
            primarySource: "Tabiat Risalesi; İmanî hüccetler",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 15,
            topic: "Bir İddiayı Anlamak İçin Önce Soruyu Bulmak",
            purpose:
              "Metinlerdeki argümanların hangi soru veya itirazı cevaplamak için kurulduğunu analiz edebilmek.",
            mainQuestion:
              "Bir paragrafı tam anlamak için yazarın hangi soruya cevap verdiğini nasıl buluruz?",
            primarySource: "Muhakemat; argüman tahlil metodolojisi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 16,
            topic: "Tevhid Hayata Nasıl Yansır?",
            purpose:
              "Tevhid inancının hürriyet, adalet, merhamet ve tevazu gibi ahlâkî boyutlara nasıl dönüştüğünü yaşamak.",
            mainQuestion:
              "Tevhid inancı insanın günlük kararlarında ve insan ilişkilerinde nasıl görünür?",
            primarySource: "Sözler ve Mektubat — Tevhid bahisleri",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 5,
        title: "5. Ünite — Ahiretin İmkânı, Adalet ve Rahmet",
        period: "17–20. Haftalar",
        weeks: [
          {
            weekNumber: 17,
            topic: "Ahiret Mümkün mü?",
            purpose:
              "Akıl ve mantık kuralları çerçevesinde ahiretin kesin imkânını ve gerekliliğini kavramak.",
            mainQuestion:
              "Öldükten sonra diriliş aklen neden zor değil, bilakis son derece kolay ve makuldür?",
            primarySource: "Sözler — Onuncu Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 18,
            topic: "İlk Yaratılış Yeniden Yaratılışa Ne Söyler?",
            purpose:
              "Sıfırdan mükemmel var eden kudretin, dağılmış zerreleri yeniden toplamasının aklen çok daha kolay olduğunu görmek.",
            mainQuestion:
              "Bir orduyu sıfırdan kuran komutan, dağılmış askerleri bir boru sesiyle toplayamaz mı?",
            primarySource: "Onuncu Söz — İkinci ve Üçüncü Hakikat",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 19,
            topic: "Adalet Yarım Kalır mı?",
            purpose:
              "Bu dünyada zalimlerin zulmünün, mazlumların ahının karşılıksız kalmayacağı mutlak adalet yurdunu anlamak.",
            mainQuestion:
              "Milyonlarca masumun hakkının yendiği bir dünyada mutlak bir mahkeme olmaması düşünülebilir mi?",
            primarySource: "Onuncu Söz — Dördüncü Hakikat",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 20,
            topic: "Rahmet ve Hikmet Ahireti Düşündürür mü?",
            purpose:
              "Kâinattaki sonsuz şefkat, hikmet ve israfsızlığın insanı yokluk karanlığına terk etmeyeceğini bilmek.",
            mainQuestion:
              "İnsana sonsuz yaşama arzusu verip sonra onu tamamen yok etmek ilahi rahmetle bağdaşır mı?",
            primarySource: "Onuncu Söz — Beşinci ve Altıncı Hakikat",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 6,
        title: "6. Ünite — İrade, Kader ve Tevekkül",
        period: "21–24. Haftalar",
        weeks: [
          {
            weekNumber: 21,
            topic: "İnsan Ne Kadar Özgür?",
            purpose:
              "İnsanın cüz’î iradesi ile ilahi takdir arasındaki ince ve adil dengeyi kavramak.",
            mainQuestion: "Seçimlerimiz ne kadar bize aittir ve sorumluluğumuz nerede başlar?",
            primarySource: "Sözler — Yirmi Altıncı Söz / Kader Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 22,
            topic: "Seçmek ve Sonucuna Sahip Çıkmak",
            purpose:
              "Davranışlarımızın ahlâkî, hukukî ve uhrevî sorumluluğunu üstlenebilme olgunluğunu kazanmak.",
            mainQuestion:
              "Bir davranışı seçmek ile onun sonuçlarına katlanmak arasındaki ahlâkî bağ nedir?",
            primarySource: "Kader Risalesi; Pırlanta — İrade ve Mesuliyet",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 23,
            topic: "Kader Bir Mazeret Olabilir mi?",
            purpose:
              "Kaderi tembellik, günah ve hatalar için bir kaçış mazereti olarak kullanma yanılgısını çürütmek.",
            mainQuestion:
              "Bir hata yaptıktan sonra 'kaderimde varmış' demek neden dinen ve aklen yanlıştır?",
            primarySource: "Yirmi Altıncı Söz; kader ve cüz'î irade bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 24,
            topic: "Tevekkül ile Pasiflik Arasındaki Fark",
            purpose:
              "Sebeplere tam riayet ettikten sonra neticeyi Allah’a bırakmanın dinamik tevekkül olduğunu kavramak.",
            mainQuestion:
              "Tevekkül gayreti bırakmak mıdır, yoksa en yüksek gayretin ardından gelen teslimiyet mi?",
            primarySource: "Kader Risalesi; Pırlanta — Tevekkül Şuuru",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 7,
        title: "7. Ünite — Ene, Sahiplik ve Acziyet",
        period: "25–28. Haftalar",
        weeks: [
          {
            weekNumber: 25,
            topic: "Ene: “Ben” Duygusu Neden Verilmiş?",
            purpose:
              "İnsandaki 'ben' duygusunun ilahi isim ve sıfatları tanımak için bir ölçü aleti (vahid-i kıyasî) olduğunu çözmek.",
            mainQuestion:
              "İnsana 'ben' deme kabiliyeti firavunlaşması için mi, yoksa Rabbini tanıması için mi verilmiştir?",
            primarySource: "Sözler — Otuzuncu Söz / Ene bahsi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 26,
            topic: "Gerçekten Neye Sahibim?",
            purpose:
              "Sahte sahiplik iddialarından arınıp hakiki mülk sahibinin Allah olduğunu kavramak.",
            mainQuestion: "'Benim bedenim, benim zekâm, benim başarım' derken ne kadar haklıyız?",
            primarySource: "Sözler — Otuzuncu Söz; Altıncı Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 27,
            topic: "Acz ve Fakr Bir Eksiklik mi?",
            purpose:
              "Güçsüzlük ve ihtiyaçlarımızın insanı küçültmeyip Allah’ın sonsuz rahmet hazinelerine ulaştırdığını görmek.",
            mainQuestion: "İnsanın acz ve fakrı onu Allah katında nasıl en aziz bir misafir yapar?",
            primarySource: "Sözler — Yedinci Söz ve Yirmi Üçüncü Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 28,
            topic: "Kendini Tanımak Kulluğa Nasıl Götürür?",
            purpose:
              "Kendi sınırlarını, zayıflıklarını ve imkânlarını bilen insanın hakiki kulluk makamına ereceğini idrak etmek.",
            mainQuestion:
              "'Kendini bilen Rabbini bilir' hakikati günlük hayatımızda neye karşılık gelir?",
            primarySource: "Mesnevî-i Nuriye; Ene ve ubudiyet bahisleri",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 8,
        title: "8. Ünite — Dua, Şükür ve Kardeşlik Hukuku",
        period: "29–32. Haftalar",
        weeks: [
          {
            weekNumber: 29,
            topic: "Dua Sadece İstemek mi?",
            purpose:
              "Duanın başlı başına bir ubudiyet ve kulluk olduğunu, sadece ihtiyaç anlarında hatırlanmayacağını anlamak.",
            mainQuestion:
              "Dua bir istek listesi midir, yoksa kulun Rabbiyle olan dertleşmesi ve teslimiyeti mi?",
            primarySource: "Risale-i Nur’da dua bahisleri; Pırlanta — Dua Ufku",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 30,
            topic: "Duanın Kabulü Ne Demektir?",
            purpose:
              "Her duaya cevap verildiğini, ancak en hikmetli ve hayırlı şekilde kabul edildiğini kavramak.",
            mainQuestion:
              "Bir duamız aynen gerçekleşmediğinde 'kabul olmadı' demek neden yanılgıdır?",
            primarySource: "Mektubat — Yirmi Dördüncü Mektup; Yirmi Üçüncü Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 31,
            topic: "Şükür: Nimeti Görmek ve Yerinde Kullanmak",
            purpose:
              "Şükrü hayat tarzı yaparak nimetleri israf etmeden, veriliş gayesine uygun kullanma ahlâkı kazanmak.",
            mainQuestion: "Nimeti vereni tanımadan nimeti tüketmek nankörlük müdür?",
            primarySource: "Mektubat — Şükür Risalesi; Pırlanta — Şükür",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 32,
            topic: "Kardeşlik, Farklılık ve Adalet",
            purpose:
              "Fikir ve mizaç farklılıklarına rağmen kardeşlik hukukunu koruyup adaletten ayrılmamak.",
            mainQuestion:
              "Bizim gibi düşünmeyen bir Müslüman kardeşimize karşı adalet ve hürmeti nasıl koruruz?",
            primarySource: "Mektubat — Yirmi İkinci Mektup / Uhuvvet Risalesi",
            isFamilyRespectHighlight: true,
          },
        ],
      },
      {
        unitNumber: 9,
        title: "9. Ünite — Eleştiri, Soru ve Kaynaktan Cümleye",
        period: "33–36. Haftalar",
        weeks: [
          {
            weekNumber: 33,
            topic: "Eleştiri, Gıybet ve Sınır",
            purpose:
              "Yapıcı eleştiri ile yıkıcı gıybet arasındaki ahlâkî ve hukukî sınırı netleştirmek.",
            mainQuestion:
              "Bir yanlışı düzeltmek ile o kişinin şahsiyetini karalamak arasındaki çizgi nerededir?",
            primarySource: "Yirmi İkinci Mektup — Hâtime; Pırlanta — Uhuvvet",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 34,
            topic: "Benim Gerçek Sorum Ne?",
            purpose:
              "İmanî veya ahlâkî sahada kendi zihnini meşgul eden samimi ve özgün bir soruyu tespit etmek.",
            mainQuestion:
              "Ben şu anda hayatımda ve inancımda en çok hangi sorunun cevabını arıyorum?",
            primarySource: "Öğrencinin kendi soru haritası; Risale konu rehberi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 35,
            topic: "Risale’de Kaynağı Kendim Buluyorum",
            purpose:
              "Belirlediği soru için Risale külliyatından ilgili bahisleri bizzat araştırıp bulabilme yetkinliği kazanmak.",
            mainQuestion: "Soruma cevap veren pasajı indeks ve kavramlar yardımıyla nasıl bulurum?",
            primarySource: "İlgili Risale bölümü ve kavram taraması",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 36,
            topic: "İki Kaynaktan Kendi Cümleme",
            purpose:
              "Risale ve Pırlanta kaynaklarından çıkardığı ana fikri kendi özgün cümleleriyle sentezleyebilmek.",
            mainQuestion:
              "Bulduğum iki kaynaktaki ortak hakikati kendi dilimle açık ve anlaşılır biçimde yazabilir miyim?",
            primarySource: "Öğrencinin seçtiği Risale + Pırlanta kaynakları",
            isFamilyRespectHighlight: false,
          },
        ],
      },
    ],
  },
  {
    grade: 5,
    code: "M5",
    schoolLevel: "Lise 2",
    title: "M5 Lise 2 36 Haftalık Yıllık Planı",
    stage: "Tahkik, Delil ve Mukayese",
    motto:
      "Okuduğum bir iddianın neye dayandığını araştırıyor, kaynakları karşılaştırarak kendi kanaatimi kurmaya çalışıyorum.",
    yearEndOutcome:
      "Kendi sorusunu belirleyip Risale ve Pırlanta’dan kaynak toplayarak küçük bir tahkik dosyası hazırlayabilmesi.",
    outcomeStatement:
      "Bir imanî veya ahlâkî meselede aslî metni bulabiliyor, iddia ile delili ayırabiliyor, ikinci bir güvenilir kaynakla mukayese ediyor ve vardığım kanaati kendi cümlemle ifade edebiliyorum.",
    coreGoals: [
      "Risale-i Nur ve Pırlanta metinlerinde yalnız 'ne söyleniyor?' değil, 'hangi delile dayanıyor?' sorusunu sormaya başlaması.",
      "Bir metindeki aslî ifade, delil, temsil, sade açıklama ve kişisel yorumu birbirinden ayırabilmesi.",
      "Aynı meseleye bakan iki güvenilir kaynağı mukayese ederek ortak ve farklı vurguları görebilmesi.",
      "Tevhid, sebepler, ahiret, kader-irade, ene, musibet, dua, aile/vefa, ihlâs ve hizmet başlıklarında tahkikî düşünmesi.",
      "Kendi sorusunu belirleyip Risale ve Pırlanta’dan kaynak toplayarak küçük bir tahkik dosyası hazırlayabilmesi.",
    ],
    methodSteps: [
      "SORU",
      "ASLÎ METİN",
      "İDDİA",
      "DELİL / TEMSİL",
      "BAĞLAM",
      "İKİNCİ KAYNAK",
      "MUKAYESE",
      "KENDİ KANAATİNİ SINIRLARIYLA YAZ",
    ],
    familyRespectFocus: "Yaşlanan ebeveyne bakım, vefa, dua ve fedakârlık.",
    units: [
      {
        unitNumber: 1,
        title: "1. Ünite — Derin Okuma, Delil ve Argüman",
        period: "1–4. Haftalar",
        weeks: [
          {
            weekNumber: 1,
            topic: "Bu Yıl Bir Metni Nasıl Daha Derin Okuyacağız?",
            purpose:
              "Yüzeysel okumadan analitik ve tahkikî okuma düzeyine geçiş yöntem ve disiplinini kazanmak.",
            mainQuestion:
              "Bir metni anlamakla, onun hangi delillere dayandığını tahkik etmek arasında ne fark vardır?",
            primarySource: "M5 tahkik yöntemi; Nurlardan Seçmeler-2; Pırlanta tefekkür bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 2,
            topic: "Bediüzzaman: İman Hakikatlerini Neden Delille Anlatıyor?",
            purpose:
              "Taklidî imandan tahkikî imana geçişte aklî, mantıkî ve tecrübî delillerin rolünü kavramak.",
            mainQuestion:
              "Bir iman meselesinde sadece dogmatik hüküm vermek yerine neden basamak basamak delil kurulur?",
            primarySource: "Tarihçe-i Hayat; Şuâlar; Muhakemat",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 3,
            topic: "Hocaefendi: Bir Meseleyi Farklı Kaynaklarla Nasıl Okuruz?",
            purpose:
              "Aynı hakikatin farklı kaynaklar ve açılardan okunmasının getirdiği derinlik ve zenginliği görmek.",
            mainQuestion:
              "Risale ve Pırlanta metinlerini mukayeseli okumak düşünce dünyamıza ne katar?",
            primarySource: "Kendi Dünyamıza Doğru; Kırık Testi serisi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 4,
            topic: "İddia, Delil, Temsil ve Yorum",
            purpose:
              "Bir metindeki tezi, ispatı, benzetmeyi ve kişisel yorumu birbirinden ayırt edebilmek.",
            mainQuestion:
              "Yazarın iddiası, gösterdiği delil, kullandığı temsil ve bizim yorumumuz nasıl ayrılır?",
            primarySource: "Muhakemat; argüman tahlil metodolojisi",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 2,
        title: "2. Ünite — Argüman Haritalama, İtiraz ve Kanunlar",
        period: "5–8. Haftalar",
        weeks: [
          {
            weekNumber: 5,
            topic: "Bir Argümanı Nasıl Haritalandırırım?",
            purpose:
              "Bir metnin mantıksal akışını, öncüllerini ve delil basamaklarını haritalandırabilmek.",
            mainQuestion:
              "Bir Risale bahsindeki mantık zincirini şema hâlinde görselleştirebilir miyiz?",
            primarySource: "Muhakemat — Unsuru’l-Akıl; argüman haritalama",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 6,
            topic: "Bir İtirazı Doğru Anlamak",
            purpose:
              "Karşıt argümanları karikatürleştirmeden, önyargısız dinleyip meselenin özünü kavrama olgunluğu.",
            mainQuestion:
              "Bir fikre itiraz etmeden önce onun gerçekte ne söylediğini tam olarak dinledik mi?",
            primarySource: "Muhakemat; Münazarat; diyalog prensipleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 7,
            topic: "Kanun Bir Şeyi Yapar mı, Tarif mi Eder?",
            purpose:
              "Fizikî doğa kanunlarının fail değil, ilahi nizamın tarifnamesi olduğunu delillendirebilmek.",
            mainQuestion:
              "'Yerçekimi kanunu yaptı' demek bir olayı gerçekten açıklamak mıdır, yoksa adını koymak mı?",
            primarySource: "Tabiat Risalesi; tevhid ve kanun bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 8,
            topic: "Sebep ile Yaratıcıyı Ayırmak",
            purpose:
              "İlliyet (nedensellik) bağı ile yaratılış arasındaki ontolojik farkı netleştirmek.",
            mainQuestion:
              "Bir tohumun meyveye dönüşmesinde toprak, su ve güneş yaratıcı mıdır, yoksa perde mi?",
            primarySource: "Lem’alar — Yirmi Üçüncü Lem’a / Tabiat Risalesi",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 3,
        title: "3. Ünite — Tesadüf, Bilim ve Delilin Gücü",
        period: "9–12. Haftalar",
        weeks: [
          {
            weekNumber: 9,
            topic: "Tesadüf Ne Kadar Açıklayıcıdır?",
            purpose:
              "Olasılık hesapları ve kâinattaki hassas ayarlar karşısında tesadüfün mantıksal imkânsızlığını görmek.",
            mainQuestion:
              "Tesadüf kelimesi bir düzenin nasıl ortaya çıktığını gerçekten açıklar mı, yoksa cehaleti mi örter?",
            primarySource: "Tabiat Risalesi; hassas ayar (fine-tuning) argümanları",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 10,
            topic: "Bilimsel Açıklama ile “Niçin?” Sorusu",
            purpose:
              "Bilimin 'nasıl' sorusu ile din ve felsefenin 'niçin' sorusunun birbirini nasıl tamamladığını anlamak.",
            mainQuestion:
              "Suyun kaynama derecesini bilmek çayın kimin için demlendiği sorusunu cevaplar mı?",
            primarySource: "Tabiat Risalesi; Pırlanta — İlim ve Din",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 11,
            topic: "Bilim ile İman Zorunlu Olarak Çatışır mı?",
            purpose: "Akıl, sahih bilim ve vahiy arasındaki ahengi kavrayıp çatışma mitini aşmak.",
            mainQuestion:
              "Kâinat kitabı ile vahyedilen Kur'an aynı Sanatkâr'ın eseri ise aralarında çelişki olabilir mi?",
            primarySource: "Muhakemat; Pırlanta — İlim ve İman",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 12,
            topic: "Bir Delilin Gücü Nasıl Değerlendirilir?",
            purpose:
              "Mantıksal çıkarımların sıhhatini, sağlamlığını ve ikna kabiliyetini tartabilme becerisi kazanmak.",
            mainQuestion:
              "Bir argümanın güçlü ya da zayıf olduğunu hangi ölçütlerle değerlendiririz?",
            primarySource: "Muhakemat; mantık ve tefekkür bahisleri",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 4,
        title: "4. Ünite — Ahiretin İmkânı, Adalet ve İtirazlar",
        period: "13–16. Haftalar",
        weeks: [
          {
            weekNumber: 13,
            topic: "Ahiret Hakkında “Mümkün” Ne Demektir?",
            purpose:
              "İmkân-ı zihnî ve vukuat kavramlarını tahlil ederek ahiretin aklen imkânını temellendirmek.",
            mainQuestion:
              "Bir şey bize alışılmadık ve olağanüstü geliyor diye aklen imkânsız mıdır?",
            primarySource: "Sözler — Onuncu Söz / Birinci Mukaddime",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 14,
            topic: "İlk Yaratılış ile Yeniden Yaratılış",
            purpose:
              "Sıfırdan yaratılışı kabul edip yeniden yaratılışı uzak görmenin mantıksal çelişkisini çözmek.",
            mainQuestion:
              "İlk defa insanı yoktan var eden kudret için ikinci defa diriltmek neden zor olsun?",
            primarySource: "Onuncu Söz — İkinci ve Sekizinci Hakikat",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 15,
            topic: "Adalet Neden Tamamlanmak İster?",
            purpose:
              "Vicdanın ve ahlâkın gereği olan mutlak adaletin ahiretsiz olamayacağını delillendirmek.",
            mainQuestion:
              "Bu dünyada hesabı sorulmayan haksızlıklar adil bir Kâinat Yöneticisi karşısında neyi gerektirir?",
            primarySource: "Onuncu Söz — Dördüncü Hakikat",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 16,
            topic: "Rahmet ve Hikmet Penceresinden Ahiret",
            purpose:
              "Kâinattaki israfsızlık, sonsuz şefkat ve güzelliğin ebediyeti zorunlu kıldığını ispatlamak.",
            mainQuestion:
              "Gözü yaratan kudretin görmeyi, midemizi yaratanın rızkı vermesi gibi; sonsuzluk arzusunu veren ebedî yurdu vermez mi?",
            primarySource: "Onuncu Söz — Beşinci ve Altıncı Hakikat",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 5,
        title: "5. Ünite — Kanaat, Özgürlük ve Kader",
        period: "17–20. Haftalar",
        weeks: [
          {
            weekNumber: 17,
            topic: "Ahiret Delillerine Hangi İtirazlar Yapılabilir?",
            purpose:
              "Ahiret inancına yöneltilen modern materyalist itirazları ve bunlara verilen köklü cevapları incelemek.",
            mainQuestion:
              "Maddeci düşüncenin ahiret konusundaki en temel itirazları nelerdir ve nerede tıkanır?",
            primarySource: "Onuncu Söz — Hâtime ve mukaddimeler",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 18,
            topic: "Delil ile Kanaat Arasında",
            purpose:
              "Mantıkî delillerin kalbî tatmin ve vicdanî kanaatle nasıl birleştiğini anlamak.",
            mainQuestion:
              "Aklın ikna olması ile kalbin mutmain olması arasında nasıl bir köprü vardır?",
            primarySource: "Sözler; Pırlanta — İman ve İtminan",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 19,
            topic: "Özgürlük: Seçebilmek mi, Sınırsızlık mı?",
            purpose:
              "Gerçek hürriyetin nefsin esaretinden kurtulup hakka ve adalete teslimiyet olduğunu kavramak.",
            mainQuestion:
              "İstediği her hevesi yapan insan mı daha özgürdür, yoksa nefsine dur diyebilen mi?",
            primarySource: "Münazarat — Hürriyet bahsi; Gençlik Rehberi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 20,
            topic: "Şartlarım Seçimlerimi Belirler mi?",
            purpose:
              "Çevresel ve maddî şartların determinizmi karşısında insan iradesinin manevî gücünü görmek.",
            mainQuestion:
              "Zor şartlar altında bile erdemli seçimler yapabilme gücümüz nereden gelir?",
            primarySource: "Kader Risalesi; Pırlanta — İrade Kahramanları",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 6,
        title: "6. Ünite — Tevekkül, Ene ve Başarı",
        period: "21–24. Haftalar",
        weeks: [
          {
            weekNumber: 21,
            topic: "Kader Mazeret Olabilir mi?",
            purpose:
              "Cebriyecilik ve fatalizm yanılgılarını Kur'an ve Risale ekseninde aklen çürütmek.",
            mainQuestion: "Bir insan kendi isteğiyle işlediği suçu kadere yükleyebilir mi?",
            primarySource: "Sözler — Yirmi Altıncı Söz / Kader Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 22,
            topic: "Tevekkül: Çalışmanın Sonrası mı, Yerine Geçeni mi?",
            purpose:
              "Tevekkülü tembelliğin kılıfı değil, sa'y ve cehitle sebeplere riayetin neticesi kılmak.",
            mainQuestion:
              "Çalışmadan tevekkül etmek ile çalışıp tevekkül etmek arasındaki uçurum nedir?",
            primarySource: "Yirmi Altıncı Söz; Pırlanta — Sa'y ve Tevekkül",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 23,
            topic: "“Ben” Duygusu Bir Ölçü Aleti Olabilir mi?",
            purpose:
              "Enaniyet ve benlik duygusunun ilahi sıfatları bilmek için bir kıyas anahtarı kılındığını tahkik etmek.",
            mainQuestion:
              "İnsan kendi cüzi ilim ve kudretiyle Allah'ın sonsuz ilim ve kudretini nasıl anlar?",
            primarySource: "Sözler — Otuzuncu Söz / Ene Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 24,
            topic: "Başarı Benim mi?",
            purpose:
              "Elde edilen başarıları kendi nefsine mal edip kibirlenmek yerine şükür ve tevazu vesilesi yapmak.",
            mainQuestion:
              "Bir başarıda bizim payımız sadece istemek ve çalışmak iken neticeyi yaratan kimdir?",
            primarySource: "Sözler — Otuzuncu Söz; Altıncı Söz",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 7,
        title: "7. Ünite — Kibir, Başarısızlık ve Musibet",
        period: "25–28. Haftalar",
        weeks: [
          {
            weekNumber: 25,
            topic: "Kendini Değerli Görmek ile Kibir Arasındaki Çizgi",
            purpose:
              "İzzet ile gurur, tevazu ile tezellül arasındaki ince ahlâkî sınırı ayırt etmek.",
            mainQuestion:
              "Müminin izzetini koruması ile kibirlenmesi arasındaki kritik fark nedir?",
            primarySource: "Lem’alar — Yirmi Birinci Lem’a; Pırlanta — İzzet ve Tevazu",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 26,
            topic: "Başarısızlık Kimliğim midir?",
            purpose:
              "Hataları ve yenilgileri kalıcı bir kimlik değil, öğrenme ve manevî terakki fırsatı olarak okumak.",
            mainQuestion:
              "Başarısızlık insanı değersizleştirir mi, yoksa eksiklerini gösterip olgunlaştırır mı?",
            primarySource: "Pırlanta — Şahsiyet; Risale musibet bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 27,
            topic: "Musibet: Her Sıkıntı Aynı Şekilde mi Okunur?",
            purpose:
              "Hastalık ve musibetlerin ceza değil, bazen günahlara kefaret, bazen manevî terfi vesilesi olduğunu bilmek.",
            mainQuestion:
              "Başa gelen bir sıkıntı Allah’ın gazabı mıdır, yoksa bir uyarı ve terfi vesilesi mi?",
            primarySource: "Lem’alar — İkinci Lem’a ve Yirmi Beşinci Lem’a / Hastalar Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 28,
            topic: "Sabır Pasif Bekleyiş midir?",
            purpose:
              "Sabrın musibete, günaha ve ibadete karşı aktif, dinamik bir irade direnci olduğunu kavramak.",
            mainQuestion:
              "Sabır sadece katlanmak mıdır, yoksa hak yolda azimle yürümeye devam etmek mi?",
            primarySource: "İkinci Lem’a; Pırlanta — Sabır Ufku",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 8,
        title: "8. Ünite — Dua, Ümit, Adalet ve Nasihat",
        period: "29–32. Haftalar",
        weeks: [
          {
            weekNumber: 29,
            topic: "Dua Ediyorum; Neden Aynısı Olmuyor?",
            purpose:
              "Duanın kabul mertebelerini ve kulun dar aklıyla değil, ilahi hikmetle en hayırlı cevabın verildiğini idrak etmek.",
            mainQuestion:
              "İstediğimiz şeyin aynen gerçekleşmemesi duanın reddedildiği anlamına gelir mi?",
            primarySource: "Mektubat — Yirmi Dördüncü Mektup; Yirmi Üçüncü Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 30,
            topic: "Ümit Ne Zaman Gerçekçi Olur?",
            purpose:
              "Kuru hayalcilik ile emek ve gayretle beslenen hakiki recâ arasındaki farkı görmek.",
            mainQuestion:
              "Hiç tohum ekmeden hasat ümit etmek ile ekip tevekkülle beklemek arasındaki fark nedir?",
            primarySource: "Hutbe-i Şamiye; Pırlanta — Recâ ve Ümit",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 31,
            topic: "Dijital Dünyada Gıybet, Mahremiyet ve Adalet",
            purpose:
              "Sanal mecralarda kişilik hakları, iftira, mahremiyet ve kul hakkı hassasiyetini titizlikle muhafaza etmek.",
            mainQuestion:
              "Sosyal medyada bir paylaşımın altına yazdığımız eleştiri kul hakkına girer mi?",
            primarySource: "Yirmi İkinci Mektup — Hâtime; Pırlanta — Mahremiyet ve Adalet",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 32,
            topic: "Eleştiri ve Nasihat: Doğruyu Söylemenin Adabı",
            purpose:
              "Hakkı ve doğruyu söylerken muhatabı incitmeden, hikmet ve nezaketle tebliğ edebilmek.",
            mainQuestion: "Doğru bir şeyi yanlış bir üslupla söylemek hakikate zarar verir mi?",
            primarySource: "Münazarat; Pırlanta — İrşad ve Tebliğ Adabı",
            isFamilyRespectHighlight: true,
          },
        ],
      },
      {
        unitNumber: 9,
        title: "9. Ünite — Tahkik Sorusundan Neticeye",
        period: "33–36. Haftalar",
        weeks: [
          {
            weekNumber: 33,
            topic: "Benim Tahkik Sorum Ne?",
            purpose:
              "Lise seviyesine uygun, hem aklî hem ahlâkî derinliği olan bir tahkik konusunu netleştirmek.",
            mainQuestion:
              "İman veya hayat meselelerinde delilleriyle araştırmak istediğim merkezî soru nedir?",
            primarySource: "Öğrencinin tahkik soru önerisi; külliyat haritası",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 34,
            topic: "Kaynakları Toplamak ve Ayırmak",
            purpose:
              "Seçtiği konuda birincil metinleri, şerhleri ve dış kaynakları toplayıp tasnif edebilmek.",
            mainQuestion: "Bir konuda aslî metin ile ikincil kaynakları nasıl ayırır ve derleriz?",
            primarySource: "Külliyat indeksleri ve dijital kütüphaneler",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 35,
            topic: "İki Kaynağı Mukayese Etmek",
            purpose:
              "Risale ve Pırlanta metinlerini mukayese ederek ortak vurguları ve özgün nüansları ortaya çıkarmak.",
            mainQuestion:
              "İki farklı güvenilir metin aynı meseleyi hangi ortak ve farklı açılardan ele alıyor?",
            primarySource: "Seçilen Risale ve Pırlanta metinleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 36,
            topic: "Tahkik Dosyam: Ne Sonuca Vardım?",
            purpose:
              "Yaptığı araştırmanın neticesini delillere dayalı, sınırları belli ve ölçülü bir rapor hâlinde ifade etmek.",
            mainQuestion:
              "Araştırmamın sonucunda neyi kesin bildiğimi, neyi yorumladığımı açıkça ifade edebiliyor muyum?",
            primarySource: "Öğrencinin hazırladığı tahkik dosyası",
            isFamilyRespectHighlight: false,
          },
        ],
      },
    ],
  },
  {
    grade: 6,
    code: "M6",
    schoolLevel: "Lise 3",
    title: "M6 Lise 3 36 Haftalık Yıllık Planı",
    stage: "Bütünlük, Şahsî Duruş ve Temsil",
    motto:
      "Kaynaklarımdan besleniyor, parçaları birleştiriyor ve inandığım hakikati sözüm, üslubum ve hayatımla tutarlı biçimde ifade etmeye çalışıyorum.",
    yearEndOutcome:
      "Yıl sonunda şahsî kaynak haritası, kısa araştırma/ifade dosyası ve müfredat sonrası sürdürülebilir okuma planı oluşturması.",
    outcomeStatement:
      "Kaynaklarıma dayanarak kendi cümlemi kurabiliyor; neyi kesin bildiğimi, neyi yorumladığımı ayırıyor; farklı görüşleri adaletle dinliyor ve inandığım değerleri sözüm, üslubum ve hayatımla tutarlı biçimde temsil etmeye çalışıyorum.",
    coreGoals: [
      "Önceki yıllarda öğrenilen imanî ve ahlâkî başlıkları birbirinden kopuk bilgiler değil, birbiriyle ilişkili bir dünya görüşü olarak okuması.",
      "Bir meselede neyi kesin bildiğini, neye güçlü kanaat duyduğunu ve nerede yorum yaptığını ayırabilmesi.",
      "Risale ve Pırlanta’dan aldığı bir hakikati karşı görüşü karikatürleştirmeden, ölçülü ve muhataba uygun biçimde ifade edebilmesi.",
      "Kimlik, meslek, aile, toplum, hizmet, kayıp, ölüm, ümit ve dijital temsil gibi yetişkinliğe geçiş meselelerinde kaynak merkezli düşünmesi.",
    ],
    methodSteps: [
      "SORU",
      "KAYNAK",
      "TAHLİL",
      "BÜTÜNLEŞTİR",
      "KESİNLİK DERECESİNİ BELİRLE",
      "ŞAHSÎ CÜMLE KUR",
      "ÖLÇÜLÜ İFADE / TEMSİL",
      "GERİ DÖNÜP GÖZDEN GEÇİR",
    ],
    familyRespectFocus:
      "Evden bağımsızlaşırken bağı sürdürmek; gelecekte aile ve ebeveynlik sorumluluğu.",
    units: [
      {
        unitNumber: 1,
        title: "1. Ünite — Bütünlük, Duruş ve Temsil",
        period: "1–4. Haftalar",
        weeks: [
          {
            weekNumber: 1,
            topic: "Bu Yıl Parçaları Nasıl Bir Bütüne Dönüştüreceğiz?",
            purpose:
              "6 yıl boyunca öğrenilen iman ve ahlâk hakikatlerini tutarlı ve bütüncül bir hayat nizamına dönüştürmek.",
            mainQuestion:
              "Yıllardır öğrendiğimiz hakikatler hayatımızda nasıl tek bir istikamet ve duruş oluşturur?",
            primarySource: "Kendi Dünyamıza Doğru; Risale’de iman-hayat bütünlüğü",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 2,
            topic: "Bediüzzaman: Bir Ömür Nasıl Bir Merkez Etrafında Toplanır?",
            purpose:
              "Hayatın farklı evrelerini ve imtihanlarını tek bir ulvî ideale vakfetme şuurunu kavramak.",
            mainQuestion:
              "Bir insanın bütün kararlarını ve fedakârlıklarını tek bir ana gaye nasıl birleştirir?",
            primarySource: "Tarihçe-i Hayat; iman hizmeti ve mesuliyet çizgisi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 3,
            topic: "Hocaefendi: Sözden Önce Temsil",
            purpose:
              "İnanılan değerlerin kuru lafta kalmayıp hâl, tavır, ahlâk ve üslupla temsil edilmesinin önceliğini bilmek.",
            mainQuestion:
              "Hayatımız ve ahlâkımız söylediğimiz hakikati desteklemiyorsa sözümüzün etkisi ne olur?",
            primarySource: "Pırlanta — Temsil ve Hâl Dili",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 4,
            topic: "Bir Hakikati Doğru ve Ölçülü Nasıl Anlatırım?",
            purpose:
              "Muhatabın seviyesini, ihtiyacını ve psikolojisini gözeterek hikmet ve ölçüyle anlatabilmek.",
            mainQuestion:
              "Doğru bir hakikati karşıdakinin kaldıramayacağı bir ağırlıkta sunmak doğru mudur?",
            primarySource: "Risale’de temsil ve üslup; Pırlanta — İrşad Adabı",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 2,
        title: "2. Ünite — Soru, Şüphe, Akıl ve İtiraz",
        period: "5–8. Haftalar",
        weeks: [
          {
            weekNumber: 5,
            topic: "Şüphe ile Soru Aynı Şey mi?",
            purpose:
              "Hakikate ulaştıran samimi soru ile inancı yıpratmayı amaçlayan yıkıcı şüpheyi ayırt etmek.",
            mainQuestion:
              "Zihnimize gelen bir soru imanın zayıflığı mıdır, yoksa tahkikî imana bir çağrı mı?",
            primarySource: "Sözler — Yirmi Birinci Söz / Vesvese bahsi; Muhakemat",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 6,
            topic: "Kesin Bildiğim, Kuvvetle Kanaat Ettiğim ve Yorumladığım Şey",
            purpose:
              "Bilgi derecelerini ayırt ederek dogmatizmden ve sübjektif yorumları dinleştirmekten korunmak.",
            mainQuestion:
              "Düşüncelerimizde kesin naslar, güçlü kanaatler ve kişisel yorumlar arasındaki farkı nasıl koruruz?",
            primarySource: "Muhakemat; usul prensipleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 7,
            topic: "İtirazı Dinlemek Neden Önemlidir?",
            purpose:
              "Karşıt fikirleri peşin hükümle reddetmeden adalet ve nezaketle dinleyip hakikatin hatırını üstün tutmak.",
            mainQuestion:
              "Karşı fikri tam anlamadan cevap yetiştirmeye çalışmak hakikati savunmak mıdır?",
            primarySource: "Muhakemat; Uhuvvet Risalesi; Pırlanta — Diyalog",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 8,
            topic: "İman ile Akıl Arasında Çatışma Zorunlu mu?",
            purpose:
              "Selim akıl ile sahih imanın birbirini besleyen ve tamamlayan doğasını derinlemesine kavramak.",
            mainQuestion:
              "Akıl yürütmek ile iman etmek birbirinin zıddı mıdır, yoksa iki ayrılmaz refik mi?",
            primarySource: "Risale’nin aklî delilleri; Pırlanta — İlim ve İman Ufku",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 3,
        title: "3. Ünite — Kur’an, Risale ve Temsil Derinliği",
        period: "9–12. Haftalar",
        weeks: [
          {
            weekNumber: 9,
            topic: "Kur’an’ın Katmanlı Hitabını Olgunlukla Okumak",
            purpose:
              "İlahi kelamın her çağa ve her seviyeye bakan çok boyutlu derinliğini edeple kavramak.",
            mainQuestion:
              "Kur'an'ın bir âyetinin aynı anda hem sade bir köylüye hem büyük bir filozofa hitap etmesi nasıl mümkündür?",
            primarySource: "Sözler — Yirmi Beşinci Söz / Mu'cizât-ı Kur'aniye",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 10,
            topic: "Risale’de Bir Kavramı Ağ İçinde Okumak",
            purpose:
              "Kavramları tek bir cümlede değil, külliyatın bütünü içindeki anlamsal ağıyla birlikte tahlil etmek.",
            mainQuestion:
              "Bir kavramı farklı risalelerdeki bağlamlarıyla takip etmek bize nasıl bir derinlik kazandırır?",
            primarySource: "Külliyat içi kavram tahlili ve semantik okuma",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 11,
            topic: "Temsil ile Delil Aynı Şey mi?",
            purpose:
              "Temsilin zihni yaklaştırma işlevi ile mantıkî delilin kesin ispat gücü arasındaki farkı bilmek.",
            mainQuestion:
              "Bir temsil bir hakikati zihnimize yaklaştırırken tek başına kesin ispat sayılır mı?",
            primarySource: "Sözler’de temsiller; Muhakemat",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 12,
            topic: "Tekrar Okumak: Aynı Metinde Yeni Bağlantılar",
            purpose:
              "Yaş aldıkça ve tecrübe kazandıkça aynı metne dönüp daha önce fark edilmeyen incelikleri görmek.",
            mainQuestion:
              "Yıllar sonra aynı risaleyi açtığımızda neden yepyeni bir kitap okuyormuş gibi hissederiz?",
            primarySource: "Tarihçe-i Hayat; Kırık Testi — Kitap Okuma Şuuru",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 4,
        title: "4. Ünite — Kimlik, Meslek, Başarı ve Kazanç",
        period: "13–16. Haftalar",
        weeks: [
          {
            weekNumber: 13,
            topic: "Ben Kimim? Rollerim mi, Değerlerim mi?",
            purpose:
              "Sosyal roller (öğrenci, meslek, unvan) değişirken kimliğin merkezine ebedî ahlâkî değerleri koyabilmek.",
            mainQuestion: "Bütün unvan ve rollerimiz elimizden gitse geriye bizden ne kalır?",
            primarySource: "Sözler — Otuzuncu Söz; Yirmi Üçüncü Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 14,
            topic: "Hayat Gayesi ve Meslek Seçimi",
            purpose:
              "Meslek seçimini sadece para ve statü değil, topluma hizmet ve kulluk vasıtası olarak konumlandırmak.",
            mainQuestion:
              "Bir mesleği seçerken dünyevî kazanç ile hayat gayemiz arasındaki dengeyi nasıl kurarız?",
            primarySource: "Altıncı Söz; emanet ve istidat bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 15,
            topic: "Başarı, Statü ve Rıza",
            purpose:
              "İnsanların alkışı ve statü tuzağına düşmeden yalnızca Allah’ın rızasını yegâne kıstas edinmek.",
            mainQuestion:
              "Herkesin alkışladığı ama Allah'ın razı olmadığı bir başarı gerçek bir başarı mıdır?",
            primarySource: "Lem’alar — Yirmi Birinci Lem’a / İhlâs Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 16,
            topic: "Para, Kazanç ve Tüketim Ahlâkı",
            purpose:
              "Helâl kazanç, iktisat ve kanaat bilinciyle tüketim çılgınlığı ve gösterişe karşı durabilmek.",
            mainQuestion:
              "Sahip olduklarımızın efendisi miyiz, yoksa tüketim arzularımızın kölesi mi?",
            primarySource: "Lem’alar — On Dokuzuncu Lem’a / İktisat Risalesi",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 5,
        title: "5. Ünite — Kararlar, Belirsizlik ve Aile",
        period: "17–20. Haftalar",
        weeks: [
          {
            weekNumber: 17,
            topic: "Karar Verirken Dua, İstişare ve Sorumluluk",
            purpose:
              "Hayatî dönemeçlerde akıl, istişare, dua ve iradeyi birleştirip kararının sorumluluğunu üstlenmek.",
            mainQuestion:
              "Zor bir kararda dua ve istişare yapmak şahsî sorumluluğumuzu ortadan kaldırır mı?",
            primarySource: "Meşveret ve tevekkül bahisleri; Pırlanta — İstişare Ahlâkı",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 18,
            topic: "Belirsizlikle Yaşamak ve Tevekkül",
            purpose:
              "Geleceğin belirsizlikleri karşısında anksiyeteye kapılmayıp Allah’ın rahmetine güvenle teslim olmak.",
            mainQuestion: "Kontrol edemediğimiz bir gelecekle huzur içinde yaşamanın yolu nedir?",
            primarySource: "Sözler — Yedinci Söz; Pırlanta — Tevekkül",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 19,
            topic: "Evden Bağımsızlaşırken Bağı Korumak",
            purpose:
              "Kendi ayakları üzerinde dururken anne-babayla vefa, sevgi ve hürmet bağını daha da olgunlaştırmak.",
            mainQuestion:
              "Bağımsız bir birey olmak ile anne-babaya hürmetkâr bir evlat olmak nasıl birleşir?",
            primarySource: "Lem’alar — Yirmi Dördüncü Lem’a; Hocaefendi vaazı",
            isFamilyRespectHighlight: true,
          },
          {
            weekNumber: 20,
            topic: "Gelecekte Aile Kurmak: Hak, Sorumluluk ve Merhamet",
            purpose:
              "Aile müessesesini romantik bir heves değil, sevgi, şefkat ve ilahi bir emanet kalesi olarak görmek.",
            mainQuestion:
              "Gelecekte kuracağımız ailenin sağlam temelleri hangi ahlâkî değerler üzerine kurulur?",
            primarySource: "Aile Risalesi; Pırlanta — Aile ve Toplum",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 6,
        title: "6. Ünite — Ebeveyn, Adalet ve Toplum",
        period: "21–24. Haftalar",
        weeks: [
          {
            weekNumber: 21,
            topic: "Yaşlanan Ebeveyn, Zaman ve Fedakârlık",
            purpose:
              "Yaşlanan anne-babaya şefkat, hizmet ve fedakârlığın cennet vesilesi en büyük borç olduğunu bilmek.",
            mainQuestion:
              "Anne-babamız yaşlandığında onlara gösterdiğimiz sabır ve şefkat vefamızın neresindedir?",
            primarySource: "Lem’alar — Yirmi Dördüncü Lem’a; İsrâ Suresi tefsiri",
            isFamilyRespectHighlight: true,
          },
          {
            weekNumber: 22,
            topic: "Aile İçinde Fikir Ayrılığı ve Sınır",
            purpose:
              "Aile içi farklılıklarda kırıcı olmadan, saygı, sevgi ve edep sınırlarını titizlikle korumak.",
            mainQuestion:
              "Fikir ayrılığı yaşadığımızda anne-babamıza karşı hürmet çizgisini nasıl muhafaza ederiz?",
            primarySource: "Uhuvvet Risalesi; ma'ruf ile muamele ilkesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 23,
            topic: "Adalet ve Merhamet Birbirinin Rakibi mi?",
            purpose:
              "Adalet ile merhametin birbirini dışlamayan, birlikte tecelli eden iki temel fazilet olduğunu görmek.",
            mainQuestion:
              "Bir haksızlık karşısında hem adaletli hem merhametli davranmak nasıl mümkün olur?",
            primarySource: "Uhuvvet Risalesi; Pırlanta — Adalet ve Merhamet",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 24,
            topic: "Topluma Karşı Sorumluluk",
            purpose:
              "Bireysel dindarlığı toplumsal iyilik, dayanışma ve adalet gayretiyle taçlandırmak.",
            mainQuestion:
              "Yalnızca kendi namazını kılıp toplumun dertlerine duyarsız kalmak kâmil Müslümanlıkla bağdaşır mı?",
            primarySource: "Risale’de hizmet ve cemiyet bahisleri; Pırlanta",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 7,
        title: "7. Ünite — İhlâs, Temsil, Ölüm ve Yas",
        period: "25–28. Haftalar",
        weeks: [
          {
            weekNumber: 25,
            topic: "Hizmette İhlâs: Sonucu Sahiplenmeden Çalışmak",
            purpose:
              "Vazifemizi en güzel şekilde yapıp neticeyi ilahi takdire bırakma olgunluğunu içselleştirmek.",
            mainQuestion:
              "Sonucu kontrol edemediğimiz bir hizmette ihlâsımızı ve şevkimizi nasıl koruruz?",
            primarySource: "Lem’alar — Yirmi Birinci Lem’a; Birinci Düstur",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 26,
            topic: "Dijital Çağda Temsil",
            purpose:
              "Dijital mecrada söz, görsel ve paylaşımlarla inandığı değerleri zedelemeden temsil etmek.",
            mainQuestion:
              "Sanal dünyadaki varlığımız inandığımız hakikatleri ne kadar doğru temsil ediyor?",
            primarySource: "Pırlanta — Temsil Ahlâkı; Mahremiyet",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 27,
            topic: "Ölüm Gerçeği Hayat Planını Nasıl Değiştirir?",
            purpose:
              "Ölümün kaçınılmazlığını hayatın önceliklerini netleştiren en bilge rehber kılmak.",
            mainQuestion:
              "Ölümü her gün hatırlamak hayatı karartır mı, yoksa gereksiz dertlerden arındırır mı?",
            primarySource: "Gençlik Rehberi; Onuncu Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 28,
            topic: "Kayıp ve Yas: Acıya Yer Açmak",
            purpose:
              "Kayıplar ve acılar karşısında isyana düşmeden, sabır, rıza ve dua ile anlam bulabilmek.",
            mainQuestion: "Acı ve kayıplar karşısında iman bize nasıl bir teselli ve direnç sunar?",
            primarySource: "Hastalar Risalesi; ahiret ve rıza bahisleri",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 8,
        title: "8. Ünite — Ümit, Hesap ve Doğru Üslup",
        period: "29–32. Haftalar",
        weeks: [
          {
            weekNumber: 29,
            topic: "Haksızlık Karşısında Ümit",
            purpose:
              "Zulümler ve adaletsizlikler karşısında asla yeise kapılmayıp ilahi adalete olan güveni diri tutmak.",
            mainQuestion:
              "Dünyadaki kötülüklerin çokluğu karşısında ümidimizi ve mücadele azmimizi nasıl koruruz?",
            primarySource: "Hutbe-i Şamiye; Onuncu Söz; Pırlanta — Recâ",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 30,
            topic: "Hesap Bilinci ve Günlük Seçimler",
            purpose:
              "Büyük hesap günü bilincini bugünkü en küçük tercihlerimize yön veren bir pusula kılmak.",
            mainQuestion:
              "Zerre kadar hayrın ve şerrin tartılacağı bir güne inanmak bugünkü adımlarımızı nasıl şekillendirir?",
            primarySource: "Sözler — Onuncu Söz; Pırlanta — Murakabe",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 31,
            topic: "Din Adına Konuşurken Sınırım Ne?",
            purpose:
              "Bilmediği konuda 'bilmiyorum' diyebilme cesaretini ve emanet şuurunu korumak.",
            mainQuestion:
              "Din adına konuşurken haddi aşmaktan ve şahsî görüşü mutlak hakikat sanmaktan nasıl korunuruz?",
            primarySource: "Muhakemat; Pırlanta — İrşad ve İlim Adabı",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 32,
            topic: "Önce Dinlemek, Sonra Cevap Vermek",
            purpose:
              "Muhatabın gerçek ihtiyacını anlamadan hazır kalıplarla cevap yetiştirmeme nezaketini kazanmak.",
            mainQuestion:
              "İyi bir dinleyici olmadan iyi bir tebliğci ve rehber olmak mümkün müdür?",
            primarySource: "Pırlanta — Diyalog ve İletişim Ahlâkı",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 9,
        title: "9. Ünite — Üslup, Şahsî Harita ve Mezuniyet",
        period: "33–36. Haftalar",
        weeks: [
          {
            weekNumber: 33,
            topic: "Fikir Ayrılığında Üslup ve Adalet",
            purpose:
              "En zıt fikirlerde bile karşıdakini tahkir etmeden, hakkı teslim ederek konuşabilme asaletini göstermek.",
            mainQuestion:
              "Görüşlerine katılmadığımız bir insanla konuşurken adalet ve nezaketimizi nasıl koruruz?",
            primarySource: "Uhuvvet Risalesi; Muhakemat; Pırlanta",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 34,
            topic: "Mezuniyet Sorusu: Benim Temel Meselem Ne?",
            purpose:
              "6 yıllık eğitimin sonunda kendi hayat davasını, merkezî sorusunu ve varoluş gayesini billurlaştırmak.",
            mainQuestion:
              "6 yıllık hakikat yolculuğundan sonra benim bu dünyadaki şahsî meselem ve gayem nedir?",
            primarySource: "Öğrencinin şahsî manifesto ve mezuniyet dosyası",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 35,
            topic: "Şahsî Kaynak Haritam ve Kendi Duruşum",
            purpose:
              "Hayat boyu başvuracağı temel eser ve kaynak haritasını tamamlayıp şahsî kütüphanesini kurmak.",
            mainQuestion:
              "Hangi soruda hangi kaynağa gideceğimi ve nereden besleneceğimi biliyor muyum?",
            primarySource: "Kişisel kaynak haritası; Risale ve Pırlanta fihristleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 36,
            topic: "Müfredat Bitiyor, Okuma Devam Ediyor",
            purpose:
              "Müfredatın bir son değil, ömür boyu sürecek hakikat arayışı ve okuma disiplininin başlangıcı olduğunu yaşamak.",
            mainQuestion:
              "Bu dersler sona erdiğinde hakikatle, kitapla ve kâinatla dostluğum nasıl kesintisiz sürecek?",
            primarySource: "Ömür boyu okuma planı; Pırlanta — Sürekli Gelişim",
            isFamilyRespectHighlight: false,
          },
        ],
      },
    ],
  },
];

export function getGradePlan(grade: number): GradePlan | undefined {
  return curriculumPlans.find((plan) => plan.grade === grade);
}

export function getAllGradePlans(): readonly GradePlan[] {
  return curriculumPlans;
}

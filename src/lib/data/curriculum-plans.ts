/**
 * JetAcademie Yıllık Planlar ve Kazanımlar Veri Havuzu (M1–M6)
 *
 * mufredat-docs/planlar/ altındaki M1..M6 Yıllık Plan dokümanlarından derlenmiştir.
 * 6 sınıf, 54 ünite ve 216 haftalık kapsamlı kazanım ve müfredat akışını içerir.
 */

export interface PlanWeek {
  readonly weekNumber: number;
  readonly topic: string;
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
    stage: "Merak ve Muhabbet",
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
        title: "1. ÜNİTE — TANIŞMA VE MERAK",
        period: "1–4. Haftalar",
        weeks: [
          {
            weekNumber: 1,
            topic: "Bu eser neden hâlâ okunuyor?",
            mainQuestion:
              "Bu kadar farklı insanın yıllardır okuduğu, çoğalttığı ve araştırdığı bir eserde ne var?",
            primarySource: "Risale-i Nur’a giriş; Birinci Söz’den ilk temas",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 2,
            topic: "Bediüzzaman kimdir?",
            mainQuestion: "Bu eserlerin arkasında nasıl bir hayat ve ilim yolculuğu var?",
            primarySource: "Tarihçe-i Hayat — İlk Hayatı",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 3,
            topic: "Hocaefendi ve Risale-i Nur",
            mainQuestion: "Bir insan bir eseri niçin hayatı boyunca tekrar tekrar okur?",
            primarySource: "Hocaefendi’nin Risale ile tanışma ve okuma bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 4,
            topic: "Biz bu eserleri nasıl okuyacağız?",
            mainQuestion: "Bir metni anlamadığımızda ne yapacağız?",
            primarySource: "Birinci Söz + okuma usulüne dair Pırlanta metinleri",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 2,
        title: "2. ÜNİTE — BESMELE, İMAN VE KULLUK",
        period: "5–8. Haftalar",
        weeks: [
          {
            weekNumber: 5,
            topic: "1. Söz: Bismillah her hayrın başıdır",
            mainQuestion: "Bismillah yalnız söylenen bir kelime midir?",
            primarySource: "Sözler — Birinci Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 6,
            topic: "1. Söz: Allah namına hareket etmek",
            mainQuestion: "Bir işi Allah namına yapmak davranışımızı değiştirir mi?",
            primarySource: "Sözler — Birinci Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 7,
            topic: "2. Söz: İman insanın bakışını değiştirir",
            mainQuestion: "Aynı dünyaya bakan iki insan neden tamamen farklı şeyler görebilir?",
            primarySource: "Sözler — İkinci Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 8,
            topic: "3. Söz: İbadetin insana kazandırdığı",
            mainQuestion:
              "Allah’ın bizim ibadetimize ihtiyacı yoksa bizim ibadete niçin ihtiyacımız var?",
            primarySource: "Sözler — Üçüncü Söz",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 3,
        title: "3. ÜNİTE — ZAMAN, ÇALIŞMA VE EMANET",
        period: "9–12. Haftalar",
        weeks: [
          {
            weekNumber: 9,
            topic: "4. Söz: 24 saatlik sermaye",
            mainQuestion: "Bir günümüz bize verilmiş bir sermaye olabilir mi?",
            primarySource: "Sözler — Dördüncü Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 10,
            topic: "5. Söz: Vazife ve çalışma",
            mainQuestion: "Dünyevî işlerimiz ile kulluk hayatımız birbirinin rakibi midir?",
            primarySource: "Sözler — Beşinci Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 11,
            topic: "6. Söz: Hayat bize mi ait?",
            mainQuestion: "Bedenimiz, zamanımız ve sahip olduklarımız tamamen bizim midir?",
            primarySource: "Sözler — Altıncı Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 12,
            topic: "6. Söz: Kabiliyetlerimizi ne için kullanıyoruz?",
            mainQuestion: "Bir kabiliyetin kıymetini onu ne için kullandığımız belirler mi?",
            primarySource: "Sözler — Altıncı Söz",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 4,
        title: "4. ÜNİTE — GÜVEN, ACZİYET VE DÜNYAYA BAKIŞ",
        period: "13–16. Haftalar",
        weeks: [
          {
            weekNumber: 13,
            topic: "7. Söz: İnsan her şeye yetişebilir mi?",
            mainQuestion: "Her şeye gücümüzün yetmemesi yalnızca bir eksiklik midir?",
            primarySource: "Sözler — Yedinci Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 14,
            topic: "7. Söz: Tevekkül",
            mainQuestion: "Tevekkül çalışmayı bırakıp beklemek midir?",
            primarySource: "Sözler — Yedinci Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 15,
            topic: "8. Söz: Aynı dünya, iki farklı bakış",
            mainQuestion: "Yaşadığımız olay değişmeden, ona bakışımız değişebilir mi?",
            primarySource: "Sözler — Sekizinci Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 16,
            topic: "Tefekkür: Bakmak ile görmek aynı şey mi?",
            mainQuestion: "Her gün gördüğümüz şeyleri gerçekten görüyor muyuz?",
            primarySource: "Sözler — On Birinci Söz; Pırlanta’da tefekkür bahisleri",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 5,
        title: "5. ÜNİTE — KÂİNAT, İNSAN VE İMANIN DEĞERİ",
        period: "17–20. Haftalar",
        weeks: [
          {
            weekNumber: 17,
            topic: "11. Söz: Kâinat bir saray gibi okunabilir mi?",
            mainQuestion: "Bir sanat eseri bize sanatçısı hakkında bir şey söyler mi?",
            primarySource: "Sözler — On Birinci Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 18,
            topic: "11. Söz: İnsan bu dünyada niçin var?",
            mainQuestion:
              "İnsan yalnızca yemek, eğlenmek, çalışmak ve yaşlanmak için mi yaratılmıştır?",
            primarySource: "Sözler — On Birinci Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 19,
            topic: "23. Söz: İman insana ne kazandırır?",
            mainQuestion: "İnsanın gerçek kıymeti nereden gelir?",
            primarySource: "Sözler — Yirmi Üçüncü Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 20,
            topic: "23. Söz: Kendime nasıl bakıyorum?",
            mainQuestion:
              "Kendimi yalnızca notum, görünüşüm veya insanların düşünceleriyle değerlendirirsem ne olur?",
            primarySource: "Sözler — Yirmi Üçüncü Söz",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 6,
        title: "6. ÜNİTE — DUA, ŞÜKÜR VE İBADETİN MANASI",
        period: "21–24. Haftalar",
        weeks: [
          {
            weekNumber: 21,
            topic: "Acziyet: İhtiyaçlarımız bize ne öğretir?",
            mainQuestion: "İhtiyaçlarımız olmasaydı Allah’a yönelmeyi öğrenebilir miydik?",
            primarySource: "Yedinci Söz; Yirmi Üçüncü Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 22,
            topic: "Dua: İnsan niçin dua eder?",
            mainQuestion: "Dua ettiğimiz her şeyin aynen gerçekleşmesi mi duanın kabulüdür?",
            primarySource: "Risale-i Nur’daki dua bahisleri; Yirmi Üçüncü Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 23,
            topic: "Şükür: Nimeti görmek",
            mainQuestion: "Bir nimete sahip olmakla onun kıymetini fark etmek aynı şey midir?",
            primarySource: "Mektubat — Şükür Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 24,
            topic: "9. Söz: Namazın manası",
            mainQuestion: "Namaz yalnızca yapılması gereken bir görev midir?",
            primarySource: "Sözler — Dokuzuncu Söz",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 7,
        title: "7. ÜNİTE — UHUvVET VE ARKADAŞLIK",
        period: "25–28. Haftalar",
        weeks: [
          {
            weekNumber: 25,
            topic: "Anne-Baba Hakkı: Beni Büyüten İnsanlara Nasıl Karşılık Veririm?",
            mainQuestion:
              "Anne-babamın emeğine karşı sadece “teşekkür ederim” demek yeterli midir?",
            primarySource:
              "Sözler — Otuz İkinci Söz; Lem’alar — Yirmi Dördüncü Lem’a; Hocaefendi — “Anne-baba hakkı” vaazı",
            isFamilyRespectHighlight: true,
          },
          {
            weekNumber: 26,
            topic: "Bir Kusur Bütün İyilikleri Siler mi? — Gemi Temsili",
            mainQuestion:
              "Bir arkadaşımızın tek bir kötü davranışı onun bütün güzel yönlerini yok eder mi?",
            primarySource: "Mektubat — Yirmi İkinci Mektup / Uhuvvet Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 27,
            topic: "Gıybet",
            mainQuestion: "Söylediğimiz şey doğruysa yine de gıybet olabilir mi?",
            primarySource: "Yirmi İkinci Mektup — Hâtime",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 28,
            topic: "Affetmek ve kardeşliği korumak",
            mainQuestion: "Affetmek yapılan yanlışın doğru olduğunu kabul etmek midir?",
            primarySource: "Mektubat — Yirmi İkinci Mektup",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 8,
        title: "8. ÜNİTE — İHLÂS, NİYET VE GENÇLİK",
        period: "29–32. Haftalar",
        weeks: [
          {
            weekNumber: 29,
            topic: "İhlâs: Bir işi kimin için yapıyorum?",
            mainQuestion: "Kimse beni görmese aynı iyiliği yapar mıydım?",
            primarySource: "Lem’alar — Yirmi Birinci Lem’a / İhlâs Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 30,
            topic: "Beğenilme ve görünme isteği",
            mainQuestion:
              "İnsanların beni beğenmesi yaptığım iyiliğin sebebi hâline gelirse ne değişir?",
            primarySource: "Lem’alar — Yirmi Birinci Lem’a",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 31,
            topic: "Rekabet, kıskançlık ve haset",
            mainQuestion: "Başkasının başarılı olması benim başarısız olduğum anlamına gelir mi?",
            primarySource: "Lem’alar — Yirmi Birinci Lem’a",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 32,
            topic: "Gençlik Rehberi: Helal dairesi",
            mainQuestion: "Özgür olmak istediğimiz her şeyi yapmak mıdır?",
            primarySource: "Gençlik Rehberi",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 9,
        title: "9. ÜNİTE — GENÇLİK, ÜMİT VE KENDİ BAŞINA OKUMA",
        period: "33–36. Haftalar",
        weeks: [
          {
            weekNumber: 33,
            topic: "Gençlik bir sermayedir",
            mainQuestion: "Gençlik neden bir sermaye olarak görülebilir?",
            primarySource: "Gençlik Rehberi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 34,
            topic: "Ümitsizlik ve ümit",
            mainQuestion: "Ümit yalnız “her şey iyi olacak” diye düşünmek midir?",
            primarySource: "Hutbe-i Şamiye",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 35,
            topic: "Ben kendim bir Risale konusu seçiyorum",
            mainQuestion: "Ben gerçekten hangi konuyu biraz daha okumak istiyorum?",
            primarySource: "Yıl boyunca işlenen ilgili Risale bölümleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 36,
            topic: "Ben artık nasıl okuyacağım?",
            mainQuestion: "Bu dersler bittiğinde bu kitaplarla ilişkim de bitecek mi?",
            primarySource: "Öğrencinin seçtiği Risale metni + okuma usulü Pırlanta bahisleri",
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
    stage: "Okuma ve Anlama",
    motto: "Kendim okuyorum ve anlamaya başlıyorum.",
    yearEndOutcome:
      "Yıl sonunda kısa bir Risale bölümünü seçip okuyarak ana fikrini açıklayabilmesi.",
    outcomeStatement:
      "Risale’den kısa bir bölümü kendim okuyabiliyorum; bilmediğim kelimeleri soruyor, ana fikrini buluyor ve anladığımı kendi cümlelerimle anlatmaya çalışıyorum.",
    coreGoals: [
      "Öğrencinin Risale-i Nur ve Hocaefendi/Pırlanta kaynaklarıyla sıcak ve güvenilir bir ilk ilişki kurması.",
      "Daha önce M1 programından geçmiş olma şartı aranmadan, ilk dört haftada ortak bir başlangıç zemini oluşturulması.",
      "Kısa bir Risale metnini kendi başına okuyabilmesi ve ana fikrini bulmaya başlaması.",
      "Temsillerde hangi unsurun neyi anlattığını fark etmesi.",
      "Bilmediği kelimeyi sormaktan ve bir paragrafı yeniden okumaktan çekinmemesi.",
      "Okuduğu metni kendi cümleleriyle iki-üç cümlede ifade etmeye başlaması.",
      "İman, ahiret, tevhid, insan, dua, şükür, uhuvvet, ihlâs ve gençlik bahislerini M2 seviyesinde okuyup müzakere etmesi.",
    ],
    methodSteps: ["OKU", "DUR", "SOR", "BAĞLANTI KUR", "KENDİ CÜMLENLE ANLAT"],
    familyRespectFocus: "Görünmeyen emek, kırmamak, vefa ve büyüklere hürmet.",
    units: [
      {
        unitNumber: 1,
        title: "1. ÜNİTE — TANIŞMA, MUHABBET VE OKUMA YÖNTEMİ",
        period: "1–4. Haftalar",
        weeks: [
          {
            weekNumber: 1,
            topic: "İki Kilimlik Bir Dükkânda Başlayan Yolculuk",
            mainQuestion: "Bir kitap insanın hayatında nasıl sıradan bir kitap olmaktan çıkar?",
            primarySource: "Hocaefendi’nin Risale-i Nur’la tanışma hatırası; Tarihçe-i Hayat",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 2,
            topic: "Bediüzzaman: Bir Ömür Neden İman Meselelerine Adanır?",
            mainQuestion: "Bir insan niçin rahatını değil, inandığı bir hakikati anlatmayı seçer?",
            primarySource: "Tarihçe-i Hayat — İlk Hayatı ve Barla’ya uzanan hayat çizgisi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 3,
            topic: "Bir Kitap Neden Tekrar Tekrar Okunur?",
            mainQuestion:
              "Bir metni daha önce okumuş olmak, onu tamamen anladığımız anlamına gelir mi?",
            primarySource: "Tarihçe-i Hayat — Isparta Hayatı; Pırlanta — kitap okuma bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 4,
            topic: "Bir Risale Metnini Nasıl Çözeriz?",
            mainQuestion:
              "Bir paragrafın ana fikrini nasıl bulur ve kendi cümlemizle nasıl anlatırız?",
            primarySource: "Sözler — Birinci Söz’den kısa okuma; Pırlanta — okuma usulü",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 2,
        title: "2. ÜNİTE — ÖLÜM, AHİRET VE YENİDEN DİRİLİŞ",
        period: "5–8. Haftalar",
        weeks: [
          {
            weekNumber: 5,
            topic: "10. Söz: Ölüm Bir Son mu?",
            mainQuestion: "Ölüm her şeyin tamamen bitmesi anlamına mı gelir?",
            primarySource: "Sözler — Onuncu Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 6,
            topic: "10. Söz: Saraydan Memlekete",
            mainQuestion:
              "Bir temsil, ahiret gibi büyük bir meseleyi anlamamıza nasıl yardım eder?",
            primarySource: "Sözler — Onuncu Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 7,
            topic: "10. Söz: Adalet Yarım Kalır mı?",
            mainQuestion: "Bu dünyada karşılığını bulmayan iyilik ve kötülükler ne olacak?",
            primarySource: "Sözler — Onuncu Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 8,
            topic: "10. Söz: Bahar Yeniden Dirilişi Anlatabilir mi?",
            mainQuestion: "Her bahar gördüğümüz diriliş, ahiret hakkında bize ne düşündürür?",
            primarySource: "Sözler — Onuncu Söz",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 3,
        title: "3. ÜNİTE — KÂİNATI OKUMAK",
        period: "9–12. Haftalar",
        weeks: [
          {
            weekNumber: 9,
            topic: "33. Söz: Kâinattan Açılan Bir Pencere",
            mainQuestion: "Gördüğümüz bir varlıktan Allah’ın isimlerine nasıl ulaşabiliriz?",
            primarySource: "Sözler — Otuz Üçüncü Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 10,
            topic: "Sanat Varsa Sanatkâr?",
            mainQuestion: "Bir şeydeki düzen, güzellik ve sanat bize ne anlatabilir?",
            primarySource: "Sözler — Otuz Üçüncü Söz / ilgili pencereler",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 11,
            topic: "Tabiat Risalesi: Eczane Misali",
            mainQuestion: "Bir eczanedeki hassas karışımlar kendi kendine oluşabilir mi?",
            primarySource: "Lem’alar — Yirmi Üçüncü Lem’a / Tabiat Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 12,
            topic: "Mektup Varsa Yazarı?",
            mainQuestion:
              "Bir şeyi okumakla onun kendiliğinden yazıldığını düşünmek aynı anda mümkün mü?",
            primarySource: "Tabiat Risalesi — yazı, harf ve kâtip temsilleri",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 4,
        title: "4. ÜNİTE — SEBEPLER, DÜZEN VE TEVHİD",
        period: "13–16. Haftalar",
        weeks: [
          {
            weekNumber: 13,
            topic: "Bina Varsa Usta?",
            mainQuestion: "Bir yapının parçalarını görmek, onu yapanı açıklamaya yeter mi?",
            primarySource: "Tabiat Risalesi — bina/usta temsilleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 14,
            topic: "Düzen Tesadüf Olabilir mi?",
            mainQuestion: "Her düzen gördüğümüzde aynı açıklamayı mı yaparız?",
            primarySource: "Tabiat Risalesi ve tevhid bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 15,
            topic: "Sebepler Ne Yapar, Ne Yapamaz?",
            mainQuestion:
              "Bir sebep bir şeyin oluşmasına aracılık etmekle onu yaratmak arasında nasıl ayrılır?",
            primarySource: "Tabiat Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 16,
            topic: "Tevhid Dünyaya Bakışımızı Nasıl Değiştirir?",
            mainQuestion:
              "Her şeyi tek bir yaratıcıya bağlamak insana nasıl bir dünya görüşü kazandırır?",
            primarySource: "Sözler / tevhid bahisleri; Pırlanta’da tevhid",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 5,
        title: "5. ÜNİTE — İNSANIN DEĞERİ, ACZİYET VE İMAN",
        period: "17–20. Haftalar",
        weeks: [
          {
            weekNumber: 17,
            topic: "23. Söz: İnsan Neden Kıymetlidir?",
            mainQuestion:
              "İnsanın değeri yalnız gücünden, başarısından veya görünüşünden mi gelir?",
            primarySource: "Sözler — Yirmi Üçüncü Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 18,
            topic: "İman İnsanın Kendine Bakışını Değiştirir mi?",
            mainQuestion: "İnsan kendisini Allah’a ait bildiğinde kendisine nasıl bakar?",
            primarySource: "Sözler — Yirmi Üçüncü Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 19,
            topic: "Güçsüz Olmak Her Zaman Kötü mü?",
            mainQuestion: "Acziyetimizi fark etmek bizi küçültür mü, yoksa bir kapı mı açar?",
            primarySource: "Yirmi Üçüncü Söz; Yedinci Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 20,
            topic: "Yalnız Değilim: Dua ve Tevekkül",
            mainQuestion: "İnsan gücünün yetmediği yerde ne yapar?",
            primarySource: "Yirmi Üçüncü Söz; dua ve tevekkül bahisleri",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 6,
        title: "6. ÜNİTE — ZAMAN, NAMAZ VE ŞÜKÜR",
        period: "21–24. Haftalar",
        weeks: [
          {
            weekNumber: 21,
            topic: "Zamanı Nasıl Okuyoruz?",
            mainQuestion: "Bir günümüz sadece geçip giden saatlerden mi ibarettir?",
            primarySource: "Sözler — Dördüncü Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 22,
            topic: "Namaz Vakitleri Bize Ne Hatırlatır?",
            mainQuestion: "Günün farklı vakitlerinde durup Allah’a yönelmenin manası nedir?",
            primarySource: "Sözler — Dokuzuncu Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 23,
            topic: "Şükür: Nimeti Yeniden Görmek",
            mainQuestion:
              "Her gün sahip olduğumuz şeyleri neden bir süre sonra fark etmemeye başlarız?",
            primarySource: "Mektubat — Şükür Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 24,
            topic: "Şükür Sadece 'Elhamdülillah' Demek mi?",
            mainQuestion: "Şükür sözden davranışa nasıl dönüşür?",
            primarySource: "Şükür Risalesi; Pırlanta — Şükür",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 7,
        title: "7. ÜNİTE — UHUVVET, GIYBET VE AFFETME",
        period: "25–28. Haftalar",
        weeks: [
          {
            weekNumber: 25,
            topic: "Anne-Baba Hakkı: Büyüdükçe Sorumluluğum Azalır mı?",
            mainQuestion:
              "Büyüdükçe anne-babama daha az ihtiyaç duymam, onlara karşı vefa ve hürmetimi azaltır mı?",
            primarySource:
              "Lem’alar — Yirmi Dördüncü Lem’a; Sözler — Otuz İkinci Söz; Hocaefendi — “Anne-Baba Hakkı ve Hizmet”",
            isFamilyRespectHighlight: true,
          },
          {
            weekNumber: 26,
            topic: "Bir Kusur Bütün İnsanı Siler mi? — Gemi Temsili",
            mainQuestion:
              "Bir insanın tek kusuru yüzünden bütün iyiliklerini görmezden gelmek adaletli midir?",
            primarySource: "Mektubat — Yirmi İkinci Mektup / Uhuvvet Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 27,
            topic: "Gıybet ve Yanlış Yorumlama",
            mainQuestion:
              "Birinin arkasından doğru bir şeyi söylemek neden yine de yanlış olabilir?",
            primarySource: "Yirmi İkinci Mektup — Hâtime",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 28,
            topic: "Affetmek ve İlişkiyi Tamir Etmek",
            mainQuestion: "Affetmek yanlışı doğru kabul etmek midir?",
            primarySource: "Yirmi İkinci Mektup; Pırlanta — uhuvvet",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 8,
        title: "8. ÜNİTE — İHLÂS, ONAYLANMA VE REKABET",
        period: "29–32. Haftalar",
        weeks: [
          {
            weekNumber: 29,
            topic: "İhlâs: İyiliği Kimin İçin Yapıyorum?",
            mainQuestion: "Kimse görmese aynı iyiliği yapar mıydım?",
            primarySource: "Lem’alar — Yirmi Birinci Lem’a / İhlâs Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 30,
            topic: "Beğenilme İhtiyacı",
            mainQuestion: "İnsanların takdiri yaptığımız işin amacı hâline gelirse ne değişir?",
            primarySource: "Yirmi Birinci Lem’a; Pırlanta — İhlâs",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 31,
            topic: "Birlikte Çalışmak Neden Zor?",
            mainQuestion:
              "İyi bir işi tek başımıza sahiplenmek ile birlikte yapmak arasında ne fark vardır?",
            primarySource: "Yirmi Birinci Lem’a",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 32,
            topic: "Rekabet ve Haset",
            mainQuestion: "Başkasının başarısı neden bazen bizi rahatsız eder?",
            primarySource: "Yirmi Birinci Lem’a; Pırlanta — Haset",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 9,
        title: "9. ÜNİTE — GENÇLİK VE KENDİ BAŞINA OKUMA",
        period: "33–36. Haftalar",
        weeks: [
          {
            weekNumber: 33,
            topic: "Gençlik Bir Sermaye",
            mainQuestion:
              "Gençlik neden yalnız eğlenme zamanı değil, bir imkân ve emanet olarak görülebilir?",
            primarySource: "Gençlik Rehberi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 34,
            topic: "Geçici Haz mı, Kalıcı Değer mi?",
            mainQuestion: "Her hoşumuza giden şey gerçekten bize iyi gelir mi?",
            primarySource: "Gençlik Rehberi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 35,
            topic: "Ben Bir Risale Bölümü Seçiyorum",
            mainQuestion: "Hangi konuda gerçekten daha fazla okumak istiyorum?",
            primarySource: "Öğrencinin seçtiği ilgili Risale bölümü",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 36,
            topic: "Ben Okudum, Anladım, Anlatıyorum",
            mainQuestion: "Seçtiğim metnin ana fikrini kendi cümlelerimle açıklayabilir miyim?",
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
    stage: "Hayata Taşıma",
    motto: "Okuduğum hakikatin hayatımla ilgisini görüyor ve uygulamaya çalışıyorum.",
    yearEndOutcome:
      "Yıl sonunda gerçek bir hayat meselesi seçip Risale ve Hocaefendi/Pırlanta kaynaklarından ilgili kısa metni bulması ve hayatına nasıl taşıyacağını açıklaması.",
    outcomeStatement:
      "Okuduğum bir Risale veya Pırlanta hakikatinin hayatımla ilgisini görebiliyor, bana ne söylediğini kendi cümlemle ifade ediyor ve küçük bir uygulama adımı seçebiliyorum.",
    coreGoals: [
      "Öğrencinin Risale-i Nur ve Hocaefendi/Pırlanta kaynaklarıyla yaşına uygun, sıcak ve güvenilir bir bağ kurması.",
      "Daha önce M1 veya M2 programından geçmiş olma şartı aranmadan, ilk dört haftada ortak bir başlangıç zemini oluşturulması.",
      "Okuduğu bir hakikati yalnız anlamakla kalmayıp kendi hayatındaki karşılığını fark etmeye başlaması.",
      "Gençlik, irade, alışkanlık, emanet, niyet, ihlâs, arkadaşlık, gıybet, tefekkür, ölüm-ahiret, ümit ve sorumluluk gibi doğrudan hayatına dokunan başlıklarda Risale metinleriyle düşünmesi.",
      "Bir problem veya davranış karşısında 'Bu konuda okuduğum hakikat bana ne söylüyor?' sorusunu sormaya başlaması.",
      "Kendi hayatından küçük ve gerçekçi uygulama hedefleri koyması.",
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
        title: "1. ÜNİTE — TANIŞMA, MUHABBET VE HAYATA TAŞIMA",
        period: "1–4. Haftalar",
        weeks: [
          {
            weekNumber: 1,
            topic: "Bir Hakikat Hayata Ne Zaman Girer?",
            mainQuestion: "Bir şeyi bilmekle onu yaşamak arasındaki fark nedir?",
            primarySource:
              "Risale-i Nur’dan yaşama/amel bağlantılı kısa pasajlar; Hocaefendi’de ilim-amel ve temsil bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 2,
            topic: "Bediüzzaman: Bilgi Neden Sorumluluk Doğurur?",
            mainQuestion:
              "İnsan bildiği bir hakikate göre yaşamazsa bilgi tek başına yeterli olur mu?",
            primarySource: "Tarihçe-i Hayat — hayat, hizmet ve mesuliyet çizgisi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 3,
            topic: "Hocaefendi: Okumak İnsanı Değiştirmiyorsa Ne Eksik Kalır?",
            mainQuestion: "Okuduğumuz kitapların davranışımıza yansımaması bize ne söyler?",
            primarySource: "Pırlanta — kitap okuma, yaşama ve insan yetiştirme bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 4,
            topic: "Bu Metin Bana Ne Söylüyor?",
            mainQuestion:
              "Bir Risale paragrafını kendi hayatımızdaki bir meseleyle nasıl ilişkilendiririz?",
            primarySource: "Kısa Risale metni + uygulama yöntemi",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 2,
        title: "2. ÜNİTE — GENÇLİK, ÖZGÜRLÜK VE İRADE",
        period: "5–8. Haftalar",
        weeks: [
          {
            weekNumber: 5,
            topic: "Gençlik Bir Sermaye",
            mainQuestion:
              "Gençlik neden sadece yaş değil, kullanılması gereken bir imkân olarak görülür?",
            primarySource: "Gençlik Rehberi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 6,
            topic: "Gençlik Geçiyor: Ne Kalıyor?",
            mainQuestion: "Geçici zevk ile kalıcı değer arasındaki farkı nasıl anlarız?",
            primarySource: "Gençlik Rehberi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 7,
            topic: "Helâl Dairesi ve Özgürlük",
            mainQuestion: "Özgürlük istediğimiz her şeyi yapmak mıdır?",
            primarySource: "Gençlik Rehberi — helâl dairesi bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 8,
            topic: "İrade ve Alışkanlık",
            mainQuestion:
              "Bir davranış ne zaman alışkanlığa, bir alışkanlık ne zaman karaktere dönüşür?",
            primarySource: "Gençlik Rehberi; Pırlanta’da irade ve istikamet",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 3,
        title: "3. ÜNİTE — EMANET, BEDEN, ZAMAN VE KABİLİYET",
        period: "9–12. Haftalar",
        weeks: [
          {
            weekNumber: 9,
            topic: "6. Söz: Hayat Bize mi Ait?",
            mainQuestion: "Bedenimiz ve hayatımız üzerinde sınırsız tasarruf hakkımız var mı?",
            primarySource: "Sözler — Altıncı Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 10,
            topic: "Beden ve Zaman Birer Emanet mi?",
            mainQuestion: "Bize verilen zamanı ve bedeni nasıl kullanmak sorumluluk doğurur?",
            primarySource: "Sözler — Altıncı Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 11,
            topic: "Kabiliyetlerimi Ne İçin Kullanıyorum?",
            mainQuestion: "Bir yeteneğin değeri sadece başarı getirmesiyle mi ölçülür?",
            primarySource: "Sözler — Altıncı Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 12,
            topic: "Kulluk ve Özgürlük",
            mainQuestion:
              "Allah’a kul olmak insanı küçültür mü, yoksa başka bağımlılıklardan kurtarır mı?",
            primarySource: "Altıncı Söz; ilgili Pırlanta bahisleri",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 4,
        title: "4. ÜNİTE — NİYET, GÖRÜNMEK VE İÇ DÜNYA",
        period: "13–16. Haftalar",
        weeks: [
          {
            weekNumber: 13,
            topic: "Niyet Aynı İşi Nasıl Değiştirir?",
            mainQuestion: "Aynı davranış farklı niyetlerle yapıldığında aynı değeri taşır mı?",
            primarySource: "İhlâs Risalesi ve niyet bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 14,
            topic: "Kimse Görmese Yine Yapar mıydım?",
            mainQuestion:
              "İyiliği görünür olmak için yapmakla Allah rızası için yapmak arasındaki fark nedir?",
            primarySource: "Lem’alar — Yirmi Birinci Lem’a",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 15,
            topic: "Rekabet ve Üstün Gelme İsteği",
            mainQuestion: "İyi bir işi yaparken bile neden başkasını geçmek isteyebiliriz?",
            primarySource: "Yirmi Birinci Lem’a",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 16,
            topic: "Haset: Başkasının İyiliği Neden Bizi Rahatsız Eder?",
            mainQuestion: "Başkasının başarısı bizim değerimizi azaltır mı?",
            primarySource: "İhlâs Risalesi; Pırlanta’da haset",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 5,
        title: "5. ÜNİTE — ARKADAŞLIK, GIYBET VE İLİŞKİLER",
        period: "17–20. Haftalar",
        weeks: [
          {
            weekNumber: 17,
            topic: "Anne-Baba Hakkı: Büyürken Hürmeti Nasıl Korurum?",
            mainQuestion:
              "Anne-babamla aynı fikirde olmadığımda hem kendi kararımı verip hem de saygıyı nasıl korurum?",
            primarySource:
              "Sözler — Otuz İkinci Söz; Lem’alar — Yirmi Dördüncü Lem’a; Hocaefendi — “Anne-Baba Hakkı ve Hizmet”",
            isFamilyRespectHighlight: true,
          },
          {
            weekNumber: 18,
            topic: "Arkadaşımın Kusurunu Görünce Ne Yapıyorum? — Gemi Temsili",
            mainQuestion: "Bir kusur, bir insanın bütün iyiliklerini siler mi?",
            primarySource: "Mektubat — Yirmi İkinci Mektup / Uhuvvet Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 19,
            topic: "Bir İnsanı Tek Hatasıyla Tanımlamak",
            mainQuestion: "Birinin yaptığı yanlış ile o kişinin tamamı aynı şey midir?",
            primarySource: "Yirmi İkinci Mektup — gemi temsili",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 20,
            topic: "Özür, Affetmek ve İlişkiyi Tamir Etmek",
            mainQuestion: "Özür dilemek veya affetmek neden bazen zor gelir?",
            primarySource: "Uhuvvet Risalesi; Pırlanta’da affetme ve kardeşlik",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 6,
        title: "6. ÜNİTE — TABİAT, SEBEPLER VE TEFEKKÜRÜ HAYATA TAŞIMAK",
        period: "21–24. Haftalar",
        weeks: [
          {
            weekNumber: 21,
            topic: "Tesadüf Açıklama mıdır?",
            mainQuestion:
              "Bir şeyin nasıl olduğunu söylemek, niçin ve kim tarafından olduğunu açıklamaya yeter mi?",
            primarySource: "Lem’alar — Yirmi Üçüncü Lem’a / Tabiat Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 22,
            topic: "Sebepler Ne Kadar Güçlü?",
            mainQuestion: "Bir sebebi görmek, yaratmayı o sebebe vermek için yeterli midir?",
            primarySource: "Tabiat Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 23,
            topic: "İman Kâinata Bakışımı Nasıl Değiştirir?",
            mainQuestion:
              "Aynı ağaca iman nazarıyla bakmak ile sıradan bakmak arasında ne fark olabilir?",
            primarySource: "Tabiat Risalesi; tevhid ve tefekkür bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 24,
            topic: "Günlük Hayatta Tefekkür",
            mainQuestion: "Tefekkürü yalnız derste değil, günlük hayatta nasıl yapabiliriz?",
            primarySource: "Sözler’de tefekkür bahisleri; Pırlanta — Tefekkür",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 7,
        title: "7. ÜNİTE — ÖLÜM, AHİRET VE BUGÜNKÜ SEÇİMLER",
        period: "25–28. Haftalar",
        weeks: [
          {
            weekNumber: 25,
            topic: "Ölüm Korkusu Bize Ne Söylüyor?",
            mainQuestion: "İnsan ölümü düşünmekten neden kaçar?",
            primarySource: "Sözler — Onuncu Söz; Gençlik Rehberi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 26,
            topic: "Ahiret ve Adalet",
            mainQuestion: "Hesap ve ahiret inancı bugünkü davranışlarımızı etkiler mi?",
            primarySource: "Sözler — Onuncu Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 27,
            topic: "Bahar ve Yeniden Diriliş",
            mainQuestion: "Her yıl gördüğümüz diriliş ahiret fikrini anlamamıza nasıl yardım eder?",
            primarySource: "Sözler — Onuncu Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 28,
            topic: "Ahiret İnancı Bugünümü Nasıl Değiştirir?",
            mainQuestion: "Sonsuz bir hayat inancı günlük tercihlerimize nasıl yansır?",
            primarySource: "Onuncu Söz; ilgili Pırlanta bahisleri",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 8,
        title: "8. ÜNİTE — ÜMİT, SIKINTI VE MANEVÎ YARALAR",
        period: "29–32. Haftalar",
        weeks: [
          {
            weekNumber: 29,
            topic: "Ümitsizlik Neden Tehlikelidir?",
            mainQuestion: "Zor bir durumda “artık hiçbir şey düzelmez” demek bizi nasıl etkiler?",
            primarySource: "Hutbe-i Şamiye — yeis ve ümit",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 30,
            topic: "Ümit Sadece İyi Düşünmek mi?",
            mainQuestion: "Gerçek ümit ile boş beklenti arasındaki fark nedir?",
            primarySource: "Hutbe-i Şamiye; Pırlanta’da ümit",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 31,
            topic: "Sıkıntı ve Sabır",
            mainQuestion:
              "Zor zamanlar insana sadece zarar mı verir, yoksa öğretebileceği şeyler de var mı?",
            primarySource: "Lem’alar — Hastalar Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 32,
            topic: "Hz. Eyyûb: Dış Yara ve İç Yara",
            mainQuestion: "Manevî bir yaranın bedendeki yaradan daha tehlikeli olması ne demektir?",
            primarySource: "Lem’alar — İkinci Lem’a",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 9,
        title: "9. ÜNİTE — KENDİ MESELEMİ BULUYOR VE HAYATA TAŞIYORUM",
        period: "33–36. Haftalar",
        weeks: [
          {
            weekNumber: 33,
            topic: "Benim Hayatımdaki Gerçek Mesele Ne?",
            mainQuestion: "Şu anda hayatımda üzerinde düşünmem gereken hangi konu var?",
            primarySource: "Öğrencinin seçtiği meseleye göre kaynak havuzu",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 34,
            topic: "Bu Konuda Risale Bana Ne Söylüyor?",
            mainQuestion: "Kendi soruma uygun Risale bölümünü nasıl bulurum ve doğru okurum?",
            primarySource: "İlgili Risale bölümü",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 35,
            topic: "Hocaefendi Bu Meseleyi Nasıl Ele Alıyor?",
            mainQuestion: "Aynı meseleye Pırlanta veya sohbetlerde nasıl yaklaşılmış?",
            primarySource: "İlgili Hocaefendi/Pırlanta metni veya sohbeti",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 36,
            topic: "Bir Hakikati Hayatıma Taşıyorum",
            mainQuestion:
              "Okuduğum iki kaynaktan hareketle hayatımda hangi küçük ama gerçek adımı seçebilirim?",
            primarySource: "Öğrencinin seçtiği Risale + Pırlanta kaynağı",
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
    stage: "İhtiyaç Hissetme",
    motto: "Sorularım ve ihtiyaçlarım için bu kaynaklara kendim başvuruyorum.",
    yearEndOutcome:
      "Yıl sonunda gerçek bir sorusu için Risale ve Pırlanta’dan kaynak bulup, iki kaynağın söylediğini karşılaştırarak kısa bir değerlendirme yapabilmesi.",
    outcomeStatement:
      "Bir imanî veya ahlâkî sorum olduğunda uygun anahtar kavramlarla Risale ve Pırlanta’da kaynak arayabiliyor, bulduğum metni bağlamıyla okuyup ana fikrini kendi cümlemle açıklayabiliyorum.",
    coreGoals: [
      "Öğrencinin Risale-i Nur ve Hocaefendi/Pırlanta kaynaklarını yalnız ders materyali değil, kendi imanî ve ahlâkî sorularında başvurabileceği kaynaklar olarak görmeye başlaması.",
      "Daha önce M1–M3 programlarından geçmiş olma şartı aranmadan, ilk dört haftada ortak bir tanışma ve kaynak kullanma zemini oluşturulması.",
      "Bir soruyu anahtar kavramlara ayırabilmesi ve uygun eser/bölüm aramaya başlaması.",
      "Bulduğu metni bağlamından koparmadan okuyup ana fikrini kendi cümleleriyle açıklayabilmesi.",
      "Tevhid, tabiat ve sebepler, ahiret, kader-irade, ene/benlik, dua-şükür, anne-baba hakkı, uhuvvet ve ihlâs gibi başlıklarda kaynak merkezli düşünmesi.",
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
    familyRespectFocus: "İtaatin sınırı, yanlış talep karşısında nezaket, “ma‘ruf ile muamele”.",
    units: [
      {
        unitNumber: 1,
        title: "1. ÜNİTE — KAYNAKLA TANIŞMA VE İHTİYAÇ HİSSETME",
        period: "1–4. Haftalar",
        weeks: [
          {
            weekNumber: 1,
            topic: "Bir Kitap Ne Zaman 'Kaynak' Olur?",
            mainQuestion:
              "Bir kitabı sadece okumakla, bir sorumuz olduğunda ona başvurmak arasında ne fark vardır?",
            primarySource:
              "Risale-i Nur’dan seçilmiş giriş metinleri; Pırlanta’da okuma ve kaynakla ilişki bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 2,
            topic: "Bediüzzaman: Çağın İman Sorularına Neden Yöneldi?",
            mainQuestion: "Bir düşünür kendi döneminin hangi sorularını merkeze alır ve neden?",
            primarySource:
              "Tarihçe-i Hayat; Risale-i Nur’un iman hizmetine dair bahisler; uygun dış/akademik tanıtım kaynakları",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 3,
            topic: "Hocaefendi: Bir Kaynakla Yıllarca Nasıl Yaşanır?",
            mainQuestion:
              "Bir eser insanın düşünce ve hayat dünyasında nasıl sürekli başvurulan bir kaynağa dönüşür?",
            primarySource:
              "Hocaefendi’nin Risale-i Nur’la ilişkisi; Pırlanta’da okuma ve tekrar okuma bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 4,
            topic: "Sorudan Kaynağa: Aradığımı Nasıl Bulurum?",
            mainQuestion:
              "Aklımdaki bir soruyu Risale veya Pırlanta’da aramak için hangi adımları izlemeliyim?",
            primarySource: "Dijital külliyat / indeks kullanımı; kısa uygulamalı kaynak arama",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 2,
        title: "2. ÜNİTE — TEVHİD: DAĞINIK GÖRÜNEN ÂLEMDE BİRLİK",
        period: "5–8. Haftalar",
        weeks: [
          {
            weekNumber: 5,
            topic: "Tevhid Neden Sadece 'Allah Birdir' Demek Değildir?",
            mainQuestion: "Tevhid bir cümleden dünya görüşüne nasıl dönüşür?",
            primarySource: "Risale-i Nur’da tevhid bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 6,
            topic: "Kâinatı Bir Kitap Gibi Okumak",
            mainQuestion:
              "Varlıklar bize yalnız kendilerini mi gösterir, yoksa daha büyük bir manaya işaret eder mi?",
            primarySource: "Otuz Üçüncü Söz ve ilgili tefekkür bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 7,
            topic: "Allah’a İntisap ve İç Hürriyet",
            mainQuestion:
              "İnsan kime ait olduğunu bildiğinde korku ve bağımlılıkları nasıl değişebilir?",
            primarySource: "Yirmi Üçüncü Söz ve intisap bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 8,
            topic: "Korkular, İhtiyaçlar ve Güven",
            mainQuestion: "İnsan her şeye yetemediğini fark ettiğinde neye dayanır?",
            primarySource: "Yedinci Söz; dua ve tevekkül bahisleri",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 3,
        title: "3. ÜNİTE — TABİAT, KANUNLAR VE SEBEPLER",
        period: "9–12. Haftalar",
        weeks: [
          {
            weekNumber: 9,
            topic: "“Tabiat Yapıyor” Demek Ne Demektir?",
            mainQuestion:
              "Bir olayın nasıl gerçekleştiğini söylemek, onu kimin yaptığı sorusunu cevaplar mı?",
            primarySource: "Lem’alar — Yirmi Üçüncü Lem’a / Tabiat Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 10,
            topic: "Kanun ile Kanun Koyucu Aynı Şey mi?",
            mainQuestion: "Bir tabiat kanunu açıklama mıdır, yoksa düzenin adını mı verir?",
            primarySource: "Tabiat Risalesi; ilgili tevhid bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 11,
            topic: "Sebeplerin Gücü ve Sınırı",
            mainQuestion: "Bir sebep sonuç üzerinde ne kadar gerçek bir güce sahiptir?",
            primarySource: "Tabiat Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 12,
            topic: "Tesadüf Gerçek Bir Açıklama mı?",
            mainQuestion: "Düzen, ölçü ve uygunluk gördüğümüzde 'tesadüf' ne kadar açıklayıcıdır?",
            primarySource: "Tabiat Risalesi ve tefekkür bahisleri",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 4,
        title: "4. ÜNİTE — AHİRET: İMKÂN, ADALET VE RAHMET",
        period: "13–16. Haftalar",
        weeks: [
          {
            weekNumber: 13,
            topic: "Ahiret Mümkün mü?",
            mainQuestion:
              "Bir şeyin bize olağanüstü gelmesi onun imkânsız olduğu anlamına gelir mi?",
            primarySource: "Sözler — Onuncu Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 14,
            topic: "Adalet Yarım Kalır mı?",
            mainQuestion: "Bu dünyada karşılığı tamamlanmayan iyilik ve kötülükler ne olacak?",
            primarySource: "Onuncu Söz — adalet bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 15,
            topic: "Hikmet ve Rahmet Ahireti Gerektirir mi?",
            mainQuestion:
              "Hayatta gördüğümüz hikmet ve merhamet, ölümden sonrası hakkında bize ne düşündürür?",
            primarySource: "Onuncu Söz — hikmet ve rahmet bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 16,
            topic: "Yeniden Yaratılmak Neden Zor Olsun?",
            mainQuestion:
              "İlk yaratılışı gördüğümüz hâlde yeniden yaratılışı neden uzak görüyoruz?",
            primarySource: "Onuncu Söz — bahar ve haşir temsilleri",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 5,
        title: "5. ÜNİTE — KADER, İRADE VE SORUMLULUK",
        period: "17–20. Haftalar",
        weeks: [
          {
            weekNumber: 17,
            topic: "İnsan Ne Kadar Özgür?",
            mainQuestion: "Seçimlerimizin ne kadarı bize aittir ve sorumluluk nerede başlar?",
            primarySource: "Sözler / Mektubat — kader ve cüz’î irade bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 18,
            topic: "Seçmek ve Sonucuna Sahip Çıkmak",
            mainQuestion:
              "Bir davranışı seçmek ile sonucundan sorumlu olmak arasında nasıl bir bağ vardır?",
            primarySource: "Kader ve irade bahisleri; Pırlanta’da irade-sorumluluk",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 19,
            topic: "Kader Bir Mazeret Olabilir mi?",
            mainQuestion: "Yanlış bir davranıştan sonra 'kaderimde varmış' demek doğru mudur?",
            primarySource: "Kader Risalesi / ilgili bahisler",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 20,
            topic: "Tevekkül ile Pasiflik Arasındaki Fark",
            mainQuestion:
              "Allah’a güvenmek çalışmayı azaltır mı, yoksa doğru çalışmanın çerçevesini mi kurar?",
            primarySource: "Tevekkül bahisleri; Pırlanta’da tevekkül",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 6,
        title: "6. ÜNİTE — 'BEN', SAHİPLİK VE KULLUK",
        period: "21–24. Haftalar",
        weeks: [
          {
            weekNumber: 21,
            topic: "Ene: 'Ben' Duygusu Neden Verilmiş?",
            mainQuestion: "İnsan kendisine 'ben' diyebilme özelliğini ne için kullanır?",
            primarySource: "Sözler — Otuzuncu Söz / Ene bahsi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 22,
            topic: "Gerçekten Neye Sahibim?",
            mainQuestion: "“Benim bedenim, benim zekâm, benim zamanım” derken neyi kastediyoruz?",
            primarySource: "Altıncı Söz; Ene bahsi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 23,
            topic: "Acz ve Fakr Bir Eksiklik mi?",
            mainQuestion:
              "Güçsüzlük ve ihtiyaçlarımız insanı küçültür mü, yoksa Allah’a açılan bir pencere olabilir mi?",
            primarySource: "Yedinci Söz; Yirmi Üçüncü Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 24,
            topic: "Kendini Tanımak Kulluğa Nasıl Götürür?",
            mainQuestion:
              "İnsan kendi sınırlarını ve imkânlarını tanıdıkça Rabbini tanımaya nasıl yaklaşır?",
            primarySource: "Ene, acz-fakr ve ubudiyet bahisleri",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 7,
        title: "7. ÜNİTE — DUA, ŞÜKÜR VE VEFA",
        period: "25–28. Haftalar",
        weeks: [
          {
            weekNumber: 25,
            topic: "Dua Sadece İstemek mi?",
            mainQuestion: "Dua bir istek listesi mi, yoksa insanın kulluk hâli mi?",
            primarySource: "Risale-i Nur’da dua bahisleri; Pırlanta — Dua Ufku",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 26,
            topic: "Duanın Kabulü Ne Demektir?",
            mainQuestion: "Bir duanın aynen gerçekleşmemesi, cevapsız kaldığı anlamına gelir mi?",
            primarySource: "Dua bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 27,
            topic: "Şükür: Nimeti Görmek ve Yerinde Kullanmak",
            mainQuestion: "Şükür yalnız teşekkür cümlesi mi, yoksa nimete karşı bir tavır mı?",
            primarySource: "Mektubat — Şükür Risalesi; Pırlanta — Şükür",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 28,
            topic: "Büyürken Anne-Baba Hakkı Azalır mı?",
            mainQuestion:
              "Bağımsızlaşmak ile anne-babaya hürmet, vefa ve hizmet arasında nasıl bir denge kurulabilir?",
            primarySource:
              "Lem’alar — Yirmi Dördüncü Lem’a / valide bahsi; Hocaefendi — “Anne-Baba Hakkı” vaazı",
            isFamilyRespectHighlight: true,
          },
        ],
      },
      {
        unitNumber: 8,
        title: "8. ÜNİTE — UHUvVET, ADALET VE İHLÂS",
        period: "29–32. Haftalar",
        weeks: [
          {
            weekNumber: 29,
            topic: "Kardeşlik ve Adalet Aynı Anda Mümkün mü?",
            mainQuestion: "Birini sevmek, onun her davranışını doğru bulmak anlamına gelir mi?",
            primarySource: "Mektubat — Yirmi İkinci Mektup / Uhuvvet Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 30,
            topic: "Eleştiri, Farklılık ve Gıybet",
            mainQuestion:
              "Bir yanlış hakkında konuşmak ile kişiyi yıpratmak arasındaki sınır nerede?",
            primarySource: "Yirmi İkinci Mektup — Hâtime; Pırlanta’da gıybet ve kardeşlik",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 31,
            topic: "İhlâs ve Birlikte Çalışma",
            mainQuestion: "Ortak bir işte 'ben' duygusu ne zaman faydayı bozar?",
            primarySource: "Lem’alar — Yirmi Birinci Lem’a / İhlâs Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 32,
            topic: "Rekabet ve Ego",
            mainQuestion:
              "Başkasının başarısı niçin bizi rahatsız eder ve bunu nasıl yönetebiliriz?",
            primarySource: "İhlâs Risalesi; Pırlanta’da haset ve rekabet",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 9,
        title: "9. ÜNİTE — KENDİ SORUM İÇİN KAYNAĞA BAŞVURUYORUM",
        period: "33–36. Haftalar",
        weeks: [
          {
            weekNumber: 33,
            topic: "Benim Gerçek Sorum Ne?",
            mainQuestion:
              "Şu anda iman, hayat veya ilişkilerim hakkında gerçekten hangi soruyu araştırmak istiyorum?",
            primarySource: "Öğrencinin seçtiği konu; kaynak haritası",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 34,
            topic: "Risale’de Kaynağı Kendim Buluyorum",
            mainQuestion: "Soruma uygun Risale bölümünü nasıl bulur, bağlamıyla nasıl okurum?",
            primarySource: "İlgili Risale bölümü",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 35,
            topic: "Pırlanta’da Aynı Meseleyi Arıyorum",
            mainQuestion:
              "Aynı soruya Hocaefendi’nin eser veya sohbetlerinde nasıl bir yaklaşım bulunuyor?",
            primarySource: "İlgili Pırlanta metni / sohbeti",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 36,
            topic: "İki Kaynaktan Kendi Cümleme",
            mainQuestion:
              "Bulduğum iki kaynağın ana fikrini doğru biçimde kendi cümlemle açıklayabilir miyim?",
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
    stage: "Tahkik ve Mukayese",
    motto:
      "Okuduğum bir iddianın neye dayandığını araştırıyor, kaynakları karşılaştırarak kendi kanaatimi kurmaya çalışıyorum.",
    yearEndOutcome:
      "Kendi sorusunu belirleyip Risale ve Pırlanta’dan kaynak toplayarak küçük bir tahkik dosyası hazırlayabilmesi.",
    outcomeStatement:
      "Bir imanî veya ahlâkî meselede aslî metni bulabiliyor, iddia ile delili ayırabiliyor, ikinci bir güvenilir kaynakla mukayese ediyor ve vardığım kanaati kesinlik derecesini abartmadan kendi cümlemle ifade edebiliyorum.",
    coreGoals: [
      "Risale-i Nur ve Pırlanta metinlerinde yalnız “ne söyleniyor?” değil, “hangi delile dayanıyor?” sorusunu sormaya başlaması.",
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
        title: "1. ÜNİTE — TANIŞMA, TAHKİK VE KAYNAK DİSİPLİNİ",
        period: "1–4. Haftalar",
        weeks: [
          {
            weekNumber: 1,
            topic: "Bu Yıl Bir Metni Nasıl Daha Derin Okuyacağız?",
            mainQuestion:
              "Bir şeyi anlamakla, onun neden doğru olduğunu araştırmak arasında ne fark vardır?",
            primarySource:
              "M5 çalışma yöntemi; Nurlardan Seçmeler-2’de tahkikî iman; Pırlanta’da okuma ve tefekkür bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 2,
            topic: "Bediüzzaman: İman Hakikatlerini Neden Delille Anlatıyor?",
            mainQuestion:
              "Bir iman meselesinde yalnız sonucu söylemek yerine delil kurmak niçin önemlidir?",
            primarySource: "Tarihçe-i Hayat; Şuâlar’da imanî hüccetler; Muhakemat’tan seçmeler",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 3,
            topic: "Hocaefendi: Bir Meseleyi Farklı Kaynaklarla Nasıl Okuruz?",
            mainQuestion: "Aynı meseleyi Risale ve Pırlanta’dan okumak bize ne kazandırır?",
            primarySource:
              "Kendi Dünyamıza Doğru; Kırık Testi-1’de okuma ve temel eserler bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 4,
            topic: "İddia, Delil ve Yorum: Üçünü Nasıl Ayırırım?",
            mainQuestion:
              "Yazarın söylediği, gösterdiği delil ve bizim çıkardığımız yorum aynı şey midir?",
            primarySource: "Muhakemat; Risale’de delil dili; kaynak-bağlam yöntemi",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 2,
        title: "2. ÜNİTE — TEVHİD, KANUNLAR VE SEBEPLER",
        period: "5–8. Haftalar",
        weeks: [
          {
            weekNumber: 5,
            topic: "Kanun Bir Şeyi Yapar mı, Tarif mi Eder?",
            mainQuestion: "“Yerçekimi yaptı” demek olayın bütün açıklamasını vermiş olur mu?",
            primarySource: "Tabiat Risalesi; tevhid ve kanun bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 6,
            topic: "Sebep ile Yaratıcıyı Ayırmak",
            mainQuestion: "Bir sebebin süreçte rolü olması, sonucu yaratması anlamına gelir mi?",
            primarySource: "Yirmi Üçüncü Lem’a / Tabiat Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 7,
            topic: "Tesadüf Ne Kadar Açıklayıcıdır?",
            mainQuestion: "Tesadüf kelimesi düzenin nasıl ortaya çıktığını gerçekten açıklar mı?",
            primarySource: "Tabiat Risalesi; ilgili tefekkür bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 8,
            topic: "Bilimsel Açıklama ile “Niçin?” Sorusu",
            mainQuestion:
              "Bilim bir olayın nasılını açıklarken dinî/metafizik soru hangi noktada başlar?",
            primarySource: "Tabiat Risalesi; Pırlanta’da ilim–iman bahisleri",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 3,
        title: "3. ÜNİTE — AHİRET: İMKÂN, ADALET VE RAHMET",
        period: "9–12. Haftalar",
        weeks: [
          {
            weekNumber: 9,
            topic: "Ahiret Hakkında “Mümkün” Ne Demektir?",
            mainQuestion: "Bir şey bize alışılmadık geliyorsa imkânsız mıdır?",
            primarySource: "Onuncu Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 10,
            topic: "İlk Yaratılış ile Yeniden Yaratılış",
            mainQuestion:
              "İlk defa yaratılışı kabul edip yeniden yaratılışı uzak görmek tutarlı mıdır?",
            primarySource: "Onuncu Söz — haşir temsilleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 11,
            topic: "Adalet Neden Tamamlanmak İster?",
            mainQuestion:
              "Bu dünyada karşılığı tamamlanmayan iyilik ve kötülükler bize ne düşündürür?",
            primarySource: "Onuncu Söz — adalet bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 12,
            topic: "Rahmet ve Hikmet Penceresinden Ahiret",
            mainQuestion:
              "Hayatta gördüğümüz rahmet ve hikmet ölümden sonrası hakkında delil olabilir mi?",
            primarySource: "Onuncu Söz",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 4,
        title: "4. ÜNİTE — KADER, ÖZGÜRLÜK VE SORUMLULUK",
        period: "13–16. Haftalar",
        weeks: [
          {
            weekNumber: 13,
            topic: "Özgürlük: Seçebilmek mi, Sınırsızlık mı?",
            mainQuestion: "İnsan ne kadar özgürdür; sınırlar özgürlüğü tamamen yok eder mi?",
            primarySource: "Kader ve cüz’î irade bahisleri; Pırlanta",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 14,
            topic: "Şartlarım Seçimlerimi Belirler mi?",
            mainQuestion: "Aile, çevre ve karakter etkilerken sorumluluk nerede başlar?",
            primarySource: "Kader–irade bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 15,
            topic: "Kader Mazeret Olabilir mi?",
            mainQuestion:
              "Yanlış bir davranıştan sonra “kaderimde varmış” demek neden problemli olabilir?",
            primarySource: "Kader Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 16,
            topic: "Tevekkül: Çalışmanın Sonrası mı, Yerine Geçeni mi?",
            mainQuestion: "Allah’a güvenmek tedbiri ve emeği azaltır mı?",
            primarySource: "Tevekkül bahisleri; Pırlanta",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 5,
        title: "5. ÜNİTE — ENE, DEĞER VE KİMLİK",
        period: "17–20. Haftalar",
        weeks: [
          {
            weekNumber: 17,
            topic: "“Ben” Duygusu Bir Ölçü Aleti Olabilir mi?",
            mainQuestion: "Ene insanın kendisini ve Rabbini tanımasında nasıl kullanılabilir?",
            primarySource: "Otuzuncu Söz — Ene",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 18,
            topic: "Başarı Benim mi?",
            mainQuestion:
              "Kabiliyet, emek ve imkânı birlikte düşündüğümüzde başarıya nasıl sahip çıkarız?",
            primarySource: "Altıncı Söz; Ene bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 19,
            topic: "Kendini Değerli Görmek ile Kibir Arasındaki Çizgi",
            mainQuestion: "İnsan kendine saygı duyup aynı zamanda tevazu sahibi olabilir mi?",
            primarySource: "Yirmi Üçüncü Söz; ihlâs ve ene bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 20,
            topic: "Başarısızlık Kimliğim midir?",
            mainQuestion: "Bir sonuç kötü olduğunda insanın bütün değeri azalır mı?",
            primarySource: "Yirmi Üçüncü Söz; Pırlanta’da ümit",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 6,
        title: "6. ÜNİTE — MUSİBET, SABIR, DUA VE ÜMİT",
        period: "21–24. Haftalar",
        weeks: [
          {
            weekNumber: 21,
            topic: "Musibet: Her Sıkıntı Aynı Şekilde mi Okunur?",
            mainQuestion: "Sıkıntı karşısında anlam aramak, acıyı inkâr etmek midir?",
            primarySource: "Hastalar Risalesi; musibet bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 22,
            topic: "Sabır Pasif Bekleyiş midir?",
            mainQuestion: "Sabretmek hiçbir şey yapmadan dayanmak mı, doğru tavrı sürdürmek midir?",
            primarySource: "Hastalar Risalesi; Pırlanta’da sabır",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 23,
            topic: "Dua Ediyorum; Neden Aynısı Olmuyor?",
            mainQuestion: "Duanın kabulü ile isteğin aynen gerçekleşmesi aynı şey midir?",
            primarySource: "Dua bahisleri; Pırlanta — Dua Ufku",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 24,
            topic: "Ümit Ne Zaman Gerçekçi Olur?",
            mainQuestion: "Ümit ile kendini kandırma arasındaki fark nedir?",
            primarySource: "Gençlik Rehberi; Pırlanta’da ümit",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 7,
        title: "7. ÜNİTE — AİLE, VEFA VE İLİŞKİ AHLAKI",
        period: "25–28. Haftalar",
        weeks: [
          {
            weekNumber: 25,
            topic: "Yaşlanan Anne-Babaya Vefa",
            mainQuestion:
              "Büyüyüp bağımsızlaşırken yaşlanan ebeveyne karşı sorumluluğum nasıl değişir?",
            primarySource: "Yirmi Dördüncü Lem’a; Anne-Baba Hakkı vaazı",
            isFamilyRespectHighlight: true,
          },
          {
            weekNumber: 26,
            topic: "Sınır Koymak ile Hürmetsizlik Aynı Şey mi?",
            mainQuestion: "Bir talebe “hayır” derken nezaketi ve vefayı nasıl korur?",
            primarySource: "Anne-baba hakkı kaynakları; ma‘ruf ile muamele çerçevesi",
            isFamilyRespectHighlight: true,
          },
          {
            weekNumber: 27,
            topic: "Fikir Ayrılığı Kardeşliği Bozmak Zorunda mı?",
            mainQuestion: "Bir insanla ciddi biçimde farklı düşünürken adaleti nasıl koruruz?",
            primarySource: "Uhuvvet Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 28,
            topic: "Dijital Dünyada Gıybet, Mahremiyet ve Adalet",
            mainQuestion: "Ekran arkasında konuşmak ahlâkî sorumluluğu azaltır mı?",
            primarySource: "Uhuvvet Risalesi; Pırlanta’da gıybet/mahremiyet",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 8,
        title: "8. ÜNİTE — İHLÂS, HİZMET VE BİRLİKTE ÇALIŞMA",
        period: "29–32. Haftalar",
        weeks: [
          {
            weekNumber: 29,
            topic: "İhlâs ve Görünür Olma İsteği",
            mainQuestion: "İyi bir işi duyurmak ne zaman faydalı, ne zaman niyeti bozucu olabilir?",
            primarySource: "Yirmi Birinci Lem’a",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 30,
            topic: "Birlikte Çalışırken “Ben” Ne Yapar?",
            mainQuestion: "Ortak işte sahiplenme ile ego arasındaki çizgi nerede?",
            primarySource: "İhlâs Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 31,
            topic: "Hizmet ve Mesuliyet: Kendini Tüketmeden Sorumluluk",
            mainQuestion: "Sorumluluk almak ile her yükü tek başına taşımaya çalışmak aynı şey mi?",
            primarySource: "Risale’de hizmet/tesanüd bahisleri; Pırlanta",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 32,
            topic: "Eleştiri ve Nasihat: Doğruyu Söylemenin Adabı",
            mainQuestion:
              "Haklı olmak, her doğruyu her yerde aynı şekilde söylemeyi gerektirir mi?",
            primarySource: "Uhuvvet/İhlâs bahisleri; Pırlanta’da üslup",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 9,
        title: "9. ÜNİTE — KENDİ TAHKİK DOSYAMI HAZIRLIYORUM",
        period: "33–36. Haftalar",
        weeks: [
          {
            weekNumber: 33,
            topic: "Benim Tahkik Sorum Ne?",
            mainQuestion: "Bu yıl gerçekten araştırmak istediğim imanî veya ahlâkî soru hangisi?",
            primarySource: "Öğrencinin seçtiği kaynaklar",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 34,
            topic: "Kaynakları Toplamak ve Ayırmak",
            mainQuestion: "Bir konuda aslî metin, yorum ve dış kaynakları nasıl ayırırım?",
            primarySource: "Risale/Pırlanta dijital külliyatları; güvenilir ek kaynaklar",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 35,
            topic: "İki Kaynağı Mukayese Etmek",
            mainQuestion: "İki metin aynı meseleyi hangi ortak ve farklı yönlerden ele alıyor?",
            primarySource: "Seçilen Risale ve Pırlanta metinleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 36,
            topic: "Tahkik Dosyam: Ne Sonuca Vardım?",
            mainQuestion: "Araştırmamdan sonra neyi daha iyi biliyorum, hangi sorum hâlâ açık?",
            primarySource: "Öğrencinin dönem dosyası",
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
      "Önceki yıllarda öğrenilen imanî ve ahlâkî başlıkları birbirinden kopuk bilgiler değil, birbiriyle ilişkili bir dünya görüşü olarak okumaya başlaması.",
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
        title: "1. ÜNİTE — TANIŞMA, BÜTÜNLÜK VE TEMSİL",
        period: "1–4. Haftalar",
        weeks: [
          {
            weekNumber: 1,
            topic: "Bu Yıl Parçaları Nasıl Bir Bütüne Dönüştüreceğiz?",
            mainQuestion:
              "Yıllardır öğrendiğimiz iman ve ahlâk hakikatleri hayatımızda nasıl tek bir yön ve duruş oluşturabilir?",
            primarySource: "Kendi Dünyamıza Doğru; Risale’de iman-hayat bütünlüğü bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 2,
            topic: "Bediüzzaman: Bir Ömür Nasıl Bir Merkez Etrafında Toplanır?",
            mainQuestion:
              "Bir insanın farklı kararlarını ve fedakârlıklarını tek bir ana gaye nasıl birleştirir?",
            primarySource: "Tarihçe-i Hayat; iman hizmeti ve mesuliyet çizgisi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 3,
            topic: "Hocaefendi: Sözden Önce Temsil",
            mainQuestion:
              "Bir hakikati anlatırken hayatımız söylediğimizi desteklemiyorsa ne eksik kalır?",
            primarySource: "Pırlanta’da temsil, tebliğ ve hâl dili bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 4,
            topic: "Bir Hakikati Doğru ve Ölçülü Nasıl Anlatırım?",
            mainQuestion:
              "Bir şeyi doğru bilmek ile onu karşıdakine uygun, sınırlarını koruyarak anlatmak aynı şey midir?",
            primarySource: "Risale’de temsil ve üslup örnekleri; Pırlanta’da irşad ve üslup",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 2,
        title: "2. ÜNİTE — ŞÜPHE, KESİNLİK, AKIL VE İTİRAZ",
        period: "5–8. Haftalar",
        weeks: [
          {
            weekNumber: 5,
            topic: "Şüphe ile Soru Aynı Şey mi?",
            mainQuestion: "Bir sorunun varlığı imanın yokluğu anlamına gelir mi?",
            primarySource: "Risale’de vesvese/şüphe ve tahkik bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 6,
            topic: "Kesin Bildiğim, Kuvvetle Kanaat Ettiğim ve Yorumladığım Şey",
            mainQuestion: "Düşüncelerimde kesin bilgi ile yorum arasındaki farkı nasıl korurum?",
            primarySource: "Muhakemat; kaynak ve yorum disiplini",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 7,
            topic: "İtirazı Dinlemek Neden Önemlidir?",
            mainQuestion: "Karşı görüşü anlamadan cevap vermek hakikati savunmak sayılır mı?",
            primarySource: "Muhakemat; Uhuvvet Risalesi; Pırlanta’da diyalog/üslup",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 8,
            topic: "İman ile Akıl Arasında Çatışma Zorunlu mu?",
            mainQuestion: "Akıl yürütmek ile iman etmek birbirinin alternatifi midir?",
            primarySource: "Risale’nin imanî hüccetleri; Pırlanta’da ilim-iman",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 3,
        title: "3. ÜNİTE — KUR’AN VE RİSALE’Yİ OLGUNLUKLA OKUMAK",
        period: "9–12. Haftalar",
        weeks: [
          {
            weekNumber: 9,
            topic: "Kur’an’ın Katmanlı Hitabını Olgunlukla Okumak",
            mainQuestion: "Metnin derinliği ile sınırsız yorum arasında nasıl sınır koyarız?",
            primarySource: "Kırık Testi-1 Önsöz; tefsir usulü çerçevesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 10,
            topic: "Risale’de Bir Kavramı Ağ İçinde Okumak",
            mainQuestion:
              "Bir kavramı tek cümle yerine farklı risalelerde takip etmek ne kazandırır?",
            primarySource: "Dijital külliyat; kavram tarama",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 11,
            topic: "Temsil ile Delil Aynı Şey mi?",
            mainQuestion: "Bir temsil neyi açıklar, neyi tek başına ispat etmez?",
            primarySource: "Sözler’de temsiller; Muhakemat",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 12,
            topic: "Tekrar Okumak: Aynı Metinde Yeni Bağlantılar",
            mainQuestion: "Yıllar sonra aynı metne dönünce neden farklı şeyler fark edebiliriz?",
            primarySource: "Tarihçe-i Hayat; Kırık Testi-1 kitap okuma bahsi",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 4,
        title: "4. ÜNİTE — KİMLİK, MESLEK VE HAYAT GAYESİ",
        period: "13–16. Haftalar",
        weeks: [
          {
            weekNumber: 13,
            topic: "Ben Kimim? Rollerim mi, Değerlerim mi?",
            mainQuestion:
              "Okul, meslek, aile ve sosyal roller değişirken kimliğin merkezi ne olmalı?",
            primarySource: "Ene bahsi; Yirmi Üçüncü Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 14,
            topic: "Meslek Seçimi ve Hayat Gayesi",
            mainQuestion: "Bir mesleği seçerken yalnız başarı ve gelir mi belirleyici olmalı?",
            primarySource: "Altıncı Söz; emanet ve kabiliyet bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 15,
            topic: "Başarı, Statü ve Rıza",
            mainQuestion:
              "İnsanların takdiri ile Allah rızasını aynı anda gözetmek nasıl mümkün olur?",
            primarySource: "İhlâs Risalesi",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 16,
            topic: "Karar Verirken Dua, İstişare ve Sorumluluk",
            mainQuestion: "Zor kararlarda dua ve istişare irademizin yerine mi geçer?",
            primarySource: "Dua, tevekkül ve meşveret bahisleri",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 5,
        title: "5. ÜNİTE — AİLE VE YETİŞKİNLİĞE GEÇİŞ",
        period: "17–20. Haftalar",
        weeks: [
          {
            weekNumber: 17,
            topic: "Evden Bağımsızlaşırken Bağı Korumak",
            mainQuestion: "Kendi hayatımı kurarken anne-babamla bağı nasıl olgunlaştırırım?",
            primarySource: "Yirmi Dördüncü Lem’a; Anne-Baba Hakkı vaazı",
            isFamilyRespectHighlight: true,
          },
          {
            weekNumber: 18,
            topic: "Gelecekte Aile Kurmak: Hak, Sorumluluk ve Merhamet",
            mainQuestion: "Aile yalnız duygusal yakınlık mı, karşılıklı sorumluluk da mı?",
            primarySource: "Risale/Pırlanta’da aile, şefkat ve mesuliyet bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 19,
            topic: "Yaşlanan Ebeveyn, Zaman ve Fedakârlık",
            mainQuestion: "Uzakta yaşasam bile vefa ve hizmeti nasıl sürdürebilirim?",
            primarySource: "Anne-baba hakkı kaynakları",
            isFamilyRespectHighlight: true,
          },
          {
            weekNumber: 20,
            topic: "Aile İçinde Fikir Ayrılığı ve Sınır",
            mainQuestion: "Sevgi, saygı ve şahsî kararlar arasında denge nasıl kurulur?",
            primarySource: "Uhuvvet, şefkat ve ma‘ruf ile muamele çerçevesi",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 6,
        title: "6. ÜNİTE — TOPLUM, ADALET VE HİZMET",
        period: "21–24. Haftalar",
        weeks: [
          {
            weekNumber: 21,
            topic: "Adalet ve Merhamet Birbirinin Rakibi mi?",
            mainQuestion: "Bir yanlış karşısında hem adil hem merhametli olunabilir mi?",
            primarySource: "Uhuvvet Risalesi; Pırlanta’da adalet-merhamet",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 22,
            topic: "Topluma Karşı Sorumluluk",
            mainQuestion: "İyi bir insan olmak yalnız kendi hayatını düzgün yaşamak mıdır?",
            primarySource: "Risale’de hizmet/mesuliyet; Pırlanta",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 23,
            topic: "Hizmette İhlâs: Sonucu Sahiplenmeden Çalışmak",
            mainQuestion: "Emek verip sonucu kontrol edemediğimizde nasıl dengede kalırız?",
            primarySource: "İhlâs Risalesi; tevekkül bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 24,
            topic: "Dijital Çağda Temsil",
            mainQuestion: "Bir paylaşımım beni ve değerlerimi nasıl temsil eder?",
            primarySource: "Pırlanta’da temsil/üslup; gıybet ve mahremiyet bahisleri",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 7,
        title: "7. ÜNİTE — KAYIP, ÖLÜM, ÜMİT VE HESAP",
        period: "25–28. Haftalar",
        weeks: [
          {
            weekNumber: 25,
            topic: "Ölüm Gerçeği Hayat Planını Nasıl Değiştirir?",
            mainQuestion: "Ölümü düşünmek hayatı küçültür mü, öncelikleri netleştirir mi?",
            primarySource: "Gençlik Rehberi; Onuncu Söz",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 26,
            topic: "Kayıp ve Yas: Acıya Yer Açmak",
            mainQuestion: "İman, üzülmemeyi mi ister; acıyı anlamlandırmaya mı yardım eder?",
            primarySource: "Hastalar Risalesi; ahiret ve sabır bahisleri",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 27,
            topic: "Haksızlık Karşısında Ümit",
            mainQuestion: "Dünyadaki adaletsizlikler ümidimizi nasıl etkiler?",
            primarySource: "Onuncu Söz; Pırlanta’da ümit ve sabır",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 28,
            topic: "Hesap Bilinci ve Günlük Seçimler",
            mainQuestion: "Ahiret inancı bugünkü küçük kararları nasıl etkiler?",
            primarySource: "Onuncu Söz; mesuliyet bahisleri",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 8,
        title: "8. ÜNİTE — DOĞRU İFADE, ÜSLUP VE TEMSİL",
        period: "29–32. Haftalar",
        weeks: [
          {
            weekNumber: 29,
            topic: "Din Adına Konuşurken Sınırım Ne?",
            mainQuestion: "Bilmediğim bir konuda “bilmiyorum” diyebilmek neden önemlidir?",
            primarySource: "Muhakemat; Pırlanta’da irşad ve üslup",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 30,
            topic: "Önce Dinlemek, Sonra Cevap Vermek",
            mainQuestion:
              "Karşıdakinin gerçek sorusunu anlamadan verilen doğru cevap neden işe yaramayabilir?",
            primarySource: "Pırlanta’da irşad, diyalog ve insanı tanıma",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 31,
            topic: "Fikir Ayrılığında Üslup",
            mainQuestion:
              "Hakikati savunurken kişiyi incitmeden ve adaleti kaybetmeden nasıl konuşulur?",
            primarySource: "Uhuvvet Risalesi; Muhakemat",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 32,
            topic: "Temsil: İnsanlar Sözümüzden Önce Neyi Görür?",
            mainQuestion: "Değerlerimizi en çok cümlelerimiz mi, davranışlarımız mı anlatır?",
            primarySource: "Pırlanta’da temsil; İhlâs Risalesi",
            isFamilyRespectHighlight: false,
          },
        ],
      },
      {
        unitNumber: 9,
        title: "9. ÜNİTE — KENDİ KAYNAK HARİTAM VE DEVAM PLANI",
        period: "33–36. Haftalar",
        weeks: [
          {
            weekNumber: 33,
            topic: "Mezuniyet Sorusu: Benim Temel Meselem Ne?",
            mainQuestion:
              "Altı yıllık okumanın sonunda hangi imanî/ahlâkî soru benim için merkezî hâle geldi?",
            primarySource: "Öğrencinin seçtiği kaynaklar",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 34,
            topic: "Şahsî Kaynak Haritam",
            mainQuestion:
              "Hangi soruda hangi esere, bölüme ve ikinci kaynağa başvuracağımı biliyor muyum?",
            primarySource: "Risale/Pırlanta indeksleri ve kişisel notlar",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 35,
            topic: "Bir Meseleyi Yazılı ve Sözlü İfade Etmek",
            mainQuestion:
              "Bir konuyu delili, sınırı ve kişisel yorumumu ayırarak anlatabilir miyim?",
            primarySource: "Öğrencinin seçtiği metinler",
            isFamilyRespectHighlight: false,
          },
          {
            weekNumber: 36,
            topic: "Müfredat Bitince Okuma Nasıl Devam Eder?",
            mainQuestion:
              "Ders bittiğinde kaynakla bağımı nasıl sürdürülebilir bir plana dönüştürürüm?",
            primarySource: "Kişisel okuma planı; temel eserler",
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

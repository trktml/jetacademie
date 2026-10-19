<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# JetAcademie Ajan & LLM Rehberi

Bu depo; Bun, Tailwind CSS v4, Zustand v5, TanStack Query v5, Zod v4, Better-Auth (pg.Pool üzerinden PostgreSQL), Prettier ve Docker/Dokploy ile geliştirilmiş bir full-stack Next.js 16 uygulaması olan **JetAcademie**'dir.

Bu kılavuz, bu projede çalışan yapay zeka kodlama ajanları için bağlayıcı kurallar ve standartlar sağlar.

---

## ⚡ Tartışmasız Temel Kurallar

1. **Yalnızca Bun Çalışma Zamanı**: JavaScript/TypeScript komutları için Bun kullanın (örn. `bun install`, `bun dev`, `bun run test`, `bun run build`). Asla `npm`, `yarn` veya `pnpm` çalıştırmayın.
2. **Next.js Otomatik Bloğunu Koruyun**: Yukarıdaki `<!-- BEGIN:nextjs-agent-rules -->` bloğu ASLA silinmemeli veya değiştirilmemelidir.
3. **Kalite Doğrulama Döngüsü**: Herhangi bir kodlama görevini tamamlandı ilan etmeden önce şunları çalıştırın ve doğrulayın:
   - `bun run test` (`DATABASE_URL=:memory:` ile paket betiğini çalıştırır; tüm birim testleri geçmelidir)
   - `bun run lint` (Sıfır ESLint hatası veya uyarısı)
   - `bun run format:check` (Prettier uyumluluğu; otomatik düzeltmek için `bun run format` çalıştırın)
   - `bun run build` (Next.js tip kontrolü ve standalone derleme başarılı olmalıdır)
4. **Git Commit Formatı**: Conventional Commits formatını önerin veya kullanın:
   - Format: `type(scope): description`
   - Örnekler: `feat(query): add tanstack query provider and demo`, `fix(auth): handle invalid credentials error`
5. **Müfredat Yazımı**: Öğrencilere yönelik müfredat içeriği oluşturmadan veya revize etmeden önce `mufredat-docs/planlar/MUFREDAT-INSTRUCTIONS.md` dosyasını ve ilgili sınıfın kanonik `M1_Yillik_Plan.md`–`M6_Yillik_Plan.md` planlarını okuyun (bkz. `mufredat-docs/planlar/README.md`). Her kayda kaynak ve kategoriye özel editoryal kontrollerini uygulayın; tek başına kod testlerinden geçmek içerik kalitesini kanıtlamaz. Bu kılavuzun başındaki tek iş akışını izleyin: plan ve öğrenen profili, kaynak doğrulama, temsilci ders, yazım, ayrı kaynak ve dil incelemeleri, düzeltmeler ve yayın değerlendirmesi. Okuma zevki ve devam etmek için somut bir neden; giriş, gelişme ve sonuçtan kanıt gerektirir. Kılavuz; gelişmiş girişlere, birbiriyle bağlantılı sahnelere, amaçlı tekrarlara, yaratıcı başlıklandırmaya ve esnek Konu kapanışlarına izin verir. 1–4. haftalar giriş ve meraka öncelik verir: Konu dersleri ayet, doğrudan alıntı veya davranış görevi gerektirmez; ayrı kategori gereksinimleri ve kaynak doğrulama yine de geçerlidir. Kaynaklar anlatımda ihtiyaç duyulan yerde yer alır; bir ayet Arapça → meal → dipnot sırasını korur. Bölüm 10 sınıf/ay/dil beklentilerini tanımlar; bölüm 18 kayıt başına gerekli kanıt kaydını ve kabul sonuçlarını (kılavuzun orijinal etiketleri altında kaydedilen: uygun / düzeltme gerekli / değerlendirme eksik) tanımlar. İçeriğin yayına hazır kabul edilmesi için bilinen sorunların veya eksik zorunlu incelemelerin çözülmesi gerekir. M1 yaklaşık 12–13 yaş anlamına gelir, ilkokul 1. sınıf değildir; tek başına yaş Türkçe okuma becerisini belirlemez. Haftalık paket üretilirken (altı sınıf × `konu`), her sınıfın metni o sınıf ve yaş grubuna özel, tamamen müstakil ve bağımsız bir ders olarak ele alınmalıdır. Sınıflar arası metinler asla bir yazı dizisinin birbirini takip eden kısımları/maddeleri gibi kurgulanamaz (örn. 1. sınıfta 1. madde, 2. sınıfta 2. madde gibi bölümlendirmeler veya sınıflar arası devamlılık atıfları kesinlikle yasaktır; her sınıf farklı bir yaştaki bağımsız öğrenci tarafından okunur ve kendi içinde eksiksiz bir bütünlüğe sahip olmalıdır). `mufredat-kaynak-arama` becerisi pasajları bulmaya yardımcı olur, ancak arama parçacıkları orijinal kaynağa karşı kontrol edilmelidir. Diğer kategorilerdeki hadise dayalı rivayetler de dahil olmak üzere hadis alıntıları, harici doğrulama bağlantıları veya bir hadis sitesi `resourceUrl`'i olmadan bibliyografik dipnotlar kullanır (yazım kılavuzu bölüm 19.8); araştırma URL'leri özel hazırlık kayıtlarında kalabilir. Siyer, Sahabe, Ayet ve Hadis artık ayrı kategoriler değildir; doğrulanmış pasajları ve olayları yalnızca Konu anlatımını desteklediklerinde, tek bir akış içinde kullanın. Haftalık paketler 12 kayıt içerir (altı sınıf × `konu` ve `hocaefendi-dinleme`). 36 haftalık müfredat paketleri için tek doğruluk kaynağı veritabanıdır (inceleme/taslak için `isDraft: 1`, canlı için `isDraft: 0`). Statik ders kod modülleri oluşturmayın veya öğrencilere yönelik ders Markdown dosyalarını git'e commitlemeyin. Kanonik yıllık planlar ve yazım yönergeleri takip edilen Markdown belgeleri olarak sürdürülür. Grupları `bun run curriculum save --week N --file <path>` ile doğrulayın ve aşamalandırın, `bun run curriculum publish --week N` ile yayınlayın ve gerektiğinde `bun run curriculum export --week N` ile dışa aktarın. Korunan kategorilere (`adab-i-muaseret`, `ilmihal`, `esma`) asla dokunulmaz veya bunlar silinmez.

6. **Dokümantasyon Dili**: `README.md` ve `AGENTS.md` dosyalarını Türkçe olarak sürdürün. Web sitesi arayüzünü, öğrencilere yönelik müfredatı, orijinal alıntıları ve içerik format etiketlerini mevcut dillerinde koruyun; dokümantasyon çevirisi uygulama içeriğini çevirme yetkisi vermez. Komutları, dosya yollarını, tanımlayıcıları ve Next.js tarafından otomatik oluşturulan bloğu koruyun.

7. **Özerk Müfredat Editör Döngüsü**: Öğrenci müfredatı üretirken veya revize ederken [mufredat-editor-dongusu](.agents/skills/mufredat-editor-dongusu/SKILL.md) becerisini ve yazım kılavuzunun 18.6 bölümünü uygulayın. İlk taslaktan sonra kullanıcının ayrıca “kontrol et”, “kopuk yerleri düzelt” veya “çocuklara göre yeniden oku” demesini beklemeyin. Metinden kanıtlı eleştiri → somut düzeltme önerisi → uygulama → yeniden okuma döngüsünü yetkili kapsam içinde tamamlayın. İyi çalışan anlatıyı koruyun; açık sorun veya zorunlu inceleme eksikliğini gizleyerek uygun sonucu vermeyin. Açıkça yalnız rapor veya metne dokunmadan inceleme istenmişse metni değiştirmeyin; yayın yetkisini mevcut kullanıcı talebinden ayrı değerlendirin.

---

## 🏛️ Mimari & Durum Yönetimi Stratejisi

### 1. İstemci Durumu ve Sunucu Durumunun Ayrılması (Client State vs. Server State)

- **Yerel istemci durumu (Zustand)**:
  - `use-ui-store.ts`, `use-curriculum-store.ts` ve `use-guest-store.ts` dosyalarında olduğu gibi kullanıcı arayüzü durumu ve yerel olarak kalıcı kılınan tercihler veya misafir ilerlemesi için `src/store/*.ts` kullanın.
  - Kimliği doğrulanmış sunucu verilerini ikinci bir önbellek olarak Zustand deposuna kopyalamayın.
- **Uzak veri (TanStack Query v5 ve Sunucu Bileşenleri)**:
  - Uygun olan yerlerde Sunucu Bileşenlerinde (Server Components) başlangıç sunucu verilerini getirin. `src/lib/queries/curriculum.ts` ve `src/components/curriculum-page-content.tsx` dosyalarında olduğu gibi istemci tarafı getirme ve önbelleğe alma için TanStack Query kullanın.
  - Müfredat ilerlemesi gibi mevcut mutasyonlar `src/app/mufredat/actions.ts` içindeki sunucu eylemlerini (server actions) kullanır; bunu genişletirken bu akışı koruyun.
  - `<QueryProvider>` bileşeni `src/app/layout.tsx` içinde yapılandırılmıştır. QueryClient'a `@/lib/query-client` içindeki `getQueryClient()` ile erişin ve yeniden kullanılabilir sorgular için `queryOptions(...)` tercih edin.

### 2. TanStack Query SSR Singleton Deseni

Next.js App Router'da QueryClient örnekleri temiz bir şekilde yönetilmelidir:

- **Sunucuda**: İstekler arası veri sızıntılarını önlemek için istek başına yeni bir `QueryClient` örneği oluşturulur.
- **Tarayıcıda**: Yeniden oluşturmalar (re-renders) ve React Suspense sınırları boyunca tek bir örnek (singleton `QueryClient`) yeniden kullanılır.
- **Uygulama**: `src/lib/query-client.ts` içindeki `getQueryClient()` aracılığıyla otomatik olarak işlenir:
  ```ts
  import { getQueryClient } from "@/lib/query-client";
  // Bileşenlerde 'new QueryClient()' yerine her zaman getQueryClient() kullanın
  ```
- **Geliştirici Araçları (DevTools)**: `<ReactQueryDevtools initialIsOpen={false} />`, `src/providers/query-provider.tsx` dosyasına dahil edilmiştir.
- **Sunucu Bileşeni Önceden Getirme (Prefetching)**: React Sunucu Bileşenlerinde sorguları önceden getirirken, sorgu istemcisini dehydrate edin ve istemci ağacını `<HydrationBoundary>` ile sarın:
  ```tsx
  import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
  import { getQueryClient } from "@/lib/query-client";
  import { healthQueryOptions } from "@/lib/queries/health";

  export default async function Page() {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(healthQueryOptions);

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyClientComponent />
      </HydrationBoundary>
    );
  }
  ```
- **İzomorfik Veri Getirme (Isomorphic Fetching)**: Sunucu tarafındaki bir `fetch`, mutlak bir URL'ye ihtiyaç duyar; `src/lib/queries/health.ts` bir `getBaseUrl()` örneği gösterir. Sunucu Bileşenleri bunun yerine `src/app/mufredat/page.tsx` dosyasının yaptığı gibi sunucu veri fonksiyonlarını doğrudan çağırabilir.

### 3. Doğrulama (Zod v4)

- Zod şemalarını `src/lib/validations/` altında düzenli tutun.
- TypeScript türlerini doğrudan şemalardan çıkarın (infer):
  ```ts
  export const mySchema = z.object({ ... });
  export type MyInput = z.infer<typeof mySchema>;
  ```

### 4. Kimlik Doğrulama & Veritabanı (Better-Auth + PostgreSQL)

- Veritabanı yöneticisi: `src/lib/db.ts` (`pg.Pool`, asenkron sorgular, parametre eşleme ve bellek içi test yedeğini yönetir).
- Sunucu örneği: `src/lib/auth.ts` (Better-Auth PostgreSQL adaptörü ve evrensel şema DDL ile yapılandırılmıştır).
- React istemcisi: `src/lib/auth-client.ts` (`authClient`, `useSession`, `signIn`, `signUp`, `signOut`).
- Rota işleyicisi: `src/app/api/auth/[...all]/route.ts`.
- Üretim Veritabanı: `docker-compose.yml` üzerinden PostgreSQL 16 Alpine (`pgdata` hacmine sahip `db` servisi).
- Uzaktan Dağıtım: Tailscale dağıtım betiği (`scripts/deploy.sh`) ve Tailscale Serve HTTPS (`docs/tailscale.md`).
- Test Veritabanı: `bun:sqlite` aracılığıyla bellek içi SQLite; `bun run test` betiği `DATABASE_URL=:memory:` olarak ayarlar ve test modu buna yönlendirir. Test paketinin tamamı için paket betiğini kullanın.

### 5. Next.js 16 & React 19 İncelikleri

- Sayfa ve Düzen rota özellikleri (`params`, `searchParams`) asenkron `Promise` nesneleridir. Bunları her zaman `await` edin.
- Kök düzen (root layout), Next.js 16 `LayoutProps<"/">` kullanır.
- Varsayılan olarak React Sunucu Bileşenlerini (RSC) kullanın. Yalnızca bileşenler tarayıcı hook'larına (`useState`, `useQuery`, `useCounterStore`, olay işleyicileri) ihtiyaç duyduğunda `"use client"` ekleyin.

### 6. Mobil Öncelikli PWA & Erişilebilirlik Standartları

- **Görünüm Alanı Yapılandırması (Viewport)**: `viewportFit: "cover"` ve `interactiveWidget: "resizes-content"` kullanarak `src/app/layout.tsx` dosyasından `viewport: Viewport` dışa aktarın.
- **Güvenli Alan Dolguları (Safe Area Insets)**: Sabit üstbilgiler, alt sayfalar ve gezinme çubukları için Tailwind v4 özel yardımcı sınıflarını (`pt-safe`, `pb-safe`, `pl-safe`, `pr-safe`, `px-safe`) kullanın.
- **Minimum Dokunma Hedefi**: Her buton, sekme ve tıklanabilir denetim 44x44px hedef boyutunu (`min-h-[44px]` veya `min-w-[44px]`) karşılamalıdır.
- **iOS Yakınlaştırma Önleme**: Mobil ekranlarda (< 768px) girdi yazı tipi boyutunu 16px veya üzerinde tutun.
- **Vaul Alt Sayfaları (Sheets)**: `src/components/account-sheet.tsx` dosyası `vaul` kullanır; sayfaları genişletirken duyarlı ve erişilebilir desenlerini takip edin.
- **Paylaşılan UI Durumu**: `src/store/use-ui-store.ts` hesap sayfasını yönetir. Paylaşılan bir depoyu yalnızca durumun bileşenler arasında koordine edilmesi gerektiğinde kullanın.

---

## 📂 Proje Haritası

Mevcut kodu bulmak için bu kısa haritayı kullanın; düzenlemeden önce kesin dosyalar için dizini inceleyin.

| Alan                               | Mevcut konum                                                                                                               |
| :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| App Router sayfaları ve API'leri   | `src/app/` (`mufredat`, `hedefler`, `duzenle`, `api/auth`, `api/curriculum`, `api/editor`)                                 |
| Paylaşılan arayüz                  | `src/components/` (`curriculum-archive.tsx`, `curriculum-page-content.tsx`, `account-sheet.tsx`, `konu-lesson-reader.tsx`) |
| Kimlik doğrulama ve veritabanı     | `src/lib/auth.ts`, `src/lib/auth-client.ts`, `src/lib/db.ts`, `src/lib/curriculum-db.ts`, `src/lib/editor/`                |
| Koddaki müfredat ve yıllık planlar | `src/lib/data/`, özellikle `curriculum-plans.ts` ve `konu-curriculum.ts`                                                   |
| İstemci durumu ve uzak sorgular    | `src/store/`, `src/lib/queries/`, `src/lib/query-client.ts`, `src/providers/query-provider.tsx`                            |
| Kaynak planlar ve yazım kılavuzu   | `mufredat-docs/planlar/M1_Yillik_Plan.md` - `M6_Yillik_Plan.md`, `mufredat-docs/planlar/MUFREDAT-INSTRUCTIONS.md`          |
| Kaynak araştırması                 | `.agents/skills/mufredat-kaynak-arama/SKILL.md`, `scripts/search-sources.ts`, `scripts/index-sources.py`, yerel `sources/` |
| İçerik dışa/içe aktarma            | `scripts/` (müfredat paketleri hazırlandığında içe/dışa aktarma betikleri)                                                 |
| Dağıtım                            | `Dockerfile`, `docker-compose.yml`, `scripts/deploy.sh`, `docs/tailscale.md`                                               |

Yıllık Markdown planları ders konusu, soru, kazanımlar ve birincil kaynak açısından yetkilidir ve bağlayıcıdır. Belge önceliği için `mufredat-docs/planlar/README.md` dosyasını okuyun. Orijinal DOCX dosyaları migrasyon doğrulamasından sonra kaldırılmıştır; mevcut planlar için Markdown kullanın. `src/lib/data/curriculum-plans.ts` kısmi bir uygulama temsilidir; müfredat içeriğini değiştirmeden önce ilgili Markdown planıyla karşılaştırın ve plan alanları değiştiğinde uyumlu tutun. Kaynak PDF'ler ve oluşturulan dışa aktarımlar yerel olabilir veya git tarafından yok sayılabilir, bu nedenle commited olduklarını varsaymak yerine varlıklarını kontrol edin.

---

## 🛠️ Temel Komut Referansı

| Görev                          | Komut                                    |
| :----------------------------- | :--------------------------------------- |
| Geliştirme Sunucusunu Başlatma | `bun dev`                                |
| Test Paketini Çalıştırma       | `bun run test`                           |
| Belirli Bir Testi Çalıştırma   | `bun test src/lib/query-client.test.ts`  |
| Kodu Lint Etme                 | `bun run lint`                           |
| Kod Formatını Kontrol Etme     | `bun run format:check`                   |
| Formatı Otomatik Düzeltme      | `bun run format`                         |
| Üretim Derlemesi Alma          | `bun run build`                          |
| Better-Auth Migrasyonu         | `bun run db:migrate`                     |
| Müfredat Durumu                | `bun run curriculum list`                |
| Müfredat Paketini Kaydetme     | `bun run curriculum save --week N -f ..` |
| Müfredatı Yayınlama            | `bun run curriculum publish --week N`    |
| Müfredatı Dışa Aktarma         | `bun run curriculum export --week N`     |
| Müfredat Haftasını Silme       | `bun run curriculum delete --week N`     |
| Müfredatı Yedekleme            | `bun run curriculum backup`              |
| Müfredatı Geri Yükleme         | `bun run curriculum restore`             |

---

## 🧪 Ajanlar İçin Test Yönergeleri

- `bun:test` kullanın (`describe`, `expect`, `it`, `mock`).
- Testleri uygulama dosyalarının yanına yazın (örn. `feature.ts` -> `feature.test.ts`).
- Gerekli olmadıkça React DOM'u taklit etmekten (mock) kaçının; sorgu fonksiyonlarını, hook'ları, durum depolarını ve doğrulama mantığını doğrudan test edin.
- Ağ çağrılarını `globalThis.fetch = mock(...)` ile taklit edin ve orijinal fetch'i `finally` bloklarında geri yükleyin.

## Dinleme Kelime Hazinesi Üretimi

`hocaefendi-dinleme` için `mufredat-docs/planlar/MUFREDAT-INSTRUCTIONS.md` dosyasındaki üç dilli kelime formatını izleyin: videoda konuşulan doğrulanmış kelime ve Türkçe anlamı, ardından Fransızca tanımıyla birlikte Fransızca bir kelime ve Felemenkçe tanımıyla birlikte Felemenkçe bir kelime. Video zaman damgalarını hazırlık notlarına kaydedin ve her iki çeviriyi de bağlam içinde inceleyin. İç içe `FR:` ardından `NL:` Markdown listesini veritabanı gövdesinde saklayın; statik ders modülleri oluşturmayın.

## 📚 Sınıf Düzeyleri Arası Tam Bağımsızlık ve Müstakil Ders Kuralı

Haftalık müfredat paketleri (M1–M6) üretilirken veya revize edilirken her sınıfın metni için şu temel ilkeler zorunludur:

1. **Müstakil Ders İlkesi**: Aynı haftaya ait olsa bile her sınıfın (M1–M6) ders metni, o sınıfın hedef yaş grubuna (M1 için ~12–13 yaştan M6 için ~17–18 yaşa), bilişsel düzeyine ve yıllık plan kazanımına özel olarak sıfırdan ele alınan **tamamen müstakil ve bağımsız** bir derstir.
2. **Yazı Dizisi / Devam Metni Yasağı**:
   - Bir sınıfın metni asla başka bir sınıfın devamı, eki veya öncülü gibi kurgulanamaz.
   - 1. sınıfta konunun 1. maddesini, 2. sınıfta 2. maddesini işlemek gibi bir yazı dizisi bölümlendirmesi **KESİNLİKLE YASAKTIR**.
   - Metinlerde "önceki sınıfta gördüğümüz gibi", "1. sınıftaki konunun devamı olarak", "bir önceki maddede ele aldığımız konunun ikinci kısmı" gibi sınıflar arası ardışıklık veya dizi çağrışımı yapan hiçbir ifade bulunamaz.
3. **Farklı Öğrenci Profili Gerçeği**:
   - 1. sınıf öğrencisi (M1, ~12–13 yaş) ile 2. sınıf öğrencisi (M2, ~13–14 yaş) farklı bireylerdir.
   - 2. sınıftaki bir öğrenci, o hafta 1. sınıf metnini okumamıştır ve okumayacaktır.
   - Her ders, ilgili sınıftaki öğrencinin önüne tek başına geldiğinde hiçbir eksiklik hissettirmeyecek şekilde; merak uyandıran girişi, sahneleri, tefekkür soruları ve kapanışıyla kendi içinde tam, tutarlı ve tatmin edici bir bütünlük taşımalıdır.
4. **İç Tutarlılık ve Yaşa Uygunluk**: Her sınıfın yazısı o yaşın gerektirdiği düşünme derinliğini, kendi ana sorusunu ve yıllık plan hedefini kendi akışı içinde bağımsızca planlamalı; anlatımı ve pratik çıkarımları kendi içinde tutarlı olmalıdır.
5. **Kaynağı Önceden Okuma Şartı Yoktur**: Öğrencinin ilgili Risale veya Pırlanta bölümünü okuduğu, dinlediği ya da yanında açık tuttuğu varsayılmaz. Ders, kaynağın nasıl ilerlediğini anlatmakla yetinmeden, haftanın meselesini ve seçilen gerekçeyi kendi içinde eksiksiz anlatmalıdır. Doğrulanmış alıntılar gerekli bağlam ve anlam desteğiyle korunur; kaynak adı veya dipnot eksik açıklamanın yerine geçmez. Yazım kılavuzunun 1. bölümündeki kaynak kapalı okuma kontrolünü her derse uygula; “kim ne yapıyor, örnek neyi gösteriyor, sonuca neden varılıyor?” sorularının cevabı yalnız öğrenci metninden çıkmalıdır. Kaynakla çalışma kazanımı olan haftalarda da incelenecek pasaj ve bağlam dersin içinde verilir.

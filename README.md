# JetAcademie

JetAcademie, modern web standartları ve yüksek performans hedeflenerek oluşturulmuş tam teşekküllü Next.js 16 başlangıç şablonudur.

## 🚀 Teknoloji Yığını

- **Çalışma Zamanı (Runtime):** [Bun](https://bun.sh/) (v1.3+)
- **Web Çatısı:** [Next.js](https://nextjs.org/) (v16 App Router, Turbopack, React 19, standalone derleme çıktısı)
- **Stil & Tasarım:** [Tailwind CSS](https://tailwindcss.com/) (v4)
- **İstemci Durum Yönetimi (Client State):** [Zustand](https://zustand-demo.pmnd.rs/) (v5)
- **Sunucu Durum Yönetimi & Önbellek (Server State):** [TanStack Query](https://tanstack.com/query/latest) (React Query v5 + DevTools)
- **Veri & Şema Doğrulama:** [Zod](https://zod.dev/) (v4)
- **Kimlik Doğrulama:** [Better-Auth](https://better-auth.com/) (Bun SQLite destekli, otomatik tablo ilklendirme)
- **Kod Formatlama & Linting:** [Prettier](https://prettier.io/) (Tailwind eklentisi ile) & ESLint 9 Flat Config
- **Konteyner & Dağıtım:** Docker (Multi-stage) & Docker Compose ([Dokploy](https://dokploy.com/) uyumlu, `/api/health` sağlık kontrolü dahil)

---

## 📁 Proje Yapısı

```text
jetacademie/
├── Dockerfile                  # Çok aşamalı (multi-stage) Bun üretim imajı & sağlık kontrolü
├── docker-compose.yml          # Dokploy / yerel Docker dağıtımı, persistent volume ve healthcheck
├── AGENTS.md                   # AI / LLM ajan yönergeleri ve kurallar (Next.js bloğu korunur)
├── CLAUDE.md                   # LLM ajan referans dosyası (@AGENTS.md)
├── .cursorrules                # Cursor & IDE ajan kuralları referansı (@AGENTS.md)
├── .prettierrc.json            # Sabit Prettier kuralları
├── .prettierignore             # Prettier hariç tutma listesi
├── .env.example                # Çevre değişkenleri şablonu
├── src/
│   ├── app/                    # Next.js App Router sayfaları ve layout
│   │   ├── api/
│   │   │   ├── auth/[...all]/  # Better-Auth API uç noktası
│   │   │   └── health/         # Konteyner sağlık kontrolü (/api/health)
│   │   ├── globals.css         # Tailwind v4 tema stilleri
│   │   ├── layout.tsx          # Kök yerleşim (QueryProvider sarmalayıcısı ile)
│   │   └── page.tsx            # Başlangıç ve demo vitrini
│   ├── components/             # React arayüz bileşenleri
│   │   ├── auth-zod-demo.tsx   # Zod ve Better-Auth kayıt/giriş formu ve oturum yönetimi
│   │   ├── counter-demo.tsx    # Zustand istemci durumu demosu
│   │   └── query-demo.tsx      # TanStack Query sunucu durumu, refetch ve mutasyon demosu
│   ├── lib/
│   │   ├── auth.ts             # Better-Auth sunucu & otomatik SQLite şema ilklendirmesi
│   │   ├── auth.test.ts        # Better-Auth sunucu ve API testleri
│   │   ├── auth-client.ts      # Better-Auth React istemcisi
│   │   ├── query-client.ts     # TanStack QueryClient üretici & SSR singleton yardımcısı
│   │   ├── query-client.test.ts# TanStack QueryClient birim testleri
│   │   ├── queries/
│   │   │   ├── health.ts       # Sağlık kontrolü queryOptions, fetcher ve getBaseUrl
│   │   │   └── health.test.ts  # TanStack Query birim testleri
│   │   └── validations/
│   │       ├── auth.ts         # Zod doğrulama şemaları (signUp & signIn)
│   │       └── auth.test.ts    # Zod şema doğrulama testleri
│   ├── providers/
│   │   ├── query-provider.tsx  # TanStack QueryClientProvider & ReactQueryDevtools
│   │   └── query-provider.test.tsx # QueryProvider birim testleri
│   └── store/
│       ├── use-counter-store.ts      # Zustand sayaç deposu
│       └── use-counter-store.test.ts # Zustand depo testleri
└── tsconfig.json
```

---

## 🧠 Durum Yönetimi Mimarisi (State Management)

Projeye iki net durum ayrımı uygulanmıştır:

### 1. İstemci Durumu (Client State) -> Zustand v5

- Arayüze özgü, geçici durumlar (modal açık/kapalı, tema, sepet, adım formları) `src/store/` altındaki Zustand depolarında yönetilir.
- Örnek: `useCounterStore` (`src/store/use-counter-store.ts`).

### 2. Sunucu Durumu (Server State) -> TanStack Query v5

- Uzak API'lardan çekilen veriler, arka plan güncellemeleri, önbellekleme ve veri mutasyonları TanStack Query ile yönetilir.
- **SSR & Next.js App Router Uyumluluğu:** `src/lib/query-client.ts` içindeki `getQueryClient()` fonksiyonu sunucu tarafında her istek için izole bir `QueryClient` oluşturur (veri sızıntılarını önler); tarayıcı tarafında ise yeniden render sırasında tekil (singleton) örneği korur.
- **Sunucu Bileşenlerinde Önceden Çekme (SSR Prefetching):** Server Component içerisinde veriyi önceden çekip istemciye aktarmak için `dehydrate` ve `HydrationBoundary` kullanılır:
  ```tsx
  import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
  import { getQueryClient } from "@/lib/query-client";
  import { healthQueryOptions } from "@/lib/queries/health";

  export default async function Page() {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(healthQueryOptions);

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <QueryDemo />
      </HydrationBoundary>
    );
  }
  ```
- **İzomorfik API İstekleri (Isomorphic Fetching):** Sunucu tarafında SSR sırasında göreceli (relative) URL hatalarını (`fetch() URL is invalid`) önlemek için `getBaseUrl()` fonksiyonu sunucuda `NEXT_PUBLIC_APP_URL` / `BETTER_AUTH_URL` / `http://localhost:3000` kullanır, tarayıcıda ise doğrudan `/api/...` göreceli adresini döndürür.
- **Tipten Güvenli Sorgular:** `queryOptions` deseni kullanılarak sorgu anahtarları ve fonksiyonları `src/lib/queries/` altında modüler tanımlanır.
- **DevTools:** Geliştirme ortamında tarayıcıda sağ alt köşede TanStack Query DevTools otomatik olarak hazırdır.

---

## 🤖 AI & LLM Ajanları İçin Rehber (Agent Guidelines)

Projeyi geliştiren veya bakımını yapan AI ajanlarının (Antigravity, Claude, Cursor, Windsurf vb.) aşağıdaki kurallara uyması zorunludur:

1. **Yalnızca Bun Kullanımı:**
   - Paket yükleme: `bun install` veya `bun add <paket>`
   - Komut çalıştırma: `bun run <komut>` veya `bun <komut>`
   - `npm`, `yarn` veya `pnpm` kesinlikle **çalıştırılmamalıdır**.
2. **AGENTS.md Bütünlüğü:**
   - `AGENTS.md` dosyasının başındaki `<!-- BEGIN:nextjs-agent-rules -->` bloğu Next.js tooling tarafından yönetilir; bu blok silinmemeli veya değiştirilmemelidir.
   - Proje yönergeleri ve kural seti bu bloğun altında `AGENTS.md` içerisinde ayrıntılı şekilde yer alır.
3. **Değişiklik Sonrası Doğrulama Döngüsü (Quality Gate):**
   - Kodlamayı tamamlamadan önce şu 4 adımın tamamı hatasız geçmelidir:
     ```bash
     bun test             # Tüm birim testler geçmeli
     bun run lint         # ESLint 0 hata/uyarı vermeli
     bun run format:check # Prettier kurallarına tam uyulmalı (düzeltmek için: bun run format)
     bun run build        # Next.js derlemesi ve TypeScript denetimi başarıyla tamamlanmalı
     ```
4. **Git Commit Formatı:**
   - Commit mesajları Conventional Commits formatında önerilmelidir:
     - `feat(query): add tanstack query provider and demo`
     - `fix(auth): handle invalid credentials error`
     - `docs(readme): update state management architecture`

---

## 🛠️ Yerel Geliştirme

### Gereksinimler

- [Bun](https://bun.sh/) kurulu olmalıdır (`curl -fsSL https://bun.sh/install | bash`).

### 1. Bağımlılıkları Yükleme

```bash
bun install
```

### 2. Çevre Değişkenlerini Ayarlama

`.env.example` dosyasını `.env.local` olarak kopyalayın:

```bash
cp .env.example .env.local
```

### 3. Geliştirme Sunucusunu Başlatma

```bash
bun dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

---

## 📜 Komutlar

| Komut                  | Açıklama                                                |
| ---------------------- | ------------------------------------------------------- |
| `bun dev`              | Turbopack ile geliştirme sunucusunu başlatır            |
| `bun run build`        | Next.js standalone üretim derlemesini hazırlar          |
| `bun start`            | Üretim derlemesini yerel olarak çalıştırır              |
| `bun test`             | Tüm birim ve entegrasyon testlerini koşturur            |
| `bun run lint`         | ESLint ile kod kontrolü yapar                           |
| `bun run format`       | Prettier ile tüm dosyaları kurallara göre biçimlendirir |
| `bun run format:check` | Prettier kurallarına uygunluğu denetler                 |
| `bun run db:migrate`   | Better-Auth veritabanı şema göçlerini çalıştırır        |

---

## 🐳 Dokploy & Docker ile Dağıtım

Proje, **Dokploy** üzerinde tek tıkla çalışacak şekilde yapılandırılmıştır.

### Dokploy Üzerinde Dağıtım

1. Dokploy panelinde yeni bir **Compose** veya **Application (Dockerfile)** oluşturun.
2. Depoyu (`Git Provider`) bağlayın.
3. Çevre değişkenlerini (`Environment Variables`) tanımlayın:
   - `BETTER_AUTH_SECRET`: Güvenli 32+ karakter anahtar (`openssl rand -base64 32`)
   - `BETTER_AUTH_URL`: Yayın yapılan domain (Örn: `https://jetacademie.com`)
   - `NEXT_PUBLIC_APP_URL`: Yayın yapılan domain (Örn: `https://jetacademie.com`)
   - `DATABASE_URL`: `/app/data/auth.sqlite` (Varsayılan persistent volume konumu)
4. Dağıtımı başlatın (**Deploy**). Dokploy konteynerin durumunu `/api/health` uç noktası ile otomatik izler.

### Yerel Docker Testi

```bash
# Konteyneri derleyin ve ayağa kaldırın
docker compose up --build -d

# Logları takip edin
docker compose logs -f

# Sağlık kontrolünü test edin
curl http://localhost:3000/api/health
```

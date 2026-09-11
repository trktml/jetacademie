# JetAcademie

JetAcademie, modern web standartları ve yüksek performans hedeflenerek oluşturulmuş tam teşekküllü Next.js başlangıç şablonudur.

## 🚀 Teknoloji Yığını

- **Çalışma Zamanı (Runtime):** [Bun](https://bun.sh/) (v1.3+)
- **Web Çatısı:** [Next.js](https://nextjs.org/) (v16 App Router & Turbopack, standalone output)
- **Stil & Tasarım:** [Tailwind CSS](https://tailwindcss.com/) (v4)
- **Durum Yönetimi:** [Zustand](https://zustand-demo.pmnd.rs/) (v5)
- **Veri & Şema Doğrulama:** [Zod](https://zod.dev/) (v4)
- **Kimlik Doğrulama:** [Better-Auth](https://better-auth.com/) (Bun SQLite destekli)
- **Kod Formatlama & Linting:** [Prettier](https://prettier.io/) (Tailwind eklentisiyle sabit kurallar) & ESLint
- **Konteyner & Dağıtım:** Docker (Multi-stage) & Docker Compose ([Dokploy](https://dokploy.com/) uyumlu)

---

## 📁 Proje Yapısı

```text
├── Dockerfile                  # Çok aşamalı (multi-stage) Bun üretim imajı
├── docker-compose.yml          # Dokploy / yerel Docker dağıtımı ve veri alanı
├── .prettierrc.json            # Sabit Prettier kuralları
├── .prettierignore             # Prettier hariç tutma listesi
├── .env.example                # Çevre değişkenleri şablonu
├── src/
│   ├── app/                    # Next.js App Router sayfaları ve layout
│   │   ├── api/auth/[...all]/  # Better-Auth API uç noktası
│   │   ├── globals.css         # Tailwind v4 tema stilleri
│   │   ├── layout.tsx
│   │   └── page.tsx            # Başlangıç ve demo vitrini
│   ├── components/             # React arayüz bileşenleri
│   │   ├── auth-zod-demo.tsx   # Zod ve Better-Auth örnek formu
│   │   └── counter-demo.tsx    # Zustand durum yönetimi demosu
│   ├── lib/
│   │   ├── auth.ts             # Better-Auth sunucu konfigürasyonu
│   │   ├── auth-client.ts      # Better-Auth React istemcisi
│   │   └── validations/auth.ts # Zod doğrulama şemaları
│   └── store/
│       └── use-counter-store.ts # Zustand sayaç deposu
└── tsconfig.json
```

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
| `bun dev`              | Geliştirme sunucusunu başlatır                          |
| `bun run build`        | Next.js standalone üretim derlemesini hazırlar          |
| `bun start`            | Üretim derlemesini yerel olarak çalıştırır              |
| `bun run lint`         | ESLint ile kod kontrolü yapar                           |
| `bun run format`       | Prettier ile tüm dosyaları kurallara göre biçimlendirir |
| `bun run format:check` | Prettier kurallarına uygunluğu denetler                 |

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
4. Dağıtımı başlatın (**Deploy**).

### Yerel Docker Testi

```bash
# Konteyneri derleyin ve ayağa kaldırın
docker compose up --build -d

# Logları takip edin
docker compose logs -f
```

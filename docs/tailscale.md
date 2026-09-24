# Tailscale ile Uzak Sunucuya Dağıtım ve Yönetim Rehberi

Bu rehber, **JetAcademie** projesini Tailscale ağı üzerindeki `100.80.51.7` uzak sunucunuza kolayca deploy etmeniz, HTTPS ile güvenli çalıştırmanız ve PostgreSQL veritabanını Tailscale üzerinden güvenle yönetmeniz için hazırlanmıştır.

---

## 🌐 1. Genel Bakış ve Güvenlik Yapılandırması (Tailscale İzolasyonu)

- **Uzak Sunucu Tailscale IP**: `100.80.51.7`
- **Mevcut Host Port Çakışması Koruması**:
  Sunucunuzda halihazırda `5432` portunda çalışan bir PostgreSQL veritabanı bulunduğu için, JetAcademie'nin PostgreSQL konteyneri ana makinede **`5433`** portuna yönlendirilmiştir (`PG_HOST_PORT=5433`).
- **Yüksek Güvenlik & Salt Tailscale IP Kısıtlaması (`PG_BIND_IP`)**:
  PostgreSQL portu genel internete (`0.0.0.0`) **ASLA** açılmaz! Port yönlendirmesi doğrudan ve yalnızca Tailscale IP adresine bağlanır (`100.80.51.7:5433:5432`).
  - Dış dünyadan (WAN / genel internet) gelen istekler port 5433'e kesinlikle ulaşamaz; işletim sistemi soketi yalnızca Tailscale arayüzünde dinler.
  - Sadece ve sadece Tailscale ağınızda kimliği doğrulanmış makineler `100.80.51.7:5433` üzerinden veritabanına erişebilir.
  - Konteyner içi ağ: `web` servisi `db:5432` ile doğrudan Docker iç ağı üzerinden görüşür.
  - Mevcut PostgreSQL veritabanınız (`5432`) **kesinlikle etkilenmez ve çakışma yaşanmaz**.
- Web servisi varsayılan olarak `127.0.0.1:3001` üzerinde dinler; Tailscale Serve veya yerel ters vekil üzerinden erişilir.

---

## 🚀 2. Uzak Sunucuya Tek Komutla Deploy

Yerel terminalinizden projeyi `100.80.51.7` sunucunuza deploy etmek için:

```bash
# Otomatik olarak 100.80.51.7 hedefine deploy eder:
./scripts/deploy.sh

# Veya kullanıcı adınızla (örn: root veya ubuntu):
./scripts/deploy.sh root@100.80.51.7
# veya
./scripts/deploy.sh ubuntu@100.80.51.7
```

### Betik Neler Yapar?

1. `100.80.51.7` sunucusuna SSH bağlantısını doğrular.
2. Kodları `/opt/jetacademie` dizinine senkronize eder.
3. Uzak sunucuda `.env` dosyasını otomatik oluşturur, `PG_HOST_PORT=5433` ayarını yapar ve güçlü parolalar üretir.
4. `docker compose up -d --build` çalıştırarak hem Postgres 16'yı hem de web uygulamasını ayağa kaldırır.

---

## 🔒 3. Web Arayüzüne Erişim ve Otomatik HTTPS

### Tailscale Serve ile HTTPS

Uzak sunucuya SSH ile bağlanıp tek komutla SSL sertifikalı alan adı elde edebilirsiniz:

```bash
tailscale serve --bg 3001
```

Bu komut sonrası uygulamanız `https://<sunucu-adi>.<tailnet-adi>.ts.net` adresinde güvenli şekilde yayına geçer.
Sunucudaki `.env` dosyasında `BETTER_AUTH_URL` ve `NEXT_PUBLIC_APP_URL` değerlerini bu HTTPS adresine ayarlayın. Uygulama portunu Tailscale IP üzerinden doğrudan açmanız gerekiyorsa `HOST_BIND_IP` değerini bilinçli olarak değiştirin ve ağ erişimini sınırlandırın.

---

## 📦 4. SQLite'tan Uzak PostgreSQL'e Veri Aktarımı (Migration)

Deploy tamamlandıktan sonra, yerel makinenizdeki `auth.sqlite` verilerini Tailscale üzerinden uzak PostgreSQL'e aktarabilirsiniz:

```bash
# Sunucunuzdaki .env içindeki POSTGRES_PASSWORD değerini kullanarak:
DATABASE_URL="postgres://jetacademie:SIFRE@100.80.51.7:5433/jetacademie" bun scripts/migrate-sqlite-to-pg.ts
```

> **Not:** Veritabanı parolasını terminal çıktısına veya dağıtım günlüklerine yazdırmayın. Uzak `.env` dosyasını yalnızca yetkili hesaplarla erişilebilir tutun.

---

## 💾 5. Yedekleme ve Geri Yükleme

Uzak sunucuda:

```bash
# Yedek alma:
./scripts/backup-db.sh

# Geri yükleme:
./scripts/restore-db.sh ./backups/jetacademie_backup_*.sql
```

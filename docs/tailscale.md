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

### Seçenek A: Doğrudan Tailscale IP

Tailscale ağınıza bağlı herhangi bir cihazdan (Dokploy port 3000'de olduğu için JetAcademie port 3001'dedir):

```text
http://100.80.51.7:3001
```

### Seçenek B: Tailscale Serve ile Otomatik Let's Encrypt HTTPS (Tavsiye Edilen)

Uzak sunucuya SSH ile bağlanıp tek komutla SSL sertifikalı alan adı elde edebilirsiniz:

```bash
tailscale serve --bg 3001
```

Bu komut sonrası uygulamanız `https://<sunucu-adi>.<tailnet-adi>.ts.net` adresinde güvenli şekilde yayına geçer.

---

## 📦 4. SQLite'tan Uzak PostgreSQL'e Veri Aktarımı (Migration)

Deploy tamamlandıktan sonra, yerel makinenizdeki `auth.sqlite` verilerini Tailscale üzerinden uzak PostgreSQL'e aktarabilirsiniz:

```bash
# Sunucunuzdaki .env içindeki POSTGRES_PASSWORD değerini kullanarak:
DATABASE_URL="postgres://jetacademie:SIFRE@100.80.51.7:5433/jetacademie" bun scripts/migrate-sqlite-to-pg.ts
```

> **Not:** Eğer şifreyi öğrenmek isterseniz, sunucuda şu komutu çalıştırabilirsiniz:
>
> ```bash
> ssh root@100.80.51.7 "grep '^POSTGRES_PASSWORD=' /opt/jetacademie/.env"
> ```

---

## 💾 5. Yedekleme ve Geri Yükleme

Uzak sunucuda:

```bash
# Yedek alma:
./scripts/backup-db.sh

# Geri yükleme:
./scripts/restore-db.sh ./backups/jetacademie_backup_*.sql
```

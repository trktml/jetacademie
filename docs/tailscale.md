# Tailscale ve Docker ile dağıtım

JetAcademie'nin web servisi varsayılan olarak ana makinenin yalnızca `127.0.0.1:3001` adresine bağlanır. Tailscale Serve veya yerel bir HTTPS ters proxy bu adrese bağlanabilir. PostgreSQL için varsayılan Compose yapılandırmasında ana makine portu yoktur; web konteyneri veritabanına Compose ağı üzerinden `db:5432` adresinde ulaşır.

## Dağıtım

```bash
./scripts/deploy.sh ubuntu@100.80.51.7 /opt/jetacademie
```

Betiği çalıştırmadan önce dağıtılacak sürümü Git'e kaydedin. Betik yalnızca `HEAD` içindeki uygulama dosyalarını gönderir. Yerel ortam dosyaları, yedekler, dışa aktarımlar ve araştırma kaynakları aktarılmaz. Uzakta yalnız `src/`, `public/` ve `scripts/` içindeki eski dosyalar eşitlenir; dağıtım kökündeki `.env` ve yedekler korunur. Önceki dağıtım betikleri kullanıldıysa sunucuda kalmış eski yerel kopyaları ayrıca kontrol edin.

İlk dağıtımda betik Tailscale HTTPS adresini bulabiliyorsa `.env` dosyasını `0600` izinleriyle oluşturur ve ayrı veritabanı yönetici/uygulama parolaları üretir. Özel alan adı için uzak `.env` dosyasını önceden hazırlayıp `BETTER_AUTH_URL` ve `NEXT_PUBLIC_APP_URL` değerlerini aynı HTTPS kaynağına ayarlayın. Örnek için [`.env.example`](../.env.example) dosyasına bakın. Mevcut kurulumun sırları değiştirilmez. Betik, Compose hizmetleri sağlıklı olmadan başarılı sonuç vermez.

Aynı uygulamaya birden fazla adresten erişiliyorsa kurallı adresi koruyun ve diğer adresleri `AUTH_TRUSTED_ORIGINS` değişkenine virgülle ayırarak yazın. Üretimde her değer şema ve alan adı içeren tam bir HTTPS kaynağı olmalıdır; yol ve joker karakter kullanmayın. Ayarı dağıttıktan sonra her adresten girişi doğrulayın. İzin listesinde bulunmayan bir adresten gelen giriş isteği `403` ile reddedilir.

Sunucuda HTTPS yönlendirmesini açın:

```bash
tailscale serve --bg 3001
tailscale serve status
```

Tailnet erişim kurallarında yalnız gerekli kullanıcı ve cihazlara izin verin. Dokploy kullanıyorsanız proxy'yi web konteynerine yönlendirin ve veritabanı konteynerini proxy ağına katmayın. Ters proxy, istemcinin gönderdiği yönlendirme başlıklarını temizlemeli, gerçek genel `Host` veya `X-Forwarded-Host` değerini ayarlamalı ve giriş, kayıt ve editör uçlarına istemci başına istek sınırı uygulamalıdır. Yönetim ağı varsa `/duzenle` ve `/api/editor/*` için proxy erişimini o ağla sınırlayın. İstek gövdesi ve bağlantı zaman aşımı sınırlarını da proxy üzerinde ayarlayın.

`POST /api/auth/sign-in-anonymous` için istemci sınırını proxy'nin doğruladığı bağlantı adresine göre uygulayın. Uygulama kullanıcı adı başına giriş denemelerini ve örnek başına eşzamanlı işi sınırlar; farklı kullanıcı adları deneyen istemciler için trafik sınırını ters proxy uygular.

## Veritabanına yönetim erişimi

Sunucudaki Compose dizininde doğrudan `docker compose exec db psql -U jetacademie -d jetacademie` çalıştırabilirsiniz. Harici bir istemci gerekiyorsa sunucuda isteğe bağlı döngü portunu açın:

```bash
docker compose -f docker-compose.yml -f docker-compose.db-tunnel.yml up -d db
```

Kendi bilgisayarınızdan SSH tüneli oluşturun:

```bash
ssh -N -L 127.0.0.1:5433:127.0.0.1:5433 ubuntu@100.80.51.7
```

İstemciyi `127.0.0.1:5433` adresine bağlayın. İşiniz bitince tüneli kapatıp sunucuda yalnız temel dosyayla `docker compose -f docker-compose.yml up -d db` çalıştırın. Eski `PG_BIND_IP` ayarı kullanılmaz; önceki Tailnet PostgreSQL adresini kullanan istemciler SSH tüneline geçmelidir.

Boş bir PostgreSQL hacminde `POSTGRES_APP_PASSWORD` tanımlanırsa başlangıç betiği `jetacademie_app` rolünü açar; bu rol uygulamanın tablolarını oluşturabilir, ancak süper kullanıcı değildir ve rol veya veritabanı oluşturamaz. Web'e verilen `APP_DATABASE_URL` bu rolü kullanmalıdır. Önceden başlatılmış hacimlerde başlangıç betiği yeniden çalışmaz. Mevcut kurulum ayrı role geçirilecekse önce yedek alın, rolü ve şema izinlerini oluşturun, uygulamaya ait mevcut tabloların sahipliğini aktarın ve yeni URL ile ayrı ortamda doğrulayın. Eski kurulumlar bu geçiş yapılana kadar mevcut bağlantılarıyla çalışır.

## Yedekleme

```bash
./scripts/backup-db.sh
./scripts/restore-db.sh ./backups/jetacademie_backup_YYYYMMDD_HHMMSS.sql
```

Yedek özel izinlerle oluşturulur ve tamamlanmadan hedef adla yayımlanmaz. Parola hash'leri ve öğrenci verileri içerebileceği için yedeği erişimi kısıtlı, tercihen şifreli bir konumda saklayın. Uygulama ve editör oturumları ile geçici doğrulama kayıtları yeni yedeklere alınmaz. Geri yükleme için güvenilen bir SQL yedeği ve boş hedef veritabanı kullanın; betik hata durumunda işlemi geri alır, başarılı olduğunda eski oturumları iptal eder. Ayrı uygulama rolü bulunan yeni kurulumlarda yeni yedekler bu role ait tablolar olarak geri yüklenir. Eski SQL yedekleri önceki tablo sahibini belirten komutlar içerebilir; rol geçişinden önce bunları ayrı bir hedefte eski rolle doğrulayın. Compose dışındaki bir hedef için `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER` ve gerekirse `PGPASSFILE` kullanın.

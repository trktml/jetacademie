# kisa-transcripts

Hocaefendi'den Kısa Kısa (https://www.youtube.com/@hocaefendidenkisakisa/shorts) kanalındaki
short videoların otomatik altyazılardan üretilmiş transkript arşivi. Müfredata hocaefendi-dinleme
için video seçilirken kullanılacak metin araştırması burada tutulur.

## İçerik

- `NNNN_baslik.txt`: Her video için temizlenmiş transkript (numara en yeniden eskiye doğru).
- `index.csv` ve `index.md`: Video başlığı, YouTube linki, video ID, tarih, dil, altyazı türü
  ve dosya eşlemesi.
- `index.xlsx`: index.csv ile aynı veriyi süzülebilir tablo olarak tutan Excel çalışma kitabı.

Transkriptler YouTube otomatik altyazısından üretildiği için konuşma tanıma hataları içerebilir;
alıntı yapmadan önce mutlaka video üzerinden doğrulayın.

## Güncelleme

Kanalda yeni short paylaşıldığında indirmek için yt-dlp kullanılır:

    yt-dlp --skip-download --write-auto-subs --write-subs --sub-langs tr       --sub-format vtt/srv1 --write-info-json       --extractor-args "youtube:player_client=web_embedded,youtube:lang=tr"       -o "/tmp/kisa_meta/%(id)s.%(ext)s"       "https://www.youtube.com/shorts/<VIDEO_ID>"

Ardından her `.tr.vtt` dosyasındaki yürüyen altyazı tekrarı ayıklanarak düz metne çevrilir ve
`index.*` dosyaları güncellenir. Türkçe altyazısı olmayan videolar için `en-orig`, sonra `en`
denenir; hiç altyazısı olmayanlar index dosyalarında "Transkript yok" durumuyla işaretlenir.

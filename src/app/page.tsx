import { BookOpen } from "lucide-react";
import { HeroTree } from "@/components/hero-tree";

export default function Home() {
  return (
    <main className="landing-page">
      <section id="overview" className="scroll-mt-24" aria-label="JetAcademie ana sayfa">
        <HeroTree />
      </section>

      <section className="home-quote-section" aria-label="Günün hadisi">
        <div className="home-quote-card">
          <span className="home-quote-card__icon">
            <BookOpen aria-hidden="true" />
          </span>
          <blockquote>
            <p>&ldquo;İlim öğrenmek her Müslüman&apos;a farzdır.&rdquo;</p>
            <footer>— Hz. Muhammed (s.a.v.)</footer>
          </blockquote>
        </div>
      </section>

      <footer className="landing-footer">
        © {new Date().getFullYear()} JetAcademie — Manevi Gelişim Müfredatı
      </footer>
    </main>
  );
}

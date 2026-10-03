import { HeroTree } from "@/components/hero-tree";

export default function Home() {
  return (
    <main className="landing-page">
      <section
        id="overview"
        className="landing-hero scroll-mt-24"
        aria-label="JetAcademie ana sayfa"
      >
        <HeroTree />
      </section>

      <div className="landing-bottom">
        <section className="home-quote-section" aria-label="İlham veren söz">
          <div className="home-quote-card">
            <blockquote>
              <span className="home-quote-gem" aria-hidden="true" />
              <span className="home-quote-text">
                &ldquo;İlim öğrenmek her Müslüman&apos;a farzdır.&rdquo;
              </span>
              <span className="home-quote-divider" aria-hidden="true" />
              <footer className="home-quote-author">— Hz. Muhammed (s.a.v.)</footer>
            </blockquote>
          </div>
        </section>

        <footer className="landing-footer">
          © {new Date().getFullYear()} JetAcademie · Belçika ❤️
        </footer>
      </div>
    </main>
  );
}

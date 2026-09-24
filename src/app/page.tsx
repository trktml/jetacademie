import { HeroTree } from "@/components/hero-tree";

export default function Home() {
  return (
    <main className="landing-page">
      <section id="overview" className="scroll-mt-24" aria-label="JetAcademie ana sayfa">
        <HeroTree />
      </section>

      <section className="home-quote-section" aria-label="İlham veren söz">
        <div className="home-quote-card">
          <blockquote>
            <p>&ldquo;İlim öğrenmek her Müslüman&apos;a farzdır.&rdquo;</p>
            <footer className="text-[11px] text-zinc-400 sm:text-xs">
              — Hz. Muhammed (s.a.v.)
            </footer>
          </blockquote>
        </div>
      </section>

      <footer className="landing-footer">
        © {new Date().getFullYear()} JetAcademie · Belçika ❤️
      </footer>
    </main>
  );
}

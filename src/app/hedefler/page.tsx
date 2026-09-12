import type { Metadata } from "next";
import { Compass, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Hedefler",
  description: "JetAcademie dönem hedefleri.",
};

export default function TargetsPage() {
  return (
    <main className="targets-page page-shell">
      <header className="page-heading page-heading--compact">
        <div className="page-heading__mark">
          <Target aria-hidden="true" />
        </div>
        <div>
          <h1>Hedefler</h1>
        </div>
      </header>

      <section className="targets-empty" aria-labelledby="targets-empty-title">
        <span className="targets-empty__icon">
          <Compass aria-hidden="true" />
        </span>
        <p className="eyebrow">Yakında inşallah</p>
        <h2 id="targets-empty-title">.</h2>
      </section>
    </main>
  );
}

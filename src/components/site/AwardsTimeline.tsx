import { motion } from "motion/react";
import { Trophy, Medal } from "lucide-react";
import { AWARDS, TIMELINE } from "@/data/series";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Awards() {
  return (
    <section id="awards" className="relative border-t border-border/40 py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHeading
          kicker="Accolades"
          title="Honours & Nominations"
          subtitle="A placeholder record of the recognition earned across award seasons."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AWARDS.map((a, i) => {
            const won = a.result === "Won";
            return (
              <Reveal key={i} delay={(i % 3) * 0.06}>
                <div className="glass rim-gold hover-lift group flex h-full items-start gap-4 p-6">
                  <span className={`grid size-12 shrink-0 place-items-center border ${won ? "border-gold text-gold gold-glow" : "border-bronze/60 text-bronze"}`}>
                    {won ? <Trophy className="size-5" /> : <Medal className="size-5" />}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="label-caps text-[0.6rem] text-muted-foreground">{a.year}</span>
                      <span className={`text-[0.6rem] font-semibold uppercase tracking-[0.14em] ${won ? "text-gold" : "text-muted-foreground"}`}>
                        · {a.result}
                      </span>
                    </div>
                    <h3 className="mt-1 font-display text-lg text-foreground">{a.title}</h3>
                    <p className="text-sm text-muted-foreground">{a.category}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Timeline() {
  return (
    <section id="timeline" className="relative border-t border-border/40 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          kicker="The Chronicle"
          title="Milestones of a Dynasty"
          subtitle="The turning points that forged the Vane legend, year by year."
        />
        <div className="relative mt-16 pl-8 sm:pl-12">
          <div className="absolute bottom-0 left-2 top-2 w-px bg-gradient-to-b from-gold via-bronze to-transparent sm:left-3" />
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.08}>
              <div className="relative pb-12 last:pb-0">
                <span
                  className="absolute -left-[27px] top-1.5 size-3 bg-gold sm:-left-[39px]"
                  style={{ animation: "pulse-node 2.4s ease-out infinite" }}
                />
                <span className="font-display text-3xl font-black text-gold-gradient">{t.year}</span>
                <h3 className="mt-1 font-display text-xl text-foreground">{t.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { BTS } from "@/data/series";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function BehindScenes() {
  return (
    <section id="bts" className="relative border-t border-border/40 py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHeading
          kicker="Behind the Scenes"
          title="How the Smoke Was Made"
          subtitle="The craft behind the campaign — sets, costume, locations and the director's uncompromising vision."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BTS.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.07}>
              <div className="glass rim-gold hover-lift group flex h-full flex-col p-7">
                <span className="font-display text-4xl font-black text-gold-gradient">{b.stat}</span>
                <div className="mt-4 h-px w-10 bg-gradient-to-r from-gold to-transparent transition-all duration-500 group-hover:w-full" />
                <h3 className="mt-4 font-display text-xl text-foreground">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

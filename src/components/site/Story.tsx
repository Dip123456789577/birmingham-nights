import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import storyImg from "@/assets/story.jpg";
import { TIMELINE } from "@/data/series";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

const PANELS = [
  {
    key: "hierarchy",
    label: "The Family",
    title: "A Hierarchy Written in Blood",
    body: "At the head sits Aldous, the strategist. Above even him, Mercy — the matriarch whose word is law. Below, the brothers Silas and Bram enforce that word with charm and fists, while Ada keeps the family's conscience and Isolde keeps its secrets.",
    points: ["Mercy Vane — Matriarch", "Aldous Vane — Chairman", "The Brothers — Enforcement", "Ada & Isolde — Eyes & Ears"],
  },
  {
    key: "business",
    label: "The Business",
    title: "From Betting Shop to Boardroom",
    body: "It begins with fixed odds and a stolen crate of guns. Within five years the Vanes control the canals, the racetracks and half the licences in Birmingham — laundering a criminal fortune into steel, spirits and respectable stone.",
    points: ["Racecourse protection", "Canal freight & smuggling", "Legitimate foundries", "Political leverage"],
  },
  {
    key: "city",
    label: "The City",
    title: "Birmingham, Forged in Smoke",
    body: "A thousand chimneys, a million secrets. Post-war Birmingham is a furnace of ambition where soldiers return to no work and every alley hides a fortune or a knife. The Vanes don't fight the city — they become it.",
    points: ["Post-war 1919–1924", "Industrial Black Country", "Canals of Digbeth", "The Anvil public house"],
  },
];

export function Story() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const panel = PANELS[active];

  return (
    <section id="story" className="relative border-t border-border/40 py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHeading
          kicker="The Story"
          title="Every Empire Begins in the Dark"
          subtitle="A saga of family, ambition and the price of power, set against the industrial roar of 1920s England."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div ref={ref} className="relative aspect-[4/5] overflow-hidden rim-gold sm:aspect-[5/6]">
              <motion.img
                style={{ y: imgY, scale: 1.15 }}
                src={storyImg}
                alt="A lantern-lit Birmingham canal at night"
                width={1280}
                height={1024}
                loading="lazy"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="label-caps text-gold">Digbeth · 1921</span>
                <p className="mt-2 font-display text-2xl text-foreground">
                  "The canals carry more than coal."
                </p>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-8">
            <Reveal>
              <p className="text-lg leading-relaxed text-foreground/85">
                They came home from a war that taught them how to kill and forgot to teach
                them how to live. So the Vanes did the only thing they knew — they took.
                A street. A trade. A city. And then something no one could take back: a name.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="leading-relaxed text-muted-foreground">
                <span className="text-gold">Historical backdrop.</span> In the years after
                the Great War, Britain's industrial heartland became a battleground of
                returning soldiers, striking workers and organised crime. It is here, amid
                the foundries and betting rings, that the Vane family carves its legend.
              </p>
            </Reveal>

            {/* interactive panels */}
            <div className="glass rim-gold p-1">
              <div className="flex">
                {PANELS.map((p, i) => (
                  <button
                    key={p.key}
                    onClick={() => setActive(i)}
                    className={cn(
                      "flex-1 px-3 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em] transition-colors",
                      active === i
                        ? "bg-gold/10 text-gold"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <motion.div
                key={panel.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="border-t border-border/60 p-6"
              >
                <h3 className="font-display text-xl text-foreground">{panel.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{panel.body}</p>
                <ul className="mt-5 grid grid-cols-2 gap-2">
                  {panel.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2 text-xs text-foreground/80">
                      <span className="size-1.5 shrink-0 bg-gold" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Timeline cards */}
        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass rim-gold group h-full p-5 transition-shadow hover:gold-glow"
              >
                <span className="font-display text-2xl font-black text-gold-gradient">{t.year}</span>
                <h4 className="mt-2 font-display text-base text-foreground">{t.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t.text}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Plus, Quote } from "lucide-react";
import { CHARACTERS, type Character } from "@/data/series";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

function Card({ c, onOpen }: { c: Character; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-py * 8}deg) rotateY(${px * 10}deg) translateY(-6px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  };

  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onClick={onOpen}
      className="group relative block w-full overflow-hidden text-left transition-transform duration-300 will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={c.image}
          alt={`${c.name}, played by ${c.actor}`}
          width={768}
          height={960}
          loading="lazy"
          className="size-full object-cover grayscale-[0.35] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ boxShadow: "inset 0 0 60px -10px rgba(233,193,118,0.5)" }} />
        <span className="absolute right-3 top-3 grid size-9 place-items-center border border-gold/50 bg-background/50 text-gold opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
          <Plus className="size-4" />
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <span className="label-caps text-[0.6rem] text-gold">{c.role}</span>
        <h3 className="mt-1 font-display text-2xl font-bold text-foreground">{c.name}</h3>
        <p className="text-sm text-muted-foreground">{c.actor}</p>
      </div>
    </button>
  );
}

export function Characters() {
  const [selected, setSelected] = useState<Character | null>(null);

  return (
    <section id="characters" className="relative border-t border-border/40 py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHeading
          kicker="The Family"
          title="Meet the Vanes"
          subtitle="Six souls bound by blood and business. Hover to feel them watching — click to learn what they're capable of."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CHARACTERS.map((c, i) => (
            <Reveal key={c.id} delay={(i % 3) * 0.08}>
              <Card c={c} onOpen={() => setSelected(c)} />
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-background/85 backdrop-blur-md" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass rim-gold relative z-10 grid max-h-[90vh] w-full max-w-4xl grid-cols-1 overflow-hidden md:grid-cols-[minmax(0,1fr)_1.2fr]"
            >
              <div className="relative hidden md:block">
                <img src={selected.image} alt={selected.name} className="size-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-2/40" />
              </div>
              <div className="relative overflow-y-auto p-8 sm:p-10">
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="absolute right-5 top-5 grid size-9 place-items-center border border-border text-gold transition-colors hover:border-gold"
                >
                  <X className="size-4" />
                </button>
                <span className="label-caps text-gold">{selected.role}</span>
                <h3 className="mt-2 font-display text-4xl font-bold text-foreground">{selected.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Portrayed by <span className="text-foreground">{selected.actor}</span>
                </p>
                <div className="mt-6 flex items-start gap-3 border-l-2 border-gold/60 pl-4">
                  <Quote className="mt-1 size-4 shrink-0 text-gold" />
                  <p className="font-display text-lg italic text-foreground/90">{selected.quote}</p>
                </div>
                <p className="mt-6 leading-relaxed text-muted-foreground">{selected.bio}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {selected.traits.map((t) => (
                    <span key={t} className="border border-bronze/60 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

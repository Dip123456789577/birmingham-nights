import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Film } from "lucide-react";
import { SEASONS } from "@/data/series";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function Seasons() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="seasons" className="relative border-t border-border/40 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          kicker="The Chapters"
          title="Seasons & Episodes"
          subtitle="Three chapters in the rise of a dynasty. Expand a season to walk through every episode."
        />

        <div className="mt-14 flex flex-col gap-4">
          {SEASONS.map((s, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={s.number} delay={i * 0.08}>
                <div className={cn("glass overflow-hidden transition-colors", isOpen && "rim-gold")}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-5 p-6 text-left"
                  >
                    <span className="font-display text-4xl font-black leading-none text-gold-gradient sm:text-6xl">
                      {String(s.number).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="label-caps text-[0.6rem] text-muted-foreground">
                        {s.year} · {s.episodes} Episodes
                      </span>
                      <h3 className="truncate font-display text-2xl font-bold text-foreground sm:text-3xl">
                        {s.title}
                      </h3>
                    </div>
                    <span
                      className={cn(
                        "grid size-10 shrink-0 place-items-center border border-border text-gold transition-transform duration-500",
                        isOpen && "rotate-180 border-gold",
                      )}
                    >
                      <ChevronDown className="size-5" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="border-t border-border/60 p-6">
                          <p className="mb-6 max-w-2xl leading-relaxed text-muted-foreground">
                            {s.synopsis}
                          </p>
                          <div className="grid gap-2">
                            {s.episodeList.map((ep) => (
                              <div
                                key={ep.no}
                                className="group flex items-center gap-4 border border-transparent bg-background/40 p-4 transition-colors hover:border-gold/40"
                              >
                                <span className="grid size-9 shrink-0 place-items-center border border-bronze/50 text-xs text-gold">
                                  {String(ep.no).padStart(2, "0")}
                                </span>
                                <div className="min-w-0 flex-1">
                                  <h4 className="font-display text-lg text-foreground">{ep.title}</h4>
                                  <p className="text-sm text-muted-foreground">{ep.summary}</p>
                                </div>
                                <Film className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

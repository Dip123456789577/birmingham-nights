import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { GALLERY } from "@/data/series";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % GALLERY.length)),
    [],
  );
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + GALLERY.length) % GALLERY.length)),
    [],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, close, next, prev]);

  return (
    <section id="gallery" className="relative border-t border-border/40 py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHeading
          kicker="The Gallery"
          title="Stills From the Smoke"
          subtitle="Posters, character stills and behind-the-scenes frames — every image a painting in gunmetal and gold."
        />

        <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {GALLERY.map((g, i) => (
            <Reveal key={i} delay={(i % 3) * 0.06}>
              <button
                onClick={() => setIndex(i)}
                className="group relative block w-full overflow-hidden break-inside-avoid rim-gold"
              >
                <img
                  src={g.src}
                  alt={g.caption}
                  width={g.w}
                  height={g.h}
                  loading="lazy"
                  className="w-full object-cover grayscale-[0.3] transition-all duration-700 group-hover:scale-[1.06] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="flex w-full items-center justify-between p-5">
                    <span className="font-display text-lg text-foreground">{g.caption}</span>
                    <ZoomIn className="size-5 translate-y-2 text-gold opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" />
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            className="fixed inset-0 z-[85] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-background/92 backdrop-blur-lg" onClick={close} />
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 grid size-11 place-items-center border border-border text-gold transition-colors hover:border-gold"
            >
              <X className="size-5" />
            </button>
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-4 z-10 grid size-11 place-items-center border border-border text-gold transition-colors hover:border-gold sm:left-8"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-4 z-10 grid size-11 place-items-center border border-border text-gold transition-colors hover:border-gold sm:right-8"
            >
              <ChevronRight className="size-5" />
            </button>

            <motion.figure
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 max-h-[85vh] max-w-5xl"
            >
              <img
                src={GALLERY[index].src}
                alt={GALLERY[index].caption}
                className="max-h-[80vh] w-auto rim-gold object-contain"
              />
              <figcaption className="mt-4 text-center">
                <span className="label-caps text-gold">
                  {index + 1} / {GALLERY.length}
                </span>
                <p className="mt-1 font-display text-xl text-foreground">
                  {GALLERY[index].caption}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

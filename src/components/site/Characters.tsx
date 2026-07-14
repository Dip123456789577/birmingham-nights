import { useRef, useState, useEffect, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Plus, Quote, Play, Pause } from "lucide-react";
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
        
        {/* Demo Reel Button */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
          <div className="grid size-12 place-items-center rounded-full border border-gold/80 bg-background/70 text-gold backdrop-blur-md hover:scale-110 hover:bg-gold hover:text-background transition-all duration-300">
            <Play className="size-5 ml-0.5 fill-current" />
          </div>
          <span className="label-caps text-[0.6rem] text-gold tracking-widest uppercase">Demo Reel</span>
        </div>
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
  const [demoReelPlaying, setDemoReelPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleDemoReel = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setDemoReelPlaying(true);
    } else {
      video.pause();
      setDemoReelPlaying(false);
    }
  };

  useEffect(() => {
    if (selected) {
      setDemoReelPlaying(false);
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.pause();
      }
    }
  }, [selected]);

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
            <div
              className="absolute inset-0 bg-background/85 backdrop-blur-md"
              onClick={() => {
                setSelected(null);
                setDemoReelPlaying(false);
              }}
            />
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
                  onClick={() => {
                    setSelected(null);
                    setDemoReelPlaying(false);
                  }}
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

                {/* Character Demo Reel */}
                <div className="mt-6">
                  <h4 className="font-display text-lg font-semibold text-gold mb-3">Demo Reel</h4>
                  <div className="relative aspect-video overflow-hidden rounded-lg rim-gold gold-glow bg-gradient-to-br from-background to-background/80">
                    <video
                      key={selected.id}
                      ref={videoRef}
                      poster={selected.image}
                      className="size-full object-cover transition-all duration-700"
                      playsInline
                      loop
                      onClick={toggleDemoReel}
                      onPlay={() => setDemoReelPlaying(true)}
                      onPause={() => setDemoReelPlaying(false)}
                    >
                      <source src={selected.demoReelUrl} type="video/mp4" />
                    </video>

                    {!demoReelPlaying && (
                      <div className="absolute inset-0">
                        {/* Animated overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/40" />

                        {/* Animated text */}
                        <motion.div
                          className="absolute bottom-6 left-6 right-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8 }}
                        >
                          <motion.p
                            className="font-display text-xl text-foreground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                          >
                            {selected.name}
                          </motion.p>
                          <motion.p
                            className="text-sm text-muted-foreground mt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                          >
                            {selected.quote}
                          </motion.p>
                        </motion.div>
                      </div>
                    )}

                    {/* Play/Pause button */}
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDemoReel();
                      }}
                      aria-label={demoReelPlaying ? "Pause demo reel" : "Play demo reel"}
                      className="absolute left-1/2 top-1/2 z-10 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold/70 bg-background/40 text-gold backdrop-blur-md transition-all duration-500 hover:scale-110 hover:bg-gold hover:text-primary-foreground"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: demoReelPlaying ? 0 : 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {demoReelPlaying ? (
                        <Pause className="size-8" />
                      ) : (
                        <Play className="ml-1 size-8 fill-current" />
                      )}
                    </motion.button>

                    {/* Film grain */}
                    <div
                      className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                      }}
                    />
                  </div>
                </div>

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

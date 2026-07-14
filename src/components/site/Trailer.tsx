import { useRef, useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { motion } from "motion/react";
import { Play, Pause } from "lucide-react";
import trailerPoster from "@/assets/trailer-poster.jpg";
import trailerVideo from "@/assets/trailer.mp4.asset.json";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export type TrailerHandle = { play: () => void };

export const Trailer = forwardRef<TrailerHandle>((_, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only render particles after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.scrollIntoView({ behavior: "smooth", block: "center" });
    v.play().catch(() => {
      // Ignore play errors (e.g., user interaction required)
    });
  };

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  };

  useImperativeHandle(ref, () => ({ play }));

  return (
    <section id="trailer" className="relative overflow-hidden border-t border-border/40 py-24 sm:py-32">
      {/* ambient blur glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-[60%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(233,193,118,0.35), transparent 70%)" }}
      />
      
      {/* floating particles for atmosphere */}
      {mounted && (
        <>
          <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gold/30 rounded-full"
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: `${100 + Math.random() * 20}%`,
                  opacity: 0
                }}
                animate={{
                  y: `${-20 - Math.random() * 20}%`,
                  opacity: [0, 0.6, 0]
                }}
                transition={{
                  duration: 6 + Math.random() * 8,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          {/* Dust particles for walking men */}
          <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`dust-${i}`}
                className="absolute bg-background/40 rounded-full"
                style={{
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`
                }}
                initial={{
                  x: `${30 + Math.random() * 40}%`,
                  y: `${70 + Math.random() * 15}%`,
                  opacity: 0
                }}
                animate={{
                  x: `${55 + Math.random() * 20}%`,
                  y: `${60 + Math.random() * 10}%`,
                  opacity: [0, 0.4, 0]
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>

          {/* Silhouettes of walking men */}
          <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={`silhouette-${i}`}
                className="absolute bottom-1/4"
                style={{
                  left: `${10 + i * 15}%`
                }}
                initial={{
                  x: "-100%",
                  opacity: 0
                }}
                animate={{
                  x: "200%",
                  opacity: [0, 0.3, 0]
                }}
                transition={{
                  duration: 12 + i * 1.5,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "linear"
                }}
              >
                <div
                  className="w-8 h-16 bg-background/70"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 60% 15%, 65% 15%, 65% 35%, 75% 35%, 75% 45%, 65% 45%, 65% 100%, 35% 100%, 35% 45%, 25% 45%, 25% 35%, 35% 35%, 35% 15%, 40% 15%)"
                  }}
                />
              </motion.div>
            ))}
          </div>
        </>
      )}

      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <SectionHeading
          kicker="Official Trailer"
          title="See the Legend in Motion"
          subtitle="A first look at the smoke, the swagger and the storm that made VANE & CO the most talked-about drama of the year."
        />

        <Reveal>
          <motion.div
            className="group relative mt-14 aspect-video overflow-hidden rim-gold gold-glow"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.5 }}
          >
            <video
              ref={videoRef}
              poster={trailerPoster}
              className="size-full object-cover transition-all duration-700"
              playsInline
              loop
              onClick={toggle}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            >
              <source src={trailerVideo.url} type="video/mp4" />
            </video>

            {!playing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent"
              />
            )}

            <motion.button
              onClick={toggle}
              aria-label={playing ? "Pause trailer" : "Play trailer"}
              className="absolute left-1/2 top-1/2 z-10 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold/70 bg-background/40 text-gold backdrop-blur-md transition-all duration-500 hover:scale-110 hover:bg-gold hover:text-primary-foreground sm:size-24"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: playing ? 0 : 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="absolute inset-0 rounded-full border border-gold/40"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
              <motion.span
                className="absolute inset-0 rounded-full border border-gold/30"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0, 0.3]
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.5
                }}
              />
              {playing ? (
                <Pause className="size-8" />
              ) : (
                <Play className="ml-1 size-8 fill-current" />
              )}
            </motion.button>

            <div className="pointer-events-none absolute bottom-5 left-6">
              <span className="label-caps text-[0.6rem] text-gold">Vane &amp; Co</span>
              <p className="font-display text-xl text-foreground">Official Trailer · 2024</p>
            </div>

            {/* film grain overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
});
Trailer.displayName = "Trailer";

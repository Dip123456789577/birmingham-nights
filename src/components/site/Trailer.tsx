import { useRef, useState, forwardRef, useImperativeHandle } from "react";
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

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play();
    setPlaying(true);
    v.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useImperativeHandle(ref, () => ({ play }));

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section id="trailer" className="relative overflow-hidden border-t border-border/40 py-24 sm:py-32">
      {/* ambient blur glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-[60%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(233,193,118,0.35), transparent 70%)" }}
      />
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <SectionHeading
          kicker="Official Trailer"
          title="See the Legend in Motion"
          subtitle="A first look at the smoke, the swagger and the storm that made VANE & CO the most talked-about drama of the year."
        />

        <Reveal>
          <div className="group relative mt-14 aspect-video overflow-hidden rim-gold gold-glow">
            <video
              ref={videoRef}
              poster={trailerPoster}
              className="size-full object-cover"
              playsInline
              loop
              onClick={toggle}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            >
              <source src={trailerVideo.url} type="video/mp4" />
            </video>

            {!playing && (
              <div className="pointer-events-none absolute inset-0 bg-background/30" />
            )}

            <button
              onClick={toggle}
              aria-label={playing ? "Pause trailer" : "Play trailer"}
              className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold/70 bg-background/40 text-gold backdrop-blur-md transition-all duration-500 hover:scale-110 hover:bg-gold hover:text-primary-foreground sm:size-24"
              style={{ opacity: playing ? 0 : 1 }}
            >
              <span
                className="absolute inset-0 rounded-full border border-gold/40"
                style={{ animation: "pulse-node 2.2s ease-out infinite" }}
              />
              {playing ? <Pause className="size-8" /> : <Play className="ml-1 size-8 fill-current" />}
            </button>

            <div className="pointer-events-none absolute bottom-5 left-6">
              <span className="label-caps text-[0.6rem] text-gold">Vane &amp; Co</span>
              <p className="font-display text-xl text-foreground">Official Trailer · 2024</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
});
Trailer.displayName = "Trailer";

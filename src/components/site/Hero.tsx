import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Play, Users, ChevronsDown } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { MagneticButton } from "./MagneticButton";
import { Smoke, Particles } from "./Particles";
import { MusicToggle } from "./MusicToggle";

export function Hero({ onTrailer }: { onTrailer: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.24]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const goCharacters = () => {
    document.querySelector("#characters")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Smoke-filled 1920s Birmingham street at dusk"
          width={1920}
          height={1088}
          className="size-full object-cover"
        />
      </motion.div>

      {/* overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/40" />

      <Smoke />
      <Particles count={22} />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 1 }}
          className="label-caps text-gold"
        >
          By Order of the Vanes
        </motion.span>

        <h1 className="mt-6 font-display font-black leading-[0.92] tracking-tight">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="block text-silver-gradient text-5xl sm:text-7xl md:text-8xl"
          >
            VANE
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.55, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="block text-gold-gradient text-6xl sm:text-8xl md:text-[9rem]"
          >
            &amp; CO<span className="text-silver-gradient text-3xl sm:text-5xl md:text-6xl"> LTD</span>
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 1 }}
          className="mt-8 max-w-xl text-balance text-base leading-relaxed text-foreground/80 sm:text-lg"
        >
          In the smoke and gold of 1920s Birmingham, one family turns a back-street
          empire into a legend. Ambition is currency. Loyalty is armour. Blood is the
          only truth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <MagneticButton onClick={onTrailer} aria-label="Watch the trailer">
            <Play className="size-4 fill-current" /> Watch Trailer
          </MagneticButton>
          <MagneticButton variant="ghost" onClick={goCharacters} aria-label="Explore characters">
            <Users className="size-4" /> Explore the Family
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 1 }}
          className="mt-8"
        >
          <MusicToggle />
        </motion.div>
      </motion.div>

      <a
        href="#story"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector("#story")?.scrollIntoView({ behavior: "smooth" });
        }}
        aria-label="Scroll to story"
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="label-caps text-[0.55rem]">Scroll</span>
        <ChevronsDown className="size-5 text-gold" style={{ animation: "scroll-bob 1.8s ease-in-out infinite" }} />
      </a>
    </section>
  );
}

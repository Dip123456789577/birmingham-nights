import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";

import { Loader } from "@/components/site/Loader";
import { CustomCursor } from "@/components/site/CustomCursor";
import { FilmGrain } from "@/components/site/FilmGrain";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Story } from "@/components/site/Story";
import { Characters } from "@/components/site/Characters";
import { Seasons } from "@/components/site/Seasons";
import { Trailer, type TrailerHandle } from "@/components/site/Trailer";
import { Gallery } from "@/components/site/Gallery";
import { Ratings } from "@/components/site/Ratings";
import { Reviews } from "@/components/site/Reviews";
import { Awards, Timeline } from "@/components/site/AwardsTimeline";
import { BehindScenes } from "@/components/site/BehindScenes";
import { Soundtrack } from "@/components/site/Soundtrack";
import { FAQ } from "@/components/site/FAQ";
import { Newsletter } from "@/components/site/Newsletter";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const trailerRef = useRef<TrailerHandle>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  const playTrailer = () => {
    document.querySelector("#trailer")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => trailerRef.current?.play(), 700);
  };

  return (
    <div className="relative bg-background film-grain">
      <Loader />
      <CustomCursor />
      <FilmGrain />

      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[65] h-0.5 origin-left bg-gradient-to-r from-bronze via-gold to-gold-bright"
      />

      <Navbar />

      <main>
        <Hero onTrailer={playTrailer} />
        <Story />
        <Characters />
        <Seasons />
        <Trailer ref={trailerRef} />
        <Gallery />
        <Ratings />
        <Reviews />
        <Awards />
        <BehindScenes />
        <Soundtrack />
        <Timeline />
        <FAQ />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}

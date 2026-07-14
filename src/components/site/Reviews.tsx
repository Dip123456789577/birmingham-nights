import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Star, Quote, ChevronLeft, ChevronRight, User } from "lucide-react";
import { REVIEWS, TESTIMONIALS } from "@/data/series";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-1" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={i < n ? "size-4 fill-gold text-gold" : "size-4 text-border"}
        />
      ))}
    </div>
  );
}

export function Reviews() {
  const [i, setI] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const r = REVIEWS[i];

  const go = (dir: number) => {
    setExpanded(false);
    setI((p) => (p + dir + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section id="reviews" className="relative border-t border-border/40 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          kicker="Reviews"
          title="What the Critics Say"
          subtitle="Placeholder praise from critics and audiences alike."
        />

        <Reveal>
          <div className="glass rim-gold relative mt-14 p-8 sm:p-12">
            <Quote className="size-10 text-gold/40" />
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <p className="mt-4 font-display text-2xl leading-snug text-foreground sm:text-3xl">
                  {expanded ? r.full : `"${r.quote}"`}
                </p>
                <button
                  onClick={() => setExpanded((e) => !e)}
                  className="mt-4 text-xs uppercase tracking-[0.16em] text-gold underline-offset-4 hover:underline"
                >
                  {expanded ? "Show less" : "Read full review"}
                </button>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6">
                  <div>
                    <p className="font-display text-lg text-foreground">{r.author}</p>
                    <span className="label-caps text-[0.6rem] text-muted-foreground">{r.source}</span>
                  </div>
                  <Stars n={r.stars} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Previous review"
            className="grid size-11 place-items-center border border-border text-gold transition-colors hover:border-gold"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex gap-2">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setExpanded(false);
                  setI(idx);
                }}
                aria-label={`Go to review ${idx + 1}`}
                className={`h-1.5 transition-all ${idx === i ? "w-8 bg-gold" : "w-4 bg-border hover:bg-bronze"}`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next review"
            className="grid size-11 place-items-center border border-border text-gold transition-colors hover:border-gold"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* Audience testimonials */}
        <div className="mt-20">
          <Reveal>
            <div className="flex items-center gap-3">
              <User className="size-5 text-gold" />
              <h3 className="font-display text-2xl text-foreground">From the Audience</h3>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass rim-gold mt-8 p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="font-display text-xl italic leading-relaxed text-foreground/90">
                    "{TESTIMONIALS[testimonialIdx].quote}"
                  </p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    — {TESTIMONIALS[testimonialIdx].author},{" "}
                    <span className="text-gold">{TESTIMONIALS[testimonialIdx].location}</span>
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-5">
                <div className="flex gap-2">
                  {TESTIMONIALS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setTestimonialIdx(idx)}
                      aria-label={`Go to testimonial ${idx + 1}`}
                      className={`h-1.5 transition-all ${idx === testimonialIdx ? "w-6 bg-gold" : "w-3 bg-border hover:bg-bronze"}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setTestimonialIdx((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
                    }
                    aria-label="Previous testimonial"
                    className="grid size-9 place-items-center border border-border text-gold transition-colors hover:border-gold"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    onClick={() => setTestimonialIdx((p) => (p + 1) % TESTIMONIALS.length)}
                    aria-label="Next testimonial"
                    className="grid size-9 place-items-center border border-border text-gold transition-colors hover:border-gold"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

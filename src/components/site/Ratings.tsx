import { motion } from "motion/react";
import { RATINGS, RATING_DISTRIBUTION, RATING_SUMMARY } from "@/data/series";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { useCountUp } from "./useCountUp";

function Dial({ value, label, suffix, detail }: (typeof RATINGS)[number]) {
  const { value: count, ref } = useCountUp(value);
  const R = 52;
  const C = 2 * Math.PI * R;

  return (
    <div className="glass rim-gold hover-lift group flex flex-col items-center p-8 text-center">
      <div className="relative size-36">
        <svg viewBox="0 0 120 120" className="size-full -rotate-90">
          <circle cx="60" cy="60" r={R} fill="none" stroke="var(--border)" strokeWidth="4" />
          <motion.circle
            cx="60"
            cy="60"
            r={R}
            fill="none"
            stroke="url(#goldgrad)"
            strokeWidth="4"
            strokeLinecap="square"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            whileInView={{ strokeDashoffset: C - (C * value) / 100 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
          <defs>
            <linearGradient id="goldgrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffdea5" />
              <stop offset="100%" stopColor="#b8923f" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span ref={ref} className="font-display text-3xl font-bold text-gold-gradient">
            {count}
          </span>
          <span className="text-xs text-muted-foreground">{suffix}</span>
        </div>
      </div>
      <h3 className="mt-5 font-display text-xl text-foreground">{label}</h3>
      <span className="label-caps mt-1 text-[0.6rem] text-gold">{detail}</span>
    </div>
  );
}

function Distribution() {
  return (
    <div className="glass rim-gold flex flex-col justify-center p-8">
      <h3 className="label-caps text-gold">Rating Distribution</h3>
      <div className="mt-6 flex flex-col gap-3">
        {RATING_DISTRIBUTION.map((row) => (
          <div key={row.stars} className="flex items-center gap-3">
            <span className="w-8 text-right text-xs text-muted-foreground">{row.stars}★</span>
            <div className="relative h-2 flex-1 overflow-hidden bg-border/40">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-bronze to-gold"
                initial={{ width: 0 }}
                whileInView={{ width: `${row.percent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: (5 - row.stars) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <span className="w-10 text-right text-xs text-gold">{row.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Ratings() {
  return (
    <section id="ratings" className="relative border-t border-border/40 py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHeading
          kicker="The Verdict"
          title="Critically Adored"
          subtitle="Placeholder acclaim from across the industry — the numbers behind the noise."
        />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {RATINGS.map((r, i) => (
            <Reveal key={r.label} delay={i * 0.08}>
              <Dial {...r} />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_380px]">
          <Reveal>
            <div className="glass rim-gold p-8">
              <h3 className="label-caps text-gold">Review Summary</h3>
              <p className="mt-4 text-lg leading-relaxed text-foreground/85">{RATING_SUMMARY}</p>
              <div className="mt-6 flex flex-wrap gap-6 border-t border-border/60 pt-6">
                <div>
                  <span className="font-display text-3xl font-bold text-gold-gradient">4.8</span>
                  <p className="mt-1 text-xs text-muted-foreground">Average Score</p>
                </div>
                <div>
                  <span className="font-display text-3xl font-bold text-gold-gradient">12.4K</span>
                  <p className="mt-1 text-xs text-muted-foreground">Total Reviews</p>
                </div>
                <div>
                  <span className="font-display text-3xl font-bold text-gold-gradient">98%</span>
                  <p className="mt-1 text-xs text-muted-foreground">Recommend</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Distribution />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

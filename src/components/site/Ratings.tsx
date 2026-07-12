import { motion } from "motion/react";
import { RATINGS } from "@/data/series";
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
      </div>
    </section>
  );
}

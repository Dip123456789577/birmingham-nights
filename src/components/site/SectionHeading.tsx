import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "center",
  className,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {kicker && (
        <Reveal>
          <span className="label-caps flex items-center gap-3 text-gold">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-bronze" />
            {kicker}
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-bronze" />
          </span>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.2}>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

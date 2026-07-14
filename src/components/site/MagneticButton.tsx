import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type Ripple = { id: number; x: number; y: number };

type Props = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
  onClick?: () => void;
  href?: string;
  "aria-label"?: string;
};

export function MagneticButton({
  children,
  className,
  variant = "primary",
  onClick,
  href,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const spawnRipple = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const id = Date.now();
    const ripple = { id, x: e.clientX - rect.left, y: e.clientY - rect.top };
    setRipples((prev) => [...prev, ripple]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  };

  const handleClick = (e: MouseEvent) => {
    spawnRipple(e);
    onClick?.();
  };

  const base =
    "group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 label-caps transition-[transform,box-shadow] duration-300 will-change-transform overflow-hidden";
  const styles =
    variant === "primary"
      ? "bg-gold text-primary-foreground hover:gold-glow"
      : "border border-bronze text-gold hover:border-gold hover:bg-gold/5";

  const rippleLayer = (
    <>
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-white/30"
          style={{
            left: r.x,
            top: r.y,
            width: 8,
            height: 8,
            transform: "translate(-50%, -50%)",
            animation: "ripple-expand 0.6s ease-out forwards",
          }}
        />
      ))}
    </>
  );

  const inner = (
    <>
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      {rippleLayer}
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        onClick={spawnRipple}
        className={cn(base, styles, className)}
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={handleClick}
      className={cn(base, styles, className)}
      {...rest}
    >
      {inner}
    </button>
  );
}

import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

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

  const base =
    "group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 label-caps transition-[transform,box-shadow] duration-300 will-change-transform overflow-hidden";
  const styles =
    variant === "primary"
      ? "bg-gold text-primary-foreground hover:gold-glow"
      : "border border-bronze text-gold hover:border-gold hover:bg-gold/5";

  const inner = (
    <>
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
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
      onClick={onClick}
      className={cn(base, styles, className)}
      {...rest}
    >
      {inner}
    </button>
  );
}

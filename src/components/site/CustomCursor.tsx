import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let rx = 0;
    let ry = 0;
    let gx = 0;
    let gy = 0;
    let mx = 0;
    let my = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${mx}px, ${my}px)`;
      }
      const t = e.target as HTMLElement;
      const interactive = t.closest("a,button,[data-cursor]");
      if (ring.current) {
        ring.current.style.width = interactive ? "56px" : "34px";
        ring.current.style.height = interactive ? "56px" : "34px";
        ring.current.style.borderColor = interactive
          ? "rgba(233,193,118,0.9)"
          : "rgba(233,193,118,0.4)";
      }
      if (glow.current) {
        glow.current.style.opacity = interactive ? "0.55" : "0.25";
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      gx += (mx - gx) * 0.08;
      gy += (my - gy) * 0.08;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      if (glow.current) glow.current.style.transform = `translate(${gx}px, ${gy}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={glow}
        className="pointer-events-none fixed left-0 top-0 z-[89] h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 transition-opacity duration-300"
        style={{
          marginLeft: "-64px",
          marginTop: "-64px",
          background: "radial-gradient(circle, rgba(233,193,118,0.35) 0%, transparent 70%)",
        }}
      />
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
        style={{ marginLeft: "-3px", marginTop: "-3px" }}
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-[34px] w-[34px] rounded-full border transition-[width,height,border-color] duration-300"
        style={{ marginLeft: "-17px", marginTop: "-17px", borderColor: "rgba(233,193,118,0.4)" }}
      />
    </>
  );
}

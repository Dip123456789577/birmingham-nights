import { useEffect, useMemo, useState } from "react";

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function Particles({ count = 26 }: { count?: number }) {
  const mounted = useMounted();
  const dust = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        left: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 18,
        duration: 16 + Math.random() * 18,
        opacity: 0.15 + Math.random() * 0.35,
      })),
    [count],
  );

  if (!mounted) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dust.map((d, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-gold"
          style={{
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            filter: "blur(0.4px)",
            boxShadow: "0 0 6px rgba(233,193,118,0.6)",
            animation: `float-up ${d.duration}s linear ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function Smoke() {
  const mounted = useMounted();
  const puffs = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => ({
        left: 8 + i * 16 + Math.random() * 6,
        delay: Math.random() * 8,
        duration: 10 + Math.random() * 8,
        size: 220 + Math.random() * 180,
      })),
    [],
  );
  if (!mounted) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {puffs.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-[-120px] rounded-full"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background:
              "radial-gradient(circle, rgba(154,143,128,0.20) 0%, rgba(154,143,128,0) 70%)",
            animation: `smoke-drift ${p.duration}s ease-in ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

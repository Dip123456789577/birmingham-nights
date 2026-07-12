import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Generates a soft ambient drone with the Web Audio API — no asset needed.
 */
export function MusicToggle({ className }: { className?: string }) {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ gain: GainNode; oscs: OscillatorNode[] } | null>(null);

  const start = () => {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new Ctx();
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 2);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 480;
    filter.connect(master);
    master.connect(ctx.destination);

    const freqs = [55, 82.4, 110, 164.8];
    const oscs = freqs.map((f, i) => {
      const o = ctx.createOscillator();
      o.type = i % 2 === 0 ? "sine" : "triangle";
      o.frequency.value = f;
      o.detune.value = (Math.random() - 0.5) * 8;
      const g = ctx.createGain();
      g.gain.value = 0.5 / freqs.length;
      o.connect(g);
      g.connect(filter);
      o.start();
      return o;
    });

    ctxRef.current = ctx;
    nodesRef.current = { gain: master, oscs };
  };

  const stop = () => {
    const ctx = ctxRef.current;
    const nodes = nodesRef.current;
    if (!ctx || !nodes) return;
    nodes.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
    setTimeout(() => {
      nodes.oscs.forEach((o) => o.stop());
      ctx.close();
      ctxRef.current = null;
      nodesRef.current = null;
    }, 700);
  };

  const toggle = () => {
    if (on) stop();
    else start();
    setOn(!on);
  };

  return (
    <button
      onClick={toggle}
      aria-label={on ? "Mute ambient sound" : "Play ambient sound"}
      className={cn(
        "group inline-flex items-center gap-2.5 border border-border bg-background/40 px-4 py-2.5 backdrop-blur-md transition-colors hover:border-gold",
        className,
      )}
    >
      {on ? (
        <Volume2 className="size-4 text-gold" />
      ) : (
        <VolumeX className="size-4 text-muted-foreground group-hover:text-gold" />
      )}
      <span className="label-caps text-[0.6rem] text-muted-foreground group-hover:text-foreground">
        {on ? "Ambience On" : "Ambience"}
      </span>
      {on && (
        <span className="flex items-end gap-0.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-0.5 bg-gold"
              style={{ height: 10, animation: `eq-bar 0.9s ease-in-out ${i * 0.15}s infinite` }}
            />
          ))}
        </span>
      )}
    </button>
  );
}

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Disc3 } from "lucide-react";
import { TRACKS } from "@/data/series";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

function Waveform({ active }: { active: boolean }) {
  return (
    <div className="flex h-8 items-end gap-0.5" aria-hidden>
      {Array.from({ length: 28 }).map((_, i) => (
        <span
          key={i}
          className={cn("w-1", active ? "bg-gold" : "bg-border")}
          style={
            active
              ? {
                  height: "100%",
                  animation: `eq-bar ${0.6 + (i % 5) * 0.12}s ease-in-out ${i * 0.03}s infinite`,
                }
              : { height: `${20 + ((i * 37) % 70)}%` }
          }
        />
      ))}
    </div>
  );
}

export function Soundtrack() {
  const [current, setCurrent] = useState<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodesRef = useRef<GainNode[]>([]);

  // Track frequencies for each track
  const trackFrequencies = [
    [55, 82.4, 110, 164.8],
    [65.4, 98, 130.8, 196],
    [73.4, 110, 146.8, 220],
    [82.4, 123.5, 164.8, 246.9],
    [98, 146.8, 196, 293.7],
  ];

  const startTrack = (trackIndex: number) => {
    if (!audioCtxRef.current) {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new Ctx();
    }
    const ctx = audioCtxRef.current;
    const frequencies = trackFrequencies[trackIndex % trackFrequencies.length];

    // Stop previous track
    stopTrack();

    // Create oscillators for current track
    const newOscillators: OscillatorNode[] = [];
    const newGainNodes: GainNode[] = [];
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 0 ? "sawtooth" : i === 1 ? "square" : i === 2 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08 / frequencies.length, ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      newOscillators.push(osc);
      newGainNodes.push(gain);
    });

    oscillatorsRef.current = newOscillators;
    gainNodesRef.current = newGainNodes;
  };

  const stopTrack = () => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    gainNodesRef.current.forEach((gain) => {
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
    });
    setTimeout(() => {
      oscillatorsRef.current.forEach((osc) => osc.stop());
      oscillatorsRef.current = [];
      gainNodesRef.current = [];
    }, 400);
  };

  useEffect(() => {
    if (current !== null) {
      startTrack(current);
    } else {
      stopTrack();
    }
    return () => stopTrack();
  }, [current]);

  return (
    <section id="soundtrack" className="relative overflow-hidden border-t border-border/40 py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHeading
          kicker="The Soundtrack"
          title="Sound of the Smoke"
          subtitle="A thunderous score where sweeping strings collide with modern percussion. Placeholder playlist below."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[380px_1fr] lg:items-center">
          <Reveal>
            <div className="relative mx-auto flex aspect-square max-w-[340px] items-center justify-center">
              <div
                className="absolute inset-0 rounded-full opacity-40 blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(233,193,118,0.4), transparent 70%)" }}
              />
              <div
                className="relative flex size-full items-center justify-center rounded-full border border-bronze/40 bg-gradient-to-br from-surface-3 to-background"
                style={{ animation: current !== null ? "spin-slow 8s linear infinite" : "none" }}
              >
                {[0.86, 0.68, 0.5].map((s) => (
                  <span
                    key={s}
                    className="absolute rounded-full border border-white/5"
                    style={{ width: `${s * 100}%`, height: `${s * 100}%` }}
                  />
                ))}
                <div className="flex size-[34%] items-center justify-center rounded-full bg-gold-gradient">
                  <Disc3 className="size-8 text-background" />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass rim-gold divide-y divide-border/50">
              {TRACKS.map((t, i) => {
                const isActive = current === i;
                return (
                  <button
                    key={t.title}
                    onClick={() => setCurrent(isActive ? null : i)}
                    className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-gold/5"
                  >
                    <span
                      className={cn(
                        "grid size-10 shrink-0 place-items-center border transition-colors",
                        isActive ? "border-gold text-gold" : "border-border text-muted-foreground",
                      )}
                    >
                      {isActive ? <Pause className="size-4" /> : <Play className="ml-0.5 size-4 fill-current" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={cn("truncate font-display text-lg", isActive ? "text-gold" : "text-foreground")}>
                        {t.title}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">{t.artist}</p>
                    </div>
                    <div className="hidden w-40 sm:block">
                      <Waveform active={isActive} />
                    </div>
                    <span className="w-10 text-right text-xs text-muted-foreground">{t.duration}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

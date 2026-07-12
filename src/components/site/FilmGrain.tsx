export function FilmGrain() {
  return (
    <>
      {/* animated film grain */}
      <div
        aria-hidden
        className="film-grain-layer pointer-events-none fixed inset-0 z-[60] opacity-[0.07] mix-blend-overlay"
      />
      {/* vignette */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[59]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </>
  );
}

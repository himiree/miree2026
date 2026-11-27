"use client";

// Muted, looping background video. React doesn't render the `muted` attribute,
// so browsers may refuse to autoplay; setting it on the element fixes that.
export default function AutoplayVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
  return (
    <video
      ref={(v) => {
        if (!v) return;
        v.muted = true;
        v.play().catch(() => {});
      }}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      aria-hidden
      className={className}
    />
  );
}

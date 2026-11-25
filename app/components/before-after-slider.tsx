"use client";
import { useRef, useState } from "react";

// Drag slider comparing two screenshots (Figma: "Drag slider · before/after"),
// framed like a browser window.
// Pass `before` / `after` image paths; until then each side shows a grey placeholder.
export default function BeforeAfterSlider({
  before,
  after,
  beforeAlt = "Before",
  afterAlt = "After",
}: {
  before?: string;
  after?: string;
  beforeAlt?: string;
  afterAlt?: string;
}) {
  const [pos, setPos] = useState(50); // % from the left
  const box = useRef<HTMLDivElement>(null);

  const moveTo = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    moveTo(e.clientX);
  };

  const side = (src: string | undefined, alt: string) =>
    src ? (
      <img src={src} alt={alt} draggable={false} className="absolute inset-0 w-full h-full object-cover object-top" />
    ) : (
      <div className="absolute inset-0 bg-[#d9d9d9]" />
    );

  return (
    <div className="w-full rounded-[20px] overflow-hidden border border-[#e6e9ed] bg-[#0e0e0e] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-[10px] h-[44px] px-[18px] bg-[#1b1b1c] border-b border-black/40" aria-hidden>
        {[0, 1, 2].map((k) => (
          <i
            key={k}
            className="size-[13px] rounded-full bg-[#4a4b4f]"
          />
        ))}
      </div>
    <div
      ref={box}
      onPointerDown={onPointerDown}
      onPointerMove={(e) => e.buttons === 1 && moveTo(e.clientX)}
      className="relative w-full aspect-[2000/1104] overflow-hidden bg-[#121217] select-none touch-pan-y cursor-ew-resize"
    >
      {side(after, afterAlt)}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {side(before, beforeAlt)}
      </div>

      <div className="absolute top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white" style={{ left: `${pos}%` }} />
      <button
        type="button"
        role="slider"
        aria-label="Compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
          if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
        }}
        className="absolute top-1/2 size-[44px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0px_4px_14px_rgba(0,0,0,0.25)] flex items-center justify-center text-[#181818]"
        style={{ left: `${pos}%` }}
      >
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden>
          <path d="M6 1L1 6l5 5M14 1l5 5-5 5M1 6h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-[10px] py-1 text-[12px] font-semibold uppercase text-white">Before</span>
      <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-[10px] py-1 text-[12px] font-semibold uppercase text-white">After</span>
    </div>
    </div>
  );
}

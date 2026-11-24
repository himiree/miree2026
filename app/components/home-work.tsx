"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { heroTransition } from "../utils/hero-transition";
import { homeWork } from "../data/home-work";

const titleClass =
  "block text-[28px] font-bold leading-[28px] tracking-[-0.5px] text-balance transition-colors duration-300 [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]";

// Hero media on the left, project titles on the right. Hovering (or focusing)
// a title crossfades the media to that project and plays its video, if any.
export default function HomeWork({ label }: { label: string }) {
  const [active, setActive] = useState(0);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const mediaRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Open a case study by flying the thumbnail straight into its hero
  // (the hero uses the same image, so the hand-off is invisible).
  const open = (e: React.MouseEvent, i: number) => {
    const w = homeWork[i];
    if (!w.href || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (!mediaRef.current) return;
    e.preventDefault();
    if (i !== active) setActive(i);
    heroTransition({
      router,
      href: w.href,
      src: w.image,
      from: mediaRef.current,
      direct: true,
      // Case-study hero: full width at the top, 78svh tall (min 420px) — see case-study-hero.tsx
      to: () => ({ top: 0, left: 0, width: window.innerWidth, height: Math.max(420, window.innerHeight * 0.78) }),
    });
  };

  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active]);

  const current = homeWork[active];

  const media = (
    <div ref={mediaRef} className="group/media relative w-full aspect-[682/387] rounded-[24px] overflow-hidden bg-[#1a1a1a]">
      {homeWork.map((w, i) => (
        <div
          key={w.title}
          aria-hidden={i !== active}
          className={`absolute inset-0 transition-opacity duration-500 ease-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          {w.video ? (
            <video
              ref={(el) => {
                videos.current[i] = el;
              }}
              src={w.video}
              poster={w.image}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <img src={w.image} alt={i === active ? w.title : ""} className="absolute inset-0 w-full h-full object-cover" />
          )}
        </div>
      ))}
      {current.note && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/media:opacity-100 transition-opacity duration-200">
          <span className="bg-white/90 backdrop-blur-sm text-[#181818] text-[13px] font-medium tracking-[-0.2px] px-4 py-2 rounded-full shadow-[0px_4px_16px_rgba(0,0,0,0.12)]">
            {current.note}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 min-[900px]:grid-cols-3 gap-8 w-full">
      <div className="min-[900px]:col-span-2">
        {current.href ? (
          <Link href={current.href} aria-label={current.title} onClick={(e) => open(e, active)} className="block">
            {media}
          </Link>
        ) : (
          media
        )}
      </div>

      <div className="flex flex-col gap-10 items-start justify-center">
        <p className="text-[14px] font-medium leading-[28px] tracking-[-0.2px] text-[#181818] text-pretty [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
          {label}
        </p>
        <div className="flex flex-col gap-6 items-start w-full">
        {homeWork.map((w, i) => {
          const color = i === active ? "text-[#181818]" : "text-[#afb9c6]";
          const select = () => setActive(i);
          return w.href ? (
            <Link
              key={w.title}
              href={w.href}
              onPointerEnter={select}
              onFocus={select}
              onClick={(e) => open(e, i)}
              className={`${titleClass} ${color}`}
            >
              {w.title}
            </Link>
          ) : (
            <button
              key={w.title}
              type="button"
              onPointerEnter={select}
              onFocus={select}
              onClick={select}
              title={w.note}
              className={`${titleClass} ${color} text-left cursor-default`}
            >
              {w.title}
            </button>
          );
        })}
        </div>
      </div>
    </div>
  );
}

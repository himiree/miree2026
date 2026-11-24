"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { homeWork } from "../data/home-work";

const titleClass =
  "block text-[24px] font-bold leading-[28px] tracking-[-0.5px] text-balance transition-colors duration-300 [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]";

// Hero media on the left, project titles on the right. Hovering (or focusing)
// a title crossfades the media to that project and plays its video, if any.
export default function HomeWork({ label }: { label: string }) {
  const [active, setActive] = useState(0);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);

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
    <div className="group/media relative w-full aspect-[682/387] rounded-[24px] overflow-hidden bg-[#1a1a1a]">
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
          <Link href={current.href} aria-label={current.title} className="block">
            {media}
          </Link>
        ) : (
          media
        )}
      </div>

      <div className="flex flex-col gap-6 items-start justify-center">
        <p className="text-[14px] font-medium leading-[28px] tracking-[-0.2px] text-[#181818] text-pretty [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
          {label}
        </p>
        {homeWork.map((w, i) => {
          const color = i === active ? "text-[#181818]" : "text-[#afb9c6]";
          const select = () => setActive(i);
          return w.href ? (
            <Link
              key={w.title}
              href={w.href}
              onPointerEnter={select}
              onFocus={select}
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
  );
}

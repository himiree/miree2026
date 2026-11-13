"use client";
import Link from "next/link";
import type { Project } from "../data/projects";

export default function ProjectCard({ slug, title, subtitle, bg, image, hoverBubble, disabled }: Project) {
  const inner = (
    <div className="flex flex-col gap-[12px]">
      <div
        className={`aspect-[5/4] w-full rounded-[16px] overflow-hidden relative transition-opacity duration-300 ${!disabled ? "group-hover:opacity-85" : ""}`}
        style={{ backgroundColor: image ? undefined : bg }}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: bg }} />
        )}
        {hoverBubble && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="bg-white/90 backdrop-blur-sm text-[#181818] text-[13px] font-medium tracking-[-0.2px] px-4 py-2 rounded-full shadow-[0px_4px_16px_rgba(0,0,0,0.12)]">
              {hoverBubble}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-[4px]">
        <p className="text-[14px] font-semibold leading-[20px] tracking-[-0.2px] text-[#181818]">
          {title}
        </p>
        <p className="text-[13px] leading-[18px] tracking-[-0.2px] text-[#738395]">
          {subtitle}
        </p>
      </div>
    </div>
  );

  if (disabled) {
    return <div className="group block cursor-default">{inner}</div>;
  }

  return (
    <Link href={`/work/${slug}`} className="group block">
      {inner}
    </Link>
  );
}

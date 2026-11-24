"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getNextCaseStudy } from "../data/case-studies";
import { heroTransition } from "../utils/hero-transition";

export default function NextProject({ current }: { current: string }) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const next = getNextCaseStudy(current);

  useEffect(() => {
    if (next) router.prefetch(next.href);
  }, [next, router]);

  if (!next) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Let cmd/ctrl/shift-click open in a new tab as usual
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (!cardRef.current) return;
    e.preventDefault();
    heroTransition({ router, href: next.href, src: next.image, from: cardRef.current });
  };

  return (
    <section className="px-4 sm:px-6 max-w-[1200px] mx-auto pt-16 pb-20 border-t border-black/[0.07]">
      <a
        href={next.href}
        onClick={handleClick}
        aria-label={`Next project: ${next.title}`}
        className="group block"
      >
        <div className="flex items-end justify-between gap-6 mb-8">
          <div className="flex flex-col gap-3">
            <p className="text-[12px] text-[#9aa5b1] tracking-[0.4px] uppercase">Next project</p>
            <h2 className="text-[28px] sm:text-[40px] font-bold leading-[1.1] tracking-[-1px] text-[#181818]">
              {next.title}
            </h2>
            <p className="text-[13px] text-[#576779] tracking-[-0.1px]">{next.meta}</p>
          </div>
          <span
            aria-hidden
            className="shrink-0 w-11 h-11 rounded-full border border-black/[0.1] flex items-center justify-center text-[#181818] transition-all duration-300 group-hover:bg-[#181818] group-hover:text-white group-hover:border-[#181818]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        <div
          ref={cardRef}
          className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-[20px] overflow-hidden bg-[#1a1a1a]"
        >
          <img
            src={next.image}
            alt=""
            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
        </div>
      </a>
    </section>
  );
}

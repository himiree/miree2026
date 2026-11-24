"use client";
import { Fragment, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getNextCaseStudy } from "../data/case-studies";
import {
  COMMIT_THRESHOLD,
  heroTransition,
  prefersReducedMotion,
  startHeroDrag,
  type HeroDrag,
} from "../utils/hero-transition";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const CLICK_SLOP = 6; // px of movement before a press becomes a drag
const WHEEL_ARM_GAP_MS = 250; // a fresh scroll gesture must start once the page is already at the bottom
const WHEEL_COMMIT = 0.45; // scrolling needs a bit more intent than dragging

// "Next project" section (Figma: 260808_aumatis › Next project).
// Click the thumbnail, drag it upward, or keep scrolling past the end of the
// page: the thumbnail grows into full screen and becomes the next page's hero.
export default function NextProject({ current }: { current: string }) {
  const router = useRouter();
  const mediaRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HeroDrag | null>(null);
  const suppressClick = useRef(false);
  const next = getNextCaseStudy(current);

  useEffect(() => {
    if (next) router.prefetch(next.href);
  }, [next, router]);

  // Gesture helpers shared by wheel, touch and mouse drag
  const ensureDrag = () => {
    if (dragRef.current) return dragRef.current;
    if (!next || !mediaRef.current || prefersReducedMotion()) return null;
    dragRef.current = startHeroDrag({ router, href: next.href, src: next.image, from: mediaRef.current });
    return dragRef.current;
  };
  const release = (threshold = COMMIT_THRESHOLD) => {
    const d = dragRef.current;
    if (!d) return;
    dragRef.current = null;
    if (d.progress >= threshold) d.commit();
    else d.cancel();
  };
  const gestureRef = useRef({ ensureDrag, release });
  useEffect(() => {
    gestureRef.current = { ensureDrag, release };
  });

  // Scroll (wheel / trackpad) or touch-drag past the end of the page
  useEffect(() => {
    if (!next) return;
    let idle: ReturnType<typeof setTimeout> | undefined;
    let touchY: number | null = null;
    let armed = false;
    let lastWheel = 0;

    const atBottom = () =>
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    const mediaInView = () => {
      const el = mediaRef.current;
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };

    const onWheel = (e: WheelEvent) => {
      const { ensureDrag, release } = gestureRef.current;
      const now = performance.now();
      const gap = now - lastWheel;
      lastWheel = now;
      if (!dragRef.current) {
        if (e.deltaY <= 0 || !atBottom() || !mediaInView()) {
          armed = false;
          return;
        }
        // Ignore the tail of the scroll that brought us here (incl. trackpad momentum)
        if (!armed) {
          if (gap < WHEEL_ARM_GAP_MS) return;
          armed = true;
        }
      }
      const d = ensureDrag();
      if (!d) return;
      e.preventDefault();
      d.setProgress(clamp01(d.progress + e.deltaY / (window.innerHeight * 1.2)));
      clearTimeout(idle);
      if (d.progress >= 1) release(WHEEL_COMMIT);
      else idle = setTimeout(() => release(WHEEL_COMMIT), 180);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchY = atBottom() && mediaInView() ? e.touches[0].clientY : null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchY === null) return;
      const dy = touchY - e.touches[0].clientY; // finger moving up = positive
      if (dy <= 0 && !dragRef.current) return;
      const d = gestureRef.current.ensureDrag();
      if (!d) return;
      if (e.cancelable) e.preventDefault();
      d.setProgress(clamp01(dy / (window.innerHeight * 0.6)));
    };
    const onTouchEnd = () => {
      touchY = null;
      gestureRef.current.release();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);
    return () => {
      clearTimeout(idle);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [next]);

  if (!next) return null;

  // Mouse: press the thumbnail and drag it upward
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const startY = e.clientY;
    let dragging = false;
    suppressClick.current = false;

    const onMove = (ev: PointerEvent) => {
      const dy = startY - ev.clientY;
      if (!dragging && Math.abs(dy) < CLICK_SLOP) return;
      dragging = true;
      suppressClick.current = true;
      const d = ensureDrag();
      d?.setProgress(clamp01(dy / (window.innerHeight * 0.5)));
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      if (dragging) release();
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (suppressClick.current) {
      e.preventDefault();
      suppressClick.current = false;
      return;
    }
    // Let cmd/ctrl/shift-click open in a new tab as usual
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (!mediaRef.current) return;
    e.preventDefault();
    heroTransition({ router, href: next.href, src: next.image, from: mediaRef.current });
  };

  return (
    <section className="flex flex-col items-center justify-center px-4 sm:px-6 pt-16 pb-16">
      <a
        href={next.href}
        onClick={onClick}
        onDragStart={(e) => e.preventDefault()}
        aria-label={`Next project: ${next.title}`}
        className="group flex flex-col items-center gap-[34px] w-full select-none"
      >
        <p className="text-[14px] leading-[19.2px] tracking-[-0.56px] text-[#181818]">Next project</p>

        <div
          ref={mediaRef}
          onPointerDown={onPointerDown}
          className="relative w-full max-w-[400px] aspect-[2/1] overflow-hidden bg-[#d9d9d9] cursor-grab active:cursor-grabbing"
        >
          <img
            src={next.image}
            alt=""
            draggable={false}
            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-[12px] font-medium leading-[16px] tracking-[-0.56px] text-[#181818] [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
            {next.title}
          </p>
          <div className="flex items-center justify-center gap-2">
            {next.tags.map((tag, i) => (
              <Fragment key={tag}>
                {i > 0 && <span aria-hidden className="size-[2px] rounded-full bg-[#1271C4]" />}
                <p className="text-[12px] leading-[19.2px] tracking-[-0.56px] text-[#474b4f]">{tag}</p>
              </Fragment>
            ))}
          </div>
        </div>
      </a>
    </section>
  );
}

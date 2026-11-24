"use client";
import { Fragment, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getNextCaseStudy } from "../data/case-studies";
import {
  heroTransition,
  prefersReducedMotion,
  startHeroDrag,
  type HeroDrag,
} from "../utils/hero-transition";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const CLICK_SLOP = 6; // px of movement before a press becomes a drag
const WHEEL_ARM_GAP_MS = 250; // a fresh scroll gesture must start once the page is already at the bottom
// How far you have to scroll past the end for the thumbnail to fill the screen,
// in viewport heights. ~2.5 trackpad flicks / mouse-wheel spins.
const WHEEL_DISTANCE_VH = 2.5;
const TOUCH_DISTANCE_VH = 1.5; // ~2.5 swipes on a phone
const WHEEL_SMOOTHING = 0.14; // per-frame easing of the thumbnail toward the scrolled amount
const CANCEL_BELOW = 0.02; // scrolled all the way back = cancel

// "Next project" section (Figma: 260808_aumatis › Next project).
// Click the thumbnail, drag it upward, or keep scrolling past the end of the
// page (~2.5 scrolls): the thumbnail grows into full screen and becomes the
// next page's hero.
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
  // End of a gesture: carry on into the next project, unless the thumbnail
  // was brought all the way back to its original size.
  const release = () => {
    const d = dragRef.current;
    if (!d) return;
    dragRef.current = null;
    if (d.progress > CANCEL_BELOW) d.commit();
    else d.cancel();
  };
  const gestureRef = useRef({ ensureDrag, release });
  useEffect(() => {
    gestureRef.current = { ensureDrag, release };
  });

  // Scroll (wheel / trackpad) or swipe past the end of the page. The thumbnail
  // grows with the distance scrolled and simply holds its size when the user
  // pauses; reaching full screen carries on into the next project, scrolling
  // all the way back up puts it back in place.
  useEffect(() => {
    if (!next) return;
    let armed = false;
    let lastWheel = 0;
    let target = 0; // scrolled amount (0–1); the thumbnail eases toward it every frame
    let raf = 0;
    let touchY: number | null = null;
    let touchBase = 0;

    const atBottom = () =>
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    const mediaInView = () => {
      const el = mediaRef.current;
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };

    const follow = () => {
      const d = dragRef.current;
      if (!d) {
        raf = 0;
        return;
      }
      const p = d.progress + (target - d.progress) * WHEEL_SMOOTHING;
      d.setProgress(Math.abs(target - p) < 0.001 ? target : p);
      const done = (target >= 1 && d.progress > 0.97) || (target <= 0 && d.progress < 0.005);
      if (done) {
        raf = 0;
        gestureRef.current.release();
        return;
      }
      raf = requestAnimationFrame(follow);
    };
    const moveTo = (t: number) => {
      target = clamp01(t);
      if (!raf) raf = requestAnimationFrame(follow);
    };

    const onWheel = (e: WheelEvent) => {
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
        target = 0;
      }
      if (!gestureRef.current.ensureDrag()) return;
      e.preventDefault();
      moveTo(target + e.deltaY / (window.innerHeight * WHEEL_DISTANCE_VH));
    };

    const onTouchStart = (e: TouchEvent) => {
      const canStart = dragRef.current || (atBottom() && mediaInView());
      touchY = canStart ? e.touches[0].clientY : null;
      touchBase = dragRef.current ? target : 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchY === null) return;
      const dy = touchY - e.touches[0].clientY; // finger moving up = positive
      if (dy <= 0 && !dragRef.current) return;
      if (!gestureRef.current.ensureDrag()) return;
      if (e.cancelable) e.preventDefault();
      moveTo(touchBase + dy / (window.innerHeight * TOUCH_DISTANCE_VH));
    };
    const onTouchEnd = () => {
      touchY = null;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);
    return () => {
      cancelAnimationFrame(raf);
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

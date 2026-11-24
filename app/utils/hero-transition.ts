// Shared-image page transition between case studies.
//
// The "Next project" thumbnail is replaced by a fixed overlay that can be
// driven two ways:
//   • by a gesture (drag / scroll past the end of the page): setProgress(0→1)
//     grows the thumbnail toward full screen as the user pulls, then
//     commit() finishes the expansion (cancel() only if pulled all the way back);
//   • by a click: heroTransition() runs the whole expansion at once.
// After the expansion the next page loads underneath, and the full-screen
// image settles into that page's hero slot (the element marked with
// `data-hero-target`) while the floating nav eases back in.
// Nav hide/reveal styles live in globals.css under html[data-hero-nav].

type Router = { push: (href: string) => void; prefetch: (href: string) => void };

const EASE_IN_OUT = "cubic-bezier(0.76, 0, 0.24, 1)";
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
const CLICK_EXPAND_MS = 900;
const SETTLE_MS = 800;
const CANCEL_MS = 450;
const FADE_MS = 150;
const WAIT_TIMEOUT_MS = 3000;
const NAV_HIDE_AT = 0.12; // gesture progress at which the nav fades out
const NAV_REVEAL_AT = 0.6; // fraction of the settle when the nav starts fading in
const NAV_REVEAL_MS = 700; // keep in sync with globals.css

const px = (n: number) => `${n}px`;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function setNav(state: "hidden" | "reveal" | null) {
  const html = document.documentElement;
  if (state) html.dataset.heroNav = state;
  else delete html.dataset.heroNav;
}

function revealNav() {
  setNav("reveal");
  setTimeout(() => {
    if (document.documentElement.dataset.heroNav === "reveal") setNav(null);
  }, NAV_REVEAL_MS + 50);
}

// Hold the page still for the whole transition — including while the next page
// loads and the image settles into its hero slot — so leftover trackpad momentum
// can't scroll the new page out from under the overlay. Done with event
// blocking rather than overflow:hidden so the layout (scrollbar width) never shifts.
const SCROLL_KEYS = new Set([" ", "PageDown", "PageUp", "ArrowDown", "ArrowUp", "Home", "End"]);
function lockScroll() {
  const block = (e: Event) => {
    if (e.cancelable) e.preventDefault();
  };
  const blockKeys = (e: KeyboardEvent) => {
    if (SCROLL_KEYS.has(e.key)) e.preventDefault();
  };
  const opts = { capture: true, passive: false } as const;
  window.addEventListener("wheel", block, opts);
  window.addEventListener("touchmove", block, opts);
  window.addEventListener("keydown", blockKeys, opts);
  return () => {
    window.removeEventListener("wheel", block, opts);
    window.removeEventListener("touchmove", block, opts);
    window.removeEventListener("keydown", blockKeys, opts);
  };
}

function waitFor<T>(check: () => T | null, timeout: number): Promise<T | null> {
  const start = performance.now();
  return new Promise((resolve) => {
    const tick = () => {
      const v = check();
      if (v) return resolve(v);
      if (performance.now() - start > timeout) return resolve(null);
      requestAnimationFrame(tick);
    };
    tick();
  });
}

function scaleOf(transform: string) {
  const m = transform.match(/^matrix\(([^,]+)/);
  return m ? parseFloat(m[1]) || 1 : 1;
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export type Rect = { top: number; left: number; width: number; height: number };

const DIRECT_MS = 1000;
const BACKDROP_OUT_MS = 450;

export interface HeroDrag {
  readonly progress: number;
  setProgress: (p: number) => void;
  commit: (opts?: { duration?: number; easing?: string; direct?: boolean; to?: () => Rect }) => Promise<void>;
  cancel: () => Promise<void>;
}

let active = false;

/** Lift the thumbnail into a full-screen-capable overlay. Returns null if a transition is already running. */
export function startHeroDrag({
  router,
  href,
  src,
  from,
}: {
  router: Router;
  href: string;
  src: string;
  from: HTMLElement;
}): HeroDrag | null {
  if (active) return null;
  active = true;

  const html = document.documentElement;
  const oldTarget = document.querySelector("[data-hero-target]");
  const r = from.getBoundingClientRect();
  const startRadius = parseFloat(getComputedStyle(from).borderTopLeftRadius) || 0;
  const fromImg = from.querySelector("img");
  const startScale = fromImg ? scaleOf(getComputedStyle(fromImg).transform) : 1;

  const overlay = document.createElement("div");
  Object.assign(overlay.style, {
    position: "fixed",
    zIndex: "9999",
    overflow: "hidden",
    background: getComputedStyle(from).backgroundColor || "#1a1a1a",
    pointerEvents: "none",
    willChange: "top, left, width, height, border-radius",
  } as Partial<CSSStyleDeclaration>);
  const img = document.createElement("img");
  img.src = src;
  img.alt = "";
  Object.assign(img.style, {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    willChange: "transform",
  } as Partial<CSSStyleDeclaration>);
  overlay.appendChild(img);
  document.body.appendChild(overlay);
  from.style.visibility = "hidden";
  const unlockScroll = lockScroll();
  router.prefetch(href);

  let progress = 0;
  let finished = false;

  const frameAt = (t: number) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return {
      top: px(lerp(r.top, 0, t)),
      left: px(lerp(r.left, 0, t)),
      width: px(lerp(r.width, vw, t)),
      height: px(lerp(r.height, vh, t)),
      borderRadius: px(lerp(startRadius, 0, t)),
    };
  };
  const scaleAt = (t: number) => `scale(${lerp(startScale, 1, t)})`;

  const apply = (t: number) => {
    progress = Math.min(1, Math.max(0, t));
    Object.assign(overlay.style, frameAt(progress));
    img.style.transform = scaleAt(progress);
    if (progress > NAV_HIDE_AT) setNav("hidden");
    else if (html.dataset.heroNav === "hidden") setNav(null);
  };
  apply(0);

  const teardown = () => {
    unlockScroll();
    overlay.remove();
    if (from.isConnected) from.style.visibility = "";
    active = false;
  };

  // Direct morph (home → case study): the thumbnail starts moving at once toward
  // where the next page's hero will be, while the current page fades to white
  // behind it and the next page loads underneath, out of sight. When it lands,
  // the white fades away to reveal the new page around the hero.
  const directMorph = async (to?: () => Rect) => {
    const backdrop = document.createElement("div");
    Object.assign(backdrop.style, {
      position: "fixed",
      inset: "0",
      zIndex: "9998",
      background: getComputedStyle(document.body).backgroundColor || "#fff",
      opacity: "0",
      pointerEvents: "none",
    } as Partial<CSSStyleDeclaration>);
    document.body.appendChild(backdrop);
    try {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const goal = to?.() ?? { top: 0, left: 0, width: vw, height: vh };
      const goalFrame = {
        top: px(goal.top),
        left: px(goal.left),
        width: px(goal.width),
        height: px(goal.height),
        borderRadius: "0px",
      };
      const opts = { duration: DIRECT_MS, easing: EASE_IN_OUT, fill: "forwards" as const };
      backdrop.animate([{ opacity: 0 }, { opacity: 1 }], { duration: DIRECT_MS * 0.6, easing: "ease-out", fill: "forwards" });
      img.animate([{ transform: scaleAt(progress) }, { transform: "scale(1)" }], opts);
      const flight = overlay.animate([frameAt(progress), goalFrame], opts).finished;

      // Load the next page underneath while the image is in flight
      await nextFrame();
      router.push(href);
      const target = await waitFor<HTMLElement>(() => {
        if (window.location.pathname !== href) return null;
        const el = document.querySelector<HTMLElement>("[data-hero-target]");
        if (!el || el === oldTarget) return null;
        const im = el.querySelector("img");
        if (im && !im.complete) return null;
        return el;
      }, WAIT_TIMEOUT_MS);
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      await flight;

      if (target) {
        // Correct any small difference between the predicted and real hero slot
        const t = target.getBoundingClientRect();
        const off = Math.abs(t.top - goal.top) + Math.abs(t.height - goal.height) + Math.abs(t.width - goal.width);
        if (off > 1) {
          await overlay.animate(
            [goalFrame, { top: px(t.top), left: px(t.left), width: px(t.width), height: px(t.height), borderRadius: getComputedStyle(target).borderRadius }],
            { duration: 220, easing: EASE_OUT, fill: "forwards" },
          ).finished;
        }
      }

      // Let the nav sit above the image, then reveal the new page around it
      overlay.style.zIndex = "40";
      backdrop.style.zIndex = "39";
      revealNav();
      await backdrop.animate([{ opacity: 1 }, { opacity: 0 }], { duration: BACKDROP_OUT_MS, easing: "ease-out", fill: "forwards" }).finished;
    } finally {
      backdrop.remove();
    }
  };

  return {
    get progress() {
      return progress;
    },

    setProgress(p) {
      if (!finished) apply(p);
    },

    async cancel() {
      if (finished) return;
      finished = true;
      const p = progress;
      const opts = { duration: CANCEL_MS * Math.max(0.4, p), easing: EASE_OUT, fill: "forwards" as const };
      img.animate([{ transform: scaleAt(p) }, { transform: scaleAt(0) }], opts);
      await overlay.animate([frameAt(p), frameAt(0)], opts).finished;
      if (html.dataset.heroNav === "hidden") setNav(null);
      teardown();
    },

    async commit({ duration, easing, direct = false, to } = {}) {
      if (finished) return;
      finished = true;
      setNav("hidden");
      try {
        if (direct) {
          await directMorph(to);
          return;
        }
        // 1 — finish expanding to full screen (skipped for a direct morph,
        //     where the thumbnail flies straight into the hero slot)
        const p = progress;
        if (!direct) {
        const opts = {
          duration: duration ?? 300 + 600 * (1 - p),
          easing: easing ?? EASE_OUT,
          fill: "forwards" as const,
        };
        img.animate([{ transform: scaleAt(p) }, { transform: scaleAt(1) }], opts);
        await overlay.animate([frameAt(p), frameAt(1)], opts).finished;
        }
        const from = direct ? frameAt(p) : frameAt(1);

        // 2 — navigate underneath; drop below the fixed nav (z-50) so it can fade in on top
        overlay.style.zIndex = "40";
        router.push(href);

        const target = await waitFor<HTMLElement>(() => {
          if (window.location.pathname !== href) return null;
          const el = document.querySelector<HTMLElement>("[data-hero-target]");
          if (!el || el === oldTarget) return null;
          const im = el.querySelector("img");
          if (im && !im.complete) return null;
          return el;
        }, WAIT_TIMEOUT_MS);

        // 3 — settle into the new page's hero
        if (target) {
          window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
          await nextFrame();
          await nextFrame();
          await sleep(60);
          const t = target.getBoundingClientRect();
          const endRadius = getComputedStyle(target).borderRadius;
          setTimeout(revealNav, SETTLE_MS * NAV_REVEAL_AT);
          img.animate([{ transform: direct ? scaleAt(p) : "scale(1)" }, { transform: "scale(1)" }], {
            duration: SETTLE_MS, easing: EASE_IN_OUT, fill: "forwards",
          });
          await overlay.animate(
            [
              from,
              { top: px(t.top), left: px(t.left), width: px(t.width), height: px(t.height), borderRadius: endRadius },
            ],
            { duration: SETTLE_MS, easing: EASE_IN_OUT, fill: "forwards" },
          ).finished;
        }

        await overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: FADE_MS,
          easing: "ease-out",
          fill: "forwards",
        }).finished;
      } finally {
        if (html.dataset.heroNav === "hidden") revealNav();
        teardown();
      }
    },
  };
}

/** Click: run the whole transition at once. */
export async function heroTransition(opts: {
  router: Router;
  href: string;
  src: string;
  from: HTMLElement;
  /** Morph the thumbnail straight into the next page's hero (no full-screen step) */
  direct?: boolean;
  /** Where the next page's hero will be, so the image can start moving before it loads */
  to?: () => Rect;
}) {
  if (prefersReducedMotion()) {
    opts.router.push(opts.href);
    return;
  }
  const drag = startHeroDrag(opts);
  if (drag) await drag.commit({ duration: CLICK_EXPAND_MS, easing: EASE_IN_OUT, direct: opts.direct, to: opts.to });
}

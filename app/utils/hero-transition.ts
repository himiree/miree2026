// Shared-image page transition:
// 1. the clicked image grows from its card to fill the viewport,
// 2. the next page is loaded underneath,
// 3. the full-screen image settles into the next page's hero slot
//    (the element marked with `data-hero-target`) and fades away,
//    while the floating nav (hidden during the transition) eases back in.
//    Nav hide/reveal styles live in globals.css under html[data-hero-nav].

type Router = { push: (href: string) => void; prefetch: (href: string) => void };

const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
const EXPAND_MS = 900;
const SETTLE_MS = 800;
const FADE_MS = 220;
const WAIT_TIMEOUT_MS = 3000;
const NAV_REVEAL_AT = 0.6; // fraction of the settle when the nav starts fading in
const NAV_REVEAL_MS = 700; // keep in sync with globals.css

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

let running = false;

const px = (n: number) => `${n}px`;
const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

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

export async function heroTransition({
  router,
  href,
  src,
  from,
}: {
  router: Router;
  href: string;
  src: string;
  from: HTMLElement;
}) {
  if (running) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    router.push(href);
    return;
  }

  running = true;
  const html = document.documentElement;
  const prevOverflow = html.style.overflow;
  const oldTarget = document.querySelector("[data-hero-target]");

  const r = from.getBoundingClientRect();
  const startRadius = getComputedStyle(from).borderRadius;
  const fromImg = from.querySelector("img");
  const startTransform = fromImg ? getComputedStyle(fromImg).transform : "none";

  const overlay = document.createElement("div");
  Object.assign(overlay.style, {
    position: "fixed",
    zIndex: "9999",
    top: px(r.top),
    left: px(r.left),
    width: px(r.width),
    height: px(r.height),
    borderRadius: startRadius,
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
    transform: startTransform === "none" ? "" : startTransform,
  } as Partial<CSSStyleDeclaration>);

  overlay.appendChild(img);
  document.body.appendChild(overlay);
  from.style.visibility = "hidden";
  html.style.overflow = "hidden";
  setNav("hidden");
  router.prefetch(href);

  const cleanup = () => {
    html.style.overflow = prevOverflow;
    overlay.remove();
    running = false;
  };

  try {
    // 1 — expand to full screen
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    img.animate([{ transform: startTransform === "none" ? "scale(1)" : startTransform }, { transform: "scale(1)" }], {
      duration: EXPAND_MS,
      easing: EASE,
      fill: "forwards",
    });
    await overlay.animate(
      [
        { top: px(r.top), left: px(r.left), width: px(r.width), height: px(r.height), borderRadius: startRadius },
        { top: "0px", left: "0px", width: px(vw), height: px(vh), borderRadius: "0px" },
      ],
      { duration: EXPAND_MS, easing: EASE, fill: "forwards" },
    ).finished;

    // 2 — navigate underneath
    html.style.overflow = prevOverflow;
    // Drop below the fixed nav (z-50) so it can fade in on top of the image
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

    // 3 — settle into the new hero
    if (target) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      await nextFrame();
      await nextFrame();
      await sleep(60);
      const t = target.getBoundingClientRect();
      const endRadius = getComputedStyle(target).borderRadius;
      const w = window.innerWidth;
      const h = window.innerHeight;
      setTimeout(revealNav, SETTLE_MS * NAV_REVEAL_AT);
      await overlay.animate(
        [
          { top: "0px", left: "0px", width: px(w), height: px(h), borderRadius: "0px" },
          { top: px(t.top), left: px(t.left), width: px(t.width), height: px(t.height), borderRadius: endRadius },
        ],
        { duration: SETTLE_MS, easing: EASE, fill: "forwards" },
      ).finished;
    }

    await overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: FADE_MS,
      easing: "ease-out",
      fill: "forwards",
    }).finished;
  } finally {
    if (from.isConnected) from.style.visibility = "";
    if (document.documentElement.dataset.heroNav === "hidden") revealNav();
    cleanup();
  }
}

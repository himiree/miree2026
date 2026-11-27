"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/language";
import { playClickSound, preloadClickSound } from "../utils/sound";
import type { Lang } from "../data/translations";

export default function FloatingNav() {
  const [visible, setVisible] = useState(true);
  const [langOpen, setLangOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const contactRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  // Scrolled down → only the profile photo stays; hovering it brings the rest back
  const [peek, setPeek] = useState(false);
  const peekTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  function openPeek() {
    clearTimeout(peekTimer.current);
    setPeek(true);
  }
  function closePeek() {
    clearTimeout(peekTimer.current);
    peekTimer.current = setTimeout(() => setPeek(false), 250);
  }
  const expanded = visible || peek;
  // Hovering the photo plays a quick wink
  const [wink, setWink] = useState(false);
  const winkTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  function playWink() {
    clearTimeout(winkTimer.current);
    setWink(true);
    winkTimer.current = setTimeout(() => setWink(false), 650);
  }
  // While collapsed, slide the photo right by half the hidden part so it sits at screen centre
  const restRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);
  useEffect(() => {
    const el = restRef.current;
    if (!el) return;
    const measure = () => setShift((el.offsetWidth + 8) / 2);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const pathname = usePathname();
  const langRef = useRef<HTMLDivElement>(null);
  const { lang, setLang, t } = useLanguage();

  // Dropdowns (Contact, language) open on mouse hover. A short close delay and an
  // invisible bridge above each menu let the pointer travel from trigger to menu.
  // Touch and keyboard still open/close them by tapping or pressing the trigger.
  const hoverTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const lastPointer = useRef("");
  function hoverOpen(e: React.PointerEvent, key: string, setOpen: (open: boolean) => void) {
    if (e.pointerType !== "mouse") return;
    clearTimeout(hoverTimers.current[key]);
    setOpen(true);
  }
  function hoverClose(e: React.PointerEvent, key: string, setOpen: (open: boolean) => void) {
    if (e.pointerType !== "mouse") return;
    hoverTimers.current[key] = setTimeout(() => setOpen(false), 150);
  }
  // A mouse click on an already hover-opened trigger keeps the menu open
  function clickToggle(e: React.MouseEvent, setOpen: (fn: (open: boolean) => boolean) => void) {
    const byMouse = e.detail > 0 && lastPointer.current === "mouse";
    setOpen((open) => (byMouse ? true : !open));
  }
  function rememberPointer(e: React.PointerEvent) {
    lastPointer.current = e.pointerType;
  }

  // Load the hover sound early so the first menu hover isn't silent
  useEffect(() => preloadClickSound(), []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (Math.abs(currentY - lastScrollY.current) < 4) return;
      if (currentY > lastScrollY.current && currentY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [langOpen]);

  useEffect(() => {
    const timer = copiedTimer;
    return () => clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    if (!contactOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setContactOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setContactOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [contactOpen]);

  useEffect(() => {
    if (!cvOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCvOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [cvOpen]);

  const NAV_ITEMS = [
    { label: t.nav.work, href: "/#recent-work" },
    { label: t.nav.about, href: "/about" },
  ];

  const CONTACT_ITEMS = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/damiree-kim/", icon: "/icon-linkedin.svg", external: true },
    { label: "Instagram", href: "https://www.instagram.com/damiree_813/", icon: "/icon-instagram.svg", external: true },
  ];
  const EMAIL = "damiree813@gmail.com";

  // "Copy email": copies the address and shows a confirmation for 2.6s
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Fallback for browsers/contexts without the async clipboard API
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setEmailCopied(true);
    clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => setEmailCopied(false), 2600);
  }

  return (
    <>
      <div
        data-nav
        className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
      >
        <div className="flex items-center pointer-events-auto" onPointerLeave={closePeek}>
          {/* Profile photo */}
          <Link
            href="/"
            data-nav-brand
            onPointerEnter={() => {
              openPeek();
              playWink();
            }}
            onFocus={openPeek}
            style={{
              transform: `translateX(${expanded ? 0 : shift}px) scale(${wink ? 1.06 : 1})`,
              transition: "transform 620ms cubic-bezier(0.34, 1.36, 0.64, 1)",
            }}
            className="relative w-[68px] h-[42px] rounded-[99px] overflow-hidden flex-shrink-0 shadow-[0px_8px_32px_0px_rgba(0,0,0,0.12)]"
          >
            <img
              src="/profile.png"
              alt="Damiree Kim"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <img
              src="/profile_still2.png"
              alt=""
              aria-hidden
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[90ms] ease-out ${wink ? "opacity-100" : "opacity-0"}`}
            />
          </Link>

          <div
            onPointerEnter={() => clearTimeout(peekTimer.current)}
            onFocusCapture={openPeek}
            ref={restRef}
            style={{
              transformOrigin: "left center",
              transition: expanded
                ? "opacity 380ms ease-out 60ms, translate 620ms cubic-bezier(0.34, 1.36, 0.64, 1) 40ms, scale 620ms cubic-bezier(0.34, 1.36, 0.64, 1) 40ms, filter 420ms ease-out 60ms"
                : "opacity 220ms ease-in, translate 300ms cubic-bezier(0.4, 0, 1, 1), scale 300ms cubic-bezier(0.4, 0, 1, 1), filter 220ms ease-in",
            }}
            className={`ml-2 flex items-center gap-2 ${
              expanded ? "opacity-100 translate-x-0 scale-100 blur-0" : "opacity-0 -translate-x-4 scale-[0.94] blur-[6px] pointer-events-none"
            }`}
          >
          {/* Nav links pill */}
          <nav
            data-nav-links
            className="relative isolate flex items-center rounded-[99px] px-8 py-3 gap-6"
            aria-label="Main navigation"
          >
            {/* Pill background on its own layer: a backdrop blur on the nav itself
                would stop the Contact dropdown inside it from blurring the page */}
            <span
              aria-hidden
              className="absolute inset-0 -z-10 rounded-[99px] bg-[rgba(255,255,255,0.82)] backdrop-blur-[40px] shadow-[0px_2px_24px_0px_rgba(0,0,0,0.10),0px_0px_0px_0.5px_rgba(0,0,0,0.08)] border border-white/60"
            />
            {NAV_ITEMS.map((item) => {
              const active = item.href === "/#recent-work" ? pathname === "/" : pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-nav-link
                  onMouseEnter={() => playClickSound()}
                  className={`text-[14px] font-semibold leading-[18px] tracking-[-0.4px] transition-opacity duration-200 ${
                    active ? "text-[#181818]" : "text-[#576779] hover:text-[#181818]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            {/* Contact dropdown */}
            <div ref={contactRef} className="relative" onPointerEnter={(e) => hoverOpen(e, "contact", setContactOpen)}
              onPointerLeave={(e) => hoverClose(e, "contact", setContactOpen)}>
              <button
                data-nav-link
                onPointerDown={rememberPointer}
                onMouseEnter={() => playClickSound()}
                onClick={(e) => clickToggle(e, setContactOpen)}
                aria-haspopup="menu"
                aria-expanded={contactOpen}
                className={`flex items-center gap-1.5 text-[14px] font-semibold leading-[18px] tracking-[-0.4px] transition-colors duration-200 ${
                  contactOpen ? "text-[#181818]" : "text-[#576779] hover:text-[#181818]"
                }`}
              >
                {t.nav.contact}
                <svg
                  width="8"
                  height="5"
                  viewBox="0 0 6 4"
                  fill="none"
                  aria-hidden
                  className={`transition-transform duration-200 ${contactOpen ? "rotate-180" : ""}`}
                >
                  <path
                    d="M0.5 0.5L3 3L5.5 0.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {contactOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-5">
                <div
                  role="menu"
                  className="bg-[rgba(255,255,255,0.94)] backdrop-blur-[64px] backdrop-saturate-150 rounded-[16px] overflow-hidden shadow-[0px_2px_24px_0px_rgba(0,0,0,0.10),0px_0px_0px_0.5px_rgba(0,0,0,0.08)] min-w-[128px] border border-white/60 py-3 px-1.5"
                >
                  {CONTACT_ITEMS.map((item) => (
                    <a
                      key={item.label}
                      role="menuitem"
                      href={item.href}
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      onMouseEnter={() => playClickSound()}
                      onClick={() => setContactOpen(false)}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-[13px] leading-[18px] tracking-[-0.4px] text-[#576779] hover:text-[#181818] transition-colors duration-150 whitespace-nowrap"
                    >
                      <img src={item.icon} alt="" aria-hidden width={14} height={14} className="size-[14px] shrink-0 object-contain" />
                      {item.label}
                    </a>
                  ))}
                  <button
                    type="button"
                    role="menuitem"
                    onMouseEnter={() => playClickSound()}
                    onClick={copyEmail}
                    aria-live="polite"
                    className={`flex items-center gap-2 w-full text-left px-4 py-2 text-[13px] leading-[18px] tracking-[-0.4px] transition-colors duration-150 whitespace-nowrap ${
                      emailCopied ? "text-[#1271C4]" : "text-[#576779] hover:text-[#181818]"
                    }`}
                  >
                    <img src="/icon-email.svg" alt="" aria-hidden width={14} height={14} className="size-[14px] shrink-0 object-contain" />
                    {emailCopied ? `Copied! ${EMAIL}` : "Copy email"}
                  </button>
                </div>
                </div>
              )}
            </div>

            {/* CV as button to open modal */}
            <button
              data-nav-link
              onMouseEnter={() => playClickSound()}
              onClick={() => { setCvOpen(true); }}
              className="text-[14px] font-semibold leading-[18px] tracking-[-0.4px] transition-opacity duration-200 text-[#576779] hover:text-[#181818]"
            >
              {t.nav.cv}
            </button>
          </nav>

          {/* Language toggle pill */}
          <div ref={langRef} className="relative" onPointerEnter={(e) => hoverOpen(e, "lang", setLangOpen)}
            onPointerLeave={(e) => hoverClose(e, "lang", setLangOpen)}>
            <button
              onPointerDown={rememberPointer}
              onMouseEnter={() => playClickSound()}
              onClick={(e) => clickToggle(e, setLangOpen)}
              className="flex items-center gap-2 bg-[rgba(255,255,255,0.82)] backdrop-blur-[40px] rounded-[99px] px-4 py-3 text-[#576779] text-[14px] font-semibold leading-[18px] tracking-[-0.4px] hover:text-[#181818] transition-colors duration-200 shadow-[0px_2px_24px_0px_rgba(0,0,0,0.10),0px_0px_0px_0.5px_rgba(0,0,0,0.08)] border border-white/60"
              aria-label="Language selector"
            >
              {lang}
              <svg
                width="6"
                height="4"
                viewBox="0 0 6 4"
                fill="none"
                aria-hidden
                className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
              >
                <path
                  d="M0.5 0.5L3 3L5.5 0.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {langOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
              <div className="bg-[rgba(255,255,255,0.94)] backdrop-blur-[64px] backdrop-saturate-150 rounded-[16px] overflow-hidden shadow-[0px_2px_24px_0px_rgba(0,0,0,0.10),0px_0px_0px_0.5px_rgba(0,0,0,0.08)] min-w-[72px] border border-white/60">
                {(["ENG", "KOR", "DE"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onMouseEnter={() => playClickSound()}
                    onClick={() => { setLang(l); setLangOpen(false); }}
                    className={`w-full text-center px-4 py-2.5 text-[13px] leading-[18px] tracking-[-0.4px] transition-colors duration-150 ${
                      lang === l ? "text-[#181818] font-medium" : "text-[#576779] hover:text-[#181818]"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>

      {/* CV PDF Modal */}
      {cvOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={(e) => { if (e.target === e.currentTarget) setCvOpen(false); }}
        >
          {/* Strong background blur overlay */}
          <div className="absolute inset-0 backdrop-blur-2xl bg-[rgba(255,255,255,0.3)]" />

          {/* Modal */}
          <div className="relative z-10 w-full max-w-[720px] mx-6 flex flex-col rounded-[20px] overflow-hidden shadow-[0px_24px_64px_0px_rgba(0,0,0,0.18)] bg-white/90 backdrop-blur-xl"
            style={{ maxHeight: "calc(100vh - 80px)" }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06]">
              <span className="text-[14px] font-medium tracking-[-0.4px] text-[#181818]">
                CV — Damiree Kim
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="/DamireeKim_CV.pdf"
                  download
                  className="flex items-center gap-1.5 text-[13px] tracking-[-0.3px] text-[#576779] hover:text-[#181818] transition-colors duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Download
                </a>
                <button
                  onClick={() => setCvOpen(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-full text-[#738395] hover:text-[#181818] hover:bg-black/[0.06] transition-colors duration-200"
                  aria-label="Close"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* PDF iframe */}
            <div className="flex-1 overflow-hidden" style={{ minHeight: "60vh" }}>
              <iframe
                src="/DamireeKim_CV.pdf"
                className="w-full h-full"
                style={{ minHeight: "60vh", border: "none" }}
                title="CV — Damiree Kim"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

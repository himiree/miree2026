"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/language";
import { playClickSound } from "../utils/sound";
import type { Lang } from "../data/translations";

export default function FloatingNav() {
  const [visible, setVisible] = useState(true);
  const [langOpen, setLangOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const langRef = useRef<HTMLDivElement>(null);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
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
    if (!cvOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCvOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [cvOpen]);

  const NAV_ITEMS = [
    { label: t.nav.work, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.archive, href: "/archives" },
  ];

  return (
    <>
      <div
        data-nav
        className={`fixed top-6 left-0 right-0 z-50 flex justify-center transition-all duration-300 ease-in-out ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2">
          {/* Profile photo */}
          <div
            data-nav-brand
            className="relative w-[68px] h-[42px] rounded-[99px] overflow-hidden flex-shrink-0 shadow-[0px_8px_32px_0px_rgba(0,0,0,0.12)]"
          >
            <img
              src="/profile.png"
              alt="Damiree Kim"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Nav links pill */}
          <nav
            data-nav-links
            className="flex items-center bg-[rgba(255,255,255,0.82)] backdrop-blur-[40px] rounded-[99px] px-8 py-3 gap-6 shadow-[0px_2px_24px_0px_rgba(0,0,0,0.10),0px_0px_0px_0.5px_rgba(0,0,0,0.08)] border border-white/60"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-nav-link
                  className={`text-[14px] font-semibold leading-[18px] tracking-[-0.4px] transition-opacity duration-200 ${
                    active ? "text-[#181818]" : "text-[#576779] hover:text-[#181818]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            {/* CV as button to open modal */}
            <button
              data-nav-link
              onClick={() => { setCvOpen(true); }}
              className="text-[14px] font-semibold leading-[18px] tracking-[-0.4px] transition-opacity duration-200 text-[#576779] hover:text-[#181818]"
            >
              {t.nav.cv}
            </button>
          </nav>

          {/* Language toggle pill */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => { setLangOpen((v) => !v); }}
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
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-[rgba(255,255,255,0.88)] backdrop-blur-[40px] rounded-[16px] overflow-hidden shadow-[0px_2px_24px_0px_rgba(0,0,0,0.10),0px_0px_0px_0.5px_rgba(0,0,0,0.08)] min-w-[72px] border border-white/60">
                {(["ENG", "KOR", "DE"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setLangOpen(false); }}
                    className={`w-full text-center px-4 py-2.5 text-[13px] leading-[18px] tracking-[-0.4px] transition-colors duration-150 ${
                      lang === l ? "text-[#181818] font-medium" : "text-[#576779] hover:text-[#181818]"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
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

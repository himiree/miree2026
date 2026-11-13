"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Nav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleScroll = () => {
      if (window.scrollY > 10) {
        nav.setAttribute("data-scrolled", "true");
      } else {
        nav.removeAttribute("data-scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={navRef}
      data-nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 data-[scrolled]:bg-white/95 data-[scrolled]:backdrop-blur-md"
    >
      <nav
        className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-[var(--border)]"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          data-nav-brand
          className="text-sm font-medium tracking-tight transition-opacity duration-200 hover:opacity-50"
        >
          Damiree Kim
        </Link>

        <div className="flex items-center gap-8" data-nav-links>
          <Link
            href="/archives"
            data-nav-link
            className={`nav-link text-sm transition-opacity duration-200 ${
              pathname === "/archives" ? "opacity-40 pointer-events-none" : ""
            }`}
          >
            Archives
          </Link>
          <a
            href="mailto:damiree813@gmail.com"
            data-nav-link
            className="nav-link text-sm transition-opacity duration-200 hover:opacity-50"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}

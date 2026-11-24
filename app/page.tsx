"use client";
import FloatingNav from "./components/floating-nav";
import Footer from "./components/footer";
import HomeWork from "./components/home-work";
import { useLanguage } from "./context/language";
import { preloadClickSound } from "./utils/sound";

const introLine =
  "font-medium text-[24px] leading-[28px] text-[#738395] [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]";

export default function Home() {
  const { t } = useLanguage();
  if (typeof window !== "undefined") preloadClickSound();
  return (
    <>
      <FloatingNav />
      <main className="w-full">
        <section
          id="recent-work"
          className="flex flex-col items-center gap-20 px-6 sm:px-10 min-[75rem]:px-[100px] pt-36 pb-20 max-w-[1240px] mx-auto w-full"
        >
          <div className="flex flex-col items-center gap-4 text-center tracking-[-0.5px] text-balance">
            <p className={introLine}>
              {t.home.greeting} <span className="font-bold text-[#181818]">{t.home.name}</span>
            </p>
            <p className={introLine}>{t.home.title}</p>
            <p className={introLine}>{t.home.location}</p>
          </div>

          <HomeWork label={t.home.latestWork} />
        </section>
      </main>
      <Footer />
    </>
  );
}

"use client";
import FloatingNav from "../components/floating-nav";
import Footer from "../components/footer";
import { useLanguage } from "../context/language";

export default function CV() {
  const { t } = useLanguage();
  return (
    <>
      <FloatingNav />
      <main className="px-4 sm:px-6 max-w-[1100px] mx-auto pb-28 w-full">
        <section className="grid grid-cols-1 min-[600px]:grid-cols-2 gap-2 pt-36 pb-14">
          <p className="text-[32px] leading-[28px] font-bold text-[#181818] tracking-[-0.5px]">
            {t.cv.heading}
          </p>
          <p className="text-[20px] leading-[28px] text-[#576779] tracking-[-0.2px]">
            {t.cv.subtitle}
          </p>
        </section>

        <div className="border-t border-[var(--border)]" />

        <section className="pt-16 pb-10">
          <p className="text-[14px] text-[#738395] tracking-[-0.2px]">
            {t.cv.comingSoon}
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

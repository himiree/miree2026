"use client";
import FloatingNav from "../components/floating-nav";
import Footer from "../components/footer";
import { useLanguage } from "../context/language";
import Image from "next/image";

const skills = [
  {
    category: "Design",
    items: "Visual Design · Brand Identity · UI/UX · Design Systems",
  },
  {
    category: "Tools",
    items: "Figma · Adobe CC(Illustrator, Photoshop, After Effects, Indesign, Lightroom) · Claude · Cursor · Framer · Lovable",
  },
  {
    category: "AI assisted Design",
    items: "AI Prototyping · Design Exploration · Prompting for Design Workflows · Design-to-Code",
  },
  {
    category: "Basic Knowledge of",
    items: "Blender · HTML · CSS · Tailwind",
  },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <>
      <FloatingNav />
      <main className="px-4 sm:px-6 max-w-[1100px] mx-auto pb-28 w-full">

        {/* Hero: name + bio */}
        <section className="grid grid-cols-1 min-[600px]:grid-cols-2 gap-2 pt-36 pb-12">
          {/* Left: name + icons */}
          <div className="flex flex-col gap-[32px]">
            <h1 className="text-[32px] font-bold leading-[28px] text-[#181818] tracking-[-0.5px] [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
              {t.about.heading}
            </h1>
            <div className="flex items-center gap-[19px]">
              <a href="https://www.instagram.com/damiree.kim" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
                <Image src="/icon-instagram.svg" alt="Instagram" width={22} height={22} />
              </a>
              <a href="https://www.linkedin.com/in/damiree-kim" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
                <Image src="/icon-linkedin.svg" alt="LinkedIn" width={22} height={22} />
              </a>
            </div>
          </div>

          {/* Right: bio */}
          <div className="flex flex-col gap-[24px]">
            <p className="text-[20px] leading-[28px] text-[#576779] tracking-[-0.2px]">
              {t.about.bio1}
            </p>
            <p className="text-[20px] leading-[28px] text-[#576779] tracking-[-0.2px]">
              {t.about.bio2}
            </p>
          </div>
        </section>

        {/* Skills table */}
        <section className="border-t border-[var(--border)]">
          <div className="flex flex-col text-[13px] tracking-[-0.2px]">
            {skills.map((row, i) => (
              <div
                key={row.category}
                className={`flex gap-[32px] items-center py-[10px] ${i > 0 ? "border-t border-[rgba(0,0,0,0.08)]" : ""}`}
              >
                <p className="text-[#738395] w-[140px] flex-shrink-0 leading-[19.5px]">
                  {row.category}
                </p>
                <p className="text-[#576779] leading-[19.5px]">
                  {row.items}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

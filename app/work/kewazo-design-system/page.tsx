"use client";
import FloatingNav from "../../components/floating-nav";
import Footer from "../../components/footer";
import NextProject from "../../components/next-project";
import Link from "next/link";

const framerBase = "https://framerusercontent.com/images/";

const images = {
  hero: `${framerBase}1kK4CERS1OmXuQGONc1U9i2WmuU.png`,
  screen1: `${framerBase}6OMQRC6K0KvbvCQovTobGz69YA.png`,
  screen2: `${framerBase}jC8yDIjhDE8EDgt6hnvBN6I978.png`,
  screen3: `${framerBase}BggDP97wbcuqPRHb3nS4tc4M4mQ.png`,
  screen4: `${framerBase}RcV2xh330L7mtkejLxJHb1hwTTY.png`,
  conference: `${framerBase}nX8IDYRvniq5E1F7zZSFrQc72Lw.png`,
  presentation: `${framerBase}ZrKoEYll1CyT0Qjp6SicvhdMc.png`,
};

export default function BrandMotionDetail() {
  return (
    <>
      <FloatingNav />
      <main className="bg-white text-[#181818] min-h-screen">
        {/* Back button */}
        <div className="px-4 sm:px-6 max-w-[900px] mx-auto pt-36 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] text-[#576779] hover:text-[#181818] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </Link>
        </div>

        {/* Header */}
        <div className="px-4 sm:px-6 max-w-[900px] mx-auto pb-10">
          <div className="flex flex-col gap-4">
            <p className="text-[13px] text-[#576779] tracking-[-0.1px]">Product · Sep 2024 – Nov 2024</p>
            <h1 className="text-[36px] sm:text-[48px] font-bold leading-[1.1] tracking-[-1px] text-[#181818]">
              Design System for<br />B2B robotic startup
            </h1>
            <p className="text-[16px] leading-[26px] text-[#576779] tracking-[-0.2px] max-w-[560px]">
              KEWAZO is a Series A-B stage B2B company combining SaaS and robotics in heavy industries. I joined as an intern and later became their first full-time visual design hire, working closely with the CEO and sales team.
            </p>
          </div>

          {/* Meta row */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-black/[0.07] pt-8">
            {[
              { label: "Role", value: "Visual Designer" },
              { label: "Duration", value: "3 months" },
              { label: "Team", value: "Solo designer" },
              { label: "Deliverable", value: "Design System" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1">
                <p className="text-[12px] text-[#9aa5b1] tracking-[0.4px] uppercase">{label}</p>
                <p className="text-[14px] font-medium text-[#181818] tracking-[-0.1px]">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero image */}
        <div className="px-4 sm:px-6 max-w-[1200px] mx-auto pb-16">
          <div data-hero-target className="w-full rounded-[20px] overflow-hidden bg-[#f1f3f5]">
            <img
              src={images.hero}
              alt="Design System overview"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Overview section */}
        <div className="px-4 sm:px-6 max-w-[900px] mx-auto pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-10">
            <div>
              <p className="text-[13px] font-semibold text-[#181818] tracking-[-0.1px]">Overview</p>
            </div>
            <div className="flex flex-col gap-5">
              <p className="text-[16px] leading-[28px] text-[#576779] tracking-[-0.2px]">
                As the first visual designer, I was responsible for building the design system from the ground up — establishing foundations that would scale across the product as the company grew from Series A to B stage.
              </p>
              <p className="text-[16px] leading-[28px] text-[#576779] tracking-[-0.2px]">
                The challenge was not just creating components, but doing so in a way that enabled a small team to ship quickly and consistently, while maintaining a professional brand identity that could hold up against larger enterprise competitors.
              </p>
            </div>
          </div>
        </div>

        {/* Diverge / Converge section */}
        <div className="px-4 sm:px-6 max-w-[900px] mx-auto pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-10">
            <div>
              <p className="text-[13px] font-semibold text-[#181818] tracking-[-0.1px]">Process</p>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-[20px] font-bold tracking-[-0.4px] text-[#181818] mb-3">Diverge → Converge</p>
                <p className="text-[16px] leading-[28px] text-[#576779] tracking-[-0.2px]">
                  I followed a diverge–converge approach: first exploring a wide range of visual directions and component patterns, then narrowing down to a coherent system that matched both the brand personality and the technical constraints of the product.
                </p>
              </div>
              <div>
                <p className="text-[16px] leading-[28px] text-[#576779] tracking-[-0.2px]">
                  This meant auditing the existing product, identifying inconsistencies, and mapping the full surface area before designing a single component. The audit alone revealed over 40 unique button styles and 12 different type treatments across the product.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Screenshot grid 1 */}
        <div className="px-4 sm:px-6 max-w-[1200px] mx-auto pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-[16px] overflow-hidden bg-[#f8f9fa]">
              <img src={images.screen1} alt="Design system components" className="w-full h-auto object-cover" />
            </div>
            <div className="rounded-[16px] overflow-hidden bg-[#f8f9fa]">
              <img src={images.screen2} alt="Design system tokens" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>

        {/* AI-assisted design section */}
        <div className="px-4 sm:px-6 max-w-[900px] mx-auto pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-10">
            <div>
              <p className="text-[13px] font-semibold text-[#181818] tracking-[-0.1px]">Approach</p>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-[20px] font-bold tracking-[-0.4px] text-[#181818] mb-3">AI-assisted design exploration</p>
                <p className="text-[16px] leading-[28px] text-[#576779] tracking-[-0.2px]">
                  To accelerate the exploration phase, I used AI-assisted tools to rapidly generate visual directions and test color combinations. This allowed me to present more options to stakeholders in less time, while keeping the final design decisions grounded in human judgment and brand strategy.
                </p>
              </div>
              <div>
                <p className="text-[16px] leading-[28px] text-[#576779] tracking-[-0.2px]">
                  The system was built around a token architecture — global primitives feeding into semantic aliases feeding into component-specific values. This layered approach meant that a single rebrand could propagate across the entire product with minimal manual updates.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Screenshot grid 2 */}
        <div className="px-4 sm:px-6 max-w-[1200px] mx-auto pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-[16px] overflow-hidden bg-[#f8f9fa]">
              <img src={images.screen3} alt="Component library" className="w-full h-auto object-cover" />
            </div>
            <div className="rounded-[16px] overflow-hidden bg-[#f8f9fa]">
              <img src={images.screen4} alt="Design tokens" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>

        {/* Impact / Outcome */}
        <div className="px-4 sm:px-6 max-w-[900px] mx-auto pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-10">
            <div>
              <p className="text-[13px] font-semibold text-[#181818] tracking-[-0.1px]">Impact</p>
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-[16px] leading-[28px] text-[#576779] tracking-[-0.2px]">
                The design system was adopted across the web product and marketing materials within two months of initial release. It reduced design-to-development handoff time by approximately 40% and enabled engineers to build new features with significantly less back-and-forth on visual specifications.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "40%", label: "Faster design-to-dev handoff" },
                  { value: "200+", label: "Components documented" },
                  { value: "3×", label: "Faster new feature design" },
                  { value: "1", label: "Source of truth for the team" },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="bg-[#f8f9fa] border border-black/[0.07] rounded-[14px] p-5 flex flex-col gap-1"
                  >
                    <p className="text-[28px] font-bold tracking-[-0.8px] text-[#181818]">{value}</p>
                    <p className="text-[13px] leading-[18px] text-[#576779] tracking-[-0.1px]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Conference / presentation photos */}
        <div className="px-4 sm:px-6 max-w-[1200px] mx-auto pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-[16px] overflow-hidden bg-[#f8f9fa] aspect-[4/3]">
              <img src={images.conference} alt="Conference presentation" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-[16px] overflow-hidden bg-[#f8f9fa] aspect-[4/3]">
              <img src={images.presentation} alt="Design presentation" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* What's next */}
        <div className="px-4 sm:px-6 max-w-[900px] mx-auto pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-10">
            <div>
              <p className="text-[13px] font-semibold text-[#181818] tracking-[-0.1px]">What's next</p>
            </div>
            <div>
              <p className="text-[16px] leading-[28px] text-[#576779] tracking-[-0.2px]">
                The system is designed to scale. Next steps include extending the token library to cover dark mode, building an interactive documentation site for the team, and creating contribution guidelines so engineers can propose component additions without breaking existing patterns.
              </p>
            </div>
          </div>
        </div>

        <NextProject current="/work/kewazo-design-system" />

        {/* Bottom nav */}
        <div className="px-4 sm:px-6 max-w-[900px] mx-auto pb-20 border-t border-black/[0.07] pt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] text-[#576779] hover:text-[#181818] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to all work
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

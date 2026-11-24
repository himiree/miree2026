"use client";
import FloatingNav from "../../components/floating-nav";
import Footer from "../../components/footer";
import NextProject from "../../components/next-project";
import CaseStudyHero from "../../components/case-study-hero";
import Link from "next/link";

const fb = "https://framerusercontent.com";

const images = {
  mockup1: `${fb}/images/5xQRoFELCnHgk1II0R2HiN0UkI.png`,
  mockup2: `${fb}/images/x4Knac8TFP8UXkPbk0KBFQ9JHjM.png`,
  detail:  `${fb}/images/JiJLMqN9oDAZVoShiqlN9vFs5s.png`,
};

const videos = {
  v1: `${fb}/assets/Xdf6CRBjfXz1maRpyFt8eQzkPQ.mp4`,
  v2: `${fb}/assets/SnNHH2nKHG9ccUezfPsEVQo.mp4`,
  v3: `${fb}/assets/jI2w62k7nPWcrvSQX0xDhkMH0.mp4`,
};

function Divider() {
  return <div className="border-t border-black/[0.07]" />;
}

function SectionRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-8 py-12">
      <p className="text-[13px] font-semibold text-[#181818] tracking-[-0.1px] pt-1">{label}</p>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function DecisionCard({
  num,
  title,
  desc,
  objectives,
}: {
  num: number;
  title: string;
  desc: string;
  objectives: string[];
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <p className="text-[12px] font-semibold text-[#9aa5b1] tracking-[0.6px] uppercase">
          Design Decision {num}.
        </p>
        <p className="text-[22px] font-bold tracking-[-0.5px] text-[#181818] leading-[1.2]">
          {title}
        </p>
        <p className="text-[15px] leading-[26px] text-[#576779] tracking-[-0.2px]">{desc}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[12px] font-semibold text-[#9aa5b1] tracking-[0.4px] uppercase">
          Objectives
        </p>
        <ul className="flex flex-col gap-1">
          {objectives.map((o, i) => (
            <li key={i} className="flex items-start gap-2 text-[15px] leading-[24px] text-[#576779] tracking-[-0.1px]">
              <span className="mt-[9px] w-[4px] h-[4px] rounded-full bg-[#9aa5b1] shrink-0" />
              {o}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function BrandMotionDetail() {
  return (
    <>
      <FloatingNav />
      <main className="bg-white text-[#181818] min-h-screen">
        {/* Hero media — same image as the previous page's Next project card */}
        <CaseStudyHero href="/work/official-website-renewal" alt="KEWAZO website mockup" />

        {/* Back */}
        <div className="px-4 sm:px-6 max-w-[900px] mx-auto pt-12 pb-6">
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

        {/* Hero header */}
        <div className="px-4 sm:px-6 max-w-[900px] mx-auto pb-10">
          <div className="flex flex-col gap-4">
            <p className="text-[13px] text-[#576779] tracking-[-0.1px]">Product · Sep 2025 – Jan 2026</p>
            <h1 className="text-[36px] sm:text-[48px] font-bold leading-[1.1] tracking-[-1.2px] text-[#181818]">
              Official website<br />full scale renewal
            </h1>
            <p className="text-[16px] leading-[28px] text-[#576779] tracking-[-0.2px] max-w-[560px]">
              KEWAZO is a Series A-B stage B2B company combining SaaS and robotics in heavy industries.
            </p>
          </div>

          {/* Meta */}
          <div className="mt-10 border-t border-black/[0.07] pt-8 grid grid-cols-2 sm:grid-cols-[1fr_1fr_2fr] gap-6">
            <div className="flex flex-col gap-1">
              <p className="text-[12px] text-[#9aa5b1] tracking-[0.4px] uppercase">Delivered</p>
              <p className="text-[14px] font-medium text-[#181818] tracking-[-0.1px] leading-[20px]">Official website</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[12px] text-[#9aa5b1] tracking-[0.4px] uppercase">Duration</p>
              <p className="text-[14px] font-medium text-[#181818] tracking-[-0.1px] leading-[20px]">5 months (2025 Sep – 2026 Jan)</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[12px] text-[#9aa5b1] tracking-[0.4px] uppercase">Impact / Proxy</p>
              <ul className="flex flex-col gap-0.5 mt-0.5">
                {[
                  "Reduced the navigation cost of user journey",
                  "Sales used the website more actively as a reference",
                  "A 45% increase in average session duration (2 m 51 s → 4 m 8 s)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-1.5">
                    <span className="mt-[8px] w-[3px] h-[3px] rounded-full bg-[#9aa5b1] shrink-0" />
                    <p className="text-[13px] leading-[20px] text-[#576779] tracking-[-0.1px]">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 max-w-[1200px] mx-auto pb-16">
          <div className="w-full rounded-[20px] overflow-hidden bg-[#1a1a1a]">
            <img src={images.mockup2} alt="KEWAZO website detail" className="w-full h-auto object-cover" />
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 max-w-[900px] mx-auto">

          <Divider />
          <SectionRow label="Problem Definition">
            <p className="text-[16px] leading-[28px] text-[#576779] tracking-[-0.2px]">
              Users visiting the previous website struggled to form a credible impression of the product quickly. The product value wasn't surfaced in a way that matched how users actually browse — fast and with limited attention.
            </p>
            <div className="bg-[#f8f9fa] border border-black/[0.07] rounded-[14px] p-5 mt-2 flex flex-col gap-3">
              <p className="text-[13px] text-[#9aa5b1] tracking-[-0.1px]">Based on 12 months of previous website analytics</p>
              <ul className="flex flex-col gap-2">
                {[
                  "99% first-time visitors (1% returning)",
                  "65% of visitors exited from the landing page without further navigation.",
                  "Of the remaining 35% who continued, 20% visited the [About company] page as their next step",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-[9px] w-[3px] h-[3px] rounded-full bg-[#9aa5b1] shrink-0" />
                    <p className="text-[14px] leading-[22px] text-[#576779] tracking-[-0.1px]">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </SectionRow>

          <Divider />
          <SectionRow label="How might we">
            <ul className="flex flex-col gap-3">
              {[
                "Create a first touchpoint that builds user trust and credibility?",
                "Guide users through clear, digestible information?",
                "Achieve all of the above while reflecting the brand identity?",
              ].map((q) => (
                <li key={q} className="flex items-start gap-3">
                  <span className="mt-[11px] w-[5px] h-[5px] rounded-full bg-[#181818] shrink-0" />
                  <p className="text-[18px] font-medium leading-[28px] tracking-[-0.3px] text-[#181818]">{q}</p>
                </li>
              ))}
            </ul>
          </SectionRow>

          <Divider />
          <SectionRow label="Design Decisions">
            <div className="flex flex-col gap-14">
              {/* User flow restructure diagram */}
              <div className="w-full rounded-[16px] overflow-hidden bg-[#f8f9fa]">
                <img src={images.detail} alt="Landing page user flow restructure" className="w-full h-auto object-cover" />
              </div>

              <DecisionCard
                num={1}
                title="Restructure the User Flow"
                desc="Prioritised case studies (proven product values) over product feature explanations. The previous landing page led users straight into feature details before they had any sense of the product's value. Moving Case Studies to the top gives users an immediate anchor — our most powerful sales message."
                objectives={[
                  "Reduce user bounce rate on the landing page by 10%",
                  "Shift the user flow from About Company to Case Studies, reducing navigation costs",
                ]}
              />

              {/* Video 1 */}
              <div className="rounded-[16px] overflow-hidden bg-[#1a1a1a]">
                <video src={videos.v1} autoPlay muted loop playsInline className="w-full h-auto" />
              </div>

              <DecisionCard
                num={2}
                title="Tiered CTA button structure"
                desc="I designed tiered CTAs based on user engagement level. This reduced pressure on first-time users and guided them through progressive disclosure."
                objectives={[
                  "Increase the amount of clicks on CTA buttons",
                  "Increase DocSend entering",
                ]}
              />
              <div className="bg-[#f8f9fa] border border-black/[0.07] rounded-[14px] p-6 flex flex-col gap-3">
                <p className="text-[13px] font-semibold text-[#576779] tracking-[-0.1px]">Buttons redesigned into three tiers:</p>
                {[
                  { tier: "High engagement", action: "Request a quote or contact submit", ui: "Hollow graphic" },
                  { tier: "Mid engagement", action: "Moving to other pages", ui: "Hover: vertical moving micro-motion" },
                  { tier: "Low commitment", action: "Educational assets", ui: "Hover: colour change" },
                ].map(({ tier, action, ui }) => (
                  <div key={tier} className="flex flex-col gap-0.5 border-t border-black/[0.06] pt-3">
                    <p className="text-[14px] font-medium text-[#181818] tracking-[-0.1px]">{tier}</p>
                    <p className="text-[13px] text-[#576779]">{action}</p>
                    <p className="text-[12px] text-[#9aa5b1]">{ui}</p>
                  </div>
                ))}
              </div>

              {/* Video 2 */}
              <div className="rounded-[16px] overflow-hidden bg-[#1a1a1a]">
                <video src={videos.v2} autoPlay muted loop playsInline className="w-full h-auto" />
              </div>

              <DecisionCard
                num={3}
                title="Grouping features and services as a carousel"
                desc="Key features were grouped into a single scannable carousel. This reduced the scroll length users had to navigate and enabled faster comprehension of the product's core value."
                objectives={[
                  "Increase user scroll depth",
                  "Increase user completion rate of the Product page",
                ]}
              />

              <DecisionCard
                num={4}
                title="Making strong case studies compelling to watch and hard to miss"
                desc="Case studies are presented as a full-bleed slideshow with clear ROI highlights. Detailed reports are linked via DocSend, letting users go deeper at their own pace while the team collects qualified leads through email submission."
                objectives={[
                  "Increase user dwell time to over 1 m 30 s",
                  "Increase DocSend entries from users",
                ]}
              />

              {/* Video 3 */}
              <div className="rounded-[16px] overflow-hidden bg-[#1a1a1a]">
                <video src={videos.v3} autoPlay muted loop playsInline className="w-full h-auto" />
              </div>

            </div>
          </SectionRow>

          <Divider />
          <SectionRow label="What I'd test next">
            <p className="text-[16px] leading-[28px] text-[#576779] tracking-[-0.2px]">
              The next step would be to better understand user behaviour on the site, identify potential customers through their interaction patterns, and connect those signals directly to the sales process.
            </p>
          </SectionRow>
        </div>

        <NextProject current="/work/official-website-renewal" />

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

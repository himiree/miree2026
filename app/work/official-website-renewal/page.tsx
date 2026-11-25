"use client";
import type { ReactNode } from "react";
import FloatingNav from "../../components/floating-nav";
import NextProject from "../../components/next-project";
import CaseStudyHero from "../../components/case-study-hero";
import BeforeAfterSlider from "../../components/before-after-slider";

// Case study: Official website full scale renewal (Figma: 260808_aumatis › Work-detail · v2)

const MEDIA = {
  // Before/after screenshots for the drag slider — add paths to show them
  before: "/Project_website_revamp/kewazo-before.jpg", // old Wix homepage
  after: "/Project_website_revamp/kewazo-after.jpg", // new kewazo.com homepage
  decision1: "/Project_website_revamp/Design%20decisions%201.mp4",
  decision2: "/Project_website_revamp/Design%20decisions%202.png",
  decision3: "/Project_website_revamp/Design%20decisions%203.mp4",
};

const label = "text-[12.8px] leading-[19.2px] tracking-[-0.25px] text-[#576779]";
const sectionLabel = "text-[14px] font-medium leading-[19.2px] tracking-[-0.25px] text-[#576779]";
const headline =
  "text-[26px] sm:text-[32px] font-semibold leading-[1.3] tracking-[-0.25px] text-[#181818] [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]";
const body = "text-[17px] sm:text-[20px] leading-[1.5] tracking-[-0.25px] text-[#181818]";

/**
 * Section on the 4-column grid: label in column 1 (sticks while the section scrolls by),
 * heading / text / result / media across columns 2–4.
 */
function Block({
  title,
  heading,
  children,
  result,
  media,
}: {
  title: string;
  heading: string;
  children: ReactNode;
  result?: ReactNode;
  media?: ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 py-6 w-full">
      <div>
        <p className={`${sectionLabel} md:sticky md:top-28`}>{title}</p>
      </div>
      <div className="md:col-span-3 flex flex-col gap-6 md:gap-8 min-w-0">
        <p className={`${headline} max-w-[699px]`}>{heading}</p>
        <div className={`${body} flex flex-col`}>{children}</div>
        {result && <p className={headline}>{result}</p>}
        {media && <div className="flex flex-col gap-4 w-full mt-2">{media}</div>}
      </div>
    </section>
  );
}

/** Small label column + bulleted list across three columns */
function ListRow({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 w-full">
      <p className={`${sectionLabel} max-w-[200px]`}>{title}</p>
      <ul className={`${body} md:col-span-3 list-disc pl-[1.5em] flex flex-col`}>{children}</ul>
    </div>
  );
}

// ── 100 homepage visitors (waffle 10×10) ──
const VISITORS = [
  { n: 61, cell: "#eaedf3", key: "#e2e5f1", label: "Left without clicking anything", short: "Left" },
  { n: 16, cell: "#2b3037", key: "#2b3037", label: "Went to About company", short: "About company", note: "41% of those who stayed (16/39)" },
  { n: 3, cell: "#1ea7a6", key: "#1ea7a6", label: "Went to Case studies", short: "Case studies", note: "9% of those who stayed (9/39), where the strongest proof lived" },
  { n: 20, cell: "#bad1d4", key: "#bad1d4", label: "Went elsewhere", short: "Elsewhere" },
];

function VisitorsWaffle() {
  // Donut ring: r = 40 in a 100×100 box, slices clockwise from 12 o'clock with thin gaps
  const R = 40;
  const C = 2 * Math.PI * R;
  const GAP = 0.6; // % of the ring left empty between slices
  const slices = VISITORS.map((v, i) => {
    const before = VISITORS.slice(0, i).reduce((sum, x) => sum + x.n, 0);
    const mid = ((before + v.n / 2) / 100) * Math.PI * 2;
    return {
      ...v,
      dash: `${(Math.max(v.n - GAP, 0.4) / 100) * C} ${C}`,
      offset: -((before + GAP / 2) / 100) * C,
      x: Math.sin(mid),
      y: -Math.cos(mid),
    };
  });
  const LABEL_R = 138; // px from the centre; ring radius is 110px
  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-4 p-6 rounded-[20px] border border-[#d4def5] bg-white w-full">
      <div className="relative w-full max-w-[440px] h-[300px] sm:h-[340px] shrink-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[200px] sm:size-[220px]">
          <svg
            viewBox="0 0 100 100"
            className="size-full -rotate-90"
            role="img"
            aria-label="Per 100 homepage visitors: 61 left without clicking, 16 went to About company, 3 went to Case studies, 20 went elsewhere"
          >
            {slices.map((sl) => (
              <circle key={sl.label} cx="50" cy="50" r={R} fill="none" stroke={sl.cell} strokeWidth="6" strokeDasharray={sl.dash} strokeDashoffset={sl.offset} />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-[52px] font-semibold leading-none tracking-[-1.5px] text-[#181818]">100</p>
            <p className="mt-2 text-[12px] leading-[1.3] text-[#576779]">homepage visitors</p>
          </div>
        </div>
        {/* Short titles around the ring */}
        {slices.map((sl) => (
          <div
            key={sl.label}
            className={`hidden sm:flex absolute flex-col max-w-[130px] ${sl.x >= 0 ? "items-start text-left" : "items-end text-right"}`}
            style={{
              left: `calc(50% + ${sl.x * LABEL_R}px)`,
              top: `calc(50% + ${sl.y * LABEL_R}px)`,
              transform: `translate(${sl.x >= 0 ? "0" : "-100%"}, -50%)`,
            }}
          >
            <p className="text-[22px] font-semibold leading-none text-[#181818]">{sl.n}%</p>
            <p className="mt-1 text-[12px] leading-[1.3] text-[#576779]">{sl.short}</p>
          </div>
        ))}
      </div>

      {/* Details */}
      <div className="flex flex-col gap-4 w-full min-w-0">
        <p className="text-[14px] font-medium text-[#576779]">Percentage</p>
        {VISITORS.map((v) => (
          <div key={v.label} className="flex items-center gap-3">
            <span className="size-3 rounded-[3px] shrink-0" style={{ background: v.key }} />
            <div className="flex flex-col gap-[2px] flex-1 min-w-0">
              <p className="text-[16px] font-medium text-[#181818]">{v.label}</p>
              {v.note && <p className="text-[13px] tracking-[-0.32px] text-[#576779]">{v.note}</p>}
            </div>
            <p className="text-[22px] font-semibold text-[#181818] shrink-0">{v.n}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Homepage order, old → new ──
const OLD_HOME = [
  { t: `Mission headline + "Let's talk" + customer-logo-wall` },
  { t: "Product intro" },
  { t: `"Pick your site type" × 2 buttons` },
  { t: "Availability (Europe, North America)", dim: true },
  { t: "Industrial / Commercial markets teasers" },
  { t: "One customer quote" },
  { t: "Social links", dim: true },
  { t: "Footer + newsletter", dim: true },
];
const NEW_HOME = [
  { t: "What we sell in one line + a customer-logo-wall" },
  { t: "Product intro" },
  { t: "Customer results with ROI", hi: true },
  { t: "3 main offerings: robot, utilisation data, after-service" },
  { t: "Value for each stakeholder" },
  { t: "Testimonials" },
  { t: "News and Blog" },
  { t: "Contact form, put into the bottom of every page", hi: true },
  { t: "Footer, Social links" },
];

function IAColumn({ title, items }: { title: string; items: { t: string; dim?: boolean; hi?: boolean }[] }) {
  return (
    <div className="flex flex-col gap-[6px] flex-1 min-w-0">
      <p className="text-[15px] font-semibold text-[#181818]">{title}</p>
      {items.map((it) => (
        <div
          key={it.t}
          className={`rounded-[10px] px-3 py-[9px] text-[14px] ${
            it.hi
              ? "bg-[#d9f0f1] border-[1.2px] border-[#058b8c] text-[#181818]"
              : it.dim
                ? "bg-[#f5f6f9] border border-[#f2f6f7] text-[#576779]"
                : "bg-white border border-[#f2f6f7] text-[#181818]"
          }`}
        >
          {it.t}
        </div>
      ))}
    </div>
  );
}

// ── CTA system, before ──
const OLD_BUTTONS = [
  { t: "Let's talk", bg: "#43c0c4", fg: "#fff" },
  { t: "Request a demo", bg: "#111", fg: "#fff" },
  { t: "LIFTBOT for Industrial Plants", bg: "#c8d7de", fg: "#454b5b" },
  { t: "Project report", bg: "#454b5b", fg: "#fff" },
  { t: "Learn more →", bg: "#2a2d33", fg: "#fff" },
];

// ── Results ──
const RESULTS = [
  { m: "Average session time", old: "2m 53s", now: "3m 58s", d: "+38%", up: true },
  { m: "Inbound enquiries", old: "192", now: "272", d: "+42%", up: true },
  { m: "Time on the Chevron case study", old: "–", now: "2m 18s", d: "Target 1m 30s" },
  { m: "Time on the product page", old: "–", now: "2m 45s", d: "New merged page" },
  { m: "Homepage bounce", old: "60.9%", now: "60.1%", d: "Flat" },
  { m: "Unique visitors", old: "16.6K", now: "33K", d: "Almost 2x" },
];

// React doesn't render `muted` into the HTML, so browsers can block autoplay — set it in JS
function autoplayMuted(v: HTMLVideoElement | null) {
  if (!v) return;
  v.muted = true;
  v.play().catch(() => {});
}

export default function OfficialWebsiteRenewal() {
  return (
    <>
      <FloatingNav />
      <main className="bg-white text-[#181818] min-h-screen">
        {/* Hero media — same image as the previous page's Next project card */}
        <CaseStudyHero href="/work/official-website-renewal" alt="KEWAZO website mockup" />

        <div className="flex flex-col gap-20 items-center px-6 sm:px-10 min-[75rem]:px-[100px] pt-20 max-w-[1247px] mx-auto w-full">
          {/* Title */}
          <div className="flex flex-col gap-12 w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
              <h1 className="md:col-span-3 text-[38px] sm:text-[52px] font-bold leading-[1.1] tracking-[-1px] text-[#181818] max-w-[720px]">
                Official website full scale renewal
              </h1>
              <div className="flex flex-col gap-2 justify-end items-start md:justify-self-end">
                <p className={label}>Delivered</p>
                <a
                  href="https://www.kewazo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-12 px-4 rounded-[4px] bg-[rgba(223,225,227,0.5)] hover:bg-[rgba(223,225,227,0.85)] transition-colors text-[16px] font-semibold tracking-[-0.25px] text-[#181818]"
                >
                  Official website
                </a>
              </div>
            </div>

            {/* Project profile */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 w-full text-[14px] leading-[1.5] tracking-[-0.25px] text-[#181818]">
              <div className="flex flex-col gap-3">
                <p className={label}>Role</p>
                <p>Sole designer / builder (Framer)</p>
              </div>
              <div className="flex flex-col gap-3">
                <p className={label}>Scope</p>
                <p>
                  Analytics audit<br />Information architecture<br />UX/UI<br />Visual system<br />Framer build<br />Photo/video editing
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p className={label}>Impact / Proxy</p>
                <ol className="list-decimal pl-[21px]">
                  <li><b>+38%</b> average session time<br />(2m 53s → 3m 58s)</li>
                  <li><b>+42%</b> inbound enquiries<br />(192 → 272 submissions)</li>
                  <li><b>2m 18s</b> time on the flagship case study, against a 1m 30s target</li>
                  <li>Kewazo team uses the website more actively as a reference</li>
                </ol>
              </div>
              <div className="flex flex-col gap-3 md:justify-self-end">
                <p className={label}>Duration</p>
                <p>5 months<br />(2025 Sep - 2026 Jan)</p>
              </div>
            </div>
          </div>

          {/* Story */}
          <div className="flex flex-col gap-14 pb-16 w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 py-6">
              <p className={`${body} md:col-span-3`}>
                KEWAZO is a B2B startup combining SaaS and robotics to help refineries, chemical plants and construction contractors move heavy equipment. In B2B, a company website is often the first place of evaluation for both a product and the company behind it. As its sole designer, I had the privilege of initiating and shipping the company’s website redesign end-to-end.
              </p>
            </div>

            <BeforeAfterSlider
              before={MEDIA.before}
              after={MEDIA.after}
              beforeAlt="Old homepage hero: Improving the lives of workers worldwide, with a Let's talk button"
              afterAlt="New homepage hero: Robotics and AI for industrial maintenance and construction, with LIFTBOT carrying material and customer logos"
            />

            <Block
              title="Problem definition"
              heading="Analytics suggested that users went looking for proof for credibility, and didn't find it."
              media={<VisitorsWaffle />}
            >
              <p>I reviewed the old website analytics and discussed with the CEO to create the improved website. And we defined the question the website needed to answer:</p>
              <p>“Can users trust this company?”</p>
              <p>After reviewing the old website&apos;s analytics, then I walked every page as a first-time visitor would.</p>
            </Block>

            <ListRow title="Based on 10 months of previous website analytics:">
              <li><b>98% were first-time visitors.</b> There was one chance to make an impression, and almost nobody came back to read more.</li>
              <li><b>61% left the homepage without clicking anything.</b></li>
              <li><b>41% of those who stayed went to About company, and only 9% to Case studies,</b> where the strongest proof lived.</li>
            </ListRow>

            <ListRow title="How Might We:">
              <li>make the first-visit users prove KEWAZO is credible within seconds?</li>
              <li>guide users through clear, digestible information without making them hunt?</li>
              <li>rebuilt the homepage to answer user’s possible questions in this order: What is it? Does it work for companies like mine? What exactly do I get? How do I talk to someone?</li>
            </ListRow>

            <Block
              title="Design decisions (1)"
              heading="Rebuild the information architecture around the user's questions"
              result="→ +38% average session time (2m 53s → 3m 58s)"
              media={
                <>
                  <div className="flex flex-col md:flex-row gap-5 items-stretch md:items-start p-6 rounded-[20px] bg-[#f5f7fb]">
                    <IAColumn title="Old homepage" items={OLD_HOME} />
                    <p className="self-center text-[24px] text-[#576779] rotate-90 md:rotate-0">→</p>
                    <IAColumn title="New homepage" items={NEW_HOME} />
                  </div>
                  {/* Proof cards on the new homepage */}
                  <div className="relative w-full aspect-[1920/1276] rounded-[16px] overflow-hidden border border-[#d4def5] bg-[#1b1b1c]">
                    <video
                      ref={autoplayMuted}
                      src={MEDIA.decision1}
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-label="New homepage section: customer results for turnarounds, maintenance and capital projects"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </>
              }
            >
              <p>61% left the homepage, and those who stayed detoured to About company instead of Product page. I created the homepage sections to answer user&apos;s possible questions in this order: What is it? Does it work for companies like mine? What exactly do I get? How do I talk to someone?</p>
            </Block>

            <Block
              title="Design decisions (2)"
              heading="Lead with proof first, product features come later"
              result="→ 2m 18s time on the new flagship case study page"
              media={
                <div className="relative w-full aspect-[16/9] rounded-[16px] border border-[#d4def5] overflow-hidden bg-[#2c3038]">
                  <img src={MEDIA.decision2} alt="Customer results with ROI shown on the new homepage" className="absolute inset-0 w-full h-full object-contain" />
                </div>
              }
            >
              <p>Problem: Case studies held the strongest proof, and only 9% of engaged visitors opened them. So I moved the customer results onto the homepage, right after the problem statement. Each card leads with one number, labelled by job type.</p>
            </Block>

            <Block
              title="Design decisions (3)"
              heading="A shorter path to an enquiry"
              result="→ +42% inbound enquiries"
              media={
                <div className="flex flex-col lg:flex-row gap-5 items-stretch lg:items-center w-full">
                  <div className="flex flex-col gap-4 p-[18px] rounded-[16px] border border-[#e2e5f1] bg-white lg:w-[220px] lg:h-[261px] shrink-0">
                    <p className="text-[12px] font-semibold uppercase text-[#181818]">Before</p>
                    <div className="flex flex-wrap gap-2">
                      {OLD_BUTTONS.map((b) => (
                        <span key={b.t} className="px-[11px] py-[9px] rounded-[3px] text-[12px] font-semibold whitespace-nowrap" style={{ background: b.bg, color: b.fg }}>
                          {b.t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="self-center text-[24px] text-[#576779] rotate-90 lg:rotate-0">→</p>
                  <div className="relative flex-1 min-w-0 aspect-[16/9] lg:aspect-auto lg:h-[261px] rounded-[16px] overflow-hidden bg-[#1c1c1c]">
                    {/* "Design decisions 3" — fills the whole After box */}
                    <video
                      ref={autoplayMuted}
                      src={MEDIA.decision3}
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-label="New three-tier button system with hover motion"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <p className="absolute left-[18px] top-[18px] text-[12px] font-semibold uppercase text-white">After</p>
                  </div>
                </div>
              }
            >
              <p>Five button styles competed for attention, with no clear hierarchy. I grouped actions into three tiers based on the commitment they ask of users, then gave each tier its own hover motion to reinforce the hierarchy.</p>
              <p>The contact form now sits at the bottom of the homepage. Previously, visitors had to click a button to reach it on a separate page.</p>
            </Block>

            <Block
              title="Impacts and Takeaway"
              heading="Longer visits and more enquiries"
              media={
                <div className="w-full overflow-x-auto">
                  <table className="w-full min-w-[560px] border-collapse table-fixed">
                    <thead>
                      <tr className="bg-[#f5f7fb] text-[13px] font-medium text-[#576779]">
                        <th className="text-left font-medium px-4 py-3 w-[30%]">Metric</th>
                        <th className="text-right font-medium px-4 py-3 w-[20%]">2025 · old</th>
                        <th className="text-right font-medium px-4 py-3 w-[20%]">2026 · new</th>
                        <th className="text-left font-medium px-4 py-3 pl-8 w-[30%]">-</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RESULTS.map((r) => (
                        <tr key={r.m} className="border-b border-[#d4def5] text-[#181818]">
                          <td className="px-4 py-3 text-[16px]">{r.m}</td>
                          <td className="px-4 py-3 text-[20px] text-right">{r.old}</td>
                          <td className="px-4 py-3 text-[20px] text-right">{r.now}</td>
                          <td className={`px-4 py-3 pl-8 text-[20px] ${r.up ? "font-semibold text-[#058b8c]" : ""}`}>{r.d}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="py-[10px] text-[14px] leading-[1.5] text-[#576779]">
                    Same calendar window in both years, 1 February to 23 November: the old Wix site in 2025, the new Framer site in 2026.
                  </p>
                </div>
              }
            >
              <p>Users came with one question: “Can we trust this company?” I put the answer, real customer value numbers on the homepage and made the next step obvious. Sales also began using the website as a reference in their outreach. That&apos;s a qualitative signal from the team.</p>
            </Block>
          </div>
        </div>

        <NextProject current="/work/official-website-renewal" />
      </main>
    </>
  );
}

"use client";
import type { ReactNode } from "react";
import FloatingNav from "../../components/floating-nav";
import NextProject from "../../components/next-project";
import CaseStudyHero from "../../components/case-study-hero";
import BeforeAfterSlider from "../../components/before-after-slider";


// Case study: Data dashboard UI (KEWAZO ONSITE redesign)
// Every screen and recording is the real prototype; customer, site and serial names are placeholders.

const P = "/Project_data_dashboard/";


// React doesn't render `muted` into the HTML, so browsers can block autoplay — set it in JS
function autoplayMuted(v: HTMLVideoElement | null) {
  if (!v) return;
  v.muted = true;
  v.play().catch(() => {});
}

const V = `${P}video/`;

/** The same interaction recorded in the real prototype, web (main) beside mobile */
function DemoPair({ id, webAlt, mobileAlt }: { id: string; webAlt: string; mobileAlt: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.36fr)] gap-5 sm:gap-6 items-center p-4 sm:p-6 rounded-[16px] bg-[#f5f7fb]">
      <figure className="flex flex-col gap-2 min-w-0 m-0">
        <div className="rounded-[10px] overflow-hidden border border-[#e2e6ee] bg-white shadow-[0_10px_30px_-18px_rgba(24,24,24,0.35)]">
          <video ref={autoplayMuted} src={`${V}${id}-web.mp4`} poster={`${V}${id}-web.jpg`} autoPlay muted loop playsInline aria-label={webAlt} className="block w-full h-auto" />
        </div>
        <figcaption className="text-[12px] font-medium text-[#576779]">Web</figcaption>
      </figure>
      <figure className="flex flex-col gap-2 items-center min-w-0 m-0">
        <div className="w-full max-w-[230px] rounded-[30px] border-[7px] border-[#111] bg-[#111] overflow-hidden shadow-[0_14px_30px_-16px_rgba(0,0,0,0.5)]">
          <video ref={autoplayMuted} src={`${V}${id}-mob.mp4`} poster={`${V}${id}-mob.jpg`} autoPlay muted loop playsInline aria-label={mobileAlt} className="block w-full h-auto rounded-[23px]" />
        </div>
        <figcaption className="text-[12px] font-medium text-[#576779]">Mobile</figcaption>
      </figure>
    </div>
  );
}

const label = "text-[12.8px] leading-[19.2px] tracking-[-0.25px] text-[#576779]";
const sectionLabel = "text-[14px] font-medium leading-[19.2px] tracking-[-0.25px] text-[#576779]";
const headline =
  "text-[26px] sm:text-[32px] font-semibold leading-[1.3] tracking-[-0.25px] text-[#181818] [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]";
const sideHeadline =
  "text-[20px] lg:text-[22px] font-medium leading-[1.35] tracking-[-0.25px] text-[#181818] text-balance";
const body = "text-[17px] sm:text-[20px] leading-[1.5] tracking-[-0.25px] text-[#181818]";

function Block({
  id,
  title,
  heading,
  children,
  result,
  media,
}: {
  id?: string;
  title: string;
  heading?: string;
  children?: ReactNode;
  result?: ReactNode;
  media?: ReactNode;
}) {
  return (
    <section id={id} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-6 w-full scroll-mt-28">
      <div className="md:col-span-3">
        <div className="md:sticky md:top-28 flex flex-col gap-5">
          <h2 className={sectionLabel}>{title}</h2>
          {heading && <h3 className={sideHeadline}>{heading}</h3>}
        </div>
      </div>
      <div className="md:col-span-9 flex flex-col gap-6 md:gap-8 min-w-0">
        {children && <div className={`${body} flex flex-col gap-4 max-w-[820px]`}>{children}</div>}
        {result && <p className={`${headline} max-w-[820px]`}>{result}</p>}
        {media && <div className="flex flex-col gap-4 w-full mt-2">{media}</div>}
      </div>
    </section>
  );
}

/** One line under a screen, image or demo: what to look at */
function Caption({ children }: { children: ReactNode }) {
  return <p className="text-[14px] leading-[1.5] tracking-[-0.2px] text-[#576779] max-w-[820px] -mt-1">{children}</p>;
}

/** Problem → what I did → result, readable in a few seconds near the top */
const SUMMARY = [
  { k: "Problem", v: "ONSITE was hard to read for everyone who opened it. Internal teams found it confusing, and customers who were given accounts rarely used it." },
  { k: "What I did", v: "I reorganised it into three simple views: all robots, one robot, and one day. Each robot's status is now in plain words, and confusing numbers were reduced to four clear measures. It also works on a phone." },
  { k: "Result", v: "A working prototype for desktop and mobile, designed to let sales see in seconds which robots are busy and which sit idle. It hasn't been released yet; launch is planned for 2027. The next step is testing it with the sales and customer success teams." },
];

function Summary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 p-6 sm:p-8 rounded-[16px] bg-[#f5f7fb] w-full">
      {SUMMARY.map((row) => (
        <div key={row.k} className="flex flex-col gap-2">
          <p className={`${sectionLabel} !text-[#1271C4]`}>{row.k}</p>
          <p className="text-[16px] sm:text-[17px] leading-[1.5] tracking-[-0.25px] text-[#181818]">{row.v}</p>
        </div>
      ))}
    </div>
  );
}

const SECTIONS = [
  { id: "before-after", t: "Before / After" },
  { id: "background", t: "Background" },
  { id: "problem", t: "Problem" },
  { id: "decisions", t: "Design decisions" },
  { id: "impact", t: "Impact" },
];

function JumpLinks() {
  return (
    <nav aria-label="On this page" className="flex flex-wrap items-center gap-2 w-full">
      <span className={`${label} mr-2`}>On this page</span>
      {SECTIONS.map((sec) => (
        <a
          key={sec.id}
          href={`#${sec.id}`}
          className="rounded-full border border-[#d4def5] px-3 py-[6px] text-[14px] tracking-[-0.2px] text-[#181818] hover:bg-[#f5f7fb] transition-colors"
        >
          {sec.t}
        </a>
      ))}
    </nav>
  );
}

function SubList({ title, children, after }: { title: string; children: ReactNode; after?: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <p className={`${sectionLabel} !text-[#1271C4]`}>{title}</p>
      <ul className={`${body} list-disc pl-[1.5em] flex flex-col gap-1 max-w-[820px]`}>{children}</ul>
      {after && <div className="mt-5 w-full">{after}</div>}
    </div>
  );
}

// ── Before / After pairs ──
const PAIRS = [
  {
    title: "Fleet",
    note: "From a 10 × 10 grid of codes to one card per unit, with status in words.",
    before: { src: `${P}b_fleet.jpg`, alt: "Old fleet grid of unit codes" },
    after: { src: `${P}after-fleet.jpg`, alt: "New fleet view with a map and status cards" },
  },
  {
    title: "Daily",
    note: "From label–value rows to load, operating time and battery at a glance.",
    before: { src: `${P}b_daily.jpg`, alt: "Old daily report table" },
    after: { src: `${P}after-daily.jpg`, alt: "New daily activity log" },
  },
  {
    title: "Period report",
    note: "From 13 mixed fields to four totals, each with its unit and breakdown.",
    before: { src: `${P}b_range.jpg`, alt: "Old cumulative project report" },
    after: { src: `${P}after-range.jpg`, alt: "New time range view" },
  },
];

function PairShot({ label, src, alt }: { label: string; src: string; alt: string }) {
  return (
    <figure className="relative min-w-0 aspect-[16/10] rounded-[16px] overflow-hidden border border-[#e6e9ed] bg-[#f5f7fb]">
      <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover object-top" />
      <figcaption className="absolute bottom-3 left-3 rounded-full bg-black/60 px-[10px] py-1 text-[12px] font-semibold uppercase text-white">{label}</figcaption>
    </figure>
  );
}

function BeforeAfterPairs() {
  return (
    <section id="before-after" className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-6 w-full scroll-mt-28">
      <div className="md:col-span-3">
        <div className="md:sticky md:top-28 flex flex-col gap-5">
          <h2 className={sectionLabel}>Before / After</h2>
          <h3 className={sideHeadline}>What changed in the product</h3>
        </div>
      </div>
      <div className="md:col-span-9 flex flex-col gap-12 min-w-0">
        {PAIRS.map((p) => (
          <div key={p.title} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-[18px] sm:text-[20px] font-semibold tracking-[-0.25px] text-[#181818]">{p.title}</p>
              <p className="text-[15px] leading-[1.5] text-[#576779]">{p.note}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PairShot label="Before" {...p.before} />
              <PairShot label="After" {...p.after} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Annotated legacy dashboard ──
const PINS = [
  { n: 1, x: 50, y: 2.7 },
  { n: 2, x: 30, y: 15 },
  { n: 3, x: 57, y: 5.6 },
  { n: 3, x: 24, y: 69 },
  { n: 4, x: 62, y: 28.5 },
  { n: 4, x: 52, y: 90 },
];
const ISSUES = [
  { t: "No hierarchy", d: "Fleet, unit, project and year on one page" },
  { t: "A grid of codes", d: "100 cells of IDs and letters" },
  { t: "Undefined numbers", d: '"Rank #33", "Total Cycles 1,225.5 (6)"' },
  { t: "Misleading charts", d: "Negative down-load, axis starting at 12" },
];

function AnnotatedLegacy() {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] gap-6 md:gap-8 items-center p-6 rounded-[16px] border border-[#d4def5] bg-white">
        <div className="relative rounded-[10px] overflow-auto max-h-[400px] bg-[#2e2f31]">
          <div className="relative">
            <img src={`${P}before-full.jpg`} alt="Legacy ONSITE dashboard, annotated" loading="lazy" className="w-full h-auto" />
            {PINS.map((p, i) => (
              <span
                key={i}
                className="absolute flex items-center justify-center size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1271C4] text-white text-[12px] font-bold shadow-[0_0_0_4px_rgba(18,113,196,0.28)]"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                {p.n}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-[14px] font-medium text-[#576779]">What was wrong</p>
          {ISSUES.map((it, i) => (
            <div key={it.t} className="flex items-start gap-3">
              <span className="flex items-center justify-center size-5 mt-[2px] rounded-full bg-[#1271C4] text-white text-[11px] font-bold shrink-0">{i + 1}</span>
              <div className="flex flex-col gap-[2px] min-w-0">
                <p className="text-[16px] font-medium text-[#181818]">{it.t}</p>
                <p className="text-[13px] tracking-[-0.32px] text-[#576779]">{it.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Caption>Scroll the screenshot to see the full old page. Customer names are blurred.</Caption>
    </div>
  );
}

const CHANGES = [
  { a: "Structure", b: "One dark scroll", n: "Fleet → Unit → Day" },
  { a: "Fleet", b: "10 × 10 grid of codes", n: "Status cards + map" },
  { a: "Metrics", b: "10 overlapping labels", n: "4 defined metrics" },
  { a: "Charts", b: "Negative bars, axis from 12", n: "Zero-based paired bars" },
  { a: "Access", b: "Desktop, dark only", n: "Mobile, light + dark" },
];

export default function DataDashboardUI() {
  return (
    <>
      <FloatingNav />
      <main className="bg-white text-[#181818] min-h-screen">
        <CaseStudyHero href="/work/data-dashboard-ui" alt="Key screens of the redesigned ONSITE dashboard" />

        <div className="flex flex-col gap-20 items-center px-5 sm:px-[40px] pt-20 w-full">
          {/* Title */}
          <div className="flex flex-col gap-12 w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
              <h1 className="md:col-span-8 text-[38px] sm:text-[52px] font-bold leading-[1.1] tracking-[-1px] text-[#181818] max-w-[720px]">
                Data dashboard UI
              </h1>
            </div>

            {/* Project profile */}
            <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 md:gap-x-8 gap-y-8 w-full text-[14px] leading-[1.5] tracking-[-0.25px] text-[#181818]">
              <div className="md:col-span-3 flex flex-col">
                <div className="flex flex-col gap-3 items-start">
                  <p className={label}>Delivered</p>
                  <a href="/kewazoonsite-prototype-portfolio" target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 h-12 px-4 rounded-[4px] bg-[rgba(223,225,227,0.5)] hover:bg-[rgba(223,225,227,0.9)] transition-colors text-[16px] font-semibold tracking-[-0.25px] text-[#181818] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1271C4]">
                    Working prototype <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
              <div className="md:col-span-3 flex flex-col gap-3">
                <p className={label}>Scope</p>
                <p>
                  UX audit<br />Information architecture<br />UX/UI, desktop + mobile<br />Data visualisation<br />Coded prototype
                </p>
              </div>
              <div className="md:col-span-3 flex flex-col gap-3">
                <p className={label}>Duration</p>
                <p>2 months<br />(2026 Sep - Oct)</p>
              </div>
              <div className="md:col-span-3 flex flex-col gap-3">
                <p className={label}>Role</p>
                <p>Sole product designer</p>
              </div>
            </div>
          </div>

          {/* Story */}
          <div className="flex flex-col gap-14 pb-16 w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-8 flex flex-col gap-3">
              <p className={body}>
                KEWAZO ONSITE is a data dashboard that tracks how LIFTBOT (the company&apos;s robotic lifting system) is used across construction and refinery sites.
              </p>
              <p className={body}>
                Sales and Customer Success teams rely on ONSITE to understand how actively each customer uses their deployed robots, identify underutilised units, and inform contract renewals and expansion decisions.
              </p>
              <p className={body}>
                Yet the previous version displayed a wealth of data without clearly answering three fundamental questions:
              </p>
              <ol className={`${body} list-decimal pl-6`}>
                <li>Which units need attention?</li>
                <li>How is this unit performing?</li>
                <li>What happened on site today?</li>
              </ol>
              </div>
            </div>

            <div className="flex flex-col gap-6 w-full">
              <Summary />
              <JumpLinks />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 md:gap-8">
              <div className="md:col-start-3 md:col-span-8">
                <BeforeAfterSlider
                  before={`${P}before-top.jpg`}
                  after={`${P}after-unit.jpg`}
                  beforeAlt="Old ONSITE dashboard: dark page with a grid of unit codes and stacked reports"
                  afterAlt="New ONSITE unit view: status, utilization, location and the daily activity log"
                />
              </div>
            </div>

            <BeforeAfterPairs />

            <Block id="background" title="Background" heading="Built for the team that sells and renews the robots">
              <p>After a LIFTBOT is delivered, the question is whether it is actively used. Today, sales and customer success use ONSITE most, for account care and market research.</p>
              <SubList title="Why usage matters:">
                <li>Strong fleet usage builds a compelling case for moving a customer from a short-term to a long-term contract.</li>
                <li><b>Customer success:</b> an idle unit is an early sign that a customer needs help.</li>
                <li><b>Market insight:</b> when and where units run shows which construction schedules are coming up.</li>
              </SubList>
            </Block>

            <Block
              id="problem"
              title="Problem definition"
              heading="Every number was there but hard to read"
              media={
                <div className="flex flex-col gap-14">
                  <SubList title="From the UX audit:" after={<AnnotatedLegacy />}>
                    <li>30 fields on one scroll, no order of importance.</li>
                    <li>A fleet grid readable only with internal codes.</li>
                    <li>10 labels describing 4 real quantities.</li>
                  </SubList>
                  <SubList title="How Might We:">
                    <li>show sales and customer success, in seconds, which deployed units are active and which sit idle?</li>
                    <li>turn usage into clear evidence for moving a customer to a long-term contract?</li>
                    <li>reveal when and where each site works, so upcoming construction schedules can be read?</li>
                  </SubList>
                </div>
              }
            >
              <p>I audited every field of the old dashboard against the question sales and customer success ask first: &ldquo;Is this robot actually being used?&rdquo;</p>
            </Block>

            <Block
              id="decisions"
              title="Design decisions (1)"
              heading="Split one page into Fleet → Unit → Day"
              result="→ Any unit's day in two taps"
              media={<><DemoPair id="d1" webAlt="Clicking a unit card on the fleet page opens the unit with its daily activity log" mobileAlt="Tapping a unit card, then Daily, on mobile" /><Caption>Web: one click on a card opens the unit with today&apos;s log beside it. Mobile: tap the card, then Daily.</Caption></>}
            >
              <p>Each level answers one question: what needs attention, how is this unit doing, what happened today.</p>
            </Block>

            <Block
              title="Design decisions (2)"
              heading="Lead with status, not codes"
              result="→ Idle units stand out at a glance"
              media={<><DemoPair id="d2" webAlt="Filtering the fleet by Offline status on web" mobileAlt="Filtering the fleet by Offline status on mobile" /><Caption>Filtering by Offline leaves only the units that need a follow-up.</Caption></>}
            >
              <p>One card per unit: status in words, then utilization with the workdays behind it.</p>
            </Block>

            <Block
              title="Design decisions (3)"
              heading="Ten labels became four metrics"
              result="→ A shared metric vocabulary"
              media={<><DemoPair id="d3" webAlt="Switching units from Metric to Imperial converts every figure on the time range view" mobileAlt="Scrolling the time range totals on mobile" /><Caption>Switching Metric → Imperial converts every figure and its unit at once. On mobile, each total keeps its breakdown right under it.</Caption></>}
            >
              <p>Every figure carries its unit, period and breakdown, so the same word means the same thing on every screen.</p>
            </Block>

            <Block
              title="Design decisions (4)"
              heading="Charts start at zero"
              result="→ Moving load down is work, not a loss"
              media={<><DemoPair id="d4" webAlt="Turning on Operational days only, then zooming out the daily load chart to show more days" mobileAlt="Turning Operational days only on and off on mobile" /><Caption>&ldquo;Operational days only&rdquo; removes idle days; zooming out shows a longer period. Prototype sample data.</Caption></>}
            >
              <p>Up and down load are paired bars, not positive and negative values. A toggle hides idle days.</p>
            </Block>

            <Block
              title="Design decisions (5)"
              heading="A day you can read on a phone"
              result={<>→ &ldquo;Did it run today?&rdquo; in one glance</>}
              media={<><DemoPair id="d5" webAlt="Hovering hours on the load chart shows each hour&apos;s load on web" mobileAlt="Picking Thursday in the week strip fills the day on mobile" /><Caption>Web: hovering an hour shows its load. Mobile: picking Thursday fills the day, from total load to the hourly charts.</Caption></>}
            >
              <p>A week strip, total load first, and a 24-hour bar of when the robot ran, with battery at start and end.</p>
            </Block>

            <Block
              id="impact"
              title="Impacts and Takeaway"
              heading="From a data dump to three clear answers"
              media={
                <>
                  <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[520px] border-collapse table-fixed">
                      <thead>
                        <tr className="bg-[#f5f7fb] text-[13px] font-medium text-[#576779]">
                          <th className="text-left font-medium px-4 py-3 w-[24%]">Area</th>
                          <th className="text-left font-medium px-4 py-3">Before</th>
                          <th className="text-left font-medium px-4 py-3">After</th>
                        </tr>
                      </thead>
                      <tbody>
                        {CHANGES.map((r) => (
                          <tr key={r.a} className="border-b border-[#d4def5] text-[#181818]">
                            <td className="px-4 py-3 text-[16px]">{r.a}</td>
                            <td className="px-4 py-3 text-[16px]">{r.b}</td>
                            <td className="px-4 py-3 text-[16px] font-semibold text-[#058b8c]">{r.n}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="rounded-[16px] overflow-hidden border border-[#d4def5] mt-4">
                    <img src={`${P}grid.jpg`} alt="Key mobile screens of the redesigned dashboard" loading="lazy" className="w-full h-auto" />
                  </div>
                  <Caption>Key mobile screens. Customer and site names are placeholders.</Caption>
                </>
              }
            >
              <p>The redesign was delivered as a working prototype on desktop and mobile.</p>
            </Block>

          </div>
        </div>

        <NextProject current="/work/data-dashboard-ui" />
      </main>
    </>
  );
}

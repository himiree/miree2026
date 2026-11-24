import { caseStudies } from "../data/case-studies";

// Full-bleed hero at the very top of a case study page.
// Uses the same image as the "Next project" card on the previous page
// (from data/case-studies.ts), so the page transition lands on it seamlessly.
export default function CaseStudyHero({ href, alt = "" }: { href: string; alt?: string }) {
  const study = caseStudies.find((c) => c.href === href);
  if (!study) return null;

  return (
    <div
      data-hero-target
      className="relative w-full h-[78svh] min-h-[420px] overflow-hidden bg-[#1a1a1a]"
    >
      <img src={study.image} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
    </div>
  );
}

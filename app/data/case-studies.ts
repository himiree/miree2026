// Order of case studies for the "Next project" link at the bottom of each page.
// The last one loops back to the first. Reorder or add entries here.
// `image` should be the same file as the destination page's hero image
// (the element marked with data-hero-target), so the transition lands seamlessly.

const fb = "https://framerusercontent.com/images/";

export interface CaseStudy {
  href: string;
  title: string;
  meta: string;
  /** Shown under the title in the "Next project" section */
  tags: string[];
  image: string;
}

export const caseStudies: CaseStudy[] = [
  {
    href: "/work/official-website-renewal",
    title: "Official website full scale renewal",
    meta: "Product · Sep 2025 – Jan 2026",
    tags: ["Web Design", "UX"],
    // Same file as the homepage thumbnail, so home → case study morphs seamlessly
    image: "/project-img-2.png",
  },
  {
    href: "/work/data-dashboard-ui",
    title: "Data dashboard UI",
    meta: "Product · Sep – Oct 2026",
    tags: ["Product Design", "Data visualisation"],
    // Same file as the homepage thumbnail and this page's hero
    image: "/Project_data_dashboard/hero.jpg",
  },
];

export function getNextCaseStudy(currentHref: string): CaseStudy | null {
  if (caseStudies.length < 2) return null;
  const i = caseStudies.findIndex((c) => c.href === currentHref);
  return caseStudies[(i + 1) % caseStudies.length];
}

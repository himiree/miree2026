// Projects listed on the homepage (Figma: 260808_aumatis › Home).
// Hovering a title swaps the hero media; a `video` plays automatically while
// that title is active, otherwise the `image` is shown.
// `href` makes the title/media clickable; leave it out for work that isn't public.

export interface HomeWork {
  title: string;
  image: string;
  video?: string;
  href?: string;
  /** Shown over the media when the project has no public page */
  note?: string;
  /** One line under the titles: the problem and what this project shows */
  desc: string;
}

export const homeWork: HomeWork[] = [
  {
    title: "Website revamp",
    image: "/project-img-2.png",
    href: "/work/official-website-renewal",
    desc: "Rebuilt KEWAZO's website around the one question users arrive with: can we trust this company? Analytics-led IA and a proof-first homepage, +42% inbound enquiries.",
  },
  {
    title: "Data dashboard UI",
    image: "/project-img-1.png",
    // The video shows the dashboard unblurred; uncomment to autoplay it on hover
    // video: "/project-img-1.mp4",
    note: "Available upon request",
    desc: "Redesigned KEWAZO ONSITE, the platform customers use to see how LIFTBOT is used on site. Shows how I make dense operational data readable.",
  },
  {
    title: "360+ brand touchpoints",
    image: "/project-img-3.png",
    note: "Coming soon",
    desc: "Three years of keeping KEWAZO's brand consistent across 360+ touchpoints. Shows how I build and run a visual system as a team of one.",
  },
];

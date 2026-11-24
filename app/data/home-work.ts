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
}

export const homeWork: HomeWork[] = [
  {
    title: "Official website full scale renewal",
    image: "/project-img-2.png",
    href: "/work/official-website-renewal",
  },
  {
    title: "Robotic hoist utilisation dashboard UI",
    image: "/project-img-1.png",
    // The video shows the dashboard unblurred; uncomment to autoplay it on hover
    // video: "/project-img-1.mp4",
    note: "Available upon request",
  },
  {
    title: "360+ brand touchpoints",
    image: "/project-img-3.png",
    note: "Coming soon",
  },
];

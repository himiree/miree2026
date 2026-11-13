export interface ProjectDecision {
  number: number;
  title: string;
  desc: string;
  objectives: string[];
}

export interface ProjectDetail {
  deliverable?: { label: string; url?: string };
  duration?: string;
  impact?: string[];
  problemIntro?: string;
  problemStats?: { value: string; label: string }[];
  hmw?: string[];
  decisions?: ProjectDecision[];
  results?: { label: string; value: string }[];
  whatNext?: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  bg: string;
  image?: string;
  featured?: boolean;
  description?: string;
  detail?: ProjectDetail;
  hoverBubble?: string;
  disabled?: boolean;
}

export const projects: Project[] = [
  {
    slug: "hoist-utilisation-dashboard",
    title: "Hoist Utilisation Dashboard",
    subtitle: "Product, Sep 2026 – Oct 2026",
    hoverBubble: "Available upon request",
    disabled: true,
    category: "Web Design · UX",
    year: "2026",
    bg: "#1a1a1a",
    image: "/project-img-1.png",
    featured: true,
    description:
      "KEWAZO is a Series A-B stage B2B company combining SaaS and robotics in heavy industries. I joined as an intern and later became their first full-time visual design hire, working closely with CEO and sales team.",
    detail: {
      deliverable: { label: "Official website", url: "#" },
      duration: "5 months (2025 Sep – 2026 Jan)",
      impact: [
        "Reduced the navigation cost of user journey",
        "Sales used the website more actively as a reference",
      ],
      problemIntro:
        "In the previous website, the visitors were unable to form a credibility of the product within a short attention span. Because they couldn't find the product value easily and quickly.",
      problemStats: [
        { value: "99%", label: "First time visitors (1% returning)" },
        { value: "65%", label: "Bounce rate of the landing page" },
        { value: "20%", label: "Most frequent flow: Entering → About company" },
      ],
      hmw: [
        "Create a first touchpoint that builds trust and credibility?",
        "Guide stakeholders through clear, digestible information?",
        "Achieve all of the above by reflecting the brand identity?",
      ],
      decisions: [
        {
          number: 1,
          title: "Restructure the User Flow",
          desc: "Prioritised case studies (proven product values) over detailed product feature explanations. By putting the Case Studies section at the beginning of the landing page, visitors can quickly anchor the product value — which is our most powerful sales message.",
          objectives: [
            "Reduced bounce rate of the landing page by 10%",
            "Shift user flow to Case Studies (instead of About Company) to reduce navigation costs",
          ],
        },
        {
          number: 2,
          title: "Tiered CTA button structure",
          desc: "Designed tiered buttons based on visitor engagement level. This reduced pressure on first-time visitors and supported progressive disclosure step by step, rather than pushing 'Request a quote' at every section.",
          objectives: [
            "Increase the amount of clicks on CTA buttons",
            "Increase DocSend entering",
          ],
        },
        {
          number: 3,
          title: "Grouping features and services as a carousel",
          desc: "Key features were grouped into a single scannable section. This reduced overloaded scroll length and enables quick comprehension while scrolling.",
          objectives: [
            "Increase scroll depth",
            "Increase the completion rate of the Product page",
          ],
        },
        {
          number: 4,
          title: "Making case studies compelling to watch",
          desc: "Case studies are presented as a slideshow format with full-bleed video and clear ROI highlights. Detailed reports are linked out via DocSend, allowing viewers to go deeper while enabling the team to collect leads.",
          objectives: [
            "Increase page dwell time over 1m 30s",
            "Increase DocSend entering",
          ],
        },
      ],
      results: [
        { label: "Top page views", value: "1) Landing  2) Product  3) Case Study" },
        { label: "Average Session Duration", value: "2m 51s → 4m 8s" },
      ],
      whatNext:
        "While I led the website's structural and visual design, final content decisions were made in collaboration with leadership. The next step would be to better understand visitor behaviour, identify potential customers through their interactions with the website, and connect these insights to the sales process.",
    },
  },
  {
    slug: "official-website-renewal",
    title: "Official website full scale renewal",
    subtitle: "Product, September 2025 – January 2026",
    category: "Motion · Branding",
    year: "2025",
    bg: "#e8e3dc",
    image: "/project-img-2.png",
    description:
      "Built a cohesive visual identity system spanning over 360 brand touchpoints — from digital assets and motion guidelines to print materials and environmental design.",
    detail: {
      deliverable: { label: "Brand guidelines", url: "#" },
      duration: "3 months (2025 Mar – May)",
      impact: [
        "Brand recognition improved across all touchpoints",
        "Reduced design production time by 40% through systematic tokens",
      ],
      hmw: [
        "Create a system flexible enough for diverse contexts?",
        "Ensure consistency without sacrificing creative expression?",
      ],
      decisions: [
        {
          number: 1,
          title: "Design token architecture",
          desc: "Built a layered token system (global → semantic → component) that ensures visual consistency while allowing contextual flexibility across all brand applications.",
          objectives: [
            "Single source of truth for all brand colours and typography",
            "Enable rapid iteration without breaking visual cohesion",
          ],
        },
        {
          number: 2,
          title: "Motion language framework",
          desc: "Defined easing curves, duration scales and choreography principles so animations feel intentional and brand-consistent rather than decorative.",
          objectives: [
            "Increase perceived product quality through motion",
            "Reduce motion design decision time",
          ],
        },
      ],
      whatNext:
        "The system is designed to scale. Next steps include extending the token library to cover dark mode and creating interactive documentation for the design team.",
    },
  },
  {
    slug: "360-brand-touchpoints",
    title: "360+ brand touchpoints",
    subtitle: "Brand, October 2023 – October 2026",
    hoverBubble: "Coming soon",
    disabled: true,
    category: "Product Design",
    year: "2025",
    bg: "#d4dce8",
    image: "/project-img-3.png",
    description:
      "End-to-end UX redesign of a B2B SaaS mobile application, focusing on reducing task completion time and improving onboarding for new field workers.",
    detail: {
      deliverable: { label: "iOS & Android app", url: "#" },
      duration: "4 months (2025 Jan – Apr)",
      impact: [
        "Task completion time reduced by 32%",
        "Onboarding drop-off reduced from 68% to 41%",
      ],
      hmw: [
        "Design for users with limited digital literacy?",
        "Balance power-user efficiency with new-user clarity?",
      ],
      decisions: [
        {
          number: 1,
          title: "Progressive onboarding",
          desc: "Replaced the front-loaded setup flow with a contextual, step-by-step onboarding that teaches users through real tasks rather than tutorials.",
          objectives: [
            "Reduce onboarding drop-off rate",
            "Increase feature discovery within first week",
          ],
        },
      ],
      whatNext:
        "Planning a longitudinal study tracking user behaviour 6 months post-launch to validate the redesign's impact on retention.",
    },
  },
  {
    slug: "editorial-design",
    title: "Editorial Layout System",
    subtitle: "Print · Editorial, 2024",
    category: "Print · Editorial",
    year: "2024",
    bg: "#e8dcd4",
    description:
      "Designed a modular editorial layout system for a quarterly print publication, establishing grid structures, typographic scales, and production guidelines.",
    detail: {
      deliverable: { label: "Print publication", url: "#" },
      duration: "2 months (2024 Jun – Jul)",
      impact: [
        "Layout production time cut by 50% per issue",
        "Visual consistency achieved across 80+ pages",
      ],
      decisions: [
        {
          number: 1,
          title: "Modular grid system",
          desc: "Developed a flexible 12-column grid with predefined layout modules covering full-bleed, two-column, and pull-quote configurations.",
          objectives: [
            "Enable non-designers to lay out pages reliably",
            "Maintain editorial flexibility within consistent structure",
          ],
        },
      ],
      whatNext:
        "Exploring a digital companion that adapts the print layout system for long-form web reading.",
    },
  },
  {
    slug: "dashboard-ui",
    title: "Analytics Dashboard UI",
    subtitle: "Web Design · UI, 2024",
    category: "Web Design · UI",
    year: "2024",
    bg: "#dce8d4",
    description:
      "Designed a data-dense analytics dashboard that makes complex operational metrics understandable at a glance for non-technical stakeholders.",
    detail: {
      deliverable: { label: "Web dashboard", url: "#" },
      duration: "6 weeks (2024 Sep – Oct)",
      impact: [
        "Report generation time reduced from 2 hours to 15 minutes",
        "Stakeholder meeting prep simplified significantly",
      ],
      decisions: [
        {
          number: 1,
          title: "Information hierarchy",
          desc: "Structured data into three levels: summary KPIs, trend charts, and drill-down tables — matching how stakeholders naturally scan for insight.",
          objectives: [
            "Surface key metrics within 5 seconds of page load",
            "Reduce support requests about data interpretation",
          ],
        },
      ],
      whatNext:
        "Planning to add personalised dashboard views and automated anomaly highlighting based on user role.",
    },
  },
  {
    slug: "motion-reel",
    title: "2024 Motion Design Reel",
    subtitle: "Motion · Video, 2024",
    category: "Motion · Video",
    year: "2024",
    bg: "#d4d4e8",
    description:
      "A curated collection of motion work from 2024 — UI micro-interactions, brand animations, and video transitions built for web and product contexts.",
    detail: {
      deliverable: { label: "Motion reel", url: "#" },
      duration: "Ongoing (2024)",
      impact: [
        "Used as a sales tool in 10+ client pitches",
        "Led to 3 new motion design contracts",
      ],
      decisions: [
        {
          number: 1,
          title: "Narrative pacing",
          desc: "Edited the reel to build from subtle UI micro-interactions to full brand motion sequences, demonstrating range while maintaining a coherent visual voice.",
          objectives: [
            "Demonstrate versatility across motion contexts",
            "Keep viewer attention for the full 90 seconds",
          ],
        },
      ],
      whatNext:
        "Planning a 2025 reel with interactive web-based playback, allowing viewers to filter by project type.",
    },
  },
];

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  // The ONSITE prototype is a static build that expects to live at the site root;
  // its files sit in public/onsite and these rewrites serve them at the paths it uses.
  // Old prototype addresses forward to the prefixed ones
  async redirects() {
    return ["fleet", "unit", "daily", "range"].map((p) => ({
      source: `/${p}`,
      destination: `/kewazoonsite-prototype-portfolio/${p}`,
      permanent: false,
    }));
  },
  async rewrites() {
    return [
      // The address bar keeps this prefix; the prototype's history is patched to read
      // and write it, so the app itself still sees /fleet, /unit, /daily and /range.
      { source: "/kewazoonsite-prototype-portfolio", destination: "/onsite/fleet.html" },
      { source: "/kewazoonsite-prototype-portfolio/fleet", destination: "/onsite/fleet.html" },
      { source: "/kewazoonsite-prototype-portfolio/unit", destination: "/onsite/unit.html" },
      { source: "/kewazoonsite-prototype-portfolio/daily", destination: "/onsite/daily.html" },
      { source: "/kewazoonsite-prototype-portfolio/range", destination: "/onsite/range.html" },
      { source: "/kewazoonsite-prototype-portfolio/:path*", destination: "/onsite/:path*" },
      { source: "/assets/:path*", destination: "/onsite/assets/:path*" },
      { source: "/__l5e/:path*", destination: "/onsite/__l5e/:path*" },
      { source: "/~flock.js", destination: "/onsite/~flock.js" },
    ];
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

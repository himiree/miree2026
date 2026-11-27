import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  // The ONSITE prototype is a static build that expects to live at the site root;
  // its files sit in public/onsite and these rewrites serve them at the paths it uses.
  async rewrites() {
    return [
      { source: "/fleet", destination: "/onsite/fleet.html" },
      { source: "/unit", destination: "/onsite/unit.html" },
      { source: "/daily", destination: "/onsite/daily.html" },
      { source: "/range", destination: "/onsite/range.html" },
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

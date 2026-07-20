import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  async rewrites() {
    const rules: { source: string; destination: string }[] = [
      // Tina admin SPA entry (static file in /public/admin)
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
      {
        source: "/admin/",
        destination: "/admin/index.html",
      },
    ];

    // Dev-only: same-origin proxy → local Tina filesystem GraphQL.
    // Browser calls /api/tina-graphql on :3000; Next forwards to :4001.
    // This avoids content.tinajs.io and CORS issues while editing locally.
    if (isDev) {
      rules.unshift({
        source: "/api/tina-graphql",
        destination: "http://localhost:4001/graphql",
      });
    }

    return rules;
  },
};

export default nextConfig;

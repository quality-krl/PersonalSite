
import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",

  cacheComponents: false,

  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  ...(isGitHubPages
    ? {
        basePath: "/PersonalSite",
      }
    : {}),
};

export default nextConfig;

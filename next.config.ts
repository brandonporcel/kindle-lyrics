import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/wikipedia/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "aaah0mnbncqtinas.public.blob.vercel-storage.com",
        port: "",
        pathname: "**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "**",
        search: "",
      },
      { hostname: "img.clerk.com" },
      { hostname: "www.picclickimg.com" },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";
const backendUrl = process.env.BACKEND_URL;

// Parse hostname and protocol from the env
const url = new URL(backendUrl as string);

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: "/upload/:path*",
        destination: `${backendUrl}/upload/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
        port: url.port || undefined,
        pathname: "/upload/**",
      } satisfies import("next/dist/shared/lib/image-config").RemotePattern,
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/kitaplar",
        destination: "/mufredat-kitaplari",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "coffeemanga.io" }],
  },
};

module.exports = nextConfig;

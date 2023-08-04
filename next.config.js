/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "coffeemanga.io" }],
  },
};

module.exports = nextConfig;

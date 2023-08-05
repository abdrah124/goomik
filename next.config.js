/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "coffeemanga.io" }],
  },
  env: {
    BASEPATH: process.env.BASEPATH,
    BASESCRAPTURL: process.env.BASESCRAPTURL,
  },
};

module.exports = nextConfig;

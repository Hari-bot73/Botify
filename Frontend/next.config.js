/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 👈 replaces next export
  images: {
    unoptimized: true, // 👈 needed for static export
  },
};

module.exports = nextConfig;

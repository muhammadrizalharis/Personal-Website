/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build a self-contained server for small Docker images.
  // Vercel ignores this and uses its own build pipeline.
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;

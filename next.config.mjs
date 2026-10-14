/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build a self-contained server for small Docker images.
  // Vercel ignores this and uses its own build pipeline.
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  // Sertakan folder sertifikat ke dalam serverless function saat deploy ke
  // Vercel. Tanpa ini, fs.readdirSync("public/certificates") gagal di runtime
  // Vercel (folder public/ tidak ikut ke dalam lambda) sehingga galeri kosong.
  experimental: {
    outputFileTracingIncludes: {
      "/": ["./public/certificates/**/*"],
    },
  },
};

export default nextConfig;

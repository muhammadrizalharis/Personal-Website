/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build a self-contained server for small Docker images.
  // Vercel ignores this and uses its own build pipeline.
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  // Sertakan folder sertifikat (termasuk thumbnail .thumbs) ke dalam serverless
  // function saat deploy ke Vercel. Tanpa ini, fs.readdir/readFile atas
  // public/certificates gagal di runtime Vercel (folder public/ tidak ikut ke
  // dalam lambda) sehingga galeri & thumbnail kosong. Folder .thumbs ditulis
  // eksplisit karena glob default melewatkan direktori berawalan titik.
  outputFileTracingIncludes: {
    "/": [
      "./public/certificates/**/*",
      "./public/certificates/.thumbs/**/*",
    ],
    "/api/certificates/[file]": [
      "./public/certificates/**/*",
      "./public/certificates/.thumbs/**/*",
    ],
  },
};

export default nextConfig;

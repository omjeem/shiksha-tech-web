/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',  // Use 'export' for static site generation (commented for now)
  // distDir: 'out',   // Output directory (commented for now)
  // trailingSlash: true,  // Add trailing slashes for better compatibility (commented for now)
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // unoptimized: true,  // Required for static export (commented for now)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

module.exports = nextConfig 
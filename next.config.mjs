/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Gemini + live web search can exceed the 30s default dev proxy timeout.
  experimental: {
    proxyTimeout: 180000,
  },
  // In development, FastAPI runs on :8000. On Vercel, api/index.py is deployed as a Python function at /api/*.
  async rewrites() {
    if (process.env.NODE_ENV !== 'development') return []
    return [{ source: '/api/:path*', destination: 'http://127.0.0.1:8000/api/:path*' }]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          { key: 'Permissions-Policy', value: 'microphone=(self), camera=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig

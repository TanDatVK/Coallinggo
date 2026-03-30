/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    basePath: '/coallingo',
    images: {
        unoptimized: true,
    },
}

module.exports = nextConfig

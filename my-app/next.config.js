/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

// before 
module.exports = nextConfig

// after
// module.exports = {
//   experimental: {
//     forceSwcTransforms: true,
//   },
// }  
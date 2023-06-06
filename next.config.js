/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

}
module.exports = {
  nextConfig,
  env: {
    HOME_URL: process.env.HOME_URL,
  },
}

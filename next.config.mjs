/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@better-auth/kysely-adapter']
  },
  /* config options here */
  reactCompiler: true,


};

export default nextConfig;
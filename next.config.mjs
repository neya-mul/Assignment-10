/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,

  experimental:{
    serverComponentsExternalPackages:['@better-auth/kysely-adapter']
  },
};

export default nextConfig;
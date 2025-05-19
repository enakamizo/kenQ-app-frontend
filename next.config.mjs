/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/projects-list',
        destination: 'https://app-advanced3-1-cgghbjavdyhdbfeb.canadacentral-01.azurewebsites.net/projects-list',
      },
    ];
  },
}

export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/projects-list',
        //destination: 'https://app-kenq-1-azf7d4eje9cgaah2.canadacentral-01.azurewebsites.net/projects-list',
        destination: `${process.env.NEXT_PUBLIC_AZURE_API_URL}/projects-list`,
      },
    ];
  },
}

export default nextConfig;

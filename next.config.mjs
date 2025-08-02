/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  //async rewrites() {
      //  return [
      //{
      //  source: '/api/projects-list',
      //  destination: `https://app-kenq-1-azf7d4eje9cgaah2.canadacentral-01.azurewebsites.net/projects-list`,
      //},
      //{
      //  source: '/api/ai-diagnosis',
      //  destination: `https://app-kenq-1-azf7d4eje9cgaah2.canadacentral-01.azurewebsites.net/ai-diagnosis`,
      //},
      //{
      // source: '/api/confirm-form',
      //  destination: `https://app-kenq-1-azf7d4eje9cgaah2.canadacentral-01.azurewebsites.net/confirm-form`,
      //},
    //];
  //},
}

export default nextConfig;

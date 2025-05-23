/** @type {import('next').NextConfig} */
const nextConfig = {
  // 配置选项
  async redirects() {
    return [
      {
        source: '/app/:path*',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
  // 添加配置以解决目录结构问题
  distDir: 'app/.next',
};

module.exports = nextConfig;

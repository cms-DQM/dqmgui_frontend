const withPlugins = require('next-compose-plugins');
const bundleAnalyzer = require('@next/bundle-analyzer');

const nextConfig = {
  useFileSystemPublicRoutes: true,
  distDir: 'build',
};

module.exports = withPlugins([[bundleAnalyzer]], nextConfig);
module.exports = {
  env: {
    NEW_BACK_END: process.env.NEW_BACK_END,
    LUMIS: process.env.LUMIS,
    LAYOUTS: process.env.LAYOUTS,
    LATEST_RUNS: process.env.LATEST_RUNS,
    MODE: process.env.MODE,
  },
};

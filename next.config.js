const withPlugins = require('next-compose-plugins');
const sass = require('@zeit/next-sass');
const bundleAnalyzer = require('@next/bundle-analyzer');
const css = require('@zeit/next-css');
const less = require('@zeit/next-less');

const nextConfig = {
  useFileSystemPublicRoutes: true,
  distDir: 'build',
};

module.exports = withPlugins(
  [[sass], [css], [less], [bundleAnalyzer]],
  nextConfig
);

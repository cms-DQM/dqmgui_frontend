const withPlugins = require('next-compose-plugins');
const bundleAnalyzer = require('@next/bundle-analyzer');

const nextConfig = {
  useFileSystemPublicRoutes: true,
  distDir: 'build',
};

const isProd = process.env.NODE_ENV === 'production'

module.exports = withPlugins([[bundleAnalyzer]], nextConfig);
module.exports = {
  env: {
    NEW_BACK_END: process.env.NEW_BACK_END,
    LUMIS: process.env.LUMIS,
    LAYOUTS: process.env.LAYOUTS,
    LATEST_RUNS: process.env.LATEST_RUNS,
    MODE: process.env.MODE,
  },
    //in production we adding a trailing slash, in dev not. 
    //in prod when we requesting plotsLocalOverlay page
    //browser automatically adding / xx before question mark
    //in this way our plotLocalOverlay page after refresh is redirected to directory where we can see index.html file path
    // but it's not uploading the page we need - plotLocalOverlay/index.html
    //This problem exists because we have dynamic basePath. Which is made by import getPathName() func from /components/utils'
  assetPrefix: './',
    // For all pages pages (except pages/index.html) is necessary edit paths from './' to '../' in  minimised file in out/[page]/index.html
    //because otherwise system will try to find js and css files by path basePath/[page]/*.css| *.js because ff assetPrefix shows to './'
    // but these files are in basePath/(*.css | .*js)
  trailingSlash: isProd ? true : false,
};

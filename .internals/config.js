const path = require('path');
const { override, useBabelRc, addWebpackAlias, addBundleVisualizer } = require('customize-cra');

module.exports = {
  webpack: override(
    useBabelRc(),
    addWebpackAlias({
      '~': path.resolve(__dirname, '..'),
      '@containers': path.resolve(__dirname, '../src/containers'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@api': path.resolve(__dirname, '../src/api'),
      '#': path.resolve(__dirname, '../src')
    }),
    addBundleVisualizer({}, true)
  ),
  paths: (paths) => {
    paths.appBuild = path.resolve(__dirname, '..', process.env.REACT_APP_OUTPUT_PATH || 'build');

    return paths;
  },
};

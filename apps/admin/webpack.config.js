const nrwlConfig = require("@nrwl/react/plugins/webpack.js")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = (config, context) => {
  nrwlConfig(config)
  return {
    ...config,
    node: { global: true, fs: 'empty' },
    plugins: process.env.ANALYZE ? [
      ...config.plugins,
      new BundleAnalyzerPlugin({ analyzerMode: 'static' })
    ] : config.plugins
  }
}

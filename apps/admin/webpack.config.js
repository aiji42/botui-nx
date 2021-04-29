const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = (config, context) => {
  if (process.env.ANALYZE) {
    return {
      ...config,
      plugins: [
        ...config.plugins,
        new BundleAnalyzerPlugin({ analyzerMode: 'static' })
      ]
    }
  }

  return config
}
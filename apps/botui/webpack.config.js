const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = (config) => {
  const plugins = process.env.ANALYZE ? [
      ...config.plugins,
      new BundleAnalyzerPlugin({ analyzerMode: 'static' })
    ] : config.plugins
  return {
    ...config,
    output: {
      library: 'Botui',
      libraryTarget: 'umd',
      filename: 'chat.min.js',
      path: config.output.path
    },
    optimization: {
      ...config.optimization,
      runtimeChunk: false
    },
    plugins
  }
}

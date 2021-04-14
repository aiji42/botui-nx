module.exports = (config) => {
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
    }
  }
}

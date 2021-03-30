const path = require('path')

module.exports = {
  mode: 'production',
  entry: [path.resolve(__dirname, 'libs/embedded/src/main.ts')],
  output: {
    library: 'BotuiChat',
    libraryTarget: 'umd',
    filename: 'chat.min.js',
    path: path.resolve(__dirname, 'dist/libs/embedded')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    fallback: { crypto: false }
  }
}
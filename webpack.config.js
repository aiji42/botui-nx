const path = require('path')

module.exports = {
  mode: 'production',
  entry: [path.resolve(__dirname, 'libs/embedded/src/main.ts')],
  output: {
    library: 'Botui',
    libraryTarget: 'umd',
    filename: 'chat.min.js',
    path: path.resolve(__dirname, 'apps/chat/public')
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
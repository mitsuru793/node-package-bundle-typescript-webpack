const path = require('path')

const basePath = __dirname

module.exports = {
  mode: 'development',
  target: 'node',
  node: {
    __dirname: false
  },
  context: path.join(basePath, 'src'),
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  entry: {
    index: './index.ts'
  },
  output: {
    libraryTarget: "commonjs2",
    path: path.join(basePath, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{ test: /.tsx?$/, loader: 'ts-loader' }]
  },
  devServer: {
    contentBase: path.join(basePath, 'dist')
  },
}

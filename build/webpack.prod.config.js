const path = require('path')

module.exports = {
  entry: './components/index.js',
  output: {
    path: path.resolve(__dirname, './'),
    filename: '../index.js',
    library: 'Vue2BaiduMap',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.ts', '...']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // {
      //   test: /\.ts$/,
      //   loader: 'ts-loader',
      //   exclude: [/node_modules/, /md/]
      // }
    ]
  }
}

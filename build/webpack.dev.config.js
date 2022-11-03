/**
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Thursday, November 3rd 2022, 2:35:16 pm
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 黑发
 */


const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: './src/main.js',
    libs: [
      'vue',
      'vue-router',
      'prismjs',
      'vue-material'
    ],
    resource: [
      'prismjs/themes/prism-tomorrow.css',
      'docs/fonts/iconfont.css'
    ],
    vendor: [
      'docs/components/App.vue',
      'docs/components/CateView.vue',
      'docs/components/DocPreview.vue',
      'docs/components/Navigator.vue',
      'docs/components/RootFrame.vue'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash:8].bundle.js',
    chunkFilename: '[name].[chunkhash:8].js'
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader'],
        exclude: [/_cache/]
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: [/node_modules/, /md/]
      },
      // {
      //   test: /\.ts$/,
      //   loader: 'ts-loader',
      //   exclude: [/node_modules/, /md/]
      // },
      {
        test: /\.md$/,
        use: ['vue-markdown-loader'],
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: ['url-loader']
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: ['url-loader']
      }
    ]
  },
  resolve: {
    alias: {
      docs: path.resolve(__dirname, '../docs'),
      src: path.resolve(__dirname, '../src'),
      '@': path.resolve(__dirname, '../src'),
      'c': path.resolve(__dirname, '../components'),
      '_c': path.resolve(__dirname, '../src/components'),
      'types': path.resolve(__dirname, '../types'),
    },
    extensions: ['.js', '.ts', '...']
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../docs/template/index.html'),
      chunks: ['libs', 'vendor', 'resource', 'main']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'libs', 'resource', 'manifest'],
      minChunks: Infinity
    }),
    new InlineManifestWebpackPlugin({
      name: 'webpackManifest'
    })
  ]
}

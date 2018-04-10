var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const fs = require('fs')

const CopyWebpackPlugin = require('copy-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')

let pagePlugins = []
const htmlPath = './src/html'
const jsPath = './src/js'
let jsFiles = fs.readdirSync(path.resolve(__dirname, jsPath))
let appEntrys = {}
let entryNames = ['index']
for (let jsFile of jsFiles) {
  if (jsFile.endsWith('.js')) {
    const entryName = jsFile.slice(0, -3) ;
    appEntrys[entryName] = jsPath + '/' + jsFile
    entryNames.push(entryName)
  }
}
let htmlPages = fs.readdirSync(path.resolve(__dirname, htmlPath))
for (let fileName of htmlPages) {
  if (fileName.endsWith('.html')) {
    let entryName = fileName.slice(0, -5)
    let copyedEntryNames = [].concat(entryNames)
    let entryIndex = copyedEntryNames.indexOf(entryName) ;
    copyedEntryNames.splice(entryIndex, 1) 
    let plugin = new HtmlWebpackPlugin({
      title: fileName,
      filename: 'html/' + fileName,
      template: htmlPath + '/' + fileName,
      excludeChunks: copyedEntryNames
    })
    pagePlugins.push(plugin);
  }
}
module.exports = {
  entry: {
    index: "./index.js",
    ...appEntrys
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].bundle.js"
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: "babel-loader",
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.styl$/,
      use: ['style-loader', 'css-loader', 'stylus-loader']
    }]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'JS实战平台',
      filename: 'index.html',
      template: './index.html',
      chunks: ['index']
    }),
    ...pagePlugins,
    new CopyWebpackPlugin([{
      from: './src/assert/**',
      to: 'assert',
      toType:'dir',
      flatten: true,
      cache: true
    }])
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "src"),
    publicPath: "/",
    host: "localhost",
    hot: true,
    inline: true,
    compress: true,
    port: 9000,
    open: 'html/layout.html'
  }
}
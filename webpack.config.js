var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const fs = require('fs')

// const CopyWebpackPlugin = require('copy-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')

let pagePlugins = []
const htmlPath = './src/html'
let htmlPages = fs.readdirSync(path.resolve(__dirname, htmlPath))
for (let fileName of htmlPages) {
  if(fileName.endsWith('.html')) {
    let plugin = new HtmlWebpackPlugin({
      title: fileName,
      filename: 'html/' + fileName,
      template: htmlPath + '/' + fileName,
      excludeChunks: ['index']
    })
    pagePlugins.push(plugin);
  }
}

module.exports = {
  entry: {
    index: "./index.js",
    app: './src/app.js'
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
    ...pagePlugins
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    host: "localhost",
    hot: true,
    inline: true,
    compress: true,
    port: 9000
  }
}
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    index: "./index.js",
    app: './src/app.js'
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].[hash:5].bundle.js"
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: "babel-loader",
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'JS实战平台',
      filename: 'index.html',
      template: './index.html',
      chunks:['index']
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    host: "localhost",
    compress: true, //compress html5
    port: 9000
  }
}
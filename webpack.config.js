var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack');
const fs = require('fs')

let pagePlugins = []
const htmlPath = './src/html'
let htmlPages = fs.readdirSync(path.resolve(__dirname, htmlPath))
for (fileName of htmlPages) {
  // console.log(fileName) ;
  // if(fileName)
  let plugin = new HtmlWebpackPlugin({
    title: fileName,
    filename: 'html/' + fileName,
    template: htmlPath + '/' + fileName,
    excludeChunks: ['index']
  })
  pagePlugins.push(plugin) ;
}

// pagePlugins.push(new )

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
    },{
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
      chunks:['index']
    }),
    ...pagePlugins
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, './src/html'),
    //     to: 'html',
    //     ignore: ['.*']
    //   }
    // ])
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    host: "localhost",
    hot: true,
    inline: true,
    compress: true, //compress html5
    port: 9000
  }
}
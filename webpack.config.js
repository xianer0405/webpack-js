var path = require('path');
module.exports = {
	entry: "./index.js",
	output: {
		path: __dirname,
		filename: "./dist/bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	},
	resolve: {
    extensions: ['.js']
  }
}

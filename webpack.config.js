const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	output: {
		path: path.resolve(__dirname, 'build'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'www', 'index.html'),
		}),
	],
}

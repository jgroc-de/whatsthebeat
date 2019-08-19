const path = require("path")
const MinifyPlugin = require("babel-minify-webpack-plugin");

let config = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "./bundle.js"
  },
  plugins: [
    new MinifyPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./public"),
    historyApiFallback: true,
    inline: true,
    open: true,
    hot: true
  },
  devtool: "eval-source-map",
}

module.exports = config

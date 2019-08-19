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
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
}

module.exports = config

const path = require("path")
const MinifyPlugin = require("babel-minify-webpack-plugin");

let config = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "./bundle.js"
  },
}
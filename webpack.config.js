const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  output: {
    path: __dirname + "/dist",
    library: "SpineRender",
    libraryTarget: "window",
    filename: "SpineRenderer.[contenthash:8].chunk.js",
  },
  devtool: "inline-source-map",
};

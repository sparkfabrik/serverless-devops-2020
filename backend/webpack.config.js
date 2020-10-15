const path = require("path");
const _ = require("lodash");
const slsw = require("serverless-webpack");

module.exports = {
  entry: slsw.lib.entries,
  resolve: {
    extensions: [".js", ".ts"],
    alias: {},
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(slsw.lib.serverless.config.servicePath, ".webpack"),
    filename: "[name].js",
    devtoolModuleFilenameTemplate: "[absolute-resource-path]",
  },
  target: "node",
  mode: "none",
  devtool: "inline-source-map",
  externals: ["aws-sdk"],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: "ts-loader",
      },
    ],
  },
};

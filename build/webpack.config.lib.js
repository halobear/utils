const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const { resolve } = require("./utils");

module.exports = merge(baseConfig, {
  mode: "production",
  output: {
    path: resolve("lib"),
    filename: "[name].js",
    library: "kuan-[name]",
    libraryTarget: "umd",
    libraryExport: "default",
    globalObject: "this",
    umdNamedDefine: true
  },
  externals: {
    axios: "axios"
  },
  mode: "production"
});

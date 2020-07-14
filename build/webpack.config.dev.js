const logger = require("@luzhongk/node-logger");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const { getHtmlPlugins } = require("./utils");

const port = 8000;

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "source-map",
  output: {
    filename: "[name].js",
    library: "kuan-[name]",
    libraryTarget: "umd",
    libraryExport: "default",
    globalObject: "this",
    umdNamedDefine: true
  },
  devServer: {
    after(app, server, compiler) {
      compiler.hooks.done.tap("webpack dev", () => {
        logger.run(port);
      });
    },
    port,
    noInfo: true // only errors & warns on hot reload
  },
  plugins: [...getHtmlPlugins()]
});

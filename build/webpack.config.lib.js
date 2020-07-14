const CopyPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.config.base')
const { resolve } = require('./utils')

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    path: resolve('lib'),
    filename: '[name].js',
    library: 'kuan-[name]',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this',
    umdNamedDefine: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'types', to: 'types' },
        { from: 'package.json', to: 'package.json' },
      ],
    }),
  ],
  externals: {
    axios: 'axios',
  },
  mode: 'production',
})

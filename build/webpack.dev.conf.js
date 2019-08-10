const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const config = require('./config');
const { resolve } = require('./utils');
const baseConfig = require('./webpack.base.conf');
const { getCssLoaders } = require('./utils');

const devConfig = merge(baseConfig, {
  devServer: config.devServer,
  module: {
    rules: getCssLoaders(),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {
        from: resolve('src/public'),
        to: resolve(`dist/${config[process.env.BUILD_ENV].SUB_DIR}`),
        ignore: ['.*'],
      },
    ]),
  ],
});

<% if(esLint){ -%>
  devConfig.module.rules.unshift({
    test: /\.(js|jsx)$/,
    use: {
      loader: 'eslint-loader',
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    },
    include: [resolve('src')],
    exclude:[resolve('src/assets')],
    enforce: 'pre'
  })
  <%} -%>

module.exports = devConfig;

const webpack = require('webpack');
const friendlyFormatter = require('eslint-friendly-formatter');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');
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
    new ReactRefreshWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve('src/public'),
          to: resolve(`dist/${config[process.env.BUILD_ENV].SUB_DIR}`),
        },
      ],
    }),
  ],
});

<% if(esLint){ -%>
  devConfig.module.rules.unshift({
    test: /\.(js|jsx)$/,
    use: {
      loader: 'eslint-loader',
      options: {
        formatter: friendlyFormatter,
      },
    },
    include: [resolve('src')],
    exclude: [resolve('src/assets')],
    enforce: 'pre',
  })
  <%} -%>

module.exports = devConfig;

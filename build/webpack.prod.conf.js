const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssnano = require('cssnano');
const chalk = require('chalk');
const config = require('./config');
const { resolve, subDir } = require('./utils');
const baseConfig = require('./webpack.base.conf');
const { getCssLoaders } = require('./utils');

// const autoAddDllRes = () =>
//   new AddAssetHtmlPlugin([
//     {
//       publicPath: `${
//         config[process.env.BUILD_ENV].PUBLIC_PATH + config[process.env.BUILD_ENV].SUB_DIR
//       }/dll/css`, // 注入到html中的路径
//       outputPath: subDir('dll/css'), // 最终输出的目录
//       filepath: resolve('src/assets/dll/**/*.css'),
//       includeSourcemap: false,
//       typeOfAsset: 'css',
//     },
//     {
//       publicPath: `${
//         config[process.env.BUILD_ENV].PUBLIC_PATH + config[process.env.BUILD_ENV].SUB_DIR
//       }/dll/js`, // 注入到html中的路径
//       outputPath: subDir('dll/js'), // 最终输出的目录
//       filepath: resolve('src/assets/dll/**/*.js'),
//       includeSourcemap: false,
//       typeOfAsset: 'js',
//     },
//   ]);
const buildConfig = merge(baseConfig, {
  output: {
    filename: subDir('js/[name].[contenthash:8].js'),
    chunkFilename: subDir('js/[name].[contenthash:8].js'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'async',
          test: /[\\/]src[\\/]/,
          minChunks: 2,
          minSize: 30000,
          priority: -10,
          reuseExistingChunk: true,
        },
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 10,
        },
        ui: {
          name: 'ui',
          test: /[\\/]node_modules[\\/](antd|@ant-design|rc-.*|tinycolor2|async-validator)/,
          chunks: 'all',
          priority: 20,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: {
      name: 'manifest',
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessor: cssnano,
        cssProcessorOptions: {
          discardComments: { removeAll: true },
        },
        canPrint: true,
      }),
    ],
  },
  module: {
    rules: getCssLoaders(),
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new webpack.DllReferencePlugin({
    //   manifest: require('./ui.dll.manifest.json'),
    // }),
    // new webpack.DllReferencePlugin({
    //   manifest: require('./vendor.dll.manifest.json'),
    // }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve('src/public'),
          to: resolve(`dist/${config[process.env.BUILD_ENV].SUB_DIR}`),
        },
        // {
        //   from: resolve('src/assets/dll/fonts'),
        //   to: resolve(`dist/${config[process.env.BUILD_ENV].SUB_DIR}/dll/css/fonts/`),
        // },
      ],
    }),
    // ...[autoAddDllRes()],
    new MiniCssExtractPlugin({
      filename: subDir('css/[name].[contenthash:8].css'),
      chunkFilename: subDir('css/[name].[contenthash:8].css'),
    }),
    new ProgressBarPlugin({
      format: `  build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
    }),
  ],
});
if (config.buildDetail) {
  buildConfig.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerPort: 8899,
    })
  );
}
module.exports = buildConfig;

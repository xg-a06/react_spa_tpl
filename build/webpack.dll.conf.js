const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const cssnano = require('cssnano')
const path = require('path')
const chalk = require('chalk')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: resolve('.'),
  mode: 'production',
  entry: {
    vendor: [
      'react',
      '@hot-loader/react-dom',
      'react-router-dom',
      'redux',
      'react-redux',
      'axios'
    ],
    ui: ['antd', 'antd/dist/antd.min.css']
    // ui: ['antd/es/button', 'antd/dist/antd.min.css'],
  },
  output: {
    filename: 'js/[name].[contenthash:8].dll.js',
    path: resolve('src/assets/dll'),
    library: '[name]',
    libraryTarget: 'window'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader' }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: 'fonts'
        }
      }
    ]
  },
  optimization: {
    minimizer: [
      new ParallelUglifyPlugin({
        cacheDir: '.cache/dll/',
        uglifyJS: {
          output: {
            comments: false,
            beautify: false
          },
          compress: {
            drop_console: false,
            collapse_vars: true,
            reduce_vars: true
          }
        }
      }),
      // new OptimizeCssAssetsPlugin({
      //   cssProcessor: cssnano,
      //   cssProcessorOptions: {
      //     discardComments: { safe: true,removeAll: true }
      //   },
      //   canPrint: true
      // })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    new webpack.DllPlugin({
      name: '[name]',
      path: resolve('build/[name].dll.manifest.json')
    }),
    new ProgressBarPlugin({
      format:
        '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    })
  ]
}

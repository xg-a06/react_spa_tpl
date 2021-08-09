const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('./config')

function resolve (dir) {
  return path.resolve(__dirname, '..', dir)
}

function subDir (dir) {
  return path.posix.join(config[process.env.BUILD_ENV].SUB_DIR, dir)
}

function getCssLoaders () {
  const env = process.env.NODE_ENV;
  const build = process.env.BUILD_ENV;
  const isLocal = build === 'local';
  const isProd = env === 'production';
  const sourceMap = !isProd;
  const lastLoader = isLocal ? 'style-loader' : MiniCssExtractPlugin.loader
  const lastLoaderOptions = isLocal ? {} : { sourceMap }
  const cssInclude = [/src/]
  const loaders = [
    {
      test: /\.css$/,
      use: [
        { loader: lastLoader },
        {
          loader: 'css-loader'
        }
      ],
      include: resolve('node_modules')
    },
    {
      test: /\.global\.css$/,
      use: [
        { loader: lastLoader },
        {
          loader: 'css-loader'
        },
        {
          loader: 'postcss-loader'
        }
      ]
    },
    {
      test: /^(?!.*\.global).*\.css$/,
      use: [
        { loader: lastLoader, options: lastLoaderOptions },
        {
          loader: 'css-loader',
          options: { modules: { localIdentName: '[hash:base64:6]' }, sourceMap, importLoaders: 1 }
        },
        { loader: 'postcss-loader', options: { sourceMap } }
      ],
      include: cssInclude
    }
    <% if (css === 'sass') {
      -%>, {
        test: /\.global\.scss$/,
        use: [
          { loader: lastLoader, options: lastLoaderOptions },
          {
            loader: 'css-loader',
            options: { sourceMap, importLoaders: 2 }
          },
          { loader: 'postcss-loader', options: { sourceMap } },
          { loader: 'sass-loader', options: { sourceMap } }
        ],
        include: resolve('src')
      },
        {
          test: /^(?!.*\.global).*\.scss$/,
          use: [
            { loader: lastLoader, options: lastLoaderOptions },
            {
              loader: 'css-loader',
              options: { modules: { localIdentName: '[hash:base64:6]' }, sourceMap, importLoaders: 2 }
            },
            { loader: 'postcss-loader', options: { sourceMap } },
            { loader: 'sass-loader', options: { sourceMap } }
          ],
          include: cssInclude
        }
        <%} -%>
    <% if (css === 'less') {
    -%>, {
      test: /\.global\.less$/,
      use: [
        { loader: lastLoader, options: lastLoaderOptions },
        {
          loader: 'css-loader',
          options: { sourceMap, importLoaders: 2 }
        },
        { loader: 'postcss-loader', options: { sourceMap } },
        { loader: 'less-loader', options: { sourceMap } }
      ],
      include: resolve('src')
    },
      {
        test: /^(?!.*\.global).*\.less$/,
        use: [
          { loader: lastLoader, options: lastLoaderOptions },
          {
            loader: 'css-loader',
            options: { modules: { localIdentName: '[hash:base64:6]' }, sourceMap, importLoaders: 2 }
          },
          { loader: 'postcss-loader', options: { sourceMap } },
          { loader: 'less-loader', options: { sourceMap } }
        ],
        include: cssInclude
      }
      <%} -%>
  ]
  return loaders
}

module.exports = {
  resolve,
  subDir,
  getCssLoaders
}

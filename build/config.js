const path = require('path');

const config = {
  buildDetail: false,
  devServer: {
    contentBase: path.resolve('dist'),
    useLocalIp:true,
    host:'0.0.0.0',
    port: 2333,
    open: true,
    hot: true,
    overlay: {
      errors: true,
      warnings: false,
    },
    historyApiFallback: {
      disableDotRule: true,
    },
    proxy: {
      '/xxx': {
        target: 'http://xxx.com',
        changeOrigin: true,
        pathRewrite: {
          '^/xxx': '/',
        },
      },
    },
  },
  local: {
    API_PATH: '/api',
    SUB_DIR: 'static',
    PUBLIC_PATH: '/',
  },
  dev: {
    API_PATH: '/api',
    SUB_DIR: 'static',
    PUBLIC_PATH: '/',
  },
  test: {
    API_PATH: '/api',
    SUB_DIR: 'static',
    PUBLIC_PATH: '/',
  },
  prod: {
    API_PATH: '/api',
    SUB_DIR: 'static',
    PUBLIC_PATH: '/',
  },
};
module.exports = config;

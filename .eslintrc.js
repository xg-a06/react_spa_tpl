const path = require('path');

module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true,
  },
  extends: ['airbnb', "prettier"],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ['@', path.resolve('./src')],
          ['react-dom', '@hot-loader/react-dom']
        ],
        extensions: ['.js', '.jsx', '.json']
      }
    }
  },
  rules: {
    'linebreak-style': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
};

/**
 * 在上文生成的配置文件中可以使用 env 属性来指定要启用的环境，将其设置为 true，
 * 以保证在进行代码检测时不会把这些环境预定义的全局变量识别成未定义的变量而报错：
 *
 * "off" 或 0 - 关闭规则
 * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
 * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
 *
 */
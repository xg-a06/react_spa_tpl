const path = require('path');

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    parser: '@babel/eslint-parser'
  },
  plugins: ['react'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', path.resolve('./src')]],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
      }
    }
  },
  globals: {},
  rules: {
    'import/extensions': ['error', 'always', { js: 'never', ts: 'never', tsx: 'never' }],
    'import/no-extraneous-dependencies': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'react/prop-types': 0,
    'react/jsx-filename-extension': 0,
  },
};

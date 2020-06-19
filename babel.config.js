const presets = [
  [
    '@babel/preset-env',
    {
      targets: 'last 2 versions,safari >= 7,ie >= 10,chrome>=60',
      modules: false,
    },
  ],
  '@babel/preset-react',
];
const plugins = [
  ['@babel/plugin-transform-runtime', { corejs: 2 }],
  <% if (es6Env === 'stage1') { %> '@babel/plugin-proposal-export-default-from', // Stage 1
  '@babel/plugin-proposal-logical-assignment-operators',
  ['@babel/plugin-proposal-optional-chaining', { loose: false }],
  ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
  ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
  '@babel/plugin-proposal-do-expressions',
  ['@babel/plugin-proposal-decorators', { legacy: true }], // Stage 2
  '@babel/plugin-proposal-function-sent',
  '@babel/plugin-proposal-export-namespace-from',
  '@babel/plugin-proposal-numeric-separator',
  '@babel/plugin-proposal-throw-expressions',
  '@babel/plugin-syntax-dynamic-import', // Stage 3
  '@babel/plugin-syntax-import-meta',
  ['@babel/plugin-proposal-class-properties', { loose: false }],
  '@babel/plugin-proposal-json-strings',
  '@babel/plugin-proposal-object-rest-spread',
  <% } else if (es6Env === 'stage2') {  %> ['@babel/plugin-proposal-decorators', { legacy: true }], // Stage 2
  '@babel/plugin-proposal-function-sent',
  '@babel/plugin-proposal-export-namespace-from',
  '@babel/plugin-proposal-numeric-separator',
  '@babel/plugin-proposal-throw-expressions',
  '@babel/plugin-syntax-dynamic-import', // Stage 3
  '@babel/plugin-syntax-import-meta',
  ['@babel/plugin-proposal-class-properties', { loose: false }],
  '@babel/plugin-proposal-json-strings',
  '@babel/plugin-proposal-object-rest-spread',
  <% } else { %> '@babel/plugin-syntax-dynamic-import', // Stage 3
  '@babel/plugin-syntax-import-meta',
  ['@babel/plugin-proposal-class-properties', { loose: false }],
  '@babel/plugin-proposal-json-strings',
  '@babel/plugin-proposal-object-rest-spread',
  <% } %> 'react-hot-loader/babel'
];

plugins.push([
  'import',
  {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  },
]
);


module.exports = { presets, plugins };

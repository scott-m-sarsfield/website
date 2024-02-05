module.exports = {
  plugins: ['react', 'import', 'jsx-a11y', 'lodash', 'react-hooks', 'prettier'],
  extends: [
    'plugin:import/warnings',
    'plugin:import/errors',
    'plugin:jsx-a11y/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
    },
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
    jquery: true,
    node: true,
    phantomjs: true,
  },
  globals: {
    React: true,
    root: true,
    google: true,
  },
  rules: {
    'arrow-parens': ['error', 'always'],
    'block-scoped-var': 'error',
    curly: 'error',
    'default-case': 'error',
    'dot-notation': 'error',
    eqeqeq: 'error',
    'eol-last': 'error',
    'guard-for-in': 'error',
    indent: ['error', 2, { SwitchCase: 1 }],
    'jsx-quotes': 'error',
    'lodash/import-scope': ['error', 'method'],
    'lodash/prefer-get': 'error',
    'no-alert': 'error',
    'no-caller': 'error',
    'no-console': 'error',
    'no-div-regex': 'error',
    'no-else-return': 'error',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-parens': ['error', 'all', { ignoreJSX: 'all' }],
    'no-floating-decimal': 'error',
    'no-implied-eval': 'error',
    'no-iterator': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-multi-str': 'error',
    'no-nested-ternary': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-octal-escape': 'error',
    'no-proto': 'error',
    'no-restricted-globals': ['error', 'fdescribe', 'fit', 'ddescribe', 'iit'],
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-unneeded-ternary': 'error',
    'no-unused-vars': ['error', { ignoreRestSiblings: true }],
    'no-var': 'error',
    'no-void': 'error',
    'no-warning-comments': 'error',
    'no-with': 'error',
    'padded-blocks': ['error', 'never'],
    'quote-props': ['error', 'as-needed'],
    radix: 'error',
    'wrap-iife': ['error', 'inside'],
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/no-did-update-set-state': 'error',
    'react/prefer-es6-class': 'error',
    'react/prop-types': 'error',
    'react/self-closing-comp': 'error',
    'react/sort-comp': [
      'error',
      {
        order: [
          'propTypes',
          'contextType',
          'static-methods',
          'static-variables',
          'lifecycle',
          'everything-else',
          'render',
        ],
      },
    ],
    'require-await': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'prettier/prettier': 'error',

    complexity: 'warn',
    'import/default': 'warn',
    'import/no-useless-path-segments': 'error',
    'import/order': ['error', { groups: [['builtin', 'external']] }],
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/anchor-has-content': 'warn',
    'jsx-a11y/label-has-associated-control': 'warn',
    'jsx-a11y/label-has-for': 'warn',
    'jsx-a11y/no-autofocus': 'warn',
    'jsx-a11y/no-noninteractive-element-interactions': 'warn',
    'jsx-a11y/no-noninteractive-tabindex': 'warn',

    'lodash/prefer-noop': 'warn',
    'react/display-name': 'warn',
    'react/no-deprecated': 'error',
    'react/no-unused-prop-types': 'warn',

    'import/no-unused-modules': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/aria-role': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/no-unescaped-entities': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
  settings: {
    react: {
      version: '16.9',
    },
    'import/ignore': ['.scss$'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};

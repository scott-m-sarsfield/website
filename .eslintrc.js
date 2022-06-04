module.exports = {
  plugins: ['react', 'import', 'jsx-a11y', 'lodash', 'react-hooks'],
  extends: [
    'plugin:import/warnings',
    'plugin:import/errors',
    'plugin:jsx-a11y/recommended',
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true
    }
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
    jquery: true,
    node: true,
    phantomjs: true
  },
  globals: {
    React: true,
    root: true,
    google: true
  },
  rules: {
    'arrow-parens': ['error', 'always'],
    'arrow-spacing': 'error',
    'block-scoped-var': 'error',
    'block-spacing': 'error',
    'brace-style': 'error',
    'comma-spacing': 'error',
    'comma-dangle': ['error', 'never'],
    curly: 'error',
    'default-case': 'error',
    'dot-notation': 'error',
    eqeqeq: 'error',
    'eol-last': 'error',
    'func-call-spacing': ['error', 'never'],
    'guard-for-in': 'error',
    'implicit-arrow-linebreak': ['error', 'beside'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'jsx-quotes': 'error',
    'lodash/import-scope': ['error', 'method'],
    'lodash/prefer-get': 'error',
    'key-spacing': 'error',
    'keyword-spacing': ['error', { before: true, after: true }],
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
    'no-trailing-spaces': 'error',
    'no-unneeded-ternary': 'error',
    'no-unused-vars': ['error', { ignoreRestSiblings: true }],
    'no-var': 'error',
    'no-void': 'error',
    'no-warning-comments': 'error',
    'no-with': 'error',
    'object-curly-spacing': ['error', 'always', { objectsInObjects: false }],
    'object-curly-newline': [
      'error',
      {
        multiline: true,
        consistent: true
      }
    ],
    'object-property-newline': [
      'error',
      { allowAllPropertiesOnSameLine: true }
    ],
    'padded-blocks': ['error', 'never'],
    'quote-props': ['error', 'as-needed'],
    quotes: ['error', 'single'],
    radix: 'error',
    semi: 'error',
    'space-before-blocks': 'error',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'wrap-iife': ['error', 'inside'],
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/jsx-curly-spacing': [2, 'never'],
    'react/jsx-equals-spacing': [2, 'never'],
    'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'allow' }],
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line'
      }
    ],
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
          'render'
        ]
      }
    ],
    'require-await': 'error',
    'react-hooks/rules-of-hooks': 'error',

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
    'react-hooks/exhaustive-deps': 'off'
  },
  settings: {
    react: {
      version: '16.9'
    },
    'import/ignore': ['.scss$']
  }
};

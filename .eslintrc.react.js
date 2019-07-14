module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
        ecmaFeatures: {
            jsx: true,
            tsx: true
        }
    },
    plugins: [
        '@typescript-eslint',
        'import',
        'jest'
    ],
    extends: [
        'airbnb-typescript',
        'prettier',
        'prettier/@typescript-eslint',
        'plugin:jest/recommended'
    ],
    env: {
        browser: true,
        node: true,
        es6: true,
        jest: true
    },
    settings: {
        'import/resolver': {
            typescript: {}
        }
    },
    rules: {
        'no-underscore-dangle': 'off',
        'import/prefer-default-export': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-indent': 'off',
        'react/no-did-update-set-state': 'off',
        'click-events-have-key-events': 'off'
    }
}
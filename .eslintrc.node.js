module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json'
    },
    plugins: [
        '@typescript-eslint',
        'import',
        'jest'
    ],
    extends: [
        'airbnb-typescript/base',
        'prettier',
        'prettier/@typescript-eslint',
        'plugin:jest/recommended'
    ],
    env: {
        browser: false,
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
        'class-methods-use-this': 'warn'
    }
}
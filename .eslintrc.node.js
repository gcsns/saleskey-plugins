module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json'
    },
    ignorePatterns: ["**/*.config.js",".eslintrc.js", "lib", "**/__mocks__/*.js"],
    plugins: [
        '@typescript-eslint',
        'import',
        'jest',
        'sort-keys-fix',
        'sort-class-members',
        'unused-imports',
        'promise',
        // 'security'
    ],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:jest/recommended',
        'plugin:promise/recommended',
        'prettier'
        // 'plugin:security/recommended'
    ],
    env: {
        browser: false,
        node: true,
        es6: true,
        jest: true,
    },
    settings: {
        'import/resolver': {
            typescript: {}
        }
    },
    rules: {
        'no-underscore-dangle': 'off',
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'warn',
        'sort-keys-fix/sort-keys-fix': 'error',
        'sort-class-members/sort-class-members': [ 'error', {
            order: [
              '[static-properties]',
              '[static-methods]',
              '[properties]',
              '[conventional-private-properties]',
              'constructor',
              '[conventional-private-methods]',
              '[methods]'
            ],
            accessorPairPositioning: 'getThenSet',
            // sort: 'alphabetical'
        }],
        '@typescript-eslint/no-unused-vars': 'off',
        // SonarQube mandates `for...of` over `.forEach()` and for-of routinely
        // needs `continue` for skip-an-iteration logic. airbnb-base bans `continue`
        // by default — turn it off so the Sonar-preferred form lints cleanly.
        'no-continue': 'off',
        'no-restricted-syntax': ['error',
            'ForInStatement',
            'LabeledStatement',
            'WithStatement',
        ],
        'unused-imports/no-unused-imports': 2,
        'unused-imports/no-unused-vars': 2
    }
}
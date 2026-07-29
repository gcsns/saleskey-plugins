// @ts-check
// Shared flat ESLint config for house TypeScript services (ESLint 10 + typescript-eslint 8).
//
// This is ADDITIVE to the legacy `.eslintrc.node.js` — services on the modern stack import
// `houseConfig` from here; legacy services keep using `.eslintrc.node.js` untouched.
//
// Dependencies live in the CONSUMER's package.json (this submodule declares none):
//   eslint, typescript-eslint, eslint-plugin-import-x, eslint-import-resolver-typescript,
//   eslint-plugin-unused-imports, eslint-plugin-jest, eslint-plugin-promise,
//   eslint-config-prettier, globals
//
// Consumer usage (eslint.config.mjs at the repo root):
//   import { houseConfig } from './plugins/eslint.config.base.mjs';
//   export default houseConfig({ tsconfigRootDir: import.meta.dirname });
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import importX from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import unusedImports from 'eslint-plugin-unused-imports';
import jest from 'eslint-plugin-jest';
import promise from 'eslint-plugin-promise';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

/**
 * Build the house flat config. Shared rules/plugins are fixed; per-repo layout is passed in.
 *
 * @param {object} opts
 * @param {string} [opts.tsconfigRootDir]  Consumer repo root — pass `import.meta.dirname` (falls back to cwd).
 * @param {string[]} [opts.files]         Source globs to lint. Default: single-package `src/`.
 * @param {string[]} [opts.testFiles]     Test globs (jest rules apply here).
 * @param {string[]} [opts.tsconfigProjects] tsconfig paths for the import resolver.
 * @param {string[]} [opts.ignores]       Extra ignore globs, merged with the universal set.
 * @returns {import('typescript-eslint').ConfigArray}
 */
export function houseConfig({
    tsconfigRootDir,
    files = ['src/**/*.ts'],
    testFiles = ['tests/**/*.ts', '**/*.spec.ts'],
    tsconfigProjects = ['tsconfig.json'],
    ignores = [],
} = {}) {
    return tseslint.config(
        {
            // never lint build output, deps, or this submodule itself
            ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**', 'plugins/**', ...ignores],
        },
        {
            files,
            extends: [
                eslint.configs.recommended,
                ...tseslint.configs.strictTypeChecked,
                ...tseslint.configs.stylisticTypeChecked,
                importX.flatConfigs.recommended,
                promise.configs['flat/recommended'],
            ],
            settings: {
                // import-x v4 resolver API — read the consumer's tsconfig(s)
                'import-x/resolver-next': [
                    createTypeScriptImportResolver({ alwaysTryTypes: true, project: tsconfigProjects }),
                ],
            },
            languageOptions: {
                globals: { ...globals.node },
                parserOptions: {
                    // type-aware linting without hand-listing tsconfigs (tseslint 8)
                    projectService: true,
                    tsconfigRootDir,
                },
            },
            plugins: {
                'unused-imports': unusedImports,
            },
            rules: {
                // a single export per module is fine — don't force a default export
                'import-x/prefer-default-export': 'off',
                // let unused-imports own unused detection (auto-fixable, strips dead imports)
                '@typescript-eslint/no-unused-vars': 'off',
                'unused-imports/no-unused-imports': 'error',
                'unused-imports/no-unused-vars': [
                    'warn',
                    { args: 'after-used', argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
                ],
                // numbers in template literals are fine (e.g. logging a port)
                '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
                // reject a bare `export {}` (Sonar typescript:S7787) so the linter stays in sync with
                // Sonar — an empty module marker can't slip through. Export real members instead.
                'no-restricted-syntax': [
                    'error',
                    {
                        selector: 'ExportNamedDeclaration[declaration=null][source=null][specifiers.length=0]',
                        message:
                            'Empty `export {}` is not allowed (Sonar typescript:S7787). Export real members or a real declaration instead of an empty module marker.',
                    },
                ],
            },
        },
        {
            // test files: jest globals + jest rules
            files: testFiles,
            extends: [jest.configs['flat/recommended']],
        },
        // must be last: turn off stylistic rules that Prettier owns
        prettier,
    );
}

export default houseConfig;

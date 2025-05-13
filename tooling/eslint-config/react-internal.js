import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

import { baseConfig } from './base.js';

/**
 * A custom ESLint configuration for libraries that use React.
 *
 * @type {import("eslint").Linter.Config} */
export const reactConfig = [
	...baseConfig,
	pluginReact.configs.flat.recommended,
	importPlugin.flatConfigs.recommended,
	jsxA11y.flatConfigs.recommended,
	{
		languageOptions: {
			...pluginReact.configs.flat.recommended.languageOptions,
			globals: {
				...globals.serviceworker,
				...globals.browser,
			},
		},
	},
	{
		plugins: {
			'react-hooks': pluginReactHooks,
			'react-refresh': reactRefresh,
			'simple-import-sort': simpleImportSort,
		},
		settings: {
			react: { version: 'detect' },
			'import/resolver': {
				typescript: {
					alwaysTryTypes: true,
					project: 'tooling/*/tsconfig.json',
				},
			},
		},
		rules: {
			...pluginReactHooks.configs.recommended.rules,
			// React scope no longer necessary with new JSX transform.
			'react/react-in-jsx-scope': 'off',
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			'react/self-closing-comp': [
				'error',
				{
					component: true,
					html: true,
				},
			],
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						// Node.js builtins
						['^node:'],
						// Packages
						['^@?\\w'],
						// Absolute imports and other imports such as `@/foo`
						// Anything that does not start with a dot
						['^[^.]'],
						// Relative imports
						// Anything that starts with a dot
						['^\\.'],
						// Style imports
						['^.+\\.s?css$'],
					],
				},
			],
			'simple-import-sort/exports': 'error',
			'import/no-duplicates': 'error',
			'import/no-cycle': ['error', { maxDepth: 1 }],
			'import/namespace': 'warn',
			'no-restricted-exports': [
				'warn',
				{ restrictedNamedExports: ['default'] },
			],
			'no-restricted-syntax': ['warn', 'ExportDefaultDeclaration'],
		},
	},
];

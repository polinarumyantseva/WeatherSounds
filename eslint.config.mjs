import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	{
		ignores: [
			'dist/',
			'node_modules/',
			'webpack.config.common.js',
			'webpack.config.dev.js',
			'webpack.config.prod.js',
		],
	},
	{
		files: ['**/*.js'],
		plugins: { js },
		extends: ['js/recommended'],
		languageOptions: { globals: globals.browser },
		rules: {
			quotes: ['error', 'single'],
			semi: ['error', 'always'],
			eqeqeq: ['error', 'always'],
			'no-unused-vars': 'error',
			'no-console': 'warn',
		},
	},
	tseslint.configs.recommended,
]);

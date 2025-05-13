import fsd from '@feature-sliced/steiger-plugin';
import { defineConfig } from 'steiger';

export default defineConfig([
	...fsd.configs.recommended,
	{
		ignores: ['**/__mocks__/**'],
	},
	{
		files: ['./src/widgets/**'],
		rules: {
			'fsd/no-segmentless-slices': 'off',
		},
	},
	{
		files: ['./src/shared/**'],
		rules: {
			'fsd/public-api': 'off',
			'fsd/no-public-api-sidestep': 'off',
		},
	},
]);

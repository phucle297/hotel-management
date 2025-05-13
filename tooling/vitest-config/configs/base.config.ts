import { configDefaults, defineConfig } from 'vitest/config';

export const baseConfig = defineConfig({
	test: {
		exclude: [
			...configDefaults.exclude,
			'**/coverage/**',
			'**/dist/**',
			'**/e2e/**',
			'**/.{idea,git,cache,output,temp}/**',
		],
		globals: true,
		coverage: {
			enabled: true,
			provider: 'v8',
			reporter: ['json-summary', 'text'],
			exclude: [
				'**.test.**',
				'**/assets/*',
				'**/__test__/**',
				'**/messages.ts',
			],
		},
		reporters: ['junit', 'default'],
		outputFile: './coverage/test-report.xml',
	},
});

import { defineProject, mergeConfig } from 'vitest/config';
import { baseConfig } from './base.config.js';

export const uiConfig = mergeConfig(
	baseConfig,
	defineProject({
		test: {
			environment: 'jsdom',
			include: ['**/*.test.{ts,tsx}'],
			setupFiles: '@hm/vitest-config/setup',
		},
	}),
);

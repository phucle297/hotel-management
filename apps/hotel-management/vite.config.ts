import path from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import browserslist from 'browserslist';
import { Features, browserslistToTargets } from 'lightningcss';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, `${process.cwd()}/env`, '');
	return {
		optimizeDeps: {
			exclude: ['lightningcss'],
		},
		plugins: [
			TanStackRouterVite({
				autoCodeSplitting: true,
			}),
			wasm(),
			topLevelAwait(),
			react(),
			tsconfigPaths(),
			tailwindcss(),
			svgr({
				include: '**/*.svg?react',
			}),
		],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
				fs: import.meta.resolve('rollup-plugin-node-builtins'),
			},
		},
		envDir: './env',
		css: {
			transformer: 'lightningcss',
			modules: {
				localsConvention: 'dashesOnly',
			},
			lightningcss: {
				cssModules: {
					pattern: 'hm-[local]-[hash]',
					dashedIdents: false,
				},
				targets: browserslistToTargets(browserslist('>= 0.25%')),
				include: Features.Nesting,
			},
		},
		server: {
			host: true,
			hmr: true,
			port: 3000,
			proxy: {
				'/api': {
					target: env.VITE_API_URL,
					changeOrigin: true,
					secure: false,
				},
			},
		},
		preview: {
			port: 4000,
		},
		build: {
			outDir: 'dist',
			sourcemap: true,
			target: 'esnext',
			minify: 'esbuild',
			cssTarget: 'esnext',
			cssMinify: 'lightningcss',
			cssCodeSplit: true,
			modulePreload: { polyfill: true },
			assetsInlineLimit: 4096,
			rollupOptions: {
				output: {
					manualChunks(id) {
						if (id.includes('node_modules')) {
							if (id.includes('react') || id.includes('react-dom')) {
								return 'react';
							}
							if (id.includes('@tanstack')) {
								return 'tanstack';
							}
						}
						return null;
					},
				},
			},
		},
	};
});

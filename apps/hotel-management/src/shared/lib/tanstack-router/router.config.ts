import { createRouter } from '@tanstack/react-router';

import { routeTree } from '@/routeTree.gen';

import { queryClient } from '../tanstack-query/query-client.config';

export const ROUTER = createRouter({
	routeTree,
	notFoundMode: 'fuzzy',
	context: {
		queryClient: queryClient,
	},
	defaultPreload: 'intent',
	/**
	 * * Since we're using React Query, we don't want loader calls to ever be stale
	 * * This will ensure that the loader always runs when the route preloads or when you visit it
	 */
	defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
	// biome-ignore lint/style/useNamingConvention: <explanation>
	interface Register {
		router: typeof ROUTER;
	}
	// biome-ignore lint/style/useNamingConvention: <explanation>
	interface HistoryState {
		defaultPath?: string;
	}
}

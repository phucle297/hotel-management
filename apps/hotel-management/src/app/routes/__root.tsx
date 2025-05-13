import type { IRouterContext } from '@/shared/lib/shared-types/router-context.type';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { lazy } from 'react';

const TanStackRouterDevtools =
	import.meta.env.NODE_ENV === 'production'
		? () => null
		: lazy(() =>
				import('@tanstack/react-router-devtools').then((res) => ({
					default: res.TanStackRouterDevtools,
				})),
			);

export const Route = createRootRouteWithContext<IRouterContext>()({
	// beforeLoad: ({ context }) => {
	// if (context.auth.status === 'loggedOut') {
	// 	console.info('Redirect to login');
	// 	// throw redirect({ to: '/login' });
	// }
	// },

	component: RootLayout,
	errorComponent: () => <div>error component</div>,
	notFoundComponent: () => <div>not found component</div>,
});

function RootLayout() {
	return (
		<>
			<Outlet />
			<ReactQueryDevtools initialIsOpen={false} />
			<TanStackRouterDevtools initialIsOpen={false} />
		</>
	);
}

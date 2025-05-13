import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

import { queryClient } from '@/shared/lib/tanstack-query';
import { ROUTER } from '@/shared/lib/tanstack-router';
import { Toaster } from '@/shared/ui/shadcn/sonner';
import { TooltipProvider } from '@/shared/ui/shadcn/tooltip';

export function AppProvider({ children }: PropsWithChildren) {
	return (
		<TooltipProvider>
			<Toaster richColors />
			<QueryClientProvider client={queryClient}>
				{children}
				<RouterProvider router={ROUTER} />
			</QueryClientProvider>
		</TooltipProvider>
	);
}

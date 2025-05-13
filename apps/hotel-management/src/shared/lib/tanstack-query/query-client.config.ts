import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { MINUTE, SECOND } from '../../config/date.config';

const RETRY_COUNT = 3;

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: true,
			retry: RETRY_COUNT,
			retryDelay: SECOND,
			staleTime: MINUTE * 5,
			// Todo: Enable this option when we have a global error boundary.
			// throwOnError: true,
		},
		mutations: {
			onError: (error) => {
				if (error instanceof AxiosError) {
					toast.error(
						error.response?.data.message ?? error.response?.data.error,
					);
				} else {
					toast.error(error.message);
				}
			},
		},
	},
});

import type { DefaultError, UseMutationOptions } from '@tanstack/react-query';

export type MutateOptions<Data = unknown, Params = unknown> = Pick<
	UseMutationOptions<Data, DefaultError, Params, unknown>,
	'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
>;

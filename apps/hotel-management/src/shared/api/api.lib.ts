import type { Type } from 'arktype';
import type { AxiosResponse } from 'axios';

export const responseContract = <Data>(schema: Type<Data>) => {
	const parseResponse = (
		response: AxiosResponse<unknown>,
	): AxiosResponse<Data> => {
		try {
			const data = schema.assert(response.data) as Data;
			return { ...response, data };
		} catch (error) {
			throw error;
		}
	};

	return parseResponse;
};

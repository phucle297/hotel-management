import { type } from 'arktype';

export const CustomerSchema = type({
	id: type.string,
	fullName: type.string,
	birthday: type.Date.optional(),
});

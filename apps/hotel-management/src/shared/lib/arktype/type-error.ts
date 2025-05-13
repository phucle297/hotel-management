export const TYPE_ERROR_MAP = {
	atLeast: (num: number) => `Value must be least ${num}`,
	between: (min: number, max: number) =>
		`Value must be between ${min} and ${max}`,
};

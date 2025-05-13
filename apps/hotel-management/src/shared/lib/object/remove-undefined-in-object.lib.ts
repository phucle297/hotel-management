/**
 * Recursively removes all `undefined` properties from an object or object inside arrays.
 *
 * @template T - The type to clean.
 *
 * If `T` is:
 * - An array: each item is deeply cleaned (recursively removing `undefined` properties from objects).
 * - An object: returns a new object with all `undefined` properties removed, including nested ones.
 * - A primitive: returned as-is.
 */
type TDeepClean<T> = T extends (infer U)[]
	? TDeepClean<U>[] // if T is an array => clean each item
	: T extends object
		? {
				[K in keyof T as T[K] extends undefined ? never : K]: TDeepClean<
					NonNullable<T[K]>
				>;
			} // if T is an object -> clean each property
		: T; // if T is primitive
/**
 * Recursively removes all `undefined` values from an object or from objects inside arrays.
 *
 * - For objects: all keys with `undefined` values are removed deeply.
 * - For arrays: all items are recursively cleaned (if they're objects), but the array structure is preserved.
 * - For primitives: returned as-is.
 *
 * @template T - The input type of the object.
 * @param {T} obj - The object to clean.
 * @returns {TDeepClean<T>} A new object (or object with nested arrays) with all `undefined` values removed recursively.
 *
 * @example
 * const input = {
 *   title: 'Hello',
 *   tags: [
 *     { name: 'tag1', desc: undefined },
 *     { name: 'tag2' }
 *   ],
 *   meta: undefined,
 *   nested: {
 *     value: undefined,
 *     label: 'Test'
 *   }
 * };
 *
 * const output = removeUndefinedInObject(input);
 * // output: {
 * //   title: 'Hello',
 * //   tags: [{ name: 'tag1' }, { name: 'tag2' }],
 * //   nested: { label: 'Test' }
 * // }
 */
export const removeUndefinedInObject = <T>(obj: T): TDeepClean<T> => {
	if (Array.isArray(obj)) {
		return obj
			.map((item) => removeUndefinedInObject(item))
			.filter(
				(item): item is NonNullable<typeof item> => item !== undefined,
			) as TDeepClean<T>;
	}

	if (obj !== null && typeof obj === 'object') {
		const result = {} as TDeepClean<T>;
		for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
			if (value !== undefined) {
				const cleanedValue = removeUndefinedInObject(value);
				if (cleanedValue !== undefined) {
					(result as Record<string, unknown>)[key] = cleanedValue;
				}
			}
		}
		return result;
	}

	return obj as TDeepClean<T>;
};

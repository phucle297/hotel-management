/**
 * Recursively sorts the keys of an object and any nested objects.
 *
 * @template T The type of the input object.
 * @param obj - The object to sort. Can contain nested objects or arrays.
 * @returns A new object with all keys sorted alphabetically, including nested structures.
 *
 * @example
 * const input = {
 *   c: 3,
 *   a: {
 *     c: 2,
 *     a: 1,
 *     b: 0,
 *   },
 *   b: [
 *     { b: 2, a: 1 },
 *     { c: 3, a: 2 },
 *   ]
 * };
 * const sorted = sortObject(input);
 * console.log(sorted);
 *
 * // Output:
 * {
 *   a: { a: 1, b: 0, c: 2 },
 *   b: [ { a: 1, b: 2 }, { a: 2, c: 3 } ],
 *   c: 3
 * }
 */
export const sortObject = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map((item) => sortObject(item)) as unknown as T;
  }

  if (obj !== null && typeof obj === 'object') {
    const sortedKeys = Object.keys(obj).sort();
    const result: Record<string, unknown> = {};

    for (const key of sortedKeys) {
      const value = (obj as Record<string, unknown>)[key];
      result[key] = sortObject(value);
    }

    return result as T;
  }

  return obj;
};

export type TCollection<E> = {
  data: E[];
};

export const emptyCollection = <E>(): TCollection<E> => ({
  data: [],
});

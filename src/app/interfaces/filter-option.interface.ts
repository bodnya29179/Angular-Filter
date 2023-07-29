export interface IFilterOption<T> {
  id: string;
  idSelector: (item: T) => string;
  // displayValueSelector: (item: T) => string,
}

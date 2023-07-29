import { IFilterOption } from './filter-option.interface';

export interface IFilterDefinition<T> {
  id: string;
  propertySelector: (item: T) => string;
  label?: string;
  options: IFilterOption[],
  multiselect?: boolean;
  selectedOption?: IFilterOption;
}

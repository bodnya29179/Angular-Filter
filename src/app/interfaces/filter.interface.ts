import { IBrand } from './brand.interface';
import { ICategory } from './category.interface';

export interface IFilter {
  brands: IBrand['id'],
  categories: ICategory['id'],
}

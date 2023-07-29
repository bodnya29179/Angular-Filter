import { ICategory } from './category.interface';
import { IBrand } from './brand.interface';

export interface IProduct {
  id: string;
  name: string;
  categoryId: ICategory['id'];
  brandId: IBrand['id'];
  price: number;
}

import { IProduct } from './product.interface';
import { ICategory } from './category.interface';
import { IBrand } from './brand.interface';

export interface ICalculatedProduct extends IProduct {
  categoryName: ICategory['name'];
  brandName: IBrand['name'];
}

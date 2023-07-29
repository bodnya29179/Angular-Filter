import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, firstValueFrom, map, Observable } from 'rxjs';
import { IBrand, ICalculatedProduct, ICategory, IProduct } from '../interfaces';
import { ProductService } from './product.service';
import { BrandFacadeService } from './brand-facade.service';
import { CategoryFacadeService } from './category-facade.service';
import { FilterService } from './filter.service';

enum ProductFilterOption {
  categories = 'categories',
  brands = 'brands',
}

@Injectable()
export class ProductFacadeService {
  private readonly products$ = new BehaviorSubject<IProduct[]>(undefined);

  constructor(
    private productService: ProductService,
    private brandFacade: BrandFacadeService,
    private categoryFacade: CategoryFacadeService,
    private filterService: FilterService<ICalculatedProduct>,
  ) {}

  initializeData(): void {
    this.loadProducts();
    this.brandFacade.loadBrands();
    this.categoryFacade.loadCategories();
  }

  initializeFilter(): void {
    this.filterService.initializeFilter([
      {
        id: ProductFilterOption.brands,
        idSelector: (product: ICalculatedProduct) => product.brandId,
      },
      {
        id: ProductFilterOption.categories,
        idSelector: (product: ICalculatedProduct) => product.categoryId,
      }
    ]);
  }

  async loadProducts(): Promise<void> {
    const products = await firstValueFrom(this.productService.getProducts());
    this.products$.next(products);
  }

  getProducts(): Observable<ICalculatedProduct[]> {
    const products$ = this.products$.pipe(filter(Boolean));
    const categories$ = this.categoryFacade.getCategories();
    const brands$ = this.brandFacade.getBrands();

    return combineLatest([products$, categories$, brands$])
      .pipe(
        map(([products, categories, brands]: [IProduct[], ICategory[], IBrand[]]) => {
          return products.map((product: IProduct) => {
            return {
              ...product,
              categoryName: categories.find(({ id }) => id === product.categoryId).name,
              brandName: brands.find(({ id }) => id === product.brandId).name,
            } as ICalculatedProduct;
          });
        }),
      );
  }
}

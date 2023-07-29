import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProduct } from '../interfaces';

@Injectable()
export class ProductService {
  getProducts(): Observable<IProduct[]> {
    return of([
      {
        id: 'fake-product-id1',
        name: 'fake-product-name1',
        brandId: 'fake-brand-id1',
        categoryId: 'fake-category-id1',
        price: 200,
      },
      {
        id: 'fake-product-id2',
        name: 'fake-product-name2',
        brandId: 'fake-brand-id1',
        categoryId: 'fake-category-id2',
        price: 100,
      },
      {
        id: 'fake-product-id3',
        name: 'fake-product-name3',
        brandId: 'fake-brand-id2',
        categoryId: 'fake-category-id2',
        price: 200,
      },
    ]);
  }
}

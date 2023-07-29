import { Component, OnInit } from '@angular/core';
import { DataManipulationService, ProductFacadeService } from './services';
import { Observable } from 'rxjs';
import { ICalculatedProduct } from './interfaces';

@Component({
  selector: 'app-root',
  template: `
    <app-filter-panel></app-filter-panel>

    <div *ngIf="(products$ | async) as products" class="products-container">
      <div *ngFor="let product of products" class="product">
        <span>{{ product.name }}</span>
        <span>{{ product.brandName }}</span>
        <span>{{ product.categoryName }}</span>
        <span>$ {{ product.price }}</span>
      </div>
    </div>
  `,
  styles: [
    `
      .products-container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
      }

      .product {
        width: 200px;
        display: flex;
        flex-direction: column;
        background-color: #dbdbdb;
      }
    `,
  ]
})
export class AppComponent implements OnInit {
  products$: Observable<ICalculatedProduct[]>;

  constructor(
    private productFacade: ProductFacadeService,
    private dataManipulationService: DataManipulationService<ICalculatedProduct>,
  ) {}

  ngOnInit(): void {
    this.productFacade.initializeData();

    this.productFacade.getProducts()
      .subscribe((products: ICalculatedProduct[]) => {
        this.dataManipulationService.setData(products);
      });

    this.products$ = this.dataManipulationService.getData();
  }
}

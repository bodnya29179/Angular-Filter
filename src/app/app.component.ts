import { Component, OnInit } from '@angular/core';
import { DataManipulationService, ProductFacadeService } from './services';
import { Observable } from 'rxjs';
import { ICalculatedProduct } from './interfaces';

@Component({
  selector: 'app-root',
  template: `
    <app-filter-panel></app-filter-panel>

    <div *ngIf="(products$ | async) as products" class="products-container">
      <app-product *ngFor="let product of products" [product]="product"></app-product>
    </div>
  `,
  styles: [
    `
      .products-container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin-top: 20px;
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
    this.productFacade.initializeFilter();

    this.productFacade.getProducts()
      /* TODO: unsubscribe here */
      .subscribe((products: ICalculatedProduct[]) => {
        this.dataManipulationService.setData(products);
      });

    this.products$ = this.dataManipulationService.getData();
  }
}

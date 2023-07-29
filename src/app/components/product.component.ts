import { Component, Input } from '@angular/core';
import { ICalculatedProduct } from '../interfaces';

@Component({
  selector: 'app-product',
  template: `
    <span>{{ product.name }}</span>
    <span>{{ product.brandName }}</span>
    <span>{{ product.categoryName }}</span>
    <span>$ {{ product.price }}</span>
  `,
  styles: [
    `
      :host {
        width: 200px;
        display: flex;
        flex-direction: column;
        background-color: #dbdbdb;
      }
    `
  ]
})
export class ProductComponent {
  @Input()
  product: ICalculatedProduct;
}

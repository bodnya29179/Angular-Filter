import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FilterPanelComponent, FilterCardComponent, ProductComponent } from './components';
import {
  BrandFacadeService,
  BrandService,
  CategoryFacadeService,
  CategoryService,
  DataManipulationService,
  FilterService,
  ProductFacadeService,
  ProductService
} from './services';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule],
  declarations: [
    AppComponent,
    FilterPanelComponent,
    FilterCardComponent,
    ProductComponent,
  ],
  providers: [
    DataManipulationService,
    ProductService,
    BrandService,
    CategoryService,
    ProductFacadeService,
    BrandFacadeService,
    CategoryFacadeService,
    FilterService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

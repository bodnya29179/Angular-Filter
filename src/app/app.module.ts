import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FilterPanelComponent } from './components';
import {
  BrandFacadeService,
  BrandService,
  CategoryFacadeService,
  CategoryService,
  DataManipulationService,
  ProductFacadeService,
  ProductService
} from './services';

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    FilterPanelComponent,
  ],
  providers: [
    DataManipulationService,
    ProductService,
    BrandService,
    CategoryService,
    ProductFacadeService,
    BrandFacadeService,
    CategoryFacadeService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

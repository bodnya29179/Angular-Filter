import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FilterPanelComponent } from './components';
import { BrandService, CategoryService, DataManipulationService, ProductService } from './services';

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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

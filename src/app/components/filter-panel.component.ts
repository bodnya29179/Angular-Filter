import { Component, OnInit } from '@angular/core';
import { BrandFacadeService, CategoryFacadeService, DataManipulationService } from '../services';
import { map, Observable } from 'rxjs';
import { IBrand, ICategory, IFilter } from '../interfaces';
import { FormControl, FormGroup } from '@angular/forms';

const SELECT_ALL = { id: 'all', name: 'All' };

@Component({
  selector: 'app-filter-panel',
  template: `
    <form class="filter" [formGroup]="form">
      <app-filter-card
        *ngIf="(brandOptions$ | async) as brandOptions"
        [label]="'Brands'"
        [control]="$any(form.get('brands'))"
        [options]="brandOptions"
        [selectedOption]="brandOptions[0]"
        [idSelector]="brandIdSelector"
        [displayValueSelector]="brandNameSelector">
      </app-filter-card>

      <app-filter-card
        [label]="'Categories'"
        [control]="$any(form.get('categories'))"
        [options]="categoryOptions$ | async"
        [idSelector]="categoryIdSelector"
        [displayValueSelector]="categoryNameSelector"
        [multiselect]="true">
      </app-filter-card>
    </form>
  `,
  styles: [
    `
      .filter {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
    `,
  ]
})
export class FilterPanelComponent implements OnInit {
  brandOptions$: Observable<IBrand[]>;
  categoryOptions$: Observable<ICategory[]>;

  form: FormGroup;

  constructor(
    private brandFacade: BrandFacadeService,
    private categoryFacade: CategoryFacadeService,
    private dataManipulationService: DataManipulationService,
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  brandIdSelector(brand: IBrand): string {
    return brand.id;
  }

  brandNameSelector(brand: IBrand): string {
    return brand.name;
  }

  categoryIdSelector(category: ICategory): string {
    return category.id;
  }

  categoryNameSelector(category: ICategory): string {
    return category.name;
  }

  private initializeValues(): void {
    this.brandOptions$ = this.brandFacade.getBrands()
      .pipe(
        map((brandOptions: IBrand[]) => [SELECT_ALL, ...brandOptions]),
      );

    this.categoryOptions$ = this.categoryFacade.getCategories();

    this.form = new FormGroup({
      brands: new FormControl([]),
      categories: new FormControl([]),
    });
  }

  private initializeListeners(): void {
    this.form.valueChanges
      /* TODO: unsubscribe here */
      .subscribe((filter: IFilter) => {
        this.dataManipulationService.setFilter(filter);
      });
  }
}

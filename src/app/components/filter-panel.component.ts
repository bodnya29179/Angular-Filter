import { Component, OnInit } from '@angular/core';
import { DataManipulationService, FilterService } from '../services';
import { ICalculatedProduct, IFilterDefinition } from '../interfaces';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-panel',
  template: `
    <form *ngIf="hasControls" class="filter" [formGroup]="form">
      <app-filter-card
        *ngFor="let definition of filterDefinition; let index = index"
        [label]="definition.label"
        [control]="controls[index]"
        [options]="definition.options"
        [selectedOption]="definition.selectedOption"
        [multiselect]="definition.multiselect"
      >
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
  form = new FormGroup({});
  filterDefinition: IFilterDefinition<ICalculatedProduct>[];

  get hasControls(): boolean {
    return !!this.controls.length;
  }

  get controls(): FormControl[] {
    return Object.values(this.form.controls);
  }

  constructor(
    private dataManipulationService: DataManipulationService,
    private filterService: FilterService<ICalculatedProduct>,
  ) {}

  ngOnInit(): void {
    this.form.valueChanges
      /* TODO: unsubscribe here */
      .subscribe((filter: Record<string, string[]>) => {
        this.dataManipulationService.setFilter(filter);
      });

    this.filterService.getFilterDefinition()
      /* TODO: unsubscribe here */
      .subscribe((filterDefinition: IFilterDefinition<ICalculatedProduct>[]) => {
        this.filterDefinition = filterDefinition;

        this.filterDefinition.forEach((definition: IFilterDefinition<ICalculatedProduct>) => {
          this.form.addControl(definition.id, new FormControl([]));
        });
      });
  }
}

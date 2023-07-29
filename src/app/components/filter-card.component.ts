import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-filter-card',
  template: `
    <div *ngIf="label">{{ label }}:</div>

    <div *ngFor="let option of options">
      <label>
        <input
          [type]="multiselect ? 'checkbox' : 'radio'"
          [value]="option.id"
          [checked]="isSelected(option)"
          (change)="onCheckboxChange($event)"
        />

        {{ option.value }}
      </label>
    </div>
  `,
})
export class FilterCardComponent implements OnInit, OnDestroy {
  @Input()
  label: string;

  @Input()
  control: FormControl<any>;

  @Input()
  multiselect = false;

  @Input()
  options: any[];

  @Input()
  selectedOption: any;

  selectedOptions: string[] = [];

  private readonly unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    /* Set the start value if passed control already has it */
    if (!this.selectedOption && this.control.value) {
      this.selectedOptions = this.control.value;
    }

    /* Set the selected option if it was passed */
    if (this.selectedOption) {
      this.selectedOptions = [this.selectedOption.id];
      this.control.setValue(this.selectedOption);
    }

    /* Change the selected values in this component if control is updated from the parent component */
    this.control.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value: any) => {
        this.selectedOptions = value;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onCheckboxChange(event: Event) {
    /* Get key of option */
    const value = (event.target as any).value;

    if ((event.target as any).checked) {
      if (this.multiselect) {
        /* Add selected option if control is multiselect */
        this.selectedOptions.push(value);
      } else {
        /* Set selected option if control is not multiselect */
        this.selectedOptions = [value];
      }
    } else {
      /* Remove from the selected list if checkbox was unchecked */
      this.selectedOptions = this.selectedOptions.filter((item) => item !== value);
    }

    /* Set value to FormControl */
    this.control.setValue(this.selectedOptions);
  }

  isSelected(option: any): boolean {
    return this.selectedOptions.includes(option.id);
  }
}

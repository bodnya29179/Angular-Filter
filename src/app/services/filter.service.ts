import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { IFilterDefinition } from '../interfaces';

@Injectable()
export class FilterService<T = any> {
  private readonly filter$ = new BehaviorSubject<IFilterDefinition<T>[]>(undefined);

  initializeFilter(filter: IFilterDefinition<T>[]): void {
    this.filter$.next(filter);
  }

  getFilterDefinition(): Observable<IFilterDefinition<T>[]> {
    return this.filter$.pipe(filter(Boolean));
  }

  // getFilterOptionById(optionId: string): Observable<IFilterDefinition<T> | undefined> {
  //   return this.getFilterOptions()
  //     .pipe(
  //       map((options: IFilterDefinition<T>[]) => {
  //         return options.find((option: IFilterDefinition<T>) => option.id === optionId);
  //       }),
  //     );
  // }
}

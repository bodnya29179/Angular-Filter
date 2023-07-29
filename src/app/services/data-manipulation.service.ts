import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, combineLatest, map, tap } from 'rxjs';
import { FilterService } from './filter.service';
import { IFilterDefinition } from '../interfaces';

@Injectable()
export class DataManipulationService<T = any> {
  private readonly data$ = new BehaviorSubject<T[]>(undefined);

  private readonly filter$ = new BehaviorSubject<Record<string, string[]>>({});

  constructor(private filterService: FilterService) {}

  setData(data: T[]): void {
    this.data$.next(data);
  }

  getData(): Observable<T[]> {
    return combineLatest([
      this.data$.pipe(filter(Boolean), tap(console.log)),
      this.filter$.pipe(filter(Boolean), tap(console.log)),
      this.filterService.getFilterDefinition().pipe(tap(console.log)),
    ]).pipe(
      map(([data, filterValue, filterDefinitions]: [T[], object, IFilterDefinition<T>[]]) => {
        let result = data;
        const filterKeys = Object.keys(filterValue);

        /* If filter is not selected, return initial data */
        if (!filterKeys.length) {
          return result;
        }

        filterKeys
          .filter((filterKey: string) => filterValue[filterKey]?.length)
          .forEach((filterKey: string) => {
            const definition = filterDefinitions.find(({ id }) => id === filterKey);

            /* If the 'all' option is selected */
            if (filterValue[filterKey].length === 1 && filterValue[filterKey][0] === 'all') {
              return;
            }

            /* Filter data by selected fields */
            result = result.filter((data: T) => {
              const dataField = definition.propertySelector(data);

              return filterValue[filterKey].includes(dataField);
            });
          });

        return result;
      }),
    ) as Observable<T[]>;
  }

  setFilter(filter: Record<string, string[]>): void {
    this.filter$.next(filter);
  }
}

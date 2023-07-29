import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, combineLatest, map, tap } from 'rxjs';
import { FilterService } from './filter.service';
import { IFilterOption } from '../interfaces';

@Injectable()
export class DataManipulationService<T = any> {
  private readonly data$ = new BehaviorSubject<T[]>(undefined);

  private readonly filterPanel$ = new BehaviorSubject<object>({});

  constructor(private filterService: FilterService) {}

  setData(data: T[]): void {
    this.data$.next(data);
  }

  getData(): Observable<T[]> {
    return combineLatest([
      this.data$.pipe(filter(Boolean), tap(console.log)),
      this.filterPanel$.pipe(filter(Boolean), tap(console.log)),
      this.filterService.getFilterOptions().pipe(tap(console.log)),
    ]).pipe(
      map(([data, filterPanel, selectors]: [T[], object, IFilterOption<any>[]]) => {
        let result = data;

        if (!Object.keys(filterPanel).length) {
          return result;
        }

        Object.keys(filterPanel)
          .filter((filterKey: string) => filterPanel[filterKey]?.length)
          .forEach((filterKey: string) => {
            const selector = selectors.find(({ id }) => id === filterKey);

            if (filterPanel[filterKey].length === 1 && filterPanel[filterKey][0] === 'all') {
              return;
            }

            result = result.filter((data: T) => {
              return (filterPanel[filterKey] as string[]).includes(selector.idSelector(data));
            });
          });

        return result;
      }),
    ) as Observable<T[]>;
  }

  setFilter(filter: object): void {
    this.filterPanel$.next(filter);
  }
}

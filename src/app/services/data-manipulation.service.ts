import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, of } from 'rxjs';

@Injectable()
export class DataManipulationService<T = any> {
  private readonly data$ = new BehaviorSubject<T[]>(undefined);

  setData(data: T[]): void {
    this.data$.next(data);
  }

  getData(): Observable<T[]> {
    return this.data$.pipe(filter(Boolean)) as Observable<T[]>;
  }
}

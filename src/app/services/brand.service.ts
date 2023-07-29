import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IBrand } from '../interfaces';

@Injectable()
export class BrandService {
  getBrands(): Observable<IBrand[]> {
    return of([
      {
        id: 'fake-brand-id1',
        name: 'fake-brand-name1',
      },
      {
        id: 'fake-brand-id2',
        name: 'fake-brand-name2',
      },
      {
        id: 'fake-brand-id3',
        name: 'fake-brand-name3',
      },
    ]);
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICategory } from '../interfaces';

@Injectable()
export class CategoryService {
  getCategories(): Observable<ICategory[]> {
    return of([
      {
        id: 'fake-category-id1',
        name: 'fake-category-name1',
      },
      {
        id: 'fake-category-id2',
        name: 'fake-category-name2',
      },
      {
        id: 'fake-category-id3',
        name: 'fake-category-name3',
      },
    ]);
  }
}

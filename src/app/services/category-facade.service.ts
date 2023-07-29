import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, firstValueFrom, Observable, of } from 'rxjs';
import { ICategory } from '../interfaces';
import { CategoryService } from './category.service';

@Injectable()
export class CategoryFacadeService {
  private readonly categories$ = new BehaviorSubject<ICategory[]>(undefined);

  constructor(private categoryService: CategoryService) {}

  async loadCategories(): Promise<void> {
    const categories = await firstValueFrom(this.categoryService.getCategories());
    this.categories$.next(categories);
  }

  getCategories(): Observable<ICategory[]> {
    return this.categories$.pipe(filter(Boolean));
  }
}

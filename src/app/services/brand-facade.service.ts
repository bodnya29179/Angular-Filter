import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, firstValueFrom, Observable, of } from 'rxjs';
import { IBrand } from '../interfaces';
import { BrandService } from './brand.service';

@Injectable()
export class BrandFacadeService {
  private readonly brands$ = new BehaviorSubject<IBrand[]>(undefined);

  constructor(private brandService: BrandService) {}

  async loadBrands(): Promise<void> {
    const brands = await firstValueFrom(this.brandService.getBrands());
    this.brands$.next(brands);
  }

  getBrands(): Observable<IBrand[]> {
    return this.brands$.pipe(filter(Boolean));
  }
}

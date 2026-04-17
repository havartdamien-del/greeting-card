import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ListingContextService {
  private readonly dataSubject = new BehaviorSubject<any[]>([]);
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly errorSubject = new BehaviorSubject<string | null>(null);

  data$ = this.dataSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  setData(data: any[]): void {
    this.dataSubject.next(data);
  }

  setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  setError(error: string | null): void {
    this.errorSubject.next(error);
  }

  reset(): void {
    this.dataSubject.next([]);
    this.loadingSubject.next(false);
    this.errorSubject.next(null);
  }
}

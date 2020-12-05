import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

type IHttpLoaderRecord = Record<string, boolean>;

@Injectable({ providedIn: 'root' })
export class HttpLoaderService {
  counter = 0;
  record: IHttpLoaderRecord = {};
  // when a Subject completes or errors, it can no longer be used
  private isLoading = new Subject<boolean>();
  // that is why the public API expose an observable
  public isLoading$ = this.isLoading.asObservable();
  constructor() {}

  public add(): number {
    this.counter++;
    this.record[this.counter] = true;
    this.triggerNext();
    return this.counter;
  }

  public remove(id: number) {
    delete this.record[id];
    this.triggerNext();
  }

  private triggerNext() {
    this.isLoading.next(Object.keys(this.record).length !== 0);
  }
}

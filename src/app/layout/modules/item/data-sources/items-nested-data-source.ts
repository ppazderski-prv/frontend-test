import {  DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IItem } from '../interfaces/i-item';
import { ItemApiService } from '../services/item-api.service';

export class ItemsNestedDataSource extends DataSource<IItem> {

  private apiSubscription: Subscription = new Subscription();
  private dataStream = new BehaviorSubject<IItem[]>([]);

  constructor(
    initialData: IItem[],
    private itemApiService: ItemApiService
  ) {
    super();
    this.dataStream.next(initialData);
  }

  connect(): Observable<IItem[]> {
    return this.dataStream.asObservable();
  }

  disconnect() {
    this.dataStream.complete();
    this.apiSubscription.unsubscribe();
  }

  public loadItems(query: string): void {
    this.apiSubscription.add(this.itemApiService.list(query).subscribe(result => {
      this.dataStream.next(result);
    }));
  }
}

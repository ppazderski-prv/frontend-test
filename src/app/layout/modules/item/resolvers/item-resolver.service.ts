import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IItem } from '../interfaces/i-item';
import { ItemApiService } from '../services/item-api.service';

@Injectable({
  providedIn: 'root'
})
export class ItemResolverService implements Resolve<Observable<IItem>> {

  constructor(private itemApiService: ItemApiService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IItem> {
    return this.itemApiService.get(route.params.id);
  }
}

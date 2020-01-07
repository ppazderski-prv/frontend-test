import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemApiService } from '../services/item-api.service';
import { IItem } from '../interfaces/i-item';

@Injectable({
  providedIn: 'root'
})
export class ItemsResolverService implements Resolve<Observable<IItem[]>> {

  constructor(private itemApiService: ItemApiService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let query = '';
    if (route.queryParams.q) {
      query = route.queryParams.q;
    }
    return this.itemApiService.list(query);
  }
}

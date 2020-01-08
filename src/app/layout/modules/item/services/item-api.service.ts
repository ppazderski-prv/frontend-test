import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IItem } from '../interfaces/i-item';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemApiService {
  static URL: string = environment.apiBaseUrl + '/items';

  constructor(
    private httpClient: HttpClient
  ) { }

  public list(query: string = null): Observable<IItem[]> {
    return this.httpClient.get<IItem[]>(ItemApiService.URL,  {
      params : new HttpParams().set('q', query)
    }).pipe(map(res => this.mapResponseAsTree(res)));
  }

  public get(id: number): Observable<IItem> {
    return this.httpClient.get<IItem>(ItemApiService.URL + '/' + id);
  }

  private mapResponseAsTree(data: IItem[]): IItem[] {
    const relationMap = {};
    const result = [];
    for (const element of data) {
      element.children = [];
      relationMap[element.id] = element;
    }
    for (const element of data) {
      if (element.parent_id && relationMap[element.parent_id]) {
        relationMap[element.parent_id].children.push(element);
      } else {
        result.push(element);
      }
    }

    return result;
  }
}

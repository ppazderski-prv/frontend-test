import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IJwtToken } from '../interfaces/i-jwt-token';
import { AuthData } from '../models/auth-data';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  static URL: string = environment.apiBaseUrl + '/auth/login';

  constructor(
    private httpClient: HttpClient
  ) { }

  public login(authData: AuthData): Observable<IJwtToken> {
    return this.httpClient.post<IJwtToken>(AuthApiService.URL, authData);
  }
}

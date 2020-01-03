import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as jwtDecode from 'jwt-decode';
import { ITokenUser } from '../interfaces/i-token-user';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  static TOKEN_KEY = 'token';
  static TOKEN_USER_KEY = 'token_user';

  private tokenSubject: BehaviorSubject<string>;
  private tokenUserSubject: BehaviorSubject<ITokenUser>;

  constructor() {
    this.tokenSubject = new BehaviorSubject<string>(localStorage.getItem(JwtService.TOKEN_KEY));
    this.tokenUserSubject = new BehaviorSubject<ITokenUser>(JSON.parse(localStorage.getItem(JwtService.TOKEN_USER_KEY)));
  }

  public get token(): string {
    return this.tokenSubject.value;
  }

  public get tokenUser(): ITokenUser {
    return this.tokenUserSubject.value;
  }

  public setTokenData(token: string): void {
    localStorage.setItem(JwtService.TOKEN_KEY, token);
    this.tokenSubject.next(token);

    const tokenUser: ITokenUser = jwtDecode(token);
    localStorage.setItem(JwtService.TOKEN_USER_KEY, JSON.stringify(tokenUser));
    this.tokenUserSubject.next(tokenUser);
  }

  public destroyTokenData(): void {
    localStorage.clear();
    this.tokenSubject.next(null);
  }
}

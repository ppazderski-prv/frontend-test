import { IAuthData } from '../interfaces/i-auth-data';

export class AuthData implements IAuthData {
  public email: string;
  public password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

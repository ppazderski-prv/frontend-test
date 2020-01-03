import { IAuthData } from '../interfaces/i-auth-data';

export class AuthData implements IAuthData {
  email: string;
  password: string;
}

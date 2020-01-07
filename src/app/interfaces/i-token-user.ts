export interface ITokenUser {
  readonly id: number;
  readonly email: string;
  readonly username: string;
  readonly avatar: string;
  readonly exp: number;
  readonly iat: number;
}

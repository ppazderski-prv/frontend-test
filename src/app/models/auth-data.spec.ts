import { AuthData } from './auth-data';

describe('AuthData', () => {
  it('should create an instance', () => {
    expect(new AuthData('email@test', 'pass')).toBeTruthy();
  });
});

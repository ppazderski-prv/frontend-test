import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate,
} from '@angular/router';
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild, CanActivate {
  constructor(
    private jwtService: JwtService,
    private router: Router
  ) {
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.isUserLogger();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.isUserLogger();
  }

  private isUserLogger(): boolean {
    if (!this.jwtService.token) {
      this.router.navigate(['/login']).then();
    }
    return !!this.jwtService.token;
  }
}

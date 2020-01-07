import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      const currentUrl = this.router.routerState.snapshot.url;
      if (err.status === 401 && currentUrl !== '/login') {
          this.router.navigate(['/login'], { queryParams: { returnUrl: currentUrl } }).then();
      } else if (err.status === 404) {
        this.router.navigate(['/404']).then();
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}

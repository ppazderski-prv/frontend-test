import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private mobileMenuVisibility: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  get mobileVisibility() {
    return this.mobileMenuVisibility.value;
  }

  get mobileVisibilityObservable() {
    return this.mobileMenuVisibility.asObservable();
  }

  public toggleMobileMenu() {
    this.mobileMenuVisibility.next(!this.mobileVisibility);
  }
}

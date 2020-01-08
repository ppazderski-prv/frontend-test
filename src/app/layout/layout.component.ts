import { Component, OnInit } from '@angular/core';
import { LayoutService } from './services/layout.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public mobileMenuOverlay = false;

  constructor(
    private layoutService: LayoutService
  ) { }

  ngOnInit() {
    this.layoutService.mobileVisibilityObservable.pipe(untilDestroyed(this)).subscribe(
      menuVisible => {
      this.mobileMenuOverlay = menuVisible;
    });
  }

  public onMobileOverlayClick(): void {
    this.layoutService.toggleMobileMenu();
  }

}

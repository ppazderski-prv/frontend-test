import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public mobileMenuVisible = false;

  constructor(private layoutService: LayoutService) { }

  ngOnInit() {
    this.layoutService.mobileVisibilityObservable.pipe(untilDestroyed(this)).subscribe(
      menuVisible => {
      this.mobileMenuVisible = menuVisible;
    });
  }

}

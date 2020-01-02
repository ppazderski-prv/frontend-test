import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [LayoutComponent, SidenavComponent, TopBarComponent, FooterComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FlexLayoutModule
  ]
})
export class LayoutModule { }

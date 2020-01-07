import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { ListComponent } from './components/list/list.component';
import { CdkTreeModule } from '@angular/cdk/tree';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreviewComponent } from './components/preview/preview.component';


@NgModule({
  declarations: [ListComponent, PreviewComponent],
  imports: [
    CommonModule,
    ItemRoutingModule,
    CdkTreeModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ItemModule { }

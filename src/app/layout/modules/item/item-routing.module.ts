import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { ItemsResolverService } from './resolvers/items-resolver.service';
import { PreviewComponent } from './components/preview/preview.component';
import { ItemResolverService } from './resolvers/item-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    resolve: { items: ItemsResolverService }
  },
  {
    path: ':id',
    component: PreviewComponent,
    resolve: { item: ItemResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }

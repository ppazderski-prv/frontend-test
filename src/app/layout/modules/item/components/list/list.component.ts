import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NestedTreeControl } from '@angular/cdk/tree';
import { IItem } from '../../interfaces/i-item';
import { ItemsNestedDataSource } from '../../data-sources/items-nested-data-source';
import { of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime } from 'rxjs/operators';
import { ItemApiService } from '../../services/item-api.service';


@UntilDestroy()
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public nestedTreeControl: NestedTreeControl<IItem>;
  public itemsNestedDataSource: ItemsNestedDataSource;
  public searchControl: FormControl;

  constructor(
    private route: ActivatedRoute,
    private itemApiService: ItemApiService,
    private router: Router
  ) {
  }

  ngOnInit() {
    const items = this.route.snapshot.data.items;
    this.nestedTreeControl = new NestedTreeControl<IItem>((node: IItem) => of(node.children));
    this.itemsNestedDataSource = new ItemsNestedDataSource(items, this.itemApiService);
    this.createSearch();
    this.router.events.pipe(untilDestroyed(this)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.searchControl.setValue(this.getSearchQuery());
        this.itemsNestedDataSource.loadItems(this.searchControl.value);
      }
    });
  }

  private createSearch() {
    this.searchControl = new FormControl(this.getSearchQuery());
    this.searchControl.valueChanges.pipe(untilDestroyed(this)).pipe(debounceTime(300)).subscribe((val) => {
      this.router.navigate([], {
        queryParams: { q: this.searchControl.value },
        relativeTo: this.route
      }).then();
    });
  }

  private getSearchQuery(): string {
    if (this.route.snapshot.queryParams.q) {
      return this.route.snapshot.queryParams.q;
    }
    return '';
  }
}

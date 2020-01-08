import { Component, OnInit } from '@angular/core';
import { IItem } from '../../interfaces/i-item';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  static DEFAULT_RETURN_URL = '/items';
  public item: IItem;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.item = this.route.snapshot.data.item;
  }

  public goToList(): void {
    this.router.navigate([PreviewComponent.DEFAULT_RETURN_URL], {
      queryParams: this.route.snapshot.queryParams
    }).then();
  }
}

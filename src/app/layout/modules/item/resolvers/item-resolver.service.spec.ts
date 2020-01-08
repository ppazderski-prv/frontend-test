import { TestBed } from '@angular/core/testing';

import { ItemResolverService } from './item-resolver.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ItemResolverService', () => {
  let service: ItemResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ItemResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

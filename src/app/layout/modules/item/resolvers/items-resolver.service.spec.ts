import { TestBed } from '@angular/core/testing';

import { ItemsResolverService } from './items-resolver.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ItemsResolverService', () => {
  let service: ItemsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ItemsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

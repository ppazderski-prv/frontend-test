import { TestBed } from '@angular/core/testing';

import { ItemApiService } from './item-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ItemApiService', () => {
  let service: ItemApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ItemApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

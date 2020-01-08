import { ItemsNestedDataSource } from './items-nested-data-source';
import { IItem } from '../interfaces/i-item';
import { ItemApiService } from '../services/item-api.service';

class MockItemApiService {

}

describe('ItemsNestedDataSource', () => {
  let initialData: IItem[];
  let service: ItemApiService;
  initialData = [];
  service = new MockItemApiService() as unknown as ItemApiService;


  it('should create an instance', () => {
    expect(new ItemsNestedDataSource(initialData, service)).toBeTruthy();
  });
});

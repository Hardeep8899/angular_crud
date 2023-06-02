import { TestBed } from '@angular/core/testing';

import { WeApiService } from './web-api.service';

describe('WebApiService', () => {
  let service: WeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

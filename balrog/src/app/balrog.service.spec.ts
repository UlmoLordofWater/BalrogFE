import { TestBed } from '@angular/core/testing';

import { BalrogService } from './balrog.service';

describe('BalrogService', () => {
  let service: BalrogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalrogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

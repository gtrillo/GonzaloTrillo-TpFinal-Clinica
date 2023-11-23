import { TestBed } from '@angular/core/testing';

import { ValidacionServiceService } from './validacion-service.service';

describe('ValidacionServiceService', () => {
  let service: ValidacionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidacionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

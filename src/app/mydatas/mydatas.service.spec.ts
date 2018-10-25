import { TestBed } from '@angular/core/testing';

import { MydatasService } from './mydatas.service';

describe('MydatasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MydatasService = TestBed.get(MydatasService);
    expect(service).toBeTruthy();
  });
});

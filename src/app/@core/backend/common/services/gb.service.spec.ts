import { TestBed } from '@angular/core/testing';

import { GbService } from './gb.service';

describe('GbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GbService = TestBed.get(GbService);
    expect(service).toBeTruthy();
  });
});

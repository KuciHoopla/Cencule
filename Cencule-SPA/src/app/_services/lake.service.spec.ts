/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LakeService } from './lake.service';

describe('Service: Lakes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LakeService],
    });
  });

  it('should ...', inject([LakeService], (service: LakeService) => {
    expect(service).toBeTruthy();
  }));
});

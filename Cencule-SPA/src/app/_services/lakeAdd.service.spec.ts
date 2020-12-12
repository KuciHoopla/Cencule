/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LakeAddService } from './lakeAdd.service';

describe('Service: Lakes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LakeAddService]
    });
  });

  it('should ...', inject([LakeAddService], (service: LakeAddService) => {
    expect(service).toBeTruthy();
  }));
});

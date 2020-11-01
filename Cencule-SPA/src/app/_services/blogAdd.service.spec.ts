/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BlogAddService } from './blogAdd.service';

describe('Service: Blogs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogAddService]
    });
  });

  it('should ...', inject([BlogAddService], (service: BlogAddService) => {
    expect(service).toBeTruthy();
  }));
});

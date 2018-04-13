import { TestBed, inject } from '@angular/core/testing';

import { CommontService } from './commont.service';

describe('CommontService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommontService]
    });
  });

  it('should be created', inject([CommontService], (service: CommontService) => {
    expect(service).toBeTruthy();
  }));
});

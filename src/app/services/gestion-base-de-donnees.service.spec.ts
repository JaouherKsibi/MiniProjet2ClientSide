import { TestBed } from '@angular/core/testing';

import { GestionBaseDeDonneesService } from './gestion-base-de-donnees.service';

describe('GestionBaseDeDonneesService', () => {
  let service: GestionBaseDeDonneesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionBaseDeDonneesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

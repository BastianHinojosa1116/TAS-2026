import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenedorMunicipio } from './mantenedor-municipio';

describe('MantenedorMunicipio', () => {
  let component: MantenedorMunicipio;
  let fixture: ComponentFixture<MantenedorMunicipio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantenedorMunicipio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenedorMunicipio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMunicipio } from './dashboard-municipio';

describe('DashboardMunicipio', () => {
  let component: DashboardMunicipio;
  let fixture: ComponentFixture<DashboardMunicipio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMunicipio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMunicipio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

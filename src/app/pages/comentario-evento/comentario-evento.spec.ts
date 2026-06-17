import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioEvento } from './comentario-evento';

describe('ComentarioEvento', () => {
  let component: ComentarioEvento;
  let fixture: ComponentFixture<ComentarioEvento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentarioEvento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentarioEvento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

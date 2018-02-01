import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalkulatorNilaiComponent } from './kalkulator-nilai.component';

describe('KalkulatorNilaiComponent', () => {
  let component: KalkulatorNilaiComponent;
  let fixture: ComponentFixture<KalkulatorNilaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalkulatorNilaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalkulatorNilaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

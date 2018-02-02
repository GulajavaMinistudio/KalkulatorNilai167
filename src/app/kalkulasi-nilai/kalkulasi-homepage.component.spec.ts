import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalkulasiHomepageComponent } from './kalkulasi-homepage.component';

describe('KalkulasiHomepageComponent', () => {
  let component: KalkulasiHomepageComponent;
  let fixture: ComponentFixture<KalkulasiHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalkulasiHomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalkulasiHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

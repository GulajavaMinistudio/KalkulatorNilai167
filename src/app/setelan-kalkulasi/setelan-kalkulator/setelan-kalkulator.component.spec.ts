import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetelanKalkulatorComponent } from './setelan-kalkulator.component';

describe('SetelanKalkulatorComponent', () => {
  let component: SetelanKalkulatorComponent;
  let fixture: ComponentFixture<SetelanKalkulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SetelanKalkulatorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetelanKalkulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

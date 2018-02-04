import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TentangappHomeComponent } from './tentangapp-home.component';

describe('TentangappHomeComponent', () => {
  let component: TentangappHomeComponent;
  let fixture: ComponentFixture<TentangappHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TentangappHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TentangappHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

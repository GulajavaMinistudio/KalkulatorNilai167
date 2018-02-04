import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TentangAppAboutComponent } from './tentang-app-about.component';

describe('TentangAppAboutComponent', () => {
  let component: TentangAppAboutComponent;
  let fixture: ComponentFixture<TentangAppAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TentangAppAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TentangAppAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

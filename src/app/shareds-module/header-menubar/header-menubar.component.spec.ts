import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenubarComponent } from './header-menubar.component';

describe('HeaderMenubarComponent', () => {
  let component: HeaderMenubarComponent;
  let fixture: ComponentFixture<HeaderMenubarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMenubarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

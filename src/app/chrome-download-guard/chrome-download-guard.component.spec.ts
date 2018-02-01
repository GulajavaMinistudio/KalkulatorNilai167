import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChromeDownloadGuardComponent } from './chrome-download-guard.component';

describe('ChromeDownloadGuardComponent', () => {
  let component: ChromeDownloadGuardComponent;
  let fixture: ComponentFixture<ChromeDownloadGuardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChromeDownloadGuardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChromeDownloadGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

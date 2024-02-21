import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionBannerComponent } from './inspection-banner.component';

describe('InspectionBannerComponent', () => {
  let component: InspectionBannerComponent;
  let fixture: ComponentFixture<InspectionBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectionBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

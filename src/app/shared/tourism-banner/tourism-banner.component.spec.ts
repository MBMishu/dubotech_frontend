import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourismBannerComponent } from './tourism-banner.component';

describe('TourismBannerComponent', () => {
  let component: TourismBannerComponent;
  let fixture: ComponentFixture<TourismBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourismBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourismBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

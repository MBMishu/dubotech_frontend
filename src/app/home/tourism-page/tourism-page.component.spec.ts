import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourismPageComponent } from './tourism-page.component';

describe('TourismPageComponent', () => {
  let component: TourismPageComponent;
  let fixture: ComponentFixture<TourismPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourismPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourismPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

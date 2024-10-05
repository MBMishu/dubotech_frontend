import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddonProductCardComponent } from './addon-product-card.component';

describe('AddonProductCardComponent', () => {
  let component: AddonProductCardComponent;
  let fixture: ComponentFixture<AddonProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddonProductCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddonProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

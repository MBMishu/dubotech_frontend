import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopProductDetailsPageComponent } from './shop-product-details-page.component';

describe('ShopProductDetailsPageComponent', () => {
  let component: ShopProductDetailsPageComponent;
  let fixture: ComponentFixture<ShopProductDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopProductDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopProductDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

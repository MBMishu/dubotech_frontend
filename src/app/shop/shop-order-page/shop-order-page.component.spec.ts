import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopOrderPageComponent } from './shop-order-page.component';

describe('ShopOrderPageComponent', () => {
  let component: ShopOrderPageComponent;
  let fixture: ComponentFixture<ShopOrderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopOrderPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

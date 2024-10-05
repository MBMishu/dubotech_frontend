import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopOrderSuccessPageComponent } from './shop-order-success-page.component';

describe('ShopOrderSuccessPageComponent', () => {
  let component: ShopOrderSuccessPageComponent;
  let fixture: ComponentFixture<ShopOrderSuccessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopOrderSuccessPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopOrderSuccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

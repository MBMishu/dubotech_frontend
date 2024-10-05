import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCategoryPageComponent } from './shop-category-page.component';

describe('ShopCategoryPageComponent', () => {
  let component: ShopCategoryPageComponent;
  let fixture: ComponentFixture<ShopCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopCategoryPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

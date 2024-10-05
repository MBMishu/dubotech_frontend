import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareCartComponent } from './share-cart.component';

describe('ShareCartComponent', () => {
  let component: ShareCartComponent;
  let fixture: ComponentFixture<ShareCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

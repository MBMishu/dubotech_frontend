import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasGalleryComponent } from './das-gallery.component';

describe('DasGalleryComponent', () => {
  let component: DasGalleryComponent;
  let fixture: ComponentFixture<DasGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DasGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DasGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

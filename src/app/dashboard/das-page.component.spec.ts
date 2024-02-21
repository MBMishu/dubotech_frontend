import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasPageComponent } from './das-page.component';

describe('DasPageComponent', () => {
  let component: DasPageComponent;
  let fixture: ComponentFixture<DasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DasPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

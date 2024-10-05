import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TunaComponent } from './tuna.component';

describe('TunaComponent', () => {
  let component: TunaComponent;
  let fixture: ComponentFixture<TunaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TunaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

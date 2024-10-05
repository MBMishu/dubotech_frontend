import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TunaOverviewComponent } from './tuna-overview.component';

describe('TunaOverviewComponent', () => {
  let component: TunaOverviewComponent;
  let fixture: ComponentFixture<TunaOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TunaOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TunaOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

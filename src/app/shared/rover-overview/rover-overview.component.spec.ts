import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoverOverviewComponent } from './rover-overview.component';

describe('RoverOverviewComponent', () => {
  let component: RoverOverviewComponent;
  let fixture: ComponentFixture<RoverOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoverOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoverOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OctopusOverviewComponent } from './octopus-overview.component';

describe('OctopusOverviewComponent', () => {
  let component: OctopusOverviewComponent;
  let fixture: ComponentFixture<OctopusOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OctopusOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OctopusOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

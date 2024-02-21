import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasTeamComponent } from './das-team.component';

describe('DasTeamComponent', () => {
  let component: DasTeamComponent;
  let fixture: ComponentFixture<DasTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DasTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DasTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

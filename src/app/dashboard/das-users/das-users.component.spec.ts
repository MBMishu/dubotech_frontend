import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasUsersComponent } from './das-users.component';

describe('DasUsersComponent', () => {
  let component: DasUsersComponent;
  let fixture: ComponentFixture<DasUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DasUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DasUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceEditComponent } from './absence-edit.component';

describe('AbsenceEditComponent', () => {
  let component: AbsenceEditComponent;
  let fixture: ComponentFixture<AbsenceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsenceEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

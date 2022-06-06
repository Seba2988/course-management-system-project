import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionLinkComponent } from './option-link.component';

describe('OptionLinkComponent', () => {
  let component: OptionLinkComponent;
  let fixture: ComponentFixture<OptionLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

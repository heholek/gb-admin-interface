import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GbDropdownComponent } from './gb-dropdown.component';

describe('GbDropdownComponent', () => {
  let component: GbDropdownComponent;
  let fixture: ComponentFixture<GbDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GbDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GbDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

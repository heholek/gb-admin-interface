import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GbMapComponent } from './gb-map.component';

describe('GbMapComponent', () => {
  let component: GbMapComponent;
  let fixture: ComponentFixture<GbMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GbMapComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GbMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

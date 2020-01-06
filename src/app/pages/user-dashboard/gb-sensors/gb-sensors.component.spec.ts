import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GbSensorsComponent } from './gb-sensors.component';

describe('GbSensorsComponent', () => {
  let component: GbSensorsComponent;
  let fixture: ComponentFixture<GbSensorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GbSensorsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GbSensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

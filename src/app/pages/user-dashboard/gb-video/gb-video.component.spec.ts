import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GbVideoComponent } from './gb-video.component';

describe('GbVideoComponent', () => {
  let component: GbVideoComponent;
  let fixture: ComponentFixture<GbVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GbVideoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GbVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

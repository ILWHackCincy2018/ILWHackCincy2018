import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadKillLocatorComponent } from './road-kill-locator.component';

describe('RoadKillLocatorComponent', () => {
  let component: RoadKillLocatorComponent;
  let fixture: ComponentFixture<RoadKillLocatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadKillLocatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadKillLocatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

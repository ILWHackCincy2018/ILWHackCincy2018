import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaidDescriptionComponent } from './raid-description.component';

describe('RaidDescriptionComponent', () => {
  let component: RaidDescriptionComponent;
  let fixture: ComponentFixture<RaidDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaidDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaidDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

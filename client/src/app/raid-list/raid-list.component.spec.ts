import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaidListComponent } from './raid-list.component';

describe('RaidListComponent', () => {
  let component: RaidListComponent;
  let fixture: ComponentFixture<RaidListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaidListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaidListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

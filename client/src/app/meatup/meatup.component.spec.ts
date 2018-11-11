import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeatupComponent } from './meatup.component';

describe('MeatupComponent', () => {
  let component: MeatupComponent;
  let fixture: ComponentFixture<MeatupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeatupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeatupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

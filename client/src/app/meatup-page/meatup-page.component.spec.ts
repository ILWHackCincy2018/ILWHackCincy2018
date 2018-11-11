import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeatupPageComponent } from './meatup-page.component';

describe('MeatupPageComponent', () => {
  let component: MeatupPageComponent;
  let fixture: ComponentFixture<MeatupPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeatupPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeatupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

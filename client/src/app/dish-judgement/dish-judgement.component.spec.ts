import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishJudgementComponent } from './dish-judgement.component';

describe('DishJudgementComponent', () => {
  let component: DishJudgementComponent;
  let fixture: ComponentFixture<DishJudgementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishJudgementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishJudgementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

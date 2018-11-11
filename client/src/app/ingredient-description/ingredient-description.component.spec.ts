import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientDescriptionComponent } from './ingredient-description.component';

describe('IngredientDescriptionComponent', () => {
  let component: IngredientDescriptionComponent;
  let fixture: ComponentFixture<IngredientDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

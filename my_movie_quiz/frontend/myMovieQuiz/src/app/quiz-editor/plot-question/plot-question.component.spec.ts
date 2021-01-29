import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotQuestionComponent } from './plot-question.component';

describe('PlotQuestionComponent', () => {
  let component: PlotQuestionComponent;
  let fixture: ComponentFixture<PlotQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

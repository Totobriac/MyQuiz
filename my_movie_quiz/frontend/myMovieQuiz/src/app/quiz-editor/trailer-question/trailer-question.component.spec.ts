import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerQuestionComponent } from './trailer-question.component';

describe('TrailerQuestionComponent', () => {
  let component: TrailerQuestionComponent;
  let fixture: ComponentFixture<TrailerQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrailerQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailerQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterQuestionComponent } from './poster-question.component';

describe('PosterQuestionComponent', () => {
  let component: PosterQuestionComponent;
  let fixture: ComponentFixture<PosterQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosterQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosterQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizCurtainComponent } from './quiz-curtain.component';

describe('QuizCurtainComponent', () => {
  let component: QuizCurtainComponent;
  let fixture: ComponentFixture<QuizCurtainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizCurtainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizCurtainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

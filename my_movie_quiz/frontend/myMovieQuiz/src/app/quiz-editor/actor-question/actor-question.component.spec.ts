import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorQuestionComponent } from './actor-question.component';

describe('ActorQuestionComponent', () => {
  let component: ActorQuestionComponent;
  let fixture: ComponentFixture<ActorQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

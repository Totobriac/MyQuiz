import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicQuestionComponent } from './music-question.component';

describe('MusicQuestionComponent', () => {
  let component: MusicQuestionComponent;
  let fixture: ComponentFixture<MusicQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

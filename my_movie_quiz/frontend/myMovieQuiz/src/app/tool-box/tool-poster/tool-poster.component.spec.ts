import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolPosterComponent } from './tool-poster.component';

describe('ToolPosterComponent', () => {
  let component: ToolPosterComponent;
  let fixture: ComponentFixture<ToolPosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolPosterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolPosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

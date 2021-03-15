import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolCurtainComponent } from './tool-curtain.component';

describe('ToolCurtainComponent', () => {
  let component: ToolCurtainComponent;
  let fixture: ComponentFixture<ToolCurtainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolCurtainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolCurtainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

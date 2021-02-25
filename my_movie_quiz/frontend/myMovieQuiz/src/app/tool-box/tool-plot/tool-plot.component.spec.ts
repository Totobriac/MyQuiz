import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolPlotComponent } from './tool-plot.component';

describe('ToolPlotComponent', () => {
  let component: ToolPlotComponent;
  let fixture: ComponentFixture<ToolPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolPlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

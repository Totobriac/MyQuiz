import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolTrailerComponent } from './tool-trailer.component';

describe('ToolTrailerComponent', () => {
  let component: ToolTrailerComponent;
  let fixture: ComponentFixture<ToolTrailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolTrailerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolTrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolActorComponent } from './tool-actor.component';

describe('ToolActorComponent', () => {
  let component: ToolActorComponent;
  let fixture: ComponentFixture<ToolActorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolActorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

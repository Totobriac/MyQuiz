import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolMusicComponent } from './tool-music.component';

describe('ToolMusicComponent', () => {
  let component: ToolMusicComponent;
  let fixture: ComponentFixture<ToolMusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolMusicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

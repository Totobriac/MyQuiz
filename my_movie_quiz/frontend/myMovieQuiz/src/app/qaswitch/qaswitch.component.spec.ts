import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QASwitchComponent } from './qaswitch.component';

describe('QASwitchComponent', () => {
  let component: QASwitchComponent;
  let fixture: ComponentFixture<QASwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QASwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QASwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

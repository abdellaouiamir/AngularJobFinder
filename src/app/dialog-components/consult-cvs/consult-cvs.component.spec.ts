import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultCVsComponent } from './consult-cvs.component';

describe('ConsultCVsComponent', () => {
  let component: ConsultCVsComponent;
  let fixture: ComponentFixture<ConsultCVsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultCVsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultCVsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

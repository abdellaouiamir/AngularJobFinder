import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverletterComponent } from './coverletter.component';

describe('CoverletterComponent', () => {
  let component: CoverletterComponent;
  let fixture: ComponentFixture<CoverletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverletterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoverletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

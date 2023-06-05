import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOffreComponent } from './post-offre.component';

describe('PostOffreComponent', () => {
  let component: PostOffreComponent;
  let fixture: ComponentFixture<PostOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostOffreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

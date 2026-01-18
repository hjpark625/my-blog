import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEditorComponent } from './post-editor';

describe('PostEditor', () => {
  let component: PostEditorComponent;
  let fixture: ComponentFixture<PostEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostEditorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

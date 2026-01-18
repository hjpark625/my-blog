import { Component, inject, input, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { ToastEditorComponent } from '../toast-editor/toast-editor.component';

@Component({
  selector: 'app-post-editor',
  imports: [ReactiveFormsModule, RouterLink, ToastEditorComponent],
  templateUrl: './post-editor.html',
  styleUrl: './post-editor.css',
})
export class PostEditorComponent {
  private fb = inject(FormBuilder);
  private postService = inject(PostService);
  private router = inject(Router);

  // Optional id for editing
  id = input<string>();

  form = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    tags: [''],
  });

  constructor() {
    // Load data if editing
    effect(() => {
      const id = this.id();
      if (id) {
        const post = this.postService.getPost(id);
        if (post) {
          this.form.patchValue({
            title: post.title,
            content: post.content,
            tags: post.tags?.join(', '),
          });
        }
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { title, content, tags } = this.form.value;
    const tagArray = tags
      ? tags
          .split(',')
          .map((t: string) => t.trim())
          .filter((t: string) => t)
      : [];

    if (this.id()) {
      this.postService.updatePost(this.id()!, {
        title: title!,
        content: content!,
        tags: tagArray,
      });
    } else {
      this.postService.addPost({
        title: title!,
        content: content!,
        tags: tagArray,
      });
    }

    this.router.navigate(['/blog']);
  }
}

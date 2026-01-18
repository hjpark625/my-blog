import { Component, computed, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common'; // date pipe is standalone
import { RouterLink } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-post-detail',
  imports: [RouterLink, DatePipe, MarkdownComponent],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css',
})
export class PostDetailComponent {
  private postService = inject(PostService);

  // Route param 'id' via Input Binding
  id = input.required<string>();

  post = computed(() => this.postService.getPost(this.id()));
}

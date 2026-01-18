import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-post-list',
  imports: [RouterLink, DatePipe],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostListComponent {
  private postService = inject(PostService);
  posts = this.postService.posts;
}

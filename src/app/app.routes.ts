import { Routes } from '@angular/router';
import { PostListComponent } from './features/blog/post-list/post-list';
import { PostDetailComponent } from './features/blog/post-detail/post-detail';
import { PostEditorComponent } from './features/blog/post-editor/post-editor';

export const routes: Routes = [
  { path: '', redirectTo: 'blog', pathMatch: 'full' },
  { path: 'blog', component: PostListComponent },
  { path: 'blog/:id', component: PostDetailComponent },
  { path: 'write', component: PostEditorComponent },
  { path: 'edit/:id', component: PostEditorComponent },
];

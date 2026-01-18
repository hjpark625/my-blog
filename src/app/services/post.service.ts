import { Injectable, signal } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  // Initial mock data
  private mockPosts: Post[] = [
    {
      id: '1',
      title: 'Angular v21 살펴보기',
      content:
        '# Angular v21\n\nAngular v21의 새로운 기능들을 알아봅시다.\n\n- Signals 강화\n- SSR 개선',
      excerpt: 'Angular v21의 주요 변경사항 요약',
      createdAt: new Date().toISOString(),
      tags: ['Angular', 'Frontend'],
    },
    {
      id: '2',
      title: 'Markdown 에디터형 블로그 만들기',
      content: '## 소개\n\nAngular로 직접 Markdown 에디터를 만드는 과정입니다.',
      excerpt: 'Angular로 블로그 시스템 구축하기',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      tags: ['Tutorial', 'Dev'],
    },
  ];

  // State
  private postsSignal = signal<Post[]>(this.mockPosts);

  // Selectors
  readonly posts = this.postsSignal.asReadonly();

  // Actions
  getPost(id: string): Post | undefined {
    return this.postsSignal().find((p) => p.id === id);
  }

  addPost(post: Omit<Post, 'id' | 'createdAt'>) {
    const newPost: Post = {
      ...post,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
    };
    this.postsSignal.update((posts: Post[]) => [newPost, ...posts]);
  }

  updatePost(id: string, updates: Partial<Post>) {
    this.postsSignal.update((posts: Post[]) =>
      posts.map((p: Post) =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p,
      ),
    );
  }

  deletePost(id: string) {
    this.postsSignal.update((posts: Post[]) => posts.filter((p: Post) => p.id !== id));
  }
}

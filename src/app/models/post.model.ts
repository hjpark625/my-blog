export interface Post {
  id: string;
  title: string;
  content: string; // Markdown content
  excerpt?: string;
  createdAt: string; // ISO date string
  updatedAt?: string;
  tags?: string[];
}

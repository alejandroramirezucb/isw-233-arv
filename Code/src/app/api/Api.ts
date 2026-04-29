import type { ProjectCard } from '@/entities/project/model/ProjectCard';
import type { ArticleCard } from '@/entities/article/model/ArticleCard';

export class Api {
  static async projects(): Promise<ProjectCard[]> {
    const response = await fetch('/data/projects.json');
    return response.json();
  }

  static async articles(): Promise<ArticleCard[]> {
    const response = await fetch('/data/blog.json');
    return response.json();
  }
}

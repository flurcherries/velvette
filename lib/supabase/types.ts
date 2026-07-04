export type ProjectVisibility = 'private' | 'public' | 'shared';

export interface UserProfile {
  id: string;
  display_name: string;
  username: string;
  bio?: string;
  avatar_url?: string;
  writing_goals?: string;
}

export interface ManuscriptRecord {
  id: string;
  title: string;
  author_name: string;
  progress: number;
  visibility: ProjectVisibility;
  updated_at: string;
}

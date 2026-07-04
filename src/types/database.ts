export interface Character {
  id: string
  name: string
  description: string | null
  personality: string | null
  appearance: string | null
  background: string | null
  avatar_url: string | null
  color: string
  created_at: string
  updated_at: string
}

export interface Story {
  id: string
  title: string
  content: string
  synopsis: string | null
  cover_url: string | null
  status: 'draft' | 'wip' | 'completed'
  created_at: string
  updated_at: string
}

export interface StoryCharacter {
  id: string
  story_id: string
  character_id: string
  role: string
  created_at: string
  character?: Character
}

export interface Relationship {
  id: string
  character_a_id: string
  character_b_id: string
  relationship_type: string
  description: string | null
  created_at: string
  character_a?: Character
  character_b?: Character
}

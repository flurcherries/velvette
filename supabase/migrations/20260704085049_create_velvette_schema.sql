/*
# Create Velvette Schema - Characters and Stories

A personal writing haven where characters meet and stories unfold.

## New Tables

### characters
- `id` (uuid, primary key) - unique character identifier
- `name` (text, not null) - character's name
- `description` (text) - character description/bio
- `personality` (text) - personality traits
- `appearance` (text) - physical appearance notes
- `background` (text) - backstory/origin
- `avatar_url` (text) - optional avatar image URL
- `color` (text) - theme color for the character (hex code)
- `created_at` (timestamptz) - creation timestamp
- `updated_at` (timestamptz) - last update timestamp

### stories
- `id` (uuid, primary key) - unique story identifier  
- `title` (text, not null) - story title
- `content` (text) - story content/text
- `synopsis` (text) - brief story summary
- `cover_url` (text) - optional cover image URL
- `status` (text) - draft/wip/completed
- `created_at` (timestamptz) - creation timestamp
- `updated_at` (timestamptz) - last update timestamp

### story_characters (junction table)
- `id` (uuid, primary key) - junction record identifier
- `story_id` (uuid, foreign key) - references story
- `character_id` (uuid, foreign key) - references character
- `role` (text) - character's role in the story (protagonist, antagonist, supporting, etc.)
- `created_at` (timestamptz) - when character was added to story

### relationships
- `id` (uuid, primary key) - relationship identifier
- `character_a_id` (uuid, foreign key) - first character
- `character_b_id` (uuid, foreign key) - second character
- `relationship_type` (text) - type of relationship (friend, enemy, family, romance, etc.)
- `description` (text) - details about the relationship
- `created_at` (timestamptz) - creation timestamp

## Security
- Enable RLS on all tables.
- Allow anon + authenticated full CRUD access (single-tenant, personal app).
*/

CREATE TABLE IF NOT EXISTS characters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  personality text,
  appearance text,
  background text,
  avatar_url text,
  color text DEFAULT '#D08B5A',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text DEFAULT '',
  synopsis text,
  cover_url text,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'wip', 'completed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS story_characters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id uuid NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  character_id uuid NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  role text DEFAULT 'supporting',
  created_at timestamptz DEFAULT now(),
  UNIQUE(story_id, character_id)
);

CREATE TABLE IF NOT EXISTS relationships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  character_a_id uuid NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  character_b_id uuid NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  relationship_type text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  CHECK (character_a_id != character_b_id)
);

-- Enable RLS on all tables
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE relationships ENABLE ROW LEVEL SECURITY;

-- Characters policies
DROP POLICY IF EXISTS "anon_select_characters" ON characters;
CREATE POLICY "anon_select_characters" ON characters FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_characters" ON characters;
CREATE POLICY "anon_insert_characters" ON characters FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_characters" ON characters;
CREATE POLICY "anon_update_characters" ON characters FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_characters" ON characters;
CREATE POLICY "anon_delete_characters" ON characters FOR DELETE
  TO anon, authenticated USING (true);

-- Stories policies
DROP POLICY IF EXISTS "anon_select_stories" ON stories;
CREATE POLICY "anon_select_stories" ON stories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_stories" ON stories;
CREATE POLICY "anon_insert_stories" ON stories FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_stories" ON stories;
CREATE POLICY "anon_update_stories" ON stories FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_stories" ON stories;
CREATE POLICY "anon_delete_stories" ON stories FOR DELETE
  TO anon, authenticated USING (true);

-- Story characters policies
DROP POLICY IF EXISTS "anon_select_story_characters" ON story_characters;
CREATE POLICY "anon_select_story_characters" ON story_characters FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_story_characters" ON story_characters;
CREATE POLICY "anon_insert_story_characters" ON story_characters FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_story_characters" ON story_characters;
CREATE POLICY "anon_update_story_characters" ON story_characters FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_story_characters" ON story_characters;
CREATE POLICY "anon_delete_story_characters" ON story_characters FOR DELETE
  TO anon, authenticated USING (true);

-- Relationships policies
DROP POLICY IF EXISTS "anon_select_relationships" ON relationships;
CREATE POLICY "anon_select_relationships" ON relationships FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_relationships" ON relationships;
CREATE POLICY "anon_insert_relationships" ON relationships FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_relationships" ON relationships;
CREATE POLICY "anon_update_relationships" ON relationships FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_relationships" ON relationships;
CREATE POLICY "anon_delete_relationships" ON relationships FOR DELETE
  TO anon, authenticated USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_stories_status ON stories(status);
CREATE INDEX IF NOT EXISTS idx_stories_created_at ON stories(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_characters_name ON characters(name);
CREATE INDEX IF NOT EXISTS idx_characters_created_at ON characters(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_story_characters_story ON story_characters(story_id);
CREATE INDEX IF NOT EXISTS idx_story_characters_character ON story_characters(character_id);
CREATE INDEX IF NOT EXISTS idx_relationships_character_a ON relationships(character_a_id);
CREATE INDEX IF NOT EXISTS idx_relationships_character_b ON relationships(character_b_id);

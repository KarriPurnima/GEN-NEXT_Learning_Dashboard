-- ============================================================
--  Learning Dashboard — Supabase Database Setup
--  Run this in your Supabase SQL Editor
-- ============================================================

-- 1. Create the courses table
CREATE TABLE IF NOT EXISTS courses (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT        NOT NULL,
  progress    INTEGER     NOT NULL CHECK (progress >= 0 AND progress <= 100),
  icon_name   TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- 3. Allow public read access (anonymous users can SELECT)
CREATE POLICY "Allow public read access"
  ON courses
  FOR SELECT
  USING (true);

-- 4. Seed mock data
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns',  75, 'Layers'),
  ('TypeScript Deep Dive',     48, 'Code2'),
  ('Next.js App Router',       90, 'Zap'),
  ('Supabase & PostgreSQL',    30, 'Database');
<<<<<<< HEAD
# New Pages — File Placement Guide

## Files and where they go

| File in this folder     | Destination in your project                                                          |
|-------------------------|--------------------------------------------------------------------------------------|
| types.ts                | src/lib/types.ts  (REPLACE existing)                                                 |
| supabase-server.ts      | src/lib/supabase-server.ts  (REPLACE existing)                                       |
| CourseCard.tsx          | src/app/dashboard/_components/bento/CourseCard.tsx  (REPLACE)                       |
| courses-page.tsx        | src/app/dashboard/courses/page.tsx  (REPLACE existing stub)                          |
| CoursesGrid.tsx         | src/app/dashboard/courses/_components/CoursesGrid.tsx  (NEW FILE + NEW FOLDER)       |
| course-detail-page.tsx  | src/app/dashboard/courses/[id]/page.tsx  (NEW FOLDER [id])                           |
| CourseDetail.tsx        | src/app/dashboard/courses/[id]/_components/CourseDetail.tsx  (NEW)                  |
| progress-page.tsx       | src/app/dashboard/progress/page.tsx  (REPLACE existing stub)                         |
| ProgressView.tsx        | src/app/dashboard/progress/_components/ProgressView.tsx  (NEW FILE + NEW FOLDER)     |
| settings-page.tsx       | src/app/dashboard/settings/page.tsx  (REPLACE existing stub)                         |
| SettingsView.tsx        | src/app/dashboard/settings/_components/SettingsView.tsx  (NEW FILE + NEW FOLDER)     |

## New folder structure to create

```
src/app/dashboard/
  courses/
    page.tsx                         ← courses-page.tsx
    _components/
      CoursesGrid.tsx                ← CoursesGrid.tsx
    [id]/
      page.tsx                       ← course-detail-page.tsx
      _components/
        CourseDetail.tsx             ← CourseDetail.tsx
  progress/
    page.tsx                         ← progress-page.tsx
    _components/
      ProgressView.tsx               ← ProgressView.tsx
  settings/
    page.tsx                         ← settings-page.tsx
    _components/
      SettingsView.tsx               ← SettingsView.tsx
```

## Features added

- **Courses page**: lists all courses with progress bars, click any card to open it
- **Course detail page** (`/dashboard/courses/[id]`): 
  - Shows all lessons as a checklist
  - Click lessons to mark complete/incomplete
  - Progress bar updates live as you check lessons
  - "Save Progress" button writes the new % back to Supabase
- **Progress page**: summary stats, per-course bars, circular overall indicator
- **Settings page**: Profile / Notifications / Appearance / Account tabs with save feedback
- **CourseCard "Continue →" button**: now actually navigates to the course detail page

## Supabase: add optional columns (recommended)

Run this in your Supabase SQL editor to unlock richer course cards:

```sql
ALTER TABLE courses
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS total_lessons integer DEFAULT 10,
  ADD COLUMN IF NOT EXISTS category text,
  ADD COLUMN IF NOT EXISTS difficulty text DEFAULT 'Intermediate';
```

Then update your rows with real descriptions and categories.
=======
# GEN-NEXT_Learning_Dashboard
>>>>>>> 083d0fa8409554e56538a524695a4e9d001f31ec

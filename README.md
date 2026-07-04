# Velvette

Velvette is a cozy, fantasy-inspired creative sanctuary for authors, built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- Calm, journal-like interface inspired by velvet archives and handwritten notebooks
- Dashboard widgets, library shelf, and recent activity feed
- Manuscript editor experience with mood-aware writing modes and soft highlighting
- Worldbuilding, character, location, lore, and timeline views with custom categories
- Privacy-first architecture with security headers and Supabase-ready client setup

## Run locally

```bash
npm install
npm run dev
```

Create a local env file from the example and add your Supabase keys:

```bash
cp .env.example .env.local
```

Then open `http://localhost:3000` to explore the sanctuary.

## Environment variables

This project uses Supabase and requires the following env vars:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Set them in `.env.local` and do not commit that file.

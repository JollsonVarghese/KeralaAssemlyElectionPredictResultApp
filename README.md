# Kerala Assembly 2026 Prediction Poll

A React app that lets friends predict winners for Kerala Assembly constituencies district by district, save submissions to a shared Supabase database, and compare predictions side by side.

## Features

* Enter your name and submit predictions
* District-wise constituency selection
* Shared online storage with Supabase
* Side-by-side comparison of submissions
* Update an existing submission by using the same name
* Mobile-friendly layout

## Tech Stack

* React
* Tailwind CSS
* Supabase for centralized storage
* Vercel for hosting

## How it works

1. A user enters their name.
2. They select one predicted winner for each seat.
3. The app writes the submission to Supabase.
4. All users can read the same shared submissions.
5. Friends can compare predictions in a tabular format.

## Supabase setup

Create a new Supabase project and then run the following SQL in the SQL Editor.

```sql
create extension if not exists pgcrypto;

create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  submitted_at timestamptz not null default now()
);

create table if not exists predictions (
  id bigint generated always as identity primary key,
  submission_id uuid not null references submissions(id) on delete cascade,
  district text not null,
  seat text not null,
  candidate text,
  unique (submission_id, district, seat)
);
```

## Row Level Security

For a simple friends-only poll without login, you can allow public read and write access with policies like these.

```sql
alter table submissions enable row level security;
alter table predictions enable row level security;

create policy "Public can read submissions"
on submissions for select
using (true);

create policy "Public can insert submissions"
on submissions for insert
with check (true);

create policy "Public can update submissions"
on submissions for update
using (true)
with check (true);

create policy "Public can read predictions"
on predictions for select
using (true);

create policy "Public can insert predictions"
on predictions for insert
with check (true);

create policy "Public can delete predictions"
on predictions for delete
using (true);
```

These policies make the app easy to use, but they are open to anyone with the public app URL. For a more controlled version later, add authentication or an admin workflow.

## Environment variables

Create a `.env` file in your project root:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Vite exposes client-side environment variables through `import.meta.env`, and only variables prefixed with `VITE_` are exposed to the app. ([vite.dev](https://vite.dev/guide/env-and-mode?utm_source=chatgpt.com))

## Install dependencies

```bash
npm install
npm install @supabase/supabase-js
```

Supabase's JavaScript client is initialized with `createClient(...)`, and inserts can return rows when chained with `.select()`. ([supabase.com](https://supabase.com/docs/reference/javascript/initializing?utm_source=chatgpt.com))

## Run locally

```bash
npm run dev
```

## Deploy to Vercel

### Option 1: GitHub import

1. Push your code to GitHub.
2. Sign in to Vercel.
3. Import the repository.
4. Add the two environment variables in the Vercel project settings.
5. Deploy.

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

Vercel supports public deployments for frontend apps and production deployment through the CLI or Git-connected workflows. ([supabase.com](https://supabase.com/docs/reference/javascript/v1?utm_source=chatgpt.com))

## Important note about this app

This version currently trusts the typed name as the identity of the user. That means if two people use the same name, the later submission updates the earlier one. For a more robust version later, add a unique passcode, email login, or one-time invite links.

## Recommended improvements

* Add search by district or seat
* Add seat summary counts showing the most-picked candidate
* Add a progress bar by district
* Add export to CSV
* Add admin-only results view
* Add authentication for safer updates

## License

MIT

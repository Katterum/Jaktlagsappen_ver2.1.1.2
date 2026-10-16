-- v2.1.1.1 migration for existing project
alter table public.team_memberships add column if not exists member_id text;
alter table public.team_memberships add column if not exists username text;
alter table public.team_memberships add column if not exists active boolean not null default true;

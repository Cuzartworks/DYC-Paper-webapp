-- DYC PAPER admin data storage
-- Run this in Supabase SQL Editor

create table if not exists public.admin_store (
  id text primary key,
  content jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists admin_store_set_updated_at on public.admin_store;

create trigger admin_store_set_updated_at
before update on public.admin_store
for each row
execute function public.set_updated_at();

-- Optional seed row for the first run
insert into public.admin_store (id, content)
values (
  'default',
  '{
    "works": [],
    "boardPosts": [],
    "contacts": []
  }'::jsonb
)
on conflict (id) do nothing;

-- Public artwork storage. Uploads are performed server-side with the service role key.
insert into storage.buckets (id, name, public)
values ('artwork-images', 'artwork-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Public artwork images are readable" on storage.objects;
create policy "Public artwork images are readable"
on storage.objects for select
using (bucket_id = 'artwork-images');

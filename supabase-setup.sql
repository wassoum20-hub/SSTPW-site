create table if not exists public.site_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.site_media (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  media_type text not null check (media_type in ('image', 'video')),
  label text not null check (char_length(label) between 1 and 160),
  created_at timestamptz not null default now()
);

alter table public.site_admins enable row level security;
alter table public.site_media enable row level security;

create or replace function public.is_site_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.site_admins
    where user_id = (select auth.uid())
  )
  and (select auth.jwt() ->> 'aal') = 'aal2';
$$;

revoke all on function public.is_site_admin() from public;
grant execute on function public.is_site_admin() to authenticated;

grant select on public.site_admins to authenticated;
grant select on public.site_media to anon, authenticated;
grant insert, update, delete on public.site_media to authenticated;

drop policy if exists "Admins can read their own admin record" on public.site_admins;
create policy "Admins can read their own admin record"
  on public.site_admins for select to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Public can read site media" on public.site_media;
create policy "Public can read site media"
  on public.site_media for select to anon, authenticated
  using (true);

drop policy if exists "Admins can add site media" on public.site_media;
create policy "Admins can add site media"
  on public.site_media for insert to authenticated
  with check ((select public.is_site_admin()));

drop policy if exists "Admins can update site media" on public.site_media;
create policy "Admins can update site media"
  on public.site_media for update to authenticated
  using ((select public.is_site_admin()))
  with check ((select public.is_site_admin()));

drop policy if exists "Admins can delete site media" on public.site_media;
create policy "Admins can delete site media"
  on public.site_media for delete to authenticated
  using ((select public.is_site_admin()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'sstpw-media',
  'sstpw-media',
  true,
  52428800,
  array['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins can read SSTPW media" on storage.objects;
create policy "Admins can read SSTPW media"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'sstpw-media'
    and (select public.is_site_admin())
  );

drop policy if exists "Admins can upload SSTPW media" on storage.objects;
create policy "Admins can upload SSTPW media"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'sstpw-media'
    and (select public.is_site_admin())
  );

drop policy if exists "Admins can update SSTPW media" on storage.objects;
create policy "Admins can update SSTPW media"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'sstpw-media'
    and (select public.is_site_admin())
  )
  with check (
    bucket_id = 'sstpw-media'
    and (select public.is_site_admin())
  );

drop policy if exists "Admins can delete SSTPW media" on storage.objects;
create policy "Admins can delete SSTPW media"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'sstpw-media'
    and (select public.is_site_admin())
  );

-- After creating the admin user in Supabase Authentication, add its UUID here:
-- insert into public.site_admins (user_id) values ('ADMIN_USER_UUID');

notify pgrst, 'reload schema';
م
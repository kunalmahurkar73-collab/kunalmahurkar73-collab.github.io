-- Run in Supabase SQL Editor. These are REAL responses, never the synthetic dataset.
create table if not exists public.airbnb_plg_responses (
 id uuid primary key,
 created_at timestamptz not null default now(),
 role text not null check (role in ('traveller','host')),
 consent_version text not null default 'anonymous-v1',
 answers jsonb not null check (jsonb_typeof(answers) = 'object' and octet_length(answers::text) < 12000)
);
alter table public.airbnb_plg_responses enable row level security;
-- No anon/authenticated policies: the public frontend cannot insert or read raw data.
revoke all on public.airbnb_plg_responses from anon, authenticated;
create table if not exists public.airbnb_plg_rate_limits (
 rate_hash text primary key,
 attempts integer not null default 1,
 expires_at timestamptz not null
);
alter table public.airbnb_plg_rate_limits enable row level security;
revoke all on public.airbnb_plg_rate_limits from anon, authenticated;
-- A server-side, atomic limit is required; browser localStorage is only a courtesy.
create or replace function public.airbnb_plg_submit(p_id uuid,p_role text,p_answers jsonb,p_rate_hash text)
returns boolean language plpgsql security definer set search_path = public, pg_temp as $$
declare rate_count integer;
begin
 if p_role not in ('traveller','host') or jsonb_typeof(p_answers) <> 'object' or octet_length(p_answers::text) >= 12000 then
  raise exception 'Invalid response';
 end if;
 -- A retry with the same random ID is idempotent; raw response content is never returned.
 if exists(select 1 from public.airbnb_plg_responses where id=p_id) then return true; end if;
 insert into public.airbnb_plg_rate_limits(rate_hash,attempts,expires_at)
 values(p_rate_hash,1,now()+interval '2 days')
 on conflict(rate_hash) do update set attempts=airbnb_plg_rate_limits.attempts+1
 returning attempts into rate_count;
 -- Limit five successful submissions per network/day (shared networks may hit this).
 if rate_count > 5 then return false; end if;
 insert into public.airbnb_plg_responses(id,role,answers) values(p_id,p_role,p_answers)
 on conflict(id) do nothing;
 delete from public.airbnb_plg_rate_limits where expires_at < now();
 return true;
end; $$;
revoke all on function public.airbnb_plg_submit(uuid,text,jsonb,text) from public,anon,authenticated;
grant execute on function public.airbnb_plg_submit(uuid,text,jsonb,text) to service_role;
-- Export genuine responses only through the authenticated Supabase dashboard.
-- Planned retention: delete rows older than 12 months and run rate cleanup regularly:
-- delete from public.airbnb_plg_responses where created_at < now()-interval '12 months';
-- delete from public.airbnb_plg_rate_limits where expires_at < now();

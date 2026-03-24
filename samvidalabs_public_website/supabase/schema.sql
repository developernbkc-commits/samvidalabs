create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  full_name text not null,
  email text unique not null,
  phone text,
  city text,
  created_at timestamptz not null default now()
);

create table public.roles (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null
);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role_id uuid not null references public.roles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(profile_id, role_id)
);

create table public.course_modules (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  title text not null,
  track text not null,
  price_inr integer not null,
  duration_label text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.registrations (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id),
  status text not null default 'draft',
  preferred_mode text,
  learner_note text,
  total_amount_inr integer not null default 0,
  payment_status text not null default 'pending',
  assigned_batch_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.registration_modules (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid not null references public.registrations(id) on delete cascade,
  module_id uuid not null references public.course_modules(id),
  price_inr integer not null,
  unique(registration_id, module_id)
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid not null references public.registrations(id),
  provider text not null default 'razorpay',
  provider_payment_link_id text,
  provider_payment_id text,
  amount_inr integer not null,
  status text not null default 'created',
  raw_payload jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.batches (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  start_date date not null,
  slot_label text not null,
  capacity integer not null,
  seats_filled integer not null default 0,
  mentor_name text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_profile_id uuid references public.profiles(id),
  entity_type text not null,
  entity_id uuid,
  action text not null,
  details jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.registrations enable row level security;
alter table public.registration_modules enable row level security;
alter table public.payments enable row level security;
alter table public.batches enable row level security;
alter table public.audit_logs enable row level security;

-- Example policy placeholders. Replace claim lookups with your final JWT claims structure.
create policy "Learners can read own profile" on public.profiles
for select using (auth.uid() = auth_user_id);

create policy "Learners can read own registrations" on public.registrations
for select using (
  profile_id in (select id from public.profiles where auth_user_id = auth.uid())
);

-- UmrahHaji.com database schema draft
-- Target: PostgreSQL / Supabase
-- Date: 2026-07-01
-- Notes:
-- 1. This is a logical implementation draft, not a final production migration.
-- 2. Supabase auth.users is used as login identity source.
-- 3. RLS policies should be added after app-specific auth helper functions are finalized.

create extension if not exists pgcrypto;

-- =========================================================
-- 1. Common helpers
-- =========================================================

create table if not exists app_users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete cascade,
  display_name text,
  email text,
  phone text,
  avatar_file_id uuid,
  account_status text not null default 'active',
  preferred_language text not null default 'en',
  timezone text not null default 'Asia/Kuala_Lumpur',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists stored_files (
  id uuid primary key default gen_random_uuid(),
  bucket text not null,
  object_path text not null,
  original_filename text,
  mime_type text,
  file_size_bytes bigint,
  checksum text,
  visibility text not null default 'restricted',
  owner_user_id uuid references app_users(id),
  agency_id uuid,
  module_name text,
  entity_table text,
  entity_id uuid,
  scan_status text not null default 'pending',
  created_at timestamptz not null default now(),
  deleted_at timestamptz,
  unique (bucket, object_path)
);

create table if not exists file_access_logs (
  id uuid primary key default gen_random_uuid(),
  file_id uuid not null references stored_files(id) on delete cascade,
  actor_user_id uuid references app_users(id),
  action text not null,
  reason text,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references app_users(id),
  actor_portal text,
  agency_id uuid,
  action text not null,
  entity_table text not null,
  entity_id uuid,
  old_values jsonb,
  new_values jsonb,
  reason text,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create table if not exists event_outbox (
  id uuid primary key default gen_random_uuid(),
  event_key text not null,
  aggregate_table text,
  aggregate_id uuid,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending',
  attempts int not null default 0,
  scheduled_at timestamptz,
  processed_at timestamptz,
  created_at timestamptz not null default now()
);

-- =========================================================
-- 2. Portal membership and permissions
-- =========================================================

create table if not exists travel_agencies (
  id uuid primary key default gen_random_uuid(),
  legal_name text not null,
  public_display_name text,
  registration_number text,
  travel_license_number text,
  license_expiry_date date,
  agency_type text,
  country_code text,
  city text,
  website_url text,
  description text,
  logo_file_id uuid references stored_files(id),
  verification_status text not null default 'pending_review',
  public_profile_status text not null default 'hidden',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists permission_groups (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references travel_agencies(id) on delete cascade,
  portal text not null,
  name text not null,
  description text,
  is_system boolean not null default false,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (agency_id, portal, name)
);

create table if not exists permission_group_rules (
  id uuid primary key default gen_random_uuid(),
  permission_group_id uuid not null references permission_groups(id) on delete cascade,
  module_key text not null,
  action_key text not null,
  sensitive_key text,
  allowed boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists portal_memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_users(id) on delete cascade,
  portal text not null,
  agency_id uuid references travel_agencies(id) on delete cascade,
  permission_group_id uuid references permission_groups(id),
  role_key text not null,
  status text not null default 'active',
  invited_by_user_id uuid references app_users(id),
  accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, portal, agency_id)
);

create table if not exists admin_staff_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references app_users(id) on delete cascade,
  staff_code text,
  department text,
  title text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists travel_agency_staff (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references travel_agencies(id) on delete cascade,
  user_id uuid references app_users(id) on delete set null,
  staff_name text not null,
  email text not null,
  phone text,
  role_template text not null,
  permission_group_id uuid references permission_groups(id),
  invitation_status text not null default 'draft',
  status text not null default 'draft',
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (agency_id, email)
);

create table if not exists user_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_users(id) on delete cascade,
  session_status text not null default 'active',
  device_label text,
  ip_address inet,
  user_agent text,
  last_seen_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

-- =========================================================
-- 3. Agency profile documents and settings
-- =========================================================

create table if not exists travel_agency_documents (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references travel_agencies(id) on delete cascade,
  document_type text not null,
  file_id uuid references stored_files(id),
  status text not null default 'pending_review',
  expiry_date date,
  admin_remark text,
  submitted_at timestamptz,
  reviewed_at timestamptz,
  reviewed_by_user_id uuid references app_users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists travel_agency_bank_accounts (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references travel_agencies(id) on delete cascade,
  bank_name text not null,
  account_holder_name text not null,
  account_number_encrypted text,
  account_number_last4 text,
  status text not null default 'pending_review',
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists platform_settings (
  id uuid primary key default gen_random_uuid(),
  setting_key text not null unique,
  setting_value jsonb not null,
  ownership text not null default 'platform',
  is_sensitive boolean not null default false,
  updated_by_user_id uuid references app_users(id),
  updated_at timestamptz not null default now()
);

create table if not exists agency_settings (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references travel_agencies(id) on delete cascade,
  setting_key text not null,
  setting_value jsonb not null,
  ownership text not null default 'agency',
  updated_by_user_id uuid references app_users(id),
  updated_at timestamptz not null default now(),
  unique (agency_id, setting_key)
);

-- =========================================================
-- 4. Pilgrim / Jamaah profiles
-- =========================================================

create table if not exists pilgrim_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references app_users(id) on delete set null,
  full_name text not null,
  display_name text,
  email text,
  phone text,
  gender text,
  date_of_birth date,
  nationality_code text,
  identity_number_encrypted text,
  identity_number_last4 text,
  passport_number_encrypted text,
  passport_number_last4 text,
  passport_expiry_date date,
  address jsonb,
  emergency_contact jsonb,
  profile_status text not null default 'pending_profile',
  verification_status text not null default 'pending',
  created_by_agency_id uuid references travel_agencies(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists pilgrim_agency_links (
  id uuid primary key default gen_random_uuid(),
  pilgrim_id uuid not null references pilgrim_profiles(id) on delete cascade,
  agency_id uuid not null references travel_agencies(id) on delete cascade,
  link_source text not null,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  unique (pilgrim_id, agency_id)
);

create table if not exists pilgrim_family_groups (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references travel_agencies(id) on delete cascade,
  group_name text not null,
  primary_pilgrim_id uuid references pilgrim_profiles(id),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists pilgrim_family_members (
  id uuid primary key default gen_random_uuid(),
  family_group_id uuid not null references pilgrim_family_groups(id) on delete cascade,
  pilgrim_id uuid not null references pilgrim_profiles(id) on delete cascade,
  relationship text,
  is_primary_contact boolean not null default false,
  created_at timestamptz not null default now(),
  unique (family_group_id, pilgrim_id)
);

-- =========================================================
-- 5. Mutawwif profiles
-- =========================================================

create table if not exists mutawwif_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references app_users(id) on delete cascade,
  full_name text not null,
  display_name text,
  title text,
  phone text,
  email text,
  nationality_code text,
  identity_number_encrypted text,
  identity_number_last4 text,
  passport_number_encrypted text,
  passport_number_last4 text,
  profile_photo_file_id uuid references stored_files(id),
  verification_status text not null default 'pending_review',
  profile_completion_status text not null default 'incomplete',
  assignment_readiness_status text not null default 'not_ready',
  availability_status text not null default 'available',
  public_visibility_status text not null default 'private',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists mutawwif_documents (
  id uuid primary key default gen_random_uuid(),
  mutawwif_id uuid not null references mutawwif_profiles(id) on delete cascade,
  document_type text not null,
  file_id uuid references stored_files(id),
  status text not null default 'pending_review',
  expiry_date date,
  review_note text,
  reviewed_by_user_id uuid references app_users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists mutawwif_languages (
  id uuid primary key default gen_random_uuid(),
  mutawwif_id uuid not null references mutawwif_profiles(id) on delete cascade,
  language_code text not null,
  proficiency text not null,
  created_at timestamptz not null default now(),
  unique (mutawwif_id, language_code)
);

create table if not exists mutawwif_specializations (
  id uuid primary key default gen_random_uuid(),
  mutawwif_id uuid not null references mutawwif_profiles(id) on delete cascade,
  specialization_key text not null,
  created_at timestamptz not null default now(),
  unique (mutawwif_id, specialization_key)
);

create table if not exists mutawwif_availability (
  id uuid primary key default gen_random_uuid(),
  mutawwif_id uuid not null references mutawwif_profiles(id) on delete cascade,
  availability_type text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  reason text,
  visibility text not null default 'scheduler_visible',
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists mutawwif_assignment_preferences (
  id uuid primary key default gen_random_uuid(),
  mutawwif_id uuid not null references mutawwif_profiles(id) on delete cascade,
  preferred_role text,
  preferred_group_size text,
  preferred_language_group text,
  preferred_destination text,
  notes text,
  updated_at timestamptz not null default now(),
  unique (mutawwif_id)
);

-- =========================================================
-- 6. Master data
-- =========================================================

create table if not exists countries (
  code text primary key,
  name text not null,
  status text not null default 'active'
);

create table if not exists cities (
  id uuid primary key default gen_random_uuid(),
  country_code text references countries(code),
  name text not null,
  timezone text,
  status text not null default 'active',
  unique (country_code, name)
);

create table if not exists airlines (
  id uuid primary key default gen_random_uuid(),
  airline_code text unique,
  name text not null,
  logo_file_id uuid references stored_files(id),
  status text not null default 'active'
);

create table if not exists flights (
  id uuid primary key default gen_random_uuid(),
  airline_id uuid references airlines(id),
  flight_number text,
  origin_city_id uuid references cities(id),
  destination_city_id uuid references cities(id),
  departure_time time,
  arrival_time time,
  status text not null default 'active'
);

create table if not exists hotels (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city_id uuid references cities(id),
  star_rating numeric(2,1),
  distance_to_mosque_meters int,
  address text,
  image_file_id uuid references stored_files(id),
  status text not null default 'active'
);

create table if not exists seasons (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  season_type text not null,
  starts_on date,
  ends_on date,
  status text not null default 'active'
);

create table if not exists itinerary_templates (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references travel_agencies(id) on delete cascade,
  title text not null,
  description text,
  visibility text not null default 'platform',
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists itinerary_template_items (
  id uuid primary key default gen_random_uuid(),
  template_id uuid not null references itinerary_templates(id) on delete cascade,
  day_number int not null,
  title text not null,
  activity_type text,
  location_name text,
  guidance_article_id uuid,
  sort_order int not null default 0
);

create table if not exists document_types (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  label text not null,
  is_sensitive boolean not null default true,
  status text not null default 'active'
);

create table if not exists service_types (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  label text not null,
  status text not null default 'active'
);

-- =========================================================
-- 7. Packages
-- =========================================================

create table if not exists packages (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references travel_agencies(id) on delete cascade,
  package_code text,
  title text not null,
  category text not null,
  package_type text,
  description text,
  status text not null default 'draft',
  visibility text not null default 'private',
  starting_price_amount numeric(14,2),
  currency text not null default 'RM',
  default_duration_days int,
  thumbnail_file_id uuid references stored_files(id),
  published_at timestamptz,
  created_by_user_id uuid references app_users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  unique (agency_id, package_code)
);

create table if not exists package_schedules (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references packages(id) on delete cascade,
  season_id uuid references seasons(id),
  departure_date date,
  return_date date,
  departure_city_id uuid references cities(id),
  capacity int,
  seats_booked int not null default 0,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists package_prices (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references packages(id) on delete cascade,
  schedule_id uuid references package_schedules(id) on delete cascade,
  room_type text not null,
  pilgrim_category text,
  price_amount numeric(14,2) not null,
  deposit_amount numeric(14,2),
  currency text not null default 'RM',
  status text not null default 'active'
);

create table if not exists package_hotels (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references packages(id) on delete cascade,
  hotel_id uuid references hotels(id),
  city_id uuid references cities(id),
  nights int,
  snapshot jsonb not null default '{}'::jsonb
);

create table if not exists package_flights (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references packages(id) on delete cascade,
  flight_id uuid references flights(id),
  direction text,
  snapshot jsonb not null default '{}'::jsonb
);

create table if not exists package_itinerary_items (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references packages(id) on delete cascade,
  template_item_id uuid references itinerary_template_items(id),
  day_number int,
  title text not null,
  activity_type text,
  snapshot jsonb not null default '{}'::jsonb,
  sort_order int not null default 0
);

create table if not exists package_media (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references packages(id) on delete cascade,
  file_id uuid not null references stored_files(id),
  media_type text not null,
  sort_order int not null default 0
);

create table if not exists package_versions (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references packages(id) on delete cascade,
  version_number int not null,
  snapshot jsonb not null,
  change_reason text,
  created_by_user_id uuid references app_users(id),
  created_at timestamptz not null default now(),
  unique (package_id, version_number)
);

-- =========================================================
-- 8. Booking
-- =========================================================

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  booking_number text not null unique,
  agency_id uuid not null references travel_agencies(id) on delete restrict,
  package_id uuid references packages(id),
  schedule_id uuid references package_schedules(id),
  primary_pilgrim_id uuid references pilgrim_profiles(id),
  booking_type text not null default 'individual',
  booking_status text not null default 'draft',
  payment_status text not null default 'not_invoiced',
  package_snapshot jsonb not null default '{}'::jsonb,
  price_snapshot jsonb not null default '{}'::jsonb,
  referral_attribution_id uuid,
  created_by_user_id uuid references app_users(id),
  confirmed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists booking_participants (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  pilgrim_id uuid not null references pilgrim_profiles(id) on delete restrict,
  family_group_id uuid references pilgrim_family_groups(id),
  participant_role text,
  room_type text,
  pilgrim_category text,
  price_amount numeric(14,2),
  currency text not null default 'RM',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  unique (booking_id, pilgrim_id)
);

create table if not exists booking_price_items (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  participant_id uuid references booking_participants(id) on delete cascade,
  item_type text not null,
  description text not null,
  quantity numeric(12,2) not null default 1,
  unit_amount numeric(14,2) not null,
  total_amount numeric(14,2) not null,
  currency text not null default 'RM',
  snapshot jsonb not null default '{}'::jsonb
);

create table if not exists booking_cancellations (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  requested_by_user_id uuid references app_users(id),
  status text not null default 'requested',
  reason text,
  finance_review_required boolean not null default false,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

-- =========================================================
-- 9. Finance, payment, invoice
-- =========================================================

create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text not null unique,
  agency_id uuid not null references travel_agencies(id),
  booking_id uuid references bookings(id),
  pilgrim_id uuid references pilgrim_profiles(id),
  invoice_type text not null default 'booking_invoice',
  status text not null default 'draft',
  currency text not null default 'RM',
  total_amount numeric(14,2) not null default 0,
  paid_amount numeric(14,2) not null default 0,
  outstanding_amount numeric(14,2) not null default 0,
  due_date date,
  sent_at timestamptz,
  created_by_user_id uuid references app_users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references invoices(id) on delete cascade,
  source_table text,
  source_id uuid,
  description text not null,
  quantity numeric(12,2) not null default 1,
  unit_amount numeric(14,2) not null,
  total_amount numeric(14,2) not null,
  snapshot jsonb not null default '{}'::jsonb
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references invoices(id) on delete cascade,
  agency_id uuid not null references travel_agencies(id),
  payment_reference text,
  payment_method text,
  amount numeric(14,2) not null,
  currency text not null default 'RM',
  status text not null default 'pending_review',
  proof_file_id uuid references stored_files(id),
  recorded_by_user_id uuid references app_users(id),
  verified_by_user_id uuid references app_users(id),
  paid_at timestamptz,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists refunds (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid references invoices(id),
  payment_id uuid references payments(id),
  booking_id uuid references bookings(id),
  agency_id uuid references travel_agencies(id),
  amount numeric(14,2) not null,
  currency text not null default 'RM',
  status text not null default 'refund_pending',
  reason text,
  requested_by_user_id uuid references app_users(id),
  approved_by_user_id uuid references app_users(id),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists finance_ledger_entries (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references travel_agencies(id),
  user_id uuid references app_users(id),
  source_table text not null,
  source_id uuid not null,
  ledger_type text not null,
  direction text not null,
  amount numeric(14,2) not null,
  currency text not null default 'RM',
  status text not null default 'posted',
  posted_at timestamptz not null default now(),
  snapshot jsonb not null default '{}'::jsonb
);

create table if not exists commission_records (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references travel_agencies(id),
  booking_id uuid references bookings(id),
  payment_id uuid references payments(id),
  commission_type text not null,
  amount numeric(14,2) not null,
  currency text not null default 'RM',
  status text not null default 'pending',
  snapshot jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists settlement_batches (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references travel_agencies(id),
  batch_number text unique,
  status text not null default 'draft',
  total_amount numeric(14,2) not null default 0,
  currency text not null default 'RM',
  prepared_by_user_id uuid references app_users(id),
  created_at timestamptz not null default now(),
  settled_at timestamptz
);

create table if not exists settlement_items (
  id uuid primary key default gen_random_uuid(),
  settlement_batch_id uuid not null references settlement_batches(id) on delete cascade,
  ledger_entry_id uuid references finance_ledger_entries(id),
  amount numeric(14,2) not null,
  currency text not null default 'RM'
);

-- =========================================================
-- 10. Group trips and activities
-- =========================================================

create table if not exists group_trips (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references travel_agencies(id) on delete cascade,
  package_id uuid references packages(id),
  schedule_id uuid references package_schedules(id),
  trip_code text not null,
  title text not null,
  trip_status text not null default 'draft',
  starts_on date,
  ends_on date,
  departure_city_id uuid references cities(id),
  destination_summary text,
  package_snapshot jsonb not null default '{}'::jsonb,
  operational_snapshot jsonb not null default '{}'::jsonb,
  whatsapp_group_url text,
  created_by_user_id uuid references app_users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (agency_id, trip_code)
);

create table if not exists group_trip_allocations (
  id uuid primary key default gen_random_uuid(),
  group_trip_id uuid not null references group_trips(id) on delete cascade,
  booking_id uuid not null references bookings(id) on delete cascade,
  participant_id uuid references booking_participants(id) on delete cascade,
  allocation_status text not null default 'allocated',
  allocated_at timestamptz not null default now(),
  unique (group_trip_id, participant_id)
);

create table if not exists trip_members (
  id uuid primary key default gen_random_uuid(),
  group_trip_id uuid not null references group_trips(id) on delete cascade,
  pilgrim_id uuid not null references pilgrim_profiles(id) on delete restrict,
  booking_participant_id uuid references booking_participants(id),
  member_status text not null default 'active',
  room_label text,
  assistance_flags jsonb not null default '[]'::jsonb,
  service_summary jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (group_trip_id, pilgrim_id)
);

create table if not exists trip_activities (
  id uuid primary key default gen_random_uuid(),
  group_trip_id uuid not null references group_trips(id) on delete cascade,
  source_template_item_id uuid references itinerary_template_items(id),
  activity_date date,
  starts_at timestamptz,
  ends_at timestamptz,
  timezone text,
  title text not null,
  activity_type text,
  location_name text,
  meeting_point text,
  guidance_article_id uuid,
  activity_status text not null default 'scheduled',
  change_status text not null default 'unchanged',
  snapshot jsonb not null default '{}'::jsonb,
  sort_order int not null default 0
);

create table if not exists trip_hotels (
  id uuid primary key default gen_random_uuid(),
  group_trip_id uuid not null references group_trips(id) on delete cascade,
  hotel_id uuid references hotels(id),
  city_id uuid references cities(id),
  check_in_date date,
  check_out_date date,
  snapshot jsonb not null default '{}'::jsonb
);

create table if not exists trip_flights (
  id uuid primary key default gen_random_uuid(),
  group_trip_id uuid not null references group_trips(id) on delete cascade,
  flight_id uuid references flights(id),
  direction text,
  departure_at timestamptz,
  arrival_at timestamptz,
  snapshot jsonb not null default '{}'::jsonb
);

create table if not exists trip_transport_segments (
  id uuid primary key default gen_random_uuid(),
  group_trip_id uuid not null references group_trips(id) on delete cascade,
  segment_type text not null,
  provider_name text,
  starts_at timestamptz,
  origin text,
  destination text,
  status text not null default 'scheduled',
  snapshot jsonb not null default '{}'::jsonb
);

create table if not exists trip_room_assignments (
  id uuid primary key default gen_random_uuid(),
  group_trip_id uuid not null references group_trips(id) on delete cascade,
  room_label text not null,
  hotel_id uuid references hotels(id),
  room_type text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists trip_room_members (
  id uuid primary key default gen_random_uuid(),
  room_assignment_id uuid not null references trip_room_assignments(id) on delete cascade,
  trip_member_id uuid not null references trip_members(id) on delete cascade,
  unique (room_assignment_id, trip_member_id)
);

create table if not exists trip_change_acknowledgements (
  id uuid primary key default gen_random_uuid(),
  group_trip_id uuid references group_trips(id) on delete cascade,
  activity_id uuid references trip_activities(id) on delete cascade,
  user_id uuid not null references app_users(id),
  change_reference text,
  status text not null default 'acknowledged',
  acknowledged_at timestamptz not null default now()
);

-- =========================================================
-- 11. Mutawwif assignment and activity execution
-- =========================================================

create table if not exists mutawwif_assignments (
  id uuid primary key default gen_random_uuid(),
  group_trip_id uuid not null references group_trips(id) on delete cascade,
  activity_id uuid references trip_activities(id) on delete cascade,
  mutawwif_id uuid not null references mutawwif_profiles(id) on delete restrict,
  agency_id uuid not null references travel_agencies(id) on delete cascade,
  assignment_role text not null default 'assistant',
  assignment_status text not null default 'pending',
  starts_at timestamptz,
  ends_at timestamptz,
  assignment_snapshot jsonb not null default '{}'::jsonb,
  created_by_user_id uuid references app_users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists mutawwif_assignment_requests (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references mutawwif_assignments(id) on delete cascade,
  mutawwif_id uuid not null references mutawwif_profiles(id) on delete cascade,
  request_status text not null default 'pending_response',
  response text,
  response_reason text,
  responded_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists mutawwif_assignment_handover_notes (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references mutawwif_assignments(id) on delete cascade,
  from_mutawwif_id uuid references mutawwif_profiles(id),
  to_mutawwif_id uuid references mutawwif_profiles(id),
  note text,
  attachment_file_id uuid references stored_files(id),
  status text not null default 'submitted',
  created_at timestamptz not null default now()
);

create table if not exists mutawwif_activity_signals (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid not null references trip_activities(id) on delete cascade,
  mutawwif_id uuid not null references mutawwif_profiles(id) on delete cascade,
  signal text not null,
  note text,
  created_at timestamptz not null default now()
);

-- =========================================================
-- 12. Documents and service readiness
-- =========================================================

create table if not exists pilgrim_documents (
  id uuid primary key default gen_random_uuid(),
  pilgrim_id uuid not null references pilgrim_profiles(id) on delete cascade,
  agency_id uuid references travel_agencies(id),
  document_type_id uuid not null references document_types(id),
  file_id uuid references stored_files(id),
  status text not null default 'missing',
  expiry_date date,
  rejection_reason text,
  uploaded_by_user_id uuid references app_users(id),
  reviewed_by_user_id uuid references app_users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists document_requirements (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references travel_agencies(id),
  package_id uuid references packages(id) on delete cascade,
  group_trip_id uuid references group_trips(id) on delete cascade,
  document_type_id uuid not null references document_types(id),
  required_for text not null,
  is_required boolean not null default true,
  rule_config jsonb not null default '{}'::jsonb,
  status text not null default 'active'
);

create table if not exists service_requirements (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references travel_agencies(id),
  package_id uuid references packages(id) on delete cascade,
  group_trip_id uuid references group_trips(id) on delete cascade,
  service_type_id uuid not null references service_types(id),
  required_for text not null,
  is_required boolean not null default true,
  rule_config jsonb not null default '{}'::jsonb,
  status text not null default 'active'
);

create table if not exists readiness_items (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references travel_agencies(id),
  group_trip_id uuid references group_trips(id) on delete cascade,
  trip_member_id uuid references trip_members(id) on delete cascade,
  pilgrim_id uuid references pilgrim_profiles(id) on delete cascade,
  requirement_type text not null,
  document_requirement_id uuid references document_requirements(id),
  service_requirement_id uuid references service_requirements(id),
  status text not null default 'missing',
  blocks_readiness boolean not null default true,
  due_at timestamptz,
  safe_summary text,
  internal_note text,
  updated_by_user_id uuid references app_users(id),
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists readiness_item_events (
  id uuid primary key default gen_random_uuid(),
  readiness_item_id uuid not null references readiness_items(id) on delete cascade,
  old_status text,
  new_status text not null,
  actor_user_id uuid references app_users(id),
  reason text,
  created_at timestamptz not null default now()
);

-- =========================================================
-- 13. Referral
-- =========================================================

create table if not exists referral_programs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_scope text not null default 'platform',
  agency_id uuid references travel_agencies(id),
  reward_policy jsonb not null default '{}'::jsonb,
  status text not null default 'active',
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists referral_codes (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references referral_programs(id) on delete cascade,
  owner_user_id uuid not null references app_users(id) on delete cascade,
  owner_role text not null,
  code text not null unique,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists referral_clicks (
  id uuid primary key default gen_random_uuid(),
  referral_code_id uuid not null references referral_codes(id) on delete cascade,
  visitor_id text,
  landing_url text,
  ip_address inet,
  user_agent text,
  clicked_at timestamptz not null default now()
);

create table if not exists referral_attributions (
  id uuid primary key default gen_random_uuid(),
  referral_code_id uuid not null references referral_codes(id),
  booking_id uuid references bookings(id),
  referred_user_id uuid references app_users(id),
  attribution_status text not null default 'pending',
  attribution_snapshot jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists referral_rewards (
  id uuid primary key default gen_random_uuid(),
  referral_attribution_id uuid not null references referral_attributions(id),
  beneficiary_user_id uuid not null references app_users(id),
  reward_type text not null,
  amount numeric(14,2),
  currency text not null default 'RM',
  reward_status text not null default 'pending_review',
  finance_ledger_entry_id uuid references finance_ledger_entries(id),
  review_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================
-- 14. Mutawwif finance, payout, allowance
-- =========================================================

create table if not exists payout_destinations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_users(id) on delete cascade,
  destination_type text not null,
  provider_name text,
  account_holder_name text,
  account_identifier_encrypted text,
  account_identifier_last4 text,
  masked_label text not null,
  verification_status text not null default 'pending_review',
  is_primary boolean not null default false,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists allowance_records (
  id uuid primary key default gen_random_uuid(),
  mutawwif_id uuid not null references mutawwif_profiles(id) on delete cascade,
  agency_id uuid references travel_agencies(id),
  group_trip_id uuid references group_trips(id),
  assignment_id uuid references mutawwif_assignments(id),
  source_type text not null,
  amount numeric(14,2) not null,
  currency text not null default 'RM',
  status text not null default 'pending_review',
  finance_ledger_entry_id uuid references finance_ledger_entries(id),
  source_snapshot jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  released_at timestamptz
);

create table if not exists withdrawal_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_users(id) on delete cascade,
  mutawwif_id uuid references mutawwif_profiles(id) on delete cascade,
  payout_destination_id uuid references payout_destinations(id),
  amount numeric(14,2) not null,
  fee_amount numeric(14,2) not null default 0,
  net_amount numeric(14,2) not null,
  currency text not null default 'RM',
  status text not null default 'submitted',
  request_snapshot jsonb not null default '{}'::jsonb,
  submitted_at timestamptz not null default now(),
  processed_at timestamptz
);

-- =========================================================
-- 15. Reports / support
-- =========================================================

create table if not exists support_cases (
  id uuid primary key default gen_random_uuid(),
  case_number text not null unique,
  created_by_user_id uuid references app_users(id),
  agency_id uuid references travel_agencies(id),
  assigned_agency_pic_user_id uuid references app_users(id),
  category text not null,
  priority text not null default 'normal',
  status text not null default 'submitted',
  title text not null,
  description text,
  visibility_scope text not null default 'own',
  source_module text,
  source_snapshot jsonb not null default '{}'::jsonb,
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists support_case_links (
  id uuid primary key default gen_random_uuid(),
  support_case_id uuid not null references support_cases(id) on delete cascade,
  entity_table text not null,
  entity_id uuid not null,
  relation_type text not null,
  safe_snapshot jsonb not null default '{}'::jsonb
);

create table if not exists support_case_comments (
  id uuid primary key default gen_random_uuid(),
  support_case_id uuid not null references support_cases(id) on delete cascade,
  author_user_id uuid references app_users(id),
  comment_type text not null default 'public',
  body text not null,
  visibility text not null default 'case_participants',
  created_at timestamptz not null default now()
);

create table if not exists support_case_attachments (
  id uuid primary key default gen_random_uuid(),
  support_case_id uuid not null references support_cases(id) on delete cascade,
  file_id uuid not null references stored_files(id),
  uploaded_by_user_id uuid references app_users(id),
  visibility text not null default 'case_participants',
  created_at timestamptz not null default now()
);

-- =========================================================
-- 16. Notifications and announcements
-- =========================================================

create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  created_by_user_id uuid references app_users(id),
  agency_id uuid references travel_agencies(id),
  title text not null,
  body text not null,
  priority text not null default 'info',
  category text,
  status text not null default 'draft',
  requires_acknowledgement boolean not null default false,
  published_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists announcement_audiences (
  id uuid primary key default gen_random_uuid(),
  announcement_id uuid not null references announcements(id) on delete cascade,
  audience_type text not null,
  audience_id uuid,
  filter jsonb not null default '{}'::jsonb
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_user_id uuid not null references app_users(id) on delete cascade,
  announcement_id uuid references announcements(id) on delete set null,
  event_key text,
  title text not null,
  safe_summary text,
  category text,
  priority text not null default 'info',
  source_module text,
  source_table text,
  source_id uuid,
  read_at timestamptz,
  acknowledged_at timestamptz,
  archived_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists notification_deliveries (
  id uuid primary key default gen_random_uuid(),
  notification_id uuid not null references notifications(id) on delete cascade,
  channel text not null,
  delivery_status text not null default 'pending',
  provider_reference text,
  attempted_at timestamptz,
  delivered_at timestamptz,
  failure_reason text
);

create table if not exists notification_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_users(id) on delete cascade,
  category text not null,
  channel text not null,
  enabled boolean not null default true,
  updated_at timestamptz not null default now(),
  unique (user_id, category, channel)
);

-- =========================================================
-- 17. Articles, knowledge base, testimonials
-- =========================================================

create table if not exists article_categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references article_categories(id),
  name text not null,
  slug text not null unique,
  status text not null default 'active'
);

create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references article_categories(id),
  agency_id uuid references travel_agencies(id),
  title text not null,
  slug text not null unique,
  body text not null,
  status text not null default 'draft',
  visibility text not null default 'public',
  source_label text,
  reviewer_label text,
  disclaimer text,
  published_at timestamptz,
  created_by_user_id uuid references app_users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists article_context_links (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references articles(id) on delete cascade,
  context_type text not null,
  context_id uuid,
  sort_order int not null default 0
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  author_user_id uuid references app_users(id),
  agency_id uuid references travel_agencies(id),
  package_id uuid references packages(id),
  booking_id uuid references bookings(id),
  group_trip_id uuid references group_trips(id),
  mutawwif_id uuid references mutawwif_profiles(id),
  rating numeric(2,1),
  title text,
  body text,
  status text not null default 'pending_review',
  visibility text not null default 'private',
  created_at timestamptz not null default now(),
  published_at timestamptz
);

create table if not exists ratings (
  id uuid primary key default gen_random_uuid(),
  author_user_id uuid references app_users(id),
  target_type text not null,
  target_id uuid not null,
  rating numeric(2,1) not null,
  feedback text,
  status text not null default 'submitted',
  created_at timestamptz not null default now()
);

-- =========================================================
-- 18. Comparison, saved packages, checkout support
-- =========================================================

create table if not exists saved_packages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_users(id) on delete cascade,
  package_id uuid not null references packages(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, package_id)
);

create table if not exists compare_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references app_users(id) on delete cascade,
  session_key text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists compare_session_items (
  id uuid primary key default gen_random_uuid(),
  compare_session_id uuid not null references compare_sessions(id) on delete cascade,
  package_id uuid not null references packages(id) on delete cascade,
  sort_order int not null default 0,
  unique (compare_session_id, package_id)
);

-- =========================================================
-- 19. Indexes
-- =========================================================

create index if not exists idx_portal_memberships_user on portal_memberships(user_id);
create index if not exists idx_portal_memberships_agency on portal_memberships(agency_id);
create unique index if not exists idx_permission_group_rules_unique
  on permission_group_rules (permission_group_id, module_key, action_key, coalesce(sensitive_key, ''));
create index if not exists idx_packages_agency_status on packages(agency_id, status);
create index if not exists idx_package_schedules_package_date on package_schedules(package_id, departure_date);
create index if not exists idx_bookings_agency_status on bookings(agency_id, booking_status);
create index if not exists idx_booking_participants_pilgrim on booking_participants(pilgrim_id);
create index if not exists idx_invoices_agency_status on invoices(agency_id, status);
create index if not exists idx_payments_invoice_status on payments(invoice_id, status);
create index if not exists idx_group_trips_agency_status on group_trips(agency_id, trip_status);
create index if not exists idx_trip_members_trip on trip_members(group_trip_id);
create index if not exists idx_trip_activities_trip_date on trip_activities(group_trip_id, activity_date);
create index if not exists idx_mutawwif_assignments_mutawwif on mutawwif_assignments(mutawwif_id, assignment_status);
create index if not exists idx_mutawwif_assignments_trip on mutawwif_assignments(group_trip_id);
create unique index if not exists idx_trip_change_ack_unique
  on trip_change_acknowledgements (coalesce(activity_id, group_trip_id), user_id, change_reference);
create index if not exists idx_readiness_items_trip_status on readiness_items(group_trip_id, status);
create index if not exists idx_support_cases_creator on support_cases(created_by_user_id, status);
create index if not exists idx_notifications_recipient on notifications(recipient_user_id, read_at, created_at desc);
create index if not exists idx_referral_codes_owner on referral_codes(owner_user_id, status);
create index if not exists idx_finance_ledger_source on finance_ledger_entries(source_table, source_id);
create index if not exists idx_stored_files_entity on stored_files(entity_table, entity_id);

-- =========================================================
-- 20. RLS placeholders
-- =========================================================

-- Enable RLS after helper functions are created.
-- Example:
-- alter table bookings enable row level security;
-- create policy "ta can read own agency bookings"
-- on bookings for select
-- using (
--   exists (
--     select 1
--     from portal_memberships pm
--     join app_users au on au.id = pm.user_id
--     where au.auth_user_id = auth.uid()
--       and pm.portal = 'travel_agency'
--       and pm.status = 'active'
--       and pm.agency_id = bookings.agency_id
--   )
-- );

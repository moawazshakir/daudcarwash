-- ============================================================
--  AUTOLAVAGGIO LA PALMA — Supabase Schema v2
--  Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- 1. Drop old table (old schema had different column names — must recreate)
DROP TABLE IF EXISTS bookings;

-- 2. Create the new bookings table
CREATE TABLE bookings (
  id                UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id        TEXT    UNIQUE NOT NULL,
  name              TEXT    NOT NULL,
  phone             TEXT    NOT NULL,
  email             TEXT    NOT NULL,
  vehicle_type      TEXT    NOT NULL,
  vehicle_brand     TEXT    NOT NULL,
  vehicle_model     TEXT    NOT NULL,
  service           TEXT    NOT NULL,
  package_type      TEXT    NOT NULL,
  booking_date      DATE    NOT NULL,
  booking_time      TEXT    NOT NULL,
  price             NUMERIC NOT NULL,
  calendar_event_id TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW(),

  -- Prevents double-booking at the DB level (race-condition safe)
  CONSTRAINT unique_booking_slot UNIQUE (booking_date, booking_time)
);

-- 3. Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
--    If you use SUPABASE_SERVICE_KEY in your API routes, these policies are
--    bypassed automatically. They are only needed when using the anon key.

-- Allow API to insert bookings
DROP POLICY IF EXISTS "api_insert" ON bookings;
CREATE POLICY "api_insert" ON bookings
  FOR INSERT WITH CHECK (true);

-- Allow API to read bookings (for availability checks and admin portal)
DROP POLICY IF EXISTS "api_select" ON bookings;
CREATE POLICY "api_select" ON bookings
  FOR SELECT USING (true);

-- Allow API to update bookings (for adding calendar_event_id)
DROP POLICY IF EXISTS "api_update" ON bookings;
CREATE POLICY "api_update" ON bookings
  FOR UPDATE USING (true);

-- 5. Index for fast availability queries
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings (booking_date);

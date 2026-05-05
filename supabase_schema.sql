-- SQL Code to run in Supabase SQL Editor

-- 1. Create the bookings table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    flexible_timing BOOLEAN DEFAULT FALSE,
    vehicle_type TEXT NOT NULL,
    vehicle_model TEXT NOT NULL,
    service_tier TEXT NOT NULL,
    pet_hair_removal BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'Pending'
);

-- 2. Turn on Row Level Security (RLS) for protection
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- 3. Create Security Policies
-- Allow anyone to create a new booking from the website
CREATE POLICY "Allow public inserts" ON bookings
    FOR INSERT WITH CHECK (true);

-- Allow anyone with the Anon Key to read bookings (for your admin portal)
-- Note: Supabase Anon Key is public. Since your admin portal is statically served, 
-- this allows the dashboard to read data. 
CREATE POLICY "Allow public reads" ON bookings
    FOR SELECT USING (true);

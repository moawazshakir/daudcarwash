const { supabase }         = require('./lib/supabase');
const { getSlotsForDate, isPastSlot } = require('./lib/slots');

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function generateBookingId() {
  const ts  = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `LP-${ts}-${rnd}`;
}

const REQUIRED = ['name','phone','email','vehicleType','vehicleBrand','vehicleModel',
                   'service','packageType','date','timeSlot','price'];

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const body = req.body || {};

  // ── Validate required fields ──────────────────────────────────────────────
  const missing = REQUIRED.filter(k => body[k] === undefined || body[k] === '');
  if (missing.length) {
    return res.status(400).json({ error: `Missing fields: ${missing.join(', ')}` });
  }

  const { name, phone, email, vehicleType, vehicleBrand, vehicleModel,
          service, packageType, date, timeSlot, price } = body;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
  }

  // ── Validate slot is valid for that day of week ───────────────────────────
  const validSlots = getSlotsForDate(date);
  if (!validSlots.includes(timeSlot)) {
    return res.status(400).json({ error: 'Invalid time slot for the selected date.' });
  }

  // ── Reject past slots ─────────────────────────────────────────────────────
  if (isPastSlot(date, timeSlot)) {
    return res.status(400).json({ error: 'Cannot book a time slot in the past.' });
  }

  // ── Double-check availability (pre-flight before DB insert) ───────────────
  const { data: existing, error: checkErr } = await supabase
    .from('bookings')
    .select('id')
    .eq('booking_date', date)
    .eq('booking_time', timeSlot)
    .maybeSingle();

  if (checkErr) {
    console.error('Availability check error:', checkErr);
    return res.status(500).json({ error: 'Server error during availability check.', debug: checkErr.message });
  }
  if (existing) {
    return res.status(409).json({
      error: 'Sorry, this time slot has just been booked. Please choose another time.',
      code:  'SLOT_TAKEN',
    });
  }

  // ── Insert booking — DB unique constraint catches any race condition ───────
  const bookingId = generateBookingId();

  const { data: inserted, error: insertErr } = await supabase
    .from('bookings')
    .insert({
      booking_id:    bookingId,
      name,
      phone,
      email,
      vehicle_type:  vehicleType,
      vehicle_brand: vehicleBrand,
      vehicle_model: vehicleModel,
      service,
      package_type:  packageType,
      booking_date:  date,
      booking_time:  timeSlot,
      price:         Number(price),
    })
    .select()
    .single();

  if (insertErr) {
    // PostgreSQL unique_violation
    if (insertErr.code === '23505') {
      return res.status(409).json({
        error: 'Sorry, this time slot has just been booked. Please choose another time.',
        code:  'SLOT_TAKEN',
      });
    }
    console.error('Supabase insert error:', insertErr);
    return res.status(500).json({ error: 'Booking failed. Please try again.' });
  }

  // ── Create Google Calendar event (non-fatal) ──────────────────────────────
  let calendarEventId = null;
  if (process.env.GOOGLE_REFRESH_TOKEN) {
    try {
      const { createCalendarEvent } = require('./lib/google-calendar');
      calendarEventId = await createCalendarEvent({
        bookingId, name, phone, email,
        vehicleType, vehicleBrand, vehicleModel,
        service, packageType, date, timeSlot, price,
      });

      await supabase
        .from('bookings')
        .update({ calendar_event_id: calendarEventId })
        .eq('id', inserted.id);
    } catch (calErr) {
      console.error('Google Calendar error (non-fatal):', calErr.message);
    }
  }

  return res.status(200).json({ success: true, bookingId, calendarEventId });
};

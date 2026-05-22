const { supabase }           = require('./lib/supabase');
const { getSlotsForDate, isPastSlot } = require('./lib/slots');

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
}

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET')    return res.status(405).json({ error: 'Method not allowed' });

  const { date } = req.query;
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: 'Invalid date. Use YYYY-MM-DD.' });
  }

  // Reject dates in the past (Rome date)
  const todayRome = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Rome' }).split(' ')[0];
  if (date < todayRome) {
    return res.status(400).json({ error: 'Cannot query availability for past dates.' });
  }

  const allSlots = getSlotsForDate(date);

  const { data, error } = await supabase
    .from('bookings')
    .select('booking_time, status')
    .eq('booking_date', date);

  if (error) {
    console.error('Supabase select error:', error);
    return res.status(500).json({ error: 'Failed to fetch availability.' });
  }

  const bookedSet  = new Set(data.filter(b => b.status === 'booked').map(b => b.booking_time));
  const pendingSet = new Set(data.filter(b => b.status !== 'booked').map(b => b.booking_time));

  const availableSlots = [];
  const bookedSlots    = [];
  const pendingSlots   = [];
  const pastSlots      = [];

  for (const slot of allSlots) {
    if (isPastSlot(date, slot)) {
      pastSlots.push(slot);
    } else if (bookedSet.has(slot)) {
      bookedSlots.push(slot);
    } else if (pendingSet.has(slot)) {
      pendingSlots.push(slot);
    } else {
      availableSlots.push(slot);
    }
  }

  return res.status(200).json({ date, allSlots, availableSlots, bookedSlots, pendingSlots, pastSlots });
};

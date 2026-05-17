// Keep in sync with SLOTS_WEEKDAY / SLOTS_SUNDAY in app/booking.js
const SLOTS_WEEKDAY = [
  '8:30 AM','9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM',
  '12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM',
  '3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM',
];
const SLOTS_SUNDAY = [
  '8:30 AM','9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM',
  '12:00 PM',
];

function getSlotsForDate(dateStr) {
  // dateStr: "YYYY-MM-DD"
  const date = new Date(dateStr + 'T00:00:00Z');
  const dow  = date.getUTCDay(); // 0 = Sunday
  return dow === 0 ? SLOTS_SUNDAY : SLOTS_WEEKDAY;
}

function slotTo24h(slot) {
  // "8:30 AM" → { h: 8, m: 30 }
  const [timePart, period] = slot.split(' ');
  let [h, m] = timePart.split(':').map(Number);
  if (period === 'PM' && h !== 12) h += 12;
  if (period === 'AM' && h === 12) h = 0;
  return { h, m };
}

function isPastSlot(dateStr, slot) {
  // Use Rome timezone via Intl (sv-SE gives ISO-format strings)
  const nowRome = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Rome' });
  const [nowDate, nowTime] = nowRome.split(' '); // "YYYY-MM-DD", "HH:MM:SS"

  if (dateStr > nowDate) return false;
  if (dateStr < nowDate) return true;

  // Same day — compare wall-clock time in Rome
  const { h, m } = slotTo24h(slot);
  const slotTime = String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':00';
  return slotTime <= nowTime;
}

module.exports = { getSlotsForDate, isPastSlot, slotTo24h, SLOTS_WEEKDAY, SLOTS_SUNDAY };

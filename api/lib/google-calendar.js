const { slotTo24h } = require('./slots');

// Service duration in minutes, keyed by packageType
const DURATIONS = {
  basic:            30,
  standard:         60,
  premium:          90,
  interior_premium: 120,
  engine_basic:     20,
};

function getOAuthClient() {
  const { google } = require('googleapis');
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  );
}

function getAuthenticatedClient() {
  const client = getOAuthClient();
  client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return client;
}

function addMinutesToTime(timeStr, minutes) {
  // timeStr: "HH:MM:SS" → new "HH:MM:SS" after adding minutes
  const [h, m] = timeStr.split(':').map(Number);
  const total  = h * 60 + m + minutes;
  return String(Math.floor(total / 60)).padStart(2, '0') + ':' + String(total % 60).padStart(2, '0') + ':00';
}

async function createCalendarEvent(booking) {
  const { google } = require('googleapis');
  const auth     = getAuthenticatedClient();
  const calendar = google.calendar({ version: 'v3', auth });

  const { h, m } = slotTo24h(booking.timeSlot);
  const startTime = String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':00';
  const duration  = DURATIONS[booking.packageType] || 60;
  const endTime   = addMinutesToTime(startTime, duration);

  const startDateTime = `${booking.date}T${startTime}`;
  const endDateTime   = `${booking.date}T${endTime}`;

  const description = [
    `Customer: ${booking.name}`,
    `Phone: ${booking.phone}`,
    `Email: ${booking.email}`,
    `Vehicle: ${booking.vehicleType} — ${booking.vehicleBrand} ${booking.vehicleModel}`,
    `Service: ${booking.service}`,
    `Package: ${booking.packageType}`,
    `Price: €${booking.price}`,
    `Booking ID: ${booking.bookingId}`,
  ].join('\n');

  const event = {
    summary:     `Car Wash Booking - ${booking.name} - ${booking.packageType}`,
    description,
    start: { dateTime: startDateTime, timeZone: 'Europe/Rome' },
    end:   { dateTime: endDateTime,   timeZone: 'Europe/Rome' },
  };

  const response = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
    resource:   event,
  });

  return response.data.id;
}

module.exports = { getOAuthClient, createCalendarEvent };

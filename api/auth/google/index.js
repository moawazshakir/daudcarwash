const { getOAuthClient } = require('../../lib/google-calendar');

module.exports = (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const client  = getOAuthClient();
  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope:       ['https://www.googleapis.com/auth/calendar'],
    prompt:      'consent', // force refresh_token every time
  });

  res.redirect(302, authUrl);
};

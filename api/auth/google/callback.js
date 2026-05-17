const { getOAuthClient } = require('../../lib/google-calendar');

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { code, error: oauthError } = req.query;

  if (oauthError) {
    return res.status(400).send(`<h2>OAuth Denied</h2><p>${oauthError}</p>`);
  }
  if (!code) {
    return res.status(400).send('<h2>Missing authorization code.</h2>');
  }

  const client = getOAuthClient();

  try {
    const { tokens } = await client.getToken(code);

    if (!tokens.refresh_token) {
      return res.status(400).send(`
        <!DOCTYPE html><html><head><title>No Refresh Token</title></head>
        <body style="font-family:sans-serif;max-width:620px;margin:60px auto;padding:20px">
          <h2>⚠️ No Refresh Token Received</h2>
          <p>Google only issues a refresh token on the <strong>first</strong> authorization.
             Please revoke access at
             <a href="https://myaccount.google.com/permissions" target="_blank">
               myaccount.google.com/permissions
             </a>
             and visit <code>/api/auth/google</code> again.
          </p>
        </body></html>
      `);
    }

    return res.status(200).send(`
      <!DOCTYPE html><html><head><title>Calendar Connected ✅</title></head>
      <body style="font-family:sans-serif;max-width:640px;margin:60px auto;padding:20px">
        <h2>✅ Google Calendar Connected!</h2>
        <p>Copy this value and add it as a Vercel environment variable, then redeploy:</p>
        <pre style="background:#f4f4f4;padding:16px;border-radius:8px;word-break:break-all">GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}</pre>
        <p style="color:#e53e3e"><strong>Keep this token secret — treat it like a password.</strong></p>
        <p>Once the env var is set and you've redeployed, Google Calendar sync is live.</p>
      </body></html>
    `);
  } catch (err) {
    console.error('OAuth callback error:', err);
    return res.status(500).send(`<h2>OAuth Error</h2><pre>${err.message}</pre>`);
  }
};

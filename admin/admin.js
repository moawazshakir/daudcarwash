// Replace these with your actual Supabase credentials
const SUPABASE_URL = "https://wqjkhoswqucapkddgaxl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxamtob3N3cXVjYXBrZGRnYXhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4NzM1MDEsImV4cCI6MjA5MzQ0OTUwMX0.-CSxDNYVEJGrQ4EwN7uHAis5Et3NVTip1tGBTgyKluw";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('admin-login-form');
  const passwordInput = document.getElementById('admin-password');
  const errorMsg = document.getElementById('error-msg');
  const loginPanel = document.getElementById('login-panel');
  const dashboardPanel = document.getElementById('dashboard-panel');

  // For this static prototype, we are checking the generated password here.
  // In a full production build, this would be verified via Supabase on a backend server.
  const ADMIN_PASSWORD = "xK9$mP2@vL7#qW5"; 

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
    submitBtn.disabled = true;

    // Simulate secure network verification delay
    setTimeout(() => {
      if (passwordInput.value === ADMIN_PASSWORD) {
        // Success Animation
        loginPanel.style.transform = 'scale(0.95)';
        loginPanel.style.opacity = '0';
        
        setTimeout(async () => {
          loginPanel.classList.add('hidden');
          dashboardPanel.classList.remove('hidden');
          
          // Expand container for the dashboard
          document.querySelector('.admin-container').classList.add('dashboard-active');
          
          // Trigger CSS reflow to ensure animation plays
          void dashboardPanel.offsetWidth;
          
          dashboardPanel.style.opacity = '1';
          dashboardPanel.style.transform = 'scale(1)';
          
          // Fetch data from Supabase
          await loadBookings();
        }, 300);
      } else {
        // Error Animation
        errorMsg.style.display = 'block';
        passwordInput.value = '';
        passwordInput.focus();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    }, 1200);
  });

  // Hide error message when user starts typing again
  passwordInput.addEventListener('input', () => {
    errorMsg.style.display = 'none';
  });
});

async function loadBookings() {
  const tbody = document.getElementById('bookings-body');
  
  if (SUPABASE_URL === "YOUR_SUPABASE_URL_HERE") {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: #ef4444; padding: 20px;">Please add your Supabase URL and Anon Key at the top of admin.js</td></tr>`;
    return;
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/bookings?select=*&order=created_at.desc`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    if (!response.ok) throw new Error('Failed to fetch data');

    const bookings = await response.json();
    
    if (bookings.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: var(--text-muted); padding: 20px;">No bookings found yet.</td></tr>`;
      return;
    }

    tbody.innerHTML = '';
    
    bookings.forEach(b => {
      const petBadge = b.pet_hair_removal ? '<span class="badge-yes">Yes</span>' : '<span class="badge-no">No</span>';
      const flexBadge = b.flexible_timing ? '<span class="badge-yes">Yes</span>' : '<span class="badge-no">No</span>';
      
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong style="color: var(--accent);">${b.appointment_id}</strong></td>
        <td>${b.name}</td>
        <td>${b.email}<br><span style="color: var(--text-muted); font-size: 12px;">${b.phone}</span></td>
        <td>${b.vehicle_model}<br><span style="color: var(--text-muted); font-size: 12px;">${b.vehicle_type}</span></td>
        <td style="text-transform: capitalize;">${b.service_tier}</td>
        <td>${b.date}<br><span style="color: var(--text-muted); font-size: 12px;">${b.time}</span></td>
        <td>${petBadge}</td>
        <td>${flexBadge}</td>
        <td>${b.status}</td>
      `;
      tbody.appendChild(tr);
    });

  } catch (error) {
    console.error('Error:', error);
    tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: #ef4444; padding: 20px;">Failed to load data. Is your Supabase configured correctly?</td></tr>`;
  }
}

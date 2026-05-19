// Replace these with your actual Supabase credentials
const SUPABASE_URL = "https://wqjkhoswqucapkddgaxl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxamtob3N3cXVjYXBrZGRnYXhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4NzM1MDEsImV4cCI6MjA5MzQ0OTUwMX0.-CSxDNYVEJGrQ4EwN7uHAis5Et3NVTip1tGBTgyKluw";

const ADMIN_PASS = "6501091";

function switchTab(name) {
  document.getElementById('tab-bookings').style.display = name === 'bookings' ? 'block' : 'none';
  document.getElementById('tab-reviews').style.display  = name === 'reviews'  ? 'block' : 'none';
  document.getElementById('tab-btn-bookings').classList.toggle('active', name === 'bookings');
  document.getElementById('tab-btn-reviews').classList.toggle('active',  name === 'reviews');
  if (name === 'reviews') loadAdminReviews();
}

async function loadAdminReviews() {
  const list = document.getElementById('admin-reviews-list');
  list.innerHTML = '<div style="text-align:center;color:var(--text-muted);padding:24px;"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';

  try {
    const res = await fetch('/api/reviews', {
      headers: { 'x-admin-password': ADMIN_PASS }
    });
    const reviews = await res.json();

    if (!reviews.length) {
      list.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:24px;">No reviews yet. Add the first one above.</p>';
      return;
    }

    list.innerHTML = reviews.map(r => {
      const stars = '★'.repeat(r.rating || 5) + '☆'.repeat(5 - (r.rating || 5));
      const date  = new Date(r.created_at).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
      return `
        <div class="admin-review-item" id="rv-${r.id}">
          <div class="arv-meta">
            <span class="arv-stars">${stars}</span>
            <strong>${r.reviewer_name}</strong>
            <span class="arv-role">${r.reviewer_role}</span>
            <span class="arv-date">${date}</span>
          </div>
          <p class="arv-text">"${r.review_text}"</p>
          <button class="arv-delete" onclick="deleteReview('${r.id}')">
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>`;
    }).join('');
  } catch (e) {
    list.innerHTML = '<p style="color:#ef4444;text-align:center;padding:24px;">Failed to load reviews.</p>';
  }
}

async function submitReview() {
  const name   = document.getElementById('rv-name').value.trim();
  const role   = document.getElementById('rv-role').value.trim();
  const text   = document.getElementById('rv-text').value.trim();
  const rating = parseInt(document.getElementById('rv-stars').dataset.rating) || 5;
  const msg    = document.getElementById('rv-msg');

  if (!name || !text) { msg.style.color = '#ef4444'; msg.textContent = 'Name and review text are required.'; return; }

  msg.style.color = 'var(--text-muted)';
  msg.textContent = 'Saving…';

  try {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': ADMIN_PASS },
      body: JSON.stringify({ reviewer_name: name, reviewer_role: role || 'Customer', review_text: text, rating })
    });

    if (!res.ok) { const e = await res.json(); throw new Error(e.error); }

    msg.style.color = '#10b981';
    msg.textContent = 'Review added!';
    document.getElementById('rv-name').value = '';
    document.getElementById('rv-role').value = '';
    document.getElementById('rv-text').value = '';
    document.getElementById('rv-stars').dataset.rating = 5;
    document.querySelectorAll('#rv-stars i').forEach(s => s.style.color = 'var(--accent)');
    setTimeout(() => { msg.textContent = ''; }, 3000);
    loadAdminReviews();
  } catch (e) {
    msg.style.color = '#ef4444';
    msg.textContent = 'Error: ' + e.message;
  }
}

async function deleteReview(id) {
  if (!confirm('Delete this review? This cannot be undone.')) return;

  const item = document.getElementById('rv-' + id);
  if (item) item.style.opacity = '0.4';

  try {
    const res = await fetch('/api/reviews', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': ADMIN_PASS },
      body: JSON.stringify({ id })
    });
    if (!res.ok) throw new Error();
    if (item) item.remove();
  } catch (e) {
    if (item) item.style.opacity = '1';
    alert('Delete failed. Please try again.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('admin-login-form');
  const passwordInput = document.getElementById('admin-password');
  const errorMsg = document.getElementById('error-msg');
  const loginPanel = document.getElementById('login-panel');
  const dashboardPanel = document.getElementById('dashboard-panel');

  // For this static prototype, we are checking the generated password here.
  // In a full production build, this would be verified via Supabase on a backend server.
  const ADMIN_PASSWORD = "6501091"; 

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
          
          await loadBookings();

          // Star picker for reviews tab
          document.querySelectorAll('#rv-stars i').forEach(star => {
            star.addEventListener('click', () => {
              const val = parseInt(star.dataset.val);
              document.getElementById('rv-stars').dataset.rating = val;
              document.querySelectorAll('#rv-stars i').forEach(s => {
                s.style.color = parseInt(s.dataset.val) <= val ? 'var(--accent)' : 'rgba(255,255,255,0.2)';
              });
            });
          });
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

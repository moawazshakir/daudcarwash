/* =============================================
   AUTOLAVAGGIO LA PALMA — script.js
   ============================================= */

// === PRICING DATA (4 tiers) ===
const pricingData = {
  sedan: [
    {
      name: "Basic",
      price: 15,
      features: [
        { text: "Exterior Hand Wash",   on: true  },
        { text: "Wheel Cleaning",        on: true  },
        { text: "Window Cleaning",       on: true  },
        { text: "Interior Vacuum",       on: false },
        { text: "Dashboard Wipe-Down",   on: false },
        { text: "Wax & Polish",          on: false },
        { text: "Tire Dressing",         on: false },
        { text: "Engine Bay Clean",      on: false },
      ]
    },
    {
      name: "Standard",
      price: 35,
      popular: true,
      features: [
        { text: "Exterior Hand Wash",   on: true  },
        { text: "Wheel Cleaning",        on: true  },
        { text: "Window Cleaning",       on: true  },
        { text: "Interior Vacuum",       on: true  },
        { text: "Dashboard Wipe-Down",   on: true  },
        { text: "Wax & Polish",          on: false },
        { text: "Tire Dressing",         on: false },
        { text: "Engine Bay Clean",      on: false },
      ]
    },
    {
      name: "Premium",
      price: 65,
      features: [
        { text: "Exterior Hand Wash",   on: true  },
        { text: "Wheel Cleaning",        on: true  },
        { text: "Window Cleaning",       on: true  },
        { text: "Interior Vacuum",       on: true  },
        { text: "Dashboard Wipe-Down",   on: true  },
        { text: "Wax & Polish",          on: true  },
        { text: "Tire Dressing",         on: true  },
        { text: "Engine Bay Clean",      on: false },
      ]
    },
    {
      name: "Elite",
      price: 99,
      elite: true,
      features: [
        { text: "Exterior Hand Wash",   on: true  },
        { text: "Wheel Cleaning",        on: true  },
        { text: "Window Cleaning",       on: true  },
        { text: "Interior Vacuum",       on: true  },
        { text: "Dashboard Wipe-Down",   on: true  },
        { text: "Wax & Polish",          on: true  },
        { text: "Tire Dressing",         on: true  },
        { text: "Engine Bay Clean",      on: true  },
      ]
    }
  ],
  suv: [
    {
      name: "Basic",
      price: 22,
      features: [
        { text: "Exterior Hand Wash",   on: true  },
        { text: "Wheel & Rim Cleaning", on: true  },
        { text: "Window Cleaning",       on: true  },
        { text: "Interior Vacuum",       on: false },
        { text: "Dashboard Wipe-Down",   on: false },
        { text: "Wax & Polish",          on: false },
        { text: "Tire Dressing",         on: false },
        { text: "Engine Bay Clean",      on: false },
      ]
    },
    {
      name: "Standard",
      price: 45,
      popular: true,
      features: [
        { text: "Exterior Hand Wash",   on: true  },
        { text: "Wheel & Rim Cleaning", on: true  },
        { text: "Window Cleaning",       on: true  },
        { text: "Interior Vacuum",       on: true  },
        { text: "Dashboard Wipe-Down",   on: true  },
        { text: "Wax & Polish",          on: false },
        { text: "Tire Dressing",         on: false },
        { text: "Engine Bay Clean",      on: false },
      ]
    },
    {
      name: "Premium",
      price: 85,
      features: [
        { text: "Exterior Hand Wash",   on: true  },
        { text: "Wheel & Rim Cleaning", on: true  },
        { text: "Window Cleaning",       on: true  },
        { text: "Interior Vacuum",       on: true  },
        { text: "Dashboard Wipe-Down",   on: true  },
        { text: "Wax & Polish",          on: true  },
        { text: "Tire Dressing",         on: true  },
        { text: "Engine Bay Clean",      on: false },
      ]
    },
    {
      name: "Elite",
      price: 130,
      elite: true,
      features: [
        { text: "Exterior Hand Wash",   on: true  },
        { text: "Wheel & Rim Cleaning", on: true  },
        { text: "Window Cleaning",       on: true  },
        { text: "Interior Vacuum",       on: true  },
        { text: "Dashboard Wipe-Down",   on: true  },
        { text: "Wax & Polish",          on: true  },
        { text: "Tire Dressing",         on: true  },
        { text: "Engine Bay Clean",      on: true  },
      ]
    }
  ],
  truck: [
    {
      name: "Basic",
      price: 28,
      features: [
        { text: "Exterior Hand Wash",     on: true  },
        { text: "Wheel & Undercarriage",  on: true  },
        { text: "Window Cleaning",         on: true  },
        { text: "Interior Vacuum",         on: false },
        { text: "Dashboard Wipe-Down",     on: false },
        { text: "Wax & Polish",            on: false },
        { text: "Tire Dressing",           on: false },
        { text: "Engine Bay Clean",        on: false },
      ]
    },
    {
      name: "Standard",
      price: 55,
      popular: true,
      features: [
        { text: "Exterior Hand Wash",     on: true  },
        { text: "Wheel & Undercarriage",  on: true  },
        { text: "Window Cleaning",         on: true  },
        { text: "Interior Vacuum",         on: true  },
        { text: "Dashboard Wipe-Down",     on: true  },
        { text: "Wax & Polish",            on: false },
        { text: "Tire Dressing",           on: false },
        { text: "Engine Bay Clean",        on: false },
      ]
    },
    {
      name: "Premium",
      price: 100,
      features: [
        { text: "Exterior Hand Wash",     on: true  },
        { text: "Wheel & Undercarriage",  on: true  },
        { text: "Window Cleaning",         on: true  },
        { text: "Interior Vacuum",         on: true  },
        { text: "Dashboard Wipe-Down",     on: true  },
        { text: "Wax & Polish",            on: true  },
        { text: "Tire Dressing",           on: true  },
        { text: "Engine Bay Clean",        on: false },
      ]
    },
    {
      name: "Elite",
      price: 155,
      elite: true,
      features: [
        { text: "Exterior Hand Wash",     on: true  },
        { text: "Wheel & Undercarriage",  on: true  },
        { text: "Window Cleaning",         on: true  },
        { text: "Interior Vacuum",         on: true  },
        { text: "Dashboard Wipe-Down",     on: true  },
        { text: "Wax & Polish",            on: true  },
        { text: "Tire Dressing",           on: true  },
        { text: "Engine Bay Clean",        on: true  },
      ]
    }
  ]
};

function renderPricing(category) {
  const grid = document.getElementById('pricing-cards');
  if (!grid) return;

  grid.innerHTML = pricingData[category].map(card => `
    <div class="p-card ${card.popular ? 'popular' : ''} ${card.elite ? 'elite' : ''}">
      ${card.popular ? '<div class="p-badge">Most Popular</div>' : ''}
      ${card.elite   ? '<div class="p-badge elite-badge"><i class="fas fa-crown"></i> Elite</div>' : ''}
      <p class="p-name">${card.name}</p>
      <div class="p-price">
        <sup>$</sup>
        <span class="amount">${card.price}</span>
      </div>
      <p class="p-period">per wash</p>
      <ul class="p-features">
        ${card.features.map(f => `
          <li class="${f.on ? '' : 'off'}">
            <i class="fas ${f.on ? 'fa-check' : 'fa-xmark'}"></i>
            ${f.text}
          </li>
        `).join('')}
      </ul>
      <a href="#booking" class="btn-primary">Book This Package</a>
    </div>
  `).join('');
}

renderPricing('sedan');

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPricing(btn.dataset.tab);
  });
});


// === NAVBAR ===
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});


// === SCROLL REVEAL ===
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${i * 80}ms`;
  revealObserver.observe(el);
});


// === STATS COUNTER ===
function animateCounter(el, target, duration) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start).toLocaleString('en-US');
  }, 16);
}

const statsSection = document.querySelector('.stats-section');
let statsAnimated = false;
if (statsSection) {
  new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsAnimated) {
      statsAnimated = true;
      document.querySelectorAll('.stat-num').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target, 10), 1800);
      });
    }
  }, { threshold: 0.5 }).observe(statsSection);
}


// === GALLERY LIGHTBOX ===
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lb-img');
const lbClose  = document.getElementById('lb-close');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lbImg.src = '';
}

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });


// === BOOKING SERVICE SELECTOR ===
document.querySelectorAll('.bk-svc-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.bk-svc-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Set minimum date to today
const dateInput = document.getElementById('bk-date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
  dateInput.value = today;
}

// === BOOKING FORM ===
// === BOOKING FORM CONFIGURATION ===
// TEST URL: Use this while building your workflow (requires clicking 'Execute Workflow' in n8n)
// PRODUCTION URL: Remove '-test' from the link and ACTIVATE the workflow in n8n to make it work 24/7.
const N8N_WEBHOOK_URL = "https://glokararehman.app.n8n.cloud/webhook-test/63febd10-033f-4b0f-8d4d-289a132daa3e"; 

const SUPABASE_URL = "https://wqjkhoswqucapkddgaxl.supabase.co";       // Replace with your Supabase URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxamtob3N3cXVjYXBrZGRnYXhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4NzM1MDEsImV4cCI6MjA5MzQ0OTUwMX0.-CSxDNYVEJGrQ4EwN7uHAis5Et3NVTip1tGBTgyKluw"; // Replace with your Supabase Anon Key

const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = bookingForm.querySelector('button[type="submit"]');
    const selectedSvc = document.querySelector('.bk-svc-btn.active').querySelector('span').innerText;
    
    // Generate a unique Appointment ID
    const appointmentId = 'APP-' + Math.floor(100000 + Math.random() * 900000);
    
    // Build the payload for n8n
    const payload = {
      appointmentId: appointmentId,
      name: document.getElementById('bk-name').value,
      email: document.getElementById('bk-email').value,
      phone: document.getElementById('bk-phone').value,
      date: document.getElementById('bk-date').value,
      time: document.getElementById('bk-time').value,
      flexibleTiming: document.getElementById('bk-flexible').checked,
      vehicle: document.getElementById('bk-vehicle').value,
      model: document.getElementById('bk-model').value,
      petHairRemoval: document.getElementById('bk-pet-hair').checked,
      service: selectedSvc
    };

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Confirming…';
    btn.disabled = true;

    try {
      // 1. Supabase Task
      let supabaseSuccess = false;
      if (SUPABASE_URL && SUPABASE_URL !== "YOUR_SUPABASE_URL_HERE") {
        try {
          console.log("Saving to Supabase...");
          const res = await fetch(`${SUPABASE_URL}/rest/v1/bookings`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
              appointment_id: payload.appointmentId,
              name: payload.name,
              email: payload.email,
              phone: payload.phone,
              date: payload.date,
              time: payload.time,
              flexible_timing: payload.flexibleTiming,
              vehicle_type: payload.vehicle,
              vehicle_model: payload.model,
              service_tier: payload.service,
              pet_hair_removal: payload.petHairRemoval
            })
          });
          if (res.ok) {
            supabaseSuccess = true;
            console.log("Supabase Success!");
          } else {
            console.error("Supabase returned an error:", await res.text());
          }
        } catch (err) {
          console.error("Supabase Network Error:", err);
        }
      }

      // 2. n8n Task (Independent but awaited)
      if (N8N_WEBHOOK_URL && N8N_WEBHOOK_URL !== "YOUR_N8N_WEBHOOK_URL_HERE") {
        try {
          console.log("Sending to n8n...");
          const n8nRes = await fetch(N8N_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload) // Sending the full payload
          });
          
          if (n8nRes.ok) {
            console.log("n8n Success!");
            const result = await n8nRes.json().catch(() => ({}));
            console.log("n8n Result:", result);
          } else {
            console.warn("n8n returned a status error:", n8nRes.status);
          }
        } catch (n8nErr) {
          console.warn("n8n Webhook connection failed (but DB was updated):", n8nErr);
        }
      }

      // Show success as long as Supabase worked
      if (supabaseSuccess) {
        btn.innerHTML = '<i class="fas fa-circle-check"></i> Appointment Confirmed!';
        btn.style.background = '#16a34a';
        console.log("Booking complete (Saved to DB)!", payload);
      } else {
        throw new Error("Database save failed");
      }

    } catch (error) {
      console.error('Critical Error:', error);
      btn.innerHTML = '<i class="fas fa-triangle-exclamation"></i> Error - Try Again';
      btn.style.background = '#dc2626';
    }

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-calendar-check"></i> Confirm Appointment';
      btn.style.background = '';
      btn.disabled = false;
      bookingForm.reset();
      if (typeof dateInput !== 'undefined' && dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
      }
      document.querySelectorAll('.bk-svc-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
    }, 4000);
  });
}


// === CONTACT FORM ===
const contactForm = document.getElementById('contact-form');
const submitBtn   = document.getElementById('submit-btn');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
    submitBtn.disabled  = true;
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitBtn.style.background = '#16a34a';
      setTimeout(() => {
        submitBtn.innerHTML    = '<i class="fas fa-paper-plane"></i> Send Message';
        submitBtn.style.background = '';
        submitBtn.disabled     = false;
        contactForm.reset();
      }, 3000);
    }, 1200);
  });
}


// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - (navbar.offsetHeight + 8),
      behavior: 'smooth'
    });
  });
});

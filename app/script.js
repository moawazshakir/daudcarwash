/* =============================================
   AUTOLAVAGGIO LA PALMA — script.js
   ============================================= */

// === PRICING DATA (3 tiers) ===
const pricingData = {
  sedan: [
    {
      name: "Basic",
      price: 15,
      features: [
        { text: "Lavaggio Esterno a Mano",   on: true  },
        { text: "Pulizia Cerchi",        on: true  },
        { text: "Pulizia Vetri",       on: true  },
        { text: "Aspirazione Interna",       on: true  },
        { text: "Pulizia Cruscotto",   on: false },
        { text: "Ceratura e Lucidatura",          on: false },
        { text: "Trattamento Pneumatici",         on: false },
        { text: "Pulizia Vano Motore",      on: false },
      ]
    },
    {
      name: "Standard",
      price: 25,
      popular: true,
      features: [
        { text: "Lavaggio Esterno a Mano",   on: true  },
        { text: "Pulizia Cerchi",        on: true  },
        { text: "Pulizia Vetri",       on: true  },
        { text: "Aspirazione Interna",       on: true  },
        { text: "Pulizia Cruscotto",   on: true  },
        { text: "Ceratura e Lucidatura",          on: true  },
        { text: "Trattamento Pneumatici",         on: true  },
        { text: "Pulizia Vano Motore",      on: true  },
      ]
    },
    {
      name: "Premium",
      price: 50,
      features: [
        { text: "Lavaggio Esterno a Mano",   on: true  },
        { text: "Pulizia Cerchi",        on: true  },
        { text: "Pulizia Vetri",       on: true  },
        { text: "Aspirazione Interna",       on: true  },
        { text: "Pulizia Cruscotto",   on: true  },
        { text: "Ceratura e Lucidatura",          on: true  },
        { text: "Trattamento Pneumatici",         on: true  },
        { text: "Pulizia Vano Motore",        on: true  },
        { text: "Pulizia Interna Profonda",  on: true  },
      ]
    }
  ],
  suv: [
    {
      name: "Basic",
      price: 20,
      features: [
        { text: "Lavaggio Esterno a Mano",   on: true  },
        { text: "Pulizia Cerchi e Bordi", on: true  },
        { text: "Pulizia Vetri",       on: true  },
        { text: "Aspirazione Interna",       on: true  },
        { text: "Pulizia Cruscotto",   on: false },
        { text: "Ceratura e Lucidatura",          on: false },
        { text: "Trattamento Pneumatici",         on: false },
        { text: "Pulizia Vano Motore",      on: false },
      ]
    },
    {
      name: "Standard",
      price: 35,
      popular: true,
      features: [
        { text: "Lavaggio Esterno a Mano",   on: true  },
        { text: "Pulizia Cerchi e Bordi", on: true  },
        { text: "Pulizia Vetri",       on: true  },
        { text: "Aspirazione Interna",       on: true  },
        { text: "Pulizia Cruscotto",   on: true  },
        { text: "Ceratura e Lucidatura",          on: true  },
        { text: "Trattamento Pneumatici",         on: true  },
        { text: "Pulizia Vano Motore",      on: true  },
      ]
    },
    {
      name: "Premium",
      price: 65,
      features: [
        { text: "Lavaggio Esterno a Mano",   on: true  },
        { text: "Pulizia Cerchi e Bordi", on: true  },
        { text: "Pulizia Vetri",       on: true  },
        { text: "Aspirazione Interna",       on: true  },
        { text: "Pulizia Cruscotto",   on: true  },
        { text: "Ceratura e Lucidatura",          on: true  },
        { text: "Trattamento Pneumatici",         on: true  },
        { text: "Pulizia Vano Motore",        on: true  },
        { text: "Pulizia Interna Profonda",  on: true  },
      ]
    }
  ],
  truck: [
    {
      name: "Basic",
      price: 25,
      features: [
        { text: "Lavaggio Esterno a Mano", on: true  },
        { text: "Cerchi e Sottoscocca",  on: true  },
        { text: "Pulizia Vetri",         on: true  },
        { text: "Aspirazione Interna",         on: true  },
        { text: "Pulizia Cruscotto",     on: false },
        { text: "Ceratura e Lucidatura",            on: false },
        { text: "Trattamento Pneumatici",           on: false },
        { text: "Pulizia Vano Motore",        on: false },
      ]
    },
    {
      name: "Standard",
      price: 45,
      popular: true,
      features: [
        { text: "Lavaggio Esterno a Mano", on: true  },
        { text: "Cerchi e Sottoscocca",  on: true  },
        { text: "Pulizia Vetri",         on: true  },
        { text: "Aspirazione Interna",         on: true  },
        { text: "Pulizia Cruscotto",     on: true  },
        { text: "Ceratura e Lucidatura",            on: true  },
        { text: "Trattamento Pneumatici",           on: true  },
        { text: "Pulizia Vano Motore",        on: true  },
      ]
    },
    {
      name: "Premium",
      price: 80,
      features: [
        { text: "Lavaggio Esterno a Mano", on: true  },
        { text: "Cerchi e Sottoscocca",  on: true  },
        { text: "Pulizia Vetri",         on: true  },
        { text: "Aspirazione Interna",         on: true  },
        { text: "Pulizia Cruscotto",     on: true  },
        { text: "Ceratura e Lucidatura",            on: true  },
        { text: "Trattamento Pneumatici",           on: true  },
        { text: "Pulizia Vano Motore",        on: true  },
        { text: "Pulizia Interna Profonda",  on: true  },
      ]
    }
  ]
};

const VTYPE_MAP = { sedan: 'sedan', suv: 'suv', truck: 'van' };

function renderPricing(category) {
  const grid = document.getElementById('pricing-cards');
  if (!grid) return;

  const vtype = VTYPE_MAP[category] || 'sedan';

  grid.innerHTML = pricingData[category].map(card => {
    const url = `booking/?vehicleType=${vtype}&packageType=${card.name.toLowerCase()}`;
    return `
    <div class="p-card ${card.popular ? 'popular' : ''} ${card.elite ? 'elite' : ''}"
         role="button" tabindex="0" aria-label="Prenota Pacchetto ${card.name} — €${card.price} per lavaggio"
         onclick="window.location.href='${url}'"
         onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();window.location.href='${url}'}">
      ${card.popular ? '<div class="p-badge">Più Scelto</div>' : ''}
      ${card.elite   ? '<div class="p-badge elite-badge"><i class="fas fa-crown"></i> Elite</div>' : ''}
      <p class="p-name">${card.name}</p>
      <div class="p-price">
        <sup>€</sup>
        <span class="amount">${card.price}</span>
      </div>
      <p class="p-period">per lavaggio</p>
      <ul class="p-features">
        ${card.features.map(f => `
          <li class="${f.on ? '' : 'off'}">
            <i class="fas ${f.on ? 'fa-check' : 'fa-xmark'}"></i>
            ${f.text}
          </li>
        `).join('')}
      </ul>
      <a href="${url}" class="btn-primary" tabindex="-1" onclick="event.stopPropagation()">Prenota Questo Pacchetto</a>
    </div>
  `}).join('');
}

// === SERVICE → PACKAGE RECOMMENDATION ===
const servicePackageMap = {
  exterior:   'basic',
  interior:   'standard',
  fullDetail: 'standard',
  vip:        'premium'
};

let activeRecommended = null;

function applyRecommendedPackage(pkgName) {
  document.querySelectorAll('.p-card.recommended').forEach(c => c.classList.remove('recommended'));
  document.querySelectorAll('.p-card').forEach(card => {
    const nameEl = card.querySelector('.p-name');
    if (nameEl && nameEl.textContent.trim().toLowerCase() === pkgName) {
      card.classList.add('recommended');
    }
  });
  const banner = document.getElementById('pricing-recommendation');
  if (!banner) return;
  const label = pkgName.charAt(0).toUpperCase() + pkgName.slice(1);
  banner.innerHTML = `<i class="fas fa-circle-check"></i> <strong>Pacchetto ${label}</strong> consigliato per il servizio selezionato`;
  banner.hidden = false;
}

renderPricing('sedan');

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPricing(btn.dataset.tab);
    if (activeRecommended) applyRecommendedPackage(activeRecommended);
  });
});

document.querySelectorAll('.service-card[data-service]').forEach(card => {
  const handleServiceClick = () => {
    const pkg = servicePackageMap[card.dataset.service];
    if (!pkg) return;
    activeRecommended = pkg;
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      window.scrollTo({
        top: pricingSection.getBoundingClientRect().top + window.scrollY - (navbar.offsetHeight + 8),
        behavior: 'smooth'
      });
    }
    setTimeout(() => applyRecommendedPackage(pkg), 350);
  };
  card.addEventListener('click', handleServiceClick);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleServiceClick();
    }
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

// Business hours (Europe/Rome timezone)
const BUSINESS_HOURS = {
  // Monday-Saturday
  'weekday': {
    start: '08:00',
    end: '18:00',
    slots: ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM']
  },
  // Sunday
  'sunday': {
    start: '08:30',
    end: '12:30',
    slots: ['8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM']
  }
};

function getAvailableTimeSlots(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  const dayOfWeek = date.getDay();

  if (dayOfWeek === 0) {
    return BUSINESS_HOURS.sunday.slots;
  } else {
    return BUSINESS_HOURS.weekday.slots;
  }
}

function renderTimeSlots(dateString) {
  const select = document.getElementById('bk-time-select');
  if (!select) return;

  select.innerHTML = '<option value="" disabled selected>Seleziona un orario…</option>';
  if (!dateString) return;

  const slots = getAvailableTimeSlots(dateString);
  slots.forEach(slot => {
    const opt = document.createElement('option');
    opt.value = slot;
    opt.textContent = slot;
    select.appendChild(opt);
  });
}

if (dateInput) {
  renderTimeSlots(dateInput.value);
  dateInput.addEventListener('change', (e) => {
    renderTimeSlots(e.target.value);
    const sel = document.getElementById('bk-time-select');
    if (sel) sel.value = '';
  });
}

// === BOOKING FORM ===
const N8N_WEBHOOK_URL = "https://afdfhashdf.app.n8n.cloud/webhook/book-appointment";

const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
  // Helper to convert 12h AM/PM to 24h HH:MM
  const convertTo24Hour = (timeStr) => {
    if (!timeStr) return "";
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours, 10);

    if (modifier === 'PM' && hours !== 12) {
      hours = hours + 12;
    }
    if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  };

  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = bookingForm.querySelector('button[type="submit"]');
    const msgEl = document.getElementById('booking-msg') || (() => {
      const el = document.createElement('div');
      el.id = 'booking-msg';
      el.style.marginTop = '15px';
      el.style.textAlign = 'center';
      el.style.fontSize = '14px';
      el.style.fontWeight = '600';
      bookingForm.appendChild(el);
      return el;
    })();

    const selectedSvcBtn = document.querySelector('.bk-svc-btn.active');
    const selectedSvc = selectedSvcBtn ? selectedSvcBtn.querySelector('span').innerText : "Standard Wash";

    const payload = {
      client_name: document.getElementById('bk-name').value,
      email: document.getElementById('bk-email').value,
      phone: document.getElementById('bk-phone').value,
      vehicle_type: document.getElementById('bk-vehicle').value,
      vehicle_model: document.getElementById('bk-model').value,
      plan: selectedSvc,
      date: document.getElementById('bk-date').value,
      time_slot: convertTo24Hour(document.getElementById('bk-time-select').value),
      pet_hair_removal: document.getElementById('bk-pet-hair') ? document.getElementById('bk-pet-hair').checked : false,
      flexible_timing: document.getElementById('bk-flexible') ? document.getElementById('bk-flexible').checked : false
    };

    // UI Loading State
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Elaborazione…';
    btn.disabled = true;
    msgEl.style.display = 'none';

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'autolaviggo_secret_2026'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      // Success — show confirmation overlay
      bookingForm.reset();
      renderTimeSlots(document.getElementById('bk-date').value);

      // Populate confirmation details
      const detailsEl = document.getElementById('confirm-details');
      const timeDisplay = payload.time_slot
        ? (() => {
            const [h, m] = payload.time_slot.split(':').map(Number);
            const suffix = h >= 12 ? 'PM' : 'AM';
            const h12 = h % 12 || 12;
            return `${h12}:${m.toString().padStart(2,'0')} ${suffix}`;
          })()
        : 'Flexible';

      const dateDisplay = payload.date
        ? new Date(payload.date + 'T00:00:00').toLocaleDateString('it-IT', { weekday:'long', year:'numeric', month:'long', day:'numeric' })
        : '—';

      detailsEl.innerHTML = `
        <div class="confirm-detail-row">
          <i class="fas fa-user"></i>
          <span class="confirm-detail-label">Nome</span>
          <span class="confirm-detail-value">${payload.client_name}</span>
        </div>
        <div class="confirm-detail-row">
          <i class="fas fa-star"></i>
          <span class="confirm-detail-label">Servizio</span>
          <span class="confirm-detail-value">${payload.plan}</span>
        </div>
        <div class="confirm-detail-row">
          <i class="fas fa-car"></i>
          <span class="confirm-detail-label">Veicolo</span>
          <span class="confirm-detail-value">${payload.vehicle_type}${payload.vehicle_model ? ' — ' + payload.vehicle_model : ''}</span>
        </div>
        <div class="confirm-detail-row">
          <i class="fas fa-calendar"></i>
          <span class="confirm-detail-label">Data</span>
          <span class="confirm-detail-value">${dateDisplay}</span>
        </div>
        <div class="confirm-detail-row">
          <i class="fas fa-clock"></i>
          <span class="confirm-detail-label">Orario</span>
          <span class="confirm-detail-value">${timeDisplay}</span>
        </div>
      `;

      document.getElementById('booking-confirmation').style.display = 'flex';

      // Reset button
      btn.innerHTML = '<i class="fas fa-calendar-check"></i> Conferma Prenotazione';
      btn.style.background = '';
      btn.disabled = false;

    } catch (error) {
      console.error('Booking Error:', error);
      btn.innerHTML = '<i class="fas fa-triangle-exclamation"></i> Riprova';
      btn.style.background = '#dc2626';
      
      msgEl.innerText = "Si è verificato un errore. Riprova o chiamaci al +39 351 373 5176.";
      msgEl.style.color = "#dc2626";
      msgEl.style.display = 'block';

      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-calendar-check"></i> Conferma Prenotazione';
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    }
  });
}

// === CONTACT FORM ===
const contactForm = document.getElementById('contact-form');
const submitBtn   = document.getElementById('submit-btn');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Invio in corso…';
    submitBtn.disabled  = true;
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Messaggio Inviato!';
      submitBtn.style.background = '#16a34a';
      setTimeout(() => {
        submitBtn.innerHTML    = '<i class="fas fa-paper-plane"></i> Invia Messaggio';
        submitBtn.style.background = '';
        submitBtn.disabled     = false;
        contactForm.reset();
      }, 3000);
    }, 1200);
  });
}


// === REVIEWS (loaded from Supabase via /api/reviews) ===
(async function loadReviews() {
  const grid = document.getElementById('reviews-grid');
  if (!grid) return;

  grid.innerHTML = '<p style="text-align:center;color:#94a3b8;padding:40px;grid-column:1/-1;"><i class="fas fa-spinner fa-spin"></i></p>';

  try {
    const res = await fetch('/api/reviews');
    if (!res.ok) throw new Error();
    const reviews = await res.json();

    if (!reviews.length) {
      grid.innerHTML = '<p style="text-align:center;color:#64748b;padding:40px;grid-column:1/-1;">Nessuna recensione ancora. Torna presto!</p>';
      return;
    }

    grid.innerHTML = reviews.map((r, i) => {
      const stars = '<i class="fas fa-star"></i>'.repeat(Math.min(5, r.rating || 5));
      const initials = r.reviewer_name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
      return `
        <div class="review-card">
          <div class="review-stars">${stars}</div>
          <p class="review-text">"${r.review_text}"</p>
          <div class="reviewer">
            <div class="reviewer-avatar reviewer-initials">${initials}</div>
            <div>
              <strong>${r.reviewer_name}</strong>
              <span>${r.reviewer_role}</span>
            </div>
          </div>
        </div>`;
    }).join('');
    document.dispatchEvent(new Event('reviews-loaded'));
  } catch (e) {
    grid.innerHTML = '';
  }
})();


// === REVIEWS DRAG SCROLL ===
(function () {
  function initDragScroll(el) {
    let isDown = false, startX, scrollLeft;
    el.addEventListener('mousedown', e => { isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; });
    el.addEventListener('mouseleave', () => { isDown = false; });
    el.addEventListener('mouseup', () => { isDown = false; });
    el.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX);
    });
  }
  const grid = document.getElementById('reviews-grid');
  if (grid) initDragScroll(grid);
  else document.addEventListener('reviews-loaded', () => { const g = document.getElementById('reviews-grid'); if (g) initDragScroll(g); });
})();


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

/* =============================================
   AUTOLAVAGGIO LA PALMA — booking.js
   Multi-step booking wizard logic
   ============================================= */

const N8N_WEBHOOK_URL = "https://glokararehman.app.n8n.cloud/webhook/book-appointment?apikey=autolaviggo_secret_2026";

// ===== BOOKING STATE =====
const state = {
  step: 1,
  category: null, categoryName: '',
  packageId: null, packageName: '',
  vehicleType: 'sedan',
  brand: '', model: '',
  addons: { pethair: false, stains: false },
  calYear: null, calMonth: null,
  date: null, dateStr: '',
  time: null,
  fname: '', lname: '', phone: '', email: '', plate: '', notes: '',
  basePrice: 0, totalPrice: 0,
};

// ===== PRICING DATA =====
const PACKAGES = {
  carwash: [
    { id: 'basic',    name: 'Basic Wash',     desc: 'Exterior hand wash, wheel & window cleaning',            price: { sedan: 15, suv: 22, van: 28 }, dur: 30,
      features: ['Exterior Hand Wash', 'Wheel Cleaning', 'Window Cleaning'] },
    { id: 'standard', name: 'Standard Wash',  desc: 'Full exterior + interior vacuum & dashboard wipe',       price: { sedan: 35, suv: 45, van: 55 }, dur: 60, popular: true,
      features: ['Exterior Hand Wash', 'Wheel Cleaning', 'Interior Vacuum', 'Dashboard Wipe-Down'] },
    { id: 'premium',  name: 'Premium Wash',   desc: 'Standard + wax, polish & tire dressing',                 price: { sedan: 65, suv: 85, van: 100 }, dur: 90,
      features: ['Full Standard Package', 'Wax & Polish', 'Tire Dressing', 'Air Freshener'] },
    { id: 'elite',    name: 'Elite Detail',   desc: 'Complete professional detail — inside and out',           price: { sedan: 99, suv: 129, van: 149 }, dur: 150,
      features: ['Full Premium Package', 'Engine Bay Clean', 'Leather Treatment', 'Paint Sealant'] },
  ],
  interior: [
    { id: 'basic',    name: 'Interior Refresh',    desc: 'Vacuum & quick wipe of all surfaces',               price: { sedan: 25, suv: 32, van: 38 }, dur: 40,
      features: ['Full Vacuum', 'Surface Wipe-Down', 'Window Interior Clean'] },
    { id: 'standard', name: 'Interior Deep Clean', desc: 'Thorough cleaning of all interior surfaces',        price: { sedan: 50, suv: 65, van: 78 }, dur: 90, popular: true,
      features: ['Deep Vacuum', 'Seat Shampoo', 'Carpet Shampoo', 'Dashboard Polish'] },
    { id: 'premium',  name: 'Interior Premium',    desc: 'Full clean with conditioning & odor elimination',   price: { sedan: 85, suv: 110, van: 130 }, dur: 120,
      features: ['Full Interior Deep Clean', 'Leather Conditioning', 'Odor Elimination', 'Fabric Protector'] },
    { id: 'elite',    name: 'Interior Elite',      desc: 'Complete interior detail & UV sanitization',        price: { sedan: 120, suv: 155, van: 180 }, dur: 180,
      features: ['Full Premium Package', 'UV Sanitization', 'Headliner Clean', 'Trunk Detail'] },
  ],
  polish: [
    { id: 'basic',    name: 'Hand Wax',          desc: 'Hand-applied carnauba wax for shine & protection',    price: { sedan: 30, suv: 38, van: 45 }, dur: 60,
      features: ['Hand Car Wash', 'Carnauba Wax', 'Tire Dressing'] },
    { id: 'standard', name: 'Machine Polish',    desc: 'Machine polish to remove light scratches & swirls',   price: { sedan: 55, suv: 70, van: 85 }, dur: 120, popular: true,
      features: ['Hand Wash', 'Clay Bar Treatment', 'Machine Polish', 'Wax Finish'] },
    { id: 'premium',  name: 'Paint Correction',  desc: 'Multi-stage correction for deeper scratches',         price: { sedan: 90, suv: 115, van: 140 }, dur: 180,
      features: ['Full Machine Polish', '2-Stage Paint Correction', 'Paint Sealant', 'Ceramic Spray'] },
    { id: 'elite',    name: 'Ceramic Coating',   desc: 'Professional ceramic coat — 2-year protection',       price: { sedan: 140, suv: 175, van: 210 }, dur: 240,
      features: ['Full Paint Correction', 'Professional Ceramic Coat', '2-Year Protection', 'Full Detail'] },
  ],
  engine: [
    { id: 'basic',    name: 'Engine Rinse',   desc: 'Basic engine bay degreasing & rinse',                    price: { sedan: 20, suv: 25, van: 30 }, dur: 30,
      features: ['Degreaser Application', 'Pressure Rinse', 'Air Blow Dry'] },
    { id: 'standard', name: 'Engine Clean',   desc: 'Thorough engine clean with protective dressing',         price: { sedan: 40, suv: 50, van: 60 }, dur: 60, popular: true,
      features: ['Full Degreasing', 'Pressure Clean', 'Engine Dressing', 'Plastic Trim Polish'] },
    { id: 'premium',  name: 'Engine Detail',  desc: 'Full engine detailing — every component cleaned',        price: { sedan: 65, suv: 80, van: 95 }, dur: 90,
      features: ['Deep Engine Clean', 'Component Detailing', 'Rubber Protectant', 'Hose & Wire Cleaning'] },
    { id: 'elite',    name: 'Engine Restore', desc: 'Complete engine restoration to showroom condition',       price: { sedan: 95, suv: 120, van: 145 }, dur: 120,
      features: ['Full Engine Detail', 'Chrome Polish', 'Heat Shield Treatment', 'Before & After Photos'] },
  ],
};

const CAT_NAMES = { carwash: 'Car Wash', interior: 'Interior Detailing', polish: 'Polish & Protection', engine: 'Engine Cleaning' };
const CAT_ICONS = { carwash: 'fa-car-side', interior: 'fa-couch', polish: 'fa-shield-halved', engine: 'fa-gears' };
const ADDON_PRICES = { pethair: 15, stains: 10 };

const SLOTS_WEEKDAY = ['8:00 AM','8:30 AM','9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM'];
const SLOTS_SUNDAY  = ['8:30 AM','9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM'];
const MONTH_NAMES   = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_NAMES     = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

// ===== STEP NAVIGATION =====
function goTo(n) {
  document.querySelectorAll('.bw-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-' + n).classList.add('active');

  document.querySelectorAll('.bw-step').forEach((el, i) => {
    el.classList.toggle('active', i + 1 === n);
    el.classList.toggle('done',   i + 1 < n);
  });
  for (let i = 1; i <= 5; i++) {
    const line = document.getElementById('line-' + i);
    if (line) line.classList.toggle('done', i < n);
  }

  state.step = n;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (n === 6) renderSummary();
}

function nextStep() {
  if (!validate(state.step)) return;
  goTo(state.step + 1);
}

function prevStep() {
  goTo(state.step - 1);
}

function validate(step) {
  if (step === 1 && !state.category) {
    alert('Please select a service category to continue.'); return false;
  }
  if (step === 2 && !state.packageId) {
    alert('Please select a package to continue.'); return false;
  }
  if (step === 3) {
    state.brand = document.getElementById('bw-brand').value.trim();
    state.model = document.getElementById('bw-model').value.trim();
    if (!state.brand || !state.model) { alert('Please enter your car brand and model.'); return false; }
  }
  if (step === 4 && !state.time) {
    alert('Please select a date and time to continue.'); return false;
  }
  if (step === 5) {
    state.fname = document.getElementById('bw-fname').value.trim();
    state.lname = document.getElementById('bw-lname').value.trim();
    state.phone = document.getElementById('bw-phone').value.trim();
    state.email = document.getElementById('bw-email').value.trim();
    if (!state.fname || !state.lname || !state.phone) { alert('Please fill in your name and phone number.'); return false; }
    if (!state.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) { alert('Please enter a valid email address.'); return false; }
    state.plate = document.getElementById('bw-plate').value.trim();
    state.notes = document.getElementById('bw-notes').value.trim();
  }
  return true;
}

// ===== STEP 1: CATEGORY =====
document.querySelectorAll('.bw-cat-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.bw-cat-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    state.category     = card.dataset.cat;
    state.categoryName = CAT_NAMES[state.category];
    state.packageId    = null;
    renderPackages();
    setTimeout(() => goTo(2), 180);
  });
});

// ===== STEP 2: PACKAGES =====
function renderPackages() {
  document.getElementById('s2-title').textContent = 'Services for: ' + state.categoryName;
  const pkgs = PACKAGES[state.category] || [];
  document.getElementById('pkg-list').innerHTML = pkgs.map(p => `
    <div class="bw-pkg-card${p.popular ? ' popular' : ''}" data-id="${p.id}" onclick="selectPkg('${p.id}')">
      ${p.popular ? '<div class="bw-pkg-badge">Most Popular</div>' : ''}
      <div class="bw-pkg-inner">
        <div class="bw-pkg-left">
          <div class="bw-pkg-name">${p.name}</div>
          <div class="bw-pkg-desc">${p.desc}</div>
          <ul class="bw-pkg-feats">
            ${p.features.map(f => `<li><i class="fas fa-check"></i>${f}</li>`).join('')}
          </ul>
        </div>
        <div class="bw-pkg-right">
          <span class="bw-pkg-from">from</span>
          <div class="bw-pkg-price">€${p.price.sedan}</div>
          <div class="bw-pkg-dur"><i class="fas fa-clock"></i>${p.dur} min</div>
        </div>
      </div>
    </div>
  `).join('');
}

function selectPkg(id) {
  state.packageId   = id;
  state.packageName = PACKAGES[state.category].find(p => p.id === id).name;
  document.querySelectorAll('.bw-pkg-card').forEach(c => c.classList.toggle('selected', c.dataset.id === id));
  updatePrice();
  setTimeout(() => goTo(3), 180);
}

// ===== STEP 3: VEHICLE + ADDONS =====
document.querySelectorAll('.bw-vtype').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.bw-vtype').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.vehicleType = btn.dataset.vtype;
    updatePrice();
  });
});

document.querySelectorAll('.bw-yn').forEach(btn => {
  btn.addEventListener('click', () => {
    const addon = btn.dataset.addon;
    state.addons[addon] = btn.dataset.val === 'yes';
    btn.closest('.bw-addon-card').querySelectorAll('.bw-yn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updatePrice();
  });
});

function updatePrice() {
  if (!state.category || !state.packageId) return;
  const pkg  = PACKAGES[state.category].find(p => p.id === state.packageId);
  const base = pkg.price[state.vehicleType];
  state.basePrice  = base;
  state.totalPrice = base + (state.addons.pethair ? ADDON_PRICES.pethair : 0) + (state.addons.stains ? ADDON_PRICES.stains : 0);

  document.getElementById('pc-icon').className = 'fas ' + CAT_ICONS[state.category];
  document.getElementById('pc-name').textContent = pkg.name;
  document.getElementById('pc-cat').textContent  = state.categoryName;
  document.getElementById('pc-base').textContent = '€' + base;
  document.getElementById('pc-total').textContent = '€' + state.totalPrice;
  document.getElementById('row-pethair').style.display = state.addons.pethair ? 'flex' : 'none';
  document.getElementById('row-stains').style.display  = state.addons.stains  ? 'flex' : 'none';
}

// ===== STEP 4: CALENDAR =====
function initCalendar() {
  const now = new Date();
  state.calYear  = now.getFullYear();
  state.calMonth = now.getMonth();
  renderCalendar();
}

function calPrev() {
  state.calMonth--;
  if (state.calMonth < 0) { state.calMonth = 11; state.calYear--; }
  renderCalendar();
}

function calNext() {
  state.calMonth++;
  if (state.calMonth > 11) { state.calMonth = 0; state.calYear++; }
  renderCalendar();
}

function renderCalendar() {
  const now   = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  document.getElementById('cal-month').textContent = MONTH_NAMES[state.calMonth] + ' ' + state.calYear;

  const firstDay     = new Date(state.calYear, state.calMonth, 1).getDay();
  const daysInMonth  = new Date(state.calYear, state.calMonth + 1, 0).getDate();

  let html = DAY_NAMES.map(d => `<div class="bw-cal-dayname">${d}</div>`).join('');

  for (let i = 0; i < firstDay; i++) html += '<div class="bw-cal-day empty"></div>';

  for (let d = 1; d <= daysInMonth; d++) {
    const date    = new Date(state.calYear, state.calMonth, d);
    const isPast  = date < today;
    const isToday = date.getTime() === today.getTime();
    const isSel   = state.date && date.getTime() === state.date.getTime();
    const ds      = state.calYear + '-' + String(state.calMonth + 1).padStart(2,'0') + '-' + String(d).padStart(2,'0');

    let cls = 'bw-cal-day';
    if (isPast)  cls += ' past';
    if (isToday) cls += ' today';
    if (isSel)   cls += ' selected';

    html += isPast
      ? `<div class="${cls}">${d}</div>`
      : `<div class="${cls}" onclick="selectDate('${ds}')">${d}</div>`;
  }

  document.getElementById('cal-grid').innerHTML = html;
}

function selectDate(ds) {
  state.date    = new Date(ds + 'T00:00:00');
  state.dateStr = ds;
  state.time    = null;
  document.getElementById('btn-s4-next').disabled = true;
  renderCalendar();
  renderSlots();
}

function renderSlots() {
  const dow   = state.date.getDay();
  const slots = dow === 0 ? SLOTS_SUNDAY : SLOTS_WEEKDAY;
  const day   = state.date.getDate();
  const mon   = MONTH_NAMES[state.date.getMonth()];

  document.getElementById('slots-title').textContent = 'Available times for: ' + mon + ' ' + day;
  document.getElementById('slots-grid').innerHTML = slots.map(s => `
    <button class="bw-slot${state.time === s ? ' selected' : ''}" onclick="selectSlot('${s}')">${s}</button>
  `).join('');
}

function selectSlot(time) {
  state.time = time;
  document.getElementById('btn-s4-next').disabled = false;
  document.querySelectorAll('.bw-slot').forEach(b => b.classList.toggle('selected', b.textContent.trim() === time));
}

// ===== STEP 6: SUMMARY =====
function renderSummary() {
  const dateFmt = state.date
    ? state.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : '—';

  const addonStr = [
    state.addons.pethair ? 'Pet Hair Removal (+€15)' : null,
    state.addons.stains  ? 'Stain Treatment (+€10)'  : null,
  ].filter(Boolean).join(', ') || 'None';

  const rows = [
    { icon: 'fa-tag',         label: 'Category',  value: state.categoryName },
    { icon: 'fa-star',        label: 'Package',   value: state.packageName },
    { icon: 'fa-car',         label: 'Vehicle',   value: state.vehicleType.charAt(0).toUpperCase() + state.vehicleType.slice(1) + ' — ' + state.brand + ' ' + state.model },
    { icon: 'fa-plus-circle', label: 'Add-ons',   value: addonStr },
    { icon: 'fa-calendar',    label: 'Date',      value: dateFmt },
    { icon: 'fa-clock',       label: 'Time',      value: state.time || '—' },
    { icon: 'fa-user',        label: 'Name',      value: state.fname + ' ' + state.lname },
    { icon: 'fa-phone',       label: 'Phone',     value: '+39 ' + state.phone },
    { icon: 'fa-envelope',    label: 'Email',     value: state.email || '—' },
  ];
  if (state.plate) rows.push({ icon: 'fa-id-card',     label: 'Plate',  value: state.plate });
  if (state.notes) rows.push({ icon: 'fa-note-sticky', label: 'Notes',  value: state.notes });

  document.getElementById('summary-list').innerHTML = rows.map(r => `
    <div class="bw-summary-row">
      <div class="bw-summary-icon"><i class="fas ${r.icon}"></i></div>
      <div class="bw-summary-label">${r.label}</div>
      <div class="bw-summary-value">${r.value}</div>
    </div>
  `).join('');

  document.getElementById('summary-total').textContent = '€' + state.totalPrice;
}

// ===== SUBMIT =====
async function submitBooking() {
  const btn = document.getElementById('btn-confirm');
  const err = document.getElementById('bw-err');
  err.style.display = 'none';
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing…';
  btn.disabled  = true;

  const to24h = t => {
    if (!t) return '';
    const [time, mod] = t.split(' ');
    let [h, m] = time.split(':');
    h = parseInt(h);
    if (mod === 'PM' && h !== 12) h += 12;
    if (mod === 'AM' && h === 12) h = 0;
    return h.toString().padStart(2,'0') + ':' + m;
  };

  const payload = {
    client_name:    state.fname + ' ' + state.lname,
    email:          state.email,
    phone:          '+39' + state.phone,
    category:       state.categoryName,
    plan:           state.packageName,
    vehicle_type:   state.vehicleType,
    vehicle_model:  state.brand + ' ' + state.model,
    date:           state.dateStr,
    time_slot:      to24h(state.time),
    pet_hair_removal: state.addons.pethair,
    bird_stains:    state.addons.stains,
    license_plate:  state.plate,
    notes:          state.notes,
    total_price:    state.totalPrice,
  };

  try {
    await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload),
    });

    const dateFmt = state.date
      ? state.date.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' })
      : '—';

    document.getElementById('overlay-details').innerHTML = [
      { icon: 'fa-user',     val: state.fname + ' ' + state.lname },
      { icon: 'fa-star',     val: state.categoryName + ' — ' + state.packageName },
      { icon: 'fa-car',      val: state.brand + ' ' + state.model },
      { icon: 'fa-calendar', val: dateFmt },
      { icon: 'fa-clock',    val: state.time },
      { icon: 'fa-euro-sign',val: 'Total: €' + state.totalPrice },
    ].map(r => `<div class="bw-cd-row"><i class="fas ${r.icon}"></i><span>${r.val}</span></div>`).join('');

    document.getElementById('bw-overlay').style.display = 'flex';

  } catch (e) {
    err.textContent  = 'Booking failed: ' + e.message + '. Please try again or call us directly.';
    err.style.display = 'block';
    btn.innerHTML    = '<i class="fas fa-calendar-check"></i> Confirm Appointment';
    btn.disabled     = false;
  }
}

// ===== RESET =====
function resetWizard() {
  Object.assign(state, {
    step: 1, category: null, categoryName: '', packageId: null, packageName: '',
    vehicleType: 'sedan', brand: '', model: '',
    addons: { pethair: false, stains: false },
    date: null, dateStr: '', time: null,
    fname: '', lname: '', phone: '', email: '', plate: '', notes: '',
    basePrice: 0, totalPrice: 0,
  });
  document.getElementById('bw-overlay').style.display = 'none';
  document.querySelectorAll('.bw-cat-card').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.bw-yn-no').forEach(b => b.classList.add('active'));
  document.querySelectorAll('.bw-yn-yes').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.bw-vtype').forEach((b, i) => b.classList.toggle('active', i === 0));
  goTo(1);
}

// ===== INIT =====
initCalendar();

/* =============================================
   AUTOLAVAGGIO LA PALMA — booking.js
   Multi-step booking wizard logic
   ============================================= */

const N8N_WEBHOOK_URL = "https://glokararehman.app.n8n.cloud/webhook-test/book-appointment";

// ===== CAR DATABASE — keyed by vehicle type (Italian market) =====
const CAR_DATA = {
  sedan: {
    'Abarth':        ['124 Spider', '595', '695'],
    'Alfa Romeo':    ['147', '156', '159', '166', '4C', 'Brera', 'Giulia', 'Giulietta', 'GTV', 'MiTo', 'Spider'],
    'Audi':          ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'e-tron GT', 'R8', 'RS3', 'RS4', 'RS5', 'RS6', 'RS7', 'S3', 'S4', 'S5', 'TT', 'TT RS'],
    'BMW':           ['116i', '118i', '118d', '120d', '218i', '220d', '316i', '318i', '318d', '320i', '320d', '330i', '330d', '420i', '420d', '430i', '520i', '520d', '530i', '530d', '540i', '730d', '740i', '740d', '750i', 'i3', 'i4', 'i5', 'i7', 'M2', 'M3', 'M4', 'M5', 'M8', 'Z4'],
    'BYD':           ['Dolphin', 'Han', 'Seal'],
    'Citroën':       ['Ami', 'C1', 'C3', 'C4', 'Ë-C4'],
    'Cupra':         ['Born', 'Leon'],
    'Dacia':         ['Logan', 'Sandero', 'Spring'],
    'DS':            ['DS 3', 'DS 4', 'DS 9'],
    'Ferrari':       ['296 GTB', '296 GTS', '458 Italia', '458 Spider', '488 GTB', '488 Pista', '488 Spider', 'California', 'California T', 'F8 Tributo', 'F8 Spider', 'GTC4Lusso', 'LaFerrari', 'Portofino', 'Portofino M', 'Roma', 'Roma Spider', 'SF90 Stradale', 'SF90 Spider'],
    'Fiat':          ['500', '500C', '500e', '500L', 'Bravo', 'Grande Punto', 'Panda', 'Punto', 'Stilo', 'Tipo'],
    'Ford':          ['Fiesta', 'Focus', 'Mondeo', 'Mustang', 'Mustang Mach-E', 'Puma'],
    'Honda':         ['Accord', 'Civic', 'e', 'Jazz', 'NSX'],
    'Hyundai':       ['i10', 'i20', 'i30', 'Ioniq 5', 'Ioniq 6'],
    'Jaguar':        ['F-Type', 'XE', 'XF'],
    'Kia':           ['Ceed', 'EV3', 'EV6', 'Picanto', 'ProCeed', 'Rio', 'Stinger'],
    'Lamborghini':   ['Aventador', 'Countach', 'Diablo', 'Gallardo', 'Huracán', 'Murciélago', 'Revuelto'],
    'Lancia':        ['Delta', 'Thesis', 'Ypsilon'],
    'Lexus':         ['ES', 'IS', 'LC', 'RC'],
    'Maserati':      ['Ghibli', 'GranCabrio', 'GranTurismo', 'MC20', 'Quattroporte'],
    'Mazda':         ['Mazda2', 'Mazda3', 'Mazda6', 'MX-5'],
    'Mercedes-Benz': ['A 180', 'A 200', 'A 220', 'B 180', 'B 200', 'C 180', 'C 200', 'C 220d', 'C 300', 'CLA 180', 'CLA 200', 'CLS 350', 'E 200', 'E 220d', 'E 300', 'EQE 350', 'EQS 450', 'S 350d', 'S 580', 'SL 43', 'SL 55'],
    'MG':            ['MG3', 'MG4', 'MG5'],
    'MINI':          ['Clubman', 'Convertible', 'Hatch 3-door', 'Hatch 5-door'],
    'Nissan':        ['Leaf', 'Micra'],
    'Opel':          ['Astra', 'Cascada', 'Corsa', 'Insignia'],
    'Pagani':        ['Huayra', 'Utopia', 'Zonda'],
    'Peugeot':       ['108', '208', '308', '408', '508', 'e-208'],
    'Porsche':       ['718 Boxster', '718 Cayman', '911 Carrera', '911 GT3', '911 Targa', '911 Turbo', 'Panamera', 'Taycan', 'Taycan Cross Turismo'],
    'Renault':       ['Arkana', 'Clio', 'Mégane', 'Twingo', 'Zoé'],
    'SEAT':          ['Ibiza', 'Leon', 'Mii'],
    'Škoda':         ['Fabia', 'Octavia', 'Scala', 'Superb'],
    'Smart':         ['EQ forfour', 'EQ fortwo'],
    'Subaru':        ['BRZ', 'Impreza', 'WRX'],
    'Suzuki':        ['Baleno', 'Ignis', 'Swift', 'Swace'],
    'Tesla':         ['Model 3', 'Model S'],
    'Toyota':        ['Aygo X', 'Camry', 'Corolla', 'GR86', 'GR Supra', 'GR Yaris', 'Prius', 'Yaris'],
    'Volkswagen':    ['Arteon', 'Golf', 'Golf Plus', 'Golf Variant', 'ID.3', 'ID.7', 'Passat', 'Polo', 'Up!'],
    'Volvo':         ['S60', 'S90', 'V60', 'V60 Cross Country', 'V90', 'V90 Cross Country'],
  },
  suv: {
    'Alfa Romeo':    ['Stelvio', 'Tonale'],
    'Audi':          ['e-tron', 'Q2', 'Q3', 'Q3 Sportback', 'Q5', 'Q7', 'Q8', 'Q8 e-tron', 'SQ5', 'SQ7', 'SQ8'],
    'BMW':           ['iX', 'iX1', 'iX3', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7'],
    'BYD':           ['Atto 3', 'Seal U', 'Sealion 6', 'Tang'],
    'Citroën':       ['C3 Aircross', 'C5 Aircross', 'C5 X'],
    'Cupra':         ['Ateca', 'Formentor', 'Tavascan', 'Terramar'],
    'Dacia':         ['Bigster', 'Duster'],
    'DS':            ['DS 3 Crossback', 'DS 7', 'DS 7 Crossback'],
    'Fiat':          ['500X', 'Freemont', 'Sedici'],
    'Ford':          ['Bronco', 'EcoSport', 'Explorer', 'Kuga'],
    'Honda':         ['CR-V', 'HR-V', 'ZR-V'],
    'Hyundai':       ['Bayon', 'Ioniq 9', 'Kona', 'Kona Electric', 'Nexo', 'Santa Fe', 'Tucson'],
    'Jaguar':        ['E-Pace', 'F-Pace', 'I-Pace'],
    'Jeep':          ['Avenger', 'Cherokee', 'Commander', 'Compass', 'Grand Cherokee', 'Renegade', 'Wrangler'],
    'Kia':           ['EV9', 'Niro', 'Niro EV', 'Sorento', 'Soul', 'Sportage', 'Stonic', 'XCeed'],
    'Lamborghini':   ['Sterrato', 'Urus'],
    'Land Rover':    ['Defender', 'Discovery', 'Discovery Sport', 'Freelander', 'Range Rover', 'Range Rover Evoque', 'Range Rover Sport', 'Range Rover Velar'],
    'Lexus':         ['GX', 'LX', 'NX', 'RX', 'RZ', 'UX'],
    'Maserati':      ['Grecale', 'Levante'],
    'Mazda':         ['CX-3', 'CX-30', 'CX-5', 'CX-60', 'CX-80', 'MX-30'],
    'Mercedes-Benz': ['EQA 250', 'EQB 250', 'EQC 400', 'G 350d', 'G 500', 'GLA 180', 'GLA 200', 'GLB 200', 'GLC 220d', 'GLC 300', 'GLE 300d', 'GLE 350d', 'GLS 400d'],
    'MG':            ['HS', 'ZS'],
    'MINI':          ['Aceman', 'Countryman'],
    'Mitsubishi':    ['ASX', 'Eclipse Cross', 'Outlander'],
    'Nissan':        ['Ariya', 'Juke', 'Qashqai', 'X-Trail'],
    'Opel':          ['Crossland', 'Grandland', 'Mokka'],
    'Peugeot':       ['2008', '3008', '5008', 'e-2008'],
    'Porsche':       ['Cayenne', 'Cayenne Coupe', 'Macan'],
    'Renault':       ['Austral', 'Captur', 'Espace', 'Koleos', 'Rafale', 'Scenic', 'Symbioz'],
    'SEAT':          ['Arona', 'Ateca', 'Tarraco'],
    'Škoda':         ['Enyaq', 'Kamiq', 'Karoq', 'Kodiaq'],
    'Smart':         ['#1', '#3'],
    'Subaru':        ['Forester', 'Outback', 'XV'],
    'Suzuki':        ['Across', 'Jimny', 'S-Cross', 'Vitara'],
    'Tesla':         ['Cybertruck', 'Model X', 'Model Y'],
    'Toyota':        ['bZ4X', 'C-HR', 'Corolla Cross', 'Highlander', 'Land Cruiser', 'RAV4', 'Yaris Cross'],
    'Volkswagen':    ['ID.4', 'ID.5', 'T-Cross', 'T-Roc', 'Tiguan', 'Tiguan Allspace', 'Touareg'],
    'Volvo':         ['C40', 'EX30', 'EX90', 'XC40', 'XC60', 'XC90'],
  },
  van: {
    'Citroën':       ['Berlingo', 'Jumpy'],
    'Dacia':         ['Jogger'],
    'Fiat':          ['Doblò', 'Ducato', 'Fiorino', 'Multipla', 'Qubo', 'Scudo'],
    'Ford':          ['Galaxy', 'S-Max', 'Transit', 'Transit Custom'],
    'Kia':           ['Carnival'],
    'Lancia':        ['Musa', 'Phedra'],
    'Mercedes-Benz': ['Sprinter', 'V 220d', 'Vito'],
    'Mitsubishi':    ['L200'],
    'Nissan':        ['Navara', 'NV200', 'Townstar'],
    'Opel':          ['Combo', 'Vivaro', 'Zafira'],
    'Peugeot':       ['Expert', 'Partner'],
    'Renault':       ['Kangoo', 'Trafic'],
    'Toyota':        ['Proace'],
    'Volkswagen':    ['Caddy', 'Sharan', 'Touran', 'Transporter'],
  },
};

// ===== BOOKING STATE =====
const state = {
  step: 1,
  category: null, categoryName: '',
  packageId: null, packageName: '',
  vehicleType: 'sedan',
  brand: '', model: '',
  addons: { pethair: false, stains: false, suvseater: 0, dirtinterior: false },
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
    { id: 'standard', name: 'Standard Wash',  desc: 'Full exterior + interior vacuum & dashboard wipe',       price: { sedan: 20, suv: 28, van: 35 }, dur: 60, popular: true,
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
  engine: [
    { id: 'basic',    name: 'Engine Rinse',   desc: 'Basic engine bay degreasing & rinse',                    price: { sedan: 20, suv: 25, van: 30 }, dur: 30,
      features: ['Degreaser Application', 'Pressure Rinse', 'Air Blow Dry'] },
  ],
};

const CAT_NAMES = { carwash: 'Car Wash', interior: 'Interior Detailing', engine: 'Engine Cleaning' };
const CAT_ICONS = { carwash: 'fa-car-side', interior: 'fa-couch', engine: 'fa-gears' };
const ADDON_PRICES = { pethair: 10, stains: 10, dirtinterior: 5 };

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
    state.brand = document.getElementById('bw-brand').value;
    state.model = document.getElementById('bw-model').value;
    if (!state.brand) { alert('Please select your car brand.'); return false; }
    if (!state.model) { alert('Please select your car model.'); return false; }
    if (state.vehicleType === 'suv' && !state.addons.suvseater) {
      alert('Please select the number of seats for your SUV.'); return false;
    }
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
function selectCat(card) {
  document.querySelectorAll('.bw-cat-card').forEach(c => c.classList.remove('active'));
  card.classList.add('active');
  state.category     = card.dataset.cat;
  state.categoryName = CAT_NAMES[state.category];
  state.packageId    = null;
  renderPackages();
  setTimeout(() => goTo(2), 180);
}

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
function refreshBrands() {
  const data     = CAR_DATA[state.vehicleType] || {};
  const brandSel = document.getElementById('bw-brand');
  const modelSel = document.getElementById('bw-model');
  if (!brandSel || !modelSel) return;
  brandSel.innerHTML = '<option value="">Select brand…</option>';
  Object.keys(data).sort().forEach(brand => {
    const opt = document.createElement('option');
    opt.value = brand; opt.textContent = brand;
    brandSel.appendChild(opt);
  });
  modelSel.innerHTML = '<option value="">Select a brand first…</option>';
  modelSel.disabled = true;
  state.brand = ''; state.model = '';
}

function handleVtype(btn) {
  document.querySelectorAll('.bw-vtype').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.vehicleType = btn.dataset.vtype;
  const suvInline = document.getElementById('suv-seater-inline');
  if (suvInline) {
    suvInline.style.display = state.vehicleType === 'suv' ? '' : 'none';
    if (state.vehicleType !== 'suv') {
      state.addons.suvseater = 0;
      document.querySelectorAll('.bw-suv-seat').forEach(b => b.classList.remove('active'));
    }
  }
  refreshBrands();
  updatePrice();
}

function handleSuvSeat(btn) {
  document.querySelectorAll('.bw-suv-seat').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.addons.suvseater = parseInt(btn.dataset.seats);
  updatePrice();
}

function handleAddon(btn) {
  const addon = btn.dataset.addon;
  const val   = btn.dataset.val;
  if (val === 'no')        state.addons[addon] = false;
  else if (val === 'yes')  state.addons[addon] = true;
  else                     state.addons[addon] = parseInt(val);
  btn.closest('.bw-addon-card').querySelectorAll('.bw-yn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  updatePrice();
}

function updatePrice() {
  if (!state.category || !state.packageId) return;
  const pkg      = PACKAGES[state.category].find(p => p.id === state.packageId);
  const base     = pkg.price[state.vehicleType];
  const suvExtra = state.addons.suvseater === 7 ? 20 : state.addons.suvseater === 5 ? 13 : 0;
  state.basePrice  = base;
  state.totalPrice = base
    + (state.addons.pethair      ? ADDON_PRICES.pethair      : 0)
    + (state.addons.stains       ? ADDON_PRICES.stains       : 0)
    + suvExtra
    + (state.addons.dirtinterior ? ADDON_PRICES.dirtinterior : 0);

  document.getElementById('pc-icon').className  = 'fas ' + CAT_ICONS[state.category];
  document.getElementById('pc-name').textContent = pkg.name;
  document.getElementById('pc-cat').textContent  = state.categoryName;
  document.getElementById('pc-base').textContent = '€' + base;
  document.getElementById('pc-total').textContent = '€' + state.totalPrice;
  document.getElementById('row-pethair').style.display     = state.addons.pethair      ? 'flex' : 'none';
  document.getElementById('row-stains').style.display      = state.addons.stains       ? 'flex' : 'none';
  document.getElementById('row-suvseater').style.display   = state.addons.suvseater    ? 'flex' : 'none';
  if (state.addons.suvseater) document.getElementById('row-suvseater-amt').textContent = '+€' + suvExtra;
  document.getElementById('row-dirtinterior').style.display = state.addons.dirtinterior ? 'flex' : 'none';
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

  const suvExtra = state.addons.suvseater === 7 ? 20 : state.addons.suvseater === 5 ? 13 : 0;
  const addonStr = [
    state.addons.pethair      ? 'Pet Hair Removal (+€10)'                              : null,
    state.addons.stains       ? 'Stain Treatment (+€10)'                               : null,
    state.addons.suvseater    ? `SUV ${state.addons.suvseater}-Seater (+€${suvExtra})` : null,
    state.addons.dirtinterior ? 'Heavy Soiling (+€5)'                                  : null,
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
    bird_stains:      state.addons.stains,
    suv_seater:       state.addons.suvseater || null,
    dirty_interior:   state.addons.dirtinterior,
    license_plate:    state.plate,
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
    addons: { pethair: false, stains: false, suvseater: 0, dirtinterior: false },
    date: null, dateStr: '', time: null,
    fname: '', lname: '', phone: '', email: '', plate: '', notes: '',
    basePrice: 0, totalPrice: 0,
  });
  document.getElementById('bw-overlay').style.display = 'none';
  document.querySelectorAll('.bw-cat-card').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.bw-yn-no').forEach(b => b.classList.add('active'));
  document.querySelectorAll('.bw-yn-yes').forEach(b => b.classList.remove('active'));
  const suvInline = document.getElementById('suv-seater-inline');
  if (suvInline) suvInline.style.display = 'none';
  document.querySelectorAll('.bw-suv-seat').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.bw-vtype').forEach((b, i) => b.classList.toggle('active', i === 0));
  refreshBrands();
  goTo(1);
}

// ===== STEP 3: BRAND / MODEL DROPDOWNS =====
function handleBrandChange(sel) {
  const brand = sel.value;
  state.brand = brand;
  state.model = '';
  const modelSel = document.getElementById('bw-model');
  if (!brand) {
    modelSel.innerHTML = '<option value="">Select a brand first…</option>';
    modelSel.disabled = true;
    return;
  }
  const models = (CAR_DATA[state.vehicleType] || {})[brand] || [];
  modelSel.disabled = false;
  modelSel.innerHTML = '<option value="">Select model…</option>';
  models.forEach(model => {
    const opt = document.createElement('option');
    opt.value = model; opt.textContent = model;
    modelSel.appendChild(opt);
  });
}

function handleModelChange(sel) {
  state.model = sel.value;
}

function populateBrands() {
  refreshBrands();
}

// ===== INIT =====
initCalendar();
populateBrands();

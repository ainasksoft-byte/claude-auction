/* ===== PAK STAY — SHARED JS ===== */

// Listings dataset shared across pages (uses query ?id= to look up)
window.PAKSTAY_LISTINGS = [
  {
    id: 1,
    title: 'Luxury Guest House — F-7 Markaz, Islamabad',
    short: 'Luxury Guest House — F-7 Markaz',
    type: 'Guest House',
    loc: 'F-7 Markaz, Islamabad',
    city: 'Islamabad',
    price: 32000,
    rating: 4.9, reviews: 128,
    bedrooms: 5, bathrooms: 3, guests: 12, size: '10 Marla',
    lat: 33.7080, lng: 73.0480,
    badges: ['CNIC Verified','PP Inspected','Superhost'],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=900&q=80'
    ],
    desc: 'A spacious modern guest house in the heart of F-7 Markaz, Islamabad. Walking distance from cafes, restaurants and shopping. Five well-appointed bedrooms, full kitchen, private garden and dedicated parking for up to 3 cars.',
    amenities: ['AC','WiFi','Parking','Kitchen','Generator','CCTV','TV','BBQ','Garden'],
    host: { name: 'Rana Ahmed', joined: 'March 2022', rating: 4.94, listings: 6 }
  },
  {
    id: 2,
    title: 'Green Valley Farmhouse, Chak Shehzad',
    short: 'Green Valley Farmhouse',
    type: 'Farmhouse',
    loc: 'Chak Shehzad, Islamabad',
    city: 'Islamabad',
    price: 45000,
    rating: 4.7, reviews: 43,
    bedrooms: 4, bathrooms: 2, guests: 10, size: '2 Kanal',
    lat: 33.6610, lng: 73.1010,
    badges: ['CNIC Verified','New Listing'],
    images: [
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80'
    ],
    desc: 'Private farmhouse on 2 Kanal of green lawns with swimming pool, BBQ area and open-sky lounge. Perfect for weekend getaways with family or friends.',
    amenities: ['AC','WiFi','Parking','Pool','Kitchen','BBQ','Garden','Generator'],
    host: { name: 'Sara Khan', joined: 'July 2023', rating: 4.85, listings: 2 }
  },
  {
    id: 3,
    title: 'Executive Studio — Blue Area, Islamabad',
    short: 'Executive Studio — Blue Area',
    type: 'Furnished Apt',
    loc: 'Blue Area, Islamabad',
    city: 'Islamabad',
    price: 12500,
    rating: 4.8, reviews: 91,
    bedrooms: 2, bathrooms: 2, guests: 4, size: '5 Marla',
    lat: 33.7180, lng: 73.0750,
    badges: ['CNIC Verified','PP Inspected'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80'
    ],
    desc: 'Modern executive studio in Blue Area, walking distance to Centaurus mall. Fully furnished with high-speed WiFi and dedicated workspace.',
    amenities: ['AC','WiFi','Parking','Kitchen','TV','CCTV','Generator'],
    host: { name: 'Bilal Sheikh', joined: 'November 2021', rating: 4.9, listings: 11 }
  },
  {
    id: 4,
    title: 'Pine Ridge Chalet — Murree',
    short: 'Pine Ridge Chalet',
    type: 'Cottage',
    loc: 'Mall Road, Murree',
    city: 'Murree',
    price: 22000,
    rating: 4.6, reviews: 57,
    bedrooms: 3, bathrooms: 2, guests: 8, size: '8 Marla',
    lat: 33.9070, lng: 73.3935,
    badges: ['CNIC Verified'],
    images: [
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&q=80',
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=900&q=80'
    ],
    desc: 'Wood-panelled chalet on the slopes of Murree, with a private balcony overlooking the pine forest. Fireplace, central heating and walking distance to Mall Road.',
    amenities: ['WiFi','Parking','Kitchen','TV','Heater','Garden'],
    host: { name: 'Asad Malik', joined: 'February 2023', rating: 4.7, listings: 3 }
  },
  {
    id: 5,
    title: 'Royal Haveli — Old Lahore, Walled City',
    short: 'Royal Haveli — Walled City',
    type: 'Heritage Haveli',
    loc: 'Walled City, Lahore',
    city: 'Lahore',
    price: 75000,
    rating: 4.9, reviews: 34,
    bedrooms: 6, bathrooms: 4, guests: 16, size: '1 Kanal',
    lat: 31.5820, lng: 74.3140,
    badges: ['CNIC Verified','PP Inspected'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=900&q=80'
    ],
    desc: 'A restored Mughal-era haveli inside the Walled City of Lahore. Ornate frescoes, central courtyard with fountain and rooftop terrace overlooking the Badshahi Mosque.',
    amenities: ['AC','WiFi','Parking','Kitchen','TV','CCTV','Generator','Garden'],
    host: { name: 'Faraz Butt', joined: 'June 2020', rating: 4.98, listings: 4 }
  },
  {
    id: 6,
    title: 'Sea Breeze Beach Hut — French Beach, Karachi',
    short: 'Sea Breeze Beach Hut',
    type: 'Beach Hut',
    loc: 'French Beach, Karachi',
    city: 'Karachi',
    price: 18000,
    rating: 4.5, reviews: 22,
    bedrooms: 2, bathrooms: 1, guests: 6, size: '4 Marla',
    lat: 24.8200, lng: 66.7900,
    badges: ['CNIC Verified'],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=900&q=80'
    ],
    desc: 'A private beach hut right on French Beach. Wake up to the waves, BBQ by the shore at sunset. Includes daily breakfast.',
    amenities: ['WiFi','Parking','BBQ','TV','Generator'],
    host: { name: 'Adnan Rauf', joined: 'May 2023', rating: 4.6, listings: 2 }
  },
  {
    id: 7,
    title: 'Modern Apartment — Bahria Town Phase 4',
    short: 'Modern Apartment — Bahria Town',
    type: 'Furnished Apt',
    loc: 'Bahria Town, Rawalpindi',
    city: 'Rawalpindi',
    price: 9500,
    rating: 4.7, reviews: 76,
    bedrooms: 3, bathrooms: 2, guests: 8, size: '7 Marla',
    lat: 33.5350, lng: 73.0930,
    badges: ['CNIC Verified','PP Inspected'],
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80'
    ],
    desc: 'Fully furnished modern apartment in Bahria Town Phase 4, with full access to community pool, gym and 24/7 security.',
    amenities: ['AC','WiFi','Parking','Pool','Gym','Kitchen','TV','Generator','CCTV'],
    host: { name: 'Hira Iqbal', joined: 'January 2022', rating: 4.8, listings: 5 }
  },
  {
    id: 8,
    title: 'Forest View Cottage — Nathiagali',
    short: 'Forest View Cottage',
    type: 'Cottage',
    loc: 'Nathiagali, KPK',
    city: 'Nathiagali',
    price: 15000,
    rating: 5.0, reviews: 19,
    bedrooms: 2, bathrooms: 1, guests: 5, size: '6 Marla',
    lat: 34.0700, lng: 73.3850,
    badges: ['CNIC Verified','Superhost'],
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=900&q=80'
    ],
    desc: 'Quiet cottage tucked inside the pine forest of Nathiagali. Foggy mornings, log fire, and trails right outside the door.',
    amenities: ['WiFi','Parking','Kitchen','TV','Heater','Garden','BBQ'],
    host: { name: 'Maira Ali', joined: 'August 2022', rating: 4.99, listings: 1 }
  }
];

window.PS = {
  listings: window.PAKSTAY_LISTINGS,
  byId(id){ return this.listings.find(l => l.id === Number(id)); },
  fmtPrice(n){ return '₨' + Number(n).toLocaleString('en-PK'); },

  qs(k){
    return new URLSearchParams(location.search).get(k);
  },

  go(url){ location.href = url; },

  // tiny toast
  toast(msg){
    let el = document.getElementById('toastEl');
    if(!el){
      el = document.createElement('div');
      el.id = 'toastEl';
      el.className = 'toast';
      document.body.appendChild(el);
    }
    clearTimeout(this._t);
    el.textContent = msg;
    el.classList.add('on');
    this._t = setTimeout(()=>el.classList.remove('on'), 2400);
  },

  // legacy price pin (kept for listing.html detail map)
  pricePin(label, selected=false){
    return L.divIcon({
      className: 'ps-pin-wrap',
      html: `<div class="ps-pin ${selected?'on':''}">${label}</div>`,
      iconSize: [60, 28],
      iconAnchor: [30, 14]
    });
  },

  // avatar pin with property thumbnail + small price chip
  avatarPin(listing, selected=false){
    const priceLabel = listing.price >= 1000
      ? '₨' + Math.round(listing.price/1000) + 'K'
      : '₨' + listing.price;
    return L.divIcon({
      className: 'ps-avatar-pin-wrap',
      html: `<div class="ps-avatar-pin ${selected?'on':''}"
                  style="background-image:url('${listing.images[0]}')"
                  data-price="${priceLabel}"></div>`,
      iconSize: [46, 60],
      iconAnchor: [23, 23]
    });
  },

  // hover card HTML shown via Leaflet tooltip
  hoverCardHTML(l){
    const badgeMap = { 'CNIC Verified':'CNIC','PP Inspected':'Inspected','Superhost':'Superhost','New Listing':'New' };
    const badges = (l.badges||[]).slice(0,3).map(b => `<span>${badgeMap[b]||b}</span>`).join('');
    return `
      <div class="ps-map-card">
        <div class="img" style="background-image:url('${l.images[0]}')"></div>
        <div class="body">
          <div class="t">${l.short}</div>
          <div class="l">${l.loc}</div>
          <div class="f">
            <span class="p">${this.fmtPrice(l.price)} <span>/ night</span></span>
            <span class="r">★ ${l.rating} (${l.reviews})</span>
          </div>
          ${badges ? `<div class="badges">${badges}</div>` : ''}
        </div>
      </div>`;
  },

  // ── Auth modals ─────────────────────────────────────────
  openLogin(){
    document.getElementById('psSignupModal')?.classList.remove('on');
    document.getElementById('psLoginModal')?.classList.add('on');
  },
  openSignup(){
    document.getElementById('psLoginModal')?.classList.remove('on');
    document.getElementById('psSignupModal')?.classList.add('on');
  },
  closeAuth(){
    document.getElementById('psLoginModal')?.classList.remove('on');
    document.getElementById('psSignupModal')?.classList.remove('on');
  },
  togglePwdModal(btn){
    const i = btn.parentElement.querySelector('input');
    i.type = i.type === 'password' ? 'text' : 'password';
  },
  submitLogin(e){
    e.preventDefault();
    PS.closeAuth();
    PS.toast('Welcome back!');
    return false;
  },
  submitGuestSignup(e){
    e.preventDefault();
    PS.closeAuth();
    PS.toast('Account created! Welcome to Pak Stay.');
    return false;
  }
};

// reusable header HTML so every page renders the same nav
window.PS.headerHTML = function(active){
  const a = name => active === name ? 'active' : '';
  return `
  <header class="header">
    <a class="logo" href="/pakstay/index.html">
      <div class="logo-mark">PS</div>
      <div class="logo-stack">
        <span class="logo-name">Pak Stay</span>
        <span class="logo-by">by PakistanProperty.com</span>
      </div>
    </a>
    <div class="search-bar">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input type="text" placeholder="Search city, area, landmark…" />
      <div class="sb-divider"></div>
      <div class="sb-meta">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        Jun 14 – 17
      </div>
      <div class="sb-divider"></div>
      <div class="sb-meta">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
        2 Guests
      </div>
      <button class="sb-btn" onclick="location.href='/pakstay/index.html'">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      </button>
    </div>
    <div class="header-right">
      <a class="h-link ${a('explore')}" href="/pakstay/index.html">Explore</a>
      <a class="h-link ${a('list')}" href="/pakstay/add-listing.html">List Property</a>
      <a class="h-btn-outline" href="/pakstay/dashboard.html">Host Dashboard</a>
      <button class="h-link" onclick="PS.openLogin()">Sign In</button>
      <button class="h-btn-solid" onclick="PS.openSignup()">Sign Up</button>
      <div class="avatar" onclick="location.href='/pakstay/dashboard.html'">R</div>
    </div>
  </header>`;
};

window.PS.authModalsHTML = function(){
  return `
  <!-- LOGIN MODAL -->
  <div class="ps-modal-back" id="psLoginModal" onclick="if(event.target===this) PS.closeAuth()">
    <div class="ps-modal" role="dialog" aria-label="Sign in">
      <button class="ps-modal-close" onclick="PS.closeAuth()" aria-label="Close">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="auth-logo" style="margin-bottom:16px;">
        <div class="logo-mark">PS</div>
        <div class="logo-stack">
          <span class="logo-name">Pak Stay</span>
          <span class="logo-by">by PakistanProperty.com</span>
        </div>
      </div>
      <h2 class="ps-modal-title">Welcome back</h2>
      <p class="ps-modal-sub">Sign in to manage bookings and message hosts.</p>
      <form onsubmit="return PS.submitLogin(event)">
        <div class="form-group">
          <label class="form-label">Phone or email</label>
          <input class="form-input" type="text" placeholder="03xx-xxxxxxx or you@example.com" required />
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <div class="pwd-wrap">
            <input class="form-input" type="password" placeholder="••••••••" required style="padding-right:38px;" />
            <button type="button" class="pwd-toggle" onclick="PS.togglePwdModal(this)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
        <div class="check-row">
          <label class="cb"><input type="checkbox" /> Remember me</label>
          <a onclick="PS.toast('Reset link sent')">Forgot password?</a>
        </div>
        <button type="submit" class="btn btn-primary btn-block btn-lg">Sign in</button>
      </form>
      <div class="auth-divider">or continue with</div>
      <div class="social-row">
        <button class="social-btn" onclick="PS.toast('Signing in with Google…')">
          <svg width="16" height="16" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20H42v-.05H24v8h11.3c-1.7 4.5-6 7.6-11.3 7.6-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20c11.5 0 19.5-8.3 19.5-20 0-1.4-.2-2.7-.4-4z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.4 4 9.8 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2L31 33.3c-2 1.4-4.4 2.2-7 2.2-5.2 0-9.6-3.3-11.2-7.9l-6.6 5.1C9.8 39.7 16.4 44 24 44z"/><path fill="#1976D2" d="M43.6 20H42v-.05H24v8h11.3c-.8 2.2-2.2 4.1-4.3 5.4l6.6 5.1C40.6 35 44 30 44 24c0-1.4-.2-2.7-.4-4z"/></svg>
          Google
        </button>
        <button class="social-btn" onclick="PS.toast('Signing in with Facebook…')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6 4.39 10.97 10.12 11.88V15.56h-3.05v-3.49h3.05V9.41c0-3.02 1.8-4.68 4.53-4.68 1.31 0 2.69.23 2.69.23v2.97h-1.52c-1.49 0-1.95.93-1.95 1.88v2.26h3.33l-.53 3.49h-2.8v8.39C19.61 23.04 24 18.07 24 12.07z"/></svg>
          Facebook
        </button>
      </div>
      <div class="ps-modal-foot">New to Pak Stay? <a onclick="PS.openSignup()">Create an account</a></div>
    </div>
  </div>

  <!-- SIGNUP MODAL (role chooser + guest form) -->
  <div class="ps-modal-back" id="psSignupModal" onclick="if(event.target===this) PS.closeAuth()">
    <div class="ps-modal" role="dialog" aria-label="Create account">
      <button class="ps-modal-close" onclick="PS.closeAuth()" aria-label="Close">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>

      <!-- Step 1 — chooser -->
      <div id="psSignupChooser">
        <div class="auth-logo" style="margin-bottom:16px;">
          <div class="logo-mark">PS</div>
          <div class="logo-stack">
            <span class="logo-name">Pak Stay</span>
            <span class="logo-by">by PakistanProperty.com</span>
          </div>
        </div>
        <h2 class="ps-modal-title">Join Pak Stay</h2>
        <p class="ps-modal-sub">What would you like to do first?</p>

        <div class="ps-role-grid">
          <div class="ps-role-card" onclick="document.getElementById('psSignupChooser').style.display='none';document.getElementById('psSignupGuestForm').style.display='block';">
            <div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>
            <div class="t">Book a stay</div>
            <div class="s">I'm travelling</div>
          </div>
          <div class="ps-role-card" onclick="location.href='/pakstay/signup.html'">
            <div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
            <div class="t">Host my place</div>
            <div class="s">I have a property</div>
          </div>
        </div>

        <div class="ps-modal-foot">Already have an account? <a onclick="PS.openLogin()">Sign in</a></div>
      </div>

      <!-- Step 2 — guest signup form -->
      <div id="psSignupGuestForm" style="display:none;">
        <button class="ps-back" style="margin-bottom:14px;" onclick="document.getElementById('psSignupGuestForm').style.display='none';document.getElementById('psSignupChooser').style.display='block';">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </button>
        <h2 class="ps-modal-title">Create a guest account</h2>
        <p class="ps-modal-sub">Book verified stays across Pakistan in seconds.</p>

        <form onsubmit="return PS.submitGuestSignup(event)">
          <div class="form-row">
            <div class="form-group"><label class="form-label">First name</label><input class="form-input" placeholder="Ahmed" required /></div>
            <div class="form-group"><label class="form-label">Last name</label><input class="form-input" placeholder="Khan" required /></div>
          </div>
          <div class="form-group">
            <label class="form-label">Phone</label>
            <input class="form-input" type="tel" placeholder="03xx-xxxxxxx" required />
            <div class="form-hint">We'll send a free OTP to verify.</div>
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input class="form-input" type="email" placeholder="you@example.com" required />
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <div class="pwd-wrap">
              <input class="form-input" type="password" placeholder="At least 8 characters" required style="padding-right:38px;" />
              <button type="button" class="pwd-toggle" onclick="PS.togglePwdModal(this)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
          </div>
          <div style="font-size:11.5px;color:var(--text-muted);margin:-4px 0 12px;line-height:1.5;">
            By creating an account you agree to our <a style="color:var(--green);font-weight:600;">Terms</a> and <a style="color:var(--green);font-weight:600;">Privacy Policy</a>.
          </div>
          <button type="submit" class="btn btn-primary btn-block btn-lg">Create account</button>
        </form>

        <div class="ps-modal-foot">Want to host instead? <a onclick="location.href='/pakstay/signup.html'">Sign up as a host →</a></div>
      </div>
    </div>
  </div>`;
};

document.addEventListener('DOMContentLoaded', () => {
  const slot = document.getElementById('ps-header');
  if (slot) slot.outerHTML = window.PS.headerHTML(slot.getAttribute('data-active') || '');

  // Inject auth modals at end of body (skip on the host signup page itself)
  if (!document.body.hasAttribute('data-no-auth-modals')) {
    const wrap = document.createElement('div');
    wrap.innerHTML = window.PS.authModalsHTML();
    document.body.appendChild(wrap);
  }

  // ESC closes modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') window.PS.closeAuth();
  });
});

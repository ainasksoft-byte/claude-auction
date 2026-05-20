/* ===== PP REAL ESTATE — SHARED JS (mirrors pakstay design system) ===== */

window.PPRE_LISTINGS = [
  {
    id: 1,
    title: '5-Marla Modern House — DHA Phase 2',
    short: 'Modern House — DHA Phase 2',
    type: 'House',
    purpose: 'sale',
    loc: 'DHA Phase 2, Sector E, Islamabad',
    city: 'Islamabad',
    price: 28000000, priceLabel: '₨2.8 Cr',
    rating: 4.9, reviews: 18,
    bedrooms: 4, bathrooms: 3, area: '1,100 sqft', sizeText: '5 Marla',
    yearBuilt: 2022, parking: 2,
    lat: 33.7200, lng: 73.0650,
    badges: ['CNIC Verified','PP Inspected'],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80'
    ],
    desc: 'Stunning brand-new 5-marla house in the heart of DHA Phase 2. Imported fittings, marble flooring, fully fitted modular kitchen, private lawn and a servant quarter. Walking distance from DHA Park and reputable schools.',
    amenities: ['Servant Qtr','Generator','Solar','CCTV','Lawn','Marble Floors','Sui Gas','Tarmac Road'],
    agent: { name: 'Asif Mehmood', agency: 'Premium Realty', joined: 'Jan 2021', rating: 4.9, listings: 47, deals: 130, phone: '0301-2345678', langs:['Urdu','English'] }
  },
  {
    id: 2,
    title: 'Luxury 3-Bed Apartment — F-10 Markaz',
    short: 'Luxury Apartment — F-10 Markaz',
    type: 'Apartment',
    purpose: 'sale',
    loc: 'F-10 Markaz, Sky Tower, Islamabad',
    city: 'Islamabad',
    price: 14000000, priceLabel: '₨1.4 Cr',
    rating: 4.8, reviews: 12,
    bedrooms: 3, bathrooms: 2, area: '950 sqft', sizeText: '7th Floor',
    yearBuilt: 2023, parking: 1,
    lat: 33.6980, lng: 73.0220,
    badges: ['CNIC Verified','New Listing'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=80'
    ],
    desc: 'Top-floor luxury apartment in F-10 with panoramic city views. Open-plan living, modern kitchen, two master bedrooms, and a third room with attached study. Building has 24/7 security, lift and rooftop access.',
    amenities: ['Lift','24/7 Security','Gym','Rooftop','Parking','Power Backup','Intercom'],
    agent: { name: 'Sara Qureshi', agency: 'Capital Properties', joined: 'Mar 2022', rating: 4.8, listings: 32, deals: 88, phone: '0333-4567890', langs:['Urdu','English','Punjabi'] }
  },
  {
    id: 3,
    title: '10-Marla Corner Plot — Bahria Phase 8',
    short: '10-Marla Corner Plot',
    type: 'Plot',
    purpose: 'sale',
    loc: 'Bahria Town Phase 8, Sector F-1, Rawalpindi',
    city: 'Rawalpindi',
    price: 9500000, priceLabel: '₨95 Lakh',
    rating: 4.7, reviews: 6,
    bedrooms: 0, bathrooms: 0, area: '2,250 sqft', sizeText: '10 Marla',
    yearBuilt: null, parking: 0,
    lat: 33.5340, lng: 73.0870,
    badges: ['CNIC Verified','PP Inspected'],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
      'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=900&q=80'
    ],
    desc: 'Premium corner plot in the heart of Bahria Phase 8. Park-facing, on 50ft wide road, in a developed pocket. Utilities (sui gas, electricity, water) ready. Possession available immediately.',
    amenities: ['Corner','Park Facing','Possession Ready','Wide Street','Sui Gas','Utilities Ready'],
    agent: { name: 'Umar Farooq', agency: 'Bahria Experts', joined: 'Jul 2019', rating: 4.7, listings: 58, deals: 214, phone: '0345-9876543', langs:['Urdu'] }
  },
  {
    id: 4,
    title: 'Upper Portion for Rent — G-9/2',
    short: 'Upper Portion — G-9/2',
    type: 'House',
    purpose: 'rent',
    loc: 'G-9/2, Street 12, Islamabad',
    city: 'Islamabad',
    price: 55000, priceLabel: '₨55,000', priceSuffix: '/ month',
    rating: 4.6, reviews: 9,
    bedrooms: 3, bathrooms: 2, area: '800 sqft', sizeText: '5 Marla',
    yearBuilt: 2015, parking: 1,
    lat: 33.6960, lng: 72.9980,
    badges: ['CNIC Verified'],
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80'
    ],
    desc: 'Bright upper portion with separate entrance. 3 bedrooms, drawing-dining, kitchen, 2 bathrooms. Ideal for a small family. Near G-9 Markaz with easy access to schools, hospitals and supermarkets.',
    amenities: ['Separate Entrance','Water Tank','Sui Gas','Tiled Floors','Geyser'],
    agent: { name: 'Bilal Hussain', agency: 'City Rentals', joined: 'Sep 2022', rating: 4.6, listings: 18, deals: 41, phone: '0321-1112222', langs:['Urdu','English'] }
  },
  {
    id: 5,
    title: 'Commercial Plaza Floor — Blue Area',
    short: 'Commercial Floor — Blue Area',
    type: 'Commercial',
    purpose: 'sale',
    loc: 'Blue Area, Jinnah Avenue, Islamabad',
    city: 'Islamabad',
    price: 85000000, priceLabel: '₨8.5 Cr',
    rating: 4.8, reviews: 4,
    bedrooms: 0, bathrooms: 2, area: '6,400 sqft', sizeText: '2 Kanal',
    yearBuilt: 2018, parking: 0,
    lat: 33.7255, lng: 73.0943,
    badges: ['CNIC Verified','PP Inspected'],
    images: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80'
    ],
    desc: 'Prime commercial floor on Jinnah Avenue with massive boulevard frontage. Ideal for corporate office or bank branch. Rental yield ~ ₨850,000/month achievable. Building has lift, generator and 24/7 security.',
    amenities: ['Main Boulevard','Lift','Generator','3-Phase Power','Parking','Security'],
    agent: { name: 'Nauman Shah', agency: 'Blue Area Properties', joined: 'Feb 2018', rating: 4.8, listings: 22, deals: 56, phone: '0301-9988776', langs:['Urdu','English'] }
  },
  {
    id: 6,
    title: '1-Kanal House — Gulberg III',
    short: '1-Kanal Luxury House — Gulberg',
    type: 'House',
    purpose: 'sale',
    loc: 'Gulberg III, Block H, Lahore',
    city: 'Lahore',
    price: 52000000, priceLabel: '₨5.2 Cr',
    rating: 5.0, reviews: 21,
    bedrooms: 6, bathrooms: 5, area: '4,500 sqft', sizeText: '1 Kanal',
    yearBuilt: 2024, parking: 3,
    lat: 31.5204, lng: 74.3587,
    badges: ['CNIC Verified','PP Inspected','New Listing'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80'
    ],
    desc: 'Brand-new luxury 1-kanal home in Gulberg III with private swimming pool, designer interiors and fully fitted modular kitchen. Home automation, solar panels and large mature garden. Quiet residential street.',
    amenities: ['Swimming Pool','Servant Qtr','Generator','Solar','CCTV','Lawn','Imported Fittings','Home Automation'],
    agent: { name: 'Hira Tariq', agency: 'Lahore Estates', joined: 'May 2020', rating: 5.0, listings: 29, deals: 75, phone: '0322-5556677', langs:['Urdu','English'] }
  },
  {
    id: 7,
    title: '7-Marla House — Bahria Phase 4',
    short: '7-Marla House — Bahria Ph 4',
    type: 'House',
    purpose: 'sale',
    loc: 'Bahria Town Phase 4, Rawalpindi',
    city: 'Rawalpindi',
    price: 22500000, priceLabel: '₨2.25 Cr',
    rating: 4.7, reviews: 14,
    bedrooms: 5, bathrooms: 4, area: '1,560 sqft', sizeText: '7 Marla',
    yearBuilt: 2020, parking: 2,
    lat: 33.5340, lng: 73.0830,
    badges: ['CNIC Verified'],
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80'
    ],
    desc: 'Double-storey 7-marla house in Bahria Phase 4. 5 bedrooms with attached baths, drawing/dining, TV lounge, modern kitchen, and a small lawn. Walking distance from school and grocery.',
    amenities: ['Lawn','Sui Gas','Generator','Tiled Floors','Cupboards Fitted'],
    agent: { name: 'Umar Farooq', agency: 'Bahria Experts', joined: 'Jul 2019', rating: 4.7, listings: 58, deals: 214, phone: '0345-9876543', langs:['Urdu'] }
  },
  {
    id: 8,
    title: 'Studio Apartment for Rent — E-11',
    short: 'Studio for Rent — E-11',
    type: 'Apartment',
    purpose: 'rent',
    loc: 'E-11/3, Multi Gardens, Islamabad',
    city: 'Islamabad',
    price: 38000, priceLabel: '₨38,000', priceSuffix: '/ month',
    rating: 4.5, reviews: 7,
    bedrooms: 1, bathrooms: 1, area: '520 sqft', sizeText: 'Studio',
    yearBuilt: 2019, parking: 1,
    lat: 33.7315, lng: 72.9770,
    badges: ['CNIC Verified','New Listing'],
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=80'
    ],
    desc: 'Cozy fully-furnished studio in E-11 with attached bathroom and small kitchenette. Perfect for a working bachelor or couple. WiFi and security included.',
    amenities: ['Furnished','WiFi','Lift','Parking','Security','Geyser'],
    agent: { name: 'Bilal Hussain', agency: 'City Rentals', joined: 'Sep 2022', rating: 4.6, listings: 18, deals: 41, phone: '0321-1112222', langs:['Urdu','English'] }
  }
];

window.PP = {
  listings: window.PPRE_LISTINGS,
  byId(id){ return this.listings.find(l => l.id === Number(id)); },
  fmtPrice(n){
    if (n >= 10000000) return '₨' + (n / 10000000).toFixed(2).replace(/\.?0+$/,'') + ' Cr';
    if (n >= 100000)   return '₨' + (n / 100000).toFixed(1).replace(/\.?0+$/,'') + ' Lakh';
    return '₨' + Number(n).toLocaleString('en-PK');
  },
  fmtFull(n){ return '₨' + Number(n).toLocaleString('en-PK'); },

  qs(k){ return new URLSearchParams(location.search).get(k); },
  go(url){ location.href = url; },

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

  // Leaflet price pin
  pricePin(label, selected=false){
    return L.divIcon({
      className: 'ps-pin-wrap',
      html: `<div class="ps-pin ${selected?'on':''}">${label}</div>`,
      iconSize: [70, 28], iconAnchor: [35, 14]
    });
  },

  // Avatar (photo) pin with price chip
  avatarPin(listing, selected=false){
    return L.divIcon({
      className: 'ps-avatar-pin-wrap',
      html: `<div class="ps-avatar-pin ${selected?'on':''}"
                  style="background-image:url('${listing.images[0]}')"
                  data-price="${listing.priceLabel}"></div>`,
      iconSize: [46, 60], iconAnchor: [23, 23]
    });
  },

  hoverCardHTML(l){
    const badgeMap = { 'CNIC Verified':'CNIC','PP Inspected':'Inspected','New Listing':'New' };
    const badges = (l.badges||[]).slice(0,3).map(b => `<span>${badgeMap[b]||b}</span>`).join('');
    const suf = l.priceSuffix ? `<span>${l.priceSuffix}</span>` : `<span>for sale</span>`;
    return `
      <div class="ps-map-card">
        <div class="img" style="background-image:url('${l.images[0]}')"></div>
        <div class="body">
          <div class="t">${l.short}</div>
          <div class="l">${l.loc}</div>
          <div class="f">
            <span class="p">${l.priceLabel} ${suf}</span>
            <span class="r">★ ${l.rating} (${l.reviews})</span>
          </div>
          ${badges ? `<div class="badges">${badges}</div>` : ''}
        </div>
      </div>`;
  },

  // ── Auth modals ──────────────────────────
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
  submitLogin(e){ e.preventDefault(); PP.closeAuth(); PP.toast('Welcome back!'); return false; },
  submitBuyerSignup(e){ e.preventDefault(); PP.closeAuth(); PP.toast('Account created!'); return false; }
};

// Shared header HTML — same architecture as PakStay
window.PP.headerHTML = function(active){
  const a = name => active === name ? 'active' : '';
  return `
  <header class="header">
    <a class="logo" href="/pprealestate/index.html">
      <div class="logo-mark">PP</div>
      <div class="logo-stack">
        <span class="logo-name">PakistanProperty</span>
        <span class="logo-by">Real Estate · Pakistan</span>
      </div>
    </a>
    <div class="search-bar">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input type="text" placeholder="Search city, society, area…" value="Islamabad" />
      <div class="sb-divider"></div>
      <div class="sb-meta">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        For Sale
      </div>
      <div class="sb-divider"></div>
      <div class="sb-meta">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        Any Price
      </div>
      <button class="sb-btn" onclick="location.href='/pprealestate/index.html'">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      </button>
    </div>
    <div class="header-right">
      <a class="h-link ${a('explore')}" href="/pprealestate/index.html">Explore</a>
      <a class="h-link ${a('list')}" href="/pprealestate/add-listing.html">Post Ad</a>
      <a class="h-btn-outline" href="/pprealestate/dashboard.html">My Dashboard</a>
      <button class="h-link" onclick="PP.openLogin()">Sign In</button>
      <button class="h-btn-solid" onclick="PP.openSignup()">Sign Up</button>
      <div class="avatar" onclick="location.href='/pprealestate/dashboard.html'">A</div>
    </div>
  </header>`;
};

window.PP.authModalsHTML = function(){
  return `
  <!-- LOGIN MODAL -->
  <div class="ps-modal-back" id="psLoginModal" onclick="if(event.target===this) PP.closeAuth()">
    <div class="ps-modal" role="dialog" aria-label="Sign in">
      <button class="ps-modal-close" onclick="PP.closeAuth()" aria-label="Close">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="auth-logo" style="margin-bottom:16px;">
        <div class="logo-mark">PP</div>
        <div class="logo-stack">
          <span class="logo-name">PakistanProperty</span>
          <span class="logo-by">Real Estate · Pakistan</span>
        </div>
      </div>
      <h2 class="ps-modal-title">Welcome back</h2>
      <p class="ps-modal-sub">Sign in to manage your listings and saved properties.</p>
      <form onsubmit="return PP.submitLogin(event)">
        <div class="form-group">
          <label class="form-label">Phone or email</label>
          <input class="form-input" type="text" placeholder="03xx-xxxxxxx or you@example.com" required />
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <div class="pwd-wrap">
            <input class="form-input" type="password" placeholder="••••••••" required style="padding-right:38px;" />
            <button type="button" class="pwd-toggle" onclick="PP.togglePwdModal(this)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
        <div class="check-row">
          <label class="cb"><input type="checkbox" /> Remember me</label>
          <a onclick="PP.toast('Reset link sent')">Forgot password?</a>
        </div>
        <button type="submit" class="btn btn-primary btn-block btn-lg">Sign in</button>
      </form>
      <div class="auth-divider">or continue with</div>
      <div class="social-row">
        <button class="social-btn" onclick="PP.toast('Signing in with Google…')">
          <svg width="16" height="16" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20H42v-.05H24v8h11.3c-1.7 4.5-6 7.6-11.3 7.6-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20c11.5 0 19.5-8.3 19.5-20 0-1.4-.2-2.7-.4-4z"/></svg>
          Google
        </button>
        <button class="social-btn" onclick="PP.toast('Signing in with Facebook…')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6 4.39 10.97 10.12 11.88V15.56h-3.05v-3.49h3.05V9.41c0-3.02 1.8-4.68 4.53-4.68 1.31 0 2.69.23 2.69.23v2.97h-1.52c-1.49 0-1.95.93-1.95 1.88v2.26h3.33l-.53 3.49h-2.8v8.39C19.61 23.04 24 18.07 24 12.07z"/></svg>
          Facebook
        </button>
      </div>
      <div class="ps-modal-foot">New to PakistanProperty? <a onclick="PP.openSignup()">Create an account</a></div>
    </div>
  </div>

  <!-- SIGNUP MODAL (role chooser + buyer form) -->
  <div class="ps-modal-back" id="psSignupModal" onclick="if(event.target===this) PP.closeAuth()">
    <div class="ps-modal" role="dialog" aria-label="Create account">
      <button class="ps-modal-close" onclick="PP.closeAuth()" aria-label="Close">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>

      <div id="psSignupChooser">
        <div class="auth-logo" style="margin-bottom:16px;">
          <div class="logo-mark">PP</div>
          <div class="logo-stack">
            <span class="logo-name">PakistanProperty</span>
            <span class="logo-by">Real Estate · Pakistan</span>
          </div>
        </div>
        <h2 class="ps-modal-title">Join PakistanProperty</h2>
        <p class="ps-modal-sub">What would you like to do first?</p>

        <div class="ps-role-grid">
          <div class="ps-role-card" onclick="document.getElementById('psSignupChooser').style.display='none';document.getElementById('psSignupBuyerForm').style.display='block';">
            <div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
            <div class="t">Buy or Rent</div>
            <div class="s">I'm looking for property</div>
          </div>
          <div class="ps-role-card" onclick="location.href='/pprealestate/signup.html'">
            <div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
            <div class="t">Sell / List</div>
            <div class="s">I'm an owner or agent</div>
          </div>
        </div>

        <div class="ps-modal-foot">Already have an account? <a onclick="PP.openLogin()">Sign in</a></div>
      </div>

      <div id="psSignupBuyerForm" style="display:none;">
        <button class="ps-back" style="margin-bottom:14px;" onclick="document.getElementById('psSignupBuyerForm').style.display='none';document.getElementById('psSignupChooser').style.display='block';">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </button>
        <h2 class="ps-modal-title">Create a buyer account</h2>
        <p class="ps-modal-sub">Save searches, shortlist properties &amp; chat with agents.</p>

        <form onsubmit="return PP.submitBuyerSignup(event)">
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
              <button type="button" class="pwd-toggle" onclick="PP.togglePwdModal(this)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
          </div>
          <div style="font-size:11.5px;color:var(--text-muted);margin:-4px 0 12px;line-height:1.5;">
            By creating an account you agree to our <a style="color:var(--green);font-weight:600;">Terms</a> and <a style="color:var(--green);font-weight:600;">Privacy Policy</a>.
          </div>
          <button type="submit" class="btn btn-primary btn-block btn-lg">Create account</button>
        </form>

        <div class="ps-modal-foot">Want to sell instead? <a onclick="location.href='/pprealestate/signup.html'">Sign up as seller →</a></div>
      </div>
    </div>
  </div>`;
};

document.addEventListener('DOMContentLoaded', () => {
  const slot = document.getElementById('pp-header');
  if (slot) slot.outerHTML = window.PP.headerHTML(slot.getAttribute('data-active') || '');

  if (!document.body.hasAttribute('data-no-auth-modals')) {
    const wrap = document.createElement('div');
    wrap.innerHTML = window.PP.authModalsHTML();
    document.body.appendChild(wrap);
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') window.PP.closeAuth();
  });
});

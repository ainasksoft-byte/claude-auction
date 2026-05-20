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

  // build a custom Leaflet price pin
  pricePin(label, selected=false){
    return L.divIcon({
      className: 'ps-pin-wrap',
      html: `<div class="ps-pin ${selected?'on':''}">${label}</div>`,
      iconSize: [60, 28],
      iconAnchor: [30, 14]
    });
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
      <a class="h-btn-solid" href="/pakstay/login.html">Sign In</a>
      <div class="avatar" onclick="location.href='/pakstay/dashboard.html'">R</div>
    </div>
  </header>`;
};

document.addEventListener('DOMContentLoaded', () => {
  const slot = document.getElementById('ps-header');
  if (slot) slot.outerHTML = window.PS.headerHTML(slot.getAttribute('data-active') || '');
});

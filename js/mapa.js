// Locais de apoio — confirme os endereços antes de publicar
const LOCATIONS = [
  {
    name: 'DEAM Porto Velho',
    desc: 'Delegacia Especializada no Atendimento à Mulher',
    address: 'Av. Gov. Jorge Teixeira, Porto Velho, RO',
    phone: '(69) 3216-8800',
    coords: [-8.754492525169605, -63.839149442330246],
    type: 'police',
  },
  {
    name: 'NUDEM · DPE-RO',
    desc: 'Defensoria Pública do Estado de Rondônia',
    address: 'Av. Lauro Sodré, Porto Velho, RO',
    phone: '(69) 3212-0600',
    coords: [-8.753882, -63.886453],
    type: 'legal',
  },
  {
    name: 'Juizado de Violência Doméstica',
    desc: 'Tribunal de Justiça do Estado de Rondônia',
    address: 'Av. Lauro Sodré, Porto Velho, RO',
    phone: '(69) 3309-7107',
    coords: [-8.752516632873885, -63.91063440386581],
    type: 'legal',
  },
  {
    name: 'CREAS Mulher PVH',
    desc: 'Centro de Referência Especializado de Assistência Social',
    address: 'Porto Velho, RO',
    phone: '(69) 8473-4725',
    coords: [-8.752555, -63.881824],
    type: 'social',
  },
];

const TYPE_COLOR = { police: '#B91C1C', legal: '#6B2D8B', social: '#C0175B' };
const TYPE_LABEL = { police: 'Polícia / Delegacia', legal: 'Jurídico / Ministério Público', social: 'Assistência Social' };

function dotIcon(color) {
  return L.divIcon({
    html: `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2.5px solid white;box-shadow:0 1px 5px rgba(0,0,0,.35)"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -12],
    className: '',
  });
}

const map = L.map('mapa').setView([-8.7612, -63.9039], 13);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
  maxZoom: 19,
}).addTo(map);

const markers = LOCATIONS.map(loc => {
  const color = TYPE_COLOR[loc.type];
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${loc.coords[0]},${loc.coords[1]}`;
  return L.marker(loc.coords, { icon: dotIcon(color) })
    .addTo(map)
    .bindPopup(L.popup({ maxWidth: 260 }).setContent(`
      <div class="map-popup">
        <strong>${loc.name}</strong>
        <span class="popup-desc">${loc.desc}</span>
        <span class="popup-address">${loc.address}</span>
        ${loc.phone ? `<span class="popup-phone">${loc.phone}</span>` : ''}
        <a href="${mapsUrl}" target="_blank" rel="noopener" class="popup-btn">Ver no mapa →</a>
      </div>
    `));
});

const lista = document.getElementById('mapa-lista');
LOCATIONS.forEach((loc, i) => {
  const color = TYPE_COLOR[loc.type];
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${loc.coords[0]},${loc.coords[1]}`;
  const el = document.createElement('div');
  el.className = 'mapa-item';
  el.innerHTML = `
    <div class="mapa-item-dot" style="background:${color}"></div>
    <div class="mapa-item-body">
      <div class="mapa-item-name">${loc.name}</div>
      <div class="mapa-item-desc">${loc.desc}</div>
      ${loc.phone ? `<div class="mapa-item-phone">${loc.phone}</div>` : ''}
      <a href="${mapsUrl}" target="_blank" rel="noopener" class="mapa-item-link" onclick="event.stopPropagation()">Ver no mapa →</a>
    </div>
  `;
  el.addEventListener('click', () => {
    map.setView(loc.coords, 16);
    markers[i].openPopup();
    document.querySelectorAll('.mapa-item').forEach(e => e.classList.remove('active'));
    el.classList.add('active');
  });
  lista.appendChild(el);
});

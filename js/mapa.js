// Bairros com maior nº de ocorrências — Fonte: MPRO, jan/2024–jun/2026
// Coordenadas: centroides dos bairros via Google Maps (~10 m de precisão)
const ZONES = [
  { name: 'Jardim Santana',          ocorrencias: 250, coords: [-8.7532, -63.8183] },
  { name: 'Mariana',                 ocorrencias: 151, coords: [-8.7743, -63.8138] },
  { name: 'Socialista',              ocorrencias: 146, coords: [-8.7860, -63.8710] },
  { name: 'Castanheira',             ocorrencias: 130, coords: [-8.7984, -63.8670] },
  { name: 'Três Marias',             ocorrencias: 122, coords: [-8.7769, -63.8493] },
  { name: 'Centro',                  ocorrencias: 108, coords: [-8.7646, -63.9039] },
  { name: 'Aeroclube',               ocorrencias: 102, coords: [-8.7925, -63.8552] },
  { name: 'COHAB',                   ocorrencias:  97, coords: [-8.7926, -63.8744] },
  { name: 'São Francisco',           ocorrencias:  95, coords: [-8.7742, -63.8301] },
  { name: 'Cidade Nova',             ocorrencias:  91, coords: [-8.8074, -63.8781] },
  { name: 'Aponiã',                  ocorrencias:  88, coords: [-8.7371, -63.8552] },
  { name: 'Marcos Freire',           ocorrencias:  88, coords: [-8.7796, -63.8005] },
  { name: 'Lagoinha',                ocorrencias:  79, coords: [-8.7673, -63.8552] },
  { name: 'Nova Floresta',           ocorrencias:  79, coords: [-8.7862, -63.8892] },
  { name: 'Tancredo Neves',          ocorrencias:  77, coords: [-8.7609, -63.8375] },
  { name: 'Juscelino Kubitschek',    ocorrencias:  69, coords: [-8.7710, -63.8375] },
  { name: 'Caladinho',               ocorrencias:  68, coords: [-8.7983, -63.8833] },
  { name: 'Esperança da Comunidade', ocorrencias:  67, coords: [-8.7434, -63.8510] },
  { name: 'Nacional',                ocorrencias:  67, coords: [-8.7259, -63.9084] },
  { name: 'Novo Horizonte',          ocorrencias:  66, coords: [-8.8056, -63.8966] },
  { name: 'Floresta',                ocorrencias:  65, coords: [-8.7804, -63.8776] },
  { name: 'Conceição',               ocorrencias:  60, coords: [-8.7988, -63.8892] },
  { name: 'Nova Esperança',          ocorrencias:  60, coords: [-8.7283, -63.8729] },
  { name: 'Lagoa',                   ocorrencias:  58, coords: [-8.7778, -63.8611] },
  { name: 'Nova Porto Velho',        ocorrencias:  55, coords: [-8.7640, -63.8788] },
  { name: 'Cidade do Lobo',          ocorrencias:  52, coords: [-8.8061, -63.8862] },
  { name: 'Embratel',                ocorrencias:  52, coords: [-8.7493, -63.8847] },
  { name: 'Cuniã',                   ocorrencias:  51, coords: [-8.7559, -63.8537] },
  { name: 'Flodoaldo Pontes Pinto',  ocorrencias:  51, coords: [-8.7485, -63.8729] },
  { name: 'Cascalheira',             ocorrencias:  50, coords: [-8.7797, -63.8360] },
];

function zoneColor(n) {
  if (n >= 200) return '#991B1B';
  if (n >= 100) return '#DC2626';
  return '#EA580C';
}

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

// Círculos de incidência por bairro
ZONES.forEach(zone => {
  const color = zoneColor(zone.ocorrencias);
  const nivel = zone.ocorrencias >= 200 ? 'Muito alto' : zone.ocorrencias >= 100 ? 'Alto' : 'Médio';
  L.circle(zone.coords, {
    radius: Math.min(350 + zone.ocorrencias * 1.8, 900),
    color,
    fillColor: color,
    fillOpacity: 0.13,
    weight: 1.5,
    opacity: 0.55,
  })
  .addTo(map)
  .bindPopup(L.popup({ maxWidth: 220 }).setContent(`
    <div class="map-popup">
      <strong>${zone.name}</strong>
      <span class="popup-desc">Zona de incidência · ${nivel}</span>
      <span class="popup-address">${zone.ocorrencias} ocorrências registradas</span>
      <span class="popup-address" style="font-size:10px;color:#aaa">Jan/2024 – Jun/2026 · Fonte: MPRO</span>
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

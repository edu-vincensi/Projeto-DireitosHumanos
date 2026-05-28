// Gráficos — Chart.js
Chart.defaults.font.family = "'Roboto',sans-serif";
Chart.defaults.color = '#6B6580';

const COLORS = {
  purple:  '#6B2D8B',
  purple2: 'rgba(107,45,139,0.18)',
  purple3: 'rgba(107,45,139,0.38)',
  red:     '#B91C1C',
  red2:    'rgba(185,28,28,0.18)',
  rose:    '#C0175B',
  rose2:   'rgba(192,23,91,0.18)',
  grid:    '#E2D9F0',
};

function baseScales(yExtra) {
  return {
    y: { grid: { color: COLORS.grid }, ...yExtra },
    x: { grid: { display: false } },
  };
}

function occTooltip(unit) {
  return { callbacks: { label: c => ' ' + c.raw.toLocaleString('pt-BR') + ' ' + (unit || 'ocorrências') } };
}

// Lesão Corporal — evolução 2024/2025/2026
new Chart(document.getElementById('c1'), {
  type: 'bar',
  data: {
    labels: ['2024', '2025', '2026 (jan–abr)'],
    datasets: [{
      data: [4591, 4974, 538],
      backgroundColor: [COLORS.purple2, COLORS.purple, COLORS.purple3],
      borderColor: COLORS.purple,
      borderWidth: [1, 2, 1],
      borderRadius: 6,
    }],
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: occTooltip() },
    scales: baseScales({ beginAtZero: false, min: 0, ticks: { callback: v => v.toLocaleString('pt-BR') } }),
  },
});

// Feminicídio — Porto Velho 2024/2025/2026
new Chart(document.getElementById('c2'), {
  type: 'bar',
  data: {
    labels: ['2024', '2025', '2026 (jan–mar)'],
    datasets: [{
      data: [1, 7, 2],
      backgroundColor: [COLORS.red2, COLORS.red, 'rgba(185,28,28,0.38)'],
      borderColor: COLORS.red,
      borderWidth: [1, 2, 1],
      borderRadius: 6,
    }],
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: occTooltip('caso(s)') },
    scales: baseScales({ beginAtZero: true, ticks: { stepSize: 1 } }),
  },
});

const PV_LABELS = ['Ameaça', 'Lesão Corporal', 'Injúria', 'Difamação', 'Calúnia'];

// Porto Velho — Naturezas por ano (grouped bar)
new Chart(document.getElementById('c4'), {
  type: 'bar',
  data: {
    labels: PV_LABELS,
    datasets: [
      { label: '2024',          data: [1893, 1476, 254, 64, 23], backgroundColor: COLORS.purple2, borderColor: COLORS.purple, borderWidth: 1, borderRadius: 4 },
      { label: '2025',          data: [1881, 1542, 298, 57, 37], backgroundColor: COLORS.purple,  borderColor: COLORS.purple, borderWidth: 1, borderRadius: 4 },
      { label: '2026 (parcial)', data: [540, 487, 48, 17, 9],    backgroundColor: COLORS.purple3, borderColor: COLORS.purple, borderWidth: 1, borderRadius: 4 },
    ],
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: { callbacks: { label: c => ' ' + c.dataset.label + ': ' + c.raw.toLocaleString('pt-BR') + ' ocorrências' } },
    },
    scales: baseScales({ beginAtZero: true, ticks: { callback: v => v.toLocaleString('pt-BR') } }),
  },
});

// Porto Velho — Composição por natureza 2025 (doughnut)
new Chart(document.getElementById('c5'), {
  type: 'doughnut',
  data: {
    labels: PV_LABELS,
    datasets: [{
      data: [1881, 1542, 298, 57, 37],
      backgroundColor: [COLORS.purple, COLORS.rose, '#8B5CF6', '#A855F7', '#D946EF'],
      borderWidth: 2,
      borderColor: '#fff',
    }],
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'right', labels: { font: { size: 11 } } },
      tooltip: { callbacks: { label: c => ' ' + c.label + ': ' + c.raw.toLocaleString('pt-BR') + ' (' + (c.raw / 3815 * 100).toFixed(1) + '%)' } },
    },
  },
});

// Porto Velho — Total por período (bar)
new Chart(document.getElementById('c6'), {
  type: 'bar',
  data: {
    labels: ['2024', '2025', '2026 (jan–abr)'],
    datasets: [{
      data: [3710, 3815, 1101],
      backgroundColor: [COLORS.purple2, COLORS.purple, COLORS.purple3],
      borderColor: COLORS.purple,
      borderWidth: [1, 2, 1],
      borderRadius: 6,
    }],
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: occTooltip() },
    scales: baseScales({ beginAtZero: false, min: 0, ticks: { callback: v => v.toLocaleString('pt-BR') } }),
  },
});

// Crimes psicológicos — Difamação / Calúnia
new Chart(document.getElementById('c3'), {
  type: 'bar',
  data: {
    labels: ['Difamação 2024', 'Difamação 2025', 'Calúnia 2024', 'Calúnia 2025'],
    datasets: [{
      data: [204, 212, 62, 78],
      backgroundColor: [COLORS.rose2, COLORS.rose, 'rgba(192,23,91,0.12)', 'rgba(192,23,91,0.55)'],
      borderColor: COLORS.rose,
      borderWidth: 1,
      borderRadius: 6,
    }],
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: occTooltip() },
    scales: baseScales({ beginAtZero: true, ticks: { font: { size: 10 } } }),
  },
});

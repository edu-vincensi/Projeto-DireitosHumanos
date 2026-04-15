// Gráficos — Chart.js
Chart.defaults.font.family = "'Outfit',sans-serif";
Chart.defaults.color = '#6B6580';

const pur  = '#6B2D8B', pur2  = 'rgba(107,45,139,0.18)';
const red  = '#B91C1C', red2  = 'rgba(185,28,28,0.18)';
const rose = '#C0175B', rose2 = 'rgba(192,23,91,0.18)';

// Lesão Corporal — evolução 2024/2025/2026
new Chart(document.getElementById('c1'), {
  type: 'bar',
  data: {
    labels: ['2024', '2025', '2026 (jan–abr)'],
    datasets: [{
      data: [4591, 4974, 538],
      backgroundColor: [pur2, pur, 'rgba(107,45,139,0.38)'],
      borderColor: pur,
      borderWidth: [1, 2, 1],
      borderRadius: 6
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: c => ' ' + c.raw.toLocaleString('pt-BR') + ' ocorrências' } }
    },
    scales: {
      y: { beginAtZero: false, min: 0, grid: { color: '#E2D9F0' }, ticks: { callback: v => v.toLocaleString('pt-BR') } },
      x: { grid: { display: false } }
    }
  }
});

// Feminicídio — 2024 vs 2025
new Chart(document.getElementById('c2'), {
  type: 'bar',
  data: {
    labels: ['2024', '2025'],
    datasets: [{
      data: [15, 25],
      backgroundColor: [red2, red],
      borderColor: red,
      borderWidth: [1, 2],
      borderRadius: 6
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: c => ' ' + c.raw + ' caso(s)' } }
    },
    scales: {
      y: { beginAtZero: true, grid: { color: '#E2D9F0' }, ticks: { stepSize: 5 } },
      x: { grid: { display: false } }
    }
  }
});

// Crimes psicológicos — Difamação / Calúnia
new Chart(document.getElementById('c3'), {
  type: 'bar',
  data: {
    labels: ['Difamação 2024', 'Difamação 2025', 'Calúnia 2024', 'Calúnia 2025'],
    datasets: [{
      data: [204, 212, 62, 78],
      backgroundColor: [rose2, rose, 'rgba(192,23,91,0.12)', 'rgba(192,23,91,0.55)'],
      borderColor: rose,
      borderWidth: 1,
      borderRadius: 6
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: c => ' ' + c.raw + ' ocorrências' } }
    },
    scales: {
      y: { beginAtZero: true, grid: { color: '#E2D9F0' } },
      x: { grid: { display: false }, ticks: { font: { size: 10 } } }
    }
  }
});

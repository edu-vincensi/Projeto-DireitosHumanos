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

// Feminicídio — Porto Velho 2024/2025/2026
new Chart(document.getElementById('c2'), {
  type: 'bar',
  data: {
    labels: ['2024', '2025', '2026 (jan–mar)'],
    datasets: [{
      data: [1, 7, 2],
      backgroundColor: [red2, red, 'rgba(185,28,28,0.38)'],
      borderColor: red,
      borderWidth: [1, 2, 1],
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
      y: { beginAtZero: true, grid: { color: '#E2D9F0' }, ticks: { stepSize: 1 } },
      x: { grid: { display: false } }
    }
  }
});

// Porto Velho — Naturezas por ano (grouped bar)
const pvLabels = ['Ameaça', 'Lesão Corporal', 'Injúria', 'Difamação', 'Calúnia'];

new Chart(document.getElementById('c4'), {
  type: 'bar',
  data: {
    labels: pvLabels,
    datasets: [
      {
        label: '2024',
        data: [1893, 1476, 254, 64, 23],
        backgroundColor: pur2,
        borderColor: pur,
        borderWidth: 1,
        borderRadius: 4
      },
      {
        label: '2025',
        data: [1881, 1542, 298, 57, 37],
        backgroundColor: pur,
        borderColor: pur,
        borderWidth: 1,
        borderRadius: 4
      },
      {
        label: '2026 (parcial)',
        data: [540, 487, 48, 17, 9],
        backgroundColor: 'rgba(107,45,139,0.38)',
        borderColor: pur,
        borderWidth: 1,
        borderRadius: 4
      }
    ]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: { callbacks: { label: c => ' ' + c.dataset.label + ': ' + c.raw.toLocaleString('pt-BR') + ' ocorrências' } }
    },
    scales: {
      y: { beginAtZero: true, grid: { color: '#E2D9F0' }, ticks: { callback: v => v.toLocaleString('pt-BR') } },
      x: { grid: { display: false } }
    }
  }
});

// Porto Velho — Composição por natureza 2025 (doughnut)
new Chart(document.getElementById('c5'), {
  type: 'doughnut',
  data: {
    labels: pvLabels,
    datasets: [{
      data: [1881, 1542, 298, 57, 37],
      backgroundColor: [pur, rose, '#8B5CF6', '#A855F7', '#D946EF'],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'right', labels: { font: { size: 11 } } },
      tooltip: { callbacks: { label: c => ' ' + c.label + ': ' + c.raw.toLocaleString('pt-BR') + ' (' + (c.raw / 3815 * 100).toFixed(1) + '%)' } }
    }
  }
});

// Porto Velho — Total por período (bar)
new Chart(document.getElementById('c6'), {
  type: 'bar',
  data: {
    labels: ['2024', '2025', '2026 (jan–abr)'],
    datasets: [{
      data: [3710, 3815, 1101],
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

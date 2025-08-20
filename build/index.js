document.addEventListener("DOMContentLoaded", function () {
console.log("JS file loaded!");

const lifeGradientTable = document.getElementById('lifeGradientTable');

const lifeGradientData = {
  "Female (non-citizen)": [71.4, 70.5, 75.7, 76.1, 76.6, 76.9, 77.8, 78.0, 78.8, 76.8, 82.4],
  "Male (non-citizen)": [68.2, 66.2, 74.6, 75.8, 76.2, 76.7, 77.2, 77.3, 77.9, 77.4, 81.8],
  "Female (Chinese)": [76.8, 77.3, 77.6, 78.1, 78.7, 78.9, 79.6, 79.8, 80.2, 79.4, 80.2],
  "Female (Malay)": [73.3, 73.4, 73.0, 73.9, 74.7, 74.9, 75.5, 75.8, 75.9, 75.7, 76.9],
  "Female (other Bumiputera)": [73.4, 73.9, 74.7, 75.8, 75.9, 76.3, 76.9, 76.0, 76.2, 75.3, 76.5],
  "Female (Indian)": [72.3, 73.0, 73.5, 74.5, 75.3, 75.5, 75.8, 76.0, 76.0, 74.7, 75.6],
  "Male (Chinese)": [71.6, 72.2, 72.4, 73.2, 73.9, 74.2, 74.8, 74.9, 75.0, 73.6, 74.5],
  "Male (Malay)": [68.9, 69.2, 69.5, 70.1, 70.8, 71.2, 71.6, 71.9, 72.0, 71.5, 72.0],
  "Male (other Bumiputera)": [69.0, 69.5, 70.2, 71.0, 71.5, 72.0, 72.5, 72.2, 72.3, 71.2, 72.0],
  "Male (Indian)": [67.5, 68.0, 68.5, 69.2, 69.8, 70.2, 70.5, 70.8, 71.0, 67.9, 68.3]
};

function getColor(value) {
  const min = 66;
  const max = 83;
  const percent = (value - min) / (max - min);
  const hue = 220 - (percent * 160); // deeper blue to warm red
  const lightness = 92 - (percent * 25); // 92% to 67% lightness
  return `hsl(${hue}, 60%, ${lightness}%)`;
}

function renderGradientTable() {
  lifeGradientTable.innerHTML = '';
  for (const group in lifeGradientData) {
    const row = document.createElement('tr');
    row.innerHTML = `<td class="p-2 border font-bold text-gray-900">${group}</td>` +
      lifeGradientData[group].map(val => `
        <td class="p-2 border text-center font-bold" 
            style="background-color:${getColor(val)}; color:#222; border-radius:4px">
          ${val.toFixed(1)}
        </td>`).join('');
    lifeGradientTable.appendChild(row);
  }
}

renderGradientTable();




const miniCtx = document.getElementById('miniChart').getContext('2d');
new Chart(miniCtx, {
  type: 'line',
  data: {
    labels: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
    datasets: [
      {
        label: 'Female Avg',
        data: [74.5, 74.7, 75.5, 76.0, 76.5, 76.8, 77.2, 77.4, 77.6, 76.5],
        borderColor: '#4e79a7',
        fill: false
      },
      {
        label: 'Male Avg',
        data: [71.2, 71.5, 72.3, 72.8, 73.2, 73.5, 73.8, 74.0, 74.1, 73.0],
        borderColor: '#f28e2b',
        fill: false
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' }
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 65,
        max: 85
      }
    }
  }
});
});

document.addEventListener("DOMContentLoaded", function () {
  const ethnicityData = {
    bumiputera: {
      label: "Bumiputera",
      years: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
      values: [73.2, 73.3, 73.4, 73.5, 73.4, 73.3, 73.2, 73.1, 73.0, 74.0, 74.3],
      stats: { highest: ["2024", "74.3 yrs"], lowest: ["2022", "73 yrs"], average: ["2014–2024", "73.4 yrs"] }
    },
    malay: {
      label: "Malay",
      years: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
      values: [73.0, 73.1, 72.9, 72.9, 73.2, 73.3, 73.4, 73.5, 73.6, 74.0, 74.4],
      stats: { highest: ["2024", "74.4 yrs"], lowest: ["2016–2017", "72.9 yrs"], average: ["2014–2024", "73.3 yrs"] }
    },
    other_bumiputera: {
      label: "Other Bumiputera",
      years: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
      values: [74.7, 74.7, 74.0, 73.8, 73.9, 73.7, 73.5, 73.3, 72.8, 73.5, 74.0],
      stats: { highest: ["2014–2015", "74.7 yrs"], lowest: ["2022", "72.8 yrs"], average: ["2014–2024", "73.9 yrs"] }
    },
    chinese: {
      label: "Chinese",
      years: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
      values: [76.5, 76.6, 76.7, 76.8, 77.0, 77.6, 77.4, 76.2, 76.5, 76.8, 77.0],
      stats: { highest: ["2019", "77.6 yrs"], lowest: ["2021", "76.2 yrs"], average: ["2014–2024", "76.9 yrs"] }
    },
    indian: {
      label: "Indian",
      years: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
      values: [71.0, 71.2, 71.3, 71.5, 71.6, 72.1, 71.8, 71.0, 70.5, 70.5, 71.0],
      stats: { highest: ["2019", "72.1 yrs"], lowest: ["2022–2023", "70.5 yrs"], average: ["2014–2024", "71.4 yrs"] }
    }
  };

  const ctx = document.getElementById('lifeExpectancyChart').getContext('2d');

  function getYAxisRange(values) {
    const min = Math.min(...values);
    const max = Math.max(...values);
    return {
      min: Math.floor(min - 2),
      max: Math.ceil(max + 2)
    };
  }

  function createChart(data) {
    const yRange = getYAxisRange(data.values);
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.years,
        datasets: [{
          label: 'Life Expectancy',
          data: data.values,
          backgroundColor: '#4e79a7'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            min: yRange.min,
            max: yRange.max
          }
        }
      }
    });
  }

  let chart = createChart(ethnicityData.bumiputera);

  function updateDashboard(race) {
    const data = ethnicityData[race];
    const yRange = getYAxisRange(data.values);

    chart.data.labels = data.years;
    chart.data.datasets[0].data = data.values;
    chart.options.scales.y.min = yRange.min;
    chart.options.scales.y.max = yRange.max;
    chart.update();

    document.getElementById('sideCardTitle').textContent = `Life Expectancy - ${data.label}`;
    document.getElementById('highestYear').textContent = data.stats.highest[0];
    document.getElementById('highestValue').textContent = data.stats.highest[1];
    document.getElementById('lowestYear').textContent = data.stats.lowest[0];
    document.getElementById('lowestValue').textContent = data.stats.lowest[1];
    document.getElementById('averageYear').textContent = data.stats.average[0];
    document.getElementById('averageValue').textContent = data.stats.average[1];
  }

  document.getElementById('ethnicitySelect').addEventListener('change', (e) => {
    updateDashboard(e.target.value);
  });
  
  
  
//Comparison chart
const raceA = document.getElementById('raceA');
const raceB = document.getElementById('raceB');
const yearToggle = document.getElementById('yearToggle');
const yearDropdown = document.getElementById('yearDropdown');
const compareCtx = document.getElementById('raceCompareChart').getContext('2d');

// Populate race dropdowns
Object.keys(ethnicityData).forEach(race => {
  const label = ethnicityData[race].label;
  if (!label) return;

  [raceA, raceB].forEach(select => {
    const option = document.createElement('option');
    option.value = race;
    option.textContent = label;
    select.appendChild(option);
  });
});

// Populate year checkboxes
const referenceRace = ethnicityData.bumiputera;
referenceRace.years.forEach(year => {
  const label = document.createElement('label');
  label.classList.add('block', 'text-sm', 'mb-1');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.value = year;
  checkbox.checked = false;
  checkbox.classList.add('mr-2');
  label.appendChild(checkbox);
  label.append(` ${year}`);
  yearDropdown.appendChild(label);
});

// Toggle dropdown visibility
yearToggle.addEventListener('click', () => {
  yearDropdown.classList.toggle('hidden');
});

// Chart setup
let compareChart = new Chart(compareCtx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [
      { label: 'Race A', data: [], backgroundColor: '#4e79a7' },
      { label: 'Race B', data: [], backgroundColor: '#f28e2b' }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: false,
        min: 65,
        max: 85,
        title: { display: true, text: 'Expectancy' }
      }
    },
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false }
    }
  }
});

// Update chart
function updateCompareChart() {
  const selectedRaceA = raceA.value;
  const selectedRaceB = raceB.value;
  const selectedYears = Array.from(yearDropdown.querySelectorAll('input:checked')).map(cb => parseInt(cb.value));

  const dataA = ethnicityData[selectedRaceA];
  const dataB = ethnicityData[selectedRaceB];
  const indices = selectedYears.map(year => dataA.years.indexOf(year));

  compareChart.data.labels = selectedYears.map(String);
  compareChart.data.datasets[0].label = dataA.label;
  compareChart.data.datasets[0].data = indices.map(i => dataA.values[i]);
  compareChart.data.datasets[1].label = dataB.label;
  compareChart.data.datasets[1].data = indices.map(i => dataB.values[i]);
  compareChart.update();
}

// Event listeners
[raceA, raceB].forEach(el => el.addEventListener('change', updateCompareChart));
yearDropdown.addEventListener('change', updateCompareChart);

// Initial selection
raceA.value = 'bumiputera';
raceB.value = 'chinese';
yearDropdown.querySelectorAll('input[value="2024"]')[0].checked = true;
updateCompareChart();
});
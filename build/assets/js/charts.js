document.addEventListener("DOMContentLoaded", function () {
  const sexesData = {
    bothsexes: {
      label: "Both Sexes",
      state: ["Selangor", "W.P. Labuan", "W.P. Kuala Lumpur", "Sarawak", "Sabah", "Johor", "Pulau Pinang", "W.P. Putrajaya", "Melaka", "Negeri Sembilan", "Perak", "Perlis", "Kelantan", "Pahang", "Kedah", "Terengganu"],
      values: [78.0, 77.8, 76.2, 75.2, 75.1, 74.9, 74.7, 74.5, 74.3, 74.0, 73.8, 73.5, 73.2, 73.1, 73.0, 72.2],
    },
	male: {
      label: "male",
      state: ["W.P. Labuan", "Selangor", "W.P.Kuala Lumpur", "Sabah", "Johor", "Sarawak", "Pulau Pinang", "W.P.Putrajaya", "Melaka", "Negeri Sembilan", "Perak", "Pahang", "Perlis", "Kelantan", "Kedah", "Terenganu"],
      values: [76.4,76.1,74.1,73.2,72.8,72.8,72.5,72.3,71.8,71.4,71.0,70.9,70.9,70.7,70.3,69.8],
    },
	female: {
      label: "female",
      state: ["Selangor", "W.P.Labuan", "W.P.Kuala Lumpur", "Sarawak", "Johor", "Pulau Pinang", "Sabah", "Melaka", "Negeri Sembilan", "Perak", "W.P.Putrajaya", "Perlis", "Kedah", "Kelantan", "Pahang", "Terengganu "],
      values: [80.3,79.4,78.8,77.8,77.4,77.3,77.3,77.0,77.0,76.9,76.5,76.2,76.0,76.0,75.8,75.0],
    },
    gendergap: {
      label: "Gender Gap",
      state: ["Perak", "Kedah", "Negeri Sembilan", "Kelantan", "Perlis", "Melaka", "Terengganu", "Sarawak", "Pahang", "Pulau Pinang", "W.P.Kuala Lumpur", "Johor", "Selangor", "W.P.Putrajaya", "Sabah", "W.P.Labuan"],
      values: [5.9,5.7,5.6,5.3,5.3,5.2,5.2,5.0,4.9,4.8,4.7,4.6,4.2,4.2,4.1,3.0],
    }
  };
  
  const chartColors = {
  bothsexes: [
    '#4e79a7', '#f28e2b', '#e15759', '#76b7b2',
    '#59a14f', '#edc949', '#af7aa1', '#ff9da7',
    '#9c755f', '#d37295', '#b07aa1', '#fabfd2',
    '#9c9ede', '#c49c94', '#86bc86', '#f1ce63'
  ],
  gendergap: [
    '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728',
    '#9467bd', '#8c564b', '#e377c2', '#7f7f7f',
    '#bcbd22', '#17becf', '#aec7e8', '#ffbb78',
    '#98df8a', '#ff9896', '#c5b0d5', '#c49c94'
  ],
  male: [
    '#003f5c', '#2f4b7c', '#665191', '#a05195',
    '#d45087', '#f95d6a', '#ff7c43', '#ffa600',
    '#8dd3c7', '#ffffb3', '#bebada', '#fb8072',
    '#80b1d3', '#fdb462', '#b3de69', '#fccde5'
  ],
  female: [
    '#e6194b', '#3cb44b', '#ffe119', '#4363d8',
    '#f58231', '#911eb4', '#46f0f0', '#f032e6',
    '#bcf60c', '#fabebe', '#008080', '#e6beff',
    '#9a6324', '#fffac8', '#800000', '#aaffc3'
  ]
};


  const ctx = document.getElementById('lifeExpectancyChart').getContext('2d');
  let chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: sexesData.bothsexes.state,
      datasets: [{
        label: 'Life Expectancy',
        data: sexesData.bothsexes.values,
        backgroundColor: chartColors.bothsexes
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' },
        title: {
          display: true,
          text: `Life Expectancy - ${sexesData.bothsexes.label}`
        }
      }
    }
  });

  function updateDashboard(key) {
    const data = sexesData[key];
    chart.data.labels = data.state;
    chart.data.datasets[0].data = data.values;
    chart.data.datasets[0].backgroundColor = chartColors[key];
    chart.options.plugins.title.text = `Life Expectancy - ${data.label}`;
    chart.update();

    const combined = data.state.map((state, i) => ({
      state,
      value: data.values[i]
    }));
    combined.sort((a, b) => b.value - a.value);

    const rankingList = document.getElementById('rankingList');
    rankingList.innerHTML = combined.map((item, index) => {
      const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
      return `<li><strong>${medal}</strong> ${item.state} — <span style="font-weight: bold;">${item.value}</span></li>`;
    }).join('');
  }

  document.getElementById('sexesSelect').addEventListener('change', (e) => {
    updateDashboard(e.target.value);
  });

updateDashboard('bothsexes');
  });

const COLORS = [
  "#2ecc71",
  "#3498db",
  "#95a5a6",
  "#9b59b6",
  "#f1c40f",
  "#e74c3c",
  "#34495e"
];

new Chart(document.querySelector('.chart').getContext('2d'), {
  type: 'pie',
  data: {
    labels: ["Green", "Blue", "Gray", "Purple", "Yellow", "Red", "Black"],
    datasets: [{
      backgroundColor: COLORS,
      data: [12, 19, 3, 17, 28, 24, 7]
    }]
  },
  options: {
    layout: {
      padding: 100
    },
    legend: {
      display: false
    },
    plugins: {
      outlabels: {
        backgroundColor: COLORS,
        borderColor: 'black',
        borderRadius: 2,
        color: 'black',
        stretch: 50,
        lineWidth: 2,
        font: {
          resizable: true,
          minSize: 15,
          maxSize: 20,
        },
        zoomOutPercentage: 100,
        textAlign: 'start',
        // backgroundColor: null
      }
    }
  }
});
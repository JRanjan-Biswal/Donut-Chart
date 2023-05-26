const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Weekly Sales',
    data: [18, 12, 6, 9, 12, 3, 9],
    backgroundColor: [
      'rgba(255, 26, 104, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(0, 0, 0, 0.2)'
    ],
    borderColor: [
      'rgba(255, 26, 104, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(0, 0, 0, 1)'
    ],
    borderWidth: 1,
    cutout: '40%',
    // offset: 100
  }]
};

// doughNutLabelLine - plugin
const doughNutLabelLine = {
  id: 'doughNutLabelLine', // optional
  afterDraw(chart, args, options){
    const {ctx, chartArea:{top, bottom, left, right, width, height}} = chart;
    chart.data.datasets.forEach((dataset, i) => {
      chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
        console.log(ctx);
        const { x, y } = datapoint.tooltipPosition();
        
        // ctx.fillStyle = dataset.borderColor[index];
        // ctx.fillRect(x, y, 100, 30);

        // draw line
        const halfHeight = height/2;
        const halfWidth = width/2;

        const xLine = x >= halfWidth  ? x + 15 : x-15;
        const yLine = y >= halfHeight ? y+19 : y-19;
        const extraLine = x >= halfWidth ? 70 : -70;

        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(xLine, yLine);
        ctx.lineTo(xLine + extraLine, yLine);
        ctx.strokeStyle = dataset.borderColor[index]
        ctx.stroke()

        // text
        const textWidth = ctx.measureText(chart.data.labels[index]).width;
        ctx.font = '12px Arial';

        // controlling text position
        const text_X_Position = x >= halfWidth ? 'left' : 'right'; 
        const addMorePx = x >= halfWidth ? 5 : -5 ; 
        ctx.textAlign = text_X_Position;
        ctx.textBaseline = 'middle';
        ctx.fillText(chart.data.labels[index], xLine+extraLine+addMorePx, yLine);

      })
    });
  }
}

// config 
const config = {
  type: 'doughnut',
  data,
  options: {
    // layout: {
    //   padding: 20
    // },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    }
  },
  plugins: [doughNutLabelLine]
};

// render init block
const myChart = new Chart(
  document.getElementById('myChart'),
  config
);

// Instantly assign Chart.js version
const chartVersion = document.getElementById('chartVersion');
chartVersion.innerText = Chart.version;
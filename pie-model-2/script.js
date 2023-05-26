Chart.defaults.set('plugins.datalabels', {
    color: '#FE777B'
});

const COLORS = [
    "#2ecc71",
    "#3498db",
    "#95a5a6",
    "#9b59b6",
    "#f1c40f",
    "#e74c3c",
    "#34495e"
];

const ctx = document.querySelector('#myChart');

var chart = new Chart(ctx, {
    type: 'pie',
    options: {
        plugins: {
            // Change options for ALL labels of THIS CHART
            datalabels: {
                color: '#36A2EB'
            },
            legend: {
                display: false
            }        
        }
    },
    data: {
        labels: ["Green", "Blue", "Gray", "Purple", "Yellow", "Red", "Black"],
        datasets: [{
            backgroundColor: COLORS,
            data: [12, 19, 3, 17, 28, 24, 7]
        }]
    },
    plugins: [ChartDataLabels],
    options: {}
});
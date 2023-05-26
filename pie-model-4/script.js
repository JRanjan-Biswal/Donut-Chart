var ctx = document.getElementById("myChart");
var data = [61, 10, 28];
const getSuitableY = (y, yArray = [], direction) => {
    let result = y;
    yArray.forEach((existedY) => {
        if (existedY - 14 < result && existedY + 14 > result) {
            if (direction === "right") {
                result = existedY + 14;
            } else {
                result = existedY - 14;
            }
        }
    });
    return result;
};

const getOriginPoints = (source, center, l) => {
    // console.log(source, center, l)

    let a = { x: 0, y: 0 };
    var dx = (center.x - source.x) / l
    var dy = (center.y - source.y) / l
    a.x = center.x + l * dx
    a.y = center.y + l * dy
    return a
};
const options = {
    plugins: {
        legend: {
            display: false,
            // position: "bottom"
        },
    },
    layout: {
        padding: {
            top: 30,
            left: 0,
            right: 0,
            bottom: 30
        }
    },
};
const plugins = [
    {
        afterDraw: (chart) => {
            const ctx = chart.ctx;
            ctx.save();
            ctx.font = "10px 'Averta Std CY'";
            const leftLabelCoordinates = [];
            const rightLabelCoordinates = [];
            const chartCenterPoint = {
                x: (chart.chartArea.right - chart.chartArea.left) / 2 + chart.chartArea.left,
                y: (chart.chartArea.bottom - chart.chartArea.top) / 2 + chart.chartArea.top
            };
            chart.config.data.labels.forEach((label, i) => {
                const meta = chart.getDatasetMeta(0);
                const arc = meta.data[i];
                const dataset = chart.config.data.datasets[0];

                // Prepare data to draw
                // important point 1
                const centerPoint = arc.getCenterPoint();
                let color = chart.config._config.data.datasets[0].backgroundColor[i];
                let labelColor = chart.config._config.data.datasets[0].backgroundColor[i];


                const angle = Math.atan2(
                    centerPoint.y - chartCenterPoint.y,
                    centerPoint.x - chartCenterPoint.x
                );
                // important point 2, this point overlapsed with existed points
                // so we will reduce y by 14 if it's on the right
                // or add by 14 if it's on the left
                let originPoint = getOriginPoints(chartCenterPoint, centerPoint, arc.outerRadius)
                const point2X =
                    chartCenterPoint.x + Math.cos(angle) * (centerPoint.x < chartCenterPoint.x ? arc.outerRadius + 10 : arc.outerRadius + 10);
                let point2Y =
                    chartCenterPoint.y + Math.sin(angle) * (centerPoint.y < chartCenterPoint.y ? arc.outerRadius + 20 : arc.outerRadius + 15);

                let suitableY;
                if (point2X < chartCenterPoint.x) {
                    // on the left
                    suitableY = getSuitableY(point2Y, leftLabelCoordinates, "left");
                } else {
                    // on the right

                    suitableY = getSuitableY(point2Y, rightLabelCoordinates, "right");
                }

                point2Y = suitableY;

                // let value = dataset.data[i];
                let value = label;
                // if (dataset.polyline && dataset.polyline.formatter) {
                //   value = dataset.polyline.formatter(value);
                // }
                let edgePointX = point2X < chartCenterPoint.x ? chartCenterPoint.x - arc.outerRadius - 10 : chartCenterPoint.x + arc.outerRadius + 10;

                if (point2X < chartCenterPoint.x) {
                    leftLabelCoordinates.push(point2Y);
                } else {
                    rightLabelCoordinates.push(point2Y);
                }

                //DRAW CODE
                // first line: connect between arc's center point and outside point
                ctx.lineWidth = 2;
                ctx.strokeStyle = color;
                ctx.beginPath();
                ctx.moveTo(originPoint.x, originPoint.y);
                ctx.lineTo(point2X, point2Y);
                ctx.stroke();
                // second line: connect between outside point and chart's edge
                ctx.beginPath();
                ctx.moveTo(point2X, point2Y);
                ctx.lineTo(edgePointX, point2Y);
                ctx.stroke();
                //fill custom label
                const labelAlignStyle =
                    edgePointX < chartCenterPoint.x ? "right" : "left";
                const labelX = edgePointX < chartCenterPoint.x ? edgePointX : edgePointX + 0;
                const labelY = point2Y + 7;
                ctx.textAlign = labelAlignStyle;
                ctx.textBaseline = "bottom";
                ctx.font = "bold 12px Lato";
                // ctx.fillStyle = labelColor;
                ctx.fillText(value, labelX, labelY);
            });
            ctx.restore();
        }
    }
];

const dataAll = {
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
        polyline: {
            //   color: "gray",
            //   labelColor: "gray",
            formatter: (value) => `${value}`
        }
    }]
};

var myChart = new Chart(ctx, {
    type: 'pie',
    plugins: plugins,
    options: options,
    data: dataAll
});
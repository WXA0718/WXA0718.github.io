document.addEventListener('DOMContentLoaded', function () {
    const data = JSON.parse(localStorage.getItem('healthData')) || {};
    const labels = [];
    const weightData = [];
    const bodyFatData = [];
    const stepsData = [];
    const calorieData = [];

    // 日付の配列を取得し、過去一週間分のデータを配列に追加
    const dates = Object.keys(data).sort().slice(-7);

    dates.forEach(date => {
        labels.push(date);
        weightData.push(data[date].weight);
        bodyFatData.push(data[date].bodyFat);
        stepsData.push(data[date].steps);
        calorieData.push(data[date].calories);
    });

    const latestDate = dates[dates.length - 1];
    document.getElementById('current-weight').textContent = (data[latestDate]?.weight || 'N/A') + 'kg';
    document.getElementById('current-body-fat').textContent = (data[latestDate]?.bodyFat || 'N/A') + '%';
    document.getElementById('current-calories').textContent = (data[latestDate]?.calories || 'N/A') + 'kcal';

    // グラフの作成
    const createChart = (ctx, label, data, borderColor, backgroundColor) => {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    borderColor: borderColor,
                    backgroundColor: backgroundColor,
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    // ダッシュボード総合データグラフ
    const summaryCtx = document.getElementById('summary-chart').getContext('2d');
    new Chart(summaryCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: '体重 (kg)',
                    data: weightData,
                    borderColor: 'rgba(30, 144, 255, 1)',
                    backgroundColor: 'rgba(30, 144, 255, 0.2)',
                    fill: false
                },
                {
                    label: '脂肪率 (%)',
                    data: bodyFatData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: false
                },
                {
                    label: '歩数',
                    data: stepsData,
                    borderColor: 'rgba(60, 179, 113, 1)',
                    backgroundColor: 'rgba(60, 179, 113, 0.2)',
                    fill: false
                },
                {
                    label: '摂取カロリー (kcal)',
                    data: calorieData,
                    borderColor: 'rgba(255, 165, 0, 1)',
                    backgroundColor: 'rgba(255, 165, 0, 0.2)',
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // 体重管理グラフ
    const weightCtx = document.getElementById('weight-chart').getContext('2d');
    createChart(weightCtx, '体重 (kg)', weightData, 'rgba(30, 144, 255, 1)', 'rgba(30, 144, 255, 0.2)');

    // 脂肪率管理グラフ
    const bodyFatCtx = document.getElementById('body-fat-chart').getContext('2d');
    createChart(bodyFatCtx, '脂肪率 (%)', bodyFatData, 'rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 0.2)');

    // 栄養管理グラフ
    const calorieCtx = document.getElementById('calorie-chart').getContext('2d');
    createChart(calorieCtx, '摂取カロリー (kcal)', calorieData, 'rgba(255, 165, 0, 1)', 'rgba(255, 165, 0, 0.2)');
});

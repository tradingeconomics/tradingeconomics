const ctx = document.getElementById('tradingChart').getContext('2d');

let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: []
    },
    options: {
        plugins: {
            legend: {
                onClick: () => {
                    return
                }
            }
        }
    }
});
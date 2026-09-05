window.ChartConfig = {
    colors: {
        mexico: {
            primary: "#2e7d32",
            background: "rgba(46, 125, 50, 0.1)",
        },
        thailand: {
            primary: "#f57f17",
            background: "rgba(245, 127, 23, 0.1)",
        },
    },

    getColors: function () {
        return this.colors;
    },

    getChartOptions: function () {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: "Mexico vs Thailand Car Registration Comparison",
                    color: "#ffffff",
                    font: {
                        size: 16,
                        weight: "500",
                    },
                    padding: 20,
                },
                legend: {
                    labels: {
                        color: "#ffffff",
                        font: {
                            size: 12,
                        },
                    },
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Time Period",
                        color: "#cccccc",
                        font: {
                            size: 12,
                            weight: "500",
                        },
                    },
                    ticks: {
                        color: "#cccccc",
                        maxTicksLimit: 20,
                    },
                    grid: {
                        color: "#444444",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Number of Registrations",
                        color: "#cccccc",
                        font: {
                            size: 12,
                            weight: "500",
                        },
                    },
                    ticks: {
                        color: "#cccccc",
                        callback: function (value) {
                            return value.toLocaleString();
                        },
                    },
                    grid: {
                        color: "#444444",
                    },
                },
            },
            elements: {
                point: {
                    radius: 3,
                    hoverRadius: 6,
                },
            },
            interaction: {
                intersect: false,
                mode: "index",
            },
        };
    },
};

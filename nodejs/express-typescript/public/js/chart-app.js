(function () {
    "use strict";

    window.ChartApp = {
        state: {
            originalData: { mexico: [], thailand: [] },
            filteredData: { mexico: [], thailand: [] },
            chart: null,
            currentAggregation: "monthly",
        },

        init: function (mexicoData, thailandData) {
            try {
                this.state.originalData.mexico = this.validateData(mexicoData);
                this.state.originalData.thailand = this.validateData(thailandData);

                this.setDefaultDateRange();

                this.setupEventListeners();

                this.updateChart();
            } catch (error) {
                console.error("chart app initialization failed:", error);
                this.showError("Application failed to initialize: " + error.message);
            }
        },

        validateData: function (data) {
            if (!Array.isArray(data) || data.length === 0) {
                return [];
            }

            return data
                .map((item) => ({
                    date: new Date(item.date),
                    value: item.value,
                }))
                .sort((a, b) => a.date - b.date);
        },

        setDefaultDateRange: function () {
            const allDates = [
                ...this.state.originalData.mexico.map((d) => d.date),
                ...this.state.originalData.thailand.map((d) => d.date),
            ];

            if (allDates.length === 0) return;

            const minDate = new Date(Math.min(...allDates));
            const maxDate = new Date(Math.max(...allDates));

            const startInput = document.getElementById("startDate");
            const endInput = document.getElementById("endDate");

            if (startInput) startInput.value = minDate.toISOString().split("T")[0];
            if (endInput) endInput.value = maxDate.toISOString().split("T")[0];
        },

        setupEventListeners: function () {
            document.querySelectorAll('input[name="aggregation"]').forEach((radio) => {
                radio.addEventListener("change", (e) => {
                    const val = e.target.value;
                    this.state.currentAggregation = val === "half-yearly" ? "halfyearly" : val;
                    this.updateChart();
                });
            });

            document.querySelectorAll(".preset-btn").forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    this.handlePresetClick(e.target.dataset.range);

                    document.querySelectorAll(".preset-btn").forEach((b) => b.classList.remove("active"));
                    e.target.classList.add("active");
                });
            });

            const applyBtn = document.getElementById("applyDateRange");
            if (applyBtn) {
                applyBtn.addEventListener("click", () => this.updateChart());
            }

            ["startDate", "endDate"].forEach((id) => {
                const input = document.getElementById(id);
                if (input) {
                    input.addEventListener("change", () => this.updateChart());
                }
            });
        },

        handlePresetClick: function (range) {
            const allDates = [
                ...this.state.originalData.mexico.map((d) => d.date),
                ...this.state.originalData.thailand.map((d) => d.date),
            ];

            if (allDates.length === 0) return;

            const maxDate = new Date(Math.max(...allDates));
            const minDate = new Date(Math.min(...allDates));
            let startDate = new Date(maxDate);

            switch (range) {
                case "1month":
                    startDate.setMonth(maxDate.getMonth() - 1);
                    break;
                case "6months":
                    startDate.setMonth(maxDate.getMonth() - 6);
                    break;
                case "1year":
                    startDate.setFullYear(maxDate.getFullYear() - 1);
                    break;
                case "3years":
                    startDate.setFullYear(maxDate.getFullYear() - 3);
                    break;
                case "5years":
                    startDate.setFullYear(maxDate.getFullYear() - 5);
                    break;
                case "10years":
                    startDate.setFullYear(maxDate.getFullYear() - 10);
                    break;
                case "all":
                default:
                    startDate = minDate;
                    break;
            }

            if (startDate < minDate) startDate = minDate;

            document.getElementById("startDate").value = startDate.toISOString().split("T")[0];
            document.getElementById("endDate").value = maxDate.toISOString().split("T")[0];

            this.updateChart();
        },

        filterDataByDateRange: function (data, startDate, endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);

            return data.filter((item) => item.date >= start && item.date <= end);
        },

        aggregateData: function (data, period) {
            if (!data || data.length === 0) return [];

            const aggregated = {};

            data.forEach((item) => {
                let key;
                const date = new Date(item.date);

                switch (period) {
                    case "monthly":
                        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
                        break;
                    case "quarterly":
                        const quarter = Math.floor(date.getMonth() / 3) + 1;
                        key = `${date.getFullYear()}-Q${quarter}`;
                        break;
                    case "halfyearly":
                        const half = date.getMonth() < 6 ? "H1" : "H2";
                        key = `${date.getFullYear()}-${half}`;
                        break;
                    case "yearly":
                        key = `${date.getFullYear()}`;
                        break;
                    default:
                        return data;
                }

                if (!aggregated[key]) {
                    aggregated[key] = { values: [], dates: [] };
                }
                aggregated[key].values.push(item.value);
                aggregated[key].dates.push(date);
            });

            return Object.keys(aggregated)
                .sort()
                .map((key) => {
                    const group = aggregated[key];
                    const avgValue = group.values.reduce((sum, val) => sum + val, 0) / group.values.length;
                    const latestDate = new Date(Math.max(...group.dates));

                    return {
                        date: latestDate,
                        value: Math.round(avgValue * 100) / 100,
                        period: key,
                    };
                });
        },

        updateChart: function () {
            try {
                const startDate = document.getElementById("startDate")?.value;
                const endDate = document.getElementById("endDate")?.value;

                if (!startDate || !endDate) {
                    console.error("Date range not available");
                    return;
                }

                const filteredMexico = this.filterDataByDateRange(this.state.originalData.mexico, startDate, endDate);
                const filteredThailand = this.filterDataByDateRange(
                    this.state.originalData.thailand,
                    startDate,
                    endDate
                );

                const mexicoAggregated = this.aggregateData(filteredMexico, this.state.currentAggregation);
                const thailandAggregated = this.aggregateData(filteredThailand, this.state.currentAggregation);

                this.state.filteredData.mexico = filteredMexico;
                this.state.filteredData.thailand = filteredThailand;

                this.createChart(mexicoAggregated, thailandAggregated);

                this.updateStatistics();
            } catch (error) {
                console.error("Chart update failed:", error);
                this.showError("Failed to update chart: " + error.message);
            }
        },

        createChart: function (mexicoData, thailandData) {
            const canvas = document.getElementById("myChart");
            if (!canvas) {
                throw new Error("Chart canvas not found");
            }

            const ctx = canvas.getContext("2d");

            if (this.state.chart) {
                this.state.chart.destroy();
            }

            const allPeriods = new Set([
                ...mexicoData.map((d) => d.period || d.date.toISOString().split("T")[0]),
                ...thailandData.map((d) => d.period || d.date.toISOString().split("T")[0]),
            ]);
            const labels = Array.from(allPeriods).sort();

            const mexicoValues = labels.map((label) => {
                const item = mexicoData.find((d) => (d.period || d.date.toISOString().split("T")[0]) === label);
                return item ? item.value : null;
            });

            const thailandValues = labels.map((label) => {
                const item = thailandData.find((d) => (d.period || d.date.toISOString().split("T")[0]) === label);
                return item ? item.value : null;
            });

            const colors = window.ChartConfig ? window.ChartConfig.getColors() : this.getFallbackColors();

            this.state.chart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Mexico Car Registrations",
                            data: mexicoValues,
                            borderColor: colors.mexico.primary,
                            backgroundColor: colors.mexico.background,
                            pointBackgroundColor: colors.mexico.pointBackground || colors.mexico.primary,
                            pointBorderColor: colors.mexico.primary,
                            pointHoverBackgroundColor: colors.mexico.pointHover || colors.mexico.primary,
                            pointHoverBorderColor: "#ffffff",
                            borderWidth: 2,
                            fill: true,
                            tension: 0.1,
                            spanGaps: true,
                        },
                        {
                            label: "Thailand Car Registrations",
                            data: thailandValues,
                            borderColor: colors.thailand.primary,
                            backgroundColor: colors.thailand.background,
                            pointBackgroundColor: colors.thailand.pointBackground || colors.thailand.primary,
                            pointBorderColor: colors.thailand.primary,
                            pointHoverBackgroundColor: colors.thailand.pointHover || colors.thailand.primary,
                            pointHoverBorderColor: "#ffffff",
                            borderWidth: 2,
                            fill: true,
                            tension: 0.1,
                            spanGaps: true,
                        },
                    ],
                },
                options: this.getChartOptions(),
            });
        },

        getChartOptions: function () {
            return {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: "Mexico vs Thailand Car Registration Comparison",
                        color: "#333333",
                        font: { size: 18, weight: "500" },
                        padding: 20,
                    },
                    legend: {
                        labels: {
                            color: "#555555",
                            font: { size: 12 },
                        },
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Time Period",
                            color: "#666666",
                            font: { size: 12, weight: "500" },
                        },
                        ticks: {
                            color: "#666666",
                            maxTicksLimit: 20,
                        },
                        grid: { color: "#e0e0e0" },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Number of Registrations",
                            color: "#666666",
                            font: { size: 12, weight: "500" },
                        },
                        ticks: {
                            color: "#666666",
                            callback: function (value) {
                                return typeof value === "number" ? value.toLocaleString() : value;
                            },
                        },
                        grid: { color: "#e0e0e0" },
                    },
                },
                elements: {
                    point: { radius: 4, hoverRadius: 6 },
                },
                interaction: {
                    intersect: false,
                    mode: "index",
                },
            };
        },

        updateStatistics: function () {
            const mexicoData = this.state.filteredData.mexico;
            const thailandData = this.state.filteredData.thailand;

            this.updateCountryStats("mexico", mexicoData);
            this.updateCountryStats("thailand", thailandData);
            this.updateSeasonalInsight(mexicoData, thailandData);
        },

        updateCountryStats: function (country, data) {
            if (!data || data.length === 0) {
                this.updateElement(`${country}-total`, "No data");
                this.updateElement(`${country}-average`, "-");
                this.updateElement(`${country}-max`, "-");
                this.updateElement(`${country}-min`, "-");
                this.updateElement(`${country}-max-date`, "-");
                this.updateElement(`${country}-min-date`, "-");
                this.updateElement(`${country}-growth`, "-");
                this.updateElement(`${country}-count`, "0");
                return;
            }

            const dataForMin = data.length > 1 ? data.slice(0, -1) : data;

            const values = data.map((d) => d.value);
            const total = values.reduce((s, v) => s + v, 0);

            const firstDate = data[0].date;
            const lastDate = data[data.length - 1].date;
            const msPerYear = 365.25 * 24 * 60 * 60 * 1000;
            const spanYears = Math.max(1, (lastDate - firstDate) / msPerYear);
            const avgYearly = total / spanYears;

            const maxVal = Math.max(...values);
            const maxItem = data.find((d) => d.value === maxVal);

            const minVal = Math.min(...dataForMin.map((d) => d.value));
            const minItem = dataForMin.find((d) => d.value === minVal);

            let growthPct = null;
            if (data[0].value !== 0) {
                growthPct = ((data[data.length - 1].value - data[0].value) / data[0].value) * 100;
            }

            const byYear = {};
            data.forEach((item) => {
                const y = item.date.getFullYear();
                const m = item.date.getMonth();
                if (!byYear[y]) byYear[y] = { jan: null, dec: null };
                if (m === 11) byYear[y].dec = item.value;
                if (m === 0) byYear[y].jan = item.value;
            });

            let seasonalCount = 0;
            let seasonalDeltaSum = 0;
            Object.keys(byYear).forEach((yStr) => {
                const y = parseInt(yStr, 10);
                const decVal = byYear[y] && byYear[y].dec;
                const nextJanVal = byYear[y + 1] && byYear[y + 1].jan;
                if (country === "thailand") {
                    if (decVal != null && nextJanVal != null && nextJanVal > decVal) {
                        seasonalCount++;
                        seasonalDeltaSum += nextJanVal - decVal;
                    }
                } else if (country === "mexico") {
                    if (decVal != null && nextJanVal != null && decVal > nextJanVal) {
                        seasonalCount++;
                        seasonalDeltaSum += decVal - nextJanVal;
                    }
                }
            });
            const seasonalAvgChange = seasonalCount > 0 ? seasonalDeltaSum / seasonalCount : null;

            this.updateElement(`${country}-total`, Math.round(total).toLocaleString());
            this.updateElement(`${country}-average`, Math.round(avgYearly).toLocaleString());
            this.updateElement(`${country}-max`, maxVal.toLocaleString());
            this.updateElement(`${country}-max-date`, this.formatDate(maxItem.date));
            this.updateElement(`${country}-min`, minVal.toLocaleString());
            this.updateElement(`${country}-min-date`, this.formatDate(minItem.date));
            this.updateElement(`${country}-growth`, growthPct !== null ? growthPct.toFixed(1) + "%" : "N/A");
            this.updateElement(`${country}-count`, values.length.toString());

            const growthEl = document.getElementById(`${country}-growth`);
            if (growthEl) {
                growthEl.classList.remove("growth-positive", "growth-negative", "growth-neutral");
                if (growthPct === null) {
                    growthEl.classList.add("growth-neutral");
                } else if (growthPct > 0) {
                    growthEl.classList.add("growth-positive");
                } else if (growthPct < 0) {
                    growthEl.classList.add("growth-negative");
                } else {
                    growthEl.classList.add("growth-neutral");
                }
            }

            if (document.getElementById(`${country}-seasonal-count`)) {
                this.updateElement(`${country}-seasonal-count`, seasonalCount.toString());
            }
            if (document.getElementById(`${country}-seasonal-change`)) {
                this.updateElement(
                    `${country}-seasonal-change`,
                    seasonalAvgChange !== null ? Math.round(seasonalAvgChange).toLocaleString() : "N/A"
                );
            }
        },

        updateSeasonalInsight: function (mexicoData, thailandData) {
            const box = document.getElementById("seasonal-insight-body");
            if (!box) {
                return;
            }
            if (!mexicoData.length || !thailandData.length) {
                box.textContent = "Not enough data to derive seasonal insights.";
                return;
            }

            const computePattern = (data, mode) => {
                const byYear = {};
                data.forEach((item) => {
                    const y = item.date.getFullYear();
                    const m = item.date.getMonth();
                    if (!byYear[y]) byYear[y] = { jan: null, dec: null };
                    if (m === 11) byYear[y].dec = item.value;
                    if (m === 0) byYear[y].jan = item.value;
                });
                let count = 0,
                    deltaSum = 0;
                const deltas = [];
                Object.keys(byYear).forEach((yStr) => {
                    const y = parseInt(yStr, 10);
                    const decVal = byYear[y].dec;
                    const nextJan = byYear[y + 1] && byYear[y + 1].jan;
                    if (decVal != null && nextJan != null) {
                        if (mode === "TH" && nextJan > decVal) {
                            count++;
                            const d = nextJan - decVal;
                            deltaSum += d;
                            deltas.push(d);
                        }
                        if (mode === "MX" && decVal > nextJan) {
                            count++;
                            const d = decVal - nextJan;
                            deltaSum += d;
                            deltas.push(d);
                        }
                    }
                });
                const avg = count > 0 ? deltaSum / count : null;
                return { count, avg };
            };

            const thPattern = computePattern(thailandData, "TH");
            const mxPattern = computePattern(mexicoData, "MX");

            const bullets = [];
            if (thPattern.count > 0) {
                bullets.push("In Thailand, January often comes in higher than December.");
                if (thPattern.avg) {
                    bullets.push(
                        `On average, that's roughly ${Math.round(
                            thPattern.avg
                        ).toLocaleString()} more registrations in January compared to December.`
                    );
                }
                bullets.push(
                    "Looks like people hold off on buying until after New Year, then things taper off during the year."
                );
            } else {
                bullets.push("Thailand doesn’t really show a January boost in this data.");
            }

            if (mxPattern.count > 0) {
                bullets.push("In Mexico, December numbers are usually higher than the following January.");
                bullets.push(
                    "Feels like there’s a year-end sales push or people rushing purchases before the new year, then a slower start after."
                );
            } else {
                bullets.push("Mexico doesn’t show a steady December peak in this dataset.");
            }

            const limited = bullets.slice(0, 5);
            box.innerHTML = `<ul class="seasonal-points">${limited.map((b) => `<li>${b}</li>`).join("")}</ul>`;
        },

        updateElement: function (id, value) {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        },

        formatDate: function (date) {
            return date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
            });
        },

        getFallbackColors: function () {
            return {
                mexico: {
                    primary: "#4a7c59",
                    background: "rgba(74, 124, 89, 0.1)",
                },
                thailand: {
                    primary: "#d4a942",
                    background: "rgba(212, 169, 66, 0.1)",
                },
            };
        },

        showError: function (message) {
            const container = document.getElementById("chartContainer");
            if (container) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 40px; color: #d32f2f;">
                        <h3>Error</h3>
                        <p>${message}</p>
                        <button onclick="location.reload()" style="padding: 10px 20px; margin-top: 10px;">
                            Reload Page
                        </button>
                    </div>
                `;
            }
        },
    };
})();

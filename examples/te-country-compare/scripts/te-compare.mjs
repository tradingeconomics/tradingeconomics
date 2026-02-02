#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs";
import path from "path";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";

const program = new Command();

program
  .requiredOption("--country1 <name>")
  .requiredOption("--country2 <name>")
  .requiredOption("--indicator <name>")
  .option("--start <yyyy-mm-dd>", "Start date", "2016-01-01")
  .option("--end <yyyy-mm-dd>", "End date", new Date().toISOString().slice(0, 10))
  .option("--baseUrl <url>", "Base URL (local dev server)", "http://localhost:3000")
  .option("--outDir <dir>", "Output directory", "out");

program.parse(process.argv);
const opts = program.opts();

function pearson(xs, ys) {
  const n = Math.min(xs.length, ys.length);
  if (n < 3) return null;
  let sumX = 0, sumY = 0, sumXX = 0, sumYY = 0, sumXY = 0;
  for (let i = 0; i < n; i++) {
    const x = xs[i], y = ys[i];
    sumX += x; sumY += y;
    sumXX += x * x; sumYY += y * y;
    sumXY += x * y;
  }
  const num = n * sumXY - sumX * sumY;
  const den = Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY));
  if (!den) return null;
  return num / den;
}

function latest(rows, key) {
  for (let i = rows.length - 1; i >= 0; i--) {
    const v = rows[i][key];
    if (typeof v === "number") return { date: rows[i].date, value: v };
  }
  return null;
}

function toCsv(rows) {
  const header = ["date", "country1", "country2"];
  const lines = [header.join(",")];
  for (const r of rows) lines.push([r.date, r.a ?? "", r.b ?? ""].join(","));
  return lines.join("\n");
}

async function main() {
  const url =
    `${opts.baseUrl}/api/compare2` +
    `?a=${encodeURIComponent(opts.country1)}` +
    `&b=${encodeURIComponent(opts.country2)}` +
    `&indicator=${encodeURIComponent(opts.indicator)}` +
    `&start=${encodeURIComponent(opts.start)}` +
    `&end=${encodeURIComponent(opts.end)}`;

  const res = await fetch(url);
  const json = await res.json();
  if (!res.ok) {
    console.error("API error:", json);
    process.exit(1);
  }

  const { meta, rows } = json;

  fs.mkdirSync(opts.outDir, { recursive: true });

  // CSV
  const csv = toCsv(rows);
  const safe = (s) => String(s).replace(/[^a-z0-9]+/gi, "_");
  const baseName = `${safe(opts.country1)}_vs_${safe(opts.country2)}_${safe(opts.indicator)}_${opts.start}_to_${opts.end}`;
  const csvPath = path.join(opts.outDir, `${baseName}.csv`);
  fs.writeFileSync(csvPath, csv, "utf8");

  // Stats
  const xs = [];
  const ys = [];
  for (const r of rows) {
    if (typeof r.a === "number" && typeof r.b === "number") {
      xs.push(r.a);
      ys.push(r.b);
    }
  }
  const corr = pearson(xs, ys);
  const aLatest = latest(rows, "a");
  const bLatest = latest(rows, "b");

  // PNG chart
  const width = 1000;
  const height = 500;
  const chart = new ChartJSNodeCanvas({ width, height });

  const labels = rows.map((r) => r.date);
  const aData = rows.map((r) => (typeof r.a === "number" ? r.a : null));
  const bData = rows.map((r) => (typeof r.b === "number" ? r.b : null));

  const config = {
    type: "line",
    data: {
      labels,
      datasets: [
        { label: opts.country1, data: aData, spanGaps: false, borderWidth: 2, pointRadius: 0 },
        { label: opts.country2, data: bData, spanGaps: false, borderWidth: 2, pointRadius: 0 },
      ],
    },
    options: {
      responsive: false,
      plugins: { legend: { position: "top" }, title: { display: true, text: `${opts.indicator}` } },
      scales: { x: { ticks: { maxTicksLimit: 12 } } },
    },
  };

  const image = await chart.renderToBuffer(config);
  const pngPath = path.join(opts.outDir, `${baseName}.png`);
  fs.writeFileSync(pngPath, image);

  // Markdown report
  const md = `# TradingEconomics Compare Report

**Indicator:** ${opts.indicator}  
**Country 1:** ${opts.country1}  
**Country 2:** ${opts.country2}  
**Range:** ${opts.start} → ${opts.end}

## Latest values
- ${opts.country1}: ${aLatest ? `${aLatest.value} (${aLatest.date})` : "n/a"}
- ${opts.country2}: ${bLatest ? `${bLatest.value} (${bLatest.date})` : "n/a"}

## Correlation
- Pearson correlation (overlapping points: ${xs.length}): ${corr === null ? "n/a" : corr.toFixed(3)}

## Metadata
- Frequency: ${meta?.aFrequency || meta?.bFrequency || "n/a"}
- Last update (Country 1): ${meta?.aLastUpdate || "n/a"}
- Last update (Country 2): ${meta?.bLastUpdate || "n/a"}

## Files
- CSV: \`${csvPath}\`
- Chart: \`${pngPath}\`
`;

  const mdPath = path.join(opts.outDir, `${baseName}.md`);
  fs.writeFileSync(mdPath, md, "utf8");

  console.log("Wrote:");
  console.log(" -", csvPath);
  console.log(" -", pngPath);
  console.log(" -", mdPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

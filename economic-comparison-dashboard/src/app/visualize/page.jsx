'use client';

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
} from 'chart.js';

import { fetchCountries } from '@/src/services/countryService';
import { fetchIndicators } from '@/src/services/indicatorService';
import { fetchHistoricalData } from '@/src/services/historicalService';
import InputSelect from '@/src/components/InputSelect';
import PopupModal from '@/src/components/PopupModal';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

export default function VisualizePage() {
  const [countries, setCountries] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [country, setCountry] = useState('');
  const [indicator, setIndicator] = useState('');

  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    (async () => {
      const c = await fetchCountries();
      const i = await fetchIndicators();
      setCountries(c);
      setIndicators(i);
    })();
  }, []);

  const fetchData = async () => {
    if (!country || !indicator) return;

    const { data: d, error } = await fetchHistoricalData(country, indicator);

    if (error) {
      setModalMessage(error);
      setModalVisible(true);
      return;
    }

    setOriginalData(d);
    setData(d);

    if (d.length > 0) {
      const dates = d.map((x) => new Date(x.DateTime));
      const minDate = new Date(Math.min(...dates));
      const maxDate = new Date(Math.max(...dates));
      setStartDate(minDate.toISOString().split('T')[0]);
      setEndDate(maxDate.toISOString().split('T')[0]);
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  };

  const getGradient = (ctx, color) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, `${color}66`);
    gradient.addColorStop(1, `${color}00`);
    return gradient;
  };

  const handleFilter = () => {
    if (!startDate || !endDate) return;

    const sDate = new Date(startDate);
    const eDate = new Date(endDate);

    const filtered = originalData.filter(
      (d) => new Date(d.DateTime) >= sDate && new Date(d.DateTime) <= eDate
    );

    setData(filtered);
  };

  const chartData = {
    labels: data?.map((d) => formatDate(d.DateTime)),
    datasets: [
      {
        label: `${indicator} (${country})`,
        data: data?.map((d) => d.Value),
        borderColor: '#3b82f6',
        backgroundColor: (ctx) => getGradient(ctx.chart.ctx, '#3b82f6'),
        fill: true,
        tension: 0.4,
        pointRadius: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
    interaction: { mode: 'nearest', axis: 'x', intersect: false },
    scales: {
      x: {
        title: { display: true, text: 'Date' },
        ticks: { maxRotation: 45, minRotation: 45 },
      },
      y: { title: { display: true, text: 'Value' } },
    },
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12">
      {/* 🔙 Back to Home */}
      <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </Link>

      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-4">
        📈 Visualize Economic Indicators
      </h1>
      <p className="text-center text-gray-500 mb-8 italic">
        Free accounts support: Mexico, New Zealand, Sweden, Thailand

        <br />
        <span className='mt-4'>Working Ex : Country : Sweden, Indicator: Bankruptcies </span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <InputSelect
          label="Select Country"
          icon="🌍"
          value={country}
          onChange={setCountry}
          options={countries}
        />
        <InputSelect
          label="Select Indicator"
          icon="📊"
          value={indicator}
          onChange={setIndicator}
          options={indicators}
        />
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={fetchData}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition shadow-md"
        >
          Visualize
        </button>
      </div>

      {data.length > 0 && (
        <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
          <div>
            <label className="text-sm font-medium mr-2">From:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium mr-2">To:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
          <button
            onClick={handleFilter}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Filter
          </button>
        </div>
      )}

      <div className="mt-12 bg-white p-6 rounded-2xl shadow-lg w-full overflow-x-auto">
        <div className="min-w-[1000px] relative" style={{ height: '500px' }}>
          {data.length > 0 ? (
            <div className="h-[400px]">
              <h2 className="text-xl font-semibold mb-4 text-center">{indicator}</h2>
              <Line data={chartData} options={chartOptions} />
            </div>
          ) : (
            <p className="text-center text-gray-400 text-lg">
              Please select a country and indicator, then click "Visualize".
            </p>
          )}
        </div>
      </div>

      <PopupModal show={modalVisible} onClose={() => setModalVisible(false)}>
        {modalMessage}
      </PopupModal>
    </div>
  );
}

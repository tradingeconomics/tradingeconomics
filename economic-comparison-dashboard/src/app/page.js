'use client';
import Link from 'next/link';
import { Globe, BarChart3, Table, Search } from 'lucide-react';

export default function HomePage() {
  return (
    <section className="relative isolate px-6 pt-20 lg:px-8 text-center">
      <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-r from-blue-100 to-green-100 opacity-40 blur-2xl"></div>

      <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl mb-6">
        Explore Global Economic Data
      </h1>

      <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
        Search, compare, and visualize global economic indicators by country using the powerful{' '}
        <span className="font-semibold text-blue-700">TradingEconomics API</span>.
      </p>

      <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
        <Link
          href="/compare"
          className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 hover:bg-blue-700 hover:text-white font-semibold px-8 py-4 rounded-2xl shadow-lg transition-all duration-300"
        >
          <Globe className="w-5 h-5" />
          Compare Countries
        </Link>

        <Link
          href="/search"
          className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 hover:bg-blue-700 hover:text-white font-semibold px-8 py-4 rounded-2xl shadow-lg transition-all duration-300"
        >
          <Search className="w-5 h-5" />
         Query Search
        </Link>
        <Link
          href="/visualize"
          className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 hover:bg-blue-700 hover:text-white font-semibold px-8 py-4 rounded-2xl shadow-lg transition-all duration-300"
        >
          <BarChart3 className="w-5 h-5" />
          Visualize Indicators
        </Link>

      </div>
    </section>
  );
}

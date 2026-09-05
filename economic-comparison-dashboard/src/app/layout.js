// app/layout.js
import Navbar from '../components/Navbar';
import './globals.css';


export const metadata = {
  title: 'Trading Economics App',
  description: 'Compare countries, indicators, and explore time series data.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}

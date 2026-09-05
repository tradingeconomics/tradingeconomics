// components/Navbar.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Compare Countries', href: '/compare' },
  { label: 'Search', href: '/search' },
  { label: 'Visualize Indicators', href: '/visualize' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <div className="text-xl font-bold text-blue-600">TradeXplorer</div>
        <ul className="flex space-x-6">
          {navItems.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm font-medium hover:text-blue-600 ${
                  pathname === href ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

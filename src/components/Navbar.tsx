'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/map', label: 'Map' },
  ];

  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 
        ${
          pathname === link.href
            ? 'bg-gray-100 text-gray-900 font-semibold shadow-sm'
            : 'text-gray-300 hover:text-white hover:bg-gray-800'
        }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

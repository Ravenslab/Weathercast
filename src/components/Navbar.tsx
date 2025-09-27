'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/home', label: 'Home' },
    { href: '/map', label: 'Map' },
  ];

  // Logout handler
  async function handleLogout() {
    try {
      await fetch('/api/logout', { method: 'POST' });
      window.location.href = '/auth'; // redirect to login page
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }


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

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

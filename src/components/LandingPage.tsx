"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-4 text-xl font-bold border-b border-gray-700">
          MyApp
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <Link href="/dashboard">
                <a className="block px-4 py-2 hover:bg-gray-700">Dashboard</a>
              </Link>
            </li>
            <li>
              <Link href="/profile">
                <a className="block px-4 py-2 hover:bg-gray-700">Profile</a>
              </Link>
            </li>
            <li>
              <Link href="/settings">
                <a className="block px-4 py-2 hover:bg-gray-700">Settings</a>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-[#121212] text-white">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Welcome to your dashboard!</p>
      </main>
    </div>
  );
}

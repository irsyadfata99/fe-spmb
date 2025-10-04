"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-600">
              Registrasi SPMB Online
            </h1>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/pendaftaran"
              className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
            >
              Daftar Sekarang
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
            >
              Login Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

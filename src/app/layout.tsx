// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Registrasi SPMB Online",
  description: "Sistem Penerimaan Siswa Baru Online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

// src/components/layout/Header.tsx
("use client");

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

// src/components/layout/Footer.tsx
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-sm text-gray-600">
          <p>© {currentYear} Registrasi SPMB Online. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}

// src/components/layout/AdminSidebar.tsx
("use client");

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_MENU } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <Link href="/admin/dashboard">
          <h2 className="text-xl font-bold text-primary-600">Admin Panel</h2>
        </Link>
      </div>

      <nav className="px-3">
        {ADMIN_MENU.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block px-4 py-3 rounded-lg text-sm font-medium transition-colors mb-1",
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              {item.label}
            </Link>
          );
        })}

        <button
          onClick={() => {
            // Handle logout
            window.location.href = "/login";
          }}
          className="w-full text-left block px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-6"
        >
          Keluar
        </button>
      </nav>
    </aside>
  );
}

// src/app/admin/layout.tsx
import AdminSidebar from "@/components/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

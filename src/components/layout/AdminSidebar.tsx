"use client";

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

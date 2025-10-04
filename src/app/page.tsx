// src/app/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  const router = useRouter();
  const [nomorRegistrasi, setNomorRegistrasi] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError("");

    if (!nomorRegistrasi.trim()) {
      setSearchError("Nomor registrasi harus diisi");
      return;
    }

    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      // Demo: show alert with mock data
      alert(
        `Status Pendaftaran\n\nNomor: ${nomorRegistrasi}\nStatus: Terverifikasi\nNama: Ahmad Rizki Maulana\n\nSilakan cek email untuk informasi lebih lanjut.`
      );
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sistem Penerimaan Siswa Baru Online
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Daftar secara online dengan mudah dan cepat. Cek status
              pendaftaran Anda di sini.
            </p>

            {/* Search Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Cek Status Pendaftaran
              </h2>
              <form onSubmit={handleSearch}>
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    value={nomorRegistrasi}
                    onChange={(e) => {
                      setNomorRegistrasi(e.target.value);
                      setSearchError("");
                    }}
                    placeholder="Masukkan nomor registrasi (contoh: SPMB-2025-001)"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {isSearching ? "Mencari..." : "Cek Status"}
                  </button>
                </div>
                {searchError && (
                  <p className="mt-2 text-sm text-red-600">{searchError}</p>
                )}
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">Belum mendaftar?</p>
                <button
                  onClick={() => router.push("/pendaftaran")}
                  className="w-full md:w-auto px-8 py-3 bg-secondary-600 text-white rounded-lg font-medium hover:bg-secondary-700 transition-colors"
                >
                  Daftar Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Keuntungan Pendaftaran Online
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Cepat & Mudah
                </h3>
                <p className="text-gray-600">
                  Daftar kapan saja dan dimana saja tanpa harus datang ke
                  sekolah
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-secondary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Aman & Terpercaya
                </h3>
                <p className="text-gray-600">
                  Data Anda terjamin keamanannya dengan sistem yang terpercaya
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-accent-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Notifikasi Real-time
                </h3>
                <p className="text-gray-600">
                  Dapatkan update status pendaftaran melalui email dan SMS
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Siap Bergabung dengan Kami?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Daftar sekarang dan jadilah bagian dari keluarga besar kami
            </p>
            <button
              onClick={() => router.push("/pendaftaran")}
              className="px-8 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors"
            >
              Mulai Pendaftaran
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

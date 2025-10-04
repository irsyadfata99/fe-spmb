// src/app/admin/pengaturan/page.tsx
"use client";

import { useState } from "react";
import {
  mockSchoolSettings,
  mockGelombang,
  mockRegistrationFormat,
  mockPaymentSchemes,
} from "@/data/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";
import { REGISTRATION_NUMBER_FORMATS } from "@/lib/constants";

type TabType =
  | "school"
  | "gelombang"
  | "format"
  | "payment"
  | "password"
  | "upload";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("school");

  // School Info State
  const [schoolInfo, setSchoolInfo] = useState(mockSchoolSettings);

  // Gelombang State
  const [gelombangList, setGelombangList] = useState(mockGelombang);
  const [isAddingGelombang, setIsAddingGelombang] = useState(false);
  const [newGelombang, setNewGelombang] = useState({
    nama: "",
    tanggalMulai: "",
    tanggalSelesai: "",
    kuota: 0,
    biayaPendaftaran: 0,
  });

  // Registration Format State
  const [regFormat, setRegFormat] = useState(mockRegistrationFormat);

  // Payment Schemes State
  const [paymentSchemes, setPaymentSchemes] = useState(mockPaymentSchemes);
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [newPayment, setNewPayment] = useState({
    nama: "",
    jumlah: 0,
    keterangan: "",
  });

  // Password State
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const tabs = [
    { id: "school" as TabType, label: "Info Sekolah" },
    { id: "gelombang" as TabType, label: "Gelombang Pendaftaran" },
    { id: "format" as TabType, label: "Format Nomor Registrasi" },
    { id: "payment" as TabType, label: "Skema Pembayaran" },
    { id: "password" as TabType, label: "Ganti Password" },
    { id: "upload" as TabType, label: "Upload Settings" },
  ];

  // Handlers
  const handleSaveSchoolInfo = () => {
    alert("Informasi sekolah berhasil disimpan!");
  };

  const handleAddGelombang = () => {
    if (
      !newGelombang.nama ||
      !newGelombang.tanggalMulai ||
      !newGelombang.tanggalSelesai
    ) {
      alert("Semua field harus diisi");
      return;
    }

    const gelombang = {
      id: `g-${Date.now()}`,
      ...newGelombang,
      isActive: false,
    };

    setGelombangList([...gelombangList, gelombang]);
    setNewGelombang({
      nama: "",
      tanggalMulai: "",
      tanggalSelesai: "",
      kuota: 0,
      biayaPendaftaran: 0,
    });
    setIsAddingGelombang(false);
  };

  const handleToggleGelombang = (id: string) => {
    setGelombangList(
      gelombangList.map((g) => ({
        ...g,
        isActive: g.id === id,
      }))
    );
  };

  const handleDeleteGelombang = (id: string) => {
    if (confirm("Hapus gelombang ini?")) {
      setGelombangList(gelombangList.filter((g) => g.id !== id));
    }
  };

  const handleSaveRegFormat = () => {
    alert("Format nomor registrasi berhasil disimpan!");
  };

  const handleAddPaymentScheme = () => {
    if (!newPayment.nama || newPayment.jumlah <= 0) {
      alert("Nama dan jumlah harus diisi");
      return;
    }

    const payment = {
      id: `p-${Date.now()}`,
      ...newPayment,
      isActive: false,
    };

    setPaymentSchemes([...paymentSchemes, payment]);
    setNewPayment({
      nama: "",
      jumlah: 0,
      keterangan: "",
    });
    setIsAddingPayment(false);
  };

  const handleDeletePayment = (id: string) => {
    if (confirm("Hapus skema pembayaran ini?")) {
      setPaymentSchemes(paymentSchemes.filter((p) => p.id !== id));
    }
  };

  const handleChangePassword = () => {
    if (
      !passwordData.oldPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      alert("Semua field harus diisi");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Password baru dan konfirmasi tidak cocok");
      return;
    }

    alert("Password berhasil diubah!");
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleUploadLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`Logo ${file.name} berhasil diupload!`);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pengaturan</h1>
        <p className="text-gray-600">Kelola konfigurasi sistem SPMB Online</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* School Info Tab */}
          {activeTab === "school" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Sekolah
                  </label>
                  <input
                    type="text"
                    value={schoolInfo.namaSekolah}
                    onChange={(e) =>
                      setSchoolInfo({
                        ...schoolInfo,
                        namaSekolah: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telepon
                  </label>
                  <input
                    type="text"
                    value={schoolInfo.telepon}
                    onChange={(e) =>
                      setSchoolInfo({ ...schoolInfo, telepon: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat
                </label>
                <textarea
                  value={schoolInfo.alamat}
                  onChange={(e) =>
                    setSchoolInfo({ ...schoolInfo, alamat: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={schoolInfo.email}
                    onChange={(e) =>
                      setSchoolInfo({ ...schoolInfo, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={schoolInfo.website || ""}
                    onChange={(e) =>
                      setSchoolInfo({ ...schoolInfo, website: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSaveSchoolInfo}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          )}

          {/* Gelombang Tab */}
          {activeTab === "gelombang" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  Daftar Gelombang Pendaftaran
                </h3>
                <button
                  onClick={() => setIsAddingGelombang(!isAddingGelombang)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  {isAddingGelombang ? "Batal" : "Tambah Gelombang"}
                </button>
              </div>

              {isAddingGelombang && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Gelombang
                      </label>
                      <input
                        type="text"
                        value={newGelombang.nama}
                        onChange={(e) =>
                          setNewGelombang({
                            ...newGelombang,
                            nama: e.target.value,
                          })
                        }
                        placeholder="Contoh: Gelombang 1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kuota
                      </label>
                      <input
                        type="number"
                        value={newGelombang.kuota}
                        onChange={(e) =>
                          setNewGelombang({
                            ...newGelombang,
                            kuota: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tanggal Mulai
                      </label>
                      <input
                        type="date"
                        value={newGelombang.tanggalMulai}
                        onChange={(e) =>
                          setNewGelombang({
                            ...newGelombang,
                            tanggalMulai: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tanggal Selesai
                      </label>
                      <input
                        type="date"
                        value={newGelombang.tanggalSelesai}
                        onChange={(e) =>
                          setNewGelombang({
                            ...newGelombang,
                            tanggalSelesai: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Biaya Pendaftaran
                    </label>
                    <input
                      type="number"
                      value={newGelombang.biayaPendaftaran}
                      onChange={(e) =>
                        setNewGelombang({
                          ...newGelombang,
                          biayaPendaftaran: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <button
                    onClick={handleAddGelombang}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    Tambah Gelombang
                  </button>
                </div>
              )}

              <div className="space-y-4">
                {gelombangList.map((gelombang) => (
                  <div
                    key={gelombang.id}
                    className={`border rounded-lg p-4 ${
                      gelombang.isActive
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold text-gray-900">
                            {gelombang.nama}
                          </h4>
                          {gelombang.isActive && (
                            <span className="px-2 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
                              Aktif
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Periode</p>
                            <p className="font-medium text-gray-900">
                              {formatDate(gelombang.tanggalMulai)} -{" "}
                              {formatDate(gelombang.tanggalSelesai)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Kuota</p>
                            <p className="font-medium text-gray-900">
                              {gelombang.kuota} siswa
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Biaya</p>
                            <p className="font-medium text-gray-900">
                              {formatCurrency(gelombang.biayaPendaftaran)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {!gelombang.isActive && (
                          <button
                            onClick={() => handleToggleGelombang(gelombang.id)}
                            className="px-3 py-1 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          >
                            Aktifkan
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteGelombang(gelombang.id)}
                          className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Registration Format Tab */}
          {activeTab === "format" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prefix
                  </label>
                  <select
                    value={regFormat.prefix}
                    onChange={(e) =>
                      setRegFormat({ ...regFormat, prefix: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {REGISTRATION_NUMBER_FORMATS.prefixes.map((prefix) => (
                      <option key={prefix} value={prefix}>
                        {prefix}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Format Tahun
                  </label>
                  <select
                    value={regFormat.yearFormat}
                    onChange={(e) =>
                      setRegFormat({
                        ...regFormat,
                        yearFormat: e.target.value as "YY" | "YYYY",
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="YY">YY (25)</option>
                    <option value="YYYY">YYYY (2025)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Separator
                  </label>
                  <select
                    value={regFormat.separator}
                    onChange={(e) =>
                      setRegFormat({ ...regFormat, separator: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {REGISTRATION_NUMBER_FORMATS.separators.map((sep) => (
                      <option key={sep} value={sep}>
                        {sep || "(Tanpa separator)"}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Panjang Digit
                  </label>
                  <select
                    value={regFormat.digitLength}
                    onChange={(e) =>
                      setRegFormat({
                        ...regFormat,
                        digitLength: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {REGISTRATION_NUMBER_FORMATS.digitLengths.map((length) => (
                      <option key={length} value={length}>
                        {length} digit
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-900 mb-1">
                  Contoh Format:
                </p>
                <p className="text-lg font-mono font-bold text-blue-700">
                  {regFormat.prefix}
                  {regFormat.separator}
                  {regFormat.yearFormat === "YY" ? "25" : "2025"}
                  {regFormat.separator}
                  {"0".repeat(regFormat.digitLength)}1
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSaveRegFormat}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Simpan Format
                </button>
              </div>
            </div>
          )}

          {/* Payment Schemes Tab */}
          {activeTab === "payment" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  Skema Pembayaran
                </h3>
                <button
                  onClick={() => setIsAddingPayment(!isAddingPayment)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  {isAddingPayment ? "Batal" : "Tambah Skema"}
                </button>
              </div>

              {isAddingPayment && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Skema
                      </label>
                      <input
                        type="text"
                        value={newPayment.nama}
                        onChange={(e) =>
                          setNewPayment({ ...newPayment, nama: e.target.value })
                        }
                        placeholder="Contoh: Biaya Pendaftaran Reguler"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Jumlah (Rp)
                      </label>
                      <input
                        type="number"
                        value={newPayment.jumlah}
                        onChange={(e) =>
                          setNewPayment({
                            ...newPayment,
                            jumlah: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Keterangan
                      </label>
                      <textarea
                        value={newPayment.keterangan}
                        onChange={(e) =>
                          setNewPayment({
                            ...newPayment,
                            keterangan: e.target.value,
                          })
                        }
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <button
                      onClick={handleAddPaymentScheme}
                      className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                    >
                      Tambah Skema
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {paymentSchemes.map((scheme) => (
                  <div
                    key={scheme.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-1">
                          {scheme.nama}
                        </h4>
                        <p className="text-2xl font-bold text-primary-600 mb-2">
                          {formatCurrency(scheme.jumlah)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {scheme.keterangan}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeletePayment(scheme.id)}
                        className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Change Password Tab */}
          {activeTab === "password" && (
            <div className="max-w-md space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password Lama
                </label>
                <input
                  type="password"
                  value={passwordData.oldPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      oldPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password Baru
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konfirmasi Password Baru
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="pt-4">
                <button
                  onClick={handleChangePassword}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Ubah Password
                </button>
              </div>
            </div>
          )}

          {/* Upload Settings Tab */}
          {activeTab === "upload" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Upload Logo Sekolah
                </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadLogo}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="cursor-pointer inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    Pilih File
                  </label>
                  <p className="mt-2 text-sm text-gray-600">
                    Format: PNG, JPG (Maks. 2MB)
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Konfigurasi Upload
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ukuran Maksimal File (MB)
                    </label>
                    <input
                      type="number"
                      defaultValue={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Format File yang Diizinkan
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">JPG/JPEG</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">PNG</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">PDF</span>
                      </label>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={() =>
                        alert("Konfigurasi upload berhasil disimpan!")
                      }
                      className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                    >
                      Simpan Konfigurasi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

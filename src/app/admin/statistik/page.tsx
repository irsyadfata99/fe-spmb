// src/app/admin/statistik/page.tsx
"use client";

import { useState, useMemo } from "react";
import { mockRegistrations } from "@/data/mockData";
import { formatDate, formatPhoneNumber, exportToExcel } from "@/lib/utils";
import { STATUS_LABELS, STATUS_COLORS } from "@/lib/constants";
import { Registration } from "@/types";

export default function StatisticsPage() {
  const [registrations, setRegistrations] =
    useState<Registration[]>(mockRegistrations);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRegistration, setEditingRegistration] =
    useState<Registration | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and search
  const filteredData = useMemo(() => {
    return registrations.filter((reg) => {
      const matchesSearch =
        reg.nomorRegistrasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || reg.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [registrations, searchTerm, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedData.map((r) => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    }
  };

  const handleEdit = (registration: Registration) => {
    setEditingRegistration(registration);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus data pendaftar ini?")) {
      setRegistrations(registrations.filter((r) => r.id !== id));
      setSelectedIds(selectedIds.filter((i) => i !== id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) {
      alert("Pilih data yang akan dihapus");
      return;
    }

    if (confirm(`Hapus ${selectedIds.length} data pendaftar?`)) {
      setRegistrations(
        registrations.filter((r) => !selectedIds.includes(r.id))
      );
      setSelectedIds([]);
    }
  };

  const handleUpdateStatus = (
    id: string,
    newStatus: "pending" | "verified" | "rejected"
  ) => {
    setRegistrations(
      registrations.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const handleExportExcel = () => {
    const dataToExport = (
      selectedIds.length > 0
        ? registrations.filter((r) => selectedIds.includes(r.id))
        : filteredData
    ).map((reg) => ({
      "Nomor Registrasi": reg.nomorRegistrasi,
      "Nama Lengkap": reg.namaLengkap,
      Email: reg.email,
      "Nomor Telepon": reg.nomorTelepon,
      Gelombang: reg.gelombang,
      Status: STATUS_LABELS[reg.status],
      "Tanggal Daftar": formatDate(reg.tanggalDaftar),
    }));

    exportToExcel(
      dataToExport,
      `pendaftar-${new Date().toISOString().split("T")[0]}.csv`
    );
  };

  const handleDownloadZIP = () => {
    if (selectedIds.length === 0) {
      alert("Pilih data yang akan diunduh");
      return;
    }

    alert(`Download ZIP untuk ${selectedIds.length} pendaftar akan dimulai...`);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Statistik Pendaftar
        </h1>
        <p className="text-gray-600">
          Kelola data pendaftar dengan fitur pencarian, filter, dan export
        </p>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Cari nomor registrasi, nama, atau email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Status Filter */}
          <div className="w-full lg:w-48">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Menunggu</option>
              <option value="verified">Terverifikasi</option>
              <option value="rejected">Ditolak</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleExportExcel}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors text-sm"
          >
            Export ke Excel
          </button>
          <button
            onClick={handleDownloadZIP}
            disabled={selectedIds.length === 0}
            className="px-4 py-2 bg-secondary-600 text-white rounded-lg font-medium hover:bg-secondary-700 transition-colors text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Download ZIP ({selectedIds.length})
          </button>
          <button
            onClick={handleBulkDelete}
            disabled={selectedIds.length === 0}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Hapus Terpilih ({selectedIds.length})
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length === paginatedData.length &&
                      paginatedData.length > 0
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nomor Registrasi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Lengkap
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Telepon
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((registration) => (
                <tr key={registration.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(registration.id)}
                      onChange={(e) =>
                        handleSelectOne(registration.id, e.target.checked)
                      }
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {registration.nomorRegistrasi}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {registration.namaLengkap}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {registration.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatPhoneNumber(registration.nomorTelepon)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(registration.tanggalDaftar)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={registration.status}
                      onChange={(e) =>
                        handleUpdateStatus(
                          registration.id,
                          e.target.value as any
                        )
                      }
                      className={`px-2 py-1 text-xs font-medium rounded-full border-0 ${
                        STATUS_COLORS[registration.status]
                      }`}
                    >
                      <option value="pending">Menunggu</option>
                      <option value="verified">Terverifikasi</option>
                      <option value="rejected">Ditolak</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(registration)}
                        className="text-secondary-600 hover:text-secondary-700 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(registration.id)}
                        className="text-red-600 hover:text-red-700 font-medium"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">
                Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
                {Math.min(currentPage * itemsPerPage, filteredData.length)} dari{" "}
                {filteredData.length} data
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  Sebelumnya
                </button>
                <span className="px-4 py-2 text-sm font-medium text-gray-700">
                  Halaman {currentPage} dari {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// src/app/pendaftaran/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { mockFormTemplate, mockGelombang } from "@/data/mockData";
import { formatCurrency, generateRegistrationNumber } from "@/lib/utils";
import { FormField } from "@/types";

export default function RegistrationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const activeGelombang = mockGelombang.find((g) => g.isActive);

  const handleChange = (fieldId: string, value: any) => {
    setFormData({
      ...formData,
      [fieldId]: value,
    });
    // Clear error when user types
    if (errors[fieldId]) {
      setErrors({
        ...errors,
        [fieldId]: "",
      });
    }
  };

  const handleFileChange = (fieldId: string, file: File | null) => {
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          ...errors,
          [fieldId]: "Ukuran file maksimal 5MB",
        });
        return;
      }

      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
      ];
      if (!allowedTypes.includes(file.type)) {
        setErrors({
          ...errors,
          [fieldId]: "Format file harus JPG, PNG, atau PDF",
        });
        return;
      }

      setFormData({
        ...formData,
        [fieldId]: file,
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    mockFormTemplate.fields.forEach((field) => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = `${field.label} harus diisi`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const nomorRegistrasi = generateRegistrationNumber(
        "SPMB",
        "YYYY",
        "-",
        3,
        6
      );

      alert(
        `Pendaftaran berhasil!\n\nNomor Registrasi Anda:\n${nomorRegistrasi}\n\nSimpan nomor ini untuk cek status pendaftaran.`
      );

      router.push("/");
    }, 2000);
  };

  const renderField = (field: FormField) => {
    const error = errors[field.id];
    const baseInputClass = `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
      error ? "border-red-500" : "border-gray-300"
    }`;

    switch (field.type) {
      case "text":
      case "email":
        return (
          <input
            type={field.type}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={baseInputClass}
          />
        );

      case "phone":
      case "number":
        return (
          <input
            type="tel"
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={baseInputClass}
          />
        );

      case "date":
        return (
          <input
            type="date"
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className={baseInputClass}
          />
        );

      case "textarea":
        return (
          <textarea
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className={baseInputClass}
          />
        );

      case "select":
        return (
          <select
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className={baseInputClass}
          >
            <option value="">Pilih {field.label}</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={(formData[field.id] || []).includes(option)}
                  onChange={(e) => {
                    const currentValues = formData[field.id] || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter((v: string) => v !== option);
                    handleChange(field.id, newValues);
                  }}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case "file":
        return (
          <div>
            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg,application/pdf"
              onChange={(e) =>
                handleFileChange(field.id, e.target.files?.[0] || null)
              }
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            />
            <p className="mt-1 text-xs text-gray-500">
              Format: JPG, PNG, PDF (Maks. 5MB)
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {mockFormTemplate.name}
              </h1>

              {activeGelombang && (
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-primary-900">
                      {activeGelombang.nama}
                    </p>
                    <p className="text-sm text-primary-700">
                      Kuota: {activeGelombang.kuota} siswa
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-primary-700">
                      Biaya Pendaftaran
                    </p>
                    <p className="text-lg font-bold text-primary-900">
                      {formatCurrency(activeGelombang.biayaPendaftaran)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {mockFormTemplate.fields
                    .sort((a, b) => a.order - b.order)
                    .map((field) => (
                      <div key={field.id}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {field.label}
                          {field.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </label>
                        {renderField(field)}
                        {errors[field.id] && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors[field.id]}
                          </p>
                        )}
                      </div>
                    ))}
                </div>

                <div className="mt-8 flex flex-col md:flex-row gap-4">
                  <button
                    type="button"
                    onClick={() => router.push("/")}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Mengirim..." : "Kirim Pendaftaran"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// src/lib/constants.ts
import { FieldType } from "@/types";

export const COLORS = {
  primary: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },
  secondary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  accent: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
  },
};

export const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: "text", label: "Teks" },
  { value: "textarea", label: "Area Teks" },
  { value: "number", label: "Angka" },
  { value: "phone", label: "Nomor Telepon" },
  { value: "date", label: "Tanggal" },
  { value: "select", label: "Pilihan Dropdown" },
  { value: "checkbox", label: "Kotak Centang" },
  { value: "file", label: "Upload File" },
];

export const STATUS_LABELS = {
  pending: "Menunggu",
  verified: "Terverifikasi",
  rejected: "Ditolak",
};

export const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  verified: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export const REGISTRATION_NUMBER_FORMATS = {
  prefixes: ["REG", "SPMB", "PSB", "DAFTAR"],
  yearFormats: ["YY", "YYYY"] as const,
  separators: ["-", "/", ".", ""],
  digitLengths: [3, 4, 5, 6],
};

export const ADMIN_MENU = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Pembuat Form", href: "/admin/form-builder" },
  { label: "Statistik Pendaftar", href: "/admin/statistik" },
  { label: "Pengaturan", href: "/admin/pengaturan" },
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "application/pdf",
];
export const ITEMS_PER_PAGE = 10;

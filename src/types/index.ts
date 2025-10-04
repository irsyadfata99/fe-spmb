// src/types/index.ts

export type FieldType = 
  | 'text' 
  | 'textarea' 
  | 'file' 
  | 'select' 
  | 'checkbox' 
  | 'date' 
  | 'number' 
  | 'phone';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // untuk select & checkbox
  order: number;
}

export interface FormTemplate {
  id: string;
  name: string;
  fields: FormField[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Registration {
  id: string;
  nomorRegistrasi: string;
  namaLengkap: string;
  email: string;
  nomorTelepon: string;
  gelombang: string;
  status: 'pending' | 'verified' | 'rejected';
  tanggalDaftar: string;
  formData: Record<string, any>;
  buktiPembayaran?: string;
}

export interface Gelombang {
  id: string;
  nama: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  kuota: number;
  biayaPendaftaran: number;
  isActive: boolean;
}

export interface SchoolSettings {
  namaSekolah: string;
  alamat: string;
  telepon: string;
  email: string;
  website?: string;
  logo?: string;
}

export interface RegistrationNumberFormat {
  prefix: string;
  yearFormat: 'YY' | 'YYYY';
  separator: string;
  digitLength: number;
  example: string;
}

export interface PaymentScheme {
  id: string;
  nama: string;
  jumlah: number;
  keterangan: string;
  isActive: boolean;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'superadmin';
  namaLengkap: string;
}

export interface DashboardStats {
  totalPendaftar: number;
  gelombangAktif: string;
  pendaftarHariIni: number;
  pendaftarBulanIni: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
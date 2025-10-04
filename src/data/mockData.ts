// src/data/mockData.ts

import { 
  Registration, 
  FormTemplate, 
  Gelombang, 
  SchoolSettings,
  PaymentScheme,
  DashboardStats,
  RegistrationNumberFormat 
} from '@/types';

export const mockRegistrations: Registration[] = [
  {
    id: '1',
    nomorRegistrasi: 'SPMB-2025-001',
    namaLengkap: 'Ahmad Rizki Maulana',
    email: 'ahmad.rizki@email.com',
    nomorTelepon: '081234567890',
    gelombang: 'Gelombang 1',
    status: 'verified',
    tanggalDaftar: '2025-01-15T08:30:00',
    formData: {
      tanggalLahir: '2008-05-12',
      jenisKelamin: 'Laki-laki',
      alamat: 'Jl. Merdeka No. 123, Bandung',
      asalSekolah: 'SMP Negeri 1 Bandung',
    },
  },
  {
    id: '2',
    nomorRegistrasi: 'SPMB-2025-002',
    namaLengkap: 'Siti Nurhaliza',
    email: 'siti.nurhaliza@email.com',
    nomorTelepon: '082345678901',
    gelombang: 'Gelombang 1',
    status: 'pending',
    tanggalDaftar: '2025-01-16T09:15:00',
    formData: {
      tanggalLahir: '2008-08-20',
      jenisKelamin: 'Perempuan',
      alamat: 'Jl. Sudirman No. 45, Bandung',
      asalSekolah: 'SMP Negeri 3 Bandung',
    },
  },
  {
    id: '3',
    nomorRegistrasi: 'SPMB-2025-003',
    namaLengkap: 'Budi Santoso',
    email: 'budi.santoso@email.com',
    nomorTelepon: '083456789012',
    gelombang: 'Gelombang 1',
    status: 'verified',
    tanggalDaftar: '2025-01-17T10:20:00',
    formData: {
      tanggalLahir: '2008-03-15',
      jenisKelamin: 'Laki-laki',
      alamat: 'Jl. Asia Afrika No. 67, Bandung',
      asalSekolah: 'SMP Negeri 5 Bandung',
    },
  },
  {
    id: '4',
    nomorRegistrasi: 'SPMB-2025-004',
    namaLengkap: 'Dewi Lestari',
    email: 'dewi.lestari@email.com',
    nomorTelepon: '084567890123',
    gelombang: 'Gelombang 1',
    status: 'pending',
    tanggalDaftar: '2025-01-18T11:30:00',
    formData: {
      tanggalLahir: '2008-11-08',
      jenisKelamin: 'Perempuan',
      alamat: 'Jl. Braga No. 89, Bandung',
      asalSekolah: 'SMP Negeri 2 Bandung',
    },
  },
  {
    id: '5',
    nomorRegistrasi: 'SPMB-2025-005',
    namaLengkap: 'Eko Prasetyo',
    email: 'eko.prasetyo@email.com',
    nomorTelepon: '085678901234',
    gelombang: 'Gelombang 1',
    status: 'rejected',
    tanggalDaftar: '2025-01-19T13:45:00',
    formData: {
      tanggalLahir: '2008-07-22',
      jenisKelamin: 'Laki-laki',
      alamat: 'Jl. Dago No. 12, Bandung',
      asalSekolah: 'SMP Negeri 4 Bandung',
    },
  },
];

export const mockFormTemplate: FormTemplate = {
  id: '1',
  name: 'Form Pendaftaran SPMB 2025',
  isActive: true,
  createdAt: '2025-01-01T00:00:00',
  updatedAt: '2025-01-01T00:00:00',
  fields: [
    {
      id: 'f1',
      type: 'text',
      label: 'Nama Lengkap',
      placeholder: 'Masukkan nama lengkap sesuai akta kelahiran',
      required: true,
      order: 1,
    },
    {
      id: 'f2',
      type: 'phone',
      label: 'Nomor Telepon',
      placeholder: '08xxxxxxxxxx',
      required: true,
      order: 2,
    },
    {
      id: 'f3',
      type: 'text',
      label: 'Email',
      placeholder: 'email@example.com',
      required: true,
      order: 3,
    },
    {
      id: 'f4',
      type: 'date',
      label: 'Tanggal Lahir',
      required: true,
      order: 4,
    },
    {
      id: 'f5',
      type: 'select',
      label: 'Jenis Kelamin',
      required: true,
      options: ['Laki-laki', 'Perempuan'],
      order: 5,
    },
    {
      id: 'f6',
      type: 'textarea',
      label: 'Alamat Lengkap',
      placeholder: 'Masukkan alamat lengkap sesuai KTP',
      required: true,
      order: 6,
    },
    {
      id: 'f7',
      type: 'text',
      label: 'Asal Sekolah',
      placeholder: 'Nama sekolah SMP/MTs',
      required: true,
      order: 7,
    },
    {
      id: 'f8',
      type: 'file',
      label: 'Upload Foto',
      required: true,
      order: 8,
    },
  ],
};

export const mockGelombang: Gelombang[] = [
  {
    id: '1',
    nama: 'Gelombang 1',
    tanggalMulai: '2025-01-01',
    tanggalSelesai: '2025-03-31',
    kuota: 100,
    biayaPendaftaran: 250000,
    isActive: true,
  },
  {
    id: '2',
    nama: 'Gelombang 2',
    tanggalMulai: '2025-04-01',
    tanggalSelesai: '2025-06-30',
    kuota: 100,
    biayaPendaftaran: 300000,
    isActive: false,
  },
];

export const mockSchoolSettings: SchoolSettings = {
  namaSekolah: 'SMA Negeri 1 Bandung',
  alamat: 'Jl. Ir. H. Juanda No. 93, Bandung 40132',
  telepon: '(022) 4214243',
  email: 'info@sman1bandung.sch.id',
  website: 'https://www.sman1bandung.sch.id',
};

export const mockRegistrationFormat: RegistrationNumberFormat = {
  prefix: 'SPMB',
  yearFormat: 'YYYY',
  separator: '-',
  digitLength: 3,
  example: 'SPMB-2025-001',
};

export const mockPaymentSchemes: PaymentScheme[] = [
  {
    id: '1',
    nama: 'Biaya Pendaftaran Gelombang 1',
    jumlah: 250000,
    keterangan: 'Biaya pendaftaran untuk gelombang 1',
    isActive: true,
  },
  {
    id: '2',
    nama: 'Biaya Pendaftaran Gelombang 2',
    jumlah: 300000,
    keterangan: 'Biaya pendaftaran untuk gelombang 2',
    isActive: false,
  },
];

export const mockDashboardStats: DashboardStats = {
  totalPendaftar: 145,
  gelombangAktif: 'Gelombang 1',
  pendaftarHariIni: 12,
  pendaftarBulanIni: 78,
};
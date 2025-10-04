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

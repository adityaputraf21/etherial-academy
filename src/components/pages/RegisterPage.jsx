import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ArrowLeft } from 'lucide-react';

// Data ini disimulasikan dari tabel `paket` di SQL Anda.
// Dalam aplikasi nyata, data ini akan diambil dari database.
const packageOptions = [
  { id_paket: 1, nama_paket: 'Archmage Package', harga: '2000000.00' },
  { id_paket: 2, nama_paket: 'Digital Wizard Package', harga: '1500000.00' },
  { id_paket: 3, nama_paket: 'All Access Package', harga: '3500000.00' },
];

// Data ini disimulasikan dari tabel `house` di SQL Anda.
const houseOptions = [
    { id_house: 1, nama_house: 'Ignis' },
    { id_house: 2, nama_house: 'Aeris' },
    { id_house: 3, nama_house: 'Terra' },
    { id_house: 4, nama_house: 'Lumen' },
];

export default function RegisterPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    nama_depan: '',
    nama_belakang: '',
    email: '',
    username: '',
    password: '',
    tanggal_lahir: null,
    nomor_wa_orang_tua: '',
    id_paket: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, tanggal_lahir: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // --- Menangani Data Tersembunyi ---
    
    // 1. Tanggal Pendaftaran (otomatis diisi dengan tanggal hari ini)
    const tanggal_pendaftaran = new Date().toISOString().split('T')[0];

    // 2. House (dipilih secara acak)
    const randomHouse = houseOptions[Math.floor(Math.random() * houseOptions.length)];
    const id_house = randomHouse.id_house;

    // 3. Foto Profil (dibiarkan kosong untuk diisi nanti)
    const foto_profil = null; 
    
    // Gabungkan data dari form dengan data tersembunyi
    const completeUserData = { 
        ...formData,
        tanggal_lahir: formData.tanggal_lahir ? formData.tanggal_lahir.toISOString().split('T')[0] : null,
        tanggal_pendaftaran,
        id_house,
        foto_profil,
    };

    console.log("Data Pendaftaran Baru untuk Dikirim ke Database:", completeUserData);

    // Simulasi proses pendaftaran
    setTimeout(() => {
      setIsLoading(false);
      alert(`Pendaftaran untuk ${completeUserData.username} berhasil diterima! Anda akan diarahkan ke halaman login.`);
      onNavigate('login');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-white flex items-center justify-center p-4">
       {/* CSS Custom untuk DatePicker, bisa dipindahkan ke file CSS utama */}
       <style>{`
            .react-datepicker-wrapper { width: 100%; }
            .react-datepicker { font-family: 'Inter', sans-serif; background-color: #0f172a; border: 1px solid #334155; }
            .react-datepicker__header { background-color: #1e293b; border-bottom: 1px solid #475569; }
            .react-datepicker__current-month, .react-datepicker-time__header, .react-datepicker__day-name { color: #f1f5f9; }
            .react-datepicker__day, .react-datepicker__time-name { color: #cbd5e1; }
            .react-datepicker__day:hover { background-color: #334155; }
            .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected { background-color: #facc15; color: #0f172a; font-weight: bold; }
            .react-datepicker__day--disabled { color: #475569; }
            .react-datepicker__triangle::before, .react-datepicker__triangle::after { display: none; }
            .react-datepicker__year-read-view--down-arrow, .react-datepicker__month-read-view--down-arrow { border-top-color: #94a3b8; }
            .react-datepicker__year-dropdown, .react-datepicker__month-dropdown { background-color: #1e293b; border: 1px solid #475569; }
            .react-datepicker__year-option:hover, .react-datepicker__month-option:hover { background-color: #334155; }
            select:required:invalid { color: #9ca3af; }
            option[value=""][disabled] { display: none; }
            option { color: #1f2937; }
        `}</style>
      
      <div className="w-full max-w-2xl bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl z-10">
        <div className="flex items-center mb-6 relative">
          <button onClick={() => onNavigate('landing')} className="absolute left-0 p-2 rounded-full hover:bg-slate-700 transition-colors">
            <ArrowLeft className="text-slate-300" />
          </button>
          <div className="text-center flex-grow">
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-wider">Formulir Pendaftaran</h1>
            <p className="text-slate-400 mt-1">Lengkapi data diri untuk memulai.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {/* Kolom Kiri */}
          <div className="space-y-5 flex flex-col">
            <input type="text" name="nama_depan" placeholder="Nama Depan" onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
            <input type="text" name="email" placeholder="Alamat Email" onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
             <input type="password" name="password" placeholder="Kata Sandi" onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
             <DatePicker
                selected={formData.tanggal_lahir}
                onChange={handleDateChange}
                placeholderText="Tanggal Lahir"
                dateFormat="dd / MM / yyyy"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                required
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
          </div>

          {/* Kolom Kanan */}
          <div className="space-y-5 flex flex-col">
            <input type="text" name="nama_belakang" placeholder="Nama Belakang" onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
            <input type="tel" name="nomor_wa_orang_tua" placeholder="No. Telepon Orang Tua" onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
            <select name="id_paket" value={formData.id_paket} onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400">
                <option value="" disabled>Pilih Paket Belajar</option>
                {packageOptions.map(pkg => (
                    <option key={pkg.id_paket} value={pkg.id_paket} className="bg-slate-800 text-white">
                        {pkg.nama_paket}
                    </option>
                ))}
            </select>
          </div>

          {/* Tombol Submit (rentang penuh di bawah) */}
          <div className="md:col-span-2 mt-4">
            <button type="submit" disabled={isLoading} className="w-full bg-yellow-400 text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-all duration-300 flex items-center justify-center disabled:bg-slate-500">
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Daftarkan Akun'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
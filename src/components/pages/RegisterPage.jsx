import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../../supabaseClient'; // Pastikan path ini benar

export default function RegisterPage({ onNavigate }) {
  // State untuk menyimpan data form
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

  // State untuk data dinamis dari Supabase
  const [packageOptions, setPackageOptions] = useState([]);
  const [houseOptions, setHouseOptions] = useState([]);
  
  // State untuk loading dan error
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ambil data paket dan house dari Supabase saat komponen dimuat
  useEffect(() => {
    const fetchData = async () => {
      // Ambil paket
      const { data: packages, error: packageError } = await supabase.from('paket').select('id_paket, nama_paket');
      if (packageError) console.error("Error fetching packages:", packageError);
      else setPackageOptions(packages);

      // Ambil house
      const { data: houses, error: houseError } = await supabase.from('house').select('id_house, nama_house');
      if (houseError) console.error("Error fetching houses:", houseError);
      else setHouseOptions(houses);
    };
    fetchData();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, tanggal_lahir: date }));
  };

  // Fungsi untuk menangani pendaftaran
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Daftarkan pengguna baru di sistem otentikasi Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Pengguna tidak berhasil dibuat.");

      // 2. Siapkan data untuk dimasukkan ke tabel 'profiles'
      const randomHouse = houseOptions[Math.floor(Math.random() * houseOptions.length)];
      
      const profileData = {
        id: authData.user.id, // Gunakan ID dari hasil auth
        role: 'student', // Otomatis sebagai siswa saat mendaftar
        nama_depan: formData.nama_depan,
        nama_belakang: formData.nama_belakang,
        email: formData.email,
        username: formData.username,
        tanggal_lahir: formData.tanggal_lahir,
        nomor_wa_orang_tua: formData.nomor_wa_orang_tua,
        tanggal_pendaftaran: new Date().toISOString(),
        id_house: randomHouse.id_house,
        id_paket: parseInt(formData.id_paket),
      };

      // 3. Masukkan data profil ke tabel 'profiles'
      const { error: insertError } = await supabase.from('profiles').insert(profileData);

      if (insertError) throw insertError;

      alert('Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi.');
      onNavigate('login');

    } catch (error) {
      console.error("Error saat pendaftaran:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-white flex items-center justify-center p-4">
      <style>{`
          /* Styling untuk react-datepicker, Anda bisa pindahkan ke file CSS utama */
          .react-datepicker-wrapper { width: 100%; }
          .react-datepicker { font-family: 'Inter', sans-serif; background-color: #0f172a; border: 1px solid #334155; }
          .react-datepicker__header { background-color: #1e293b; border-bottom: 1px solid #475569; }
          .react-datepicker__current-month, .react-datepicker-time__header, .react-datepicker__day-name, .react-datepicker__navigation-icon::before { color: #f1f5f9; border-color: #f1f5f9; }
          .react-datepicker__day, .react-datepicker__time-name { color: #cbd5e1; }
          .react-datepicker__day:hover { background-color: #334155; }
          .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected { background-color: #facc15; color: #0f172a; font-weight: bold; }
          .react-datepicker__day--disabled { color: #475569; }
          .react-datepicker__triangle::before, .react-datepicker__triangle::after { display: none; }
          .react-datepicker__year-read-view--down-arrow, .react-datepicker__month-read-view--down-arrow { border-top-color: #94a3b8; }
          .react-datepicker__year-dropdown, .react-datepicker__month-dropdown { background-color: #1e293b; border: 1px solid #475569; }
          .react-datepicker__year-option:hover, .react-datepicker__month-option:hover { background-color: #334155; }
          select:required:invalid { color: #9ca3af; } option[value=""][disabled] { display: none; } option { color: #1f2937; }
      `}</style>
      
      <div className="w-full max-w-3xl bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl z-10">
        <div className="flex items-center mb-6 relative">
          <button onClick={() => onNavigate('landing')} className="absolute left-0 p-2 rounded-full hover:bg-slate-700 transition-colors">
            <ArrowLeft className="text-slate-300" />
          </button>
          <div className="text-center flex-grow">
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-wider">Formulir Pendaftaran Siswa</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
                <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-center text-sm">
                    <strong>Error:</strong> {error}
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <input type="text" name="nama_depan" placeholder="Nama Depan" onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
              <input type="text" name="nama_belakang" placeholder="Nama Belakang" onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
              <input type="email" name="email" placeholder="Alamat Email" onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
              <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
              <input type="password" name="password" placeholder="Kata Sandi (minimal 6 karakter)" onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
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
            <div className="pt-2">
              <button type="submit" disabled={isLoading} className="w-full bg-yellow-400 text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-all duration-300 flex items-center justify-center disabled:bg-slate-500">
                {isLoading ? 'Mendaftarkan...' : 'Daftarkan Akun'}
              </button>
            </div>
        </form>
      </div>
    </div>
  );
}
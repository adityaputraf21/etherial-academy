// src/components/pages/RegisterPage.jsx

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../../supabaseClient'; // Impor klien Supabase yang sudah dibuat

export default function RegisterPage({ onNavigate }) {
  // State untuk data formulir
  const [formData, setFormData] = useState({
    nama_depan: '',
    nama_belakang: '',
    email: '',
    username: '',
    password: '',
    tanggal_lahir: null,
    nomor_wa_orang_tua: '',
    id_paket: '',
    kode_perujuk: '', // Untuk id_perujuk_siswa
  });

  // State untuk data dinamis dari database
  const [packageOptions, setPackageOptions] = useState([]);

  // State untuk UI
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mengambil data paket belajar dari Supabase saat komponen dimuat
  useEffect(() => {
    const fetchPackages = async () => {
      const { data, error } = await supabase.from('paket').select('id_paket, nama_paket');
      if (error) {
        console.error("Error fetching packages:", error);
      } else {
        setPackageOptions(data);
      }
    };
    fetchPackages();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, tanggal_lahir: date }));
  };

  // Fungsi untuk mengirim data ke Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Siapkan data yang akan dimasukkan ke tabel 'siswa'
      const newStudentData = {
        nama_depan: formData.nama_depan,
        nama_belakang: formData.nama_belakang,
        email: formData.email,
        username: formData.username,
        password: formData.password, // PERINGATAN: Menyimpan password sebagai teks biasa
        tanggal_lahir: formData.tanggal_lahir,
        nomor_wa_orang_tua: formData.nomor_wa_orang_tua,
        tanggal_pendaftaran: new Date(), // Tanggal hari ini
        id_paket: parseInt(formData.id_paket),
        // Untuk id_house, id_perujuk_siswa, id_level_saat_ini bisa di-handle di sini atau dibiarkan null
        id_house: Math.ceil(Math.random() * 4), // Acak house 1-4
        // Anda perlu logika tambahan untuk mengubah 'kode_perujuk' menjadi 'id_perujuk_siswa' (INTEGER)
      };
      
      // Kirim data ke Supabase
      const { error: insertError } = await supabase.from('siswa').insert([newStudentData]);

      if (insertError) {
        // Jika ada error (misalnya username/email sudah ada), lemparkan error
        throw insertError;
      }

      // Jika berhasil
      alert(`Pendaftaran untuk ${newStudentData.username} berhasil!`);
      onNavigate('login');

    } catch (error) {
      console.error("Error saat pendaftaran:", error.message);
      // Menampilkan pesan error yang lebih ramah
      if (error.message.includes('duplicate key value violates unique constraint "siswa_username_key"')) {
        setError("Username sudah digunakan. Silakan pilih username lain.");
      } else if (error.message.includes('duplicate key value violates unique constraint "siswa_email_key"')) {
        setError("Email sudah terdaftar. Silakan gunakan email lain.");
      } else {
        setError("Terjadi kesalahan saat pendaftaran. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-white flex items-center justify-center p-4">
       {/* (Styling DatePicker bisa ditaruh di sini atau di file CSS utama) */}
       <style>{`/* ... */`}</style>
      
      <div className="w-full max-w-3xl bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl z-10">
        <div className="flex items-center mb-6 relative">
          <button onClick={() => onNavigate('landing')} className="absolute left-0 p-2 rounded-full hover:bg-slate-700 transition-colors">
            <ArrowLeft className="text-slate-300" />
          </button>
          <div className="text-center flex-grow">
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-wider">Formulir Pendaftaran</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
                <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-center text-sm">
                    {error}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <input type="text" name="nama_depan" placeholder="Nama Depan" onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
                <input type="text" name="nama_belakang" placeholder="Nama Belakang" onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
                <input type="email" name="email" placeholder="Alamat Email" onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
                <input type="password" name="password" placeholder="Kata Sandi" onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
                <DatePicker selected={formData.tanggal_lahir} onChange={handleDateChange} placeholderText="Tanggal Lahir" dateFormat="dd / MM / yyyy" showYearDropdown showMonthDropdown dropdownMode="select" required className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
                <input type="tel" name="nomor_wa_orang_tua" placeholder="No. Telepon Orang Tua" onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
                <select name="id_paket" value={formData.id_paket} onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400">
                    <option value="" disabled>Pilih Paket Belajar</option>
                    {packageOptions.map(pkg => (
                        <option key={pkg.id_paket} value={pkg.id_paket} className="bg-slate-800 text-white">
                            {pkg.nama_paket}
                        </option>
                    ))}
                </select>
                <div className="md:col-span-2">
                    <input type="text" name="kode_perujuk" placeholder="Kode Referal (Opsional)" onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
                </div>
            </div>
            
            <div className="mt-6">
                <button type="submit" disabled={isLoading} className="w-full bg-yellow-400 text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-all duration-300 flex items-center justify-center disabled:bg-slate-500">
                    {isLoading ? 'Mendaftarkan...' : 'Daftarkan Akun'}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}

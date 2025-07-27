// src/components/pages/LoginPage.jsx

import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { ArrowLeft, Shield } from 'lucide-react';

export default function LoginPage({ onLoginSuccess, onNavigate }) {
  const [identifier, setIdentifier] = useState(''); // Bisa email atau username
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Fungsi untuk mencari pengguna di sebuah tabel
      const findUserInTable = async (table) => {
        const { data, error: queryError } = await supabase
          .from(table)
          .select('*')
          // Mencocokkan input dengan kolom email ATAU username
          .or(`email.eq.${identifier},username.eq.${identifier}`)
          .limit(1) // Ambil satu data saja
          .single();

        // Abaikan error 'not found' (PGRST116), tapi tampilkan error lain
        if (queryError && queryError.code !== 'PGRST116') {
          throw queryError;
        }
        
        // Jika data ditemukan dan password (teks biasa) cocok
        if (data && data.password === password) {
          return data;
        }

        return null;
      };

      // 1. Coba cari di tabel 'siswa'
      let user = await findUserInTable('siswa');
      if (user) {
        onLoginSuccess({ ...user, role: 'siswa' });
        return; // Hentikan proses jika sudah ketemu
      }

      // 2. Jika tidak ketemu, coba cari di tabel 'tutor'
      user = await findUserInTable('tutor');
      if (user) {
        onLoginSuccess({ ...user, role: 'tutor' });
        return;
      }

      // 3. Jika tidak ketemu, coba cari di tabel 'admin'
      user = await findUserInTable('admin');
      if (user) {
        onLoginSuccess({ ...user, role: 'admin' });
        return;
      }

      // Jika tidak ditemukan di semua tabel atau password salah
      throw new Error("Kombinasi email/username dan kata sandi salah.");

    } catch (error) {
      console.error("Error saat login:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
      <div className="min-h-screen bg-slate-900 font-sans text-white flex items-center justify-center p-4 relative">
          <button 
              onClick={() => onNavigate('landing')} 
              className="absolute top-4 left-4 flex items-center space-x-2 text-slate-300 hover:text-yellow-300 transition-colors z-20 p-2 rounded-md bg-slate-800/50"
          >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Kembali ke Beranda</span>
          </button>
          <div className="w-full max-w-sm sm:max-w-md bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl z-10">
              <div className="text-center mb-8">
                  <Shield className="text-yellow-400 w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4" />
                  <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-wider">ETHERIAL ACADEMY</h1>
                  <p className="text-slate-400 mt-2 text-sm sm:text-base">Selamat datang kembali!</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-6">
                  {error && <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-center text-sm">{error}</div>}
                  <input
                      type="text"
                      placeholder="Email atau Username"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      required
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <input
                      type="password"
                      placeholder="Kata Sandi"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-yellow-400 text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-all duration-300 flex items-center justify-center disabled:bg-slate-500"
                  >
                      {isLoading ? 'Memproses...' : 'Masuk'}
                  </button>
              </form>
              <div className="text-center mt-8 pt-6 border-t border-slate-700">
                  <p className="text-slate-400 text-sm">
                      Belum punya akun?{' '}
                      <a 
                          href="#" 
                          onClick={(e) => { e.preventDefault(); onNavigate('register'); }} 
                          className="font-bold text-yellow-300 hover:underline">
                          Daftar di sini
                      </a>
                  </p>
              </div>
          </div>
      </div>
  );
}

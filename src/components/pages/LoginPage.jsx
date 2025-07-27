// src/components/pages/LoginPage.jsx

import React, { useState } from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { supabase } from '../../supabaseClient'; // Pastikan path ini benar

export default function LoginPage({ onLoginSuccess, onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Coba login menggunakan email dan password
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Login gagal, silakan coba lagi.");

      // Jika login berhasil, onLoginSuccess akan dipanggil oleh listener di App.jsx
      // Jadi kita tidak perlu memanggilnya di sini secara eksplisit.
      // Cukup biarkan listener onAuthStateChange yang bekerja.

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
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-center text-sm">
                {error}
            </div>
          )}
          <input
            type="email"
            placeholder="Alamat Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
      </div>
    </div>
  );
}
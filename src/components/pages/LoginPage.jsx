import React, { useState } from 'react';
import { Shield, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';

export default function LoginPage({ onLoginSuccess, onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (onLoginSuccess) {
      onLoginSuccess({ email, password });
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
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="password"
              placeholder="Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            Masuk <ArrowRight className="ml-2" size={20} />
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-slate-700">
          <p className="text-slate-400 text-sm">
            Belum punya akun?{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('register'); }} className="font-bold text-yellow-300 hover:underline">
              Daftar di sini
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
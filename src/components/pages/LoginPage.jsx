// src/components/pages/LoginPage.jsx
import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { ArrowLeft, Shield } from 'lucide-react';

export default function LoginPage({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-white flex items-center justify-center p-4 relative">
          <button onClick={() => onNavigate('landing')} className="absolute top-4 left-4 p-2"><ArrowLeft /></button>
          <div className="w-full max-w-md bg-slate-800/50 p-8 rounded-2xl shadow-2xl">
              <div className="text-center mb-8">
                  <Shield className="text-yellow-400 w-16 h-16 mx-auto mb-4" />
                  <h1 className="text-3xl font-bold font-serif">ETHERIAL ACADEMY</h1>
              </div>
              <form onSubmit={handleLogin} className="space-y-6">
                  {error && <div className="p-3 bg-red-500/20 text-red-300 text-center rounded-lg">{error}</div>}
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-slate-900/50 p-3 rounded-lg"/>
                  <input type="password" placeholder="Kata Sandi" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-slate-900/50 p-3 rounded-lg"/>
                  <button type="submit" disabled={isLoading} className="w-full bg-yellow-400 text-slate-900 font-bold py-3 rounded-lg">
                      {isLoading ? 'Memproses...' : 'Masuk'}
                  </button>
              </form>
               <div className="text-center mt-8 pt-6 border-t border-slate-700">
                  <p>Belum punya akun? <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('register'); }} className="font-bold text-yellow-300 hover:underline">Daftar di sini</a></p>
              </div>
          </div>
      </div>
  );
}
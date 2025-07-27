// src/App.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Header from './components/Header';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import HouseSection from './components/sections/HouseSection';
import ProgramSection from './components/sections/ProgramSection';
import CtaSection from './components/sections/CtaSection';
import Footer from './components/Footer';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import DashboardPage from './components/pages/DashboardPage';
import TutorDashboardPage from './components/pages/TutorDashboardPage';
import AdminDashboardPage from './components/pages/AdminDashboardPage';

const LandingPage = ({ onNavigate }) => (
    <div><Header onNavigate={onNavigate} /><main><HeroSection /><AboutSection /><HouseSection /><ProgramSection /><CtaSection onNavigate={onNavigate}/></main><Footer /></div>
);

function App() {
  const [session, setSession] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('landing');

  useEffect(() => {
    // Listener ini akan menjadi satu-satunya sumber kebenaran untuk status otentikasi
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setSession(session);
        if (session) {
            // Jika ada sesi, ambil profil pengguna
            const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
            setCurrentUser(profile);
        } else {
            // Jika tidak ada sesi, hapus data pengguna
            setCurrentUser(null);
        }
        // Apapun hasilnya, proses memuat selesai
        setLoading(false);
    });

    return () => {
        // Hentikan listener saat komponen tidak lagi digunakan
        subscription.unsubscribe();
    };
  }, []);
  
  const navigate = (page) => setView(page);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  
  // Tampilkan layar pemuatan sampai status otentikasi awal diketahui


  // Jika ada sesi (sudah login), tampilkan dashboard yang sesuai
  if (session && currentUser) {
    if (currentUser.role === 'admin') {
      return <AdminDashboardPage user={currentUser} onLogout={handleLogout} />;
    }
    if (currentUser.role === 'tutor') {
      return <TutorDashboardPage user={currentUser} onLogout={handleLogout} />;
    }
    // 'student'
    return <DashboardPage user={currentUser} onLogout={handleLogout} />;
  }

  // Jika tidak ada sesi, tampilkan halaman publik
  switch (view) {
    case 'login':
      return <LoginPage onNavigate={navigate} />;
    case 'register':
      return <RegisterPage onNavigate={navigate} />;
    default:
      return <LandingPage onNavigate={navigate} />;
  }
}

export default App;
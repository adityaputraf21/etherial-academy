// src/App.jsx

import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; // Pastikan path ini benar

// Impor semua komponen halaman
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

function App() {
  const [view, setView] = useState('landing');
  const [session, setSession] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data profil berdasarkan peran
  const fetchUserProfile = async (user) => {
    if (!user) return null;

    const role = user.user_metadata?.role;
    if (!role) return null;

    let tableName = '';
    let idColumn = '';

    if (role === 'siswa') {
      tableName = 'siswa';
      idColumn = 'id_siswa';
    } else if (role === 'tutor') {
      tableName = 'tutor';
      idColumn = 'id_tutor';
    } else if (role === 'admin') {
      tableName = 'admin';
      idColumn = 'id_admin';
    } else {
      return null;
    }

    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('email', user.email) // Mencari berdasarkan email
      .single();

    if (error) {
      console.error(`Error fetching ${role} profile:`, error);
      return null;
    }
    
    // Menambahkan peran ke data profil untuk kemudahan
    return { ...data, role };
  };

  useEffect(() => {
    setLoading(true);
    // Cek sesi awal
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        const profile = await fetchUserProfile(session.user);
        setCurrentUser(profile);
      }
      setLoading(false);
    });

    // Dengarkan perubahan status otentikasi
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (session?.user) {
          const profile = await fetchUserProfile(session.user);
          setCurrentUser(profile);
        } else {
          setCurrentUser(null);
        }
        setLoading(false); // Pastikan loading selesai setelah ada perubahan
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const navigate = (page) => {
    setView(page);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setSession(null);
    navigate('landing');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        Memuat Aplikasi...
      </div>
    );
  }

  // --- Logika untuk menampilkan halaman ---

  if (session && currentUser) {
    if (currentUser.role === 'admin') {
      return <AdminDashboardPage user={currentUser} onLogout={handleLogout} />;
    }
    if (currentUser.role === 'tutor') {
      return <TutorDashboardPage user={currentUser} onLogout={handleLogout} />;
    }
    if (currentUser.role === 'siswa') {
        return <DashboardPage user={currentUser} onLogout={handleLogout} />;
    }
  }

  // Tampilkan halaman publik jika tidak ada sesi
  switch (view) {
    case 'login':
      return <LoginPage onLoginSuccess={() => {}} onNavigate={navigate} />;
    case 'register':
      return <RegisterPage onNavigate={navigate} />;
    default:
      return <LandingPage onNavigate={navigate} />;
  }
}

const LandingPage = ({ onNavigate }) => (
  <div>
    <Header onNavigate={onNavigate} />
    <main>
      <HeroSection />
      <AboutSection />
      <HouseSection />
      <ProgramSection />
      <CtaSection onNavigate={onNavigate} />
    </main>
    <Footer />
  </div>
);

export default App;
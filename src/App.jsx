import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; // Pastikan path ini benar

// Impor semua komponen halaman
import Header from './components/Header';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
// ... (impor komponen landing page lainnya)
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

  // Cek sesi yang ada saat aplikasi dimuat
  useEffect(() => {
    const getSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        if (session) {
            const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
            setCurrentUser(profile);
        }
    };
    getSession();

    // Dengarkan perubahan status otentikasi
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        const getProfile = async () => {
            const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
            setCurrentUser(profile);
        };
        getProfile();
      } else {
        setCurrentUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);
  
  const navigate = (page) => {
    setView(page);
  };

  const handleLoginSuccess = (profileData) => {
    setCurrentUser(profileData);
    // Sesi sudah diatur oleh onAuthStateChange, jadi kita tidak perlu mengaturnya di sini
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setSession(null);
    navigate('landing'); // Arahkan kembali ke landing page setelah logout
  };

  // --- Logika untuk menampilkan halaman ---

  // Jika sesi aktif dan data pengguna sudah ada, tampilkan dashboard yang sesuai
  if (session && currentUser) {
    if (currentUser.role === 'admin') {
      return <AdminDashboardPage user={currentUser} onLogout={handleLogout} />;
    }
    if (currentUser.role === 'tutor') {
      return <TutorDashboardPage user={currentUser} onLogout={handleLogout} />;
    }
    return <DashboardPage user={currentUser} onLogout={handleLogout} />;
  }

  // Jika tidak ada sesi, tampilkan halaman berdasarkan 'view' state
  switch (view) {
    case 'login':
      return <LoginPage onLoginSuccess={handleLoginSuccess} onNavigate={navigate} />;
    case 'register':
      return <RegisterPage onNavigate={navigate} />;
    default:
      return <LandingPage onNavigate={navigate} />;
  }
}

// Buat komponen LandingPage untuk merapikan kode
const LandingPage = ({ onNavigate }) => (
  <div>
    <Header onNavigate={onNavigate} />
    <main>
      <HeroSection />
      <AboutSection />
      {/* ... (komponen landing page lainnya) */}
    </main>
    <Footer />
  </div>
);


export default App;
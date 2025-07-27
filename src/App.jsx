// src/App.jsx
import React, { useState } from 'react';
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
    <div>
      <Header onNavigate={onNavigate} />
      <main>
        <HeroSection />
        <AboutSection />
        <HouseSection />
        <ProgramSection />
        <CtaSection onNavigate={onNavigate}/>
      </main>
      <Footer />
    </div>
);

function App() {
  const [view, setView] = useState('landing');
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = (page) => {
    setView(page);
  };

  const handleLoginSuccess = (userData) => {
    console.log("Login berhasil sebagai:", userData.role);
    setCurrentUser(userData);
    setView('dashboard'); // Arahkan ke tampilan dashboard
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('landing');
  };

  // --- Logika untuk menampilkan halaman ---
  
  // Jika sudah ada pengguna yang login, tampilkan dashboard yang sesuai
  if (currentUser) {
    if (currentUser.role === 'admin') {
      return <AdminDashboardPage user={currentUser} onLogout={handleLogout} />;
    }
    if (currentUser.role === 'tutor') {
      return <TutorDashboardPage user={currentUser} onLogout={handleLogout} />;
    }
    // Defaultnya adalah siswa
    return <DashboardPage user={currentUser} onLogout={handleLogout} />;
  }

  // Jika tidak ada yang login, tampilkan halaman berdasarkan 'view' state
  switch (view) {
    case 'login':
      return <LoginPage onLoginSuccess={handleLoginSuccess} onNavigate={navigate} />;
    case 'register':
      return <RegisterPage onNavigate={navigate} />;
    default:
      return <LandingPage onNavigate={navigate} />;
  }
}

export default App;
// =======================================================================
// File: src/App.jsx
// Deskripsi: File utama aplikasi yang mengelola navigasi dan peran pengguna.
// =======================================================================
import React, { useState } from 'react';

// --- Impor Komponen Landing Page ---
import Header from './components/Header';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import HouseSection from './components/sections/HouseSection';
import ProgramSection from './components/sections/ProgramSection';
import CtaSection from './components/sections/CtaSection';
import Footer from './components/Footer';

// --- Impor Halaman-Halaman ---
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import DashboardPage from './components/pages/DashboardPage';       // Dashboard Siswa
import TutorDashboardPage from './components/pages/TutorDashboardPage'; // Dashboard Tutor
import AdminDashboardPage from './components/pages/AdminDashboardPage'; // Dashboard Admin

// --- DATA CONTOH (Pengganti Database) ---
const mockStudentUser = {
  uid: 'student123',
  role: 'student',
  fullName: 'Budi Hartono',
  email: 'budi.hartono@example.com',
  password: 'password123',
  level: 'Dasar',
  tier: 'Bronze',
  points: 125,
  house: { name: 'Ignis', color: 'text-red-400' },
  classes: [
      { id: 'C001', name: 'Foundations Class', schedule: 'Senin, 16:00', progress: 75 },
      { id: 'C002', name: 'Fluentia Class', schedule: 'Rabu, 16:00', progress: 50 },
  ],
  assignments: [
      { id: 'A01', title: 'Latihan Aljabar', subject: 'Foundations Class', dueDate: '2025-08-01', status: 'Selesai' },
      { id: 'A02', title: 'Presentasi Sejarah', subject: 'Foundations Class', dueDate: '2025-08-05', status: 'Belum Selesai' },
  ]
};

const mockTutorUser = {
    uid: 'tutor456',
    role: 'tutor',
    fullName: 'Mr. Alistair',
    email: 'alistair.tutor@etherial.com',
    password: 'passwordtutor',
};

const mockAdminUser = {
    uid: 'admin789',
    role: 'admin',
    fullName: 'Admin Utama',
    email: 'admin@etherial.com',
    password: 'passwordadmin',
};
// --- AKHIR DATA CONTOH ---

function App() {
  const [view, setView] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = (page) => {
    setView(page);
  };

  const handleLoginSuccess = (loginData) => {
    if (!loginData || !loginData.email || !loginData.password) {
        alert("Terjadi kesalahan teknis saat mencoba login.");
        return;
    }
    
    const allMockUsers = [mockStudentUser, mockTutorUser, mockAdminUser];
    const foundUser = allMockUsers.find(
      user => user.email.toLowerCase() === loginData.email.toLowerCase() && user.password === loginData.password
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      setIsLoggedIn(true);
    } else {
      alert("Login Gagal: Pastikan email dan password Anda benar.");
    }
  };

  const handleLogout = () => {
      setIsLoggedIn(false);
      setCurrentUser(null);
      setView('landing'); // Kembali ke landing page setelah logout
  };

  // --- LOGIKA RENDER ---

  // Jika pengguna sudah login, tampilkan dashboard yang sesuai
  if (isLoggedIn) {
      switch (currentUser?.role) {
          case 'admin':
              return <AdminDashboardPage user={currentUser} onLogout={handleLogout} />;
          case 'tutor':
              return <TutorDashboardPage user={currentUser} onLogout={handleLogout} />;
          case 'student':
          default:
              return <DashboardPage user={currentUser} onLogout={handleLogout} />;
      }
  }
  
  // Jika pengguna belum login, tampilkan halaman landing, login, atau register
  switch (view) {
    case 'login':
      return <LoginPage onLoginSuccess={handleLoginSuccess} onNavigate={navigate} />;
    case 'register':
      return <RegisterPage onNavigate={navigate} />;
    case 'landing':
    default:
      return (
        <div className="bg-slate-900">
          <Header onNavigate={navigate} />
          <main>
            <HeroSection />
            <AboutSection />
            <HouseSection />
            <ProgramSection />
            <CtaSection onNavigate={navigate} />
          </main>
          <Footer />
        </div>
      );
  }
}

export default App;

import { useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { DashboardHome } from '../dashboard/DashboardHome';
import { MyClassesPage } from '../dashboard/MyClassesPage';
import { AssignmentsPage } from '../dashboard/AssignmentsPage';
import { ProfilePage } from '../dashboard/ProfilePage';


// --- DATA CONTOH (Nantinya akan diambil dari Firebase) ---
const mockEnrolledPrograms = [
  { name: 'Foundations Class', tutor: 'Mr. Alistair', schedule: 'Senin, 16:00', progress: 75 },
  { name: 'Fluentia Class', tutor: 'Ms. Elara', schedule: 'Rabu, 16:00', progress: 40 },
];

const mockPointHistory = [
  { reason: 'Berani melakukan presentasi', points: 15, date: '2 Agu' },
  { reason: 'Menyelesaikan tugas', points: 10, date: '1 Agu' },
  { reason: 'Hadir tepat waktu', points: 5, date: '1 Agu' },
];

const mockAssignments = [
    { title: 'Membuat Esai Kreatif', class: 'Fluentia Class', dueDate: '5 Agu 2025', status: 'Terkumpul', grade: 'A' },
    { title: 'Eksperimen Perubahan Zat', class: 'Foundations Class', dueDate: '10 Agu 2025', status: 'Belum Dikerjakan', grade: null },
    { title: 'Presentasi Sejarah Nusantara', class: 'Foundations Class', dueDate: '28 Jul 2025', status: 'Terkumpul', grade: 'B+' },
];
// --- AKHIR DATA CONTOH ---

export default function DashboardPage({ user, onLogout }) {
  const [activeView, setActiveView] = useState('home'); // home, my-classes, assignments, etc.
  
  // Data ini bisa di-fetch sekali saat halaman dashboard dimuat
  const programs = mockEnrolledPrograms;
  const history = mockPointHistory;
  const assignments = mockAssignments;

  const renderContent = () => {
    switch(activeView) {
      case 'my-classes':
        return <MyClassesPage programs={programs} />;
      case 'assignments':
        return <AssignmentsPage assignments={assignments} />;
      case 'profile':
        return <ProfilePage user={user} />;
      case 'home':
      default:
        return <DashboardHome user={user} programs={programs} history={history} />;
    }
  };

  return (
    <DashboardLayout 
        user={user} 
        onLogout={onLogout}
        activeView={activeView}
        onNavigate={setActiveView}
    >
      {renderContent()}
    </DashboardLayout>
  );
}
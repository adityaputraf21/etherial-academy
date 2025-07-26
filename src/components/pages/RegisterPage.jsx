import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Shield, ArrowLeft, User, Mail, Lock, Calendar, Phone } from 'lucide-react';

export default function RegisterPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    dob: null, // Diubah menjadi null untuk Date Picker
    parentPhone: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, dob: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const hiddenData = {
      registrationDate: new Date().toISOString(),
      house: ['Ignis', 'Aeris', 'Terra', 'Lumen'][Math.floor(Math.random() * 4)],
      profilePictureUrl: '',
      role: 'student',
      points: 0,
    };

    // Gabungkan data form dengan data tersembunyi
    const newUserData = { 
        ...formData,
        dob: formData.dob ? formData.dob.toISOString().split('T')[0] : '', // Format tanggal menjadi YYYY-MM-DD
        ...hiddenData 
    };

    console.log("Data Pendaftaran Baru (Simulasi):", newUserData);

    setTimeout(() => {
      setIsLoading(false);
      alert(`Pendaftaran untuk ${newUserData.username} berhasil! Silakan masuk dengan akun Anda.`);
      onNavigate('login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-white flex items-center justify-center p-4 relative">
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Inter:wght@400;500;700&display=swap');
            .font-serif { font-family: 'Cinzel', serif; }
            .font-sans { font-family: 'Inter', sans-serif; }

            /* Custom styling untuk react-datepicker agar sesuai tema gelap */
            .react-datepicker-wrapper { width: 100%; }
            .react-datepicker {
                font-family: 'Inter', sans-serif;
                background-color: #0f172a;
                border: 1px solid #334155;
            }
            .react-datepicker__header {
                background-color: #1e293b;
                border-bottom: 1px solid #475569;
            }
            .react-datepicker__current-month, .react-datepicker-time__header, .react-datepicker__day-name {
                color: #f1f5f9;
            }
            .react-datepicker__day, .react-datepicker__time-name {
                color: #cbd5e1;
            }
            .react-datepicker__day:hover, .react-datepicker__month-text:hover, .react-datepicker__quarter-text:hover, .react-datepicker__year-text:hover {
                background-color: #334155;
            }
            .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected {
                background-color: #facc15;
                color: #0f172a;
                font-weight: bold;
            }
            .react-datepicker__day--disabled {
                color: #475569;
            }
            .react-datepicker__triangle::before, .react-datepicker__triangle::after {
                display: none;
            }
            .react-datepicker__year-read-view--down-arrow, .react-datepicker__month-read-view--down-arrow, .react-datepicker__month-year-read-view--down-arrow {
                border-top-color: #94a3b8;
            }
            .react-datepicker__year-dropdown, .react-datepicker__month-dropdown, .react-datepicker__month-year-dropdown {
                background-color: #1e293b;
                border: 1px solid #475569;
            }
            .react-datepicker__year-option:hover, .react-datepicker__month-option:hover, .react-datepicker__month-year-option:hover {
                 background-color: #334155;
            }
        `}</style>
      
        <div className="absolute inset-0 bg-grid-slate-800 [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)] opacity-5"></div>
      
        <div className="w-full max-w-lg bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl z-10">
            <div className="flex items-center mb-6">
                <button onClick={() => onNavigate('login')} className="p-2 rounded-full hover:bg-slate-700 transition-colors">
                    <ArrowLeft className="text-slate-300" />
                </button>
                <div className="text-center flex-1">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-wider">BUAT AKUN</h1>
                    <p className="text-slate-400 mt-1">Mulai petualangan sihirmu!</p>
                </div>
                 <div className="w-10"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <input type="text" name="firstName" placeholder="Nama Depan" onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"/>
                    <input type="text" name="lastName" placeholder="Nama Belakang" onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"/>
                </div>
                <input type="email" name="email" placeholder="Alamat Email" onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"/>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"/>
                <input type="password" name="password" placeholder="Kata Sandi" onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"/>
                <div className="flex flex-col sm:flex-row gap-4">
                    <DatePicker
                      selected={formData.dob}
                      onChange={handleDateChange}
                      placeholderText="Tanggal Lahir"
                      dateFormat="dd / MM / yyyy"
                      showYearDropdown
                      showMonthDropdown
                      dropdownMode="select"
                      required
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                    />
                    <input type="tel" name="parentPhone" placeholder="No. Telepon Orang Tua" onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"/>
                </div>

                <button type="submit" disabled={isLoading} className="w-full bg-yellow-400 text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-all duration-300 flex items-center justify-center disabled:bg-slate-500">
                    {isLoading ? <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">...</svg> : 'Daftar Sekarang'}
                </button>
            </form>
        </div>
    </div>
  );
}
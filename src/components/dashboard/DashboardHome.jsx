import React from 'react';
import { Shield, BookOpen, Award } from 'lucide-react';

// Komponen-komponen ini bisa tetap di sini atau dipindahkan ke file terpisah
const ProfileCard = ({ user }) => (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center flex flex-col items-center">
        <div className={`relative w-24 h-24 mb-4`}>
            <div className={`w-full h-full rounded-full ${user.house.color.replace('text-', 'bg-').replace('-400', '-500/20')} flex items-center justify-center`}>
                <Shield className={`${user.house.color} w-12 h-12`} strokeWidth={1.5} />
            </div>
        </div>
        <h2 className="text-2xl font-bold font-serif text-white">{user.fullName}</h2>
        <p className={`${user.house.color} font-semibold text-lg`}>{user.house.name}</p>
        <div className="w-full bg-slate-700/50 h-px my-4"></div>
        <div className="flex justify-around w-full text-center">
            <div><p className="text-xs text-slate-400">Level</p><p className="font-bold text-white">{user.level}</p></div>
            <div><p className="text-xs text-slate-400">Tier</p><p className="font-bold text-white">{user.tier}</p></div>
        </div>
        <div className="mt-6 bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-3 w-full">
            <p className="text-xs text-yellow-300">Total Poin Sihir</p>
            <p className="text-3xl font-bold text-yellow-300">{user.points}</p>
        </div>
    </div>
);

const MyPrograms = ({ programs }) => (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h3 className="font-bold text-white text-xl mb-4 flex items-center"><BookOpen className="mr-3 text-yellow-400" size={24}/>Kelas Terdaftar</h3>
        <div className="space-y-4">
            {programs.map((prog, index) => (
                <div key={index} className="bg-slate-900/70 p-4 rounded-lg">
                    <p className="font-bold text-white">{prog.name}</p>
                    <div className="text-sm text-slate-400 flex justify-between mt-1">
                        <span>Tutor: {prog.tutor}</span>
                        <span>Jadwal: {prog.schedule}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const PointHistory = ({ history }) => (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h3 className="font-bold text-white text-xl mb-4 flex items-center"><Award className="mr-3 text-yellow-400" size={24}/>Riwayat Poin</h3>
        <ul className="space-y-3">
            {history.map((item, index) => (
                <li key={index} className="flex justify-between items-center border-b border-slate-700/50 pb-2">
                    <div><p className="text-white">{item.reason}</p><p className="text-xs text-slate-500">{item.date}</p></div>
                    <span className="font-bold text-yellow-300 text-lg">+{item.points}</span>
                </li>
            ))}
        </ul>
    </div>
);


export function DashboardHome({ user, programs, history }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
                <ProfileCard user={user} />
            </div>
            <div className="lg:col-span-2 space-y-6">
                <MyPrograms programs={programs} />
                <PointHistory history={history} />
            </div>
        </div>
    );
}
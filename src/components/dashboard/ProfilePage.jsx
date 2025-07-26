import { useState } from 'react';

export function ProfilePage({ user }) {
    // Nantinya state ini akan digunakan untuk mengelola form
    const [fullName, setFullName] = useState(user.fullName);
    const [email, setEmail] = useState(user.email);

    const handleSaveChanges = (e) => {
        e.preventDefault();
        // Logika untuk menyimpan perubahan ke Firebase
        alert('Perubahan disimpan! (Simulasi)');
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Profil Saya</h2>
            
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <form onSubmit={handleSaveChanges} className="space-y-6">
                    {/* Bagian Informasi Pribadi */}
                    <div>
                        <h3 className="text-lg font-semibold text-yellow-300 border-b border-slate-700 pb-2 mb-4">Informasi Pribadi</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-slate-400 mb-1">Nama Lengkap</label>
                                <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">Alamat Email</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
                            </div>
                        </div>
                    </div>

                    {/* Bagian Informasi Akademi */}
                    <div>
                        <h3 className="text-lg font-semibold text-yellow-300 border-b border-slate-700 pb-2 mb-4">Informasi Akademi</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">House</label>
                                <input type="text" value={user.house.name} disabled className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-3 text-slate-300 cursor-not-allowed"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Level & Tier</label>
                                <input type="text" value={`${user.level} - ${user.tier}`} disabled className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-3 text-slate-300 cursor-not-allowed"/>
                            </div>
                        </div>
                    </div>
                    
                    {/* Tombol Aksi */}
                    <div className="flex justify-end pt-4">
                        <button type="submit" className="bg-yellow-400 text-slate-900 font-bold py-2 px-6 rounded-lg hover:bg-yellow-300 transition-colors">
                            Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
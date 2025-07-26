import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export function AssignmentsPage({ assignments }) {
    const getStatusChip = (status) => {
        if (status === 'Terkumpul') {
            return (
                <div className="flex items-center space-x-2 text-green-400">
                    <CheckCircle size={18} />
                    <span className="font-semibold">Terkumpul</span>
                </div>
            );
        }
        return (
            <div className="flex items-center space-x-2 text-orange-400">
                <AlertCircle size={18} />
                <span className="font-semibold">Belum Dikerjakan</span>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Tugas Saya</h2>
            {assignments.map((task, index) => (
                <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start">
                        <div>
                            <h3 className="text-xl font-bold text-white">{task.title}</h3>
                            <p className="text-sm text-yellow-300 font-serif mt-1">{task.class}</p>
                            <div className="flex items-center text-slate-400 text-sm mt-2">
                                <Clock size={16} className="mr-2" />
                                <span>Tenggat: {task.dueDate}</span>
                            </div>
                        </div>
                        <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end">
                             {getStatusChip(task.status)}
                             {task.status === 'Terkumpul' ? (
                                <p className="text-lg font-bold text-white mt-2">Nilai: {task.grade}</p>
                             ) : (
                                <button className="mt-2 bg-yellow-400 text-slate-900 font-bold py-2 px-5 rounded-lg hover:bg-yellow-300 transition-colors">
                                    Kumpulkan Tugas
                                </button>
                             )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
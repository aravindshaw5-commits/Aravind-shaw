import React from 'react';
import { ShieldCheck, LogOut, UploadCloud, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminBar: React.FC = () => {
  const { isAdmin, logout } = useAuth();

  if (!isAdmin) return null;

  return (
    <aside
      aria-label="Owner Administration Mode"
      className="fixed bottom-4 right-4 z-40 bg-slate-900/95 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700/80 flex items-center gap-3.5 text-xs animate-slideUp"
    >
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <div className="flex items-center gap-1.5 font-bold text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Owner Mode Active</span>
        </div>
      </div>

      <div className="h-4 w-px bg-slate-700" />

      <div className="text-slate-300 hidden sm:flex items-center gap-1">
        <UploadCloud className="w-3.5 h-3.5 text-slate-400" />
        <span>Upload & Replace Enabled</span>
      </div>

      <button
        onClick={logout}
        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold transition-colors cursor-pointer"
        title="Sign out of Owner Mode"
      >
        <LogOut className="w-3 h-3" />
        <span>Logout</span>
      </button>
    </aside>
  );
};

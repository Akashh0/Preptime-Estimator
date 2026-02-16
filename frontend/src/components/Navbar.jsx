import React from 'react';
import { BrainCircuit, Cpu, Clock, CircleDot } from 'lucide-react';

export default function Navbar({ view }) {
  return (
    <nav className="relative z-50 flex justify-between items-center px-10 py-6 border-b border-white/5 backdrop-blur-3xl bg-black/40">
      
      {/* BRANDING SECTION */}
      <div className="flex items-center gap-5">
        <div className="p-2 bg-white/5 rounded-xl border border-white/10 shadow-sm">
          <BrainCircuit className="text-white" size={20} />
        </div>
        <div className="flex flex-col border-l border-white/10 pl-5">
          <span className="text-base font-bold tracking-tighter text-white uppercase italic leading-none">
            Prep_Time.
          </span>
          <span className="text-[9px] font-mono text-slate-500 tracking-[0.3em] uppercase mt-1.5 font-bold">
            Recruitment_Portal // 2026
          </span>
        </div>
      </div>
      
      {/* STATUS SECTION (Only for Testing) */}
      {view === 'testing' && (
        <div className="flex items-center gap-8 bg-white/[0.02] px-6 py-2 rounded-xl border border-white/5">
          <div className="flex items-center gap-3">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </div>
            <span className="text-[10px] font-mono text-cyan-500 tracking-widest uppercase font-black">Session_Live</span>
          </div>
          
          <div className="w-px h-3 bg-white/10" />
          
          <div className="flex items-center gap-3">
            <Clock size={12} className="text-slate-500" />
            <span className="text-xs font-mono text-white tracking-widest font-black">00:19:24</span>
          </div>
        </div>
      )}

      {/* SYSTEM META - Hidden on mobile */}
      <div className="hidden lg:flex items-center gap-6 opacity-30">
         <div className="flex items-center gap-2 text-[8px] font-mono text-white tracking-[0.4em] uppercase">
            <Cpu size={10} /> RTX_4050_Active
         </div>
      </div>
    </nav>
  );
}
import React from 'react';
import { BrainCircuit } from 'lucide-react';

export default function Navbar({ view }) {
  return (
    <nav className="relative z-50 flex justify-between items-center px-12 py-8 border-b border-white/5 backdrop-blur-3xl bg-black/20">
      <div className="flex items-center gap-4">
        <div className="p-2.5 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
          <BrainCircuit className="text-cyan-400" size={22} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-[0.5em] text-white uppercase italic leading-none">PREP_TIME!</span>
          <span className="text-[9px] font-mono text-cyan-500/50 tracking-[0.2em] uppercase mt-1.5 font-medium">Laboratory_System_v1.1</span>
        </div>
      </div>
      
      {view === 'testing' && (
        <div className="flex items-center gap-6 bg-white/5 px-6 py-2.5 rounded-2xl border border-white/10 backdrop-blur-xl animate-in fade-in slide-in-from-right-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
            <span className="text-[10px] font-mono text-green-400 tracking-[0.3em] uppercase font-bold">Live_Feed</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <span className="text-xs font-mono text-white tracking-[0.3em] font-bold">00:19:24</span>
        </div>
      )}
    </nav>
  );
}
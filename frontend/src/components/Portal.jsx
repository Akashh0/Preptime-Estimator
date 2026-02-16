import React from 'react';
import { Terminal, BrainCircuit, ChevronRight, Activity } from 'lucide-react';

export default function Portal({ onEnterAptitude, onEnterCoding }) {
  return (
    <div className="relative z-50 min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 font-sans overflow-x-hidden">
      
      {/* HUD HEADER: Responsive Positioning */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-4 opacity-60 border-l border-white/20 pl-4 md:pl-6 py-1">
        <Activity size={16} className="text-cyan-400 animate-pulse" />
        <div className="space-y-0.5 md:space-y-1">
          <span className="text-[8px] md:text-[10px] font-mono tracking-[0.3em] uppercase text-cyan-500 block">System_Online</span>
          <span className="text-[7px] md:text-[9px] font-mono text-slate-400 tracking-widest block uppercase italic">2026_Node // Chennai</span>
        </div>
      </div>

      {/* MAIN CONTAINER: Responsive Grid */}
      <div className="max-w-7xl w-full grid grid-cols-12 gap-8 md:gap-16 items-center pt-20 md:pt-0">
        
        {/* BRANDING: Stacked on Mobile, Split on Web */}
        <div className="col-span-12 lg:col-span-5 space-y-6 md:space-y-12 text-center lg:text-left">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] md:text-[9px] font-mono text-slate-400 uppercase tracking-widest">
              v2.0.26_Stable
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase text-white leading-[0.85]">
              Prep<br/>
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>Time.</span>
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium max-w-sm mx-auto lg:mx-0">
            Professional recruitment engine optimized for 2026 technical assessment standards.
          </p>
        </div>

        {/* INTERACTIVE CARDS: Vertical on Mobile */}
        <div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          
          {/* CODING CARD */}
          <button 
            onClick={onEnterCoding}
            className="group relative p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl hover:border-purple-500/40 transition-all duration-500 text-left h-auto md:h-[420px] flex flex-col justify-between"
          >
            <div className="space-y-4 md:space-y-8">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Terminal className="text-slate-500 group-hover:text-purple-400 transition-colors" size={20} />
              </div>
              <div>
                <h3 className="text-2xl md:text-4xl font-bold text-white uppercase italic tracking-tighter leading-none">Coding Arena.</h3>
                <p className="hidden md:block text-[10px] text-slate-600 mt-4 font-mono uppercase tracking-tight">
                  Solve industry DSA patterns for 2026 placements.
                </p>
              </div>
            </div>
            <div className="mt-6 md:mt-0 flex items-center gap-2 text-[9px] md:text-[10px] font-mono text-slate-700 group-hover:text-purple-400 transition-colors uppercase">
              Init_Core <ChevronRight size={12} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </button>

          {/* APTITUDE CARD */}
          <button 
            onClick={onEnterAptitude}
            className="group relative p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl hover:border-cyan-500/40 transition-all duration-500 text-left h-auto md:h-[420px] flex flex-col justify-between"
          >
            <div className="space-y-4 md:space-y-8">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <BrainCircuit className="text-slate-500 group-hover:text-cyan-400 transition-colors" size={20} />
              </div>
              <div>
                <h3 className="text-2xl md:text-4xl font-bold text-white uppercase italic tracking-tighter leading-none">Aptitude Vault.</h3>
                <p className="hidden md:block text-[10px] text-slate-600 mt-4 font-mono uppercase tracking-tight">
                  Master Deloitte and Zoho logic nodes.
                </p>
              </div>
            </div>
            <div className="mt-6 md:mt-0 flex items-center gap-2 text-[9px] md:text-[10px] font-mono text-slate-700 group-hover:text-cyan-400 transition-colors uppercase">
              Sync_Link <ChevronRight size={12} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </button>

        </div>
      </div>
    </div>
  );
}
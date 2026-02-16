import React from 'react';
import { Terminal, BrainCircuit, ChevronRight, Activity } from 'lucide-react';

export default function Portal({ onEnterAptitude, onEnterCoding }) {
  return (
    <div className="relative z-50 min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 font-sans overflow-x-hidden">
      
      {/* 1. HUD HEADER */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-4 opacity-60 border-l border-white/20 pl-4 md:pl-6 py-1">
        <Activity size={16} className="text-cyan-400 animate-pulse" />
        <div className="space-y-0.5 md:space-y-1">
          <span className="text-[8px] md:text-[10px] font-mono tracking-[0.3em] uppercase text-cyan-500 block font-black">System_Online</span>
          <span className="text-[7px] md:text-[9px] font-mono text-slate-400 tracking-widest block uppercase italic font-bold">2026_Node // Chennai</span>
        </div>
      </div>

      {/* 2. MAIN CONTAINER */}
      <div className="max-w-7xl w-full grid grid-cols-12 gap-8 md:gap-16 items-center pt-20 md:pt-0">
        
        {/* BRANDING SECTION */}
        <div className="col-span-12 lg:col-span-5 space-y-6 md:space-y-12 text-center lg:text-left">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] md:text-[9px] font-mono text-slate-400 uppercase tracking-widest">
              v2.0.26_Stable_Build
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase text-white leading-[0.85]">
              Prep<br/>
              <span className="text-transparent" style={{ WebkitTextStroke: '1.2px rgba(255,255,255,0.2)' }}>Time.</span>
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-bold max-w-sm mx-auto lg:mx-0 italic uppercase tracking-wider">
            // Professional recruitment engine optimized for 2026 technical assessment standards.
          </p>
        </div>

        {/* 3. INTERACTIVE CARDS WITH SHINE EFFECTS */}
        <div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          
          {/* CODING ARENA CARD (Purple Accent) */}
          <button 
            onClick={onEnterCoding}
            className="group relative p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl transition-all duration-700 text-left h-auto md:h-[450px] flex flex-col justify-between overflow-hidden shadow-2xl"
            style={{ borderColor: 'rgba(255,255,255,0.05)' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#a855f7'} // Purple
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
          >
            {/* TOP-TO-BOTTOM SHINE */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
              <div className="absolute -inset-full top-[-100%] left-[-100%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] transition-transform duration-1000 group-hover:translate-x-[100%] group-hover:translate-y-[100%]" />
            </div>

            <div className="space-y-4 md:space-y-10 relative z-10">
              <div className="w-14 h-14 md:w-18 md:h-18 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-purple-500/30">
                <Terminal className="text-slate-500 group-hover:text-purple-400 transition-colors" size={24} />
              </div>
              <div>
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none group-hover:text-purple-400 transition-colors">Coding Arena.</h3>
                <p className="hidden md:block text-[10px] text-slate-600 mt-6 font-mono uppercase tracking-widest leading-relaxed">
                  Solve industry DSA patterns for 2026 placements.
                </p>
              </div>
            </div>

            <div className="mt-8 md:mt-0 flex items-center gap-3 text-[10px] font-black text-slate-700 group-hover:text-purple-400 transition-all uppercase italic relative z-10">
              <div className="h-px w-4 group-hover:w-12 bg-purple-500/30 group-hover:bg-purple-500 transition-all duration-700" />
              Init_Core_Uplink <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </button>

          {/* APTITUDE VAULT CARD (Cyan Accent) */}
          <button 
            onClick={onEnterAptitude}
            className="group relative p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl transition-all duration-700 text-left h-auto md:h-[450px] flex flex-col justify-between overflow-hidden shadow-2xl"
            style={{ borderColor: 'rgba(255,255,255,0.05)' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#06b6d4'} // Cyan
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
          >
            {/* TOP-TO-BOTTOM SHINE */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
              <div className="absolute -inset-full top-[-100%] left-[-100%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] transition-transform duration-1000 group-hover:translate-x-[100%] group-hover:translate-y-[100%]" />
            </div>

            <div className="space-y-4 md:space-y-10 relative z-10">
              <div className="w-14 h-14 md:w-18 md:h-18 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-cyan-500/30">
                <BrainCircuit className="text-slate-500 group-hover:text-cyan-400 transition-colors" size={24} />
              </div>
              <div>
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none group-hover:text-cyan-400 transition-colors">Aptitude Vault.</h3>
                <p className="hidden md:block text-[10px] text-slate-600 mt-6 font-mono uppercase tracking-widest leading-relaxed">
                  Master Deloitte and Zoho logic nodes.
                </p>
              </div>
            </div>

            <div className="mt-8 md:mt-0 flex items-center gap-3 text-[10px] font-black text-slate-700 group-hover:text-cyan-400 transition-all uppercase italic relative z-10">
              <div className="h-px w-4 group-hover:w-12 bg-cyan-500/30 group-hover:bg-cyan-500 transition-all duration-700" />
              Sync_Neural_Link <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </button>

        </div>
      </div>
    </div>
  );
}
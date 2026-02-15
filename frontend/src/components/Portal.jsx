import React from 'react';
import { Terminal, BrainCircuit, ChevronRight, Activity, Database, ShieldCheck, Zap } from 'lucide-react';

export default function Portal({ onEnterAptitude, onEnterCoding }) {
  return (
    <div className="relative z-50 min-h-screen w-full flex flex-col items-center justify-center p-8 font-sans overflow-hidden">
      
      {/* 2026 GRADUATION HUD - Balanced & Professional */}
      <div className="absolute top-10 left-10 flex items-center gap-6 opacity-60 border-l border-white/20 pl-6 py-1">
        <Activity size={18} className="text-cyan-400 animate-pulse" />
        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-cyan-500 block">System_Online</span>
          <span className="text-[9px] font-mono text-slate-400 tracking-widest block uppercase font-medium italic">User: Akash_Krishh // Node: Chennai_South</span>
        </div>
      </div>

      <div className="max-w-7xl w-full grid grid-cols-12 gap-16 items-center">
        
        {/* LEFT COLUMN: BRANDING & SYSTEM DESCRIPTION */}
        <div className="col-span-12 lg:col-span-5 space-y-12 animate-in slide-in-from-left-8 duration-1000">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-slate-400 uppercase tracking-widest">
              <Zap size={10} className="text-purple-400" /> Version_2.0.26_Stable
            </div>
            {/* NEW BRANDING STYLE: Clean, Vertical, Professional */}
            <h1 className="text-8xl font-black tracking-tighter uppercase text-white leading-[0.85]">
              Prep<br/>
              <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}>Time.</span>
            </h1>
          </div>

          <div className="space-y-6 max-w-md">
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              A high-fidelity recruitment simulation engine engineered to bridge the gap between academic theory and technical assessment excellence. Optimized for 2026 graduation standards.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                <Database size={14} className="text-purple-500" /> Logic_Vaulted
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                <ShieldCheck size={14} className="text-cyan-500" /> 100%_Verified
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE MODULES */}
        <div className="col-span-12 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-8 duration-1000">
          
          {/* CODING MODULE CARD */}
          <button 
            onClick={onEnterCoding}
            className="group relative p-10 rounded-[3rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl hover:border-purple-500/40 transition-all duration-700 text-left overflow-hidden h-[450px] flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-all duration-500">
                <Terminal className="text-slate-500 group-hover:text-purple-400" size={28} />
              </div>
              <div>
                <h3 className="text-4xl font-bold text-white uppercase italic tracking-tighter mb-4 leading-none">Coding<br/><span className="text-white/20">Arena.</span></h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-mono uppercase tracking-tight">
                  Solve industry-standard DSA patterns. From Arrays to Graphs, reconstruct your neural logic threads.
                </p>
              </div>
            </div>
            <div className="relative z-10 flex items-center gap-3 text-[10px] font-mono text-slate-700 group-hover:text-purple-400 transition-colors uppercase tracking-widest">
              Initialize_Compiler <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </button>

          {/* APTITUDE MODULE CARD */}
          <button 
            onClick={onEnterAptitude}
            className="group relative p-10 rounded-[3rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl hover:border-cyan-500/40 transition-all duration-700 text-left overflow-hidden h-[450px] flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-all duration-500">
                <BrainCircuit className="text-slate-500 group-hover:text-cyan-400" size={28} />
              </div>
              <div>
                <h3 className="text-4xl font-bold text-white uppercase italic tracking-tighter mb-4 leading-none">Aptitude<br/><span className="text-white/20">Training.</span></h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-mono uppercase tracking-tight">
                  Simulate national-level assessments for TCS, Zoho, and Deloitte. Master historical company logic.
                </p>
              </div>
            </div>
            <div className="relative z-10 flex items-center gap-3 text-[10px] font-mono text-slate-700 group-hover:text-cyan-400 transition-colors uppercase tracking-widest">
              Sync_Neural_Paths <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </button>

        </div>
      </div>

      {/* FOOTER METADATA */}
      <div className="absolute bottom-10 inset-x-10 flex justify-between items-center opacity-20 text-[9px] font-mono tracking-[0.5em] uppercase pointer-events-none">
        <div className="flex gap-10">
          <span>// RTX_4050_KERNEL_ACTIVE</span>
          <span>// LATENCY: 24MS</span>
        </div>
        <span>Neural_Source: Historical_PYQ_Engine</span>
      </div>
    </div>
  );
}
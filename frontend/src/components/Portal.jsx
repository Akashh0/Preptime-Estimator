import React from 'react';
import { Terminal, BrainCircuit, ChevronRight, Zap } from 'lucide-react';

export default function Portal({ onEnterAptitude }) {
  return (
    <div className="relative z-50 h-screen w-full flex flex-col items-center justify-center p-10 overflow-hidden bg-transparent font-sans">
      
      <div className="absolute top-12 left-12 opacity-30 hidden lg:block border-l border-cyan-500/50 pl-4 py-2">
        <span className="text-[10px] font-mono tracking-[0.5em] uppercase text-cyan-500 block">Status: Online</span>
        <span className="text-[8px] font-mono text-slate-500 tracking-widest mt-1 block">Buffer_Size: 4096kb</span>
      </div>

      <div className="text-center space-y-16 max-w-6xl">
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="p-5 bg-cyan-500/5 rounded-3xl border border-cyan-500/20 animate-pulse shadow-[0_0_30px_rgba(6,182,212,0.1)]">
              <Zap className="text-cyan-400" size={48} />
            </div>
          </div>
          
          {/* FIXED: Underscore overlap fix via leading-tight and padding */}
          <h1 className="text-[12vw] font-bold italic tracking-tighter uppercase leading-[0.95] text-white pb-2">
            PREP_<span className="text-outline-white text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}>TIME!</span>
          </h1>
          
          <p className="text-[10px] font-mono text-slate-600 tracking-[1em] uppercase italic">
            // Advanced_Recruitment_Simulation_v1.1
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full px-4">
          <button className="group relative p-16 rounded-[4rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl hover:border-purple-500/40 transition-all duration-700 overflow-hidden text-left">
            <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Terminal className="text-slate-700 group-hover:text-purple-400 mb-10 transition-colors" size={56} />
            <h2 className="text-5xl font-bold text-white italic uppercase tracking-tighter leading-none">Coding<br/><span className="text-white/40">Practice.</span></h2>
            <div className="mt-10 flex items-center gap-3 text-[10px] font-mono text-slate-700 group-hover:text-purple-400 transition-colors uppercase tracking-widest">
              // INITIALIZE_COMPILER <ChevronRight size={14} />
            </div>
            <span className="absolute top-10 right-10 text-[8px] font-mono text-slate-800 tracking-[0.4em]">MOD_01</span>
          </button>

          <button 
            onClick={onEnterAptitude}
            className="group relative p-16 rounded-[4rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl hover:border-cyan-500/40 transition-all duration-700 overflow-hidden text-left shadow-2xl hover:shadow-cyan-500/5"
          >
            <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <BrainCircuit className="text-slate-700 group-hover:text-cyan-400 mb-10 transition-colors" size={56} />
            <h2 className="text-5xl font-bold text-white italic uppercase tracking-tighter leading-none">Aptitude<br/><span className="text-white/40">Training.</span></h2>
            <div className="mt-10 flex items-center gap-3 text-[10px] font-mono text-slate-700 group-hover:text-cyan-400 transition-colors uppercase tracking-widest">
              // SYNC_NEURAL_PATHS <ChevronRight size={14} />
            </div>
            <span className="absolute top-10 right-10 text-[8px] font-mono text-slate-800 tracking-[0.4em]">MOD_02</span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 inset-x-0 px-24 flex justify-between items-center opacity-20 text-[9px] font-mono tracking-[0.5em] uppercase">
        <div className="flex gap-10">
          <span>User: Fresh_Grad_2026</span>
          <span>Node: Chennai_South</span>
        </div>
        <span>Data_Source: Historical_PYQ_Engine</span>
      </div>
    </div>
  );
}
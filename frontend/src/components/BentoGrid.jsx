import React from 'react';
import { ChevronRight, Share2, Activity, Globe, Database, Cpu } from 'lucide-react';
import { COMPANIES } from '../Constants';

export default function BentoGrid({ onSelect }) {
  return (
    <div className="space-y-24 pt-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      
      {/* HEADER: SYMMETRIC & PROFESSIONAL */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-l border-white/10 pl-10 ml-4">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-cyan-500 font-mono text-[10px] tracking-[0.4em] uppercase font-bold">
            <Activity size={14} className="animate-pulse" />
            <span>Node_Selection_Active</span>
          </div>
          <h1 className="text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
            Aptitude<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}>Vault.</span>
          </h1>
        </div>
        
        <div className="max-w-md text-left lg:text-right space-y-4">
          <p className="text-[11px] font-mono text-slate-500 tracking-[0.2em] uppercase leading-relaxed italic">
            // Synchronize with historical company logic nodes to reconstruct assessment patterns.
          </p>
          <div className="flex lg:justify-end gap-6 opacity-30">
            <div className="flex items-center gap-2 text-[8px] font-mono text-white tracking-widest"><Globe size={10}/> GLOBAL_SYNC</div>
            <div className="flex items-center gap-2 text-[8px] font-mono text-white tracking-widest"><Database size={10}/> DATA_LOCALIZED</div>
          </div>
        </div>
      </div>

      {/* STRUCTURED BENTO GRID */}
      <div className="grid grid-cols-12 gap-6 px-4">
        {COMPANIES.map((c, i) => (
          <div 
            key={c.id} 
            onClick={() => onSelect(c.name)}
            className={`group relative cursor-pointer transition-all duration-500 hover:scale-[1.02] ${c.span || 'col-span-12 md:col-span-4'}`}
          >
            {/* GLASS CONTAINER: HARD EDGES & CLEAN BLUR */}
            <div className="relative h-full w-full overflow-hidden bg-white/[0.01] border border-white/5 backdrop-blur-3xl rounded-[3rem] transition-all duration-700 group-hover:border-cyan-500/30 shadow-2xl">
              
              {/* SUBTLE GLOW OVERLAY */}
              <div 
                className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity duration-1000"
                style={{ backgroundColor: c.accent || '#06b6d4' }} 
              />

              <div className="relative h-full p-10 flex flex-col justify-between">
                {/* CARD TOP: METADATA */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-cyan-500/60 uppercase tracking-widest block font-bold italic">Node_Ref: 0x0{i+1}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] italic">{c.category}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-slate-600 group-hover:text-cyan-400 group-hover:border-cyan-500/20 transition-all duration-500">
                    {c.icon || <Cpu size={20}/>}
                  </div>
                </div>

                {/* CARD BOTTOM: BRANDING */}
                <div className="space-y-6 mt-20">
                  <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none transition-transform duration-500 group-hover:translate-x-2">
                    {c.name}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-grow">
                      <div className="h-px w-0 group-hover:w-12 bg-cyan-500/50 transition-all duration-700" />
                      <span className="text-[9px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-all duration-700 uppercase tracking-[0.4em]">
                        Initialize_Session
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-slate-700 group-hover:text-cyan-400 transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            {/* HOVER HUD DATA */}
            <div className="absolute top-4 right-8 font-mono text-[7px] text-slate-800 uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-opacity">
              Kernel_Ready // Link_Optimized
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
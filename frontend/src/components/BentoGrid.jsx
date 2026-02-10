import React from 'react';
import { ChevronRight, Share2 } from 'lucide-react';
import { COMPANIES } from '../Constants';

export default function BentoGrid({ onSelect }) {
  return (
    <div className="space-y-32 pt-16 animate-in fade-in zoom-in duration-1000">
      {/* HEADER SECTION: HIGH-CONTRAST TYPOGRAPHY */}
      <div className="relative flex flex-col md:flex-row md:items-end justify-between border-l-2 border-cyan-500/20 pl-10 ml-4">
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-cyan-500 font-mono text-[10px] tracking-[0.6em] uppercase font-bold">
            <Share2 size={14} className="animate-spin-slow" />
            <span>You're Online! I guess..</span>
          </div>
          <h1 className="text-[12vw] font-bold text-white italic tracking-tighter uppercase leading-[0.75] drop-shadow-2xl">
            Aptitude<br />
            <span className="text-outline-white text-transparent opacity-100">Section</span>
          </h1>
        </div>
        <div className="mt-12 md:mt-0 max-w-[300px] text-right">
          <p className="text-[10px] font-mono text-slate-500 tracking-[0.2em] uppercase leading-relaxed font-medium">
            // Target a synchronization node to reconstruct historical assessment logic.
          </p>
        </div>
      </div>

      {/* FRAGMENTED GRID SYSTEM */}
      <div className="grid grid-cols-12 gap-8 px-4">
        {COMPANIES.map((c, i) => (
          <div 
            key={c.id} 
            onClick={() => onSelect(c.name)}
            className={`group relative cursor-pointer transition-all duration-700 hover:-translate-y-4 ${c.span}`}
          >
            {/* ASYMMETRIC NEUMORPHIC-GLASS CONTAINER */}
            <div className="relative h-full w-full overflow-hidden bg-[#0d0d10]/40 backdrop-blur-3xl border-t border-l border-white/10 
                          rounded-[3.5rem_1rem_3.5rem_1rem] group-hover:rounded-[1rem_3.5rem_1rem_3.5rem] transition-all duration-1000 shadow-2xl">
              
              {/* SCANNING LASER ANIMATION */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-[2500ms] ease-in-out" />
              
              <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-1000"
                   style={{ backgroundColor: c.accent }} />

              <div className="relative h-full p-12 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-cyan-500/40 uppercase tracking-widest block italic font-bold">Node_Ref: 0x0{i+1}</span>
                    <span className="text-[11px] font-bold text-white/40 uppercase tracking-[0.4em] italic leading-none">{c.category}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-slate-500 group-hover:text-white group-hover:border-cyan-500/40 transition-all duration-500 shadow-inner">
                    {c.icon}
                  </div>
                </div>

                <div className="space-y-8">
                  <h3 className="text-7xl font-bold text-white italic tracking-tighter uppercase leading-none transform -rotate-2 group-hover:rotate-0 transition-transform duration-700">
                    {c.name}
                  </h3>
                  <div className="flex items-center gap-6">
                    <div className="h-[1px] flex-grow bg-gradient-to-r from-cyan-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-1000" />
                    <span className="text-[10px] font-bold text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-700 uppercase italic tracking-[0.3em]">
                      INIT_SYNC
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* FLOATING HUD METADATA */}
            <div className="absolute -top-6 -right-2 font-mono text-[8px] text-slate-700 uppercase tracking-[0.4em] hidden lg:block leading-relaxed">
              // LATENCY: 24MS <br />
              // LOAD: OPTIMIZED_LINK
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
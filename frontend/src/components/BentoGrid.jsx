import React from 'react';
import { ChevronRight, Activity, Cpu } from 'lucide-react';
import { COMPANIES } from '../Constants';

export default function BentoGrid({ onSelect }) {
  return (
    <div className="space-y-12 md:space-y-20 pt-6 md:pt-16 animate-in fade-in slide-in-from-bottom-6 duration-1000 max-w-[1550px] mx-auto px-4 md:px-10 overflow-x-hidden">
      
      {/* 1. HUD HEADER */}
      <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-12 border-l-2 border-cyan-500/40 pl-6 md:pl-10 ml-2 md:ml-0">
        <div className="space-y-3 md:space-y-6">
          <div className="flex items-center gap-2 text-cyan-500 font-mono text-[8px] md:text-[10px] tracking-[0.3em] uppercase font-black italic">
            <Activity size={12} className="animate-pulse" />
            <span>Visual_Kernel: Optimized</span>
          </div>
          <h1 className="text-4xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
            Aptitude<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1.2px rgba(255,255,255,0.2)' }}>Vault.</span>
          </h1>
        </div>
      </div>

      {/* 2. MULTI-COLOR GRID WITH SHINE EFFECT */}
      <div className="flex flex-col md:grid md:grid-cols-12 md:auto-rows-fr gap-5 md:gap-10 pb-20">
        {COMPANIES.map((c, i) => (
          <div 
            key={c.id} 
            onClick={() => onSelect(c.name)}
            className={`group relative cursor-pointer flex transition-all duration-500 
            ${c.span || 'col-span-12 md:col-span-6 lg:col-span-4'}`}
          >
            {/* THE SHINE EFFECT: 
              An absolute div that slides from top-left to bottom-right on hover.
            */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem]">
              <div className="absolute -inset-full top-[-100%] left-[-100%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] transition-transform duration-1000 group-hover:translate-x-[100%] group-hover:translate-y-[100%]" />
            </div>

            {/* CARD BODY: Uses c.accent for borders and shadows */}
            <div 
              className="relative flex-grow w-full overflow-hidden bg-white/[0.01] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 flex flex-col justify-between min-h-[160px] md:min-h-[400px] shadow-2xl transition-all duration-500 group-hover:bg-white/[0.03]"
              style={{ 
                // Inline styles for dynamic colors based on company accent
                borderColor: `rgba(255,255,255,0.05)`,
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = c.accent || '#06b6d4'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
            >
              
              {/* Dynamic Glow Overlay */}
              <div 
                className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                style={{ backgroundColor: c.accent || '#06b6d4' }} 
              />

              <div className="relative flex justify-between items-start z-10">
                <div className="space-y-1">
                  <span className="text-[7px] md:text-[9px] font-mono uppercase tracking-widest block font-black italic" style={{ color: c.accent || '#06b6d4' }}>Node_0{i+1}</span>
                  <span className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{c.category}</span>
                </div>
                <div 
                   className="p-3 md:p-5 rounded-2xl bg-white/5 border border-white/10 transition-all duration-500 group-hover:scale-110"
                   style={{ color: 'gray' }}
                   onMouseEnter={(e) => e.currentTarget.style.color = c.accent}
                   onMouseLeave={(e) => e.currentTarget.style.color = 'gray'}
                >
                  {c.icon || <Cpu size={20}/>}
                </div>
              </div>

              <div className="relative space-y-4 md:space-y-8 mt-12 md:mt-0 z-10">
                <h3 
                  className="text-3xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none transition-all duration-500"
                >
                  {c.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-5 flex-grow">
                    <div 
                      className="h-px w-4 group-hover:w-20 transition-all duration-700" 
                      style={{ backgroundColor: c.accent || '#06b6d4' }}
                    />
                    <span className="text-[7px] md:text-[9px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-all duration-700 uppercase tracking-[0.4em]">
                      Link_Established
                    </span>
                  </div>
                  <ChevronRight size={18} className="text-slate-700 transition-colors" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
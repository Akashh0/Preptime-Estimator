import React, { useRef } from 'react';
import { Zap, Terminal, Cpu, ArrowRight, Brain, Code } from 'lucide-react';

export default function App() {
  const containerRef = useRef(null);

  // FIX: Direct DOM update to prevent re-render lag
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    containerRef.current.style.setProperty('--mouse-x', `${clientX}px`);
    containerRef.current.style.setProperty('--mouse-y', `${clientY}px`);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen relative overflow-hidden bg-midnight font-sans selection:bg-cobalt/30"
    >
      
      {/* 1. SMOOTH KINETIC GLOW */}
      <div 
        className="fixed pointer-events-none inset-0 z-0 opacity-40 transition-opacity duration-500"
        style={{
          background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(46, 123, 255, 0.15), transparent 80%)`
        }}
      />

      {/* 2. THE FLOATING NEBULA ORB (GPU Accelerated) */}
      <div 
        className="fixed pointer-events-none z-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20"
        style={{
          left: 'var(--mouse-x)',
          top: 'var(--mouse-y)',
          transform: 'translate(-50%, -50%)',
          background: 'linear-gradient(to right, var(--color-cobalt), var(--color-nebula))',
          willChange: 'transform',
        }}
      />

      {/* NAVIGATION */}
      <nav className="relative z-50 flex justify-between items-center px-12 py-10 max-w-[1600px] mx-auto">
        <div className="text-3xl font-black italic tracking-tighter flex items-center gap-2">
          <Zap className="text-electric fill-electric" /> PREP-TIME!
        </div>
        <div className="hidden md:flex gap-10 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
           <span className="hover:text-electric cursor-pointer transition-colors">Problems</span>
           <span className="hover:text-electric cursor-pointer transition-colors">Roadmaps</span>
           <button className="bg-white/5 border border-white/10 px-6 py-2 rounded-lg text-white hover:bg-white/10 transition-all">
             Launch System
           </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative z-10 pt-12 pb-24 px-6 flex flex-col items-center text-center">
        <div className="px-4 py-1 rounded-full bg-cobalt/10 border border-cobalt/20 text-electric text-[10px] font-bold tracking-widest uppercase mb-8">
          Precision Interview Engineering
        </div>
        
        <h1 className="text-7xl md:text-[11rem] font-black tracking-tighter leading-[0.8] mb-12 select-none text-white">
          CODE WITH <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-cobalt to-nebula">
            INTENTION.
          </span>
        </h1>
        
        <p className="max-w-2xl text-xl text-slate-400 font-medium mb-12 leading-relaxed">
          The elite training ground for top-tier engineers. <br/>
          Solve the architecture before you touch the keys.
        </p>

        <button className="px-10 py-5 bg-white text-midnight font-black text-lg rounded-2xl hover:bg-electric transition-all flex items-center gap-3 group shadow-2xl shadow-electric/20">
          START TRAINING <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </header>

      {/* BENTO GRID (Deep Glass Style) */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-10 grid grid-cols-1 md:grid-cols-4 gap-6 pb-32">
        
        {/* Large Feature: Logic Gate */}
        <div className="md:col-span-2 md:row-span-2 p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl flex flex-col justify-between group hover:border-cobalt/40 transition-all duration-500">
          <div>
            <div className="w-16 h-16 bg-cobalt/10 rounded-2xl flex items-center justify-center mb-8 text-electric group-hover:scale-110 transition-transform shadow-inner">
              <Cpu size={36} />
            </div>
            <h3 className="text-5xl font-black mb-6 italic tracking-tight">The Logic Gate</h3>
            <p className="text-slate-400 text-xl leading-relaxed">
              Enforce structural integrity. Editor stays locked until you verify the optimal Big O complexity.
            </p>
          </div>
          <div className="mt-12 flex items-center gap-3 text-electric font-bold text-lg group-hover:gap-5 transition-all">
             Initialize Console <ArrowRight size={24} />
          </div>
        </div>

        {/* Medium: Dry-Run Engine */}
        <div className="md:col-span-2 p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl group hover:border-nebula/40 transition-all duration-500">
          <div className="flex gap-8 items-start">
            <div className="w-16 h-16 bg-nebula/10 rounded-2xl flex items-center justify-center text-nebula shrink-0 group-hover:rotate-12 transition-transform">
              <Terminal size={36} />
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-3 italic">Visual Trace</h3>
              <p className="text-slate-400 text-lg">A real-time variable matrix synced to your mental compiler.</p>
            </div>
          </div>
        </div>

        {/* Small: AI Insights */}
        <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl hover:border-white/20 transition-all group">
          <Brain className="text-slate-500 mb-6 group-hover:text-electric transition-colors" size={32} />
          <h4 className="text-2xl font-bold mb-2 italic text-slate-300">Pattern AI</h4>
          <p className="text-sm text-slate-500 leading-relaxed">Heuristic detection for the "Trick" in complex problems.</p>
        </div>

        {/* Small: Multi-Language */}
        <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl flex flex-col items-center justify-center opacity-40 hover:opacity-100 transition-all">
          <Code className="text-white mb-4" size={40} />
          <span className="text-[12px] font-black tracking-[0.4em] text-slate-500 uppercase">Py / Js / C++</span>
        </div>

      </section>
    </div>
  );
}
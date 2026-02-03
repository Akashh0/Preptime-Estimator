import React from 'react';
import { Terminal, Zap, Cpu, Activity, ArrowRight, Code, Database, Brain } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen text-white selection:bg-cyan-500/30 overflow-x-hidden pb-20">
      
      {/* 1. BIG ABSTRACT BACKGROUNDS */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-cyan-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-600/10 blur-[150px] rounded-full" />
      </div>

      <nav className="flex justify-between items-center px-12 py-8 max-w-[1600px] mx-auto">
        <div className="text-3xl font-black tracking-tighter flex items-center gap-2 italic">
          <Zap className="text-cyan-400 fill-cyan-400" /> PREP-TIME!
        </div>
        <button className="bg-white text-black px-8 py-3 rounded-full text-sm font-bold hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20">
          Launch Console
        </button>
      </nav>

      {/* 2. ENHANCED HERO (Wider & Bolder) */}
      <header className="pt-24 pb-20 px-6 flex flex-col items-center text-center max-w-[1400px] mx-auto">
        <div className="px-6 py-2 rounded-full bg-slate-900/80 border border-slate-700 backdrop-blur-md text-cyan-400 text-xs font-bold tracking-[0.3em] mb-10 uppercase">
          Next-Gen Interview Intelligence
        </div>

        <h1 className="text-8xl md:text-[11rem] font-black tracking-tighter mb-10 leading-[0.8] drop-shadow-2xl">
          CODE WITH <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            INTENTION.
          </span>
        </h1>

        <p className="max-w-3xl text-xl md:text-2xl text-slate-400 mb-12 font-medium leading-relaxed">
          Master the <span className="text-white">mental models</span> of engineering. 
          Stop guessing and start solving with our integrated Logic Gates and Visual Debuggers.
        </p>

        <button className="px-12 py-6 bg-cyan-500 text-slate-950 font-black text-lg rounded-2xl hover:bg-cyan-400 transition-all flex items-center gap-3 group shadow-2xl shadow-cyan-500/40">
          START TRAINING NOW <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </header>

      {/* 3. NEW SECTION: STATS BAR (Fills horizontal space) */}
      <section className="max-w-[1400px] mx-auto px-12 py-12 border-y border-slate-800/50 flex flex-wrap justify-between gap-8 opacity-50 mb-24">
        <StatItem label="Active Problems" value="1,200+" />
        <StatItem label="Mock Sessions" value="50k+" />
        <StatItem label="Success Rate" value="94%" />
        <StatItem label="Global Ranking" value="Top 1%" />
      </section>

      {/* 4. EXPANDED FEATURE GRID */}
      <section className="max-w-[1400px] mx-auto px-12 grid lg:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<Cpu />} 
          title="The Logic Gate" 
          desc="Force-verify your DS/ALGO strategy before the editor unlocks. Perfect for high-pressure technical rounds." 
          color="cyan"
        />
        <FeatureCard 
          icon={<Terminal />} 
          title="Dry-Run Engine" 
          desc="A real-time variable tracker synced to your keystrokes. Visualize exactly how your loops behave." 
          color="purple"
        />
        <FeatureCard 
          icon={<Brain />} 
          title="Pattern Recognition" 
          desc="Identify the 'Trick' in the question instantly using our AI-driven hint architecture." 
          color="blue"
        />
      </section>
    </div>
  );
}

function StatItem({ label, value }) {
  return (
    <div className="flex flex-col items-center md:items-start">
      <span className="text-4xl font-black">{value}</span>
      <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">{label}</span>
    </div>
  );
}

function FeatureCard({ icon, title, desc, color }) {
  const colors = {
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20"
  };

  return (
    <div className="p-12 rounded-[3rem] bg-slate-900/30 border border-slate-800 backdrop-blur-xl hover:bg-slate-900/50 hover:border-slate-700 transition-all group">
      <div className={`w-16 h-16 ${colors[color]} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
        {React.cloneElement(icon, { size: 32 })}
      </div>
      <h3 className="text-3xl font-bold mb-4">{title}</h3>
      <p className="text-slate-400 text-lg leading-relaxed">{desc}</p>
    </div>
  );
}
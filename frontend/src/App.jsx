import React, { useState, useRef } from 'react';
import { Zap, Building2, ArrowRight, Loader2, Target, Cpu, Terminal, AlertCircle, RefreshCw } from 'lucide-react';
import axios from 'axios';

const COMPANIES = [
  { name: "Zoho", color: "text-red-500", pattern: "Logic & Z-Aptitude", icon: <Target className="text-red-500" /> },
  { name: "Deloitte", color: "text-green-500", pattern: "NLA Pattern Logic", icon: <Cpu className="text-green-500" /> },
  { name: "TCS", color: "text-blue-500", pattern: "NQT Foundation", icon: <Terminal className="text-blue-500" /> },
  { name: "Accenture", color: "text-purple-500", pattern: "Cognitive Ability", icon: <Zap className="text-purple-500" /> }
];

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const containerRef = useRef(null);

  // High-performance mouse tracker (no re-renders)
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
    containerRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
  };

  const fetchAptitudeSystem = async (company) => {
    setLoading(true);
    setError(null);
    setSelectedCompany(company);
    
    try {
      // Points to your FastAPI backend
      const res = await axios.get(`http://localhost:8000/generate-aptitude/${company}`);
      
      // Safety check: Ensure the response is actually an array
      if (Array.isArray(res.data)) {
        setQuestions(res.data);
      } else {
        throw new Error("Invalid response format from AI");
      }
    } catch (e) {
      console.error("Connection failed:", e);
      setError("System Busy: The AI model is currently initializing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove} 
      className="min-h-screen bg-[#030303] text-white overflow-x-hidden font-sans selection:bg-cyan-500/30 pb-20"
    >
      {/* 1. DYNAMIC BACKGROUND GLOW */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0" 
           style={{ background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(0, 240, 255, 0.15), transparent 80%)` }} />

      {/* 2. NAVIGATION */}
      <nav className="relative z-50 flex justify-between items-center px-12 py-10 max-w-[1600px] mx-auto">
        <div className="text-3xl font-black italic tracking-tighter flex items-center gap-2">
          <Zap className="text-cyan-400 fill-cyan-400" /> PREP-TIME!
        </div>
      </nav>

      <main className="relative z-10 px-10 max-w-[1400px] mx-auto">
        <header className="pt-12 pb-20 text-center">
          <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter leading-[0.75] mb-8 italic text-white">
            {questions.length > 0 ? selectedCompany.toUpperCase() : "APTI-LAB."}
          </h1>
          <p className="max-w-xl mx-auto text-lg text-slate-500 font-mono tracking-widest uppercase">
            {loading ? "// Syncing with Neural Router..." : "// Target a system to generate questions"}
          </p>

          {/* LOADING INDICATOR */}
          {loading && (
            <div className="flex flex-col items-center gap-4 mt-12">
              <Loader2 className="animate-spin text-cyan-400" size={48} />
              <p className="text-cyan-400 font-mono text-[10px] tracking-[0.3em] animate-pulse">GENERATING MOCK ENVIRONMENT...</p>
            </div>
          )}

          {/* ERROR HANDLING UI */}
          {error && !loading && (
            <div className="mt-10 max-w-md mx-auto p-6 rounded-3xl bg-red-500/5 border border-red-500/20 text-center">
              <AlertCircle className="text-red-500 mx-auto mb-4" size={32} />
              <p className="text-sm text-slate-400 mb-6">{error}</p>
              <button 
                onClick={() => fetchAptitudeSystem(selectedCompany)}
                className="flex items-center gap-2 mx-auto px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl text-xs font-bold transition-all"
              >
                <RefreshCw size={14} /> RE-INITIALIZE
              </button>
            </div>
          )}
        </header>

        {/* 3. COMPANY SELECTION GRID */}
        {!loading && questions.length === 0 && !error && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {COMPANIES.map((company) => (
              <div 
                key={company.name}
                onClick={() => fetchAptitudeSystem(company.name)}
                className="group p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-cyan-400/50 cursor-pointer transition-all duration-500 backdrop-blur-3xl overflow-hidden relative"
              >
                <div className="mb-8 p-4 bg-white/5 w-fit rounded-2xl group-hover:scale-110 transition-transform">
                  {company.icon}
                </div>
                <h3 className="text-4xl font-black mb-2 italic tracking-tighter">{company.name}</h3>
                <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-10">{company.pattern}</p>
                <div className="flex items-center gap-2 text-[10px] font-black text-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity">
                  GENERATE SYSTEM <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. QUESTION RENDERER */}
        {questions.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
             <button 
                onClick={() => {setQuestions([]); setError(null);}} 
                className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 font-mono text-xs mb-10 uppercase tracking-widest"
              >
              <ArrowRight className="rotate-180" size={14} /> Reset Connection
            </button>
            
            {questions.map((q, i) => (
              <div key={i} className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl group hover:border-cyan-400/20 transition-colors">
                <span className="text-cyan-400 font-mono text-xs mb-4 block opacity-50">QUESTION_ID_{i + 1}</span>
                <p className="text-2xl font-bold mb-10 text-slate-200 leading-snug">{q.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((opt, idx) => (
                    <button key={idx} className="w-full text-left p-6 rounded-2xl border border-white/5 bg-white/5 hover:border-cyan-400 transition-all hover:bg-cyan-400/10 text-slate-400 hover:text-white">
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
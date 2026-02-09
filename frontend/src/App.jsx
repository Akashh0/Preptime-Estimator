import React, { useState, useRef } from 'react';
import { 
  Zap, Target, Cpu, Terminal, Loader2, BrainCircuit, 
  Activity, ChevronRight, Fingerprint, Command, 
  BarChart3, ShieldCheck, Globe, Database, Layers, X
} from 'lucide-react';
import axios from 'axios';

// 1. ASYMMETRIC BENTO GRID CONFIGURATION
const COMPANIES = [
  { id: 'zoho', name: "ZOHO", category: "LOGIC", accent: "bg-red-500", span: "col-span-8 h-[380px]", icon: <Fingerprint size={18} /> },
  { id: 'deloitte', name: "DELOITTE", category: "STRATEGY", accent: "bg-green-500", span: "col-span-4 h-[380px]", icon: <Target size={18} /> },
  { id: 'tcs', name: "TCS", category: "FOUNDATION", accent: "bg-blue-500", span: "col-span-4 h-[320px]", icon: <Terminal size={18} /> },
  { id: 'google', name: "GOOGLE", category: "ALGO", accent: "bg-yellow-500", span: "col-span-4 h-[320px]", icon: <Command size={18} /> },
  { id: 'amazon', name: "AMAZON", category: "SCALE", accent: "bg-amber-500", span: "col-span-4 h-[320px]", icon: <Zap size={18} /> },
  { id: 'wipro', name: "WIPRO", category: "FOUNDATION", accent: "bg-pink-500", span: "col-span-5 h-[340px]", icon: <Cpu size={18} /> },
  { id: 'accenture', name: "ACCENTURE", category: "STRATEGY", accent: "bg-cyan-500", span: "col-span-7 h-[340px]", icon: <Activity size={18} /> },
  { id: 'infosys', name: "INFOSYS", category: "LOGIC", accent: "bg-violet-500", span: "col-span-12 h-[280px]", icon: <BarChart3 size={18} /> },
];

export default function App() {
  // STATE MANAGEMENT
  const [view, setView] = useState('landing'); // 'landing' | 'testing'
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [selectedCompany, setSelectedCompany] = useState("");

  // NEURAL LINK INITIALIZATION
  const startAptitude = async (company) => {
    setLoading(true);
    setSelectedCompany(company);
    try {
      const res = await axios.get(`http://localhost:8000/generate-aptitude/${company}`);
      setQuestions(res.data);
      setView('testing');
      setCurrentQ(0);
      setUserAnswers({});
    } catch (err) {
      console.error("Link Failed", err);
      alert("Neural Link Interrupted. Ensure backend is active.");
    } finally {
      setLoading(false);
    }
  };

  const selectOption = (opt) => {
    setUserAnswers({ ...userAnswers, [currentQ]: opt });
  };

  return (
    <div className="min-h-screen bg-[#080808] text-slate-400 font-sans selection:bg-cyan-500/30 overflow-x-hidden relative">
      
      {/* 2. ABSTRACT BACKGROUND DECOR */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 blur-[150px] rounded-full" />
      </div>

      {/* 3. HUD NAVIGATION BAR */}
      <nav className="relative z-50 flex justify-between items-center px-10 py-8 border-b border-white/5 backdrop-blur-md bg-black/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded-lg border border-white/10 group hover:border-cyan-500/50 transition-all cursor-pointer">
            <BrainCircuit className="text-white group-hover:text-cyan-400" size={20} />
          </div>
          <span className="text-sm font-bold tracking-[0.3em] text-white uppercase italic">
            Prep_Time! <span className="text-slate-600 text-[10px] ml-2 font-mono uppercase tracking-widest">v1.0.1</span>
          </span>
        </div>

        {view === 'testing' && (
          <div className="flex items-center gap-10">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase italic">Neural_Session</span>
              <span className="text-xs text-white font-bold tracking-widest uppercase italic">{selectedCompany}</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <Activity size={14} className="text-cyan-400 animate-pulse" />
              <span className="text-xs font-mono text-white tracking-widest uppercase">00:19:59</span>
            </div>
          </div>
        )}
      </nav>

      <main className="relative z-10 p-10 max-w-[1600px] mx-auto">
        
        {/* VIEW 1: ABSTRACT BENTO LANDING */}
        {view === 'landing' && !loading && (
          <div className="space-y-16 pt-10 animate-in fade-in duration-700">
            <div className="flex justify-between items-end border-b border-white/5 pb-10">
              <div className="flex flex-col gap-4">
                <span className="text-cyan-500 font-mono text-[10px] tracking-[0.5em] uppercase animate-pulse">Scroll & Explore!</span>
                <h1 className="text-8xl font-black text-white italic tracking-tighter uppercase leading-none">Aptitude Section</h1>
              </div>
              <p className="text-[10px] font-mono text-slate-600 tracking-[0.2em] uppercase text-right max-w-[200px] leading-relaxed">
                Connect to an external assessment module to begin simulation
              </p>
            </div>

            <div className="grid grid-cols-12 gap-4">
              {COMPANIES.map((c) => (
                <div 
                  key={c.id} 
                  onClick={() => startAptitude(c.name)}
                  className={`relative group cursor-pointer overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.01] backdrop-blur-3xl transition-all duration-700 hover:border-white/20 ${c.span}`}
                >
                  <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-1000 ${c.accent}`} />
                  
                  <div className="absolute top-0 inset-x-0 p-8 flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${c.accent} animate-pulse`} />
                      <span className="text-[10px] font-mono tracking-[0.3em] text-slate-500 uppercase">{c.category}</span>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-slate-400 group-hover:text-white group-hover:border-white/20 transition-all">
                      {c.icon}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 p-10 w-full">
                    <h3 className="text-5xl font-black text-white italic tracking-tighter uppercase group-hover:translate-x-3 transition-transform duration-500">
                      {c.name}
                    </h3>
                    <div className="mt-6 h-px w-0 group-hover:w-full bg-gradient-to-r from-white/20 to-transparent transition-all duration-700" />
                    <div className="mt-4 flex items-center gap-3 text-[9px] font-bold text-cyan-400 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 uppercase tracking-widest">
                      Initialize_Link <ChevronRight size={12} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: HUD TESTING INTERFACE */}
        {view === 'testing' && questions.length > 0 && (
          <div className="grid grid-cols-12 gap-10 pt-10 h-full animate-in slide-in-from-bottom-8 duration-700">
            {/* Sidebar Question Nav */}
            <div className="col-span-1 flex flex-col items-center gap-4 border-r border-white/5 pr-10">
              {questions.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentQ(i)}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono text-xs transition-all duration-300
                    ${currentQ === i ? 'bg-white text-black font-black scale-110 shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 
                    userAnswers[i] ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'hover:bg-white/5 text-slate-600'}`}
                >
                  {i + 1 < 10 ? `0${i + 1}` : i + 1}
                </button>
              ))}
              <div className="mt-auto pt-10">
                <button 
                  onClick={() => setView('landing')}
                  className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Assessment Workspace */}
            <div className="col-span-11 space-y-10">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-cyan-500 tracking-[0.4em] uppercase italic">Assessment_Module</span>
                  <h2 className="text-6xl font-black text-white italic tracking-tighter uppercase">{questions[currentQ].category}</h2>
                </div>
                <button className="px-10 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white hover:text-black transition-all text-xs font-black uppercase tracking-widest">Submit_Packet</button>
              </div>

              <div className="p-16 rounded-[4rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" />
                </div>
                
                <p className="text-4xl font-bold text-slate-100 leading-[1.3] max-w-5xl mb-20 italic">
                   {questions[currentQ].question}
                </p>

                <div className="grid grid-cols-2 gap-6 max-w-5xl">
                  {questions[currentQ].options.map((opt, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => selectOption(opt)}
                      className={`group relative p-8 rounded-[2rem] border text-left transition-all duration-300
                        ${userAnswers[currentQ] === opt 
                          ? 'border-cyan-500 bg-cyan-500/10 text-white' 
                          : 'border-white/5 bg-white/[0.03] text-slate-400 hover:border-white/20'}`}
                    >
                      <span className="text-xs font-mono text-slate-600 mb-4 block group-hover:text-cyan-400 transition-colors tracking-widest uppercase italic">
                        Option_{idx + 1}
                      </span>
                      <span className="text-xl font-bold group-hover:translate-x-2 transition-transform inline-block">
                        {opt}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LOADING STATE */}
        {loading && (
          <div className="flex flex-col items-center justify-center h-[60vh] animate-in zoom-in duration-500">
            <Loader2 className="animate-spin text-white mb-6" size={48} />
            <p className="text-[10px] font-mono text-slate-500 tracking-[1em] uppercase animate-pulse">Synchronizing Neural Fragments...</p>
          </div>
        )}
      </main>
    </div>
  );
}
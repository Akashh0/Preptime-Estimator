import React from 'react';
import { BarChart3, ChevronRight, X } from 'lucide-react';

export default function Assessment({ 
  questions, 
  currentQ, 
  setCurrentQ, 
  userAnswers, 
  setUserAnswers,
  onTerminate 
}) {
  const selectOption = (opt) => {
    setUserAnswers({ ...userAnswers, [currentQ]: opt });
  };

  return (
    <div className="grid grid-cols-12 gap-12 pt-10 h-full animate-in slide-in-from-bottom-12 duration-1000">
      
      {/* LEFT SIDEBAR: QUESTION MATRIX */}
      <div className="col-span-1 flex flex-col gap-4 border-r border-white/5 pr-12">
        {questions.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentQ(i)}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center font-mono text-sm transition-all duration-500
            ${currentQ === i 
              ? 'bg-cyan-500 text-black font-black scale-110 shadow-[0_0_30px_rgba(6,182,212,0.4)]' 
              : userAnswers[i] 
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                : 'bg-white/5 border border-white/5 text-slate-600 hover:border-cyan-500/30 hover:text-cyan-400'}`}
          >
            {i + 1 < 10 ? `0${i + 1}` : i + 1}
          </button>
        ))}
        
        <button 
          onClick={onTerminate}
          className="mt-10 w-14 h-14 rounded-2xl flex items-center justify-center bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
        >
          <X size={20} />
        </button>
      </div>

      {/* RIGHT WORKSPACE: HUD & QUESTION */}
      <div className="col-span-11 space-y-12">
        <div className="flex justify-between items-end">
          <div className="space-y-4">
            <span className="text-[11px] font-mono text-cyan-500 tracking-[0.5em] uppercase px-4 py-1.5 bg-cyan-500/5 border border-cyan-500/20 rounded-full italic">
              Module: {questions[currentQ].category}
            </span>
            <h2 className="text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
              Simulation_0{currentQ + 1}
            </h2>
          </div>
          <button className="px-14 py-5 bg-white text-black font-black text-sm uppercase italic rounded-2xl hover:bg-cyan-400 transition-all shadow-2xl shadow-cyan-400/10 active:scale-95">
            Submit_Data_Packet
          </button>
        </div>

        {/* GLASSMORPHIC QUESTION CARD */}
        <div className="p-20 rounded-[4.5rem] bg-[#121216]/60 border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <BarChart3 size={100} className="text-cyan-400" />
          </div>
          
          <p className="text-5xl font-bold text-slate-100 leading-[1.2] max-w-5xl mb-24 italic tracking-tight">
            {questions[currentQ].question}
          </p>

          <div className="grid grid-cols-2 gap-8 max-w-5xl">
            {questions[currentQ].options.map((opt, idx) => (
              <button 
                key={idx} 
                onClick={() => selectOption(opt)}
                className={`group relative p-10 rounded-[2.5rem] border transition-all duration-500 text-left
                ${userAnswers[currentQ] === opt 
                  ? 'border-cyan-400 bg-cyan-500/10 text-white shadow-[0_0_40px_rgba(6,182,212,0.1)]' 
                  : 'border-white/5 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:bg-white/[0.05]'}`}
              >
                <span className={`text-[10px] font-mono mb-6 block uppercase tracking-[0.4em] transition-colors ${userAnswers[currentQ] === opt ? 'text-cyan-400' : 'text-slate-600'}`}>
                  Response_{idx + 1}
                </span>
                <span className="text-2xl font-black italic tracking-tight leading-tight">
                  {opt}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
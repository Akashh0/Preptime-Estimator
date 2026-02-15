import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, ChevronRight, X, CheckCircle2, AlertCircle, Cpu, ShieldCheck, Timer } from 'lucide-react';

export default function Assessment({ 
  questions, currentQ, setCurrentQ, userAnswers, setUserAnswers, onTerminate 
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectOption = (opt) => {
    if (isSubmitted) return;
    setUserAnswers({ ...userAnswers, [currentQ]: opt });
  };

  const calculateResults = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (userAnswers[i] === q.answer) score++;
    });
    return score;
  };

  return (
    <div className="max-w-[1600px] mx-auto h-[85vh] flex flex-col gap-8 animate-in fade-in duration-1000">
      
      {/* HEADER HUD: Professional Stats */}
      <div className="flex justify-between items-end border-b border-white/5 pb-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-cyan-500 font-mono text-[10px] tracking-[0.4em] uppercase">
            <Cpu size={14} className="animate-pulse" />
            <span>{isSubmitted ? 'Evaluation_Complete' : `Active_Simulation: Node_0${currentQ + 1}`}</span>
          </div>
          <h1 className="text-7xl font-black italic tracking-tighter uppercase text-white leading-none">
            {isSubmitted ? `Score_` : `Test_`}<span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>{isSubmitted ? `${calculateResults()}/${questions.length}` : 'Sequence.'}</span>
          </h1>
        </div>

        <div className="flex gap-4 items-center">
          <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest mr-4">
            <Timer size={14} className="text-cyan-400" /> Real-time_Sync
          </div>
          {!isSubmitted ? (
            <button 
              onClick={() => setIsSubmitted(true)}
              className="px-10 py-4 bg-white text-black font-black text-xs uppercase italic rounded-2xl hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-400/10 active:scale-95"
            >
              Submit_Data_Packet
            </button>
          ) : (
            <button 
              onClick={onTerminate}
              className="px-10 py-4 bg-red-500 text-white font-black text-xs uppercase italic rounded-2xl hover:bg-red-600 transition-all shadow-xl shadow-red-500/20"
            >
              Terminate_Link
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 flex-grow overflow-hidden">
        
        {/* LEFT PANEL: Navigation & Progress */}
        <div className="col-span-3 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          <div className="p-8 rounded-[3rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.3em]">Matrix_Status</span>
              <div className="grid grid-cols-4 gap-3">
                {questions.map((q, i) => {
                  const isCorrect = userAnswers[i] === q.answer;
                  return (
                    <button 
                      key={i} 
                      onClick={() => setCurrentQ(i)}
                      className={`h-12 rounded-xl flex items-center justify-center font-mono text-[10px] transition-all duration-500 border
                      ${currentQ === i ? 'scale-110 shadow-lg z-10' : ''}
                      ${isSubmitted 
                        ? isCorrect ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'
                        : currentQ === i ? 'bg-cyan-500 text-black border-cyan-400' : userAnswers[i] ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-white/5 text-slate-700 border-white/5'
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-4">
               <div className="flex items-center gap-3 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                 <ShieldCheck size={12} className="text-cyan-500" /> Integrity_Verified
               </div>
               <p className="text-[10px] text-slate-600 italic leading-relaxed">
                 Selected node: {questions[currentQ].category}. Ensure logical consistency before packet submission.
               </p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Workspace */}
        <div className="col-span-9 rounded-[4rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl relative overflow-y-auto p-16 custom-scrollbar">
          <div className="max-w-4xl space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.5em] italic">// Input_Stream</span>
              <p className="text-4xl font-bold text-white leading-tight italic tracking-tight">
                {questions[currentQ].question}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {questions[currentQ].options.map((opt, idx) => {
                const isCorrectOpt = opt === questions[currentQ].answer;
                const isSelected = userAnswers[currentQ] === opt;
                
                return (
                  <button 
                    key={idx} 
                    onClick={() => selectOption(opt)}
                    className={`group relative p-8 rounded-[2rem] border transition-all duration-500 text-left flex justify-between items-center
                    ${isSubmitted 
                      ? isCorrectOpt ? 'border-green-500 bg-green-500/10 text-white' : isSelected ? 'border-red-500 bg-red-500/10 text-red-400' : 'border-white/5 opacity-40'
                      : isSelected ? 'border-cyan-400 bg-cyan-500/10 text-white shadow-xl shadow-cyan-400/5' : 'border-white/5 bg-white/[0.02] text-slate-500 hover:border-white/20'}`}
                  >
                    <span className="text-xl font-black italic tracking-tight">{opt}</span>
                    <div className="flex items-center gap-3">
                      {isSubmitted && isCorrectOpt && <CheckCircle2 size={20} className="text-green-400" />}
                      {isSubmitted && isSelected && !isCorrectOpt && <AlertCircle size={20} className="text-red-400" />}
                      <span className="text-[9px] font-mono opacity-20 group-hover:opacity-40 uppercase tracking-widest">Option_0{idx + 1}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {isSubmitted && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-10 bg-cyan-500/5 border border-cyan-500/10 rounded-[2.5rem]"
                >
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-4">// Logic_Verification_Output</span>
                  <p className="text-lg text-slate-300 italic font-medium leading-relaxed">
                    {questions[currentQ].explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Cpu, Timer, ListChecks } from 'lucide-react';

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
    <div className="max-w-[1400px] mx-auto h-[85vh] flex flex-col gap-4 py-4 animate-in fade-in duration-500 font-sans">
      
      {/* 1. SIMPLE HEADER */}
      <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 rounded-2xl p-5 backdrop-blur-md">
        <div className="flex items-center gap-8">
          <div className="border-r border-white/10 pr-8">
            <h1 className="text-2xl font-bold tracking-tight uppercase text-white">
              {isSubmitted ? `Final Score: ${calculateResults()} / ${questions.length}` : `Question ${currentQ + 1}`}
            </h1>
            <span className="text-[10px] text-slate-500 font-medium tracking-widest uppercase">
              Aptitude Section // Node: Chennai
            </span>
          </div>
          
          <div className="hidden sm:flex gap-6 opacity-40">
            <div className="flex items-center gap-2 text-[9px] font-mono text-slate-400 uppercase tracking-widest">
              <Cpu size={12} className="text-cyan-500" /> RTX 4050 System
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 font-mono text-[10px] flex items-center gap-2 tracking-widest">
            <Timer size={12}/> {isSubmitted ? 'Completed' : '00:45:00 Remaining'}
          </div>
          {!isSubmitted ? (
            <button 
              onClick={() => setIsSubmitted(true)} 
              className="px-8 py-2.5 bg-white text-black font-bold text-[11px] uppercase rounded-xl hover:bg-cyan-400 transition-all active:scale-95 shadow-lg shadow-white/5"
            >
              Submit Test
            </button>
          ) : (
            <button 
              onClick={onTerminate} 
              className="px-8 py-2.5 bg-red-600 text-white font-bold text-[11px] uppercase rounded-xl hover:bg-red-500 transition-all"
            >
              Close Session
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 flex-grow overflow-hidden">
        
        {/* 2. QUESTION MATRIX */}
        <div className="col-span-12 lg:col-span-1 flex lg:flex-col gap-2 overflow-y-auto custom-scrollbar p-1">
          {questions.map((q, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentQ(i)}
              className={`min-w-[42px] h-11 rounded-lg flex items-center justify-center font-mono text-[11px] transition-all duration-300 border
              ${currentQ === i ? 'scale-105 border-white shadow-lg' : 'border-white/5'}
              ${isSubmitted 
                ? userAnswers[i] === q.answer ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                : currentQ === i ? 'bg-white text-black font-bold' : userAnswers[i] ? 'bg-white/10 text-white' : 'bg-white/5 text-slate-600'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* 3. WORKSPACE */}
        <div className="col-span-12 lg:col-span-11 bg-white/[0.01] border border-white/5 rounded-3xl overflow-hidden relative flex flex-col">
          <div className="flex-grow p-12 overflow-y-auto custom-scrollbar">
            <div className="space-y-12 max-w-4xl">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
                  <ListChecks size={14}/> Question Details
                </div>
                <h2 className="text-3xl font-bold text-white leading-tight tracking-tight italic">
                  {questions[currentQ].question}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[currentQ].options.map((opt, idx) => {
                  const isCorrectOpt = opt === questions[currentQ].answer;
                  const isSelected = userAnswers[currentQ] === opt;
                  return (
                    <button 
                      key={idx} 
                      onClick={() => selectOption(opt)}
                      className={`group p-6 rounded-2xl border transition-all duration-300 text-left flex justify-between items-center
                      ${isSubmitted 
                        ? isCorrectOpt ? 'border-green-500 bg-green-500/10 text-white' : isSelected ? 'border-red-500 bg-red-500/10 text-red-400' : 'border-white/5 opacity-40'
                        : isSelected ? 'border-white bg-white/10 text-white' : 'border-white/5 bg-white/[0.03] text-slate-500 hover:border-white/20'}`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">Option {idx + 1}</span>
                        <span className="text-xl font-bold italic tracking-tight uppercase leading-none">{opt}</span>
                      </div>
                      {isSubmitted && isCorrectOpt && <CheckCircle2 size={20} className="text-green-400" />}
                      {isSubmitted && isSelected && !isCorrectOpt && <AlertCircle size={20} className="text-red-400" />}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {isSubmitted && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-8 bg-white/5 border border-white/10 rounded-2xl">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Solution Analysis</span>
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
    </div>
  );
}
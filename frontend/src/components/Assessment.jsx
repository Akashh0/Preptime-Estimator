import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, ListChecks, ChevronLeft, ChevronRight } from 'lucide-react';

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

  const goNext = () => currentQ < questions.length - 1 && setCurrentQ(currentQ + 1);
  const goPrev = () => currentQ > 0 && setCurrentQ(currentQ - 1);
  const isLastQuestion = currentQ === questions.length - 1;

  return (
    <div className="max-w-[1200px] mx-auto min-h-screen flex flex-col gap-4 py-4 px-4 animate-in fade-in duration-500 font-sans">
      
      {/* 1. CLEAN HEADER: Static timer removed */}
      <div className="flex justify-between items-center bg-white/[0.03] border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
        <div className="flex flex-col">
          <h1 className="text-xl md:text-2xl font-black text-white italic tracking-tighter uppercase leading-none">
            {isSubmitted ? `FINAL_SCORE: ${calculateResults()}/${questions.length}` : "APTITUDE_SIMULATION"}
          </h1>
          <span className="text-[8px] md:text-[10px] text-cyan-500 font-bold tracking-[0.3em] uppercase mt-1 italic">
            {isSubmitted ? "SESSION_COMPLETE" : "SYSTEM_NODE: ACTIVE"}
          </span>
        </div>

        {isSubmitted && (
          <button onClick={onTerminate} className="px-6 py-2 bg-red-600 text-white font-black text-[10px] uppercase rounded-xl active:scale-95 shadow-lg">
            Close_Link
          </button>
        )}
      </div>

      {/* 2. CORE WORKSPACE: COMPACT & ALIGNED */}
      <div className="flex-grow flex flex-col bg-white/[0.01] border border-white/5 rounded-[2rem] overflow-hidden p-6 md:p-12 relative">
        <div className="max-w-3xl mx-auto w-full space-y-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">
              <ListChecks size={14} className="text-cyan-500"/> Logic_Buffer_0{currentQ + 1}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight tracking-tight italic">
              {questions[currentQ].question}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {questions[currentQ].options.map((opt, idx) => {
              const isCorrectOpt = opt === questions[currentQ].answer;
              const isSelected = userAnswers[currentQ] === opt;
              
              return (
                <button 
                  key={idx} 
                  onClick={() => selectOption(opt)}
                  className={`group p-5 rounded-2xl border transition-all duration-300 text-left flex justify-between items-center
                  ${isSubmitted 
                    ? isCorrectOpt ? 'border-green-500 bg-green-500/10 text-white' : isSelected ? 'border-red-500 bg-red-500/10 text-red-400' : 'border-white/5 opacity-30'
                    : isSelected ? 'border-white bg-white/10 text-white shadow-xl' : 'border-white/10 bg-white/[0.02] text-slate-400'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-white' : 'opacity-20'}`}>0{idx + 1}</span>
                    <span className="text-lg font-bold italic tracking-tight uppercase leading-none">{opt}</span>
                  </div>
                  {isSubmitted && isCorrectOpt && <CheckCircle2 size={20} className="text-green-400" />}
                  {isSubmitted && isSelected && !isCorrectOpt && <AlertCircle size={20} className="text-red-400" />}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isSubmitted && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 italic">// Verification_Logic</span>
                <p className="text-sm md:text-lg text-slate-300 italic font-medium leading-relaxed">
                  {questions[currentQ].explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 3. PAGINATION & SELECTIVE SUBMIT */}
      <div className="flex flex-col items-center gap-6 pb-8 pt-4">
        
        {isLastQuestion && !isSubmitted && (
          <motion.button 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            onClick={() => setIsSubmitted(true)}
            className="w-full max-w-md py-4 bg-white text-black font-black text-xs uppercase italic rounded-2xl shadow-xl hover:bg-cyan-400 transition-all active:scale-95 mb-4"
          >
            Final_Submit_Assessment
          </motion.button>
        )}

        <div className="flex items-center justify-center gap-8 w-full">
          <button 
            onClick={goPrev} 
            disabled={currentQ === 0}
            className="p-4 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-10 hover:bg-white/10 active:scale-90"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex flex-col items-center min-w-[100px]">
            <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.4em] mb-1 italic italic">Node</span>
            <div className="text-2xl font-black text-white italic tracking-tighter">
              {currentQ + 1} <span className="text-white/20">/</span> {questions.length}
            </div>
          </div>

          <button 
            onClick={goNext} 
            disabled={isLastQuestion}
            className="p-4 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-10 hover:bg-white/10 active:scale-90"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
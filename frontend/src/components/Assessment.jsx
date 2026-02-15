import React, { useState } from 'react';
import { BarChart3, ChevronRight, X, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Assessment({ 
  questions, currentQ, setCurrentQ, userAnswers, setUserAnswers, onTerminate 
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectOption = (opt) => {
    if (isSubmitted) return; // Lock answers after submission
    setUserAnswers({ ...userAnswers, [currentQ]: opt });
  };

  // Calculate Score
  const calculateResults = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (userAnswers[i] === q.answer) score++;
    });
    return score;
  };

  return (
    <div className="grid grid-cols-12 gap-12 pt-10 h-full animate-in slide-in-from-bottom-12 duration-1000">
      
      {/* LEFT SIDEBAR: MATRIX */}
      <div className="col-span-1 flex flex-col gap-4 border-r border-white/5 pr-12">
        {questions.map((q, i) => {
          const isCorrect = userAnswers[i] === q.answer;
          return (
            <button 
              key={i} 
              onClick={() => setCurrentQ(i)}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center font-mono text-sm transition-all duration-500
              ${currentQ === i ? 'scale-110 shadow-xl z-10' : ''}
              ${isSubmitted 
                ? isCorrect ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                : currentQ === i ? 'bg-cyan-500 text-black font-black' : userAnswers[i] ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-slate-600'
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* RIGHT WORKSPACE */}
      <div className="col-span-11 space-y-12 pb-20">
        <div className="flex justify-between items-end">
          <div className="space-y-4">
            <h2 className="text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
              {isSubmitted ? `Score: ${calculateResults()}/${questions.length}` : `Simulation_0${currentQ + 1}`}
            </h2>
          </div>
          {!isSubmitted ? (
            <button 
              onClick={() => setIsSubmitted(true)}
              className="px-14 py-5 bg-white text-black font-black text-sm uppercase italic rounded-2xl hover:bg-cyan-400 transition-all active:scale-95"
            >
              Submit_Data_Packet
            </button>
          ) : (
            <button 
              onClick={onTerminate}
              className="px-14 py-5 bg-red-500 text-white font-black text-sm uppercase italic rounded-2xl hover:bg-red-600 transition-all"
            >
              Terminate_Session
            </button>
          )}
        </div>

        {/* QUESTION CARD */}
        <div className="p-20 rounded-[4.5rem] bg-[#121216]/60 border border-white/10 backdrop-blur-3xl relative overflow-hidden">
          <p className="text-5xl font-bold text-slate-100 leading-[1.2] mb-24 italic tracking-tight">
            {questions[currentQ].question}
          </p>

          <div className="grid grid-cols-2 gap-8">
            {questions[currentQ].options.map((opt, idx) => {
              const isCorrectOpt = opt === questions[currentQ].answer;
              const isSelected = userAnswers[currentQ] === opt;
              
              return (
                <button 
                  key={idx} 
                  onClick={() => selectOption(opt)}
                  className={`relative p-10 rounded-[2.5rem] border transition-all duration-500 text-left
                  ${isSubmitted 
                    ? isCorrectOpt ? 'border-green-500 bg-green-500/10' : isSelected ? 'border-red-500 bg-red-500/10' : 'border-white/5 opacity-40'
                    : isSelected ? 'border-cyan-400 bg-cyan-500/10 text-white' : 'border-white/5 bg-white/[0.03]'}`}
                >
                  <span className="text-2xl font-black italic tracking-tight">{opt}</span>
                  {isSubmitted && isCorrectOpt && <CheckCircle2 className="absolute top-10 right-10 text-green-400" />}
                  {isSubmitted && isSelected && !isCorrectOpt && <AlertCircle className="absolute top-10 right-10 text-red-400" />}
                </button>
              );
            })}
          </div>

          {/* EXPLANATION HUD (Shows after submission) */}
          {isSubmitted && (
            <div className="mt-16 p-10 bg-cyan-500/5 border border-cyan-500/20 rounded-[2.5rem] animate-in fade-in slide-in-from-top-4 duration-700">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-4">// Logic_Proof</span>
              <p className="text-lg text-slate-300 italic font-medium">
                {questions[currentQ].explanation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
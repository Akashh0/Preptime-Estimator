import React, { useState, useRef } from 'react';
import { Zap, Building2, ArrowRight, Loader2, Target, Cpu, Terminal, AlertCircle, RefreshCw, CheckCircle2, XCircle, Info } from 'lucide-react';
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
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission
  const [score, setScore] = useState(0);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
    containerRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
  };

  const fetchAptitudeSystem = async (company) => {
    setLoading(true);
    setError(null);
    setSelectedCompany(company);
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(0);
    
    try {
      const res = await axios.get(`http://localhost:8000/generate-aptitude/${company}`);
      if (Array.isArray(res.data)) {
        setQuestions(res.data);
      } else {
        throw new Error("Invalid format");
      }
    } catch (e) {
      setError("Neural Link Failed: The model is recalibrating. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  const selectOption = (questionId, option) => {
    if (isSubmitted) return; // Prevent changing answers after submission
    setUserAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleFinalSubmit = () => {
    let finalScore = 0;
    questions.forEach((q, i) => {
      if (userAnswers[i] === q.answer) {
        finalScore++;
      }
    });
    setScore(finalScore);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove} 
      className="min-h-screen bg-[#030303] text-white overflow-x-hidden font-sans selection:bg-cyan-500/30 pb-32"
    >
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0" 
           style={{ background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(0, 240, 255, 0.15), transparent 80%)` }} />

      <nav className="relative z-50 flex justify-between items-center px-12 py-10 max-w-[1600px] mx-auto">
        <div className="text-3xl font-black italic tracking-tighter flex items-center gap-2">
          <Zap className="text-cyan-400 fill-cyan-400" /> PREP-TIME!
        </div>
        {questions.length > 0 && (
          <div className="flex gap-4">
            <div className="bg-white/5 border border-white/10 px-6 py-2 rounded-full font-mono text-xs tracking-widest text-cyan-400">
              {isSubmitted ? `FINAL SCORE: ${score} / ${questions.length}` : `PROGRESS: ${Object.keys(userAnswers).length} / ${questions.length}`}
            </div>
          </div>
        )}
      </nav>

      <main className="relative z-10 px-10 max-w-[1400px] mx-auto">
        <header className="pt-12 pb-20 text-center">
          <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter leading-[0.75] mb-8 italic text-white uppercase">
            {isSubmitted ? "RESULTS." : questions.length > 0 ? selectedCompany : "APTI-LAB."}
          </h1>
          
          {isSubmitted && (
             <div className="text-4xl font-mono text-cyan-400 mb-8 animate-pulse">
                SCORE_ACHIEVED: {Math.round((score / questions.length) * 100)}%
             </div>
          )}

          <p className="max-w-xl mx-auto text-lg text-slate-500 font-mono tracking-widest uppercase mb-12">
            {loading ? "// Syncing with Neural Router..." : isSubmitted ? "// Reviewing logic paths and calculations" : questions.length > 0 ? "// General Scenario Assessment Active" : "// Target a system to generate questions"}
          </p>

          {loading && (
            <div className="flex flex-col items-center gap-6 mt-12">
              <Loader2 className="animate-spin text-cyan-400" size={64} />
              <p className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] animate-pulse">EXTRACTING MATHEMATICAL TRUTH...</p>
            </div>
          )}

          {error && !loading && (
            <div className="mt-10 max-w-md mx-auto p-8 rounded-[2.5rem] bg-red-500/5 border border-red-500/20 backdrop-blur-xl">
              <AlertCircle className="text-red-500 mx-auto mb-4" size={40} />
              <p className="text-sm text-slate-400 mb-8 leading-relaxed">{error}</p>
              <button onClick={() => fetchAptitudeSystem(selectedCompany)} className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-2xl text-xs font-bold transition-all border border-red-500/20 text-white">
                <RefreshCw size={16} /> RE-INITIALIZE SYSTEM
              </button>
            </div>
          )}
        </header>

        {/* 1. SELECTION GRID */}
        {!loading && questions.length === 0 && !error && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {COMPANIES.map((company) => (
              <div 
                key={company.name}
                onClick={() => fetchAptitudeSystem(company.name)}
                className="group p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-cyan-400/50 cursor-pointer transition-all duration-700 backdrop-blur-3xl relative overflow-hidden"
              >
                <div className="mb-10 p-5 bg-white/5 w-fit rounded-[1.5rem] group-hover:scale-110 group-hover:bg-cyan-400/10 transition-all duration-500">
                  {company.icon}
                </div>
                <h3 className="text-4xl font-black mb-3 italic tracking-tighter">{company.name}</h3>
                <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-12">{company.pattern}</p>
                <div className="flex items-center gap-3 text-[10px] font-black text-cyan-400 opacity-40 group-hover:opacity-100 transition-all">
                  GENERATE QUESTIONS <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. QUESTION VIEW */}
        {questions.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
             <div className="flex justify-between items-center mb-16">
                <button 
                  onClick={() => {setQuestions([]); setError(null); setIsSubmitted(false);}} 
                  className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest"
                >
                  <ArrowRight className="rotate-180" size={14} /> Close Assessment
                </button>
                <div className="flex gap-2">
                  <span className={`w-2 h-2 rounded-full ${isSubmitted ? 'bg-green-500' : 'bg-cyan-400 animate-pulse'}`}></span>
                  <span className="font-mono text-[10px] text-slate-500 tracking-tighter uppercase">{isSubmitted ? 'Assessment_Complete' : 'Live_Neural_Stream'}</span>
                </div>
             </div>
            
            {questions.map((q, i) => (
              <div key={i} className={`p-12 rounded-[3.5rem] bg-white/[0.02] border transition-all duration-500 backdrop-blur-3xl relative ${
                isSubmitted 
                ? (userAnswers[i] === q.answer ? 'border-green-500/40' : 'border-red-500/40') 
                : (userAnswers[i] ? 'border-cyan-400/40' : 'border-white/5')
              }`}>
                
                <div className="flex justify-between items-start mb-10">
                  <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    {q.category || "Logical Reasoning"}
                  </span>
                  {isSubmitted ? (
                    userAnswers[i] === q.answer ? <CheckCircle2 size={24} className="text-green-500" /> : <XCircle size={24} className="text-red-500" />
                  ) : (
                    userAnswers[i] && <CheckCircle2 size={24} className="text-cyan-400 animate-in zoom-in" />
                  )}
                </div>

                <h4 className="text-2xl font-bold mb-12 text-slate-100 leading-relaxed">
                  {q.question}
                </h4>

                <div className="grid grid-cols-1 gap-4">
                  {q.options.map((opt, idx) => {
                    const isSelected = userAnswers[i] === opt;
                    const isCorrect = opt === q.answer;
                    
                    return (
                      <button 
                        key={idx} 
                        disabled={isSubmitted}
                        onClick={() => selectOption(i, opt)}
                        className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex justify-between items-center ${
                          isSelected && !isSubmitted ? 'border-cyan-400 bg-cyan-400/10' : 
                          isSubmitted && isCorrect ? 'border-green-500 bg-green-500/20 text-white' :
                          isSubmitted && isSelected && !isCorrect ? 'border-red-500 bg-red-500/20 text-white' :
                          'border-white/5 bg-white/[0.01] text-slate-400 hover:border-white/20'
                        }`}
                      >
                        <span className="text-lg font-medium">{opt}</span>
                        {isSubmitted && isCorrect && <CheckCircle2 size={16} className="text-green-500" />}
                      </button>
                    );
                  })}
                </div>

                {/* SHOW EXPLANATION AFTER SUBMISSION */}
                {isSubmitted && q.explanation && (
                  <div className="mt-10 p-8 rounded-3xl bg-white/5 border border-white/10 flex gap-4">
                    <Info className="text-cyan-400 shrink-0" size={20} />
                    <div className="text-sm text-slate-400 leading-relaxed">
                      <strong className="text-cyan-400 block mb-2 uppercase tracking-widest text-[10px]">Logical Step-Through:</strong>
                      {q.explanation}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* SUBMIT OR RESTART */}
            {!isSubmitted ? (
              <div className="pt-20 pb-32 flex flex-col items-center">
                <button 
                  onClick={handleFinalSubmit}
                  className="px-16 py-6 bg-white text-black font-black italic text-xl rounded-full hover:bg-cyan-400 hover:scale-105 transition-all shadow-2xl shadow-white/10"
                >
                  SUBMIT ASSESSMENT
                </button>
                <p className="mt-6 text-slate-500 font-mono text-[10px] uppercase tracking-widest animate-pulse">Final Verification Required</p>
              </div>
            ) : (
              <div className="pt-20 pb-32 flex flex-col items-center">
                <button 
                  onClick={() => {setQuestions([]); setIsSubmitted(false);}}
                  className="px-16 py-6 border border-white/20 text-white font-black italic text-xl rounded-full hover:bg-white hover:text-black transition-all"
                >
                  RETRY NEW SCENARIOS
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
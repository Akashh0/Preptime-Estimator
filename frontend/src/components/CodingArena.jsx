import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, Layers, Cpu, Database, ChevronRight } from 'lucide-react';
import ProblemWorkspace from './ProblemWorkspace';

const TOPICS = [
  { id: 1, name: "Arrays & Hashing", problems: 12, category: "Data_Structures", desc: "Construct high-efficiency data mapping systems.", accent: "#8b5cf6" }, // Purple
  { id: 2, name: "Two Pointers", problems: 8, category: "Algorithm_Design", desc: "Execute dual-stream search optimization.", accent: "#ec4899" }, // Pink
  { id: 3, name: "Sliding Window", problems: 5, category: "Optimization", desc: "Synthesize dynamic frame calculations.", accent: "#06b6d4" }, // Cyan
  { id: 4, name: "Trees & Graphs", problems: 20, category: "Non-Linear_Logic", desc: "Map non-linear hierarchical nodes.", accent: "#f59e0b" }, // Amber
];

export default function CodingArena() {
  const [view, setView] = useState('roadmap');
  const [loading, setLoading] = useState(false);
  const [activeProblem, setActiveProblem] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState("");
  
  const [problemsCache, setProblemsCache] = useState(() => {
    const savedCache = localStorage.getItem('neural_problems_cache');
    return savedCache ? JSON.parse(savedCache) : {};
  });

  useEffect(() => {
    localStorage.setItem('neural_problems_cache', JSON.stringify(problemsCache));
  }, [problemsCache]);

  const fetchTopicProblems = async (topic) => {
    if (problemsCache[topic.name]) {
      setSelectedTopic(topic.name);
      setView('problem-list');
      return;
    }
    setLoading(true);
    setSelectedTopic(topic.name);
    try {
      const res = await axios.get(`http://localhost:8000/generate-coding/${topic.name}`);
      // Safety check for data array
      const data = Array.isArray(res.data) ? res.data : (res.data.problems || res.data.questions || []);
      setProblemsCache(prev => ({ ...prev, [topic.name]: data }));
      setView('problem-list');
    } catch (err) {
      console.error("Neural Link Failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] px-6">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
        <Zap className="text-purple-500 mb-6" size={48} />
      </motion.div>
      <p className="font-mono text-purple-400 text-[10px] md:text-sm tracking-[0.4em] animate-pulse uppercase italic text-center">Syncing_Neural_Vault</p>
    </div>
  );

  if (view === 'workspace' && activeProblem) {
    return <ProblemWorkspace problem={activeProblem} onBack={() => setView('problem-list')} />;
  }

  return (
    <div className="space-y-12 md:space-y-24 pt-16 md:pt-10 animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-[1600px] mx-auto px-4 md:px-0">
      
      {/* HEADER HUD */}
      <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-12 border-l border-white/10 pl-6 md:pl-10 ml-2 md:ml-4">
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-3 text-purple-500 font-mono text-[8px] md:text-[10px] tracking-[0.3em] uppercase font-bold">
            <Activity size={12} className="animate-pulse" />
            <span>{view === 'roadmap' ? 'Architecture_Selection_Active' : `Node: ${selectedTopic}`}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
            {view === 'roadmap' ? 'Coding' : 'Problem'}<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
              {view === 'roadmap' ? 'Arena.' : 'Set.'}
            </span>
          </h1>
        </div>
        
        <div className="max-w-md text-left lg:text-right space-y-3 opacity-60 italic text-[10px] font-mono tracking-widest text-slate-500 uppercase">
          {view === 'roadmap' 
                ? "// Target a synchronization node to reconstruct DSA patterns." 
                : "// Initialize compiler link to validate logic nodes."}
        </div>
      </div>

      {/* CORE GRID */}
      <div className="flex flex-col md:grid md:grid-cols-12 md:auto-rows-fr gap-5 md:gap-10 pb-20">
        {view === 'roadmap' ? (
          TOPICS.map((topic, i) => (
            <div 
              key={topic.id} 
              onClick={() => fetchTopicProblems(topic)}
              className="group relative cursor-pointer active:scale-95 transition-all col-span-12 md:col-span-6 flex"
            >
              {/* SHINE EFFECT OVERLAY */}
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem]">
                <div className="absolute -inset-full top-[-100%] left-[-100%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] transition-transform duration-1000 group-hover:translate-x-[100%] group-hover:translate-y-[100%]" />
              </div>

              {/* CARD CONTAINER */}
              <div 
                className="relative flex-grow w-full overflow-hidden bg-white/[0.01] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 flex flex-col justify-between min-h-[280px] md:min-h-[400px] transition-all duration-500 group-hover:bg-white/[0.03]"
                style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = topic.accent}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
              >
                <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[120px] opacity-0 group-hover:opacity-20 transition-opacity duration-700" style={{ backgroundColor: topic.accent }} />

                <div className="relative flex justify-between items-start z-10">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono uppercase tracking-widest block font-black italic" style={{ color: topic.accent }}>Node_0{i+1}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">{topic.category}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 transition-all duration-500 group-hover:scale-110" style={{ color: 'gray' }} onMouseEnter={(e) => e.currentTarget.style.color = topic.accent} onMouseLeave={(e) => e.currentTarget.style.color = 'gray'}>
                    <Layers size={20}/>
                  </div>
                </div>

                <div className="relative space-y-4 md:space-y-6 mt-12 md:mt-0 z-10">
                  <h3 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none group-hover:translate-x-3 transition-transform duration-500">
                    {topic.name}
                  </h3>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-5 flex-grow">
                      <div className="h-px w-4 group-hover:w-16 transition-all duration-700" style={{ backgroundColor: topic.accent }} />
                      <span className="text-[8px] md:text-[9px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-all uppercase tracking-widest italic">
                        {problemsCache[topic.name] ? 'VAULTED' : 'INITIALIZE'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          /* PROBLEM LIST VIEW */
          Array.isArray(problemsCache[selectedTopic]) && problemsCache[selectedTopic].map((prob, index) => (
            <div 
              key={index}
              onClick={() => { setActiveProblem(prob); setView('workspace'); }}
              className="col-span-12 md:col-span-4 group relative cursor-pointer active:scale-95 transition-all"
            >
              <div className="p-8 md:p-12 rounded-[2.5rem] bg-white/[0.01] border border-white/10 backdrop-blur-3xl h-[240px] md:h-[300px] flex flex-col justify-between overflow-hidden group-hover:border-purple-500/30 transition-all">
                <div className="flex justify-between items-start">
                  <span className="text-[8px] font-mono text-purple-500 border border-purple-500/30 px-3 py-1 rounded-full uppercase tracking-widest italic font-bold">{prob.difficulty || 'Medium'}</span>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none group-hover:translate-x-2 transition-transform">
                    {prob.name || prob.question || "Untitled Thread"}
                  </h4>
                  <div className="mt-6 flex items-center gap-3 text-[10px] font-mono text-slate-500 group-hover:text-purple-400 transition-colors uppercase tracking-[0.3em] font-bold">
                    Execute_Kernel <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
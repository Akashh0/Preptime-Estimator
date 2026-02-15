import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code2, GitMerge, Loader2, ChevronRight, CheckCircle2, Activity, Zap, Layers, Cpu } from 'lucide-react';
import ProblemWorkspace from './ProblemWorkspace';

const TOPICS = [
  { id: 1, name: "Arrays & Hashing", status: "unlocked", problems: 12, diff: "Foundation", desc: "Master the building blocks of efficient data storage and retrieval." },
  { id: 2, name: "Two Pointers", status: "unlocked", problems: 8, diff: "Basic", desc: "Optimize linear searches and array manipulations with dual-index logic." },
  { id: 3, name: "Sliding Window", status: "unlocked", problems: 5, diff: "Medium", desc: "Efficiently handle subarray and substring calculations within a dynamic frame." },
  { id: 4, name: "Trees & Graphs", status: "unlocked", problems: 20, diff: "Advanced", desc: "Navigate complex hierarchical and interconnected data structures." },
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
      setProblemsCache(prev => ({ ...prev, [topic.name]: res.data }));
      setView('problem-list');
    } catch (err) {
      console.error("Neural Link Failed", err);
    } finally {
      setLoading(false);
    }
  };

  const clearCache = () => {
    localStorage.removeItem('neural_problems_cache');
    setProblemsCache({});
    setView('roadmap');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
          <Zap className="text-purple-500 mb-8" size={60} />
        </motion.div>
        <p className="font-mono text-purple-400 tracking-[0.8em] animate-pulse uppercase">Syncing_Neural_Vault</p>
      </div>
    );
  }

  if (view === 'workspace' && activeProblem) {
    return <ProblemWorkspace problem={activeProblem} onBack={() => setView('problem-list')} />;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 max-w-[1600px] mx-auto space-y-12">
      
      {/* HEADER HUD: PROFESSIONAL HIERARCHY */}
      <div className="flex justify-between items-start border-b border-white/5 pb-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-purple-500 font-mono text-[10px] tracking-[0.4em] uppercase">
            <Activity size={14} className="animate-pulse" />
            <span>{view === 'roadmap' ? 'Architecture_Link_Stable' : `Session_Node: ${selectedTopic}`}</span>
          </div>
          <h1 className="text-7xl font-black italic tracking-tighter uppercase text-white leading-none">
            {view === 'roadmap' ? 'Coding' : 'Problem'}<span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>_Arena.</span>
          </h1>
        </div>

        <div className="flex flex-col items-end gap-4">
           <div className="flex gap-3">
             <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
               <Cpu size={10} className="inline mr-2 text-purple-400" /> RTX_4050_Active
             </div>
           </div>
          {view === 'roadmap' ? (
            <button onClick={clearCache} className="px-6 py-2 bg-red-500/5 border border-red-500/20 text-red-500/60 rounded-xl font-mono text-[9px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-500">
              Flush_Vault_Cache
            </button>
          ) : (
            <button onClick={() => setView('roadmap')} className="px-6 py-2 bg-white/5 border border-white/10 text-white/60 rounded-xl font-mono text-[9px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              Return_to_Roadmap
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: SYMMETRIC GRID ROADMAP */}
      {view === 'roadmap' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-4">
          {TOPICS.map((topic, idx) => (
            <motion.div 
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => fetchTopicProblems(topic)}
              className="group relative p-10 rounded-[3.5rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl hover:border-purple-500/40 transition-all duration-700 cursor-pointer overflow-hidden flex gap-8"
            >
              {/* ICON BLOCK */}
              <div className={`w-24 h-24 rounded-3xl border flex flex-shrink-0 items-center justify-center transition-all duration-700
                ${problemsCache[topic.name] ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_30px_rgba(168,85,247,0.2)]' : 'bg-white/5 border-white/10 text-slate-600 group-hover:border-purple-500/30 group-hover:text-purple-400'}`}>
                <Layers size={32} />
              </div>

              {/* CONTENT BLOCK */}
              <div className="flex-grow space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-purple-500 uppercase tracking-[0.3em] mb-1 block italic">{topic.diff}</span>
                    <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">{topic.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-mono text-slate-600 uppercase block tracking-widest">Logic_Nodes</span>
                    <span className="text-xl font-bold text-white">{topic.problems}</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium line-clamp-2 pr-12">
                  {topic.desc}
                </p>
                {problemsCache[topic.name] && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full w-fit">
                    <CheckCircle2 size={10} className="text-green-400" />
                    <span className="text-[8px] font-mono text-green-400 uppercase tracking-[0.2em] font-bold">Vaulted_Ready</span>
                  </div>
                )}
              </div>
              
              <ChevronRight className="absolute right-8 top-1/2 -translate-y-1/2 text-white/5 group-hover:text-purple-500 group-hover:translate-x-2 transition-all" size={24} />
            </motion.div>
          ))}
        </div>
      )}

      {/* VIEW 2: PROBLEM SELECTION LIST */}
      {view === 'problem-list' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problemsCache[selectedTopic]?.map((prob, index) => (
            <motion.button 
              key={index}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => { setActiveProblem(prob); setView('workspace'); }}
              className="group p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl text-left hover:border-purple-500/40 transition-all duration-500 shadow-xl relative overflow-hidden h-[280px] flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-mono text-purple-500 border border-purple-500/30 px-3 py-1 rounded-full uppercase tracking-widest italic">{prob.difficulty}</span>
                <span className="text-[9px] font-mono text-slate-700">NODE_0{index + 1}</span>
              </div>
              <div>
                <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none group-hover:text-purple-400 transition-colors">{prob.name}</h4>
                <div className="mt-6 flex items-center gap-3 text-[10px] font-mono text-slate-500 group-hover:text-purple-500 transition-colors uppercase tracking-[0.3em]">
                  Initialize_Session <ChevronRight size={14} />
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
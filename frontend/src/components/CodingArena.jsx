import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code2, GitMerge, Loader2, ChevronRight, CheckCircle2, Activity, Zap } from 'lucide-react';
import ProblemWorkspace from './ProblemWorkspace';

const TOPICS = [
  { id: 1, name: "Arrays & Hashing", status: "unlocked", problems: 12, diff: "Foundation" },
  { id: 2, name: "Two Pointers", status: "unlocked", problems: 8, diff: "Basic" },
  { id: 3, name: "Sliding Window", status: "unlocked", problems: 5, diff: "Medium" },
  { id: 4, name: "Trees & Graphs", status: "unlocked", problems: 20, diff: "Advanced" },
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
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <Zap className="text-purple-500 mb-8" size={60} />
        </motion.div>
        <p className="font-mono text-purple-400 tracking-[0.8em] animate-pulse uppercase">Syncing_Neural_Vault</p>
      </div>
    );
  }

  if (view === 'workspace' && activeProblem) {
    return (
      <ProblemWorkspace 
        problem={activeProblem} 
        onBack={() => setView('problem-list')} 
      />
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="p-12 max-w-[1400px] mx-auto space-y-16"
    >
      {/* HEADER HUD */}
      <div className="flex justify-between items-end border-b border-white/5 pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-purple-500 font-mono text-[10px] tracking-[0.4em] uppercase">
            <Activity size={14} className="animate-pulse" />
            <span>{view === 'roadmap' ? 'Compiler_Link_Established' : `Node: ${selectedTopic}`}</span>
          </div>
          <h1 className="text-8xl font-black italic tracking-tighter uppercase text-white leading-none">
            {view === 'roadmap' ? 'Coding_' : 'Problem_'}<span className="text-outline-white text-transparent opacity-40">Arena</span>
          </h1>
        </div>

        <div className="flex gap-4 pb-2">
          {Object.keys(problemsCache).length > 0 && view === 'roadmap' && (
            <button 
              onClick={clearCache}
              className="px-8 py-3 bg-red-500/5 border border-red-500/20 text-red-500/60 rounded-2xl font-mono text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-500"
            >
              Purge_Vault
            </button>
          )}
          {view === 'problem-list' && (
            <button 
              onClick={() => setView('roadmap')}
              className="px-8 py-3 bg-white/5 border border-white/10 text-white/60 rounded-2xl font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500"
            >
              Back_to_Roadmap
            </button>
          )}
        </div>
      </div>

      {/* ROADMAP VIEW: ORGANIZED LINEAR TRACK */}
      {view === 'roadmap' && (
        <div className="relative space-y-8 py-10">
          <div className="absolute left-[59px] top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-purple-500/10 to-transparent" />
          
          <AnimatePresence>
            {TOPICS.map((topic, idx) => (
              <motion.div 
                key={topic.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => fetchTopicProblems(topic)}
                className="relative flex items-center gap-12 group cursor-pointer"
              >
                {/* INDICATOR NODE */}
                <div className={`relative z-10 w-28 h-28 rounded-[2rem] border flex items-center justify-center transition-all duration-700
                  ${problemsCache[topic.name] 
                    ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_40px_rgba(168,85,247,0.3)]' 
                    : 'bg-[#0d0d10] border-white/5 text-slate-700 group-hover:border-purple-500/50'}`}>
                  <GitMerge size={32} className={problemsCache[topic.name] ? 'animate-pulse' : ''} />
                </div>

                {/* CONTENT PLATE */}
                <div className="flex-grow p-10 rounded-[3.5rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl group-hover:bg-white/[0.03] group-hover:border-white/10 transition-all duration-700 flex justify-between items-center shadow-2xl">
                  <div>
                    <span className="text-[10px] font-mono text-purple-500 uppercase tracking-widest mb-3 block italic">{topic.diff}</span>
                    <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">{topic.name}</h3>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Logic_Nodes: {topic.problems}</span>
                    {problemsCache[topic.name] && (
                      <div className="flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                        <CheckCircle2 size={12} className="text-green-400" />
                        <span className="text-[8px] font-mono text-green-400 uppercase tracking-[0.2em] font-bold">Vaulted</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* PROBLEM LIST VIEW: SLEEK GRID */}
      {view === 'problem-list' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {problemsCache[selectedTopic]?.map((prob, index) => (
            <motion.button 
              key={index}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => { setActiveProblem(prob); setView('workspace'); }}
              className="group p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl text-left hover:border-purple-500/40 transition-all duration-500 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Code2 size={80} className="text-white" />
              </div>
              
              <div className="flex justify-between items-start mb-10">
                <span className="text-[9px] font-mono text-purple-500 border border-purple-500/30 px-3 py-1 rounded-full uppercase tracking-widest italic">{prob.difficulty}</span>
                <span className="text-[9px] font-mono text-slate-700">NODE_0{index + 1}</span>
              </div>
              <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-6 leading-none group-hover:text-purple-400 transition-colors">{prob.name}</h4>
              <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 group-hover:text-purple-500 transition-colors uppercase tracking-[0.3em]">
                Initialize_Stream <ChevronRight size={14} />
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
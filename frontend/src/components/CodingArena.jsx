import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code2, GitMerge, Loader2, ChevronRight, CheckCircle2, Activity, Zap, Layers, Cpu, Database, Globe } from 'lucide-react';
import ProblemWorkspace from './ProblemWorkspace';

const TOPICS = [
  { id: 1, name: "Arrays & Hashing", problems: 12, diff: "Foundation", category: "Data_Structures", desc: "Construct high-efficiency data mapping systems. Reconstruct the base logic for O(1) retrieval patterns." },
  { id: 2, name: "Two Pointers", problems: 8, diff: "Basic", category: "Algorithm_Design", desc: "Execute dual-stream search optimization. Parallelize linear traversals to bypass O(n²) bottlenecks." },
  { id: 3, name: "Sliding Window", problems: 5, diff: "Medium", category: "Optimization", desc: "Synthesize dynamic frame calculations. Stabilize fluid data subsets across high-frequency streams." },
  { id: 4, name: "Trees & Graphs", problems: 20, diff: "Advanced", category: "Non-Linear_Logic", desc: "Map non-linear hierarchical nodes. Resolve complex interconnected dependency matrices." },
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

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
        <Zap className="text-purple-500 mb-8" size={60} />
      </motion.div>
      <p className="font-mono text-purple-400 tracking-[0.8em] animate-pulse uppercase italic">Syncing_Neural_Vault</p>
    </div>
  );

  if (view === 'workspace' && activeProblem) {
    return <ProblemWorkspace problem={activeProblem} onBack={() => setView('problem-list')} />;
  }

  return (
    <div className="space-y-24 pt-10 animate-in fade-in slide-in-from-bottom-10 duration-1000 max-w-[1600px] mx-auto">
      
      {/* HEADER: SYMMETRIC & PROFESSIONAL (Aptitude Vault Style) */}
      <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-l border-white/10 pl-10 ml-4">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-purple-500 font-mono text-[10px] tracking-[0.4em] uppercase font-bold">
            <Activity size={14} className="animate-pulse" />
            <span>{view === 'roadmap' ? 'Architecture_Selection_Active' : `Session_Node: ${selectedTopic}`}</span>
          </div>
          <h1 className="text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
            {view === 'roadmap' ? 'Coding' : 'Problem'}<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}>
              {view === 'roadmap' ? 'Arena.' : 'Set.'}
            </span>
          </h1>
        </div>
        
        <div className="max-w-md text-left lg:text-right space-y-4">
          <p className="text-[11px] font-mono text-slate-500 tracking-[0.2em] uppercase leading-relaxed italic">
            // {view === 'roadmap' 
                ? "Target a synchronization node to reconstruct historical DSA patterns and neural threads." 
                : "Initialize compiler link to validate logic against industry-standard test cases."}
          </p>
          <div className="flex lg:justify-end gap-6 opacity-30">
            <div className="flex items-center gap-2 text-[8px] font-mono text-white tracking-widest">
                <Cpu size={10} className="text-purple-400"/> RTX_4050_KERNEL
            </div>
            <div className="flex items-center gap-2 text-[8px] font-mono text-white tracking-widest">
                <Database size={10} className="text-cyan-400"/> CACHE_SYNCED
            </div>
          </div>
        </div>
      </div>

      {/* STRUCTURED BENTO GRID FOR ROADMAP */}
      <div className="grid grid-cols-12 gap-6 px-4 pb-20">
        {view === 'roadmap' ? (
          TOPICS.map((topic, i) => (
            <div 
              key={topic.id} 
              onClick={() => fetchTopicProblems(topic)}
              className="col-span-12 md:col-span-6 group relative cursor-pointer transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="relative h-full w-full overflow-hidden bg-white/[0.01] border border-white/5 backdrop-blur-3xl rounded-[3rem] transition-all duration-700 group-hover:border-purple-500/30 shadow-2xl p-10 flex flex-col justify-between min-h-[350px]">
                
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-purple-500/60 uppercase tracking-widest block font-bold italic">Node_Ref: 0x0{i+1}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] italic">{topic.category}</span>
                  </div>
                  <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 transition-all duration-500
                    ${problemsCache[topic.name] ? 'text-purple-400 border-purple-500/20 bg-purple-500/5' : 'text-slate-600 group-hover:text-purple-400'}`}>
                    <Layers size={20}/>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none transition-transform duration-500 group-hover:translate-x-2">
                    {topic.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium line-clamp-2 pr-12">
                    {topic.desc}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-bold text-slate-500 group-hover:text-purple-400 transition-all uppercase tracking-[0.4em]">
                        {problemsCache[topic.name] ? 'VAULTED_READY' : 'INIT_SYNC'}
                      </span>
                      <ChevronRight size={16} className="text-slate-700 group-hover:text-purple-400 transition-all group-hover:translate-x-2" />
                    </div>
                    <div className="text-right">
                        <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest block">Threads</span>
                        <span className="text-xl font-bold text-white leading-none">{topic.problems}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          /* PROBLEM LIST VIEW (Grid of Cards) */
          problemsCache[selectedTopic]?.map((prob, index) => (
            <div 
              key={index}
              onClick={() => { setActiveProblem(prob); setView('workspace'); }}
              className="col-span-12 md:col-span-4 group relative cursor-pointer"
            >
              <div className="p-10 rounded-[3rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl text-left hover:border-purple-500/50 transition-all duration-500 shadow-xl h-[280px] flex flex-col justify-between overflow-hidden">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-mono text-purple-500 border border-purple-500/30 px-3 py-1 rounded-full uppercase tracking-widest italic">{prob.difficulty}</span>
                  <span className="text-[9px] font-mono text-slate-700">NODE_0{index + 1}</span>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none group-hover:text-purple-400 transition-colors">{prob.name}</h4>
                  <div className="mt-6 flex items-center gap-3 text-[10px] font-mono text-slate-500 group-hover:text-purple-500 transition-colors uppercase tracking-[0.3em]">
                    Run_Logic <ChevronRight size={14} />
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
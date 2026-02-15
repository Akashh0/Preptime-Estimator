import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Terminal, Code2, GitMerge, Lock, Loader2, ChevronRight, CheckCircle2 } from 'lucide-react';
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
  
  // Initialize problemsCache from localStorage if it exists
  const [problemsCache, setProblemsCache] = useState(() => {
    const savedCache = localStorage.getItem('neural_problems_cache');
    return savedCache ? JSON.parse(savedCache) : {};
  });

  // Effect to save cache to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem('neural_problems_cache', JSON.stringify(problemsCache));
  }, [problemsCache]);

  const fetchTopicProblems = async (topic) => {
    // Instant retrieval from local storage cache
    if (problemsCache[topic.name]) {
      setSelectedTopic(topic.name);
      setView('problem-list');
      return;
    }

    setLoading(true);
    setSelectedTopic(topic.name);
    try {
      const res = await axios.get(`http://localhost:8000/generate-coding/${topic.name}`);
      
      setProblemsCache(prev => ({
        ...prev,
        [topic.name]: res.data
      }));
      
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

  const enterWorkspace = (problem) => {
    setActiveProblem(problem);
    setView('workspace');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="animate-spin text-purple-500 mb-8" size={60} />
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
    <div className="p-12 max-w-[1600px] mx-auto space-y-16 animate-in fade-in duration-1000">
      <div className="flex justify-between items-end border-b border-white/5 pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-purple-500 font-mono text-[10px] tracking-[0.5em] uppercase">
            <Code2 size={16} />
            <span>{view === 'roadmap' ? 'Compiler_Link_Established' : `Topic: ${selectedTopic}`}</span>
          </div>
          <h1 className="text-8xl font-black italic tracking-tighter uppercase text-white leading-none">
            {view === 'roadmap' ? 'Coding_' : 'Problem_'}<span className="text-outline-white text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>{view === 'roadmap' ? 'Arena.' : 'Set.'}</span>
          </h1>
        </div>

        <div className="flex gap-4">
          {Object.keys(problemsCache).length > 0 && view === 'roadmap' && (
            <button 
              onClick={clearCache}
              className="px-6 py-2 border border-red-500/20 text-red-500/50 rounded-xl font-mono text-[10px] uppercase tracking-widest hover:bg-red-500/10 transition-all"
            >
              Purge_Vault
            </button>
          )}
          {view === 'problem-list' && (
            <button 
              onClick={() => setView('roadmap')}
              className="px-6 py-2 border border-white/10 rounded-xl font-mono text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all"
            >
              Back_to_Roadmap
            </button>
          )}
        </div>
      </div>

      {/* ROADMAP VIEW */}
      {view === 'roadmap' && (
        <div className="relative">
          <div className="absolute left-[45px] top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-purple-500/10 to-transparent" />
          <div className="space-y-12">
            {TOPICS.map((topic) => (
              <div 
                key={topic.id} 
                onClick={() => fetchTopicProblems(topic)}
                className="relative flex items-center gap-12 group transition-all cursor-pointer"
              >
                <div className="relative z-10 w-24 h-24 rounded-3xl border border-purple-500/30 bg-[#121216] flex items-center justify-center transition-all duration-500 group-hover:border-purple-500 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                  <GitMerge className="text-purple-400" />
                </div>
                <div className="flex-grow p-8 rounded-[2.5rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl group-hover:bg-white/[0.03] transition-all duration-500">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-purple-500 uppercase tracking-widest italic">{topic.diff}</span>
                      <h3 className="text-3xl font-bold text-white uppercase italic tracking-tighter">{topic.name}</h3>
                    </div>
                    {problemsCache[topic.name] && (
                      <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <CheckCircle2 size={12} className="text-green-400" />
                        <span className="text-[8px] font-mono text-green-400 uppercase tracking-widest">Vaulted</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROBLEM LIST VIEW */}
      {view === 'problem-list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problemsCache[selectedTopic]?.map((prob, index) => (
            <button 
              key={index}
              onClick={() => enterWorkspace(prob)}
              className="group p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 text-left hover:border-purple-500/50 transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-[8px] font-mono text-purple-400 px-3 py-1 bg-purple-500/10 rounded-full uppercase tracking-tighter">{prob.difficulty}</span>
                <span className="text-[8px] font-mono text-slate-700">Node_0{index + 1}</span>
              </div>
              <h4 className="text-2xl font-bold text-white uppercase italic tracking-tighter mb-4 group-hover:text-purple-300 transition-colors">{prob.name}</h4>
              <div className="flex items-center gap-2 text-[10px] font-mono text-purple-500 uppercase tracking-widest">
                Open_Session <ChevronRight size={12} />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
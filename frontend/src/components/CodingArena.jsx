import React, { useState } from 'react';
import axios from 'axios';
import { Terminal, Code2, GitMerge, Lock, Loader2, ChevronRight, LayoutGrid } from 'lucide-react';
import ProblemWorkspace from './ProblemWorkspace';

const TOPICS = [
  { id: 1, name: "Arrays & Hashing", status: "unlocked", problems: 12, diff: "Foundation" },
  { id: 2, name: "Two Pointers", status: "unlocked", problems: 8, diff: "Basic" },
  { id: 3, name: "Sliding Window", status: "locked", problems: 5, diff: "Medium" },
  { id: 4, name: "Trees & Graphs", status: "locked", problems: 20, diff: "Advanced" },
];

export default function CodingArena() {
  const [view, setView] = useState('roadmap'); // 'roadmap' | 'problem-list' | 'workspace'
  const [loading, setLoading] = useState(false);
  const [topicProblems, setTopicProblems] = useState([]);
  const [activeProblem, setActiveProblem] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState("");

  // Step 1: Fetch problems for the selected topic
  const fetchTopicProblems = async (topic) => {
    setLoading(true);
    setSelectedTopic(topic.name);
    try {
      const res = await axios.get(`http://localhost:8000/generate-coding/${topic.name}`);
      setTopicProblems(res.data);
      setView('problem-list');
    } catch (err) {
      console.error("Neural Link Failed", err);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Select a specific problem from the generated list
  const enterWorkspace = (problem) => {
    setActiveProblem(problem);
    setView('workspace');
  };

  // Render Logic
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="animate-spin text-purple-500 mb-8" size={60} />
        <p className="font-mono text-purple-400 tracking-[0.8em] animate-pulse uppercase">Compiling_Neural_Threads</p>
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
      {/* HUD HEADER */}
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

        {view === 'problem-list' && (
          <button 
            onClick={() => setView('roadmap')}
            className="px-6 py-2 border border-white/10 rounded-xl font-mono text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all"
          >
            Back_to_Roadmap
          </button>
        )}
      </div>

      {/* VIEW 1: ROADMAP (Topic Nodes) */}
      {view === 'roadmap' && (
        <div className="relative">
          <div className="absolute left-[45px] top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-purple-500/10 to-transparent" />
          <div className="space-y-12">
            {TOPICS.map((topic) => (
              <div 
                key={topic.id} 
                onClick={() => topic.status === 'unlocked' && fetchTopicProblems(topic)}
                className={`relative flex items-center gap-12 group transition-all ${topic.status === 'unlocked' ? 'cursor-pointer' : 'opacity-40 grayscale cursor-not-allowed'}`}
              >
                <div className="relative z-10 w-24 h-24 rounded-3xl border border-purple-500/30 bg-[#121216] flex items-center justify-center transition-all duration-500 group-hover:border-purple-500 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                  {topic.status === 'unlocked' ? <GitMerge className="text-purple-400" /> : <Lock className="text-slate-700" />}
                </div>
                <div className="flex-grow p-8 rounded-[2.5rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl group-hover:bg-white/[0.03] transition-all duration-500">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-purple-500 uppercase tracking-widest italic">{topic.diff}</span>
                      <h3 className="text-3xl font-bold text-white uppercase italic tracking-tighter">{topic.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-widest">Total_Nodes</span>
                      <span className="text-xl font-bold text-white">{topic.problems}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: PROBLEM LIST (Generated from AI) */}
      {view === 'problem-list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topicProblems.map((prob, index) => (
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
              <p className="text-xs text-slate-500 line-clamp-2 font-mono leading-relaxed mb-6 opacity-60">
                {prob.description}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-mono text-purple-500 uppercase tracking-widest">
                Initialize_Session <ChevronRight size={12} />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
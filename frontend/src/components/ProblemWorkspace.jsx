import React, { useState } from 'react';
import axios from 'axios';
import { Play, ChevronLeft, Cpu, Loader2, CheckCircle2, XCircle, Code2, BookOpen, BarChart } from 'lucide-react';

const LANG_CONFIG = {
  python3: { 
    label: "Python 3", 
    starter: "def solve(input_data):\n    # Write your logic here\n    return 0" 
  },
  java: { label: "Java 17", starter: "import java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        while(sc.hasNextLine()) {\n            System.out.println(sc.nextLine());\n        }\n    }\n}" },
  cpp: { label: "C++ 20", starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    while(getline(cin, s)) {\n        cout << s << endl;\n    }\n    return 0;\n}" }
};

export default function ProblemWorkspace({ problem, onBack }) {
  const [lang, setLang] = useState('python3');
  const [code, setCode] = useState(LANG_CONFIG['python3'].starter);
  const [results, setResults] = useState([]); 
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState('description');

  const handleExecute = async () => {
    setIsRunning(true);
    setError("");
    setResults([]);
    try {
      const res = await axios.post("https://akashh077-assessment-trainer.hf.space/execute-code", {
        code, language: lang, test_cases: problem.examples
      });
      const data = res.data.results;
      setResults(Array.isArray(data) ? data : Object.values(data || {}));
      if (res.data.compile_error) setError(res.data.compile_error);
      setActiveTab('results'); 
    } catch (err) {
      setError("System Failure: Neural Link Unreachable.");
    } finally { setIsRunning(false); }
  };

  return (
    <div className="h-screen bg-[#050505] text-white flex flex-col p-4 md:p-8 overflow-hidden">
      
      {/* HUD HEADER */}
      <div className="flex justify-between items-center bg-white/[0.03] border border-white/10 p-5 rounded-[2rem] backdrop-blur-2xl mb-6 shrink-0 shadow-2xl">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-tighter">
          <ChevronLeft size={18} /> Back_to_Set
        </button>
        
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-3 text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">
             <Cpu size={14} className="text-purple-500"/> RTX_KERNEL_ACTIVE
          </div>
          <button onClick={handleExecute} disabled={isRunning} className="flex items-center gap-3 px-8 py-3 bg-purple-600 text-white rounded-2xl hover:bg-purple-500 transition-all font-black text-xs uppercase tracking-widest italic disabled:opacity-50 shadow-[0_0_20px_rgba(147,51,234,0.3)]">
            {isRunning ? <Loader2 className="animate-spin" size={16} /> : <Play size={16} />}
            {isRunning ? "Running" : "Execute_Code"}
          </button>
        </div>
      </div>

      {/* MOBILE TABS */}
      <div className="flex md:hidden bg-white/5 border border-white/10 rounded-2xl p-1 mb-4 shrink-0">
        {['description', 'editor', 'results'].map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`flex-grow py-3 rounded-xl font-mono text-[10px] uppercase ${activeTab === t ? 'bg-purple-600' : 'text-slate-500'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* WORKSPACE GRID */}
      <div className="flex-grow grid grid-cols-12 gap-6 overflow-hidden h-full">
        
        {/* LEFT: INFO */}
        <div className={`${activeTab === 'description' ? 'flex' : 'hidden md:flex'} col-span-12 md:col-span-4 flex-col bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 overflow-y-auto custom-scrollbar`}>
          <div className="space-y-8">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none">{problem.name}</h2>
            <p className="text-slate-400 leading-relaxed text-sm font-medium">{problem.description}</p>
            <div className="space-y-4 pt-8 border-t border-white/5 font-mono">
              <span className="text-[10px] text-slate-600 uppercase font-black italic">// Test_Scenarios</span>
              {problem.examples?.map((ex, i) => (
                <div key={i} className="p-5 bg-black/60 rounded-2xl border border-white/5 text-[11px] text-cyan-400 space-y-2">
                  <div className="flex gap-2"><span className="text-white/30 italic">INPUT:</span> {String(ex.input)}</div>
                  <div className="flex gap-2"><span className="text-white/30 italic">EXPECT:</span> {String(ex.output)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: BIG EDITOR & RESULTS */}
        <div className={`${activeTab !== 'description' ? 'flex' : 'hidden md:flex'} col-span-12 md:col-span-8 flex-col gap-6 overflow-hidden`}>
          
          {/* EDITOR */}
          <div className="flex-[3] flex flex-col bg-[#0a0a0c] border border-white/10 rounded-[3.5rem] overflow-hidden shadow-inner">
            <div className="bg-white/5 px-8 py-4 border-b border-white/5 flex justify-between items-center font-mono text-[10px]">
              <select value={lang} onChange={(e) => { setLang(e.target.value); setCode(LANG_CONFIG[e.target.value].starter); }} className="bg-transparent text-purple-400 outline-none font-bold uppercase tracking-widest cursor-pointer">
                <option value="python3">Python 3.11</option>
                <option value="java">Java 17 LTS</option>
                <option value="cpp">C++ 20 Standard</option>
              </select>
              <span className="text-slate-600 font-bold italic tracking-tighter">SOURCE_CONTROL_ENABLED</span>
            </div>
            <textarea 
              value={code} onChange={(e) => setCode(e.target.value)} spellCheck="false"
              className="flex-grow bg-transparent p-10 font-mono text-base text-purple-100 outline-none resize-none leading-relaxed custom-scrollbar"
              placeholder="// Write your logic node here..."
            />
          </div>

          {/* RESULTS */}
          <div className="flex-1 min-h-[180px] bg-black/80 border border-white/5 rounded-[3rem] p-8 overflow-y-auto custom-scrollbar shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest italic">// Kernel_Output</span>
              {isRunning && <div className="flex gap-1 h-3 items-end"><div className="w-1 bg-purple-500 animate-bounce h-2" /><div className="w-1 bg-purple-500 animate-bounce h-3 delay-75" /></div>}
            </div>
            {error && <pre className="text-red-400 text-xs font-mono bg-red-400/5 p-4 rounded-xl border border-red-500/20 mb-4">{error}</pre>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map((res, i) => (
                <div key={i} className={`p-5 rounded-2xl border transition-all flex items-center justify-between ${res.passed ? 'bg-green-500/5 border-green-500/10' : 'bg-red-500/5 border-red-500/10'}`}>
                  <div className="flex items-center gap-3">
                    {res.passed ? <CheckCircle2 size={16} className="text-green-400" /> : <XCircle size={16} className="text-red-400" />}
                    <span className="text-[11px] font-mono font-bold">CASE_0{i+1}</span>
                  </div>
                  <span className={`text-[10px] font-mono italic ${res.passed ? 'text-green-500/50' : 'text-red-500/50'}`}>{res.passed ? 'SUCCESS' : 'FAILURE'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
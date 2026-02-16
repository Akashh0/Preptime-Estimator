import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Play, ChevronLeft, Cpu, Loader2, CheckCircle2, XCircle, Code2, BookOpen, BarChart } from 'lucide-react';

const LANG_CONFIG = {
  python3: { label: "Python 3", starter: "import sys\n\ndef solve():\n    line = sys.stdin.read().strip()\n    # Process input here\n    print(line)\n\nsolve()", color: "text-blue-400" },
  java: { label: "Java 17", starter: "import java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(sc.hasNextLine()) System.out.println(sc.nextLine());\n    }\n}", color: "text-orange-400" },
  cpp: { label: "C++ 20", starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    cout << s << endl;\n    return 0;\n}", color: "text-cyan-400" }
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
      const res = await axios.post("http://localhost:8000/execute-code", {
        code: code,
        language: lang,
        test_cases: problem.examples
      });
      
      const data = res.data.results;
      // FIX: Strict check to ensure results is always an array
      setResults(Array.isArray(data) ? data : Object.values(data || {}));
      
      if (res.data.compile_error) setError(res.data.compile_error);
      setActiveTab('results'); 
    } catch (err) {
      setError("Neural Link Failed: Backend unreachable.");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 md:gap-8 h-screen md:h-auto pb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 px-2 md:px-0 overflow-x-hidden">
      
      {/* HEADER HUD */}
      <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-4 md:p-6 rounded-2xl md:rounded-[2rem] backdrop-blur-xl sticky top-2 z-40">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors font-mono text-[10px] md:text-xs uppercase tracking-widest">
          <ChevronLeft size={16} /> <span className="hidden sm:inline">Back</span>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 text-[9px] font-mono text-slate-500 uppercase tracking-widest mr-4">
             <Cpu size={12}/> RTX_4050_KERNEL
          </div>
          <button onClick={handleExecute} disabled={isRunning} className="flex items-center gap-2 px-4 md:px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-500 transition-all font-bold text-[10px] md:text-xs uppercase tracking-widest italic disabled:opacity-50">
            {isRunning ? <Loader2 className="animate-spin" size={14} /> : <Play size={14} />}
            {isRunning ? "RUNNING" : "EXECUTE"}
          </button>
        </div>
      </div>

      {/* MOBILE TAB SWITCHER */}
      <div className="flex md:hidden bg-white/5 border border-white/10 rounded-xl p-1 gap-1">
        {[
          { id: 'description', icon: BookOpen, label: 'Info' },
          { id: 'editor', icon: Code2, label: 'Code' },
          { id: 'results', icon: BarChart, label: 'Tests' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-grow flex items-center justify-center gap-2 py-2 rounded-lg font-mono text-[10px] uppercase transition-all
              ${activeTab === tab.id ? 'bg-purple-600 text-white' : 'text-slate-500'}`}
          >
            <tab.icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-8 flex-grow">
        <div className={`${activeTab === 'description' ? 'block' : 'hidden'} md:block col-span-12 md:col-span-4 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white/[0.01] border border-white/5 overflow-y-auto custom-scrollbar flex flex-col min-h-[300px] md:min-h-0`}>
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-3xl font-black text-white italic tracking-tighter uppercase leading-none">{problem.name}</h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium">{problem.description}</p>
            <div className="pt-6 border-t border-white/5 space-y-4 font-mono">
              <h4 className="text-[9px] text-slate-600 uppercase tracking-widest font-black italic">// Test_Cases</h4>
              {problem.examples?.map((ex, i) => (
                <div key={i} className="p-4 bg-black/40 rounded-xl border border-white/5 text-[9px] md:text-[10px] text-cyan-400">
                  <span className="opacity-40 text-white">In:</span> {String(ex.input)}<br/>
                  <span className="opacity-40 text-white">Out:</span> {String(ex.output)}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${activeTab === 'editor' || activeTab === 'results' ? 'block' : 'hidden'} md:block col-span-12 md:col-span-8 flex flex-col gap-4 md:gap-6`}>
          <div className={`${activeTab === 'editor' ? 'flex' : 'hidden md:flex'} flex-col flex-grow rounded-[2rem] md:rounded-[3rem] bg-[#0d0d10] border border-white/10 overflow-hidden min-h-[400px] md:min-h-0`}>
            <div className="bg-white/5 px-6 md:px-8 py-3 border-b border-white/5 flex justify-between items-center font-mono text-[10px]">
              <select value={lang} onChange={(e) => { setLang(e.target.value); setCode(LANG_CONFIG[e.target.value].starter); }} className="bg-transparent text-purple-300 outline-none">
                <option value="python3">Python 3</option>
                <option value="java">Java 17</option>
                <option value="cpp">C++ 20</option>
              </select>
              <span className="text-slate-600">KERNEL_ACTIVE</span>
            </div>
            <textarea value={code} onChange={(e) => setCode(e.target.value)} spellCheck="false" className="flex-grow bg-transparent p-6 md:p-10 font-mono text-xs md:text-sm text-purple-300 outline-none resize-none leading-relaxed" />
          </div>

          <div className={`${activeTab === 'results' ? 'block' : 'hidden md:block'} h-[280px] md:h-64 rounded-[2rem] bg-black border border-white/5 p-6 overflow-y-auto custom-scrollbar mb-4`}>
            <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest italic block mb-4">// Results</span>
            {error && <pre className="text-red-400 text-[10px] font-mono bg-red-400/5 p-4 rounded-lg border border-red-400/10">{error}</pre>}
            <div className="space-y-2">
              {Array.isArray(results) && results.map((res, i) => (
                <div key={i} className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border ${res.passed ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                  <div className="flex items-center gap-3">
                    {res.passed ? <CheckCircle2 size={14} className="text-green-400" /> : <XCircle size={14} className="text-red-400" />}
                    <span className="text-[9px] font-mono text-white">CASE_0{i+1}</span>
                  </div>
                  <div className="text-[8px] font-mono text-slate-500 mt-2 sm:mt-0 italic">
                    Exp: {String(res.expected)} | Got: {String(res.actual)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
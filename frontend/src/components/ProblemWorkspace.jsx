import React, { useState } from 'react';
import axios from 'axios';
import { Terminal, Play, ChevronLeft, Cpu, ChevronDown, BookOpen, Loader2 } from 'lucide-react';

const LANG_CONFIG = {
  python3: { label: "Python 3", starter: "def solution(nums):\n    # Write logic here\n    print(\"Hello from the Neural Engine\")\n    pass", color: "text-blue-400" },
  java: { label: "Java 17", starter: "class Solution {\n    public static void main(String[] args) {\n        System.out.println(\"Java Node Active\");\n    }\n}", color: "text-orange-400" },
  cpp: { label: "C++ 20", starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"C++ Node Active\" << endl;\n    return 0;\n}", color: "text-cyan-400" }
};

export default function ProblemWorkspace({ problem, onBack }) {
  const [lang, setLang] = useState('python3');
  const [code, setCode] = useState(problem.starter_code || LANG_CONFIG['python3'].starter);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const handleLangChange = (newLang) => {
    setLang(newLang);
    setCode(LANG_CONFIG[newLang].starter);
  };

  const handleExecute = async () => {
    setIsRunning(true);
    setOutput("Initializing_Kernel...\n");
    try {
      const res = await axios.post("http://localhost:8000/execute-code", {
        code: code,
        language: lang
      });
      setOutput(res.data.output);
    } catch (err) {
      setOutput("Error: Neural Link to Backend Interrupted.");
    } finally {
      setIsRunning(false);
    }
  };

  if (!problem) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* HEADER HUD */}
      <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] backdrop-blur-xl">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest">
          <ChevronLeft size={16} /> Back_To_Set
        </button>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-xl">
            <Cpu size={14} className="text-purple-400" />
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">{problem.difficulty}</span>
          </div>
          <button 
            onClick={handleExecute}
            disabled={isRunning}
            className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-500 transition-all font-bold text-xs uppercase tracking-widest italic shadow-[0_0_20px_rgba(168,85,247,0.3)] disabled:opacity-50"
          >
            {isRunning ? <Loader2 className="animate-spin" size={14} /> : <Play size={14} />}
            {isRunning ? "Executing..." : "Execute_Node"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 h-[75vh]">
        {/* LEFT PANEL: QUESTION DESCRIPTION */}
        <div className="col-span-4 p-10 rounded-[3rem] bg-white/[0.01] border border-white/5 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen size={18} className="text-purple-500" />
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em]">Problem_Description</span>
          </div>
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-8 leading-tight">{problem.name}</h2>
          <div className="space-y-8 text-slate-400 leading-relaxed">
            <p className="text-sm font-medium">{problem.description}</p>
            <div className="space-y-4">
              <h4 className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">// Examples</h4>
              {problem.examples?.map((ex, i) => (
                <div key={i} className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-3">
                  <pre className="text-xs font-mono text-cyan-400 whitespace-pre-wrap">
                    Input: {ex.input}{"\n"}Output: {ex.output}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: COMPILER + OUTPUT */}
        <div className="col-span-8 flex flex-col gap-6">
          {/* EDITOR AREA */}
          <div className="flex-grow rounded-[3rem] bg-[#0d0d10] border border-white/10 relative overflow-hidden flex flex-col">
            <div className="bg-white/5 px-8 py-4 border-b border-white/5 flex justify-between items-center">
               <div className="flex items-center gap-6">
                 <div className="flex items-center gap-3">
                   <Terminal size={14} className="text-purple-500" />
                   <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Compiler.sys</span>
                 </div>
                 <div className="relative">
                   <select 
                      value={lang}
                      onChange={(e) => handleLangChange(e.target.value)}
                      className="appearance-none bg-white/5 border border-white/10 rounded-lg px-4 py-1.5 text-[10px] font-mono text-purple-300 outline-none cursor-pointer pr-8"
                   >
                     <option value="python3">Python 3</option>
                     <option value="java">Java 17</option>
                     <option value="cpp">C++ 20</option>
                   </select>
                   <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                 </div>
               </div>
               <span className="text-[8px] font-mono text-slate-600 tracking-widest">RTX_4050_ACCELERATED</span>
            </div>
            <textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-grow bg-transparent p-10 font-mono text-sm text-purple-300 outline-none resize-none custom-scrollbar"
              spellCheck="false"
            />
          </div>

          {/* OUTPUT AREA */}
          <div className="h-48 rounded-[2rem] bg-black border border-white/5 p-8 overflow-hidden flex flex-col">
            <div className="flex items-center gap-3 mb-4 opacity-50 uppercase font-mono text-[10px] tracking-widest">
              <Terminal size={12} /> Output_Stream
            </div>
            <pre className="flex-grow font-mono text-xs text-green-400 overflow-y-auto custom-scrollbar">
              {output || "> Ready for input..."}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
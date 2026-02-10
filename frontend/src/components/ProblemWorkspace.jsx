import React, { useState } from 'react';
import axios from 'axios';
import { Terminal, Play, ChevronLeft, Cpu, ChevronDown, BookOpen, Loader2, CheckCircle2, XCircle } from 'lucide-react';

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
      if (res.data.compile_error) setError(res.data.compile_error);
      else setResults(res.data.results || []);
    } catch (err) {
      setError("Neural Link Failed: Backend unreachable.");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* HEADER HUD */}
      <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] backdrop-blur-xl">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest">
          <ChevronLeft size={16} /> Back_To_Set
        </button>
        <button onClick={handleExecute} disabled={isRunning} className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-500 transition-all font-bold text-xs uppercase tracking-widest italic shadow-[0_0_20px_rgba(168,85,247,0.3)] disabled:opacity-50">
          {isRunning ? <Loader2 className="animate-spin" size={14} /> : <Play size={14} />}
          {isRunning ? "Testing..." : "Verify_Solution"}
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8 h-[75vh]">
        {/* LEFT PANEL */}
        <div className="col-span-4 p-10 rounded-[3rem] bg-white/[0.01] border border-white/5 overflow-y-auto custom-scrollbar flex flex-col">
          <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-6">{problem.name}</h2>
          <p className="text-sm text-slate-400 mb-8">{problem.description}</p>
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">// AI_TEST_CASES</h4>
            {problem.examples?.map((ex, i) => (
              <div key={i} className="p-4 bg-black/40 rounded-xl border border-white/5 font-mono text-[10px] text-cyan-400">
                In: {ex.input} | Out: {ex.output}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="col-span-8 flex flex-col gap-6">
          <div className="flex-grow rounded-[3rem] bg-[#0d0d10] border border-white/10 overflow-hidden flex flex-col">
            <div className="bg-white/5 px-8 py-3 border-b border-white/5 flex justify-between items-center font-mono text-[10px]">
              <select value={lang} onChange={(e) => { setLang(e.target.value); setCode(LANG_CONFIG[e.target.value].starter); }} className="bg-transparent text-purple-300 outline-none">
                <option value="python3">Python 3</option>
                <option value="java">Java 17</option>
                <option value="cpp">C++ 20</option>
              </select>
              <span className="text-slate-600">RTX_4050_KERNEL</span>
            </div>
            <textarea value={code} onChange={(e) => setCode(e.target.value)} className="flex-grow bg-transparent p-10 font-mono text-sm text-purple-300 outline-none resize-none" />
          </div>

          {/* VALIDATION OUTPUT */}
          <div className="h-56 rounded-[2rem] bg-black border border-white/5 p-6 overflow-y-auto custom-scrollbar">
            <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-4">Test_Results:</div>
            {error && <pre className="text-red-400 text-xs font-mono">{error}</pre>}
            <div className="space-y-3">
              {results.map((res, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${res.passed ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                  <div className="flex items-center gap-3">
                    {res.passed ? <CheckCircle2 size={14} className="text-green-400" /> : <XCircle size={14} className="text-red-400" />}
                    <span className="text-[10px] font-mono text-white">Case_0{i+1}: {res.passed ? 'PASSED' : 'FAILED'}</span>
                  </div>
                  <div className="text-[8px] font-mono text-slate-500">Exp: {res.expected} | Got: {res.actual}</div>
                </div>
              ))}
              {results.length === 0 && !error && <span className="text-slate-700 font-mono text-[10px]">Ready for kernel execution...</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
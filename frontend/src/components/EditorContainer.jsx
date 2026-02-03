import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { useInterviewStore } from '../store/useInterviewStore';
import { Lock, Unlock } from 'lucide-react';

export default function EditorContainer() {
  const { isLocked, checkLogic, problemData } = useInterviewStore();
  const [ds, setDs] = useState('');
  const [tc, setTc] = useState('');

  return (
    <div className="flex-1 flex flex-col">
      {/* Logic Gate Bar */}
      <div className={`p-4 border-b transition-colors ${isLocked ? 'bg-amber-900/20 border-amber-700/50' : 'bg-emerald-900/20 border-emerald-700/50'}`}>
        <div className="flex items-center gap-4">
          {isLocked ? <Lock className="text-amber-500" /> : <Unlock className="text-emerald-500" />}
          <select 
            className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={(e) => setDs(e.target.value)}
          >
            <option value="">Select Data Structure</option>
            <option value="Array">Array</option>
            <option value="Hash Map">Hash Map</option>
          </select>
          <select 
            className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={(e) => setTc(e.target.value)}
          >
            <option value="">Select Time Complexity</option>
            <option value="O(1)">O(1)</option>
            <option value="O(n)">O(n)</option>
            <option value="O(n^2)">O(n^2)</option>
          </select>
          <button 
            onClick={() => checkLogic(ds, tc)}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-1 px-4 rounded transition-all"
          >
            VERIFY LOGIC
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 relative">
        {isLocked && (
          <div className="absolute inset-0 z-10 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center">
            <p className="text-slate-400 font-mono italic">Solve the logic gate to unlock coding...</p>
          </div>
        )}
        <Editor
          height="100%"
          defaultLanguage="python"
          theme="vs-dark"
          defaultValue="# Start typing your solution here..."
          options={{
            readOnly: isLocked,
            minimap: { enabled: false },
            fontSize: 14,
          }}
        />
      </div>
    </div>
  );
}
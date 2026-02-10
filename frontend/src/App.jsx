import React, { useState } from 'react';
import axios from 'axios';
import Background from './components/Background';
import Navbar from './components/Navbar';
import BentoGrid from './components/BentoGrid';
import Assessment from './components/Assessment';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('landing');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  const startAptitude = async (company) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8000/generate-aptitude/${company}`);
      setQuestions(res.data);
      setView('testing');
      setCurrentQ(0);
      setUserAnswers({});
    } catch (err) {
      alert("System Offline.");
    } finally {
      setLoading(false);
    }
  };
  const terminateSession = () => {
  setView('landing');
  setQuestions([]);
  setUserAnswers({});
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-300 font-sans relative">
      <Background />
      <Navbar view={view} />

      <main className="relative z-10 p-12 max-w-[1600px] mx-auto">
        {loading && (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <Loader2 className="animate-spin text-cyan-400 mb-8" size={60} />
            <p className="font-mono text-cyan-500 tracking-[0.8em] uppercase animate-pulse">Syncing_Neural_Cores</p>
          </div>
        )}

        {view === 'landing' && !loading && (
          <BentoGrid onSelect={startAptitude} />
        )}

        {view === 'testing' && questions.length > 0 && (
          <Assessment 
          questions={questions} 
          currentQ={currentQ} 
          setCurrentQ={setCurrentQ} 
          userAnswers={userAnswers} 
          setUserAnswers={setUserAnswers} 
          onTerminate={terminateSession}
          />
        )}
      </main>
    </div>
  );
}
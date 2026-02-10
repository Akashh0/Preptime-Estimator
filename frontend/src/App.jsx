import React, { useState } from 'react';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import Portal from './components/Portal';
import Background from './components/Background';
import Navbar from './components/Navbar';
import BentoGrid from './components/BentoGrid';
import Assessment from './components/Assessment';
import CodingArena from './components/CodingArena'; // Import the new component
import { Loader2 } from 'lucide-react';

export default function App() {
  const [mode, setMode] = useState('portal'); // 'portal' | 'aptitude' | 'coding'
  const [view, setView] = useState('landing'); // 'landing' | 'testing'
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
      console.error("Link Failed", err);
    } finally {
      setLoading(false);
    }
  };

  const terminateSession = () => {
    setView('landing');
    setQuestions([]);
    setUserAnswers({});
  };

  const fadeBlur = {
    initial: { opacity: 0, filter: "blur(10px)", y: 10 },
    animate: { opacity: 1, filter: "blur(0px)", y: 0 },
    exit: { opacity: 0, filter: "blur(10px)", y: -10 }
  };

  return (
    <div className="min-h-screen bg-[#050506] text-slate-300 font-sans relative overflow-x-hidden">
      <Background />
      
      <AnimatePresence mode="wait">
        {mode === 'portal' ? (
          <motion.div 
            key="portal"
            variants={fadeBlur}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Added onEnterCoding to switch modes */}
            <Portal 
              onEnterAptitude={() => setMode('aptitude')} 
              onEnterCoding={() => setMode('coding')} 
            />
          </motion.div>
        ) : mode === 'aptitude' ? (
          <motion.div 
            key="aptitude"
            variants={fadeBlur}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Navbar view={view} onBack={() => setMode('portal')} />
            <main className="relative z-10 p-12 max-w-[1600px] mx-auto">
              {loading && (
                <div className="flex flex-col items-center justify-center h-[60vh]">
                  <Loader2 className="animate-spin text-cyan-400 mb-8" size={60} />
                  <p className="font-mono text-cyan-500 tracking-[0.8em] animate-pulse uppercase">Syncing_Neural_Cores</p>
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
          </motion.div>
        ) : (
          <motion.div 
            key="coding"
            variants={fadeBlur}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Navbar mode="coding" onBack={() => setMode('portal')} />
            <main className="relative z-10 p-12 max-w-[1600px] mx-auto">
              <CodingArena />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
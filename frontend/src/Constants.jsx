import { Fingerprint, Target, Terminal, Command, Zap, Cpu, Activity, BarChart3 } from 'lucide-react';

export const COMPANIES = [
  { id: 'zoho', name: "ZOHO", category: "LOGIC", accent: "#ef4444", span: "col-span-8 h-[380px]", icon: <Fingerprint size={18} /> },
  { id: 'deloitte', name: "DELOITTE", category: "STRATEGY", accent: "#22c55e", span: "col-span-4 h-[380px]", icon: <Target size={18} /> },
  { id: 'tcs', name: "TCS", category: "FOUNDATION", accent: "#3b82f6", span: "col-span-4 h-[320px]", icon: <Terminal size={18} /> },
  { id: 'google', name: "GOOGLE", category: "ALGO", accent: "#eab308", span: "col-span-4 h-[320px]", icon: <Command size={18} /> },
  { id: 'amazon', name: "AMAZON", category: "SCALE", accent: "#f59e0b", span: "col-span-4 h-[320px]", icon: <Zap size={18} /> },
  { id: 'wipro', name: "WIPRO", category: "FOUNDATION", accent: "#ec4899", span: "col-span-5 h-[340px]", icon: <Cpu size={18} /> },
  { id: 'accenture', name: "ACCENTURE", category: "STRATEGY", accent: "#06b6d4", span: "col-span-7 h-[340px]", icon: <Activity size={18} /> },
  { id: 'infosys', name: "INFOSYS", category: "LOGIC", accent: "#8b5cf6", span: "col-span-12 h-[280px]", icon: <BarChart3 size={18} /> },
];
export default function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050506]">
      {/* LAYER 1: NEURAL BLOBS (ANIMATED) */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse duration-[8s]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-purple-600/5 blur-[150px] rounded-full animate-bounce duration-[15s]" />
      <div className="absolute top-[20%] right-[20%] w-[40%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full animate-pulse duration-[10s] delay-700" />

      {/* LAYER 2: TOPOGRAPHIC GRID */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-screen" 
           style={{
             backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
             backgroundSize: '60px 60px'
           }} 
      />

      {/* LAYER 3: GRAIN & NOISE */}
      <div className="absolute inset-0 opacity-[0.4] mix-blend-overlay pointer-events-none"
           style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} 
      />
      
      {/* LAYER 4: VIGNETTE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,6,0.8)_100%)]" />
    </div>
  );
}
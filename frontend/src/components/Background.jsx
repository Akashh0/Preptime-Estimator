export default function Background() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#020203]">
      {/* LAYER 1: THE LIQUID MESH */}
      <div className="absolute inset-0 opacity-40">
        <div 
          className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] animate-fluid-morph"
          style={{
            background: `radial-gradient(at 0% 0%, rgba(168, 85, 247, 0.2) 0px, transparent 55%),
                         radial-gradient(at 100% 100%, rgba(6, 182, 212, 0.2) 0px, transparent 55%),
                         radial-gradient(at 50% 50%, rgba(59, 130, 246, 0.1) 0px, transparent 70%)`,
          }}
        />
      </div>

      {/* LAYER 2: TURBULENT GRAIN (This adds the "Sleek/Unique" texture) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.2] contrast-125 brightness-150 pointer-events-none">
        <filter id="pedro-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#pedro-noise)" />
      </svg>

      {/* LAYER 3: VIGNETTE & BLUR EDGE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(2,2,3,0)_0%,rgba(2,2,3,0.9)_100%)]" />
      
      <style>
        {`
          @keyframes fluid-morph {
            0%, 100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; transform: rotate(0deg) scale(1); }
            33% { border-radius: 60% 40% 30% 70% / 50% 60% 40% 60%; transform: rotate(2deg) scale(1.1); }
            66% { border-radius: 40% 60% 50% 50% / 60% 30% 70% 40%; transform: rotate(-2deg) scale(0.9); }
          }
          .animate-fluid-morph {
            animation: fluid-morph 25s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
}
import React, { useState, useRef } from 'react';

const ValentineProposal: React.FC = () => {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ top: '50%', left: 'calc(50% + 100px)' });
  const [moveCount, setMoveCount] = useState(0);
  const [noVisible, setNoVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = () => {
    if (!containerRef.current || !noVisible) return;

    if (moveCount < 3) {
      const rect = containerRef.current.getBoundingClientRect();
      const padding = 80;
      // Calculate random position within the container bounds
      const newTop = Math.random() * (rect.height - padding * 2) + padding;
      const newLeft = Math.random() * (rect.width - padding * 2) + padding;
      
      setNoPos({ top: `${newTop}px`, left: `${newLeft}px` });
      setMoveCount(prev => prev + 1);
    } else {
      // After moving 3 times, disappear on the next hover/click
      setNoVisible(false);
    }
  };

  if (accepted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px] text-center space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="space-y-4">
          <h2 className="text-6xl md:text-7xl font-romantic text-rose-600 font-bold">Yay! ❤️</h2>
          <p className="text-2xl text-rose-500 font-medium">You've made me the happiest person alive!</p>
        </div>
        
        <div className="relative flex items-center justify-center py-12">
          {/* Glowing background aura */}
          <div className="absolute inset-0 bg-rose-400/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
          
          {/* Beating Heart SVG */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-64 w-64 text-rose-500 drop-shadow-[0_20px_50px_rgba(225,29,72,0.4)] animate-heartbeat relative z-10" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="relative flex flex-col items-center justify-center min-h-[500px] bg-white/60 backdrop-blur-md rounded-[2.5rem] border-2 border-rose-100 overflow-hidden shadow-2xl"
    >
      <h2 className="text-5xl md:text-7xl font-romantic text-rose-600 font-bold mb-16 text-center px-8 drop-shadow-sm leading-tight">
        Will you be my Valentine?
      </h2>
      
      <div className="flex flex-row items-center justify-center gap-12 min-h-[120px] w-full">
        <button
          onClick={() => setAccepted(true)}
          className="px-14 py-6 bg-rose-500 hover:bg-rose-600 text-white text-3xl font-bold rounded-full shadow-[0_10px_30px_rgba(244,63,94,0.3)] transition-all hover:scale-110 active:scale-95 z-10"
        >
          Yes!
        </button>

        {noVisible && (
          <button
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
            style={{ 
              position: 'absolute', 
              top: noPos.top, 
              left: noPos.left, 
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: 'translate(-50%, -50%)'
            }}
            className="px-8 py-3 bg-white/80 hover:bg-gray-50 text-gray-400 text-xl rounded-full shadow-lg z-10 hidden md:block border border-rose-50 whitespace-nowrap select-none"
          >
            {moveCount === 0 ? "No" : moveCount === 1 ? "Wait..." : moveCount === 2 ? "Hey!" : "Catch me!"}
          </button>
        )}
      </div>

      <div className="mt-16 text-rose-300 opacity-40">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
    </div>
  );
};

export default ValentineProposal;
import React, { useState, useRef } from 'react';

const ValentineProposal: React.FC = () => {
  const [accepted, setAccepted] = useState(false);
  // Default position for 'No' button relative to the 'Yes' button
  const [noPos, setNoPos] = useState<React.CSSProperties>({ 
    position: 'relative',
    left: '0px',
    top: '0px'
  });
  const [moveCount, setMoveCount] = useState(0);
  const [noVisible, setNoVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current || !noVisible) return;

    if (moveCount < 3) {
      const rect = containerRef.current.getBoundingClientRect();
      const padding = 100;
      
      // Calculate a random absolute position within the box
      const randomX = Math.random() * (rect.width - padding * 2) + padding;
      const randomY = Math.random() * (rect.height - padding * 2) + padding;
      
      setNoPos({
        position: 'absolute',
        left: `${randomX}px`,
        top: `${randomY}px`,
        transform: 'translate(-50%, -50%)',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
      });
      setMoveCount(prev => prev + 1);
    } else {
      setNoVisible(false);
    }
  };

  if (accepted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-8 animate-in fade-in duration-1000">
        <div className="space-y-4">
          <h2 className="text-6xl md:text-8xl font-romantic text-rose-600 font-bold">Yay! ❤️</h2>
          <p className="text-2xl text-rose-500 font-medium italic">I knew you'd say yes!</p>
        </div>
        
        <div className="relative flex items-center justify-center py-12">
          <div className="absolute inset-0 bg-rose-400/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
          
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
      className="w-full relative flex flex-col items-center justify-center min-h-[500px] bg-white/70 backdrop-blur-md rounded-[3rem] border-2 border-rose-100 shadow-2xl p-8"
    >
      <h2 className="text-5xl md:text-7xl font-romantic text-rose-600 font-bold mb-20 text-center drop-shadow-sm leading-tight">
        Will you be my Valentine?
      </h2>
      
      <div className="flex flex-row items-center justify-center gap-12 min-h-[150px] w-full">
        <button
          onClick={() => setAccepted(true)}
          className="px-16 py-7 bg-rose-500 hover:bg-rose-600 text-white text-4xl font-bold rounded-full shadow-[0_15px_35px_rgba(244,63,94,0.4)] transition-all hover:scale-110 active:scale-95 z-20"
        >
          Yes!
        </button>

        {noVisible && (
          <button
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
            style={noPos}
            className="px-10 py-4 bg-white text-rose-300 text-2xl font-semibold rounded-full shadow-lg z-20 border border-rose-50 whitespace-nowrap select-none hover:text-rose-400"
          >
            {moveCount === 0 ? "No" : moveCount === 1 ? "Wait!" : moveCount === 2 ? "Are you sure?" : "Oops!"}
          </button>
        )}
      </div>

      <div className="mt-12 text-rose-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 animate-bounce opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
    </div>
  );
};

export default ValentineProposal;
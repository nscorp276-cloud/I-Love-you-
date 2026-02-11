import React, { useState, useEffect } from 'react';
import ValentineProposal from './components/ValentineProposal.tsx';

const HeartParticles = () => {
  const [particles, setParticles] = useState<{ id: number; left: string; duration: string; size: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => [
        ...prev.slice(-12), // Keep performance lean
        {
          id: Date.now() + Math.random(),
          left: `${Math.random() * 100}%`,
          duration: `${6 + Math.random() * 8}s`,
          size: `${12 + Math.random() * 24}px`,
        },
      ]);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="heart-particle text-rose-300 opacity-25"
          style={{
            left: p.left,
            animationDuration: p.duration,
            fontSize: p.size,
          }}
        >
          ❤️
        </div>
      ))}
    </>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-[#fff5f5]">
      <HeartParticles />
      
      <header className="relative z-10 px-6 pt-16 pb-8 text-center">
        <h1 className="text-5xl md:text-7xl font-romantic font-bold text-rose-600 drop-shadow-sm animate-in fade-in">
          For Someone Special... ✨
        </h1>
      </header>

      <main className="relative z-10 flex-1 w-full max-w-4xl mx-auto px-6 flex items-center justify-center pb-24">
        <div className="w-full">
          <ValentineProposal />
        </div>
      </main>

      <footer className="relative z-10 py-6 text-center text-rose-400 text-sm font-medium tracking-wide">
        Sending you all the love today &bull; 2025
      </footer>
    </div>
  );
};

export default App;
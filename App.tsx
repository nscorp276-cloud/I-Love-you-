import React, { useState, useEffect } from 'react';
import ValentineProposal from './components/ValentineProposal.tsx';

const HeartParticles = () => {
  const [particles, setParticles] = useState<{ id: number; left: string; duration: string; size: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => [
        ...prev.slice(-15),
        {
          id: Date.now() + Math.random(),
          left: `${Math.random() * 100}%`,
          duration: `${8 + Math.random() * 7}s`,
          size: `${15 + Math.random() * 25}px`,
        },
      ]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="heart-particle"
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
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col bg-[#fff5f5]">
      <HeartParticles />
      
      <header className="relative z-10 px-6 pt-16 pb-8 text-center">
        <h1 className="text-5xl md:text-7xl font-romantic font-bold text-rose-600 drop-shadow-sm">
          A Message for You... ✨
        </h1>
      </header>

      <main className="relative z-10 flex-1 w-full max-w-4xl mx-auto px-6 flex items-center justify-center pb-24">
        <ValentineProposal />
      </main>

      <footer className="relative z-10 py-6 text-center text-rose-400 text-sm font-medium tracking-wide">
        Made with love &bull; 2025
      </footer>
    </div>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import ValentineProposal from './components/ValentineProposal';

const HeartParticles = () => {
  const [particles, setParticles] = useState<{ id: number; left: string; duration: string; size: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => [
        ...prev.slice(-15),
        {
          id: Date.now() + Math.random(),
          left: `${Math.random() * 100}%`,
          duration: `${5 + Math.random() * 10}s`,
          size: `${10 + Math.random() * 30}px`,
        },
      ]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="heart-particle text-rose-400 opacity-20"
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
      
      <header className="relative z-10 px-6 py-12 text-center">
        <h1 className="text-4xl md:text-6xl font-romantic font-bold text-rose-600 drop-shadow-sm">
          A Special Question... ✨
        </h1>
      </header>

      <main className="relative z-10 flex-1 w-full max-w-4xl mx-auto px-6 flex items-center justify-center pb-20">
        <div className="w-full animate-in fade-in zoom-in duration-1000">
          <ValentineProposal />
        </div>
      </main>

      <footer className="relative z-10 py-6 text-center text-rose-400 text-sm font-medium">
        Sending you all the love today.
      </footer>
    </div>
  );
};

export default App;
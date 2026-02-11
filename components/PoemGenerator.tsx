
import React, { useState } from 'react';
import { generateRomanticPoem } from '../services/geminiService';

const PoemGenerator: React.FC = () => {
  const [name, setName] = useState('');
  const [trait, setTrait] = useState('');
  const [loading, setLoading] = useState(false);
  const [poem, setPoem] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !trait) return;
    setLoading(true);
    try {
      const result = await generateRomanticPoem(name, trait);
      setPoem(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-rose-100">
      <h2 className="text-3xl font-romantic font-bold text-rose-600 mb-6 text-center">AI Love Poet</h2>
      
      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-rose-700 mb-1">Their Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all outline-none"
            placeholder="E.g. Jamie"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-rose-700 mb-1">What do you love most about them?</label>
          <input
            type="text"
            value={trait}
            onChange={(e) => setTrait(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all outline-none"
            placeholder="E.g. your kindness, your radiant smile"
            required
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          className={`w-full py-4 bg-rose-500 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-rose-600 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
        >
          {loading ? 'Consulting Cupid...' : 'Generate Poem'}
        </button>
      </form>

      {poem && (
        <div className="mt-8 p-6 bg-rose-50 rounded-2xl border-2 border-dashed border-rose-200 animate-in slide-in-from-bottom-4 duration-500">
          <p className="text-xl font-romantic text-rose-800 leading-relaxed whitespace-pre-wrap text-center italic">
            {poem}
          </p>
        </div>
      )}
    </div>
  );
};

export default PoemGenerator;

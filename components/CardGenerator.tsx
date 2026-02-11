
import React, { useState } from 'react';
import { generateValentineCard } from '../services/geminiService';

const CardGenerator: React.FC = () => {
  const [style, setStyle] = useState('watercolor');
  const [theme, setTheme] = useState('Classic Hearts');
  const [loading, setLoading] = useState(false);
  const [cardImage, setCardImage] = useState<string | null>(null);

  const styles = [
    { id: 'watercolor', name: 'Watercolor' },
    { id: '3d render', name: 'Cute 3D' },
    { id: 'cyberpunk neon', name: 'Futuristic' },
    { id: 'pencil sketch', name: 'Hand Drawn' },
    { id: 'vintage postcard', name: 'Vintage' }
  ];

  const handleGenerate = async () => {
    setLoading(true);
    setCardImage(null);
    try {
      const img = await generateValentineCard(style, theme);
      setCardImage(img);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-rose-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-3xl font-romantic font-bold text-rose-600 text-center md:text-left">Card Creator</h2>
          
          <div>
            <label className="block text-sm font-medium text-rose-700 mb-2">Art Style</label>
            <div className="grid grid-cols-2 gap-2">
              {styles.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStyle(s.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                    style === s.id ? 'bg-rose-500 text-white border-rose-500 shadow-md' : 'bg-white text-rose-600 border-rose-100 hover:bg-rose-50'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-rose-700 mb-1">Describe the Scene</label>
            <textarea
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all outline-none h-32"
              placeholder="e.g. Two cats holding paws under the moonlight..."
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`w-full py-4 bg-rose-500 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-rose-600 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
          >
            {loading ? 'Painting your love...' : 'Create Magic Card'}
          </button>
        </div>

        <div className="flex flex-col items-center justify-center min-h-[350px] bg-rose-50 rounded-2xl border-2 border-dashed border-rose-200 p-4">
          {loading ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 border-4 border-rose-300 border-t-rose-600 rounded-full animate-spin"></div>
              <p className="text-rose-500 font-medium animate-pulse">Designing with love...</p>
            </div>
          ) : cardImage ? (
            <div className="w-full h-full animate-in zoom-in duration-700">
              <img src={cardImage} alt="Custom AI Valentine Card" className="w-full h-full object-cover rounded-xl shadow-2xl border-4 border-white" />
              <div className="mt-4 flex justify-center">
                <a 
                  href={cardImage} 
                  download="valentine-card.png"
                  className="text-rose-600 text-sm font-semibold hover:underline flex items-center gap-2"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Card
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center text-rose-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p>Your beautiful card will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardGenerator;

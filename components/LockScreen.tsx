
import React, { useState } from 'react';

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleUnlock = () => {
    if (password.toUpperCase() === 'ARAKNET') {
      onUnlock();
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        setError(false);
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8 p-10 bg-[#0a0a0a] border border-gray-900 rounded-[2.5rem] shadow-2xl">
        <h1 className="text-5xl font-black italic text-[#00ff99] tracking-tighter logo-neon mb-2">GROK</h1>
        <div className="space-y-3">
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black">Accès Restreint Système</p>
          <div className="p-4 bg-black rounded-2xl border border-gray-900">
            <p className="text-[11px] text-[#facc15] font-black uppercase leading-relaxed">
              Contacter le +22990110479 pour avoir accès à la plateforme
            </p>
          </div>
        </div>
        
        <div className="space-y-5 text-left">
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-600 ml-1">Clé de sécurité ARAKNET</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
              placeholder="••••••••" 
              className={`w-full bg-black border border-gray-800 rounded-2xl px-4 py-5 text-center focus:border-[#00ff99] outline-none transition text-white text-xl tracking-[0.5em] mt-2 ${isShaking ? 'animate-shake' : ''}`}
            />
          </div>
          <button 
            onClick={handleUnlock}
            className="w-full bg-[#00ff99] text-black font-black py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(0,255,153,0.1)]"
          >
            Débloquer le système
          </button>
          {error && (
            <p className="text-red-500 text-[10px] font-black uppercase text-center animate-pulse">
              Accès refusé : Identifiants invalides
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LockScreen;

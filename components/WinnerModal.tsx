
import React from 'react';
import { TrophyIcon } from './icons/TrophyIcon';
import { XIcon } from './icons/XIcon';

interface WinnerModalProps {
  winner: string | null;
  onClose: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ winner, onClose }) => {
  if (!winner) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 rounded-2xl shadow-2xl border border-pink-500/50 text-center p-8 m-4 max-w-lg w-full relative transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
            <XIcon className="w-6 h-6" />
        </button>

        <div className="text-yellow-400 mb-4 flex justify-center">
            <TrophyIcon className="w-20 h-20 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-300">The Winner Is...</h2>
        <p className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 my-4 break-words">
          {winner}
        </p>
        <p className="text-slate-400 mb-6">Congratulations! You've won the raffle!</p>

        <button 
          onClick={onClose} 
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
};

export default WinnerModal;

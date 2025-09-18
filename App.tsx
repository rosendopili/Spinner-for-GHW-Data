import React, { useState, useCallback } from 'react';
import Spinner from './components/Spinner';
import WinnerModal from './components/WinnerModal';
import { XIcon } from './components/icons/XIcon';
import Confetti from './components/Confetti';
import Fireworks from './components/Fireworks';

const RAFFLE_COLORS = [
  '#ec4899', '#f87171', '#fb923c', '#facc15', '#a3e635',
  '#4ade80', '#34d399', '#2dd4bf', '#22d3ee', '#38bdf8',
  '#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#e879f9'
];

const App: React.FC = () => {
  const [participants, setParticipants] = useState<string[]>([]);
  const [nameInput, setNameInput] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningIndex, setWinningIndex] = useState<number | null>(null);

  const handleAddParticipant = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim() && !participants.includes(nameInput.trim())) {
      setParticipants([...participants, nameInput.trim()]);
      setNameInput('');
    }
  };

  const handleRemoveParticipant = (indexToRemove: number) => {
    setParticipants(participants.filter((_, index) => index !== indexToRemove));
  };

  const handleSpin = () => {
    if (participants.length < 2 || isSpinning) return;
    const newWinningIndex = Math.floor(Math.random() * participants.length);
    setWinningIndex(newWinningIndex);
    setIsSpinning(true);
  };
  
  const onSpinEnd = useCallback(() => {
      if(winningIndex !== null) {
        setWinner(participants[winningIndex]);
      }
      setIsSpinning(false);
  }, [winningIndex, participants]);


  const handleReset = () => {
    setParticipants([]);
    setNameInput('');
    setIsSpinning(false);
    setWinner(null);
    setWinningIndex(null);
  };
  
  const handleCloseModal = () => {
    setWinner(null);
    if (winningIndex !== null) {
      handleRemoveParticipant(winningIndex);
      setWinningIndex(null);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 font-sans text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-700/[0.2] [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        
        {/* Left Panel: Controls */}
        <div className="w-full max-w-md lg:w-1/3 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-slate-700">
          <header className="text-center mb-6">
            <h1 className="text-3xl font-bold text-pink-400">Raffle Spinner</h1>
            <p className="text-slate-400 mt-1">Add names and spin to win!</p>
          </header>

          <form onSubmit={handleAddParticipant} className="flex gap-2 mb-4">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Enter participant's name"
              className="flex-grow bg-slate-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 border border-slate-600"
              disabled={isSpinning}
            />
            <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-pink-800 disabled:cursor-not-allowed" disabled={!nameInput.trim() || isSpinning}>
              Add
            </button>
          </form>

          <div className="h-48 overflow-y-auto bg-slate-900/50 rounded-lg p-2 border border-slate-700">
            {participants.length === 0 ? (
                <p className="text-slate-500 text-center py-4">No participants yet.</p>
            ) : (
              <ul>
                {participants.map((name, index) => (
                  <li key={index} className="flex items-center justify-between bg-slate-800/70 p-2 rounded-md mb-2 text-sm group">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full" style={{ backgroundColor: RAFFLE_COLORS[index % RAFFLE_COLORS.length] }}></span>
                      <span className="truncate">{name}</span>
                    </div>
                    <button onClick={() => handleRemoveParticipant(index)} className="text-slate-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" disabled={isSpinning}>
                      <XIcon className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right Panel: Spinner */}
        <div className="w-full lg:w-2/3 flex flex-col items-center justify-center gap-6">
            <div className="relative w-full max-w-lg aspect-square">
                 <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 z-10 text-pink-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                    <svg width="40" height="60" viewBox="0 0 40 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 60C20 60 40 30 40 20C40 8.95431 31.0457 0 20 0C8.95431 0 0 8.95431 0 20C0 30 20 60 20 60Z"/>
                    </svg>
                </div>
                <Spinner
                    participants={participants}
                    colors={RAFFLE_COLORS}
                    isSpinning={isSpinning}
                    winningIndex={winningIndex}
                    onSpinEnd={onSpinEnd}
                />
            </div>
          <div className="flex gap-4">
            <button onClick={handleSpin} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100" disabled={participants.length < 2 || isSpinning}>
              {isSpinning ? 'Spinning...' : 'SPIN!'}
            </button>
            <button onClick={handleReset} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transition-colors disabled:opacity-50" disabled={isSpinning}>
              Reset
            </button>
          </div>
        </div>
      </div>
      
      <WinnerModal winner={winner} onClose={handleCloseModal} />
      <Confetti isActive={winner !== null} />
      <Fireworks isActive={winner !== null} />
    </div>
  );
};

export default App;
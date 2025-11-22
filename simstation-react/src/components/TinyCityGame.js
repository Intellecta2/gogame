import React, { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const TinyCityGame = ({ onExit }) => {
  const [stats, setStats] = useState({ population: 100, money: 5000, energy: 100 });
  const [buildings, setBuildings] = useState(0);
  const [day, setDay] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => ({
        ...prev,
        money: prev.money + (buildings * 5),
        energy: Math.max(0, prev.energy - 0.5)
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, [buildings]);

  const buildHouse = () => {
    if (stats.money >= 500) {
      setStats(prev => ({ ...prev, money: prev.money - 500, population: prev.population + 12 }));
      setBuildings(prev => prev + 1);
    }
  };

  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden flex flex-col">
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-20 pointer-events-none">
        <div className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl flex gap-6 text-white pointer-events-auto">
          <div>
            <p className="text-xs text-slate-400 font-bold tracking-wider">POPULATION</p>
            <p className="text-xl font-mono text-cyan-400">{stats.population.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold tracking-wider">FUNDS</p>
            <p className="text-xl font-mono text-emerald-400">${stats.money.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold tracking-wider">DAY</p>
            <p className="text-xl font-mono text-white">{day}</p>
          </div>
        </div>
        
        <div className="flex gap-2 pointer-events-auto">
          <button onClick={onExit} className="p-3 bg-red-500/20 hover:bg-red-500/40 text-red-200 rounded-full border border-red-500/50 transition-all">
            <Pause size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="grid grid-cols-4 gap-4 p-10 max-w-2xl">
          {Array.from({ length: Math.min(buildings + 1, 12) }).map((_, i) => (
            <div key={i} className={`
              w-24 h-24 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-all duration-500 hover:-translate-y-2 cursor-pointer
              ${i === buildings ? 'border-2 border-dashed border-white/30 bg-white/5 flex items-center justify-center' : 'bg-gradient-to-t from-indigo-600 to-cyan-400 border-t-4 border-cyan-200'}
            `}>
              {i === buildings ? <span className="text-xs text-white/50">New Plot</span> : <div className="w-8 h-12 bg-indigo-900/20 mx-auto mt-4 rounded-sm" />}
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-20">
        <button 
          onClick={buildHouse}
          disabled={stats.money < 500}
          className={`px-8 py-4 rounded-2xl font-bold text-lg shadow-lg backdrop-blur-sm border transition-all transform active:scale-95
          ${stats.money >= 500 
            ? 'bg-cyan-500 text-black hover:bg-cyan-400 border-cyan-300 shadow-cyan-500/20' 
            : 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'}`}
        >
          Construct Unit ($500)
        </button>
        <button className="px-6 py-4 bg-black/40 text-white border border-white/10 rounded-2xl hover:bg-black/60 transition-all">
          <Play size={24} />
        </button>
      </div>
    </div>
  );
};

export default TinyCityGame;
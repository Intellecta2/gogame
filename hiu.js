import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Home, 
  Trophy, 
  Settings, 
  User, 
  Zap, 
  Box, 
  Cpu, 
  Pause,
  Maximize2,
  Battery
} from 'lucide-react';

// --- MOCK DATA: THE SIMULATOR CATALOG ---
const GAMES = [
  {
    id: 'tiny-city',
    title: 'Tiny City',
    description: 'Scalable city life simulator. Manage traffic, economy, and zoning.',
    category: 'Strategy',
    rating: 4.9,
    players: '12k',
    image: 'bg-gradient-to-br from-blue-600 to-indigo-900',
    color: 'text-blue-400'
  },
  {
    id: 'farm-sprint',
    title: 'Farm Sprint',
    description: 'High-speed automated farming. optimize crop cycles.',
    category: 'Tycoon',
    rating: 4.7,
    players: '8k',
    image: 'bg-gradient-to-br from-green-600 to-emerald-900',
    color: 'text-green-400'
  },
  {
    id: 'cyber-repair',
    title: 'Cyber Repair',
    description: 'Fix androids and futuristic hardware before time runs out.',
    category: 'Puzzle',
    rating: 4.5,
    players: '5k',
    image: 'bg-gradient-to-br from-purple-600 to-fuchsia-900',
    color: 'text-purple-400'
  }
];

// --- COMPONENT: TINY CITY (THE ACTUAL GAME LOGIC) ---
const TinyCityGame = ({ onExit }) => {
  const [stats, setStats] = useState({ population: 100, money: 5000, energy: 100 });
  const [buildings, setBuildings] = useState(0);
  const [day, setDay] = useState(1);

  // Game Loop Simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => ({
        ...prev,
        money: prev.money + (buildings * 5), // Passive income
        energy: Math.max(0, prev.energy - 0.5) // Energy drain
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
      {/* HUD / Header */}
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

      {/* 3D Viewport Simulation */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        {/* Simple visual representation of the city growing */}
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

      {/* Game Controls */}
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
          <Maximize2 size={24} />
        </button>
      </div>
    </div>
  );
};

// --- COMPONENT: HUB UI ---
const HubView = ({ launchGame }) => {
  return (
    <div className="p-6 pb-24 md:p-8 md:pb-8 overflow-y-auto h-full">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 tracking-tight">
            SimStation
          </h1>
          <p className="text-slate-400 text-sm mt-1">v1.0.4 • Connected to US-East</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-white/5">
            <Zap size={16} className="text-yellow-400" fill="currentColor" />
            <span className="font-bold text-white">2,450</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 border-2 border-white/20" />
        </div>
      </header>

      {/* Featured / Hero Card */}
      <section className="mb-10">
        <div className="relative w-full h-64 md:h-80 rounded-3xl overflow-hidden group cursor-pointer shadow-2xl shadow-indigo-500/10 border border-white/10" onClick={() => launchGame('tiny-city')}>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 transition-transform duration-700 group-hover:scale-105" />
          {/* Decorative Grid */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <span className="px-3 py-1 rounded-md bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30 mb-3 inline-block">
              FLAGSHIP • UPDATED
            </span>
            <h2 className="text-4xl font-black text-white mb-2 drop-shadow-lg">Tiny City</h2>
            <p className="text-slate-300 max-w-lg mb-6 text-sm md:text-base">
              Build the metropolis of your dreams. Now with AI-driven traffic systems and modular economy.
            </p>
            <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-cyan-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              <Play size={18} fill="black" /> Play Now
            </button>
          </div>
        </div>
      </section>

      {/* Game Grid */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-xl font-bold text-white">Top Rated Simulations</h3>
          <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">View All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GAMES.map((game) => (
            <div key={game.id} className="bg-slate-800/40 border border-white/5 rounded-2xl p-4 hover:bg-slate-800/60 transition-all group hover:border-white/10 cursor-pointer" onClick={() => launchGame(game.id)}>
              <div className={`h-40 rounded-xl mb-4 relative overflow-hidden ${game.image}`}>
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm">
                    <Play size={32} className="text-white drop-shadow-md" fill="white" />
                 </div>
              </div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">{game.title}</h4>
                <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold bg-yellow-400/10 px-2 py-1 rounded-md">
                  <Zap size={12} fill="currentColor" /> {game.rating}
                </div>
              </div>
              <p className="text-slate-400 text-sm mb-4 line-clamp-2">{game.description}</p>
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>{game.category.toUpperCase()}</span>
                <span className="flex items-center gap-1"><User size={12} /> {game.players}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- COMPONENT: MAIN APP SHELL ---
export default function SimStationApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeGame, setActiveGame] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulating the "Boot up" of a game engine
  const handleLaunchGame = (gameId) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setActiveGame(gameId);
    }, 1500); // 1.5s fake loading time
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-cyan-500/30">
      
      {/* LAYOUT CONTAINER */}
      <div className="flex h-screen overflow-hidden">
        
        {/* SIDEBAR NAVIGATION (Desktop) */}
        {!activeGame && (
          <nav className="hidden md:flex w-20 lg:w-64 flex-col border-r border-white/5 bg-slate-900/50 backdrop-blur-xl p-4 justify-between">
            <div className="space-y-2">
              <div className="h-12 mb-8 flex items-center justify-center lg:justify-start px-2">
                <Box className="text-cyan-400 w-8 h-8" />
                <span className="hidden lg:block font-bold text-xl ml-3 text-white tracking-tighter">SimStation</span>
              </div>
              
              {[
                { id: 'home', icon: Home, label: 'Hub' },
                { id: 'discover', icon: Cpu, label: 'Discover' },
                { id: 'leaderboard', icon: Trophy, label: 'Rankings' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                    activeTab === item.id 
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="hidden lg:block font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                <Settings size={20} />
                <span className="hidden lg:block font-medium">Settings</span>
              </button>
            </div>
          </nav>
        )}

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 relative overflow-hidden">
          {isLoading ? (
            // LOADING SCREEN
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 z-50">
              <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mb-8" />
              <h2 className="text-2xl font-bold text-white tracking-widest animate-pulse">INITIALIZING ENGINE</h2>
              <p className="text-slate-500 mt-2 font-mono text-sm">Loading Assets... (24ms)</p>
            </div>
          ) : activeGame === 'tiny-city' ? (
            // GAME RUNNER
            <TinyCityGame onExit={() => setActiveGame(null)} />
          ) : (
            // HUB DASHBOARD
            <HubView launchGame={handleLaunchGame} />
          )}
        </main>

      </div>

      {/* MOBILE BOTTOM NAV (Only visible on small screens & if no game is playing) */}
      {!activeGame && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-slate-900/90 backdrop-blur-xl border-t border-white/5 flex justify-around items-center px-6 z-40 safe-area-pb">
          {[
            { id: 'home', icon: Home },
            { id: 'discover', icon: Cpu },
            { id: 'leaderboard', icon: Trophy },
            { id: 'profile', icon: User },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-2 rounded-xl transition-colors ${activeTab === item.id ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-500'}`}
            >
              <item.icon size={24} />
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
import React from 'react';
import { Play, Zap, User } from 'lucide-react';

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
          {/* Game cards will be rendered here */}
        </div>
      </section>
    </div>
  );
};

export default HubView;
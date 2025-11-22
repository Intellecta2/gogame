import React from 'react';
import { Home, Cpu, Trophy, Settings } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="hidden md:flex w-20 lg:w-64 flex-col border-r border-white/5 bg-slate-900/50 backdrop-blur-xl p-4 justify-between">
      <div className="space-y-2">
        <div className="h-12 mb-8 flex items-center justify-center lg:justify-start px-2">
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
  );
};

export default Sidebar;
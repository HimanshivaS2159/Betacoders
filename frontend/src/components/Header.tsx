import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="glass sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <ChefHat className="text-indigo-400" size={32} />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Flavour Verse
              </h1>
              <p className="text-xs text-gray-400">
                Culinary Intelligence Platform
              </p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">Live</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
              <span className="text-indigo-400 text-sm font-medium">AI Powered</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

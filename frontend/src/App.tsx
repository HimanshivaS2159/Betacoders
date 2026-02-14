import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Beaker, Sparkles, Brain, Flame } from 'lucide-react';
import SubstitutionFinder from './components/SubstitutionFinder.tsx';
import FlavorAnalyzer from './components/FlavorAnalyzer.tsx';
import SmartAssistant from './components/SmartAssistant.tsx';
import CalorieAnalyzer from './components/CalorieAnalyzer.tsx';
import Header from './components/Header.tsx';
import { Toaster } from 'react-hot-toast';

export type TabType = 'substitution' | 'flavor' | 'assistant' | 'calories';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('substitution');

  const tabs = [
    {
      id: 'substitution' as TabType,
      label: 'Ingredient Substitution',
      icon: ChefHat,
      description: 'Find perfect substitutes for any ingredient',
      gradient: 'substitution-gradient'
    },
    {
      id: 'flavor' as TabType,
      label: 'Flavor Analysis',
      icon: Beaker,
      description: 'Discover flavor profiles and combinations',
      gradient: 'flavor-gradient'
    },
    {
      id: 'assistant' as TabType,
      label: 'Smart Assistant',
      icon: Brain,
      description: 'AI-powered dietary analysis and recommendations',
      gradient: 'assistant-gradient'
    },
    {
      id: 'calories' as TabType,
      label: 'Calorie Calculator',
      icon: Flame,
      description: 'Calculate calories and nutritional information',
      gradient: 'calorie-gradient'
    }
  ];

  return (
    <div className="min-h-screen relative">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500'
          },
        }}
      />
      
      <Header />
      
      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-gradient">
            Flavour Verse
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light">
            Your Culinary Intelligence Companion
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg'
                      : 'bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
            {tabs.find(tab => tab.id === activeTab)?.description}
          </p>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          {activeTab === 'substitution' ? <SubstitutionFinder /> : 
           activeTab === 'flavor' ? <FlavorAnalyzer /> : 
           activeTab === 'assistant' ? <SmartAssistant /> : 
           <CalorieAnalyzer />}
        </motion.div>
      </main>
      
      <footer className="mt-24 pb-12 text-center text-gray-500 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles size={16} className="text-orange-400" />
          <span className="text-gray-400 font-medium">Powered by Culinary AI</span>
          <Sparkles size={16} className="text-orange-400" />
        </div>
        <p className="text-sm text-gray-600">
          Discover the art of flavor science
        </p>
      </footer>
    </div>
  );
}

export default App;

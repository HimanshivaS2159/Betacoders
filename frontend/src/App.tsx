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
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(251, 146, 60, 0.2)',
            color: 'white',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500'
          },
        }}
      />
      
      <Header />
      
      <main className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="text-6xl md:text-7xl font-black mb-6 text-gradient"
            style={{ backgroundSize: '200% 200%' }}
          >
            Flavour Verse
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-2xl text-orange-400 mb-12 font-light tracking-wide"
          >
            Your Culinary Intelligence Companion
          </motion.p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12 px-4">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover-lift text-sm md:text-base md:px-8 md:py-5 ${
                    activeTab === tab.id
                      ? 'text-white shadow-2xl'
                      : 'text-gray-400 hover:text-orange-400'
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} rounded-2xl glow`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="relative flex items-center gap-2 md:gap-3">
                    <motion.div
                      animate={{ rotate: activeTab === tab.id ? 360 : 0 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                    >
                      <Icon size={20} className="md:size-24" />
                    </motion.div>
                    <span className="text-sm md:text-lg">{tab.label}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
          
          <motion.p
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed px-4"
          >
            {tabs.find(tab => tab.id === activeTab)?.description}
          </motion.p>
        </motion.div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-5xl mx-auto px-4"
        >
          {activeTab === 'substitution' ? <SubstitutionFinder /> : 
           activeTab === 'flavor' ? <FlavorAnalyzer /> : 
           activeTab === 'assistant' ? <SmartAssistant /> : 
           <CalorieAnalyzer />}
        </motion.div>
      </main>
      
      <footer className="mt-24 pb-12 text-center text-gray-400 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles size={20} className="text-orange-400" />
          </motion.div>
          <span className="text-white text-lg font-medium">Powered by Culinary AI</span>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles size={20} className="text-orange-400" />
          </motion.div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-gray-500 text-sm font-light"
        >
          Discover the art of flavor science
        </motion.p>
      </footer>
    </div>
  );
}

export default App;

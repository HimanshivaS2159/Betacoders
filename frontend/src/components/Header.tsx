import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="glass-effect sticky top-0 z-50 border-b border-white/10"
    >
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="relative"
              >
                <ChefHat className="text-white" size={36} />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles 
                    className="text-yellow-300" 
                    size={18}
                  />
                </motion.div>
              </motion.div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Flavour Verse
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-orange-400 text-sm font-medium"
              >
                Culinary Intelligence Platform
              </motion.p>
            </div>
          </motion.div>
          
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="hidden md:flex items-center gap-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full pulsing"></div>
              <span className="text-white/90 text-sm font-medium">Live</span>
            </motion.div>
            <motion.div
              animate={{ 
                background: [
                  'linear-gradient(90deg, #fb923c, #f97316)',
                  'linear-gradient(90deg, #f97316, #ea580c)',
                  'linear-gradient(90deg, #fb923c, #f97316)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="px-4 py-2 rounded-full text-white text-sm font-semibold"
              style={{ backgroundSize: '200% 200%' }}
            >
              AI Powered
            </motion.div>
          </motion.nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

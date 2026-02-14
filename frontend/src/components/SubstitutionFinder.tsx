import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChefHat, AlertCircle, CheckCircle, Clock, TrendingUp, Filter, Star, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { getSubstitution } from '../services/api.ts';

interface SubstitutionResult {
  ingredient: string;
  score: number;
}

const SubstitutionFinder: React.FC = () => {
  const [ingredient, setIngredient] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SubstitutionResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'score' | 'name'>('score');

  const handleSearch: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!ingredient.trim()) {
      toast.error('Please enter an ingredient name');
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const data = await getSubstitution(ingredient);
      if (data.error) {
        setError(data.error);
        toast.error(data.error);
      } else {
        let sortedResults = Array.isArray(data) ? data : data.substitutes || [];
        
        // Sort results based on selected criteria
        if (sortBy === 'score') {
          sortedResults.sort((a: SubstitutionResult, b: SubstitutionResult) => b.score - a.score);
        } else {
          sortedResults.sort((a: SubstitutionResult, b: SubstitutionResult) => a.ingredient.localeCompare(b.ingredient));
        }
        
        setResults(sortedResults);
        
        // Add to search history
        if (!searchHistory.includes(ingredient.toLowerCase())) {
          setSearchHistory(prev => [ingredient.toLowerCase(), ...prev.slice(0, 9)]);
        }
        
        if (sortedResults.length > 0) {
          toast.success(`Found ${sortedResults.length} substitutes for ${ingredient}`);
        }
      }
    } catch (error) {
      toast.error('Failed to fetch substitutions');
      setError('Failed to fetch substitutions');
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
    toast.success('Search history cleared');
  };

  const loadFromHistory = (item: string) => {
    setIngredient(item);
  };

  const getPopularIngredients = () => [
    'milk', 'butter', 'cheese', 'eggs', 'flour', 'sugar', 'dairy',
    'chicken', 'beef', 'rice', 'pasta', 'broccoli', 'tomato', 'onion', 'garlic'
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    return 'Possible Match';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="glass-effect rounded-3xl p-6 md:p-10 shadow-2xl hover-lift"
    >
      <div className="text-center mb-8 md:mb-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="inline-block mb-4 md:mb-6"
        >
          <div className="relative">
            <ChefHat className="text-white md:size-56" size={40} />
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="text-yellow-300 md:size-20" size={16} />
            </motion.div>
          </div>
        </motion.div>
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-3">
          Ingredient Substitution
        </h2>
        <p className="text-white/70 text-sm md:text-lg font-light">
          Find the perfect substitutes for any ingredient
        </p>
      </div>

      <form onSubmit={handleSearch} className="mb-8 md:mb-10">
        <div className="relative group">
          <input
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="Enter an ingredient (e.g., milk, butter, cheese, eggs, flour, sugar)..."
            className="w-full px-6 py-4 md:px-8 md:py-5 pr-12 md:pr-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-transparent transition-all duration-300 text-base md:text-lg font-light"
            disabled={loading}
          />
          <motion.div
            animate={{ rotate: loading ? 360 : 0 }}
            transition={{ duration: 1, repeat: loading ? Infinity : 0, ease: 'linear' }}
            className="absolute right-4 md:right-5 top-1/2 transform -translate-y-1/2"
          >
            <Search
              className={`text-white/50 ${loading ? 'text-orange-400' : ''} md:size-28`}
              size={20}
            />
          </motion.div>
        </div>
        
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className="w-full mt-4 md:mt-6 px-6 py-4 md:px-8 md:py-5 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-base md:text-lg glow"
        >
          {loading ? (
            <>
              <div className="loading-spinner" />
              <span>Finding Substitutes...</span>
            </>
          ) : (
            <>
              <Search size={20} className="md:size-24" />
              <span>Find Substitutes</span>
            </>
          )}
        </motion.button>
      </form>

      {results.length === 0 && !loading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 md:mb-8 p-4 md:p-6 bg-blue-500/20 border border-blue-400/30 rounded-2xl"
        >
          <p className="text-blue-200 text-base md:text-lg font-medium mb-3 md:mb-4 flex items-center gap-2">
            <span className="text-xl md:text-2xl">💡</span>
            Try these popular ingredients:
          </p>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {['milk', 'butter', 'cheese', 'eggs', 'flour', 'sugar', 'dairy'].map((ing, index) => (
              <motion.button
                key={ing}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIngredient(ing)}
                className="px-3 py-2 md:px-4 md:py-2 bg-blue-500/30 hover:bg-blue-500/40 text-blue-200 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 hover-lift"
              >
                {ing}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-6 md:mb-8 p-4 md:p-6 bg-red-500/20 border border-red-400/30 rounded-2xl flex items-center gap-3 md:gap-4"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: 2 }}
          >
            <AlertCircle className="text-red-400 md:size-24" size={20} />
          </motion.div>
          <p className="text-red-200 text-base md:text-lg font-medium">{error}</p>
        </motion.div>
      )}

      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <motion.div 
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <CheckCircle className="text-green-400" size={32} />
            </motion.div>
            <h3 className="text-2xl font-bold text-white">
              Found {results.length} Substitutes
            </h3>
          </motion.div>
          
          {results.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-8 hover:bg-white/15 transition-all duration-300 hover-lift"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h4 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">
                    {result.ingredient}
                  </h4>
                  <p className="text-white/60 text-sm md:text-base font-medium">
                    {getScoreLabel(result.score)}
                  </p>
                </div>
                <div className="text-right">
                  <motion.div 
                    className={`text-2xl md:text-3xl font-bold ${getScoreColor(result.score)}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5, type: 'spring' }}
                  >
                    {result.score}%
                  </motion.div>
                  <div className="w-24 md:w-32 h-2 md:h-3 bg-white/20 rounded-full overflow-hidden mt-2 md:mt-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.score}%` }}
                      transition={{ delay: index * 0.1 + 0.4, duration: 0.8, ease: 'easeOut' }}
                      className={`h-full rounded-full ${
                        result.score >= 80 ? 'bg-green-400' :
                        result.score >= 60 ? 'bg-yellow-400' : 'bg-orange-400'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default SubstitutionFinder;

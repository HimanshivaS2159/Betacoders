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
    <div className="card animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/10 rounded-full mb-4">
          <ChefHat className="text-orange-400" size={32} />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Ingredient Substitution
        </h2>
        <p className="text-gray-400">
          Find the perfect substitutes for any ingredient
        </p>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative mb-4">
          <input
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="Enter an ingredient (e.g., milk, butter, cheese, eggs, flour, sugar)..."
            className="input-field pr-12"
            disabled={loading}
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {loading ? (
              <div className="loading-spinner"></div>
            ) : (
              <Search className="text-gray-400" size={20} />
            )}
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? (
            <>
              <div className="loading-spinner"></div>
              <span>Finding Substitutes...</span>
            </>
          ) : (
            <>
              <Search size={20} />
              <span>Find Substitutes</span>
            </>
          )}
        </button>
      </form>

      {results.length === 0 && !loading && !error && (
        <div className="glass-light rounded-xl p-6 mb-6">
          <p className="text-orange-400 font-medium mb-4 flex items-center gap-2">
            <span className="text-lg">💡</span>
            Try these popular ingredients:
          </p>
          <div className="flex flex-wrap gap-2">
            {['milk', 'butter', 'cheese', 'eggs', 'flour', 'sugar', 'dairy'].map((ing) => (
              <button
                key={ing}
                onClick={() => setIngredient(ing)}
                className="px-3 py-1 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-lg text-sm font-medium transition-colors duration-200 border border-orange-500/20"
              >
                {ing}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="glass-light rounded-xl p-6 mb-6 border border-red-500/20">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-red-400" size={20} />
            <p className="text-red-400 font-medium">{error}</p>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-green-500/10 rounded-full flex-center">
              <CheckCircle className="text-green-400" size={20} />
            </div>
            <h3 className="text-xl font-bold text-white">
              Found {results.length} Substitutes
            </h3>
          </div>
          
          {results.map((result, index) => (
            <div
              key={index}
              className="card hover:border-orange-500/50 animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">
                    {result.ingredient}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {getScoreLabel(result.score)}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${
                    result.score >= 80 ? 'text-green-400' :
                    result.score >= 60 ? 'text-yellow-400' : 'text-orange-400'
                  }`}>
                    {result.score}%
                  </div>
                  <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden mt-2">
                    <div 
                      className={`h-full rounded-full transition-all duration-800 ease-out ${
                        result.score >= 80 ? 'bg-green-400' :
                        result.score >= 60 ? 'bg-yellow-400' : 'bg-orange-400'
                      }`}
                      style={{ width: `${result.score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubstitutionFinder;

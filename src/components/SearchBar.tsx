import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, type: 'name' | 'ingredient') => void;
  onRandomMeal: () => void;
}

export default function SearchBar({ onSearch, onRandomMeal }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'ingredient'>('name');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), searchType);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Discover Delicious Meals
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Search by meal name or ingredient to find your next favorite dish
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Search Type Toggle */}
          <div className="flex justify-center">
            <div className="bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setSearchType('name')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  searchType === 'name'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Meal Name
              </button>
              <button
                type="button"
                onClick={() => setSearchType('ingredient')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  searchType === 'ingredient'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Ingredient
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                searchType === 'name'
                  ? 'Search for meals (e.g., "Chicken Curry")'
                  : 'Search by ingredient (e.g., "Chicken")'
              }
              className="input-field pl-10 pr-4 py-3 text-lg"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="submit"
              disabled={!query.trim()}
              className="btn-primary flex-1 sm:flex-none flex items-center justify-center space-x-2 py-3 px-6"
            >
              <Search className="w-5 h-5" />
              <span>Search Meals</span>
            </button>
            <button
              type="button"
              onClick={onRandomMeal}
              className="btn-secondary flex-1 sm:flex-none flex items-center justify-center space-x-2 py-3 px-6"
            >
              <Filter className="w-5 h-5" />
              <span>Random Meal</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 
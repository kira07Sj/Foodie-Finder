import { useState, useEffect } from 'react';
import { Search, UtensilsCrossed, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { favoritesService } from '../services/favoritesService';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    // Update favorites count on mount and when it changes
    const updateFavoritesCount = () => {
      setFavoritesCount(favoritesService.getFavoritesCount());
    };

    updateFavoritesCount();

    // Listen for storage changes (when favorites are updated in other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'foodie-finder-favorites') {
        updateFavoritesCount();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-lg">
              <UtensilsCrossed className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Foodie Finder</h1>
              <p className="text-xs text-gray-500">Discover Meals Around the World</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              to="/categories" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Categories
            </Link>
            <Link 
              to="/random" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Random Meal
            </Link>
            <Link 
              to="/favorites" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 flex items-center space-x-1"
            >
              <Heart className="w-4 h-4" />
              <span>Favorites</span>
              {favoritesCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full p-2 min-w-[20px] flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Search Icon for Mobile */}
          <button 
            className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
            onClick={() => onSearch && onSearch('')}
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
} 
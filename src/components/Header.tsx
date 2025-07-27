import { Search, UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
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
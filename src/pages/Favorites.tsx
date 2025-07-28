import { useState, useEffect } from 'react';
import { Loader2, ArrowLeft, Heart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import MealCard from '../components/MealCard';
import { favoritesService, type FavoriteMeal } from '../services/favoritesService';

export default function Favorites() {
  const [favorites, setFavorites] = useState<FavoriteMeal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load favorites from localStorage
    const loadFavorites = () => {
      const storedFavorites = favoritesService.getFavorites();
      setFavorites(storedFavorites);
      setLoading(false);
    };

    loadFavorites();
  }, []);

  const removeFromFavorites = (mealId: string) => {
    const success = favoritesService.removeFromFavorites(mealId);
    if (success) {
      setFavorites(prev => prev.filter(fav => fav.idMeal !== mealId));
    }
  };

  const clearAllFavorites = () => {
    favoritesService.clearFavorites();
    setFavorites([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Heart className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
          </div>
          <p className="text-gray-600">
            Your saved favorite meals from around the world
          </p>
        </div>

        {/* Favorites Content */}
        {favorites.length > 0 ? (
          <div>
            {/* Actions */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Favorite Meals
                </h2>
                <span className="text-gray-600">{favorites.length} meal{favorites.length !== 1 ? 's' : ''} saved</span>
              </div>
              <button
                onClick={clearAllFavorites}
                className="btn-secondary inline-flex items-center space-x-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            </div>

            {/* Favorites Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((meal) => (
                <div key={meal.idMeal} className="relative group">
                  <MealCard meal={meal} />
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromFavorites(meal.idMeal)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  {/* Added Date */}
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Added {new Date(meal.addedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h3>
            <p className="text-gray-600 mb-6">
              You haven't saved any meals to your favorites yet. Start exploring and add some delicious meals!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="btn-primary">
                Search Meals
              </Link>
              <Link to="/categories" className="btn-secondary">
                Browse Categories
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
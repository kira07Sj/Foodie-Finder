import { useState, useEffect } from 'react';
import { MapPin, ChefHat, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Meal } from '../services/mealApi';
import { favoritesService } from '../services/favoritesService';

interface MealCardProps {
  meal: Meal;
  showFavoriteButton?: boolean;
}

export default function MealCard({ meal, showFavoriteButton = true }: MealCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favoritesService.isFavorite(meal.idMeal));
  }, [meal.idMeal]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the heart button
    e.stopPropagation();
    
    if (isFavorite) {
      favoritesService.removeFromFavorites(meal.idMeal);
      setIsFavorite(false);
    } else {
      favoritesService.addToFavorites(meal);
      setIsFavorite(true);
    }
  };

  return (
    <Link 
      to={`/meal/${meal.idMeal}`}
      className="card p-4 h-full flex flex-col group hover:scale-105 transition-transform duration-200 relative"
    >
      {/* Favorite Button */}
      {showFavoriteButton && (
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all duration-200"
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart 
            className={`w-4 h-4 transition-colors duration-200 ${
              isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-500'
            }`} 
          />
        </button>
      )}

      {/* Meal Image */}
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
      </div>

      {/* Meal Info */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
          {meal.strMeal}
        </h3>

        {/* Meal Details */}
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          {meal.strCategory && (
            <div className="flex items-center space-x-2">
              <ChefHat className="w-4 h-4 text-primary-500" />
              <span>{meal.strCategory}</span>
            </div>
          )}
          {meal.strArea && (
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-primary-500" />
              <span>{meal.strArea}</span>
            </div>
          )}
        </div>

        {/* View Details Button */}
        <div className="mt-auto">
          <div className="text-primary-600 font-medium text-sm group-hover:text-primary-700 transition-colors duration-200">
            View Recipe →
          </div>
        </div>
      </div>
    </Link>
  );
} 
import { MapPin, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Meal } from '../services/mealApi';

interface MealCardProps {
  meal: Meal;
}

export default function MealCard({ meal }: MealCardProps) {
  return (
    <Link 
      to={`/meal/${meal.idMeal}`}
      className="card p-4 h-full flex flex-col group hover:scale-105 transition-transform duration-200"
    >
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
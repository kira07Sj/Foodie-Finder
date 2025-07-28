import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, AlertCircle, ArrowLeft, MapPin, ChefHat, Play, ExternalLink, Heart } from 'lucide-react';
import { mealApi, type Meal } from '../services/mealApi';
import { favoritesService } from '../services/favoritesService';

export default function MealDetail() {
  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMeal = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);

      try {
        const mealData = await mealApi.getMealById(id);
        setMeal(mealData);
        if (mealData) {
          setIsFavorite(favoritesService.isFavorite(mealData.idMeal));
        }
      } catch (err) {
        setError('Failed to load meal details. Please try again.');
        console.error('Meal detail error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  const toggleFavorite = () => {
    if (!meal) return;
    
    if (isFavorite) {
      favoritesService.removeFromFavorites(meal.idMeal);
      setIsFavorite(false);
    } else {
      favoritesService.addToFavorites(meal);
      setIsFavorite(true);
    }
  };

  const getIngredients = (meal: Meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}` as keyof Meal] as string;
      const measure = meal[`strMeasure${i}` as keyof Meal] as string;
      
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : ''
        });
      }
    }
    return ingredients;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading meal details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">{error}</p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Meal not found</p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const ingredients = getIngredients(meal);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search</span>
        </Link>

        {/* Meal Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="md:flex">
            {/* Meal Image */}
            <div className="md:w-1/2 relative">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-64 md:h-full object-cover"
              />
              
              {/* Favorite Button */}
              <button
                onClick={toggleFavorite}
                className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 p-3 rounded-full shadow-lg transition-all duration-200"
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart 
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-500'
                  }`} 
                />
              </button>
            </div>

            {/* Meal Info */}
            <div className="md:w-1/2 p-6 md:p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{meal.strMeal}</h1>
              
              <div className="space-y-3 mb-6">
                {meal.strCategory && (
                  <div className="flex items-center space-x-2">
                    <ChefHat className="w-5 h-5 text-primary-500" />
                    <span className="text-gray-700">
                      <span className="font-medium">Category:</span> {meal.strCategory}
                    </span>
                  </div>
                )}
                
                {meal.strArea && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-primary-500" />
                    <span className="text-gray-700">
                      <span className="font-medium">Origin:</span> {meal.strArea}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {meal.strYoutube && (
                  <a
                    href={meal.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center space-x-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                
                <button
                  onClick={toggleFavorite}
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    isFavorite 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500' : ''}`} />
                  <span>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
            <div className="space-y-3">
              {ingredients.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">{item.ingredient}</span>
                    {item.measure && (
                      <span className="text-gray-600 ml-2">({item.measure})</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
            <div className="prose prose-gray max-w-none">
              {meal.strInstructions.split('\n').map((instruction, index) => (
                instruction.trim() && (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {instruction.trim()}
                  </p>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
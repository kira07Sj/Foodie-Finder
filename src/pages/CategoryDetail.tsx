import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, AlertCircle, ArrowLeft, ChefHat } from 'lucide-react';
import MealCard from '../components/MealCard';
import { mealApi, type Meal } from '../services/mealApi';

export default function CategoryDetail() {
  const { category } = useParams<{ category: string }>();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategoryMeals = async () => {
      if (!category) return;
      
      setLoading(true);
      setError(null);

      try {
        const mealsData = await mealApi.getMealsByCategory(category);
        setMeals(mealsData);
      } catch (err) {
        setError('Failed to load category meals. Please try again.');
        console.error('Category meals error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryMeals();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading category meals...</p>
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
          <Link to="/categories" className="btn-primary">
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          to="/categories" 
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Categories</span>
        </Link>

        {/* Category Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <ChefHat className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">{category}</h1>
          </div>
          <p className="text-gray-600">
            Discover delicious {category?.toLowerCase()} meals from around the world
          </p>
        </div>

        {/* Meals Grid */}
        {meals.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {category} Meals
              </h2>
              <span className="text-gray-600">{meals.length} meal{meals.length !== 1 ? 's' : ''} found</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {meals.map((meal) => (
                <MealCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <ChefHat className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No meals found</h3>
            <p className="text-gray-600 mb-4">
              No meals found in the {category} category. Try another category!
            </p>
            <Link to="/categories" className="btn-primary">
              Browse Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 
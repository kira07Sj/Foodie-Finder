import { useState, useEffect } from 'react';
import { Loader2, AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import MealCard from '../components/MealCard';
import { mealApi, type Meal } from '../services/mealApi';

export default function RandomMeal() {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRandomMeal = async () => {
    setLoading(true);
    setError(null);

    try {
      const randomMeal = await mealApi.getRandomMeal();
      setMeal(randomMeal);
    } catch (err) {
      setError('Failed to get random meal. Please try again.');
      console.error('Random meal error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRandomMeal();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Finding a random meal for you...</p>
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
          <button onClick={loadRandomMeal} className="btn-primary mr-4">
            Try Again
          </button>
          <Link to="/" className="btn-secondary">
            Back to Home
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
          to="/" 
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Random Meal Discovery</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Discover new and exciting meals from around the world. Click the button below to find another random meal!
          </p>
          <button
            onClick={loadRandomMeal}
            disabled={loading}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Get Another Random Meal</span>
          </button>
        </div>

        {/* Random Meal Display */}
        {meal && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Random Meal</h2>
              <p className="text-gray-600">Here's what we found for you today!</p>
            </div>
            
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                <MealCard meal={meal} />
              </div>
            </div>
          </div>
        )}

        {/* Additional Options */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Not satisfied with this meal? Try searching for something specific!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-secondary">
              Search Meals
            </Link>
            <Link to="/categories" className="btn-secondary">
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
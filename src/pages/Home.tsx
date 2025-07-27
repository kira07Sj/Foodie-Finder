import { useState, useEffect } from 'react';
import { Loader2, AlertCircle, ChefHat, Search, Filter } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import MealCard from '../components/MealCard';
import { mealApi, type Meal } from '../services/mealApi';

export default function Home() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [featuredMeals, setFeaturedMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Load featured meals on component mount
  useEffect(() => {
    const loadFeaturedMeals = async () => {
      try {
        // Get some popular meals by searching for common ingredients
        const chickenMeals = await mealApi.searchMealsByIngredient('chicken');
        const beefMeals = await mealApi.searchMealsByIngredient('beef');
        const pastaMeals = await mealApi.searchMealsByIngredient('pasta');
        
        // Combine and take first 8 meals
        const allMeals = [...chickenMeals, ...beefMeals, ...pastaMeals];
        const uniqueMeals = allMeals.filter((meal, index, self) => 
          index === self.findIndex(m => m.idMeal === meal.idMeal)
        );
        
        setFeaturedMeals(uniqueMeals.slice(0, 8));
      } catch (err) {
        console.error('Failed to load featured meals:', err);
      }
    };

    loadFeaturedMeals();
  }, []);

  const handleSearch = async (query: string, type: 'name' | 'ingredient') => {
    setLoading(true);
    setError(null);
    setSearchQuery(query);

    try {
      let results: Meal[];
      if (type === 'name') {
        results = await mealApi.searchMealsByName(query);
      } else {
        results = await mealApi.searchMealsByIngredient(query);
      }
      setMeals(results);
    } catch (err) {
      setError('Failed to search meals. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRandomMeal = async () => {
    setLoading(true);
    setError(null);
    setSearchQuery('');

    try {
      const randomMeal = await mealApi.getRandomMeal();
      if (randomMeal) {
        setMeals([randomMeal]);
      }
    } catch (err) {
      setError('Failed to get random meal. Please try again.');
      console.error('Random meal error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <SearchBar onSearch={handleSearch} onRandomMeal={handleRandomMeal} />

        {/* Results Section */}
        <div className="space-y-6">
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-primary-600 animate-spin mb-4" />
              <p className="text-gray-600">Searching for delicious meals...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="w-8 h-8 text-red-500 mb-4" />
              <p className="text-gray-600 text-center">{error}</p>
              <button
                onClick={() => setError(null)}
                className="btn-primary mt-4"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Search Results */}
          {!loading && !error && meals.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {searchQuery ? `Search Results for "${searchQuery}"` : 'Random Meal'}
                </h2>
                <span className="text-gray-600">{meals.length} meal{meals.length !== 1 ? 's' : ''} found</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {meals.map((meal) => (
                  <MealCard key={meal.idMeal} meal={meal} />
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {!loading && !error && meals.length === 0 && searchQuery && (
            <div className="flex flex-col items-center justify-center py-12">
              <ChefHat className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No meals found</h3>
              <p className="text-gray-600 text-center mb-4">
                We couldn't find any meals matching "{searchQuery}". Try searching with different keywords.
              </p>
              <button
                onClick={() => {
                  setMeals([]);
                  setSearchQuery('');
                }}
                className="btn-primary"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Welcome State with Featured Meals */}
          {!loading && !error && meals.length === 0 && !searchQuery && (
            <div className="space-y-8">
              {/* Welcome Header */}
              <div className="text-center">
                <ChefHat className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Welcome to Foodie Finder
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                  Discover delicious meals from around the world. Search by meal name or ingredient, 
                  explore categories, or try our random meal generator to find your next favorite dish!
                </p>
                
                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                  <div className="card p-6 text-center">
                    <Search className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Search Meals</h3>
                    <p className="text-sm text-gray-600">Find meals by name or ingredient</p>
                  </div>
                  <div className="card p-6 text-center">
                    <ChefHat className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Browse Categories</h3>
                    <p className="text-sm text-gray-600">Explore meals by category</p>
                  </div>
                  <div className="card p-6 text-center">
                    <Filter className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Random Discovery</h3>
                    <p className="text-sm text-gray-600">Try something new and exciting</p>
                  </div>
                </div>
              </div>

              {/* Featured Meals */}
              {featuredMeals.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Featured Meals</h2>
                    <span className="text-gray-600">Popular dishes to try</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {featuredMeals.map((meal) => (
                      <MealCard key={meal.idMeal} meal={meal} />
                    ))}
                  </div>
                  
                  <div className="text-center mt-8">
                    <p className="text-gray-600 mb-4">
                      Can't find what you're looking for? Try searching above!
                    </p>
                    <button
                      onClick={handleRandomMeal}
                      className="btn-primary inline-flex items-center space-x-2"
                    >
                      <Filter className="w-4 h-4" />
                      <span>Discover Random Meal</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
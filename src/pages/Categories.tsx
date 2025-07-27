import { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mealApi, type Category } from '../services/mealApi';

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await mealApi.getCategories();
        setCategories(categoriesData);
      } catch (err) {
        setError('Failed to load categories. Please try again.');
        console.error('Categories error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading categories...</p>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Meal Categories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore meals by category. Click on any category to see all available meals in that category.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.idCategory}
              to={`/category/${category.strCategory}`}
              className="card p-6 text-center group hover:scale-105 transition-transform duration-200"
            >
              {/* Category Image */}
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <img
                  src={category.strCategoryThumb}
                  alt={category.strCategory}
                  className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
              </div>

              {/* Category Info */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                  {category.strCategory}
                </h3>
                {category.strCategoryDescription && (
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {category.strCategoryDescription}
                  </p>
                )}
              </div>

              {/* View Category Button */}
              <div className="mt-4">
                <div className="text-primary-600 font-medium text-sm group-hover:text-primary-700 transition-colors duration-200">
                  View Meals →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link to="/" className="btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 
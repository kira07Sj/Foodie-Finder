import { Link } from 'react-router-dom';
import { AlertCircle, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, the page you're looking for doesn't exist. Maybe you'd like to explore some delicious meals instead?
        </p>
        
        <div className="space-y-4">
          <Link to="/" className="btn-primary inline-flex items-center space-x-2 w-full justify-center">
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>
          <Link to="/categories" className="btn-secondary inline-flex items-center space-x-2 w-full justify-center">
            <Search className="w-4 h-4" />
            <span>Browse Categories</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 
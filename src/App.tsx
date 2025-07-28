import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import MealDetail from './pages/MealDetail';
import Categories from './pages/Categories';
import CategoryDetail from './pages/CategoryDetail';
import RandomMeal from './pages/RandomMeal';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meal/:id" element={<MealDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:category" element={<CategoryDetail />} />
            <Route path="/random" element={<RandomMeal />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

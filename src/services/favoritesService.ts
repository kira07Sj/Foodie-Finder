import type { Meal } from './mealApi';

const FAVORITES_KEY = 'foodie-finder-favorites';

export interface FavoriteMeal extends Meal {
  addedAt: string;
}

class FavoritesService {
  private getStoredFavorites(): FavoriteMeal[] {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading favorites from localStorage:', error);
      return [];
    }
  }

  private saveFavorites(favorites: FavoriteMeal[]): void {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }

  // Get all favorite meals
  getFavorites(): FavoriteMeal[] {
    return this.getStoredFavorites();
  }

  // Add a meal to favorites
  addToFavorites(meal: Meal): boolean {
    try {
      const favorites = this.getStoredFavorites();
      const existingIndex = favorites.findIndex(fav => fav.idMeal === meal.idMeal);
      
      if (existingIndex !== -1) {
        return false; // Already in favorites
      }

      const favoriteMeal: FavoriteMeal = {
        ...meal,
        addedAt: new Date().toISOString()
      };

      favorites.push(favoriteMeal);
      this.saveFavorites(favorites);
      return true;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      return false;
    }
  }

  // Remove a meal from favorites
  removeFromFavorites(mealId: string): boolean {
    try {
      const favorites = this.getStoredFavorites();
      const filteredFavorites = favorites.filter(fav => fav.idMeal !== mealId);
      
      if (filteredFavorites.length === favorites.length) {
        return false; // Not found in favorites
      }

      this.saveFavorites(filteredFavorites);
      return true;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      return false;
    }
  }

  // Check if a meal is in favorites
  isFavorite(mealId: string): boolean {
    const favorites = this.getStoredFavorites();
    return favorites.some(fav => fav.idMeal === mealId);
  }

  // Get favorites count
  getFavoritesCount(): number {
    return this.getStoredFavorites().length;
  }

  // Clear all favorites
  clearFavorites(): void {
    try {
      localStorage.removeItem(FAVORITES_KEY);
    } catch (error) {
      console.error('Error clearing favorites:', error);
    }
  }
}

export const favoritesService = new FavoritesService(); 
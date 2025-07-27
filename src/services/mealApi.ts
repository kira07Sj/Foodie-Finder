import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strIngredient16?: string;
  strIngredient17?: string;
  strIngredient18?: string;
  strIngredient19?: string;
  strIngredient20?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strMeasure16?: string;
  strMeasure17?: string;
  strMeasure18?: string;
  strMeasure19?: string;
  strMeasure20?: string;
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface ApiResponse<T> {
  meals?: T[];
  categories?: T[];
}

class MealApiService {
  private async makeRequest<T>(endpoint: string): Promise<T> {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`);
      return response.data;
    } catch (error) {
      console.error('API request failed:', error);
      throw new Error('Failed to fetch data from API');
    }
  }

  // Search meals by name
  async searchMealsByName(query: string): Promise<Meal[]> {
    const response = await this.makeRequest<ApiResponse<Meal>>(`/search.php?s=${encodeURIComponent(query)}`);
    return response.meals || [];
  }

  // Search meals by ingredient
  async searchMealsByIngredient(ingredient: string): Promise<Meal[]> {
    const response = await this.makeRequest<ApiResponse<Meal>>(`/filter.php?i=${encodeURIComponent(ingredient)}`);
    return response.meals || [];
  }

  // Get meal by ID
  async getMealById(id: string): Promise<Meal | null> {
    const response = await this.makeRequest<ApiResponse<Meal>>(`/lookup.php?i=${id}`);
    return response.meals?.[0] || null;
  }

  // Get random meal
  async getRandomMeal(): Promise<Meal | null> {
    const response = await this.makeRequest<ApiResponse<Meal>>('/random.php');
    return response.meals?.[0] || null;
  }

  // Get all categories
  async getCategories(): Promise<Category[]> {
    const response = await this.makeRequest<ApiResponse<Category>>('/categories.php');
    return response.categories || [];
  }

  // Get meals by category
  async getMealsByCategory(category: string): Promise<Meal[]> {
    const response = await this.makeRequest<ApiResponse<Meal>>(`/filter.php?c=${encodeURIComponent(category)}`);
    return response.meals || [];
  }

  // Get meals by area
  async getMealsByArea(area: string): Promise<Meal[]> {
    const response = await this.makeRequest<ApiResponse<Meal>>(`/filter.php?a=${encodeURIComponent(area)}`);
    return response.meals || [];
  }

  // Get all areas
  async getAreas(): Promise<{ strArea: string }[]> {
    const response = await this.makeRequest<ApiResponse<{ strArea: string }>>('/list.php?a=list');
    return response.meals || [];
  }
}

export const mealApi = new MealApiService(); 
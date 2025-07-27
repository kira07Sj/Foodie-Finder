# Foodie Finder: Discover Meals Around the World

A modern web application that allows users to search for meals by ingredient, category, or country using the TheMealDB public API. Built with React, TypeScript, Tailwind CSS, and Lucide React icons.

## 🚀 Features

- **Search Meals**: Search by meal name or ingredient with dynamic results
- **Meal Details**: View detailed recipes with ingredients, instructions, and cooking videos
- **Random Meal Generator**: Discover new dishes with one click
- **Responsive Design**: Mobile-first layout that works on all devices
- **Modern UI**: Beautiful interface with hover effects and smooth transitions
- **Error Handling**: Graceful handling of loading, error, and empty states

## 🛠️ Technologies Used

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Lucide React** for icons
- **TheMealDB API** for meal data

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── MealCard.tsx        # Meal display card
│   └── SearchBar.tsx       # Search functionality
├── pages/
│   ├── Home.tsx            # Main search page
│   └── MealDetail.tsx      # Detailed meal view
├── services/
│   └── mealApi.ts          # API service layer
├── App.tsx                 # Main app component
└── main.tsx               # App entry point
```

## 🎯 Learning Objectives Achieved

- ✅ **API Integration**: Successfully integrated TheMealDB API with proper error handling
- ✅ **Component Structure**: Well-organized, reusable components
- ✅ **State Management**: Effective use of React hooks for state management
- ✅ **Responsive Design**: Mobile-first approach with Tailwind CSS
- ✅ **Loading & Error States**: Comprehensive handling of different app states
- ✅ **Modern UI/UX**: Beautiful, interactive interface with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd foodie-finder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## 🎨 Key Features Implementation

### Search Functionality
- Search by meal name or ingredient
- Real-time results with loading states
- Error handling for failed API calls

### Meal Detail Page
- Complete recipe information
- Ingredient list with measurements
- Step-by-step cooking instructions
- YouTube video links (when available)

### Responsive Design
- Mobile-first approach
- Grid layouts that adapt to screen size
- Touch-friendly interface

### Error Handling
- Network error handling
- Loading states with spinners
- Empty state messages
- Graceful fallbacks

## 🔧 API Integration

The application uses TheMealDB API with the following endpoints:
- `/search.php?s=` - Search meals by name
- `/filter.php?i=` - Search meals by ingredient
- `/lookup.php?i=` - Get meal details by ID
- `/random.php` - Get random meal
- `/categories.php` - Get all categories
- `/filter.php?c=` - Get meals by category

## 🎯 Future Enhancements

- [ ] Implement category browsing
- [ ] Add meal filtering by area/country
- [ ] Implement advanced search filters
- [ ] Add meal rating and reviews
- [ ] Create user accounts and saved recipes

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [TheMealDB](https://www.themealdb.com/) for providing the meal data API
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide React](https://lucide.dev/) for the beautiful icons
- [React Router](https://reactrouter.com/) for client-side routing

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

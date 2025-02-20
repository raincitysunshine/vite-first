import { useState, useEffect } from "react";
import "./App.css";
import PantryPackSelector from "./components/PantryPackSelector";
import PantryPackContainer from "./components/PantryPackContainer";

const pantryPacks = [
  { name: "Mediterranean Essentials", items: ["Olive Oil", "Cumin", "Chickpeas", "Paprika"] },
  { name: "Subcontinental Delights", items: ["Turmeric", "Garam Masala", "Coriander", "Cardamom"] },
  { name: "Sichuan Basics", items: ["Douban", "Hua Jiao", "Ma Jiao", "Dried Chilis"] }
];

const themes = [
  "rustic", 
  "modern", 
  "cozy", 
  "classic", 
  "farmhouse"
];

function App() {
  const [selectedPack, setSelectedPack] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    setTheme(randomTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = themes[Math.floor(Math.random() * themes.length)];
    setTheme(newTheme);
  };

  const fetchRecipes = async () => {
    if (!selectedPack) return;
    const query = selectedPack.items.join(",");
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=5&apiKey=YOUR_API_KEY`);
    const data = await response.json();
    setRecipes(data);
  };

  return (
    <main className={`app ${theme}`}>
      <button onClick={toggleTheme} className="theme-toggle">
        Change Theme
      </button>
      <h1>Recipe Finder</h1>
      <h2>Select a Pantry Pack</h2>
      <PantryPackSelector pantryPacks={pantryPacks} setSelectedPack={setSelectedPack} />
      {selectedPack && <PantryPackContainer selectedPack={selectedPack} />}
      <button onClick={fetchRecipes} className="find-recipes" disabled={!selectedPack}>
        Find Recipes
      </button>
      <h2>Recipes</h2>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} width="150" />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;

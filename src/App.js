import { useState, useEffect } from "react";
import React from "react";
import "./App.css";

import Search from "./components/Search";
import Recipe from "./components/Recipe";

const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const searchRecipes = async () => {
    setIsLoading(true);
    const apiurl = url + query;
    try {
      const res = await fetch(apiurl);
      const data = await res.json();
      setRecipes(data.meals);
      console.log(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    searchRecipes();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipes();
  };

  return (
    <div className="container">
      <h2>Our Recipe App</h2>
      <Search 
        value={query}
        handleSubmit={handleSubmit}
        onChange={(event) => setQuery(event.target.value)}
        isLoading={isLoading}
      />
      <div className="recipes">
        {isLoading ? (
          <p>Loading...</p>
        ) : recipes ? (
          recipes.map((recipe) => <Recipe key={recipe.idMeal} recipe={recipe} />)
        ) : (
          <p>No Recipes Found</p>
        )}
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const FoodContext = createContext();

function FoodContextProvider({ children }) {
  const [food, setFood] = useState(() => {
    const localData = localStorage.getItem("foodData");
    return localData ? JSON.parse(localData) : [];
  });
  const [loading, setLoading] = useState(food.length === 0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await axios.get(
          `https://api.spoonacular.com/recipes/random?apiKey=28d28fc5e9564a0c985200bb43f5b3550&number=50`
        );
        console.log(res.data.recipes);
        setFood(res.data.recipes);
        localStorage.setItem("foodData", JSON.stringify(res.data.recipes));
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchFood();
  }, []);

  return (
    <FoodContext.Provider value={{ food, setFood, loading, error }}>
      {children}
    </FoodContext.Provider>
  );
}

export default FoodContextProvider;

import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

const FoodContext = createContext();

function FoodContextProvider({ children }) {
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await axios.get(
          `https://api.spoonacular.com/recipes/random?apiKey=28d28fc5e9564a0c985200bb43f5b355&number=50`
        );
        setFood(res.data);
        console.log(res.data.recipes);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchFood();
  }, []);

  return (
    <div>
      <FoodContext.Provider value={{ food, setFood, loading, error }}>
        {children}
      </FoodContext.Provider>
    </div>
  );
}

export default FoodContextProvider;

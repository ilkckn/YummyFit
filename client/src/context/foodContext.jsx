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
          `https://api.spoonacular.com/recipes/random?apiKey=db503ed3d3e947a2862694314c5ba2a0&number=50`
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

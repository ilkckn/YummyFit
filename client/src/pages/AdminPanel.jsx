import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { ORIGIN_URL } from "../config";
import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";

function AdminPanel() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [recipeData, setRecipeData] = useState({
    title: "",
    description: "",
    image: null,
    ingredients: [{ title: "", quantity: "" }],
    steps: [""],
    calories: "",
    prep_time: "",
    cook_time: "",
    carbs: "",
    protein: "",
    fat: "",
    food_type: [],
    diets: [],
    cuisine_type: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setRecipeData((prev) => ({ ...prev, image: file }));
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...recipeData.ingredients];
    updatedIngredients[index][field] = value;
    setRecipeData((prev) => ({ ...prev, ingredients: updatedIngredients }));
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = [...recipeData.steps];
    updatedSteps[index] = value;
    setRecipeData((prev) => ({ ...prev, steps: updatedSteps }));
  };

  const addIngredient = () => {
    setRecipeData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { title: "", quantity: "" }],
    }));
  };

  const removeIngredient = (index) => {
    setRecipeData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const addStep = () => {
    setRecipeData((prev) => ({
      ...prev,
      steps: [...prev.steps, ""],
    }));
  };

  const removeStep = (index) => {
    setRecipeData((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      if (recipeData.image instanceof File) {
        formData.append("image", recipeData.image);
      }
      formData.append("ingredients", JSON.stringify(recipeData.ingredients));
      formData.append("steps", JSON.stringify(recipeData.steps));
      formData.append("food_type", JSON.stringify(recipeData.food_type));
      formData.append("diets", JSON.stringify(recipeData.diets));
      formData.append("cuisine_type", JSON.stringify(recipeData.cuisine_type));

      for (const key of [
        "title",
        "description",
        "calories",
        "prep_time",
        "cook_time",
        "carbs",
        "protein",
        "fat",
      ]) {
        formData.append(key, recipeData[key]);
      }
      const res = await axios.post(`${ORIGIN_URL}/recipes`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess(true);
      setRecipeData({
        title: "",
        description: "",
        image: null,
        ingredients: [{ title: "", quantity: "", image: "" }],
        steps: [""],
        calories: "",
        prep_time: "",
        cook_time: "",
        carbs: "",
        protein: "",
        fat: "",
        food_type: [],
        diets: [],
        cuisine_type: [],
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add recipe.");
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== "admin") {
    navigate("/");
    return null;
  }

  const handleIngredientImageChange = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedIngredients = [...recipeData.ingredients];
      updatedIngredients[index].image = reader.result;
      setRecipeData((prev) => ({ ...prev, ingredients: updatedIngredients }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-[100vh] w-[100%] bg-gradient-to-r from-[#255140] via-[#FFC649] to-[#255140] flex flex-col items-center">
      <div className="w-full bg-[#255140] text-white py-6 px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={user.image}
            alt="Admin Profile"
            className="w-16 h-16 rounded-full object-cover border-2 border-[#FFC649]"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.username}</h2>
            <p className="text-sm italic">Admin</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/profile")}
          className="bg-[#FFC649] text-[#255140] px-4 py-2 rounded-md hover:bg-[#e5b93f] cursor-pointer"
        >
          Back to Profile
        </button>
      </div>

      <div className="w-full min-h-[calc(100vh-112px)] bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-[#255140] mb-8 text-center">
          Admin Panel - Add New Recipe
        </h1>
        <RecipeForm
          recipeData={recipeData}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          handleIngredientChange={handleIngredientChange}
          handleIngredientImageChange={handleIngredientImageChange}
          handleStepChange={handleStepChange}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
          addStep={addStep}
          removeStep={removeStep}
          handleSubmit={handleSubmit}
          loading={loading}
          onCancel={() => navigate("/profile")}
        />
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
            <p>Recipe added successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;

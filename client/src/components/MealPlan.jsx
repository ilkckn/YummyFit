import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { ORIGIN_URL } from "../config";

function MealPlan() {
  const { user } = useContext(AuthContext);
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateMealPlan = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!user || !user.id) {
        throw new Error("User ID is missing");
      }

      const res = await axios.post(
        `${ORIGIN_URL}/meal-plans/generate`,
        { userId: user.id },
        { withCredentials: true }
      );
      setMealPlan(res.data.mealPlan.plan);
    } catch (error) {
      console.error(
        "Failed to generate meal plan:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.message ||
          "Failed to generate meal plan. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const fetchLatestMealPlan = async () => {
    try {
      const res = await axios.get(`${ORIGIN_URL}/meal-plans/latest`, { withCredentials: true });
      setMealPlan(res.data.mealPlan.plan);
    } catch (err) {
      console.error("No meal plan found or error:", err);
    }
  };

  fetchLatestMealPlan();
}, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold text-[#255140] mb-4">
        Generate Your Meal Plan
      </h2>
      <button
        onClick={generateMealPlan}
        disabled={loading}
        className={`btn px-4 py-2 rounded-md ${
          loading
            ? "bg-gray-400 text-white"
            : "bg-[#FFC649] text-white hover:bg-[#e5b93f]"
        }`}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          <p>{error}</p>
        </div>
      )}

      {mealPlan && (
        <div className="mt-6">
          <h3 className="text-lg font-bold text-[#255140] mb-2">
            Your Meal Plan:
          </h3>
          <pre className="bg-gray-100 p-4 rounded text-gray-800 whitespace-pre-wrap">
            {mealPlan}
          </pre>
        </div>
      )}
    </div>
  );
}

export default MealPlan;

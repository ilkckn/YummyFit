import React from 'react';

export default function About() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-green-600">About YummyFit</h1>

      <p className="text-lg mb-4">
        <strong>Welcome to YummyFit</strong> — your smart companion on the journey to healthy living and delicious nutrition.
      </p>

      <p className="mb-4">
        At YummyFit, we believe that eating well shouldn’t be a challenge — it should be a pleasure. That’s why we’ve created a platform that brings together smart technology, expert-backed nutrition advice, and thousands of healthy, mouth-watering recipes, all in one place.
      </p>

      <h2 className="text-2xl font-semibold text-green-500 mt-6 mb-2">What We Offer</h2>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Personalized Meal Planning:</strong> Tailor-made meal plans based on your health goals, dietary preferences, allergies, and fitness level.</li>
        <li><strong>Smart Recipe Search:</strong> Discover healthy recipes using ingredients you already have.</li>
        <li><strong>Nutrition Tracking:</strong> Keep track of calories, macronutrients, and daily goals with our easy-to-use dashboard.</li>
        <li><strong>Grocery List Generator:</strong> Automatically generate your shopping list based on your weekly meal plan.</li>

      </ul>

      <h2 className="text-2xl font-semibold text-green-500 mt-6 mb-2">Who It's For</h2>
      <p className="mb-4">
        Whether you're a fitness enthusiast, a busy parent, or someone simply trying to eat better, YummyFit is here to make your life healthier — and tastier.
      </p>

      <h2 className="text-2xl font-semibold text-green-500 mt-6 mb-2">Our Mission</h2>
      <p className="mb-4">
        <strong>Empower healthier lifestyles</strong> by combining delicious food with personalized nutrition tools that fit your life, not the other way around.
      </p>

      <h2 className="text-2xl font-semibold text-green-500 mt-6 mb-2">Coming Soon...</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Sync with fitness trackers</li>
        <li>AI meal suggestions based on your mood and activity</li>
        <li>Social features to share meals and challenges with friends</li>
      </ul>
    </div>
  );
}

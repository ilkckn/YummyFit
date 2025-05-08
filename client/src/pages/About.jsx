import React from 'react';
import { Link } from "react-router-dom";
import AboutTacosImage from '../assets/images/aboutPage/about.png';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center py-10 pt-[140px]">
      <div className="w-11/12 md:w-3/4 flex flex-col md:flex-row items-center overflow-hidden rounded-lg">

        {/* Left Text Section */}
        <div className="flex-1 p-5">
          <h1 className="text-7xl font-light mb-8 text-green-600">Yummy Fit</h1>
          <h2 className="text-6xl font-bold mb-8 leading-tight">
            to live in <br />
            <span className="border-l-4 border-orange-500 pl-4">the future</span>
          </h2>

          <p className="mb-1 text-2xl leading-relaxed text-gray-700 pl-4">
            At YummyFit, we believe that eating healthy should be easy and enjoyable.
            That’s why we’ve built a platform that combines smart technology with
            thousands of delicious, nutritious recipes — all conveniently in one place.
          </p>

          <h3 className="text-3xl font-semibold text-green-600 mt-10 mb-4">What We Offer</h3>
          <ul className="list-disc list-inside mb-6 text-2xl text-gray-700 pl-8 leading-relaxed">
            <li>
              <strong>Personalized Meal Planning:</strong> Tailor-made meal plans based on your health goals, dietary preferences, allergies, and fitness level.
            </li>
            <li>
              <strong>Smart Recipe Search:</strong> Discover healthy recipes using ingredients you already have.
            </li>
            <li>
              <strong>Nutrition Tracking:</strong> Keep track of calories, macronutrients, and daily goals with our easy-to-use dashboard.
            </li>
          </ul>

          <Link
            to="/register"
            className=" yummy-btn bg-green-500 text-white text-2xl font-bold px-8 py-4 rounded-lg hover:bg-green-600 transition inline-block"
          >
            Register Now
          </Link>
          
        </div>

        {/* Right Image Section */}
        <div className="flex-1 relative flex items-center justify-center p-6 w-full aspect-[4/5]">
          <div
            className="w-full h-full rounded-xl overflow-hidden shadow-md"
            style={{
              backgroundImage: `url(${AboutTacosImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>

        {/* Decorative Dots */}
      </div>
    </div>
  );
};

export default AboutPage;

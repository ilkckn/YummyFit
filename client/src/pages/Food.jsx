import React, { useState, useContext } from "react";
import { FoodContext } from "../context/foodContext";

function Food() {
  const { food, loading, error } = useContext(FoodContext);

  return (
    <div className="food-container w-full min-h-[100vh] flex flex-wrap justify-center items-center gap-4 p-4">
      {loading && <p>Loading...</p>}
      {food?.map((item) => (
        <div className="card w-96 h-96 shadow-sm">
          <figure className="h-1/2 w-full">
            <img
              className="h-full w-full object-cover"
              src={item.image}
              alt={item.title}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-[#333d25]">{item.title}</h2>
            <p className="text-[#333d25]">
              {item.summary.length > 100
                ? `${item.summary.substring(0, 100)}...`
                : item.summary}
            </p>
            <div className="card-actions flex justify-end items-center gap-1">
              <div className="details text-[1rem] text-[#333d25] font-normal underline tracking-[.5px] border-none px-5 py-4 cursor-pointer">
                Details
              </div>
              <button className="badge text-white font-medium bg-[#333d25] border-none px-5 py-4 cursor-pointer">
                Recipe
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Food;

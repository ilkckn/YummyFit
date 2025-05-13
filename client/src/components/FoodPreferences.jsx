import { useState, useContext } from "react";
import vegetarian from "../assets/images/account-setup/diet-types/vegetarian.png";
import vegan from "../assets/images/account-setup/diet-types/vegan.png";
import paleo from "../assets/images/account-setup/diet-types/paleo.png";
import keto from "../assets/images/account-setup/diet-types/keto.png";
import glutenFree from "../assets/images/account-setup/diet-types/gluten-free.png";
import anything from "../assets/images/account-setup/diet-types/anything.png";
import axios from "axios";
import { ORIGIN_URL } from "../config";
import { AuthContext } from "../context/authContext";
import { useTranslation } from "react-i18next";

function FoodPreferences() {
  const { t } = useTranslation();
  const dietTypes = [
    { 
      label: t("food_preferences.diets.anything.label"), 
      value: "anything",
      excludes: t("food_preferences.diets.anything.excludes"), 
      icon: anything 
    },
    { 
      label: t("food_preferences.diets.vegetarian.label"), 
      value: "vegetarian",
      excludes: t("food_preferences.diets.vegetarian.excludes"), 
      icon: vegetarian 
    },
    { 
      label: t("food_preferences.diets.vegan.label"), 
      value: "vegan",
      excludes: t("food_preferences.diets.vegan.excludes"), 
      icon: vegan 
    },
    { 
      label: t("food_preferences.diets.paleo.label"), 
      value: "paleo",
      excludes: t("food_preferences.diets.paleo.excludes"), 
      icon: paleo 
    },
    { 
      label: t("food_preferences.diets.keto.label"), 
      value: "keto",
      excludes: t("food_preferences.diets.keto.excludes"), 
      icon: keto 
    },
    { 
      label: t("food_preferences.diets.gluten_free.label"), 
      value: "gluten-free",
      excludes: t("food_preferences.diets.gluten_free.excludes"), 
      icon: glutenFree 
    },
  ];

  const [selectedDiet, setSelectedDiet] = useState("");
  const { user, navigate, setError, setUser, setSessionCheckNeeded } = useContext(AuthContext);
  const userId = user?.id;

  const handleNext = async () => {
    try {
      const response = await axios.put(`${ORIGIN_URL}/users/${userId}`, {
        food_preferences: selectedDiet,
      }, {
        withCredentials: true,
      });
      setSessionCheckNeeded(true);
      navigate("/account-setup/food-avoid");
    } catch (error) {
      setError(error.response?.data?.message || t("food_preferences.update_error"));
    }
  };
  
  return (
    <div className="bg-[#f6f0ef]">
      <div className="food-preferences h-[100vh] flex flex-col justify-center items-center">
        <h2 className="font-bold text-2xl pt-[3%] mb-7 mr-[8%]">
          {t("food_preferences.title")}
        </h2>
        <ul>
          {dietTypes.map((type, index) => (
            <li key={index} className="">
              <label className="flex items-center gap-3 mb-4 cursor-pointer">
                <input 
                  type="radio" 
                  name="food_preferences" 
                  checked={selectedDiet === type.value} 
                  value={type.value} 
                  onChange={()=>setSelectedDiet(type.value)}
                />
                <div className="w-[65px] text-center">   
                  <img src={type.icon} alt={type.label} className="h-[50px] object-cover inline" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{type.label}</h3>
                  <p className="text-sm text-gray-500">
                    {t("food_preferences.excludes")}: {type.excludes}
                  </p>
                </div>
              </label>
            </li>
          ))}
        </ul>
        
        <div className="flex flex-wrap flex-col justify-center items-center gap-[40%] mr-[10%]">
          <button onClick={()=>navigate(-1)} className="yummy-btn px-4 py-2 lato-black cursor-pointer">
            <i className="fa-solid fa-arrow-left pr-2"></i> {t("food_preferences.back")}
          </button>
          <button 
            onClick={handleNext} 
            className="yummy-btn px-4 py-2 lato-black cursor-pointer"
            disabled={!selectedDiet}
          >
            {t("food_preferences.next")} <i className="fa-solid fa-arrow-right pl-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodPreferences;
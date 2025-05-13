import axios from "axios";
import { ORIGIN_URL } from "../config";
import { AuthContext } from "../context/authContext";
import { useState, useContext, useEffect } from "react"; 
import { useTranslation } from "react-i18next";

function FoodAvoid() {
  const { t } = useTranslation(); 
  const [allergies, setAllergies] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [cuisine, setCuisine] = useState([]);
  const { user, navigate, setError, setUser, setSessionCheckNeeded } = useContext(AuthContext);
  const userId = user?.id;
  const [activeBtn, setActiveBtn] = useState([]);

  useEffect(() => {
    if (user) {
      setAllergies(user.allergies || []);
      setDiseases(user.disease || []);
      setCuisine(user.cuisine_preferences || []);
      setActiveBtn([...(user.allergies || []), ...(user.disease || []), ...(user.cuisine_preferences || [])]);
    }
  }, [user]); 

  const handleSelectAllergy = (allergy) => {
    setAllergies(prevAllergies => {
      const newAllergies = prevAllergies.includes(allergy)
        ? prevAllergies.filter((item) => item !== allergy)
        : [...prevAllergies, allergy];
      setActiveBtn(newActiveBtnState(newAllergies, diseases, cuisine));
      return newAllergies;
    });
  };

  const handleSelectDisease = (disease) => {
    setDiseases(prevDiseases => {
      const newDiseases = prevDiseases.includes(disease)
        ? prevDiseases.filter((item) => item !== disease)
        : [...prevDiseases, disease];
      setActiveBtn(newActiveBtnState(allergies, newDiseases, cuisine));
      return newDiseases;
    });
  };

  const handleSelectCuisine = (userCuisine) => {
    setCuisine(prevCuisine => {
      const newCuisine = prevCuisine.includes(userCuisine)
        ? prevCuisine.filter((item) => item !== userCuisine)
        : [...prevCuisine, userCuisine];
      setActiveBtn(newActiveBtnState(allergies, diseases, newCuisine));
      return newCuisine;
    });
  };
  const newActiveBtnState = (currentAllergies, currentDiseases, currentCuisine) => {
    return [...currentAllergies, ...currentDiseases, ...currentCuisine];
  };


  const handleClickNext = async () => {
    try {
      const response = await axios.put(`${ORIGIN_URL}/users/${userId}`, {
        allergies: allergies,
        disease: diseases,
        cuisine_preferences: cuisine,
      }, {
        withCredentials: true,
      });
      setUser(response.data); 
      setSessionCheckNeeded(true);
      navigate("/account-setup/user-info");
    } catch (error) {
      setError(error.response?.data?.message || t("food_avoid.update_error")); 
    }
  };

  const buttonBaseClasses = "border-1 rounded-lg px-2 py-1 cursor-pointer";

  return (
    <div className="bg-[#f6f0ef]">
      <div className="food-avoid h-[100vh] flex flex-col justify-center items-center">
        <div className="my-8">
          <div className="w-[80%] mx-auto mt-18">
            <h2 className="font-bold text-2xl mb-7">
              {t("food_avoid.allergies_question")}
            </h2>
            <div className="flex flex-wrap gap-4 mt-4 justify-center items-center">
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("peanuts") ? "active-btn" : ""}`}
                onClick={() => handleSelectAllergy("peanuts")}>
                {t("food_avoid.allergies.peanuts")}
              </button>
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("dairy") ? "active-btn" : ""}`}
                onClick={() => handleSelectAllergy("dairy")}>
                {t("food_avoid.allergies.dairy")}
              </button>
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("soy") ? "active-btn" : ""}`}
                onClick={() => handleSelectAllergy("soy")}>
                {t("food_avoid.allergies.soy")}
              </button>
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("eggs") ? "active-btn" : ""}`}
                onClick={() => handleSelectAllergy("eggs")}>
                {t("food_avoid.allergies.eggs")}
              </button>
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("shellfish") ? "active-btn" : ""}`}
                onClick={() => handleSelectAllergy("shellfish")}>
                {t("food_avoid.allergies.shellfish")}
              </button>
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("fish") ? "active-btn" : ""}`}
                onClick={() => handleSelectAllergy("fish")}>
                {t("food_avoid.allergies.fish")}
              </button>
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("tree nuts") ? "active-btn" : ""}`}
                onClick={() => handleSelectAllergy("tree nuts")}>
                {t("food_avoid.allergies.tree_nuts")}
              </button>
            </div>
          </div>
          <div className="w-[80%] mx-auto mt-15">
            <h2 className="font-bold text-2xl mt-10 mb-7">
              {t("food_avoid.medical_conditions_question")}
            </h2>
            <div className="flex flex-wrap gap-4 mt-4 justify-center items-center">
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("Diabetes") ? "active-btn" : ""}`}
                onClick={() => handleSelectDisease("Diabetes")}>
                {t("food_avoid.diseases.diabetes")}
              </button>
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("Kidney disease") ? "active-btn" : ""}`}
                onClick={() => handleSelectDisease("Kidney disease")}>
                {t("food_avoid.diseases.kidney_disease")}
              </button>
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("Liver disease") ? "active-btn" : ""}`}
                onClick={() => handleSelectDisease("Liver disease")}>
                {t("food_avoid.diseases.liver_disease")}
              </button>
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("High cholesterol") ? "active-btn" : ""}`}
                onClick={() => handleSelectDisease("High cholesterol")}>
                {t("food_avoid.diseases.high_cholesterol")}
              </button>
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("High blood pressure") ? "active-btn" : ""}`}
                onClick={() => handleSelectDisease("High blood pressure")}>
                {t("food_avoid.diseases.high_blood_pressure")}
              </button>
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("Hypothyroidism") ? "active-btn" : ""}`}
                onClick={() => handleSelectDisease("Hypothyroidism")}>
                {t("food_avoid.diseases.hypothyroidism")}
              </button>
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("Hyperthyroidism") ? "active-btn" : ""}`}
                onClick={() => handleSelectDisease("Hyperthyroidism")}>
                {t("food_avoid.diseases.hyperthyroidism")}
              </button>
            </div>
          </div>

          <div className="w-[80%] mx-auto mt-15">
            <h2 className="font-bold text-2xl mt-10 mb-7">
              {t("food_avoid.cuisine_preference_question")}
            </h2>
            <div className="flex flex-wrap gap-4 mt-4 justify-center items-center">
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("italian") ? "active-btn" : ""}`}
                onClick={() => handleSelectCuisine("italian")}>
                {t("food_avoid.cuisine_preferences.italian")}
              </button>
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("chinese") ? "active-btn" : ""}`}
                onClick={() => handleSelectCuisine("chinese")}>
                {t("food_avoid.cuisine_preferences.chinese")}
              </button>
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("indian") ? "active-btn" : ""}`}
                onClick={() => handleSelectCuisine("indian")}>
                {t("food_avoid.cuisine_preferences.indian")}
              </button>
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("mexican") ? "active-btn" : ""}`}
                onClick={() => handleSelectCuisine("mexican")}>
                {t("food_avoid.cuisine_preferences.mexican")}
              </button>
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("japanese") ? "active-btn" : ""}`}
                onClick={() => handleSelectCuisine("japanese")}>
                {t("food_avoid.cuisine_preferences.japanese")}
              </button>
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("french") ? "active-btn" : ""}`}
                onClick={() => handleSelectCuisine("french")}>
                {t("food_avoid.cuisine_preferences.french")}
              </button>
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("greek") ? "active-btn" : ""}`}
                onClick={() => handleSelectCuisine("greek")}>
                {t("food_avoid.cuisine_preferences.greek")}
              </button>
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("thai") ? "active-btn" : ""}`}
                onClick={() => handleSelectCuisine("thai")}>
                {t("food_avoid.cuisine_preferences.thai")}
              </button>
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("spanish") ? "active-btn" : ""}`}
                onClick={() => handleSelectCuisine("spanish")}>
                {t("food_avoid.cuisine_preferences.spanish")}
              </button>
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("korean") ? "active-btn" : ""}`}
                onClick={() => handleSelectCuisine("korean")}>
                {t("food_avoid.cuisine_preferences.korean")}
              </button>
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("mediterranean") ? "active-btn" : ""}`}
                onClick={() => handleSelectCuisine("mediterranean")}>
                {t("food_avoid.cuisine_preferences.mediterranean")}
              </button>
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("american") ? "active-btn" : ""}`}
                onClick={() => handleSelectCuisine("american")}>
                {t("food_avoid.cuisine_preferences.american")}
              </button>
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("vietnamese") ? "active-btn" : ""}`}
                onClick={() => handleSelectCuisine("vietnamese")}>
                {t("food_avoid.cuisine_preferences.vietnamese")}
              </button>
              <button type="button"
                className={`${buttonBaseClasses} ${activeBtn.includes("middle eastern") ? "active-btn" : ""}`}
                onClick={() => handleSelectCuisine("middle eastern")}>
                {t("food_avoid.cuisine_preferences.middle_eastern")}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap flex-col justify-center items-center gap-[40%] mt-6 mr-[10%]">
          <button onClick={() => navigate(-1)} className="yummy-btn px-4 py-2 lato-black cursor-pointer">
            <i className="fa-solid fa-arrow-left pr-2"></i> {t("food_avoid.back")}
          </button>
          <button onClick={handleClickNext} className="yummy-btn px-4 py-2 lato-black cursor-pointer">
            {t("food_avoid.next")} <i className="fa-solid fa-arrow-right pl-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodAvoid;
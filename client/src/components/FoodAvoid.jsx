import axios, { all } from "axios";
import { ORIGIN_URL } from "../config";
import { AuthContext } from "../context/authContext";
import { useState,useContext } from "react";

function FoodAvoid() {
  const [allergies, setAllergies] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const { user,navigate,setError } = useContext(AuthContext);
  const userId = user?.id;
  const [activeBtn, setActiveBtn] = useState([]);
  
  const handleSelectAllergy = (allergy) => {
    if (allergies.includes(allergy)) {
      setAllergies(allergies.filter((item) => item !== allergy));
      setActiveBtn(activeBtn.filter((item) => item !== allergy));
    } else {
      setAllergies([...allergies, allergy]);
      setActiveBtn([...activeBtn, allergy]);
    }
  }

  const handleSelectDisease = (disease) => {
    if (diseases.includes(disease)) {
      setDiseases(diseases.filter((item) => item !== disease));
      setActiveBtn(activeBtn.filter((item) => item !== disease));
    } else {
      setDiseases([...diseases, disease]);
      setActiveBtn([...activeBtn, disease]);
    }
  }

  const handleClickNext = async () => {
    try {
      const response = await axios.put(`${ORIGIN_URL}/users/${userId}`, {
        allergies: allergies,
        disease: diseases,
      }, {
        withCredentials: true,
      });
      navigate("/account-setup/user-info");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred while updating the user data.");
    }
  }

  return (
    <div className="bg-[#f6f0ef]">
      <div className="food-avoid h-[100vh] flex flex-col justify-center items-center">
        <div className="my-8">
          <div className="w-[80%] mx-auto mt-18">
            <h2 className="font-bold text-2xl mb-7">
              Do you have any food allergies or intolerances?
            </h2>
            <div className="flex flex-wrap gap-4 mt-4">
              <button type="button" 
                className={`border-1 rounded-lg px-2 py-1 cursor-pointer ${activeBtn.includes("peanuts") ? "active-btn" : ""}`} 
                onClick={()=>handleSelectAllergy("peanuts")}>
                Peanuts
              </button>
              <button type="button" 
                className={`border-1 rounded-lg px-2 py-1 cursor-pointer ${activeBtn.includes("dairy") ? "active-btn" : ""}`}  
                onClick={()=>handleSelectAllergy("dairy")}>
                Diary
              </button>
              <button type="button" 
                className={`border-1 rounded-lg px-2 py-1 cursor-pointer ${activeBtn.includes("soy") ? "active-btn" : ""}`} 
                onClick={()=>handleSelectAllergy("soy")}>
                Soy
              </button>
              <button type="button" 
                className={`border-1 rounded-lg px-2 py-1 cursor-pointer ${activeBtn.includes("eggs") ? "active-btn" : ""}`} 
                onClick={()=>handleSelectAllergy("eggs")}>
                Eggs
              </button>
              <button type="button" 
                className={`border-1 rounded-lg px-2 py-1 cursor-pointer ${activeBtn.includes("shellfish") ? "active-btn" : ""}`} 
                onClick={()=>handleSelectAllergy("shellfish")}>
                Shellfish
              </button>
              <button type="button" 
                className={`border-1 rounded-lg px-2 py-1 cursor-pointer ${activeBtn.includes("fish") ? "active-btn" : ""}`} 
                onClick={()=>handleSelectAllergy("fish")}>
                Fish
              </button>
              <button type="button" 
                className={`border-1 rounded-lg px-2 py-1 cursor-pointer ${activeBtn.includes("tree nuts") ? "active-btn" : ""}`} 
                onClick={()=>handleSelectAllergy("tree nuts")}>
                Tree Nuts
              </button>
            </div>
          </div>
          <div className="w-[80%] mx-auto mt-15">
            <h2 className="font-bold text-2xl mt-10 mb-7">
              Do you have any medical conditions or diseases?
            </h2>
            <div className="flex flex-wrap gap-4 mt-4">
              <button type="button" 
                className={`border-1 rounded-lg px-2 py-1 cursor-pointer ${activeBtn.includes("Diabetes") ? "active-btn" : ""}`} 
                onClick={()=>handleSelectDisease("Diabetes")}>
                Diabetes
              </button>
              <button type="button" 
                className={`border-1 rounded-lg px-2 py-1 cursor-pointer ${activeBtn.includes("Kidney disease") ? "active-btn" : ""}`} 
                onClick={()=>handleSelectDisease("Kidney disease")}>
                Kidney disease
              </button>
              <button type="button" 
                className={`border-1 rounded-lg px-2 py-1 cursor-pointer ${activeBtn.includes("Liver disease") ? "active-btn" : ""}`} 
                onClick={()=>handleSelectDisease("Liver disease")}>
                Liver disease
              </button>
              <button type="button" 
                className={`border-1 rounded-lg px-2 py-1 cursor-pointer ${activeBtn.includes("High cholesterol") ? "active-btn" : ""}`} 
                onClick={()=>handleSelectDisease("High cholesterol")}>
                High cholesterol
              </button>
              <button type="button" 
                className={`border-1 rounded-lg px-2 py-1 cursor-pointer ${activeBtn.includes("High blood pressure") ? "active-btn" : ""}`} 
                onClick={()=>handleSelectDisease("High blood pressure")}>
                High blood pressure
              </button>
              <button type="button" 
                className={`border-1 rounded-lg px-2 py-1 cursor-pointer ${activeBtn.includes("Hypothyroidism") ? "active-btn" : ""}`} 
                onClick={()=>handleSelectDisease("Hypothyroidism")}>
                Hypothyroidism
              </button>
              <button type="button" 
                className={`border-1 rounded-lg px-2 py-1 cursor-pointer ${activeBtn.includes("Hyperthyroidism") ? "active-btn" : ""}`} 
                onClick={()=>handleSelectDisease("Hyperthyroidism")}>
                Hyperthyroidism
              </button>
            </div>
          </div>
        </div>
        

        <div className="flex flex-wrap flex-col justify-center items-center gap-[40%] mt-6 mr-[10%]">
            <button onClick={()=>navigate(-1)} className="yummy-btn px-4 py-2 lato-black cursor-pointer">
                <i className="fa-solid fa-arrow-left pr-2"></i> Back
            </button>
            <button onClick={handleClickNext} className="yummy-btn px-4 py-2 lato-black cursor-pointer">
                Next <i className="fa-solid fa-arrow-right pl-2"></i>
            </button>
        </div>
      </div>
    </div>
  )
}

export default FoodAvoid
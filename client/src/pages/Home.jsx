import { NavLink, Link } from "react-router-dom";
import Slider from "../components/Slider";
import SliderFoodList from "../components/SliderFoodList";
import { useContext, useEffect } from "react";
import { FoodContext } from "../context/foodContext";
import { AuthContext } from "../context/authContext";
import logo from "../assets/images/logo/logo.png";

function Home() {
  const { isPopupOpen, handleClosePopup, setIsPopupOpen } =
    useContext(AuthContext);
  const { food, loading, dishTypeList } = useContext(FoodContext);
  const foodList = food?.slice(0, 15);

  useEffect(() => {
    const popupClosed = localStorage.getItem("popupClosed");
    if (!popupClosed) {
      setIsPopupOpen(true);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsPopupOpen(false);
      localStorage.setItem("popupClosed", "true");
    }, [4000]);
  }, []);

  return (
    <>
      <main className="pt-[140px]">
        {loading && <p>Loading...</p>}
        <div className="relative flex flex-row items-start min-h-[600px] justify-between">
          <div className="w-[50%] text-right px-9 pt-10">
            <h1 className="text-6xl lato-black mb-2 mt-5">
              Fewer Calories <br /> And More
              <br /> Benefit
            </h1>
            <h2 className="text-2xl lato-bold mb-2">
              Your smart companion on the journey <br /> to healthy living and
              delicious nutrition.
            </h2>
            <p className="mb-2 lato-regular text-lg pl-8">
              At YummyFit, we believe that eating well shouldn’t be a challenge!
              <br />
              it should be a pleasure. <br />
              That’s why we’ve created a platform that brings together smart
              technology, expert-backed nutrition advice, and thousands of
              healthy, mouth-watering recipes, all in one place.
            </p>
            <div className="flex justify-end mt-4">
              <NavLink
                to={"/login"}
                className="yummy-btn cursor-pointer hover:bg-[#45a049] px-6 py-2 mt-4 lato-bold text-lg"
              >
                Get Started
              </NavLink>
              <NavLink
                to={"/about"}
                className="yummy-btn cursor-pointer hover:bg-[#e53935] px-6 py-2 mt-4 lato-bold text-lg ml-20"
              >
                Learn More
              </NavLink>
            </div>
          </div>
          <div className="food-image-home w-[50%] max-w-[700px] h-[660px]"></div>
        </div>
        <div className="devider w-[50%] mx-auto h-[1px] bg-[#333d25] mt-18"></div>

        <div className="foodType-slider w-[90%] mx-auto py-15">
          <h2 className="text-3xl mb-1 lato-black">Browse By Food Type</h2>
          <p className="mb-6">
            If you are looking for a specific type of food, you can browse by
            food type.
            <br />
            We have a wide variety of food types to choose from.
          </p>

          <Slider foodList={dishTypeList} />
        </div>

        <div className="devider w-[50%] mx-auto h-[1px] bg-[#333d25] mt-5"></div>

        <div className="newFood-slider w-[90%] mx-auto py-15">
          <h2 className="text-3xl mb-1 lato-black">The newest Recipes</h2>
          <p className="mb-6">
            Discover the latest and greatest recipes to tantalize your taste
            buds.
          </p>
          <SliderFoodList foodList={foodList} />
        </div>

        <div className="devider w-[50%] mx-auto h-[1px] bg-[#333d25] mt-5"></div>
      </main>

      {isPopupOpen && (
        <div
          className="popup fixed top-0 left-0 w-full h-full flex justify-center items-center z-50"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Koyu arka plan rengi
            backdropFilter: "blur(10px)", // Bulanıklık efekti
            WebkitBackdropFilter: "blur(20px)", // Safari desteği için
          }}
        >
          <div className="popup-content w-[50%] h-[40%] flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-lg text-center">
            <figure className="w-full flex justify-center mb-4">
              <img src={logo} alt="" className="w-[10rem]" />
            </figure>
            <h2 className="text-3xl font-bold mb-4">Complete Your Profile</h2>
            <p className="mb-10 text-[1.2rem]">
              To get the best experience, please complete your account setup.
            </p>
            <div className="flex justify-center gap-4">
              <NavLink
                to="/account-setup"
                className="bg-[#FE486E] text-white px-6 py-2 rounded-md hover:bg-[#D93A5B] transition-all duration-300"
              >
                Go to Account Setup
              </NavLink>
              <button
                onClick={handleClosePopup}
                className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 cursor-pointer transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;

import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { IoReturnUpBack } from "react-icons/io5";
import MealPlan from "../components/MealPlan";

function Profile() {
  const { user, handleLogout, sessionLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    first_name,
    last_name,
    email,
    image,
    role,
    username,
    age,
    gender,
    height,
    weight,
    target_weight,
    target_weight_change,
    daily_calories,
    activity_level,
    allergies,
    food_preferences,
    cuisine_preferences,
    disease,
  } = user || {};

  if (sessionLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#255140] via-[#FFC649] to-[#255140] flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="bg-[#255140] text-white flex flex-col items-center p-6">
            <div className="avatar mb-4 mt-15">
              <div className="w-28 h-28 rounded-full ring ring-[#FFC649] ring-offset-4">
                {image ? (
                  <img
                    src={image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="bg-gray-300 w-full h-full flex items-center justify-center text-gray-600">
                    <span className="text-4xl font-bold">
                      {username?.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <h2 className="text-2xl font-bold">{username}</h2>
            <p className="text-sm italic mt-1">Role: {role}</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 text-sm flex items-center gap-2 text-[#FFC649] text-[1rem] font-medium hover:underline cursor-pointer"
            >
              <IoReturnUpBack className="text-lg" />
              Go to Home
            </button>
            <div className="mt-10 flex gap-4">
              <button
                className="btn bg-[#FFC649] text-white hover:bg-[#e5b93f] px-6 py-2 rounded-md"
                onClick={() => navigate("/edit-profile")}
              >
                Edit Profile
              </button>
              <button
                className="btn border border-[#FFC649] text-[#FFC649] hover:bg-[#FFC649] hover:text-white px-6 py-2 rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>

          <div className="col-span-2 p-6">
            <h2 className="text-xl font-bold text-[#255140] mb-4">
              Profile Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProfileDetail
                label="Full Name"
                value={`${first_name} ${last_name}`}
              />
              <ProfileDetail label="Email" value={email} />
              <ProfileDetail label="Age" value={age} />
              <ProfileDetail label="Gender" value={gender} />
              <ProfileDetail label="Weight" value={`${weight} kg`} />
              <ProfileDetail label="Height" value={`${height} cm`} />
              <ProfileDetail
                label="Target Weight"
                value={`${target_weight} kg`}
              />
              <ProfileDetail
                label="Target Weight Change"
                value={`${target_weight_change} (1 Week)`}
              />
              <ProfileDetail
                label="Daily Calories"
                value={`${daily_calories} kcal`}
              />
              <ProfileDetail label="Activity Level" value={activity_level} />
              <ProfileDetail
                label="Food Preferences"
                value={food_preferences?.join(", ")}
              />
              <ProfileDetail label="Allergies" value={allergies?.join(", ")} />
              <ProfileDetail
                label="Cuisine Preferences"
                value={cuisine_preferences?.join(", ")}
              />
              <ProfileDetail label="Diseases" value={disease?.join(", ")} />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mt-8">
        <MealPlan />
      </div>
    </div>
  );
}

function ProfileDetail({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-800">{value || "N/A"}</p>
    </div>
  );
}

export default Profile;

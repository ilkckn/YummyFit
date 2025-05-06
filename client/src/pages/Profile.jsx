import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

function Profile() {
  const { user, handleLogout, sessionLoading } = useContext(AuthContext);
  const {
    first_name,
    last_name,
    email,
    image,
    role,
    id,
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
  console.log("User id:", id);

  if (sessionLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#255140] via-[#FFC649] to-[#255140] flex justify-center items-center">
      <div className="card w-full max-w-6xl bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-[#255140] text-white flex flex-col justify-center items-center p-8">
            <div className="avatar">
              <div className="w-32 h-32 rounded-full ring ring-[#FFC649] ring-offset-4">
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
            <h2 className="text-3xl font-bold mt-4">{username}</h2>
            <p className="text-sm italic mt-2">Role: {role}</p>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-bold text-[#255140] mb-4">
              Profile Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-lg font-semibold text-gray-800">
                  {first_name} {last_name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-semibold text-gray-800">{email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="text-lg font-semibold text-gray-800">{age}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="text-lg font-semibold text-gray-800 capitalize">
                  {gender}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Weight</p>
                <p className="text-lg font-semibold text-gray-800">
                  {weight} kg
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Height</p>
                <p className="text-lg font-semibold text-gray-800">
                  {height} cm
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Target Weight</p>
                <p className="text-lg font-semibold text-gray-800">
                  {target_weight} kg
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Target Weight Change</p>
                <p className="text-lg font-semibold text-gray-800">
                  {target_weight_change}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Daily Calories</p>
                <p className="text-lg font-semibold text-gray-800">
                  {daily_calories} kcal
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Activity Level</p>
                <p className="text-lg font-semibold text-gray-800 capitalize">
                  {activity_level}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Food Preferences</p>
                <p className="text-lg font-semibold text-gray-800">
                  {food_preferences?.join(", ")}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Allergies</p>
                <p className="text-lg font-semibold text-gray-800">
                  {allergies?.join(", ")}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Cuisine Preferences</p>
                <p className="text-lg font-semibold text-gray-800">
                  {cuisine_preferences?.join(", ")}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Diseases</p>
                <p className="text-lg font-semibold text-gray-800">
                  {disease?.join(", ")}
                </p>
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <button className="btn bg-[#FFC649] text-white hover:bg-[#e5b93f] btn-wide">
                Edit Profile
              </button>
              <button
                className="btn btn-outline border-[#FFC649] text-[#FFC649] hover:bg-[#FFC649] hover:text-white btn-wide"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

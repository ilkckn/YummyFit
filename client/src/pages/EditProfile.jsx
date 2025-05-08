import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ORIGIN_URL } from "../config";

function EditProfile() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ ...user, password: "", image: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (key === "image" && formData[key] instanceof File) {
        data.append("image", formData[key]);
      } else if (Array.isArray(formData[key])) {
        formData[key].forEach((val) => data.append(key, val));
      } else if (formData[key] !== undefined && formData[key] !== "") {
        data.append(key, formData[key]);
      }
    }

    try {
      const res = await axios.put(`${ORIGIN_URL}/users/${user._id}`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser(res.data);
      alert("Updated successfully");
      navigate("/profile");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#255140] via-[#FFC649] to-[#255140] flex justify-center items-center px-4">
      <div className="card w-full max-w-6xl bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="flex flex-col">
          {/* Top Section - Avatar */}
          <div className="bg-[#255140] text-white flex flex-col justify-center items-center p-8">
            <div className="avatar">
              <div className="w-32 h-32 rounded-full ring ring-[#FFC649] ring-offset-4 overflow-hidden">
                {user.image ? (
                  <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="bg-gray-300 w-full h-full flex items-center justify-center text-gray-600">
                    <span className="text-4xl font-bold">{user.username?.charAt(0)}</span>
                  </div>
                )}
              </div>
            </div>
            <h2 className="text-3xl font-bold mt-4">{user.username}</h2>
            <p className="text-sm italic mt-2">Update your profile information</p>
          </div>

          {/* Bottom Section - Form */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-[#255140] mb-4">Edit Profile</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-1">
              {/* Basic Fields */}
              {[
                { name: "first_name", label: "First Name" },
                { name: "last_name", label: "Last Name" },
                { name: "age", label: "Age", type: "number" },
                { name: "height", label: "Height (cm)", type: "number" },
                { name: "weight", label: "Weight (kg)", type: "number" },
                { name: "target_weight", label: "Target Weight (kg)", type: "number" },
                { name: "daily_calories", label: "Daily Calories (kcal)", type: "number" },
              ].map(({ name, label, type = "text" }) => (
                <div key={name}>
                  <label className="label font-semibold">{label}</label>
                  <input
                    name={name}
                    type={type}
                    value={formData[name] || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>
              ))}

              {/* Select Fields */}
              <div>
                <label className="label font-semibold">Gender</label>
                <select
                  name="gender"
                  value={formData.gender || "male"}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="label font-semibold">Target Weight Change</label>
                <select
                  name="target_weight_change"
                  value={formData.target_weight_change || "1kg"}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="500g">500g</option>
                  <option value="1kg">1kg</option>
                </select>
              </div>

              {/* Lifestyle and Preferences */}
              <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="label font-semibold">Activity Level</label>
                  <select
                    name="activity_level"
                    value={formData.activity_level || "sedentary"}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                  >
                    <option value="sedentary">Sedentary</option>
                    <option value="lightly active">Lightly Active</option>
                    <option value="moderately active">Moderately Active</option>
                    <option value="very active">Very Active</option>
                    <option value="super active">Super Active</option>
                  </select>
                </div>

                <div>
                  <label className="label font-semibold">Food Preference</label>
                  <select
                    name="food_preferences"
                    value={formData.food_preferences?.[0] || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        food_preferences: [e.target.value],
                      }))
                    }
                    className="select select-bordered w-full"
                  >
                    <option value="">Select a preference</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="paleo">Paleo</option>
                    <option value="keto">Keto</option>
                    <option value="gluten-free">Gluten-Free</option>
                  </select>
                </div>

                {[
                  { name: "allergies", label: "Allergies" },
                  { name: "cuisine_preferences", label: "Cuisine Preferences" },
                  { name: "disease", label: "Disease" },
                ].map(({ name, label }) => (
                  <div key={name}>
                    <label className="label font-semibold">{label}</label>
                    <input
                      name={name}
                      value={formData[name]?.join(", ") || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [name]: e.target.value.split(",").map((s) => s.trim()),
                        })
                      }
                      className="input input-bordered w-full"
                      placeholder={`${label} (comma-separated)`}
                    />
                  </div>
                ))}
              </div>

              {/* Password */}
              <div className="md:col-span-2">
                <label className="label font-semibold">New Password (optional)</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current password"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Profile Image */}
              <div className="md:col-span-2">
                <label className="label font-semibold">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered w-full"
                />
              </div>

              {/* Buttons */}
              <div className="md:col-span-4 flex flex-col md:flex-row justify-between gap-4 mt-4">
                <button type="submit" className="btn bg-[#FFC649] text-white hover:bg-[#e5b93f] w-full md:w-auto">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="btn btn-outline border-[#FFC649] text-[#FFC649] hover:bg-[#FFC649] hover:text-white w-full md:w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;

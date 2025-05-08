import axios, { all } from "axios";
import { ORIGIN_URL } from "../config";
import { AuthContext } from "../context/authContext";
import { useState,useContext } from "react";

function UserInfo() {
  const { user,navigate,setError } = useContext(AuthContext);
  const userId = user?.id;
  const [userInfo,setUserInfo] = useState({});
  const [gender, setGender] = useState("male");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  console.log(userInfo);
  console.log(gender)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${ORIGIN_URL}/users/${userId}`, {
        age: userInfo.age,
        weight: userInfo.weight,
        height: userInfo.height,
        target_weight: userInfo.target_weight,
        target_weight_change: userInfo.target_weight_change,
        activity_level: userInfo.activity_level,
        gender:gender,
      }, {
        withCredentials: true,
      });
      
      navigate("/profile");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred while updating the user data.");
    }
  }

  return (
    <div className="bg-[#f6f0ef]">
      <div className="user-info h-[100vh]">
        <div className="w-[60%] mx-auto pt-35">
          <h2 className="font-bold text-2xl">
            Tell us about yourself
          </h2>
          <p className="text-lg mb-8">This information lets us estimate your nutrition requirements for each day.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-4 mt-4 justify-between">
              <div>
                <div className="flex gap-5 items-center justify-between py-3">
                  <label htmlFor="gender" className="text-lg font-semibold">Gender</label>
                  <div className="flex gap-1 border-1 p-[2px] rounded-lg">
                    <button type="button"
                      className={`rounded-lg px-2 py-1 cursor-pointer hover:bg-gray-50 ${gender === "male" ? "active-btn" : ""}`}
                      onClick={() => setGender("male")}>
                      Male
                    </button>
                    <button type="button"
                      className={`rounded-lg px-2 py-1 cursor-pointer hover:bg-gray-50 ${gender === "female" ? "active-btn" : ""}`}
                      onClick={() => setGender("female")}>
                      Female
                    </button>
                    <button type="button"
                      className={`rounded-lg px-2 py-1 cursor-pointer hover:bg-gray-50 ${gender === "other" ? "active-btn" : ""}`}
                      onClick={() => setGender("other")}>
                      Other
                    </button>
                  </div>
                </div>
                <div className="flex gap-5 items-center justify-between py-3">
                  <label htmlFor="weight" className="text-lg font-semibold">Weight</label>
                  <div>
                    <input type="number" id="weight" name="weight" onChange={handleChange} value={userInfo.weight} 
                    className="border-1 rounded-lg px-2 py-1 w-[50px] mr-1" required />
                    <span className="">kg</span>
                  </div>
                </div>
                <div className="flex gap-5 items-center justify-between py-3">
                  <label htmlFor="target_weight" className="text-lg font-semibold">Target Weight</label>
                  <div>
                    <input type="number" id="target_weight" name="target_weight" onChange={handleChange} value={userInfo.target_weight} 
                    className="border-1 rounded-lg px-2 py-1 w-[50px] mr-1" required />
                    <span className="">kg</span>
                  </div>
                </div>
                <div className="flex gap-5 items-center justify-between py-3">
                  <label htmlFor="activity" className="text-lg font-semibold">Activity Level</label>
                  <select id="activity_level" name="activity_level" onChange={handleChange} className="border-1 rounded-lg px-2 py-1">
                    <option value="sedentary">Sedentary</option>
                    <option value="lightly active">Lightly Active</option>
                    <option value="moderately active">Moderately Active</option>
                    <option value="very active">Very Active</option>
                    <option value="super active">Super Active</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex gap-5 items-center justify-between py-3">
                  <label htmlFor="age" className="text-lg font-semibold">Age</label>
                  <div>
                    <input type="number" id="age" name="age" onChange={handleChange} value={userInfo.age} 
                    className="border-1 rounded-lg px-2 py-1 w-[50px] mr-1" required />
                    <span className="">years</span>
                  </div>
                </div>
                <div className="flex gap-5 items-center justify-between py-3">
                  <label htmlFor="height" className="text-lg font-semibold">Height</label>
                  <div>
                    <input type="number" id="height" name="height" onChange={handleChange} value={userInfo.height} 
                    className="border-1 rounded-lg px-2 py-1 w-[50px] mr-1" required />
                    <span className="">cm</span>
                  </div>
                </div>
                <div className="flex gap-5 items-center justify-between py-3">
                  <label htmlFor="target_weight_change" className="text-lg font-semibold">Target Weight Change</label>
                  <div>
                  <select id="target_weight_change" name="target_weight_change" onChange={handleChange} 
                    className="border-1 rounded-lg px-2 py-1">
                    <option value="1kg">1 kg/week</option>
                    <option value="500g">0.5 kg/week</option>
                  </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-[20%] mt-25 mr-[10%]">
              <button onClick={()=>navigate(-1)} className="yummy-btn px-4 py-2 lato-black cursor-pointer">
                  <i className="fa-solid fa-arrow-left pr-2"></i> Back
              </button>
              <button type="submit" className="yummy-btn px-4 py-2 lato-black cursor-pointer">
                 Let’s Go!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
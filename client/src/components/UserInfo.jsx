import axios from "axios";
import { ORIGIN_URL } from "../config";
import { AuthContext } from "../context/authContext";
import { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next"; 

function UserInfo() {
  const { t } = useTranslation();
  const { user, navigate, setError, setUser, setSessionCheckNeeded } = useContext(AuthContext);
  const userId = user?.id;
  const [userInfo, setUserInfo] = useState({});
  const [gender, setGender] = useState("male");

  useEffect(() => {
    if (user) {
      setUserInfo({
        age: user.age || "",
        weight: user.weight || "",
        height: user.height || "",
        target_weight: user.target_weight || "",
        target_weight_change: user.target_weight_change || "1kg_week",
        activity_level: user.activity_level || "sedentary", 
      });
      setGender(user.gender || "male"); 
    }
  }, [user]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${ORIGIN_URL}/users/${userId}`, {
        age: parseInt(userInfo.age),
        weight: parseFloat(userInfo.weight),
        height: parseFloat(userInfo.height),
        target_weight: parseFloat(userInfo.target_weight),
        target_weight_change: userInfo.target_weight_change,
        activity_level: userInfo.activity_level,
        gender: gender,
      }, {
        withCredentials: true,
      });
      setUser(response.data);
      setSessionCheckNeeded(true);
      navigate("/profile");
    } catch (error) {
      setError(error.response?.data?.message || t("user_info.update_error")); 
    }
  };

  const buttonBaseClasses = "rounded-lg px-2 py-1 cursor-pointer hover:bg-gray-50";

  return (
    <div className="bg-[#f6f0ef]">
      <div className="user-info h-[100vh]">
        <div className="w-[60%] mx-auto pt-35">
          <h2 className="font-bold text-2xl">
            {t("user_info.title")}
          </h2>
          <p className="text-lg mb-8">
            {t("user_info.description")}
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex mt-4 justify-start gap-50">
              <div>
                <div className="flex gap-5 items-center justify-between py-3">
                  <label htmlFor="gender" className="text-lg font-semibold">
                    {t("profile.gender")}
                  </label>
                  <div className="flex gap-1 border-1 p-[2px] rounded-lg">
                    <button type="button"
                      className={`${buttonBaseClasses} ${gender === "male" ? "active-btn" : ""}`}
                      onClick={() => setGender("male")}>
                      {t("profile.gender_options.male")}
                    </button>
                    <button type="button"
                      className={`${buttonBaseClasses} ${gender === "female" ? "active-btn" : ""}`}
                      onClick={() => setGender("female")}>
                      {t("profile.gender_options.female")}
                    </button>
                    <button type="button"
                      className={`${buttonBaseClasses} ${gender === "other" ? "active-btn" : ""}`}
                      onClick={() => setGender("other")}>
                      {t("profile.gender_options.other")}
                    </button>
                  </div>
                </div>
                <div className="flex gap-5 items-center justify-between py-3">
                  <label htmlFor="weight" className="text-lg font-semibold">
                    {t("profile.weight")}
                  </label>
                  <div>
                    <input type="number" id="weight" name="weight" onChange={handleChange} value={userInfo.weight}
                      className="border-1 rounded-lg px-2 py-1 w-[4rem] mr-1 text-center" required />
                    <span className="">{t("profile.kg")}</span>
                  </div>
                </div>
                <div className="flex gap-5 items-center justify-between py-3">
                  <label htmlFor="target_weight" className="text-lg font-semibold">
                    {t("profile.target_weight")}
                  </label>
                  <div>
                    <input type="number" id="target_weight" name="target_weight" onChange={handleChange} value={userInfo.target_weight}
                      className="border-1 rounded-lg px-2 py-1 w-[4rem] mr-1 text-center" required />
                    <span className="">{t("profile.kg")}</span>
                  </div>
                </div>
                <div className="flex gap-5 items-center justify-between py-3">
                  <label htmlFor="activity_level" className="text-lg font-semibold">
                    {t("profile.activity_level")}
                  </label>
                  <select
                    id="activity_level"
                    name="activity_level"
                    onChange={handleChange}
                    value={userInfo.activity_level}
                    className="border-1 rounded-lg px-2 py-1"
                  >
                    <option value="sedentary">{t("edit_profile.activity_levels.sedentary")}</option>
                    <option value="lightly active">{t("edit_profile.activity_levels.lightly active")}</option>
                    <option value="moderately active">{t("edit_profile.activity_levels.moderately active")}</option>
                    <option value="very active">{t("edit_profile.activity_levels.very active")}</option>
                    <option value="super active">{t("edit_profile.activity_levels.super active")}</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex gap-5 items-center justify-between py-3">
                  <label htmlFor="age" className="text-lg font-semibold">
                    {t("profile.age")}
                  </label>
                  <div>
                    <input type="number" id="age" name="age" onChange={handleChange} value={userInfo.age}
                      className="border-1 rounded-lg px-2 py-1 w-[4rem] mr-1 text-center" required />
                    <span className="">{t("profile.years")}</span>
                  </div>
                </div>
                <div className="flex gap-5 items-center justify-between py-3">
                  <label htmlFor="height" className="text-lg font-semibold">
                    {t("profile.height")}
                  </label>
                  <div>
                    <input type="number" id="height" name="height" onChange={handleChange} value={userInfo.height}
                      className="border-1 rounded-lg px-2 py-1 w-[4rem] mr-1 text-center" required />
                    <span className="">{t("profile.cm")}</span>
                  </div>
                </div>
                <div className="flex gap-5 items-center justify-between py-3">
                  <label htmlFor="target_weight_change" className="text-lg font-semibold">
                    {t("profile.target_weight_change")}
                  </label>
                  <div>
                    <select
                      id="target_weight_change"
                      name="target_weight_change"
                      onChange={handleChange}
                      value={userInfo.target_weight_change} 
                      className="border-1 rounded-lg px-2 py-1"
                    >
                      <option value="1kg_week">{t("edit_profile.weight_change_options.1kg_week")}</option>
                      <option value="500g_week">{t("edit_profile.weight_change_options.500g_week")}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-[20%] mt-25 mr-[10%]">
              <button onClick={() => navigate(-1)} className="yummy-btn px-4 py-2 lato-black cursor-pointer">
                <i className="fa-solid fa-arrow-left pr-2"></i> {t("food_avoid.back")} 
              </button>
              <button type="submit" className="yummy-btn px-4 py-2 lato-black cursor-pointer">
                {t("user_info.lets_go")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
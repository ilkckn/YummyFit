import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ORIGIN_URL } from "../config";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    image: "",
    age: "",
    gender: "male",
    height: "",
    weight: "",
    target_weight: "",
    target_weight_change: "1kg",
    daily_calories: "",
    activity_level: "sedentary",
    allergies: [],
    food_preferences: [],
    cuisine_preferences: [],
    disease: [],
  });

  const [sessionLoading, setSessionLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${ORIGIN_URL}/users/register`, {
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
        image: user.image,
      });
      setUser(res.data.user);
      setError(null);
      navigate("/login");
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${ORIGIN_URL}/users/login`,
        {
          email: user.email,
          password: user.password,
        },
        {
          withCredentials: true,
        }
      );
      setUser(res.data.user);
      setError(null);
      navigate("/home");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${ORIGIN_URL}/users/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      setError(null);
      navigate("/login");
    } catch (error) {
      setError("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get(`${ORIGIN_URL}/users/check-session`, {
          withCredentials: true,
        });
        setUser(res.data.user);
        setSessionLoading(false);
      } catch (error) {
        setError("Session check failed. Please log in again.");
      }
    };
    checkSession();
  }, []);

  return (
    <div>
      <AuthContext.Provider
        value={{
          user,
          setUser,
          sessionLoading,
          error,
          handleChange,
          handleLogin,
          handleLogout,
          handleRegister,
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
}

export default AuthContextProvider;

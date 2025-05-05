import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
// import Recipe from "./pages/Recipe";
import Food from "./pages/Food";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RecipeDetail from './pages/RecipeDetail';
import FoodType from './pages/FoodType';

function App() {
  return (
    <div className="w-full bg-[#fcfcfc]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/recipe" element={<Recipe />} /> */}
        <Route path="/food" element={<Food />} />
        <Route path="/food/:id" element={<RecipeDetail />} />
        <Route path="/foodType/:type" element={<FoodType />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

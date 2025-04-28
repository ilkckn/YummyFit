import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
// import Recipe from "./pages/Recipe";
import Food from "./pages/Food";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

function App() {

  return (
    <Router>
      <div className='w-full bg-white'>
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
        </Routes>
      </div>
  </Router>
  )
}

export default App

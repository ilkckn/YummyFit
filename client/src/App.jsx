import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Contact from "./pages/Contact";
// import Recipe from "./pages/Recipe";
// import Food from "./pages/Food";
// import About from "./pages/About";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Profile from "./pages/Profile";
// import Navbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Navbar /> 
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/contact" element={<Contact />} /> */}
      {/* <Route path="/about" element={<About />} /> */}
      {/* <Route path="/profile" element={<Profile />} /> */}
      {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
      {/* <Route path="/recipe" element={<Recipe />} /> */}
      {/* <Route path="/food" element={<Food />} /> */}
    </Routes>
  </Router>
  )
}

export default App

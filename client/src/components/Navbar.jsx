import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo/logo.png'; 

function Navbar() {
  return (
    <div className="flex justify-start items-center px-4">
      <div className="">
        <NavLink to="/" className="logo text-xl">
          <img src={logo} alt="YummyFit Logo" className="h-40 w-40 mr-12" />
        </NavLink>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-3 lato-bold text-lg">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : "menu-link"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/food" className={({ isActive }) => isActive ? "active-link" : "menu-link"}>
              Food
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : "menu-link"}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : "menu-link"}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;

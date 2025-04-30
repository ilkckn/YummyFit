import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo/logo.png'; 

function Navbar() {
  return (
    <div className="flex justify-start items-center px-4 z-3 relative">
      <div className="">
        <NavLink to="/">
          <img src={logo} alt="YummyFit Logo" className="h-35 w-40" />
        </NavLink>
      </div>
      <div className="ml-12">
        <ul className="menu menu-horizontal px-1 gap-3 lato-bold text-lg">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : "menu-link"}>
            🏠 Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/food" className={({ isActive }) => isActive ? "active-link" : "menu-link"}>
            🍴 Recipes
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : "menu-link"}>
              ℹ️ About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : "menu-link"}>
              📞 Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
<nav>

</nav>

export default Navbar;

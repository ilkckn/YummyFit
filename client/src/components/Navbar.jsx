import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo/logo.png";
import { ImProfile } from "react-icons/im";
import { TbLogout2, TbLogin2 } from "react-icons/tb";
import { GiArchiveRegister } from "react-icons/gi";
import { BiFoodMenu } from "react-icons/bi";
import { BsBook } from "react-icons/bs";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { MdWifiProtectedSetup } from "react-icons/md";
import avatar from "../assets/images/avatar/avatar.png";

function Navbar() {
  const { handleLogout, user } = useContext(AuthContext);
  const isLoggedIn = user && user.email;
  return (
    <div className="flex justify-between items-center w-full max-w-[1600px] px-10 z-5 fixed top-0 bg-white shadow-md ">
      <div className="left w-full flex-1/2 flex-wrap flex items-center">
        <div className="">
          <NavLink to="/">
            <img src={logo} alt="YummyFit Logo" className="h-35 w-40" />
          </NavLink>
        </div>
        <div className="ml-10">
          <ul className="menu menu-horizontal px-1 gap-2 amatic-sc-bold text-2xl">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "active-link" : "menu-link"
                }
              >
                <span className="navber-icon text-lg">🏠</span>Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/food"
                className={({ isActive }) =>
                  isActive ? "active-link" : "menu-link"
                }
              >
                <span className="navber-icon text-lg">🍴</span> Recipes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "active-link" : "menu-link"
                }
              >
                <span className="navber-icon text-lg">ℹ️</span> About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "active-link" : "menu-link"
                }
              >
                <span className="navber-icon text-lg">📞</span> Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="right flex items-center gap-5">
        <div className="welcome">
          {isLoggedIn ? (
            <p className="text-lg font-medium text-[#1A1A1A]">
              Welcome, {user.username}🍃
            </p>
          ) : (
            <p></p>
          )}
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn w-15 h-15 flex justify-center items-center rounded-full bg-gray-100 border border-[#E3F5ED] text-black p-0"
          >
            {isLoggedIn ? (
              <div className="avatar">
                <div className="w-10 h-10 rounded-full ring ring-[#E3F5ED] ring-offset-4">
                  {user.image && (
                    <img
                      src={user.image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            ) : (
              <img src={avatar} alt="" />
            )}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content w-[25rem] min-h-[100vh] flex flex-col items-center justify-start gap-4 absolute top-[-2.5rem] right-[-2.5rem] bg-[#326C56] text-white p-2 pt-20 shadow-sm"
          >
            <div className="welcome">
              {isLoggedIn ? (
                <div className="flex flex-col items-center justify-center gap-2">
                  <img
                    src={user?.image}
                    alt=""
                    className="w-[7rem] rounded-[50%] border-3 border-white"
                  />
                  <p className="text-lg font-medium text-white mb-5 underline tracking-[.5px]">
                    Welcome, {user.username}
                  </p>
                </div>
              ) : (
                <p></p>
              )}
            </div>
            {isLoggedIn ? (
              <>
                <li className="w-full flex justify-center items-center text-[#326C56] tracking-[1px] relative">
                  <NavLink
                    to={"/account-setup"}
                    className={"w-full flex justify-center items-center"}
                  >
                    <button className="w-[70%] h-[3rem] bg-white cursor-pointer text-[.9rem] text-[#326C56] uppercase rounded-md shadow-md hover:bg-[#FFC649] hover:text-white transition duration-300 ease-in-out flex items-center justify-center gap-2">
                      <MdWifiProtectedSetup className="text-inherit text-xl transition duration-300 ease-in-out" />
                      Account Setup
                    </button>
                  </NavLink>
                </li>
                <li className="w-full flex justify-center items-center text-[#326C56] tracking-[1px] relative">
                  <NavLink
                    to={"/profile"}
                    className={"w-full flex justify-center items-center"}
                  >
                    <button className="w-[70%] h-[3rem] bg-white cursor-pointer text-[1rem] text-[#326C56] uppercase rounded-md shadow-md hover:bg-[#FFC649] hover:text-white transition duration-300 ease-in-out flex items-center justify-center gap-2">
                      <ImProfile className="text-inherit text-xl transition duration-300 ease-in-out" />
                      Profile
                    </button>
                  </NavLink>
                </li>
                <li className="w-full flex justify-center items-center text-[#326C56] tracking-[1px] relative">
                  <NavLink
                    to={"/food"}
                    className={"w-full flex justify-center items-center"}
                  >
                    <button className="w-[70%] h-[3rem] bg-white cursor-pointer text-[1rem] text-[#326C56] uppercase rounded-md shadow-md hover:bg-[#FFC649] hover:text-white transition duration-300 ease-in-out flex items-center justify-center gap-2">
                      <BiFoodMenu className="text-inherit text-xl transition duration-300 ease-in-out" />
                      Recipe
                    </button>
                  </NavLink>
                </li>
                <li className="w-full flex justify-center items-center text-[#326C56] tracking-[1px] relative">
                  <NavLink
                    to={"/about"}
                    className={"w-full flex justify-center items-center"}
                  >
                    <button className="w-[70%] h-[3rem] bg-white cursor-pointer text-[1rem] text-[#326C56] uppercase rounded-md shadow-md hover:bg-[#FFC649] hover:text-white transition duration-300 ease-in-out flex items-center justify-center gap-2">
                      <BsBook className="text-inherit text-xl transition duration-300 ease-in-out" />
                      About
                    </button>
                  </NavLink>
                </li>
                <li className="w-full flex justify-center items-center text-[#326C56] tracking-[1px] relative">
                  <NavLink
                    to={"/contact"}
                    className={"w-full flex justify-center items-center"}
                  >
                    <button className="w-[70%] h-[3rem] bg-white cursor-pointer text-[1rem] text-[#326C56] uppercase rounded-md shadow-md hover:bg-[#FFC649] hover:text-white transition duration-300 ease-in-out flex items-center justify-center gap-2">
                      <HiOutlineChatBubbleBottomCenterText className="text-inherit text-xl transition duration-300 ease-in-out" />
                      Contact
                    </button>
                  </NavLink>
                </li>
                <li className="w-full flex justify-center items-center text-[#326C56] tracking-[1px] relative">
                  <NavLink
                    onClick={handleLogout}
                    className={"w-full flex justify-center items-center"}
                  >
                    <button className="w-[70%] h-[3rem] bg-white cursor-pointer text-[1rem] text-[#326C56] uppercase rounded-md shadow-md hover:bg-[#FFC649] hover:text-white transition duration-300 ease-in-out flex items-center justify-center gap-2">
                      <TbLogout2 className="text-inherit text-xl transition duration-300 ease-in-out" />
                      Logout
                    </button>
                  </NavLink>
                </li>
                <NavLink to={"/"}>
                  <figure className="w-full flex justify-center items-center mb-5 absolute bottom-20 left-0 right-0">
                    <img src={logo} alt="" className="w-[55%]" />
                  </figure>
                </NavLink>
              </>
            ) : (
              <>
                <li className="w-full flex justify-center items-center text-[#326C56] tracking-[1px] relative">
                  <NavLink
                    to={"/register"}
                    className={"w-full flex justify-center items-center"}
                  >
                    <button className="w-[70%] h-[3rem] bg-white cursor-pointer text-[1rem] text-[#326C56] uppercase rounded-md shadow-md hover:bg-[#FFC649] hover:text-white transition duration-300 ease-in-out flex items-center justify-center gap-2">
                      <GiArchiveRegister />
                      Register
                    </button>
                  </NavLink>
                </li>
                <li className="w-full flex justify-center items-center text-[#326C56] tracking-[1px] relative">
                  <NavLink
                    to={"/login"}
                    className={"w-full flex justify-center items-center"}
                  >
                    <button className="w-[70%] h-[3rem] bg-white cursor-pointer text-[1rem] text-[#326C56] uppercase rounded-md shadow-md hover:bg-[#FFC649] hover:text-white transition duration-300 ease-in-out flex items-center justify-center gap-2">
                      <TbLogin2 className="text-inherit text-xl transition duration-300 ease-in-out" />
                      Login
                    </button>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
<nav></nav>;

export default Navbar;

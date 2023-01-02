import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  
    const navbarItem = [
      <li key={1}>
        <NavLink to={"/"} className={`mx-1 px-4 py-2 `}>
          Home
        </NavLink>
      </li>,

      <li key={4}>
        <NavLink to={"/service/serviceResult"} className={`mx-1 px-4 py-2 `}>
          Check Result
        </NavLink>
      </li>,
      <li key={2}>
        <NavLink to={"/"} className={`mx-1 px-4 py-2 `}>
          About Us
        </NavLink>
      </li>,
      <li key={3}>
        <NavLink to={"/blogs"} className={`mx-1 px-4 py-2 `}>
          Blogs
        </NavLink>
      </li>,
      <li key={5}>
        <NavLink to={"/childdetails"} className={`mx-1 px-4 py-2 `}>
          CDetails
        </NavLink>
      </li>,
    ];

    return (
      <div className="navbar fixed lg:px-32 text-white bg-[#05050550]">
        <div className="navbar-start ">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow  rounded-box w-52"
            >
              {navbarItem}
            </ul>
          </div>
          <Link to={"/"} className="btn btn-ghost normal-case text-xl">
            Check
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-center hidden lg:flex">
            <ul className="flex justify-end items-center ">{navbarItem}</ul>
          </div>
          <ul className="lg:hidden block">
            <li>hallow</li>
          </ul>
        </div>
      </div>
    );
};

export default Navbar;
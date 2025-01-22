import React from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="top-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-center ">
        <img
          src={logo}
          alt="Logo"
          // className="w-2/3 h-auto   "
          className=" sm:w-2/2 md:w-3/3 lg:w-2/3 h-auto"
        />
      </div>
    </nav>
  );
};

export default Navbar;
